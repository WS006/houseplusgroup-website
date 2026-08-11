import { NextResponse } from 'next/server';
import { PRODUCT_DATA, CATEGORY_CONFIG } from '@/lib/product-data';

export const dynamic = 'force-static';

export async function GET() {
  const BASE_URL = 'https://www.houseplus-ch.com';

  const items = Object.entries(PRODUCT_DATA).map(([slug, product]) => {
    const modelSpec = product.specs.find((s) => s.key === 'Model' || s.key === 'SKU');
    const sku = modelSpec?.value || slug.toUpperCase();
    const catLabel = CATEGORY_CONFIG[product.category]?.label || product.category;
    const availability = 'in stock';
    const condition = 'new';

    // Base price by category
    const basePrices: Record<string, number> = { solar: 180, appliances: 75, electronics: 35 };
    const price = basePrices[product.category] || 100;

    return `    <item>
      <g:id>${sku}</g:id>
      <g:title><![CDATA[${product.name} | HousePlus Wholesale]]></g:title>
      <g:description><![CDATA[${product.geoDescription || product.description}]]></g:description>
      <g:link>${BASE_URL}/en/products/${slug}</g:link>
      <g:image_link>${product.coverImage}</g:image_link>
      <g:additional_image_link>${product.coverImage}</g:additional_image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${price}.00 USD</g:price>
      <g:brand>HousePlus</g:brand>
      <g:mpn>${sku}</g:mpn>
      <g:condition>${condition}</g:condition>
      <g:product_type>${catLabel}</g:product_type>
      <g:google_product_category>${product.category === 'solar' ? 'Home & Garden > Alternative Energy > Solar Equipment' : product.category === 'appliances' ? 'Home & Garden > Appliances' : 'Electronics'}</g:google_product_category>
      <g:identifier_exists>yes</g:identifier_exists>
      <g:shipping>
        <g:country>WW</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:custom_label_0>MOQ: 100 pcs</g:custom_label_0>
      <g:custom_label_1>OEM/ODM Available</g:custom_label_1>
      <g:custom_label_2>CE/RoHS Certified</g:custom_label_2>
    </item>`;
  });

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HousePlus Product Feed</title>
    <link>${BASE_URL}</link>
    <description>HousePlus wholesale product catalogue - Solar, Appliances, and 3C Electronics</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/merchant-feed.xml" rel="self" type="application/rss+xml" />
    <last_build_date>${new Date().toUTCString()}</last_build_date>
${items.join('\n')}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
