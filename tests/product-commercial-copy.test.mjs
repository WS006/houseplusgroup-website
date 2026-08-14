import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const products = JSON.parse(readFileSync(new URL('../lib/localized-content/products.json', import.meta.url), 'utf8'));

test('localized product records retain no unverified GEO or fixed commercial FAQ copy', () => {
  for (const [slug, locales] of Object.entries(products)) {
    for (const [locale, product] of Object.entries(locales)) {
      assert.equal(product.geoDescription, '', `${slug}/${locale} must not publish a GEO claim block`);
      assert.deepEqual(product.faq, [], `${slug}/${locale} must not publish a fixed commercial FAQ`);
      assert.equal('b2bInfo' in product, false, `${slug}/${locale} must not contain B2B fixed terms`);
    }
  }
});
