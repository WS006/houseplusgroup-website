/**
 * HreflangTags Component
 * Generates hreflang alternate link tags for multi-language SEO
 * Updated: 2026-07-28
 *
 * Ensures Google serves the correct language/region version of each page.
 * Supports: en, es, de, fr, ar
 *
 * Usage:
 * <HreflangTags path="/products/solar-panel-500w" />
 *
 * Generates:
 * <link rel="alternate" hreflang="en-US" href="https://www.houseplus-ch.com/en/products/solar-panel-500w" />
 * <link rel="alternate" hreflang="es-ES" href="https://www.houseplus-ch.com/es/products/solar-panel-500w" />
 * <link rel="alternate" hreflang="de-DE" href="https://www.houseplus-ch.com/de/products/solar-panel-500w" />
 * <link rel="alternate" hreflang="fr-FR" href="https://www.houseplus-ch.com/fr/products/solar-panel-500w" />
 * <link rel="alternate" hreflang="ar-SA" href="https://www.houseplus-ch.com/ar/products/solar-panel-500w" />
 * <link rel="alternate" hreflang="x-default" href="https://www.houseplus-ch.com/en/products/solar-panel-500w" />
 */

import Head from 'next/head';
import { siteConfig } from '../config/seo-config';

interface HreflangTagsProps {
  /** Path without locale prefix, e.g. "/products/solar-panel-500w" */
  path: string;
}

// Locale to hreflang mapping (from i18n.config.js)
const localeHreflang: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
  ar: 'ar-SA',
};

const supportedLocales = ['en', 'es', 'de', 'fr', 'ar'];

export default function HreflangTags({ path }: HreflangTagsProps) {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return (
    <Head>
      {supportedLocales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={localeHreflang[locale]}
          href={`${siteConfig.url}/${locale}${cleanPath}`}
        />
      ))}
      {/* x-default: fallback for unmatched locales — always English */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteConfig.url}/en${cleanPath}`}
      />
    </Head>
  );
}
