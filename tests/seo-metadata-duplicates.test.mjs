import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('legacy EU region URL permanently redirects and is excluded from the indexable region list', () => {
  const regionPage = read('app/[lang]/regions/[region]/page.tsx');
  const middleware = read('middleware.ts');
  const urls = read('lib/urls.ts');
  assert.match(regionPage, /permanentRedirect\(`\/\$\{lang\}\/regions\/\$\{legacyRegionAliases\[region\]\}`\)/);
  assert.match(regionPage, /legacyRegionAliases: Record<string, string> = \{ eu: 'europe' \}/);
  assert.match(middleware, /segments\[2\] === 'regions' && segments\[3\] === 'eu'/);
  assert.match(middleware, /return NextResponse\.redirect\(url, 301\)/);
  assert.doesNotMatch(urls, /'eu'/);
});

test('middleware reads its administrator password only from the deployment environment', () => {
  const middleware = read('middleware.ts');
  assert.match(middleware, /const ADMIN_PASSWORD = process\.env\.HOUSEPLUS_ADMIN_PASSWORD \|\| process\.env\.ADMIN_PASSWORD/);
  assert.match(middleware, /if \(!ADMIN_PASSWORD \|\| pass !== ADMIN_PASSWORD\)/);
  assert.doesNotMatch(middleware, /const ADMIN_PASSWORD = ['"`]/);
});

test('formerly duplicated multilingual news metadata uses localized title and description maps', () => {
  for (const path of [
    'app/[lang]/news/energy-efficiency-standards-appliances/page.tsx',
    'app/[lang]/news/global-wholesale-guide-home-appliances/page.tsx',
    'app/[lang]/news/oem-odm-manufacturing-guide/page.tsx',
  ]) {
    const source = read(path);
    assert.match(source, /const titles: Record<string, string>/);
    assert.match(source, /const descriptions: Record<string, string>/);
    assert.match(source, /title: titles\[lang\] \|\| titles\.en/);
    assert.match(source, /description: descriptions\[lang\] \|\| descriptions\.en/);
  }
});

test('French electronics and smart-home market pages retain distinct metadata', () => {
  const electronics = read('app/[lang]/news/2026-electronics-market-update/page.tsx');
  const smartHome = read('app/[lang]/news/2026-smart-home-appliances-market-guide/page.tsx');
  assert.match(electronics, /Tendances du marché de l’électronique 3C en 2026/);
  assert.match(smartHome, /Tendances du marché mondial des appareils électroménagers intelligents 2026/);
  assert.doesNotMatch(electronics, /Explorez les tendances clés qui façonnent le marché des appareils électroménagers intelligents/);
});

test('invalid product slugs return a real noindex 404 instead of an indexable generic product page', () => {
  const productPage = read('app/[lang]/products/[slug]/page.tsx');
  assert.match(productPage, /import \{ notFound \} from 'next\/navigation';/);
  assert.match(productPage, /if \(!baseProduct \|\| !validLangs\.includes\(lang\)\) \{\s*return \{\s*title: 'Product Not Found \| HousePlus',\s*robots: 'noindex, follow',/s);
  assert.match(productPage, /if \(!baseProduct \|\| !validLangs\.includes\(lang\)\) \{\s*notFound\(\);/s);
  assert.match(productPage, /if \(!product\) notFound\(\);/);
});

test('Contact inquiry prefill parameters retain form context without creating indexable duplicates', () => {
  const contactPage = read('app/[lang]/contact/page.tsx');
  assert.match(contactPage, /searchParams\?: \{ product\?: string; region\?: string \}/);
  assert.match(contactPage, /const isInquiryPrefill = typeof searchParams\?\.product === 'string' \|\| typeof searchParams\?\.region === 'string';/);
  assert.match(contactPage, /isInquiryPrefill \? \{ robots: 'noindex, follow' \} : \{\}/);
  assert.match(contactPage, /initialProduct=\{productContext\}/);
});

test('confirmed historical aliases permanently consolidate to their unique canonical pages', () => {
  const nextConfig = read('next.config.js');
  for (const [source, destination] of [
    ['/products/products', '/en/products'],
    ['/products/factory', '/en/factory'],
    ['/contact-us', '/en/contact'],
    ['/about-us/contact', '/en/contact'],
    ['/about-us/team', '/en/team'],
    ['/regions/careers', '/en/careers'],
    ['/news/factory', '/en/factory'],
    ['/news/2026-appliances-market-update', '/en/news/2026-appliances-market-update'],
  ]) {
    assert.match(nextConfig, new RegExp(`source: '${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',\\s*destination: '${destination.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',\\s*permanent: true`, 's'));
  }
});

test('catch-all and localized not-found routes never emit indexable metadata for unknown URLs', () => {
  const catchAll = read('app/[lang]/[...slug]/page.tsx');
  const localizedNotFound = read('app/[lang]/not-found.tsx');
  const rootNotFound = read('app/not-found.tsx');
  assert.match(catchAll, /Promise\.allSettled\(\[/);
  assert.match(catchAll, /if \(!storyExists && !childStoriesExist\) \{\s*return \{\s*title: 'Page Not Found \| HousePlus',\s*robots: 'noindex, follow',/s);
  assert.match(catchAll, /must not manufacture indexable metadata for unknown/);
  assert.match(localizedNotFound, /export function generateMetadata/);
  assert.match(localizedNotFound, /robots: 'noindex, follow'/);
  assert.match(localizedNotFound, /Page Not Found \| HousePlus/);
  assert.match(rootNotFound, /export const metadata: Metadata/);
  assert.match(rootNotFound, /title: 'Page Not Found \| HousePlus'/);
  assert.match(rootNotFound, /robots: 'noindex, follow'/);
});

test('homepage carousel exposes every SEO image and Alt Text in HTML while protecting the LCP image', () => {
  const carousel = read('components/Carousel.tsx');
  assert.doesNotMatch(carousel, /loadedSlides/);
  assert.match(carousel, /src=\{item\.image\.filename\}/);
  assert.match(carousel, /alt=\{item\.image\.alt \|\| item\.title\}/);
  assert.match(carousel, /priority=\{index === 0\}/);
  assert.match(carousel, /loading=\{index === 0 \? 'eager' : 'lazy'\}/);
  assert.match(carousel, /fetchPriority=\{index === 0 \? 'high' : 'low'\}/);
});

test('product listing canonicals and hreflang URLs use the trailing-slash URLs served in production', () => {
  const productsPage = read('app/[lang]/products/page.tsx');
  assert.match(productsPage, /\$\{BASE_URL\}\/\$\{locale\}\/products\/\?category=\$\{category\}/);
  assert.match(productsPage, /\$\{BASE_URL\}\/\$\{locale\}\/products\//);
  assert.match(productsPage, /const canonicalUrl = isValidCategory\s*\? `\$\{BASE_URL\}\/\$\{lang\}\/products\/\?category=\$\{category\}`\s*:\s*`\$\{BASE_URL\}\/\$\{lang\}\/products\/`/s);
  assert.match(productsPage, /canonical: canonicalUrl/);
  assert.match(productsPage, /url: canonicalUrl/);
  assert.doesNotMatch(productsPage, /products\?category=\$\{category\}/);
});

test('localized region detail pages expose a visible Breadcrumb and localized BreadcrumbList labels', () => {
  const regionPage = read('app/[lang]/regions/[region]/page.tsx');
  const breadcrumb = read('components/Breadcrumb.tsx');
  assert.match(regionPage, /import Breadcrumb from '@\/components\/Breadcrumb';/);
  assert.match(regionPage, /const regionBreadcrumbLabels: Record<string, string>/);
  assert.match(regionPage, /slug=\{`regions\/\$\{region\}`\}/);
  assert.match(regionPage, /customLabel=\{regionName\}/);
  assert.match(regionPage, /labelOverrides=\{\{ regions: regionBreadcrumbLabel \}\}/);
  assert.match(breadcrumb, /labelOverrides\?: Record<string, string>;/);
  assert.match(breadcrumb, /labelOverrides\?\.\[segment\] \|\| pageLabels\[segment\]/);
  assert.match(breadcrumb, /'@type': 'BreadcrumbList'/);
});
