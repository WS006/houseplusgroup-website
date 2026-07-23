import NotFoundContent from '@/components/NotFoundContent';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export default async function LangNotFound({ params }: { params?: { lang?: string } }) {
  const lang = params?.lang && validLangs.includes(params.lang) ? params.lang : 'en';
  return <NotFoundContent lang={lang} />;
}
