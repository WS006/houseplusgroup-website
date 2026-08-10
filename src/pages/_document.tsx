/**
 * HousePlus Custom Document
 * Updated: 2026-08-10
 *
 * Sets the HTML lang attribute for international SEO and preloads
 * critical fonts for performance. This file runs once on the server
 * during static generation — it does NOT re-render on route changes.
 *
 * SEO IMPACT:
 * 1. Sets <html lang> dynamically based on the current locale path —
 *    tells search engines the language of each page. Essential for
 *    international SEO and accessibility. Falls back to "en" when the
 *    locale cannot be determined (e.g. root-level pages).
 * 2. Preloads Inter font for fast text rendering (LCP improvement).
 * 3. Declares DNS prefetch for CDN and analytics domains.
 */

import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps as NextDocInitialProps,
} from 'next/document';

const SUPPORTED_LOCALES = ['en', 'es', 'de', 'fr', 'ar'];
const RTL_LOCALES = ['ar'];

// Extract locale from the URL path (e.g. /en/products → "en")
function getLocaleFromPath(asPath: string): string {
  const segments = asPath.split('/').filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
    return segments[0];
  }
  return 'en'; // default fallback
}

type HousePlusDocumentProps = NextDocInitialProps & { locale?: string };

NextDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<HousePlusDocumentProps> => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  const asPath = ctx.asPath || '/';
  const locale = getLocaleFromPath(asPath);

  return {
    ...initialProps,
    locale,
  };
};

export default function Document({ locale = 'en' }: HousePlusDocumentProps) {
  const isRTL = RTL_LOCALES.includes(locale);

  return (
    <Html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <Head>
        {/* === Preload critical fonts for LCP === */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />

        {/* === DNS prefetch for external resources === */}
        <link rel="dns-prefetch" href="https://images.houseplus-ch.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* === HousePlus logo as apple-touch-icon === */}
        <link rel="apple-touch-icon" href="/houseplus-logo.jpg" />
        <link rel="icon" type="image/jpeg" href="/houseplus-logo.jpg" />

        {/* === Theme color — warm gradient palette from HousePlus logo === */}
        <meta name="theme-color" content="#E85D2F" />
        <meta name="msapplication-TileColor" content="#E85D2F" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
