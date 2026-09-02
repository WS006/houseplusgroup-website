export const STATIC_SITEMAP_LAST_MODIFIED: Record<string, string> = {
  '': '2026-08-25',
  'about-us': '2026-08-16',
  products: '2026-08-25',
  news: '2026-06-29',
  factory: '2026-08-16',
  service: '2026-08-16',
  faq: '2026-06-29',
  contact: '2026-06-29',
  team: '2026-06-29',
  careers: '2026-06-29',
  support: '2026-06-29',
  privacy: '2026-06-29',
  terms: '2026-06-29',
  'cookie-policy': '2026-06-29',
  'sitemap-page': '2026-06-29',
  certifications: '2026-08-16',
  'oem-odm': '2026-08-16',
  'case-studies': '2026-06-29',
  brand: '2026-08-16',
  'news/how-to-choose-wholesale-solar-panels': '2026-08-10',
  'news/how-to-choose-solar-panel-manufacturer-china': '2026-08-10',
  'news/mono-vs-poly-vs-perc-solar-panels': '2026-08-10',
  'news/lifepo4-vs-lead-acid-battery': '2026-08-10',
  'news/ce-certification-solar-panels-guide': '2026-08-10',
  'news/mppt-vs-pwm-charge-controller': '2026-08-10',
  'news/solar-panel-wholesale-price-guide': '2026-08-10',
  'news/tws-earphones-oem-manufacturing-guide': '2026-08-10',
  'news/portable-ssd-vs-external-hdd': '2026-08-10',
  'news/home-appliance-oem-manufacturer-guide-china': '2026-08-10',
  'news/air-fryer-sourcing-guide-china': '2026-08-10',
  'news/kitchen-appliances-wholesale-guide': '2026-08-10',
  'news/appliance-energy-efficiency-vs-actual-consumption': '2026-07-18',
  'news/consumer-electronics-battery-life-testing': '2026-07-18',
  'news/solar-storage-efficiency-optimization-guide': '2026-07-18',
};

export const REGION_LAST_MODIFIED = '2026-08-25';
export const PRODUCT_CATEGORY_LAST_MODIFIED = '2026-08-25';
export const PRODUCT_DETAIL_LAST_MODIFIED = '2026-08-16';
export const DEFAULT_SITEMAP_LAST_MODIFIED = '2026-08-13';

export function getSitemapLastModified(slug: string): string {
  if (slug.startsWith('products/')) return PRODUCT_DETAIL_LAST_MODIFIED;
  if (slug.startsWith('regions/')) return REGION_LAST_MODIFIED;
  return STATIC_SITEMAP_LAST_MODIFIED[slug] || DEFAULT_SITEMAP_LAST_MODIFIED;
}
