import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PRODUCT_DATA, CATEGORY_CONFIG, ProductData } from '@/lib/product-data';
import Breadcrumb from '@/components/Breadcrumb';
import SEOHead from '@/components/SEOHead';
import { generateProductSchema, generateFAQSchema, generateProductHowToSchema } from '@/lib/schema-generator';
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
  en: { notFound: 'Product Not Found', notFoundDescription: "The product you are looking for does not exist.", backProducts: 'Back to Products', documentation: 'Documentation available on request', technicalSpecifications: 'Technical Specifications', keyFeatures: 'Key Features', applications: 'Applications', requestQuote: 'Request a B2B/OEM Quote', buyNow: 'Buy Now', retailOffer: 'Retail offer', minOrder: 'Min. Order', leadTime: 'Lead Time', warranty: 'Warranty', confirmByQuote: 'Confirm by quote', faqHeading: 'Frequently Asked Questions', oemTitle: 'HousePlus OEM/ODM Services', oemDescription: 'Discuss custom branding, private-label packaging and product modifications with our team; requirements are confirmed in your quotation.', contactSales: 'Contact HousePlus Sales Team', brandBadge: 'HousePlus Retail & B2B', quoteQuestion: 'Which commercial details are confirmed in a quotation?', quoteAnswer: 'For retail-enabled products, the product page shows the current retail price and availability. MOQ, customisation, freight, export documentation and final B2B order conditions are confirmed in the quotation.', questionPrefix: 'Q:', answerPrefix: 'A:' },
  es: { notFound: 'Producto no encontrado', notFoundDescription: 'El producto que busca no existe.', backProducts: 'Volver a productos', documentation: 'Documentación disponible bajo solicitud', technicalSpecifications: 'Especificaciones técnicas', keyFeatures: 'Características principales', applications: 'Aplicaciones', requestQuote: 'Solicitar cotización B2B/OEM', buyNow: 'Comprar ahora', retailOffer: 'Oferta minorista', minOrder: 'Pedido mínimo', leadTime: 'Plazo de entrega', warranty: 'Garantía', confirmByQuote: 'Confirmar en la cotización', faqHeading: 'Preguntas frecuentes', oemTitle: 'Servicios OEM/ODM de HousePlus', oemDescription: 'Analice con nuestro equipo la marca personalizada, el embalaje de marca privada y las modificaciones del producto; los requisitos se confirman en su cotización.', contactSales: 'Contactar al equipo comercial de HousePlus', brandBadge: 'HousePlus Retail y B2B', quoteQuestion: '¿Qué condiciones comerciales se confirman en la cotización?', quoteAnswer: 'Para productos con venta minorista, la página muestra precio y disponibilidad actuales. MOQ, personalización, flete, documentación de exportación y condiciones B2B finales se confirman en la cotización.', questionPrefix: 'P:', answerPrefix: 'R:' },
  de: { notFound: 'Produkt nicht gefunden', notFoundDescription: 'Das gesuchte Produkt existiert nicht.', backProducts: 'Zurück zu Produkten', documentation: 'Dokumentation auf Anfrage verfügbar', technicalSpecifications: 'Technische Spezifikationen', keyFeatures: 'Hauptmerkmale', applications: 'Anwendungen', requestQuote: 'B2B/OEM-Angebot anfordern', buyNow: 'Jetzt kaufen', retailOffer: 'Einzelhandelsangebot', minOrder: 'Mindestbestellung', leadTime: 'Lieferzeit', warranty: 'Garantie', confirmByQuote: 'Im Angebot bestätigen', faqHeading: 'Häufig gestellte Fragen', oemTitle: 'HousePlus OEM/ODM-Services', oemDescription: 'Besprechen Sie kundenspezifisches Branding, Private-Label-Verpackungen und Produktanpassungen mit unserem Team; die Anforderungen werden in Ihrem Angebot bestätigt.', contactSales: 'HousePlus-Vertrieb kontaktieren', brandBadge: 'HousePlus Einzelhandel und B2B', quoteQuestion: 'Welche Handelsdetails werden im Angebot bestätigt?', quoteAnswer: 'Bei Einzelhandelsprodukten zeigt die Produktseite Preis und Verfügbarkeit. MOQ, Anpassung, Fracht, Exportdokumentation und endgültige B2B-Bedingungen werden im Angebot bestätigt.', questionPrefix: 'F:', answerPrefix: 'A:' },
  fr: { notFound: 'Produit introuvable', notFoundDescription: 'Le produit que vous recherchez n’existe pas.', backProducts: 'Retour aux produits', documentation: 'Documentation disponible sur demande', technicalSpecifications: 'Spécifications techniques', keyFeatures: 'Caractéristiques principales', applications: 'Applications', requestQuote: 'Demander un devis B2B/OEM', buyNow: 'Acheter', retailOffer: 'Offre retail', minOrder: 'Commande minimale', leadTime: 'Délai de livraison', warranty: 'Garantie', confirmByQuote: 'À confirmer dans le devis', faqHeading: 'Questions fréquentes', oemTitle: 'Services OEM/ODM de HousePlus', oemDescription: 'Discutez de la personnalisation de la marque, de l’emballage sous marque privée et des modifications produit avec notre équipe ; les exigences sont confirmées dans votre devis.', contactSales: 'Contacter l’équipe commerciale HousePlus', brandBadge: 'HousePlus Retail et B2B', quoteQuestion: 'Quelles conditions commerciales sont confirmées dans le devis ?', quoteAnswer: 'Pour les produits retail, la page affiche prix et disponibilité actuels. MOQ, personnalisation, fret, documents export et conditions B2B finales sont confirmés dans le devis.', questionPrefix: 'Q :', answerPrefix: 'R : ' },
  ar: { notFound: 'المنتج غير موجود', notFoundDescription: 'المنتج الذي تبحث عنه غير موجود.', backProducts: 'العودة إلى المنتجات', documentation: 'الوثائق متاحة عند الطلب', technicalSpecifications: 'المواصفات الفنية', keyFeatures: 'الميزات الرئيسية', applications: 'التطبيقات', requestQuote: 'طلب عرض B2B/OEM', buyNow: 'اشتر الآن', retailOffer: 'عرض التجزئة', minOrder: 'الحد الأدنى للطلب', leadTime: 'المهلة الزمنية', warranty: 'الضمان', confirmByQuote: 'يُؤكد في عرض الأسعار', faqHeading: 'الأسئلة الشائعة', oemTitle: 'خدمات HousePlus OEM/ODM', oemDescription: 'ناقش العلامات التجارية المخصصة والتغليف الخاص وتعديلات المنتج مع فريقنا؛ ويتم تأكيد المتطلبات في عرض الأسعار الخاص بك.', contactSales: 'تواصل مع فريق مبيعات HousePlus', brandBadge: 'هاوس بلس للتجزئة وB2B', quoteQuestion: 'ما التفاصيل التجارية التي يؤكدها عرض الأسعار؟', quoteAnswer: 'للمنتجات المتاحة بالتجزئة، تعرض صفحة المنتج السعر والتوفر الحاليين. ويتم تأكيد MOQ والتخصيص والشحن ووثائق التصدير وشروط B2B النهائية في عرض السعر.', questionPrefix: 'س:', answerPrefix: 'ج:' },
};

