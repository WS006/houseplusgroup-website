import { Metadata } from 'next';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'HousePlus Services - OEM/ODM & Technical Support',
    es: 'Servicios HousePlus - OEM/ODM y Soporte Técnico',
    de: 'HousePlus Services - OEM/ODM und technischer Support',
    fr: 'Services HousePlus - OEM/ODM et Support Technique',
    ar: 'خدمات HousePlus - OEM/ODM والدعم الفني',
  };

  const descriptions: Record<string, string> = {
    en: 'Comprehensive OEM/ODM services, technical support, customization, and after-sales service from HousePlus.',
    es: 'Servicios integrales de OEM/ODM, soporte técnico, personalización y servicio posventa de HousePlus.',
    de: 'Umfassende OEM/ODM-Services, technischer Support, Anpassung und After-Sales-Service von HousePlus.',
    fr: 'Services OEM/ODM complets, support technique, personnalisation et service après-vente de HousePlus.',
    ar: 'خدمات OEM/ODM شاملة والدعم الفني والتخصيص وخدمة ما بعد البيع من HousePlus.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['OEM', 'ODM', 'service', 'support', 'customization', 'technical'],
    url: `/${lang}/service`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function ServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional OEM/ODM and technical support services',
    url: `https://www.houseplus-ch.com/${lang}/service`,
    lang,
    type: 'Organization',
  });

  const content: Record<string, any> = {
    en: {
      title: 'Our Services',
      intro: 'HousePlus provides comprehensive OEM/ODM services, technical support, and customization solutions tailored to your business needs.',
      oem: 'OEM/ODM Services',
      oemDesc: 'We offer full Original Equipment Manufacturing (OEM) and Original Design Manufacturing (ODM) services, allowing you to brand our products as your own or develop custom solutions from scratch.',
      oemServices: [
        { title: 'Custom Design', desc: 'Work with our engineering team to design products that meet your specifications' },
        { title: 'Brand Customization', desc: 'Custom logos, packaging, and product branding' },
        { title: 'Specification Modification', desc: 'Tailor product features and specifications to your market needs' },
        { title: 'Quality Assurance', desc: '100% inspection and testing of customized products' },
        { title: 'Flexible MOQ', desc: 'Negotiate minimum order quantities based on your requirements' },
        { title: 'Dedicated Support', desc: 'Assigned account manager for seamless communication' },
      ],
      technical: 'Technical Support',
      technicalDesc: 'Our technical support team provides comprehensive assistance throughout the product lifecycle.',
      technicalServices: [
        { title: 'Product Documentation', desc: 'Detailed specifications, manuals, and technical guides' },
        { title: 'Installation Support', desc: 'Video guides and remote installation assistance' },
        { title: 'Troubleshooting', desc: '24/7 technical support for product issues' },
        { title: 'Training Programs', desc: 'Comprehensive training for your sales and support teams' },
        { title: 'Firmware Updates', desc: 'Regular updates and improvements for smart products' },
        { title: 'Warranty Support', desc: 'Hassle-free warranty claims and replacement service' },
      ],
      afterSales: 'After-Sales Service',
      afterSalesDesc: 'We stand behind our products with comprehensive after-sales support and warranty coverage.',
      afterSalesPoints: [
        'Extended warranty options available',
        'Spare parts availability and supply',
        'Repair and replacement services',
        'Product lifecycle management',
        'Regular maintenance support',
        'Customer feedback integration',
      ],
      logistics: 'Logistics & Shipping',
      logisticsDesc: 'We handle all aspects of international logistics to ensure timely delivery of your orders.',
      logisticsServices: [
        { title: 'FOB Shipping', desc: 'Free on board pricing with flexible carrier selection' },
        { title: 'CIF Shipping', desc: 'Cost, insurance, and freight included' },
        { title: 'DDP Delivery', desc: 'Delivered duty paid to your destination' },
        { title: 'Express Shipping', desc: 'Fast delivery options for urgent orders' },
        { title: 'Tracking', desc: 'Real-time shipment tracking and updates' },
        { title: 'Insurance', desc: 'Optional cargo insurance for added protection' },
      ],
      quality: 'Quality Certification',
      qualityPoints: [
        'ISO 9001:2015 Quality Management',
        'CE Mark Compliance',
        'FCC Certification',
        'RoHS Compliance',
        'Third-party Testing Available',
        'Continuous Improvement Programs',
      ],
    },
    es: {
      title: 'Nuestros Servicios',
      intro: 'HousePlus proporciona servicios integrales de OEM/ODM, soporte técnico y soluciones de personalización adaptadas a sus necesidades comerciales.',
      oem: 'Servicios OEM/ODM',
      oemDesc: 'Ofrecemos servicios completos de Original Equipment Manufacturing (OEM) y Original Design Manufacturing (ODM), permitiéndole marcar nuestros productos como propios o desarrollar soluciones personalizadas desde cero.',
      oemServices: [
        { title: 'Diseño Personalizado', desc: 'Trabaje con nuestro equipo de ingeniería para diseñar productos que cumplan con sus especificaciones' },
        { title: 'Personalización de Marca', desc: 'Logos personalizados, empaque y marca de producto' },
        { title: 'Modificación de Especificaciones', desc: 'Adapte características y especificaciones del producto a las necesidades de su mercado' },
        { title: 'Aseguramiento de Calidad', desc: 'Inspección y prueba del 100% de los productos personalizados' },
        { title: 'MOQ Flexible', desc: 'Negocie cantidades mínimas de pedidos según sus requisitos' },
        { title: 'Soporte Dedicado', desc: 'Gerente de cuenta asignado para una comunicación sin problemas' },
      ],
      technical: 'Soporte Técnico',
      technicalDesc: 'Nuestro equipo de soporte técnico proporciona asistencia integral durante todo el ciclo de vida del producto.',
      technicalServices: [
        { title: 'Documentación del Producto', desc: 'Especificaciones detalladas, manuales y guías técnicas' },
        { title: 'Soporte de Instalación', desc: 'Guías de video y asistencia de instalación remota' },
        { title: 'Solución de Problemas', desc: 'Soporte técnico 24/7 para problemas del producto' },
        { title: 'Programas de Capacitación', desc: 'Capacitación integral para sus equipos de ventas y soporte' },
        { title: 'Actualizaciones de Firmware', desc: 'Actualizaciones e mejoras regulares para productos inteligentes' },
        { title: 'Soporte de Garantía', desc: 'Servicio de reclamos de garantía y reemplazo sin complicaciones' },
      ],
      afterSales: 'Servicio Posventa',
      afterSalesDesc: 'Respaldamos nuestros productos con soporte posventa integral y cobertura de garantía.',
      afterSalesPoints: [
        'Opciones de garantía extendida disponibles',
        'Disponibilidad de piezas de repuesto y suministro',
        'Servicios de reparación y reemplazo',
        'Gestión del ciclo de vida del producto',
        'Soporte de mantenimiento regular',
        'Integración de comentarios de clientes',
      ],
      logistics: 'Logística y Envío',
      logisticsDesc: 'Manejamos todos los aspectos de la logística internacional para garantizar la entrega oportuna de sus pedidos.',
      logisticsServices: [
        { title: 'Envío FOB', desc: 'Precios libres a bordo con selección flexible de transportista' },
        { title: 'Envío CIF', desc: 'Costo, seguro y flete incluidos' },
        { title: 'Entrega DDP', desc: 'Entregado con derechos pagados a su destino' },
        { title: 'Envío Rápido', desc: 'Opciones de entrega rápida para pedidos urgentes' },
        { title: 'Seguimiento', desc: 'Seguimiento de envío en tiempo real y actualizaciones' },
        { title: 'Seguro', desc: 'Seguro de carga opcional para mayor protección' },
      ],
      quality: 'Certificación de Calidad',
      qualityPoints: [
        'Gestión de Calidad ISO 9001:2015',
        'Cumplimiento de Marca CE',
        'Certificación FCC',
        'Cumplimiento RoHS',
        'Pruebas de Terceros Disponibles',
        'Programas de Mejora Continua',
      ],
    },
    de: {
      title: 'Unsere Dienstleistungen',
      intro: 'HousePlus bietet umfassende OEM/ODM-Services, technischen Support und Anpassungslösungen, die auf Ihre Geschäftsanforderungen zugeschnitten sind.',
      oem: 'OEM/ODM-Services',
      oemDesc: 'Wir bieten vollständige Original Equipment Manufacturing (OEM) und Original Design Manufacturing (ODM) Services, mit denen Sie unsere Produkte als Ihre eigenen kennzeichnen oder maßgeschneiderte Lösungen von Grund auf entwickeln können.',
      oemServices: [
        { title: 'Kundenspezifisches Design', desc: 'Arbeiten Sie mit unserem Engineeringteam zusammen, um Produkte zu entwerfen, die Ihren Anforderungen entsprechen' },
        { title: 'Markenanpassung', desc: 'Benutzerdefinierte Logos, Verpackung und Produktmarke' },
        { title: 'Spezifikationsänderung', desc: 'Passen Sie Produktfunktionen und Spezifikationen an Ihre Marktanforderungen an' },
        { title: 'Qualitätssicherung', desc: '100% Inspektion und Prüfung angepasster Produkte' },
        { title: 'Flexible MOQ', desc: 'Verhandeln Sie Mindestbestellmengen basierend auf Ihren Anforderungen' },
        { title: 'Dedizierter Support', desc: 'Zugewiesener Kontomanager für nahtlose Kommunikation' },
      ],
      technical: 'Technischer Support',
      technicalDesc: 'Unser technisches Support-Team bietet umfassende Unterstützung während des gesamten Produktlebenszyklus.',
      technicalServices: [
        { title: 'Produktdokumentation', desc: 'Detaillierte Spezifikationen, Handbücher und technische Leitfäden' },
        { title: 'Installationsunterstützung', desc: 'Videoanleitungen und Remote-Installationsunterstützung' },
        { title: 'Fehlerbehebung', desc: '24/7 technischer Support für Produktprobleme' },
        { title: 'Schulungsprogramme', desc: 'Umfassende Schulung für Ihre Vertriebs- und Support-Teams' },
        { title: 'Firmware-Updates', desc: 'Regelmäßige Updates und Verbesserungen für intelligente Produkte' },
        { title: 'Garantie-Support', desc: 'Problemloses Garantie-Service und Austauschservice' },
      ],
      afterSales: 'After-Sales-Service',
      afterSalesDesc: 'Wir stehen hinter unseren Produkten mit umfassendem After-Sales-Support und Garantieabdeckung.',
      afterSalesPoints: [
        'Erweiterte Garantieoptionen verfügbar',
        'Verfügbarkeit von Ersatzteilen und Versorgung',
        'Reparatur- und Austauschservices',
        'Produktlebenszyklus-Management',
        'Regelmäßige Wartungsunterstützung',
        'Integration von Kundenfeedback',
      ],
      logistics: 'Logistik & Versand',
      logisticsDesc: 'Wir kümmern uns um alle Aspekte der internationalen Logistik, um eine zeitnahe Lieferung Ihrer Bestellungen zu gewährleisten.',
      logisticsServices: [
        { title: 'FOB-Versand', desc: 'Frei an Bord mit flexibler Spediteurauswahl' },
        { title: 'CIF-Versand', desc: 'Kosten, Versicherung und Fracht inbegriffen' },
        { title: 'DDP-Lieferung', desc: 'Geliefert mit bezahlten Zöllen an Ihr Ziel' },
        { title: 'Express-Versand', desc: 'Schnelle Lieferoptionen für dringende Bestellungen' },
        { title: 'Verfolgung', desc: 'Echtzeit-Sendungsverfolgung und Updates' },
        { title: 'Versicherung', desc: 'Optionale Frachtversicherung für zusätzlichen Schutz' },
      ],
      quality: 'Qualitätszertifizierung',
      qualityPoints: [
        'ISO 9001:2015 Qualitätsmanagementsystem',
        'CE-Kennzeichnung Konformität',
        'FCC-Zertifizierung',
        'RoHS-Konformität',
        'Prüfung durch Dritte verfügbar',
        'Programme zur kontinuierlichen Verbesserung',
      ],
    },
    fr: {
      title: 'Nos Services',
      intro: 'HousePlus fournit des services OEM/ODM complets, un support technique et des solutions de personnalisation adaptées à vos besoins commerciaux.',
      oem: 'Services OEM/ODM',
      oemDesc: 'Nous offrons des services complets de fabrication d\'équipement d\'origine (OEM) et de fabrication de conception d\'origine (ODM), vous permettant de marquer nos produits comme les vôtres ou de développer des solutions personnalisées à partir de zéro.',
      oemServices: [
        { title: 'Conception Personnalisée', desc: 'Travaillez avec notre équipe d\'ingénierie pour concevoir des produits qui répondent à vos spécifications' },
        { title: 'Personnalisation de Marque', desc: 'Logos personnalisés, emballage et marque de produit' },
        { title: 'Modification de Spécification', desc: 'Adaptez les fonctionnalités et spécifications du produit aux besoins de votre marché' },
        { title: 'Assurance Qualité', desc: 'Inspection et test à 100% des produits personnalisés' },
        { title: 'MOQ Flexible', desc: 'Négociez les quantités minimales de commande en fonction de vos besoins' },
        { title: 'Support Dédié', desc: 'Gestionnaire de compte assigné pour une communication transparente' },
      ],
      technical: 'Support Technique',
      technicalDesc: 'Notre équipe de support technique fournit une assistance complète tout au long du cycle de vie du produit.',
      technicalServices: [
        { title: 'Documentation Produit', desc: 'Spécifications détaillées, manuels et guides techniques' },
        { title: 'Support d\'Installation', desc: 'Guides vidéo et assistance d\'installation à distance' },
        { title: 'Dépannage', desc: 'Support technique 24/7 pour les problèmes de produit' },
        { title: 'Programmes de Formation', desc: 'Formation complète pour vos équipes commerciales et de support' },
        { title: 'Mises à Jour du Firmware', desc: 'Mises à jour et améliorations régulières pour les produits intelligents' },
        { title: 'Support de Garantie', desc: 'Service de réclamation de garantie et de remplacement sans tracas' },
      ],
      afterSales: 'Service Après-Vente',
      afterSalesDesc: 'Nous soutienons nos produits avec un support après-vente complet et une couverture de garantie.',
      afterSalesPoints: [
        'Options de garantie prolongée disponibles',
        'Disponibilité des pièces de rechange et approvisionnement',
        'Services de réparation et de remplacement',
        'Gestion du cycle de vie du produit',
        'Support d\'entretien régulier',
        'Intégration des commentaires des clients',
      ],
      logistics: 'Logistique et Expédition',
      logisticsDesc: 'Nous gérons tous les aspects de la logistique internationale pour assurer la livraison opportune de vos commandes.',
      logisticsServices: [
        { title: 'Expédition FOB', desc: 'Tarification franco à bord avec sélection flexible du transporteur' },
        { title: 'Expédition CIF', desc: 'Coût, assurance et fret inclus' },
        { title: 'Livraison DDP', desc: 'Livré droits acquittés à votre destination' },
        { title: 'Expédition Express', desc: 'Options de livraison rapide pour les commandes urgentes' },
        { title: 'Suivi', desc: 'Suivi d\'expédition en temps réel et mises à jour' },
        { title: 'Assurance', desc: 'Assurance cargo optionnelle pour une protection supplémentaire' },
      ],
      quality: 'Certification de Qualité',
      qualityPoints: [
        'Système de Gestion de la Qualité ISO 9001:2015',
        'Conformité de la Marque CE',
        'Certification FCC',
        'Conformité RoHS',
        'Tests par Tiers Disponibles',
        'Programmes d\'Amélioration Continue',
      ],
    },
    ar: {
      title: 'خدماتنا',
      intro: 'توفر HousePlus خدمات OEM/ODM شاملة والدعم الفني وحلول التخصيص المصممة خصيصاً لاحتياجات عملك.',
      oem: 'خدمات OEM/ODM',
      oemDesc: 'نحن نقدم خدمات تصنيع المعدات الأصلية (OEM) وتصنيع التصميم الأصلي (ODM) كاملة، مما يسمح لك بتمييز منتجاتنا كمنتجاتك الخاصة أو تطوير حلول مخصصة من الصفر.',
      oemServices: [
        { title: 'التصميم المخصص', desc: 'العمل مع فريق الهندسة لدينا لتصميم منتجات تلبي مواصفاتك' },
        { title: 'تخصيص العلامة التجارية', desc: 'شعارات مخصصة وتعبئة وعلامة تجارية للمنتج' },
        { title: 'تعديل المواصفات', desc: 'تخصيص ميزات ومواصفات المنتج لاحتياجات السوق' },
        { title: 'ضمان الجودة', desc: 'فحص واختبار 100% للمنتجات المخصصة' },
        { title: 'MOQ مرن', desc: 'التفاوض على الحد الأدنى لكميات الطلب بناءً على متطلباتك' },
        { title: 'دعم مخصص', desc: 'مدير حساب معين للتواصل السلس' },
      ],
      technical: 'الدعم الفني',
      technicalDesc: 'يوفر فريق الدعم الفني لدينا مساعدة شاملة طوال دورة حياة المنتج.',
      technicalServices: [
        { title: 'توثيق المنتج', desc: 'مواصفات مفصلة وأدلة يدوية وأدلة تقنية' },
        { title: 'دعم التثبيت', desc: 'أدلة الفيديو والمساعدة في التثبيت عن بعد' },
        { title: 'استكشاف الأخطاء', desc: 'دعم فني 24/7 لمشاكل المنتج' },
        { title: 'برامج التدريب', desc: 'تدريب شامل لفرق المبيعات والدعم لديك' },
        { title: 'تحديثات البرامج الثابتة', desc: 'تحديثات وتحسينات منتظمة للمنتجات الذكية' },
        { title: 'دعم الضمان', desc: 'خدمة مطالبات الضمان والاستبدال بدون متاعب' },
      ],
      afterSales: 'خدمة ما بعد البيع',
      afterSalesDesc: 'نحن نقف خلف منتجاتنا مع دعم شامل بعد البيع وتغطية الضمان.',
      afterSalesPoints: [
        'خيارات الضمان الممتد متاحة',
        'توفر الأجزاء الاحتياطية والإمداد',
        'خدمات الإصلاح والاستبدال',
        'إدارة دورة حياة المنتج',
        'دعم الصيانة المنتظمة',
        'تكامل ملاحظات العملاء',
      ],
      logistics: 'الخدمات اللوجستية والشحن',
      logisticsDesc: 'نحن نتعامل مع جميع جوانب اللوجستيات الدولية لضمان التسليم في الوقت المناسب لطلباتك.',
      logisticsServices: [
        { title: 'شحن FOB', desc: 'التسعير الحر على متن السفينة مع اختيار ناقل مرن' },
        { title: 'شحن CIF', desc: 'التكلفة والتأمين والشحن مشمول' },
        { title: 'توصيل DDP', desc: 'تم التسليم مع دفع الرسوم إلى وجهتك' },
        { title: 'الشحن السريع', desc: 'خيارات التسليم السريع للطلبات العاجلة' },
        { title: 'التتبع', desc: 'تتبع الشحنة في الوقت الفعلي والتحديثات' },
        { title: 'التأمين', desc: 'تأمين الشحنة الاختياري للحماية الإضافية' },
      ],
      quality: 'شهادة الجودة',
      qualityPoints: [
        'نظام إدارة الجودة ISO 9001:2015',
        'امتثال علامة CE',
        'شهادة FCC',
        'امتثال RoHS',
        'الاختبار من قبل جهات خارجية متاح',
        'برامج التحسين المستمر',
      ],
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

        {/* Service Banner Image */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&h=500&fit=crop"
                alt="HousePlus professional service team providing global wholesale support"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <p className="text-2xl md:text-3xl font-bold">
                    {lang === 'en' && 'Comprehensive Services for Global Wholesale Partners'}
                    {lang === 'es' && 'Servicios Integrales para Socios Mayoristas Globales'}
                    {lang === 'de' && 'Umfassende Dienstleistungen für globale Großhandelspartner'}
                    {lang === 'fr' && 'Services complets pour les partenaires grossistes mondiaux'}
                    {lang === 'ar' && 'خدمات شاملة لشركاء الجملة العالميين'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OEM/ODM Services */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 text-center">{data.oem}</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">{data.oemDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.oemServices.map((service: any, idx: number) => (
                <div key={idx} className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Support */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 text-center">{data.technical}</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">{data.technicalDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.technicalServices.map((service: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* After-Sales Service */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 text-center">{data.afterSales}</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">{data.afterSalesDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.afterSalesPoints.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center mt-1">
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

        {/* Logistics */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 text-center">{data.logistics}</h2>
            <p className="text-lg text-slate-600 text-center mb-8 max-w-3xl mx-auto">{data.logisticsDesc}</p>
            <div className="relative h-56 rounded-xl overflow-hidden shadow-lg mb-10">
              <Image
                src="/images/team/logistics-port.jpg"
                alt="HousePlus global logistics and shipping - international port operations"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.logisticsServices.map((service: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Certification */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.quality}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.qualityPoints.map((cert: string, idx: number) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center border-2 border-blue-200">
                  <p className="font-semibold text-slate-900">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              {lang === 'en' && 'Ready to Discuss Your Service Needs?'}
              {lang === 'es' && '¿Listo para discutir sus necesidades de servicio?'}
              {lang === 'de' && 'Bereit, Ihre Serviceanforderungen zu besprechen?'}
              {lang === 'fr' && 'Prêt à discuter de vos besoins en services?'}
              {lang === 'ar' && 'هل أنت مستعد لمناقشة احتياجات خدمتك؟'}
            </h2>
            <a href={`/${lang}/contact`} className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              {lang === 'en' && 'Contact Our Sales Team'}
              {lang === 'es' && 'Contacte a Nuestro Equipo de Ventas'}
              {lang === 'de' && 'Kontaktieren Sie unser Vertriebsteam'}
              {lang === 'fr' && 'Contactez notre équipe commerciale'}
              {lang === 'ar' && 'اتصل بفريق المبيعات لدينا'}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
