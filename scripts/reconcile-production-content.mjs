import { mkdir, writeFile } from 'node:fs/promises';

const sitemapUrl = process.argv[2] || 'https://www.houseplus-ch.com/sitemap.xml';
const outDir = process.argv[3] || 'audit/reconcile-production';
const timeoutMs = Number(process.env.RECONCILE_TIMEOUT_MS || 30000);
const maxUrls = Number(process.env.RECONCILE_MAX_URLS || 25);

const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), timeoutMs);
let sitemapResponse;
try {
  sitemapResponse = await fetch(sitemapUrl, { signal: controller.signal, headers: { Accept: 'application/xml,text/xml' } });
} finally {
  clearTimeout(timer);
}

if (!sitemapResponse.ok) throw new Error(`Sitemap request failed: ${sitemapResponse.status}`);
const sitemapXml = await sitemapResponse.text();
const allUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (!allUrls.length) throw new Error('Sitemap contained no URLs');

const languageUrls = allUrls.filter((url) => /houseplus-ch\.com\/(en|es|de|fr|ar)(\/|$)/.test(url));
const representative = [...new Set([
  ...languageUrls.filter((url) => /\/(en|es|de|fr|ar)\/$/.test(url)).slice(0, 5),
  ...languageUrls.filter((url) => /\/products\//.test(url)).slice(0, 5),
  ...languageUrls.filter((url) => /\/news\//.test(url)).slice(0, 5),
  ...languageUrls.slice(0, maxUrls),
])].slice(0, maxUrls);

const checks = [];
for (const url of representative) {
  const started = Date.now();
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(timeoutMs), headers: { Accept: 'text/html' } });
  const html = await response.text();
  const expectedLang = new URL(url).pathname.split('/')[1];
  const langMatch = html.match(/<html[^>]*\slang=["']([^"']+)["']/i);
  checks.push({
    url,
    status: response.status,
    elapsedMs: Date.now() - started,
    htmlLang: langMatch?.[1] || null,
    expectedLang,
    langMatches: langMatch?.[1] === expectedLang,
  });
}

const result = {
  generatedAt: new Date().toISOString(),
  sitemapUrl,
  sitemapUrlCount: allUrls.length,
  localizedUrlCount: languageUrls.length,
  sampledUrlCount: checks.length,
  checks,
  failures: checks.filter((check) => check.status < 200 || check.status >= 400 || !check.langMatches),
};

await mkdir(outDir, { recursive: true });
await writeFile(`${outDir}/result.json`, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (result.failures.length) process.exitCode = 1;
