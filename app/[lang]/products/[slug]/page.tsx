import { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCT_DATA, CATEGORY_CONFIG, ProductData } from '@/lib/product-data';
import Breadcrumb from '@/components/Breadcrumb';
import SEOHead from '@/components/SEOHead';
import { generateProductSchema, generateFAQSchema } from '@/lib/schema-generator';
import { r2ImageDimensions } from '@/lib/r2-media-details';
import { getLocalizedProduct } from '@/lib/localized-content';
import { getOGLocale } from '@/lib/seo-utils';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

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

const schemaActionCopy: Record<string, { name: string; description: string }> = {
  en: { name: 'Request a wholesale quotation', description: 'Contact HousePlus Group to request product documentation and a wholesale quotation.' },
  es: { name: 'Solicitar una cotización mayorista', description: 'Contacte con HousePlus Group para solicitar documentación del producto y una cotización mayorista.' },
  de: { name: 'Großhandelsangebot anfordern', description: 'Kontaktieren Sie die HousePlus Group für Produktdokumentation und ein Großhandelsangebot.' },
  fr: { name: 'Demander un devis de gros', description: 'Contactez HousePlus Group pour demander la documentation produit et un devis de gros.' },
  ar: { name: 'طلب عرض أسعار بالجملة', description: 'تواصل مع HousePlus Group لطلب وثائق المنتج وعرض أسعار بالجملة.' },
};

