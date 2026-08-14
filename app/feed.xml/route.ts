import { NextResponse } from 'next/server';
import { sortedBlogPosts } from '@/lib/blog-data';
import { staticNewsFeedDescription, staticNewsFeedEntries } from '@/lib/static-news-feed';

export const dynamic = 'force-static';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';
  const absoluteUrl = (value: string) => value.startsWith('http') ? value : `${baseUrl}${value}`;

  const dynamicItems = sortedBlogPosts
    .map((post) => {
      const url = `${baseUrl}/en/news/${post.slug}`;
      const pubDate = new Date(post.datePublished).toUTCString();
      const description = escapeXml(post.description);
      const title = escapeXml(post.title);
      const category = escapeXml(post.category);
      const author = escapeXml(post.author);

      // Build content:encoded from sections
      const contentHtml = post.sections
        .map((section) => {
          const heading = escapeXml(section.heading);
          const paragraphs = section.paragraphs
            .map((p) => `<p>${escapeXml(p)}</p>`)
            .join('\n        ');
          return `      <h2>${heading}</h2>\n        ${paragraphs}`;
        })
        .join('\n');

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <content:encoded><![CDATA[
        <img src="${absoluteUrl(post.heroImage)}" alt="${escapeXml(post.heroImageAlt)}" title="${escapeXml(post.title)}" style="max-width:100%;height:auto;" />
        ${contentHtml}
      ]]></content:encoded>
      <category>${category}</category>
      <author>${author}</author>
    </item>`;
    })
    .join('\n');

  const staticItems = staticNewsFeedEntries
    .map((post) => {
      const url = `${baseUrl}/en/news/${post.slug}`;
      const description = escapeXml(staticNewsFeedDescription(post));
      const title = escapeXml(post.title);
      const category = escapeXml(post.category);
      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>
      <description>${description}</description>
      <content:encoded><![CDATA[
        <img src="${absoluteUrl(post.image)}" alt="${title}" title="${title}" style="max-width:100%;height:auto;" />
        <p>${description}</p>
      ]]></content:encoded>
      <category>${category}</category>
    </item>`;
    })
    .join('\n');
  const items = [dynamicItems, staticItems].filter(Boolean).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HousePlus - Global Manufacturer Blog</title>
    <link>${baseUrl}</link>
    <description>Latest news and updates from HousePlus - manufacturer of solar systems, home appliances, and 3C electronics</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
