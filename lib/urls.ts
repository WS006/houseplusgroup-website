export const baseUrl = 'https://www.houseplus-ch.com';
export const locales = ['en', 'es', 'de', 'fr', 'ar'] as const;

// All static page slugs (single source of truth)
export const staticPageSlugs = [
  '', // homepage
  'about-us',
  'products',
  'news',
  'factory',
  'service',
  'faq',
  'contact',
  'team',
  'careers',
  'support',
  'privacy',
  'terms',
  'cookie-policy',
  'sitemap-page',
];

// Product slugs
export const productSlugs = [
  'headphone-over-ear',
  'smart-watch',
  'usb-c-cable-2m',
  'solar-power-bank-20000mah',
  'bluetooth-earphone-tws',
  'portable-ssd-1tb',
  'micro-sd-128gb',
  'induction-cooktop-2000w',
  'electric-kettle-1-5l',
  'toaster-2-slice',
  'air-fryer-5-8l',
  'solar-fan-20w',
  'solar-street-light-200w',
  'charge-controller-60a',
  'lead-acid-battery-100ah',
  'lithium-battery-5kwh',
  'solar-inverter-3kw',
  'solar-panel-500w',
];

// News slugs
export const newsSlugs = [
  '2026-solar-market-update',
  '2026-appliances-market-update',
  '2026-electronics-market-update',
  '2026-smart-home-appliances-market-guide',
  'advanced-manufacturing-home-appliances',
  'energy-efficiency-standards-appliances',
  'global-wholesale-guide-home-appliances',
  'oem-odm-manufacturing-guide',
  'smart-home-appliances',
  'solar-energy-storage-industrial-manufacturing',
  'solar-energy-storage-solutions',
  'the-evolution-of-3c-electronics',
  'the-future-of-smart-home-appliances',
  'the-future-of-solar-energy',
];

// Generate ALL URLs from the single source of truth
export function generateAllUrls(): string[] {
  const urls: string[] = [];

  // Root homepage
  urls.push(baseUrl);

  // Static pages (all languages)
  for (const lang of locales) {
    for (const slug of staticPageSlugs) {
      const url = slug ? `${baseUrl}/${lang}/${slug}` : `${baseUrl}/${lang}`;
      urls.push(url);
    }

    // Product pages
    for (const product of productSlugs) {
      urls.push(`${baseUrl}/${lang}/products/${product}`);
    }

    // News pages
    for (const news of newsSlugs) {
      urls.push(`${baseUrl}/${lang}/news/${news}`);
    }
  }

  return urls;
}

// Generate main page URLs (for quick submission)
export function generateMainPageUrls(): string[] {
  const urls: string[] = [];
  urls.push(baseUrl);

  for (const lang of locales) {
    urls.push(`${baseUrl}/${lang}`);
    urls.push(`${baseUrl}/${lang}/about-us`);
    urls.push(`${baseUrl}/${lang}/products`);
    urls.push(`${baseUrl}/${lang}/news`);
    urls.push(`${baseUrl}/${lang}/factory`);
    urls.push(`${baseUrl}/${lang}/service`);
    urls.push(`${baseUrl}/${lang}/faq`);
    urls.push(`${baseUrl}/${lang}/contact`);
  }

  return urls;
}