const productHowToCopy: Record<string, {
  title: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}> = {
  en: {
    title: 'How to Source This Product for B2B/OEM',
    description: 'Follow this transparent route to define your sourcing requirement and request a documented HousePlus quotation.',
    steps: [
      { name: 'Review the product information', text: 'Review the listed specifications, features, images and available documentation before defining your requirement.' },
      { name: 'Send a product inquiry', text: 'Request a quotation and state the intended application, required quantity and any branding or packaging scope.' },
      { name: 'Confirm the commercial scope', text: 'HousePlus confirms the applicable product scope, customisation, freight, export documentation and delivery options in the quotation.' },
      { name: 'Approve the documented order plan', text: 'Review the agreed quotation and supporting documentation before placing a B2B/OEM order.' },
    ],
  },
  es: {
    title: 'Cómo Abastecer Este Producto para B2B/OEM',
    description: 'Siga esta ruta transparente para definir su necesidad de abastecimiento y solicitar una cotización documentada de HousePlus.',
    steps: [
      { name: 'Revise la información del producto', text: 'Revise las especificaciones, características, imágenes y documentación disponible antes de definir su requisito.' },
      { name: 'Envíe una consulta de producto', text: 'Solicite una cotización e indique la aplicación prevista, la cantidad requerida y cualquier alcance de marca o embalaje.' },
      { name: 'Confirme el alcance comercial', text: 'HousePlus confirma en la cotización el alcance aplicable, la personalización, el flete, la documentación de exportación y las opciones de entrega.' },
      { name: 'Apruebe el plan de pedido documentado', text: 'Revise la cotización acordada y la documentación de respaldo antes de realizar un pedido B2B/OEM.' },
    ],
  },
  de: {
    title: 'So Beschaffen Sie Dieses Produkt für B2B/OEM',
    description: 'Folgen Sie diesem transparenten Weg, um Ihren Beschaffungsbedarf zu definieren und ein dokumentiertes Angebot von HousePlus anzufordern.',
    steps: [
      { name: 'Produktinformationen prüfen', text: 'Prüfen Sie die aufgeführten Spezifikationen, Merkmale, Bilder und verfügbaren Unterlagen, bevor Sie Ihren Bedarf definieren.' },
      { name: 'Produktanfrage senden', text: 'Fordern Sie ein Angebot an und nennen Sie Verwendungszweck, benötigte Menge sowie mögliche Marken- oder Verpackungsanforderungen.' },
      { name: 'Den kaufmännischen Umfang bestätigen', text: 'HousePlus bestätigt den anwendbaren Umfang, Anpassungen, Fracht, Exportdokumentation und Lieferoptionen im Angebot.' },
      { name: 'Den dokumentierten Bestellplan freigeben', text: 'Prüfen Sie das vereinbarte Angebot und die zugehörigen Unterlagen, bevor Sie eine B2B/OEM-Bestellung aufgeben.' },
    ],
  },
  fr: {
    title: 'Comment Sourcer Ce Produit en B2B/OEM',
    description: 'Suivez ce parcours transparent pour définir votre besoin d’approvisionnement et demander un devis HousePlus documenté.',
    steps: [
      { name: 'Examinez les informations produit', text: 'Examinez les spécifications, caractéristiques, images et documents disponibles avant de définir votre besoin.' },
      { name: 'Envoyez une demande produit', text: 'Demandez un devis en indiquant l’application prévue, la quantité requise et toute attente de marque ou d’emballage.' },
      { name: 'Confirmez le périmètre commercial', text: 'HousePlus confirme dans le devis le périmètre applicable, la personnalisation, le fret, les documents export et les options de livraison.' },
      { name: 'Validez le plan de commande documenté', text: 'Examinez le devis convenu et les documents associés avant de passer une commande B2B/OEM.' },
    ],
  },
  ar: {
    title: 'كيفية توريد هذا المنتج لـ B2B/OEM',
    description: 'اتبع هذا المسار الواضح لتحديد احتياجات التوريد وطلب عرض أسعار موثق من HousePlus.',
    steps: [
      { name: 'راجع معلومات المنتج', text: 'راجع المواصفات والميزات والصور والوثائق المتاحة قبل تحديد متطلباتك.' },
      { name: 'أرسل استفسارًا عن المنتج', text: 'اطلب عرض سعر وحدد التطبيق المقصود والكمية المطلوبة وأي متطلبات للعلامة التجارية أو التغليف.' },
      { name: 'أكد النطاق التجاري', text: 'تؤكد HousePlus في عرض السعر النطاق المطبق والتخصيص والشحن ووثائق التصدير وخيارات التسليم.' },
      { name: 'اعتمد خطة الطلب الموثقة', text: 'راجع عرض السعر المتفق عليه والوثائق الداعمة قبل تقديم طلب B2B/OEM.' },
    ],
  },
};

