'use client';

import { useState } from 'react';

export default function IndexNowPage() {
  const [url, setUrl] = useState('https://www.houseplus-ch.com/en');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const submitUrls = async (urlsToSubmit: string[]) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlsToSubmit }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const submitSingleUrl = () => {
    submitUrls([url]);
  };

  const submitAllUrls = () => {
    const allUrls = [
      'https://www.houseplus-ch.com/',
      'https://www.houseplus-ch.com/en',
      'https://www.houseplus-ch.com/en/about-us',
      'https://www.houseplus-ch.com/en/products',
      'https://www.houseplus-ch.com/en/news',
      'https://www.houseplus-ch.com/en/contact',
      'https://www.houseplus-ch.com/es',
      'https://www.houseplus-ch.com/de',
      'https://www.houseplus-ch.com/fr',
      'https://www.houseplus-ch.com/ar',
    ];
    submitUrls(allUrls);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            IndexNow URL Submission Tool
          </h1>

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

          <div className="flex gap-4 mb-8">
            <button
              onClick={submitSingleUrl}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Single URL'}
            </button>
            <button
              onClick={submitAllUrls}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              Submit All Main URLs
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              Error: {error}
            </div>
          )}

          {result && (
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {result.success ? '✅ Success!' : '⚠️ Result'}
              </h2>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">How it works</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• IndexNow is a protocol to instantly notify search engines of new or updated content</li>
              <li>• Your verification key: <code className="bg-gray-100 px-2 py-1 rounded">084fadfd7e4a435b942858f905846430</code></li>
              <li>• Verification file available at: <code className="bg-gray-100 px-2 py-1 rounded">https://www.houseplus-ch.com/084fadfd7e4a435b942858f905846430.txt</code></li>
              <li>• Supported search engines: Bing, Yandex, and more</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
