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
    en: 'Smart Home Appliances: Efficiency, Innovation, and HousePlus Solutions',
    es: 'Electrodomésticos Inteligentes: Eficiencia, Innovación y Soluciones HousePlus',
    de: 'Smarte Haushaltsgeräte: Effizienz, Innovation und HousePlus-Lösungen',
    fr: 'Appareils électroménagers intelligents : Efficacité, innovation et solutions HousePlus',
    ar: 'الأجهزة المنزلية الذكية: الكفاءة والابتكار وحلول HousePlus',
  };

  const descriptions: Record<string, string> = {
    en: 'Discover how HousePlus is redefining modern living with smart, energy-efficient home appliances. Explore our range of innovative products designed for global wholesale markets.',
    es: 'Descubra cómo HousePlus está redefiniendo la vida moderna con electrodomésticos inteligentes y energéticamente eficientes. Explore nuestra gama de productos innovadores diseñados para mercados mayoristas globales.',
    de: 'Entdecken Sie, wie HousePlus das moderne Leben mit intelligenten, energieeffizienten Haushaltsgeräten neu definiert. Entdecken Sie unser Sortiment an innovativen Produkten, die für globale Großhandelsmärkte entwickelt wurden.',
    fr: 'Découvrez comment HousePlus redéfinit la vie moderne avec des appareils électroménagers intelligents et économes en énergie. Explorez notre gamme de produits innovants conçus pour les marchés de gros mondiaux.',
    ar: 'اكتشف كيف تعيد HousePlus تعريف الحياة العصرية بأجهزة منزلية ذكية وموفرة للطاقة. استكشف مجموعتنا من المنتجات المبتكرة المصممة لأسواق الجملة العالمية.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['smart home appliances', 'energy efficient', 'home electronics', 'HousePlus', 'innovation', 'wholesale'],
    url: `/${lang}/news/smart-home-appliances`,
    lang: lang as any,
    type: 'article',
  });
}

