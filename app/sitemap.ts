import { MetadataRoute } from 'next';
import { baseUrl, locales, staticPageSlugs, productSlugs, newsSlugs, regionSlugs } from '@/lib/urls';

// Last modified dates for static pages (update these periodically)
const lastModDates: Record<string, string> = {
  '': '2026-06-29',
  'about-us': '2026-06-29',
  'products': '2026-06-29',
  'news': '2026-06-29',
  'factory': '2026-06-29',
  'service': '2026-06-29',
  'faq': '2026-06-29',
  'contact': '2026-06-29',
  'team': '2026-06-29',
  'careers': '2026-06-29',
  'support': '2026-06-29',
  'privacy': '2026-06-29',
  'terms': '2026-06-29',
  'cookie-policy': '2026-06-29',
  'sitemap-page': '2026-06-29',
  'certifications': '2026-06-29',
  'oem-odm': '2026-06-29',
  'case-studies': '2026-06-29',
  'brand': '2026-07-23',
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
  } else if (['factory', 'service', 'faq', 'contact', 'certifications', 'oem-odm', 'case-studies'].includes(slug)) {
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

  // Region pages
  for (const regionSlug of regionSlugs) {
    const entries = buildUrlEntry(`regions/${regionSlug}`, 0.7, 'monthly');
    allEntries.push(...entries);
  }

  // News pages
  for (const newsSlug of newsSlugs) {
    const entries = buildUrlEntry(`news/${newsSlug}`, 0.8, 'weekly');
    allEntries.push(...entries);
  }

  return allEntries;
}
