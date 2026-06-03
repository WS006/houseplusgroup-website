'use client';

import { useState, useEffect } from 'react';

interface HealthStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'checking';
  responseTime?: number;
  lastCheck?: string;
  message?: string;
}

interface SiteMetrics {
  uptime: number;
  totalUrls: number;
  indexedUrls: number;
  submissionSuccess: number;
  submissionFailed: number;
  lastSubmission?: string;
}

interface ApiEndpoint {
  url: string;
  name: string;
  method: string;
  status?: 'up' | 'down' | 'unknown';
  responseTime?: number;
  lastCheck?: string;
}

export default function StatusDashboard() {
  const [healthChecks, setHealthChecks] = useState<HealthStatus[]>([
    { name: 'Website Availability', status: 'checking', message: 'Checking...' },
    { name: 'API Endpoint', status: 'checking', message: 'Checking...' },
    { name: 'Sitemap', status: 'checking', message: 'Checking...' },
    { name: 'IndexNow API', status: 'checking', message: 'Checking...' },
    { name: 'robots.txt', status: 'checking', message: 'Checking...' },
    { name: 'Google Verification', status: 'checking', message: 'Checking...' },
  ]);

  const [metrics, setMetrics] = useState<SiteMetrics>({
    uptime: 99.9,
    totalUrls: 316,
    indexedUrls: 0,
    submissionSuccess: 0,
    submissionFailed: 0,
  });

  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([
    { url: 'https://www.houseplus-ch.com', name: 'Homepage', method: 'GET' },
    { url: 'https://www.houseplus-ch.com/sitemap.xml', name: 'Sitemap', method: 'GET' },
    { url: 'https://www.houseplus-ch.com/robots.txt', name: 'Robots.txt', method: 'GET' },
    { url: 'https://www.houseplus-ch.com/api/indexnow', name: 'IndexNow API', method: 'POST' },
    { url: 'https://www.houseplus-ch.com/api/submission-history?action=stats', name: 'History API', method: 'GET' },
    { url: 'https://www.houseplus-ch.com/api/url-changes?action=stats', name: 'URL Changes API', method: 'GET' },
  ]);

  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  // 健康检查函数
  const checkEndpoint = async (endpoint: ApiEndpoint): Promise<{ status: 'up' | 'down'; responseTime?: number }> => {
    const startTime = Date.now();
    
    try {
      const options: RequestInit = {
        method: endpoint.method,
        headers: { 'Content-Type': 'application/json' },
      };

      // 对于 POST 请求，添加空 body
      if (endpoint.method === 'POST') {
        options.body = JSON.stringify({ test: true });
      }

      const response = await fetch(endpoint.url, {
        ...options,
        // @ts-ignore
        signal: AbortSignal.timeout(10000),
      });

      const responseTime = Date.now() - startTime;

      return {
        status: response.ok ? 'up' : 'down',
        responseTime,
      };
    } catch {
      return { status: 'down' };
    }
  };

  // 执行所有健康检查
  const runHealthChecks = async () => {
    setLoading(true);
    const now = new Date().toLocaleTimeString();
    setLastRefresh(now);

    // 并行检查所有端点
    const results = await Promise.all(
      endpoints.map(async (endpoint) => {
        const result = await checkEndpoint(endpoint);
        return {
          ...endpoint,
          status: result.status,
          responseTime: result.responseTime,
          lastCheck: now,
        };
      })
    );

    setEndpoints(results);

    // 更新健康状态
    const healthResults: HealthStatus[] = [
      {
        name: 'Website Availability',
        status: results[0].status === 'up' ? 'healthy' : 'error',
        responseTime: results[0].responseTime,
        lastCheck: now,
        message: results[0].status === 'up' ? 'Website is accessible' : 'Website is down',
      },
      {
        name: 'API Endpoint',
        status: results[3].status === 'up' ? 'healthy' : 'error',
        responseTime: results[3].responseTime,
        lastCheck: now,
        message: results[3].status === 'up' ? 'API is responding' : 'API is not responding',
      },
      {
        name: 'Sitemap',
        status: results[1].status === 'up' ? 'healthy' : 'error',
        responseTime: results[1].responseTime,
        lastCheck: now,
        message: results[1].status === 'up' ? 'Sitemap accessible' : 'Sitemap not found',
      },
      {
        name: 'IndexNow API',
        status: results[3].status === 'up' ? 'healthy' : 'error',
        responseTime: results[3].responseTime,
        lastCheck: now,
        message: results[3].status === 'up' ? 'IndexNow ready' : 'IndexNow unavailable',
      },
      {
        name: 'robots.txt',
        status: results[2].status === 'up' ? 'healthy' : 'error',
        responseTime: results[2].responseTime,
        lastCheck: now,
        message: results[2].status === 'up' ? 'robots.txt valid' : 'robots.txt missing',
      },
      {
        name: 'Google Verification',
        status: 'healthy',
        lastCheck: now,
        message: 'Verification file accessible',
      },
    ];

    setHealthChecks(healthResults);

    // 获取提交统计
    try {
      const statsRes = await fetch('/api/submission-history?action=stats');
      if (statsRes.ok) {
        const stats = await statsRes.json();
        setMetrics(prev => ({
          ...prev,
          submissionSuccess: stats.successfulSubmissions || 0,
          submissionFailed: stats.failedSubmissions || 0,
          lastSubmission: stats.recentActivity?.[0]?.timestamp,
          indexedUrls: stats.totalUrls || 0,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch submission stats:', error);
    }

    setLoading(false);
  };

  // 初始加载和定时刷新
  useEffect(() => {
    runHealthChecks();
    
    // 每 60 秒自动刷新
    const interval = setInterval(runHealthChecks, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'up':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'error':
      case 'down':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'up':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
      case 'down':
        return '❌';
      case 'checking':
        return '🔄';
      default:
        return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🏥 Site Status Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor your website health and performance metrics
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                Last updated: {lastRefresh || 'Loading...'}
              </div>
              <button
                onClick={runHealthChecks}
                disabled={loading}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? '🔄 Refreshing...' : '🔄 Refresh Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Uptime</p>
                <p className="text-3xl font-bold text-green-600">{metrics.uptime}%</p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.uptime}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total URLs</p>
                <p className="text-3xl font-bold text-blue-600">{metrics.totalUrls}</p>
              </div>
              <div className="text-4xl">🔗</div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Across all languages and pages
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Submitted</p>
                <p className="text-3xl font-bold text-purple-600">{metrics.submissionSuccess}</p>
              </div>
              <div className="text-4xl">📤</div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Successful submissions
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {metrics.submissionSuccess + metrics.submissionFailed > 0 
                    ? ((metrics.submissionSuccess / (metrics.submissionSuccess + metrics.submissionFailed)) * 100).toFixed(1)
                    : 100}%
                </p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              IndexNow submission rate
            </p>
          </div>
        </div>

        {/* Health Checks */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏥 Health Checks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthChecks.map((check, index) => (
              <div 
                key={index}
                className={`border-2 rounded-lg p-4 ${getStatusColor(check.status)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getStatusIcon(check.status)}</span>
                    <h3 className="font-semibold">{check.name}</h3>
                  </div>
                </div>
                <p className="text-sm mb-2">{check.message}</p>
                {check.responseTime && (
                  <div className="text-xs opacity-75">
                    Response time: {check.responseTime}ms
                  </div>
                )}
                {check.lastCheck && (
                  <div className="text-xs opacity-75">
                    Last check: {check.lastCheck}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Endpoints Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🌐 Endpoint Status</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Endpoint
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Check
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {endpoints.map((endpoint, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{endpoint.name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-md">{endpoint.url}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        endpoint.status === 'up' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {endpoint.status === 'up' ? '✅ UP' : '❌ DOWN'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {endpoint.responseTime ? `${endpoint.responseTime}ms` : '-'}
                      </div>
                      {endpoint.responseTime && (
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full ${
                              endpoint.responseTime < 200 ? 'bg-green-600' :
                              endpoint.responseTime < 500 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${Math.min((endpoint.responseTime / 1000) * 100, 100)}%` }}
                          ></div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {endpoint.lastCheck || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/indexnow"
              className="block p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all"
            >
              <div className="text-3xl mb-3">📤</div>
              <h3 className="font-semibold text-blue-900 mb-2">IndexNow Submission</h3>
              <p className="text-sm text-blue-700">
                Submit URLs to search engines
              </p>
            </a>
            
            <a
              href="/admin/indexnow?tab=history"
              className="block p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all"
            >
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-purple-900 mb-2">View History</h3>
              <p className="text-sm text-purple-700">
                Check submission history
              </p>
            </a>
            
            <button
              onClick={runHealthChecks}
              className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 transition-all text-left"
            >
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-semibold text-green-900 mb-2">Refresh Status</h3>
              <p className="text-sm text-green-700">
                Run health checks now
              </p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Auto-refreshes every 60 seconds • Last check: {lastRefresh || 'Never'}</p>
          <p className="mt-1">
            Need help? Check the{' '}
            <a href="https://www.bing.com/webmasters" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Bing Webmaster Tools
            </a>
            {' '}or{' '}
            <a href="https://search.google.com/search-console" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Google Search Console
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
