import { storyblokInit, apiPlugin } from '@storyblok/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceWidget from '@/components/ServiceWidget';
import '../globals.css';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n-config';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLK_TOKEN,
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
      </head>
      <body suppressHydrationWarning>
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} />
        <ServiceWidget />
      </body>
    </html>
  );
}
