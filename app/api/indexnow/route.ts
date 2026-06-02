import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = '084fadfd7e4a435b942858f905846430';
const BASE_URL = 'https://www.houseplus-ch.com';

// IndexNow endpoints for different search engines
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, urls } = body;

    if (!url && !urls) {
      return NextResponse.json(
        { error: 'Either url or urls parameter is required' },
        { status: 400 }
      );
    }

    const urlsToSubmit = urls || [url];

    // Validate URLs
    for (const u of urlsToSubmit) {
      if (!u.startsWith(BASE_URL)) {
        return NextResponse.json(
          { error: `URL must start with ${BASE_URL}` },
          { status: 400 }
        );
      }
    }

    const payload = {
      host: 'www.houseplus-ch.com',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urlsToSubmit,
    };

    const results = [];

    for (const endpoint of INDEXNOW_ENDPOINTS) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        results.push({
          endpoint,
          status: response.status,
          statusText: response.statusText,
          success: response.ok,
        });

        if (response.ok) {
          break; // Success with first endpoint that works
        }
      } catch (error) {
        results.push({
          endpoint,
          error: (error as Error).message,
          success: false,
        });
      }
    }

    const success = results.some(r => r.success);

    return NextResponse.json({
      success,
      submittedUrls: urlsToSubmit.length,
      results,
    });
  } catch (error) {
    console.error('IndexNow error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      {
        message: 'IndexNow API',
        endpoints: INDEXNOW_ENDPOINTS,
        usage: 'POST /api/indexnow with url or urls parameter',
        example: 'POST {"url": "https://www.houseplus-ch.com/en"}',
      },
      { status: 200 }
    );
  }

  // For GET requests, simulate submission
  if (!url.startsWith(BASE_URL)) {
    return NextResponse.json(
      { error: `URL must start with ${BASE_URL}` },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'URL queued for submission (use POST for actual submission)',
    url,
  });
}
