'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { locales, localeConfigs } from '../i18n-config';

// Country flag SVG icons
const FlagIcons: Record<string, React.ReactNode> = {
  en: (
    <svg className="w-5 h-5 rounded-sm shadow-sm" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8"/>
      <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="5"/>
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12"/>
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8"/>
    </svg>
  ),
  es: (
    <svg className="w-5 h-5 rounded-sm shadow-sm" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#AA151B"/>
      <rect y="10" width="60" height="20" fill="#F1BF00"/>
    </svg>
  ),
  de: (
    <svg className="w-5 h-5 rounded-sm shadow-sm" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="13.33" fill="#000"/>
      <rect y="13.33" width="60" height="13.33" fill="#DD0000"/>
      <rect y="26.67" width="60" height="13.33" fill="#FFCE00"/>
    </svg>
  ),
  fr: (
    <svg className="w-5 h-5 rounded-sm shadow-sm" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="40" fill="#002395"/>
      <rect x="20" width="20" height="40" fill="#fff"/>
      <rect x="40" width="20" height="40" fill="#ED2939"/>
    </svg>
  ),
  ar: (
    <svg className="w-5 h-5 rounded-sm shadow-sm" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#006C35"/>
      <circle cx="30" cy="20" r="8" fill="#fff"/>
      <text x="30" y="24" textAnchor="middle" fill="#006C35" fontSize="10" fontWeight="bold">لا</text>
    </svg>
  ),
};

// Country codes mapping
const CountryCodes: Record<string, string> = {
  en: 'GB',
  es: 'ES',
  de: 'DE',
  fr: 'FR',
  ar: 'SA',
};

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Get current path (remove language prefix)
  const pathWithoutLang = pathname?.split('/').slice(2).join('/') || '';
  const currentConfig = localeConfigs[currentLang as keyof typeof localeConfigs];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl
          bg-white border border-slate-200 shadow-sm
          hover:border-blue-300 hover:shadow-md
          active:scale-95
          transition-all duration-200 ease-out
          ${isOpen ? 'border-blue-400 ring-2 ring-blue-100' : ''}
        `}
        aria-label="Switch language"
      >
        {/* Current Flag */}
        <span className="flex-shrink-0">
          {FlagIcons[currentLang] || FlagIcons.en}
        </span>
        
        {/* Country Code */}
        <span className="text-sm font-bold text-slate-700 tracking-wide">
          {CountryCodes[currentLang] || 'GB'}
        </span>
        
        {/* Dropdown Arrow */}
        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="
            absolute right-0 mt-2 w-56 rounded-2xl
            bg-white shadow-xl ring-1 ring-slate-900/5
            z-50 overflow-hidden
            animate-in fade-in slide-in-from-top-2 duration-200
          ">
            {/* Header */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Select Language
              </span>
            </div>

            {/* Language Options */}
            <div className="py-1">
              {locales.map((locale) => {
                const config = localeConfigs[locale];
                const isActive = locale === currentLang;
                const href = `/${locale}${pathWithoutLang ? `/${pathWithoutLang}` : ''}`;

                return (
                  <Link
                    key={locale}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 mx-1 rounded-xl
                      transition-all duration-150
                      ${isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-50'
                      }
                    `}
                  >
                    {/* Flag */}
                    <span className="flex-shrink-0">
                      {FlagIcons[locale]}
                    </span>

                    {/* Info */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className={`
                        text-sm font-medium truncate
                        ${isActive ? 'text-blue-700' : 'text-slate-900'}
                      `}>
                        {config.nativeName}
                      </span>
                      <span className="text-xs text-slate-400">
                        {config.name}
                      </span>
                    </div>

                    {/* Country Code Badge */}
                    <span className={`
                      px-2 py-0.5 rounded-md text-xs font-bold
                      ${isActive
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                      }
                    `}>
                      {CountryCodes[locale]}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
