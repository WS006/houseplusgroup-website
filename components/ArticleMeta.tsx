import Link from 'next/link';
interface ArticleMetaProps {
  lang: string;
  authorName: string;
  authorImage?: string;
  datePublished: string;
  dateModified: string;
  className?: string;
}

const labels: Record<string, { by: string; updated: string; authorPage: string }> = {
  en: { by: 'By', updated: 'Updated', authorPage: 'Author Bio' },
  es: { by: 'Por', updated: 'Actualizado', authorPage: 'Biografía del Autor' },
  de: { by: 'Von', updated: 'Aktualisiert', authorPage: 'Autor:innenprofil' },
  fr: { by: 'Par', updated: 'Mis à jour', authorPage: 'Bio de l\'Auteur' },
  ar: { by: 'بواسطة', updated: 'تم التحديث', authorPage: 'نبذة عن المؤلف' },
};

function formatDate(dateStr: string, lang: string): string {
  try {
    const date = new Date(dateStr);
    const locales: Record<string, string> = {
      en: 'en-US',
      es: 'es-ES',
      de: 'de-DE',
      fr: 'fr-FR',
      ar: 'ar-SA',
    };
    return date.toLocaleDateString(locales[lang] || 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * ArticleMeta renders author name + avatar, publication date, and last-updated date
 * at the top of blog articles. This provides GEO-critical "author entity signals"
 * and "freshness markers" that AI citation engines use to assess source trust.
 */
export default function ArticleMeta({
  lang,
  authorName,
  authorImage,
  datePublished,
  dateModified,
  className = '',
}: ArticleMetaProps) {
  const t = labels[lang] || labels.en;
  const isRTL = lang === 'ar';
  const isModified = datePublished !== dateModified;
  const avatar = authorImage || 'https://houseplus-media-api.jack006hu.workers.dev/media/d52528a6-ba27-4a75-9dea-a7c36c2780e7';

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className} ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-blue-100 flex-shrink-0">
          <img
            src={avatar}
            alt={authorName}
            title={authorName}
            className="w-full h-full object-cover"
            loading="lazy"
           decoding="async" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900">
            {t.by}{' '}
            <Link href={`/${lang}/author/jack-hu`} className="text-blue-600 hover:text-blue-700 transition-colors">
              {authorName}
            </Link>
          </div>
          <div className="text-xs text-slate-500">
            <time dateTime={datePublished}>
              {formatDate(datePublished, lang)}
            </time>
            {isModified && (
              <span className="mx-2 text-slate-300">·</span>
            )}
            {isModified && (
              <time dateTime={dateModified} className="text-emerald-600 font-semibold">
                {t.updated}: {formatDate(dateModified, lang)}
              </time>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
