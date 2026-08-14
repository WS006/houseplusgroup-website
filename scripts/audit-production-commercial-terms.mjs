import { mkdir, readFile, writeFile } from 'node:fs/promises';

const source = await readFile(new URL('../lib/product-data.ts', import.meta.url), 'utf8');
const baseUrl = process.argv[2] || 'https://www.houseplus-ch.com';
const outputDir = process.argv[3] || '/tmp/houseplus-production-commercial-terms-audit';
const locales = ['en', 'es', 'de', 'fr', 'ar'];

const blocks = [...source.matchAll(/^  '([^']+)': \{([\s\S]*?)(?=^  '[^']+': \{|^};$)/gm)];
const products = blocks.map(([, slug, block]) => {
  const section = block.match(/b2bInfo:\s*\{([\s\S]*?)\n\s*\},/)?.[1];
  if (!section) return null;
  const quoted = (field) => section.match(new RegExp(`${field}:\\s*'([^']+)'`))?.[1] || null;
  const certifications = section.match(/certifications:\s*\[([^\]]*)\]/)?.[1]?.match(/'([^']+)'/g)?.map((value) => value.slice(1, -1)) || [];
  return { slug, moq: quoted('moq'), leadTime: quoted('leadTime'), warranty: quoted('warranty'), certifications };
}).filter(Boolean);

const tasks = products.flatMap((product) => locales.map((locale) => ({ ...product, locale })));
const results = [];
let cursor = 0;
async function worker() {
  while (cursor < tasks.length) {
    const task = tasks[cursor++];
    const url = `${baseUrl}/${task.locale}/products/${task.slug}/`;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      const html = await response.text();
      const expected = [task.moq, task.leadTime, task.warranty, ...task.certifications].filter(Boolean);
      const missing = expected.filter((value) => !html.includes(value));
      results.push({ url, status: response.status, missing });
    } catch (error) {
      results.push({ url, status: 0, missing: ['fetch_failed'], detail: error.name });
    }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
const issues = results.filter((result) => result.status !== 200 || result.missing.length > 0);
await mkdir(outputDir, { recursive: true });
await writeFile(`${outputDir}/summary.json`, JSON.stringify({ totalProductsWithFixedTerms: products.length, auditedPages: results.length, issuePages: issues.length, issues }, null, 2));
console.log(JSON.stringify({ totalProductsWithFixedTerms: products.length, auditedPages: results.length, issuePages: issues.length }, null, 2));
