import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema-generator';
import { getCompanyFacts } from '@/lib/company-facts';

export const dynamicParams = false;

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

type BrandCopy = {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  subtitle: string;
  retailTitle: string;
  retailDescription: string;
  b2bTitle: string;
  b2bDescription: string;
  infoTitle: string;
  infoDescription: string;
  termsTitle: string;
  termsDescription: string;
  storyTitle: string;
  story: string;
  storyDetail: string;
  categoriesTitle: string;
  categoriesDescription: string;
  categoryItems: Array<{ title: string; description: string }>;
  supportTitle: string;
  supportDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  browse: string;
  contact: string;
  about: string;
};

const copy: Record<string, BrandCopy> = {
  en: {
    title: 'HousePlus | Retail Products & B2B/OEM Supply',
    description: 'HousePlus supports direct retail purchase and B2B/OEM sourcing for solar systems, home appliances and 3C electronics. Since 2010: 20,000 m² production area, 441+ wholesale clients and 53+ markets.',
    eyebrow: 'HousePlus Group',
    headline: 'Retail Products and B2B/OEM Supply',
    subtitle: 'Choose direct retail purchase for eligible products, or begin a B2B/OEM discussion for sourcing, customisation and project requirements.',
    retailTitle: 'Direct Retail Purchase',
    retailDescription: 'Eligible product pages show their current retail availability, price and purchase path. Product-level information remains the source of truth.',
    b2bTitle: 'B2B & OEM/ODM Inquiry',
    b2bDescription: 'For wholesale, private-label or project requirements, request a quote to confirm the applicable product scope, commercial terms and delivery options.',
    infoTitle: 'Product Information',
    infoDescription: 'Review available specifications, product images and documentation before choosing a retail or B2B purchase path.',
    termsTitle: 'Order Details by Product',
    termsDescription: 'Retail availability is shown by product. MOQ, customisation, lead time and destination-specific terms are confirmed through the B2B inquiry process.',
    storyTitle: 'About HousePlus Group',
    story: 'HousePlus Group supports retail customers and professional buyers across solar energy systems, home appliances and 3C electronics.',
    storyDetail: 'Since 2010, HousePlus has maintained a 20,000 m² production area and supported 441+ wholesale clients across 53+ countries and markets.',
    categoriesTitle: 'Explore Product Categories',
    categoriesDescription: 'Start with the product category that matches your retail purchase or B2B sourcing requirement.',
    categoryItems: [
      { title: 'Solar Energy Systems', description: 'Panels, inverters, batteries, charge controllers and portable power solutions.' },
      { title: 'Home Appliances', description: 'Kitchen and household product categories for retail selection and sourcing discussions.' },
      { title: '3C Electronics', description: 'Consumer electronics and accessories for retail purchase or B2B/OEM requirements.' },
    ],
    supportTitle: 'A Clear Route for Every Buyer',
    supportDescription: 'Use the product page for current retail availability. For volume purchasing, branding, packaging, documentation or destination-specific requirements, contact HousePlus for a B2B/OEM quote.',
    ctaTitle: 'Find the Right Purchase Path',
    ctaDescription: 'Browse products to see available retail options, or contact HousePlus to discuss B2B/OEM sourcing and receive a quotation.',
    browse: 'Browse Products', contact: 'Contact for B2B/OEM', about: 'About HousePlus',
  },
  es: {
    title: 'HousePlus | Productos Minoristas y Suministro B2B/OEM',
    description: 'HousePlus admite compra minorista directa y abastecimiento B2B/OEM de sistemas solares, electrodomésticos y electrónica 3C. Desde 2010: 20.000 m² de producción, más de 441 clientes mayoristas y más de 53 mercados.',
    eyebrow: 'HousePlus Group', headline: 'Productos Minoristas y Suministro B2B/OEM',
    subtitle: 'Elija compra minorista directa para productos elegibles o inicie una conversación B2B/OEM para abastecimiento, personalización y requisitos de proyecto.',
    retailTitle: 'Compra Minorista Directa', retailDescription: 'Las páginas de productos elegibles muestran disponibilidad minorista, precio y ruta de compra actuales. La información del producto es la fuente de verdad.',
    b2bTitle: 'Consulta B2B y OEM/ODM', b2bDescription: 'Para mayorista, marca privada o requisitos de proyecto, solicite una cotización para confirmar alcance, condiciones comerciales y opciones de entrega.',
    infoTitle: 'Información del Producto', infoDescription: 'Revise especificaciones, imágenes y documentación disponible antes de elegir una ruta de compra minorista o B2B.',
    termsTitle: 'Detalles de Pedido por Producto', termsDescription: 'La disponibilidad minorista se muestra por producto. MOQ, personalización, plazo y condiciones por destino se confirman mediante la consulta B2B.',
    storyTitle: 'Sobre HousePlus Group', story: 'HousePlus Group apoya a clientes minoristas y compradores profesionales en sistemas solares, electrodomésticos y electrónica 3C.',
    storyDetail: 'Desde 2010, HousePlus mantiene un área de producción de 20.000 m² y ha apoyado a más de 441 clientes mayoristas en más de 53 países y mercados.',
    categoriesTitle: 'Explore las Categorías de Producto', categoriesDescription: 'Comience por la categoría adecuada para su compra minorista o requisito de abastecimiento B2B.',
    categoryItems: [
      { title: 'Sistemas de Energía Solar', description: 'Paneles, inversores, baterías, controladores de carga y soluciones portátiles.' },
      { title: 'Electrodomésticos', description: 'Categorías de cocina y hogar para selección minorista y conversaciones de abastecimiento.' },
      { title: 'Electrónica 3C', description: 'Electrónica de consumo y accesorios para compra minorista o requisitos B2B/OEM.' },
    ],
    supportTitle: 'Una Ruta Clara para Cada Comprador', supportDescription: 'Use la página de producto para disponibilidad minorista actual. Para volumen, marca, empaque, documentación o requisitos por destino, contacte a HousePlus para una cotización B2B/OEM.',
    ctaTitle: 'Encuentre la Ruta de Compra Adecuada', ctaDescription: 'Explore productos para ver opciones minoristas disponibles o contacte a HousePlus para abastecimiento B2B/OEM y una cotización.',
    browse: 'Ver Productos', contact: 'Contactar para B2B/OEM', about: 'Sobre HousePlus',
  },
  de: {
    title: 'HousePlus | Einzelhandel und B2B/OEM-Beschaffung',
    description: 'HousePlus unterstützt Direktkauf im Einzelhandel und B2B/OEM-Beschaffung für Solarsysteme, Haushaltsgeräte und 3C-Elektronik. Seit 2010: 20.000 m² Produktionsfläche, 441+ Großhandelskunden und 53+ Märkte.',
    eyebrow: 'HousePlus Group', headline: 'Einzelhandel und B2B/OEM-Beschaffung',
    subtitle: 'Wählen Sie den Direktkauf für berechtigte Produkte oder starten Sie ein B2B/OEM-Gespräch für Beschaffung, Anpassung und Projektanforderungen.',
    retailTitle: 'Direkter Einzelhandelskauf', retailDescription: 'Berechtigte Produktseiten zeigen die aktuelle Einzelhandelsverfügbarkeit, den Preis und den Kaufweg. Die Produktseite ist die maßgebliche Quelle.',
    b2bTitle: 'B2B- und OEM/ODM-Anfrage', b2bDescription: 'Für Großhandel, Private Label oder Projektanforderungen fordern Sie ein Angebot an, um Umfang, kaufmännische Bedingungen und Lieferoptionen zu bestätigen.',
    infoTitle: 'Produktinformationen', infoDescription: 'Prüfen Sie verfügbare Spezifikationen, Produktbilder und Unterlagen, bevor Sie den Einzelhandels- oder B2B-Weg wählen.',
    termsTitle: 'Bestelldetails je Produkt', termsDescription: 'Die Einzelhandelsverfügbarkeit wird je Produkt angezeigt. MOQ, Anpassung, Lieferzeit und zielortspezifische Konditionen werden über die B2B-Anfrage bestätigt.',
    storyTitle: 'Über HousePlus Group', story: 'HousePlus Group unterstützt Einzelhandelskunden und professionelle Käufer in den Bereichen Solarsysteme, Haushaltsgeräte und 3C-Elektronik.',
    storyDetail: 'Seit 2010 verfügt HousePlus über 20.000 m² Produktionsfläche und unterstützt 441+ Großhandelskunden in 53+ Ländern und Märkten.',
    categoriesTitle: 'Produktkategorien entdecken', categoriesDescription: 'Beginnen Sie mit der Kategorie für Ihren Einzelhandelskauf oder B2B-Beschaffungsbedarf.',
    categoryItems: [
      { title: 'Solarenergiesysteme', description: 'Module, Wechselrichter, Batterien, Laderegler und tragbare Energielösungen.' },
      { title: 'Haushaltsgeräte', description: 'Küchen- und Haushaltskategorien für Einzelhandelsauswahl und Beschaffungsgespräche.' },
      { title: '3C-Elektronik', description: 'Unterhaltungselektronik und Zubehör für Einzelhandel oder B2B/OEM-Anforderungen.' },
    ],
    supportTitle: 'Ein Klarer Weg für Jeden Käufer', supportDescription: 'Nutzen Sie die Produktseite für die aktuelle Einzelhandelsverfügbarkeit. Für Mengen, Branding, Verpackung, Unterlagen oder zielortspezifische Anforderungen kontaktieren Sie HousePlus für ein B2B/OEM-Angebot.',
    ctaTitle: 'Den Passenden Kaufweg Finden', ctaDescription: 'Durchsuchen Sie Produkte nach verfügbaren Einzelhandelsoptionen oder kontaktieren Sie HousePlus für B2B/OEM-Beschaffung und ein Angebot.',
    browse: 'Produkte Ansehen', contact: 'B2B/OEM Kontakt', about: 'Über HousePlus',
  },
  fr: {
    title: 'HousePlus | Produits Retail et Approvisionnement B2B/OEM',
    description: 'HousePlus prend en charge l’achat direct au détail et l’approvisionnement B2B/OEM de systèmes solaires, électroménager et électronique 3C. Depuis 2010 : 20 000 m² de production, plus de 441 clients grossistes et plus de 53 marchés.',
    eyebrow: 'HousePlus Group', headline: 'Produits Retail et Approvisionnement B2B/OEM',
    subtitle: 'Choisissez l’achat direct pour les produits éligibles ou démarrez un échange B2B/OEM pour l’approvisionnement, la personnalisation et les besoins de projet.',
    retailTitle: 'Achat Direct au Détail', retailDescription: 'Les pages produit éligibles affichent la disponibilité retail, le prix et le parcours d’achat actuels. La page produit est la source de vérité.',
    b2bTitle: 'Demande B2B et OEM/ODM', b2bDescription: 'Pour le gros, la marque privée ou un projet, demandez un devis pour confirmer le périmètre, les conditions commerciales et les options de livraison.',
    infoTitle: 'Informations Produit', infoDescription: 'Consultez les spécifications, images et documents disponibles avant de choisir un parcours retail ou B2B.',
    termsTitle: 'Détails de Commande par Produit', termsDescription: 'La disponibilité retail est affichée par produit. MOQ, personnalisation, délai et conditions par destination sont confirmés via la demande B2B.',
    storyTitle: 'À Propos de HousePlus Group', story: 'HousePlus Group accompagne les clients retail et les acheteurs professionnels pour les systèmes solaires, l’électroménager et l’électronique 3C.',
    storyDetail: 'Depuis 2010, HousePlus maintient 20 000 m² de production et accompagne plus de 441 clients grossistes dans plus de 53 pays et marchés.',
    categoriesTitle: 'Explorer les Catégories de Produits', categoriesDescription: 'Commencez par la catégorie adaptée à votre achat retail ou à votre besoin d’approvisionnement B2B.',
    categoryItems: [
      { title: 'Systèmes d’Énergie Solaire', description: 'Panneaux, onduleurs, batteries, régulateurs et solutions d’énergie portables.' },
      { title: 'Électroménager', description: 'Catégories cuisine et maison pour la sélection retail et les échanges d’approvisionnement.' },
      { title: 'Électronique 3C', description: 'Électronique grand public et accessoires pour l’achat retail ou les besoins B2B/OEM.' },
    ],
    supportTitle: 'Un Parcours Clair pour Chaque Acheteur', supportDescription: 'Utilisez la page produit pour la disponibilité retail actuelle. Pour les volumes, la marque, l’emballage, les documents ou les besoins par destination, contactez HousePlus pour un devis B2B/OEM.',
    ctaTitle: 'Choisir le Bon Parcours d’Achat', ctaDescription: 'Parcourez les produits pour voir les options retail disponibles ou contactez HousePlus pour l’approvisionnement B2B/OEM et un devis.',
    browse: 'Voir les Produits', contact: 'Contact B2B/OEM', about: 'À Propos de HousePlus',
  },
  ar: {
    title: 'هاوس بلس | منتجات التجزئة وتوريد B2B/OEM',
    description: 'تدعم هاوس بلس الشراء المباشر بالتجزئة وتوريد B2B/OEM لأنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C. منذ 2010: مساحة إنتاج 20,000 م²، وأكثر من 441 عميلاً بالجملة و53+ سوقاً.',
    eyebrow: 'مجموعة هاوس بلس', headline: 'منتجات التجزئة وتوريد B2B/OEM',
    subtitle: 'اختر الشراء المباشر للمنتجات المؤهلة أو ابدأ مناقشة B2B/OEM للتوريد والتخصيص ومتطلبات المشاريع.',
    retailTitle: 'شراء تجزئة مباشر', retailDescription: 'تعرض صفحات المنتجات المؤهلة توفر التجزئة والسعر ومسار الشراء الحالي. وتبقى صفحة المنتج المصدر المرجعي.',
    b2bTitle: 'استفسار B2B وOEM/ODM', b2bDescription: 'للجملة أو العلامة الخاصة أو متطلبات المشاريع، اطلب عرض سعر لتأكيد النطاق والشروط التجارية وخيارات التسليم.',
    infoTitle: 'معلومات المنتج', infoDescription: 'راجع المواصفات وصور المنتج والوثائق المتاحة قبل اختيار مسار التجزئة أو B2B.',
    termsTitle: 'تفاصيل الطلب حسب المنتج', termsDescription: 'يُعرض توفر التجزئة لكل منتج. ويتم تأكيد MOQ والتخصيص ومدة التسليم والشروط الخاصة بالوجهة من خلال استفسار B2B.',
    storyTitle: 'عن مجموعة هاوس بلس', story: 'تدعم مجموعة هاوس بلس عملاء التجزئة والمشترين المحترفين في أنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C.',
    storyDetail: 'منذ 2010، تحافظ هاوس بلس على مساحة إنتاج تبلغ 20,000 م² وتدعم أكثر من 441 عميلاً بالجملة في 53+ دولة وسوقاً.',
    categoriesTitle: 'استكشف فئات المنتجات', categoriesDescription: 'ابدأ بفئة المنتج المناسبة لشرائك بالتجزئة أو لمتطلبات التوريد B2B.',
    categoryItems: [
      { title: 'أنظمة الطاقة الشمسية', description: 'ألواح ومحولات وبطاريات ووحدات تحكم بالشحن وحلول طاقة محمولة.' },
      { title: 'الأجهزة المنزلية', description: 'فئات للمطبخ والمنزل للاختيار بالتجزئة ومناقشات التوريد.' },
      { title: 'إلكترونيات 3C', description: 'إلكترونيات استهلاكية وملحقات للشراء بالتجزئة أو متطلبات B2B/OEM.' },
    ],
    supportTitle: 'مسار واضح لكل مشترٍ', supportDescription: 'استخدم صفحة المنتج لمعرفة توفر التجزئة الحالي. وللكميات أو العلامة التجارية أو التعبئة أو الوثائق أو متطلبات الوجهة، تواصل مع هاوس بلس للحصول على عرض B2B/OEM.',
    ctaTitle: 'اعثر على مسار الشراء المناسب', ctaDescription: 'تصفح المنتجات للاطلاع على خيارات التجزئة المتاحة أو تواصل مع هاوس بلس لتوريد B2B/OEM والحصول على عرض سعر.',
    browse: 'تصفح المنتجات', contact: 'تواصل لـ B2B/OEM', about: 'عن هاوس بلس',
  },
};

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const current = copy[params.lang] || copy.en;
  return generateSEOMetadata({
    title: current.title,
    description: current.description,
    keywords: ['HousePlus', 'retail products', 'B2B manufacturer', 'OEM ODM', 'solar systems', 'home appliances', '3C electronics'],
    url: `/${params.lang}/brand`,
    lang: params.lang as any,
    type: 'website',
  });
}

