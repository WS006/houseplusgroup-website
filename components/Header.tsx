import { getStoryblokApi } from '@storyblok/react';
import Link from 'next/link';

interface NavItem {
  _uid: string;
  component: string;
  label: string;
  link: {
    id: string;
    url: string;
    linktype: string;
    fieldtype: string;
    cached_url: string;
  };
  [key: string]: any;
}

interface Config {
  header_menu: NavItem[];
  [key: string]: any;
}

export default async function Header({ lang }: { lang: string }) {
  const storyblokApi = getStoryblokApi();
  let config: Config | null = null;

  try {
    const { data } = await storyblokApi.getStory('config', { 
      version: 'published', 
      language: lang,
      resolve_links: 'url'
    });
    const content = data.story.content;
    config = content && 'header_menu' in content ? (content as Config) : null;
  } catch (error) {
    console.error(`Error fetching config for ${lang}:`, error);
  }

  if (!config || !config.header_menu) {
    return (
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4">
        <Link href={`/${lang}`} className="font-bold text-xl text-blue-600">HousePlus</Link>
      </header>
    );
  }

  const getLocalizedLabel = (item: NavItem, lang: string): string => {
    const langKey = `label__i18n__${lang}`;
    return item[langKey] || item.label || 'Menu';
  };

  const isRTL = lang === 'ar';

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="font-bold text-xl text-blue-600">
              HousePlus
            </Link>
          </div>
          <div className="hidden md:block">
            <div className={`flex gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {config.header_menu.map((item: NavItem) => {
                const label = getLocalizedLabel(item, lang);
                let href = item.link?.cached_url || item.link?.url || '';
                
                // Ensure internal links are prefixed with language
                if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
                  // Remove leading slash if present to avoid double slashes
                  const cleanHref = href.startsWith('/') ? href.slice(1) : href;
                  href = `/${lang}/${cleanHref}`;
                  // Clean up trailing slash for home
                  if (href.endsWith('/')) href = href.slice(0, -1);
                  if (href === `/${lang}`) href = `/${lang}`;
                }

                return (
                  <Link
                    key={item._uid}
                    href={href || `/${lang}`}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Mobile menu button could be added here */}
        </div>
      </nav>
    </header>
  );
}
