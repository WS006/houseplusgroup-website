import { MetadataRoute } from 'next';
import { baseUrl, locales, staticPageSlugs, productSlugs, newsSlugs } from '@/lib/urls';

// Last modified dates for static pages (update these periodically)
const lastModDates: Record<string, string> = {
  '': '2026-05-22',
  'about-us': '2026-05-22',
  'products': '2026-05-22',
  'news': '2026-05-22',
  'factory': '2026-03-20',
  'service': '2026-04-10',
  'faq': '2026-04-25',
  'contact': '2026-04-10',
  'team': '2026-03-15',
  'careers': '2026-03-15',
  'support': '2026-04-20',
  'privacy': '2026-01-01',
  'terms': '2026-05-06',
  'cookie-policy': '2026-05-06',
  'sitemap-page': '2026-05-22',
};

// All static page slugs from single source of truth
const staticPages = staticPageSlugs.map(slug => {
  let priority: number;
  let changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  
  if (slug === '') {
    priority = 1.0;
    changefreq = 'daily';
  } else if (['about-us', 'products'].includes(slug)) {
    priority = 0.9;
    changefreq = slug === 'products' ? 'daily' : 'monthly';
  } else if (slug === 'news') {
    priority = 0.8;
    changefreq = 'weekly';
  } else if (['factory', 'service', 'faq', 'contact'].includes(slug)) {
    priority = 0.7;
    changefreq = 'monthly';
  } else if (['team', 'careers', 'support'].includes(slug)) {
    priority = 0.6;
    changefreq = 'monthly';
  } else {
    priority = 0.3;
    changefreq = 'yearly';
  }
  
  return { slug, priority, changefreq };
});

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

  // News pages
  for (const newsSlug of newsSlugs) {
    const entries = buildUrlEntry(`news/${newsSlug}`, 0.8, 'weekly');
    allEntries.push(...entries);
  }

  return allEntries;
}
