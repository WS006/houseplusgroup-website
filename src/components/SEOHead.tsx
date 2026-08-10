/**
 * SEOHead Component
 * Centralized SEO meta tags for all pages
 * Updated: 2026-07-28
 *
 * Features:
 * - Open Graph tags for social sharing
 * - Twitter Card tags
 * - Canonical URLs
 * - JSON-LD structured data injection
 * - robots meta directives
 * - Dynamic title/description per page
 */

import Head from 'next/head';
import { siteConfig } from '../config/seo-config';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  robots?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  locale?: string;
  alternates?: { hreflang: string; href: string }[];
}

export default function SEOHead({
  title,
  description = siteConfig.name,
  keywords,
  canonical,
  ogImage = 'https://www.houseplus-ch.com/og-default.jpg',
  ogType = 'website',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  noindex = false,
  jsonLd,
  locale = 'en',
  alternates = [],
}: SEOHeadProps) {
  const fullTitle = title || siteConfig.name;
  const finalRobots = noindex ? 'noindex, nofollow' : robots;
  const finalCanonical = canonical || `${siteConfig.url}/${locale}`;

  // Build JSON-LD structured data
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      {/* === Primary Meta Tags === */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={finalRobots} />
      <meta name="author" content={siteConfig.name} />
      <meta name="language" content={locale} />

      {/* === Canonical === */}
      <link rel="canonical" href={finalCanonical} />

      {/* === Mobile & Viewport === */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      {/* === Theme Color — warm orange from HousePlus logo === */}
      <meta name="theme-color" content="#E85D2F" />

      {/* === Open Graph / Facebook === */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteConfig.name} — ${description.substring(0, 60)}`} />
      <meta property="og:locale" content={locale === 'en' ? 'en_US' : locale} />

      {/* === Twitter Card === */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${siteConfig.name} product image`} />

      {/* === Hreflang Alternates === */}
      {alternates.length > 0 && (
        <>
          {alternates.map((alt) => (
            <link
              key={alt.hreflang}
              rel="alternate"
              hrefLang={alt.hreflang}
              href={alt.href}
            />
          ))}
          {/* x-default for users whose locale doesn't match any alternate */}
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`${siteConfig.url}/en`}
          />
        </>
      )}

      {/* === JSON-LD Structured Data === */}
      {jsonLdArray.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* === Performance: Preconnect === */}
      <link rel="preconnect" href="https://images.houseplus-ch.com" />
      <link rel="dns-prefetch" href="https://images.houseplus-ch.com" />
    </Head>
  );
}
