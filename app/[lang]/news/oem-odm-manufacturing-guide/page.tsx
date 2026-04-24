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
  return generateSEOMetadata({
    title: 'OEM & ODM Manufacturing: How HousePlus Helps Brands Build Custom Products',
    description: 'HousePlus offers comprehensive OEM and ODM manufacturing services for wholesale buyers looking to build their own branded product lines. From design consultation to mass production, discover our factory capabilities.',
    keywords: ['OEM manufacturing', 'ODM products', 'custom home appliances', 'private label appliances', 'HousePlus OEM'],
    url: `/${lang}/news/oem-odm-manufacturing-guide`,
    lang: lang as any,
    type: 'article',
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : lang === 'de' ? 'Startseite' : lang === 'fr' ? 'Accueil' : 'الرئيسية', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : lang === 'es' ? 'Noticias' : lang === 'de' ? 'Nachrichten' : lang === 'fr' ? 'Actualités' : 'أخبار', url: `/${lang}/news` },
    { name: 'OEM & ODM Guide', url: `/${lang}/news/oem-odm-manufacturing-guide` },
  ];

  const articleContent: Record<string, any> = {
    en: {
      title: 'OEM & ODM Manufacturing: How HousePlus Helps Brands Build Custom Products',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-09-17',
      dateModified: '2025-09-17',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=600&fit=crop',
      imageAlt: 'OEM ODM manufacturing process at HousePlus factory - custom product development',
      sections: [
        {
          heading: 'Understanding OEM vs. ODM: What\'s the Difference?',
          text: 'For wholesale buyers and brand owners, understanding the difference between OEM (Original Equipment Manufacturer) and ODM (Original Design Manufacturer) is fundamental to making the right sourcing decision. OEM manufacturing means you provide the product specifications, designs, and branding, while HousePlus manufactures the product according to your requirements. This approach gives you maximum control over product design and differentiation. ODM manufacturing, on the other hand, means HousePlus develops the product design and you apply your branding to our existing or modified designs. ODM is faster to market and typically requires lower upfront investment, making it ideal for brands entering new product categories or testing market demand. HousePlus offers both OEM and ODM services across our entire product range, including home appliances, solar products, and 3C electronics.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'HousePlus factory floor showing OEM and ODM production lines for custom appliances',
        },
        {
          heading: 'HousePlus OEM Capabilities: From Concept to Production',
          text: 'Our OEM manufacturing process begins with a detailed consultation to understand your product vision, target market, and technical requirements. Our R&D team, comprising over 50 engineers and designers, works closely with you to translate your concepts into manufacturable product specifications. We provide 3D CAD modeling, prototype development, and iterative testing to ensure the final product meets your exact standards. Once the design is approved, we prepare detailed manufacturing drawings, bill of materials (BOM), and quality control plans. Our production facilities are equipped with advanced CNC machining, injection molding, PCB assembly, and automated testing equipment to handle complex product requirements. We support custom packaging design, including branded cartons, instruction manuals in multiple languages, and retail-ready packaging that meets the requirements of major retail chains worldwide.',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
          imageAlt: 'Engineers at HousePlus R&D center working on custom product design and prototyping',
        },
        {
          heading: 'ODM Product Portfolio: Ready-to-Brand Solutions',
          text: 'HousePlus maintains an extensive ODM product portfolio that wholesale buyers can access immediately. Our ODM catalog includes over 200 product models across home appliances, solar systems, and consumer electronics. These products have been developed through years of market research and customer feedback, ensuring they meet the demands of global consumers. For ODM orders, we offer flexible customization options including color changes, logo application, packaging design, and minor feature modifications. Our ODM products come with complete certification documentation (CE, FCC, RoHS, ISO 9001), making market entry straightforward. Minimum order quantities for ODM products start at 100 units, with lead times of 20-35 days for standard configurations. For buyers who need to test market response before committing to large volumes, we also offer sample orders of 5-10 units for evaluation purposes.',
        },
        {
          heading: 'Quality Control and Testing in OEM/ODM Production',
          text: 'Quality assurance is embedded at every stage of our OEM/ODM manufacturing process. HousePlus operates a dedicated quality control department with over 30 QC engineers who conduct incoming material inspection, in-process quality checks, and final product testing. Our testing capabilities include electrical safety testing, EMC testing, environmental stress testing (temperature cycling, humidity testing, vibration testing), and performance testing. For solar products, we conduct IV curve testing, electroluminescence (EL) imaging, and flash testing to verify cell efficiency and panel performance. All OEM/ODM products undergo 100% functional testing before shipment, and we provide detailed quality inspection reports with each order. For clients requiring additional assurance, we support third-party factory audits and product inspections by internationally recognized inspection companies such as SGS, Bureau Veritas, and Intertek.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop',
          imageAlt: 'Quality control testing of custom manufactured products at HousePlus facility',
        },
        {
          heading: 'Getting Started with HousePlus OEM/ODM Services',
          text: 'Starting your OEM/ODM journey with HousePlus is straightforward. Begin by contacting our sales team via WhatsApp (+86 15578119543), email (jack@houseplus-ch.com), or through our online inquiry form. Share your product requirements, target market, estimated annual volume, and any specific technical specifications. Our team will respond within 24 hours with an initial assessment and, if applicable, relevant ODM product recommendations from our catalog. For OEM projects, we will schedule a consultation call to discuss your requirements in detail and provide a project timeline and cost estimate. We welcome factory visits from serious buyers — our manufacturing facilities in China are open for inspection by appointment. HousePlus has built long-term partnerships with brands across Africa, Southeast Asia, Europe, and the Middle East, and we look forward to supporting your brand\'s growth with our manufacturing expertise.',
        },
      ],
    },
    es: {
      title: 'Fabricación OEM y ODM: Cómo HousePlus Ayuda a las Marcas a Construir Productos Personalizados',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-09-17',
      dateModified: '2025-09-17',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=600&fit=crop',
      imageAlt: 'Proceso de fabricación OEM ODM en la fábrica HousePlus - desarrollo de productos personalizados',
      sections: [
        {
          heading: 'Entendiendo OEM vs. ODM: ¿Cuál es la Diferencia?',
          text: 'Para compradores mayoristas y propietarios de marcas, entender la diferencia entre OEM (Fabricante de Equipos Originales) y ODM (Fabricante de Diseño Original) es fundamental. La fabricación OEM significa que usted proporciona las especificaciones, diseños y marca del producto, mientras que HousePlus fabrica el producto según sus requisitos. La fabricación ODM significa que HousePlus desarrolla el diseño del producto y usted aplica su marca a nuestros diseños existentes o modificados.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'Planta de fabricación HousePlus que muestra líneas de producción OEM y ODM',
        },
        {
          heading: 'Capacidades OEM de HousePlus: Del Concepto a la Producción',
          text: 'Nuestro proceso de fabricación OEM comienza con una consulta detallada para comprender su visión del producto, mercado objetivo y requisitos técnicos. Nuestro equipo de I+D, compuesto por más de 50 ingenieros y diseñadores, trabaja estrechamente con usted para traducir sus conceptos en especificaciones de productos fabricables.',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
          imageAlt: 'Ingenieros en el centro de I+D de HousePlus trabajando en diseño y prototipado de productos personalizados',
        },
        {
          heading: 'Cartera de Productos ODM: Soluciones Listas para Marcar',
          text: 'HousePlus mantiene una extensa cartera de productos ODM a la que los compradores mayoristas pueden acceder de inmediato. Nuestro catálogo ODM incluye más de 200 modelos de productos en electrodomésticos, sistemas solares y electrónica de consumo. Las cantidades mínimas de pedido para productos ODM comienzan en 100 unidades, con plazos de entrega de 20-35 días.',
        },
        {
          heading: 'Control de Calidad y Pruebas en Producción OEM/ODM',
          text: 'El aseguramiento de calidad está integrado en cada etapa de nuestro proceso de fabricación OEM/ODM. HousePlus opera un departamento de control de calidad dedicado con más de 30 ingenieros de QC. Todos los productos OEM/ODM se someten a pruebas funcionales al 100% antes del envío.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop',
          imageAlt: 'Pruebas de control de calidad de productos fabricados a medida en las instalaciones de HousePlus',
        },
        {
          heading: 'Cómo Comenzar con los Servicios OEM/ODM de HousePlus',
          text: 'Comenzar su viaje OEM/ODM con HousePlus es sencillo. Comience contactando a nuestro equipo de ventas a través de WhatsApp (+86 15578119543), correo electrónico (jack@houseplus-ch.com) o a través de nuestro formulario de consulta en línea. Nuestro equipo responderá dentro de las 24 horas con una evaluación inicial.',
        },
      ],
    },
    de: {
      title: 'OEM- und ODM-Fertigung: Wie HousePlus Marken beim Aufbau individueller Produkte hilft',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-09-17',
      dateModified: '2025-09-17',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=600&fit=crop',
      imageAlt: 'OEM-ODM-Fertigungsprozess im HousePlus-Werk - individuelle Produktentwicklung',
      sections: [
        {
          heading: 'OEM vs. ODM verstehen: Was ist der Unterschied?',
          text: 'Für Großhandelskäufer und Markeninhaber ist es grundlegend, den Unterschied zwischen OEM (Original Equipment Manufacturer) und ODM (Original Design Manufacturer) zu verstehen. OEM-Fertigung bedeutet, dass Sie die Produktspezifikationen, Designs und Markenidentität bereitstellen, während HousePlus das Produkt nach Ihren Anforderungen herstellt. ODM-Fertigung bedeutet, dass HousePlus das Produktdesign entwickelt und Sie Ihre Marke auf unsere bestehenden oder modifizierten Designs anwenden.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'HousePlus-Fabrikhalle mit OEM- und ODM-Produktionslinien für individuelle Geräte',
        },
        {
          heading: 'HousePlus OEM-Fähigkeiten: Vom Konzept zur Produktion',
          text: 'Unser OEM-Fertigungsprozess beginnt mit einer detaillierten Beratung, um Ihre Produktvision, Ihren Zielmarkt und Ihre technischen Anforderungen zu verstehen. Unser F&E-Team mit über 50 Ingenieuren und Designern arbeitet eng mit Ihnen zusammen, um Ihre Konzepte in fertigbare Produktspezifikationen umzusetzen.',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
          imageAlt: 'Ingenieure im HousePlus F&E-Zentrum arbeiten an individuellem Produktdesign und Prototyping',
        },
        {
          heading: 'ODM-Produktportfolio: Sofort markierbare Lösungen',
          text: 'HousePlus pflegt ein umfangreiches ODM-Produktportfolio, auf das Großhandelskäufer sofort zugreifen können. Unser ODM-Katalog umfasst über 200 Produktmodelle in den Bereichen Haushaltsgeräte, Solarsysteme und Unterhaltungselektronik. Mindestbestellmengen für ODM-Produkte beginnen bei 100 Einheiten, mit Vorlaufzeiten von 20-35 Tagen.',
        },
        {
          heading: 'Qualitätskontrolle und Tests in der OEM/ODM-Produktion',
          text: 'Qualitätssicherung ist in jeder Phase unseres OEM/ODM-Fertigungsprozesses verankert. HousePlus betreibt eine dedizierte Qualitätskontrollabteilung mit über 30 QC-Ingenieuren. Alle OEM/ODM-Produkte werden vor dem Versand zu 100% funktional getestet.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop',
          imageAlt: 'Qualitätskontrolltests von individuell gefertigten Produkten in der HousePlus-Anlage',
        },
        {
          heading: 'Erste Schritte mit HousePlus OEM/ODM-Diensten',
          text: 'Der Einstieg in Ihre OEM/ODM-Reise mit HousePlus ist unkompliziert. Kontaktieren Sie zunächst unser Vertriebsteam über WhatsApp (+86 15578119543), E-Mail (jack@houseplus-ch.com) oder über unser Online-Anfrageformular. Unser Team antwortet innerhalb von 24 Stunden mit einer ersten Einschätzung.',
        },
      ],
    },
    fr: {
      title: 'Fabrication OEM et ODM : Comment HousePlus aide les marques à créer des produits personnalisés',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-09-17',
      dateModified: '2025-09-17',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=600&fit=crop',
      imageAlt: 'Processus de fabrication OEM ODM à l\'usine HousePlus - développement de produits personnalisés',
      sections: [
        {
          heading: 'Comprendre OEM vs. ODM : Quelle est la différence ?',
          text: 'Pour les acheteurs en gros et les propriétaires de marques, comprendre la différence entre OEM (Original Equipment Manufacturer) et ODM (Original Design Manufacturer) est fondamental. La fabrication OEM signifie que vous fournissez les spécifications, les designs et la marque du produit, tandis que HousePlus fabrique le produit selon vos exigences. La fabrication ODM signifie que HousePlus développe le design du produit et vous appliquez votre marque à nos designs existants ou modifiés.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'Atelier de fabrication HousePlus montrant les lignes de production OEM et ODM',
        },
        {
          heading: 'Capacités OEM de HousePlus : Du concept à la production',
          text: 'Notre processus de fabrication OEM commence par une consultation détaillée pour comprendre votre vision du produit, votre marché cible et vos exigences techniques. Notre équipe R&D, composée de plus de 50 ingénieurs et designers, travaille en étroite collaboration avec vous pour traduire vos concepts en spécifications de produits manufacturables.',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
          imageAlt: 'Ingénieurs au centre R&D de HousePlus travaillant sur la conception et le prototypage de produits personnalisés',
        },
        {
          heading: 'Portefeuille de produits ODM : Solutions prêtes à être marquées',
          text: 'HousePlus maintient un vaste portefeuille de produits ODM auquel les acheteurs en gros peuvent accéder immédiatement. Notre catalogue ODM comprend plus de 200 modèles de produits dans les appareils électroménagers, les systèmes solaires et l\'électronique grand public. Les quantités minimales de commande pour les produits ODM commencent à 100 unités, avec des délais de 20 à 35 jours.',
        },
        {
          heading: 'Contrôle qualité et tests dans la production OEM/ODM',
          text: 'L\'assurance qualité est intégrée à chaque étape de notre processus de fabrication OEM/ODM. HousePlus exploite un département de contrôle qualité dédié avec plus de 30 ingénieurs QC. Tous les produits OEM/ODM subissent des tests fonctionnels à 100% avant expédition.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop',
          imageAlt: 'Tests de contrôle qualité de produits fabriqués sur mesure dans les installations HousePlus',
        },
        {
          heading: 'Démarrer avec les services OEM/ODM de HousePlus',
          text: 'Commencer votre parcours OEM/ODM avec HousePlus est simple. Commencez par contacter notre équipe commerciale via WhatsApp (+86 15578119543), e-mail (jack@houseplus-ch.com) ou via notre formulaire de demande en ligne. Notre équipe répondra dans les 24 heures avec une évaluation initiale.',
        },
      ],
    },
    ar: {
      title: 'تصنيع OEM وODM: كيف تساعد HousePlus العلامات التجارية على بناء منتجات مخصصة',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-09-17',
      dateModified: '2025-09-17',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=600&fit=crop',
      imageAlt: 'عملية تصنيع OEM وODM في مصنع HousePlus - تطوير المنتجات المخصصة',
      sections: [
        {
          heading: 'فهم OEM مقابل ODM: ما الفرق؟',
          text: 'لمشتري الجملة وأصحاب العلامات التجارية، يعد فهم الفرق بين OEM (الشركة المصنعة للمعدات الأصلية) وODM (الشركة المصنعة للتصميم الأصلي) أمرًا أساسيًا. تصنيع OEM يعني أنك تقدم مواصفات المنتج والتصاميم والعلامة التجارية، بينما تصنع HousePlus المنتج وفقًا لمتطلباتك. تصنيع ODM يعني أن HousePlus تطور تصميم المنتج وتطبق علامتك التجارية على تصاميمنا الحالية أو المعدلة.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'أرضية مصنع HousePlus تُظهر خطوط إنتاج OEM وODM للأجهزة المخصصة',
        },
        {
          heading: 'قدرات OEM لدى HousePlus: من المفهوم إلى الإنتاج',
          text: 'تبدأ عملية تصنيع OEM لدينا بمشاورة تفصيلية لفهم رؤيتك للمنتج والسوق المستهدف والمتطلبات التقنية. يعمل فريق البحث والتطوير لدينا، المؤلف من أكثر من 50 مهندسًا ومصممًا، عن كثب معك لترجمة مفاهيمك إلى مواصفات منتج قابلة للتصنيع.',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
          imageAlt: 'مهندسون في مركز البحث والتطوير لـ HousePlus يعملون على تصميم المنتجات المخصصة والنماذج الأولية',
        },
        {
          heading: 'محفظة منتجات ODM: حلول جاهزة للعلامة التجارية',
          text: 'تحتفظ HousePlus بمحفظة منتجات ODM واسعة يمكن لمشتري الجملة الوصول إليها فورًا. يتضمن كتالوج ODM الخاص بنا أكثر من 200 طراز منتج في الأجهزة المنزلية والأنظمة الشمسية والإلكترونيات الاستهلاكية. تبدأ الحد الأدنى لكميات الطلب لمنتجات ODM من 100 وحدة.',
        },
        {
          heading: 'مراقبة الجودة والاختبار في إنتاج OEM/ODM',
          text: 'ضمان الجودة مدمج في كل مرحلة من مراحل عملية تصنيع OEM/ODM لدينا. تدير HousePlus قسم مراقبة جودة مخصص مع أكثر من 30 مهندس QC. تخضع جميع منتجات OEM/ODM لاختبار وظيفي بنسبة 100% قبل الشحن.',
          image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop',
          imageAlt: 'اختبارات مراقبة الجودة للمنتجات المصنعة حسب الطلب في منشأة HousePlus',
        },
        {
          heading: 'البدء مع خدمات OEM/ODM من HousePlus',
          text: 'البدء في رحلة OEM/ODM مع HousePlus أمر بسيط. ابدأ بالتواصل مع فريق المبيعات لدينا عبر WhatsApp (+86 15578119543) أو البريد الإلكتروني (jack@houseplus-ch.com) أو من خلال نموذج الاستفسار عبر الإنترنت. سيرد فريقنا خلال 24 ساعة بتقييم أولي.',
        },
      ],
    },
  };

  const data = articleContent[lang] || articleContent.en;

  const articleSchema = buildArticleSchema({
    headline: data.title,
    image: `https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=600&fit=crop`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    authorName: data.author,
    description: 'HousePlus offers comprehensive OEM and ODM manufacturing services for wholesale buyers looking to build their own branded product lines.',
  });

  return (
    <SchemaRenderer schemas={[articleSchema, buildBreadcrumbSchema(breadcrumbs)]}>
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} />
        <article className="max-w-6xl mx-auto py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900">{data.title}</h1>
          <div className="text-center text-gray-600 mb-8">
            By <span className="font-semibold text-blue-600">{data.author}</span> | {new Date(data.datePublished).toLocaleDateString(lang === 'ar' ? 'ar-SA' : lang === 'de' ? 'de-DE' : lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US')}
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
            <section key={index} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-800">{section.heading}</h2>
              <div className={`flex flex-col ${section.image ? 'md:flex-row' : ''} gap-8 items-start`}>
                <div className={section.image ? 'md:w-1/2' : 'w-full'}>
                  <p className="text-lg text-gray-700 leading-relaxed">{section.text}</p>
                </div>
                {section.image && (
                  <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-md w-full">
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
              {lang === 'en' && 'Start Your OEM/ODM Project with HousePlus Today'}
              {lang === 'es' && 'Comience su Proyecto OEM/ODM con HousePlus Hoy'}
              {lang === 'de' && 'Starten Sie noch heute Ihr OEM/ODM-Projekt mit HousePlus'}
              {lang === 'fr' && 'Démarrez votre projet OEM/ODM avec HousePlus dès aujourd\'hui'}
              {lang === 'ar' && 'ابدأ مشروع OEM/ODM الخاص بك مع HousePlus اليوم'}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {lang === 'en' && 'Contact our team to discuss your custom product requirements. We offer free consultation, product samples, and competitive OEM/ODM pricing for wholesale buyers worldwide.'}
              {lang === 'es' && 'Contacte a nuestro equipo para discutir sus requisitos de productos personalizados. Ofrecemos consulta gratuita, muestras de productos y precios OEM/ODM competitivos.'}
              {lang === 'de' && 'Kontaktieren Sie unser Team, um Ihre individuellen Produktanforderungen zu besprechen. Wir bieten kostenlose Beratung, Produktmuster und wettbewerbsfähige OEM/ODM-Preise.'}
              {lang === 'fr' && 'Contactez notre équipe pour discuter de vos besoins en produits personnalisés. Nous offrons une consultation gratuite, des échantillons de produits et des prix OEM/ODM compétitifs.'}
              {lang === 'ar' && 'تواصل مع فريقنا لمناقشة متطلبات منتجاتك المخصصة. نقدم استشارة مجانية وعينات منتجات وأسعار OEM/ODM تنافسية.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {lang === 'en' && 'Discuss Your OEM/ODM Requirements'}
              {lang === 'es' && 'Discutir sus Requisitos OEM/ODM'}
              {lang === 'de' && 'OEM/ODM-Anforderungen besprechen'}
              {lang === 'fr' && 'Discuter de vos exigences OEM/ODM'}
              {lang === 'ar' && 'ناقش متطلبات OEM/ODM الخاصة بك'}
            </Link>
          </div>
        </article>
      </main>
    </SchemaRenderer>
  );
}
