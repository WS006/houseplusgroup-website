import { Metadata } from 'next';
import NotFoundContent from '@/components/NotFoundContent';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

const notFoundTitles: Record<string, string> = {
  en: 'Page Not Found | HousePlus',
  es: 'Página no encontrada | HousePlus',
  de: 'Seite nicht gefunden | HousePlus',
  fr: 'Page introuvable | HousePlus',
  ar: 'الصفحة غير موجودة | هاوس بلس',
};

export function generateMetadata({ params }: { params?: { lang?: string } }): Metadata {
  const lang = params?.lang && validLangs.includes(params.lang) ? params.lang : 'en';
  return {
    title: notFoundTitles[lang] || notFoundTitles.en,
    robots: 'noindex, follow',
  };
}

export default async function LangNotFound({ params }: { params?: { lang?: string } }) {
  const lang = params?.lang && validLangs.includes(params.lang) ? params.lang : 'en';
  return <NotFoundContent lang={lang} />;
}
