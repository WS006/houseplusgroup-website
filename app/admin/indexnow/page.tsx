'use client';

import { useState } from 'react';
import { baseUrl, generateAllUrls, generateMainPageUrls, staticPageSlugs, productSlugs, newsSlugs } from '@/lib/urls';
import { searchEngines } from '@/lib/search-engines';

const defaultEngines = ['bing', 'indexnow'];

export default function IndexNowPage() {
  const [url, setUrl] = useState('https://www.houseplus-ch.com/en');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<'none' | 'main' | 'all'>('none');
  const [selectedEngines, setSelectedEngines] = useState<string[]>(defaultEngines);
  const [sendNotification, setSendNotification] = useState(false);

  const allUrls = generateAllUrls();
  const mainUrls = generateMainPageUrls();
  
  const staticPagesCount = staticPageSlugs.length;
  const productsCount = productSlugs.length;
  const newsCount = newsSlugs.length;

  const handleEngineToggle = (engineId: string) => {
    setSelectedEngines(prev => 
      prev.includes(engineId) 
        ? prev.filter(id => id !== engineId)
        : [...prev, engineId]
    );
  };

  const submitUrls = async (urlsToSubmit: string[]) => {
    setLoading(true);
    setError(null);
    setResults([]);
    setProgress(0);
    setShowPreview('none');

    const batchSize = 100;
    const batches: string[][] = [];
    
    for (let i = 0; i < urlsToSubmit.length; i += batchSize) {
      batches.push(urlsToSubmit.slice(i, i + batchSize));
    }

    const submitBatch = async (index: number) => {
      if (index >= batches.length) {
        setLoading(false);
        return;
      }

      try {
        const payload: Record<string, any> = { urls: batches[index] };
        if (selectedEngines.length > 0) {
          payload.engines = selectedEngines;
        }
        if (sendNotification) {
          payload.notify = true;
        }

        const response = await fetch('/api/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        setResults(prev => [...prev, { batch: index + 1, total: batches.length, urls: batches[index], result: data }]);
        setProgress(Math.round(((index + 1) / batches.length) * 100));
        
        setTimeout(() => submitBatch(index + 1), 2000);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    submitBatch(0);
  };

  const submitSingleUrl = () => {
    submitUrls([url]);
  };

  const submitMainPages = () => {
    submitUrls(mainUrls);
  };

  const submitAll = () => {
    submitUrls(allUrls);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            IndexNow URL Submission Tool
          </h1>

          {/* Search Engine Selection */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-3">Select Search Engines</h3>
            <div className="flex flex-wrap gap-3">
              {searchEngines.map(engine => (
                <label 
                  key={engine.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                    selectedEngines.includes(engine.id)
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedEngines.includes(engine.id)}
                    onChange={() => handleEngineToggle(engine.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-medium">{engine.name}</span>
                  {engine.requiresAuth && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Requires API Key</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Notification Option */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={sendNotification}
                onChange={(e) => setSendNotification(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">Send notification after submission (Slack)</span>
            </label>
          </div>

          {/* Single URL Submission */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter URL to submit
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.houseplus-ch.com/en"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={submitSingleUrl}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Single URL'}
            </button>
            <button
              onClick={submitMainPages}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              Submit Main Pages ({mainUrls.length} URLs)
            </button>
            <button
              onClick={() => setShowPreview(showPreview === 'main' ? 'none' : 'main')}
              disabled={loading}
              className="px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors"
            >
              {showPreview === 'main' ? 'Hide Preview' : 'Preview'}
            </button>
          </div>
          
          {showPreview === 'main' && (
            <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Main Pages to Submit:</h4>
              <div className="max-h-40 overflow-y-auto text-sm text-gray-600">
                {mainUrls.map((u, i) => <div key={i}>{u}</div>)}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={submitAll}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
            >
              Submit All Pages ({allUrls.length} URLs)
            </button>
            <button
              onClick={() => setShowPreview(showPreview === 'all' ? 'none' : 'all')}
              disabled={loading}
              className="px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors"
            >
              {showPreview === 'all' ? 'Hide Preview' : 'Preview'}
            </button>
          </div>
          
          {showPreview === 'all' && (
            <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">All Pages to Submit:</h4>
              <div className="max-h-60 overflow-y-auto text-sm text-gray-600">
                {allUrls.map((u, i) => <div key={i}>{u}</div>)}
              </div>
            </div>
          )}

          {/* Progress */}
          {loading && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Submitting...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              Error: {error}
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {results.every(r => r.result?.success) ? '✅ All submissions successful!' : '📋 Results'}
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.map((res, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-sm mb-1">
                      Batch {res.batch}/{res.total} - {res.result?.success ? '✅ Success' : '⚠️ Completed'}
                    </div>
                    {res.result?.results && res.result.results.length > 0 && (
                      <div className="text-xs text-gray-500 space-y-1">
                        {res.result.results.map((engineResult: any, idx: number) => (
                          <div key={idx}>
                            {engineResult.engine}: {engineResult.success ? '✅' : '❌'} {engineResult.message}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      {res.urls.length} URLs submitted
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">How it works</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Statistics</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Total pages available: <strong>{allUrls.length}</strong></li>
                  <li>• Languages: 5 (en, es, de, fr, ar)</li>
                  <li>• Static pages: {staticPagesCount}</li>
                  <li>• Products: {productsCount}</li>
                  <li>• News articles: {newsCount}</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">📝 How to Add New Pages</h4>
                <ol className="list-decimal list-inside text-blue-700 text-sm space-y-1">
                  <li>Edit <code className="bg-blue-100 px-1.5 py-0.5 rounded">lib/urls.ts</code></li>
                  <li>Add new slug to <code>staticPageSlugs</code>, <code>productSlugs</code>, or <code>newsSlugs</code></li>
                  <li>Commit and deploy</li>
                  <li>Click "Submit All Pages" to notify search engines</li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">🔧 Webhook Configuration</h4>
                <p className="text-green-700 text-sm">
                  To enable Slack notifications, set the <code className="bg-green-100 px-1.5 py-0.5 rounded">SLACK_WEBHOOK_URL</code> environment variable in your deployment settings.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Supported Search Engines</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• <strong>Bing</strong>: Microsoft Bing Search Engine (no auth required)</li>
                  <li>• <strong>IndexNow</strong>: IndexNow Protocol (Bing, Yandex, etc.)</li>
                  <li>• <strong>Yandex</strong>: Yandex Search Engine (no auth required)</li>
                  <li>• <strong>Google</strong>: Google Search Console (requires API key)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
