import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import ArticleMeta from '@/components/ArticleMeta';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateArticleSchema, generateFAQSchema, generateVideoObjectSchema } from '@/lib/schema-generator';
import { blogPosts, blogSlugs } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data/types';
import { getLocalizedArticle } from '@/lib/localized-content';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

const articleUi: Record<string, Record<string, string>> = {
  en: {
    quoteTitle: 'Request a Wholesale Quote from HousePlus',
    quoteDescription: 'Contact our team to discuss product requirements, OEM/ODM capabilities, applicable documentation and quotation terms.',
    contactHousePlus: 'Contact HousePlus',
    faqHeading: 'Frequently Asked Questions',
    shareHeading: 'Share This Article',
    relatedHeading: 'Related Articles',
    customQuoteTitle: 'Need a Custom Quote?',
    customQuoteDescription: 'Discuss factory-direct sourcing for solar systems, home appliances and 3C electronics, including OEM/ODM requirements.',
    contactUs: 'Contact Us',
    backToNews: 'Back to all News & Insights',
  },
  es: {
    quoteTitle: 'Solicite una cotización mayorista a HousePlus',
    quoteDescription: 'Contacte a nuestro equipo para analizar requisitos de producto, capacidades OEM/ODM, documentación aplicable y condiciones de cotización.',
    contactHousePlus: 'Contactar a HousePlus',
    faqHeading: 'Preguntas frecuentes',
    shareHeading: 'Compartir este artículo',
    relatedHeading: 'Artículos relacionados',
    customQuoteTitle: '¿Necesita una cotización personalizada?',
    customQuoteDescription: 'Analice el abastecimiento directo de fábrica de sistemas solares, electrodomésticos y electrónica 3C, incluidos los requisitos OEM/ODM.',
    contactUs: 'Contáctenos',
    backToNews: 'Volver a Noticias e información',
  },
  de: {
    quoteTitle: 'Fordern Sie ein Großhandelsangebot von HousePlus an',
    quoteDescription: 'Kontaktieren Sie unser Team, um Produktanforderungen, OEM/ODM-Möglichkeiten, relevante Dokumentation und Angebotsbedingungen zu besprechen.',
    contactHousePlus: 'HousePlus kontaktieren',
    faqHeading: 'Häufig gestellte Fragen',
    shareHeading: 'Diesen Artikel teilen',
    relatedHeading: 'Ähnliche Artikel',
    customQuoteTitle: 'Benötigen Sie ein individuelles Angebot?',
    customQuoteDescription: 'Besprechen Sie die direkte Fabrikbeschaffung von Solarsystemen, Haushaltsgeräten und 3C-Elektronik einschließlich OEM/ODM-Anforderungen.',
    contactUs: 'Kontaktieren Sie uns',
    backToNews: 'Zurück zu allen News & Insights',
  },
  fr: {
    quoteTitle: 'Demandez un devis de gros à HousePlus',
    quoteDescription: 'Contactez notre équipe pour discuter des exigences produit, des capacités OEM/ODM, de la documentation applicable et des conditions du devis.',
    contactHousePlus: 'Contacter HousePlus',
    faqHeading: 'Questions fréquentes',
    shareHeading: 'Partager cet article',
    relatedHeading: 'Articles connexes',
    customQuoteTitle: 'Besoin d’un devis personnalisé ?',
    customQuoteDescription: 'Discutez de l’approvisionnement direct usine en systèmes solaires, appareils électroménagers et électronique 3C, y compris les exigences OEM/ODM.',
    contactUs: 'Nous contacter',
    backToNews: 'Retour à toutes les actualités et analyses',
  },
  ar: {
    quoteTitle: 'اطلب عرض أسعار بالجملة من HousePlus',
    quoteDescription: 'تواصل مع فريقنا لمناقشة متطلبات المنتج وقدرات OEM/ODM والوثائق المطلوبة وشروط عرض الأسعار.',
    contactHousePlus: 'تواصل مع HousePlus',
    faqHeading: 'الأسئلة الشائعة',
    shareHeading: 'شارك هذه المقالة',
    relatedHeading: 'مقالات ذات صلة',
    customQuoteTitle: 'هل تحتاج إلى عرض أسعار مخصص؟',
    customQuoteDescription: 'ناقش التوريد المباشر من المصنع لأنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C، بما في ذلك متطلبات OEM/ODM.',
    contactUs: 'اتصل بنا',
    backToNews: 'العودة إلى جميع الأخبار والرؤى',
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.flatMap((lang) =>
    blogSlugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const { lang, slug } = params;
  const basePost = blogPosts[slug];
  if (!basePost) return {};
  const post = getLocalizedArticle(slug, lang, basePost);

  const shouldIndexLocale = validLangs.includes(lang);
  const canonicalUrl = `https://www.houseplus-ch.com/${lang}/news/${slug}`;

  return generateSEOMetadata({
    title: post.title,
    description: post.description,
    keywords: post.keywords.split(', ').map((k) => k.trim()),
    image: post.heroImage,
    url: `/${lang}/news/${slug}`,
    lang: lang as any,
    type: 'article',
    author: post.author,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    indexable: shouldIndexLocale,
    canonicalOverride: canonicalUrl,
    includeLanguageAlternates: true,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const { lang, slug } = params;
  const basePost: BlogPost | undefined = blogPosts[slug];

  if (!basePost) {
    notFound();
  }

  const post = getLocalizedArticle(slug, lang, basePost);
  const ui = articleUi[lang] || articleUi.en;
  const articleUrl = `https://www.houseplus-ch.com/${lang}/news/${slug}/`;

  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description,
    image: post.heroImage,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    authorName: post.author,
    url: articleUrl,
  });

  const faqSchema =
    post.faqs && post.faqs.length > 0 ? generateFAQSchema(post.faqs) : null;
  const videoSchema = post.video
    ? generateVideoObjectSchema({
        name: post.video.name,
        description: post.video.description,
        contentUrl: post.video.contentUrl,
        thumbnailUrl: post.video.poster,
        duration: post.video.duration,
        width: post.video.width,
        height: post.video.height,
        uploadDate: post.video.uploadDate,
        embedUrl: articleUrl,
        inLanguage: lang,
        captionUrl: post.video.captionsUrl,
        transcript: post.video.transcript,
      })
    : null;

  const schemas: Record<string, any>[] = [
    articleSchema,
    ...(videoSchema ? [videoSchema] : []),
  ];
  if (faqSchema) {
    schemas.push(faqSchema);
  }

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + articleUrl)}`,
  };

  return (
    <main className="min-h-screen bg-white">
      <SchemaRenderer schemas={schemas} />

      {/* Article introduction */}
      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 pb-20 pt-20 text-white md:pb-28 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <Breadcrumb lang={lang} slug={`news/${slug}`} customLabel={post.title} />
          <span className="mb-6 inline-block rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-200">
            {post.category}
          </span>
          <h1 className="mb-5 text-3xl font-black leading-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mx-auto mb-7 max-w-3xl text-lg text-slate-200 md:text-xl">
            {post.description}
          </p>
          <div className="mx-auto max-w-3xl px-4">
            <ArticleMeta
              lang={lang}
              authorName={post.author}
              datePublished={post.datePublished}
              dateModified={post.dateModified}
            />
          </div>
        </div>
      </header>

      {/* Standalone feature image: preserves the visual subject without compromising text contrast. */}
      <figure className="relative z-10 mx-auto -mt-10 max-w-6xl overflow-hidden rounded-[2rem] border-4 border-white bg-slate-100 shadow-[0_22px_55px_rgba(15,23,42,0.24)] md:-mt-14 md:rounded-[2.5rem]">
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          title={post.heroImageAlt}
          className={`w-full ${post.heroImageFocus === 'landscape' ? 'aspect-video bg-[#a9cce0] object-contain' : post.heroImageFocus === 'upper' ? 'aspect-[5/3] object-cover object-[50%_5%]' : 'aspect-[16/10] object-cover object-center md:aspect-[16/9]'}`}
          decoding="async"
        />
      </figure>

      {post.video && (
        <figure className="mx-auto mt-10 max-w-3xl px-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-xl">
            <video
              className="mx-auto max-h-[720px] w-full object-contain"
              controls
              preload="metadata"
              poster={post.video.poster}
              width={post.video.width}
              height={post.video.height}
              title={post.video.name}
              aria-label={post.video.description}
              playsInline
            >
              <source src={post.video.contentUrl} type="video/mp4" />
              {post.video.captionsUrl && (
                <track
                  kind="descriptions"
                  src={post.video.captionsUrl}
                  srcLang="en"
                  label="English visual descriptions"
                  default
                />
              )}
              Your browser does not support the HTML video element.
            </video>
          </div>
          <figcaption className="mt-3 text-center text-sm leading-6 text-slate-600">
            {post.video.description} The displayed specifications are for product reference and should be confirmed for the selected model and destination.
          </figcaption>
        </figure>
      )}

      {/* Article Body + Sidebar */}
      <div className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Article */}
        <article className="lg:col-span-2 prose prose-lg prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-li:text-slate-700 prose-strong:text-slate-900 max-w-none">
          {post.sections.map((section, index) => (
            <div key={index}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          ))}

          {/* Inline CTA */}
          <div className="not-prose my-10">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-blue-800 mb-3">
                {ui.quoteTitle}
              </h3>
              <p className="text-blue-700 mb-6">
                {ui.quoteDescription}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {ui.contactHousePlus}
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="not-prose mt-12">
              <h2 className="text-3xl font-black text-slate-900 mb-8">
                {ui.faqHeading}
              </h2>
              <div className="space-y-4">
                {post.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-slate-50 rounded-lg border border-slate-200 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-slate-900 list-none [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <svg
                        className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-4"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-8 space-y-6">
            {/* Share Buttons */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">
                {ui.shareHeading}
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white text-sm font-semibold rounded-lg hover:bg-[#0a5ab0] transition"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white text-sm font-semibold rounded-lg hover:bg-[#1a91da] transition"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#20bd5a] transition"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Related Articles */}
            {post.relatedArticles && post.relatedArticles.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">
                  {ui.relatedHeading}
                </h3>
                <ul className="space-y-5">
                  {post.relatedArticles.map((article, index) => (
                    <li key={index}>
                      <Link
                        href={`/${lang}/news/${article.slug}`}
                        className="group block"
                      >
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                          {article.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <p className="text-xs text-blue-600 mt-2 font-semibold">
                          {article.date} &middot; {article.readingTime}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sidebar CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-sm">
              <h3 className="text-lg font-bold mb-2">{ui.customQuoteTitle}</h3>
              <p className="text-sm text-blue-100 mb-4">
                {ui.customQuoteDescription}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-block w-full text-center px-6 py-2.5 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                {ui.contactUs}
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Back to News */}
      <div className="text-center py-12 bg-slate-50 border-t border-slate-100">
        <Link
          href={`/${lang}/news`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          &larr; {ui.backToNews}
        </Link>
      </div>
    </main>
  );
}
