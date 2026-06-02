'use client';

import { useState } from 'react';

const baseUrl = 'https://www.houseplus-ch.com';
const locales = ['en', 'es', 'de', 'fr', 'ar'];

// Main pages
const staticPages = [
  '', // homepage
  'about-us',
  'products',
  'news',
  'factory',
  'service',
  'faq',
  'contact',
  'team',
  'careers',
  'support',
  'privacy',
  'terms',
  'cookie-policy',
  'sitemap-page',
];

// Products
const productSlugs = [
  'headphone-over-ear',
  'smart-watch',
  'usb-c-cable-2m',
  'solar-power-bank-20000mah',
  'bluetooth-earphone-tws',
  'portable-ssd-1tb',
  'micro-sd-128gb',
  'induction-cooktop-2000w',
  'electric-kettle-1-5l',
  'toaster-2-slice',
  'air-fryer-5-8l',
  'solar-fan-20w',
  'solar-street-light-200w',
  'charge-controller-60a',
  'lead-acid-battery-100ah',
  'lithium-battery-5kwh',
  'solar-inverter-3kw',
  'solar-panel-500w',
];

// News pages
const newsSlugs = [
  '2026-solar-market-update',
  '2026-appliances-market-update',
  '2026-electronics-market-update',
  '2026-smart-home-appliances-market-guide',
  'advanced-manufacturing-home-appliances',
  'energy-efficiency-standards-appliances',
  'global-wholesale-guide-home-appliances',
  'oem-odm-manufacturing-guide',
  'smart-home-appliances',
  'solar-energy-storage-industrial-manufacturing',
  'solar-energy-storage-solutions',
  'the-evolution-of-3c-electronics',
  'the-future-of-smart-home-appliances',
  'the-future-of-solar-energy',
];

function generateAllUrls() {
  const urls: string[] = [];

  // Generate URLs for static pages (all languages)
  for (const lang of locales) {
    for (const page of staticPages) {
      const url = page ? `${baseUrl}/${lang}/${page}` : `${baseUrl}/${lang}`;
      urls.push(url);
    }

    // Generate product URLs (all languages)
    for (const product of productSlugs) {
      urls.push(`${baseUrl}/${lang}/products/${product}`);
    }

    // Generate news URLs (all languages)
    for (const news of newsSlugs) {
      urls.push(`${baseUrl}/${lang}/news/${news}`);
    }
  }

  // Root homepage (without lang prefix)
  urls.push(baseUrl);

  return urls;
}

function generateMainPageUrls() {
  const urls: string[] = [];
  // 根域名首页
  urls.push(baseUrl);
  // 每种语言的首页和主要页面
  for (const lang of locales) {
    urls.push(`${baseUrl}/${lang}`);
    urls.push(`${baseUrl}/${lang}/about-us`);
    urls.push(`${baseUrl}/${lang}/products`);
    urls.push(`${baseUrl}/${lang}/news`);
    urls.push(`${baseUrl}/${lang}/factory`);
    urls.push(`${baseUrl}/${lang}/service`);
    urls.push(`${baseUrl}/${lang}/faq`);
    urls.push(`${baseUrl}/${lang}/contact`);
  }
  return urls;
}

export default function IndexNowPage() {
  const [url, setUrl] = useState('https://www.houseplus-ch.com/en');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<'none' | 'main' | 'all'>('none');

  const allUrls = generateAllUrls();
  const mainUrls = generateMainPageUrls();

  const submitUrls = async (urlsToSubmit: string[]) => {
    setLoading(true);
    setError(null);
    setResults([]);
    setProgress(0);
    setShowPreview('none');

    // Split into batches
    const batchSize = 100;
    const batches: string[][] = [];
    
    for (let i = 0; i < urlsToSubmit.length; i += batchSize) {
      batches.push(urlsToSubmit.slice(i, i + batchSize));
    }

    // Submit batches sequentially
    const submitBatch = async (index: number) => {
      if (index >= batches.length) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/indexnow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ urls: batches[index] }),
        });

        const data = await response.json();
        setResults(prev => [...prev, { batch: index + 1, total: batches.length, urls: batches[index], result: data }]);
        setProgress(Math.round(((index + 1) / batches.length) * 100));
        
        // Next batch after delay
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
          
          {/* Main Pages Preview */}
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
          
          {/* All Pages Preview */}
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
                    <div className="text-xs text-gray-500">
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
                  <li>• Languages: {locales.join(', ')}</li>
                  <li>• Static pages: {staticPages.length}</li>
                  <li>• Products: {productSlugs.length}</li>
                  <li>• News articles: {newsSlugs.length}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">IndexNow Details</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• IndexNow is a protocol to instantly notify search engines of new or updated content</li>
                  <li>• Your verification key: <code className="bg-gray-100 px-2 py-0.5 rounded">084fadfd7e4a435b942858f905846430</code></li>
                  <li>• Verification file: <a href={`${baseUrl}/084fadfd7e4a435b942858f905846430.txt`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View file</a></li>
                  <li>• Supported search engines: Bing, Yandex, and more</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
