import { readFile, writeFile } from 'node:fs/promises';

const productsPath = new URL('../lib/localized-content/products.json', import.meta.url);
const batchOutputPath = process.argv[2];
if (!batchOutputPath) throw new Error('Usage: node scripts/apply-product-technical-translations.mjs <batch-output.jsonl>');

const products = JSON.parse(await readFile(productsPath, 'utf8'));
const rows = (await readFile(batchOutputPath, 'utf8')).trim().split('\n').filter(Boolean).map((line) => JSON.parse(line));
let applied = 0;
let rejected = 0;
const rejectedItems = [];
const numericSignature = (value) => (value.match(/\d+(?:[.,]\d+)?/g) || []).sort().join('|');

for (const row of rows) {
  if (row.error || !row.output) {
    rejected += 1;
    rejectedItems.push({ reason: 'batch_error', input: row.input });
    continue;
  }
  const task = JSON.parse(row.input);
  let result;
  try {
    result = JSON.parse(row.output);
  } catch {
    rejected += 1;
    rejectedItems.push({ reason: 'invalid_json', input: row.input });
    continue;
  }
  if (!Array.isArray(result.translations) || result.translations.length !== task.fields.length) {
    rejected += 1;
    rejectedItems.push({ reason: 'translation_count', slug: task.slug, locale: task.locale });
    continue;
  }
  const product = products[task.slug]?.[task.locale];
  if (!product) {
    rejected += 1;
    rejectedItems.push({ reason: 'missing_product', slug: task.slug, locale: task.locale });
    continue;
  }
  let taskValid = true;
  for (let index = 0; index < task.fields.length; index += 1) {
    const source = task.fields[index];
    const translation = String(result.translations[index] || '').trim();
    if (!translation || numericSignature(source.text) !== numericSignature(translation)) {
      taskValid = false;
      rejectedItems.push({ reason: 'numeric_signature', slug: task.slug, locale: task.locale, field: source, translation });
      break;
    }
  }
  if (!taskValid) {
    rejected += 1;
    continue;
  }
  for (let index = 0; index < task.fields.length; index += 1) {
    const source = task.fields[index];
    const translation = String(result.translations[index]).trim();
    if (source.kind === 'spec') product.specs[source.index].value = translation;
    if (source.kind === 'imageTitle') product.imageTitle = translation;
    applied += 1;
  }
}

await writeFile(productsPath, `${JSON.stringify(products, null, 2)}\n`);
await writeFile('/tmp/houseplus-technical-translation-rejections.json', JSON.stringify(rejectedItems, null, 2));
console.log(JSON.stringify({ applied, rejected, rejections: rejectedItems.length }));
