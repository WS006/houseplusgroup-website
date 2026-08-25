import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('GEO/AEO entity and product updates emit fresh sitemap lastmod signals', () => {
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /'': '2026-08-25'/);
  assert.match(sitemap, /'products': '2026-08-25'/);
  for (const slug of ["'about-us'", "'factory'", "'service'", "'certifications'", "'oem-odm'", "'brand'"]) {
    assert.match(sitemap, new RegExp(`${slug}: '2026-08-16'`));
  }
  assert.match(sitemap, /slug\.startsWith\('products\/'\)/);
  assert.match(sitemap, /\? '2026-08-16'/);
  assert.match(sitemap, /const regionLastModified = '2026-08-25'/);
  assert.match(sitemap, /slug\.startsWith\('regions\/'\)/);
  assert.match(sitemap, /\? regionLastModified/);
});

test('indexable product category filters are represented by final canonical URLs in the sitemap', () => {
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /const productCategoryFilters = \['solar', 'home-appliances', '3c-electronics'\] as const/);
  assert.match(sitemap, /function buildProductCategoryEntries\(\): MetadataRoute\.Sitemap/);
  assert.match(sitemap, /languages\[lang\] = `\$\{canonicalSiteUrl\(`\$\{lang\}\/products`\)\}\?category=\$\{category\}`/);
  assert.match(sitemap, /languages\['x-default'\] = `\$\{canonicalSiteUrl\('en\/products'\)\}\?category=\$\{category\}`/);
  assert.match(sitemap, /allEntries\.push\(\.\.\.buildProductCategoryEntries\(\)\)/);
});
