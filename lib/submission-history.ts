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

const DEDUP_WINDOW_MINUTES = 60;

function mediaApiUrl(path: string): string | null {
  const base = process.env.HOUSEPLUS_MEDIA_API_URL?.replace(/\/$/, '');
  return base ? `${base}${path}` : null;
}

async function mediaRequest(path: string, init: RequestInit = {}): Promise<any> {
  const endpoint = mediaApiUrl(path);
  const token = process.env.HOUSEPLUS_MEDIA_API_TOKEN;
  if (!endpoint || !token) throw new Error('Persistent IndexNow storage is not configured');

  const response = await fetch(endpoint, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Persistent IndexNow storage returned ${response.status}`);
  return payload;
}

function createLocalRecord(
  urls: string[],
  engines: string[],
  results: SubmissionHistory['results'],
  triggeredBy: SubmissionHistory['triggeredBy']
): SubmissionHistory {
  return {
    id: `pending-${Date.now()}`,
    timestamp: new Date().toISOString(),
    urls,
    engines,
    totalUrls: urls.length,
    successCount: results.filter((result) => result.success).length,
    failureCount: results.filter((result) => !result.success).length,
    results,
    triggeredBy,
  };
}

export async function getSubmissionHistory(limit = 50): Promise<SubmissionHistory[]> {
  try {
    const data = await mediaRequest(`/v1/indexnow/submissions?limit=${Math.min(Math.max(limit, 1), 1000)}`);
    return Array.isArray(data.data) ? data.data.map((record: Omit<SubmissionHistory, 'urls'>) => ({ ...record, urls: [] })) : [];
  } catch (error) {
    console.error('Failed to load persistent IndexNow history:', error);
    return [];
  }
}

export async function isRecentlySubmitted(
  urls: string[],
  windowMinutes = DEDUP_WINDOW_MINUTES
): Promise<{ blocked: boolean; recentlySubmitted: string[] }> {
  try {
    const data = await mediaRequest('/v1/indexnow/dedupe', {
      method: 'POST',
      body: JSON.stringify({ urls, window_minutes: windowMinutes }),
    });
    const recentlySubmitted = Array.isArray(data.recentlySubmitted) ? data.recentlySubmitted : [];
    return { blocked: recentlySubmitted.length > 0, recentlySubmitted };
  } catch (error) {
    console.error('Failed to check persistent IndexNow dedupe state:', error);
    return { blocked: false, recentlySubmitted: [] };
  }
}

export async function recordSubmissions(): Promise<void> {
  // D1 updates the URL de-duplication state atomically when a submission record is stored.
}

export async function addSubmissionHistory(
  urls: string[],
  engines: string[],
  results: SubmissionHistory['results'],
  triggeredBy: SubmissionHistory['triggeredBy'] = 'manual'
): Promise<SubmissionHistory> {
  const localRecord = createLocalRecord(urls, engines, results, triggeredBy);
  try {
    const data = await mediaRequest('/v1/indexnow/submissions', {
      method: 'POST',
      body: JSON.stringify({ urls, engines, results, triggeredBy }),
    });
    return { ...localRecord, id: data.id || localRecord.id, timestamp: data.timestamp || localRecord.timestamp };
  } catch (error) {
    console.error('Failed to save persistent IndexNow history:', error);
    return localRecord;
  }
}

export async function getSubmissionStats() {
  try {
    return await mediaRequest('/v1/indexnow/submissions?action=stats');
  } catch (error) {
    console.error('Failed to load persistent IndexNow statistics:', error);
    return {
      totalSubmissions: 0,
      totalUrls: 0,
      successfulSubmissions: 0,
      partialSubmissions: 0,
      failedSubmissions: 0,
      successRate: '0.0',
      engineStats: {},
      recentActivity: [],
    };
  }
}

export async function clearSubmissionHistory(): Promise<void> {
  await mediaRequest('/v1/indexnow/submissions', { method: 'DELETE' });
}
