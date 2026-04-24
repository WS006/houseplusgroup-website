import { Metadata } from 'next';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'HousePlus Factory - Advanced Manufacturing Facilities',
    es: 'Fábrica HousePlus - Instalaciones de Fabricación Avanzadas',
    de: 'HousePlus Fabrik - Fortschrittliche Fertigungsanlagen',
    fr: 'Usine HousePlus - Installations de Fabrication Avancées',
    ar: 'مصنع HousePlus - مرافق تصنيع متقدمة',
  };

  const descriptions: Record<string, string> = {
    en: 'Discover HousePlus state-of-the-art manufacturing facilities with advanced equipment, quality control systems, and production capacity of 100,000+ units per month.',
    es: 'Descubra las instalaciones de fabricación de última generación de HousePlus con equipos avanzados y capacidad de producción de 100,000+ unidades por mes.',
    de: 'Entdecken Sie die hochmodernen Fertigungsanlagen von HousePlus mit fortschrittlicher Ausrüstung und einer Produktionskapazität von 100.000+ Einheiten pro Monat.',
    fr: 'Découvrez les installations de fabrication de pointe de HousePlus avec des équipements avancés et une capacité de production de 100 000+ unités par mois.',
    ar: 'اكتشف مرافق التصنيع الحديثة في HousePlus مع معدات متقدمة وقدرة إنتاجية تبلغ 100000+ وحدة شهرياً.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['factory', 'manufacturing', 'production', 'quality control', 'equipment'],
    url: `/${lang}/factory`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function FactoryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional manufacturer with advanced manufacturing facilities',
    url: `https://www.houseplus-ch.com/${lang}/factory`,
    lang,
    type: 'Organization',
  });

  const content: Record<string, any> = {
    en: {
      title: 'Our Factory',
      intro: 'HousePlus operates state-of-the-art manufacturing facilities equipped with advanced technology and quality control systems to ensure the highest standards of product excellence.',
      facilities: 'Manufacturing Facilities',
      facilityList: [
        { name: 'Solar Production Line', desc: 'Dedicated facility for solar panel and power station manufacturing with 50,000+ units monthly capacity' },
        { name: 'Appliance Assembly', desc: 'Modern assembly lines for home appliances with precision equipment and automated quality checks' },
        { name: '3C Electronics Workshop', desc: 'Specialized area for electronics assembly, testing, and packaging with cleanroom standards' },
        { name: 'Quality Control Lab', desc: 'Comprehensive testing laboratory with certification for international standards compliance' },
      ],
      equipment: 'Advanced Equipment',
      equipmentList: [
        'Automated assembly machines',
        'Precision testing equipment',
        'Environmental chambers for durability testing',
        'Electrical safety testing apparatus',
        'Packaging and labeling systems',
        'Inventory management systems',
      ],
      process: 'Manufacturing Process',
      processSteps: [
        { step: '1. Design & Planning', desc: 'Custom design and engineering based on client specifications' },
        { step: '2. Material Sourcing', desc: 'Procurement of high-quality materials from certified suppliers' },
        { step: '3. Production', desc: 'Manufacturing using advanced equipment and skilled workforce' },
        { step: '4. Quality Testing', desc: '100% inspection and testing of all products' },
        { step: '5. Packaging', desc: 'Professional packaging with custom branding options' },
        { step: '6. Logistics', desc: 'Efficient shipping and delivery to global destinations' },
      ],
      quality: 'Quality Assurance',
      qualityPoints: [
        'ISO 9001:2015 certified quality management system',
        '100% product inspection before shipment',
        'Comprehensive testing for safety and performance',
        'Traceability system for all components',
        'Regular audits and continuous improvement',
        'Third-party testing and certification support',
      ],
      capacity: 'Production Capacity',
      capacityInfo: 'With multiple production lines and a skilled workforce of 500+ employees, HousePlus can produce over 100,000 units per month. Our flexible manufacturing system allows us to handle both large volume orders and custom OEM/ODM projects.',
    },
    es: {
      title: 'Nuestra Fábrica',
      intro: 'HousePlus opera instalaciones de fabricación de última generación equipadas con tecnología avanzada y sistemas de control de calidad para garantizar los más altos estándares de excelencia del producto.',
      facilities: 'Instalaciones de Fabricación',
      facilityList: [
        { name: 'Línea de Producción Solar', desc: 'Instalación dedicada a la fabricación de paneles solares y estaciones de energía con capacidad de 50,000+ unidades mensuales' },
        { name: 'Montaje de Electrodomésticos', desc: 'Líneas de montaje modernas para electrodomésticos con equipos de precisión y controles de calidad automatizados' },
        { name: 'Taller de Electrónica 3C', desc: 'Área especializada para ensamblaje, prueba y empaque de electrónica con estándares de sala limpia' },
        { name: 'Laboratorio de Control de Calidad', desc: 'Laboratorio de pruebas integral con certificación para cumplimiento de estándares internacionales' },
      ],
      equipment: 'Equipos Avanzados',
      equipmentList: [
        'Máquinas de montaje automatizadas',
        'Equipos de prueba de precisión',
        'Cámaras ambientales para pruebas de durabilidad',
        'Aparatos de prueba de seguridad eléctrica',
        'Sistemas de empaque y etiquetado',
        'Sistemas de gestión de inventario',
      ],
      process: 'Proceso de Fabricación',
      processSteps: [
        { step: '1. Diseño y Planificación', desc: 'Diseño y ingeniería personalizados según especificaciones del cliente' },
        { step: '2. Adquisición de Materiales', desc: 'Adquisición de materiales de alta calidad de proveedores certificados' },
        { step: '3. Producción', desc: 'Fabricación con equipos avanzados y mano de obra especializada' },
        { step: '4. Pruebas de Calidad', desc: 'Inspección y prueba del 100% de los productos' },
        { step: '5. Empaque', desc: 'Empaque profesional con opciones de marca personalizada' },
        { step: '6. Logística', desc: 'Envío y entrega eficiente a destinos globales' },
      ],
      quality: 'Aseguramiento de Calidad',
      qualityPoints: [
        'Sistema de gestión de calidad certificado ISO 9001:2015',
        'Inspección del 100% de los productos antes del envío',
        'Pruebas integrales de seguridad y rendimiento',
        'Sistema de trazabilidad para todos los componentes',
        'Auditorías regulares y mejora continua',
        'Apoyo en pruebas y certificación de terceros',
      ],
      capacity: 'Capacidad de Producción',
      capacityInfo: 'Con múltiples líneas de producción y una fuerza laboral especializada de 500+ empleados, HousePlus puede producir más de 100,000 unidades por mes. Nuestro sistema de fabricación flexible nos permite manejar tanto pedidos de gran volumen como proyectos OEM/ODM personalizados.',
    },
    de: {
      title: 'Unsere Fabrik',
      intro: 'HousePlus betreibt hochmoderne Fertigungsanlagen, die mit fortschrittlicher Technologie und Qualitätskontrollsystemen ausgestattet sind, um die höchsten Standards der Produktexzellenz zu gewährleisten.',
      facilities: 'Fertigungsanlagen',
      facilityList: [
        { name: 'Solarproduktionslinie', desc: 'Dedizierte Anlage für die Herstellung von Solarpanelen und Kraftwerken mit einer monatlichen Kapazität von 50.000+ Einheiten' },
        { name: 'Haushaltsgerätemontage', desc: 'Moderne Montagelinien für Haushaltsgeräte mit Präzisionsausrüstung und automatisierten Qualitätsprüfungen' },
        { name: '3C-Elektronik-Werkstatt', desc: 'Spezialisierter Bereich für Elektronikbestückung, -prüfung und -verpackung mit Reinraumstandards' },
        { name: 'Qualitätskontrolllabor', desc: 'Umfassendes Testlabor mit Zertifizierung für die Einhaltung internationaler Standards' },
      ],
      equipment: 'Fortschrittliche Ausrüstung',
      equipmentList: [
        'Automatisierte Montageautomaten',
        'Präzisions-Testausrüstung',
        'Umweltkammern für Dauertests',
        'Elektrosicherheits-Prüfgeräte',
        'Verpackungs- und Etikettierungssysteme',
        'Bestandsverwaltungssysteme',
      ],
      process: 'Fertigungsprozess',
      processSteps: [
        { step: '1. Design und Planung', desc: 'Kundenspezifisches Design und Engineering nach Kundenspezifikationen' },
        { step: '2. Materialbeschaffung', desc: 'Beschaffung hochwertiger Materialien von zertifizierten Lieferanten' },
        { step: '3. Produktion', desc: 'Herstellung mit fortschrittlicher Ausrüstung und qualifizierter Arbeitskraft' },
        { step: '4. Qualitätsprüfung', desc: '100% Inspektion und Prüfung aller Produkte' },
        { step: '5. Verpackung', desc: 'Professionelle Verpackung mit kundenspezifischen Branding-Optionen' },
        { step: '6. Logistik', desc: 'Effiziente Versand- und Lieferung zu globalen Zielen' },
      ],
      quality: 'Qualitätssicherung',
      qualityPoints: [
        'ISO 9001:2015 zertifiziertes Qualitätsmanagementsystem',
        '100% Produktkontrolle vor dem Versand',
        'Umfassende Sicherheits- und Leistungstests',
        'Rückverfolgbarkeitssystem für alle Komponenten',
        'Regelmäßige Audits und kontinuierliche Verbesserung',
        'Unterstützung bei Tests und Zertifizierung durch Dritte',
      ],
      capacity: 'Produktionskapazität',
      capacityInfo: 'Mit mehreren Produktionslinien und einer qualifizierten Arbeitskraft von über 500 Mitarbeitern kann HousePlus über 100.000 Einheiten pro Monat produzieren. Unser flexibles Fertigungssystem ermöglicht es uns, sowohl große Aufträge als auch kundenspezifische OEM/ODM-Projekte zu bearbeiten.',
    },
    fr: {
      title: 'Notre Usine',
      intro: 'HousePlus exploite des installations de fabrication de pointe équipées de technologie avancée et de systèmes de contrôle de qualité pour assurer les normes les plus élevées d\'excellence des produits.',
      facilities: 'Installations de Fabrication',
      facilityList: [
        { name: 'Ligne de Production Solaire', desc: 'Installation dédiée à la fabrication de panneaux solaires et de centrales électriques avec une capacité de 50 000+ unités par mois' },
        { name: 'Assemblage d\'Électroménagers', desc: 'Lignes d\'assemblage modernes pour électroménagers avec équipement de précision et contrôles de qualité automatisés' },
        { name: 'Atelier d\'Électronique 3C', desc: 'Zone spécialisée pour l\'assemblage, les tests et l\'emballage d\'électronique avec normes de salle blanche' },
        { name: 'Laboratoire de Contrôle de Qualité', desc: 'Laboratoire de test complet avec certification pour la conformité aux normes internationales' },
      ],
      equipment: 'Équipement Avancé',
      equipmentList: [
        'Machines d\'assemblage automatisées',
        'Équipement de test de précision',
        'Chambres environnementales pour tests de durabilité',
        'Appareils de test de sécurité électrique',
        'Systèmes d\'emballage et d\'étiquetage',
        'Systèmes de gestion des stocks',
      ],
      process: 'Processus de Fabrication',
      processSteps: [
        { step: '1. Conception et Planification', desc: 'Conception et ingénierie personnalisées selon les spécifications du client' },
        { step: '2. Approvisionnement en Matériaux', desc: 'Approvisionnement en matériaux de haute qualité auprès de fournisseurs certifiés' },
        { step: '3. Production', desc: 'Fabrication utilisant des équipements avancés et une main-d\'œuvre qualifiée' },
        { step: '4. Tests de Qualité', desc: 'Inspection et test à 100% de tous les produits' },
        { step: '5. Emballage', desc: 'Emballage professionnel avec options de marque personnalisée' },
        { step: '6. Logistique', desc: 'Expédition et livraison efficaces vers les destinations mondiales' },
      ],
      quality: 'Assurance Qualité',
      qualityPoints: [
        'Système de gestion de la qualité certifié ISO 9001:2015',
        'Inspection à 100% des produits avant expédition',
        'Tests complets de sécurité et de performance',
        'Système de traçabilité pour tous les composants',
        'Audits réguliers et amélioration continue',
        'Soutien aux tests et certifications par des tiers',
      ],
      capacity: 'Capacité de Production',
      capacityInfo: 'Avec plusieurs lignes de production et une main-d\'œuvre qualifiée de 500+ employés, HousePlus peut produire plus de 100 000 unités par mois. Notre système de fabrication flexible nous permet de gérer à la fois les commandes de gros volume et les projets OEM/ODM personnalisés.',
    },
    ar: {
      title: 'مصنعنا',
      intro: 'تدير HousePlus مرافق تصنيع حديثة مجهزة بتكنولوجيا متقدمة وأنظمة مراقبة الجودة لضمان أعلى معايير تميز المنتجات.',
      facilities: 'مرافق التصنيع',
      facilityList: [
        { name: 'خط الإنتاج الشمسي', desc: 'مرفق مخصص لتصنيع الألواح الشمسية ومحطات الطاقة بقدرة 50000+ وحدة شهرياً' },
        { name: 'تجميع الأجهزة المنزلية', desc: 'خطوط تجميع حديثة للأجهزة المنزلية مع معدات دقيقة وفحوصات جودة آلية' },
        { name: 'ورشة الإلكترونيات 3C', desc: 'منطقة متخصصة لتجميع الإلكترونيات والاختبار والتعبئة مع معايير غرفة نظيفة' },
        { name: 'مختبر مراقبة الجودة', desc: 'مختبر اختبار شامل مع شهادة للامتثال لمعايير دولية' },
      ],
      equipment: 'معدات متقدمة',
      equipmentList: [
        'آلات التجميع الآلية',
        'معدات الاختبار الدقيقة',
        'غرف بيئية لاختبارات المتانة',
        'أجهزة اختبار السلامة الكهربائية',
        'أنظمة التعبئة والتسمية',
        'أنظمة إدارة المخزون',
      ],
      process: 'عملية التصنيع',
      processSteps: [
        { step: '1. التصميم والتخطيط', desc: 'التصميم والهندسة المخصصة بناءً على مواصفات العميل' },
        { step: '2. توريد المواد', desc: 'الحصول على مواد عالية الجودة من الموردين المعتمدين' },
        { step: '3. الإنتاج', desc: 'التصنيع باستخدام معدات متقدمة وقوى عاملة ماهرة' },
        { step: '4. اختبار الجودة', desc: 'فحص واختبار 100% من جميع المنتجات' },
        { step: '5. التعبئة', desc: 'تعبئة احترافية مع خيارات العلامات التجارية المخصصة' },
        { step: '6. الخدمات اللوجستية', desc: 'الشحن والتسليم الفعال إلى الوجهات العالمية' },
      ],
      quality: 'ضمان الجودة',
      qualityPoints: [
        'نظام إدارة الجودة المعتمد ISO 9001:2015',
        'فحص 100% للمنتجات قبل الشحن',
        'اختبارات شاملة للسلامة والأداء',
        'نظام التتبع لجميع المكونات',
        'التدقيق المنتظم والتحسين المستمر',
        'دعم الاختبار والشهادات من جهات خارجية',
      ],
      capacity: 'القدرة الإنتاجية',
      capacityInfo: 'مع خطوط إنتاج متعددة وقوة عاملة ماهرة من 500+ موظف، يمكن لـ HousePlus إنتاج أكثر من 100000 وحدة شهرياً. يسمح نظام التصنيع المرن لدينا بالتعامل مع طلبات الحجم الكبير والمشاريع المخصصة OEM/ODM.',
    },
  };

  const data = content[lang] || content.en;

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

        {/* Factory Image Gallery */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/factory/production-line.jpg"
                  alt="HousePlus main production line - advanced manufacturing facility"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/factory/assembly-line.jpg"
                  alt="HousePlus assembly line - precision manufacturing process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop"
                  alt="HousePlus quality control laboratory and testing equipment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.facilities}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.facilityList.map((facility: any, idx: number) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200">
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">{facility.name}</h3>
                  <p className="text-slate-600">{facility.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.equipment}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.equipmentList.map((item: string, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <p className="text-slate-600">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.process}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.processSteps.map((step: any, idx: number) => (
                <div key={idx} className="bg-white border-2 border-blue-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold mb-2 text-blue-600">{step.step}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.quality}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.qualityPoints.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-600">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capacity */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-slate-900 text-center">{data.capacity}</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200">
                <p className="text-lg text-slate-600 leading-relaxed">{data.capacityInfo}</p>
              </div>
              <div className="md:w-1/2 relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
                  alt="HousePlus factory capacity - large-scale manufacturing operations"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
