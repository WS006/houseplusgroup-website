import { storyblokInit, apiPlugin } from '@storyblok/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceWidget from '@/components/ServiceWidget';
import '../globals.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n-config';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLK_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  // Validate language
  if (!isValidLocale(lang)) {
    return {
      title: 'Not Found',
    };
  }

  const titles: Record<string, string> = {
    en: 'HousePlus - Home Appliances & Solar Systems Wholesale',
    es: 'HousePlus - Electrodomésticos y Sistemas Solares al por mayor',
    de: 'HousePlus - Haushaltsgeräte & Solarsysteme Großhandel',
    fr: 'HousePlus - Électroménager et Systèmes Solaires en gros',
    ar: 'HousePlus - الأجهزة المنزلية وأنظمة الطاقة الشمسية بالجملة',
  };

  const descriptions: Record<string, string> = {
    en: 'Professional manufacturer of home appliances, solar systems, and portable power stations for global wholesale buyers.',
    es: 'Fabricante profesional de electrodomésticos, sistemas solares y estaciones de energía portátiles para compradores mayoristas globales.',
    de: 'Professioneller Hersteller von Haushaltsgeräten, Solarsystemen und tragbaren Stromversorgungen für globales Großhandelskunden.',
    fr: 'Fabricant professionnel d\'électroménager, de systèmes solaires et de stations d\'énergie portables pour les acheteurs en gros mondiaux.',
    ar: 'مصنع متخصص في الأجهزة المنزلية وأنظمة الطاقة الشمسية ومحطات الطاقة المحمولة للمشترين بالجملة حول العالم.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    metadataBase: new URL('https://www.houseplus-ch.com'),
    alternates: {
      canonical: `https://www.houseplus-ch.com/${lang}`,
      languages: {
        en: 'https://www.houseplus-ch.com/en',
        es: 'https://www.houseplus-ch.com/es',
        de: 'https://www.houseplus-ch.com/de',
        fr: 'https://www.houseplus-ch.com/fr',
        ar: 'https://www.houseplus-ch.com/ar',
        'x-default': 'https://www.houseplus-ch.com/en',
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: `https://www.houseplus-ch.com/${lang}`,
      siteName: 'HousePlus',
      locale: lang === 'ar' ? 'ar_AR' : `${lang}_${lang.toUpperCase()}`,
      type: 'website',
      images: [
        {
          url: 'https://www.houseplus-ch.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: titles[lang] || titles.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      images: ['https://www.houseplus-ch.com/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ServiceWidget />
      </body>
    </html>
  );
}
