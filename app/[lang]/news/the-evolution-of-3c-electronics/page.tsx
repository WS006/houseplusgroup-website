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

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'The Evolution of 3C Electronics: Innovation and HousePlus Solutions',
    es: 'La Evolución de la Electrónica 3C: Innovación y Soluciones HousePlus',
    de: 'Die Evolution der 3C-Elektronik: Innovation und HousePlus-Lösungen',
    fr: 'L\'évolution de l\'électronique 3C : Innovation et solutions HousePlus',
    ar: 'تطور الإلكترونيات 3C: الابتكار وحلول HousePlus',
  };

  const descriptions: Record<string, string> = {
    en: 'Explore 3C electronics trends, smart devices and product sourcing considerations for global B2B buyers.',
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

export default async function ThreeCElectronicsArticle(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
    { name: lang === 'en' ? 'The Evolution of 3C Electronics' : 'La Evolución de la Electrónica 3C', url: `/${lang}/news/the-evolution-of-3c-electronics` },
  ];

  const articleContent: Record<string, any> = {
    en: {
      title: 'The Evolution of 3C Electronics: Innovation and HousePlus Solutions',
      authorName: 'Jack Hu',
      datePublished: '2023-11-08',
      dateModified: '2026-07-18',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-evolution-3c-electronics-b2b-guide/',
      imageAlt: 'Modern 3C electronics devices including wireless chargers and smart gadgets',
          sections: [
      {
        heading: 'What Is the Current State of the 3C Electronics Industry?',
        text: 'The 3C electronics industry (Computer, Communication, Consumer Electronics) is one of the fastest-evolving industries globally, driven by relentless innovation that constantly introduces new technologies reshaping how we live, work, and interact. HousePlus is a vertically integrated manufacturer operating a 20,000 m² ISO 9001 certified factory since 2010, serving 441+ B2B clients across 53+ countries with CE/FCC/RoHS certified 3C electronics. From powerful smartphones and smart wearables to advanced home entertainment systems and energy-efficient LED lighting, 3C electronics are integral to modern life. HousePlus is a key player in this dynamic market, offering a diverse portfolio of cutting-edge products.',
        image: 'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-smart-home-device-b2b-guide/',
        imageAlt: 'HousePlus energy-efficient LED lighting solutions',
      },
      {
        heading: 'How Are Innovation and Connectivity Shaping Modern 3C Electronics?',
        text: 'Innovation and connectivity are shaping modern 3C electronics by making devices smarter and more interconnected, with IoT driving an explosion of smart gadgets that seamlessly integrate into daily routines through superior performance, intuitive user experiences, and robust connectivity. HousePlus embraces this trend by developing and manufacturing smart gadgets that meet the demands of a tech-savvy global market, providing reliable solutions for wholesale partners.',
        image: 'https://images.houseplus-ch.com/media/houseplus-power-bank-60w-pd-wholesale/',
        imageAlt: 'HousePlus portable power bank and other smart devices',
      },
      {
        heading: 'Why Choose HousePlus as Your 3C Electronics Wholesale Partner?',
        text: 'HousePlus is the ideal 3C electronics wholesale partner because we offer high-quality products including smart home devices, portable power solutions, and advanced LED lighting, with CE/FCC/RoHS certification, flexible MOQ, comprehensive OEM/ODM services, and a strong commitment to innovation, control, and customer satisfaction. As a leading manufacturer, HousePlus specializes in providing high-quality 3C electronics to wholesale buyers in Africa, Southeast Asia, and Europe. We pride ourselves on our commitment to innovation, control, and customer satisfaction.',
        image: 'https://images.houseplus-ch.com/media/houseplus-power-bank-60w-pd-wholesale/',
        imageAlt: 'HousePlus wireless charger and other 3C electronic products',
      },
      {
        heading: 'What Does the Future Hold for 3C Electronics?',
        text: 'The future of 3C electronics holds greater sustainability, enhanced intelligence, and seamless integration, with HousePlus actively investing in R&D to develop eco-friendly materials, more energy-efficient designs, and AI-powered functionalities that enrich lives while respecting the planet. We are committed to shaping a future where technology not only enriches lives but also respects our planet. Join HousePlus in this exciting journey of innovation and growth.',
      },
    ],
    },
    es: {
      title: 'La Evolución de la Electrónica 3C: Innovación y Soluciones HousePlus',
      authorName: 'Jack Hu',
      datePublished: '2023-11-08',
      dateModified: '2026-07-18',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-evolution-3c-electronics-b2b-guide/',
      imageAlt: 'Dispositivos electrónicos 3C modernos que incluyen cargadores inalámbricos y gadgets inteligentes',
      sections: [
        {
          heading: 'El Mundo Dinámico de la Electrónica 3C',
          text: 'El sector de la electrónica 3C (Computación, Comunicación, Electrónica de Consumo) es una de las industrias de más rápida evolución a nivel mundial. Impulsado por una innovación implacable, introduce constantemente nuevas tecnologías que remodelan nuestra forma de vivir, trabajar e interactuar. Desde potentes teléfonos inteligentes y dispositivos portátiles inteligentes hasta sistemas avanzados de entretenimiento en el hogar e iluminación LED de bajo consumo, la electrónica 3C es parte integral de la vida moderna. HousePlus es un actor clave en este mercado dinámico, ofreciendo una cartera diversa de productos de vanguardia.',
          image: 'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-smart-home-device-b2b-guide/',
          imageAlt: 'Soluciones de iluminación LED de bajo consumo de HousePlus',
        },
        {
          heading: 'La Innovación en el Núcleo: Dispositivos Inteligentes y Conectividad',
          text: 'La conectividad y la inteligencia son las características distintivas de la electrónica 3C moderna. El auge del IoT (Internet de las Cosas) ha llevado a una explosión de dispositivos inteligentes que se integran sin problemas en nuestras rutinas diarias. HousePlus abraza esta tendencia desarrollando y fabricando gadgets inteligentes que ofrecen un rendimiento superior, experiencias de usuario intuitivas y una conectividad robusta. Nuestros productos están diseñados para satisfacer las demandas de un mercado global conocedor de la tecnología, proporcionando soluciones confiables para socios mayoristas.',
          image: 'https://images.houseplus-ch.com/media/houseplus-power-bank-60w-pd-wholesale/',
          imageAlt: 'Batería externa portátil HousePlus y otros dispositivos inteligentes',
        },
        {
          heading: 'HousePlus: Su Socio de Confianza para la Venta al por Mayor de Electrónica 3C',
          text: 'Como fabricante líder, HousePlus se especializa en proporcionar electrónica 3C de alta calidad a compradores mayoristas en África, el Sudeste Asiático y Europa. Nuestra amplia gama de productos incluye dispositivos inteligentes para el hogar, soluciones de energía portátiles e iluminación LED avanzada. Nos enorgullecemos de nuestro compromiso con la innovación, el control de calidad y la satisfacción del cliente. Todos los productos HousePlus cuentan con certificación CE/FCC/RoHS, lo que garantiza que cumplen con los estándares internacionales. Ofrecemos MOQ flexibles y servicios OEM/ODM completos, lo que nos convierte en el socio ideal para empresas que buscan expandir sus ofertas de electrónica 3C.',
          image: 'https://images.houseplus-ch.com/media/houseplus-power-bank-60w-pd-wholesale/',
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
      authorName: 'Jack Hu',
      datePublished: '2023-11-08',
      dateModified: '2026-07-18',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-evolution-3c-electronics-b2b-guide/',
      imageAlt: 'Moderne 3C-Elektronikgeräte, einschließlich kabelloser Ladegeräte und Smart Gadgets',
      sections: [
        {
          heading: 'Die dynamische Welt der 3C-Elektronik',
          text: 'Der 3C-Elektroniksektor (Computer, Kommunikation, Unterhaltungselektronik) ist eine der sich am schnellsten entwickelnden Branchen weltweit. Angetrieben von unermüdlicher Innovation führt er ständig neue Technologien ein, die unsere Art zu leben, zu arbeiten und zu interagieren neu gestalten. Von leistungsstarken Smartphones und intelligenten Wearables bis hin zu fortschrittlichen Home-Entertainment-Systemen und energieeffizienter LED-Beleuchtung ist die 3C-Elektronik integraler Bestandteil des modernen Lebens. HousePlus ist ein wichtiger Akteur in diesem dynamischen Markt und bietet ein vielfältiges Portfolio an hochmodernen Produkten.',
          image: 'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-smart-home-device-b2b-guide/',
          imageAlt: 'HousePlus energieeffiziente LED-Beleuchtungslösungen',
        },
        {
          heading: 'Innovation im Kern: Smart Devices und Konnektivität',
          text: 'Konnektivität und Intelligenz sind die Kennzeichen der modernen 3C-Elektronik. Der Aufstieg des IoT (Internet der Dinge) hat zu einer Explosion von Smart Devices geführt, die sich nahtlos in unsere täglichen Routinen integrieren. HousePlus greift diesen Trend auf, indem es intelligente Gadgets entwickelt und herstellt, die überragende Leistung, intuitive Benutzererlebnisse und robuste Konnektivität bieten. Unsere Produkte sind darauf ausgelegt, die Anforderungen eines technikaffinen globalen Marktes zu erfüllen und zuverlässige Lösungen für Großhandelspartner bereitzustellen.',
          image: 'https://images.houseplus-ch.com/media/houseplus-power-bank-60w-pd-wholesale/',
          imageAlt: 'HousePlus tragbare Powerbank und andere Smart Devices',
        },
        {
          heading: 'HousePlus: Ihr vertrauenswürdiger Partner für den 3C-Elektronik-Großhandel',
          text: 'Als führender Hersteller ist HousePlus darauf spezialisiert, hochwertige 3C-Elektronik an Großhandelskäufer in Afrika, Südostasien und Europa zu liefern. Unser umfangreiches Produktsortiment umfasst Smart-Home-Geräte, tragbare Energielösungen und fortschrittliche LED-Beleuchtung. Wir sind stolz auf unser Engagement für Innovation, Qualitätskontrolle und Kundenzufriedenheit. Alle HousePlus-Produkte sind CE/FCC/RoHS-zertifiziert, um sicherzustellen, dass sie internationalen Standards entsprechen. Wir bieten flexible Mindestbestellmengen und umfassende OEM/ODM-Dienstleistungen an, was uns zum idealen Partner für Unternehmen macht, die ihr 3C-Elektronikangebot erweitern möchten.',
          image: 'https://images.houseplus-ch.com/media/houseplus-power-bank-60w-pd-wholesale/',
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
      authorName: 'Jack Hu',
      datePublished: '2023-11-08',
      dateModified: '2026-07-18',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-evolution-3c-electronics-b2b-guide/',
      imageAlt: 'Appareils électroniques 3C modernes, y compris les chargeurs sans fil et les gadgets intelligents',
                  sections: [
      {
        heading: 'Quel Est l\'État Actuel de l\'Industrie de l\'Électronique 3C ?',
        text: 'L\'industrie de l\'électronique 3C (ordinateurs, communications et électronique grand public) est un secteur dynamique et en évolution rapide, tiré par l\'innovation constante, la miniaturisation et la connectivité intelligente, avec une demande mondiale croissante à mesure que les modes de vie numériques deviennent la norme. HousePlus est un fabricant à intégration verticale exploitant une usine certifiée ISO 9001 de 20 000 m² depuis 2010, servant plus de 441 clients en gros dans plus de 53 pays avec des produits certifiés CE/FCC/RoHS.',
        image: 'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-headphones-product-b2b-guide/',
        imageAlt: 'Appareils électroniques 3C incluant chargeurs sans fil, écouteurs et gadgets domotiques',
      },
      {
        heading: 'Comment l\'Innovation et la Connectivité Façonnent-elles l\'Électronique 3C Moderne ?',
        text: 'L\'innovation et la connectivité façonnent l\'électronique 3C moderne en rendant les appareils plus intelligents, plus interconnectés et plus intuitifs, avec des fonctionnalités comme l\'intégration de l\'IA, les capacités IoT, le contrôle vocal et la synchronisation transparente entre appareils devenant des attentes standard chez les consommateurs. Chez HousePlus, notre équipe R&D repousse constamment les limites du possible, en intégrant les derniers chipsets, des technologies de batterie avancées et des principes de conception centrés sur l\'utilisateur dans chaque produit.',
        image: 'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-charger-adapter-b2b-guide/',
        imageAlt: 'Électronique 3C intelligente avec charge sans fil et connectivité IoT',
      },
      {
        heading: 'Pourquoi Choisir HousePlus comme Partenaire de Gros en Électronique 3C ?',
        text: 'HousePlus est le partenaire de gros idéal en électronique 3C parce que nous offrons une usine ISO 9001 de 20 000 m² à intégration verticale, plus de 15 ans d\'expérience, plus de 441 clients dans plus de 53 pays, des produits certifiés CE/FCC/RoHS, des services OEM/ODM flexibles et des prix de gros compétitifs avec des délais de livraison fiables. Ce qui nous distingue, c\'est notre engagement envers la qualité, l\'innovation et la réussite du client.',
        image: 'https://images.houseplus-ch.com/media/houseplus-factory-assembly-line/',
        imageAlt: 'Équipe de contrôle qualité HousePlus testant des produits électroniques 3C',
      },
      {
        heading: 'Qu\'Réserve l\'Avenir pour l\'Électronique 3C ?',
        text: 'L\'avenir de l\'électronique 3C promet une intégration encore plus grande de l\'IA, une durabilité accrue avec des matériaux écologiques et des conceptions économes en énergie, une connectivité plus rapide avec la 5G et le Wi-Fi 6/7 et des expériences utilisateur plus personnalisées dans toutes les catégories d\'appareils. HousePlus s\'engage à rester à la pointe de ces tendances, en investissant continuellement dans la R&D pour proposer des produits de pointe à nos partenaires de gros. Nous voyons un énorme potentiel dans les marchés émergents d\'Afrique, d\'Asie du Sud-Est et du Moyen-Orient.',
      },
    ],
    },
    ar: {
      title: 'تطور الإلكترونيات 3C: الابتكار وحلول HousePlus',
      authorName: 'Jack Hu',
      datePublished: '2023-11-08',
      dateModified: '2026-07-18',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-evolution-3c-electronics-b2b-guide/',
      imageAlt: 'أجهزة إلكترونيات 3C حديثة بما في ذلك الشواحن اللاسلكية والأدوات الذكية',
                  sections: [
      {
        heading: 'ما هو الوضع الحالي لصناعة الإلكترونيات 3C؟',
        text: 'صناعة الإلكترونيات 3C (أجهزة الكمبيوتر والاتصالات والإلكترونيات الاستهلاكية) هي قطاع ديناميكي وسريع التطور مدفوع بالابتكار المستمر والتصغير والاتصال الذكي، مع تزايد الطلب العالمي مع تحول الأنماط الحياتية الرقمية إلى القاعدة. HousePlus هي شركة مصنعة متكاملة عموديًا تشغل مصنعًا معتمدًا من ISO 9001 بمساحة 20,000 متر مربع منذ عام 2010، وتخدم أكثر من 441 عميلًا بالجملة في أكثر من 53 دولة بمنتجات معتمدة من CE/FCC/RoHS.',
        image: 'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-headphones-product-b2b-guide/',
        imageAlt: 'أجهزة إلكترونية 3C بما في ذلك شواحن لاسلكية وسماعات وأدوات منزل ذكية',
      },
      {
        heading: 'كيف يشكل الابتكار والاتصال الإلكترونيات 3C الحديثة؟',
        text: 'يشكل الابتكار والاتصال الإلكترونيات 3C الحديثة من خلال جعل الأجهزة أكثر ذكاءً وترابطًا وبديهية، مع تحول ميزات مثل تكامل الذكاء الاصطناعي وقدرات IoT والتحكم الصوتي والمزامنة السلسة عبر الأجهزة إلى توقعات قياسية بين المستهلكين. في HousePlus، يدفع فريق البحث والتطوير لدينا باستمرار حدود الممكن، من خلال دمج أحدث الرقاقات وتقنيات البطاريات المتقدمة ومبادئ التصميم المركز على المستخدم في كل منتج.',
        image: 'https://images.houseplus-ch.com/media/houseplus-articles-electronics-electronics-charger-adapter-b2b-guide/',
        imageAlt: 'إلكترونيات 3C ذكية مع شحن لاسلكي واتصال IoT',
      },
      {
        heading: 'لماذا تختار HousePlus كشريكك للجملة في الإلكترونيات 3C؟',
        text: 'HousePlus هو الشريك المثالي للجملة في الإلكترونيات 3C لأننا نقدم مصنعًا ISO 9001 متكاملًا عموديًا بمساحة 20,000 متر مربع، وأكثر من 15 عامًا من الخبرة، وأكثر من 441 عميلًا في أكثر من 53 دولة، ومنتجات معتمدة من CE/FCC/RoHS، وخدمات OEM/ODM مرنة، وأسعار جملة تنافسية مع مواعيد تسليم موثوقة. ما يميزنا هو التزامنا بالجودة والابتكار ونجاح العملاء.',
        image: 'https://images.houseplus-ch.com/media/houseplus-factory-assembly-line/',
        imageAlt: 'فريق مراقبة الجودة في HousePlus يختبر منتجات إلكترونية 3C',
      },
      {
        heading: 'ما الذي يخبئه المستقبل للإلكترونيات 3C؟',
        text: 'يعد مستقبل الإلكترونيات 3C بتكامل أكبر للذكاء الاصطناعي، واستدامة معززة بمواد صديقة للبيئة وتصاميم موفرة للطاقة، واتصال أسرع مع 5G و Wi-Fi 6/7، وتجارب مستخدم أكثر تخصيصًا عبر جميع فئات الأجهزة. تلتزم HousePlus بالبقاء في طليعة هذه الاتجاهات، من خلال الاستمرار في الاستثمار في البحث والتطوير لتقديم منتجات متطورة لشركائنا في الجملة. نرى إمكانات هائلة في الأسواق الناشئة في أفريقيا وجنوب شرق آسيا والشرق الأوسط.',
      },
    ],
    },
  };

  const data = articleContent[lang] || articleContent.en;

  const articleSchema = generateArticleSchema({
    url: `https://www.houseplus-ch.com/${lang}/news/the-evolution-of-3c-electronics`,
    headline: data.title,
    image: `https://www.houseplus-ch.com${data.image}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    authorName: data.authorName,

    description: generateSEOMetadata({ lang: lang as any, type: 'article', title: data.title, description: data.sections[0].text, keywords: [], url: `/${lang}/news/the-evolution-of-3c-electronics` }).description as string,
  });

  return (
    <SchemaRenderer schemas={[articleSchema]}>
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} />

        <article className="max-w-6xl mx-auto py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-slate-900">{data.title}</h1>
          <div className="max-w-3xl mx-auto px-4 mb-8">
            <ArticleMeta
              lang={lang}
              authorName={data.authorName}
              datePublished={data.datePublished}
              dateModified={data.dateModified}
            />
          </div>
          <div className="text-center text-gray-600 mb-8">
            By {data.authorName} | {new Date(data.datePublished).toLocaleDateString(lang)}
          </div>
          <ArticleFeatureImage
            src={data.image}
            alt={data.imageAlt}
            priority
          />

          {data.sections.map((section: any, index: number) => (
            <section key={index} className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-slate-800">{section.heading}</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className={section.image ? 'md:w-1/2' : 'w-full'}>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">{section.text}</p>
                  {section.image && index % 2 === 0 && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md mt-4">
                      <img
                        src={section.image}
                        alt={section.imageAlt}
                        width={800}
                        height={450}
                      className="object-cover"
                      loading="lazy"
                       title={section.imageAlt} decoding="async" />
                    </div>
                  )}
                </div>
                {section.image && index % 2 !== 0 && (
                  <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      width={800}
                      height={450}
                      className="object-cover"
                    loading="lazy"
                     title={section.imageAlt} decoding="async" />
                  </div>
                )}
              </div>
            </section>
          ))}

          <RelatedProducts lang={lang} slugs={['headphone-over-ear', 'bluetooth-earphone-tws', 'smart-watch', 'portable-ssd-1tb', 'micro-sd-128gb']} />

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
