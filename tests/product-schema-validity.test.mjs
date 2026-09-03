import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const productPage = fs.readFileSync('app/[lang]/products/[slug]/page.tsx', 'utf8');
const productData = fs.readFileSync('lib/product-data.ts', 'utf8');
const schemaGenerator = fs.readFileSync('lib/schema-generator.ts', 'utf8');

 test('all product pages emit Product JSON-LD from verified catalog data', () => {
  assert.match(productPage, /const productSchema = generateProductSchema\(\{/);
  assert.match(productPage, /sku,/);
  assert.match(productPage, /productSchema \? \[productSchema\] : \[\]/);
  assert.match(productPage, /Quote-only B2B products intentionally omit offers/);
});

test('the current product catalog has no fabricated retail offer, review, or rating data', () => {
  assert.doesNotMatch(productData, /retailOffer:\s*\{/);
  assert.doesNotMatch(productData, /aggregateRating\s*:/);
  assert.doesNotMatch(productData, /review\s*:/);
});

test('Product generator keeps Offer support for future verified retail data', () => {
  assert.match(schemaGenerator, /retailOffer\?:/);
  assert.match(schemaGenerator, /priceCurrency: retailOffer\.currency/);
  assert.match(schemaGenerator, /availability: `https:\/\/schema\.org\/\$\{retailOffer\.availability\}`/);
});
