import { MetadataRoute } from 'next';

const baseUrl = 'https://www.houseplus-ch.com';
const locales = ['en', 'es', 'de', 'fr', 'ar'];

// Last modified dates for static pages (update these periodically)
const lastModDates: Record<string, string> = {
  '': '2026-05-01',
  'about-us': '2026-04-15',
  'products': '2026-05-01',
  'news': '2026-05-08',
  'factory': '2026-03-20',
  'service': '2026-04-10',
  'faq': '2026-04-25',
  'contact': '2026-04-10',
  'team': '2026-03-15',
  'careers': '2026-03-15',
  'support': '2026-04-20',
  'regions': '2026-05-08',
  'privacy': '2026-01-01',
  'terms': '2026-05-06',
  'cookie-policy': '2026-05-06',
  'sitemap-page': '2026-05-04',
  // News articles
  'news/advanced-manufacturing-home-appliances': '2026-05-01',
  'news/oem-odm-manufacturing-guide': '2026-05-01',
  'news/energy-efficiency-standards-appliances': '2026-05-01',
  'news/global-wholesale-guide-home-appliances': '2026-05-01',
  'news/smart-home-appliances': '2026-05-01',
  'news/solar-energy-storage-solutions': '2026-05-01',
  'news/the-evolution-of-3c-electronics': '2026-05-01',
  'news/the-future-of-smart-home-appliances': '2026-05-01',
  'news/the-future-of-solar-energy': '2026-05-01',
  // Region pages
  'regions/africa': '2026-05-08',
  'regions/southeast_asia': '2026-05-08',
  'regions/europe': '2026-05-08',
};

// All static page slugs (relative to lang prefix)
const staticPages = [
  { slug: '', priority: 1.0, changefreq: 'daily' as const },
  { slug: 'about-us', priority: 0.9, changefreq: 'monthly' as const },
  { slug: 'products', priority: 0.9, changefreq: 'daily' as const },
  { slug: 'news', priority: 0.8, changefreq: 'weekly' as const },
  { slug: 'factory', priority: 0.7, changefreq: 'monthly' as const },
  { slug: 'service', priority: 0.7, changefreq: 'monthly' as const },
  { slug: 'faq', priority: 0.6, changefreq: 'monthly' as const },
  { slug: 'contact', priority: 0.8, changefreq: 'monthly' as const },
  { slug: 'team', priority: 0.5, changefreq: 'monthly' as const },
  { slug: 'careers', priority: 0.5, changefreq: 'monthly' as const },
  { slug: 'support', priority: 0.6, changefreq: 'monthly' as const },
  { slug: 'regions', priority: 0.7, changefreq: 'monthly' as const },
  { slug: 'privacy', priority: 0.3, changefreq: 'yearly' as const },
  { slug: 'terms', priority: 0.3, changefreq: 'yearly' as const },
  { slug: 'cookie-policy', priority: 0.3, changefreq: 'yearly' as const },
  { slug: 'sitemap-page', priority: 0.3, changefreq: 'monthly' as const },
];

// Published news article slugs
const newsSlugs = [
  'advanced-manufacturing-home-appliances',
  'oem-odm-manufacturing-guide',
  'energy-efficiency-standards-appliances',
  'global-wholesale-guide-home-appliances',
  'smart-home-appliances',
  'solar-energy-storage-solutions',
  'the-evolution-of-3c-electronics',
  'the-future-of-smart-home-appliances',
  'the-future-of-solar-energy',
];

// Region pages
const regionSlugs = ['africa', 'southeast_asia', 'europe'];

// Product slugs from Storyblok (published stories under products/)
const productSlugs = [
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

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

function buildHreflangs(slug: string) {
  const languages: Record<string, string> = {};
  for (const lang of locales) {
    const path = slug ? `/${lang}/${slug}` : `/${lang}`;
    languages[lang] = `${baseUrl}${path}`;
  }
  languages['x-default'] = `${baseUrl}/en${slug ? `/${slug}` : ''}`;
  return languages;
}

function buildUrlEntry(slug: string, priority: number, changefreq: ChangeFreq) {
  // Use specific lastmod date if available, otherwise use a recent date
  const lastmod = lastModDates[slug] || '2026-05-01';
  const entries = [];

  for (const lang of locales) {
    const url = slug ? `${baseUrl}/${lang}/${slug}` : `${baseUrl}/${lang}`;
    entries.push({
      url,
      lastModified: lastmod,
      changeFrequency: changefreq,
      priority: lang === 'en' ? priority : priority * 0.9,
      alternates: {
        languages: buildHreflangs(slug),
      },
    });
  }

  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const allEntries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of staticPages) {
    const entries = buildUrlEntry(page.slug, page.priority, page.changefreq);
    allEntries.push(...entries);
  }

  // Product detail pages
  for (const productSlug of productSlugs) {
    const entries = buildUrlEntry(`products/${productSlug}`, 0.7, 'weekly');
    allEntries.push(...entries);
  }

  // News article pages
  for (const newsSlug of newsSlugs) {
    const entries = buildUrlEntry(`news/${newsSlug}`, 0.6, 'monthly');
    allEntries.push(...entries);
  }

  // Region pages
  for (const regionSlug of regionSlugs) {
    const entries = buildUrlEntry(`regions/${regionSlug}`, 0.7, 'monthly');
    allEntries.push(...entries);
  }

  return allEntries;
}
