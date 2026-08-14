import { Head, Html, Main, NextScript } from 'next/document';

/**
 * Provides the Pages Router fallback error routes with a valid Document context.
 * The primary site uses the App Router; Next.js still renders /404 and /500
 * through this fallback during production builds.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
