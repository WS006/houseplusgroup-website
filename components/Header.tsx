'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import RegionSwitcher from './RegionSwitcher';

interface NavItem {
  label: string;
  href: string;
}

const navigationItems: Record<string, NavItem[]> = {
  en: [
    { label: 'Home', href: '/' },
    { label: 'About HousePlus', href: '/about-us' },
    { label: 'Products', href: '/products' },
    { label: 'News', href: '/news' },
    { label: 'Factory', href: '/factory' },
    { label: 'Service', href: '/service' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  es: [
    { label: 'Inicio', href: '/' },
    { label: 'Sobre HousePlus', href: '/about-us' },
    { label: 'Productos', href: '/products' },
    { label: 'Noticias', href: '/news' },
    { label: 'Fábrica', href: '/factory' },
    { label: 'Servicio', href: '/service' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contacto', href: '/contact' },
  ],
  de: [
    { label: 'Startseite', href: '/' },
    { label: 'Über HousePlus', href: '/about-us' },
    { label: 'Produkte', href: '/products' },
    { label: 'News', href: '/news' },
    { label: 'Fabrik', href: '/factory' },
    { label: 'Service', href: '/service' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Kontakt', href: '/contact' },
  ],
  fr: [
    { label: 'Accueil', href: '/' },
    { label: 'À propos de HousePlus', href: '/about-us' },
    { label: 'Produits', href: '/products' },
    { label: 'Actualités', href: '/news' },
    { label: 'Usine', href: '/factory' },
    { label: 'Service', href: '/service' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/' },
    { label: 'عن هاوس بلس', href: '/about-us' },
    { label: 'المنتجات', href: '/products' },
    { label: 'الأخبار', href: '/news' },
    { label: 'المصنع', href: '/factory' },
    { label: 'الخدمة', href: '/service' },
    { label: 'الأسئلة الشائعة', href: '/faq' },
    { label: 'اتصل بنا', href: '/contact' },
  ],
};

export default function Header({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = navigationItems[lang] || navigationItems.en;
  const isRTL = lang === 'ar';

  return (
    <header className={`bg-white border-b border-slate-100 sticky top-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="font-black text-3xl text-slate-900 tracking-tighter hover:text-blue-600 transition-colors">
              HousePlus<span className="text-blue-600">.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className={`flex gap-6 xl:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  className="text-slate-600 hover:text-blue-600 font-bold transition-all duration-200 text-[11px] xl:text-xs uppercase tracking-widest"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Region Switcher - Desktop */}
            <RegionSwitcher lang={lang} />
            
            {/* Language Switcher - Desktop */}
            <LanguageSwitcher currentLang={lang} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 space-y-4 border-t border-slate-50 animate-in slide-in-from-top duration-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className="block px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-blue-50 hover:text-blue-600 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switcher - Mobile */}
            <div className="px-4 py-3 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Language
              </div>
              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
