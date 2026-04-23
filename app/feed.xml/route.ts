import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HousePlus - Global Manufacturer Blog</title>
    <link>${baseUrl}</link>
    <description>Latest news and updates from HousePlus - manufacturer of solar systems, home appliances, and 3C electronics</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    
    <item>
      <title>Introducing Our New Solar Power Station Series</title>
      <link>${baseUrl}/en/news/solar-power-station-2024</link>
      <guid>${baseUrl}/en/news/solar-power-station-2024</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description>We are excited to announce our latest portable power station lineup with enhanced efficiency and capacity.</description>
      <content:encoded><![CDATA[
        <p>HousePlus is proud to introduce our new solar power station series featuring:</p>
        <ul>
          <li>Capacity: 300W to 3000W options</li>
          <li>Efficiency: Up to 22% with our latest MPPT controllers</li>
          <li>Warranty: 10+ years with comprehensive support</li>
        </ul>
      ]]></content:encoded>
      <category>Solar Systems</category>
      <author>jack@houseplus-ch.com</author>
    </item>

    <item>
      <title>Energy-Efficient Home Appliances for Modern Living</title>
      <link>${baseUrl}/en/news/energy-efficient-appliances</link>
      <guid>${baseUrl}/en/news/energy-efficient-appliances</guid>
      <pubDate>${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toUTCString()}</pubDate>
      <description>Discover how our A++ rated appliances can reduce your household energy consumption by up to 50%.</description>
      <category>Home Appliances</category>
      <author>jack@houseplus-ch.com</author>
    </item>

    <item>
      <title>Smart Home Solutions with 3C Electronics</title>
      <link>${baseUrl}/en/news/smart-home-solutions</link>
      <guid>${baseUrl}/en/news/smart-home-solutions</guid>
      <pubDate>${new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toUTCString()}</pubDate>
      <description>Explore our comprehensive range of smart home devices compatible with Alexa, Google Home, and Apple HomeKit.</description>
      <category>3C Electronics</category>
      <author>jack@houseplus-ch.com</author>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
