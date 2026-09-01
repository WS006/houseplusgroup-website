import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateArticleSchema } from '@/lib/schema-generator';
import RelatedProducts from '@/components/RelatedProducts';
import ArticleMeta from '@/components/ArticleMeta';
import ArticleFeatureImage from '@/components/ArticleFeatureImage';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamicParams = false;

const ctaCopy: Record<string, { title: string; description: string; contact: string; back: string }> = {
  en: { title: 'Procure Smart Home Appliances with HousePlus', description: 'Contact our team for 2026 smart appliance catalog and pricing. MOQ from 100 pcs, flexible OEM/ODM, CE/FCC/RoHS certified, 20–35 day lead time.', contact: 'Contact HousePlus', back: '← Back to all News & Insights' },
  es: { title: 'Adquiera electrodomésticos inteligentes con HousePlus', description: 'Contacte con nuestro equipo para recibir el catálogo y precios de electrodomésticos inteligentes 2026. MOQ desde 100 unidades, OEM/ODM flexible, certificación CE/FCC/RoHS y plazo de 20–35 días.', contact: 'Contactar a HousePlus', back: '← Volver a todas las noticias y análisis' },
  de: { title: 'Smarte Haushaltsgeräte mit HousePlus beschaffen', description: 'Kontaktieren Sie unser Team für den Katalog und Preise für smarte Haushaltsgeräte 2026. MOQ ab 100 Stück, flexibles OEM/ODM, CE/FCC/RoHS-zertifiziert und 20–35 Tage Lieferzeit.', contact: 'HousePlus kontaktieren', back: '← Zurück zu allen News und Insights' },
  fr: { title: 'Approvisionnez-vous en appareils intelligents avec HousePlus', description: 'Contactez notre équipe pour recevoir le catalogue et les prix des appareils intelligents 2026. MOQ à partir de 100 pièces, OEM/ODM flexible, certification CE/FCC/RoHS et délai de 20 à 35 jours.', contact: 'Contacter HousePlus', back: '← Retour à toutes les actualités et analyses' },
  ar: { title: 'اشترِ الأجهزة المنزلية الذكية من هاوس بلس', description: 'تواصل مع فريقنا للحصول على كتالوج وأسعار الأجهزة الذكية لعام 2026. الحد الأدنى للطلب يبدأ من 100 قطعة، مع OEM/ODM مرن وشهادات CE وFCC وRoHS ومدة توريد 20–35 يوماً.', contact: 'تواصل مع هاوس بلس', back: '← العودة إلى جميع الأخبار والرؤى' },
};

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'Discover the latest solar energy innovations from HousePlus in 2026, including high-efficiency panels, advanced battery storage, and integrated smart solutions for B2B clients worldwide.',
    es: 'Descubre las últimas innovaciones en energía solar de HousePlus en 2026, incluyendo paneles de alta eficiencia, almacenamiento de baterías avanzado y soluciones inteligentes integradas para clientes B2B en todo el mundo.',
    de: 'Entdecke die neuesten Innovationen in der Solarenergie von HousePlus im 2026, darunter hocheffiziente Module, fortschrittliche Batteriespeicher und integrierte intelligente Lösungen für B2B-Kunden weltweit.',
    fr: 'Tendances du marché mondial des appareils électroménagers intelligents 2026 et guide d\'approvisionnement B2B',
    ar: 'اكتشف أحدث ابتكارات الطاقة الشمسية من HousePlus في 2026، بما في ذلك الألواح عالية الكفاءة، وتخزين البطاريات المتقدم، والحلول الذكية المتكاملة لعملاء B2B في جميع أنحاء العالم.',
  };

  const descriptions: Record<string, string> = {
    en: 'Discover the latest solar energy innovations from HousePlus in 2026, including high-efficiency panels, advanced battery storage, and integrated smart solutions for B2B clients worldwide.',
    es: 'Descubre las últimas innovaciones en energía solar de HousePlus en 2026, incluyendo paneles de alta eficiencia, almacenamiento de baterías avanzado y soluciones inteligentes integradas para clientes B2B en todo el mundo.',
    de: 'Entdecke die neuesten Innovationen in der Solarenergie von HousePlus im 2026, darunter hocheffiziente Module, fortschrittliche Batteriespeicher und integrierte intelligente Lösungen für B2B-Kunden weltweit.',
    fr: 'Explorez les tendances clés qui façonnent le marché des appareils électroménagers intelligents en 2026, y compris l\'intégration de l\'IA, l\'efficacité énergétique et la fabrication durable. Un guide complet pour les acheteurs B2B de HousePlus.',
    ar: 'اكتشف أحدث ابتكارات الطاقة الشمسية من HousePlus في 2026، بما في ذلك الألواح عالية الكفاءة، وتخزين البطاريات المتقدم، والحلول الذكية المتكاملة لعملاء B2B في جميع أنحاء العالم.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ["solar energy", "solar panels", "battery storage", "renewable energy", "B2B procurement", "HousePlus"],
    url: `/${lang}/news/2026-solar-market-update`,
    lang: lang as any,
    type: 'article',
  });
}

