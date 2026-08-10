/**
 * RSS Feed Generator
 * Route: /api/feed  (mapped to /feed.xml via next.config.js rewrite)
 * Runtime: Node.js
 * Updated: 2026-07-28
 *
 * Generates a standards-compliant RSS 2.0 feed combining:
 *   - Blog articles (title, link, description, pubDate, author)
 *   - Product updates (new launches, spec revisions, restocks)
 *
 * RSS feeds let subscribers (Feedly, Inoreader, Outlook) and content
 * aggregators syndicate HousePlus content, broadening off-site reach. They also
 * provide crawl-discovery signals to search engines.
 *
 * RESPONSE:
 *   Content-Type: application/rss+xml; charset=utf-8
 *   Cache-Control: public, max-age=3600 (1h browser / 1h CDN)
 *
 * USAGE:
 *   Add to <head> via: <link rel="alternate" type="application/rss+xml"
 *                        title="HousePlus" href="/feed.xml" />
 *   Reference in robots.txt: nothing required, but you may list the feed URL.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { siteConfig } from '../../config/seo-config';
import { sortedBlogPosts } from '../../data/blog';

// ============================================================================
// TYPES
// ============================================================================

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string; // RFC-822 date string
  guid: string;
  author: string;
  category: string;
}

// ============================================================================
// FEED CONTENT SOURCE
// In production, fetch these from a CMS / database. The static arrays below
// mirror the slugs used by the sitemap so the feed is consistent out of the box.
// ============================================================================

/** Blog posts — generated dynamically from the centralized data registry. */
const blogItems: FeedItem[] = sortedBlogPosts.map((post) => ({
  title: post.title,
  link: `${siteConfig.url}/en/blog/${post.slug}`,
  description: post.description,
  pubDate: new Date(post.datePublished + 'T08:00:00Z').toUTCString(),
  guid: `${siteConfig.url}/en/blog/${post.slug}`,
  author: `jack@houseplus-ch.com (${post.author})`,
  category: post.category,
}));

/** Product updates — new launches, spec revisions, restocks. */
const productItems: FeedItem[] = [
  {
    title: 'New Product Launch: 550W Bifacial Monocrystalline Solar Panel (HP-SP550)',
    link: `${siteConfig.url}/en/products/solar-panel-550w-bifacial`,
    description:
      'Now available for wholesale: 550W bifacial solar panel with 22.1% efficiency, dual-glass design, and 30-year linear power warranty. CE, IEC 61215, IEC 61730 certified. MOQ 100 pcs.',
    pubDate: new Date('2026-07-22T03:00:00Z').toUTCString(),
    guid: `${siteConfig.url}/en/products/solar-panel-550w-bifacial?update=2026-07-22`,
    author: 'jack@houseplus-ch.com (HousePlus Product Team)',
    category: 'Product Launch',
  },
  {
    title: 'Restock: 5kWh LiFePO4 Lithium Battery (HP-LFP5K) now shipping',
    link: `${siteConfig.url}/en/products/lithium-battery-5kwh`,
    description:
      'The 5kWh LiFePO4 lithium battery is back in stock with improved BMS firmware v2.3. 6,000+ cycle life, RS485/CAN comms, rack-mount 19" design. MOQ 100 pcs.',
    pubDate: new Date('2026-07-10T03:00:00Z').toUTCString(),
    guid: `${siteConfig.url}/en/products/lithium-battery-5kwh?update=2026-07-10`,
    author: 'jack@houseplus-ch.com (HousePlus Product Team)',
    category: 'Product Update',
  },
  {
    title: 'Spec Update: 3kW Solar Inverter (HP-INV3000) adds Wi-Fi monitoring',
    link: `${siteConfig.url}/en/products/solar-inverter-3kw`,
    description:
      'The HP-INV3000 off-grid solar inverter now ships with built-in Wi-Fi for remote monitoring via the HousePlus app. Pure sine wave output, MPPT 99.5% efficiency. CE certified.',
    pubDate: new Date('2026-06-25T03:00:00Z').toUTCString(),
    guid: `${siteConfig.url}/en/products/solar-inverter-3kw?update=2026-06-25`,
    author: 'jack@houseplus-ch.com (HousePlus Product Team)',
    category: 'Product Update',
  },
  {
    title: 'New Product Launch: 5.8L Digital Air Fryer (HP-AF58) for OEM brands',
    link: `${siteConfig.url}/en/products/air-fryer-5-8l`,
    description:
      'Launch your own air fryer brand: 5.8L capacity, 8 presets, rapid air technology. FDA/EU food-grade materials, CE/ROHS certified. OEM/ODM from MOQ 500 pcs with custom packaging.',
    pubDate: new Date('2026-06-08T03:00:00Z').toUTCString(),
    guid: `${siteConfig.url}/en/products/air-fryer-5-8l?update=2026-06-08`,
    author: 'jack@houseplus-ch.com (HousePlus Product Team)',
    category: 'Product Launch',
  },
];

