import { NextResponse } from 'next/server';

const INDEXNOW_KEY = '084fadfd7e4a435b942858f905846430';

export async function GET() {
  return new NextResponse(INDEXNOW_KEY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
