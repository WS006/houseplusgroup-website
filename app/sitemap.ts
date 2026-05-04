import { MetadataRoute } from 'next';

const baseUrl = 'https://www.houseplus-ch.com';
const locales = ['en', 'es', 'de', 'fr', 'ar'];

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
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
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
