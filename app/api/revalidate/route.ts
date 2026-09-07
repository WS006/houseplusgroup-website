import { createHmac, timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { isRevalidationEvent, pathsForEvent, tagsForEvent } from '@/lib/revalidation';
import type { RevalidationEvent } from '@/lib/revalidation';

export const dynamic = 'force-dynamic';

const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;

function verifySignature(rawBody: string, timestamp: string, signature: string, secret: string) {
  if (!/^\d+$/.test(timestamp)) return false;
  if (Math.abs(Date.now() - Number(timestamp)) > MAX_CLOCK_SKEW_MS) return false;
  const expected = `sha256=${createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex')}`;
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(signature);
  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: NextRequest) {
  const secret = process.env.HOUSEPLUS_REVALIDATE_SECRET;
  const timestamp = request.headers.get('x-houseplus-timestamp') || '';
  const signature = request.headers.get('x-houseplus-signature') || '';
  const eventId = request.headers.get('x-houseplus-event-id') || '';

  if (!secret || !timestamp || !signature || !eventId) {
    return NextResponse.json({ success: false, error: 'Missing revalidation authentication headers' }, { status: 401 });
  }

  const rawBody = await request.text();
  if (!verifySignature(rawBody, timestamp, signature, secret)) {
    return NextResponse.json({ success: false, error: 'Invalid revalidation signature' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
  }

  if (!isRevalidationEvent(payload)) {
    return NextResponse.json({ success: false, error: 'Unsupported or incomplete revalidation event' }, { status: 400 });
  }

  const event = payload as RevalidationEvent;
  const paths = pathsForEvent(event);
  const tags = tagsForEvent(event);

  for (const path of paths) revalidatePath(path);
  for (const tag of tags) revalidateTag(tag);

  return NextResponse.json(
    { success: true, eventId, eventType: event.type, invalidatedPaths: paths, invalidatedTags: tags },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
