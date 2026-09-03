import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const faqPage = fs.readFileSync('app/[lang]/faq/page.tsx', 'utf8');
const schemaGenerator = fs.readFileSync('lib/schema-generator.ts', 'utf8');

 test('FAQ page emits FAQPage JSON-LD from the visible Q&A dataset', () => {
  assert.match(faqPage, /const allFaqs = content\.flatMap/);
  assert.match(faqPage, /const faqSchema = generateFAQSchema\(allFaqs, lang\)/);
  assert.match(faqPage, /<SEOHead schemas=\{\[faqSchema, breadcrumbSchema\]\}/);
  assert.match(schemaGenerator, /'@type': 'FAQPage'/);
  assert.match(schemaGenerator, /mainEntity: faqItems\.map/);
});

test('FAQ Schema uses localized language and standard Question/Answer nodes', () => {
  assert.match(schemaGenerator, /inLanguage: lang/);
  assert.match(schemaGenerator, /'@type': 'Question'/);
  assert.match(schemaGenerator, /'@type': 'Answer'/);
});
