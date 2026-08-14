import { mkdir, readFile, writeFile } from 'node:fs/promises';

const BASE_URL = process.argv[2] || 'https://www.houseplus-ch.com';
const OUT_DIR = process.argv[3] || '/tmp/houseplus-product-seo-schema-audit';
const locales = ['en', 'es', 'de', 'fr', 'ar'];
const ogLocales = { en: 'en_US', es: 'es_ES', de: 'de_DE', fr: 'fr_FR', ar: 'ar_SA' };
const source = await readFile(new URL('../lib/product-data.ts', import.meta.url), 'utf8');
const slugs = [...source.matchAll(/^  '([^']+)': \{/gm)].map((match) => match[1]);
const urls = locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug, url: `${BASE_URL}/${lang}/products/${slug}` })));

const normalize = (url) => url.replace(/\/$/, '');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)].map((match) => [match[1], match[2] ?? match[3] ?? '']));
const tags = (html, selector) => [...html.matchAll(selector)].map((match) => attrs(match[0]));
const meta = (html, property) => tags(html, /<meta\b[^>]*>/gi).find((item) => item.property === property || item.name === property)?.content;
const links = (html) => tags(html, /<link\b[^>]*>/gi);
const parseSchemas = (html) => [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap((match) => {
  try {
    const value = JSON.parse(match[1]);
    return Array.isArray(value) ? value : [value];
  } catch {
    return [];
  }
});
const schemaType = (schema, type) => Array.isArray(schema?.['@type']) ? schema['@type'].includes(type) : schema?.['@type'] === type;

async function fetchPage(item) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(item.url, { signal: controller.signal, redirect: 'follow', headers: { 'user-agent': 'HousePlus-Product-SEO-Audit/1.0' } });
    const html = await response.text();
    return { ...item, status: response.status, html };
  } catch (error) {
    return { ...item, status: 0, error: error.name === 'AbortError' ? 'timeout' : error.message };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
let index = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (index < urls.length) {
    const item = urls[index++];
    results.push(await fetchPage(item));
  }
}));

const audited = results.map((page) => {
  const issues = [];
  if (page.status !== 200) return { ...page, issues: [`HTTP ${page.status || page.error}`] };
  const expectedUrl = `${BASE_URL}/${page.lang}/products/${page.slug}`;
  const title = page.html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = meta(page.html, 'description');
  const canonical = links(page.html).find((item) => item.rel === 'canonical')?.href;
  const hreflang = Object.fromEntries(links(page.html)
    .filter((item) => item.rel === 'alternate' && (item.hreflang || item.hrefLang))
    .map((item) => [item.hreflang || item.hrefLang, item.href]));
  if (!title) issues.push('Missing title');
  if (!description) issues.push('Missing meta description');
  if (!canonical || normalize(canonical) !== normalize(expectedUrl)) issues.push('Canonical mismatch');
  for (const lang of locales) if (normalize(hreflang[lang] || '') !== normalize(`${BASE_URL}/${lang}/products/${page.slug}`)) issues.push(`Missing or incorrect hreflang ${lang}`);
  if (normalize(hreflang['x-default'] || '') !== normalize(`${BASE_URL}/en/products/${page.slug}`)) issues.push('Missing or incorrect hreflang x-default');
  if (meta(page.html, 'og:title') !== title) issues.push('Open Graph title mismatch');
  if (meta(page.html, 'og:description') !== description) issues.push('Open Graph description mismatch');
  if (normalize(meta(page.html, 'og:url') || '') !== normalize(expectedUrl)) issues.push('Open Graph URL mismatch');
  if (meta(page.html, 'og:locale') !== ogLocales[page.lang]) issues.push('Open Graph locale mismatch');
  for (const property of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) if (!meta(page.html, property)) issues.push(`Missing ${property}`);
  const schemas = parseSchemas(page.html);
  const product = schemas.find((schema) => schemaType(schema, 'Product'));
  const faq = schemas.find((schema) => schemaType(schema, 'FAQPage'));
  if (!product) issues.push('Missing Product JSON-LD');
  if (product) {
    if (product.inLanguage !== page.lang) issues.push('Product inLanguage mismatch');
    if (normalize(product.url || '') !== normalize(expectedUrl)) issues.push('Product URL mismatch');
    if (normalize(product.mainEntityOfPage?.['@id'] || '') !== normalize(expectedUrl)) issues.push('Product mainEntityOfPage mismatch');
    const image = product.imageObject;
    if (!image || !schemaType(image, 'ImageObject')) issues.push('Missing Product ImageObject');
    if (image?.inLanguage !== page.lang) issues.push('ImageObject inLanguage mismatch');
    for (const property of ['creditText', 'copyrightNotice', 'creator', 'acquireLicensePage']) if (!image?.[property]) issues.push(`Missing ImageObject ${property}`);
  }
  if (!faq) issues.push('Missing FAQPage JSON-LD');
  if (faq?.inLanguage !== page.lang) issues.push('FAQPage inLanguage mismatch');
  return { ...page, title, description, canonical, issues };
});

const issuePages = audited.filter((page) => page.issues.length);
const summary = {
  generatedAt: new Date().toISOString(),
  totalPages: audited.length,
  totalProducts: slugs.length,
  locales,
  passedPages: audited.length - issuePages.length,
  issuePages: issuePages.length,
  timeoutPages: audited.filter((page) => page.error === 'timeout').length,
  issueBreakdown: Object.fromEntries(Object.entries(Object.groupBy(issuePages.flatMap((page) => page.issues), (issue) => issue)).map(([issue, items]) => [issue, items.length])),
};

await mkdir(OUT_DIR, { recursive: true });
await writeFile(`${OUT_DIR}/summary.json`, JSON.stringify(summary, null, 2));
await writeFile(`${OUT_DIR}/issues.json`, JSON.stringify(issuePages.map(({ html, ...page }) => page), null, 2));
console.log(JSON.stringify(summary, null, 2));
