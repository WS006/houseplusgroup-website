import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const articles = JSON.parse(readFileSync(`${root}/lib/localized-content/articles.json`, 'utf8'));
const slugs = [
  'solar-panel-rfq-checklist-international-buyers',
  'home-appliance-oem-sample-evaluation-checklist',
  'usb-c-accessories-wholesale-specification-checklist',
  'battery-energy-storage-rfq-data-checklist',
  'portable-power-supply-solar-storage-b2b-guide',
];

for (const slug of slugs) {
  test(`${slug} has localized article body and FAQ content in all non-English locales`, () => {
    for (const locale of ['es', 'de', 'fr', 'ar']) {
      const article = articles[slug]?.[locale];
      assert.ok(article, `${slug}/${locale} missing`);
      assert.equal(article.sections?.length, 4, `${slug}/${locale} sections`);
      assert.equal(article.faqs?.length, 3, `${slug}/${locale} FAQs`);
      assert.ok(article.sections.every((section) => section.heading && section.paragraphs?.length >= 2));
      assert.ok(article.faqs.every((faq) => faq.question && faq.answer));
    }
  });
}