// ============================================================================
// XML HELPERS
// ============================================================================

/** Escape the five XML special characters for safe insertion into RSS. */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return char;
    }
  });
}

/** Strip HTML tags for a plain-text RSS description (keeps feed valid). */
function stripHtml(html: string): string {
  return escapeXml(html.replace(/<[^>]*>/g, '')).trim();
}

/** Build a single RSS <item> element. */
function buildItem(item: FeedItem): string {
  return [
    '    <item>',
    `      <title>${escapeXml(item.title)}</title>`,
    `      <link>${escapeXml(item.link)}</link>`,
    `      <guid isPermaLink="false">${escapeXml(item.guid)}</guid>`,
    `      <description>${stripHtml(item.description)}</description>`,
    `      <author>${escapeXml(item.author)}</author>`,
    `      <category>${escapeXml(item.category)}</category>`,
    `      <pubDate>${item.pubDate}</pubDate>`,
    '    </item>',
  ].join('\n');
}

// ============================================================================
// FEED BUILDER
// ============================================================================

/**
 * Assemble the complete RSS 2.0 document.
 * Items are merged (blog + product), de-duplicated by guid, and sorted
 * newest-first so subscribers always see the freshest content on top.
 */
function generateFeed(): string {
  const allItems: FeedItem[] = [...blogItems, ...productItems];

  // De-duplicate by guid (in case a product & blog share a URL).
  const seen = new Set<string>();
  const uniqueItems = allItems.filter((item) => {
    if (seen.has(item.guid)) return false;
    seen.add(item.guid);
    return true;
  });

  // Sort newest-first by pubDate.
  uniqueItems.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const lastBuildDate = new Date().toUTCString();

  const itemsXml = uniqueItems.map(buildItem).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} — Wholesale Solar, Appliances & Electronics`)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <atom:link href="${escapeXml(`${siteConfig.url}/api/feed`)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(`Latest blog articles and product updates from ${siteConfig.name} — a vertically integrated solar, home appliance, and 3C electronics manufacturer in ${siteConfig.city}, China. OEM/ODM available, serving ${siteConfig.countries} countries.`)}</description>
    <language>en</language>
    <copyright>${escapeXml(`Copyright ${new Date().getFullYear()} ${siteConfig.name}`)}</copyright>
    <managingEditor>jack@houseplus-ch.com (Jack, Founder &amp; CEO)</managingEditor>
    <webMaster>jack@houseplus-ch.com (Jack, Founder &amp; CEO)</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>HousePlus Next.js RSS Generator</generator>
    <ttl>60</ttl>
    <image>
      <url>${escapeXml(siteConfig.logo)}</url>
      <title>${escapeXml(siteConfig.name)}</title>
      <link>${escapeXml(siteConfig.url)}</link>
      <width>512</width>
      <height>512</height>
    </image>
${itemsXml}
  </channel>
</rss>`;
}

// ============================================================================
// API HANDLER
// ============================================================================

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    // RSS feeds are XML — set an explicit, correct content type.
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    // Cache for 1 hour at both the browser and CDN layers.
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');

    const feed = generateFeed();
    res.status(200).send(feed);
  } catch (error) {
    console.error('RSS feed generation error:', error);
    res.status(500).send(
      '<?xml version="1.0" encoding="UTF-8"?>\n<error>RSS feed generation failed</error>'
    );
  }
}
