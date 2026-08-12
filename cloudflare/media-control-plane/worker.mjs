const ALLOWED_STATUSES = new Set(['draft', 'needs_review', 'approved', 'deprecated', 'archived']);
const ALLOWED_ROLES = new Set(['article_hero', 'product_primary', 'product_gallery', 'page_hero', 'card', 'open_graph', 'inline', 'document_preview']);
const ALLOWED_ENTITY_TYPES = new Set(['article', 'product', 'page', 'brand', 'team_member', 'factory', 'document']);

const json = (body, status = 200, extraHeaders = {}) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    ...extraHeaders,
  },
});

function getCorsHeaders(request) {
  const origin = request.headers.get('origin') || '';
  const allowed = new Set(['https://www.houseplus-ch.com', 'https://houseplus-ch.com']);
  return allowed.has(origin)
    ? { 'access-control-allow-origin': origin, 'access-control-allow-methods': 'GET, POST, PATCH, OPTIONS', 'access-control-allow-headers': 'authorization, content-type, x-filename, x-asset-type, x-topic' }
    : {};
}

function requireAdmin(request, env) {
  const header = request.headers.get('authorization') || '';
  return Boolean(env.ADMIN_TOKEN) && header === `Bearer ${env.ADMIN_TOKEN}`;
}

async function audit(env, assetId, eventType, details = {}) {
  await env.MEDIA_DB.prepare(
    'INSERT INTO asset_audit_log (event_id, asset_id, event_type, actor, details_json) VALUES (?, ?, ?, ?, ?)'
  ).bind(crypto.randomUUID(), assetId || null, eventType, 'media-api', JSON.stringify(details)).run();
}

function imageContentType(contentType) {
  return contentType && contentType.startsWith('image/') ? contentType : null;
}

async function getAsset(env, assetId) {
  return env.MEDIA_DB.prepare('SELECT * FROM assets WHERE asset_id = ?').bind(assetId).first();
}

async function listAssets(env, filters, isAdmin) {
  const status = isAdmin && filters.status && ALLOWED_STATUSES.has(filters.status) ? filters.status : 'approved';
  const topic = filters.topic || null;
  const search = (filters.q || '').trim().toLowerCase();
  const limit = Math.min(Math.max(Number(filters.limit || 60), 1), 100);
  const page = Math.max(Math.floor(Number(filters.page || 1)), 1);
  const offset = (page - 1) * limit;
  const searchClause = search ? "AND (LOWER(a.original_filename) LIKE ? OR LOWER(a.r2_key) LIKE ? OR LOWER(COALESCE(a.topic, '')) LIKE ? OR LOWER(COALESCE(t.alt_text, '')) LIKE ? OR LOWER(COALESCE(t.title, '')) LIKE ?)" : '';
  const where = `WHERE a.status = ? ${topic ? 'AND a.topic = ?' : ''} ${searchClause}`;
  const base = `
    SELECT a.asset_id, a.r2_key, a.public_url, a.original_filename, a.content_type, a.byte_size,
           a.width, a.height, a.asset_type, a.topic, a.status, a.focal_x, a.focal_y,
           a.seo_indexable, a.created_at, a.updated_at, a.approved_at,
           t.alt_text, t.title, t.caption, t.description
    FROM assets a
    LEFT JOIN asset_translations t ON t.asset_id = a.asset_id AND t.locale = 'en'
    ${where}
    ORDER BY a.updated_at DESC
    LIMIT ? OFFSET ?`;
  const queryParams = [status, ...(topic ? [topic] : []), ...(search ? Array(5).fill(`%${search}%`) : [])];
  const statement = env.MEDIA_DB.prepare(base).bind(...queryParams, limit, offset);
  const countStatement = env.MEDIA_DB.prepare(`SELECT COUNT(*) AS total FROM assets a LEFT JOIN asset_translations t ON t.asset_id = a.asset_id AND t.locale = 'en' ${where}`).bind(...queryParams);
  const [result, count] = await Promise.all([statement.all(), countStatement.first()]);
  const total = Number(count?.total || 0);
  return { assets: result.results || [], total, page, limit, has_more: offset + limit < total };
}

async function upsertTranslation(env, assetId, locale, values) {
  const id = crypto.randomUUID();
  await env.MEDIA_DB.prepare(`
    INSERT INTO asset_translations (translation_id, asset_id, locale, alt_text, title, caption, description, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(asset_id, locale) DO UPDATE SET
      alt_text = excluded.alt_text,
      title = excluded.title,
      caption = excluded.caption,
      description = excluded.description,
      updated_at = CURRENT_TIMESTAMP
  `).bind(id, assetId, locale, values.alt_text || null, values.title || null, values.caption || null, values.description || null).run();
}

