import { mkdir, readFile, writeFile } from 'node:fs/promises';

const sitemapPath = process.argv[2] || '/tmp/houseplus-sitemap.xml';
const outputDir = process.argv[3] || './audit/metadata-production';
const concurrency = 12;

function decodeHtml(value = '') {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function attribute(tag, name) {
  return tag?.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] || '';
}

function parseHtml(url, status, html) {
  const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
  const descriptionTag = html.match(/<meta\s+[^>]*name=["']description["'][^>]*>/i)?.[0]
    || html.match(/<meta\s+[^>]*content=["'][^"']*["'][^>]*name=["']description["'][^>]*>/i)?.[0];
  const canonicalTag = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i)?.[0]
    || html.match(/<link\s+[^>]*href=["'][^"']*["'][^>]*rel=["']canonical["'][^>]*>/i)?.[0];
  const htmlTag = html.match(/<html\s+[^>]*>/i)?.[0];
  return {
    url,
    status,
    title,
    description: decodeHtml(attribute(descriptionTag, 'content')),
    canonical: attribute(canonicalTag, 'href'),
    lang: attribute(htmlTag, 'lang'),
  };
}

async function fetchPage(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'user-agent': 'HousePlusMetadataAudit/1.0 (+https://www.houseplus-ch.com/)' },
    });
    return parseHtml(url, response.status, await response.text());
  } catch (error) {
    return { url, status: 0, title: '', description: '', canonical: '', lang: '', error: String(error.message || error) };
  } finally {
    clearTimeout(timer);
  }
}

async function pool(items, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await worker(items[index]);
    }
  }));
  return results;
}

function duplicateGroups(rows, field) {
  const groups = new Map();
  for (const row of rows) {
    const value = row[field];
    if (!value) continue;
    groups.set(value, [...(groups.get(value) || []), row.url]);
  }
  return [...groups.entries()]
    .filter(([, urls]) => urls.length > 1)
    .map(([value, urls]) => ({ value, count: urls.length, urls }));
}

function csvValue(value = '') {
  return `"${String(value).replaceAll('"', '""')}"`;
}

const sitemap = await readFile(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const rows = await pool(urls, fetchPage);
const successful = rows.filter((row) => row.status >= 200 && row.status < 400);
const summary = {
  generatedAt: new Date().toISOString(),
  totalUrls: urls.length,
  successfulUrls: successful.length,
  failedUrls: rows.filter((row) => !(row.status >= 200 && row.status < 400)),
  missingTitle: successful.filter((row) => !row.title).map((row) => row.url),
  missingDescription: successful.filter((row) => !row.description).map((row) => row.url),
  duplicateTitles: duplicateGroups(successful, 'title'),
  duplicateDescriptions: duplicateGroups(successful, 'description'),
};

await mkdir(outputDir, { recursive: true });
await writeFile(`${outputDir}/production-metadata-rows.csv`, [
  'url,status,lang,canonical,title,description,error',
  ...rows.map((row) => ['url', 'status', 'lang', 'canonical', 'title', 'description', 'error'].map((key) => csvValue(row[key])).join(',')),
].join('\n'));
await writeFile(`${outputDir}/production-metadata-summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({
  total: summary.totalUrls,
  successful: summary.successfulUrls,
  failed: summary.failedUrls.length,
  missingTitle: summary.missingTitle.length,
  missingDescription: summary.missingDescription.length,
  duplicateTitleGroups: summary.duplicateTitles.length,
  duplicateDescriptionGroups: summary.duplicateDescriptions.length,
}, null, 2));