const articleContent: Record<string, any> = {
  en: {
    title: 'Solar Energy Innovations in 2026: HousePlus Leading the Industry',
    authorName: 'HousePlus Editorial',
    datePublished: '2026-07-05',
    dateModified: '2026-07-05',
    heroImage: 'https://images.houseplus-ch.com/articles/solar/solar-energy-farm-panels.jpg',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions for B2B wholesale',
    sections: [
      {
        heading: 'Introduction: Industry Trends in 2026',
        text: 'The market continues to evolve in 2026, with HousePlus at the forefront of innovation. This article explores our latest developments and what they mean for B2B buyers worldwide.'
      },
      {
        heading: 'Product Innovation and Quality',
        text: 'HousePlus maintains rigorous quality standards and innovative design approaches. All products meet international certifications including CE, FCC, RoHS, and ISO 9001.'
      },
      {
        heading: 'Global Market Strategy',
        text: 'HousePlus serves clients across Africa, Asia, Europe, and the Americas. Our OEM and ODM services provide flexible solutions for distributors and brand owners.'
      },
      {
        heading: 'Sustainability Commitment',
        text: 'We are committed to sustainable manufacturing practices, energy-efficient products, and reducing environmental impact throughout the supply chain.'
      },
      {
        heading: 'Why Partner with HousePlus',
        text: 'With competitive pricing, reliable quality, comprehensive after-sales support, and flexible MOQ options, HousePlus is your trusted partner for undefined products.'
      }
    ]
  },
  es: {
    title: 'Innovaciones en Energía Solar en 2026: HousePlus Liderando la Industria',
    authorName: 'HousePlus Editorial',
    datePublished: '2026-07-05',
    dateModified: '2026-07-05',
    heroImage: 'https://images.houseplus-ch.com/articles/solar/solar-energy-farm-panels.jpg',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions for B2B wholesale',
    sections: [
      {
        heading: 'Introducción: Tendencias de la Industria en 2026',
        text: 'El mercado continúa evolucionando en 2026, con HousePlus a la vanguardia de la innovación. Este artículo explora nuestros últimos desarrollos y lo que significan para los compradores B2B en todo el mundo.'
      },
      {
        heading: 'Innovación de Productos y Calidad',
        text: 'HousePlus mantiene rigurosos estándares de calidad y enfoques de diseño innovadores. Todos los productos cumplen con certificaciones internacionales incluyendo CE, FCC, RoHS e ISO 9001.'
      },
      {
        heading: 'Estrategia de Mercado Global',
        text: 'HousePlus sirve a clientes en África, Asia, Europa y las Américas. Nuestros servicios OEM y ODM proporcionan soluciones flexibles para distribuidores y propietarios de marcas.'
      },
      {
        heading: 'Compromiso con la Sostenibilidad',
        text: 'Estamos comprometidos con prácticas de fabricación sostenible, productos eficientes energéticamente y la reducción del impacto ambiental en toda la cadena de suministro.'
      },
      {
        heading: 'Por Qué Asociarse con HousePlus',
        text: 'Con precios competitivos, calidad confiable, soporte post-venta completo y opciones flexibles de MOQ, HousePlus es su socio de confianza para productos de undefined.'
      }
    ]
  },
  de: {
    title: 'Innovationen in der Solarenergie im 2026: HousePlus an der Spitze der Branche',
    authorName: 'HousePlus Editorial',
    datePublished: '2026-07-05',
    dateModified: '2026-07-05',
    heroImage: 'https://images.houseplus-ch.com/articles/solar/solar-energy-farm-panels.jpg',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions for B2B wholesale',
    sections: [
      {
        heading: 'Einführung: Branchentrends im 2026',
        text: 'Der Markt entwickelt sich im 2026 weiter, wobei HousePlus an der Spitze der Innovation steht. Dieser Artikel untersucht unsere neuesten Entwicklungen und was sie für B2B-Käufer weltweit bedeuten.'
      },
      {
        heading: 'Produktinnovation und Qualität',
        text: 'HousePlus hält strenge Qualitätsstandards und innovative Designansätze ein. Alle Produkte erfüllen internationale Zertifizierungen wie CE, FCC, RoHS und ISO 9001.'
      },
      {
        heading: 'Globale Marktstrategie',
        text: 'HousePlus bedient Kunden in Afrika, Asien, Europa und Amerika. Unsere OEM- und ODM-Dienste bieten flexible Lösungen für Distributoren und Markeninhaber.'
      },
      {
        heading: 'Nachhaltigkeitsverpflichtung',
        text: 'Wir sind nachhaltigen Herstellungsverfahren, energieeffizienten Produkten und der Reduktion der Umweltauswirkungen in der gesamten Lieferkette verpflichtet.'
      },
      {
        heading: 'Warum mit HousePlus zusammenarbeiten',
        text: 'Mit wettbewerbsfähigen Preisen, zuverlässiger Qualität, umfassendem Kundendienst und flexiblen MOQ-Optionen ist HousePlus Ihr vertrauenswürdiger Partner für undefined-Produkte.'
      }
    ]
  },
  fr: {
    title: 'Innovations en énergie solaire en 2026: HousePlus à la pointe de l\'industrie',
    authorName: 'HousePlus Editorial',
    datePublished: '2026-07-05',
    dateModified: '2026-07-05',
    heroImage: 'https://images.houseplus-ch.com/articles/solar/solar-energy-farm-panels.jpg',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions for B2B wholesale',
    sections: [
      {
        heading: 'Introduction: Tendances de l\'industrie en 2026',
        text: 'Le marché continue d\'évoluer en 2026, avec HousePlus à l\'avant-garde de l\'innovation. Cet article explore nos derniers développements et ce qu\'ils signifient pour les acheteurs B2B du monde entier.'
      },
      {
        heading: 'Innovation produit et qualité',
        text: 'HousePlus maintient des normes de qualité rigoureuses et des approches de conception innovantes. Tous les produits répondent aux certifications internationales, notamment CE, FCC, RoHS et ISO 9001.'
      },
      {
        heading: 'Stratégie de marché mondial',
        text: 'HousePlus dessert des clients en Afrique, Asie, Europe et Amériques. Nos services OEM et ODM fournissent des solutions flexibles pour les distributeurs et les propriétaires de marques.'
      },
      {
        heading: 'Engagement pour la durabilité',
        text: 'Nous nous engageons pour des pratiques de fabrication durables, des produits énergétiques et la réduction de l\'impact environnemental tout au long de la chaîne d\'approvisionnement.'
      },
      {
        heading: 'Pourquoi s\'associer à HousePlus',
        text: 'Avec des prix compétitifs, une qualité fiable, un support après-vente complet et des options MOQ flexibles, HousePlus est votre partenaire de confiance pour les produits undefined.'
      }
    ]
  },
  ar: {
    title: 'ابتكارات الطاقة الشمسية في 2026: HousePlus تقود الصناعة',
    authorName: 'HousePlus Editorial',
    datePublished: '2026-07-05',
    dateModified: '2026-07-05',
    heroImage: 'https://images.houseplus-ch.com/articles/solar/solar-energy-farm-panels.jpg',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions for B2B wholesale',
    sections: [
      {
        heading: 'مقدمة: اتجاهات الصناعة في 2026',
        text: 'يستمر السوق في التطور في 2026، مع HousePlus في طليعة الابتكار. يستكشف هذا المقال أحدث تطوراتنا وما تعنيه لمشتري B2B في جميع أنحاء العالم.'
      },
      {
        heading: 'الابتكار في المنتجات والجودة',
        text: 'تحافظ HousePlus على معايير جودة صارمة ونهج تصميم مبتكرة. جميع المنتجات تتوافق مع الشهادات الدولية بما في ذلك CE و FCC و RoHS و ISO 9001.'
      },
      {
        heading: 'استراتيجية السوق العالمية',
        text: 'تخدم HousePlus العملاء في أفريقيا وآسيا وأوروبا والأمريكتين. توفر خدماتنا OEM و ODM حلولاً مرنة للموزعين وأصحاب العلامات التجارية.'
      },
      {
        heading: 'الالتزام بالاستدامة',
        text: 'نحن ملتزمون بممارسات التصنيع المستدامة والمنتجات موفرة للطاقة وتقليل التأثير البيئي في جميع أنحاء سلسلة التوريد.'
      },
      {
        heading: 'لماذا تشارك مع HousePlus',
        text: 'مع أسعار تنافسية وجودة موثوقة ودعم شامل بعد البيع وخيارات MOQ مرنة، HousePlus هو شريكك الموثوق لمنتجات undefined.'
      }
    ]
  }
};

