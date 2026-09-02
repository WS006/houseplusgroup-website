import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('GEO/AEO entity and product updates emit fresh sitemap lastmod signals', () => {
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /getSitemapLastModified/);
  assert.match(sitemap, /PRODUCT_CATEGORY_LAST_MODIFIED/);
  const lastmod = read('lib/sitemap-lastmod.ts');
  assert.match(lastmod, /'': '2026-08-25'/);
  assert.match(lastmod, /products: '2026-08-25'/);
  assert.match(lastmod, /about-us': '2026-08-16'/);
  assert.match(lastmod, /certifications: '2026-08-16'/);
  assert.match(lastmod, /oem-odm': '2026-08-16'/);
  assert.match(lastmod, /slug\.startsWith\('products/);
  assert.match(lastmod, /PRODUCT_DETAIL_LAST_MODIFIED/);
  assert.match(lastmod, /slug\.startsWith\('regions/);
  assert.match(lastmod, /REGION_LAST_MODIFIED/);
});

test('indexable product category filters are represented by final canonical URLs in the sitemap', () => {
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /const productCategoryFilters = \['solar', 'home-appliances', '3c-electronics'\] as const/);
  assert.match(sitemap, /function buildProductCategoryEntries\(\): MetadataRoute\.Sitemap/);
  assert.match(sitemap, /languages\[lang\] = `\$\{canonicalSiteUrl\(`\$\{lang\}\/products`\)\}\?category=\$\{category\}`/);
  assert.match(sitemap, /languages\['x-default'\] = `\$\{canonicalSiteUrl\('en\/products'\)\}\?category=\$\{category\}`/);
  assert.match(sitemap, /allEntries\.push\(\.\.\.buildProductCategoryEntries\(\)\)/);
});
