import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = process.argv[2] || path.join(root, 'audit', 'news-commercial-claims');
const staticNewsDir = path.join(root, 'app/[lang]/news');
const patterns = [
  { key: 'unverified-certification', regex: /\b(?:ISO\s?9001|CE\/?FCC\/?RoHS|FCC\/RoHS|CE and RoHS)\b/gi },
  { key: 'unverified-commercial-term', regex: /\b(?:flexible MOQ|MOQ \d+|mass production|lead time|regional warehouse|warehouses|global supply chain)\b/gi },
  { key: 'unverified-scale-or-performance', regex: /\b(?:vertically integrated|A\+\+\+|AI-powered food management|orders groceries|20-40%|15-30%|92-96%|6000 cycles|441\+|53\+ countries)\b/gi },
];

const files = [];
for (const entry of await readdir(staticNewsDir, { withFileTypes: true })) {
  if (entry.isDirectory() && !entry.name.startsWith('[')) files.push(`app/[lang]/news/${entry.name}/page.tsx`);
}
for (const entry of await readdir(path.join(root, 'lib/blog-data'), { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts' && entry.name !== 'types.ts') {
    files.push(`lib/blog-data/${entry.name}`);
  }
}

const findings = [];
for (const relativePath of files.sort()) {
  const source = await readFile(path.join(root, relativePath), 'utf8');
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern.regex)) {
      const start = Math.max(0, match.index - 80);
      const end = Math.min(source.length, match.index + match[0].length + 120);
      findings.push({
        file: relativePath,
        category: pattern.key,
        match: match[0],
        excerpt: source.slice(start, end).replace(/\s+/g, ' ').trim(),
      });
    }
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  auditedFiles: files.length,
  findings: findings.length,
  byCategory: Object.fromEntries(patterns.map(({ key }) => [key, findings.filter((item) => item.category === key).length])),
};
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'summary.json'), JSON.stringify(summary, null, 2));
await writeFile(path.join(outputDir, 'findings.json'), JSON.stringify(findings, null, 2));
console.log(JSON.stringify(summary, null, 2));
