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
    title: 'The Complete Guide to Wholesale Home Appliances: How HousePlus Supports Global Buyers',
    description: 'A comprehensive guide for wholesale buyers on sourcing high-quality home appliances from HousePlus. Learn about MOQ, OEM/ODM services, certifications, and how we support distributors across Africa, Southeast Asia, and Europe.',
    keywords: ['wholesale home appliances', 'HousePlus wholesale', 'OEM appliances', 'bulk home appliances', 'global distributor'],
    url: `/${lang}/news/global-wholesale-guide-home-appliances`,
    lang: lang as any,
    type: 'article',
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : lang === 'de' ? 'Startseite' : lang === 'fr' ? 'Accueil' : 'الرئيسية', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : lang === 'es' ? 'Noticias' : lang === 'de' ? 'Nachrichten' : lang === 'fr' ? 'Actualités' : 'أخبار', url: `/${lang}/news` },
    { name: 'Wholesale Guide', url: `/${lang}/news/global-wholesale-guide-home-appliances` },
  ];

  const articleContent: Record<string, any> = {
    en: {
      title: 'The Complete Guide to Wholesale Home Appliances: How HousePlus Supports Global Buyers',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-01-20',
      dateModified: '2025-01-20',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop',
      imageAlt: 'Global wholesale distribution of home appliances - HousePlus international trade',
      sections: [
        {
          heading: 'Why Wholesale Home Appliances Represent a Massive Opportunity',
          text: 'The global home appliances market is projected to exceed $1.2 trillion by 2030, driven by rapid urbanization, rising middle-class incomes, and increasing demand for energy-efficient products. For wholesale buyers and distributors, this represents an extraordinary opportunity to build profitable product portfolios. HousePlus has been at the forefront of this market for over a decade, supplying premium home appliances to more than 500 clients across 50+ countries. Our products span refrigerators, washing machines, air conditioners, kitchen appliances, and a wide range of small household devices — all manufactured to the highest international standards.',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
          imageAlt: 'Modern home appliances showroom with refrigerators and washing machines',
        },
        {
          heading: 'Understanding MOQ and Flexible Order Structures',
          text: 'One of the most common questions from first-time wholesale buyers is about minimum order quantities (MOQ). At HousePlus, we understand that different markets have different needs. Our standard MOQ starts at 100 units per product line, with flexible arrangements available for new partners entering specific regional markets. For large-volume orders exceeding 1,000 units, we offer preferential pricing tiers and dedicated account management. We also support mixed-container orders, allowing buyers to combine multiple product categories — such as kitchen appliances, small electronics, and solar products — within a single shipment. This flexibility is particularly valuable for distributors serving diverse retail channels across Africa, Southeast Asia, and the Middle East.',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop',
          imageAlt: 'Warehouse with organized home appliance inventory for wholesale distribution',
        },
        {
          heading: 'HousePlus Certifications: Your Gateway to Global Markets',
          text: 'Regulatory compliance is non-negotiable for wholesale buyers. HousePlus products carry CE certification for the European market, FCC certification for the United States and Canada, RoHS compliance for restricted hazardous substances, and ISO 9001:2015 quality management certification. Additionally, our solar products meet IEC 61215 and IEC 61730 standards. These certifications are not just checkboxes — they represent our commitment to product safety, environmental responsibility, and quality assurance. When you source from HousePlus, you receive full documentation packages including test reports, certificates of conformity, and customs declaration support, making market entry straightforward and compliant.',
        },
        {
          heading: 'OEM and ODM: Building Your Own Brand with HousePlus',
          text: 'Many of our most successful wholesale partners have leveraged our OEM and ODM capabilities to build their own branded product lines. Our OEM service allows you to place your brand name and logo on our existing, proven product designs. Our ODM service goes further, enabling custom product development from concept to production. HousePlus\'s R&D team works closely with partners to develop unique product specifications, packaging designs, and feature sets tailored to specific market demands. With a production capacity exceeding 100,000 units per month and lead times of 20-35 days for standard orders, we can support both small-batch launches and large-scale seasonal campaigns. Contact our sales team to discuss how we can help you create a differentiated product portfolio.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'HousePlus OEM production line with custom branded home appliances',
        },
        {
          heading: 'Logistics, Shipping, and After-Sales Support',
          text: 'HousePlus offers comprehensive logistics support to ensure your orders arrive on time and in perfect condition. We work with leading freight forwarders and shipping lines to provide FOB, CIF, and DDP terms depending on your preference. Our export packaging is designed to withstand the rigors of international shipping, with reinforced cartons, foam padding, and moisture-resistant materials. For after-sales support, HousePlus provides a 12-24 month warranty on all products, technical documentation in multiple languages, and a dedicated after-sales team available via WhatsApp, email, and video call. We also offer spare parts supply and technical training for distributors who require deeper product knowledge. Partner with HousePlus today and experience the difference of working with a manufacturer that truly invests in your success.',
        },
      ],
    },
    es: {
      title: 'La Guía Completa para Electrodomésticos al por Mayor: Cómo HousePlus Apoya a los Compradores Globales',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-01-20',
      dateModified: '2025-01-20',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop',
      imageAlt: 'Distribución mayorista global de electrodomésticos - comercio internacional HousePlus',
      sections: [
        {
          heading: 'Por Qué los Electrodomésticos al por Mayor Representan una Oportunidad Masiva',
          text: 'Se proyecta que el mercado global de electrodomésticos supere los 1,2 billones de dólares para 2030, impulsado por la rápida urbanización, el aumento de los ingresos de la clase media y la creciente demanda de productos energéticamente eficientes. Para compradores mayoristas y distribuidores, esto representa una oportunidad extraordinaria para construir carteras de productos rentables. HousePlus ha estado a la vanguardia de este mercado durante más de una década, suministrando electrodomésticos premium a más de 500 clientes en más de 50 países.',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
          imageAlt: 'Sala de exposición de electrodomésticos modernos con refrigeradores y lavadoras',
        },
        {
          heading: 'Comprensión del MOQ y Estructuras de Pedidos Flexibles',
          text: 'Una de las preguntas más comunes de los compradores mayoristas por primera vez es sobre las cantidades mínimas de pedido (MOQ). En HousePlus, entendemos que diferentes mercados tienen diferentes necesidades. Nuestro MOQ estándar comienza en 100 unidades por línea de productos, con acuerdos flexibles disponibles para nuevos socios que ingresan a mercados regionales específicos.',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop',
          imageAlt: 'Almacén con inventario organizado de electrodomésticos para distribución mayorista',
        },
        {
          heading: 'Certificaciones HousePlus: Su Puerta de Entrada a los Mercados Globales',
          text: 'El cumplimiento normativo es innegociable para los compradores mayoristas. Los productos HousePlus llevan certificación CE para el mercado europeo, certificación FCC para Estados Unidos y Canadá, cumplimiento RoHS para sustancias peligrosas restringidas e ISO 9001:2015. Cuando compra a HousePlus, recibe paquetes de documentación completos que incluyen informes de pruebas, certificados de conformidad y soporte para declaraciones aduaneras.',
        },
        {
          heading: 'OEM y ODM: Construyendo Su Propia Marca con HousePlus',
          text: 'Muchos de nuestros socios mayoristas más exitosos han aprovechado nuestras capacidades OEM y ODM para construir sus propias líneas de productos de marca. Nuestro servicio OEM le permite colocar su nombre de marca y logotipo en nuestros diseños de productos existentes y probados. Con una capacidad de producción superior a 100.000 unidades al mes y plazos de entrega de 20-35 días para pedidos estándar, podemos apoyar tanto lanzamientos en pequeños lotes como campañas estacionales a gran escala.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'Línea de producción OEM de HousePlus con electrodomésticos de marca personalizada',
        },
        {
          heading: 'Logística, Envío y Soporte Posventa',
          text: 'HousePlus ofrece soporte logístico integral para garantizar que sus pedidos lleguen a tiempo y en perfectas condiciones. Trabajamos con los principales transitarios y líneas navieras para proporcionar términos FOB, CIF y DDP según su preferencia. Para el soporte posventa, HousePlus proporciona una garantía de 12-24 meses en todos los productos y un equipo de posventa dedicado disponible a través de WhatsApp, correo electrónico y videollamada.',
        },
      ],
    },
    de: {
      title: 'Der vollständige Leitfaden für Haushaltsgeräte im Großhandel: Wie HousePlus globale Käufer unterstützt',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-01-20',
      dateModified: '2025-01-20',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop',
      imageAlt: 'Globaler Großhandelsvertrieb von Haushaltsgeräten - HousePlus internationaler Handel',
      sections: [
        {
          heading: 'Warum Haushaltsgeräte im Großhandel eine enorme Chance darstellen',
          text: 'Der globale Markt für Haushaltsgeräte wird bis 2030 voraussichtlich 1,2 Billionen US-Dollar übersteigen, angetrieben durch schnelle Urbanisierung, steigende Mittelklasseeinkommen und eine wachsende Nachfrage nach energieeffizienten Produkten. HousePlus ist seit über einem Jahrzehnt an der Spitze dieses Marktes und beliefert mehr als 500 Kunden in über 50 Ländern mit Premium-Haushaltsgeräten.',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
          imageAlt: 'Moderner Haushaltsgeräte-Showroom mit Kühlschränken und Waschmaschinen',
        },
        {
          heading: 'MOQ und flexible Bestellstrukturen verstehen',
          text: 'Eine der häufigsten Fragen von Erstkäufern im Großhandel betrifft die Mindestbestellmengen (MOQ). Bei HousePlus verstehen wir, dass verschiedene Märkte unterschiedliche Bedürfnisse haben. Unsere Standard-MOQ beginnt bei 100 Einheiten pro Produktlinie, mit flexiblen Vereinbarungen für neue Partner.',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop',
          imageAlt: 'Lager mit organisiertem Haushaltsgeräte-Inventar für den Großhandelsvertrieb',
        },
        {
          heading: 'HousePlus-Zertifizierungen: Ihr Tor zu globalen Märkten',
          text: 'Die Einhaltung von Vorschriften ist für Großhandelskäufer unverzichtbar. HousePlus-Produkte tragen CE-Zertifizierung für den europäischen Markt, FCC-Zertifizierung für die USA und Kanada, RoHS-Konformität und ISO 9001:2015. Wenn Sie bei HousePlus einkaufen, erhalten Sie vollständige Dokumentationspakete einschließlich Prüfberichten und Konformitätszertifikaten.',
        },
        {
          heading: 'OEM und ODM: Aufbau Ihrer eigenen Marke mit HousePlus',
          text: 'Viele unserer erfolgreichsten Großhandelspartner haben unsere OEM- und ODM-Fähigkeiten genutzt, um ihre eigenen Markenproduktlinien aufzubauen. Mit einer Produktionskapazität von über 100.000 Einheiten pro Monat und Vorlaufzeiten von 20-35 Tagen für Standardbestellungen können wir sowohl Kleinserien-Launches als auch große saisonale Kampagnen unterstützen.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'HousePlus OEM-Produktionslinie mit individuell gebrandeten Haushaltsgeräten',
        },
        {
          heading: 'Logistik, Versand und After-Sales-Support',
          text: 'HousePlus bietet umfassenden Logistiksupport, um sicherzustellen, dass Ihre Bestellungen pünktlich und in einwandfreiem Zustand ankommen. Wir arbeiten mit führenden Spediteuren und Reedereien zusammen, um FOB-, CIF- und DDP-Konditionen anzubieten. Für den After-Sales-Support bietet HousePlus eine 12-24-monatige Garantie auf alle Produkte und ein dediziertes After-Sales-Team, das über WhatsApp, E-Mail und Videoanruf erreichbar ist.',
        },
      ],
    },
    fr: {
      title: 'Le guide complet des appareils électroménagers en gros : Comment HousePlus soutient les acheteurs mondiaux',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-01-20',
      dateModified: '2025-01-20',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop',
      imageAlt: 'Distribution mondiale en gros d\'appareils électroménagers - commerce international HousePlus',
      sections: [
        {
          heading: 'Pourquoi les appareils électroménagers en gros représentent une opportunité massive',
          text: 'Le marché mondial des appareils électroménagers devrait dépasser 1 200 milliards de dollars d\'ici 2030, porté par une urbanisation rapide, la hausse des revenus de la classe moyenne et une demande croissante de produits économes en énergie. HousePlus est à l\'avant-garde de ce marché depuis plus d\'une décennie, fournissant des appareils électroménagers haut de gamme à plus de 500 clients dans plus de 50 pays.',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
          imageAlt: 'Showroom d\'appareils électroménagers modernes avec réfrigérateurs et machines à laver',
        },
        {
          heading: 'Comprendre le MOQ et les structures de commande flexibles',
          text: 'L\'une des questions les plus courantes des acheteurs en gros est celle des quantités minimales de commande (MOQ). Chez HousePlus, nous comprenons que différents marchés ont des besoins différents. Notre MOQ standard commence à 100 unités par ligne de produits, avec des arrangements flexibles disponibles pour les nouveaux partenaires.',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop',
          imageAlt: 'Entrepôt avec inventaire organisé d\'appareils électroménagers pour la distribution en gros',
        },
        {
          heading: 'Certifications HousePlus : Votre passeport pour les marchés mondiaux',
          text: 'La conformité réglementaire est non négociable pour les acheteurs en gros. Les produits HousePlus portent la certification CE pour le marché européen, la certification FCC pour les États-Unis et le Canada, la conformité RoHS et ISO 9001:2015. Lorsque vous vous approvisionnez chez HousePlus, vous recevez des packages de documentation complets incluant des rapports de test et des certificats de conformité.',
        },
        {
          heading: 'OEM et ODM : Construire votre propre marque avec HousePlus',
          text: 'Beaucoup de nos partenaires grossistes les plus prospères ont tiré parti de nos capacités OEM et ODM pour créer leurs propres gammes de produits de marque. Avec une capacité de production dépassant 100 000 unités par mois et des délais de 20 à 35 jours pour les commandes standard, nous pouvons soutenir aussi bien les lancements en petites séries que les grandes campagnes saisonnières.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'Ligne de production OEM HousePlus avec appareils électroménagers de marque personnalisée',
        },
        {
          heading: 'Logistique, expédition et support après-vente',
          text: 'HousePlus offre un support logistique complet pour s\'assurer que vos commandes arrivent à temps et en parfait état. Nous travaillons avec les principaux transitaires et compagnies maritimes pour proposer des conditions FOB, CIF et DDP. Pour le support après-vente, HousePlus fournit une garantie de 12 à 24 mois sur tous les produits et une équipe après-vente dédiée disponible via WhatsApp, e-mail et appel vidéo.',
        },
      ],
    },
    ar: {
      title: 'الدليل الشامل لأجهزة المنزل بالجملة: كيف تدعم HousePlus المشترين العالميين',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-01-20',
      dateModified: '2025-01-20',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop',
      imageAlt: 'توزيع الأجهزة المنزلية بالجملة عالميًا - التجارة الدولية لـ HousePlus',
      sections: [
        {
          heading: 'لماذا تمثل أجهزة المنزل بالجملة فرصة هائلة',
          text: 'من المتوقع أن يتجاوز سوق الأجهزة المنزلية العالمي 1.2 تريليون دولار بحلول عام 2030، مدفوعًا بالتحضر السريع وارتفاع دخول الطبقة المتوسطة والطلب المتزايد على المنتجات الموفرة للطاقة. كانت HousePlus في طليعة هذا السوق لأكثر من عقد، حيث تزود أكثر من 500 عميل في أكثر من 50 دولة بأجهزة منزلية متميزة.',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
          imageAlt: 'صالة عرض الأجهزة المنزلية الحديثة مع الثلاجات وآلات الغسيل',
        },
        {
          heading: 'فهم الحد الأدنى لكميات الطلب وهياكل الطلب المرنة',
          text: 'أحد الأسئلة الأكثر شيوعًا من مشتري الجملة لأول مرة يتعلق بالحد الأدنى لكميات الطلب (MOQ). في HousePlus، نتفهم أن الأسواق المختلفة لها احتياجات مختلفة. يبدأ MOQ القياسي لدينا من 100 وحدة لكل خط منتج، مع ترتيبات مرنة متاحة للشركاء الجدد.',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop',
          imageAlt: 'مستودع مع مخزون منظم من الأجهزة المنزلية للتوزيع بالجملة',
        },
        {
          heading: 'شهادات HousePlus: بوابتك إلى الأسواق العالمية',
          text: 'الامتثال التنظيمي أمر لا يمكن التفاوض عليه لمشتري الجملة. تحمل منتجات HousePlus شهادة CE للسوق الأوروبية، وشهادة FCC للولايات المتحدة وكندا، وامتثال RoHS، وISO 9001:2015. عند الشراء من HousePlus، تتلقى حزم توثيق كاملة تشمل تقارير الاختبار وشهادات المطابقة.',
        },
        {
          heading: 'OEM وODM: بناء علامتك التجارية الخاصة مع HousePlus',
          text: 'استفاد كثير من شركائنا الأكثر نجاحًا في الجملة من قدراتنا في OEM وODM لبناء خطوط منتجاتهم الخاصة ذات العلامة التجارية. بطاقة إنتاج تتجاوز 100,000 وحدة شهريًا وأوقات تسليم تتراوح بين 20-35 يومًا للطلبات القياسية، يمكننا دعم إطلاق الدفعات الصغيرة والحملات الموسمية الكبيرة.',
          image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
          imageAlt: 'خط إنتاج OEM لـ HousePlus مع أجهزة منزلية ذات علامة تجارية مخصصة',
        },
        {
          heading: 'الخدمات اللوجستية والشحن ودعم ما بعد البيع',
          text: 'تقدم HousePlus دعمًا لوجستيًا شاملاً لضمان وصول طلباتك في الوقت المحدد وبحالة مثالية. نعمل مع كبار شركات الشحن والخطوط البحرية لتقديم شروط FOB وCIF وDDP. لدعم ما بعد البيع، تقدم HousePlus ضمانًا لمدة 12-24 شهرًا على جميع المنتجات وفريق مخصص متاح عبر WhatsApp والبريد الإلكتروني ومكالمات الفيديو.',
        },
      ],
    },
  };

  const data = articleContent[lang] || articleContent.en;

  const articleSchema = buildArticleSchema({
    headline: data.title,
    image: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    authorName: data.author,
    description: 'A comprehensive guide for wholesale buyers on sourcing high-quality home appliances from HousePlus.',
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
              {lang === 'en' && 'Ready to Start Wholesale Sourcing with HousePlus?'}
              {lang === 'es' && '¿Listo para Comenzar el Abastecimiento Mayorista con HousePlus?'}
              {lang === 'de' && 'Bereit, mit HousePlus Großhandelsbeschaffung zu starten?'}
              {lang === 'fr' && 'Prêt à commencer l\'approvisionnement en gros avec HousePlus?'}
              {lang === 'ar' && 'هل أنت مستعد لبدء التوريد بالجملة مع HousePlus؟'}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {lang === 'en' && 'Contact our sales team today to discuss your product requirements, MOQ, and customization options. HousePlus is your trusted manufacturing partner for global wholesale success.'}
              {lang === 'es' && 'Comuníquese con nuestro equipo de ventas hoy para discutir sus requisitos de productos, MOQ y opciones de personalización.'}
              {lang === 'de' && 'Kontaktieren Sie noch heute unser Vertriebsteam, um Ihre Produktanforderungen, MOQ und Anpassungsoptionen zu besprechen.'}
              {lang === 'fr' && 'Contactez notre équipe commerciale dès aujourd\'hui pour discuter de vos besoins en produits, MOQ et options de personnalisation.'}
              {lang === 'ar' && 'تواصل مع فريق المبيعات لدينا اليوم لمناقشة متطلبات منتجاتك وMOQ وخيارات التخصيص.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {lang === 'en' && 'Contact HousePlus Sales Team'}
              {lang === 'es' && 'Contactar al Equipo de Ventas de HousePlus'}
              {lang === 'de' && 'HousePlus Vertriebsteam kontaktieren'}
              {lang === 'fr' && 'Contacter l\'équipe commerciale HousePlus'}
              {lang === 'ar' && 'اتصل بفريق مبيعات HousePlus'}
            </Link>
          </div>
        </article>
      </main>
    </SchemaRenderer>
  );
}
