'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { translations } from '@/lib/translations';

interface BreadcrumbProps {
  lang: string;
  customLabel?: string;
}

export default function Breadcrumb({ lang, customLabel }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Extract segments from pathname
  const segments = pathname
    .split('/')
    .filter(segment => segment && segment !== lang);

  // Map page slugs to labels
  const pageLabels: Record<string, string> = {
    'about-us': translations[lang as keyof typeof translations]?.about?.title || 'About Us',
    'products': translations[lang as keyof typeof translations]?.nav?.products || 'Products',
    'factory': translations[lang as keyof typeof translations]?.factory?.title || 'Factory',
    'team': translations[lang as keyof typeof translations]?.team?.title || 'Team',
    'service': translations[lang as keyof typeof translations]?.service?.title || 'Service',
    'careers': translations[lang as keyof typeof translations]?.nav?.careers || 'Careers',
    'faq': translations[lang as keyof typeof translations]?.faq?.title || 'FAQ',
    'news': translations[lang as keyof typeof translations]?.nav?.news || 'News',
    'contact': translations[lang as keyof typeof translations]?.nav?.contact || 'Contact',
    'support': translations[lang as keyof typeof translations]?.nav?.support || 'Support',
    'privacy': translations[lang as keyof typeof translations]?.nav?.privacy || 'Privacy',
  };

  const homeLabel = translations[lang as keyof typeof translations]?.nav?.home || 'Home';

  // Build breadcrumb items
  const items = [
    { label: homeLabel, href: `/${lang}` },
  ];

  segments.forEach((segment, index) => {
    const href = `/${lang}/${segments.slice(0, index + 1).join('/')}`;
    const label = pageLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    items.push({ label, href });
  });

  // If custom label provided, replace last item
  if (customLabel && items.length > 1) {
    items[items.length - 1].label = customLabel;
  }

  // Generate JSON-LD structured data
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': `https://www.houseplus-ch.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <nav className="bg-gray-50 px-4 py-3 rounded-lg mb-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {index === items.length - 1 ? (
                <span className="text-gray-700 font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
