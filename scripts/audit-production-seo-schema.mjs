import { mkdir, readFile, writeFile } from 'node:fs/promises';

const sitemapSource = process.argv[2] || 'https://www.houseplus-ch.com/sitemap.xml';
const outputDir = process.argv[3] || './audit/seo-schema-production';
const locales = ['en', 'es', 'de', 'fr', 'ar'];
const localeMap = { en: 'en_US', es: 'es_ES', de: 'de_DE', fr: 'fr_FR', ar: 'ar_SA' };
const concurrency = 10;

const decode = (value = '') => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const attr = (tag = '', name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] || '';
const localeForUrl = (url) => new URL(url).pathname.split('/').filter(Boolean)[0] || 'en';
function normalizedUrl(url) {
  const parsed = new URL(url);
  parsed.pathname = parsed.pathname.replace(/\/+$/, '') || '/';
  return parsed.toString();
}

function metaMap(html) {
  const map = new Map();
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const key = attr(tag, 'property') || attr(tag, 'name');
    if (key) map.set(key.toLowerCase(), decode(attr(tag, 'content')));
  }
  return map;
}

function links(html) {
  return (html.match(/<link\b[^>]*>/gi) || []).map((tag) => ({ rel: attr(tag, 'rel').toLowerCase(), hreflang: attr(tag, 'hreflang').toLowerCase(), href: attr(tag, 'href') }));
}

function walkSchema(value, result = []) {
  if (Array.isArray(value)) value.forEach((item) => walkSchema(item, result));
  else if (value && typeof value === 'object') {
    if (value['@type']) result.push({ type: Array.isArray(value['@type']) ? value['@type'].join('|') : value['@type'], inLanguage: value.inLanguage || '', url: value.url || '' });
    Object.values(value).forEach((item) => walkSchema(item, result));
  }
  return result;
}

function schemas(html) {
  const items = [];
  const parseErrors = [];
  for (const script of html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || []) {
    const json = script.replace(/^.*?>/s, '').replace(/<\/script>$/i, '').trim();
    try { walkSchema(JSON.parse(json), items); } catch { parseErrors.push(json.slice(0, 120)); }
  }
  return { items, parseErrors };
}

function issue(code, detail = '') { return { code, detail }; }

function auditHtml(url, status, html) {
  const locale = localeForUrl(url);
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
  const meta = metaMap(html);
  const alternate = links(html).filter((link) => link.rel.includes('alternate') && link.hreflang);
  const canonical = links(html).find((link) => link.rel.includes('canonical'))?.href || '';
  const schema = schemas(html);
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  const errors = [];
  const warnings = [];
  const description = meta.get('description') || '';
  const expectedAlternates = [...locales, 'x-default'];
  const alternateLanguages = alternate.map((link) => link.hreflang);

  if (!title) errors.push(issue('missing_title'));
  if (!description) errors.push(issue('missing_description'));
  if (!canonical) errors.push(issue('missing_canonical'));
  else if (normalizedUrl(canonical) !== normalizedUrl(url)) errors.push(issue('canonical_mismatch', canonical));
  if (attr(htmlTag, 'lang') !== locale) errors.push(issue('html_lang_mismatch', attr(htmlTag, 'lang')));
  if (locale === 'ar' && attr(htmlTag, 'dir') !== 'rtl') errors.push(issue('arabic_dir_missing', attr(htmlTag, 'dir')));
  for (const expected of expectedAlternates) if (!alternateLanguages.includes(expected)) errors.push(issue('missing_hreflang', expected));
  for (const link of alternate) {
    if (locales.includes(link.hreflang) && localeForUrl(link.href) !== link.hreflang) errors.push(issue('hreflang_url_mismatch', `${link.hreflang}:${link.href}`));
  }

  const expectedOg = { 'og:title': title, 'og:description': description, 'og:url': canonical, 'og:locale': localeMap[locale] };
  for (const [key, expected] of Object.entries(expectedOg)) {
    if (!meta.get(key)) errors.push(issue('missing_open_graph', key));
    else if (expected && meta.get(key) !== expected) warnings.push(issue('open_graph_mismatch', key));
  }
  if (!meta.get('og:image')) warnings.push(issue('missing_open_graph', 'og:image'));
  for (const key of ['twitter:card', 'twitter:title', 'twitter:description']) if (!meta.get(key)) warnings.push(issue('missing_twitter', key));
  else if ((key === 'twitter:title' && meta.get(key) !== title) || (key === 'twitter:description' && meta.get(key) !== description)) warnings.push(issue('twitter_mismatch', key));

  if (!schema.items.length) errors.push(issue('missing_json_ld'));
  if (schema.parseErrors.length) errors.push(issue('invalid_json_ld', String(schema.parseErrors.length)));
  for (const item of schema.items.filter((item) => /WebPage|Product|Article/.test(item.type))) {
    if (item.inLanguage && item.inLanguage !== locale) errors.push(issue('schema_language_mismatch', `${item.type}:${item.inLanguage}`));
    if (!item.inLanguage) warnings.push(issue('schema_language_missing', item.type));
  }

  return { url, locale, status, title, description, canonical, htmlLang: attr(htmlTag, 'lang'), htmlDir: attr(htmlTag, 'dir'), og: Object.fromEntries([...meta].filter(([key]) => key.startsWith('og:'))), twitter: Object.fromEntries([...meta].filter(([key]) => key.startsWith('twitter:'))), hreflang: alternate, schemaTypes: [...new Set(schema.items.map((item) => item.type))], errors, warnings };
}

