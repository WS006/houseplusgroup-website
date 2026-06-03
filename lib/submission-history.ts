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

// 简单文件存储（适用于 Vercel 等无状态环境）
// 在生产环境中建议使用数据库或专门的存储服务
import { promises as fs } from 'fs';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
const HISTORY_PATH = path.join(DATA_DIR, 'submission-history.json');

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
  } catch (error) {
    console.error('Failed to clear submission history:', error);
    throw error;
  }
}
