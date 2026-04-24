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
      <head>
        {/* Security & Performance Headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.storyblok.com https://www.google-analytics.com; frame-src 'self' https://www.google.com https://www.youtube.com" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white flex flex-col">
        {/* Semantic HTML5 Structure */}
        <header role="banner" className="w-full sticky top-0 z-50">
          <Header lang={lang} />
          <LanguageSwitcher />
        </header>
        
        <main role="main" className="flex-grow">
          {children}
        </main>
        
        <ServiceWidget 
          whatsapp="+8615578119543"
          wechat="JackHousePlus"
          email="jack@houseplus-ch.com"
          phone="+2349078080738"
        />
        
        <footer role="contentinfo" className="w-full">
          <Footer lang={lang} />
        </footer>
      </body>
    </html>
  );
}
