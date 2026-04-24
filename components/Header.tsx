'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navigationItems: Record<string, NavItem[]> = {
  en: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Products', href: '/products' },
    { label: 'Factory', href: '/factory' },
    { label: 'Team', href: '/team' },
    { label: 'Service', href: '/service' },
    { label: 'Careers', href: '/careers' },
    { label: 'FAQ', href: '/faq' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ],
  es: [
    { label: 'Inicio', href: '/' },
    { label: 'Acerca de', href: '/about-us' },
    { label: 'Productos', href: '/products' },
    { label: 'Fábrica', href: '/factory' },
    { label: 'Equipo', href: '/team' },
    { label: 'Servicio', href: '/service' },
    { label: 'Carreras', href: '/careers' },
    { label: 'Preguntas Frecuentes', href: '/faq' },
    { label: 'Noticias', href: '/news' },
    { label: 'Contacto', href: '/contact' },
  ],
  de: [
    { label: 'Startseite', href: '/' },
    { label: 'Über Uns', href: '/about-us' },
    { label: 'Produkte', href: '/products' },
    { label: 'Fabrik', href: '/factory' },
    { label: 'Team', href: '/team' },
    { label: 'Service', href: '/service' },
    { label: 'Karriere', href: '/careers' },
    { label: 'Häufig Gestellte Fragen', href: '/faq' },
    { label: 'Nachrichten', href: '/news' },
    { label: 'Kontakt', href: '/contact' },
  ],
  fr: [
    { label: 'Accueil', href: '/' },
    { label: 'À Propos', href: '/about-us' },
    { label: 'Produits', href: '/products' },
    { label: 'Usine', href: '/factory' },
    { label: 'Équipe', href: '/team' },
    { label: 'Service', href: '/service' },
    { label: 'Carrières', href: '/careers' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Actualités', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/' },
    { label: 'من نحن', href: '/about-us' },
    { label: 'المنتجات', href: '/products' },
    { label: 'المصنع', href: '/factory' },
    { label: 'الفريق', href: '/team' },
    { label: 'الخدمة', href: '/service' },
    { label: 'الوظائف', href: '/careers' },
    { label: 'الأسئلة الشائعة', href: '/faq' },
    { label: 'الأخبار', href: '/news' },
    { label: 'اتصل بنا', href: '/contact' },
  ],
};

export default function Header({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = navigationItems[lang] || navigationItems.en;
  const isRTL = lang === 'ar';

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="font-bold text-2xl text-blue-600 hover:text-blue-700 transition-colors">
              HousePlus
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            aria-expanded="false"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`lg:hidden pb-4 ${isRTL ? 'flex flex-col-reverse' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
