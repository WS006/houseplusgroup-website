import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, relative, extname, sep } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '../..');
const mapPath = resolve(repositoryRoot, 'audit/r2-switch/r2-url-switch-map.json');
const auditDirectory = resolve(repositoryRoot, 'audit/r2-switch');
const sourceRoots = ['app', 'components', 'lib', 'data'];
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);
const dryRun = process.env.R2_URL_SWITCH_DRY_RUN === '1';

async function collectSourceFiles(directory) {
  const absoluteDirectory = resolve(repositoryRoot, directory);
  let entries;
  try {
    entries = await readdir(absoluteDirectory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolutePath = resolve(absoluteDirectory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(relative(repositoryRoot, absolutePath));
    return sourceExtensions.has(extname(entry.name)) ? [absolutePath] : [];
  }));
  return nested.flat();
}

const mapping = JSON.parse(await readFile(mapPath, 'utf8')).mappings;
const sourceFiles = (await Promise.all(sourceRoots.map(collectSourceFiles))).flat()
  .filter((filePath) => !filePath.endsWith(`${sep}r2-media-map.ts`));
const localImagePattern = /(['"`])((?:\/images\/[^'"`$]+?\.(?:jpe?g|png|webp|gif|svg))|(?:\/(?:logo|favicon|apple-touch-icon|android-chrome-(?:192x192|512x512))\.png))\1/g;
const changes = [];
const unmapped = new Set();

for (const filePath of sourceFiles) {
  const original = await readFile(filePath, 'utf8');
  let replacements = [];
  const updated = original.replace(localImagePattern, (full, quote, localPath) => {
    const r2Url = mapping[localPath];
    if (!r2Url) {
      unmapped.add(localPath);
      return full;
    }
    replacements.push({ local_path: localPath, r2_url: r2Url });
    return `${quote}${r2Url}${quote}`;
  });
  if (updated !== original) {
    changes.push({ file: relative(repositoryRoot, filePath).split(sep).join('/'), replacements });
    if (!dryRun) await writeFile(filePath, updated);
  }
}

await mkdir(auditDirectory, { recursive: true });
const report = {
  generated_at: new Date().toISOString(),
  dry_run: dryRun,
  changed_files: changes.length,
  replaced_references: changes.reduce((total, entry) => total + entry.replacements.length, 0),
  unmapped_references: [...unmapped].sort(),
  changes,
};
await writeFile(resolve(auditDirectory, dryRun ? 'r2-url-switch-preview.json' : 'r2-url-switch-applied.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  dry_run: dryRun,
  changed_files: report.changed_files,
  replaced_references: report.replaced_references,
  unmapped_references: report.unmapped_references.length,
}, null, 2));
