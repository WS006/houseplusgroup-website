import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const schemaSource = readFileSync(new URL('../lib/schema-generator.ts', import.meta.url), 'utf8');
const footerSource = readFileSync(new URL('../components/Footer.tsx', import.meta.url), 'utf8');
const imageSitemapSource = readFileSync(new URL('../app/image-sitemap.xml/route.ts', import.meta.url), 'utf8');
const workflowSource = readFileSync(new URL('../.github/workflows/houseplus-quality-gate.yml', import.meta.url), 'utf8');

test('approved HousePlus ImageObject output includes the four recommended Google image metadata fields', () => {
  for (const field of ['acquireLicensePage', 'creditText', 'copyrightNotice', 'creator']) {
    assert.match(schemaSource, new RegExp(`${field}:`));
  }
  assert.match(schemaSource, /function houseplusImageReference/);
  assert.match(schemaSource, /R2 assets published through this website/);
});

test('footer organization logo has matching Image Metadata fields', () => {
  for (const field of ['acquireLicensePage', 'creditText', 'copyrightNotice', 'creator']) {
    assert.match(footerSource, new RegExp(`${field}:`));
  }
});

test('image Sitemap filters known stale media Worker 404 entries', () => {
  assert.match(imageSitemapSource, /INVALID_DYNAMIC_MEDIA_URLS/);
  assert.match(imageSitemapSource, /removeInvalidDynamicImages/);
  assert.match(imageSitemapSource, /\.filter\(\(block\) =>/);
  assert.equal((imageSitemapSource.match(/https:\/\/images\.houseplus-ch\.com\/media\//g) || []).length >= 53, true);
});

test('release gate runs the production image Sitemap resource audit', () => {
  assert.match(workflowSource, /pnpm audit:production-image-sitemap/);
  assert.match(workflowSource, /https:\/\/www\.houseplus-ch\.com\/image-sitemap\.xml/);
});
