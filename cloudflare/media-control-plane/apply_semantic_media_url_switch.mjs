import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { resolve, extname, relative } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '../..');
const aliasesFile = resolve(repositoryRoot, 'lib/r2-media-aliases.ts');
const reportDir = resolve(repositoryRoot, 'audit/r2-switch');
const targetRoots = ['app', 'components', 'lib', 'data'].map((directory) => resolve(repositoryRoot, directory));
const allowedExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);
const excludedFiles = new Set([
  resolve(repositoryRoot, 'lib/r2-media-aliases.ts'),
  resolve(repositoryRoot, 'cloudflare/media-control-plane/worker.mjs'),
]);
const origin = 'https://images.houseplus-ch.com';
const apply = process.argv.includes('--apply');

async function filesIn(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return filesIn(path);
      return entry.isFile() && allowedExtensions.has(extname(entry.name)) ? [path] : [];
    }));
    return nested.flat();
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

const aliasesSource = await readFile(aliasesFile, 'utf8');
const match = aliasesSource.match(/R2_MEDIA_PUBLIC_SLUG_BY_ASSET_ID:[^=]*=\s*(\{[\s\S]*?\});/);
if (!match) throw new Error('Could not read R2_MEDIA_PUBLIC_SLUG_BY_ASSET_ID.');
const aliases = JSON.parse(match[1]);
const replacements = Object.entries(aliases).map(([assetId, slug]) => ({
  assetId,
  legacy: `${origin}/media/${assetId}/`,
  canonical: `${origin}/media/${slug}/`,
}));

const files = [...new Set((await Promise.all(targetRoots.map(filesIn))).flat())].filter((file) => !excludedFiles.has(file));
const changes = [];
for (const file of files) {
  const original = await readFile(file, 'utf8');
  let next = original;
  let count = 0;
  for (const replacement of replacements) {
    const escaped = replacement.legacy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const expression = new RegExp(escaped, 'g');
    const hits = next.match(expression)?.length || 0;
    if (hits) {
      next = next.replace(expression, replacement.canonical);
      count += hits;
    }
  }
  if (next !== original) {
    changes.push({ file: relative(repositoryRoot, file), replacements: count });
    if (apply) await writeFile(file, next);
  }
}

await mkdir(reportDir, { recursive: true });
const report = {
  mode: apply ? 'applied' : 'preview',
  canonical_origin: origin,
  aliases_available: replacements.length,
  files_changed: changes.length,
  urls_replaced: changes.reduce((sum, change) => sum + change.replacements, 0),
  changes,
};
await writeFile(resolve(reportDir, `semantic-media-url-switch-${apply ? 'applied' : 'preview'}.json`), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
