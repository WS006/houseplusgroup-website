'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import RegionSwitcher from './RegionSwitcher';

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const navigationItems: Record<string, NavItem[]> = {
  en: [
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      href: '/products',
      children: [
        { label: '☀️ Solar Energy Systems', href: '/products#solar' },
        { label: '🏠 Home Appliances', href: '/products#appliances' },
        { label: '📱 3C Electronics', href: '/products#electronics' },
      ],
    },
    {
      label: 'Company',
      href: '/about-us',
      children: [
        { label: 'Brand', href: '/brand' },
        { label: 'Team', href: '/team' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'OEM/ODM', href: '/oem-odm' },
        { label: 'Case Studies', href: '/case-studies' },
      ],
    },
    { label: 'News', href: '/news' },
    { label: 'Factory', href: '/factory' },
    { label: 'Service', href: '/service' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  es: [
    { label: 'Inicio', href: '/' },
    {
      label: 'Productos',
      href: '/products',
      children: [
        { label: '☀️ Sistemas de Energía Solar', href: '/products#solar' },
        { label: '🏠 Electrodomésticos', href: '/products#appliances' },
        { label: '📱 Electrónica 3C', href: '/products#electronics' },
      ],
    },
    {
      label: 'Empresa',
      href: '/about-us',
      children: [
        { label: 'Marca', href: '/brand' },
        { label: 'Equipo', href: '/team' },
        { label: 'Certificaciones', href: '/certifications' },
        { label: 'OEM/ODM', href: '/oem-odm' },
        { label: 'Casos de Éxito', href: '/case-studies' },
      ],
    },
    { label: 'Noticias', href: '/news' },
    { label: 'Fábrica', href: '/factory' },
    { label: 'Servicio', href: '/service' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contacto', href: '/contact' },
  ],
  de: [
    { label: 'Startseite', href: '/' },
    {
      label: 'Produkte',
      href: '/products',
      children: [
        { label: '☀️ Solar-Energiesysteme', href: '/products#solar' },
        { label: '🏠 Haushaltsgeräte', href: '/products#appliances' },
        { label: '📱 3C-Elektronik', href: '/products#electronics' },
      ],
    },
    {
      label: 'Unternehmen',
      href: '/about-us',
      children: [
        { label: 'Marke', href: '/brand' },
        { label: 'Team', href: '/team' },
        { label: 'Zertifizierungen', href: '/certifications' },
        { label: 'OEM/ODM', href: '/oem-odm' },
        { label: 'Fallstudien', href: '/case-studies' },
      ],
    },
    { label: 'News', href: '/news' },
    { label: 'Fabrik', href: '/factory' },
    { label: 'Service', href: '/service' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Kontakt', href: '/contact' },
  ],
  fr: [
    { label: 'Accueil', href: '/' },
    {
      label: 'Produits',
      href: '/products',
      children: [
        { label: '☀️ Systèmes d\'Énergie Solaire', href: '/products#solar' },
        { label: '🏠 Appareils Électroménagers', href: '/products#appliances' },
        { label: '📱 Électronique 3C', href: '/products#electronics' },
      ],
    },
    {
      label: 'Entreprise',
      href: '/about-us',
      children: [
        { label: 'Marque', href: '/brand' },
        { label: 'Équipe', href: '/team' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'OEM/ODM', href: '/oem-odm' },
        { label: 'Études de Cas', href: '/case-studies' },
      ],
    },
    { label: 'Actualités', href: '/news' },
    { label: 'Usine', href: '/factory' },
    { label: 'Service', href: '/service' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/' },
    {
      label: 'المنتجات',
      href: '/products',
      children: [
        { label: '☀️ أنظمة الطاقة الشمسية', href: '/products#solar' },
        { label: '🏠 الأجهزة المنزلية', href: '/products#appliances' },
        { label: '📱 إلكترونيات 3C', href: '/products#electronics' },
      ],
    },
    {
      label: 'الشركة',
      href: '/about-us',
      children: [
        { label: 'العلامة التجارية', href: '/brand' },
        { label: 'الفريق', href: '/team' },
        { label: 'الشهادات', href: '/certifications' },
        { label: 'OEM/ODM', href: '/oem-odm' },
        { label: 'دراسات الحالة', href: '/case-studies' },
      ],
    },
    { label: 'الأخبار', href: '/news' },
    { label: 'المصنع', href: '/factory' },
    { label: 'الخدمة', href: '/service' },
    { label: 'الأسئلة الشائعة', href: '/faq' },
    { label: 'اتصل بنا', href: '/contact' },
  ],
};

function DropdownArrow({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Header({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
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
              {navItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label} className="relative group">
                      <Link
                        href={item.href === '/' ? `/${lang}` : `/${lang}${item.href}`}
                        className="flex items-center text-slate-600 group-hover:text-blue-600 font-bold transition-all duration-200 text-[11px] xl:text-xs uppercase tracking-widest"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        {item.label}
                        <DropdownArrow open={false} />
                      </Link>
                      <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} pt-2 z-50`}>
                        <div className="w-52 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={`/${lang}${child.href}`}
                              className="block px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href === '/' ? `/${lang}` : `/${lang}${item.href}`}
                    className="text-slate-600 hover:text-blue-600 font-bold transition-all duration-200 text-[11px] xl:text-xs uppercase tracking-widest"
                  >
                    {item.label}
                  </Link>
                );
              })}
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
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 space-y-2 border-t border-slate-50 animate-in slide-in-from-top duration-300">
            {navItems.map((item) => {
              if (item.children) {
                const isOpen = mobileDropdownOpen === item.label;
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileDropdownOpen(isOpen ? null : item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-blue-50 hover:text-blue-600 transition-all"
                    >
                      {item.label}
                      <DropdownArrow open={isOpen} />
                    </button>
                    {isOpen && (
                      <div className="px-4 py-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={`/${lang}${child.href}`}
                            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileDropdownOpen(null);
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href === '/' ? `/${lang}` : `/${lang}${item.href}`}
                  className="block px-4 py-3 rounded-2xl text-lg font-bold text-slate-900 hover:bg-blue-50 hover:text-blue-600 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Language Switcher - Mobile */}
            <div className="px-4 py-3 border-t border-slate-100 mt-4">
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
