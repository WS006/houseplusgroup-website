import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocalizedFoundationPage from '@/components/LocalizedFoundationPage';
import { FoundationLocale, FoundationPageSlug, foundationPageCopy } from '@/lib/foundation-page-copy';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';

const locales: FoundationLocale[] = ['es', 'de', 'fr', 'ar'];
const slugs = Object.keys(foundationPageCopy) as FoundationPageSlug[];

function pageSlug(parts?: string[]) {
  return parts?.join('/') || '';
}

export function generateStaticParams() {
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug: [slug] })));
}

export async function generateMetadata({ params }: { params: { lang: string; slug?: string[] } }): Promise<Metadata> {
  const slug = pageSlug(params.slug) as FoundationPageSlug;
  const lang = params.lang as FoundationLocale;
  const copy = foundationPageCopy[slug]?.[lang];
  if (!copy) return {};
  const [title, , description] = copy;
  return generateSEOMetadata({
    title,
    description,
    keywords: ['HousePlus', 'B2B', 'solar energy', 'home appliances', '3C electronics', 'OEM', 'ODM'],
    url: `/${lang}/${slug}`,
    lang,
    type: 'website',
  });
}

export default function LocalizedFoundationRoute({ params }: { params: { lang: string; slug?: string[] } }) {
  const slug = pageSlug(params.slug) as FoundationPageSlug;
  const lang = params.lang as FoundationLocale;
  if (!foundationPageCopy[slug]?.[lang]) notFound();
  return <LocalizedFoundationPage slug={slug} lang={lang} />;
}