export default async function SmartHomeAppliancesArticle({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
    { name: lang === 'en' ? 'Smart Home Appliances' : 'Electrodomésticos Inteligentes', url: `/${lang}/news/smart-home-appliances` },
  ];

  const articleContent: Record<string, any> = {
    en: {
      title: 'Smart Home Appliances: Efficiency, Innovation, and HousePlus Solutions',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-07-22',
      dateModified: '2023-07-22',
      image: '/images/products/kitchen-appliances.jpg',
      imageAlt: 'Modern kitchen with HousePlus smart home appliances',
      sections: [
        {
          heading: 'The Evolution of Home Appliances',
          text: 'The modern home is becoming increasingly connected and intelligent. Home appliances are no longer just functional; they are smart, energy-efficient, and designed to simplify daily life. This evolution is driven by consumer demand for convenience, sustainability, and advanced technology. HousePlus is at the forefront of this transformation, offering a wide range of innovative home appliances that meet the highest standards of quality and performance.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'Showcase of HousePlus energy-efficient home appliances',
        },
        {
          heading: 'Energy Efficiency: A Core Principle',
          text: 'With rising energy costs and growing environmental awareness, energy efficiency has become a critical factor in home appliance design. HousePlus prioritizes the development of appliances that consume less power without compromising on performance. Our products feature advanced inverter technology, smart sensors, and eco-friendly modes to help consumers reduce their carbon footprint and save on utility bills. This commitment to sustainability is a cornerstone of the HousePlus brand.',
          image: '/images/products/appliances-package.jpg',
          imageAlt: 'HousePlus home appliance package with energy star rating',
        },
        {
          heading: 'Innovation in Every Detail with HousePlus',
          text: 'HousePlus is dedicated to continuous innovation, integrating cutting-edge features into our home appliance range. From smart refrigerators with AI-powered food management to washing machines with intelligent fabric care, our products are designed to enhance the user experience. We offer comprehensive OEM/ODM services, allowing our wholesale partners in Africa, Southeast Asia, and Europe to customize products to their specific market needs. Partner with HousePlus to bring the future of home living to your customers.',
          image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'HousePlus smart kitchen appliances in a modern setting',
        },
        {
          heading: 'The Future is Connected: Smart Home Ecosystems',
          text: 'The trend towards interconnected smart home ecosystems is accelerating. HousePlus appliances are designed to integrate seamlessly with various smart home platforms, offering users centralized control and automation. Imagine a refrigerator that orders groceries when supplies are low, or a washing machine that starts a cycle when electricity rates are lowest. These are the possibilities HousePlus is bringing to life, making homes more efficient, comfortable, and intelligent.',
          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'Smart home devices and wireless charging solutions',
        },
        {
          heading: 'Why Choose HousePlus for Home Appliances?',
          text: 'Choosing HousePlus means partnering with a manufacturer committed to quality, innovation, and customer satisfaction. Our home appliances are CE/FCC/RoHS certified, ensuring global compliance. We offer flexible MOQ and reliable supply chains, making us the ideal partner for wholesale distributors looking to expand their market share with premium, energy-efficient, and smart home solutions. Join the HousePlus family and grow your business with us.',
        },
      ],
    },
    es: {
      title: 'Electrodomésticos Inteligentes: Eficiencia, Innovación y Soluciones HousePlus',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-07-22',
      dateModified: '2023-07-22',
      image: '/images/products/kitchen-appliances.jpg',
      imageAlt: 'Cocina moderna con electrodomésticos inteligentes HousePlus',
      sections: [
        {
          heading: 'La Evolución de los Electrodomésticos',
          text: 'El hogar moderno se está volviendo cada vez más conectado e inteligente. Los electrodomésticos ya no son solo funcionales; son inteligentes, energéticamente eficientes y están diseñados para simplificar la vida diaria. Esta evolución está impulsada por la demanda de los consumidores de comodidad, sostenibilidad y tecnología avanzada. HousePlus está a la vanguardia de esta transformación, ofreciendo una amplia gama de electrodomésticos innovadores que cumplen con los más altos estándares de calidad y rendimiento.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'Exhibición de electrodomésticos HousePlus energéticamente eficientes',
        },
        {
          heading: 'Eficiencia Energética: Un Principio Fundamental',
          text: 'Con el aumento de los costos de la energía y la creciente conciencia ambiental, la eficiencia energética se ha convertido en un factor crítico en el diseño de electrodomésticos. HousePlus prioriza el desarrollo de electrodomésticos que consumen menos energía sin comprometer el rendimiento. Nuestros productos cuentan con tecnología de inversor avanzada, sensores inteligentes y modos ecológicos para ayudar a los consumidores a reducir su huella de carbono y ahorrar en las facturas de servicios públicos. Este compromiso con la sostenibilidad es una piedra angular de la marca HousePlus.',
          image: '/images/products/appliances-package.jpg',
          imageAlt: 'Paquete de electrodomésticos HousePlus con calificación de eficiencia energética',
        },
        {
          heading: 'Innovación en Cada Detalle con HousePlus',
          text: 'HousePlus se dedica a la innovación continua, integrando características de vanguardia en nuestra gama de electrodomésticos. Desde refrigeradores inteligentes con gestión de alimentos impulsada por IA hasta lavadoras con cuidado inteligente de telas, nuestros productos están diseñados para mejorar la experiencia del usuario. Ofrecemos servicios OEM/ODM completos, lo que permite a nuestros socios mayoristas en África, el Sudeste Asiático y Europa personalizar productos según las necesidades específicas de su mercado. Asóciese con HousePlus para llevar el futuro de la vida en el hogar a sus clientes.',
          image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'Electrodomésticos de cocina inteligentes HousePlus en un entorno moderno',
        },
        {
          heading: 'El Futuro Está Conectado: Ecosistemas de Hogar Inteligente',
          text: 'La tendencia hacia ecosistemas de hogar inteligente interconectados se está acelerando. Los electrodomésticos HousePlus están diseñados para integrarse sin problemas con varias plataformas de hogar inteligente, ofreciendo a los usuarios control centralizado y automatización. Imagine un refrigerador que pide comestibles cuando los suministros son bajos, o una lavadora que inicia un ciclo cuando las tarifas de electricidad son más bajas. Estas son las posibilidades que HousePlus está haciendo realidad, haciendo que los hogares sean más eficientes, cómodos e inteligentes.',
          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'Dispositivos de hogar inteligente y soluciones de carga inalámbrica',
        },
        {
          heading: '¿Por Qué Elegir HousePlus para Electrodomésticos?',
          text: 'Elegir HousePlus significa asociarse con un fabricante comprometido con la calidad, la innovación y la satisfacción del cliente. Nuestros electrodomésticos cuentan con certificación CE/FCC/RoHS, lo que garantiza el cumplimiento global. Ofrecemos MOQ flexibles y cadenas de suministro confiables, lo que nos convierte en el socio ideal para distribuidores mayoristas que buscan expandir su cuota de mercado con soluciones premium, energéticamente eficientes e inteligentes para el hogar. Únase a la familia HousePlus y haga crecer su negocio con nosotros.',
        },
      ],
    },
    de: {
      title: 'Smarte Haushaltsgeräte: Effizienz, Innovation und HousePlus-Lösungen',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-07-22',
      dateModified: '2023-07-22',
      image: '/images/products/kitchen-appliances.jpg',
      imageAlt: 'Moderne Küche mit HousePlus Smart Home Geräten',
      sections: [
        {
          heading: 'Die Evolution der Haushaltsgeräte',
          text: 'Das moderne Zuhause wird zunehmend vernetzter und intelligenter. Haushaltsgeräte sind nicht mehr nur funktional; sie sind smart, energieeffizient und darauf ausgelegt, den Alltag zu vereinfachen. Diese Entwicklung wird durch die Verbrauchernachfrage nach Komfort, Nachhaltigkeit und fortschrittlicher Technologie vorangetrieben. HousePlus steht an vorderster Front dieser Transformation und bietet eine breite Palette innovativer Haushaltsgeräte an, die den höchsten Qualitäts- und Leistungsstandards entsprechen.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'Ausstellung von energieeffizienten HousePlus Haushaltsgeräten',
        },
        {
          heading: 'Energieeffizienz: Ein Kernprinzip',
          text: 'Angesichts steigender Energiekosten und wachsendem Umweltbewusstsein ist Energieeffizienz zu einem entscheidenden Faktor im Design von Haushaltsgeräten geworden. HousePlus priorisiert die Entwicklung von Geräten, die weniger Strom verbrauchen, ohne die Leistung zu beeinträchtigen. Unsere Produkte verfügen über fortschrittliche Inverter-Technologie, intelligente Sensoren und umweltfreundliche Modi, um Verbrauchern zu helfen, ihren CO2-Fußabdruck zu reduzieren und Energiekosten zu sparen. Dieses Engagement für Nachhaltigkeit ist ein Eckpfeiler der Marke HousePlus.',
          image: '/images/products/appliances-package.jpg',
          imageAlt: 'HousePlus Haushaltsgerätepaket mit Energielabel',
        },
        {
          heading: 'Innovation in jedem Detail mit HousePlus',
          text: 'HousePlus widmet sich der kontinuierlichen Innovation und integriert modernste Funktionen in unser Haushaltsgerätesortiment. Von intelligenten Kühlschränken mit KI-gestütztem Lebensmittelmanagement bis hin zu Waschmaschinen mit intelligenter Stoffpflege sind unsere Produkte darauf ausgelegt, das Benutzererlebnis zu verbessern. Wir bieten umfassende OEM/ODM-Dienstleistungen an, die es unseren Großhandelspartnern in Afrika, Südostasien und Europa ermöglichen, Produkte an ihre spezifischen Marktanforderungen anzupassen. Arbeiten Sie mit HousePlus zusammen, um die Zukunft des Wohnens zu Ihren Kunden zu bringen.',
          image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'HousePlus Smart Kitchen Geräte in einer modernen Umgebung',
        },
        {
          heading: 'Die Zukunft ist vernetzt: Smart Home Ökosysteme',
          text: 'Der Trend zu vernetzten Smart Home Ökosystemen beschleunigt sich. HousePlus Geräte sind so konzipiert, dass sie sich nahtlos in verschiedene Smart Home Plattformen integrieren lassen und den Benutzern eine zentrale Steuerung und Automatisierung bieten. Stellen Sie sich einen Kühlschrank vor, der Lebensmittel bestellt, wenn die Vorräte knapp werden, oder eine Waschmaschine, die einen Waschgang startet, wenn die Strompreise am niedrigsten sind. Dies sind die Möglichkeiten, die HousePlus zum Leben erweckt und Häuser effizienter, komfortabler und intelligenter macht.',
          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'Smart Home Geräte und kabellose Ladelösungen',
        },
        {
          heading: 'Warum HousePlus für Haushaltsgeräte wählen?',
          text: 'HousePlus zu wählen bedeutet, mit einem Hersteller zusammenzuarbeiten, der sich Qualität, Innovation und Kundenzufriedenheit verschrieben hat. Unsere Haushaltsgeräte sind CE/FCC/RoHS-zertifiziert und gewährleisten globale Konformität. Wir bieten flexible Mindestbestellmengen und zuverlässige Lieferketten, was uns zum idealen Partner für Großhändler macht, die ihren Marktanteil mit Premium-, energieeffizienten und Smart Home Lösungen erweitern möchten. Treten Sie der HousePlus Familie bei und erweitern Sie Ihr Geschäft mit uns.',
        },
      ],
    },
    fr: {
      title: 'Appareils électroménagers intelligents : Efficacité, innovation et solutions HousePlus',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-07-22',
      dateModified: '2023-07-22',
      image: '/images/products/kitchen-appliances.jpg',
      imageAlt: 'Cuisine moderne avec appareils électroménagers intelligents HousePlus',
      sections: [
        {
         heading: 'L\'évolution des appareils électroménagers',
        text: 'La maison moderne devient de plus en plus connectée et intelligente. Les appareils électroménagers ne sont plus seulement fonctionnels ; ils sont intelligents, économes en énergie et conçus pour simplifier la vie quotidienne. Cette évolution est tirée par la demande des consommateurs en matière de commodité, de durabilité et de technologie avancée. HousePlus est à l\'avant-garde de cette transformation, offrant une large gamme d\'appareils électroménagers innovants qui répondent aux normes les plus élevées de qualité et de performance.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'Présentation des appareils électroménagers HousePlus économes en énergie',
        },
        {
          heading: 'Efficacité énergétique : Un principe fondamental',
         text: 'Avec l\'augmentation des coûts de l\'énergie et la prise de conscience environnementale croissante, l\'efficacité énergétique est devenue un facteur critique dans la conception des appareils électroménagers. HousePlus priorise le développement d\'appareils qui consomment moins d\'énergie sans compromettre les performances. Nos produits intègrent une technologie d\'onduleur avancée, des capteurs intelligents et des modes écologiques pour aider les consommateurs à réduire leur empreinte carbone et à économiser sur les factures de services publics. Cet engagement en faveur de la durabilité est une pierre angulaire de la marque HousePlus.',      image: '/images/products/appliances-package.jpg',
          imageAlt: 'Pack d\'appareils électroménagers HousePlus avec étiquette énergétique',
        },
        {
          heading: 'Innovation dans les moindres détails avec HousePlus',
        text: 'HousePlus se consacre à l\'innovation continue, intégrant des fonctionnalités de pointe dans sa gamme d\'appareils électroménagers. Des réfrigérateurs intelligents avec gestion alimentaire basée sur l\'IA aux machines à laver avec soin intelligent des tissus, nos produits sont conçus pour améliorer l\'expérience utilisateur. Nous offrons des services OEM/ODM complets, permettant à nos partenaires grossistes en Afrique, en Asie du Sud-Est et en Europe de personnaliser les produits en fonction des besoins spécifiques de leur marché. Partenariat avec HousePlus pour apporter l\'avenir de la vie à la maison à vos clients.',        image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'Appareils de cuisine intelligents HousePlus dans un cadre moderne',
        },
        {
          heading: 'L\'avenir est connecté : Écosystèmes de maison intelligente',
       text: 'La tendance vers des écosystèmes de maison intelligente interconnectés s\'accélère. Les appareils HousePlus sont conçus pour s\'intégrer de manière transparente à diverses plateformes de maison intelligente, offrant aux utilisateurs un contrôle centralisé et une automatisation. Imaginez un réfrigérateur qui commande des produits d\'épicerie lorsque les stocks sont bas, ou une machine à laver qui démarre un cycle lorsque les tarifs d\'électricité sont les plus bas. Ce sont les possibilités que HousePlus concrétise, rendant les maisons plus efficaces, confortables et intelligentes.',          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'Appareils de maison intelligente et solutions de recharge sans fil',
        },
        {
          heading: 'Pourquoi choisir HousePlus pour les appareils électroménagers ?',
        text: 'Choisir HousePlus, c\'est s\'associer à un fabricant engagé envers la qualité, l\'innovation et la satisfaction client. Nos appareils électroménagers sont certifiés CE/FCC/RoHS, garantissant une conformité mondiale. Nous offrons des MOQ flexibles et des chaînes d\'approvisionnement fiables, ce qui fait de nous le partenaire idéal pour les distributeurs en gros qui cherchent à étendre leur part de marché avec des solutions premium, économes en énergie et intelligentes pour la maison. Rejoignez la famille HousePlus et développez votre entreprise avec nous.',       },
      ],
    },
    ar: {
      title: 'الأجهزة المنزلية الذكية: الكفاءة والابتكار وحلول HousePlus',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-07-22',
      dateModified: '2023-07-22',
      image: '/images/products/kitchen-appliances.jpg',
      imageAlt: 'مطبخ حديث بأجهزة منزلية ذكية من HousePlus',
      sections: [
        {
          heading: 'تطور الأجهزة المنزلية',
          text: 'أصبح المنزل الحديث متصلاً وذكيًا بشكل متزايد. لم تعد الأجهزة المنزلية وظيفية فحسب؛ بل هي ذكية وموفرة للطاقة ومصممة لتبسيط الحياة اليومية. هذا التطور مدفوع بطلب المستهلكين على الراحة والاستدامة والتكنولوجيا المتقدمة. HousePlus في طليعة هذا التحول، حيث تقدم مجموعة واسعة من الأجهزة المنزلية المبتكرة التي تلبي أعلى معايير الجودة والأداء.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'عرض لأجهزة HousePlus المنزلية الموفرة للطاقة',
        },
        {
          heading: 'كفاءة الطاقة: مبدأ أساسي',
          text: 'مع ارتفاع تكاليف الطاقة وتزايد الوعي البيئي، أصبحت كفاءة الطاقة عاملاً حاسمًا في تصميم الأجهزة المنزلية. HousePlus تعطي الأولوية لتطوير الأجهزة التي تستهلك طاقة أقل دون المساومة على الأداء. تتميز منتجاتنا بتقنية العاكس المتقدمة، وأجهزة الاستشعار الذكية، والأوضاع الصديقة للبيئة لمساعدة المستهلكين على تقليل بصمتهم الكربونية وتوفير فواتير الخدمات. هذا الالتزام بالاستدامة هو حجر الزاوية في علامة HousePlus التجارية.',
          image: '/images/products/appliances-package.jpg',
          imageAlt: 'حزمة أجهزة HousePlus المنزلية مع تصنيف كفاءة الطاقة',
        },
        {
          heading: 'الابتكار في كل التفاصيل مع HousePlus',
          text: 'تكرس HousePlus جهودها للابتكار المستمر، ودمج الميزات المتطورة في مجموعة أجهزتنا المنزلية. من الثلاجات الذكية المزودة بإدارة طعام مدعومة بالذكاء الاصطناعي إلى الغسالات المزودة بالعناية الذكية بالأقمشة، تم تصميم منتجاتنا لتعزيز تجربة المستخدم. نقدم خدمات OEM/ODM شاملة، مما يسمح لشركائنا بالجملة في إفريقيا وجنوب شرق آسيا وأوروبا بتخصيص المنتجات لتلبية احتياجات سوقهم الخاصة. شارك مع HousePlus لجلب مستقبل الحياة المنزلية لعملائك.',
          image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'أجهزة مطبخ HousePlus الذكية في بيئة حديثة',
        },
        {
          heading: 'المستقبل متصل: أنظمة المنزل الذكي',
          text: 'يتسارع الاتجاه نحو أنظمة المنزل الذكي المترابطة. تم تصميم أجهزة HousePlus للتكامل بسلاسة مع مختلف منصات المنزل الذكي، مما يوفر للمستخدمين تحكمًا مركزيًا وأتمتة. تخيل ثلاجة تطلب البقالة عندما تكون الإمدادات منخفضة، أو غسالة تبدأ دورة عندما تكون أسعار الكهرباء في أدنى مستوياتها. هذه هي الإمكانيات التي تحققها HousePlus، مما يجعل المنازل أكثر كفاءة وراحة وذكاءً.',
          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'أجهزة المنزل الذكي وحلول الشحن اللاسلكي',
        },
        {
          heading: 'لماذا تختار HousePlus للأجهزة المنزلية؟',
          text: 'اختيار HousePlus يعني الشراكة مع شركة مصنعة ملتزمة بالجودة والابتكار ورضا العملاء. أجهزتنا المنزلية حاصلة على شهادات CE/FCC/RoHS، مما يضمن الامتثال العالمي. نقدم حد أدنى مرن للطلب وسلاسل توريد موثوقة، مما يجعلنا الشريك المثالي للموزعين بالجملة الذين يتطلعون إلى توسيع حصتهم في السوق من خلال حلول منزلية متميزة وموفرة للطاقة وذكية. انضم إلى عائلة HousePlus وقم بتنمية عملك معنا.',
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
    authorName: data.author,

    description: generateSEOMetadata({ lang: lang as any, type: 'article', title: data.title, description: data.sections[0].text, keywords: [], url: `/${lang}/news/smart-home-appliances` }).description as string,
  });

  return (
    <SchemaRenderer schemas={[articleSchema, buildBreadcrumbSchema(breadcrumbs)]}>
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} />

        <article className="max-w-6xl mx-auto py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-slate-900">{data.title}</h1>
          <div className="text-center text-gray-600 mb-8">
            By {data.author} | {new Date(data.datePublished).toLocaleDateString(lang)}
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
              {lang === 'en' && 'Partner with HousePlus for Your Home Appliance Needs'}
              {lang === 'es' && 'Asóciese con HousePlus para sus Necesidades de Electrodomésticos'}
              {lang === 'de' && 'Arbeiten Sie mit HousePlus für Ihre Haushaltsgeräte-Anforderungen zusammen'}
              {lang === 'fr' && 'Partenariat avec HousePlus pour vos besoins en appareils électroménagers'}
              {lang === 'ar' && 'شراكة مع HousePlus لتلبية احتياجاتك من الأجهزة المنزلية'}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {lang === 'en' && 'HousePlus offers a wide range of smart, energy-efficient home appliances. Contact us today for wholesale inquiries and OEM/ODM services.'}
              {lang === 'es' && 'HousePlus ofrece una amplia gama de electrodomésticos inteligentes y energéticamente eficientes. Contáctenos hoy para consultas al por mayor y servicios OEM/ODM.'}
              {lang === 'de' && 'HousePlus bietet eine breite Palette an intelligenten, energieeffizienten Haushaltsgeräten. Kontaktieren Sie uns noch heute für Großhandelsanfragen und OEM/ODM-Dienstleistungen.'}
              {lang === 'fr' && 'HousePlus propose une large gamme d\'appareils électroménagers intelligents et économes en énergie. Contactez-nous dès aujourd\'hui pour les demandes de gros et les services OEM/ODM.'}
              {lang === 'ar' && 'تقدم HousePlus مجموعة واسعة من الأجهزة المنزلية الذكية والموفرة للطاقة. اتصل بنا اليوم للاستفسارات بالجملة وخدمات OEM/ODM.'}
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
