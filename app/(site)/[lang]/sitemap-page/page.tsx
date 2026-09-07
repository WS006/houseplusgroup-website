import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getStoryblokApi } from '@storyblok/react/rsc';
import { productSlugs as canonicalProductSlugs, newsSlugs } from '@/lib/urls';
import { PRODUCT_DATA } from '@/lib/product-data';
import { blogPosts } from '@/lib/blog-data';
import { getLocalizedStaticNewsEntry, staticNewsFeedEntries } from '@/lib/static-news-feed';
import { getLocalizedArticle, getLocalizedProduct } from '@/lib/localized-content';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

interface SitemapPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(props: SitemapPageProps): Promise<Metadata> {
  const params = await props.params;
  const { lang } = params;
  const titles: Record<string, string> = {
    en: 'Sitemap - HousePlus Group',
    es: 'Mapa del Sitio - HousePlus Group',
    de: 'Sitemap - HousePlus Group',
    fr: 'Plan du Site - HousePlus Group',
    ar: 'خريطة الموقع - HousePlus Group',
  };
  const descriptions: Record<string, string> = {
    en: 'Complete overview of all pages on HousePlus Group website.',
    es: 'Vista completa de todas las páginas del sitio web de HousePlus Group.',
    de: 'Vollständige Übersicht aller Seiten der HousePlus Group Website.',
    fr: 'Vue d\'ensemble complète de toutes les pages du site HousePlus Group.',
    ar: 'نظرة عامة كاملة على جميع صفحات موقع HousePlus Group.',
  };

