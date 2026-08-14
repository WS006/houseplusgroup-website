import { mkdir, readFile, writeFile } from 'node:fs/promises';

const productsPath = new URL('../lib/localized-content/products.json', import.meta.url);
const outputPath = process.argv[2] || '/tmp/houseplus-technical-translation-input.jsonl';
const products = JSON.parse(await readFile(productsPath, 'utf8'));
const locales = ['es', 'de', 'fr', 'ar'];
const tasks = [];

for (const [slug, productLocales] of Object.entries(products)) {
  for (const locale of locales) {
    const product = productLocales[locale];
    if (!product) continue;
    const fields = [
      ...(product.specs || []).map((spec, index) => ({ kind: 'spec', index, text: spec.value })),
      ...(product.imageTitle ? [{ kind: 'imageTitle', index: 0, text: product.imageTitle }] : []),
    ].filter((field) => /[A-Za-zÀ-ÿ\u0600-\u06FF]/.test(field.text));
    if (fields.length) tasks.push({ slug, locale, fields });
  }
}

await mkdir(new URL('.', `file://${outputPath.startsWith('/') ? '' : process.cwd()}/`).pathname, { recursive: true }).catch(() => {});
await writeFile(outputPath, `${tasks.map((task) => JSON.stringify(task)).join('\n')}\n`);
console.log(JSON.stringify({ tasks: tasks.length, fields: tasks.reduce((sum, task) => sum + task.fields.length, 0), outputPath }));
