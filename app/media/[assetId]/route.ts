import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const DEFAULT_MEDIA_API = 'https://houseplus-media-api.jack006hu.workers.dev';
const ASSET_ID_PATTERN = /^[0-9a-f-]{16,}$/i;

function mediaApiOrigin(): string {
  return (process.env.HOUSEPLUS_MEDIA_API_URL || DEFAULT_MEDIA_API).replace(/\/$/, '');
}

async function proxyMedia(request: NextRequest, assetId: string, omitBody = false): Promise<Response> {
  if (!ASSET_ID_PATTERN.test(assetId)) {
    return new NextResponse('Not found', { status: 404, headers: { 'X-Content-Type-Options': 'nosniff' } });
  }

  const headers = new Headers();
  const range = request.headers.get('range');
  if (range) headers.set('range', range);
  headers.set('accept', request.headers.get('accept') || 'image/avif,image/webp,image/*,*/*;q=0.8');

  const upstream = await fetch(`${mediaApiOrigin()}/media/${assetId}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');
  responseHeaders.set('X-Content-Type-Options', 'nosniff');
  responseHeaders.set('X-HousePlus-Media-Origin', 'r2');

  return new NextResponse(omitBody ? null : upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, { params }: { params: { assetId: string } }) {
  return proxyMedia(request, params.assetId);
}

export async function HEAD(request: NextRequest, { params }: { params: { assetId: string } }) {
  return proxyMedia(request, params.assetId, true);
}
