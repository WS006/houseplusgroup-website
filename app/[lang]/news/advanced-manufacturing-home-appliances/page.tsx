import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema-builder';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: 'Advanced Manufacturing in Home Appliances: HousePlus Quality',
    es: 'Fabricación Avanzada en Electrodomésticos: Calidad HousePlus',
    de: 'Fortschrittliche Fertigung bei Haushaltsgeräten: HousePlus Qualität',
    fr: 'Fabrication avancée d\'appareils électroménagers : Qualité HousePlus',
    ar: 'التصنيع المتقدم في الأجهزة المنزلية: جودة HousePlus',
  };

  const descriptions: Record<string, string> = {
    en: 'Discover HousePlus\'s commitment to advanced manufacturing techniques, stringent quality control, and sustainable practices in producing high-quality home appliances for global wholesale markets.',
    es: 'Descubra el compromiso de HousePlus con las técnicas de fabricación avanzadas, el estricto control de calidad y las prácticas sostenibles en la producción de electrodomésticos de alta calidad para los mercados mayoristas globales.',
    de: 'Entdecken Sie das Engagement von HousePlus für fortschrittliche Fertigungstechniken, strenge Qualitätskontrolle und nachhaltige Praktiken bei der Herstellung hochwertiger Haushaltsgeräte für globale Großhandelsmärkte.',
    fr: 'Découvrez l\'engagement de HousePlus envers les techniques de fabrication avancées, le contrôle qualité rigoureux et les pratiques durables dans la production d\'appareils électroménagers de haute qualité pour les marchés de gros mondiaux.',
    ar: 'اكتشف التزام HousePlus بتقنيات التصنيع المتقدمة، ومراقبة الجودة الصارمة، والممارسات المستدامة في إنتاج الأجهزة المنزلية عالية الجودة لأسواق الجملة العالمية.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['home appliance manufacturing', 'quality control', 'sustainable production', 'HousePlus', 'wholesale', 'OEM/ODM'],
    url: `/${lang}/news/advanced-manufacturing-home-appliances`,
    lang: lang as any,
    type: 'article',
  });
}

