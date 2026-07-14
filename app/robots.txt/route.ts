import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';
  const INDEXNOW_KEY = '084fadfd7e4a435b942858f905846430';

  const robotsTxt = `# Robots.txt for HousePlus Website
# https://www.houseplus-ch.com

# Allow all crawlers to access the main content
User-agent: *
Allow: /
Allow: /en/
Allow: /es/
Allow: /de/
Allow: /fr/
Allow: /ar/
Allow: /sitemap.xml
Allow: /feed.xml
Disallow: /api/
Disallow: /admin/
Disallow: /*.json$
Disallow: /*?*sort=
Disallow: /*?*filter=
Crawl-delay: 1

# Googlebot specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Googlebot-Image specific rules (for Google Images indexing)
User-agent: Googlebot-Image
Allow: /
Allow: /images/
Allow: /_next/image
Disallow: /admin/
Crawl-delay: 0

# Bingbot specific rules
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Bingbot-Image specific rules
User-agent: Bingbot-Image
Allow: /
Allow: /images/
Crawl-delay: 1

# Baidu image crawler
User-agent: Baiduspider-image
Allow: /
Allow: /images/
Crawl-delay: 1

# AI Training Crawlers - Allow for GEO/AEO optimization
User-agent: GPTBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

# Block SEO/competitor crawlers that consume bandwidth
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Sitemap references
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/feed.xml
Sitemap: ${baseUrl}/image-sitemap.xml

# IndexNow
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
