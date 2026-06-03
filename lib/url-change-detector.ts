// URL 变更检测服务

import { promises as fs } from 'fs';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
const URL_CACHE_PATH = path.join(DATA_DIR, 'url-cache.json');

// 确保数据目录存在
function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export interface UrlCache {
  urls: string[];
  timestamp: string;
  hashes: Record<string, string>; // URL -> hash mapping
}

export interface UrlChange {
  added: string[];      // 新增的 URL
  removed: string[];    // 删除的 URL
  unchanged: string[];   // 未变化的 URL
}

// 简单 hash 函数
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// 获取缓存的 URL 列表
export async function getCachedUrls(): Promise<UrlCache | null> {
  try {
    ensureDataDir();
    const data = await fs.readFile(URL_CACHE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// 保存 URL 缓存
export async function saveUrlCache(urls: string[]): Promise<void> {
  ensureDataDir();
  
  const hashes: Record<string, string> = {};
  for (const url of urls) {
    hashes[url] = simpleHash(url);
  }
  
  const cache: UrlCache = {
    urls: urls.sort(), // 排序以保证一致性
    timestamp: new Date().toISOString(),
    hashes,
  };
  
  await fs.writeFile(URL_CACHE_PATH, JSON.stringify(cache, null, 2));
}

// 检测 URL 变更
export async function detectUrlChanges(currentUrls: string[]): Promise<UrlChange> {
  const cached = await getCachedUrls();
  
  if (!cached) {
    // 首次运行，所有 URL 都是新增的
    return {
      added: currentUrls,
      removed: [],
      unchanged: [],
    };
  }
  
  const currentSet = new Set(currentUrls);
  const cachedSet = new Set(cached.urls);
  
  const added: string[] = [];
  const removed: string[] = [];
  const unchanged: string[] = [];
  
  // 找出新增的 URL
  for (const url of currentUrls) {
    if (!cachedSet.has(url)) {
      added.push(url);
    } else {
      unchanged.push(url);
    }
  }
  
  // 找出删除的 URL
  for (const url of cached.urls) {
    if (!currentSet.has(url)) {
      removed.push(url);
    }
  }
  
  return {
    added: added.sort(),
    removed: removed.sort(),
    unchanged: unchanged.sort(),
  };
}

// 更新 URL 缓存
export async function updateUrlCache(currentUrls: string[]): Promise<UrlChange> {
  const changes = await detectUrlChanges(currentUrls);
  await saveUrlCache(currentUrls);
  return changes;
}

// 获取变更统计
export function getChangeStats(changes: UrlChange) {
  return {
    totalCurrent: changes.added.length + changes.unchanged.length,
    totalCached: changes.removed.length + changes.unchanged.length,
    added: changes.added.length,
    removed: changes.removed.length,
    unchanged: changes.unchanged.length,
    changeRate: ((changes.added.length + changes.removed.length) / 
      (changes.added.length + changes.unchanged.length + changes.removed.length) * 100).toFixed(2) + '%',
  };
}
