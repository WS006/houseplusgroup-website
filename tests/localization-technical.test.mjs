import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
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
  assert.match(layout, /\(await headers\(\)\)\.get\('x-houseplus-locale'\)/);
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

test('brand production image supplies localized Alt, Title and visible caption in every language', () => {
  const brand = read('app/[lang]/brand/page.tsx');
  for (const field of ['factoryImageAlt', 'factoryImageTitle', 'factoryImageCaption']) {
    assert.match(brand, new RegExp(`${field}: string;`));
    assert.match(brand, new RegExp(`${field}: '`, 'g'));
  }
  assert.match(brand, /alt=\{current\.factoryImageAlt\}/);
  assert.match(brand, /title=\{current\.factoryImageTitle\}/);
  assert.match(brand, />\{current\.factoryImageCaption\}<\/figcaption>/);
});

test('fallback error routes use the framework Document during production builds', () => {
  assert.equal(existsSync(new URL('pages/_document.tsx', root)), false);
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
  const floatingTools = read('components/FloatingTools.tsx');
  const widget = read('components/ServiceWidget.tsx');
  assert.match(langLayout, /<FloatingTools lang=\{lang\} \/>/);
  assert.match(floatingTools, /<ServiceWidget lang=\{lang\} \/>/);
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
  const floatingTools = read('components/FloatingTools.tsx');
  const chat = read('components/ChatBot.tsx');
  assert.match(langLayout, /<FloatingTools lang=\{lang\} \/>/);
  assert.match(floatingTools, /<ChatBot lang=\{lang\} \/>/);
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
  assert.match(productPage, /contactUrl: `\$\{BASE_URL\}\/\$\{lang\}\/contact\/`/);
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

test('recent static news articles are included in the canonical URL and sitemap registries', () => {
  const urls = read('lib/urls.ts');
  const sitemap = read('app/sitemap.ts');
  for (const slug of [
    'appliance-energy-efficiency-vs-actual-consumption',
    'consumer-electronics-battery-life-testing',
    'solar-storage-efficiency-optimization-guide',
  ]) {
    assert.match(urls, new RegExp(`'${slug}'`));
    assert.match(sitemap, new RegExp(`news/${slug}`));
  }
});

test('non-English primary pages render their dedicated localized route components rather than a generic foundation rewrite', () => {
  const middleware = read('middleware.ts');
  const sitemap = read('app/sitemap.ts');
  const home = read('app/[lang]/page.tsx');
  const faq = read('app/[lang]/faq/page.tsx');
  assert.doesNotMatch(middleware, /localizedFoundationSlugs/);
  assert.doesNotMatch(middleware, /localized-foundation/);
  assert.match(faq, /const faqs: Record<string, any\[\]>/);
  for (const locale of ['es', 'de', 'fr', 'ar']) assert.match(faq, new RegExp(`\\n    ${locale}: \\[`));
  assert.doesNotMatch(sitemap, /buildUrlEntry\(page\.slug, page\.priority, page\.changefreq, \['en'\]\)/);
  assert.match(home, /const copy = localizedHomeCopy/);
  assert.doesNotMatch(home, /Counter end="16\+"/);
  assert.doesNotMatch(home, /CE\/FCC\/RoHS certified products to 441\+ clients/);
});

test('change-impact audit continuously checks product, article, localization, RSS and image-sitemap linkages', () => {
  const audit = read('scripts/audit-change-impact.mjs');
  const packageJson = read('package.json');
  assert.match(audit, /sitemapUrlsWithoutDynamicArticleRegistry/);
  assert.match(audit, /staticRoutesMissingFromUrls/);
  assert.match(audit, /newsUrlsWithoutStaticOrDynamicRoute/);
  assert.match(audit, /staticRoutesMissingFromNewsListing/);
  assert.match(audit, /staticRoutesMissingFromImageSitemap/);
  assert.match(audit, /rssMissingStaticArticles/);
  assert.match(audit, /missingLocalizedRecords/);
  assert.match(audit, /rssUsesBlogRegistry/);
  assert.match(packageJson, /"audit:change-impact"/);
});

test('news commercial-claim audit protects search assets from unverified article assertions', () => {
  const audit = read('scripts/audit-news-commercial-claims.mjs');
  const packageJson = read('package.json');
  assert.match(audit, /unverified-certification/);
  assert.match(audit, /unverified-commercial-term/);
  assert.match(audit, /unverified-scale-or-performance/);
  assert.match(packageJson, /"audit:news-claims"/);
});

test('all static news routes remain represented in the news listing and image sitemap', () => {
  const newsPage = read('app/[lang]/news/page.tsx');
  const imageSitemap = read('app/image-sitemap.xml/route.ts');
  for (const slug of [
    'smart-home-appliances',
    'solar-energy-storage-solutions',
    'the-evolution-of-3c-electronics',
    'the-future-of-solar-energy',
  ]) {
    assert.match(newsPage, new RegExp(`slug: '${slug}'`));
    assert.match(imageSitemap, new RegExp(`'${slug}'`));
  }
  assert.match(imageSitemap, /image\.image \|\| coverPath\(slug\)/);
});

test('news listing preserves localized dynamic article hero Alt text for every locale', () => {
  const newsPage = read('app/[lang]/news/page.tsx');
  const localizedArticles = read('lib/localized-content/articles.json');
  assert.match(newsPage, /type LocalizedArticleSummary = \{ title\?: string; description\?: string; heroImageAlt\?: string \}/);
  assert.match(newsPage, /localized\?\.\[locale\]\?\.heroImageAlt \|\| post\.heroImageAlt/);
  assert.match(newsPage, /const imageAltFor = \(imageAlt: string \| Record<string, string>\)/);
  assert.match(newsPage, /alt=\{imageAltFor\(featuredArticle\.imageAlt\)\}/);
  assert.match(newsPage, /alt=\{imageAltFor\(article\.imageAlt\)\}/);
  assert.match(localizedArticles, /"portable-power-supply-solar-storage-b2b-guide"[\s\S]*"heroImageAlt"/);
});

test('news listing delivers R2 covers through responsive Next Image with only the featured cover prioritized', () => {
  const newsPage = read('app/[lang]/news/page.tsx');
  assert.match(newsPage, /import Image from 'next\/image';/);
  assert.match(newsPage, /sizes="\(max-width: 1023px\) 100vw, 58vw"/);
  assert.match(newsPage, /sizes="\(max-width: 767px\) 100vw, \(max-width: 1023px\) 50vw, 33vw"/);
  assert.match(newsPage, /alt=\{imageAltFor\(featuredArticle\.imageAlt\)\}[\s\S]*priority/s);
  assert.match(newsPage, /alt=\{imageAltFor\(article\.imageAlt\)\}[\s\S]*loading="lazy"/s);
});

test('priority article covers have image-specific localized titles on both listing and detail pages', () => {
  const imageSemantics = read('lib/localized-content/image-semantics.ts');
  const newsPage = read('app/[lang]/news/page.tsx');
  const articlePage = read('app/[lang]/news/[slug]/page.tsx');
  for (const slug of [
    'solar-panel-rfq-checklist-international-buyers',
    'home-appliance-oem-sample-evaluation-checklist',
    'usb-c-accessories-wholesale-specification-checklist',
    'battery-energy-storage-rfq-data-checklist',
    'portable-power-supply-solar-storage-b2b-guide',
  ]) assert.match(imageSemantics, new RegExp(`'${slug}'`));
  assert.match(newsPage, /getLocalizedArticleImageTitle\(slug, lang,/);
  assert.match(articlePage, /getLocalizedArticleImageTitle\(slug, lang, post\.heroImageTitle \|\| post\.heroImageAlt\)/);
  assert.match(articlePage, /sizes="\(max-width: 767px\) 100vw, \(max-width: 1280px\) 92vw, 1152px"/);
});

test('image sitemap uses explicit page-role governance and excludes decorative brand logos', () => {
  const governance = read('lib/image-sitemap-governance.ts');
  const imageSitemap = read('app/image-sitemap.xml/route.ts');
  assert.match(governance, /pageHero: 'page_hero'/);
  assert.match(governance, /pageInline: 'page_inline'/);
  assert.match(governance, /pageGallery: 'page_gallery'/);
  assert.doesNotMatch(governance, /houseplus-group-logo/);
  for (const slug of [
    'houseplus-factory-assembly-line',
    'houseplus-site-service-technical-consultation',
    'houseplus-site-support-customer-service',
    'houseplus-site-global-world-map-markets',
  ]) assert.match(governance, new RegExp(slug));
  assert.match(imageSitemap, /CURATED_CORE_PAGE_IMAGES/);
});

test('factory and service pages use responsive Next Image for core R2 media without over-prioritizing non-LCP images', () => {
  const factory = read('app/[lang]/factory/page.tsx');
  const service = read('app/[lang]/service/page.tsx');
  for (const source of [factory, service]) assert.match(source, /import Image from 'next\/image';/);
  assert.match(factory, /houseplus-articles-service-factory-assembly-workers-b2b-guide\/[\s\S]*sizes="\(max-width: 1023px\) 100vw, 50vw"[\s\S]*priority/s);
  assert.match(factory, /houseplus-factory-factory-appliance-qc-lab\/[\s\S]*loading="lazy"/s);
  assert.match(factory, /\(max-width: 767px\) 100vw, \(max-width: 1023px\) 50vw, 33vw/);
  assert.match(service, /houseplus-site-service-technical-consultation\/[\s\S]*sizes="\(max-width: 1023px\) 100vw, 50vw"[\s\S]*loading="lazy"/s);
});

test('all static news routes are included in the RSS source without replaying unverified commercial claims', () => {
  const feed = read('app/feed.xml/route.ts');
  const staticFeed = read('lib/static-news-feed.ts');
  assert.match(feed, /staticNewsFeedEntries/);
  assert.match(feed, /staticNewsFeedDescription/);
  for (const slug of [
    'smart-home-appliances',
    'solar-energy-storage-solutions',
    'the-evolution-of-3c-electronics',
    'the-future-of-solar-energy',
  ]) {
    assert.match(staticFeed, new RegExp(`slug: '${slug}'`));
  }
  assert.doesNotMatch(staticFeed, /flexible MOQ|ISO 9001|CE\/FCC\/RoHS/);
});

test('visual sitemap page derives product and article links from the canonical registries', () => {
  const sitemapPage = read('app/[lang]/sitemap-page/page.tsx');
  assert.match(sitemapPage, /productSlugs as canonicalProductSlugs, newsSlugs/);
  assert.match(sitemapPage, /getLocalizedProduct/);
  assert.match(sitemapPage, /getLocalizedArticle/);
  assert.match(sitemapPage, /staticNewsFeedEntries/);
  assert.match(sitemapPage, /t\.sections\.news/);
  assert.doesNotMatch(sitemapPage, /Product slugs from Storyblok/);
});

test('primary-page localization audit prevents generic foundation content from replacing dedicated routes', () => {
  const audit = read('scripts/audit-primary-page-localization.mjs');
  const packageJson = read('package.json');
  assert.match(audit, /genericTemplateSignatures/);
  assert.match(audit, /expectedPageText/);
  assert.match(audit, /slug: 'faq'/);
  assert.match(packageJson, /"audit:primary-pages"/);
});

test('primary-page language parity audit detects English main-content fallback behind localized navigation', () => {
  const audit = read('scripts/audit-primary-page-language-parity.mjs');
  const packageJson = read('package.json');
  assert.match(audit, /matchingEnglishPhraseCount/);
  assert.match(audit, /mainText/);
  assert.match(packageJson, /"audit:primary-language-parity"/);
});
