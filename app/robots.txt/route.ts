import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';
  const INDEXNOW_KEY = '084fadfd7e4a435b942858f905846430';

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /admin/
Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
IndexNow: ${baseUrl}/${INDEXNOW_KEY}.txt
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
