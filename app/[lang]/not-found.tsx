import NotFoundContent from '@/components/NotFoundContent';

export default async function LangNotFound({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <NotFoundContent lang={lang} />;
}
