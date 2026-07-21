import { NextResponse } from 'next/server';
import { getStoryblokApi } from '@storyblok/react/rsc';

export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';
  let products: any[] = [];

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.getStories({
      starts_with: 'products/',
      version: 'published',
      language: 'en',
      resolve_links: 'url',
    });
    products = data?.stories || [];
  } catch (e) {
    console.error('Error fetching products from Storyblok:', e);
  }

  if (products.length === 0) {
    return new NextResponse('<rss version="2.0"><channel><title>HousePlus Product Feed</title><description>No products available</description></channel></rss>', {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
  }

  const items = products.map((product) => {
    const slug = product.full_slug?.replace('products/', '') || product.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'product';
    const name = product.content?.title || product.name || 'Product';
    const description = product.content?.description || product.content?.body?.[0]?.text || name;
    const coverImage = product.content?.image?.filename || product.content?.cover_image?.filename || '';
    const price = product.content?.price || 99;
    
    return `    <item>
      <g:id>${slug}</g:id>
      <g:title><![CDATA[${name}]]></g:title>
      <g:description><![CDATA[${description} - CE/FCC/RoHS certified wholesale product from HousePlus]]></g:description>
      <g:link>${baseUrl}/en/products/${slug}</g:link>
      ${coverImage ? `<g:image_link>${coverImage}</g:image_link>` : ''}
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
