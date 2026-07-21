import { NextResponse } from 'next/server';
import { PRODUCT_DATA } from '@/lib/product-data';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';

  const items = Object.entries(PRODUCT_DATA).map(([slug, product]) => {
    const modelSpec = product.specs.find((s) => s.key === 'Model');
    const productUrl = `${baseUrl}/en/products/${slug}`;
    
    return `
    <item>
      <g:id>${slug}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${product.description}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${product.coverImage}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>100.00 USD</g:price>
      <g:gtin>${modelSpec?.value || slug.toUpperCase()}</g:gtin>
      <g:brand>HousePlus</g:brand>
      <g:google_product_category>
        ${product.category === 'solar' ? 'Energy & Solar > Solar Panels & Kits' :
          product.category === 'appliances' ? 'Appliances' : 'Electronics'}
      </g:google_product_category>
      <g:product_type>
        ${product.category === 'solar' ? 'Solar Energy Systems' :
          product.category === 'appliances' ? 'Home Appliances' : '3C Electronics'}
      </g:product_type>
    </item>`;
  }).join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>HousePlus Product Feed</title>
    <link>${baseUrl}</link>
    <description>HousePlus product feed for Google Merchant Center</description>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}