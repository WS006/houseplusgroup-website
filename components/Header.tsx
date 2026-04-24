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
    { label: 'About HousePlus', href: '/about-us' },
    { label: 'Products', href: '/products' },
    { label: 'Factory', href: '/factory' },
    { label: 'Service', href: '/service' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
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
          <div className="hidden lg:block">
            <div className={`flex gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  className="text-slate-600 hover:text-blue-600 font-bold transition-all duration-200 text-sm uppercase tracking-widest"
                >
                  {item.label}
                </Link>
              ))}
            </div>
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
          <div className="lg:hidden py-6 space-y-4 border-t border-slate-50">
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
          </div>
        )}
      </nav>
    </header>
  );
}