export default async function BrandPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = validLangs.includes(params.lang) ? params.lang : 'en';
  const current = copy[lang];
  const facts = getCompanyFacts(lang);
  const isRTL = lang === 'ar';
  const organizationSchema = generateOrganizationSchema({ title: 'HousePlus Group', description: current.description, url: `https://www.houseplus-ch.com/${lang}/brand`, lang, type: 'Organization' });
  const webPageSchema = {
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': `https://www.houseplus-ch.com/${lang}/brand#webpage`,
    url: `https://www.houseplus-ch.com/${lang}/brand`, name: current.title, description: current.description, inLanguage: lang,
    isPartOf: { '@id': 'https://www.houseplus-ch.com/#website' }, about: { '@id': 'https://www.houseplus-ch.com/#organization' },
  };

  return (
    <>
      <SEOHead schemas={[organizationSchema, generateWebSiteSchema(lang), webPageSchema]} />
      <main className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <section className="max-w-6xl mx-auto px-4 py-6"><Breadcrumb lang={lang} slug="brand" /></section>
        <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center mb-8 rounded-3xl bg-white p-4 shadow-xl shadow-blue-100/80 ring-1 ring-blue-100">
                <Image src="https://images.houseplus-ch.com/media/houseplus-group-logo/" alt="HousePlus Group logo" title="HousePlus Group official logo" width={709} height={709} sizes="(max-width: 767px) 72px, 96px" className="h-[72px] w-[72px] object-contain md:h-24 md:w-24" priority />
              </div>
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">{current.eyebrow}</span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">{current.headline}</h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">{current.subtitle}</p>
              <div className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end' : ''}`}>
                <Link href={`/${lang}/products`} className="px-7 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">{current.browse}</Link>
                <Link href={`/${lang}/contact`} className="px-7 py-3.5 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">{current.contact}</Link>
              </div>
            </div>
            <figure className="relative min-h-80 h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
              <Image src="https://images.houseplus-ch.com/media/houseplus-factory-production-line/" alt="HousePlus product manufacturing environment" title="HousePlus manufacturing environment" fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs px-4 py-3">HousePlus Group</figcaption>
            </figure>
          </div>
        </section>
        <section className="py-14 bg-blue-700"><div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">{[
          { value: facts.factoryArea, label: facts.labels[0] }, { value: facts.manufacturingSince, label: facts.labels[1] },
          { value: facts.wholesaleClients, label: facts.labels[2] }, { value: facts.markets, label: facts.labels[3] },
        ].map((stat) => <div key={stat.label}><p className="text-3xl md:text-5xl font-black mb-2">{stat.value}</p><p className="text-blue-200 text-sm font-medium">{stat.label}</p></div>)}</div></section>
        <section className="py-16 px-4"><div className="max-w-5xl mx-auto text-center"><h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{current.storyTitle}</h2><p className="text-lg text-slate-600 leading-relaxed mb-4">{current.story}</p><p className="text-lg text-slate-600 leading-relaxed">{current.storyDetail}</p></div></section>
        <section className="py-16 px-4 bg-slate-50"><div className="max-w-6xl mx-auto"><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[
          { title: current.retailTitle, description: current.retailDescription }, { title: current.b2bTitle, description: current.b2bDescription },
          { title: current.infoTitle, description: current.infoDescription }, { title: current.termsTitle, description: current.termsDescription },
        ].map((item) => <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm"><h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2><p className="text-slate-600 leading-relaxed">{item.description}</p></div>)}</div></div></section>
        <section className="py-16 px-4"><div className="max-w-6xl mx-auto"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{current.categoriesTitle}</h2><p className="text-slate-600 max-w-2xl mx-auto">{current.categoriesDescription}</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{current.categoryItems.map((item) => <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm"><h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3><p className="text-slate-600 text-sm leading-relaxed">{item.description}</p></div>)}</div></div></section>
        <section className="py-16 px-4 bg-blue-50"><div className="max-w-4xl mx-auto text-center"><h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{current.supportTitle}</h2><p className="text-slate-600 leading-relaxed">{current.supportDescription}</p></div></section>
        <section className="py-20 px-4"><div className="max-w-4xl mx-auto text-center"><h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{current.ctaTitle}</h2><p className="text-slate-600 mb-8 leading-relaxed">{current.ctaDescription}</p><div className="flex flex-wrap justify-center gap-4"><Link href={`/${lang}/about-us`} className="px-7 py-3.5 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all">{current.about}</Link><Link href={`/${lang}/products`} className="px-7 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">{current.browse}</Link><Link href={`/${lang}/contact`} className="px-7 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">{current.contact}</Link></div></div></section>
      </main>
    </>
  );
}
