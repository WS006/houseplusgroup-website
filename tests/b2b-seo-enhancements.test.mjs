import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const schema = readFileSync(`${root}/lib/schema-generator.ts`, 'utf8');
const caseStudies = readFileSync(`${root}/app/(site)/[lang]/case-studies/page.tsx`, 'utf8');
const products = readFileSync(`${root}/app/(site)/[lang]/products/page.tsx`, 'utf8');
const workflow = readFileSync(`${root}/.github/workflows/houseplus-quality-gate.yml`, 'utf8');
const packageJson = JSON.parse(readFileSync(`${root}/package.json`, 'utf8'));

test('quote-only Product Schema uses explicit wholesale inquiry semantics without fabricated zero pricing', () => {
  assert.match(schema, /Contact HousePlus Group for wholesale pricing/);
  assert.match(schema, /ContactAction/);
  assert.doesNotMatch(schema, /price:\s*['"]0['"]/);
});

test('case studies and product catalogue contain descriptive bidirectional internal links', () => {
  assert.match(caseStudies, /products\/\?category=solar/);
  assert.match(caseStudies, /products\/\?category=home-appliances/);
  assert.match(caseStudies, /products\/\?category=3c-electronics/);
  assert.match(products, /case-studies/);
  assert.match(products, /Read wholesale case studies/);
});

test('release gate runs global metadata, structured data and image source checks', () => {
  assert.equal(packageJson.scripts['audit:production-metadata'], 'node scripts/audit-production-metadata.mjs');
  assert.equal(packageJson.scripts['audit:production-seo-schema'], 'node scripts/audit-production-seo-schema.mjs');
  assert.equal(packageJson.scripts['audit:image-seo-source'], 'node scripts/audit-image-seo-source.mjs');
  assert.match(workflow, /pnpm audit:production-metadata/);
  assert.match(workflow, /pnpm audit:production-seo-schema/);
  assert.match(workflow, /pnpm audit:image-seo-source/);
});
