import { mkdir, writeFile } from 'node:fs/promises';

const locales = ['en', 'es', 'de', 'fr', 'ar'];
const sitemapUrl = process.argv[2] || 'https://www.houseplus-ch.com/sitemap.xml';
const outputDir = process.argv[3] || '/tmp/houseplus-localization-audit';
const concurrency = 8;

const normalize = (value = '') => value.replace(/\s+/g, ' ').trim();
const decodeXml = (value) => value.replace(/&amp;/g, '&');
const extractAttribute = (tag, attribute) => tag.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, 'i'))?.[1] || '';

function getLocale(url) {
  const match = new URL(url).pathname.match(/^\/(en|es|de|fr|ar)(?:\/|$)/);
  return match?.[1] || null;
}

function getTag(html, pattern) {
  return html.match(pattern)?.[1] || '';
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(url, {
      headers: { 'user-agent': 'HousePlusLocalizationAudit/1.0 (+https://www.houseplus-ch.com/)' },
      redirect: 'follow',
      signal: controller.signal,
    });
    return { response, text: await response.text() };
  } finally {
    clearTimeout(timeout);
  }
}

function inspectDocument(requestedUrl, finalUrl, html) {
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  const title = normalize(getTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const description = normalize(getTag(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)
    || getTag(html, /<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i));
  const canonicalTag = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)?.[0]
    || html.match(/<link\b[^>]*href=["'][^"']+["'][^>]*rel=["']canonical["'][^>]*>/i)?.[0]
    || '';
  const canonical = extractAttribute(canonicalTag, 'href');
  const requestedLocale = getLocale(requestedUrl);
  const finalLocale = getLocale(finalUrl);
  const hreflangTags = html.match(/<link\b[^>]*hreflang=["'][^"']+["'][^>]*>/gi) || [];
  const hreflangs = new Set(hreflangTags.map((tag) => extractAttribute(tag, 'hreflang').toLowerCase()));
  const issues = [];

  if (!title) issues.push('missing_title');
  if (!description) issues.push('missing_description');
  if (!requestedLocale) issues.push('unrecognized_locale_url');
  if (requestedLocale && finalLocale && requestedLocale !== finalLocale) issues.push(`cross_locale_redirect:${finalLocale}`);
  if (requestedLocale && extractAttribute(htmlTag, 'lang') !== requestedLocale) issues.push(`html_lang:${extractAttribute(htmlTag, 'lang') || 'missing'}`);
  if (requestedLocale === 'ar' && extractAttribute(htmlTag, 'dir') !== 'rtl') issues.push(`arabic_dir:${extractAttribute(htmlTag, 'dir') || 'missing'}`);
  if (requestedLocale && canonical && getLocale(canonical) !== requestedLocale) issues.push(`canonical_locale:${getLocale(canonical) || 'missing'}`);
  if (hreflangs.length && !locales.every((locale) => hreflangs.has(locale))) issues.push(`incomplete_hreflang:${[...hreflangs].sort().join(',')}`);

  return { requestedUrl, finalUrl, locale: requestedLocale, title, description, canonical, hreflangs: [...hreflangs].sort(), issues };
}

const sitemap = (await fetchText(sitemapUrl)).text;
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeXml(match[1]));
const queue = [...new Set(urls)].filter((url) => getLocale(url));
const results = [];
let cursor = 0;

async function worker() {
  while (cursor < queue.length) {
    const url = queue[cursor++];
    try {
      const { response, text } = await fetchText(url);
      if (!response.ok) {
        results.push({ requestedUrl: url, locale: getLocale(url), issues: [`http_${response.status}`] });
        continue;
      }
      results.push(inspectDocument(url, response.url, text));
    } catch (error) {
      results.push({ requestedUrl: url, locale: getLocale(url), issues: [`fetch_error:${error.name}`] });
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
results.sort((a, b) => a.requestedUrl.localeCompare(b.requestedUrl));

const byLocale = Object.fromEntries(locales.map((locale) => {
  const rows = results.filter((row) => row.locale === locale);
  const issues = rows.flatMap((row) => row.issues.map((issue) => ({ url: row.requestedUrl, issue })));
  return [locale, {
    pages: rows.length,
    pagesWithIssues: new Set(issues.map((entry) => entry.url)).size,
    issueCounts: Object.fromEntries([...new Set(issues.map((entry) => entry.issue))].sort().map((issue) => [issue, issues.filter((entry) => entry.issue === issue).length])),
  }];
}));

const summary = {
  generatedAt: new Date().toISOString(),
  sitemapUrl,
  auditedUrls: results.length,
  localeSummary: byLocale,
  pagesWithIssues: results.filter((row) => row.issues.length),
};

await mkdir(outputDir, { recursive: true });
await writeFile(`${outputDir}/localization-summary.json`, JSON.stringify(summary, null, 2));
await writeFile(`${outputDir}/localization-pages.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify({ auditedUrls: summary.auditedUrls, localeSummary: byLocale, pagesWithIssues: summary.pagesWithIssues.length }, null, 2));
