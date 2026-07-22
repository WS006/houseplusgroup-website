import { storyblokInit, apiPlugin } from '@storyblok/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceWidget from '@/components/ServiceWidget';
import ChatBot from '@/components/ChatBot';
import BackToTop from '@/components/BackToTop';
import '../globals.css';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n-config';
import { headers } from 'next/headers';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema-generator';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || '',
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;

  const orgSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional OEM/ODM manufacturer specializing in solar products, home appliances, and 3C electronics for global wholesale partners.',
    url: `https://www.houseplus-ch.com/${lang}`,
    lang,
    type: 'Organization',
  });
  const siteSchema = generateWebSiteSchema(lang);
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [orgSchema, siteSchema],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical domains for better performance */}
        <link rel="preconnect" href="https://a.storyblok.com" />
        <link rel="dns-prefetch" href="https://a.storyblok.com" />

        {/* Preconnect to Cloudinary if used */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Preconnect to fonts.googleapis.com */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} />
        <ServiceWidget />
        <ChatBot />
        <BackToTop />
      </body>
    </html>
  );
}
