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
    en: 'The Future of Smart Home Appliances: HousePlus Innovations',
    es: 'El Futuro de los Electrodomésticos Inteligentes: Innovaciones HousePlus',
    de: 'Die Zukunft smarter Haushaltsgeräte: HousePlus Innovationen',
    fr: 'L\'avenir des appareils électroménagers intelligents : Innovations HousePlus',
    ar: 'مستقبل الأجهزة المنزلية الذكية: ابتكارات HousePlus',
  };

  const descriptions: Record<string, string> = {
    en: 'Discover how HousePlus is shaping the future of smart home appliances with energy-efficient, connected, and intuitive solutions for modern living and global wholesale markets.',
    es: 'Descubra cómo HousePlus está dando forma al futuro de los electrodomésticos inteligentes con soluciones energéticamente eficientes, conectadas e intuitivas para la vida moderna y los mercados mayoristas globales.',
    de: 'Entdecken Sie, wie HousePlus die Zukunft smarter Haushaltsgeräte mit energieeffizienten, vernetzten und intuitiven Lösungen für modernes Wohnen und globale Großhandelsmärkte gestaltet.',
    fr: 'Découvrez comment HousePlus façonne l\'avenir des appareils électroménagers intelligents avec des solutions écoénergétiques, connectées et intuitives pour la vie moderne et les marchés de gros mondiaux.',
    ar: 'اكتشف كيف تشكل HousePlus مستقبل الأجهزة المنزلية الذكية من خلال حلول موفرة للطاقة ومتصلة وبديهية للحياة العصرية وأسواق الجملة العالمية.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['smart home appliances', 'energy efficient appliances', 'connected home', 'HousePlus', 'innovation', 'wholesale'],
    url: `/${lang}/news/the-future-of-smart-home-appliances`,
    lang: lang as any,
    type: 'article',
  });
}

