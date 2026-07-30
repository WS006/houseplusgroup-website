import { NextResponse } from 'next/server';
import { PRODUCT_DATA } from '@/lib/product-data';

export const revalidate = 86400;

// Google Product Category mapping
const GOOGLE_CATEGORIES: Record<string, string> = {
  solar: 'Energy > Solar Panels',
  appliances: 'Home & Garden > Kitchen & Dining > Small Appliances',
  electronics: 'Electronics',
};

// Default weights by category (in kg)
const DEFAULT_WEIGHTS: Record<string, string> = {
  solar: '25',
  appliances: '5',
  electronics: '1',
};

// Default shipping prices by category (in USD)
const SHIPPING_PRICES: Record<string, string> = {
  solar: '99',
  appliances: '29',
  electronics: '9',
};

// Target countries (EU + UK + US + APAC + Middle East + Africa)
const TARGET_COUNTRIES = [
  'US', 'GB', 'DE', 'FR', 'ES', 'IT', 'NL', 'SE', 'NO', 'DK', 'FI',
  'PL', 'AT', 'CH', 'BE', 'IE', 'PT', 'GR', 'HU', 'CZ', 'SK', 'HR',
  'SI', 'LT', 'LV', 'EE', 'RO', 'BG', 'CY', 'MT', 'LU', 'IS',
  'AU', 'NZ', 'CA', 'JP', 'KR', 'SG', 'MY', 'TH', 'TW', 'HK',
  'IN', 'ID', 'PH', 'VN', 'ZA', 'MX', 'BR', 'RU', 'UA', 'TR',
  'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'EG', 'NG', 'KE', 'GH',
  'MA', 'IL',
];

// Default product prices (USD)
const PRODUCT_PRICES: Record<string, string> = {
  'solar-panel-500w': '189',
  'solar-inverter-3kw': '649',
  'lithium-battery-5kwh': '899',
  'lead-acid-battery-100ah': '189',
  'charge-controller-60a': '289',
  'solar-street-light-200w': '129',
  'solar-fan-20w': '39',
  'solar-power-bank-20000mah': '79',
  'air-fryer-5-8l': '89',
  'induction-cooktop-2000w': '69',
  'electric-kettle-1-5l': '29',
  'toaster-2-slice': '25',
  'headphone-over-ear': '45',
  'bluetooth-earphone-tws': '35',
  'smart-watch': '59',
  'portable-ssd-1tb': '79',
  'micro-sd-128gb': '15',
  'usb-c-cable-2m': '12',
  'solar-panel-100w': '59',
  'portable-power-station-3000w': '499',
  'foldable-solar-panel-200w': '119',
  'home-energy-storage-5000w': '1299',
  'power-bank-60w-pd': '45',
  'lifepo4-battery-12v100ah': '289',
  'outdoor-power-station-600w': '199',
  'mppt-controller-40a': '169',
  'magnetic-power-bank-10000mah': '35',
  'pure-sine-inverter-2000w': '399',
  'flexible-solar-panel-400w': '149',
  'solar-generator-kit-300w': '349',
  'smart-wifi-plug-meter': '29',
  'usb-c-cable-100w-5a': '15',
};

export async function GET() {
  const baseUrl = 'https://www.houseplus-ch.com';
  const products = Object.entries(PRODUCT_DATA);

  const items = products.map(([slug, product]) => {
    const price = PRODUCT_PRICES[slug] || '99';
    const weight = DEFAULT_WEIGHTS[product.category] || '1';
    const shippingPrice = SHIPPING_PRICES[product.category] || '9';
    const googleCategory = GOOGLE_CATEGORIES[product.category] || 'Electronics';
    const mpn = getMPN(product);

    // Generate shipping entries for all target countries
    const shippingBlocks = TARGET_COUNTRIES.map(country =>
      `      <g:shipping>
        <g:country>${country}</g:country>
        <g:service>Standard Shipping</g:service>
        <g:price>${shippingPrice} USD</g:price>
      </g:shipping>`
    ).join('\n');

    return `    <item>
      <g:id>${slug}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${product.description}]]></g:description>
      <g:link>${baseUrl}/en/products/${slug}</g:link>
      <g:image_link>${product.coverImage}</g:image_link>
      <g:price>${price} USD</g:price>
      <g:brand>HousePlus</g:brand>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:weight>${weight} kg</g:weight>
      <g:mpn>${mpn}</g:mpn>
      <g:custom_label_0>${product.category}</g:custom_label_0>
      <g:custom_label_1>wholesale</g:custom_label_1>
${shippingBlocks}
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

function getMPN(product: any): string {
  const modelSpec = product.specs?.find((s: any) => s.key === 'Model');
  return modelSpec?.value || `HP-${product.category.toUpperCase()}-001`;
}
