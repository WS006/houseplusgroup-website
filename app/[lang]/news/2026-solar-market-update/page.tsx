import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema-builder';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

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
    datePublished: '2026-03-08',
    dateModified: '2026-03-08',
    heroImage: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions',
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
    datePublished: '2026-03-08',
    dateModified: '2026-03-08',
    heroImage: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions',
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
    datePublished: '2026-03-08',
    dateModified: '2026-03-08',
    heroImage: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions',
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
    datePublished: '2026-03-08',
    dateModified: '2026-03-08',
    heroImage: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions',
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
    datePublished: '2026-03-08',
    dateModified: '2026-03-08',
    heroImage: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    heroImageAlt: 'HousePlus solar panels and energy storage solutions',
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

export default async function BlogPostPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const content = articleContent[lang] || articleContent.en;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
    { name: content.title, url: `/${lang}/news/2026-solar-market-update` },
  ];

  const articleSchema = buildArticleSchema({
    headline: content.title,
    image: content.heroImage,
    datePublished: content.datePublished,
    dateModified: content.dateModified,
    authorName: content.authorName,
    description: content.sections[0].text,
  }, {
    url: `https://www.houseplus-ch.com/${lang}/news/2026-solar-market-update`,
    lang,
  });

  return (
    <main className="min-h-screen bg-white">
      <SchemaRenderer schemas={[articleSchema, buildBreadcrumbSchema(breadcrumbs)]} />
      <div className="relative bg-slate-900 text-white py-20 md:py-32 px-4 overflow-hidden">
        <Image
          src={content.heroImage}
          alt={content.heroImageAlt}
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
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
      </div>

      <article className="max-w-4xl mx-auto py-16 px-4 prose prose-lg prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-li:text-slate-700 prose-strong:text-slate-900">
        {content.sections.map((section: any, index: number) => (
          <div key={index}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
            {section.image && (
              <figure>
                <Image src={section.image} alt={section.imageAlt || section.heading} width={800} height={450} className="rounded-lg shadow-lg" />
                {section.imageCaption && <figcaption>{section.imageCaption}</figcaption>}
              </figure>
            )}
          </div>
        ))}
      </article>

      <div className="text-center py-12 bg-slate-50 border-t border-slate-100">
        <Link href={`/${lang}/news`} className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to all News & Insights
        </Link>
      </div>
    </main>
  );
}
