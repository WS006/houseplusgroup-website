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

test('product pages show confirmed fixed terms when present and retain quotation guidance for other conditions', () => {
  const productPage = read('app/[lang]/products/[slug]/page.tsx');
  assert.doesNotMatch(productPage, /GEO Fact:/);
  assert.match(productPage, /const quotationFaq = \[\{ question: ui\.quoteQuestion, answer: ui\.quoteAnswer \}\]/);
  assert.match(productPage, /b2bInfo: commercialInfo/);
  assert.match(productPage, /commercialInfo\?\.moq \|\| ui\.confirmByQuote/);
  assert.match(productPage, /commercialInfo\?\.leadTime \|\| ui\.confirmByQuote/);
  assert.match(productPage, /commercialInfo\?\.warranty \|\| ui\.confirmByQuote/);
  assert.match(productPage, /commercialInfo\?\.certifications/);
  assert.match(productPage, /ui\.questionPrefix/);
  assert.match(productPage, /ui\.answerPrefix/);
});

test('retail offers are opt-in, source-backed fields while B2B/OEM inquiry remains available', () => {
  const productData = read('lib/product-data.ts');
  const productPage = read('app/[lang]/products/[slug]/page.tsx');
  const schemaGenerator = read('lib/schema-generator.ts');
  assert.match(productData, /export interface RetailOffer/);
  assert.match(productData, /retailOffer\?: RetailOffer/);
  assert.match(productData, /purchaseUrl: string/);
  assert.match(productPage, /const retailOffer = product\.retailOffer/);
  assert.match(productPage, /\{retailOffer && \(/);
  assert.match(productPage, /ui\.buyNow/);
  assert.match(schemaGenerator, /retailOffer\?: \{/);
  assert.match(schemaGenerator, /\(retailOffer && \{/);
  assert.doesNotMatch(schemaGenerator, /availability = 'InStock'/);
});

test('homepage logo uses a responsive Next Image and brand page distinguishes retail from B2B/OEM', () => {
  const home = read('app/[lang]/page.tsx');
  const brand = read('app/[lang]/brand/page.tsx');
  assert.match(home, /import Image from 'next\/image'/);
  assert.match(home, /width=\{709\}/);
  assert.match(home, /sizes="\(max-width: 767px\) 64px, 80px"/);
  assert.match(brand, /Retail Products and B2B\/OEM Supply/);
  assert.match(brand, /Direct Retail Purchase/);
  assert.doesNotMatch(brand, /1\.2M\+\+?\s*Units/);
  assert.doesNotMatch(brand, /MOQ from 100 units/);
  assert.doesNotMatch(brand, /Over 8% of annual revenue/);
});

test('fallback error routes have a valid Pages Router Document context for production builds', () => {
  const document = read('pages/_document.tsx');
  assert.match(document, /from 'next\/document'/);
  assert.match(document, /<Html lang="en">/);
  assert.match(document, /<Main \/>/);
  assert.match(document, /<NextScript \/>/);
});

test('static Pages Router fallbacks do not depend on Document components', () => {
  const notFound = read('pages/404.tsx');
  const error = read('pages/500.tsx');
  assert.doesNotMatch(notFound, /next\/document/);
  assert.doesNotMatch(error, /next\/document/);
  assert.match(notFound, /href="\/en"/);
  assert.match(error, /href="\/en\/contact"/);
});

test('region switcher safely handles nullable navigation hooks during production rendering', () => {
  const switcher = read('components/RegionSwitcher.tsx');
  assert.match(switcher, /searchParams\?\.get\('region'\)/);
  assert.match(switcher, /searchParams\?\.toString\(\) \|\| ''/);
  assert.match(switcher, /const safePathname = pathname \|\| `\/\$\{lang\}`/);
});

test('homepage and localized foundation pages publish the confirmed company facts in all five languages', () => {
  const homePage = read('app/[lang]/page.tsx');
  const foundationPage = read('components/LocalizedFoundationPage.tsx');
  const facts = read('lib/company-facts.ts');
  const schema = read('lib/schema-generator.ts');
  assert.match(homePage, /getCompanyFacts\(lang\)/);
  assert.match(foundationPage, /getCompanyFacts\(lang\)/);
  assert.match(facts, /factoryArea: '20,000 m²'/);
  assert.match(facts, /manufacturingSince: 'Since 2010'/);
  assert.match(facts, /wholesaleClients: '441\+'/);
  assert.match(facts, /markets: '53\+'/);
  assert.match(schema, /foundingDate: '2010'/);
});

test('localized contact pages retain the inquiry form and product CTAs preserve product context', () => {
  const middleware = read('middleware.ts');
  const contactPage = read('app/[lang]/contact/page.tsx');
  const productPage = read('app/[lang]/products/[slug]/page.tsx');
  const inquiryForm = read('components/InquiryForm.tsx');
  assert.doesNotMatch(middleware, /'certifications', 'contact'/);
  assert.match(contactPage, /<InquiryForm lang=\{lang\} initialProduct=\{productContext\}/);
  assert.match(productPage, /contact\?product=\$\{encodeURIComponent/);
  assert.match(inquiryForm, /initialProduct\?: string/);
  for (const locale of ['en', 'es', 'de', 'fr', 'ar']) {
    assert.match(inquiryForm, new RegExp(`${locale}: \{ title:`));
  }
  assert.match(inquiryForm, /role="status"/);
  assert.match(inquiryForm, /role="alert"/);
});

test('confirmed missing-data products publish warranty and category certifications without fixed MOQ or lead time', () => {
  const productData = read('lib/product-data.ts');
  const targets = {
    solar: ['solar-panel-500w', 'solar-inverter-3kw', 'lithium-battery-5kwh', 'lead-acid-battery-100ah', 'charge-controller-60a', 'solar-street-light-200w', 'solar-fan-20w', 'solar-power-bank-20000mah'],
    appliances: ['air-fryer-5-8l', 'induction-cooktop-2000w', 'electric-kettle-1-5l', 'toaster-2-slice'],
    electronics: ['headphone-over-ear', 'bluetooth-earphone-tws', 'smart-watch', 'portable-ssd-1tb', 'micro-sd-128gb', 'usb-c-cable-2m'],
  };
  for (const slug of Object.values(targets).flat()) {
    const start = productData.indexOf(`  '${slug}': {`);
    const end = productData.indexOf("\n  '", start + 1);
    const block = productData.slice(start, end);
    assert.match(block, /warranty: '12 months'/);
    assert.match(block, /certifications: \[/);
    assert.doesNotMatch(block, /moq:/);
    assert.doesNotMatch(block, /leadTime:/);
  }
  assert.match(productData, /warranty\?: string/);
  assert.match(productData, /leadTime\?: string/);
});

test('online support widget receives the active locale and provides all five language label sets', () => {
  const langLayout = read('app/[lang]/layout.tsx');
  const widget = read('components/ServiceWidget.tsx');
  assert.match(langLayout, /<ServiceWidget lang=\{lang\} \/>/);
  for (const locale of ['en', 'es', 'de', 'fr', 'ar']) {
    assert.match(widget, new RegExp(`${locale}: \\{ service:`));
  }
  assert.doesNotMatch(widget, />Service<\/span>/);
  assert.match(widget, /bottom-20 right-0/);
  assert.match(widget, /md:top-1\/2/);
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

test('non-English foundation pages render verified local copy and are published in the sitemap', () => {
  const middleware = read('middleware.ts');
  const foundationRoute = read('app/[lang]/localized-foundation/[[...slug]]/page.tsx');
  const foundationCopy = read('lib/foundation-page-copy.ts');
  const sitemap = read('app/sitemap.ts');
  const home = read('app/[lang]/page.tsx');
  assert.match(middleware, /localizedFoundationSlugs/);
  assert.match(middleware, /localized-foundation/);
  assert.match(foundationRoute, /generateSEOMetadata/);
  assert.match(foundationCopy, /'about-us'/);
  for (const locale of ['es', 'de', 'fr', 'ar']) assert.ok(foundationCopy.includes(`${locale}: [`));
  assert.doesNotMatch(sitemap, /buildUrlEntry\(page\.slug, page\.priority, page\.changefreq, \['en'\]\)/);
  assert.match(home, /const copy = localizedHomeCopy/);
  assert.doesNotMatch(home, /Counter end="16\+"/);
  assert.doesNotMatch(home, /CE\/FCC\/RoHS certified products to 441\+ clients/);
});
