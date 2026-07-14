import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';
  const INDEXNOW_KEY = '084fadfd7e4a435b942858f905846430';

  const robotsTxt = `# Robots.txt for HousePlus Website
# https://www.houseplus-ch.com
# SEO/GEO/AEO Optimized Configuration

# ====================
# GENERAL SEO RULES
# ====================

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
Allow: /image-sitemap.xml
Allow: /favicon.ico
Allow: /apple-touch-icon.png
Disallow: /api/
Disallow: /admin/
Disallow: /_next/data/
Disallow: /*.json$
Disallow: /*?*sort=
Disallow: /*?*filter=
Disallow: /*?*page=
Crawl-delay: 1

# Googlebot - Primary search engine
User-agent: Googlebot
Allow: /
Allow: /images/
Allow: /_next/image
Disallow: /api/
Disallow: /admin/
Crawl-delay: 0

# Googlebot-Image - Image SEO optimization
User-agent: Googlebot-Image
Allow: /
Allow: /images/
Allow: /_next/image
Allow: /products/
Disallow: /admin/
Crawl-delay: 0

# Googlebot-Video - Video content
User-agent: Googlebot-Video
Allow: /
Allow: /videos/
Disallow: /admin/
Crawl-delay: 1

# Google-Extended - Google AI models (GEO optimization)
User-agent: Google-Extended
Allow: /
Allow: /news/
Allow: /products/
Crawl-delay: 1

# Bingbot - Second largest search engine
User-agent: Bingbot
Allow: /
Allow: /images/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 1

# Bingbot-Image - Bing Image search
User-agent: Bingbot-Image
Allow: /
Allow: /images/
Crawl-delay: 1

# YandexBot - Russia/Eastern Europe market
User-agent: YandexBot
Allow: /
Allow: /images/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# YandexImages - Yandex Image search
User-agent: YandexImages
Allow: /
Allow: /images/
Crawl-delay: 2

# Yahoo Slurp - Yahoo search
User-agent: Slurp
Allow: /
Allow: /images/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# ====================
# GEO (Generative Engine Optimization)
# Allow AI crawlers for content training
# ====================

# OpenAI GPTBot
User-agent: GPTBot
Allow: /
Allow: /news/
Allow: /products/
Allow: /service/
Allow: /about-us/
Disallow: /api/
Disallow: /admin/
Disallow: /_next/data/
Crawl-delay: 2

# ChatGPT-User - Direct ChatGPT access
User-agent: ChatGPT-User
Allow: /
Allow: /news/
Allow: /products/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# CCBot - Common Crawl (used by many AI models)
User-agent: CCBot
Allow: /
Allow: /news/
Allow: /products/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 5

# anthropic-ai / Claude-Web - Anthropic Claude
User-agent: anthropic-ai
Allow: /
Allow: /news/
Allow: /products/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

User-agent: Claude-Web
Allow: /
Allow: /news/
Allow: /products/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# PerplexityBot - Perplexity AI
User-agent: PerplexityBot
Allow: /
Allow: /news/
Allow: /products/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# DuckDuckBot - DuckDuckGo AI
User-agent: DuckDuckBot
Allow: /
Allow: /news/
Allow: /products/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# YouBot - You.com AI search
User-agent: YouBot
Allow: /
Allow: /news/
Allow: /products/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# ====================
# AEO (Answer Engine Optimization)
# Optimize for voice search and featured snippets
# ====================

# Allow structured data crawling
User-agent: *
Allow: /schema/

# Allow FAQ and Q&A pages for featured snippets
User-agent: Googlebot
Allow: /news/
Allow: /service/

# ====================
# REGIONAL CRAWLERS (Target Markets)
# ====================

# Baidu - China/SE Asia market
User-agent: Baiduspider
Allow: /
Allow: /images/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# Baiduspider-image - Baidu Image search
User-agent: Baiduspider-image
Allow: /
Allow: /images/
Crawl-delay: 2

# SeznamBot - Czech Republic/central Europe
User-agent: SeznamBot
Allow: /
Allow: /images/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# NaverBot - South Korea
User-agent: NaverBot
Allow: /
Allow: /images/
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

# ====================
# BLOCK UNWANTED CRAWLERS
# ====================

# SEO/Competitor crawlers (bandwidth intensive)
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

User-agent: PingdomBot
Disallow: /

# Scrapers and spammers
User-agent: Python-urllib
Disallow: /

User-agent: curl
Disallow: /

User-agent: Wget
Disallow: /

# ====================
# SITEMAP REFERENCES
# ====================

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/feed.xml
Sitemap: ${baseUrl}/image-sitemap.xml

# ====================
# INDEXNOW CONFIGURATION
# ====================

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
