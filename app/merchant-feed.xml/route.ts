import { NextResponse } from 'next/server';

/**
 * HousePlus sells through a B2B request-for-quotation workflow. The former
 * Merchant Center feed generated category-level prices, worldwide free shipping
 * and a fixed MOQ that were not maintained as transactional landing-page data.
 * Keep the legacy endpoint explicitly unavailable rather than publishing
 * incomplete Merchant listing information.
 */
export const dynamic = 'force-static';

export async function GET() {
  const message = `<?xml version="1.0" encoding="UTF-8"?>
<houseplus-feed-status>
  <status>gone</status>
  <reason>HousePlus product pages use request-for-quotation B2B purchasing. A Google Merchant Center feed will be restored only when verified product-level price, currency, availability, shipping and return data are maintained from a single source of truth.</reason>
  <catalog>https://www.houseplus-ch.com/en/products/</catalog>
</houseplus-feed-status>`;

  return new NextResponse(message, {
    status: 410,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
