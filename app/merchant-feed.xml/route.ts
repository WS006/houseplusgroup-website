import { NextResponse } from 'next/server';
import { PRODUCT_DATA } from '@/lib/product-data';

export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';
  const products = Object.entries(PRODUCT_DATA);

  const items = products.map(([slug, product]) => {
    const price = (product as any).price || 99;
    return `    <item>
      <g:id>${slug}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${product.description || product.name} - CE/FCC/RoHS certified wholesale product from HousePlus]]></g:description>
      <g:link>${baseUrl}/en/products/${slug}</g:link>
      <g:image_link>${product.coverImage}</g:image_link>
      <g:price>${price} USD</g:price>
      <g:brand>HousePlus</g:brand>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:google_product_category>Electronics</g:google_product_category>
    </item>`;
  }).join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>HousePlus Product Feed</title>
    <link>${baseUrl}</link>
    <description>HousePlus wholesale product feed for Google Merchant Center</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