  const BASE_URL = 'https://www.houseplus-ch.com';
  const LOCALES = ['en', 'es', 'de', 'fr', 'ar'];
  const langAlternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    langAlternates[locale] = `${BASE_URL}/${locale}/sitemap-page`;
  }
  langAlternates['x-default'] = `${BASE_URL}/en/sitemap-page`;

  return {
    title: titles[lang] ?? titles.en,
    description: descriptions[lang] ?? descriptions.en,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${lang}/sitemap-page`,
      languages: langAlternates,
    },
  };
}

// ── i18n labels ────────────────────────────────────────────────────────────
const labels: Record<string, {
  heading: string;
  intro: string;
  sections: {
    main: string;
    company: string;
    products: string;
    news: string;
    support: string;
    legal: string;
  };
}> = {
  en: {
    heading: 'Sitemap',
    intro: 'A complete list of all pages on the HousePlus Group website.',
    sections: {
      main: 'Main Pages',
      company: 'Company',
      products: 'Products',
      news: 'News & Insights',
      support: 'Support & Resources',
      legal: 'Legal',
    },
  },
  es: {
    heading: 'Mapa del Sitio',
    intro: 'Lista completa de todas las páginas del sitio web de HousePlus Group.',
    sections: {
      main: 'Páginas Principales',
      company: 'Empresa',
      products: 'Productos',
      news: 'Noticias e Ideas',
      support: 'Soporte y Recursos',
      legal: 'Legal',
    },
  },
  de: {
    heading: 'Sitemap',
    intro: 'Eine vollständige Liste aller Seiten der HousePlus Group Website.',
    sections: {
      main: 'Hauptseiten',
      company: 'Unternehmen',
      products: 'Produkte',
      news: 'News & Einblicke',
      support: 'Support & Ressourcen',
      legal: 'Rechtliches',
    },
  },
  fr: {
    heading: 'Plan du Site',
    intro: 'Liste complète de toutes les pages du site HousePlus Group.',
    sections: {
      main: 'Pages Principales',
      company: 'Entreprise',
      products: 'Produits',
      news: 'Actualités et Analyses',
      support: 'Support et Ressources',
      legal: 'Mentions Légales',
    },
  },
  ar: {
    heading: 'خريطة الموقع',
    intro: 'قائمة كاملة بجميع صفحات موقع HousePlus Group.',
    sections: {
      main: 'الصفحات الرئيسية',
      company: 'الشركة',
      products: 'المنتجات',
      news: 'الأخبار والرؤى',
      support: 'الدعم والموارد',
      legal: 'القانونية',
    },
  },
};

const mainPages = [
  { en: 'Home', es: 'Inicio', de: 'Startseite', fr: 'Accueil', ar: 'الرئيسية' },
  { en: 'About Us', es: 'Sobre Nosotros', de: 'Über Uns', fr: 'À Propos', ar: 'من نحن' },
  { en: 'Products', es: 'Productos', de: 'Produkte', fr: 'Produits', ar: 'المنتجات' },
  { en: 'Certifications', es: 'Certificaciones', de: 'Zertifizierungen', fr: 'Certifications', ar: 'الشهادات' },
  { en: 'OEM/ODM', es: 'OEM/ODM', de: 'OEM/ODM', fr: 'OEM/ODM', ar: 'OEM/ODM' },
  { en: 'Case Studies', es: 'Casos de Éxito', de: 'Fallstudien', fr: 'Études de Cas', ar: 'دراسات الحالة' },
  { en: 'News', es: 'Noticias', de: 'News', fr: 'Actualités', ar: 'الأخبار' },
  { en: 'Factory', es: 'Fábrica', de: 'Fabrik', fr: 'Usine', ar: 'المصنع' },
  { en: 'Service', es: 'Servicio', de: 'Service', fr: 'Service', ar: 'الخدمة' },
  { en: 'FAQ', es: 'Preguntas Frecuentes', de: 'Häufige Fragen', fr: 'FAQ', ar: 'الأسئلة الشائعة' },
  { en: 'Contact Us', es: 'Contacto', de: 'Kontakt', fr: 'Contact', ar: 'اتصل بنا' },
  { en: 'Team', es: 'Equipo', de: 'Team', fr: 'Équipe', ar: 'فريقنا' },
  { en: 'Careers', es: 'Empleo', de: 'Karriere', fr: 'Carrières', ar: 'وظائف' },
  { en: 'Support', es: 'Soporte', de: 'Support', fr: 'Support', ar: 'الدعم' },
];

const mainSlugs = [
  '', 'about-us', 'products', 'certifications', 'oem-odm', 'case-studies',
  'news', 'factory', 'service', 'faq', 'contact', 'team', 'careers', 'support',
];

const legalPages = [
  { en: 'Privacy Policy', es: 'Política de Privacidad', de: 'Datenschutz', fr: 'Politique de Confidentialité', ar: 'سياسة الخصوصية' },
  { en: 'Terms & Conditions', es: 'Términos y Condiciones', de: 'AGB', fr: 'Conditions Générales', ar: 'الشروط والأحكام' },
];

const legalSlugs = ['privacy', 'terms'];

function getLabel(labelMap: Record<string, string>, lang: string): string {
  return labelMap[lang] ?? labelMap['en'] ?? '';
}

function SitemapSection({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
        <span className="text-xl">{icon}</span>
        {title}
      </h2>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default async function SitemapPage(props: SitemapPageProps) {
  const params = await props.params;
  const { lang } = params;
  const t = labels[lang] ?? labels.en;
  const isRTL = lang === 'ar';
  const products = canonicalProductSlugs.map((slug) => ({
    slug,
    name: getLocalizedProduct(slug, lang, PRODUCT_DATA[slug]).name,
  }));
  const staticNewsBySlug = new Map(staticNewsFeedEntries.map((entry) => [entry.slug, entry]));
  const news = newsSlugs.map((slug) => {
    const dynamicArticle = blogPosts[slug];
    if (dynamicArticle) {
      return { slug, title: getLocalizedArticle(slug, lang, dynamicArticle).title };
    }
    const staticArticle = staticNewsBySlug.get(slug);
    return { slug, title: staticArticle ? getLocalizedStaticNewsEntry(staticArticle, lang).title : slug.replace(/-/g, ' ') };
  });

  return (
    <div className={`min-h-screen bg-slate-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-10.498l4.875 2.437a2.25 2.25 0 0 1 0 4.126l-4.875 2.437a2.25 2.25 0 0 1-3.006-2.063V9.31a2.25 2.25 0 0 1 3.006-2.063Z" />
            </svg>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
              HousePlus Group
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            {t.heading}
          </h1>
          <p className="text-slate-500 text-base max-w-xl">{t.intro}</p>

          {/* XML Sitemap reference */}
          <p className="mt-4 text-xs text-slate-400">
            XML Sitemap:{' '}
            <a
              href="https://www.houseplus-ch.com/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              houseplus-ch.com/sitemap.xml
            </a>
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Pages */}
          <SitemapSection title={t.sections.main} icon="🏠">
            {mainPages.map((label, i) => (
              <li key={mainSlugs[i]}>
                <Link
                  href={`/${lang}${mainSlugs[i] ? `/${mainSlugs[i]}` : ''}`}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {getLabel(label, lang)}
                </Link>
              </li>
            ))}
          </SitemapSection>

          {/* Products */}
          <SitemapSection title={t.sections.products} icon="⚡">
            <li>
              <Link href={`/${lang}/products`} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {lang === 'es' ? 'Todos los Productos' : lang === 'de' ? 'Alle Produkte' : lang === 'fr' ? 'Tous les Produits' : lang === 'ar' ? 'جميع المنتجات' : 'All Products'}
              </Link>
            </li>
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/${lang}/products/${product.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors"
                >
                  <svg className="w-3 h-3 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {product.name}
                </Link>
              </li>
            ))}
          </SitemapSection>

          {/* News */}
          <SitemapSection title={t.sections.news} icon="📰">
            <li>
              <Link href={`/${lang}/news`} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {lang === 'es' ? 'Todas las Noticias' : lang === 'de' ? 'Alle News' : lang === 'fr' ? 'Toutes les Actualités' : lang === 'ar' ? 'كل الأخبار' : 'All News'}
              </Link>
            </li>
            {news.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/${lang}/news/${article.slug}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors"
                >
                  <svg className="w-3 h-3 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {article.title}
                </Link>
              </li>
            ))}
          </SitemapSection>

          {/* Support */}
          <SitemapSection title={t.sections.support} icon="🛠️">
            {[
              { label: { en: 'Service', es: 'Servicio', de: 'Service', fr: 'Service', ar: 'الخدمة' }, slug: 'service' },
              { label: { en: 'FAQ', es: 'Preguntas Frecuentes', de: 'Häufige Fragen', fr: 'FAQ', ar: 'الأسئلة الشائعة' }, slug: 'faq' },
              { label: { en: 'Support', es: 'Soporte', de: 'Support', fr: 'Support', ar: 'الدعم' }, slug: 'support' },
            ].map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${lang}/${item.slug}`}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {getLabel(item.label, lang)}
                </Link>
              </li>
            ))}
          </SitemapSection>

          {/* Legal */}
          <SitemapSection title={t.sections.legal} icon="📋">
            {legalPages.map((label, i) => (
              <li key={legalSlugs[i]}>
                <Link
                  href={`/${lang}/${legalSlugs[i]}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 hover:underline transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  {getLabel(label, lang)}
                </Link>
              </li>
            ))}
          </SitemapSection>
        </div>
      </div>
    </div>
  );
}
