import { mkdir, writeFile } from 'node:fs/promises';

const BASE_URL = 'https://www.houseplus-ch.com';
const LOCALES = ['es', 'de', 'fr', 'ar'];
const SLUGS = ['', 'about-us', 'brand', 'careers', 'case-studies', 'certifications', 'contact', 'factory', 'faq', 'news', 'oem-odm', 'products', 'regions', 'service', 'support', 'team'];
const OUT_DIR = process.argv[2] || '/tmp/houseplus-static-page-localization-audit';
const ENGLISH_UI_PATTERNS = [
  /\babout us\b/gi,
  /\bcontact us\b/gi,
  /\brequest (?:a )?quote\b/gi,
  /\blearn more\b/gi,
  /\bview details\b/gi,
  /\bget in touch\b/gi,
  /\bour (?:company|factory|team|services|products)\b/gi,
  /\bwhy choose us\b/gi,
  /\bwholesale (?:solutions|services|support)\b/gi,
];

const text = (html) => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(?:nbsp|amp|quot|#x27);/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const attribute = (tag, name) => tag?.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1] || '';

async function getPage(locale, slug) {
  const path = slug ? `/${locale}/${slug}` : `/${locale}`;
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, { headers: { 'user-agent': 'HousePlus localization audit/1.0' } });
  const html = await response.text();
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() || '';
  const descriptionTag = html.match(/<meta\b[^>]*\bname=["']description["'][^>]*>/i)?.[0] || html.match(/<meta\b[^>]*\bcontent=["'][^"']*["'][^>]*\bname=["']description["'][^>]*>/i)?.[0] || '';
  const description = attribute(descriptionTag, 'content');
  const body = text(html);
  const englishSignals = ENGLISH_UI_PATTERNS.flatMap((pattern) => [...body.matchAll(pattern)].map((match) => match[0]));
  return {
    locale,
    slug: slug || '__home__',
    url,
    status: response.status,
    htmlLang: attribute(htmlTag, 'lang'),
    dir: attribute(htmlTag, 'dir') || 'ltr',
    title,
    description,
    englishSignals: [...new Set(englishSignals.map((signal) => signal.toLowerCase()))],
  };
}

const input = [];
for (const slug of SLUGS) for (const locale of LOCALES) input.push({ locale, slug });
const results = [];
let cursor = 0;
const workers = Array.from({ length: 8 }, async () => {
  while (cursor < input.length) {
    const item = input[cursor++];
    try { results.push(await getPage(item.locale, item.slug)); }
    catch (error) { results.push({ locale: item.locale, slug: item.slug || '__home__', url: `${BASE_URL}/${item.locale}${item.slug ? `/${item.slug}` : ''}`, status: 0, error: String(error) }); }
  }
});
await Promise.all(workers);
results.sort((a, b) => a.slug.localeCompare(b.slug) || a.locale.localeCompare(b.locale));

const summary = {};
for (const locale of LOCALES) {
  const pages = results.filter((result) => result.locale === locale);
  summary[locale] = {
    pages: pages.length,
    unavailable: pages.filter((page) => page.status !== 200).length,
    languageMismatches: pages.filter((page) => page.htmlLang !== locale).length,
    rtlMismatches: pages.filter((page) => locale === 'ar' && page.dir !== 'rtl').length,
    englishSignalPages: pages.filter((page) => page.englishSignals?.length).length,
  };
}

await mkdir(OUT_DIR, { recursive: true });
await writeFile(`${OUT_DIR}/results.json`, JSON.stringify(results, null, 2));
await writeFile(`${OUT_DIR}/summary.json`, JSON.stringify({ generatedAt: new Date().toISOString(), pages: results.length, summary }, null, 2));
console.log(JSON.stringify({ pages: results.length, summary }, null, 2));
