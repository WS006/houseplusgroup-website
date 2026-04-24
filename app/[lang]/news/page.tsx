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

  const articles = [
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
        fr: 'Un guide complet pour les acheteurs en gros sur l\'approvisionnement en appareils électroménagers de haute qualité auprès de HousePlus. Découvrez le MOQ, les services OEM/ODM, les certifications et comment nous soutenons les distributeurs en Afrique, en Asie du Sud-Est et en Europe.',
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
        fr: 'Découvrez comment HousePlus façonne l\'avenir des appareils électroménagers intelligents avec des solutions écoénergétiques, connectées et intuitives pour la vie moderne et les marchés de gros mondiaux.',
        ar: 'اكتشف كيف تشكل HousePlus مستقبل الأجهزة المنزلية الذكية من خلال حلول موفرة للطاقة ومتصلة وبديهية للحياة العصرية وأسواق الجملة العالمية.',
      },
      date: '2024-06-30',
    },
    {
      slug: 'solar-energy-storage-solutions',
      image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&h=600&fit=crop',
      imageAlt: 'HousePlus portable power station and battery storage system',
      title: {
        en: 'Solar Energy Storage Solutions: HousePlus Innovations',
        es: 'Soluciones de Almacenamiento de Energía Solar: Innovaciones HousePlus',
        de: 'Solare Energiespeicherlösungen: HousePlus Innovationen',
        fr: 'Solutions de stockage d\'énergie solaire : Innovations HousePlus',
        ar: 'حلول تخزين الطاقة الشمسية: ابتكارات HousePlus',
      },
      description: {
        en: 'Explore HousePlus\'s advanced solar energy storage solutions, including battery systems and portable power stations, designed for efficiency and reliability in global wholesale markets.',
        es: 'Explore las soluciones avanzadas de almacenamiento de energía solar de HousePlus, incluidos los sistemas de baterías y las estaciones de energía portátiles, diseñadas para la eficiencia y la fiabilidad en los mercados mayoristas globales.',
        de: 'Entdecken Sie die fortschrittlichen Solarenergiespeicherlösungen von HousePlus, einschließlich Batteriesystemen und tragwerken, die für Effizienz und Zuverlässigkeit auf globalen Großhandelsmärkten entwickelt wurden.',
        fr: 'Découvrez les solutions avanzadas de stockage d\'énergie solaire de HousePlus, y compris les systèmes de batteries et les centrales électriques portables, conçues pour l\'efficacité et la fiabilité sur les marchés de gros mondiaux.',
        ar: 'استكشف حلول HousePlus المتقدمة لتخزين الطاقة الشمسية، بما في ذلك أنظمة البطاريات ومحطات الطاقة المحمولة، المصممة للكفاءة والموثوقية في أسواق الجملة العالمية.',
      },
      date: '2024-02-19',
    },
    {
      slug: 'the-evolution-of-3c-electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
      imageAlt: 'Modern 3C electronics devices including wireless chargers and smart gadgets',
      title: {
        en: 'The Evolution of 3C Electronics: Innovation and HousePlus Solutions',
        es: 'La Evolución de la Electrónica 3C: Innovación y Soluciones HousePlus',
        de: 'Die Evolution der 3C-Elektronik: Innovation und HousePlus-Lösungen',
        fr: 'L\'évolution de l\'électronique 3C : Innovation et solutions HousePlus',
        ar: 'تطور الإلكترونيات 3C: الابتكار وحلول HousePlus',
      },
      description: {
        en: 'Explore the rapid advancements in 3C electronics, from smart devices to LED lighting. Discover how HousePlus delivers cutting-edge, reliable solutions for global wholesale markets.',
        es: 'Explore los rápidos avances en electrónica 3C, desde dispositivos inteligentes hasta iluminación LED. Descubra cómo HousePlus ofrece soluciones de vanguardia y confiables para los mercados mayoristas globales.',
        de: 'Entdecken Sie die rasanten Fortschritte in der 3C-Elektronik, von Smart Devices bis zur LED-Beleuchtung. Erfahren Sie, wie HousePlus modernste, zuverlässige Lösungen für globale Großhandelsmärkte liefert.',
        fr: 'Explorez les avancées rapides de l\'électronique 3C, des appareils intelligents à l\'éclairage LED. Découvrez comment HousePlus fournit des solutions de pointe et fiables pour les marchés de gros mondiaux.',
        ar: 'استكشف التطورات السريعة في الإلكترونيات 3C، من الأجهزة الذكية إلى إضاءة LED. اكتشف كيف تقدم HousePlus حلولًا متطورة وموثوقة لأسواق الجملة العالمية.',
      },
      date: '2023-11-08',
    },
    {
      slug: 'smart-home-appliances',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=600&fit=crop',
      imageAlt: 'Modern kitchen with HousePlus smart home appliances',
      title: {
        en: 'Smart Home Appliances: Efficiency, Innovation, and HousePlus Solutions',
        es: 'Electrodomésticos Inteligentes: Eficiencia, Innovación y Soluciones HousePlus',
        de: 'Smarte Haushaltsgeräte: Effizienz, Innovation und HousePlus-Lösungen',
        fr: 'Appareils électroménagers intelligents : Efficacité, innovation et solutions HousePlus',
        ar: 'الأجهزة المنزلية الذكية: الكفاءة والابتكار وحلول HousePlus',
      },
      description: {
        en: 'Discover how HousePlus is redefining modern living with smart, energy-efficient home appliances. Explore our range of innovative products designed for global wholesale markets.',
        es: 'Descubra cómo HousePlus está redefiniendo la vida moderna con electrodomésticos inteligentes y energéticamente eficientes. Explore nuestra gama de productos innovadores diseñados para mercados mayoristas globales.',
        de: 'Entdecken Sie, wie HousePlus das moderne Leben mit intelligenten, energieeffizienten Haushaltsgeräten neu definiert. Entdecken Sie unser Sortiment an innovativen Produkten, die für globale Großhandelsmärkte entwickelt wurden.',
        fr: 'Découvrez comment HousePlus redéfinit la vie moderne avec des appareils électroménagers intelligents et économes en énergie. Explorez notre gamme de produits innovants conçus pour les marchés de gros mondiaux.',
        ar: 'اكتشف كيف تعيد HousePlus تعريف الحياة العصرية بأجهزة منزلية ذكية وموفرة للطاقة. استكشف مجموعتنا من المنتجات المبتكرة المصممة لأسواق الجملة العالمية.',
      },
      date: '2023-07-22',
    },
    {
      slug: 'the-future-of-solar-energy',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop',
      imageAlt: 'Large-scale solar farm with HousePlus solar panels',
      title: {
        en: 'The Future of Solar Energy: Innovations and HousePlus Solutions',
        es: 'El Futuro de la Energía Solar: Innovaciones y Soluciones HousePlus',
        de: 'Die Zukunft der Solarenergie: Innovationen und HousePlus-Lösungen',
        fr: 'L\'avenir de l\'énergie solaire : Innovations et solutions HousePlus',
        ar: 'مستقبل الطاقة الشمسية: الابتكارات وحلول HousePlus',
      },
      description: {
        en: 'Explore the latest innovations in solar energy technology and how HousePlus is leading the way with high-efficiency solar panels, portable power stations, and sustainable solutions for global wholesale markets.',
        es: 'Explore las últimas innovaciones en tecnología de energía solar y cómo HousePlus lidera el camino con paneles solares de alta eficiencia, estaciones de energía portátiles y soluciones sostenibles para mercados mayoristas globales.',
        de: 'Entdecken Sie die neuesten Innovationen in der Solarenergietechnologie und wie HousePlus mit hocheffizienten Solarmodulen, tragbaren Kraftwerken und nachhaltigen Lösungen für globale Großhandelsmärkte führend ist.',
        fr: 'Découvrez les dernières innovations en matière de technologie de l\'énergie solaire et comment HousePlus ouvre la voie avec des panneaux solaires à haut rendement, des centrales électriques portables et des solutions durables pour les marchés de gros mondiaux.',
        ar: 'استكشف أحدث الابتكارات في تكنولوجيا الطاقة الشمسية وكيف تقود HousePlus الطريق بألواح شمسية عالية الكفاءة ومحطات طاقة محمولة وحلول مستدامة لأسواق الجملة العالمية.',
      },
      date: '2023-03-15',
    },
  ];

  return (
    <SchemaRenderer schemas={[buildBreadcrumbSchema(breadcrumbs)]}>
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} />
        <section className="py-24 px-4 bg-slate-50 border-b border-slate-100">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight">
              {lang === 'en' && 'HousePlus News & Insights'}
              {lang === 'es' && 'Noticias y Perspectivas de HousePlus'}
              {lang === 'de' && 'HousePlus Nachrichten & Einblicke'}
              {lang === 'fr' && 'Actualités et Perspectives HousePlus'}
              {lang === 'ar' && 'أخبار ورؤى HousePlus'}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              {lang === 'en' && 'Stay updated with the latest industry trends, innovations, and company news from HousePlus Group.'}
              {lang === 'es' && 'Manténgase actualizado con las últimas tendencias de la industria, innovaciones y noticias de la empresa de HousePlus Group.'}
              {lang === 'de' && 'Bleiben Sie auf dem Laufenden über die neuesten Branchentrends, Innovationen und Unternehmensnachrichten der HousePlus Group.'}
              {lang === 'fr' && 'Restez informé des dernières tendances de l\'industrie, des innovations et des actualités de l\'entreprise du groupe HousePlus.'}
              {lang === 'ar' && 'ابق على اطلاع دائم بأحدث اتجاهات الصناعة والابتكارات وأخبار الشركة من مجموعة HousePlus.'}
            </p>
          </div>
        </section>
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article, index) => (
              <Link href={`/${lang}/news/${article.slug}`} key={index} className="block group bg-white rounded-[2rem] border border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="relative w-full h-72 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                      HousePlus Group Team
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                      {new Date(article.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : lang === 'de' ? 'de-DE' : lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-300 mb-4 leading-tight">
                    {article.title[lang as keyof typeof article.title] || article.title.en}
                  </h2>
                  <p className="text-slate-500 text-base leading-relaxed mb-8 line-clamp-3">
                    {article.description[lang as keyof typeof article.description] || article.description.en}
                  </p>
                  <div className="flex items-center text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read HousePlus Article
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SchemaRenderer>
  );
}