export default async function AdvancedManufacturingArticle({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
    { name: lang === 'en' ? 'Advanced Manufacturing in Home Appliances' : 'Fabricación Avanzada en Electrodomésticos', url: `/${lang}/news/advanced-manufacturing-home-appliances` },
  ];

  const articleContent: Record<string, any> = {
    en: {
      title: 'Advanced Manufacturing in Home Appliances: HousePlus Quality',
      authorName: 'HousePlus Editorial Team',
      datePublished: '2024-10-14',
      dateModified: '2024-10-14',
      image: '/images/factory/production-line.jpg',
      imageAlt: 'HousePlus advanced home appliance manufacturing facility',
      sections: [
        {
          heading: 'The Foundation of Quality: Precision Manufacturing',
          text: 'In the highly competitive home appliance market, manufacturing excellence is paramount. At HousePlus, we leverage state-of-the-art production lines and advanced automation technologies to ensure every appliance meets the highest standards of precision and durability. Our commitment to continuous improvement in manufacturing processes allows us to produce innovative and reliable products efficiently, catering to the diverse needs of our global wholesale partners.',
          image: '/images/factory/assembly-line.jpg',
          imageAlt: 'Automated assembly line for HousePlus home appliances',
        },
        {
          heading: 'Rigorous Quality Control: From Raw Material to Finished Product',
          text: 'Quality is not just a buzzword at HousePlus; it\'s ingrained in every stage of our production. We implement a multi-tiered quality control system, starting from the meticulous selection of raw materials, through in-process inspections, to comprehensive final product testing. Our dedicated quality assurance teams utilize advanced testing equipment to ensure that each home appliance performs flawlessly, is safe, and adheres to international certifications like CE, RoHS, and FCC. This rigorous approach guarantees the superior quality our wholesale clients expect.',
          image: '/images/factory/quality-control.jpg',
          imageAlt: 'HousePlus quality control team inspecting home appliances',
        },
        {
          heading: 'Sustainable Practices in Appliance Production',
          text: 'HousePlus is deeply committed to environmental responsibility. Our manufacturing facilities incorporate sustainable practices, including energy-efficient machinery, waste reduction programs, and responsible sourcing of materials. We continuously explore new ways to minimize our ecological footprint while producing high-performance home appliances. This dedication to sustainability not only benefits the planet but also aligns with the values of modern consumers and provides a competitive edge for our wholesale partners in Africa, Southeast Asia, and Europe.',
          image: '/images/factory/sustainable-manufacturing.jpg',
          imageAlt: 'Eco-friendly manufacturing processes at HousePlus',
        },
        {
          heading: 'OEM/ODM Services: Tailored Solutions for Your Brand',
          text: 'Understanding that every market has unique demands, HousePlus offers comprehensive OEM (Original Equipment Manufacturer) and ODM (Original Design Manufacturer) services for home appliances. Our experienced R&D and design teams work closely with wholesale partners to develop customized products that perfectly match their brand specifications and market requirements. From concept to mass production, we ensure a seamless and efficient process, delivering bespoke solutions that drive market success.',
          image: '/images/factory/rd-team.jpg',
          imageAlt: 'HousePlus R&D team collaborating on new appliance designs',
        },
        {
          heading: 'Partner with HousePlus for Manufacturing Excellence',
          text: 'Choosing HousePlus as your home appliance manufacturing partner means opting for unparalleled quality, innovation, and reliability. Our advanced manufacturing capabilities, coupled with our commitment to sustainability and flexible OEM/ODM services, make us the ideal choice for wholesale distributors worldwide. Experience the HousePlus difference and elevate your product offerings with appliances built to last and designed for the future.',
        },
      ],
    },
    es: {
      title: 'Fabricación Avanzada en Electrodomésticos: Calidad HousePlus',
      authorName: 'HousePlus Editorial Team',
      datePublished: '2024-10-14',
      dateModified: '2024-10-14',
      image: '/images/factory/production-line.jpg',
      imageAlt: 'Instalación de fabricación avanzada de electrodomésticos HousePlus',
      sections: [
        {
          heading: 'La Base de la Calidad: Fabricación de Precisión',
          text: 'En el mercado altamente competitivo de electrodomésticos, la excelencia en la fabricación es primordial. En HousePlus, aprovechamos líneas de producción de última generación y tecnologías de automatización avanzadas para garantizar que cada electrodoméstico cumpla con los más altos estándares de precisión y durabilidad. Nuestro compromiso con la mejora continua en los procesos de fabricación nos permite producir productos innovadores y confiables de manera eficiente, satisfaciendo las diversas necesidades de nuestros socios mayoristas globales.',
          image: '/images/factory/assembly-line.jpg',
          imageAlt: 'Línea de montaje automatizada para electrodomésticos HousePlus',
        },
        {
          heading: 'Control de Calidad Riguroso: Desde la Materia Prima hasta el Producto Terminado',
          text: 'La calidad no es solo una palabra de moda en HousePlus; está arraigada en cada etapa de nuestra producción. Implementamos un sistema de control de calidad de varios niveles, comenzando desde la selección meticulosa de materias primas, pasando por inspecciones en proceso, hasta pruebas exhaustivas del producto final. Nuestros equipos dedicados de garantía de calidad utilizan equipos de prueba avanzados para garantizar que cada electrodoméstico funcione sin problemas, sea seguro y cumpla con las certificaciones internacionales como CE, RoHS y FCC. Este enfoque riguroso garantiza la calidad superior que esperan nuestros clientes mayoristas.',
          image: '/images/factory/quality-control.jpg',
          imageAlt: 'Equipo de control de calidad de HousePlus inspeccionando electrodomésticos',
        },
        {
          heading: 'Prácticas Sostenibles en la Producción de Electrodomésticos',
          text: 'HousePlus está profundamente comprometida con la responsabilidad ambiental. Nuestras instalaciones de fabricación incorporan prácticas sostenibles, que incluyen maquinaria de bajo consumo energético, programas de reducción de residuos y abastecimiento responsable de materiales. Exploramos continuamente nuevas formas de minimizar nuestra huella ecológica mientras producimos electrodomésticos de alto rendimiento. Esta dedicación a la sostenibilidad no solo beneficia al planeta, sino que también se alinea con los valores de los consumidores modernos y proporciona una ventaja competitiva para nuestros socios mayoristas en África, el Sudeste Asiático y Europa.',
          image: '/images/factory/sustainable-manufacturing.jpg',
          imageAlt: 'Procesos de fabricación ecológicos en HousePlus',
        },
        {
          heading: 'Servicios OEM/ODM: Soluciones Personalizadas para Su Marca',
          text: 'Entendiendo que cada mercado tiene demandas únicas, HousePlus ofrece servicios integrales de OEM (Fabricante de Equipos Originales) y ODM (Fabricante de Diseño Original) para electrodomésticos. Nuestros experimentados equipos de I+D y diseño trabajan en estrecha colaboración con socios mayoristas para desarrollar productos personalizados que se ajusten perfectamente a las especificaciones de su marca y a los requisitos del mercado. Desde el concepto hasta la producción en masa, garantizamos un proceso fluido y eficiente, entregando soluciones a medida que impulsan el éxito en el mercado.',
          image: '/images/factory/rd-team.jpg',
          imageAlt: 'Equipo de I+D de HousePlus colaborando en nuevos diseños de electrodomésticos',
        },
        {
          heading: 'Asóciese con HousePlus para la Excelencia en la Fabricación',
          text: 'Elegir a HousePlus como su socio de fabricación de electrodomésticos significa optar por una calidad, innovación y fiabilidad inigualables. Nuestras capacidades de fabricación avanzadas, junto con nuestro compromiso con la sostenibilidad y los servicios OEM/ODM flexibles, nos convierten en la opción ideal para distribuidores mayoristas de todo el mundo. Experimente la diferencia HousePlus y eleve sus ofertas de productos con electrodomésticos construidos para durar y diseñados para el futuro.',
        },
      ],
    },
    de: {
      title: 'Fortschrittliche Fertigung bei Haushaltsgeräten: HousePlus Qualität',
      authorName: 'HousePlus Editorial Team',
      datePublished: '2024-10-14',
      dateModified: '2024-10-14',
      image: '/images/factory/production-line.jpg',
      imageAlt: 'HousePlus fortschrittliche Fertigungsanlage für Haushaltsgeräte',
      sections: [
        {
          heading: 'Die Grundlage der Qualität: Präzisionsfertigung',
          text: 'Auf dem hart umkämpften Markt für Haushaltsgeräte ist Fertigungsqualität von größter Bedeutung. Bei HousePlus nutzen wir modernste Produktionslinien und fortschrittliche Automatisierungstechnologien, um sicherzustellen, dass jedes Gerät die höchsten Standards an Präzision und Langlebigkeit erfüllt. Unser Engagement für kontinuierliche Verbesserung der Fertigungsprozesse ermöglicht es uns, innovative und zuverlässige Produkte effizient herzustellen und den vielfältigen Anforderungen unserer globalen Großhandelspartner gerecht zu werden.',
          image: '/images/factory/assembly-line.jpg',
          imageAlt: 'Automatisierte Montagelinie für HousePlus Haushaltsgeräte',
        },
        {
          heading: 'Strenge Qualitätskontrolle: Vom Rohmaterial zum fertigen Produkt',
          text: 'Qualität ist bei HousePlus nicht nur ein Schlagwort; sie ist in jeder Phase unserer Produktion verankert. Wir implementieren ein mehrstufiges Qualitätskontrollsystem, beginnend mit der sorgfältigen Auswahl der Rohmaterialien, über In-Prozess-Inspektionen bis hin zu umfassenden Endproduktprüfungen. Unsere engagierten Qualitätssicherungsteams verwenden fortschrittliche Prüfgeräte, um sicherzustellen, dass jedes Haushaltsgerät einwandfrei funktioniert, sicher ist und internationalen Zertifizierungen wie CE, RoHS und FCC entspricht. Dieser strenge Ansatz garantiert die überlegene Qualität, die unsere Großhandelskunden erwarten.',
          image: '/images/factory/quality-control.jpg',
          imageAlt: 'HousePlus Qualitätskontrollteam inspiziert Haushaltsgeräte',
        },
        {
          heading: 'Nachhaltige Praktiken in der Geräteproduktion',
          text: 'HousePlus engagiert sich stark für Umweltverantwortung. Unsere Produktionsstätten integrieren nachhaltige Praktiken, einschließlich energieeffizienter Maschinen, Abfallreduzierungsprogramme und verantwortungsvoller Materialbeschaffung. Wir suchen kontinuierlich nach neuen Wegen, um unseren ökologischen Fußabdruck zu minimieren, während wir Hochleistungs-Haushaltsgeräte produzieren. Dieses Engagement für Nachhaltigkeit kommt nicht nur dem Planeten zugute, sondern entspricht auch den Werten moderner Verbraucher und verschafft unseren Großhandelspartnern in Afrika, Südostasien und Europa einen Wettbewerbsvorteil.',
          image: '/images/factory/sustainable-manufacturing.jpg',
          imageAlt: 'Umweltfreundliche Herstellungsprozesse bei HousePlus',
        },
        {
          heading: 'OEM/ODM-Dienstleistungen: Maßgeschneiderte Lösungen für Ihre Marke',
          text: 'Da jeder Markt einzigartige Anforderungen hat, bietet HousePlus umfassende OEM- (Original Equipment Manufacturer) und ODM- (Original Design Manufacturer) Dienstleistungen für Haushaltsgeräte an. Unsere erfahrenen F&E- und Designteams arbeiten eng mit Großhandelspartnern zusammen, um maßgeschneiderte Produkte zu entwickeln, die perfekt zu ihren Markenspezifikationen und Marktanforderungen passen. Vom Konzept bis zur Massenproduktion gewährleisten wir einen reibungslosen und effizienten Prozess und liefern maßgeschneiderte Lösungen, die den Markterfolg vorantreiben.',
          image: '/images/factory/rd-team.jpg',
          imageAlt: 'HousePlus F&E-Team arbeitet an neuen Gerätedesigns',
        },
        {
          heading: 'Arbeiten Sie mit HousePlus für Fertigungsqualität zusammen',
          text: 'Die Wahl von HousePlus als Ihr Fertigungspartner für Haushaltsgeräte bedeutet, sich für unübertroffene Qualität, Innovation und Zuverlässigkeit zu entscheiden. Unsere fortschrittlichen Fertigungskapazitäten, gepaart mit unserem Engagement für Nachhaltigkeit und flexiblen OEM/ODM-Dienstleistungen, machen uns zur idealen Wahl für Großhändler weltweit. Erleben Sie den HousePlus-Unterschied und erweitern Sie Ihr Produktangebot mit Geräten, die auf Langlebigkeit ausgelegt und für die Zukunft konzipiert sind.',
        },
      ],
    },
    fr: {
      title: 'Fabrication avancée d\'appareils électroménagers : Qualité HousePlus',
      authorName: 'HousePlus Editorial Team',
      datePublished: '2024-10-14',
      dateModified: '2024-10-14',
      image: '/images/factory/production-line.jpg',
      imageAlt: 'Installation de fabrication avancée d\'appareils électroménagers HousePlus',
      sections: [
        {
          heading: 'Le Fondement de la Qualité : Fabrication de Précision',
          text: 'Sur le marché très concurrentiel des appareils électroménagers, l\'excellence de la fabrication est primordiale. Chez HousePlus, nous utilisons des lignes de production de pointe et des technologies d\'automatisation avancées pour garantir que chaque appareil répond aux normes les plus élevées de précision et de durabilité. Notre engagement envers l\'amélioration continue des processus de fabrication nous permet de produire des produits innovants et fiables de manière efficace, répondant aux divers besoins de nos partenaires grossistes mondiaux.',
          image: '/images/factory/assembly-line.jpg',
          imageAlt: 'Chaîne de montage automatisée pour les appareils électroménagers HousePlus',
        },
        {
          heading: 'Contrôle Qualité Rigoureux : De la Matière Première au Produit Fini',
          text: 'La qualité n\'est pas seulement un mot à la mode chez HousePlus ; elle est ancrée à chaque étape de notre production. Nous mettons en œuvre un système de contrôle qualité à plusieurs niveaux, depuis la sélection méticuleuse des matières premières, en passant par les inspections en cours de processus, jusqu\'aux tests complets du produit final. Nos équipes dédiées à l\'assurance qualité utilisent des équipements de test avancés pour garantir que chaque appareil électroménager fonctionne parfaitement, est sûr et respecte les certifications internationales telles que CE, RoHS et FCC. Cette approche rigoureuse garantit la qualité supérieure que nos clients grossistes attendent.',
          image: '/images/factory/quality-control.jpg',
          imageAlt: 'Équipe de contrôle qualité HousePlus inspectant les appareils électroménagers',
        },
        {
          heading: 'Pratiques Durables dans la Production d\'Appareils',
          text: 'HousePlus est profondément engagée envers la responsabilité environnementale. Nos installations de fabrication intègrent des pratiques durables, y compris des machines écoénergétiques, des programmes de réduction des déchets et un approvisionnement responsable en matériaux. Nous explorons continuellement de nouvelles façons de minimiser notre empreinte écologique tout en produisant des appareils électroménagers haute performance. Cet engagement envers la durabilité ne profite pas seulement à la planète, mais s\'aligne également sur les valeurs des consommateurs modernes et offre un avantage concurrentiel à nos partenaires grossistes en Afrique, en Asie du Sud-Est et en Europe.',
          image: '/images/factory/sustainable-manufacturing.jpg',
          imageAlt: 'Processus de fabrication écologiques chez HousePlus',
        },
        {
          heading: 'Services OEM/ODM : Solutions Sur Mesure pour Votre Marque',
          text: 'Comprenant que chaque marché a des exigences uniques, HousePlus propose des services complets d\'OEM (Original Equipment Manufacturer) et d\'ODM (Original Design Manufacturer) pour les appareils électroménagers. Nos équipes expérimentées de R&D et de conception travaillent en étroite collaboration avec des partenaires grossistes pour développer des produits personnalisés qui correspondent parfaitement aux spécifications de leur marque et aux exigences du marché. Du concept à la production de masse, nous assurons un processus fluide et efficace, livrant des solutions sur mesure qui stimulent le succès commercial.',
          image: '/images/factory/rd-team.jpg',
          imageAlt: 'Équipe R&D de HousePlus collaborant sur de nouveaux designs d\'appareils électroménagers',
        },
        {
          heading: 'Partenariat avec HousePlus pour l\'Excellence Manufacturière',
          text: 'Choisir HousePlus comme votre partenaire de fabrication d\'appareils électroménagers signifie opter pour une qualité, une innovation et une fiabilité inégalées. Nos capacités de fabrication avancées, associées à notre engagement envers la durabilité et nos services OEM/ODM flexibles, font de nous le choix idéal pour les distributeurs en gros du monde entier. Découvrez la différence HousePlus et améliorez vos offres de produits avec des appareils conçus pour durer et pour l\'avenir.',
        },
      ],
    },
    ar: {
      title: 'التصنيع المتقدم في الأجهزة المنزلية: جودة HousePlus',
      authorName: 'HousePlus Editorial Team',
      datePublished: '2024-10-14',
      dateModified: '2024-10-14',
      image: '/images/factory/production-line.jpg',
      imageAlt: 'منشأة تصنيع الأجهزة المنزلية المتقدمة من HousePlus',
      sections: [
        {
          heading: 'أساس الجودة: التصنيع الدقيق',
          text: 'في سوق الأجهزة المنزلية شديد التنافسية، تعد التميز في التصنيع أمرًا بالغ الأهمية. في HousePlus، نستفيد من خطوط الإنتاج الحديثة وتقنيات الأتمتة المتقدمة لضمان أن كل جهاز يلبي أعلى معايير الدقة والمتانة. يتيح لنا التزامنا بالتحسين المستمر في عمليات التصنيع إنتاج منتجات مبتكرة وموثوقة بكفاءة، لتلبية الاحتياجات المتنوعة لشركائنا بالجملة العالميين.',
          image: '/images/factory/assembly-line.jpg',
          imageAlt: 'خط تجميع آلي لأجهزة HousePlus المنزلية',
        },
        {
          heading: 'رقابة صارمة على الجودة: من المواد الخام إلى المنتج النهائي',
          text: 'الجودة ليست مجرد كلمة طنانة في HousePlus؛ بل هي متأصلة في كل مرحلة من مراحل إنتاجنا. ننفذ نظامًا متعدد المستويات لمراقبة الجودة، بدءًا من الاختيار الدقيق للمواد الخام، مرورًا بفحوصات أثناء العملية، وصولًا إلى اختبار شامل للمنتج النهائي. تستخدم فرق ضمان الجودة المتخصصة لدينا معدات اختبار متقدمة لضمان أن كل جهاز منزلي يعمل بشكل لا تشوبه شائبة، وآمن، ويتوافق مع الشهادات الدولية مثل CE و RoHS و FCC. يضمن هذا النهج الصارم الجودة الفائقة التي يتوقعها عملاؤنا بالجملة.',
          image: '/images/factory/quality-control.jpg',
          imageAlt: 'فريق مراقبة الجودة في HousePlus يفحص الأجهزة المنزلية',
        },
        {
          heading: 'ممارسات مستدامة في إنتاج الأجهزة',
          text: 'تلتزم HousePlus التزامًا عميقًا بالمسؤولية البيئية. تدمج منشآتنا التصنيعية ممارسات مستدامة، بما في ذلك الآلات الموفرة للطاقة، وبرامج تقليل النفايات، والمصادر المسؤولة للمواد. نستكشف باستمرار طرقًا جديدة لتقليل بصمتنا البيئية مع إنتاج أجهزة منزلية عالية الأداء. هذا التفاني في الاستدامة لا يفيد الكوكب فحسب، بل يتماشى أيضًا مع قيم المستهلكين الحديثين ويوفر ميزة تنافسية لشركائنا بالجملة في إفريقيا وجنوب شرق آسيا وأوروبا.',
          image: '/images/factory/sustainable-manufacturing.jpg',
          imageAlt: 'عمليات تصنيع صديقة للبيئة في HousePlus',
        },
        {
          heading: 'خدمات OEM/ODM: حلول مخصصة لعلامتك التجارية',
          text: 'إدراكًا أن كل سوق له متطلبات فريدة، تقدم HousePlus خدمات OEM (الشركة المصنعة للمعدات الأصلية) و ODM (الشركة المصنعة للتصميم الأصلي) الشاملة للأجهزة المنزلية. تعمل فرق البحث والتطوير والتصميم ذات الخبرة لدينا عن كثب مع شركاء الجملة لتطوير منتجات مخصصة تتوافق تمامًا مع مواصفات علامتهم التجارية ومتطلبات السوق. من المفهوم إلى الإنتاج الضخم، نضمن عملية سلسة وفعالة، وتقديم حلول مصممة خصيصًا تدفع النجاح في السوق.',
          image: '/images/factory/rd-team.jpg',
          imageAlt: 'فريق البحث والتطوير في HousePlus يتعاون في تصميمات الأجهزة الجديدة',
        },
        {
          heading: 'شارك مع HousePlus للتميز في التصنيع',
          text: 'اختيار HousePlus كشريكك في تصنيع الأجهزة المنزلية يعني اختيار جودة وابتكار وموثوقية لا مثيل لها. إن قدراتنا التصنيعية المتقدمة، جنبًا إلى جنب مع التزامنا بالاستدامة وخدمات OEM/ODM المرنة، تجعلنا الخيار الأمثل لموزعي الجملة في جميع أنحاء العالم. اختبر فرق HousePlus وارفع مستوى عروض منتجاتك بأجهزة مصممة لتدوم ومصممة للمستقبل.',
        },
      ],
    },
  };

  const data = articleContent[lang] || articleContent.en;

  const articleSchema = buildArticleSchema({
    headline: data.title,
    image: `https://www.houseplus-ch.com${data.image}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    authorName: data.authorName,
    description: generateSEOMetadata({ lang: lang as any, type: 'article', title: data.title, description: data.sections[0].text, keywords: [], url: `/${lang}/news/advanced-manufacturing-home-appliances` }).description as string,
  });

  return (
    <SchemaRenderer schemas={[articleSchema, buildBreadcrumbSchema(breadcrumbs)]}>
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} />

        <article className="max-w-6xl mx-auto py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-slate-900">{data.title}</h1>
          <div className="text-center text-gray-600 mb-8">
            By {data.authorName} | {new Date(data.datePublished).toLocaleDateString(lang)}
          </div>

          <div className="relative w-full h-96 mb-10 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {data.sections.map((section: any, index: number) => (
            <section key={index} className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-slate-800">{section.heading}</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className={section.image ? 'md:w-1/2' : 'w-full'}>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">{section.text}</p>
                  {section.image && index % 2 === 0 && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md mt-4">
                      <Image
                        src={section.image}
                        alt={section.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                {section.image && index % 2 !== 0 && (
                  <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={section.image}
                      alt={section.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </section>
          ))}

          <div className="mt-12 p-8 bg-blue-50 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              {lang === 'en' && 'Partner with HousePlus for Manufacturing Excellence in Home Appliances'}
              {lang === 'es' && 'Asóciese con HousePlus para la Excelencia en la Fabricación de Electrodomésticos'}
              {lang === 'de' && 'Arbeiten Sie mit HousePlus für Fertigungsqualität bei Haushaltsgeräten zusammen'}
              {lang === 'fr' && 'Partenariat avec HousePlus pour l\'excellence manufacturière dans les appareils électroménagers'}
              {lang === 'ar' && 'شارك مع HousePlus للتميز في تصنيع الأجهزة المنزلية'}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {lang === 'en' && 'HousePlus is a leading manufacturer of high-quality, innovative home appliances. Contact us today for wholesale inquiries and OEM/ODM services.'}
              {lang === 'es' && 'HousePlus es un fabricante líder de electrodomésticos innovadores y de alta calidad. Contáctenos hoy para consultas al por mayor y servicios OEM/ODM.'}
              {lang === 'de' && 'HousePlus ist ein führender Hersteller von hochwertigen, innovativen Haushaltsgeräten. Kontaktieren Sie uns noch heute für Großhandelsanfragen und OEM/ODM-Dienstleistungen.'}
              {lang === 'fr' && 'HousePlus est un fabricant leader d\'appareils électroménagers innovants et de haute qualité. Contactez-nous dès aujourd\'hui pour les demandes de gros et les services OEM/ODM.'}
              {lang === 'ar' && 'HousePlus هي شركة رائدة في تصنيع الأجهزة المنزلية عالية الجودة والمبتكرة. اتصل بنا اليوم للاستفسارات بالجملة وخدمات OEM/ODM.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {lang === 'en' && 'Contact HousePlus'}
              {lang === 'es' && 'Contactar a HousePlus'}
              {lang === 'de' && 'HousePlus kontaktieren'}
              {lang === 'fr' && 'Contacter HousePlus'}
              {lang === 'ar' && 'اتصل بـ HousePlus'}
            </Link>
          </div>
        </article>
      </main>
    </SchemaRenderer>
  );
}
