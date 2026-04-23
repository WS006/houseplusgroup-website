'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getAllLocales } from '@/lib/i18n-config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const languages = getAllLocales();
  
  // Extract path without language prefix
  const pathParts = pathname.split('/').filter(Boolean);
  const pathWithoutLang = pathParts.length > 1 ? pathParts.slice(1).join('/') : '';

  return (
    <div className="flex gap-2 p-3 justify-center bg-gray-50 border-b border-gray-200 flex-wrap">
      {languages.map((lang) => {
        const href = pathWithoutLang ? `/${lang.code}/${pathWithoutLang}` : `/${lang.code}`;
        return (
          <Link
            key={lang.code}
            href={href}
            className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title={`Switch to ${lang.nativeName}`}
          >
            {lang.nativeName}
          </Link>
        );
      })}
    </div>
  );
}
