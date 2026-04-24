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
    en: 'The Evolution of 3C Electronics: Innovation and HousePlus Solutions',
    es: 'La Evolución de la Electrónica 3C: Innovación y Soluciones HousePlus',
    de: 'Die Evolution der 3C-Elektronik: Innovation und HousePlus-Lösungen',
    fr: 'L\'évolution de l\'électronique 3C : Innovation et solutions HousePlus',
    ar: 'تطور الإلكترونيات 3C: الابتكار وحلول HousePlus',
  };

  const descriptions: Record<string, string> = {
    en: 'Explore the rapid advancements in 3C electronics, from smart devices to LED lighting. Discover how HousePlus delivers cutting-edge, reliable solutions for global wholesale markets.',
    es: 'Explore los rápidos avances en electrónica 3C, desde dispositivos inteligentes hasta iluminación LED. Descubra cómo HousePlus ofrece soluciones de vanguardia y confiables para los mercados mayoristas globales.',
    de: 'Entdecken Sie die rasanten Fortschritte in der 3C-Elektronik, von Smart Devices bis zur LED-Beleuchtung. Erfahren Sie, wie HousePlus modernste, zuverlässige Lösungen für globale Großhandelsmärkte liefert.',
    fr: 'Explorez les avancées rapides de l\'électronique 3C, des appareils intelligents à l\'éclairage LED. Découvrez comment HousePlus fournit des solutions de pointe et fiables pour les marchés de gros mondiaux.',
    ar: 'استكشف التطورات السريعة في الإلكترونيات 3C، من الأجهزة الذكية إلى إضاءة LED. اكتشف كيف تقدم HousePlus حلولًا متطورة وموثوقة لأسواق الجملة العالمية.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['3C electronics', 'smart devices', 'LED lighting', 'HousePlus', 'innovation', 'wholesale'],
    url: `/${lang}/news/the-evolution-of-3c-electronics`,
    lang: lang as any,
    type: 'article',
  });
}

