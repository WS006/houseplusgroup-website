import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('middleware forwards the locale for server-rendered HTML attributes', () => {
  const middleware = read('middleware.ts');
  assert.match(middleware, /requestHeaders\.set\('x-houseplus-locale', firstSegment\)/);
  assert.match(middleware, /NextResponse\.next\(\{ request: \{ headers: requestHeaders \} \}\)/);
});

test('root layout renders localized lang and direction attributes', () => {
  const layout = read('app/layout.tsx');
  assert.match(layout, /export const dynamic = 'force-dynamic'/);
  assert.match(layout, /headers\(\)\.get\('x-houseplus-locale'\)/);
  assert.match(layout, /<html lang=\{locale\} dir=\{getLocaleDirection\(locale\)\}>/);
});

test('localized product routes do not force static rendering ahead of server language attributes', () => {
  const source = read('app/[lang]/products/[slug]/page.tsx');
  assert.doesNotMatch(source, /force-static/);
});

test('client-side locale navigation keeps Arabic document direction in sync', () => {
  const layout = read('app/[lang]/layout.tsx');
  assert.match(layout, /document\.documentElement\.lang=/);
  assert.match(layout, /document\.documentElement\.dir=/);
  assert.match(layout, /lang === 'ar' \? 'rtl' : 'ltr'/);
});

test('product pages use localized quotation guidance instead of unverified GEO or fixed commercial claims', () => {
  const productPage = read('app/[lang]/products/[slug]/page.tsx');
  assert.doesNotMatch(productPage, /GEO Fact:/);
  assert.match(productPage, /const quotationFaq = \[\{ question: ui\.quoteQuestion, answer: ui\.quoteAnswer \}\]/);
  assert.match(productPage, /b2bInfo: undefined/);
  assert.match(productPage, /value: ui\.confirmByQuote/);
  assert.match(productPage, /ui\.questionPrefix/);
  assert.match(productPage, /ui\.answerPrefix/);
});

test('online support widget receives the active locale and provides all five language label sets', () => {
  const langLayout = read('app/[lang]/layout.tsx');
  const widget = read('components/ServiceWidget.tsx');
  assert.match(langLayout, /<ServiceWidget lang=\{lang\} \/>/);
  for (const locale of ['en', 'es', 'de', 'fr', 'ar']) {
    assert.match(widget, new RegExp(`${locale}: \\{ service:`));
  }
  assert.doesNotMatch(widget, />Service<\/span>/);
});

test('related-product cards localize product data and the details action in every language', () => {
  const relatedProducts = read('components/RelatedProducts.tsx');
  assert.match(relatedProducts, /getLocalizedProduct\(slug, lang, PRODUCT_DATA\[slug\]\)/);
  assert.match(relatedProducts, /en: 'View Details →'/);
  assert.match(relatedProducts, /es: 'Ver detalles →'/);
  assert.match(relatedProducts, /de: 'Details ansehen →'/);
  assert.match(relatedProducts, /fr: 'Voir les détails →'/);
  assert.match(relatedProducts, /ar: 'عرض التفاصيل ←'/);
  assert.doesNotMatch(relatedProducts, /lang === 'ar' \? '← عرض التفاصيل' : 'View Details →'/);
});

test('floating chat receives the active locale, supplies five language copy sets, and clears mobile title space', () => {
  const langLayout = read('app/[lang]/layout.tsx');
  const chat = read('components/ChatBot.tsx');
  assert.match(langLayout, /<ChatBot lang=\{lang\} \/>/);
  for (const locale of ['en', 'es', 'de', 'fr', 'ar']) {
    assert.match(chat, new RegExp(`${locale}: \\{`));
  }
  assert.match(chat, /fixed bottom-2 right-2/);
  assert.match(chat, /md:bottom-6 md:right-6/);
  assert.match(chat, /dir=\{lang === 'ar' \? 'rtl' : 'ltr'\}/);
  assert.doesNotMatch(chat, /What is your MOQ\?/);
});

test('product metadata and JSON-LD preserve locale-specific SEO and contact actions', () => {
  const productPage = read('app/[lang]/products/[slug]/page.tsx');
  const productsPage = read('app/[lang]/products/page.tsx');
  const schemaGenerator = read('lib/schema-generator.ts');
  assert.match(productPage, /locale: getOGLocale\(lang\)/);
  assert.match(productPage, /contactUrl: `\$\{BASE_URL\}\/\$\{lang\}\/contact`/);
  assert.match(productPage, /generateFAQSchema\(quotationFaq, lang\)/);
  assert.match(productsPage, /locale: getOGLocale\(lang\)/);
  assert.match(productsPage, /site: '@HousePlusGroup'/);
  assert.match(schemaGenerator, /inLanguage: lang/);
  assert.match(schemaGenerator, /contactActionName/);
  assert.match(schemaGenerator, /generateItemListSchema\([\s\S]*lang: string = 'en'/);
});

test('static news articles provide locale-aware URLs to Article JSON-LD', () => {
  const slugs = [
    'advanced-manufacturing-home-appliances',
    'energy-efficiency-standards-appliances',
    'global-wholesale-guide-home-appliances',
    'oem-odm-manufacturing-guide',
    'smart-home-appliances',
    'solar-energy-storage-solutions',
    'the-evolution-of-3c-electronics',
    'the-future-of-smart-home-appliances',
    'the-future-of-solar-energy',
  ];
  for (const slug of slugs) {
    const source = read(`app/[lang]/news/${slug}/page.tsx`);
    assert.ok(source.includes(`url: \`https://www.houseplus-ch.com/\${lang}/news/${slug}\``));
  }
});
