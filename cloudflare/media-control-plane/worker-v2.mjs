const PUBLIC_MEDIA_ORIGIN = 'https://images.houseplus-ch.com';
const ALT_PROXY_URL = 'https://monitor.houseplus-ch.com/api/media-alt/generate';
const LOCALES = ['en', 'ar', 'de', 'es', 'fr'];
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']);

function json(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...headers,
    },
  });
}

function cors(request, methods = 'GET, HEAD, OPTIONS') {
  const origin = request.headers.get('origin') || '';
  return ['https://www.houseplus-ch.com', 'https://houseplus-ch.com'].includes(origin)
    ? {
        'access-control-allow-origin': origin,
        'access-control-allow-methods': methods,
        'access-control-allow-headers': 'authorization, content-type, range, if-none-match, if-modified-since, x-filename, x-public-slug, x-topic',
        'access-control-expose-headers': 'accept-ranges, content-length, content-range, etag',
      }
    : {};
}

function withCors(request, headers = {}) {
  return { ...headers, ...cors(request) };
}

function publicUrl(asset) {
  return `${PUBLIC_MEDIA_ORIGIN}/media/${asset.public_slug}/`;
}

function bearer(request) {
  return request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim() || '';
}

function isAuthorized(request, env) {
  const expected = env.ADMIN_TOKEN || '';
  const actual = bearer(request);
  return Boolean(expected && actual && actual === expected);
}

