import Carousel from '@/components/Carousel';
import IndustrySection from '@/components/IndustrySection';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema-generator';
import { getDictionary } from '@/lib/i18n-config';
import { r2MediaUrl } from '@/lib/r2-media-map';
import { getCompanyFacts } from '@/lib/company-facts';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

const localizedHomeCopy = {
  en: {
    tagline: 'HousePlus · B2B sourcing support',
    title: 'Solar, Home Appliance & 3C Supply for B2B Buyers',
    description: 'Explore HousePlus product categories and request product documentation, customisation scope and a quotation based on your requirements.',
    browseProducts: 'Browse Products', requestQuote: 'Request a Quote',
    categories: [
      { title: 'Solar Energy Systems', description: 'Panels, inverters, energy storage and accessories for B2B sourcing.', buttonText: 'Explore Solar Products' },
      { title: 'Home Appliances', description: 'Kitchen and household product categories for wholesale and private-label discussions.', buttonText: 'Explore Home Appliances' },
      { title: '3C Electronics', description: 'Consumer electronics and accessories with product documentation available on request.', buttonText: 'Explore 3C Electronics' },
    ],
    whyTitle: 'Designed for Professional Procurement', whySubtitle: 'Use product information and a quotation to confirm the requirements that matter for your market.',
    features: [
      { icon: 'Documents', title: 'Product Information', desc: 'Request specifications, images and available documentation for the products you are evaluating.' },
      { icon: 'Scope', title: 'OEM/ODM Discussion', desc: 'Discuss branding, packaging and product modification requirements with the HousePlus team.' },
      { icon: 'Quote', title: 'Quote-Led Coordination', desc: 'Commercial terms, production planning and delivery options are confirmed for your specific request.' },
    ],
  },
  es: {
    tagline: 'HousePlus · apoyo para compras B2B', title: 'Suministro Solar, Electrodomésticos y 3C para Compradores B2B',
    description: 'Explore las categorías de HousePlus y solicite documentación, alcance de personalización y una cotización según sus requisitos.',
    browseProducts: 'Ver Productos', requestQuote: 'Solicitar Cotización',
    categories: [
      { title: 'Sistemas de Energía Solar', description: 'Paneles, inversores, almacenamiento y accesorios para compras B2B.', buttonText: 'Ver Productos Solares' },
      { title: 'Electrodomésticos', description: 'Categorías de cocina y hogar para mayoristas y conversaciones de marca privada.', buttonText: 'Ver Electrodomésticos' },
      { title: 'Electrónica 3C', description: 'Electrónica de consumo y accesorios con documentación disponible bajo solicitud.', buttonText: 'Ver Electrónica 3C' },
    ],
    whyTitle: 'Diseñado para Compras Profesionales', whySubtitle: 'Use la información de producto y una cotización para confirmar los requisitos de su mercado.',
    features: [
      { icon: 'Documentos', title: 'Información del Producto', desc: 'Solicite especificaciones, imágenes y documentación disponible para los productos evaluados.' },
      { icon: 'Alcance', title: 'Conversación OEM/ODM', desc: 'Hable de marca, empaque y requisitos de modificación con el equipo HousePlus.' },
      { icon: 'Cotización', title: 'Coordinación por Cotización', desc: 'Las condiciones comerciales y opciones de entrega se confirman para su solicitud específica.' },
    ],
  },
  de: {
    tagline: 'HousePlus · Unterstützung für B2B-Beschaffung', title: 'Solar-, Haushalts- und 3C-Produkte für B2B-Einkäufer',
    description: 'Entdecken Sie HousePlus Produktkategorien und fordern Sie Unterlagen, den Anpassungsumfang und ein Angebot für Ihre Anforderungen an.',
    browseProducts: 'Produkte ansehen', requestQuote: 'Angebot anfragen',
    categories: [
      { title: 'Solarenergiesysteme', description: 'Module, Wechselrichter, Speicher und Zubehör für die B2B-Beschaffung.', buttonText: 'Solarprodukte ansehen' },
      { title: 'Haushaltsgeräte', description: 'Küchen- und Haushaltskategorien für Großhandel und Private-Label-Gespräche.', buttonText: 'Haushaltsgeräte ansehen' },
      { title: '3C-Elektronik', description: 'Unterhaltungselektronik und Zubehör mit Unterlagen auf Anfrage.', buttonText: '3C-Elektronik ansehen' },
    ],
    whyTitle: 'Für Professionelle Beschaffung Konzipiert', whySubtitle: 'Nutzen Sie Produktinformationen und ein Angebot, um die Anforderungen Ihres Marktes zu bestätigen.',
    features: [
      { icon: 'Unterlagen', title: 'Produktinformationen', desc: 'Fordern Sie Spezifikationen, Bilder und verfügbare Unterlagen für geprüfte Produkte an.' },
      { icon: 'Umfang', title: 'OEM/ODM-Gespräch', desc: 'Besprechen Sie Branding, Verpackung und Produktanpassungen mit dem HousePlus Team.' },
      { icon: 'Angebot', title: 'Angebotsbasierte Abstimmung', desc: 'Kaufmännische Bedingungen und Lieferoptionen werden für Ihre konkrete Anfrage bestätigt.' },
    ],
  },
  fr: {
    tagline: 'HousePlus · accompagnement achats B2B', title: 'Solaire, Électroménager et 3C pour Acheteurs B2B',
    description: 'Découvrez les catégories HousePlus et demandez la documentation, le périmètre de personnalisation et un devis selon vos besoins.',
    browseProducts: 'Voir les Produits', requestQuote: 'Demander un Devis',
    categories: [
      { title: 'Systèmes d’Énergie Solaire', description: 'Panneaux, onduleurs, stockage et accessoires pour l’approvisionnement B2B.', buttonText: 'Voir le Solaire' },
      { title: 'Électroménager', description: 'Catégories cuisine et maison pour grossistes et projets de marque privée.', buttonText: 'Voir l’Électroménager' },
      { title: 'Électronique 3C', description: 'Électronique grand public et accessoires avec documentation disponible sur demande.', buttonText: 'Voir l’Électronique 3C' },
    ],
    whyTitle: 'Pensé pour les Achats Professionnels', whySubtitle: 'Utilisez les informations produit et un devis pour confirmer les exigences de votre marché.',
    features: [
      { icon: 'Documents', title: 'Informations Produit', desc: 'Demandez caractéristiques, images et documentation disponible pour les produits évalués.' },
      { icon: 'Périmètre', title: 'Échange OEM/ODM', desc: 'Discutez de la marque, de l’emballage et des modifications produit avec HousePlus.' },
      { icon: 'Devis', title: 'Coordination par Devis', desc: 'Les conditions commerciales et options de livraison sont confirmées pour votre demande.' },
    ],
  },
  ar: {
    tagline: 'HousePlus · دعم التوريد بين الشركات', title: 'توريد الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C لمشتري B2B',
    description: 'استكشف فئات منتجات HousePlus واطلب وثائق المنتج ونطاق التخصيص وعرض سعر وفقًا لمتطلباتك.',
    browseProducts: 'تصفح المنتجات', requestQuote: 'اطلب عرض سعر',
    categories: [
      { title: 'أنظمة الطاقة الشمسية', description: 'ألواح ومحولات وتخزين طاقة وملحقات للتوريد بين الشركات.', buttonText: 'استكشف المنتجات الشمسية' },
      { title: 'الأجهزة المنزلية', description: 'فئات للمطبخ والمنزل لتجارة الجملة ومناقشات العلامة الخاصة.', buttonText: 'استكشف الأجهزة المنزلية' },
      { title: 'إلكترونيات 3C', description: 'إلكترونيات استهلاكية وملحقات مع وثائق متاحة عند الطلب.', buttonText: 'استكشف إلكترونيات 3C' },
    ],
    whyTitle: 'مصمم للمشتريات الاحترافية', whySubtitle: 'استخدم معلومات المنتج وعرض السعر لتأكيد متطلبات سوقك.',
    features: [
      { icon: 'وثائق', title: 'معلومات المنتج', desc: 'اطلب المواصفات والصور والوثائق المتاحة للمنتجات التي تقيمها.' },
      { icon: 'نطاق', title: 'مناقشة OEM/ODM', desc: 'ناقش العلامة التجارية والتعبئة وتعديلات المنتج مع فريق HousePlus.' },
      { icon: 'عرض سعر', title: 'تنسيق قائم على العرض', desc: 'تُؤكد الشروط التجارية وخيارات التسليم لطلبك المحدد.' },
    ],
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  if (!validLangs.includes(lang)) {
    return {};
  }
  const copy = localizedHomeCopy[lang as keyof typeof localizedHomeCopy] || localizedHomeCopy.en;
  return generateSEOMetadata({
    title: copy.title,
    description: copy.description,
    keywords: ['solar energy', 'home appliances', '3C electronics', 'B2B', 'OEM', 'ODM'],
    url: `/${lang}`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function LangHome({ params }: { params: { lang: string } }) {
  const { lang } = params;
  if (!validLangs.includes(lang)) {
    notFound();
  }
  const dict = await getDictionary(lang);
  const copy = localizedHomeCopy[lang as keyof typeof localizedHomeCopy] || localizedHomeCopy.en;
  const facts = getCompanyFacts(lang);
  const defaultCarouselItems = dict.home.carousel.map((item, index) => ({
    _uid: String(index + 1),
    image: {
      filename: r2MediaUrl(`/images/carousel/${['houseplus-solar-hero.jpg', 'houseplus-home-appliances-hero.jpg', 'houseplus-3c-electronics-hero.jpg'][index]}`),
      alt: item.imageAlt
    },
    title: item.title,
    subtitle: item.subtitle,
    button_text: item.buttonText,
    button_link: { url: '/products', cached_url: '/products' }
  }));

  // The published CMS carousel still references the legacy, mismatched image set.
  // Keep the homepage hero self-hosted and versioned with this repository so the
  // image-to-category mapping is deterministic in every deployed language.
  const displayCarouselItems = defaultCarouselItems;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: dict.site.description,
    url: `https://www.houseplus-ch.com/${lang}`,
    lang,
    type: 'Organization',
  });

  const webSiteSchema = generateWebSiteSchema(lang);

  return (
    <>
      <SEOHead schemas={[organizationSchema, webSiteSchema]} />
      <main className="min-h-screen bg-white">
        <section className="w-full">
          <Carousel items={displayCarouselItems} autoPlayInterval={5000} lang={lang} />
        </section>

        <section className="py-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center justify-center mb-8 rounded-3xl bg-white px-8 py-5 shadow-xl shadow-blue-100/80 ring-1 ring-blue-100">
              <img
                src="https://images.houseplus-ch.com/media/houseplus-group-logo/"
                alt="HousePlus logo"
                title="HousePlus global wholesale manufacturer logo"
                className="h-16 w-auto object-contain md:h-20"
               decoding="async" />
            </div>
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              {copy.tagline}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
              {copy.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              {copy.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                {copy.browseProducts}
              </Link>
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                {copy.requestQuote}
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-blue-100 bg-white px-4 py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
            {[facts.factoryArea, facts.manufacturingSince, facts.wholesaleClients, facts.markets].map((value, index) => (
              <div key={facts.labels[index]} className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 text-center">
                <p className="text-2xl font-black text-blue-700 md:text-3xl">{value}</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">{facts.labels[index]}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-0">
          {copy.categories.map((industry, index) => (
            <IndustrySection
              key={index}
              title={industry.title}
              description={industry.description}
              image={{ filename: ['https://images.houseplus-ch.com/media/houseplus-solar-panel-1-wholesale/', 'https://images.houseplus-ch.com/media/houseplus-home-home-appliances-collection-b/', 'https://images.houseplus-ch.com/media/houseplus-headphone-over-ear-wholesale/'][index], alt: industry.title }}
              industry_type={['solar', 'appliances', 'electronics'][index] as 'solar' | 'appliances' | 'electronics'}
              button_link={`/${lang}/products?category=${['solar', 'home-appliances', '3c-electronics'][index]}`}
              button_text={industry.buttonText}
            />
          ))}
        </div>

        <section className="py-20 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{copy.whyTitle}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">{copy.whySubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {copy.features.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
