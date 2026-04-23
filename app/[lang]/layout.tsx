import { storyblokInit, apiPlugin } from '@storyblok/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/Header';
import '../globals.css';
import { Metadata } from 'next';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
});

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  
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

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isRTL = params.lang === 'ar';
  return (
    <html lang={params.lang} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className="min-h-screen bg-white">
        <Header lang={params.lang} />
        <LanguageSwitcher />
        {children}
        <footer className="bg-gray-50 border-t py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} HousePlus Group. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