async function fetchPage(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try { const response = await fetch(url, { signal: controller.signal, headers: { 'user-agent': 'HousePlusSeoSchemaAudit/1.0 (+https://www.houseplus-ch.com/)' } }); return auditHtml(url, response.status, await response.text()); }
  catch (error) { return { url, locale: localeForUrl(url), status: 0, errors: [issue('fetch_failed', String(error.message || error))], warnings: [] }; }
  finally { clearTimeout(timer); }
}

async function pool(items) {
  const output = new Array(items.length); let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => { while (true) { const index = cursor++; if (index >= items.length) return; output[index] = await fetchPage(items[index]); } }));
  return output;
}

const sitemap = sitemapSource.startsWith('http') ? await (await fetch(sitemapSource)).text() : await readFile(sitemapSource, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const rows = await pool(urls);
const languageSummary = Object.fromEntries(locales.map((locale) => {
  const set = rows.filter((row) => row.locale === locale);
  return [locale, { pages: set.length, errorPages: set.filter((row) => row.errors.length).length, warningPages: set.filter((row) => row.warnings.length).length, errors: set.flatMap((row) => row.errors.map((entry) => entry.code)).reduce((counts, code) => ({ ...counts, [code]: (counts[code] || 0) + 1 }), {}), warnings: set.flatMap((row) => row.warnings.map((entry) => entry.code)).reduce((counts, code) => ({ ...counts, [code]: (counts[code] || 0) + 1 }), {}) }];
}));
const summary = { generatedAt: new Date().toISOString(), totalUrls: urls.length, successfulUrls: rows.filter((row) => row.status >= 200 && row.status < 400).length, languageSummary, errorPages: rows.filter((row) => row.errors.length), warningPages: rows.filter((row) => row.warnings.length) };
await mkdir(outputDir, { recursive: true });
await writeFile(`${outputDir}/summary.json`, JSON.stringify(summary, null, 2));
await writeFile(`${outputDir}/rows.json`, JSON.stringify(rows, null, 2));
console.log(JSON.stringify({ totalUrls: summary.totalUrls, successfulUrls: summary.successfulUrls, languages: Object.fromEntries(Object.entries(languageSummary).map(([locale, value]) => [locale, { pages: value.pages, errorPages: value.errorPages, warningPages: value.warningPages }])), errors: summary.errorPages.length, warnings: summary.warningPages.length }, null, 2));