async function updateAssetStatus(env, assetId, status, seoIndexable) {
  await env.MEDIA_DB.prepare(
    `UPDATE assets SET status = ?, seo_indexable = ?, approved_at = CASE WHEN ? = 'approved' THEN CURRENT_TIMESTAMP ELSE approved_at END, approved_by = CASE WHEN ? = 'approved' THEN 'media-api' ELSE approved_by END, updated_at = CURRENT_TIMESTAMP WHERE asset_id = ?`
  ).bind(status, seoIndexable ? 1 : 0, status, status, assetId).run();
}

async function serveMedia(request, env, assetId, allowUnapproved = false) {
  const asset = await env.MEDIA_DB.prepare('SELECT asset_id, r2_key, content_type, original_filename, status FROM assets WHERE asset_id = ?').bind(assetId).first();
  if (!asset || (!allowUnapproved && asset.status !== 'approved')) return json({ error: 'Media asset not found' }, 404, getCorsHeaders(request));
  const object = await env.MEDIA_BUCKET.get(asset.r2_key, { range: request.headers });
  if (!object) return json({ error: 'Media object unavailable' }, 404, getCorsHeaders(request));
  const headers = new Headers({
    'content-type': asset.content_type || 'application/octet-stream',
    'content-disposition': `inline; filename="${asset.original_filename.replaceAll('"', '')}"`,
    'cache-control': 'public, max-age=31536000, immutable',
    'etag': object.httpEtag,
    'x-content-type-options': 'nosniff',
  });
  object.writeHttpMetadata(headers);
  return new Response('body' in object ? object.body : null, { status: 'body' in object ? 200 : 412, headers });
}

