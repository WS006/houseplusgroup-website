import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('product schema publishes only visible technical specifications and keeps quote-only B2B terms guarded', () => {
  const schema = read('lib/schema-generator.ts');
  assert.match(schema, /specifications\?: Array<\{ name: string; value: string \}>/);
  assert.match(schema, /const additionalProperty: Array<Record<string, string>> = specifications/);
  assert.match(schema, /publishB2BProperties = false/);
  assert.match(schema, /\.\.\.\(additionalProperty\.length > 0 && \{ additionalProperty \}\)/);
});

test('all localized product pages emit a visible-content-aligned B2B sourcing HowTo schema', () => {
  const page = read('app/[lang]/products/[slug]/page.tsx');
  const schema = read('lib/schema-generator.ts');
  assert.match(page, /generateProductHowToSchema/);
  assert.match(page, /const productHowToCopy/);
  assert.match(page, /const howToCopy = productHowToCopy\[lang\] \|\| productHowToCopy\.en/);
  assert.match(page, /id="b2b-oem-sourcing-howto"/);
  assert.match(page, /<ol className="space-y-3">/);
  assert.match(page, /productHowToSchema/);
  assert.match(schema, /export function generateProductHowToSchema/);
  assert.match(schema, /'@type': 'HowTo'/);
  assert.match(schema, /'@type': 'HowToStep'/);
  assert.match(schema, /mainEntityOfPage: \{ '@type': 'WebPage', '@id': url, inLanguage: lang \}/);
  for (const locale of ['en', 'es', 'de', 'fr', 'ar']) {
    assert.match(page, new RegExp(`${locale}: \\{[\\s\\S]*?title:`));
  }
});
