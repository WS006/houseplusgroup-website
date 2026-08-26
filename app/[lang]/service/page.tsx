import { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'HousePlus Services — Technical Support & After-Sales',
    es: 'Servicios de HousePlus — Soporte Técnico y Postventa',
    de: 'HousePlus Service — Technischer Support & Kundendienst',
    fr: 'Services HousePlus — Support Technique et SAV',
    ar: 'خدمات هاوس بلس — الدعم الفني وخدمة ما بعد البيع',
  };

  const descriptions: Record<string, string> = {
    en: 'HousePlus provides comprehensive B2B services: OEM manufacturing, private labelling, export logistics, market compliance and dedicated after-sales technical support for wholesale buyers worldwide.',
    es: 'HousePlus ofrece servicios B2B integrales: fabricación OEM, marca privada, logística de exportación, cumplimiento normativo y soporte técnico postventa para compradores mayoristas.',
    de: 'HousePlus bietet umfassende B2B-Dienstleistungen: OEM-Fertigung, Private Labelling, Exportlogistik, Marktzulassung und dedizierter technischer Kundendienst für Großhandelskäufer weltweit.',
    fr: 'HousePlus propose des services B2B complets : fabrication OEM, marque privée, logistique export, conformité réglementaire et support technique après-vente pour clients grossistes.',
    ar: 'توفر هاوس بلس خدمات شاملة للشركات: تصنيع OEM وملصقات تجارية خاصة ولوجستيات التصدير والامتثال للسوق ودعم تقني متخصص بعد البيع لمشتري الجملة حول العالم.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles['en'],
    description: descriptions[lang] || descriptions['en'],
    keywords: ['OEM', 'ODM', 'private label', 'custom manufacturing', 'technical support', 'wholesale services', 'HousePlus'],
    url: `/${lang}/service`,
    lang: lang as any,
    type: 'website',
  });
}

type Lang = 'en' | 'es' | 'de' | 'fr' | 'ar';

type Copy = {
  badge: string;
  heroTitle: string;
  hero: { p1a: string; p1b: string; p1c: string; p1d: string };
  stats: { sample: string; production: string; warranty: string };
  services: Array<{ icon: string; title: string; desc: string; points: string[] }>;
  processTitle: string;
  processSubtext: { a: string; b: string };
  process: Array<{ step: string; title: string; desc: string }>;
  why: { title: string; items: Array<{ title: string; desc: string }> };
  imageAlt: string;
  imageTitle: string;
  ctaTitle: string;
  ctaText: { a: string; b: string; c: string };
  ctaQuote: string;
  ctaBrowse: string;
};

