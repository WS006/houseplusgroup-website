import { readFile, writeFile } from 'node:fs/promises';

const dataPath = new URL('../lib/product-data.ts', import.meta.url);
const source = await readFile(dataPath, 'utf8');
let repairs = 0;
let repaired = source.replace(/\n  \}\n(    \/\/ User-confirmed category baseline\. MOQ and lead time remain quote-confirmed\.\n    b2bInfo: \{[\s\S]*?    \},)\n,\n/g, (_match, commercialInfo) => {
  repairs += 1;
  return `\n${commercialInfo}\n  },\n`;
});

repaired = repaired.replace(/\n  \},\n\n(  \/\/ ===== P0 GEO-Optimized Products \(Added 2026-06-26\) ====\n)(    \/\/ User-confirmed category baseline\. MOQ and lead time remain quote-confirmed\.\n    b2bInfo: \{[\s\S]*?    \},)\n=\n/g, (_match, separator, commercialInfo) => {
  repairs += 1;
  return `\n${commercialInfo}\n  },\n\n${separator}`;
});

if (repairs !== 18) throw new Error(`Expected 18 misplaced commercial records, repaired ${repairs}`);
await writeFile(dataPath, repaired);
console.log(JSON.stringify({ repairs }, null, 2));
