import { readFile, writeFile } from 'node:fs/promises';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error('Usage: compile-foundation-page-copy.mjs <input.jsonl> <output.ts>');

const rows = (await readFile(inputPath, 'utf8')).trim().split('\n').map((line) => JSON.parse(line));
const result = {};
for (const row of rows) {
  if (row.error || !row.output) throw new Error(`Missing translated output at index ${row.index}`);
  const source = JSON.parse(row.input);
  result[source.slug] = { en: { title: source.title, heading: source.heading, body: source.body }, ...JSON.parse(row.output) };
}

const content = `// Generated from reviewed, safe source copy. Do not add commercial claims without verification.\nexport const foundationPageCopy = ${JSON.stringify(result, null, 2)} as const;\n\nexport type FoundationPageSlug = keyof typeof foundationPageCopy;\n`;
await writeFile(outputPath, content);
console.log(`Prepared ${Object.keys(result).length} foundation page records at ${outputPath}`);
