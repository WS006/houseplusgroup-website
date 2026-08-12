import { appendFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '../..');
const imageRoot = resolve(repositoryRoot, 'public/images');
const journalPath = resolve(repositoryRoot, 'audit/r2-static-media-import.jsonl');
const apiBase = (process.env.HOUSEPLUS_MEDIA_API_URL || '').replace(/\/$/, '');
const adminToken = process.env.HOUSEPLUS_MEDIA_API_TOKEN || '';
const siteOrigin = 'https://www.houseplus-ch.com';

if (!apiBase || !adminToken) {
  throw new Error('HOUSEPLUS_MEDIA_API_URL and HOUSEPLUS_MEDIA_API_TOKEN are required.');
}

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) return collectImages(absolutePath);
    return /\.(jpe?g)$/i.test(entry.name) ? [absolutePath] : [];
  }));
  return nested.flat();
}

function topicFor(relativePath) {
  const folder = relativePath.split('/')[0];
  if (folder === 'products') return 'products';
  if (folder === 'articles') return 'articles';
  if (folder === 'factory') return 'factory';
  if (folder === 'team') return 'team';
  if (folder === 'site') return 'site';
  if (folder === 'covers') return 'articles';
  return 'site';
}

async function readCompletedSources() {
  try {
    const content = await readFile(journalPath, 'utf8');
    return new Set(content.split('\n').filter(Boolean).map((line) => JSON.parse(line).source_path));
  } catch (error) {
    if (error.code === 'ENOENT') return new Set();
    throw error;
  }
}

async function request(url, options, label) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (response.ok) return response;
      lastError = new Error(`${label} failed with HTTP ${response.status}: ${await response.text()}`);
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 500 * attempt));
  }
  throw lastError;
}

await mkdir(resolve(repositoryRoot, 'audit'), { recursive: true });
const completed = await readCompletedSources();
const files = (await collectImages(imageRoot)).sort();
let imported = 0;
let skipped = 0;

for (const filePath of files) {
  const sourcePath = relative(imageRoot, filePath).split(sep).join('/');
  if (completed.has(sourcePath)) {
    skipped += 1;
    continue;
  }

  const optimizedPath = resolve(repositoryRoot, 'audit/r2-optimized-media', sourcePath);
  let content;
  let uploadVariant = 'original';
  try {
    content = await readFile(optimizedPath);
    uploadVariant = 'compressed-web-copy';
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    content = await readFile(filePath);
  }
  const topic = topicFor(sourcePath);
  const upload = await request(`${apiBase}/v1/upload`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${adminToken}`,
      'content-type': 'image/jpeg',
      'x-filename': sourcePath,
      'x-topic': topic,
    },
    body: content,
  }, `Upload ${sourcePath}`);
  const asset = await upload.json();

  await request(`${apiBase}/v1/assets/${asset.asset_id}`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${adminToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      status: 'needs_review',
      seo_indexable: false,
      source_url: `${siteOrigin}/images/${sourcePath}`,
      metadata_json: {
        migration: 'static-image-copy-to-r2',
        source_path: sourcePath,
        upload_variant: uploadVariant,
        imported_at: new Date().toISOString(),
      },
    }),
  }, `Metadata update ${sourcePath}`);

  await appendFile(journalPath, `${JSON.stringify({
    source_path: sourcePath,
    asset_id: asset.asset_id,
    r2_key: asset.r2_key,
    imported_at: new Date().toISOString(),
  })}\n`);
  completed.add(sourcePath);
  imported += 1;
  process.stdout.write(`Imported ${imported}/${files.length - skipped}: ${sourcePath}\n`);
}

console.log(JSON.stringify({
  discovered: files.length,
  skipped_from_prior_run: skipped,
  imported_this_run: imported,
  total_recorded: completed.size,
  journal: journalPath,
}, null, 2));
