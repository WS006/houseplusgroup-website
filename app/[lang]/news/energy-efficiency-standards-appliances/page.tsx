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
    title: 'Energy Efficiency Standards in Modern Appliances: HousePlus CE & RoHS Compliance',
    description: 'Understanding international energy efficiency standards is critical for wholesale buyers. HousePlus products meet CE, FCC, RoHS, and ISO 9001 requirements, ensuring compliance and market access worldwide.',
    keywords: ['energy efficiency appliances', 'CE certification', 'RoHS compliance', 'HousePlus certifications', 'ISO 9001 appliances'],
    url: `/${lang}/news/energy-efficiency-standards-appliances`,
    lang: lang as any,
    type: 'article',
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : lang === 'de' ? 'Startseite' : lang === 'fr' ? 'Accueil' : 'الرئيسية', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : lang === 'es' ? 'Noticias' : lang === 'de' ? 'Nachrichten' : lang === 'fr' ? 'Actualités' : 'أخبار', url: `/${lang}/news` },
    { name: 'Energy Efficiency', url: `/${lang}/news/energy-efficiency-standards-appliances` },
  ];

  const articleContent: Record<string, any> = {
    en: {
      title: 'Energy Efficiency Standards in Modern Appliances: HousePlus CE & RoHS Compliance',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-05-08',
      dateModified: '2025-05-08',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
      imageAlt: 'Energy efficient home appliances with CE and RoHS certification labels',
      sections: [
        {
          heading: 'Why Energy Efficiency Standards Matter for Wholesale Buyers',
          text: 'In today\'s global marketplace, energy efficiency is no longer just a selling point — it\'s a regulatory requirement. Governments across Europe, North America, and Asia have implemented increasingly stringent energy efficiency standards for home appliances, consumer electronics, and solar products. For wholesale buyers and distributors, understanding these standards is essential to ensure market access, avoid costly recalls, and meet the expectations of environmentally conscious consumers. HousePlus has built its entire product development philosophy around compliance with international energy efficiency standards, ensuring that every product we manufacture is ready for global markets from day one.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop',
          imageAlt: 'Energy efficient LED lighting and smart home devices reducing power consumption',
        },
        {
          heading: 'CE Marking: The European Standard for Product Safety and Efficiency',
          text: 'The CE marking is mandatory for products sold within the European Economic Area (EEA). It indicates that a product meets EU safety, health, and environmental protection requirements. For home appliances, CE compliance covers the Low Voltage Directive (LVD), the Electromagnetic Compatibility Directive (EMC), and the Energy-Related Products Directive (ErP). HousePlus products undergo rigorous third-party testing at accredited laboratories to obtain CE certification. Our technical documentation includes Declaration of Conformity (DoC) files, test reports, and technical construction files — all available to our wholesale partners for customs clearance and regulatory audits. With CE-certified products from HousePlus, you can confidently enter European markets and meet the demands of EU retailers and distributors.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
          imageAlt: 'CE certified home appliances ready for European market distribution',
        },
        {
          heading: 'RoHS Compliance: Protecting Consumers and the Environment',
          text: 'The Restriction of Hazardous Substances (RoHS) Directive restricts the use of specific hazardous materials found in electrical and electronic products. RoHS compliance is mandatory for products sold in the EU and has been adopted by many other countries, including China (China RoHS), South Korea, and Japan. HousePlus products are manufactured using RoHS-compliant materials and processes. We maintain detailed material declarations for all components, conduct regular supplier audits, and perform chemical testing to verify compliance. For wholesale buyers, RoHS compliance means reduced liability, easier market access, and alignment with global sustainability trends. Our products are also compliant with REACH regulations, which govern chemical substances in products sold in the EU.',
        },
        {
          heading: 'FCC Certification and North American Market Access',
          text: 'For wholesale buyers targeting the North American market, FCC (Federal Communications Commission) certification is essential for electronic devices that emit radio frequency (RF) energy. HousePlus\'s 3C electronics, wireless chargers, smart home devices, and LED lighting products all carry FCC certification, ensuring they meet US and Canadian regulatory requirements. Our FCC-certified products include detailed test reports from accredited US laboratories, FCC ID numbers for each device, and compliance documentation for import clearance. We also hold ETL and UL certifications for select product lines, providing additional assurance for North American retailers and distributors.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
          imageAlt: 'FCC certified electronic devices and smart home products from HousePlus',
        },
        {
          heading: 'ISO 9001:2015 and Our Commitment to Quality Management',
          text: 'Beyond product-specific certifications, HousePlus holds ISO 9001:2015 certification for our quality management system. This internationally recognized standard demonstrates our commitment to consistent quality, continuous improvement, and customer satisfaction. Our ISO-certified quality management system covers every stage of production, from raw material procurement and supplier qualification to manufacturing, quality control, and after-sales service. For wholesale buyers, ISO 9001 certification provides assurance that HousePlus operates with systematic processes, documented procedures, and measurable quality objectives. We conduct regular internal audits and management reviews, and our certification is renewed annually by an accredited third-party body. Partner with HousePlus to access a certified, reliable supply chain that meets the highest global quality standards.',
        },
      ],
    },
    es: {
      title: 'Estándares de Eficiencia Energética en Electrodomésticos Modernos: Cumplimiento CE y RoHS de HousePlus',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-05-08',
      dateModified: '2025-05-08',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
      imageAlt: 'Electrodomésticos eficientes energéticamente con etiquetas de certificación CE y RoHS',
      sections: [
        {
          heading: 'Por Qué los Estándares de Eficiencia Energética Importan para los Compradores Mayoristas',
          text: 'En el mercado global actual, la eficiencia energética ya no es solo un punto de venta, sino un requisito regulatorio. Los gobiernos de Europa, América del Norte y Asia han implementado estándares de eficiencia energética cada vez más estrictos. HousePlus ha construido toda su filosofía de desarrollo de productos en torno al cumplimiento de los estándares internacionales de eficiencia energética.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop',
          imageAlt: 'Iluminación LED eficiente y dispositivos domésticos inteligentes que reducen el consumo de energía',
        },
        {
          heading: 'Marcado CE: El Estándar Europeo de Seguridad y Eficiencia del Producto',
          text: 'El marcado CE es obligatorio para los productos vendidos dentro del Espacio Económico Europeo (EEE). Los productos HousePlus se someten a rigurosas pruebas de terceros en laboratorios acreditados para obtener la certificación CE. Nuestra documentación técnica incluye archivos de Declaración de Conformidad (DoC), informes de pruebas y archivos de construcción técnica.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
          imageAlt: 'Electrodomésticos con certificación CE listos para distribución en el mercado europeo',
        },
        {
          heading: 'Cumplimiento RoHS: Protegiendo a los Consumidores y el Medio Ambiente',
          text: 'La Directiva de Restricción de Sustancias Peligrosas (RoHS) restringe el uso de materiales peligrosos específicos en productos eléctricos y electrónicos. Los productos HousePlus se fabrican utilizando materiales y procesos conformes con RoHS. Para los compradores mayoristas, el cumplimiento de RoHS significa menor responsabilidad, acceso más fácil al mercado y alineación con las tendencias globales de sostenibilidad.',
        },
        {
          heading: 'Certificación FCC y Acceso al Mercado Norteamericano',
          text: 'Para los compradores mayoristas que apuntan al mercado norteamericano, la certificación FCC es esencial para los dispositivos electrónicos. Los productos electrónicos 3C de HousePlus, cargadores inalámbricos, dispositivos domésticos inteligentes y productos de iluminación LED llevan certificación FCC, asegurando que cumplan con los requisitos regulatorios de EE. UU. y Canadá.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
          imageAlt: 'Dispositivos electrónicos certificados por FCC y productos domésticos inteligentes de HousePlus',
        },
        {
          heading: 'ISO 9001:2015 y Nuestro Compromiso con la Gestión de Calidad',
          text: 'Más allá de las certificaciones específicas de productos, HousePlus tiene la certificación ISO 9001:2015 para nuestro sistema de gestión de calidad. Este estándar reconocido internacionalmente demuestra nuestro compromiso con la calidad consistente, la mejora continua y la satisfacción del cliente. Para los compradores mayoristas, la certificación ISO 9001 proporciona la garantía de que HousePlus opera con procesos sistemáticos y objetivos de calidad medibles.',
        },
      ],
    },
    de: {
      title: 'Energieeffizienzstandards bei modernen Geräten: HousePlus CE- und RoHS-Konformität',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-05-08',
      dateModified: '2025-05-08',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
      imageAlt: 'Energieeffiziente Haushaltsgeräte mit CE- und RoHS-Zertifizierungsetiketten',
      sections: [
        {
          heading: 'Warum Energieeffizienzstandards für Großhandelskäufer wichtig sind',
          text: 'Auf dem heutigen globalen Markt ist Energieeffizienz nicht mehr nur ein Verkaufsargument, sondern eine regulatorische Anforderung. HousePlus hat seine gesamte Produktentwicklungsphilosophie auf die Einhaltung internationaler Energieeffizienzstandards ausgerichtet.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop',
          imageAlt: 'Energieeffiziente LED-Beleuchtung und Smart-Home-Geräte zur Reduzierung des Stromverbrauchs',
        },
        {
          heading: 'CE-Kennzeichnung: Der europäische Standard für Produktsicherheit und Effizienz',
          text: 'Die CE-Kennzeichnung ist für Produkte, die im Europäischen Wirtschaftsraum (EWR) verkauft werden, obligatorisch. HousePlus-Produkte werden in akkreditierten Labors rigoros getestet, um die CE-Zertifizierung zu erhalten. Unsere technische Dokumentation umfasst Konformitätserklärungen (DoC), Prüfberichte und technische Konstruktionsdateien.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
          imageAlt: 'CE-zertifizierte Haushaltsgeräte für den europäischen Marktvertrieb',
        },
        {
          heading: 'RoHS-Konformität: Schutz von Verbrauchern und Umwelt',
          text: 'Die RoHS-Richtlinie schränkt die Verwendung bestimmter gefährlicher Stoffe in elektrischen und elektronischen Produkten ein. HousePlus-Produkte werden mit RoHS-konformen Materialien und Prozessen hergestellt. Für Großhandelskäufer bedeutet RoHS-Konformität reduzierte Haftung und einfacheren Marktzugang.',
        },
        {
          heading: 'FCC-Zertifizierung und Zugang zum nordamerikanischen Markt',
          text: 'Für Großhandelskäufer, die auf den nordamerikanischen Markt abzielen, ist die FCC-Zertifizierung für elektronische Geräte unerlässlich. Die 3C-Elektronik, drahtlosen Ladegeräte, Smart-Home-Geräte und LED-Beleuchtungsprodukte von HousePlus tragen alle FCC-Zertifizierung.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
          imageAlt: 'FCC-zertifizierte elektronische Geräte und Smart-Home-Produkte von HousePlus',
        },
        {
          heading: 'ISO 9001:2015 und unser Engagement für Qualitätsmanagement',
          text: 'Über produktspezifische Zertifizierungen hinaus verfügt HousePlus über die ISO 9001:2015-Zertifizierung für unser Qualitätsmanagementsystem. Dieser international anerkannte Standard demonstriert unser Engagement für konsistente Qualität, kontinuierliche Verbesserung und Kundenzufriedenheit.',
        },
      ],
    },
    fr: {
      title: 'Normes d\'efficacité énergétique dans les appareils modernes : Conformité CE et RoHS de HousePlus',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-05-08',
      dateModified: '2025-05-08',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
      imageAlt: 'Appareils électroménagers économes en énergie avec étiquettes de certification CE et RoHS',
      sections: [
        {
          heading: 'Pourquoi les normes d\'efficacité énergétique sont importantes pour les acheteurs en gros',
          text: 'Sur le marché mondial actuel, l\'efficacité énergétique n\'est plus seulement un argument de vente, c\'est une exigence réglementaire. HousePlus a construit toute sa philosophie de développement de produits autour de la conformité aux normes internationales d\'efficacité énergétique.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop',
          imageAlt: 'Éclairage LED économe en énergie et appareils domotiques réduisant la consommation d\'énergie',
        },
        {
          heading: 'Marquage CE : La norme européenne de sécurité et d\'efficacité des produits',
          text: 'Le marquage CE est obligatoire pour les produits vendus dans l\'Espace économique européen (EEE). Les produits HousePlus subissent des tests rigoureux dans des laboratoires accrédités pour obtenir la certification CE. Notre documentation technique comprend des fichiers de Déclaration de Conformité (DoC), des rapports de test et des fichiers de construction technique.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
          imageAlt: 'Appareils électroménagers certifiés CE prêts pour la distribution sur le marché européen',
        },
        {
          heading: 'Conformité RoHS : Protéger les consommateurs et l\'environnement',
          text: 'La directive RoHS restreint l\'utilisation de substances dangereuses spécifiques dans les produits électriques et électroniques. Les produits HousePlus sont fabriqués avec des matériaux et des processus conformes à RoHS. Pour les acheteurs en gros, la conformité RoHS signifie une responsabilité réduite et un accès plus facile au marché.',
        },
        {
          heading: 'Certification FCC et accès au marché nord-américain',
          text: 'Pour les acheteurs en gros ciblant le marché nord-américain, la certification FCC est essentielle pour les appareils électroniques. Les produits électroniques 3C, chargeurs sans fil, appareils domotiques et produits d\'éclairage LED de HousePlus portent tous la certification FCC.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
          imageAlt: 'Appareils électroniques certifiés FCC et produits domotiques de HousePlus',
        },
        {
          heading: 'ISO 9001:2015 et notre engagement envers la gestion de la qualité',
          text: 'Au-delà des certifications spécifiques aux produits, HousePlus détient la certification ISO 9001:2015 pour notre système de gestion de la qualité. Cette norme reconnue internationalement démontre notre engagement envers une qualité constante, une amélioration continue et la satisfaction des clients.',
        },
      ],
    },
    ar: {
      title: 'معايير كفاءة الطاقة في الأجهزة الحديثة: امتثال HousePlus لمعايير CE وRoHS',
      author: 'HousePlus Editorial Team',
      datePublished: '2025-05-08',
      dateModified: '2025-05-08',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
      imageAlt: 'أجهزة منزلية موفرة للطاقة مع ملصقات شهادات CE وRoHS',
      sections: [
        {
          heading: 'لماذا تهم معايير كفاءة الطاقة لمشتري الجملة',
          text: 'في سوق اليوم العالمي، لم تعد كفاءة الطاقة مجرد نقطة بيع، بل أصبحت متطلبًا تنظيميًا. بنت HousePlus فلسفتها الكاملة في تطوير المنتجات حول الامتثال لمعايير كفاءة الطاقة الدولية.',
          image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop',
          imageAlt: 'إضاءة LED موفرة للطاقة وأجهزة المنزل الذكية لتقليل استهلاك الطاقة',
        },
        {
          heading: 'علامة CE: المعيار الأوروبي لسلامة المنتج وكفاءته',
          text: 'علامة CE إلزامية للمنتجات المباعة داخل المنطقة الاقتصادية الأوروبية. تخضع منتجات HousePlus لاختبارات صارمة من طرف ثالث في مختبرات معتمدة للحصول على شهادة CE. تشمل وثائقنا الفنية ملفات إعلان المطابقة وتقارير الاختبار.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
          imageAlt: 'أجهزة منزلية معتمدة CE جاهزة للتوزيع في السوق الأوروبية',
        },
        {
          heading: 'الامتثال لـ RoHS: حماية المستهلكين والبيئة',
          text: 'توجيه RoHS يقيد استخدام مواد خطرة محددة في المنتجات الكهربائية والإلكترونية. تُصنَّع منتجات HousePlus باستخدام مواد وعمليات متوافقة مع RoHS. بالنسبة لمشتري الجملة، يعني الامتثال لـ RoHS انخفاض المسؤولية وسهولة الوصول إلى الأسواق.',
        },
        {
          heading: 'شهادة FCC والوصول إلى السوق الأمريكية الشمالية',
          text: 'لمشتري الجملة الذين يستهدفون السوق الأمريكية الشمالية، تعد شهادة FCC ضرورية للأجهزة الإلكترونية. تحمل منتجات HousePlus الإلكترونية 3C وشواحن لاسلكية وأجهزة المنزل الذكية ومنتجات إضاءة LED شهادة FCC.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
          imageAlt: 'أجهزة إلكترونية معتمدة FCC ومنتجات المنزل الذكي من HousePlus',
        },
        {
          heading: 'ISO 9001:2015 والتزامنا بإدارة الجودة',
          text: 'بالإضافة إلى الشهادات الخاصة بالمنتجات، تحمل HousePlus شهادة ISO 9001:2015 لنظام إدارة الجودة لدينا. يُظهر هذا المعيار المعترف به دوليًا التزامنا بالجودة المتسقة والتحسين المستمر ورضا العملاء.',
        },
      ],
    },
  };

  const data = articleContent[lang] || articleContent.en;

  const articleSchema = buildArticleSchema({
    headline: data.title,
    image: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    authorName: data.author,
    description: 'Understanding international energy efficiency standards is critical for wholesale buyers. HousePlus products meet CE, FCC, RoHS, and ISO 9001 requirements.',
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
          <div className="mt-12 p-8 bg-green-50 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-green-700">
              {lang === 'en' && 'Source Certified Products from HousePlus'}
              {lang === 'es' && 'Obtenga Productos Certificados de HousePlus'}
              {lang === 'de' && 'Zertifizierte Produkte von HousePlus beziehen'}
              {lang === 'fr' && 'Approvisionnez-vous en produits certifiés auprès de HousePlus'}
              {lang === 'ar' && 'احصل على منتجات معتمدة من HousePlus'}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {lang === 'en' && 'All HousePlus products come with full certification documentation. Contact us to request product samples, certification copies, and wholesale pricing.'}
              {lang === 'es' && 'Todos los productos HousePlus vienen con documentación de certificación completa. Contáctenos para solicitar muestras de productos, copias de certificaciones y precios mayoristas.'}
              {lang === 'de' && 'Alle HousePlus-Produkte werden mit vollständiger Zertifizierungsdokumentation geliefert. Kontaktieren Sie uns, um Produktmuster, Zertifizierungskopien und Großhandelspreise anzufordern.'}
              {lang === 'fr' && 'Tous les produits HousePlus sont accompagnés d\'une documentation de certification complète. Contactez-nous pour demander des échantillons de produits, des copies de certifications et des prix de gros.'}
              {lang === 'ar' && 'تأتي جميع منتجات HousePlus مع وثائق شهادات كاملة. تواصل معنا لطلب عينات المنتجات ونسخ الشهادات وأسعار الجملة.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {lang === 'en' && 'Request Certification Documents'}
              {lang === 'es' && 'Solicitar Documentos de Certificación'}
              {lang === 'de' && 'Zertifizierungsdokumente anfordern'}
              {lang === 'fr' && 'Demander des documents de certification'}
              {lang === 'ar' && 'طلب وثائق الشهادات'}
            </Link>
          </div>
        </article>
      </main>
    </SchemaRenderer>
  );
}