const copy: Record<Lang, Copy> = {
  en: {
    badge: '🏭 HousePlus End-to-End B2B Services',
    heroTitle: '🏭 HousePlus Services Built for Wholesale Buyers',
    hero: {
      p1a: 'From OEM manufacturing and private-label branding to logistics coordination and after-sales support — ',
      p1b: ' provides a complete service ecosystem for global wholesale partners. ',
      p1c: 'Choose ',
      p1d: ' for professional, reliable services.',
    },
    stats: {
      sample: 'Sample Lead Time',
      production: 'Production Lead Time',
      warranty: 'Product Warranty',
    },
    services: [
      {
        icon: '🏭',
        title: 'OEM Manufacturing',
        desc: 'Supply us with your product specifications, drawings or samples and we manufacture to your exact requirements. Our engineering team handles DFM review, tooling, prototyping and mass production.',
        points: [
          'Custom specifications & drawings accepted',
          'Tooling and mould development',
          'Prototype samples within 15–20 days',
          'Mass production from MOQ 100 pcs',
        ],
      },
      {
        icon: '🎨',
        title: 'ODM & Private Label',
        desc: 'Choose from our existing product portfolio and apply your own brand identity. We handle custom logo printing, colour variants, packaging design and compliance labelling for your target market.',
        points: [
          'Custom logo and colour options',
          'Private-label packaging design',
          'Retail-ready barcodes and labels',
          'Market-specific compliance marking',
        ],
      },
      {
        icon: '📦',
        title: 'Custom Packaging',
        desc: 'From retail gift boxes to bulk export cartons, our packaging team designs and produces solutions that protect your products and reinforce your brand at the point of sale.',
        points: [
          'Retail box, colour box, gift box',
          'Bulk carton and pallet configuration',
          'Insert cards, user manuals, accessories',
          'Eco-friendly packaging options',
        ],
      },
      {
        icon: '🔧',
        title: 'Technical Support',
        desc: 'Our after-sales team provides multi-channel technical assistance throughout the product lifecycle — from pre-shipment testing to in-market troubleshooting.',
        points: [
          'Pre-shipment inspection reports',
          'CE/FCC/RoHS certification support',
          'Warranty claim processing',
          'Dedicated account manager',
        ],
      },
      {
        icon: '🚢',
        title: 'Logistics & Export',
        desc: 'We coordinate end-to-end export logistics including customs documentation, freight forwarding and delivery tracking — available on FOB, CIF and DDP terms.',
        points: [
          'FOB, CIF, DDP trade terms',
          'Sea, air and express courier options',
          'Full export documentation',
          'Real-time shipment tracking',
        ],
      },
      {
        icon: '🌍',
        title: 'Market Compliance',
        desc: 'We support clients in navigating regulatory requirements for key markets. Our compliance team prepares technical files and liaises with accredited third-party laboratories.',
        points: [
          'CE marking (EU)',
          'FCC authorisation (USA)',
          'RoHS and REACH compliance',
          'SASO and GCC certifications',
        ],
      },
    ],
    processTitle: '🏭 How We Work Together with HousePlus',
    processSubtext: { a: 'A straightforward, transparent ', b: ' process from first enquiry to final delivery.' },
    process: [
      { step: '01', title: 'Enquiry & Brief', desc: 'Share your product requirements, target market, MOQ and timeline. We respond with a preliminary quotation within 24 hours.' },
      { step: '02', title: 'Sample Development', desc: 'Our engineering team develops a prototype or pre-production sample for your approval. Typical lead time: 15–20 working days.' },
      { step: '03', title: 'Order Confirmation', desc: 'Once the sample is approved, we issue a proforma invoice and production schedule. A 30% deposit confirms the order.' },
      { step: '04', title: 'Production & QC', desc: 'Mass production begins with IPQC checkpoints at every stage. A pre-shipment inspection report is issued before goods leave the factory.' },
      { step: '05', title: 'Shipment & Delivery', desc: 'We arrange freight forwarding, prepare all export documents and provide tracking information until goods arrive at your destination.' },
      { step: '06', title: 'After-Sales Support', desc: 'Your dedicated account manager remains available for warranty claims, reorders and any technical queries throughout the product lifecycle.' },
    ],
    why: {
      title: '🏭 Why Buyers Choose HousePlus Services',
      items: [
        { title: 'Single-Source Convenience', desc: 'Solar, appliances and electronics — one supplier, one relationship, one standard.' },
        { title: 'Transparent Pricing', desc: 'Itemised quotations with no hidden fees. Volume discounts available for orders above 500 units.' },
        { title: 'Fast Turnaround', desc: 'Standard orders ship within 20–35 days. Expedited production available for urgent requirements.' },
        { title: 'Certification Ready', desc: 'All products ship with the certifications your market requires — CE, FCC, RoHS, ISO 9001.' },
      ],
    },
    imageAlt: 'HousePlus team collaboration',
    imageTitle: 'HousePlus team collaboration',
    ctaTitle: '🏭 Ready to Start Your HousePlus Project?',
    ctaText: {
      a: 'Tell the ',
      b: ' team about your product requirements and we will prepare a tailored quotation within 24 hours. Partner with ',
      c: ' for professional manufacturing solutions.',
    },
    ctaQuote: 'Request a Quote',
    ctaBrowse: 'Browse Products',
  },
  es: {
    badge: '🏭 Servicios B2B integrales de HousePlus',
    heroTitle: '🏭 Servicios de HousePlus pensados para compradores mayoristas',
    hero: {
      p1a: 'Desde la fabricación OEM y el desarrollo de marca privada hasta la coordinación logística y el soporte postventa — ',
      p1b: ' ofrece un ecosistema de servicios completo para socios mayoristas globales. ',
      p1c: 'Elija ',
      p1d: ' para servicios profesionales y confiables.',
    },
    stats: {
      sample: 'Plazo de muestra',
      production: 'Plazo de producción',
      warranty: 'Garantía del producto',
    },
    services: [
      {
        icon: '🏭',
        title: 'Fabricación OEM',
        desc: 'Envíenos sus especificaciones, planos o muestras y fabricamos exactamente según sus requisitos. Nuestro equipo de ingeniería realiza la revisión DFM, utillaje, prototipos y producción en serie.',
        points: [
          'Se aceptan especificaciones y planos a medida',
          'Desarrollo de utillajes y moldes',
          'Muestras prototipo en 15–20 days',
          'Producción en masa desde MOQ 100 pcs',
        ],
      },
      {
        icon: '🎨',
        title: 'ODM y Marca Privada',
        desc: 'Elija de nuestro portafolio existente y aplique su identidad de marca. Gestionamos impresión de logotipo, variantes de color, diseño de empaques y etiquetado de conformidad para su mercado objetivo.',
        points: [
          'Opciones de logotipo y color personalizados',
          'Diseño de empaques para marca privada',
          'Códigos de barras y etiquetas listos para retail',
          'Marcado de conformidad específico por mercado',
        ],
      },
      {
        icon: '📦',
        title: 'Empaque Personalizado',
        desc: 'Desde cajas de regalo para retail hasta cajas de exportación a granel, nuestro equipo diseña y produce soluciones que protegen sus productos y refuerzan su marca en el punto de venta.',
        points: [
          'Caja retail, caja a color, caja de regalo',
          'Cartón a granel y configuración de palet',
          'Tarjetas insertas, manuales de usuario, accesorios',
          'Opciones de empaque ecológicas',
        ],
      },
      {
        icon: '🔧',
        title: 'Soporte Técnico',
        desc: 'Nuestro equipo postventa brinda asistencia técnica multicanal durante todo el ciclo de vida del producto — desde pruebas previas al envío hasta resolución de problemas en el mercado.',
        points: [
          'Informes de inspección pre‑embarque',
          'Soporte de certificación CE/FCC/RoHS',
          'Gestión de reclamaciones de garantía',
          'Ejecutivo de cuenta dedicado',
        ],
      },
      {
        icon: '🚢',
        title: 'Logística y Exportación',
        desc: 'Coordinamos la logística de exportación de extremo a extremo, incluidos documentos aduaneros, transporte y seguimiento — disponible en términos FOB, CIF y DDP.',
        points: [
          'Términos comerciales FOB, CIF, DDP',
          'Opciones marítico, aéreo y mensajería exprés',
          'Documentación completa de exportación',
          'Seguimiento de envío en tiempo real',
        ],
      },
      {
        icon: '🌍',
        title: 'Conformidad de Mercado',
        desc: 'Ayudamos a los clientes a navegar los requisitos regulatorios de mercados clave. Nuestro equipo prepara expedientes técnicos y coordina con laboratorios acreditados de terceros.',
        points: [
          'Marcado CE (UE)',
          'Autorización FCC (USA)',
          'Cumplimiento RoHS y REACH',
          'Certificaciones SASO y GCC',
        ],
      },
    ],
    processTitle: '🏭 Cómo trabajamos junto a HousePlus',
    processSubtext: { a: 'Un proceso ', b: ' claro y transparente, desde la primera consulta hasta la entrega final.' },
    process: [
      { step: '01', title: 'Consulta y briefing', desc: 'Comparta requisitos de producto, mercado objetivo, MOQ y cronograma. Respondemos con una cotización preliminar en 24 horas.' },
      { step: '02', title: 'Desarrollo de muestra', desc: 'Nuestro equipo de ingeniería desarrolla un prototipo o muestra de preproducción para su aprobación. Plazo típico: 15–20 working days.' },
      { step: '03', title: 'Confirmación de pedido', desc: 'Una vez aprobada la muestra, emitimos proforma y cronograma de producción. Un depósito del 30% confirma el pedido.' },
      { step: '04', title: 'Producción y QC', desc: 'La producción en masa comienza con puntos de control IPQC en cada etapa. Se emite un informe de inspección previo al envío antes de salir de fábrica.' },
      { step: '05', title: 'Embarque y entrega', desc: 'Organizamos el transporte, preparamos todos los documentos de exportación y proporcionamos tracking hasta su destino.' },
      { step: '06', title: 'Soporte postventa', desc: 'Su ejecutivo de cuenta dedicado está disponible para garantías, reordenes y consultas técnicas durante todo el ciclo de vida del producto.' },
    ],
    why: {
      title: '🏭 Por qué los compradores eligen los servicios de HousePlus',
      items: [
        { title: 'Comodidad de una sola fuente', desc: 'Solar, electrodomésticos y electrónica — un proveedor, una relación, un estándar.' },
        { title: 'Precios transparentes', desc: 'Cotizaciones desglosadas sin cargos ocultos. Descuentos por volumen disponibles para pedidos superiores a 500 unidades.' },
        { title: 'Rápida respuesta', desc: 'Los pedidos estándar se envían dentro de 20–35 days. Producción expedita disponible para requisitos urgentes.' },
        { title: 'Listo para certificación', desc: 'Todos los productos se envían con las certificaciones que su mercado requiere — CE, FCC, RoHS, ISO 9001.' },
      ],
    },
    imageAlt: 'Colaboración del equipo de HousePlus',
    imageTitle: 'Colaboración del equipo de HousePlus',
    ctaTitle: '🏭 ¿Listo para iniciar su proyecto con HousePlus?',
    ctaText: {
      a: 'Cuéntenos a ',
      b: ' su equipo sus requisitos de producto y prepararemos una cotización a medida en 24 horas. Asóciese con ',
      c: ' para soluciones de fabricación profesionales.',
    },
    ctaQuote: 'Solicitar cotización',
    ctaBrowse: 'Explorar productos',
  },
  de: {
    badge: '🏭 End-to-End-B2B-Services von HousePlus',
    heroTitle: '🏭 HousePlus Services für Großhandelskunden',
    hero: {
      p1a: 'Von OEM-Fertigung und Private-Label-Branding bis zur Logistikkoordination und After-Sales-Betreuung — ',
      p1b: ' bietet ein vollständiges Service-Ökosystem für globale Großhandelspartner. ',
      p1c: 'Wählen Sie ',
      p1d: ' für professionelle und verlässliche Services.',
    },
    stats: {
      sample: 'Muster-Durchlaufzeit',
      production: 'Produktionsdurchlaufzeit',
      warranty: 'Produktgarantie',
    },
    services: [
      {
        icon: '🏭',
        title: 'OEM-Fertigung',
        desc: 'Übermitteln Sie Spezifikationen, Zeichnungen oder Muster und wir fertigen exakt nach Ihren Vorgaben. Unser Engineering-Team übernimmt DFM-Prüfung, Werkzeugbau, Prototyping und Serienfertigung.',
        points: [
          'Individuelle Spezifikationen & Zeichnungen möglich',
          'Werkzeug- und Formenentwicklung',
          'Prototypenmuster innerhalb von 15–20 days',
          'Serienfertigung ab MOQ 100 pcs',
        ],
      },
      {
        icon: '🎨',
        title: 'ODM & Private Label',
        desc: 'Wählen Sie aus unserem bestehenden Portfolio und setzen Sie Ihre Markenidentität um. Wir übernehmen Logodruck, Farbvarianten, Verpackungsdesign und Compliance-Kennzeichnung für Ihren Zielmarkt.',
        points: [
          'Individuelle Logo- und Farboptionen',
          'Verpackungsdesign für Private Label',
          'Einzelhandelsfertige Barcodes und Etiketten',
          'Marktspezifische Compliance-Kennzeichnung',
        ],
      },
      {
        icon: '📦',
        title: 'Individuelle Verpackungen',
        desc: 'Von Geschenkboxen für den Handel bis zu Exportkartons in Großmengen – wir entwickeln Lösungen, die Produkte schützen und Ihre Marke am POS stärken.',
        points: [
          'Retail-Box, Farbbox, Geschenkbox',
          'Großkarton und Palettenkonfiguration',
          'Einleger, Bedienungsanleitungen, Zubehör',
          'Umweltfreundliche Verpackungsoptionen',
        ],
      },
      {
        icon: '🔧',
        title: 'Technischer Support',
        desc: 'Unser After-Sales-Team bietet technischen Support über den gesamten Produktlebenszyklus – von Vorversandtests bis zur Fehlersuche im Markt.',
        points: [
          'Vorversand-Inspektionsberichte',
          'Unterstützung für CE/FCC/RoHS-Zertifizierung',
          'Abwicklung von Garantieansprüchen',
          'Persönlicher Account Manager',
        ],
      },
      {
        icon: '🚢',
        title: 'Logistik & Export',
        desc: 'Wir koordinieren die Exportlogistik End‑to‑End inklusive Zolldokumenten, Spedition und Sendungsverfolgung — verfügbar zu FOB, CIF und DDP.',
        points: [
          'Handelskonditionen FOB, CIF, DDP',
          'See-, Luft- und Expresskurier-Optionen',
          'Vollständige Exportdokumentation',
          'Sendungsverfolgung in Echtzeit',
        ],
      },
      {
        icon: '🌍',
        title: 'Marktkonformität',
        desc: 'Wir unterstützen bei regulatorischen Anforderungen in Schlüsselmärkten. Das Team erstellt technische Dossiers und koordiniert mit akkreditierten Prüflaboren.',
        points: [
          'CE-Kennzeichnung (EU)',
          'FCC-Genehmigung (USA)',
          'RoHS- und REACH-Compliance',
          'SASO- und GCC-Zertifizierungen',
        ],
      },
    ],
    processTitle: '🏭 So arbeiten wir mit HousePlus zusammen',
    processSubtext: { a: 'Ein einfacher, transparenter ', b: ' Prozess vom ersten Anfrageeingang bis zur finalen Lieferung.' },
    process: [
      { step: '01', title: 'Anfrage & Briefing', desc: 'Teilen Sie Anforderungen, Zielmarkt, MOQ und Zeitplan. Wir antworten mit einem Vorabangebot innerhalb von 24 Stunden.' },
      { step: '02', title: 'Musterentwicklung', desc: 'Unser Engineering-Team entwickelt einen Prototyp oder ein Vorserienmuster zur Freigabe. Typische Durchlaufzeit: 15–20 working days.' },
      { step: '03', title: 'Auftragsbestätigung', desc: 'Nach Musterfreigabe erhalten Sie Proforma-Rechnung und Produktionsplan. Eine Anzahlung von 30% bestätigt den Auftrag.' },
      { step: '04', title: 'Produktion & QC', desc: 'Serienfertigung mit IPQC‑Kontrollpunkten in jeder Phase. Vor dem Versand erhalten Sie einen Vorversand‑Inspektionsbericht.' },
      { step: '05', title: 'Versand & Lieferung', desc: 'Wir organisieren Spedition, erstellen alle Exportdokumente und liefern Tracking‑Informationen bis zur Ankunft.' },
      { step: '06', title: 'After-Sales-Support', desc: 'Ihr persönlicher Account Manager steht für Garantieabwicklung, Nachbestellungen und technische Fragen bereit.' },
    ],
    why: {
      title: '🏭 Warum sich Käufer für HousePlus Services entscheiden',
      items: [
        { title: 'Alles aus einer Hand', desc: 'Solar, Haushaltsgeräte und Elektronik — ein Lieferant, eine Beziehung, ein Standard.' },
        { title: 'Transparente Preise', desc: 'Aufgeschlüsselte Angebote ohne versteckte Gebühren. Mengenrabatte für Bestellungen über 500 Stück.' },
        { title: 'Schnelle Abwicklung', desc: 'Standardaufträge versenden innerhalb von 20–35 days. Beschleunigte Produktion für dringende Anforderungen verfügbar.' },
        { title: 'Zertifizierungsbereit', desc: 'Alle Produkte werden mit den für Ihren Markt erforderlichen Zertifizierungen ausgeliefert — CE, FCC, RoHS, ISO 9001.' },
      ],
    },
    imageAlt: 'HousePlus Team-Kollaboration',
    imageTitle: 'HousePlus Team-Kollaboration',
    ctaTitle: '🏭 Bereit, Ihr HousePlus Projekt zu starten?',
    ctaText: {
      a: 'Teilen Sie dem ',
      b: ' Team Ihre Produktanforderungen mit, und wir erstellen innerhalb von 24 Stunden ein maßgeschneidertes Angebot. Arbeiten Sie mit ',
      c: ' für professionelle Fertigungslösungen zusammen.',
    },
    ctaQuote: 'Angebot anfordern',
    ctaBrowse: 'Produkte ansehen',
  },
  fr: {
    badge: '🏭 Services B2B de bout en bout HousePlus',
    heroTitle: '🏭 Des services HousePlus conçus pour les acheteurs grossistes',
    hero: {
      p1a: 'De la fabrication OEM et du branding en marque privée à la coordination logistique et au support après‑vente — ',
      p1b: ' offre un écosystème de services complet pour les partenaires grossistes mondiaux. ',
      p1c: 'Choisissez ',
      p1d: ' pour des services professionnels et fiables.',
    },
    stats: {
      sample: 'Délai échantillon',
      production: 'Délai de production',
      warranty: 'Garantie produit',
    },
    services: [
      {
        icon: '🏭',
        title: 'Fabrication OEM',
        desc: 'Fournissez spécifications, plans ou échantillons et nous fabriquons selon vos exigences. Notre équipe d’ingénierie gère la revue DFM, l’outillage, le prototypage et la production de masse.',
        points: [
          'Spécifications et plans sur mesure acceptés',
          'Développement d’outillages et de moules',
          'Échantillons prototype sous 15–20 days',
          'Production de masse à partir de MOQ 100 pcs',
        ],
      },
      {
        icon: '🎨',
        title: 'ODM & Marque Privée',
        desc: 'Choisissez dans notre portefeuille existant et appliquez votre identité de marque. Nous gérons impression de logo, variantes de couleur, design d’emballage et étiquetage de conformité pour votre marché cible.',
        points: [
          'Options de logo et de couleur personnalisées',
          'Design d’emballage pour marque privée',
          'Codes-barres et étiquettes prêts pour le retail',
          'Marquage de conformité spécifique au marché',
        ],
      },
      {
        icon: '📦',
        title: 'Emballages personnalisés',
        desc: 'Des boîtes cadeaux retail aux cartons d’exportation en vrac, nous concevons et produisons des solutions qui protègent vos produits et renforcent votre marque au point de vente.',
        points: [
          'Boîte retail, boîte couleur, boîte cadeau',
          'Carton vrac et configuration palette',
          'Cartes d’insertion, manuels utilisateur, accessoires',
          'Options d’emballage écoresponsables',
        ],
      },
      {
        icon: '🔧',
        title: 'Support technique',
        desc: 'Notre équipe après‑vente apporte une assistance technique multicanale tout au long du cycle de vie — des tests pré‑expédition au dépannage sur le marché.',
        points: [
          'Rapports d’inspection pré‑expédition',
          'Support de certification CE/FCC/RoHS',
          'Traitement des réclamations de garantie',
          'Gestionnaire de compte dédié',
        ],
      },
      {
        icon: '🚢',
        title: 'Logistique & Export',
        desc: 'Nous coordonnons la logistique d’exportation de bout en bout, y compris la douane, le transit et le suivi — disponible selon les termes FOB, CIF et DDP.',
        points: [
          'Termes commerciaux FOB, CIF, DDP',
          'Options maritime, aérien et coursier express',
          'Documentation d’exportation complète',
          'Suivi d’expédition en temps réel',
        ],
      },
      {
        icon: '🌍',
        title: 'Conformité marché',
        desc: 'Nous aidons à naviguer les exigences réglementaires des marchés clés. L’équipe prépare les dossiers techniques et travaille avec des laboratoires tiers accrédités.',
        points: [
          'Marquage CE (UE)',
          'Autorisation FCC (USA)',
          'Conformité RoHS et REACH',
          'Certifications SASO et GCC',
        ],
      },
    ],
    processTitle: '🏭 Notre façon de collaborer avec HousePlus',
    processSubtext: { a: 'Un processus ', b: ' simple et transparent, de la première demande à la livraison finale.' },
    process: [
      { step: '01', title: 'Demande & cahier des charges', desc: 'Partagez exigences produit, marché cible, MOQ et calendrier. Réponse avec devis préliminaire sous 24 heures.' },
      { step: '02', title: 'Développement d’échantillon', desc: 'Notre équipe élabore un prototype ou un échantillon de pré‑série pour approbation. Délai typique : 15–20 working days.' },
      { step: '03', title: 'Confirmation de commande', desc: 'Après approbation de l’échantillon, nous émettons proforma et planning de production. Un acompte de 30% confirme la commande.' },
      { step: '04', title: 'Production & QC', desc: 'Démarrage de la production avec contrôles IPQC à chaque étape. Un rapport d’inspection pré‑expédition est émis avant départ usine.' },
      { step: '05', title: 'Expédition & livraison', desc: 'Organisation du transport, préparation de tous les documents d’exportation et fourniture du suivi jusqu’à destination.' },
      { step: '06', title: 'Support après‑vente', desc: 'Votre gestionnaire de compte reste disponible pour garanties, réassorts et questions techniques tout au long du cycle de vie.' },
    ],
    why: {
      title: '🏭 Pourquoi les acheteurs choisissent les services HousePlus',
      items: [
        { title: 'Guichet unique', desc: 'Solaire, électroménager et électronique — un fournisseur, une relation, une norme.' },
        { title: 'Tarification transparente', desc: 'Devis détaillés sans frais cachés. Remises de volume pour commandes supérieures à 500 unités.' },
        { title: 'Délai rapide', desc: 'Les commandes standard expédient sous 20–35 days. Production accélérée disponible pour les besoins urgents.' },
        { title: 'Prêts pour la certification', desc: 'Tous les produits sont livrés avec les certifications requises par votre marché — CE, FCC, RoHS, ISO 9001.' },
      ],
    },
    imageAlt: 'Collaboration de l’équipe HousePlus',
    imageTitle: 'Collaboration de l’équipe HousePlus',
    ctaTitle: '🏭 Prêt à lancer votre projet HousePlus ?',
    ctaText: {
      a: 'Présentez à l’équipe de ',
      b: ' vos exigences produit et nous préparerons un devis sur mesure sous 24 heures. Collaborez avec ',
      c: ' pour des solutions de fabrication professionnelles.',
    },
    ctaQuote: 'Demander un devis',
    ctaBrowse: 'Parcourir les produits',
  },
  ar: {
    badge: '🏭 خدمات B2B متكاملة من HousePlus',
    heroTitle: '🏭 خدمات HousePlus المخصّصة للمشترين بالجملة',
    hero: {
      p1a: 'من التصنيع بنظام OEM وبناء العلامة الخاصة إلى تنسيق اللوجستيات ودعم ما بعد البيع — ',
      p1b: ' توفّر منظومة خدمات متكاملة لشركاء الجملة حول العالم. ',
      p1c: 'اختر ',
      p1d: ' للحصول على خدمات احترافية وموثوقة.',
    },
    stats: {
      sample: 'مهلة العينة',
      production: 'مهلة الإنتاج',
      warranty: 'ضمان المنتج',
    },
    services: [
      {
        icon: '🏭',
        title: 'تصنيع OEM',
        desc: 'زوّدنا بالمواصفات أو الرسومات أو العينات وسنصنّع وفق متطلباتك الدقيقة. يتولى فريق الهندسة مراجعة DFM والأدوات والنمذجة الأولية والإنتاج الكمي.',
        points: [
          'قبول المواصفات والرسومات المخصّصة',
          'تطوير الأدوات والقوالب',
          'عينات أولية خلال 15–20 days',
          'إنتاج كمي ابتداءً من MOQ 100 pcs',
        ],
      },
      {
        icon: '🎨',
        title: 'ODM وعلامة خاصة',
        desc: 'اختر من محفظتنا الحالية وطبّق هوية علامتك. نتولى طباعة الشعار، خيارات الألوان، تصميم التغليف ووضع علامات الامتثال لسوقك المستهدف.',
        points: [
          'خيارات شعار ولون مخصّصة',
          'تصميم تغليف لعلامة خاصة',
          'باركودات وملصقات جاهزة للبيع بالتجزئة',
          'وسم امتثال خاص بكل سوق',
        ],
      },
      {
        icon: '📦',
        title: 'تغليف مخصّص',
        desc: 'من علب الهدايا للبيع بالتجزئة إلى صناديق التصدير بالجملة، نصمّم وننتج حلولاً تحمي منتجاتك وتعزّز علامتك عند نقطة البيع.',
        points: [
          'علبة للبيع بالتجزئة، علبة ملوّنة، علبة هدية',
          'صندوق بالجملة وتكوين منصّات التحميل',
          'بطاقات إدراج، أدلّة مستخدم، ملحقات',
          'خيارات تغليف صديقة للبيئة',
        ],
      },
      {
        icon: '🔧',
        title: 'دعم تقني',
        desc: 'يوفّر فريق ما بعد البيع مساعدة تقنية عبر قنوات متعددة طوال دورة حياة المنتج — من اختبارات ما قبل الشحن إلى معالجة الأعطال في السوق.',
        points: [
          'تقارير فحص قبل الشحن',
          'دعم شهادات CE/FCC/RoHS',
          'معالجة مطالبات الضمان',
          'مدير حساب مخصّص',
        ],
      },
      {
        icon: '🚢',
        title: 'اللوجستيات والتصدير',
        desc: 'ننسّق لوجستيات التصدير من البداية إلى النهاية بما في ذلك مستندات الجمارك والشحن وتتبع التسليم — متاح وفق شروط FOB وCIF وDDP.',
        points: [
          'شروط تجارية FOB, CIF, DDP',
          'خيارات بحري، جوي، وشحن سريع',
          'كامل مستندات التصدير',
          'تتبّع الشحنات في الوقت الفعلي',
        ],
      },
      {
        icon: '🌍',
        title: 'الامتثال للأسواق',
        desc: 'ندعم العملاء في تلبية المتطلبات التنظيمية للأسواق الرئيسية. نُعد الملفات الفنية ونتواصل مع مختبرات طرف ثالث معتمدة.',
        points: [
          'وسم CE (الاتحاد الأوروبي)',
          'اعتماد FCC (USA)',
          'الامتثال لـ RoHS وREACH',
          'شهادات SASO وGCC',
        ],
      },
    ],
    processTitle: '🏭 كيف نعمل معًا مع HousePlus',
    processSubtext: { a: 'عملية ', b: ' واضحة وشفافة — من أول استفسار حتى التسليم النهائي.' },
    process: [
      { step: '01', title: 'استفسار وموجز', desc: 'شارك متطلبات المنتج والسوق المستهدف وMOQ والجدول الزمني. نرد بعرض أولي خلال 24 ساعة.' },
      { step: '02', title: 'تطوير العينة', desc: 'نطوّر نموذجًا أوليًا أو عينة قبل الإنتاج لاعتمادك. زمن التنفيذ المعتاد: 15–20 working days.' },
      { step: '03', title: 'تأكيد الطلب', desc: 'بعد اعتماد العينة نصدر فاتورة أولية وجدول الإنتاج. دفعة مقدّمة 30% تؤكد الطلب.' },
      { step: '04', title: 'الإنتاج وQC', desc: 'نبدأ الإنتاج الكمي مع نقاط تفتيش IPQC في كل مرحلة. نصدر تقرير فحص قبل الشحن قبل مغادرة البضاعة للمصنع.' },
      { step: '05', title: 'الشحن والتسليم', desc: 'نرتّب الشحن، نُعد كل مستندات التصدير ونوفّر معلومات التتبع حتى وصول البضائع إلى وجهتك.' },
      { step: '06', title: 'دعم ما بعد البيع', desc: 'يبقى مدير حسابك المخصّص متاحًا لضمانات وإعادة الطلبات والاستفسارات التقنية طوال دورة حياة المنتج.' },
    ],
    why: {
      title: '🏭 لماذا يختار المشترون خدمات HousePlus',
      items: [
        { title: 'مزود واحد لكل شيء', desc: 'طاقة شمسية، أجهزة منزلية وإلكترونيات — مورد واحد، علاقة واحدة، معيار واحد.' },
        { title: 'تسعير شفاف', desc: 'عروض أسعار مفصلة بدون رسوم خفية. خصومات كمية متاحة للطلبات التي تتجاوز 500 وحدة.' },
        { title: 'تنفيذ سريع', desc: 'الطلبات القياسية تُشحن خلال 20–35 days. إنتاج مُعجّل متاح للمتطلبات العاجلة.' },
        { title: 'جاهزية الشهادات', desc: 'جميع المنتجات تُشحن مع الشهادات المطلوبة لسوقك — CE وFCC وRoHS وISO 9001.' },
      ],
    },
    imageAlt: 'تعاون فريق HousePlus',
    imageTitle: 'تعاون فريق HousePlus',
    ctaTitle: '🏭 هل أنت مستعد لبدء مشروع HousePlus؟',
    ctaText: {
      a: 'أخبر فريق ',
      b: ' بمتطلباتك للمنتج وسنُعد عرض سعر مخصصًا خلال 24 ساعة. شارك ',
      c: ' للحصول على حلول تصنيع احترافية.',
    },
    ctaQuote: 'اطلب عرض سعر',
    ctaBrowse: 'تصفح المنتجات',
  },
};

