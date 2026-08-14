import { readFile, writeFile } from 'node:fs/promises';

const dataPath = new URL('../lib/product-data.ts', import.meta.url);
const targets = {
  solar: {
    slugs: ['solar-panel-500w', 'solar-inverter-3kw', 'lithium-battery-5kwh', 'lead-acid-battery-100ah', 'charge-controller-60a', 'solar-street-light-200w', 'solar-fan-20w', 'solar-power-bank-20000mah'],
    certifications: ['CE', 'RoHS', 'ISO 9001'],
  },
  appliances: {
    slugs: ['air-fryer-5-8l', 'induction-cooktop-2000w', 'electric-kettle-1-5l', 'toaster-2-slice'],
    certifications: ['CE', 'ISO 9001'],
  },
  electronics: {
    slugs: ['headphone-over-ear', 'bluetooth-earphone-tws', 'smart-watch', 'portable-ssd-1tb', 'micro-sd-128gb', 'usb-c-cable-2m'],
    certifications: ['CE', 'FCC', 'RoHS', 'ISO 9001'],
  },
};

let source = await readFile(dataPath, 'utf8');
let updates = 0;
for (const { slugs, certifications } of Object.values(targets)) {
  for (const slug of slugs) {
    const marker = `  '${slug}': {`;
    const start = source.indexOf(marker);
    const next = source.indexOf("\n  '", start + marker.length);
    if (start < 0 || next < 0) throw new Error(`Could not locate product block: ${slug}`);
    const block = source.slice(start, next);
    if (/b2bInfo:\s*\{/.test(block)) throw new Error(`Product already has b2bInfo: ${slug}`);
    const insertion = `\n    // User-confirmed category baseline. MOQ and lead time remain quote-confirmed.\n    b2bInfo: {\n      warranty: '12 months',\n      certifications: [${certifications.map((item) => `'${item}'`).join(', ')}],\n    },\n`;
    source = `${source.slice(0, next - 1)}${insertion}${source.slice(next - 1)}`;
    updates += 1;
  }
}

if (updates !== 18) throw new Error(`Expected 18 updates, wrote ${updates}`);
await writeFile(dataPath, source);
console.log(JSON.stringify({ updates, policy: 'warranty-and-certifications-only', moq: 'quote-confirmed', leadTime: 'quote-confirmed' }, null, 2));
