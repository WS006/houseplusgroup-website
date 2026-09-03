import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(process.cwd());
const sitemap = fs.readFileSync(path.join(root, 'app/video-sitemap.xml/route.ts'), 'utf8');
const robots = fs.readFileSync(path.join(root, 'app/robots.txt/route.ts'), 'utf8');
const schema = fs.readFileSync(path.join(root, 'lib/schema-generator.ts'), 'utf8');
const article = fs.readFileSync(path.join(root, 'app/[lang]/news/[slug]/page.tsx'), 'utf8');

test('video sitemap is generated from real BlogVideo records for all supported languages', () => {
  assert.match(sitemap, /blogPosts/);
  assert.match(sitemap, /LANGUAGES = \['en', 'es', 'de', 'fr', 'ar'\]/);
  assert.match(sitemap, /video\.poster/);
  assert.match(sitemap, /video\.contentUrl/);
  assert.match(sitemap, /video:thumbnail_loc/);
  assert.match(sitemap, /video:title/);
  assert.match(sitemap, /video:description/);
  assert.match(sitemap, /video:content_loc/);
  assert.match(sitemap, /video:publication_date/);
  assert.match(sitemap, /toSchemaDateTime\(video\.uploadDate\)/);
  assert.match(sitemap, /video:family_friendly/);
  assert.doesNotMatch(sitemap, /video:player_loc/);
});

test('robots references the video sitemap and allows it for general crawlers', () => {
  assert.match(robots, /Allow: \/video-sitemap\.xml/);
  assert.match(robots, /Sitemap: \$\{baseUrl\}\/video-sitemap\.xml/);
});

test('VideoObject normalizes uploadDate to timezone-qualified ISO datetime', () => {
  assert.match(schema, /export function toSchemaDateTime/);
  assert.match(schema, /T00:00:00Z/);
  assert.doesNotMatch(schema, /\\\\d\{4\}/);
  assert.match(schema, /uploadDate: toSchemaDateTime\(options\.uploadDate\)/);
});

test('VideoObject does not invent an embedUrl when no player URL exists', () => {
  assert.match(schema, /embedUrl\?: string/);
  assert.match(schema, /options\.embedUrl \? \{ embedUrl: options\.embedUrl \} : \{\}/);
  assert.match(article, /id: `\$\{articleUrl\}#video`/);
  assert.doesNotMatch(article, /embedUrl: articleUrl/);
});
