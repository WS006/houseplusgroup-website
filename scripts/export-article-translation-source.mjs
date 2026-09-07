import { readFile, writeFile } from 'node:fs/promises';
import ts from 'typescript';

const root = new URL('..', import.meta.url).pathname;
const input = `${root}/lib/blog-data/august-2026-b2b-insights.ts`;
const output = process.argv[2] || `${root}/audit/article-translation-source.json`;
const source = await readFile(input, 'utf8');
const patched = source.replace("import { r2MediaUrl } from '../r2-media-map';", "const r2MediaUrl = (value) => value;");
const compiled = ts.transpileModule(patched, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const module = { exports: {} };
const loader = new Function('require', 'module', 'exports', compiled);
loader(() => { throw new Error('Unexpected require in translated article source'); }, module, module.exports);
const wanted = {
  'solar-panel-rfq-checklist-international-buyers': module.exports.solarRfqChecklist,
  'home-appliance-oem-sample-evaluation-checklist': module.exports.applianceSampleEvaluation,
  'usb-c-accessories-wholesale-specification-checklist': module.exports.usbCProcurementGuide,
  'battery-energy-storage-rfq-data-checklist': module.exports.batteryRfqDataGuide,
  'portable-power-supply-solar-storage-b2b-guide': module.exports.portablePowerB2bGuide,
};
await writeFile(output, JSON.stringify(wanted, null, 2));
console.log(`Exported ${Object.keys(wanted).length} articles to ${output}`);
