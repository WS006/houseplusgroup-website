'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  // Simplified logic for demo, might need adjustment for complex paths
  const pathParts = pathname.split('/');
  const pathWithoutLang = pathParts.slice(2).join('/');

  return (
    <div className="flex gap-4 p-4 justify-center bg-gray-50 border-b">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}/${pathWithoutLang}`}
          className="text-blue-600 hover:underline font-medium"
        >
          {lang.name}
        </Link>
      ))}
    </div>
  );
}
