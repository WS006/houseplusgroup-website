import { Metadata } from 'next';

const BASE_URL = 'https://www.houseplus-ch.com';
const LOCALES = ['en', 'es', 'de', 'fr', 'ar'];

export type SupportedLocale = 'en' | 'es' | 'de' | 'fr' | 'ar';

interface SEOMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  /** Relative path such as "/en/products" or "/en" */
  url: string;
  lang: SupportedLocale;
  type?: string;
}

/**
 * Generates Next.js Metadata with full hreflang alternates for all 5 locales.
 * Pass `url` as a relative path with the locale included, e.g. "/en/products".
 * The function strips the locale prefix to rebuild alternate URLs for each locale.
 */
export function generateMetadata(options: SEOMetadataOptions): Metadata {
  const { title, description, keywords, url, lang, type = 'website' } = options;

  // Strip leading locale from the path to get the slug part (e.g. "/en/products" → "/products")
  const slugPart = url.replace(/^\/(en|es|de|fr|ar)(\/|$)/, '/');

  const langAlternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    const path = slugPart === '/' ? `/${locale}` : `/${locale}${slugPart}`;
    langAlternates[locale] = `${BASE_URL}${path}`;
  }
  langAlternates['x-default'] = `${BASE_URL}/en${slugPart === '/' ? '' : slugPart}`;

  const canonicalUrl = `${BASE_URL}${url}`;

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: langAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'HousePlus',
      locale: lang === 'ar' ? 'ar_AR' : `${lang}_${lang.toUpperCase()}`,
      type: type as any,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
