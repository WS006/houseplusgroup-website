import Carousel from '@/components/Carousel';
import IndustrySection from '@/components/IndustrySection';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema-generator';
import { getDictionary } from '@/lib/i18n-config';
import { r2MediaUrl } from '@/lib/r2-media-map';
import { getCompanyFacts } from '@/lib/company-facts';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

const localizedHomeCopy = {
  en: {
    tagline: 'HousePlus · Retail & B2B/OEM',
    title: 'Solar, Home Appliance & 3C Products for Retail and B2B',
    description: 'Explore eligible retail products or request product information, customisation scope and a B2B/OEM quotation for your requirements.',
    browseProducts: 'Browse Products', requestQuote: 'B2B/OEM Quote',
    categories: [
      { title: 'Solar Energy Systems', description: 'Panels, inverters, energy storage and accessories for retail selection or B2B sourcing.', buttonText: 'Explore Solar Products' },
      { title: 'Home Appliances', description: 'Kitchen and household product categories for direct purchase or wholesale discussions.', buttonText: 'Explore Home Appliances' },
      { title: '3C Electronics', description: 'Consumer electronics and accessories for retail purchase or B2B/OEM requirements.', buttonText: 'Explore 3C Electronics' },
    ],
    whyTitle: 'Retail Purchase and Professional Sourcing', whySubtitle: 'Use each product page for current retail availability, or request a quote for volume, customisation and project requirements.',
    features: [
      { icon: 'Retail', title: 'Retail Availability', desc: 'Eligible product pages show their current retail availability, price and purchase path.' },
      { icon: 'Scope', title: 'OEM/ODM Discussion', desc: 'Discuss branding, packaging and product modification requirements with the HousePlus team.' },
      { icon: 'Quote', title: 'Quote-Led Coordination', desc: 'Commercial terms, production planning and delivery options are confirmed for your specific request.' },
    ],
  },
  es: {
    tagline: 'HousePlus · Retail y B2B/OEM', title: 'Productos Solares, Electrodomésticos y 3C para Retail y B2B',
    description: 'Explore productos minoristas elegibles o solicite información, alcance de personalización y una cotización B2B/OEM según sus requisitos.',
    browseProducts: 'Ver Productos', requestQuote: 'Cotización B2B/OEM',
    categories: [
      { title: 'Sistemas de Energía Solar', description: 'Paneles, inversores, almacenamiento y accesorios para compras B2B.', buttonText: 'Ver Productos Solares' },
      { title: 'Electrodomésticos', description: 'Categorías de cocina y hogar para mayoristas y conversaciones de marca privada.', buttonText: 'Ver Electrodomésticos' },
      { title: 'Electrónica 3C', description: 'Electrónica de consumo y accesorios con documentación disponible bajo solicitud.', buttonText: 'Ver Electrónica 3C' },
    ],
    whyTitle: 'Compra Minorista y Abastecimiento Profesional', whySubtitle: 'Use cada página de producto para disponibilidad minorista actual o solicite cotización para volumen, personalización y proyectos.',
    features: [
      { icon: 'Retail', title: 'Disponibilidad Minorista', desc: 'Las páginas de productos elegibles muestran su disponibilidad, precio y ruta de compra actuales.' },
      { icon: 'Alcance', title: 'Conversación OEM/ODM', desc: 'Hable de marca, empaque y requisitos de modificación con el equipo HousePlus.' },
      { icon: 'Cotización', title: 'Coordinación por Cotización', desc: 'Las condiciones comerciales y opciones de entrega se confirman para su solicitud específica.' },
    ],
  },
  de: {
    tagline: 'HousePlus · Einzelhandel und B2B/OEM', title: 'Solar-, Haushalts- und 3C-Produkte für Einzelhandel und B2B',
    description: 'Entdecken Sie berechtigte Einzelhandelsprodukte oder fordern Sie Informationen, Anpassungsumfang und ein B2B/OEM-Angebot an.',
    browseProducts: 'Produkte ansehen', requestQuote: 'B2B/OEM-Angebot',
    categories: [
      { title: 'Solarenergiesysteme', description: 'Module, Wechselrichter, Speicher und Zubehör für die B2B-Beschaffung.', buttonText: 'Solarprodukte ansehen' },
      { title: 'Haushaltsgeräte', description: 'Küchen- und Haushaltskategorien für Großhandel und Private-Label-Gespräche.', buttonText: 'Haushaltsgeräte ansehen' },
      { title: '3C-Elektronik', description: 'Unterhaltungselektronik und Zubehör mit Unterlagen auf Anfrage.', buttonText: '3C-Elektronik ansehen' },
    ],
    whyTitle: 'Einzelhandel und Professionelle Beschaffung', whySubtitle: 'Nutzen Sie die Produktseite für aktuelle Einzelhandelsverfügbarkeit oder ein Angebot für Mengen, Anpassung und Projekte.',
    features: [
      { icon: 'Retail', title: 'Einzelhandelsverfügbarkeit', desc: 'Berechtigte Produktseiten zeigen ihre aktuelle Verfügbarkeit, ihren Preis und den Kaufweg.' },
      { icon: 'Umfang', title: 'OEM/ODM-Gespräch', desc: 'Besprechen Sie Branding, Verpackung und Produktanpassungen mit dem HousePlus Team.' },
      { icon: 'Angebot', title: 'Angebotsbasierte Abstimmung', desc: 'Kaufmännische Bedingungen und Lieferoptionen werden für Ihre konkrete Anfrage bestätigt.' },
    ],
  },
  fr: {
    tagline: 'HousePlus · Retail et B2B/OEM', title: 'Produits Solaires, Électroménager et 3C pour Retail et B2B',
    description: 'Découvrez les produits retail éligibles ou demandez informations, périmètre de personnalisation et devis B2B/OEM selon vos besoins.',
    browseProducts: 'Voir les Produits', requestQuote: 'Devis B2B/OEM',
    categories: [
      { title: 'Systèmes d’Énergie Solaire', description: 'Panneaux, onduleurs, stockage et accessoires pour l’approvisionnement B2B.', buttonText: 'Voir le Solaire' },
      { title: 'Électroménager', description: 'Catégories cuisine et maison pour grossistes et projets de marque privée.', buttonText: 'Voir l’Électroménager' },
      { title: 'Électronique 3C', description: 'Électronique grand public et accessoires avec documentation disponible sur demande.', buttonText: 'Voir l’Électronique 3C' },
    ],
    whyTitle: 'Achat Retail et Approvisionnement Professionnel', whySubtitle: 'Utilisez la page produit pour la disponibilité retail actuelle ou demandez un devis pour les volumes, la personnalisation et les projets.',
    features: [
      { icon: 'Retail', title: 'Disponibilité Retail', desc: 'Les pages produit éligibles affichent la disponibilité, le prix et le parcours d’achat actuels.' },
      { icon: 'Périmètre', title: 'Échange OEM/ODM', desc: 'Discutez de la marque, de l’emballage et des modifications produit avec HousePlus.' },
      { icon: 'Devis', title: 'Coordination par Devis', desc: 'Les conditions commerciales et options de livraison sont confirmées pour votre demande.' },
    ],
  },
  ar: {
    tagline: 'هاوس بلس · التجزئة وB2B/OEM', title: 'منتجات الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C للتجزئة وB2B',
    description: 'استكشف منتجات التجزئة المؤهلة أو اطلب معلومات المنتج ونطاق التخصيص وعرض سعر B2B/OEM وفقًا لمتطلباتك.',
    browseProducts: 'تصفح المنتجات', requestQuote: 'عرض B2B/OEM',
    categories: [
      { title: 'أنظمة الطاقة الشمسية', description: 'ألواح ومحولات وتخزين طاقة وملحقات للتوريد بين الشركات.', buttonText: 'استكشف المنتجات الشمسية' },
      { title: 'الأجهزة المنزلية', description: 'فئات للمطبخ والمنزل لتجارة الجملة ومناقشات العلامة الخاصة.', buttonText: 'استكشف الأجهزة المنزلية' },
      { title: 'إلكترونيات 3C', description: 'إلكترونيات استهلاكية وملحقات مع وثائق متاحة عند الطلب.', buttonText: 'استكشف إلكترونيات 3C' },
    ],
    whyTitle: 'شراء التجزئة والتوريد الاحترافي', whySubtitle: 'استخدم صفحة المنتج لمعرفة توفر التجزئة الحالي أو اطلب عرض سعر للكميات والتخصيص والمشاريع.',
    features: [
      { icon: 'Retail', title: 'توفر التجزئة', desc: 'تعرض صفحات المنتجات المؤهلة التوفر والسعر ومسار الشراء الحالي.' },
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
    keywords: ['solar energy', 'home appliances', '3C electronics', 'retail products', 'B2B', 'OEM', 'ODM'],
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
              <Image
                src="https://images.houseplus-ch.com/media/houseplus-group-logo/"
                alt="HousePlus logo"
                title="HousePlus official logo"
                width={709}
                height={709}
                sizes="(max-width: 767px) 64px, 80px"
                className="h-16 w-16 object-contain md:h-20 md:w-20"
                loading="lazy"
              />
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
