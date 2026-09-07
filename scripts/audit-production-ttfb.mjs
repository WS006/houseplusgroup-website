import { mkdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const sitemapUrl = process.argv[2] || 'https://www.houseplus-ch.com/sitemap.xml';
const outputDir = process.argv[3] || 'audit/production-ttfb';
const concurrency = 8;
const sitemap = await (await fetch(sitemapUrl, { signal: AbortSignal.timeout(30_000) })).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replace(/&amp;/g, '&'));
const results = [];
let cursor = 0;
function classify(url) {
  const path = new URL(url).pathname;
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 1) return 'home';
  if (path.includes('/products/')) return path.endsWith('/products/') ? 'product-list' : 'product-detail';
  if (path.includes('/news/')) return path.endsWith('/news/') ? 'news-list' : 'news-detail';
  if (path.includes('/regions/')) return parts.length > 2 ? 'region-detail' : 'regions-list';
  return parts[1] || 'other';
}
async function measure(url) {
  const format = '%{http_code}\t%{time_starttransfer}\t%{time_total}\t%{size_download}\t%{url_effective}\t%{content_type}\t%{header_json}';
  try {
    const { stdout } = await execFileAsync('curl', ['-sS', '-L', '--max-time', '45', '-A', 'HousePlusTTFBAudit/1.0', '-o', '/dev/null', '-w', format, url], { maxBuffer: 2 * 1024 * 1024 });
    const [status, ttfb, total, bytes, finalUrl, contentType, headerJson] = stdout.trim().split('\t');
    let headers = {};
    try { headers = JSON.parse(headerJson || '{}'); } catch {}
    const last = (name) => {
      const value = headers[name.toLowerCase()];
      return Array.isArray(value) ? value.at(-1) : value || '';
    };
    return { url, type: classify(url), status: Number(status), ttfbMs: Math.round(Number(ttfb) * 1000), totalMs: Math.round(Number(total) * 1000), bytes: Number(bytes), finalUrl, contentType, cacheControl: last('cache-control'), vercelCache: last('x-vercel-cache'), age: last('age') };
  } catch (error) {
    return { url, type: classify(url), status: 0, error: String(error.message || error) };
  }
}
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    const result = await measure(url);
    results.push(result);
    if (results.length % 50 === 0) console.log(`measured ${results.length}/${urls.length}`);
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));
results.sort((a, b) => (b.ttfbMs || 0) - (a.ttfbMs || 0));
const valid = results.filter(r => r.status >= 200 && r.status < 400 && r.ttfbMs != null);
const byType = Object.fromEntries([...new Set(results.map(r => r.type))].sort().map(type => {
  const rows = valid.filter(r => r.type === type);
  const values = rows.map(r => r.ttfbMs).sort((a, b) => a - b);
  const percentile = (p) => values.length ? values[Math.min(values.length - 1, Math.floor(values.length * p))] : null;
  return [type, { pages: rows.length, minMs: values[0] ?? null, medianMs: percentile(0.5), p75Ms: percentile(0.75), p95Ms: percentile(0.95), maxMs: values.at(-1) ?? null, over2s: values.filter(v => v > 2000).length, over5s: values.filter(v => v > 5000).length }];
}));
const summary = { generatedAt: new Date().toISOString(), sitemapUrl, auditedUrls: urls.length, successful: valid.length, failed: results.length - valid.length, overall: { medianMs: valid.map(r => r.ttfbMs).sort((a,b)=>a-b)[Math.floor(valid.length * 0.5)] || null, p95Ms: valid.map(r => r.ttfbMs).sort((a,b)=>a-b)[Math.floor(valid.length * 0.95)] || null, over2s: valid.filter(r => r.ttfbMs > 2000).length, over5s: valid.filter(r => r.ttfbMs > 5000).length }, byType, slowest: results.slice(0, 30) };
await mkdir(outputDir, { recursive: true });
await writeFile(`${outputDir}/summary.json`, JSON.stringify(summary, null, 2));
await writeFile(`${outputDir}/results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(summary, null, 2));