export default async function ThreeCElectronicsArticle({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
    { name: lang === 'en' ? 'The Evolution of 3C Electronics' : 'La Evolución de la Electrónica 3C', url: `/${lang}/news/the-evolution-of-3c-electronics` },
  ];

  const articleContent: Record<string, any> = {
    en: {
      title: 'The Evolution of 3C Electronics: Innovation and HousePlus Solutions',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-11-08',
      dateModified: '2023-11-08',
      image: '/images/products/wireless-charger.jpg',
      imageAlt: 'Modern 3C electronics devices including wireless chargers and smart gadgets',
      sections: [
        {
          heading: 'The Dynamic World of 3C Electronics',
          text: 'The 3C electronics sector (Computer, Communication, Consumer Electronics) is one of the fastest-evolving industries globally. Driven by relentless innovation, it constantly introduces new technologies that reshape how we live, work, and interact. From powerful smartphones and smart wearables to advanced home entertainment systems and energy-efficient LED lighting, 3C electronics are integral to modern life. HousePlus is a key player in this dynamic market, offering a diverse portfolio of cutting-edge products.',
          image: '/images/products/led-lighting.jpg',
          imageAlt: 'HousePlus energy-efficient LED lighting solutions',
        },
        {
          heading: 'Innovation at the Core: Smart Devices and Connectivity',
          text: 'Connectivity and intelligence are the hallmarks of modern 3C electronics. The rise of IoT (Internet of Things) has led to an explosion of smart devices that seamlessly integrate into our daily routines. HousePlus embraces this trend by developing and manufacturing smart gadgets that offer superior performance, intuitive user experiences, and robust connectivity. Our products are designed to meet the demands of a tech-savvy global market, providing reliable solutions for wholesale partners.',
          image: '/images/products/power-bank.jpg',
          imageAlt: 'HousePlus portable power bank and other smart devices',
        },
        {
          heading: 'HousePlus: Your Trusted Partner for 3C Electronics Wholesale',
          text: 'As a leading manufacturer, HousePlus specializes in providing high-quality 3C electronics to wholesale buyers in Africa, Southeast Asia, and Europe. Our extensive product range includes smart home devices, portable power solutions, and advanced LED lighting. We pride ourselves on our commitment to innovation, quality control, and customer satisfaction. All HousePlus products are CE/FCC/RoHS certified, ensuring they meet international standards. We offer flexible MOQ and comprehensive OEM/ODM services, making us the ideal partner for businesses looking to expand their 3C electronics offerings.',
          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'HousePlus wireless charger and other 3C electronic products',
        },
        {
          heading: 'The Future is Bright: Sustainable and Smart',
          text: 'The future of 3C electronics is geared towards greater sustainability, enhanced intelligence, and seamless integration. HousePlus is actively investing in R&D to develop eco-friendly materials, more energy-efficient designs, and AI-powered functionalities. We are committed to shaping a future where technology not only enriches lives but also respects our planet. Join HousePlus in this exciting journey of innovation and growth.',
        },
      ],
    },
    es: {
      title: 'La Evolución de la Electrónica 3C: Innovación y Soluciones HousePlus',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-11-08',
      dateModified: '2023-11-08',
      image: '/images/products/wireless-charger.jpg',
      imageAlt: 'Dispositivos electrónicos 3C modernos que incluyen cargadores inalámbricos y gadgets inteligentes',
      sections: [
        {
          heading: 'El Mundo Dinámico de la Electrónica 3C',
          text: 'El sector de la electrónica 3C (Computación, Comunicación, Electrónica de Consumo) es una de las industrias de más rápida evolución a nivel mundial. Impulsado por una innovación implacable, introduce constantemente nuevas tecnologías que remodelan nuestra forma de vivir, trabajar e interactuar. Desde potentes teléfonos inteligentes y dispositivos portátiles inteligentes hasta sistemas avanzados de entretenimiento en el hogar e iluminación LED de bajo consumo, la electrónica 3C es parte integral de la vida moderna. HousePlus es un actor clave en este mercado dinámico, ofreciendo una cartera diversa de productos de vanguardia.',
          image: '/images/products/led-lighting.jpg',
          imageAlt: 'Soluciones de iluminación LED de bajo consumo de HousePlus',
        },
        {
          heading: 'La Innovación en el Núcleo: Dispositivos Inteligentes y Conectividad',
          text: 'La conectividad y la inteligencia son las características distintivas de la electrónica 3C moderna. El auge del IoT (Internet de las Cosas) ha llevado a una explosión de dispositivos inteligentes que se integran sin problemas en nuestras rutinas diarias. HousePlus abraza esta tendencia desarrollando y fabricando gadgets inteligentes que ofrecen un rendimiento superior, experiencias de usuario intuitivas y una conectividad robusta. Nuestros productos están diseñados para satisfacer las demandas de un mercado global conocedor de la tecnología, proporcionando soluciones confiables para socios mayoristas.',
          image: '/images/products/power-bank.jpg',
          imageAlt: 'Batería externa portátil HousePlus y otros dispositivos inteligentes',
        },
        {
          heading: 'HousePlus: Su Socio de Confianza para la Venta al por Mayor de Electrónica 3C',
          text: 'Como fabricante líder, HousePlus se especializa en proporcionar electrónica 3C de alta calidad a compradores mayoristas en África, el Sudeste Asiático y Europa. Nuestra amplia gama de productos incluye dispositivos inteligentes para el hogar, soluciones de energía portátiles e iluminación LED avanzada. Nos enorgullecemos de nuestro compromiso con la innovación, el control de calidad y la satisfacción del cliente. Todos los productos HousePlus cuentan con certificación CE/FCC/RoHS, lo que garantiza que cumplen con los estándares internacionales. Ofrecemos MOQ flexibles y servicios OEM/ODM completos, lo que nos convierte en el socio ideal para empresas que buscan expandir sus ofertas de electrónica 3C.',
          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'Cargador inalámbrico HousePlus y otros productos electrónicos 3C',
        },
        {
          heading: 'El Futuro es Brillante: Sostenible e Inteligente',
          text: 'El futuro de la electrónica 3C se orienta hacia una mayor sostenibilidad, una inteligencia mejorada y una integración perfecta. HousePlus está invirtiendo activamente en I+D para desarrollar materiales ecológicos, diseños más eficientes energéticamente y funcionalidades impulsadas por IA. Estamos comprometidos a dar forma a un futuro donde la tecnología no solo enriquezca vidas, sino que también respete nuestro planeta. Únase a HousePlus en este emocionante viaje de innovación y crecimiento.',
        },
      ],
    },
    de: {
      title: 'Die Evolution der 3C-Elektronik: Innovation und HousePlus-Lösungen',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-11-08',
      dateModified: '2023-11-08',
      image: '/images/products/wireless-charger.jpg',
      imageAlt: 'Moderne 3C-Elektronikgeräte, einschließlich kabelloser Ladegeräte und Smart Gadgets',
      sections: [
        {
          heading: 'Die dynamische Welt der 3C-Elektronik',
          text: 'Der 3C-Elektroniksektor (Computer, Kommunikation, Unterhaltungselektronik) ist eine der sich am schnellsten entwickelnden Branchen weltweit. Angetrieben von unermüdlicher Innovation führt er ständig neue Technologien ein, die unsere Art zu leben, zu arbeiten und zu interagieren neu gestalten. Von leistungsstarken Smartphones und intelligenten Wearables bis hin zu fortschrittlichen Home-Entertainment-Systemen und energieeffizienter LED-Beleuchtung ist die 3C-Elektronik integraler Bestandteil des modernen Lebens. HousePlus ist ein wichtiger Akteur in diesem dynamischen Markt und bietet ein vielfältiges Portfolio an hochmodernen Produkten.',
          image: '/images/products/led-lighting.jpg',
          imageAlt: 'HousePlus energieeffiziente LED-Beleuchtungslösungen',
        },
        {
          heading: 'Innovation im Kern: Smart Devices und Konnektivität',
          text: 'Konnektivität und Intelligenz sind die Kennzeichen der modernen 3C-Elektronik. Der Aufstieg des IoT (Internet der Dinge) hat zu einer Explosion von Smart Devices geführt, die sich nahtlos in unsere täglichen Routinen integrieren. HousePlus greift diesen Trend auf, indem es intelligente Gadgets entwickelt und herstellt, die überragende Leistung, intuitive Benutzererlebnisse und robuste Konnektivität bieten. Unsere Produkte sind darauf ausgelegt, die Anforderungen eines technikaffinen globalen Marktes zu erfüllen und zuverlässige Lösungen für Großhandelspartner bereitzustellen.',
          image: '/images/products/power-bank.jpg',
          imageAlt: 'HousePlus tragbare Powerbank und andere Smart Devices',
        },
        {
          heading: 'HousePlus: Ihr vertrauenswürdiger Partner für den 3C-Elektronik-Großhandel',
          text: 'Als führender Hersteller ist HousePlus darauf spezialisiert, hochwertige 3C-Elektronik an Großhandelskäufer in Afrika, Südostasien und Europa zu liefern. Unser umfangreiches Produktsortiment umfasst Smart-Home-Geräte, tragbare Energielösungen und fortschrittliche LED-Beleuchtung. Wir sind stolz auf unser Engagement für Innovation, Qualitätskontrolle und Kundenzufriedenheit. Alle HousePlus-Produkte sind CE/FCC/RoHS-zertifiziert, um sicherzustellen, dass sie internationalen Standards entsprechen. Wir bieten flexible Mindestbestellmengen und umfassende OEM/ODM-Dienstleistungen an, was uns zum idealen Partner für Unternehmen macht, die ihr 3C-Elektronikangebot erweitern möchten.',
          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'HousePlus kabelloses Ladegerät und andere 3C-Elektronikprodukte',
        },
        {
          heading: 'Die Zukunft ist hell: Nachhaltig und Smart',
          text: 'Die Zukunft der 3C-Elektronik ist auf größere Nachhaltigkeit, verbesserte Intelligenz und nahtlose Integration ausgerichtet. HousePlus investiert aktiv in Forschung und Entwicklung, um umweltfreundliche Materialien, energieeffizientere Designs und KI-gestützte Funktionen zu entwickeln. Wir setzen uns dafür ein, eine Zukunft zu gestalten, in der Technologie nicht nur das Leben bereichert, sondern auch unseren Planeten respektiert. Begleiten Sie HousePlus auf dieser spannenden Reise der Innovation und des Wachstums.',
        },
      ],
    },
    fr: {
      title: 'L\'évolution de l\'électronique 3C : Innovation et solutions HousePlus',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-11-08',
      dateModified: '2023-11-08',
      image: '/images/products/wireless-charger.jpg',
      imageAlt: 'Appareils électroniques 3C modernes, y compris les chargeurs sans fil et les gadgets intelligents',
      sections: [
        {
          heading: 'Le monde dynamique de l\'électronique 3C',
          text: 'Le secteur de l\'électronique 3C (informatique, communication, électronique grand public) est l\'une des industries qui évoluent le plus rapidement au niveau mondial. Poussé par une innovation incessante, il introduit constamment de nouvelles technologies qui remodèlent notre façon de vivre, de travailler et d\'interagir. Des smartphones puissants et des wearables intelligents aux systèmes de divertissement à domicile avancés et à l\'éclairage LED économe en énergie, l\'électronique 3C fait partie intégrante de la vie moderne. HousePlus est un acteur clé de ce marché dynamique, offrant un portefeuille diversifié de produits de pointe.',
          image: '/images/products/led-lighting.jpg',
          imageAlt: 'Solutions d\'éclairage LED écoénergétiques HousePlus',
        },
        {
          heading: 'L\'innovation au cœur : Appareils intelligents et connectivité',
          text: 'La connectivité et l\'intelligence sont les caractéristiques de l\'électronique 3C moderne. L\'essor de l\'IoT (Internet des objets) a conduit à une explosion d\'appareils intelligents qui s\'intègrent de manière transparente dans nos routines quotidiennes. HousePlus adopte cette tendance en développant et en fabriquant des gadgets intelligents qui offrent des performances supérieures, des expériences utilisateur intuitives et une connectivité robuste. Nos produits sont conçus pour répondre aux exigences d\'un marché mondial féru de technologie, offrant des solutions fiables aux partenaires grossistes.',
          image: '/images/products/power-bank.jpg',
          imageAlt: 'Batterie externe portable HousePlus et autres appareils intelligents',
        },
        {
          heading: 'HousePlus : Votre partenaire de confiance pour la vente en gros d\'électronique 3C',
          text: 'En tant que fabricant leader, HousePlus est spécialisé dans la fourniture d\'électronique 3C de haute qualité aux acheteurs en gros en Afrique, en Asie du Sud-Est et en Europe. Notre vaste gamme de produits comprend des appareils intelligents pour la maison, des solutions d\'alimentation portables et un éclairage LED avancé. Nous sommes fiers de notre engagement envers l\'innovation, le contrôle qualité et la satisfaction client. Tous les produits HousePlus sont certifiés CE/FCC/RoHS, garantissant qu\'ils répondent aux normes internationales. Nous offrons des MOQ flexibles et des services OEM/ODM complets, ce qui fait de nous le partenaire idéal pour les entreprises qui cherchent à étendre leurs offres d\'électronique 3C.',
          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'Chargeur sans fil HousePlus et autres produits électroniques 3C',
        },
        {
          heading: 'L\'avenir est prometteur : Durable et intelligent',
          text: 'L\'avenir de l\'électronique 3C est orienté vers une plus grande durabilité, une intelligence améliorée et une intégration transparente. HousePlus investit activement dans la R&D pour développer des matériaux respectueux de l\'environnement, des conceptions plus économes en énergie et des fonctionnalités basées sur l\'IA. Nous nous engageons à façonner un avenir où la technologie non seulement enrichit les vies, mais respecte également notre planète. Rejoignez HousePlus dans ce voyage passionnant d\'innovation et de croissance.',
        },
      ],
    },
    ar: {
      title: 'تطور الإلكترونيات 3C: الابتكار وحلول HousePlus',
      author: 'HousePlus Editorial Team',
      datePublished: '2023-11-08',
      dateModified: '2023-11-08',
      image: '/images/products/wireless-charger.jpg',
      imageAlt: 'أجهزة إلكترونيات 3C حديثة بما في ذلك الشواحن اللاسلكية والأدوات الذكية',
      sections: [
        {
          heading: 'العالم الديناميكي للإلكترونيات 3C',
          text: 'يعد قطاع الإلكترونيات 3C (الكمبيوتر والاتصالات والإلكترونيات الاستهلاكية) أحد أسرع الصناعات تطوراً على مستوى العالم. مدفوعًا بالابتكار المستمر، فإنه يقدم باستمرار تقنيات جديدة تعيد تشكيل طريقة عيشنا وعملنا وتفاعلنا. من الهواتف الذكية القوية والأجهزة القابلة للارتداء الذكية إلى أنظمة الترفيه المنزلية المتقدمة وإضاءة LED الموفرة للطاقة، تعد الإلكترونيات 3C جزءًا لا يتجزأ من الحياة الحديثة. HousePlus لاعب رئيسي في هذا السوق الديناميكي، حيث تقدم مجموعة متنوعة من المنتجات المتطورة.',
          image: '/images/products/led-lighting.jpg',
          imageAlt: 'حلول إضاءة LED الموفرة للطاقة من HousePlus',
        },
        {
          heading: 'الابتكار في الجوهر: الأجهزة الذكية والاتصال',
          text: 'الاتصال والذكاء هما السمتان المميزتان للإلكترونيات 3C الحديثة. أدى صعود إنترنت الأشياء (IoT) إلى انفجار في الأجهزة الذكية التي تتكامل بسلاسة في روتيننا اليومي. تتبنى HousePlus هذا الاتجاه من خلال تطوير وتصنيع الأدوات الذكية التي توفر أداءً فائقًا وتجارب مستخدم بديهية واتصالًا قويًا. تم تصميم منتجاتنا لتلبية متطلبات السوق العالمي المتطور تقنيًا، وتوفير حلول موثوقة لشركاء الجملة.',
          image: '/images/products/power-bank.jpg',
          imageAlt: 'بنك طاقة محمول من HousePlus وأجهزة ذكية أخرى',
        },
        {
          heading: 'HousePlus: شريكك الموثوق به لبيع الإلكترونيات 3C بالجملة',
          text: 'بصفتها شركة مصنعة رائدة، تتخصص HousePlus في توفير إلكترونيات 3C عالية الجودة للمشترين بالجملة في إفريقيا وجنوب شرق آسيا وأوروبا. تشمل مجموعتنا الواسعة من المنتجات الأجهزة المنزلية الذكية، وحلول الطاقة المحمولة، وإضاءة LED المتقدمة. نفخر بالتزامنا بالابتكار ومراقبة الجودة ورضا العملاء. جميع منتجات HousePlus حاصلة على شهادات CE/FCC/RoHS، مما يضمن امتثالها للمعايير الدولية. نقدم حد أدنى مرن للطلب وخدمات OEM/ODM شاملة، مما يجعلنا الشريك المثالي للشركات التي تتطلع إلى توسيع عروضها من الإلكترونيات 3C.',
          image: '/images/products/wireless-charger.jpg',
          imageAlt: 'شاحن لاسلكي من HousePlus ومنتجات إلكترونيات 3C أخرى',
        },
        {
          heading: 'المستقبل مشرق: مستدام وذكي',
          text: 'يتجه مستقبل الإلكترونيات 3C نحو استدامة أكبر وذكاء معزز وتكامل سلس. تستثمر HousePlus بنشاط في البحث والتطوير لتطوير مواد صديقة للبيئة، وتصاميم أكثر كفاءة في استخدام الطاقة، ووظائف مدعومة بالذكاء الاصطناعي. نحن ملتزمون بتشكيل مستقبل لا تثري فيه التكنولوجيا الحياة فحسب، بل تحترم كوكبنا أيضًا. انضم إلى HousePlus في هذه الرحلة المثيرة من الابتكار والنمو.',
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

    description: generateSEOMetadata({ lang: lang as any, type: 'article', title: data.title, description: data.sections[0].text, keywords: [], url: `/${lang}/news/the-evolution-of-3c-electronics` }).description as string,
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
              {lang === 'en' && 'Partner with HousePlus for Your 3C Electronics Needs'}
              {lang === 'es' && 'Asóciese con HousePlus para sus Necesidades de Electrónica 3C'}
              {lang === 'de' && 'Arbeiten Sie mit HousePlus für Ihre 3C-Elektronik-Anforderungen zusammen'}
              {lang === 'fr' && 'Partenariat avec HousePlus pour vos besoins en électronique 3C'}
              {lang === 'ar' && 'شراكة مع HousePlus لتلبية احتياجاتك من الإلكترونيات 3C'}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {lang === 'en' && 'HousePlus offers a diverse range of cutting-edge 3C electronics. Contact us today for wholesale inquiries and OEM/ODM services.'}
              {lang === 'es' && 'HousePlus ofrece una amplia gama de electrónica 3C de vanguardia. Contáctenos hoy para consultas al por mayor y servicios OEM/ODM.'}
              {lang === 'de' && 'HousePlus bietet eine vielfältige Auswahl an hochmoderner 3C-Elektronik. Kontaktieren Sie uns noch heute für Großhandelsanfragen und OEM/ODM-Dienstleistungen.'}
              {lang === 'fr' && 'HousePlus propose une gamme diversifiée d\'électronique 3C de pointe. Contactez-nous dès aujourd\'hui pour les demandes de gros et les services OEM/ODM.'}
              {lang === 'ar' && 'تقدم HousePlus مجموعة متنوعة من الإلكترونيات 3C المتطورة. اتصل بنا اليوم للاستفسارات بالجملة وخدمات OEM/ODM.'}
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
