import { storyblokInit, apiPlugin } from '@storyblok/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceWidget from '@/components/ServiceWidget';
import '../globals.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, getDictionary } from '@/lib/i18n-config';
import { generateMetadata as generateSeoMetadata, siteConfig } from '@/lib/seo-utils';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLK_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
});

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  const seoConfig = {
    title: dictionary.site.title + ' | ' + siteConfig.name, // Use dictionary title
    description: dictionary.meta.homeDescription, // Use dictionary description
    keywords: dictionary.meta.keywords.split(',').map(keyword => keyword.trim()), // Use dictionary keywords
    url: `/${lang}`,
    lang: lang,
    geoRegion: 'CN-GD', // Example: Guangdong, China
    geoPlacename: 'Foshan', // Example: Foshan
  };

  return generateSeoMetadata(seoConfig);
}

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
      <body suppressHydrationWarning>
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} />
        <ServiceWidget />
      </body>
    </html>
  );
}
