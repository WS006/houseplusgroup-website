import { readFile, writeFile } from 'node:fs/promises';

const [inputPath, rejectionPath, outputPath] = process.argv.slice(2);
if (!inputPath || !rejectionPath || !outputPath) {
  throw new Error('Usage: node scripts/prepare-product-technical-translation-retry.mjs <input.jsonl> <rejections.json> <retry.jsonl>');
}

const rejected = JSON.parse(await readFile(rejectionPath, 'utf8'));
const keys = new Set(rejected.filter((item) => item.slug && item.locale).map((item) => `${item.slug}:${item.locale}`));
const tasks = (await readFile(inputPath, 'utf8')).trim().split('\n').filter(Boolean).map((line) => JSON.parse(line));
const retries = tasks.filter((task) => keys.has(`${task.slug}:${task.locale}`));
await writeFile(outputPath, `${retries.map((task) => JSON.stringify(task)).join('\n')}\n`);
console.log(JSON.stringify({ rejectedKeys: keys.size, retryTasks: retries.length }));