const categoryLabels: Record<string, Record<string, string>> = {
  en: { solar: 'Solar Energy Systems', appliances: 'Home Appliances', electronics: '3C Electronics' },
  es: { solar: 'Sistemas de energía solar', appliances: 'Electrodomésticos', electronics: 'Electrónica 3C' },
  de: { solar: 'Solarenergiesysteme', appliances: 'Haushaltsgeräte', electronics: '3C-Elektronik' },
  fr: { solar: 'Systèmes d’énergie solaire', appliances: 'Appareils électroménagers', electronics: 'Électronique 3C' },
  ar: { solar: 'أنظمة الطاقة الشمسية', appliances: 'الأجهزة المنزلية', electronics: 'إلكترونيات 3C' },
};

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string; slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const { lang, slug } = params;
  const baseProduct = PRODUCT_DATA[slug];
  if (!baseProduct || !validLangs.includes(lang)) {
    return {
      title: 'Product Not Found | HousePlus',
      robots: 'noindex, follow',
    };
  }
  const product = baseProduct ? getLocalizedProduct(slug, lang, baseProduct) : undefined;
  const name = product?.name || slug;

  const langAlternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    langAlternates[locale] = `${BASE_URL}/${locale}/products/${slug}/`;
  }
  langAlternates['x-default'] = `${BASE_URL}/en/products/${slug}/`;

  const titleTemplates: Record<string, string> = {
    en: `${name} | HousePlus Wholesale — Professional Manufacturer`,
    es: `${name} | HousePlus al por Mayor — Fabricante Profesional`,
    de: `${name} | HousePlus Großhandel — Professioneller Hersteller`,
    fr: `${name} | HousePlus Gros — Fabricant Professionnel`,
    ar: `${name} | هاوس بلس بالجملة — مصنع احترافي`,
  };
  const retailTitleTemplates: Record<string, string> = {
    en: `${name} | Shop HousePlus Retail or Request a B2B/OEM Quote`,
    es: `${name} | Comprar en HousePlus o Solicitar Cotización B2B/OEM`,
    de: `${name} | HousePlus Retail kaufen oder B2B/OEM-Angebot anfordern`,
    fr: `${name} | Acheter chez HousePlus ou Demander un Devis B2B/OEM`,
    ar: `${name} | اشتر من هاوس بلس أو اطلب عرض B2B/OEM`,
  };

  const descTemplates: Record<string, string> = {
    en: `Request a wholesale quotation for ${name} from HousePlus. Product documentation, applicable compliance materials, OEM/ODM scope and commercial terms are confirmed for your requirements.`,
    es: `Solicite una cotización mayorista para ${name} con HousePlus. La documentación del producto, los materiales de cumplimiento aplicables, el alcance OEM/ODM y las condiciones comerciales se confirman según sus requisitos.`,
    de: `Fordern Sie ein Großhandelsangebot für ${name} bei HousePlus an. Produktdokumentation, anwendbare Konformitätsunterlagen, OEM/ODM-Umfang und Geschäftsbedingungen werden für Ihre Anforderungen bestätigt.`,
    fr: `Demandez un devis de gros pour ${name} auprès de HousePlus. La documentation produit, les éléments de conformité applicables, le périmètre OEM/ODM et les conditions commerciales sont confirmés selon vos besoins.`,
    ar: `اطلب عرض سعر بالجملة لـ ${name} من هاوس بلس. يتم تأكيد وثائق المنتج ومواد الامتثال المناسبة ونطاق OEM/ODM والشروط التجارية وفقًا لمتطلباتك.`,
  };
  const retailDescTemplates: Record<string, string> = {
    en: `View the current retail offer for ${name} from HousePlus, or request a B2B/OEM quote for volume, customisation and project requirements.`,
    es: `Vea la oferta minorista actual de ${name} con HousePlus o solicite una cotización B2B/OEM para volumen, personalización y proyectos.`,
    de: `Sehen Sie das aktuelle Einzelhandelsangebot für ${name} von HousePlus oder fordern Sie ein B2B/OEM-Angebot für Mengen, Anpassung und Projekte an.`,
    fr: `Consultez l’offre retail actuelle de ${name} chez HousePlus ou demandez un devis B2B/OEM pour les volumes, la personnalisation et les projets.`,
    ar: `اطّلع على عرض التجزئة الحالي لـ ${name} من هاوس بلس أو اطلب عرض B2B/OEM للكميات والتخصيص ومتطلبات المشاريع.`,
  };

  const isRetailProduct = Boolean(baseProduct?.retailOffer);
  const title = isRetailProduct ? (retailTitleTemplates[lang] || retailTitleTemplates.en) : (titleTemplates[lang] || titleTemplates.en);
  const description = isRetailProduct ? (retailDescTemplates[lang] || retailDescTemplates.en) : (descTemplates[lang] || descTemplates.en);
  const shouldIndexLocale = LOCALES.includes(lang);
  const canonicalUrl = `${BASE_URL}/${lang}/products/${slug}/`;
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

