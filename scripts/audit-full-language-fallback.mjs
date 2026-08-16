import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.argv[2] || 'https://www.houseplus-ch.com';
const outputDir = process.argv[3] || path.join(process.cwd(), 'audit', 'full-language-fallback');
const locales = ['es', 'de', 'fr', 'ar'];

const productRegistry = JSON.parse(await readFile(path.join(process.cwd(), 'lib', 'localized-content', 'products.json'), 'utf8'));
const articleRegistry = JSON.parse(await readFile(path.join(process.cwd(), 'lib', 'localized-content', 'articles.json'), 'utf8'));
const productSlugs = Object.entries(productRegistry)
  .filter(([, value]) => value && typeof value === 'object' && locales.some((locale) => value[locale] && typeof value[locale] === 'object' && value[locale].name))
  .map(([slug]) => slug);
const articleSlugs = Object.entries(articleRegistry)
  .filter(([, value]) => value && typeof value === 'object' && locales.some((locale) => value[locale] && typeof value[locale] === 'object' && value[locale].title))
  .map(([slug]) => slug);

const routePaths = [
  '',
  'about-us', 'author/jack-hu', 'brand', 'careers', 'case-studies', 'certifications', 'contact', 'cookie-policy', 'factory', 'faq',
  'news', 'oem-odm', 'privacy', 'products', 'regions', 'service', 'sitemap-page', 'support', 'team', 'terms',
  'news/2026-appliances-market-update', 'news/2026-electronics-market-update', 'news/2026-smart-home-appliances-market-guide', 'news/2026-solar-market-update',
  'news/advanced-manufacturing-home-appliances', 'news/appliance-energy-efficiency-vs-actual-consumption', 'news/consumer-electronics-battery-life-testing',
  'news/energy-efficiency-standards-appliances', 'news/global-wholesale-guide-home-appliances', 'news/oem-odm-manufacturing-guide', 'news/smart-home-appliances',
  'news/solar-energy-storage-industrial-manufacturing', 'news/solar-energy-storage-solutions', 'news/solar-storage-efficiency-optimization-guide',
  'news/the-evolution-of-3c-electronics', 'news/the-future-of-smart-home-appliances', 'news/the-future-of-solar-energy',
  'regions/africa', 'regions/southeast_asia', 'regions/europe', 'regions/ng',
  ...productSlugs.map((slug) => `products/${slug}`),
  ...articleSlugs.map((slug) => `news/${slug}`),
];

const stopWords = new Set([
  'and', 'are', 'can', 'contact', 'for', 'from', 'get', 'have', 'more', 'our', 'please', 'the', 'this', 'we', 'with', 'you', 'your',
]);
const allowedTokens = new Set([
  'b2b', 'ce', 'cif', 'ddp', 'dhl', 'eu', 'exw', 'fcc', 'fcl', 'fob', 'houseplus', 'iec', 'iso', 'l', 'lcd', 'li', 'lifepo', 'moq', 'oem', 'odm', 'pdf', 'qc', 'rohs', 'saso', 'sku', 'tws', 'uv', 'whatsapp',
]);

function stripHtml(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  return main
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|#39);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function englishRuns(text) {
  const candidates = [];
  for (const asciiSegment of text.split(/[^\x00-\x7F]+/)) {
    const tokens = asciiSegment.match(/[A-Za-z][A-Za-z'-]*/g) || [];
    let run = [];
    for (const token of tokens) {
      const normalized = token.toLowerCase();
      if (allowedTokens.has(normalized) || /^[a-z]{1,2}$/.test(normalized) && !stopWords.has(normalized)) {
        if (run.length) {
          candidates.push(run);
          run = [];
        }
        continue;
      }
      run.push(normalized);
    }
    if (run.length) candidates.push(run);
  }
  return candidates
    .filter((run) => run.length >= 5 && run.filter((word) => stopWords.has(word)).length >= 2)
    .map((run) => run.join(' '));
}

async function fetchHtml(url) {
  const isLocal = /^http:\/\/(?:localhost|127\.0\.0\.1)/.test(url);
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
    headers: isLocal ? { 'x-forwarded-proto': 'https' } : undefined,
  });
  return { status: response.status, finalUrl: response.url, html: await response.text() };
}

const jobs = routePaths.flatMap((route) => locales.map((locale) => ({ locale, route })));
const checks = [];
for (let start = 0; start < jobs.length; start += 8) {
  const batch = await Promise.all(jobs.slice(start, start + 8).map(async ({ locale, route }) => {
    const url = `${baseUrl}/${locale}${route ? `/${route}` : ''}`;
    try {
      const result = await fetchHtml(url);
      const mainText = stripHtml(result.html);
      const matches = englishRuns(mainText);
      return {
        locale,
        route: `/${locale}${route ? `/${route}` : ''}`,
        status: result.status,
        finalUrl: result.finalUrl,
        mainTextBytes: Buffer.byteLength(mainText),
        suspectedEnglishRuns: [...new Set(matches)].slice(0, 16),
        suspectedEnglishRunCount: matches.length,
        pass: result.status === 200 && matches.length === 0,
      };
    } catch (error) {
      return { locale, route: `/${locale}${route ? `/${route}` : ''}`, status: 0, pass: false, error: error instanceof Error ? error.message : String(error) };
    }
  }));
  checks.push(...batch);
}

const report = {
  baseUrl,
  checkedAt: new Date().toISOString(),
  expectedChecks: checks.length,
  passed: checks.filter((check) => check.pass).length,
  failed: checks.filter((check) => !check.pass),
  checks,
};
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'full-language-fallback.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ expectedChecks: report.expectedChecks, passed: report.passed, failed: report.failed.length }, null, 2));
if (report.failed.length) process.exitCode = 1;