const productUi: Record<string, Record<string, string>> = {
  en: { notFound: 'Product Not Found', notFoundDescription: "The product you are looking for does not exist.", backProducts: 'Back to Products', documentation: 'Documentation available on request', technicalSpecifications: 'Technical Specifications', keyFeatures: 'Key Features', applications: 'Applications', requestQuote: 'Request a Quote', minOrder: 'Min. Order', leadTime: 'Lead Time', warranty: 'Warranty', confirmByQuote: 'Confirm by quote', faqHeading: 'Frequently Asked Questions', oemTitle: 'HousePlus OEM/ODM Services', oemDescription: 'Discuss custom branding, private-label packaging and product modifications with our team; requirements are confirmed in your quotation.', contactSales: 'Contact HousePlus Sales Team', brandBadge: 'HousePlus B2B', quoteQuestion: 'Which commercial details are confirmed in a quotation?', quoteAnswer: 'The listed MOQ, lead time, warranty and applicable certificates are standard information for this model. Pricing, availability, freight, export documentation and final order conditions are confirmed in the quotation.', questionPrefix: 'Q:', answerPrefix: 'A:' },
  es: { notFound: 'Producto no encontrado', notFoundDescription: 'El producto que busca no existe.', backProducts: 'Volver a productos', documentation: 'Documentación disponible bajo solicitud', technicalSpecifications: 'Especificaciones técnicas', keyFeatures: 'Características principales', applications: 'Aplicaciones', requestQuote: 'Solicitar una cotización', minOrder: 'Pedido mínimo', leadTime: 'Plazo de entrega', warranty: 'Garantía', confirmByQuote: 'Confirmar en la cotización', faqHeading: 'Preguntas frecuentes', oemTitle: 'Servicios OEM/ODM de HousePlus', oemDescription: 'Analice con nuestro equipo la marca personalizada, el embalaje de marca privada y las modificaciones del producto; los requisitos se confirman en su cotización.', contactSales: 'Contactar al equipo comercial de HousePlus', brandBadge: 'HousePlus B2B', quoteQuestion: '¿Qué condiciones comerciales se confirman en la cotización?', quoteAnswer: 'El MOQ, plazo de entrega, garantía y certificados aplicables indicados son información estándar de este modelo. El precio, la disponibilidad, el flete, la documentación de exportación y las condiciones finales se confirman en la cotización.', questionPrefix: 'P:', answerPrefix: 'R:' },
  de: { notFound: 'Produkt nicht gefunden', notFoundDescription: 'Das gesuchte Produkt existiert nicht.', backProducts: 'Zurück zu Produkten', documentation: 'Dokumentation auf Anfrage verfügbar', technicalSpecifications: 'Technische Spezifikationen', keyFeatures: 'Hauptmerkmale', applications: 'Anwendungen', requestQuote: 'Angebot anfordern', minOrder: 'Mindestbestellung', leadTime: 'Lieferzeit', warranty: 'Garantie', confirmByQuote: 'Im Angebot bestätigen', faqHeading: 'Häufig gestellte Fragen', oemTitle: 'HousePlus OEM/ODM-Services', oemDescription: 'Besprechen Sie kundenspezifisches Branding, Private-Label-Verpackungen und Produktanpassungen mit unserem Team; die Anforderungen werden in Ihrem Angebot bestätigt.', contactSales: 'HousePlus-Vertrieb kontaktieren', brandBadge: 'HousePlus B2B', quoteQuestion: 'Welche Handelsdetails werden im Angebot bestätigt?', quoteAnswer: 'Die angegebene Mindestbestellmenge, Lieferzeit, Garantie und anwendbaren Zertifikate sind Standardinformationen für dieses Modell. Preis, Verfügbarkeit, Fracht, Exportdokumentation und endgültige Bestellbedingungen werden im Angebot bestätigt.', questionPrefix: 'F:', answerPrefix: 'A:' },
  fr: { notFound: 'Produit introuvable', notFoundDescription: 'Le produit que vous recherchez n’existe pas.', backProducts: 'Retour aux produits', documentation: 'Documentation disponible sur demande', technicalSpecifications: 'Spécifications techniques', keyFeatures: 'Caractéristiques principales', applications: 'Applications', requestQuote: 'Demander un devis', minOrder: 'Commande minimale', leadTime: 'Délai de livraison', warranty: 'Garantie', confirmByQuote: 'À confirmer dans le devis', faqHeading: 'Questions fréquentes', oemTitle: 'Services OEM/ODM de HousePlus', oemDescription: 'Discutez de la personnalisation de la marque, de l’emballage sous marque privée et des modifications produit avec notre équipe ; les exigences sont confirmées dans votre devis.', contactSales: 'Contacter l’équipe commerciale HousePlus', brandBadge: 'HousePlus B2B', quoteQuestion: 'Quelles conditions commerciales sont confirmées dans le devis ?', quoteAnswer: 'Le MOQ, le délai, la garantie et les certificats applicables indiqués sont des informations standard de ce modèle. Le prix, la disponibilité, le fret, les documents d’exportation et les conditions finales sont confirmés dans le devis.', questionPrefix: 'Q :', answerPrefix: 'R : ' },
  ar: { notFound: 'المنتج غير موجود', notFoundDescription: 'المنتج الذي تبحث عنه غير موجود.', backProducts: 'العودة إلى المنتجات', documentation: 'الوثائق متاحة عند الطلب', technicalSpecifications: 'المواصفات الفنية', keyFeatures: 'الميزات الرئيسية', applications: 'التطبيقات', requestQuote: 'طلب عرض أسعار', minOrder: 'الحد الأدنى للطلب', leadTime: 'المهلة الزمنية', warranty: 'الضمان', confirmByQuote: 'يُؤكد في عرض الأسعار', faqHeading: 'الأسئلة الشائعة', oemTitle: 'خدمات HousePlus OEM/ODM', oemDescription: 'ناقش العلامات التجارية المخصصة والتغليف الخاص وتعديلات المنتج مع فريقنا؛ ويتم تأكيد المتطلبات في عرض الأسعار الخاص بك.', contactSales: 'تواصل مع فريق مبيعات HousePlus', brandBadge: 'HousePlus B2B', quoteQuestion: 'ما التفاصيل التجارية التي يؤكدها عرض الأسعار؟', quoteAnswer: 'الحد الأدنى للطلب والمهلة والضمان والشهادات المطبقة المذكورة هي معلومات قياسية لهذا الطراز. ويُؤكد السعر والتوافر والشحن ووثائق التصدير والشروط النهائية في عرض الأسعار.', questionPrefix: 'س:', answerPrefix: 'ج:' },
};

