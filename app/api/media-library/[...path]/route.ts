import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MEDIA_API_URL = process.env.HOUSEPLUS_MEDIA_API_URL || 'https://houseplus-media-api.jack006hu.workers.dev';
const MEDIA_API_TOKEN = process.env.HOUSEPLUS_MEDIA_API_TOKEN;

function buildTarget(request: NextRequest, segments: string[]) {
  const upstream = new URL(`${MEDIA_API_URL.replace(/\/$/, '')}/${segments.join('/')}`);
  request.nextUrl.searchParams.forEach((value, key) => upstream.searchParams.set(key, value));
  return upstream;
}

async function proxy(request: NextRequest, segments: string[]) {
  if (!MEDIA_API_TOKEN) {
    return Response.json({ error: 'Media API is not configured. Set HOUSEPLUS_MEDIA_API_TOKEN in Vercel.' }, { status: 503 });
  }

  const target = buildTarget(request, segments);
  const headers = new Headers({ authorization: `Bearer ${MEDIA_API_TOKEN}` });
  const contentType = request.headers.get('content-type');
  const fileName = request.headers.get('x-filename');
  const topic = request.headers.get('x-topic');
  const publicSlug = request.headers.get('x-public-slug');
  if (contentType) headers.set('content-type', contentType);
  if (fileName) headers.set('x-filename', fileName);
  if (topic) headers.set('x-topic', topic);
  if (publicSlug) headers.set('x-public-slug', publicSlug);

  const init: RequestInit = { method: request.method, headers, cache: 'no-store' };
  if (!['GET', 'HEAD'].includes(request.method)) init.body = await request.arrayBuffer();

  const upstream = await fetch(target, init);
  const responseHeaders = new Headers();
  const upstreamContentType = upstream.headers.get('content-type');
  const cacheControl = upstream.headers.get('cache-control');
  if (upstreamContentType) responseHeaders.set('content-type', upstreamContentType);
  if (cacheControl) responseHeaders.set('cache-control', cacheControl);
  responseHeaders.set('x-content-type-options', 'nosniff');
  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(request, params.path);
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(request, params.path);
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  return proxy(request, params.path);
}
