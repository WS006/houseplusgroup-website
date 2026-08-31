import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';
  const robotsTxt = `# Robots.txt for HousePlus Website
# https://www.houseplus-ch.com
# SEO / Generative Engine Optimization (GEO) / Answer Engine Optimization (AEO) Configuration

# ====================
# GENERAL SEO RULES
# ====================

User-agent: *
Allow: /
Allow: /en/
Allow: /es/
Allow: /de/
Allow: /fr/
Allow: /ar/
Allow: /sitemap.xml
Allow: /feed.xml
Allow: /image-sitemap.xml
Allow: /video-sitemap.xml
Allow: /merchant-feed.xml
Allow: /llms.txt
Allow: /favicon.ico
Allow: /apple-touch-icon.png
Disallow: /api/
Disallow: /admin/
Disallow: /_next/data/
Disallow: /*?*sort=
Disallow: /*?*filter=
Disallow: /*?*page=

# Googlebot
User-agent: Googlebot
Allow: /
Allow: /images/
Allow: /_next/image
Disallow: /api/
Disallow: /admin/

# Googlebot-Image
User-agent: Googlebot-Image
Allow: /
Allow: /images/
Allow: /_next/image
Allow: /products/
Disallow: /admin/

# Google-Extended
User-agent: Google-Extended
Allow: /
Allow: /news/
Allow: /products/

# Bingbot
User-agent: Bingbot
Allow: /
Allow: /images/
Disallow: /api/
Disallow: /admin/

# Bingbot-Image
User-agent: Bingbot-Image
Allow: /
Allow: /images/

# ====================
# AI CRAWLERS (GENERATIVE ENGINE OPTIMIZATION)
# ====================

User-agent: GPTBot
Allow: /
Allow: /news/
Allow: /products/
Allow: /service/
Allow: /about-us/
Allow: /llms.txt
Allow: /image-sitemap.xml
Disallow: /api/
Disallow: /admin/

User-agent: ChatGPT-User
Allow: /
Allow: /news/
Allow: /products/
Allow: /llms.txt
Allow: /image-sitemap.xml
Disallow: /api/
Disallow: /admin/

# OpenAI search retrieval crawler. Kept separate from GPTBot so retrieval
# access remains explicit even if model-training policies change.
User-agent: OAI-SearchBot
Allow: /
Allow: /news/
Allow: /products/
Allow: /service/
Allow: /about-us/
Allow: /brand/
Allow: /llms.txt
Allow: /image-sitemap.xml
Disallow: /api/
Disallow: /admin/

User-agent: CCBot
Allow: /
Allow: /news/
Allow: /products/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 5

User-agent: anthropic-ai
Allow: /
Allow: /news/
Allow: /products/
Allow: /llms.txt
Allow: /image-sitemap.xml
Disallow: /api/
Disallow: /admin/

User-agent: Claude-Web
Allow: /
Allow: /news/
Allow: /products/
Allow: /llms.txt
Allow: /image-sitemap.xml
Disallow: /api/
Disallow: /admin/

User-agent: ClaudeBot
Allow: /
Allow: /news/
Allow: /products/
Allow: /service/
Allow: /about-us/
Allow: /brand/
Allow: /llms.txt
Allow: /image-sitemap.xml
Disallow: /api/
Disallow: /admin/

User-agent: Claude-SearchBot
Allow: /
Allow: /news/
Allow: /products/
Allow: /service/
Allow: /about-us/
Allow: /brand/
Allow: /llms.txt
Allow: /image-sitemap.xml
Disallow: /api/
Disallow: /admin/

User-agent: Claude-User
Allow: /
Allow: /news/
Allow: /products/
Allow: /service/
Allow: /about-us/
Allow: /brand/
Allow: /llms.txt
Allow: /image-sitemap.xml
Disallow: /api/
Disallow: /admin/

User-agent: PerplexityBot
Allow: /
Allow: /news/
Allow: /products/
Allow: /llms.txt
Allow: /image-sitemap.xml
Disallow: /api/
Disallow: /admin/

User-agent: DuckDuckBot
Allow: /
Allow: /news/
Allow: /products/
Disallow: /api/
Disallow: /admin/

# ====================
# REGIONAL CRAWLERS
# ====================

User-agent: Baiduspider
Allow: /
Allow: /images/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

User-agent: Slurp
Allow: /
Allow: /images/
Disallow: /api/
Disallow: /admin/

# ====================
# BLOCK UNWANTED CRAWLERS
# ====================

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: Majestic-12
Disallow: /

User-agent: RogerBot
Disallow: /

User-agent: Python-urllib
Disallow: /

# ====================
# SITEMAP REFERENCES
# ====================

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/feed.xml
Sitemap: ${baseUrl}/image-sitemap.xml
Sitemap: ${baseUrl}/video-sitemap.xml

# IndexNow is exposed through the key endpoint and submission API; robots.txt
# intentionally contains only crawler directives and Sitemap declarations.
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