const categoryLabels: Record<string, Record<string, string>> = {
  en: { solar: 'Solar Energy Systems', appliances: 'Home Appliances', electronics: '3C Electronics' },
  es: { solar: 'Sistemas de energía solar', appliances: 'Electrodomésticos', electronics: 'Electrónica 3C' },
  de: { solar: 'Solarenergiesysteme', appliances: 'Haushaltsgeräte', electronics: '3C-Elektronik' },
  fr: { solar: 'Systèmes d’énergie solaire', appliances: 'Appareils électroménagers', electronics: 'Électronique 3C' },
  ar: { solar: 'أنظمة الطاقة الشمسية', appliances: 'الأجهزة المنزلية', electronics: 'إلكترونيات 3C' },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const { lang, slug } = params;
  const baseProduct = PRODUCT_DATA[slug];
  const product = baseProduct ? getLocalizedProduct(slug, lang, baseProduct) : undefined;
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
    en: `Request a wholesale quotation for ${name} from HousePlus. Product documentation, applicable compliance materials, OEM/ODM scope and commercial terms are confirmed for your requirements.`,
    es: `Solicite una cotización mayorista para ${name} con HousePlus. La documentación del producto, los materiales de cumplimiento aplicables, el alcance OEM/ODM y las condiciones comerciales se confirman según sus requisitos.`,
    de: `Fordern Sie ein Großhandelsangebot für ${name} bei HousePlus an. Produktdokumentation, anwendbare Konformitätsunterlagen, OEM/ODM-Umfang und Geschäftsbedingungen werden für Ihre Anforderungen bestätigt.`,
    fr: `Demandez un devis de gros pour ${name} auprès de HousePlus. La documentation produit, les éléments de conformité applicables, le périmètre OEM/ODM et les conditions commerciales sont confirmés selon vos besoins.`,
    ar: `اطلب عرض سعر بالجملة لـ ${name} من هاوس بلس. يتم تأكيد وثائق المنتج ومواد الامتثال المناسبة ونطاق OEM/ODM والشروط التجارية وفقًا لمتطلباتك.`,
  };

  const title = titleTemplates[lang] || titleTemplates['en'];
  const description = descTemplates[lang] || descTemplates['en'];
  const shouldIndexLocale = LOCALES.includes(lang);
  const canonicalUrl = `${BASE_URL}/${lang}/products/${slug}`;
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
      locale: getOGLocale(lang),
      alternateLocale: LOCALES.filter((locale) => locale !== lang).map(getOGLocale),
      images: product?.coverImage ? [{
        url: product.coverImage,
        width: imageDimensions.width,
        height: imageDimensions.height,
        alt: product.imageAlt || name,
        type: product.coverImage.endsWith('.png/') ? 'image/png' : 'image/jpeg',
      }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@HousePlusGroup',
      creator: '@HousePlusGroup',
      images: product?.coverImage ? [{ url: product.coverImage, alt: product.imageAlt || name }] : [],
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
  const baseProduct = PRODUCT_DATA[slug];
  const product = baseProduct ? getLocalizedProduct(slug, lang, baseProduct) : undefined;
  const ui = productUi[lang] || productUi.en;

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">{ui.notFound}</h1>
          <p className="text-slate-600 mb-8">{ui.notFoundDescription}</p>
          <Link
            href={`/${lang}/products`}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
          >
            ← {ui.backProducts}
          </Link>
        </div>
      </main>
    );
  }

  const catConfig = CATEGORY_CONFIG[product.category];
  const localizedCategory = categoryLabels[lang]?.[product.category] || categoryLabels.en[product.category] || catConfig.label;
  const commercialInfo = product.b2bInfo;
  const quotationFaq = [{ question: ui.quoteQuestion, answer: ui.quoteAnswer }];
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
    b2bInfo: commercialInfo,
    lang,
    contactUrl: `${BASE_URL}/${lang}/contact`,
    contactActionName: (schemaActionCopy[lang] || schemaActionCopy.en).name,
    contactActionDescription: (schemaActionCopy[lang] || schemaActionCopy.en).description,
  });

  const faqSchema = generateFAQSchema(quotationFaq, lang);

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
              {[ui.documentation, ...(commercialInfo?.certifications || []), 'OEM/ODM'].map((cert) => (
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
                🏭 {ui.brandBadge}
              </span>
              {product.badge && (
                <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest rounded-full">
                  ⭐ {product.badge}
                </span>
              )}
            </div>

            {/* Category Badge */}
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-bold ${catConfig.bg} ${catConfig.color}`}>
              {catConfig.icon} {localizedCategory}
            </span>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-slate-600 leading-relaxed text-base">
              {product.description}
            </p>

            {/* Specifications Table */}
            {product.specs.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  {ui.technicalSpecifications}
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
                  {ui.keyFeatures}
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
                  {ui.applications}
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
                {ui.requestQuote}
              </Link>
              <Link
                href={`/${lang}/products`}
                className="flex-1 text-center px-6 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5"
              >
                ← {ui.backProducts}
              </Link>
            </div>

            {/* Wholesale Info */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: ui.minOrder, value: commercialInfo?.moq || ui.confirmByQuote },
                { label: ui.leadTime, value: commercialInfo?.leadTime || ui.confirmByQuote },
                { label: ui.warranty, value: commercialInfo?.warranty || ui.confirmByQuote },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            {quotationFaq.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  {ui.faqHeading}
                </h2>
                <div className="space-y-3">
                  {quotationFaq.map((faqItem, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="font-semibold text-slate-900 text-sm mb-1">{ui.questionPrefix} {faqItem.question}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{ui.answerPrefix} {faqItem.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HousePlus CTA */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-slate-700 mb-3">
                <strong>🏭 {ui.oemTitle}:</strong> {ui.oemDescription}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-block text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {ui.contactSales} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
