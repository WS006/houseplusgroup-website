import { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCT_DATA, CATEGORY_CONFIG, ProductData } from '@/lib/product-data';
import Breadcrumb from '@/components/Breadcrumb';
import SEOHead from '@/components/SEOHead';
import { generateProductSchema, generateFAQSchema } from '@/lib/schema-generator';
import { r2ImageDimensions } from '@/lib/r2-media-details';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-static';
export const dynamicParams = false;

const BASE_URL = 'https://www.houseplus-ch.com';

export function generateStaticParams() {
  return validLangs.flatMap((lang) =>
    Object.keys(PRODUCT_DATA).map((slug) => ({ lang, slug }))
  );
}

// Helpers: varied alt/title based on product name length (deterministic, avoids hydration mismatch)
function getDetailAlt(product: ProductData, model: string) {
  const catMap: Record<string, string> = { solar: 'Solar Energy', appliances: 'Home Appliance', electronics: '3C Electronic' };
  const cat = catMap[product.category] || 'Wholesale';
  const v = product.name.length % 3;
  if (v === 0) return `${product.name} (${model}) — HousePlus ${cat} Wholesale`;
  if (v === 1) return `HousePlus ${cat} Supplier — ${product.name} (${model})`;
  return `${product.name} (${model}) — CE/RoHS Certified HousePlus ${cat}`;
}
function getDetailTitle(product: ProductData, model: string) {
  const catMap: Record<string, string> = { solar: 'Solar Energy', appliances: 'Home Appliances', electronics: '3C Electronics' };
  const cat = catMap[product.category] || 'Wholesale';
  const v = product.name.length % 3;
  if (v === 0) return `${product.name} | HousePlus OEM/ODM ${cat}`;
  if (v === 1) return `HousePlus ${product.name} | Professional ${cat} Manufacturer`;
  return `${product.name} (${model}) | HousePlus ${cat} Export`;
}
const LOCALES = ['en', 'es', 'de', 'fr', 'ar'];

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const { lang, slug } = params;
  const product = PRODUCT_DATA[slug];
  const name = product?.name || slug;

  const langAlternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    langAlternates[locale] = `${BASE_URL}/${locale}/products/${slug}`;
  }
  langAlternates['x-default'] = `${BASE_URL}/en/products/${slug}`;

  const titleTemplates: Record<string, string> = {
    en: `${name} | HousePlus Wholesale — Professional Manufacturer`,
    es: `${name} | HousePlus al por Mayor — Fabricante Profesional`,
    de: `${name} | HousePlus Großhandel — Professioneller Hersteller`,
    fr: `${name} | HousePlus Gros — Fabricant Professionnel`,
    ar: `${name} | هاوس بلس بالجملة — مصنع احترافي`,
  };

  const descTemplates: Record<string, string> = {
    en: `Request a wholesale quotation for ${name} from HousePlus. CE/RoHS certified and OEM/ODM available; MOQ is confirmed in your quotation. Trusted manufacturer for global B2B buyers.`,
    es: `Solicite una cotización mayorista para ${name} con HousePlus. Certificación CE/RoHS y OEM/ODM disponibles; el MOQ se confirma en su cotización.`,
    de: `Fordern Sie ein Großhandelsangebot für ${name} bei HousePlus an. CE/RoHS-zertifiziert und OEM/ODM verfügbar; die Mindestbestellmenge wird im Angebot bestätigt.`,
    fr: `Demandez un devis de gros pour ${name} auprès de HousePlus. Certification CE/RoHS et OEM/ODM disponibles ; le MOQ est confirmé dans votre devis.`,
    ar: `اطلب عرض سعر بالجملة لـ ${name} من هاوس بلس. تتوفر شهادة CE/RoHS وخدمات OEM/ODM، ويتم تأكيد الحد الأدنى للطلب ضمن عرض السعر.`,
  };

  const title = titleTemplates[lang] || titleTemplates['en'];
  const description = descTemplates[lang] || descTemplates['en'];
  const englishCanonical = `${BASE_URL}/en/products/${slug}`;
  const shouldIndexLocale = lang === 'en';
  const canonicalUrl = shouldIndexLocale ? `${BASE_URL}/${lang}/products/${slug}` : englishCanonical;
  const imageDimensions = r2ImageDimensions(product?.coverImage, { width: 900, height: 675 });

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...(shouldIndexLocale ? { languages: langAlternates } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'HousePlus',
      images: product?.coverImage ? [{
        url: product.coverImage,
        width: imageDimensions.width,
        height: imageDimensions.height,
        alt: product.imageAlt || name,
        type: product.coverImage.endsWith('.png/') ? 'image/png' : 'image/jpeg',
      }] : [],
      type: 'website',
    },
    robots: shouldIndexLocale
      ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      : 'noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const { lang, slug } = params;
  const product = PRODUCT_DATA[slug];

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Product Not Found</h1>
          <p className="text-slate-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link
            href={`/${lang}/products`}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
          >
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const catConfig = CATEGORY_CONFIG[product.category];
  const productUrl = `${BASE_URL}/${lang}/products/${slug}`;
  const modelSpec = product.specs.find((s) => s.key === 'Model');
  const sku = modelSpec?.value || slug.toUpperCase();
  const imageDimensions = r2ImageDimensions(product.coverImage, { width: 900, height: 675 });
  const productImageAlt = product.imageAlt || getDetailAlt(product, modelSpec?.value || slug.toUpperCase());
  const productImageTitle = product.imageTitle || getDetailTitle(product, modelSpec?.value || slug.toUpperCase());

  // Generate structured data schemas
  const productSchema = generateProductSchema({
    name: product.name,
    description: product.geoDescription || product.description,
    image: product.coverImage,
    sku,
    url: productUrl,
    availability: 'InStock',
    category: product.category === 'solar'
      ? 'Solar Energy Systems'
      : product.category === 'appliances'
      ? 'Home Appliances'
      : '3C Electronics',
    imageCaption: productImageTitle,
    imageDescription: product.geoDescription || productImageAlt,
    imageWidth: imageDimensions.width,
    imageHeight: imageDimensions.height,
    b2bInfo: product.b2bInfo,
  });

  const faqSchema = product.faq && product.faq.length > 0
    ? generateFAQSchema(product.faq)
    : null;

  return (
    <main className="min-h-screen bg-white">
      <SEOHead schemas={[productSchema, ...(faqSchema ? [faqSchema] : [])]} />
      <Breadcrumb lang={lang} slug={`products/${slug}`} customLabel={product.name} />

      {/* Product Hero */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
              <img
                src={product.coverImage}
                alt={productImageAlt}
                title={productImageTitle}
                width={imageDimensions.width}
                height={imageDimensions.height}
                className="absolute inset-0 w-full h-full object-cover"
               decoding="async" />
              {/* Hidden SEO-rich context for search engines */}
              <span className="sr-only" data-seo-alt={product.imageAlt || ''} data-seo-title={product.imageTitle || ''}>
                {product.imageAlt || ''}
              </span>
            </div>
            {/* Certifications */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['✓ CE Certified', '✓ RoHS Compliant', '✓ ISO 9001', '✓ OEM/ODM Available'].map((cert) => (
                <span key={cert} className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold rounded-full">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* HousePlus Brand Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">
                🏭 HousePlus Professional
              </span>
              {product.badge && (
                <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest rounded-full">
                  ⭐ {product.badge}
                </span>
              )}
            </div>

            {/* Category Badge */}
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-bold ${catConfig.bg} ${catConfig.color}`}>
              {catConfig.icon} {catConfig.label}
            </span>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-slate-600 leading-relaxed text-base">
              {product.description}
            </p>

            {/* GEO Description */}
            {product.geoDescription && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-amber-700">GEO Fact:</span>{' '}
                  {product.geoDescription}
                </p>
              </div>
            )}

            {/* Specifications Table */}
            {product.specs.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  HousePlus Technical Specifications
                </h2>
                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr
                          key={i}
                          className={`${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'} border-b border-slate-100 last:border-0`}
                        >
                          <td className="px-5 py-3.5 font-semibold text-slate-600 w-2/5">
                            {spec.key}
                          </td>
                          <td className="px-5 py-3.5 text-slate-900 font-medium">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Key Features */}
            {product.features.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  Key Features
                </h2>
                <ul className="space-y-2.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Applications */}
            {product.applications && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  HousePlus Applications
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">{product.applications}</p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/contact`}
                className="flex-1 text-center px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5"
              >
                Request a Quote
              </Link>
              <Link
                href={`/${lang}/products`}
                className="flex-1 text-center px-6 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5"
              >
                ← Back to Products
              </Link>
            </div>

            {/* Wholesale Info */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: 'Min. Order', value: product.b2bInfo?.moq || 'Confirm by quote' },
                { label: 'Lead Time', value: product.b2bInfo?.leadTime || 'Confirm by quote' },
                { label: 'Warranty', value: product.b2bInfo?.warranty || 'Confirm by quote' },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            {product.faq && product.faq.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {product.faq.map((faqItem, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="font-semibold text-slate-900 text-sm mb-1">Q: {faqItem.question}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">A: {faqItem.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HousePlus CTA */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-slate-700 mb-3">
                <strong>🏭 HousePlus OEM/ODM Services:</strong> Custom branding, private-label packaging, and product modifications available from MOQ 100 units.
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-block text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Contact HousePlus Sales Team →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