export default async function SmartHomeAppliancesArticle({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
    { name: lang === 'en' ? 'The Future of Smart Home Appliances' : 'El Futuro de los Electrodomésticos Inteligentes', url: `/${lang}/news/the-future-of-smart-home-appliances` },
  ];

  const articleContent: Record<string, any> = {
    en: {
      title: 'The Future of Smart Home Appliances: HousePlus Innovations',
      authorName: 'Manus AI',
      datePublished: '2026-04-25',
      dateModified: '2026-04-25',
      image: '/images/products/appliances-showcase.png',
      imageAlt: 'Modern smart home appliances from HousePlus',
      sections: [
        {
          heading: 'The Connected Home Revolution',
          text: 'The concept of a smart home is rapidly evolving, with appliances becoming increasingly connected, intelligent, and intuitive. From refrigerators that manage your grocery list to washing machines that optimize cycles based on fabric type, smart home appliances are designed to simplify daily life, enhance comfort, and improve energy efficiency. HousePlus is at the forefront of this revolution, developing and manufacturing innovative smart appliances that integrate seamlessly into the modern home.',
          image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'HousePlus smart kitchen appliances collection',
        },
        {
          heading: 'Energy Efficiency and Sustainability',
          text: 'Beyond connectivity, energy efficiency is a core pillar of future home appliances. Consumers and businesses alike are increasingly prioritizing products that reduce environmental impact and lower utility bills. HousePlus is committed to sustainability, designing appliances that not only perform exceptionally but also consume minimal energy. Our products feature advanced inverter technology, smart sensors, and eco-friendly modes, making them ideal for environmentally conscious markets in Africa, Southeast Asia, and Europe.',
          image: '/images/products/appliances-package.jpg',
          imageAlt: 'HousePlus energy-efficient appliances package',
        },
        {
          heading: 'HousePlus: Your Partner for Smart Appliance Wholesale',
          text: 'As a leading manufacturer, HousePlus offers a comprehensive range of smart home appliances for wholesale buyers. Our portfolio includes smart washing machines, refrigerators, air conditioners, and kitchen appliances, all designed with cutting-edge technology and superior quality. We provide flexible MOQ and robust OEM/ODM services, allowing our partners to customize products to meet specific market demands. Partner with HousePlus to bring the future of smart living to your customers.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'HousePlus smart home appliances showcase',
        },
        {
          heading: 'Innovation and User Experience',
          text: 'At HousePlus, innovation is driven by a deep understanding of user needs. Our smart appliances are not just technologically advanced; they are also designed for an intuitive and seamless user experience. Voice control, AI-powered diagnostics, and remote management via smartphone apps are standard features, ensuring convenience and ease of use. We continuously invest in R&D to push the boundaries of what home appliances can do, making daily chores simpler and more enjoyable.',
        },
        {
          heading: 'The Future is Now with HousePlus',
          text: 'The future of home appliances is here, and it is smart, sustainable, and connected. HousePlus is dedicated to leading this transformation, offering products that not only meet but exceed global standards for quality and innovation. Join us in shaping the smart homes of tomorrow, and provide your customers with the best in modern appliance technology.',
        },
      ],
    },
    es: {
      title: 'El Futuro de los Electrodomésticos Inteligentes: Innovaciones HousePlus',
      authorName: 'Manus AI',
      datePublished: '2026-04-25',
      dateModified: '2026-04-25',
      image: '/images/products/appliances-showcase.png',
      imageAlt: 'Electrodomésticos inteligentes modernos de HousePlus',
      sections: [
        {
          heading: 'La Revolución del Hogar Conectado',
          text: 'El concepto de hogar inteligente está evolucionando rápidamente, con electrodomésticos cada vez más conectados, inteligentes e intuitivos. Desde refrigeradores que gestionan su lista de compras hasta lavadoras que optimizan los ciclos según el tipo de tejido, los electrodomésticos inteligentes están diseñados para simplificar la vida diaria, mejorar la comodidad y aumentar la eficiencia energética. HousePlus está a la vanguardia de esta revolución, desarrollando y fabricando electrodomésticos inteligentes innovadores que se integran perfectamente en el hogar moderno.',
          image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'Colección de electrodomésticos de cocina inteligentes HousePlus',
        },
        {
          heading: 'Eficiencia Energética y Sostenibilidad',
          text: 'Más allá de la conectividad, la eficiencia energética es un pilar fundamental de los futuros electrodomésticos. Tanto los consumidores como las empresas priorizan cada vez más los productos que reducen el impacto ambiental y disminuyen las facturas de servicios públicos. HousePlus está comprometida con la sostenibilidad, diseñando electrodomésticos que no solo funcionan excepcionalmente, sino que también consumen una energía mínima. Nuestros productos cuentan con tecnología de inversor avanzada, sensores inteligentes y modos ecológicos, lo que los hace ideales para mercados conscientes del medio ambiente en África, el Sudeste Asiático y Europa.',
          image: '/images/products/appliances-package.jpg',
          imageAlt: 'Paquete de electrodomésticos energéticamente eficientes HousePlus',
        },
        {
          heading: 'HousePlus: Su Socio para la Venta al por Mayor de Electrodomésticos Inteligentes',
          text: 'Como fabricante líder, HousePlus ofrece una amplia gama de electrodomésticos inteligentes para compradores mayoristas. Nuestra cartera incluye lavadoras inteligentes, refrigeradores, aires acondicionados y electrodomésticos de cocina, todos diseñados con tecnología de vanguardia y calidad superior. Ofrecemos MOQ flexibles y servicios OEM/ODM robustos, lo que permite a nuestros socios personalizar productos para satisfacer las demandas específicas del mercado. Asóciese con HousePlus para llevar el futuro de la vida inteligente a sus clientes.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'Exhibición de electrodomésticos inteligentes HousePlus',
        },
        {
          heading: 'Innovación y Experiencia de Usuario',
          text: 'En HousePlus, la innovación está impulsada por una profunda comprensión de las necesidades del usuario. Nuestros electrodomésticos inteligentes no solo son tecnológicamente avanzados; también están diseñados para una experiencia de usuario intuitiva y fluida. El control por voz, los diagnósticos impulsados por IA y la gestión remota a través de aplicaciones de teléfonos inteligentes son características estándar, lo que garantiza la comodidad y la facilidad de uso. Invertimos continuamente en I+D para ampliar los límites de lo que los electrodomésticos pueden hacer, haciendo que las tareas diarias sean más simples y agradables.',
        },
        {
          heading: 'El Futuro es Ahora con HousePlus',
          text: 'El futuro de los electrodomésticos está aquí, y es inteligente, sostenible y conectado. HousePlus se dedica a liderar esta transformación, ofreciendo productos que no solo cumplen, sino que superan los estándares globales de calidad e innovación. Únase a nosotros para dar forma a los hogares inteligentes del mañana y proporcione a sus clientes lo mejor en tecnología de electrodomésticos moderna.',
        },
      ],
    },
    de: {
      title: 'Die Zukunft smarter Haushaltsgeräte: HousePlus Innovationen',
      authorName: 'Manus AI',
      datePublished: '2026-04-25',
      dateModified: '2026-04-25',
      image: '/images/products/appliances-showcase.png',
      imageAlt: 'Moderne smarte Haushaltsgeräte von HousePlus',
      sections: [
        {
          heading: 'Die Revolution des vernetzten Zuhauses',
          text: 'Das Konzept des Smart Homes entwickelt sich rasant weiter, wobei Haushaltsgeräte zunehmend vernetzter, intelligenter und intuitiver werden. Von Kühlschränken, die Ihre Einkaufsliste verwalten, bis hin zu Waschmaschinen, die Zyklen basierend auf dem Stofftyp optimieren, sind smarte Haushaltsgeräte darauf ausgelegt, den Alltag zu vereinfachen, den Komfort zu erhöhen und die Energieeffizienz zu verbessern. HousePlus steht an vorderster Front dieser Revolution und entwickelt und fertigt innovative smarte Geräte, die sich nahtlos in das moderne Zuhause integrieren.',
          image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'HousePlus smarte Küchengeräte-Kollektion',
        },
        {
          heading: 'Energieeffizienz und Nachhaltigkeit',
          text: 'Neben der Konnektivität ist Energieeffizienz eine Kernsäule zukünftiger Haushaltsgeräte. Verbraucher und Unternehmen gleichermaßen priorisieren zunehmend Produkte, die die Umweltbelastung reduzieren und die Betriebskosten senken. HousePlus engagiert sich für Nachhaltigkeit und entwickelt Geräte, die nicht nur außergewöhnlich leistungsfähig sind, sondern auch minimal Energie verbrauchen. Unsere Produkte verfügen über fortschrittliche Inverter-Technologie, intelligente Sensoren und umweltfreundliche Modi, wodurch sie ideal für umweltbewusste Märkte in Afrika, Südostasien und Europa sind.',
          image: '/images/products/appliances-package.jpg',
          imageAlt: 'HousePlus energieeffizientes Gerätepaket',
        },
        {
          heading: 'HousePlus: Ihr Partner für den Großhandel mit smarten Geräten',
          text: 'Als führender Hersteller bietet HousePlus eine umfassende Palette smarter Haushaltsgeräte für Großhandelskäufer an. Unser Portfolio umfasst smarte Waschmaschinen, Kühlschränke, Klimaanlagen und Küchengeräte, die alle mit modernster Technologie und höchster Qualität entwickelt wurden. Wir bieten flexible Mindestbestellmengen und robuste OEM/ODM-Dienstleistungen, die es unseren Partnern ermöglichen, Produkte an spezifische Marktanforderungen anzupassen. Arbeiten Sie mit HousePlus zusammen, um die Zukunft des smarten Wohnens zu Ihren Kunden zu bringen.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'HousePlus smarte Haushaltsgeräte-Ausstellung',
        },
        {
          heading: 'Innovation und Benutzererfahrung',
          text: 'Bei HousePlus wird Innovation durch ein tiefes Verständnis der Benutzerbedürfnisse vorangetrieben. Unsere smarten Geräte sind nicht nur technologisch fortschrittlich; sie sind auch für eine intuitive und nahtlose Benutzererfahrung konzipiert. Sprachsteuerung, KI-gestützte Diagnosen und Fernverwaltung über Smartphone-Apps sind Standardfunktionen, die Komfort und Benutzerfreundlichkeit gewährleisten. Wir investieren kontinuierlich in Forschung und Entwicklung, um die Grenzen dessen, was Haushaltsgeräte leisten können, zu erweitern und alltägliche Aufgaben einfacher und angenehmer zu gestalten.',
        },
        {
          heading: 'Die Zukunft ist jetzt mit HousePlus',
          text: 'Die Zukunft der Haushaltsgeräte ist da, und sie ist smart, nachhaltig und vernetzt. HousePlus widmet sich der Führung dieser Transformation und bietet Produkte an, die globale Standards für Qualität und Innovation nicht nur erfüllen, sondern übertreffen. Gestalten Sie mit uns die Smart Homes von morgen und bieten Sie Ihren Kunden das Beste an moderner Gerätetechnologie.',
        },
      ],
    },
    fr: {
      title: 'L\'avenir des appareils électroménagers intelligents : Innovations HousePlus',
      authorName: 'Manus AI',
      datePublished: '2026-04-25',
      dateModified: '2026-04-25',
      image: '/images/products/appliances-showcase.png',
      imageAlt: 'Appareils électroménagers intelligents modernes de HousePlus',
      sections: [
        {
          heading: 'La Révolution de la Maison Connectée',
          text: 'Le concept de maison intelligente évolue rapidement, avec des appareils électroménagers de plus en plus connectés, intelligents et intuitifs. Des réfrigérateurs qui gèrent votre liste de courses aux machines à laver qui optimisent les cycles en fonction du type de tissu, les appareils électroménagers intelligents sont conçus pour simplifier la vie quotidienne, améliorer le confort et augmenter l\'efficacité énergétique. HousePlus est à l\'avant-garde de cette révolution, développant et fabriquant des appareils intelligents innovants qui s\'intègrent parfaitement dans la maison moderne.',
          image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'Collection d\'appareils de cuisine intelligents HousePlus',
        },
        {
          heading: 'Efficacité Énergétique et Durabilité',
          text: 'Au-delà de la connectivité, l\'efficacité énergétique est un pilier fondamental des futurs appareils électroménagers. Les consommateurs et les entreprises privilégient de plus en plus les produits qui réduisent l\'impact environnemental et diminuent les factures de services publics. HousePlus s\'engage en faveur de la durabilité, en concevant des appareils qui non seulement fonctionnent exceptionnellement, mais consomment également un minimum d\'énergie. Nos produits intègrent une technologie d\'onduleur avancée, des capteurs intelligents et des modes écologiques, ce qui les rend idéaux pour les marchés soucieux de l\'environnement en Afrique, en Asie du Sud-Est et en Europe.',
          image: '/images/products/appliances-package.jpg',
          imageAlt: 'Pack d\'appareils électroménagers écoénergétiques HousePlus',
        },
        {
          heading: 'HousePlus : Votre Partenaire pour la Vente en Gros d\'Appareils Intelligents',
          text: 'En tant que fabricant leader, HousePlus propose une gamme complète d\'appareils électroménagers intelligents pour les acheteurs en gros. Notre portefeuille comprend des machines à laver intelligentes, des réfrigérateurs, des climatiseurs et des appareils de cuisine, tous conçus avec une technologie de pointe et une qualité supérieure. Nous offrons des MOQ flexibles et des services OEM/ODM robustes, permettant à nos partenaires de personnaliser les produits pour répondre aux demandes spécifiques du marché. Partenariat avec HousePlus pour apporter l\'avenir de la vie intelligente à vos clients.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'Présentation des appareils électroménagers intelligents HousePlus',
        },
        {
          heading: 'Innovation et Expérience Utilisateur',
          text: 'Chez HousePlus, l\'innovation est motivée par une compréhension approfondie des besoins des utilisateurs. Nos appareils intelligents ne sont pas seulement technologiquement avancés ; ils sont également conçus pour une expérience utilisateur intuitive et transparente. Le contrôle vocal, les diagnostics basés sur l\'IA et la gestion à distance via des applications pour smartphone sont des fonctionnalités standard, garantissant commodité et facilité d\'utilisation. Nous investissons continuellement dans la R&D pour repousser les limites de ce que les appareils électroménagers peuvent faire, rendant les tâches quotidiennes plus simples et plus agréables.',
        },
        {
          heading: 'L\'avenir est maintenant avec HousePlus',
          text: 'L\'avenir des appareils électroménagers est là, et il est intelligent, durable et connecté. HousePlus se consacre à diriger cette transformation, en proposant des produits qui non seulement répondent, mais dépassent les normes mondiales de qualité et d\'innovation. Rejoignez-nous pour façonner les maisons intelligentes de demain et offrez à vos clients le meilleur de la technologie moderne des appareils électroménagers.',
        },
      ],
    },
    ar: {
      title: 'مستقبل الأجهزة المنزلية الذكية: ابتكارات HousePlus',
      authorName: 'Manus AI',
      datePublished: '2026-04-25',
      dateModified: '2026-04-25',
      image: '/images/products/appliances-showcase.png',
      imageAlt: 'أجهزة منزلية ذكية حديثة من HousePlus',
      sections: [
        {
          heading: 'ثورة المنزل المتصل',
          text: 'يتطور مفهوم المنزل الذكي بسرعة، حيث أصبحت الأجهزة متصلة وذكية وبديهية بشكل متزايد. من الثلاجات التي تدير قائمة البقالة الخاصة بك إلى الغسالات التي تحسن الدورات بناءً على نوع القماش، تم تصميم الأجهزة المنزلية الذكية لتبسيط الحياة اليومية، وتعزيز الراحة، وتحسين كفاءة الطاقة. HousePlus في طليعة هذه الثورة، حيث تقوم بتطوير وتصنيع أجهزة ذكية مبتكرة تتكامل بسلاسة في المنزل الحديث.',
          image: '/images/products/kitchen-appliances.jpg',
          imageAlt: 'مجموعة أجهزة المطبخ الذكية من HousePlus',
        },
        {
          heading: 'كفاءة الطاقة والاستدامة',
          text: 'بالإضافة إلى الاتصال، تعد كفاءة الطاقة ركيزة أساسية للأجهزة المنزلية المستقبلية. يولي المستهلكون والشركات على حد سواء أولوية متزايدة للمنتجات التي تقلل من التأثير البيئي وتخفض فواتير الخدمات. تلتزم HousePlus بالاستدامة، حيث تصمم أجهزة لا تؤدي أداءً استثنائيًا فحسب، بل تستهلك أيضًا الحد الأدنى من الطاقة. تتميز منتجاتنا بتقنية العاكس المتقدمة، وأجهزة الاستشعار الذكية، والأوضاع الصديقة للبيئة، مما يجعلها مثالية للأسواق الواعية بيئيًا في إفريقيا وجنوب شرق آسيا وأوروبا.',
          image: '/images/products/appliances-package.jpg',
          imageAlt: 'حزمة أجهزة HousePlus الموفرة للطاقة',
        },
        {
          heading: 'HousePlus: شريكك في تجارة الأجهزة الذكية بالجملة',
          text: 'بصفتها شركة مصنعة رائدة، تقدم HousePlus مجموعة شاملة من الأجهزة المنزلية الذكية للمشترين بالجملة. تتضمن محفظتنا الغسالات الذكية، والثلاجات، ومكيفات الهواء، وأجهزة المطبخ، وكلها مصممة بأحدث التقنيات والجودة الفائقة. نقدم حد أدنى مرن للطلب وخدمات OEM/ODM قوية، مما يسمح لشركائنا بتخصيص المنتجات لتلبية متطلبات السوق المحددة. شارك مع HousePlus لجلب مستقبل الحياة الذكية لعملائك.',
          image: '/images/products/appliances-showcase.png',
          imageAlt: 'عرض أجهزة HousePlus المنزلية الذكية',
        },
        {
          heading: 'الابتكار وتجربة المستخدم',
          text: 'في HousePlus، يدفع الابتكار فهم عميق لاحتياجات المستخدم. أجهزتنا الذكية ليست متقدمة تقنيًا فحسب؛ بل تم تصميمها أيضًا لتجربة مستخدم بديهية وسلسة. التحكم الصوتي، والتشخيصات المدعومة بالذكاء الاصطناعي، والإدارة عن بعد عبر تطبيقات الهواتف الذكية هي ميزات قياسية، مما يضمن الراحة وسهولة الاستخدام. نستثمر باستمرار في البحث والتطوير لدفع حدود ما يمكن أن تفعله الأجهزة المنزلية، مما يجعل المهام اليومية أبسط وأكثر متعة.',
        },
        {
          heading: 'المستقبل الآن مع HousePlus',
          text: 'مستقبل الأجهزة المنزلية هنا، وهو ذكي ومستدام ومتصل. تكرس HousePlus جهودها لقيادة هذا التحول، وتقديم منتجات لا تلبي المعايير العالمية للجودة والابتكار فحسب، بل تتجاوزها. انضم إلينا في تشكيل المنازل الذكية للغد، وزود عملائك بأفضل ما في تكنولوجيا الأجهزة الحديثة.',
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
    description: generateSEOMetadata({ lang: lang as any, type: 'article', title: data.title, description: data.sections[0].text, keywords: [], url: `/${lang}/news/the-future-of-smart-home-appliances` }).description as string,
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
              {lang === 'en' && 'Partner with HousePlus for Advanced Smart Home Solutions'}
              {lang === 'es' && 'Asóciese con HousePlus para Soluciones Avanzadas para el Hogar Inteligente'}
              {lang === 'de' && 'Arbeiten Sie mit HousePlus für fortschrittliche Smart-Home-Lösungen zusammen'}
              {lang === 'fr' && 'Partenariat avec HousePlus pour des solutions avancées pour la maison intelligente'}
              {lang === 'ar' && 'شارك مع HousePlus للحصول على حلول المنزل الذكي المتقدمة'}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {lang === 'en' && 'HousePlus offers a wide range of reliable and efficient smart home appliances. Contact us today for wholesale inquiries and OEM/ODM services.'}
              {lang === 'es' && 'HousePlus ofrece una amplia gama de electrodomésticos inteligentes confiables y eficientes. Contáctenos hoy para consultas al por mayor y servicios OEM/ODM.'}
              {lang === 'de' && 'HousePlus bietet eine breite Palette zuverlässiger und effizienter Smart-Home-Geräte. Kontaktieren Sie uns noch heute für Großhandelsanfragen und OEM/ODM-Dienstleistungen.'}
              {lang === 'fr' && 'HousePlus propose une large gamme d\'appareils électroménagers intelligents fiables et efficaces. Contactez-nous dès aujourd\'hui pour les demandes de gros et les services OEM/ODM.'}
              {lang === 'ar' && 'تقدم HousePlus مجموعة واسعة من الأجهزة المنزلية الذكية الموثوقة والفعالة. اتصل بنا اليوم للاستفسارات بالجملة وخدمات OEM/ODM.'}
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