async function imageSitemap(request, env) {
  const rows = await env.MEDIA_DB.prepare(`
    SELECT a.asset_id, a.r2_key, a.updated_at, t.alt_text, t.title,
           r.canonical_url
    FROM assets a
    JOIN asset_relations r ON r.asset_id = a.asset_id
    LEFT JOIN asset_translations t ON t.asset_id = a.asset_id AND t.locale = 'en'
    WHERE a.status = 'approved' AND a.seo_indexable = 1 AND r.canonical_url IS NOT NULL
    ORDER BY r.canonical_url, a.updated_at DESC
  `).all();
  const base = new URL(request.url).origin;
  const grouped = new Map();
  for (const row of rows.results || []) {
    const page = grouped.get(row.canonical_url) || [];
    page.push(row);
    grouped.set(row.canonical_url, page);
  }
  const urls = [...grouped.entries()].map(([pageUrl, assets]) => {
    const images = assets.map((asset) => `\n    <image:image><image:loc>${escapeXml(`${base}/media/${asset.asset_id}`)}</image:loc>${asset.title ? `<image:title>${escapeXml(asset.title)}</image:title>` : ''}</image:image>`).join('');
    return `\n  <url><loc>${escapeXml(pageUrl)}</loc>${images}\n  </url>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}\n</urlset>`;
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=300' } });
}

function escapeXml(value) {
  return String(value).replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char]);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = getCorsHeaders(request);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (url.pathname === '/health') return json({ service: 'houseplus-media-api', status: 'ok', timestamp: new Date().toISOString() }, 200, cors);
    if (url.pathname === '/sitemap-images.xml') return imageSitemap(request, env);

    const isAdmin = requireAdmin(request, env);
    const mediaMatch = url.pathname.match(/^\/media\/([a-z0-9-]+)$/);
    if (request.method === 'GET' && mediaMatch) return serveMedia(request, env, mediaMatch[1]);

    const adminFileMatch = url.pathname.match(/^\/v1\/assets\/([a-z0-9-]+)\/file$/);
    if (request.method === 'GET' && adminFileMatch) {
      if (!isAdmin) return json({ error: 'Admin authorization required' }, 401, cors);
      return serveMedia(request, env, adminFileMatch[1], true);
    }

    if (request.method === 'GET' && url.pathname === '/v1/assets') {
      return json(await listAssets(env, Object.fromEntries(url.searchParams), isAdmin), 200, cors);
    }

    const assetMatch = url.pathname.match(/^\/v1\/assets\/([a-z0-9-]+)$/);
    const relationMatch = url.pathname.match(/^\/v1\/assets\/([a-z0-9-]+)\/relations\/?$/);
    if (request.method === 'GET' && assetMatch) {
      const asset = await getAsset(env, assetMatch[1]);
      if (!asset || (!isAdmin && asset.status !== 'approved')) return json({ error: 'Asset not found' }, 404, cors);
      const translations = await env.MEDIA_DB.prepare('SELECT locale, alt_text, title, caption, description FROM asset_translations WHERE asset_id = ? ORDER BY locale').bind(asset.asset_id).all();
      const relations = await env.MEDIA_DB.prepare('SELECT entity_type, entity_id, role, canonical_url FROM asset_relations WHERE asset_id = ?').bind(asset.asset_id).all();
      return json({ asset, translations: translations.results || [], relations: relations.results || [] }, 200, cors);
    }

    if (!isAdmin) return json({ error: 'Admin authorization required' }, 401, cors);

    if (request.method === 'POST' && url.pathname === '/v1/upload') {
      const filename = request.headers.get('x-filename') || `asset-${crypto.randomUUID()}`;
      const contentType = imageContentType(request.headers.get('content-type'));
      if (!contentType) return json({ error: 'Only image uploads are accepted' }, 415, cors);
      const assetId = crypto.randomUUID();
      const safeName = filename.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'image';
      const key = `ingest/${new Date().toISOString().slice(0, 10)}/${assetId}/${safeName}`;
      const object = await env.MEDIA_BUCKET.put(key, request.body, { httpMetadata: { contentType } });
      if (!object) return json({ error: 'Upload precondition failed' }, 412, cors);
      await env.MEDIA_DB.prepare(`
        INSERT INTO assets (asset_id, r2_key, original_filename, content_type, byte_size, content_hash, asset_type, topic, status, seo_indexable)
        VALUES (?, ?, ?, ?, ?, ?, 'image', ?, 'draft', 0)
      `).bind(assetId, key, filename, contentType, object.size, object.etag, request.headers.get('x-topic') || 'uncategorized').run();
      await audit(env, assetId, 'uploaded', { key, filename, contentType, size: object.size });
      return json({ asset_id: assetId, status: 'draft', r2_key: key }, 201, cors);
    }

    if (request.method === 'PATCH' && assetMatch) {
      const asset = await getAsset(env, assetMatch[1]);
      if (!asset) return json({ error: 'Asset not found' }, 404, cors);
      const body = await request.json();
      const status = body.status && ALLOWED_STATUSES.has(body.status) ? body.status : asset.status;
      const seoIndexable = typeof body.seo_indexable === 'boolean' ? body.seo_indexable : Boolean(asset.seo_indexable);
      const focalX = Number.isFinite(body.focal_x) ? Math.min(1, Math.max(0, body.focal_x)) : asset.focal_x;
      const focalY = Number.isFinite(body.focal_y) ? Math.min(1, Math.max(0, body.focal_y)) : asset.focal_y;
      await env.MEDIA_DB.prepare(`
        UPDATE assets SET topic = ?, status = ?, seo_indexable = ?, focal_x = ?, focal_y = ?, copyright_owner = ?, license_scope = ?, source_url = ?, metadata_json = ?, updated_at = CURRENT_TIMESTAMP
        WHERE asset_id = ?
      `).bind(body.topic ?? asset.topic, status, seoIndexable ? 1 : 0, focalX, focalY, body.copyright_owner ?? asset.copyright_owner, body.license_scope ?? asset.license_scope, body.source_url ?? asset.source_url, body.metadata_json ? JSON.stringify(body.metadata_json) : asset.metadata_json, asset.asset_id).run();
      if (body.translation) await upsertTranslation(env, asset.asset_id, body.translation.locale || 'en', body.translation);
      if (status === 'approved') {
        const translation = await env.MEDIA_DB.prepare("SELECT alt_text FROM asset_translations WHERE asset_id = ? AND locale = 'en'").bind(asset.asset_id).first();
        if (!translation?.alt_text) return json({ error: 'English alt text is required before approval' }, 422, cors);
      }
      await updateAssetStatus(env, asset.asset_id, status, seoIndexable);
      await audit(env, asset.asset_id, 'asset_updated', { status, seo_indexable: seoIndexable });
      return json({ asset_id: asset.asset_id, status, seo_indexable: seoIndexable }, 200, cors);
    }

    if (request.method === 'POST' && relationMatch) {
      const asset = await getAsset(env, relationMatch[1]);
      if (!asset) return json({ error: 'Asset not found' }, 404, cors);
      const body = await request.json();
      if (!ALLOWED_ENTITY_TYPES.has(body.entity_type) || !ALLOWED_ROLES.has(body.role) || !body.entity_id) return json({ error: 'Invalid entity relation' }, 400, cors);
      if (body.role === 'article_hero' || body.role === 'product_primary') {
        await env.MEDIA_DB.prepare('DELETE FROM asset_relations WHERE entity_type = ? AND entity_id = ? AND role = ? AND asset_id != ?')
          .bind(body.entity_type, body.entity_id, body.role, asset.asset_id).run();
      }
      await env.MEDIA_DB.prepare(`
        INSERT INTO asset_relations (relation_id, asset_id, entity_type, entity_id, role, canonical_url)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(asset_id, entity_type, entity_id, role) DO UPDATE SET canonical_url = excluded.canonical_url, updated_at = CURRENT_TIMESTAMP
      `).bind(crypto.randomUUID(), asset.asset_id, body.entity_type, body.entity_id, body.role, body.canonical_url || null).run();
      await audit(env, asset.asset_id, 'relation_upserted', body);
      return json({ asset_id: asset.asset_id, relation: body }, 201, cors);
    }

    return json({ error: 'Route not found' }, 404, cors);
  },
};