function slugify(value) {
  return String(value || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\.[a-z0-9]{2,5}$/i, '')
    .replace(/[^a-z0-9\u0600-\u06ff\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120) || 'houseplus-media';
}

function safeFilename(value) {
  return String(value || 'upload').replace(/[\\"\r\n]/g, '').slice(0, 240) || 'upload';
}

function uuid() {
  return crypto.randomUUID();
}

async function findAsset(env, identifier) {
  return env.MEDIA_DB.prepare(
    'SELECT asset_id, public_slug, r2_key, original_filename, content_type, byte_size, status, topic, metadata_json FROM assets WHERE asset_id = ? OR public_slug = ? LIMIT 1',
  ).bind(identifier, identifier).first();
}

async function serveMedia(request, env, identifier) {
  const asset = await findAsset(env, identifier);
  if (!asset || asset.status !== 'approved') return json({ error: 'Media asset not found' }, 404, withCors(request));
  const object = await env.MEDIA_BUCKET.get(asset.r2_key, { range: request.headers });
  if (!object) return json({ error: 'Media object unavailable' }, 404, withCors(request));
  const headers = new Headers({
    'content-type': asset.content_type || 'application/octet-stream',
    'content-disposition': `inline; filename="${safeFilename(asset.original_filename || asset.public_slug)}"`,
    'cache-control': 'public, max-age=31536000, immutable',
    etag: object.httpEtag,
    'accept-ranges': 'bytes',
    'x-content-type-options': 'nosniff',
    'x-houseplus-media-origin': 'houseplus-media-v2',
    ...withCors(request),
  });
  object.writeHttpMetadata(headers);
  headers.set('content-type', asset.content_type || 'application/octet-stream');
  if (request.headers.has('range') && object.range) {
    const end = object.range.offset + object.range.length - 1;
    headers.set('content-range', `bytes ${object.range.offset}-${end}/${object.size}`);
    headers.set('content-length', String(object.range.length));
    return new Response(request.method === 'HEAD' ? null : object.body, { status: 206, headers });
  }
  headers.set('content-length', String(object.size));
  return new Response(request.method === 'HEAD' ? null : object.body, { status: 200, headers });
}

async function parseUpload(request) {
  const contentType = (request.headers.get('content-type') || '').split(';')[0].toLowerCase();
  if (contentType === 'multipart/form-data') {
    const form = await request.formData();
    const file = form.get('file') || form.get('image');
    if (!(file instanceof File)) throw new Error('multipart upload requires a file or image field');
    return {
      bytes: await file.arrayBuffer(),
      contentType: file.type || 'application/octet-stream',
      filename: file.name || request.headers.get('x-filename') || 'upload',
      publicSlug: form.get('public_slug') || request.headers.get('x-public-slug') || '',
      topic: form.get('topic') || request.headers.get('x-topic') || '',
    };
  }
  return {
    bytes: await request.arrayBuffer(),
    contentType,
    filename: request.headers.get('x-filename') || 'upload',
    publicSlug: request.headers.get('x-public-slug') || '',
    topic: request.headers.get('x-topic') || '',
  };
}

async function audit(env, assetId, eventType, details) {
  await env.MEDIA_DB.prepare(
    'INSERT INTO asset_audit_log (event_id, asset_id, event_type, actor, details_json) VALUES (?, ?, ?, ?, ?)',
  ).bind(uuid(), assetId, eventType, 'houseplus-media-v2', JSON.stringify(details || {})).run();
}

async function saveTranslations(env, assetId, metadata, onlyMissing = true) {
  let saved = 0;
  for (const locale of LOCALES) {
    const item = metadata?.[locale];
    if (!item?.alt_text || !item?.title) continue;
    const sql = onlyMissing
      ? `INSERT INTO asset_translations (translation_id, asset_id, locale, alt_text, title, updated_at)
         VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(asset_id, locale) DO UPDATE SET
           alt_text = CASE WHEN asset_translations.alt_text IS NULL OR TRIM(asset_translations.alt_text) = '' THEN excluded.alt_text ELSE asset_translations.alt_text END,
           title = CASE WHEN asset_translations.title IS NULL OR TRIM(asset_translations.title) = '' THEN excluded.title ELSE asset_translations.title END,
           updated_at = CURRENT_TIMESTAMP`
      : `INSERT INTO asset_translations (translation_id, asset_id, locale, alt_text, title, updated_at)
         VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(asset_id, locale) DO UPDATE SET alt_text = excluded.alt_text, title = excluded.title, updated_at = CURRENT_TIMESTAMP`;
    await env.MEDIA_DB.prepare(sql).bind(uuid(), assetId, locale, item.alt_text, item.title).run();
    saved += 1;
  }
  return saved;
}

async function generateAltForAsset(env, asset, onlyMissing = true) {
  await audit(env, asset.asset_id, 'alt_generation_started', { onlyMissing });
  const response = await fetch(ALT_PROXY_URL, {
    method: 'POST',
    headers: { authorization: `Bearer ${env.ADMIN_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      filename: asset.original_filename,
      public_slug: asset.public_slug,
      topic: asset.topic || '',
      image_url: publicUrl(asset),
      relation_context: 'HousePlus B2B media asset; describe only visible content and supplied context.',
    }),
  });
  if (!response.ok) throw new Error(`Alt proxy returned ${response.status}`);
  const payload = await response.json();
  const saved = await saveTranslations(env, asset.asset_id, payload.metadata, onlyMissing);
  await env.MEDIA_DB.prepare(
    `UPDATE assets SET seo_indexable = 1, metadata_json = json_set(COALESCE(metadata_json, '{}'), '$.alt_generation_status', 'complete', '$.alt_generation_model', ?, '$.alt_generation_at', CURRENT_TIMESTAMP), updated_at = CURRENT_TIMESTAMP WHERE asset_id = ?`,
  ).bind(payload.model || 'gpt-5-mini', asset.asset_id).run();
  await audit(env, asset.asset_id, 'alt_generation_completed', { saved, model: payload.model || 'gpt-5-mini' });
  return { asset_id: asset.asset_id, saved, model: payload.model || 'gpt-5-mini' };
}

async function upload(request, env, ctx) {
  if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, 401, withCors(request));
  const upload = await parseUpload(request);
  if (!IMAGE_TYPES.has(upload.contentType)) return json({ error: 'Only jpeg, png, webp, avif and gif images are supported' }, 415, withCors(request));
  if (!upload.bytes.byteLength || upload.bytes.byteLength > MAX_UPLOAD_BYTES) return json({ error: `Image must be between 1 byte and ${MAX_UPLOAD_BYTES} bytes` }, 413, withCors(request));

  const assetId = uuid();
  const filename = safeFilename(upload.filename);
  const publicSlug = `${slugify(upload.publicSlug || filename)}-${assetId.slice(0, 8)}`;
  const r2Key = `media-live-v1/objects/${assetId}/${filename}`;
  const asset = {
    asset_id: assetId,
    public_slug: publicSlug,
    r2_key: r2Key,
    public_url: `${PUBLIC_MEDIA_ORIGIN}/media/${publicSlug}/`,
    original_filename: filename,
    content_type: upload.contentType,
    byte_size: upload.bytes.byteLength,
    topic: String(upload.topic || '').slice(0, 500),
  };

  await env.MEDIA_BUCKET.put(r2Key, upload.bytes, { httpMetadata: { contentType: upload.contentType, contentDisposition: `inline; filename=\"${filename}\"` } });
  try {
    await env.MEDIA_DB.prepare(
      `INSERT INTO assets (asset_id, public_slug, r2_key, public_url, original_filename, content_type, byte_size, asset_type, topic, status, seo_indexable, metadata_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'image', ?, 'approved', 0, ?)`
    ).bind(asset.asset_id, asset.public_slug, asset.r2_key, asset.public_url, asset.original_filename, asset.content_type, asset.byte_size, asset.topic, JSON.stringify({ alt_generation_status: 'queued', source: 'v1/upload' })).run();
  } catch (error) {
    await env.MEDIA_BUCKET.delete(r2Key);
    throw error;
  }
  await audit(env, assetId, 'asset_uploaded', { r2_key: r2Key, byte_size: asset.byte_size, content_type: asset.content_type });
  ctx.waitUntil(generateAltForAsset(env, asset, true).catch(async error => {
    await env.MEDIA_DB.prepare(`UPDATE assets SET metadata_json = json_set(COALESCE(metadata_json, '{}'), '$.alt_generation_status', 'failed', '$.alt_generation_error', ?), updated_at = CURRENT_TIMESTAMP WHERE asset_id = ?`).bind(String(error?.message || 'generation failed').slice(0, 500), assetId).run();
    await audit(env, assetId, 'alt_generation_failed', { error: String(error?.message || error).slice(0, 500) });
  }));
  return json({ asset: { ...asset, status: 'approved', seo_indexable: 0 }, alt_generation: 'queued' }, 201, withCors(request, { location: asset.public_url }));
}

async function generateOne(request, env, identifier) {
  if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, 401, withCors(request));
  const asset = await findAsset(env, identifier);
  if (!asset) return json({ error: 'Media asset not found' }, 404, withCors(request));
  try {
    return json({ result: await generateAltForAsset(env, asset, true) }, 200, withCors(request));
  } catch (error) {
    await audit(env, asset.asset_id, 'alt_generation_failed', { error: String(error?.message || error).slice(0, 500) });
    return json({ error: 'Alt generation failed; asset remains available for retry' }, 502, withCors(request));
  }
}

async function backfill(request, env, ctx) {
  if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, 401, withCors(request));
  const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {};
  const limit = Math.min(Math.max(Number(body.limit) || 5, 1), 10);
  const offset = Math.max(Number(body.offset) || 0, 0);
  const rows = await env.MEDIA_DB.prepare(`SELECT asset_id, public_slug, r2_key, original_filename, content_type, byte_size, status, topic, metadata_json FROM assets WHERE status = 'approved' ORDER BY created_at, asset_id LIMIT ? OFFSET ?`).bind(limit, offset).all();
  const assets = rows.results || [];
  const results = [];
  for (const asset of assets) {
    try { results.push(await generateAltForAsset(env, asset, true)); }
    catch (error) { results.push({ asset_id: asset.asset_id, error: String(error?.message || error).slice(0, 300) }); }
  }
  return json({ offset, limit, processed: assets.length, next_offset: assets.length === limit ? offset + assets.length : null, results }, 200, withCors(request));
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request, 'GET, HEAD, OPTIONS, POST') });
    if (url.pathname === '/health') return json({ service: 'houseplus-media-v2', status: 'ok', timestamp: new Date().toISOString() }, 200, withCors(request));
    const match = url.pathname.match(/^\/media\/([a-z0-9\u0600-\u06ff\u4e00-\u9fff-]+)\/?$/i);
    if ((request.method === 'GET' || request.method === 'HEAD') && match) return serveMedia(request, env, match[1]);
    if (request.method === 'GET' && url.pathname === '/v1/assets') {
      const rows = await env.MEDIA_DB.prepare("SELECT asset_id, public_slug, public_url, r2_key, content_type, byte_size, topic, status FROM assets WHERE status = 'approved' ORDER BY public_slug LIMIT 200").all();
      return json({ assets: rows.results || [], total: (rows.results || []).length }, 200, withCors(request));
    }
    if (request.method === 'POST' && url.pathname === '/v1/upload') {
      try { return await upload(request, env, ctx); }
      catch (error) { console.error('Upload failed', error); return json({ error: String(error?.message || 'Upload failed').slice(0, 500) }, 500, withCors(request)); }
    }
    const one = url.pathname.match(/^\/v1\/alt\/generate\/([^/]+)$/);
    if (request.method === 'POST' && one) return generateOne(request, env, one[1]);
    if (request.method === 'POST' && url.pathname === '/v1/alt/backfill') {
      try { return await backfill(request, env, ctx); }
      catch (error) { console.error('Backfill failed', error); return json({ error: String(error?.message || 'Backfill failed').slice(0, 500) }, 500, withCors(request)); }
    }
    return json({ error: 'Route not found' }, 404, withCors(request));
  },
};