import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const urls = readFileSync(new URL('../lib/urls.ts', import.meta.url), 'utf8');
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');
const imageSitemap = readFileSync(new URL('../app/image-sitemap.xml/route.ts', import.meta.url), 'utf8');
const schema = readFileSync(new URL('../lib/schema-generator.ts', import.meta.url), 'utf8');

test('Sitemap and URL-submission batches use final trailing-slash URLs instead of redirect URLs', () => {
  assert.match(urls, /function canonicalSiteUrl\(path = ''\)/);
  assert.match(urls, /return normalizedPath \? `\$\{baseUrl\}\/\$\{normalizedPath\}\/` : `\$\{baseUrl\}\//);
  assert.match(sitemap, /canonicalSiteUrl\(slug \? `\$\{lang\}\/\$\{slug\}` : lang\)/);
  assert.match(imageSitemap, /<loc>\$\{canonicalSiteUrl\(page\.pageUrl\)\}<\/loc>/);
  assert.doesNotMatch(urls, /urls\.push\(baseUrl\)/);
});

test('Product and article schemas expose their R2 hero as ImageObject and the page primary image', () => {
  assert.match(schema, /const productImageObject = \{/);
  assert.match(schema, /image: \[productImageObject\]/);
  assert.match(schema, /primaryImageOfPage: \{ '@id': productImageObject\['@id'\] \}/);
  assert.match(schema, /const articleImageObject = \{/);
  assert.match(schema, /image: \[articleImageObject\]/);
  assert.match(schema, /primaryImageOfPage: \{ '@id': articleImageObject\['@id'\] \}/);
});