export default async function BlogPostPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const content = articleContent[lang] || articleContent.en;
  const cta = ctaCopy[lang] || ctaCopy.en;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
    { name: content.title, url: `/${lang}/news/2026-solar-market-update` },
  ];

  const articleSchema = generateArticleSchema({
    headline: content.title,
    image: content.heroImage,
    datePublished: content.datePublished,
    dateModified: content.dateModified,
    authorName: content.authorName,
    description: content.sections[0].text,
    url: `https://www.houseplus-ch.com/${lang}/news/2026-solar-market-update`,
  });

  return (
    <main className="min-h-screen bg-white">
      <SchemaRenderer schemas={[articleSchema]} />
      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 pb-20 pt-20 text-white md:pb-28 md:pt-28">
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <Breadcrumb lang={lang} customLabel={content.title} />
          <h1 className="text-3xl md:text-5xl font-black mt-6 mb-4 leading-tight">
            {content.title}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-6">
            {content.sections[0].text.split('.')[0] + '.'}
          </p>
          <div className="text-slate-400 text-sm">
            By {content.authorName} | Published on {content.datePublished}
          </div>
        </div>
      </header>

      <ArticleFeatureImage src={content.heroImage} alt={content.heroImageAlt} priority />

      <article className="max-w-4xl mx-auto py-16 px-4 prose prose-lg prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-li:text-slate-700 prose-strong:text-slate-900">
        <div className="max-w-3xl mx-auto px-4 mb-8">
          <ArticleMeta
            lang={lang}
            authorName={content.authorName}
            datePublished={content.datePublished}
            dateModified={content.dateModified}
          />
        </div>
        {content.sections.map((section: any, index: number) => (
          <div key={index}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
            {section.image && (
              <figure>
                <img src={section.image} alt={section.imageAlt || section.heading} title={section.heading} width={800} height={450} className="rounded-lg shadow-lg" loading="lazy"  decoding="async" />
                {section.imageCaption && <figcaption>{section.imageCaption}</figcaption>}
              </figure>
            )}
          </div>
        ))}
        <RelatedProducts lang={lang} slugs={['smart-wifi-plug-meter', 'air-fryer-5-8l', 'induction-cooktop-2000w', 'electric-kettle-1-5l']} />
      </article>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-3">{cta.title}</h3>
          <p className="text-blue-700 mb-6">{cta.description}</p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {cta.contact}
          </Link>
        </div>
      </div>

      <div className="text-center py-12 bg-slate-50 border-t border-slate-100">
        <Link href={`/${lang}/news`} className="text-blue-600 hover:text-blue-800 font-medium">
          {cta.back}
        </Link>
      </div>
    </main>
  );
}
