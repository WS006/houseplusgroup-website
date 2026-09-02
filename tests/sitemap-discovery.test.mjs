import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const imageSitemap = fs.readFileSync(path.join(root, 'app/image-sitemap.xml/route.ts'), 'utf8');
const pageSitemap = fs.readFileSync(path.join(root, 'app/sitemap.ts'), 'utf8');
const lastmod = fs.readFileSync(path.join(root, 'lib/sitemap-lastmod.ts'), 'utf8');
const robots = fs.readFileSync(path.join(root, 'app/robots.txt/route.ts'), 'utf8');

test('image sitemap uses page/content lastmod instead of request-time today', () => {
  assert.match(imageSitemap, /lastModified: post\.dateModified \|\| post\.datePublished/);
  assert.match(imageSitemap, /escapeXml\(page\.lastModified\)/);
  assert.doesNotMatch(imageSitemap, /new Date\(\)\.toISOString\(\)\.split\('\''T'\''\)/);
});

test('page and image sitemaps share a maintained lastmod source', () => {
  assert.match(pageSitemap, /getSitemapLastModified\(slug\)/);
  assert.match(pageSitemap, /PRODUCT_CATEGORY_LAST_MODIFIED/);
  assert.match(lastmod, /PRODUCT_DETAIL_LAST_MODIFIED/);
  assert.match(lastmod, /REGION_LAST_MODIFIED/);
});

test('image sitemap merges approved dynamic media with a safe static fallback', () => {
  assert.match(imageSitemap, /DYNAMIC_MEDIA_SITEMAP_URL/);
  assert.match(imageSitemap, /mergeDynamicMediaSitemap\(staticXml, await response\.text\(\)\)/);
  assert.match(imageSitemap, /Static source data remains a safe fallback/);
  assert.match(imageSitemap, /max-age=300, s-maxage=300/);
});

test('crawler entry points remain declared', () => {
  assert.match(imageSitemap, /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/);
  assert.match(robots, /Allow: \/image-sitemap\.xml/);
  assert.match(robots, /Allow: \/video-sitemap\.xml/);
  assert.match(robots, /Sitemap: \$\{baseUrl\}\/image-sitemap\.xml/);
  assert.match(robots, /Sitemap: \$\{baseUrl\}\/video-sitemap\.xml/);
});
