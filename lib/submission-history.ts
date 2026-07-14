// 提交历史记录管理

export interface SubmissionHistory {
  id: string;
  timestamp: string;
  urls: string[];
  engines: string[];
  totalUrls: number;
  successCount: number;
  failureCount: number;
  results: {
    engine: string;
    success: boolean;
    statusCode?: number;
    message?: string;
  }[];
  triggeredBy: 'manual' | 'auto' | 'scheduled';
}

const HISTORY_FILE = 'data/submission-history.json';
const DEDUP_WINDOW_MINUTES = 60; // 1小时内不重复提交相同URL

// 简单文件存储（适用于 Vercel 等无状态环境）
// 在生产环境中建议使用数据库或专门的存储服务
import { promises as fs } from 'fs';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
const HISTORY_PATH = path.join(DATA_DIR, 'submission-history.json');
const DEDUP_PATH = path.join(DATA_DIR, 'recent-submissions.json');

// 确保数据目录存在
function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

// 生成唯一 ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// 读取历史记录
export async function getSubmissionHistory(limit = 50): Promise<SubmissionHistory[]> {
  try {
    ensureDataDir();
    const data = await fs.readFile(HISTORY_PATH, 'utf-8');
    const history: SubmissionHistory[] = JSON.parse(data);
    return history.slice(0, limit);
  } catch {
    return [];
  }
}

// 检查URL是否在最近N分钟内已提交
export async function isRecentlySubmitted(
  urls: string[],
  windowMinutes = DEDUP_WINDOW_MINUTES
): Promise<{ blocked: boolean; recentlySubmitted: string[] }> {
  try {
    ensureDataDir();
    const data = await fs.readFile(DEDUP_PATH, 'utf-8').catch(() => '{}');
    const dedup: Record<string, number> = JSON.parse(data);
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;

    const recentlySubmitted: string[] = [];
    for (const url of urls) {
      const lastSubmit = dedup[url];
      if (lastSubmit && now - lastSubmit < windowMs) {
        recentlySubmitted.push(url);
      }
    }

    return {
      blocked: recentlySubmitted.length > 0,
      recentlySubmitted,
    };
  } catch {
    return { blocked: false, recentlySubmitted: [] };
  }
}

// 记录URL提交时间（用于防重复）
export async function recordSubmissions(urls: string[]): Promise<void> {
  try {
    ensureDataDir();
    const data = await fs.readFile(DEDUP_PATH, 'utf-8').catch(() => '{}');
    const dedup: Record<string, number> = JSON.parse(data);
    const now = Date.now();

    for (const url of urls) {
      dedup[url] = now;
    }

    // 清理超过24小时的记录
    const cutoff = now - 24 * 60 * 60 * 1000;
    for (const [url, time] of Object.entries(dedup)) {
      if (time < cutoff) {
        delete dedup[url];
      }
    }

    await fs.writeFile(DEDUP_PATH, JSON.stringify(dedup, null, 2));
  } catch (error) {
    console.error('Failed to record submission dedup:', error);
  }
}

// 添加新记录
export async function addSubmissionHistory(
  urls: string[],
  engines: string[],
  results: SubmissionHistory['results'],
  triggeredBy: SubmissionHistory['triggeredBy'] = 'manual'
): Promise<SubmissionHistory> {
  ensureDataDir();

  const successCount = results.filter(r => r.success).length;
  const failureCount = results.filter(r => !r.success).length;

  const record: SubmissionHistory = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    urls,
    engines,
    totalUrls: urls.length,
    successCount,
    failureCount,
    results,
    triggeredBy,
  };

  try {
    const existing = await getSubmissionHistory(1000);
    existing.unshift(record);
    // 只保留最近 1000 条记录
    const toSave = existing.slice(0, 1000);
    await fs.writeFile(HISTORY_PATH, JSON.stringify(toSave, null, 2));

    // 记录提交时间用于防重复
    await recordSubmissions(urls);
  } catch (error) {
    console.error('Failed to save submission history:', error);
  }

  return record;
}

// 获取统计信息
export async function getSubmissionStats() {
  const history = await getSubmissionHistory(1000);

  const totalSubmissions = history.length;
  const totalUrls = history.reduce((sum, h) => sum + h.totalUrls, 0);
  const successfulSubmissions = history.filter(h => h.successCount > 0).length;
  const failedSubmissions = history.filter(h => h.failureCount > 0).length;

  const engineStats: Record<string, { success: number; failed: number }> = {};
  const engines = ['bing', 'google', 'yandex', 'indexnow'];

  for (const engine of engines) {
    engineStats[engine] = { success: 0, failed: 0 };
    for (const record of history) {
      const result = record.results.find(r => r.engine.toLowerCase() === engine);
      if (result) {
        if (result.success) {
          engineStats[engine].success++;
        } else {
          engineStats[engine].failed++;
        }
      }
    }
  }

  return {
    totalSubmissions,
    totalUrls,
    successfulSubmissions,
    failedSubmissions,
    successRate: totalSubmissions > 0 ? (successfulSubmissions / totalSubmissions * 100).toFixed(1) : '0',
    engineStats,
    recentActivity: history.slice(0, 10),
  };
}

// 清除历史记录
export async function clearSubmissionHistory(): Promise<void> {
  try {
    ensureDataDir();
    await fs.writeFile(HISTORY_PATH, JSON.stringify([], null, 2));
    await fs.writeFile(DEDUP_PATH, JSON.stringify({}, null, 2));
  } catch (error) {
    console.error('Failed to clear submission history:', error);
    throw error;
  }
}
