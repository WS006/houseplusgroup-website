import { MetadataRoute } from 'next';
import { canonicalSiteUrl, locales, staticPageSlugs, productSlugs, newsSlugs, regionSlugs } from '@/lib/urls';
import {
  getSitemapLastModified,
  PRODUCT_CATEGORY_LAST_MODIFIED,
} from '@/lib/sitemap-lastmod';

// These query-filtered catalog views publish distinct, indexable metadata. List
// their exact final URLs in the sitemap so Google receives the same canonical
// and hreflang signal as the rendered product listing page.
const productCategoryFilters = ['solar', 'home-appliances', '3c-electronics'] as const;

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
    languages[lang] = canonicalSiteUrl(slug ? `${lang}/${slug}` : lang);
  }
  languages['x-default'] = canonicalSiteUrl(slug ? `en/${slug}` : 'en');
  return languages;
}

function buildUrlEntry(slug: string, priority: number, changefreq: ChangeFreq, targetLocales: readonly string[] = locales) {
  // Use the page-specific date when maintained; new localized detail pages were
  // updated with the current multilingual release.
  const lastmod = getSitemapLastModified(slug);
  const entries = [];

  for (const lang of targetLocales) {
    const url = canonicalSiteUrl(slug ? `${lang}/${slug}` : lang);
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

function buildProductCategoryEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const category of productCategoryFilters) {
    const languages: Record<string, string> = {};
    for (const lang of locales) {
      languages[lang] = `${canonicalSiteUrl(`${lang}/products`)}?category=${category}`;
    }
    languages['x-default'] = `${canonicalSiteUrl('en/products')}?category=${category}`;

    for (const lang of locales) {
      entries.push({
        url: languages[lang],
        lastModified: PRODUCT_CATEGORY_LAST_MODIFIED,
        changeFrequency: 'weekly',
        priority: lang === 'en' ? 0.75 : 0.675,
        alternates: { languages },
      });
    }
  }

  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const allEntries: MetadataRoute.Sitemap = [];

  // Static pages now render verified native B2B copy for every published locale.
  for (const page of staticPages) {
    const entries = buildUrlEntry(page.slug, page.priority, page.changefreq);
    allEntries.push(...entries);
  }

  allEntries.push(...buildProductCategoryEntries());

  // Product detail pages carry verified ES/DE/FR/AR translations and are published
  // as five independent language URLs with reciprocal hreflang annotations.
  for (const productSlug of productSlugs) {
    const entries = buildUrlEntry(`products/${productSlug}`, 0.7, 'weekly');
    allEntries.push(...entries);
  }

  // Region pages carry localized procurement and contact information for every locale.
  for (const regionSlug of regionSlugs) {
    const entries = buildUrlEntry(`regions/${regionSlug}`, 0.7, 'monthly');
    allEntries.push(...entries);
  }

  // Dynamic news articles carry verified ES/DE/FR/AR translations.
  for (const newsSlug of newsSlugs) {
    const entries = buildUrlEntry(`news/${newsSlug}`, 0.8, 'weekly');
    allEntries.push(...entries);
  }

  return allEntries;
}
