import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { buildBreadcrumbSchema } from '@/lib/schema-builder';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: 'HousePlus News & Insights - Stay Updated with Industry Trends',
    es: 'Noticias y Perspectivas de HousePlus - Manténgase Actualizado con las Tendencias de la Industria',
    de: 'HousePlus Nachrichten & Einblicke - Bleiben Sie auf dem Laufenden über Branchentrends',
    fr: 'Actualités et Perspectives HousePlus - Restez informé des tendances de l\'industrie',
    ar: 'أخبار ورؤى HousePlus - ابق على اطلاع دائم باتجاهات الصناعة',
  };

  const descriptions: Record<string, string> = {
    en: 'Read the latest news, articles, and insights from HousePlus Group. Explore trends in solar energy, home appliances, and 3C electronics. Your source for industry knowledge and company updates.',
    es: 'Lea las últimas noticias, artículos y perspectivas de HousePlus Group. Explore las tendencias en energía solar, electrodomésticos y electrónica 3C. Su fuente de conocimiento de la industria y actualizaciones de la empresa.',
    de: 'Lesen Sie die neuesten Nachrichten, Artikel und Einblicke der HousePlus Group. Entdecken Sie Trends in Solarenergie, Haushaltsgeräten und 3C-Elektronik. Ihre Quelle für Branchenwissen und Unternehmensaktualisierungen.',
    fr: 'Lisez les dernières actualités, articles et analyses du groupe HousePlus. Explorez les tendances en matière d\'énergie solaire, d\'appareils électroménagers et d\'électronique 3C. Votre source de connaissances de l\'industrie et des mises à jour de l\'entreprise.',
    ar: 'اقرأ آخر الأخبار والمقالات والرؤى من مجموعة HousePlus. استكشف الاتجاهات في الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. مصدرك للمعرفة الصناعية وتحديثات الشركة.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ["news", "blog", "articles", "solar", "appliances", "electronics", "HousePlus", "industry trends"],
    url: `/${lang}/news`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
  ];

  const articles = [  {
    slug: '2026-solar-market-update',
    image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    imageAlt: 'HousePlus solar panels and energy storage solutions',
    title: {
    en: 'Solar Energy Innovations in 2026: HousePlus Leading the Industry',
    es: 'Innovaciones en Energía Solar en 2026: HousePlus Liderando la Industria',
    de: 'Innovationen in der Solarenergie im 2026: HousePlus an der Spitze der Branche',
    fr: 'Innovations en énergie solaire en 2026: HousePlus à la pointe de l'industrie',
    ar: 'ابتكارات الطاقة الشمسية في 2026: HousePlus تقود الصناعة',
    },
    description: {
    en: 'Discover the latest solar energy innovations from HousePlus in 2026, including high-efficiency panels, advanced battery storage, and integrated smart solutions for B2B clients worldwide.',
    es: 'Descubre las últimas innovaciones en energía solar de HousePlus en 2026, incluyendo paneles de alta eficiencia, almacenamiento de baterías avanzado y soluciones inteligentes integradas para clientes B2B en todo el mundo.',
    de: 'Entdecke die neuesten Innovationen in der Solarenergie von HousePlus im 2026, darunter hocheffiziente Module, fortschrittliche Batteriespeicher und integrierte intelligente Lösungen für B2B-Kunden weltweit.',
    fr: 'Découvrez les dernières innovations en énergie solaire de HousePlus en 2026, incluant des panneaux à haut rendement, un stockage par batterie avancé et des solutions intelligentes intégrées pour les clients B2B du monde entier.',
    ar: 'اكتشف أحدث ابتكارات الطاقة الشمسية من HousePlus في 2026، بما في ذلك الألواح عالية الكفاءة، وتخزين البطاريات المتقدم، والحلول الذكية المتكاملة لعملاء B2B في جميع أنحاء العالم.',
    },
    date: '2026-04-24',
  },
  {
    slug: '2026-electronics-market-update',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop',
    imageAlt: 'HousePlus 3C electronics product showcase',
    title: {
    en: '3C Electronics Trends 2026: HousePlus Wholesale Innovation',
    es: 'Tendencias en Electrónica 3C 2026: Innovación al por Mayor de HousePlus',
    de: '3C-Elektronik-Trends 2026: HousePlus-Großhandelsinnovation',
    fr: 'Tendances de l'électronique 3C 2026: Innovation en gros de HousePlus',
    ar: 'اتجاهات الإلكترونيات 3C 2026: ابتكار الجملة من HousePlus',
    },
    description: {
    en: 'Stay ahead in 2026 with HousePlus's latest 3C electronics - premium audio devices, smart wearables, and innovative power solutions for B2B distributors.',
    es: 'Mantente a la vanguardia en 2026 con los últimos productos de electrónica 3C de HousePlus: dispositivos de audio premium, wearables inteligentes y soluciones de energía innovadoras para distribuidores B2B.',
    de: 'Bleib im 2026 voraus mit den neuesten 3C-Elektronikprodukten von HousePlus – Premium-Audiogeräte, intelligente Wearables und innovative Stromlösungen für B2B-Distributoren.',
    fr: 'Restez en tête en 2026 avec les derniers produits d'électronique 3C de HousePlus - des appareils audio premium, des wearables intelligents et des solutions d'énergie innovantes pour les distributeurs B2B.',
    ar: 'ابق في المقدمة في 2026 مع أحدث إلكترونيات 3C من HousePlus - أجهزة صوتية عالية الجودة، وأجهزة قابلة للارتداء الذكية، وحلول طاقة مبتكرة لموزعي B2B.',
    },
    date: '2026-05-03',
  },

    {
      slug: '2026-smart-home-appliances-market-guide',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      imageAlt: 'Modern smart kitchen with integrated appliances, representing future home technology',
      title: {
        en: '2026 Global Smart Home Appliance Market Trends & B2B Procurement Guide',
        es: 'Tendencias del Mercado Global de Electrodomésticos Inteligentes 2026 y Guía de Adquisiciones B2B',
        de: 'Globale Smart-Home-Geräte-Markttrends 2026 & B2B-Beschaffungsleitfaden',
        fr: 'Tendances du marché mondial des appareils électroménagers intelligents 2026 et guide d\'approvisionnement B2B',
        ar: 'اتجاهات سوق الأجهزة المنزلية الذكية العالمية 2026 ودليل المشتريات B2B',
      },
      description: {
        en: 'Explore the key trends shaping the smart home appliance market in 2026, including AI integration, energy efficiency, and sustainable manufacturing. A comprehensive guide for B2B buyers from HousePlus.',
        es: 'Explore las tendencias clave que configuran el mercado de electrodomésticos inteligentes en 2026, incluida la integración de IA, la eficiencia energética y la fabricación sostenible. Una guía completa para compradores B2B de HousePlus.',
        de: 'Entdecken Sie die wichtigsten Trends, die den Markt für intelligente Haushaltsgeräte im Jahr 2026 prägen, einschließlich KI-Integration, Energieeffizienz und nachhaltiger Fertigung. Ein umfassender Leitfaden für B2B-Käufer von HousePlus.',
        fr: 'Explorez les tendances clés qui façonnent le marché des appareils électroménagers intelligents en 2026, y compris l\'intégration de l\'IA, l\'efficacité énergétique et la fabrication durable. Un guide complet pour les acheteurs B2B de HousePlus.',
        ar: 'استكشف الاتجاهات الرئيسية التي تشكل سوق الأجهزة المنزلية الذكية في عام 2026، بما في ذلك تكامل الذكاء الاصطناعي، وكفاءة الطاقة، والتصنيع المستدام. دليل شامل للمشترين B2B من HousePlus.',
      },
      date: '2026-05-15',
    },
    {
      slug: 'solar-energy-storage-industrial-manufacturing',
      image: 'https://images.unsplash.com/photo-1533745848-b8e668670500?w=800&h=600&fit=crop',
      imageAlt: 'Large industrial facility with solar panels on the roof and energy storage units, symbolizing sustainable manufacturing',
      title: {
        en: 'Solar Energy Storage Systems in Industrial Manufacturing: A Sustainable Approach',
        es: 'Sistemas de Almacenamiento de Energía Solar en la Fabricación Industrial: Un Enfoque Sostenible',
        de: 'Solare Energiespeichersysteme in der industriellen Fertigung: Ein nachhaltiger Ansatz',
        fr: 'Systèmes de stockage d\'énergie solaire dans la fabrication industrielle : Une approche durable',
        ar: 'أنظمة تخزين الطاقة الشمسية في التصنيع الصناعي: نهج مستدام',
      },
      description: {
        en: 'Explore the benefits and applications of solar energy storage systems in industrial manufacturing, focusing on sustainability, cost efficiency, and energy independence. Learn how HousePlus solutions empower a greener industrial future.',
        es: 'Explore los beneficios y aplicaciones de los sistemas de almacenamiento de energía solar en la fabricación industrial, centrándose en la sostenibilidad, la eficiencia de costos y la independencia energética. Descubra cómo las soluciones de HousePlus impulsan un futuro industrial más verde.',
        de: 'Entdecken Sie die Vorteile und Anwendungen von Solarenergiespeichersystemen in der industriellen Fertigung, mit Fokus auf Nachhaltigkeit, Kosteneffizienz und Energieunabhängigkeit. Erfahren Sie, wie HousePlus-Lösungen eine grünere industrielle Zukunft ermöglichen.',
        fr: 'Explorez les avantages et les applications des systèmes de stockage d\'énergie solaire dans la fabrication industrielle, en mettant l\'accent sur la durabilité, l\'efficacité des coûts et l\'indépendance énergétique. Découvrez comment les solutions HousePlus favorisent un avenir industriel plus vert.',
        ar: 'استكشف فوائد وتطبيقات أنظمة تخزين الطاقة الشمسية في التصنيع الصناعي، مع التركيز على الاستدامة وكفاءة التكلفة واستقلالية الطاقة. تعرف على كيفية تمكين حلول HousePlus لمستقبل صناعي أكثر اخضرارًا.',
      },
      date: '2026-05-15',
    },
    {
      slug: 'oem-odm-manufacturing-guide',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop',
      imageAlt: 'OEM ODM manufacturing process at HousePlus factory - custom product development',
      title: {
        en: 'OEM & ODM Manufacturing: How HousePlus Helps Brands Build Custom Products',
        es: 'Fabricación OEM y ODM: Cómo HousePlus Ayuda a las Marcas a Construir Productos Personalizados',
        de: 'OEM- und ODM-Fertigung: Wie HousePlus Marken beim Aufbau individueller Produkte hilft',
        fr: 'Fabrication OEM et ODM : Comment HousePlus aide les marques à créer des produits personnalisés',
        ar: 'تصنيع OEM وODM: كيف تساعد HousePlus العلامات التجارية على بناء منتجات مخصصة',
      },
      description: {
        en: 'HousePlus offers comprehensive OEM and ODM manufacturing services for wholesale buyers looking to build their own branded product lines. From design consultation to mass production, discover how our factory capabilities can accelerate your business growth.',
        es: 'HousePlus ofrece servicios integrales de fabricación OEM y ODM para compradores mayoristas que buscan construir sus propias líneas de productos de marca. Desde la consultoría de diseño hasta la producción en masa, descubra cómo las capacidades de nuestra fábrica pueden acelerar el crecimiento de su negocio.',
        de: 'HousePlus bietet umfassende OEM- und ODM-Fertigungsdienstleistungen für Großhandelskäufer an, die ihre eigenen Markenproduktlinien aufbauen möchten. Von der Designberatung bis zur Massenproduktion – entdecken Sie, wie unsere Fabrikkapazitäten Ihr Unternehmenswachstum beschleunigen können.',
        fr: 'HousePlus propose des services complets de fabrication OEM et ODM pour les acheteurs en gros souhaitant créer leurs propres gammes de produits de marque. De la consultation en conception à la production de masse, découvrez comment les capacités de notre usine peuvent accélérer la croissance de votre entreprise.',
        ar: 'تقدم HousePlus خدمات تصنيع OEM وODM شاملة لمشتري الجملة الذين يتطلعون إلى بناء خطوط منتجاتهم الخاصة ذات العلامة التجارية. من استشارة التصميم إلى الإنتاج الضخم، اكتشف كيف يمكن لقدرات مصنعنا تسريع نمو أعمالك.',
      },
      date: '2025-09-17',
    },
    {
      slug: 'energy-efficiency-standards-appliances',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      imageAlt: 'Energy efficient home appliances with CE and RoHS certification labels',
      title: {
        en: 'Energy Efficiency Standards in Modern Appliances: HousePlus CE & RoHS Compliance',
        es: 'Estándares de Eficiencia Energética en Electrodomésticos Modernos: Cumplimiento CE y RoHS de HousePlus',
        de: 'Energieeffizienzstandards bei modernen Geräten: HousePlus CE- und RoHS-Konformität',
        fr: 'Normes d\'efficacité énergétique dans les appareils modernes : Conformité CE et RoHS de HousePlus',
        ar: 'معايير كفاءة الطاقة في الأجهزة الحديثة: امتثال HousePlus لمعايير CE وRoHS',
      },
      description: {
        en: 'Understanding international energy efficiency standards is critical for wholesale buyers. HousePlus products meet CE, FCC, RoHS, and ISO 9001 requirements, ensuring compliance and market access across Europe, the Americas, and Asia.',
        es: 'Comprender los estándares internacionales de eficiencia energética es fundamental para los compradores mayoristas. Los productos de HousePlus cumplen con los requisitos CE, FCC, RoHS e ISO 9001, garantizando el cumplimiento y el acceso al mercado en Europa, las Américas y Asia.',
        de: 'Das Verständnis internationaler Energieeffizienzstandards ist für Großhandelskäufer entscheidend. HousePlus-Produkte erfüllen die Anforderungen von CE, FCC, RoHS und ISO 9001 und gewährleisten Compliance und Marktzugang in Europa, Amerika und Asien.',
        fr: 'Comprendre les normes internationales d\'efficacité énergétique est essentiel pour les acheteurs en gros. Les produits HousePlus répondent aux exigences CE, FCC, RoHS et ISO 9001, garantissant la conformité et l\'accès au marché en Europe, dans les Amériques et en Asie.',
        ar: 'يعد فهم معايير كفاءة الطاقة الدولية أمرًا بالغ الأهمية لمشتري الجملة. تستوفي منتجات HousePlus متطلبات CE وFCC وRoHS وISO 9001، مما يضمن الامتثال والوصول إلى الأسواق في أوروبا والأمريكتين وآسيا.',
      },
      date: '2025-05-08',
    },
    {
      slug: 'global-wholesale-guide-home-appliances',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      imageAlt: 'Global wholesale distribution of home appliances - HousePlus international trade',
      title: {
        en: 'The Complete Guide to Wholesale Home Appliances: How HousePlus Supports Global Buyers',
        es: 'La Guía Completa para Electrodomésticos al por Mayor: Cómo HousePlus Apoya a los Compradores Globales',
        de: 'Der vollständige Leitfaden für Haushaltsgeräte im Großhandel: Wie HousePlus globale Käufer unterstützt',
        fr: 'Le guide complet des appareils électroménagers en gros : Comment HousePlus soutient les acheteurs mondiaux',
        ar: 'الدليل الشامل لأجهزة المنزل بالجملة: كيف تدعم HousePlus المشترين العالميين',
      },
      description: {
        en: 'A comprehensive guide for wholesale buyers on sourcing high-quality home appliances from HousePlus. Learn about MOQ, OEM/ODM services, certifications, and how we support distributors across Africa, Southeast Asia, and Europe.',
        es: 'Una guía completa para compradores mayoristas sobre el abastecimiento de electrodomésticos de alta calidad de HousePlus. Conozca el MOQ, los servicios OEM/ODM, las certificaciones y cómo apoyamos a los distribuidores en África, el Sudeste Asiático y Europa.',
        de: 'Ein umfassender Leitfaden für Großhandelskäufer zur Beschaffung hochwertiger Haushaltsgeräte von HousePlus. Erfahren Sie mehr über MOQ, OEM/ODM-Dienstleistungen, Zertifizierungen und wie wir Distributoren in Afrika, Südostasien und Europa unterstützen.',
        fr: 'Un guide complet pour les acheteurs en gros sur l\'approvisionnement en appareils électroménagers de haute qualité auprès de HousePlus. Découvrez le MOQ, les services OEM/ODM, les certificaciones et how we support distributors en Afrique, en Asie du Sud-Est et en Europe.',
        ar: 'دليل شامل لمشتري الجملة حول مصادر الأجهزة المنزلية عالية الجودة من HousePlus. تعرف على MOQ وخدمات OEM/ODM والشهادات وكيف ندعم الموزعين في أفريقيا وجنوب شرق آسيا وأوروبا.',
      },
      date: '2025-01-20',
    },
    {
      slug: 'advanced-manufacturing-home-appliances',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      imageAlt: 'HousePlus advanced home appliance manufacturing facility',
      title: {
        en: 'Advanced Manufacturing in Home Appliances: HousePlus Quality',
        es: 'Fabricación Avanzada en Electrodomésticos: Calidad HousePlus',
        de: 'Fortschrittliche Fertigung bei Haushaltsgeräten: HousePlus Qualität',
        fr: 'Fabrication avancée d\'appareils électroménagers : Qualité HousePlus',
        ar: 'التصنيع المتقدم في الأجهزة المنزلية: جودة HousePlus',
      },
      description: {
        en: 'Discover HousePlus\'s commitment to advanced manufacturing techniques, stringent quality control, and sustainable practices in producing high-quality home appliances for global wholesale markets.',
        es: 'Descubra el compromiso de HousePlus con las técnicas de fabricación avanzadas, el estricto control de calidad y las prácticas sostenibles en la producción de electrodomésticos de alta calidad para los mercados mayoristas globales.',
        de: 'Entdecken Sie das Engagement von HousePlus für fortschrittliche Fertigungstechniken, strenge Qualitätskontrolle und nachhaltige Praktiken bei der Herstellung hochwertiger Haushaltsgeräte für globale Großhandelsmärkte.',
        fr: 'Découvrez l\'engagement de HousePlus envers les techniques de fabrication avancées, le contrôle qualité rigoureux et les pratiques durables dans la production d\'appareils électroménagers de haute qualité pour les marchés de gros mondiaux.',
        ar: 'اكتشف التزام HousePlus بتقنيات التصنيع المتقدمة، ومراقبة الجودة الصارمة، والممارسات المستدامة في إنتاج الأجهزة المنزلية عالية الجودة لأسواق الجملة العالمية.',
      },
      date: '2024-10-14',
    },
    {
      slug: 'the-future-of-smart-home-appliances',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
      imageAlt: 'Modern smart home appliances from HousePlus',
      title: {
        en: 'The Future of Smart Home Appliances: HousePlus Innovations',
        es: 'El Futuro de los Electrodomésticos Inteligentes: Innovaciones HousePlus',
        de: 'Die Zukunft smarter Haushaltsgeräte: HousePlus Innovationen',
        fr: 'L\'avenir des appareils électroménagers intelligents : Innovations HousePlus',
        ar: 'مستقبل الأجهزة المنزلية الذكية: ابتكارات HousePlus',
      },
      description: {
        en: 'Discover how HousePlus is shaping the future of smart home appliances with energy-efficient, connected, and intuitive solutions for modern living and global wholesale markets.',
        es: 'Descubra cómo HousePlus está dando forma al futuro de los electrodomésticos inteligentes con soluciones energéticamente eficientes, conectadas e intuitivas para la vida moderna y los mercados mayoristas globales.',
        de: 'Entdecken Sie, wie HousePlus die Zukunft smarter Haushaltsgeräte mit energieeffizienten, vernetzten und intuitiven Lösungen für modernes Wohnen und globale Großhandelsmärkte gestaltet.',
        fr: 'Découvrez how HousePlus is shaping the future of smart home appliances with energy-efficient, connected, and intuitive solutions for modern living and global wholesale markets.',
        ar: 'اكتشف كيف تشكل HousePlus مستقبل الأجهزة المنزلية الذكية من خلال حلول موفرة للطاقة ومتصلة وبديهية للحياة العصرية وأسواق الجملة العالمية.',
      },
      date: '2024-08-01',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <SchemaRenderer schemas={[buildBreadcrumbSchema(breadcrumbs)]} />
      <div className="relative bg-slate-900 text-white py-20 md:py-32 px-4 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <Breadcrumb lang={lang} />
          <h1 className="text-3xl md:text-5xl font-black mt-6 mb-4 leading-tight">
            {titles[lang] || titles.en}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-6">
            {descriptions[lang] || descriptions.en}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article) => (
            <Link key={article.slug} href={`/${lang}/news/${article.slug}`} className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-500 transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image src={article.image} alt={article.imageAlt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full">News & Insights</span>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h2 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-blue-600 tracking-tight">{article.title[lang] || article.title.en}</h2>
                <p className="text-slate-500 line-clamp-2 mb-8 flex-grow">{article.description[lang] || article.description.en}</p>
                <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest">Read More →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
