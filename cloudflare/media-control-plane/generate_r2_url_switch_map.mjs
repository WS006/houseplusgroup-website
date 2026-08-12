import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, extname, relative, sep } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '../..');
const publicationJournal = resolve(repositoryRoot, 'audit/r2-media-publication.jsonl');
const outputDirectory = resolve(repositoryRoot, 'audit/r2-switch');
const sourceRoots = ['app', 'components', 'lib', 'data'];
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx']);
const PUBLIC_MEDIA_ORIGIN = 'https://images.houseplus-ch.com';

async function readJsonLines(filePath) {
  const content = await readFile(filePath, 'utf8');
  return content.split('\n').filter(Boolean).map((line) => JSON.parse(line));
}

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

function localPathFor(sourcePath) {
  return sourcePath.startsWith('__root__/')
    ? `/${sourcePath.replace('__root__/', '')}`
    : `/images/${sourcePath}`;
}

const entries = await readJsonLines(publicationJournal);
const pathToR2 = Object.fromEntries(entries.map((entry) => [localPathFor(entry.source_path), `${PUBLIC_MEDIA_ORIGIN}/media/${entry.asset_id}/`]));
const sourceFiles = (await Promise.all(sourceRoots.map(collectSourceFiles))).flat();
const sourceReferences = new Map();
const localReferencePattern = /['"]((?:\/images\/[^'"]+?\.(?:jpe?g|png|webp|gif|svg))|(?:\/(?:logo|favicon|apple-touch-icon|android-chrome-(?:192x192|512x512))\.png))['"]/g;

for (const sourceFile of sourceFiles) {
  const content = await readFile(sourceFile, 'utf8');
  for (const match of content.matchAll(localReferencePattern)) {
    const localPath = match[1];
    const files = sourceReferences.get(localPath) || new Set();
    files.add(relative(repositoryRoot, sourceFile).split(sep).join('/'));
    sourceReferences.set(localPath, files);
  }
}

const references = [...sourceReferences.entries()].map(([local_path, files]) => ({
  local_path,
  r2_url: pathToR2[local_path] || null,
  files: [...files].sort(),
})).sort((a, b) => a.local_path.localeCompare(b.local_path));
const unmappedReferences = references.filter((entry) => !entry.r2_url);
const mappedReferences = references.filter((entry) => entry.r2_url);
const unmappedAssets = Object.keys(pathToR2).filter((path) => !sourceReferences.has(path)).sort();
const output = {
  generated_at: new Date().toISOString(),
  media_origin: PUBLIC_MEDIA_ORIGIN,
  published_assets: entries.length,
  source_references: references.length,
  mapped_source_references: mappedReferences.length,
  unmapped_source_references: unmappedReferences,
  unreferenced_published_assets: unmappedAssets,
  mappings: Object.fromEntries(Object.entries(pathToR2).sort(([left], [right]) => left.localeCompare(right))),
  reference_inventory: references,
};

await mkdir(outputDirectory, { recursive: true });
await writeFile(resolve(outputDirectory, 'r2-url-switch-map.json'), `${JSON.stringify(output, null, 2)}\n`);
const csv = ['local_path,r2_url,referencing_files'];
for (const entry of references) csv.push(`${JSON.stringify(entry.local_path)},${JSON.stringify(entry.r2_url || '')},${JSON.stringify(entry.files.join(' | '))}`);
await writeFile(resolve(outputDirectory, 'r2-url-switch-map.csv'), `${csv.join('\n')}\n`);
const generatedModule = `// Generated from the approved R2 media publication journal. Do not hand-edit.\nexport const R2_MEDIA_BY_LOCAL_PATH: Record<string, string> = ${JSON.stringify(output.mappings, null, 2)};\n\nexport function r2MediaUrl(localPath: string): string {\n  return R2_MEDIA_BY_LOCAL_PATH[localPath] || localPath;\n}\n`;
await writeFile(resolve(repositoryRoot, 'lib/r2-media-map.ts'), generatedModule);
console.log(JSON.stringify({
  published_assets: entries.length,
  source_references: references.length,
  mapped_source_references: mappedReferences.length,
  unmapped_source_references: unmappedReferences.length,
  unreferenced_published_assets: unmappedAssets.length,
  map_file: resolve(outputDirectory, 'r2-url-switch-map.json'),
  typescript_map: resolve(repositoryRoot, 'lib/r2-media-map.ts'),
}, null, 2));
