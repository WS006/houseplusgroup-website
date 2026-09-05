import { mkdir, writeFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';

const origin = 'https://images.houseplus-ch.com';
const assets = JSON.parse(await readFile('/tmp/v2-assets.json', 'utf8')).assets;
const queue = assets.filter((asset) => Number(asset.byte_size || 0) > 1_000_000 && (asset.content_type || '').startsWith('image/'));
const outDir = process.argv[2] || 'audit/v2-image-cdn';
await mkdir(outDir, { recursive: true });
async function inspect(asset, accept, cacheBust) {
  const url = `${origin}/media/${asset.public_slug}/?cdn_audit=${cacheBust}`;
  const started = performance.now();
  let response = await fetch(url, { headers: { Accept: accept }, redirect: 'follow' });
  const bytes = Number(response.headers.get('content-length') || 0);
  await response.arrayBuffer();
  return {
    status: response.status,
    finalUrl: response.url,
    contentType: response.headers.get('content-type'),
    contentLength: bytes,
    etag: response.headers.get('etag'),
    cacheControl: response.headers.get('cache-control'),
    cfCacheStatus: response.headers.get('cf-cache-status'),
    age: response.headers.get('age'),
    origin: response.headers.get('x-houseplus-media-origin'),
    elapsedMs: Math.round(performance.now() - started),
  };
}
const results = [];
for (const [index, asset] of queue.entries()) {
  const base = { assetId: asset.asset_id, slug: asset.public_slug, sourceBytes: Number(asset.byte_size), url: `${origin}/media/${asset.public_slug}/` };
  try {
    const original = await inspect(asset, 'image/jpeg,image/png,image/avif;q=0.8,*/*;q=0.1', `orig-${index}`);
    const webp = await inspect(asset, 'image/webp,image/*;q=0.8', `webp-${index}`);
    results.push({ ...base, original, webp, ok: original.status === 200 && webp.status === 200 && webp.contentType?.startsWith('image/webp') && webp.origin === 'houseplus-media-v2' });
  } catch (error) {
    results.push({ ...base, error: String(error), ok: false });
  }
  if ((index + 1) % 10 === 0) console.log(`${index + 1}/${queue.length}`);
}
const summary = {
  generatedAt: new Date().toISOString(),
  origin,
  queueSize: queue.length,
  ok: results.filter((r) => r.ok).length,
  failed: results.filter((r) => !r.ok).length,
  webpContentTypeOk: results.filter((r) => r.webp?.contentType?.startsWith('image/webp')).length,
  v2OriginOk: results.filter((r) => r.webp?.origin === 'houseplus-media-v2').length,
  webpBytes: results.reduce((sum, r) => sum + (r.webp?.contentLength || 0), 0),
  originalBytes: results.reduce((sum, r) => sum + (r.original?.contentLength || 0), 0),
  cacheStatuses: Object.fromEntries(Object.entries(results.reduce((m, r) => { const key = r.webp?.cfCacheStatus || 'missing'; m[key] = (m[key] || 0) + 1; return m; }, {})).sort()),
};
await writeFile(`${outDir}/results.json`, JSON.stringify(results, null, 2));
await writeFile(`${outDir}/summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
