import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_DATA } from '@/lib/product-data';
import { getLocalizedProduct } from '@/lib/localized-content';

interface RelatedProductsProps {
  lang: string;
  slugs: string[];
}

const headings: Record<string, string> = {
  en: 'Related HousePlus Products',
  es: 'Productos Relacionados de HousePlus',
  de: 'Verwandte HousePlus-Produkte',
  fr: 'Produits Associés HousePlus',
  ar: 'منتجات HousePlus ذات الصلة',
};

const intros: Record<string, string> = {
  en: 'Explore our wholesale-ready solutions mentioned in this article:',
  es: 'Explore nuestras soluciones listas para venta al por mayor mencionadas en este artículo:',
  de: 'Entdecken Sie unsere für den Großhandel bereiten Lösungen, die in diesem Artikel erwähnt werden:',
  fr: 'Explorez nos solutions prêtes pour la vente en gros mentionnées dans cet article :',
  ar: 'استكشف حلولنا الجاهزة للبيع بالجملة المذكورة في هذه المقالة:',
};

const viewAll: Record<string, string> = {
  en: 'View Full Product Catalogue →',
  es: 'Ver Catálogo Completo de Productos →',
  de: 'Vollständiges Produktverzeichnis ansehen →',
  fr: 'Voir le Catalogue Complet des Produits →',
  ar: 'عرض كتالوج المنتجات الكامل ←',
};

const viewDetails: Record<string, string> = {
  en: 'View Details →',
  es: 'Ver detalles →',
  de: 'Details ansehen →',
  fr: 'Voir les détails →',
  ar: 'عرض التفاصيل ←',
};

/**
 * RelatedProducts renders a SEO-friendly internal link block at the end of
 * blog articles. Each entry is a natural anchor-text link pointing to a
 * specific product detail page, helping crawlers reach deep product pages
 * and transferring topical relevance from the article to the product.
 */
export default function RelatedProducts({ lang, slugs }: RelatedProductsProps) {
  const validSlugs = slugs.filter((slug) => PRODUCT_DATA[slug]);
  if (validSlugs.length === 0) return null;

  const isRTL = lang === 'ar';

  return (
    <section className="mt-12 p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-100">
      <h3 className="text-2xl font-black mb-3 text-slate-900 tracking-tight">
        {headings[lang] || headings.en}
      </h3>
      <p className="text-slate-600 mb-6 leading-relaxed">
        {intros[lang] || intros.en}
      </p>

      <ul className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${isRTL ? 'rtl' : 'ltr'}`}>
        {validSlugs.map((slug) => {
          const product = getLocalizedProduct(slug, lang, PRODUCT_DATA[slug]);
          return (
            <li key={slug}>
              <Link
                href={`/${lang}/products/${slug}`}
                className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-50">
                  <Image
                    src={product.coverImage}
                    alt={product.imageAlt || product.name} width={1200} height={800}
                    title={product.imageTitle || product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                   decoding="async"  sizes="100vw" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {product.name}
                  </p>
                  <p className="text-xs text-blue-600 font-semibold mt-1">
                    {viewDetails[lang] || viewDetails.en}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <Link
          href={`/${lang}/products`}
          className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          {viewAll[lang] || viewAll.en}
        </Link>
      </div>
    </section>
  );
}
