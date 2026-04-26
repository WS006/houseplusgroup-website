import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/lib/i18n-config';

const baseUrl = 'https://www.houseplus-ch.com';

const pages = [
  '',
  'about-us',
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((lang) => {
    pages.forEach((page) => {
      const path = page ? `/${lang}/${page}` : `/${lang}`;
      const priority = page === ''
        ? 1.0
        : page === 'products'
          ? 0.9
          : page === 'factory' || page === 'team' || page === 'service'
            ? 0.85
            : 0.7;

      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: page === ''
          ? 'daily'
          : page === 'products' || page === 'news'
            ? 'weekly'
            : 'monthly',
        priority,
        alternates: {
          languages: {
            'x-default': `${baseUrl}/${defaultLocale}${page ? `/${page}` : ''}`,
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
