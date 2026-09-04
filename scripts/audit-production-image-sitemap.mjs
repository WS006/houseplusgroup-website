import { mkdir, writeFile } from 'node:fs/promises';

const sitemapUrl = process.argv[2] || 'https://www.houseplus-ch.com/image-sitemap.xml';
const outputDir = process.argv[3] || 'audit/image-sitemap-production';
const concurrency = 12;
const headers = { 'user-agent': 'HousePlusImageSitemapAudit/1.0' };

const sitemapResponse = await fetch(sitemapUrl, { headers });
if (!sitemapResponse.ok) throw new Error(`Sitemap ${sitemapUrl} returned HTTP ${sitemapResponse.status}`);
const xml = await sitemapResponse.text();
const imageUrls = [...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1]);
const uniqueImageUrls = [...new Set(imageUrls)];

let cursor = 0;
const results = [];
async function worker() {
  while (cursor < uniqueImageUrls.length) {
    const url = uniqueImageUrls[cursor++];
    try {
      const response = await fetch(url, { headers });
      const contentType = response.headers.get('content-type') || '';
      const contentLength = Number(response.headers.get('content-length') || 0);
      results.push({ url, status: response.status, contentType, contentLength, cacheControl: response.headers.get('cache-control') || '' });
      await response.body?.cancel();
    } catch (error) {
      results.push({ url, status: 0, error: String(error) });
    }
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));
results.sort((a, b) => a.url.localeCompare(b.url));
const invalid = results.filter((item) => item.status < 200 || item.status >= 400 || !item.contentType.startsWith('image/'));
const summary = {
  generatedAt: new Date().toISOString(),
  sitemapUrl,
  sitemapImageEntries: imageUrls.length,
  uniqueImageUrls: uniqueImageUrls.length,
  checked: results.length,
  invalidCount: invalid.length,
  invalid,
};
await mkdir(outputDir, { recursive: true });
await writeFile(`${outputDir}/summary.json`, JSON.stringify(summary, null, 2));
await writeFile(`${outputDir}/resources.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (invalid.length) process.exitCode = 1;
