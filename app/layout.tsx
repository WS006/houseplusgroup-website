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
  metadataBase: new URL('https://www.houseplus-ch.com'),
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
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 675,
      alt: 'HousePlus global wholesale solar systems, home appliances and 3C electronics',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@houseplusglobal',
    creator: '@houseplusglobal',
    images: ['/og-image.jpg'],
  },
  other: {
    'geo.region': 'CN-GD',
    'geo.placename': 'Zhongshan, Guangdong, China',
    'geo.position': '22.5170;113.3925',
    'ICBM': '22.5170, 113.3925',
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
        <link rel="icon" href="https://images.houseplus-ch.com/media/houseplus-group-brand-icon/" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="https://images.houseplus-ch.com/media/houseplus-apple-touch-icon/" />
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
