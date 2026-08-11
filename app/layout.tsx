import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema-generator';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || '',
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
});

export const metadata = {
  title: 'HousePlus - Global Wholesale Solar & Home Appliances Manufacturer',
  description: 'HousePlus is a professional OEM/ODM manufacturer specializing in solar products, home appliances, and 3C electronics. Wholesale solutions for global partners.',
  applicationName: 'HousePlus',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HousePlus',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.houseplus-ch.com',
    siteName: 'HousePlus',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@houseplusglobal',
    creator: '@houseplusglobal',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional OEM/ODM manufacturer specializing in solar products, home appliances, and 3C electronics for global wholesale partners.',
    url: 'https://www.houseplus-ch.com',
    lang: 'en',
    type: 'Organization',
  });
  const siteSchema = generateWebSiteSchema('en');
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [orgSchema, siteSchema],
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d4ed8" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://images.houseplus-ch.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://a.storyblok.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
