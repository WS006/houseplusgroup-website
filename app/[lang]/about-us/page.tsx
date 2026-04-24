import { Metadata } from 'next';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'About HousePlus - Professional Manufacturer Since 2010',
    es: 'Acerca de HousePlus - Fabricante Profesional desde 2010',
    de: 'Über HousePlus - Professioneller Hersteller seit 2010',
    fr: 'À Propos de HousePlus - Fabricant Professionnel depuis 2010',
    ar: 'حول HousePlus - مصنع احترافي منذ 2010',
  };

  const descriptions: Record<string, string> = {
    en: 'Learn about HousePlus Group, a leading manufacturer of solar systems, home appliances, and 3C electronics with over 10 years of industry experience and 500+ global clients.',
    es: 'Conozca HousePlus Group, un fabricante líder de sistemas solares, electrodomésticos y electrónica 3C con más de 10 años de experiencia en la industria y 500+ clientes globales.',
    de: 'Erfahren Sie mehr über HousePlus Group, einen führenden Hersteller von Solarsystemen, Haushaltsgeräten und 3C-Elektronik mit über 10 Jahren Branchenerfahrung und 500+ globalen Kunden.',
    fr: 'Découvrez HousePlus Group, un fabricant leader de systèmes solaires, d\'électroménagers et d\'électronique 3C avec plus de 10 ans d\'expérience industrielle et 500+ clients mondiaux.',
    ar: 'تعرف على مجموعة HousePlus، وهي شركة مصنعة رائدة للأنظمة الشمسية والأجهزة المنزلية والإلكترونيات 3C مع أكثر من 10 سنوات من الخبرة الصناعية و 500+ عميل عالمي.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['about', 'company', 'manufacturer', 'solar', 'appliances', 'electronics'],
    url: `/${lang}/about-us`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics',
    url: `https://www.houseplus-ch.com/${lang}/about-us`,
    lang,
    type: 'Organization',
  });

  const content: Record<string, any> = {
    en: {
      title: 'About HousePlus',
      intro: 'HousePlus Group is a professional manufacturer specializing in three core industries: solar energy systems, home appliances, and 3C electronics. With over 10 years of industry experience, we have established ourselves as a trusted partner for global wholesale buyers.',
      mission: 'Our Mission',
      missionText: 'To deliver high-quality, innovative products that meet international standards while providing exceptional value to our wholesale partners worldwide.',
      vision: 'Our Vision',
      visionText: 'To become the leading global manufacturer of sustainable energy solutions and consumer electronics, recognized for quality, innovation, and customer service excellence.',
      history: 'Company History',
      historyText: 'Founded in 2010, HousePlus Group has grown from a small manufacturing operation to a multi-industry enterprise serving over 500 clients across 50+ countries. Our commitment to quality, innovation, and customer satisfaction has been the foundation of our success.',
      values: 'Core Values',
      valuesList: [
        { title: 'Quality', desc: 'We maintain the highest standards in manufacturing and quality assurance.' },
        { title: 'Innovation', desc: 'We continuously invest in research and development to bring cutting-edge products to market.' },
        { title: 'Reliability', desc: 'Our products and services are built on a foundation of trust and dependability.' },
        { title: 'Sustainability', desc: 'We are committed to environmentally responsible manufacturing practices.' },
      ],
      certifications: 'Certifications & Compliance',
      certList: ['CE Mark', 'FCC Certification', 'RoHS Compliance', 'ISO 9001:2015', 'ISO 14001', 'UL Certification', 'TÜV Certification'],
      capabilities: 'Manufacturing Capabilities',
      capList: [
        'In-house manufacturing facilities with advanced equipment',
        'Vertical integration ensuring quality control at every stage',
        'OEM/ODM services with custom design and branding',
        'Production capacity: 100,000+ units per month',
        'Lead time: 20-35 days for standard orders',
        'Quality assurance: 100% inspection before shipment',
      ],
    },
    es: {
      title: 'Acerca de HousePlus',
      intro: 'HousePlus Group es un fabricante profesional especializado en tres industrias principales: sistemas de energía solar, electrodomésticos y electrónica 3C. Con más de 10 años de experiencia en la industria, nos hemos establecido como un socio confiable para compradores mayoristas globales.',
      mission: 'Nuestra Misión',
      missionText: 'Entregar productos de alta calidad e innovadores que cumplan con estándares internacionales mientras proporcionamos un valor excepcional a nuestros socios mayoristas en todo el mundo.',
      vision: 'Nuestra Visión',
      visionText: 'Ser el fabricante global líder de soluciones de energía sostenible y electrónica de consumo, reconocido por la calidad, la innovación y la excelencia en el servicio al cliente.',
      history: 'Historia de la Empresa',
      historyText: 'Fundada en 2010, HousePlus Group ha crecido de una pequeña operación de fabricación a una empresa de múltiples industrias que sirve a más de 500 clientes en más de 50 países. Nuestro compromiso con la calidad, la innovación y la satisfacción del cliente ha sido la base de nuestro éxito.',
      values: 'Valores Fundamentales',
      valuesList: [
        { title: 'Calidad', desc: 'Mantenemos los más altos estándares en fabricación y aseguramiento de calidad.' },
        { title: 'Innovación', desc: 'Invertimos continuamente en investigación y desarrollo para traer productos de vanguardia al mercado.' },
        { title: 'Confiabilidad', desc: 'Nuestros productos y servicios se basan en una base de confianza y confiabilidad.' },
        { title: 'Sostenibilidad', desc: 'Estamos comprometidos con prácticas de fabricación responsables con el medio ambiente.' },
      ],
      certifications: 'Certificaciones y Cumplimiento',
      certList: ['Marca CE', 'Certificación FCC', 'Cumplimiento RoHS', 'ISO 9001:2015', 'ISO 14001', 'Certificación UL', 'Certificación TÜV'],
      capabilities: 'Capacidades de Fabricación',
      capList: [
        'Instalaciones de fabricación internas con equipos avanzados',
        'Integración vertical que garantiza el control de calidad en cada etapa',
        'Servicios OEM/ODM con diseño personalizado y marca',
        'Capacidad de producción: 100,000+ unidades por mes',
        'Tiempo de entrega: 20-35 días para pedidos estándar',
        'Aseguramiento de calidad: 100% inspección antes del envío',
      ],
    },
    de: {
      title: 'Über HousePlus',
      intro: 'HousePlus Group ist ein professioneller Hersteller, der sich auf drei Kernbranchen spezialisiert: Solarsysteme, Haushaltsgeräte und 3C-Elektronik. Mit über 10 Jahren Branchenerfahrung haben wir uns als vertrauenswürdiger Partner für globale Großhandelskäufer etabliert.',
      mission: 'Unsere Mission',
      missionText: 'Hochwertige, innovative Produkte liefern, die internationale Standards erfüllen und gleichzeitig außergewöhnlichen Wert für unsere Großhandelspartner weltweit bieten.',
      vision: 'Unsere Vision',
      visionText: 'Der führende globale Hersteller von nachhaltigen Energielösungen und Unterhaltungselektronik werden, bekannt für Qualität, Innovation und Kundenservice-Exzellenz.',
      history: 'Unternehmensgeschichte',
      historyText: 'HousePlus Group wurde 2010 gegründet und ist von einem kleinen Fertigungsbetrieb zu einem Multi-Industrie-Unternehmen herangewachsen, das über 500 Kunden in über 50 Ländern bedient. Unser Engagement für Qualität, Innovation und Kundenzufriedenheit ist die Grundlage unseres Erfolgs.',
      values: 'Kernwerte',
      valuesList: [
        { title: 'Qualität', desc: 'Wir halten die höchsten Standards in Fertigung und Qualitätssicherung ein.' },
        { title: 'Innovation', desc: 'Wir investieren kontinuierlich in Forschung und Entwicklung, um innovative Produkte auf den Markt zu bringen.' },
        { title: 'Zuverlässigkeit', desc: 'Unsere Produkte und Dienstleistungen basieren auf Vertrauen und Zuverlässigkeit.' },
        { title: 'Nachhaltigkeit', desc: 'Wir sind dem Umweltschutz in der Fertigung verpflichtet.' },
      ],
      certifications: 'Zertifizierungen und Konformität',
      certList: ['CE-Kennzeichnung', 'FCC-Zertifizierung', 'RoHS-Konformität', 'ISO 9001:2015', 'ISO 14001', 'UL-Zertifizierung', 'TÜV-Zertifizierung'],
      capabilities: 'Fertigungskapazitäten',
      capList: [
        'Interne Fertigungsanlagen mit fortschrittlicher Ausrüstung',
        'Vertikale Integration für Qualitätskontrolle in jeder Phase',
        'OEM/ODM-Dienstleistungen mit kundenspezifischem Design und Branding',
        'Produktionskapazität: 100.000+ Einheiten pro Monat',
        'Lieferzeit: 20-35 Tage für Standardbestellungen',
        'Qualitätssicherung: 100% Inspektion vor dem Versand',
      ],
    },
    fr: {
      title: 'À Propos de HousePlus',
      intro: 'HousePlus Group est un fabricant professionnel spécialisé dans trois secteurs clés : les systèmes d\'énergie solaire, les électroménagers et l\'électronique 3C. Avec plus de 10 ans d\'expérience dans l\'industrie, nous nous sommes établis comme un partenaire de confiance pour les acheteurs en gros mondiaux.',
      mission: 'Notre Mission',
      missionText: 'Fournir des produits de haute qualité et innovants qui répondent aux normes internationales tout en offrant une valeur exceptionnelle à nos partenaires grossistes mondiaux.',
      vision: 'Notre Vision',
      visionText: 'Devenir le fabricant mondial leader de solutions d\'énergie durable et d\'électronique grand public, reconnu pour la qualité, l\'innovation et l\'excellence du service client.',
      history: 'Historique de l\'Entreprise',
      historyText: 'Fondée en 2010, HousePlus Group est passée d\'une petite opération de fabrication à une entreprise multi-secteurs servant plus de 500 clients dans plus de 50 pays. Notre engagement envers la qualité, l\'innovation et la satisfaction client est à la base de notre succès.',
      values: 'Valeurs Fondamentales',
      valuesList: [
        { title: 'Qualité', desc: 'Nous maintenons les normes les plus élevées en matière de fabrication et d\'assurance qualité.' },
        { title: 'Innovation', desc: 'Nous investissons continuellement dans la recherche et le développement pour apporter des produits de pointe sur le marché.' },
        { title: 'Fiabilité', desc: 'Nos produits et services sont basés sur la confiance et la fiabilité.' },
        { title: 'Durabilité', desc: 'Nous nous engageons à adopter des pratiques de fabrication respectueuses de l\'environnement.' },
      ],
      certifications: 'Certifications et Conformité',
      certList: ['Marquage CE', 'Certification FCC', 'Conformité RoHS', 'ISO 9001:2015', 'ISO 14001', 'Certification UL', 'Certification TÜV'],
      capabilities: 'Capacités de Fabrication',
      capList: [
        'Installations de fabrication internes avec équipements avancés',
        'Intégration verticale garantissant le contrôle de qualité à chaque étape',
        'Services OEM/ODM avec design personnalisé et marque',
        'Capacité de production : 100 000+ unités par mois',
        'Délai de livraison : 20-35 jours pour les commandes standard',
        'Assurance qualité : 100% inspection avant expédition',
      ],
    },
    ar: {
      title: 'حول HousePlus',
      intro: 'HousePlus Group هي شركة مصنعة احترافية متخصصة في ثلاث صناعات أساسية: أنظمة الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. مع أكثر من 10 سنوات من الخبرة الصناعية، أسسنا أنفسنا كشريك موثوق به للمشترين بالجملة العالميين.',
      mission: 'مهمتنا',
      missionText: 'تقديم منتجات عالية الجودة ومبتكرة تلبي المعايير الدولية مع توفير قيمة استثنائية لشركائنا بالجملة في جميع أنحاء العالم.',
      vision: 'رؤيتنا',
      visionText: 'أن نصبح الشركة المصنعة العالمية الرائدة لحلول الطاقة المستدامة والإلكترونيات الاستهلاكية، معروفة بالجودة والابتكار وتميز خدمة العملاء.',
      history: 'تاريخ الشركة',
      historyText: 'تأسست HousePlus Group في عام 2010 وتطورت من عملية تصنيع صغيرة إلى مؤسسة متعددة الصناعات تخدم أكثر من 500 عميل في أكثر من 50 دولة. التزامنا بالجودة والابتكار ورضا العملاء هو أساس نجاحنا.',
      values: 'القيم الأساسية',
      valuesList: [
        { title: 'الجودة', desc: 'نحافظ على أعلى المعايير في التصنيع وضمان الجودة.' },
        { title: 'الابتكار', desc: 'نستثمر باستمرار في البحث والتطوير لإحضار منتجات متطورة إلى السوق.' },
        { title: 'الموثوقية', desc: 'منتجاتنا وخدماتنا مبنية على أساس الثقة والموثوقية.' },
        { title: 'الاستدامة', desc: 'نحن ملتزمون بممارسات التصنيع المسؤولة بيئياً.' },
      ],
      certifications: 'الشهادات والامتثال',
      certList: ['علامة CE', 'شهادة FCC', 'امتثال RoHS', 'ISO 9001:2015', 'ISO 14001', 'شهادة UL', 'شهادة TÜV'],
      capabilities: 'قدرات التصنيع',
      capList: [
        'مرافق تصنيع داخلية بمعدات متقدمة',
        'التكامل الرأسي يضمن مراقبة الجودة في كل مرحلة',
        'خدمات OEM/ODM مع تصميم مخصص والعلامة التجارية',
        'القدرة الإنتاجية: 100000+ وحدة شهرياً',
        'وقت التسليم: 20-35 يوماً للطلبات القياسية',
        'ضمان الجودة: 100% فحص قبل الشحن',
      ],
    },
  };

  const data = content[lang] || content.en;
  const isRTL = lang === 'ar';

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">{data.title}</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">{data.intro}</p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">{data.mission}</h2>
              <p className="text-slate-600 leading-relaxed">{data.missionText}</p>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">{data.vision}</h2>
              <p className="text-slate-600 leading-relaxed">{data.visionText}</p>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-slate-900 text-center">{data.history}</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">{data.historyText}</p>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.values}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.valuesList.map((value: any, idx: number) => (
                <div key={idx} className="bg-white border-2 border-blue-100 p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{value.title}</h3>
                  <p className="text-slate-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.certifications}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.certList.map((cert: string, idx: number) => (
                <div key={idx} className="bg-white p-4 rounded-lg text-center border border-blue-200 hover:border-blue-600 transition-colors">
                  <p className="font-semibold text-slate-900">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Capabilities */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.capabilities}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.capList.map((cap: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-600">{cap}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              {lang === 'en' && 'Ready to Partner with HousePlus?'}
              {lang === 'es' && '¿Listo para asociarse con HousePlus?'}
              {lang === 'de' && 'Bereit, mit HousePlus zu partnern?'}
              {lang === 'fr' && 'Prêt à s\'associer avec HousePlus?'}
              {lang === 'ar' && 'هل أنت مستعد للشراكة مع HousePlus؟'}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {lang === 'en' && 'Contact our sales team today to discuss your wholesale requirements and explore partnership opportunities.'}
              {lang === 'es' && 'Póngase en contacto con nuestro equipo de ventas hoy para discutir sus requisitos mayoristas.'}
              {lang === 'de' && 'Kontaktieren Sie unser Vertriebsteam noch heute, um Ihre Großhandelsanforderungen zu besprechen.'}
              {lang === 'fr' && 'Contactez notre équipe commerciale dès aujourd\'hui pour discuter de vos besoins en gros.'}
              {lang === 'ar' && 'اتصل بفريق المبيعات لدينا اليوم لمناقشة متطلبات الجملة الخاصة بك.'}
            </p>
            <a href={`/${lang}/contact`} className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              {lang === 'en' && 'Get in Touch'}
              {lang === 'es' && 'Ponte en Contacto'}
              {lang === 'de' && 'Kontakt Aufnehmen'}
              {lang === 'fr' && 'Nous Contacter'}
              {lang === 'ar' && 'اتصل بنا'}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