export default async function ServicePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const activeLang: Lang = (['en', 'es', 'de', 'fr', 'ar'] as Lang[]).includes(lang as Lang) ? (lang as Lang) : 'en';
  const t = copy[activeLang];

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'OEM/ODM manufacturing, private-label branding and technical support services.',
    url: `https://www.houseplus-ch.com/${lang}/service`,
    lang,
    type: 'Organization',
  });

  const oemServiceSchema = generateServiceSchema({
    name: 'OEM Manufacturing Service',
    description: 'Professional OEM manufacturing services from HousePlus. Supply product specifications, drawings or samples and we manufacture to your exact requirements. MOQ from 100 units.',
    url: `https://www.houseplus-ch.com/${lang}/service`,
    serviceType: 'ManufacturingService',
    areaServed: ['Worldwide', 'Africa', 'Southeast Asia', 'Europe'],
    availableChannel: ['Online', 'Phone', 'Email', 'WhatsApp'],
  });

  const odmServiceSchema = generateServiceSchema({
    name: 'ODM & Private Label Service',
    description: 'ODM services with private-label branding. Choose from existing product portfolio and apply your own brand identity with custom logo printing, color variants and packaging design.',
    url: `https://www.houseplus-ch.com/${lang}/service`,
    serviceType: 'DesignService',
    areaServed: ['Worldwide', 'Africa', 'Southeast Asia', 'Europe'],
    availableChannel: ['Online', 'Phone', 'Email', 'WhatsApp'],
  });

  const services = t.services;

  const process = t.process;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://www.houseplus-ch.com/${lang}` },
    { name: 'Services', url: `https://www.houseplus-ch.com/${lang}/service` },
  ]);

  return (
    <>
      <SEOHead schemas={[organizationSchema, oemServiceSchema, odmServiceSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} slug="service" />

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-5">
              {t.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-5 tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.hero.p1a}
              <strong>HousePlus</strong>
              {t.hero.p1b}
              {t.hero.p1c}
              <strong>HousePlus</strong>
              {t.hero.p1d}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-xl border border-blue-200 text-center">
                <div className="text-2xl font-black text-blue-600">15–20 days</div>
                <div className="text-sm text-slate-600">{t.stats.sample}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200 text-center">
                <div className="text-2xl font-black text-blue-600">20–35 days</div>
                <div className="text-sm text-slate-600">{t.stats.production}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200 text-center">
                <div className="text-2xl font-black text-blue-600">12 months</div>
                <div className="text-sm text-slate-600">{t.stats.warranty}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Cards */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.title} className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:border-blue-200 transition-all">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-blue-500 font-bold flex-shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{t.processTitle}</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                {t.processSubtext.a}
                <strong>HousePlus</strong>
                {t.processSubtext.b}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {process.map((s) => (
                <div key={s.step} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="text-3xl font-black text-blue-200 mb-3">{s.step}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why HousePlus */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">{t.why.title}</h2>
                <div className="space-y-4">
                  {t.why.items.map((item) => (
                    <div key={item.title} className="flex gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                        <p className="text-slate-600 text-sm mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="https://images.houseplus-ch.com/media/houseplus-site-service-technical-consultation/"
                  alt={t.imageAlt}
                  title={t.imageTitle}
                  className="object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">{t.ctaTitle}</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              {t.ctaText.a}
              <strong>HousePlus</strong>
              {t.ctaText.b}
              <strong>HousePlus</strong>
              {t.ctaText.c}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5">
                {t.ctaQuote}
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-700 text-white border border-blue-500 font-bold rounded-xl hover:bg-blue-800 transition-all hover:-translate-y-0.5">
                {t.ctaBrowse}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}