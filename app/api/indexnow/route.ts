import { NextRequest, NextResponse } from 'next/server';
import { searchEngines, WebhookConfig } from '@/lib/search-engines';
import { submitToSearchEngines, sendWebhookNotification } from '@/lib/submission-service';

const BASE_URL = 'https://www.houseplus-ch.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, urls, engines, notify } = body;

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

    // Submit to search engines
    const result = await submitToSearchEngines(urlsToSubmit, engines);

    // Send notifications if requested
    if (notify) {
      const webhooks: WebhookConfig[] = [];
      
      // Slack webhook from environment variable
      if (process.env.SLACK_WEBHOOK_URL) {
        webhooks.push({
          id: 'slack',
          name: 'Slack',
          type: 'slack',
          url: process.env.SLACK_WEBHOOK_URL,
          active: true,
        });
      }

      await sendWebhookNotification(result, webhooks);
    }

    return NextResponse.json({
      success: result.success,
      submittedUrls: result.totalUrls,
      timestamp: result.timestamp,
      results: result.results.map(r => ({
        engine: r.engineName,
        success: r.success,
        statusCode: r.statusCode,
        message: r.message,
      })),
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
        supportedEngines: searchEngines.map(e => ({
          id: e.id,
          name: e.name,
          requiresAuth: e.requiresAuth,
          description: e.description,
        })),
        usage: 'POST /api/indexnow with url, urls, engines (optional), notify (optional) parameters',
        example: {
          single: 'POST {"url": "https://www.houseplus-ch.com/en"}',
          multiple: 'POST {"urls": ["https://www.houseplus-ch.com/en", "https://www.houseplus-ch.com/en/about-us"]}',
          withEngines: 'POST {"urls": [...], "engines": ["bing", "google"]}',
          withNotify: 'POST {"urls": [...], "notify": true}',
        },
      },
      { status: 200 }
    );
  }

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