export default async function ProductDetailPage(
  props: {
    params: Promise<{ lang: string; slug: string }>;
  }
) {
  const params = await props.params;
  const { lang, slug } = params;
  const baseProduct = PRODUCT_DATA[slug];
  if (!baseProduct || !validLangs.includes(lang)) {
    notFound();
  }
  const product = baseProduct ? getLocalizedProduct(slug, lang, baseProduct) : undefined;
  const ui = productUi[lang] || productUi.en;

  if (!product) notFound();

  const catConfig = CATEGORY_CONFIG[product.category];
  const localizedCategory = categoryLabels[lang]?.[product.category] || categoryLabels.en[product.category] || catConfig.label;
  const commercialInfo = product.b2bInfo;
  const retailOffer = product.retailOffer;
  const quotationFaq = [{ question: ui.quoteQuestion, answer: ui.quoteAnswer }];
  const productUrl = `${BASE_URL}/${lang}/products/${slug}/`;
  const modelSpec = product.specs.find((s) => s.key === 'Model');
  const sku = modelSpec?.value || slug.toUpperCase();
  const imageDimensions = r2ImageDimensions(product.coverImage, { width: 900, height: 675 });
  const productImageAlt = product.imageAlt || getDetailAlt(product, modelSpec?.value || slug.toUpperCase());
  const productImageTitle = product.imageTitle || getDetailTitle(product, modelSpec?.value || slug.toUpperCase());
  const howToCopy = productHowToCopy[lang] || productHowToCopy.en;

  // Google Product rich results require a complete Offer, Review, or AggregateRating.
  // Quote-only B2B products have no public price or verified user-generated rating,
  // so omit Product JSON-LD until a real retail feed supplies the required facts.
  const hasCompleteRetailOffer = Boolean(
    retailOffer?.price && retailOffer.currency && retailOffer.purchaseUrl && retailOffer.availability
  );
  const productSchema = hasCompleteRetailOffer ? generateProductSchema({
    name: product.name,
    description: product.geoDescription || product.description,
    image: product.coverImage,
    sku,
    url: productUrl,
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
    retailOffer,
    lang,
    contactUrl: `${BASE_URL}/${lang}/contact/`,
    contactActionName: (schemaActionCopy[lang] || schemaActionCopy.en).name,
    contactActionDescription: (schemaActionCopy[lang] || schemaActionCopy.en).description,
    specifications: product.specs.map((spec) => ({ name: spec.key, value: spec.value })),
  }) : null;

  const faqSchema = generateFAQSchema(quotationFaq, lang);
  const productHowToSchema = generateProductHowToSchema({
    name: `${howToCopy.title}: ${product.name}`,
    description: howToCopy.description,
    image: product.coverImage,
    url: productUrl,
    lang,
    steps: howToCopy.steps,
  });

  return (
    <main className="min-h-screen bg-white">
      <SEOHead schemas={[...(productSchema ? [productSchema] : []), ...(faqSchema ? [faqSchema] : []), productHowToSchema]} />
      <Breadcrumb lang={lang} slug={`products/${slug}`} customLabel={product.name} />

      {/* Product Hero */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
              <Image
                src={product.coverImage}
                alt={productImageAlt}
                title={productImageTitle}
                width={imageDimensions.width}
                height={imageDimensions.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="absolute inset-0 h-full w-full object-cover"
              />
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

            {retailOffer && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">{ui.retailOffer}</p>
                <p className="text-2xl font-black text-slate-900">{retailOffer.price} {retailOffer.currency}</p>
              </div>
            )}

            {/* Retail and B2B/OEM CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              {retailOffer && (
                <a
                  href={retailOffer.purchaseUrl}
                  className="flex-1 text-center px-6 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 hover:-translate-y-0.5"
                >
                  {ui.buyNow}
                </a>
              )}
              <Link
                href={`/${lang}/contact?product=${encodeURIComponent(`${product.name} (SKU: ${slug})`)}`}
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

            <section id="b2b-oem-sourcing-howto" className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-100" aria-labelledby="b2b-oem-sourcing-heading">
              <h2 id="b2b-oem-sourcing-heading" className="text-lg font-bold text-slate-900 mb-2">{howToCopy.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{howToCopy.description}</p>
              <ol className="space-y-3">
                {howToCopy.steps.map((step, index) => (
                  <li key={step.name} className="flex gap-3 text-sm text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{index + 1}</span>
                    <span><strong className="text-slate-900">{step.name}.</strong> {step.text}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* HousePlus CTA */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-slate-700 mb-3">
                <strong>🏭 {ui.oemTitle}:</strong> {ui.oemDescription}
              </p>
              <Link
                href={`/${lang}/contact?product=${encodeURIComponent(`${product.name} (SKU: ${slug})`)}`}
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
