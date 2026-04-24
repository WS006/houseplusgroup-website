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
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
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
    de: 'Professioneller Hersteller von Haushaltsgeräten, Solarsystemen und tragbaren Kraftwerken für globale Großhandelskäufer.',
    fr: 'Fabricant professionnel d\'appareils électroménagers, de systèmes solaires et de stations électriques portables pour les acheteurs en gros mondiaux.',
    ar: 'مصنع محترف للأجهزة المنزلية وأنظمة الطاقة الشمسية ومحطات الطاقة المحمولة للمشترين بالجملة العالميين.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'es': '/es',
        'de': '/de',
        'fr': '/fr',
        'ar': '/ar',
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

  // Validate language
  if (!isValidLocale(lang)) {
    notFound();
  }

  const isRTL = lang === 'ar';
  return (
    <html lang={lang} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className="min-h-screen bg-white">
        <Header lang={lang} />
        <LanguageSwitcher />
        <ServiceWidget 
          whatsapp="+8615578119543"
          wechat="JackHousePlus"
          email="jack@houseplus-ch.com"
          phone="+2349078080738"
        />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
