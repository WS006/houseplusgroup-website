/**
 * HousePlus Global App Component
 * Updated: 2026-07-28
 *
 * FIX: Removed duplicate SEOHead — individual pages now own their own
 * <SEOHead> for page-specific title/description/canonical/JSON-LD.
 * This file injects only GLOBAL elements that apply to every page:
 *
 * 1. Search engine verification meta tags (GSC, Bing, Yandex)
 * 2. Favicons and PWA manifest
 * 3. Preconnect / dns-prefetch hints
 * 4. Organization + WebSite structured data (site-wide schemas)
 * 5. Google Analytics (deferred)
 * 6. Web Vitals monitoring
 *
 * IMPORTANT: Do NOT add <title>, <meta description>, or canonical here —
 * those are page-specific and must be set by each page's <SEOHead>.
 */

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';

import WebVitals from '../components/WebVitals';
import { OrganizationSchema, WebSiteSchema } from '../components/SchemaOrg';

// Google Search Console verification (replace with actual code)
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION || '';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Track page views for analytics
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const handleRouteChange = (url: string) => {
        (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
          page_path: url,
        });
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  // Global structured data — injected once at app level
  const orgSchema = OrganizationSchema();
  const siteSchema = WebSiteSchema();

  return (
    <>
      {/* === Global Head: Site-wide meta ONLY === */}
      <Head>
        {/* Search engine verification */}
        {GSC_VERIFICATION && (
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        )}
        <meta
          name="msvalidate.01"
          content={process.env.NEXT_PUBLIC_BING_VERIFICATION || ''}
        />
        <meta
          name="yandex-verification"
          content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || ''}
        />

        {/* Favicons — includes HousePlus brand logo */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/jpeg" href="/houseplus-logo.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/houseplus-logo.jpg" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.houseplus-ch.com" />
        <link rel="dns-prefetch" href="https://images.houseplus-ch.com" />

        {/* Sitemap reference */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

        {/* === Global Structured Data (Organization + WebSite) === */}
        {/* Page-level schemas (Product, FAQ, Breadcrumb) are added by individual pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </Head>

      {/* === Page Content === */}
      <Component {...pageProps} />

      {/* === Web Vitals Monitoring (production only) === */}
      <WebVitals />

      {/* === Google Analytics (deferred load) === */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true,
                  anonymize_ip: true,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
