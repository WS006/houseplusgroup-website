import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../lib/localized-content/products.json', import.meta.url);
const products = JSON.parse(await readFile(file, 'utf8'));
let geoDescriptionsCleared = 0;
let faqSetsCleared = 0;
let b2bBlocksRemoved = 0;

for (const localizations of Object.values(products)) {
  for (const localizedProduct of Object.values(localizations)) {
    if (localizedProduct.geoDescription) {
      localizedProduct.geoDescription = '';
      geoDescriptionsCleared += 1;
    }
    if (Array.isArray(localizedProduct.faq) && localizedProduct.faq.length) {
      localizedProduct.faq = [];
      faqSetsCleared += 1;
    }
    if ('b2bInfo' in localizedProduct) {
      delete localizedProduct.b2bInfo;
      b2bBlocksRemoved += 1;
    }
  }
}

await writeFile(file, `${JSON.stringify(products, null, 2)}\n`);
console.log(JSON.stringify({ geoDescriptionsCleared, faqSetsCleared, b2bBlocksRemoved }));
