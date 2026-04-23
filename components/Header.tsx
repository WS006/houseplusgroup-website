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
    const { data } = await storyblokApi.getStory('config', { version: 'published', language: lang });
    config = data.story.content;
  } catch (error) {
    console.error(`Error fetching config for ${lang}:`, error);
  }

  if (!config || !config.header_menu) {
    return null;
  }

  const getLocalizedLabel = (item: NavItem, lang: string): string => {
    const langKey = `label__i18n__${lang}`;
    return item[langKey] || item.label || 'Menu';
  };

  const isRTL = lang === 'ar';

  return (
    <header className={`bg-white border-b border-gray-200 ${isRTL ? 'rtl' : 'ltr'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1">
            <div className={`flex gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {config.header_menu.map((item: NavItem) => {
                const label = getLocalizedLabel(item, lang);
                const href = item.link?.cached_url || item.link?.url || '#';

                return (
                  <Link
                    key={item._uid}
                    href={href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
