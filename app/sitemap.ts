import { MetadataRoute } from 'next';

const baseUrl = 'https://www.houseplus-ch.com';
const locales = ['en', 'es', 'de', 'fr', 'ar'];

// Last modified dates for static pages (update these periodically)
const lastModDates: Record<string, string> = {
  '': '2026-05-01', // Homepage - last content review date
  'about': '2026-04-15', // About page - last major update
  'products': '2026-05-01', // Products list - content review date
  'news': '2026-05-04', // News - recent update
  'factory': '2026-03-20', // Factory - last major update
  'service': '2026-04-10', // Service - last update
  'faq': '2026-04-25', // FAQ - last update
  'contact': '2026-04-10', // Contact - last update
  'team': '2026-03-15', // Team - last update
  'careers': '2026-03-15', // Careers - last update
  'support': '2026-04-20', // Support - last update
  'privacy': '2026-01-01', // Privacy - last major update
  'terms': '2026-05-06', // Terms of Service - created
  'cookie-policy': '2026-05-06', // Cookie Policy - created
  'sitemap-page': '2026-05-04', // Sitemap - created date
};

// All static page slugs (relative to lang prefix)
const staticPages = [
  { slug: '', priority: 1.0, changefreq: 'daily' as const },
  { slug: 'about', priority: 0.9, changefreq: 'monthly' as const },
  { slug: 'products', priority: 0.9, changefreq: 'daily' as const },
  { slug: 'news', priority: 0.8, changefreq: 'weekly' as const },
  { slug: 'factory', priority: 0.7, changefreq: 'monthly' as const },
  { slug: 'service', priority: 0.7, changefreq: 'monthly' as const },
  { slug: 'faq', priority: 0.6, changefreq: 'monthly' as const },
  { slug: 'contact', priority: 0.8, changefreq: 'monthly' as const },
  { slug: 'team', priority: 0.5, changefreq: 'monthly' as const },
  { slug: 'careers', priority: 0.5, changefreq: 'monthly' as const },
  { slug: 'support', priority: 0.6, changefreq: 'monthly' as const },
  { slug: 'privacy', priority: 0.3, changefreq: 'yearly' as const },
  { slug: 'terms', priority: 0.3, changefreq: 'yearly' as const },
  { slug: 'cookie-policy', priority: 0.3, changefreq: 'yearly' as const },
  { slug: 'sitemap-page', priority: 0.3, changefreq: 'monthly' as const },
];

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

  return allEntries;
}
