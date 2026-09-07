import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const outDir = process.argv[2] || 'audit/image-seo-source';
const sourceFiles = [];

async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (/\.(tsx|ts|json)$/.test(entry.name)) sourceFiles.push(path);
  }
}
for (const sourceRoot of [join(root, 'app/(site)'), join(root, 'components')]) {
  await collect(sourceRoot);
}

const findings = [];
let nativeImgCount = 0;
let nextImageCount = 0;
let missingAltCount = 0;
let missingDimensionsCount = 0;
let missingSizesCount = 0;
let titleCount = 0;
let priorityCount = 0;

for (const file of sourceFiles) {
  const text = await readFile(file, 'utf8');
  nativeImgCount += (text.match(/<img\b/gi) || []).length;
  const tags = text.match(/<Image\b[\s\S]*?\/>/g) || [];
  nextImageCount += tags.length;
  for (const tag of tags) {
    const rel = relative(root, file);
    if (!/\balt\s*=/.test(tag)) {
      missingAltCount += 1;
      findings.push({ type: 'missing-alt', file: rel, excerpt: tag.slice(0, 180) });
    }
    const hasFill = /\bfill\b/.test(tag);
    if (!hasFill && (!/\bwidth\s*=/.test(tag) || !/\bheight\s*=/.test(tag))) {
      missingDimensionsCount += 1;
      findings.push({ type: 'missing-dimensions', file: rel, excerpt: tag.slice(0, 180) });
    }
    if (!/\bsizes\s*=/.test(tag)) {
      missingSizesCount += 1;
      findings.push({ type: 'missing-sizes', file: rel, excerpt: tag.slice(0, 180) });
    }
    if (/\btitle\s*=/.test(tag)) titleCount += 1;
    if (/\bpriority\b/.test(tag)) priorityCount += 1;
  }
}

const imageUrls = [];
for (const path of [join(root, 'lib/product-data.ts'), join(root, 'lib/blog-data'), join(root, 'lib/localized-content')]) {
  try {
    const stat = await import('node:fs/promises').then(({ stat }) => stat(path));
    if (stat.isDirectory()) await collect(path);
    else sourceFiles.push(path);
  } catch {}
}
for (const file of sourceFiles) {
  if (!/\.(ts|json)$/.test(file)) continue;
  const text = await readFile(file, 'utf8');
  for (const match of text.matchAll(/https?:\/\/images\.houseplus-ch\.com\/media\/([^/'"`]+)/g)) imageUrls.push(match[1]);
}
const genericSlugs = imageUrls.filter((slug) => /^(image|img|photo|picture|untitled|download|asset)[-_\d]?/i.test(slug));

const result = {
  generatedAt: new Date().toISOString(),
  sourceFileCount: sourceFiles.length,
  nativeImgCount,
  nextImageCount,
  missingAltCount,
  missingDimensionsCount,
  missingSizesCount,
  titleCount,
  priorityCount,
  mediaUrlCount: imageUrls.length,
  uniqueMediaUrlCount: new Set(imageUrls).size,
  genericMediaSlugCount: genericSlugs.length,
  genericMediaSlugs: [...new Set(genericSlugs)].slice(0, 50),
  findings: findings.slice(0, 100),
};
await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, 'result.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
