import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n-config';

const baseUrl = 'https://www.houseplus-ch.com';

const pages = [
  '',
  'about',
  'products',
  'factory',
  'team',
  'service',
  'careers',
  'faq',
  'news',
  'contact',
  'support',
  'privacy',
  'terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Add all language variants for each page
  locales.forEach((lang) => {
    pages.forEach((page) => {
      const path = page ? `/${lang}/${page}` : `/${lang}`;
      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : page === 'products' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === 'products' ? 0.9 : 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page ? `/${page}` : ''}`,
            es: `${baseUrl}/es${page ? `/${page}` : ''}`,
            de: `${baseUrl}/de${page ? `/${page}` : ''}`,
            fr: `${baseUrl}/fr${page ? `/${page}` : ''}`,
            ar: `${baseUrl}/ar${page ? `/${page}` : ''}`,
          },
        },
      });
    });
  });

  return entries;
}
