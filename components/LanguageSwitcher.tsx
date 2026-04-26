'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { locales, localeConfigs } from '../i18n-config';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 获取当前路径（去掉语言前缀）
  const pathWithoutLang = pathname?.split('/').slice(2).join('/') || '';

  const currentConfig = localeConfigs[currentLang as keyof typeof localeConfigs];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
        aria-label="Switch language"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 6.648a.75.75 0 11-1.096-1.027l-2.224 2.224a.75.75 0 000 1.06l2.224 2.224a.75.75 0 001.058-1.06L9.53 11.97l1.498-1.498a.75.75 0 011.058 0z" />
        </svg>
        <span className="hidden sm:inline">{currentConfig?.nativeName || 'English'}</span>
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* 下拉菜单 */}
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-slate-900/5 z-20 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {locales.map((locale) => {
              const config = localeConfigs[locale];
              const isActive = locale === currentLang;
              const href = `/${locale}${pathWithoutLang ? `/${pathWithoutLang}` : ''}`;

              return (
                <Link
                  key={locale}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{config.nativeName}</span>
                  {isActive && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
