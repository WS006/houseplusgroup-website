const PUBLIC_MEDIA_ORIGIN = 'https://images.houseplus-ch.com';

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

function cors(request) {
  const origin = request.headers.get('origin') || '';
  return ['https://www.houseplus-ch.com', 'https://houseplus-ch.com'].includes(origin)
    ? {
      'access-control-allow-origin': origin,
      'access-control-allow-methods': 'GET, HEAD, OPTIONS',
      'access-control-allow-headers': 'range, if-none-match, if-modified-since',
      'access-control-expose-headers': 'accept-ranges, content-length, content-range, etag',
    }
    : {};
}

function publicUrl(asset) {
  return `${PUBLIC_MEDIA_ORIGIN}/media/${asset.public_slug}/`;
}

async function findAsset(env, identifier) {
  return env.MEDIA_DB.prepare(
    'SELECT asset_id, public_slug, r2_key, original_filename, content_type, byte_size, status FROM assets WHERE asset_id = ? OR public_slug = ? LIMIT 1',
  ).bind(identifier, identifier).first();
}

async function serveMedia(request, env, identifier) {
  const asset = await findAsset(env, identifier);
  if (!asset || asset.status !== 'approved') return json({ error: 'Media asset not found' }, 404, cors(request));
  const object = await env.MEDIA_BUCKET.get(asset.r2_key, { range: request.headers });
  if (!object) return json({ error: 'Media object unavailable' }, 404, cors(request));
  const headers = new Headers({
    'content-type': asset.content_type || 'application/octet-stream',
    'content-disposition': `inline; filename="${String(asset.original_filename || asset.public_slug).replaceAll('"', '')}"`,
    'cache-control': 'public, max-age=31536000, immutable',
    'etag': object.httpEtag,
    'accept-ranges': 'bytes',
    'x-content-type-options': 'nosniff',
    'x-houseplus-media-origin': 'houseplus-media-v2',
    ...cors(request),
  });
  object.writeHttpMetadata(headers);
  headers.set('content-type', asset.content_type || 'application/octet-stream');
  const hasRequestedRange = request.headers.has('range');
  if (hasRequestedRange && object.range) {
    const end = object.range.offset + object.range.length - 1;
    headers.set('content-range', `bytes ${object.range.offset}-${end}/${object.size}`);
    headers.set('content-length', String(object.range.length));
    return new Response(request.method === 'HEAD' ? null : object.body, { status: 206, headers });
  }
  headers.set('content-length', String(object.size));
  return new Response(request.method === 'HEAD' ? null : object.body, { status: 200, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request) });
    if (url.pathname === '/health') return json({ service: 'houseplus-media-v2', status: 'ok', timestamp: new Date().toISOString() }, 200, cors(request));
    const match = url.pathname.match(/^\/media\/([a-z0-9-]+)\/?$/i);
    if ((request.method === 'GET' || request.method === 'HEAD') && match) return serveMedia(request, env, match[1]);
    if (request.method === 'GET' && url.pathname === '/v1/assets') {
      const rows = await env.MEDIA_DB.prepare("SELECT asset_id, public_slug, public_url, r2_key, content_type, byte_size, topic, status FROM assets WHERE status = 'approved' ORDER BY public_slug LIMIT 200").all();
      return json({ assets: rows.results || [], total: (rows.results || []).length }, 200, cors(request));
    }
    return json({ error: 'Route not found' }, 404, cors(request));
  },
};
