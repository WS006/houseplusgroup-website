export const baseUrl = 'https://www.houseplus-ch.com';
export const locales = ['en', 'es', 'de', 'fr', 'ar'] as const;

// All static page slugs (single source of truth)
// Pages marked as noindex (privacy, terms, cookie-policy, sitemap-page) are excluded from sitemap
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
  'certifications',
  'oem-odm',
  'case-studies',
  'regions',
  'brand',
];

// Pages that should be noindex (not in sitemap, robots meta noindex)
export const noIndexPageSlugs = [
  'privacy',
  'terms',
  'cookie-policy',
  'sitemap-page',
];

// Region slugs (must match regionConfigs keys in app/[lang]/regions/[region]/page.tsx)
export const regionSlugs = [
  'africa',
  'southeast_asia',
  'europe',
  'ng',
  'eu',
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
  // P0 GEO-optimized products (added 2026-06-26)
  'solar-panel-100w',
  'portable-power-station-3000w',
  'foldable-solar-panel-200w',
  'home-energy-storage-5000w',
  'power-bank-60w-pd',
  'lifepo4-battery-12v100ah',
  'outdoor-power-station-600w',
  'mppt-controller-40a',
  'magnetic-power-bank-10000mah',
  'pure-sine-inverter-2000w',
  'flexible-solar-panel-400w',
  'solar-generator-kit-300w',
  'smart-wifi-plug-meter',
  'usb-c-cable-100w-5a',
  // P1 Kitchen & Home Appliances (added 2026-08-11)
  'electric-blender-1500w',
  'air-fryer-8l-digital',
  'gas-stove-4-burner',
  'built-in-oven-65l',
  'microwave-oven-25l',
  'gas-water-heater-12l',
  'range-hood-900mm',
  // P2 Cooktops & Hobs (added 2026-08-11)
  'gas-electric-hybrid-cooktop',
  'induction-cooktop-2000w-built-in',
  'ceramic-hob-double-zone',
  // P3 Gas Stoves & Range Hoods expansion (added 2026-08-11)
  'gas-stove-2-burner-portable',
  'gas-stove-3-burner',
  'gas-stove-5-burner-wok',
  'gas-stove-freestanding-oven',
  'range-hood-600mm',
  'range-hood-750mm-inclined',
  'range-hood-island-900mm',
  'range-hood-900mm-curved-glass',
  // P4 Air Fryer, Oven & Water Heater expansion (added 2026-08-11)
  'air-fryer-4-5l-visual',
  'air-fryer-12l-rotisserie',
  'built-in-gas-oven-60l',
  'steam-oven-30l-built-in',
  'gas-water-heater-8l',
  'gas-water-heater-10l',
  'electric-water-heater-50l',
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
  'how-to-choose-wholesale-solar-panels',
  'how-to-choose-solar-panel-manufacturer-china',
  'mono-vs-poly-vs-perc-solar-panels',
  'lifepo4-vs-lead-acid-battery',
  'ce-certification-solar-panels-guide',
  'mppt-vs-pwm-charge-controller',
  'solar-panel-wholesale-price-guide',
  'tws-earphones-oem-manufacturing-guide',
  'portable-ssd-vs-external-hdd',
  'home-appliance-oem-manufacturer-guide-china',
  'air-fryer-sourcing-guide-china',
  'kitchen-appliances-wholesale-guide',
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

    // Region pages
    for (const region of regionSlugs) {
      urls.push(`${baseUrl}/${lang}/regions/${region}`);
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
