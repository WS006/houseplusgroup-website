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
    en: 'OEM/ODM Manufacturing — Private Label from HousePlus',
    es: 'Fabricación OEM/ODM — Marca Privada con HousePlus',
    de: 'OEM/ODM Fertigung — Private Label von HousePlus',
    fr: 'Fabrication OEM/ODM — Marque Privée par HousePlus',
    ar: 'تصنيع OEM/ODM — العلامات الخاصة من هاوس بلس',
  };

  const descriptions: Record<string, string> = {
    en: 'HousePlus OEM/ODM services: custom manufacturing, private label branding, bespoke packaging and mould development. MOQ from 100 pcs with 20–35 day lead time. Solar, appliances and electronics.',
    es: 'Servicios OEM/ODM de HousePlus: fabricación a medida, marca privada, empaque personalizado y desarrollo de moldes. MOQ desde 100 unidades, entrega en 20–35 días.',
    de: 'HousePlus OEM/ODM Services: Maßanfertigung, Private Label, individuelle Verpackung und Formenentwicklung. MOQ ab 100 Stück, 20–35 Tage Lieferzeit für Solar, Geräte und Elektronik.',
    fr: 'Services OEM/ODM HousePlus : fabrication sur mesure, marque privée, emballage personnalisé et développement de moules. MOQ à partir de 100 pièces, délai 20–35 jours.',
    ar: 'خدمات OEM/ODM من هاوس بلس: تصنيع مخصص وملصقات تجارية خاصة وتعبئة حسب الطلب وتطوير القوالب. الحد الأدنى للطلب ١٠٠ قطعة مع فترة تسليم ٢٠-٣٥ يوماً.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles['en'],
    description: descriptions[lang] || descriptions['en'],
    keywords: ['OEM', 'ODM', 'private label', 'custom manufacturing', 'MOQ 100', 'HousePlus OEM', 'wholesale customization', 'Pantone color', 'custom packaging', 'mould development'],
    url: `/${lang}/oem-odm`,
    lang: lang as any,
    type: 'website',
  });
}

type Copy = {
  badges: string[];
  hero: { title: string; descParts: [string, string] };
  services: { title: string; desc: string; points: string[] }[];
  process: { sectionTitle: string; sectionSubtitle: string; steps: { step: string; title: string; desc: string }[] };
  moq: {
    sectionTitle: string;
    sectionSubtitleParts: [string, string];
    tableHeaders: { tier: string; discount: string; products: string; sampleLead: string };
    rows: { tier: string; discount: string; products: string; sampleLead: string }[];
  };
  customization: {
    leftTitle: string;
    items: { title: string; desc: string }[];
    rightTitle: string;
    timeline: { stage: string; time: string; note: string }[];
  };
  cta: { title: string; descParts: [string, string]; buttonQuote: string; buttonBrowse: string };
};

const copy: Record<string, Copy> = {
  en: {
    badges: ['MOQ from 100 pcs', '20–35 Day Lead Time', '12-Month Warranty'],
    hero: {
      title: 'OEM/ODM Manufacturing — Private Label & Custom Products from HousePlus',
      descParts: [
        '',
        ' OEM/ODM services cover solar energy systems, home appliances and 3C electronics. MOQ from 100 pcs with 20–35 day lead time from a 20,000 m² ISO 9001 factory serving 441+ wholesale clients across 53+ countries since 2010. Custom packaging, Pantone colours and mould development — all under one roof.',
      ],
    },
    services: [
      {
        title: 'OEM Manufacturing Process',
        desc: 'Submit product samples, drawings or technical specifications. HousePlus engineering reviews DFM feasibility, develops tooling and delivers prototypes within 20 days.',
        points: [
          'Sample replication or drawing-based development',
          'In-house tooling and mould workshop',
          'Prototype validation with 3 revisions included',
          'Mass production from MOQ 100 pcs',
        ],
      },
      {
        title: 'ODM Private Label Service',
        desc: 'Choose from 200+ existing HousePlus models. Apply your logo, custom Pantone colours, retail packaging and market-specific compliance labelling.',
        points: [
          '200+ ready-to-brand product models',
          'Logo silk-screen, UV print or laser engraving',
          'Pantone colour matching for body and accessories',
          'Retail packaging with your brand identity',
        ],
      },
      {
        title: 'Custom Packaging Solutions',
        desc: 'HousePlus packaging team designs retail boxes, gift sets and bulk cartons. Artwork proofs are provided within 48 hours of design confirmation.',
        points: [
          'Retail box, colour box, blister pack',
          'User manual and insert card design',
          'Barcode and compliance label printing',
          'Eco-friendly Kraft and corrugated options',
        ],
      },
      {
        title: 'Mould Development & Modification',
        desc: 'Client-funded tooling remains your property. HousePlus stores moulds securely and maintains them free of charge for 3 years. Engineering change orders quoted within 72 hours.',
        points: [
          'Voltage and plug configuration changes',
          'Firmware language localisation',
          'Accessory bundle customisation',
          'Regional compliance marking update',
        ],
      },
    ],
    process: {
      sectionTitle: 'HousePlus Custom Manufacturing Process',
      sectionSubtitle: 'A transparent 6-step workflow from first enquiry to after-sales support.',
      steps: [
        {
          step: '01',
          title: 'Enquiry & DFM Review',
          desc: 'Share samples, drawings or selected model numbers. HousePlus engineers assess feasibility and provide quotation within 24 hours.',
        },
        {
          step: '02',
          title: 'Sample Development',
          desc: 'Prototype or pre-production sample is manufactured. Typical lead time: 15–20 days for ODM, 20–25 days for OEM with new tooling.',
        },
        {
          step: '03',
          title: 'Sample Approval',
          desc: 'Client evaluates sample and requests up to 3 revisions at no charge. Final sign-off triggers production order confirmation.',
        },
        {
          step: '04',
          title: 'Order & Deposit',
          desc: 'Proforma invoice issued with production schedule. 30% deposit confirms order entry into HousePlus ERP system.',
        },
        {
          step: '05',
          title: 'Production & QC',
          desc: 'Mass production with IPQC at 4 checkpoints. Pre-shipment inspection report and photos are shared before dispatch.',
        },
        {
          step: '06',
          title: 'Shipment & Support',
          desc: 'Balance payment triggers shipment. HousePlus provides 12-month warranty, spare parts support and dedicated account management.',
        },
      ],
    },
    moq: {
      sectionTitle: 'MOQ Gradients & Volume Discounts',
      sectionSubtitleParts: ['Minimum order quantities and corresponding discounts for ', ' OEM and ODM services.'],
      tableHeaders: {
        tier: 'MOQ Tier',
        discount: 'Volume Discount',
        products: 'Typical Products',
        sampleLead: 'Sample Lead Time',
      },
      rows: [
        { tier: '100 pcs', discount: 'Standard MOQ', products: '3C electronics, LED lighting, small appliances', sampleLead: '15–20 days' },
        { tier: '200 pcs', discount: '3% volume discount', products: 'Home appliances, solar accessories, power banks', sampleLead: '18–22 days' },
        { tier: '500 pcs', discount: '5% volume discount', products: 'Solar panels, inverters, portable power stations', sampleLead: '20–25 days' },
        { tier: '1000+ pcs', discount: '7–10% volume discount', products: 'Full product lines, mixed container loads', sampleLead: '20–25 days' },
      ],
    },
    customization: {
      leftTitle: 'What You Can Customise with HousePlus',
      items: [
        {
          title: 'Product Colour & Finish',
          desc: 'Match any Pantone code for body shell, buttons and accessories. Matte, gloss and metallic finishes available.',
        },
        {
          title: 'Logo & Branding',
          desc: 'Silk-screen, UV print, laser engraving or embossed logo on product body, packaging and accessories.',
        },
        {
          title: 'Custom Packaging',
          desc: 'Retail gift boxes, colour boxes, blister packs and bulk cartons with your brand artwork and barcode labels.',
        },
        {
          title: 'User Manual & Inserts',
          desc: 'Multi-language user manuals, warranty cards and insert cards designed to your brand guidelines.',
        },
        {
          title: 'Voltage & Plug Types',
          desc: '110V/220V/240V configurations with US, EU, UK, AU and universal plug options.',
        },
        {
          title: 'Firmware & Language',
          desc: 'Custom boot logo, localised UI language and feature-set adjustments for regional requirements.',
        },
      ],
      rightTitle: 'Sample & Production Timeline',
      timeline: [
        { stage: 'ODM Sample', time: '15–20 days', note: 'Based on existing model with logo/colour changes' },
        { stage: 'OEM Sample (existing tooling)', time: '18–22 days', note: 'Using client-supplied drawings or samples' },
        { stage: 'OEM Sample (new tooling)', time: '20–25 days', note: 'Includes mould design and first article inspection' },
        { stage: 'Mass Production (standard)', time: '20–35 days', note: 'After sample approval and 30% deposit receipt' },
        { stage: 'Mass Production (large volume)', time: '35–45 days', note: 'Orders above 5,000 pcs or mixed containers' },
      ],
    },
    cta: {
      title: 'Start Your HousePlus OEM/ODM Project',
      descParts: ['Tell ', ' about your product requirements and we will prepare a tailored quotation with sample timeline within 24 hours.'],
      buttonQuote: 'Request OEM/ODM Quote',
      buttonBrowse: 'Browse ODM Catalogue',
    },
  },
  es: {
    badges: ['MOQ desde 100 unidades', 'Plazo de 20–35 días', 'Garantía de 12 meses'],
    hero: {
      title: 'Fabricación OEM/ODM — Marca privada y productos personalizados de HousePlus',
      descParts: [
        'Los servicios OEM/ODM de ',
        ' cubren sistemas de energía solar, electrodomésticos y electrónica 3C. MOQ desde 100 pcs con plazo de 20–35 días desde una fábrica ISO 9001 de 20,000 m² que atiende a 441+ clientes mayoristas en 53+ países desde 2010. Empaque personalizado, colores Pantone y desarrollo de moldes — todo bajo un mismo techo.',
      ],
    },
    services: [
      {
        title: 'Proceso de fabricación OEM',
        desc: 'Envíe muestras, planos o especificaciones técnicas. Ingeniería de HousePlus revisa la viabilidad DFM, desarrolla utillajes y entrega prototipos en 20 días.',
        points: [
          'Replicación de muestra o desarrollo basado en planos',
          'Taller interno de utillaje y moldes',
          'Validación de prototipo con 3 revisiones incluidas',
          'Producción en masa desde MOQ 100 pcs',
        ],
      },
      {
        title: 'Servicio ODM de marca privada',
        desc: 'Elija entre 200+ modelos HousePlus existentes. Aplique su logotipo, colores Pantone personalizados, empaque minorista y etiquetado de conformidad específico por mercado.',
        points: [
          '200+ modelos listos para marca',
          'Serigrafía de logotipo, impresión UV o grabado láser',
          'Concordancia de color Pantone para cuerpo y accesorios',
          'Empaque retail con su identidad de marca',
        ],
      },
      {
        title: 'Soluciones de empaque personalizadas',
        desc: 'El equipo de empaque de HousePlus diseña cajas retail, sets de regalo y cajas a granel. Las artes finales se entregan en 48 horas tras la confirmación del diseño.',
        points: [
          'Caja retail, color box, blister',
          'Diseño de manual de usuario y tarjetas insert',
          'Impresión de código de barras y etiquetas de conformidad',
          'Opciones ecológicas en kraft y corrugado',
        ],
      },
      {
        title: 'Desarrollo y modificación de moldes',
        desc: 'El utillaje financiado por el cliente sigue siendo de su propiedad. HousePlus guarda los moldes de forma segura y los mantiene sin costo durante 3 años. Las órdenes de cambio de ingeniería se cotizan en 72 horas.',
        points: [
          'Cambios de voltaje y configuración de enchufe',
          'Localización de idioma del firmware',
          'Personalización del set de accesorios',
          'Actualización de marcado de conformidad regional',
        ],
      },
    ],
    process: {
      sectionTitle: 'Proceso de fabricación a medida de HousePlus',
      sectionSubtitle: 'Un flujo transparente en 6 pasos desde la primera consulta hasta el soporte posventa.',
      steps: [
        {
          step: '01',
          title: 'Consulta y revisión DFM',
          desc: 'Comparta muestras, planos o números de modelo seleccionados. Los ingenieros de HousePlus evalúan la viabilidad y envían una cotización en 24 horas.',
        },
        {
          step: '02',
          title: 'Desarrollo de muestra',
          desc: 'Se fabrica un prototipo o muestra de preproducción. Plazo típico: 15–20 días para ODM, 20–25 días para OEM con utillaje nuevo.',
        },
        {
          step: '03',
          title: 'Aprobación de muestra',
          desc: 'El cliente evalúa la muestra y puede solicitar hasta 3 revisiones sin cargo. La aprobación final activa la confirmación de la orden de producción.',
        },
        {
          step: '04',
          title: 'Pedido y anticipo',
          desc: 'Se emite factura proforma con calendario de producción. Un anticipo del 30% confirma el ingreso del pedido en el sistema ERP de HousePlus.',
        },
        {
          step: '05',
          title: 'Producción y control de calidad',
          desc: 'Producción en masa con IPQC en 4 puntos de control. Se comparte informe e imágenes de la inspección pre‑embarque antes del despacho.',
        },
        {
          step: '06',
          title: 'Envío y soporte',
          desc: 'El pago del saldo activa el envío. HousePlus ofrece garantía de 12 meses, soporte de repuestos y un gestor de cuenta dedicado.',
        },
      ],
    },
    moq: {
      sectionTitle: 'Escalas de MOQ y descuentos por volumen',
      sectionSubtitleParts: ['Cantidades mínimas de pedido y descuentos correspondientes para ', ' OEM y ODM.'],
      tableHeaders: {
        tier: 'Nivel de MOQ',
        discount: 'Descuento por volumen',
        products: 'Productos típicos',
        sampleLead: 'Plazo de muestra',
      },
      rows: [
        { tier: '100 pcs', discount: 'MOQ estándar', products: 'Electrónica 3C, iluminación LED, pequeños electrodomésticos', sampleLead: '15–20 días' },
        { tier: '200 pcs', discount: 'Descuento 3% por volumen', products: 'Electrodomésticos, accesorios solares, power banks', sampleLead: '18–22 días' },
        { tier: '500 pcs', discount: 'Descuento 5% por volumen', products: 'Paneles solares, inversores, estaciones de energía portátiles', sampleLead: '20–25 días' },
        { tier: '1000+ pcs', discount: 'Descuento 7–10% por volumen', products: 'Líneas completas de productos, contenedores mixtos', sampleLead: '20–25 días' },
      ],
    },
    customization: {
      leftTitle: 'Qué puede personalizar con HousePlus',
      items: [
        {
          title: 'Color y acabado del producto',
          desc: 'Iguale cualquier código Pantone para carcasa, botones y accesorios. Acabados mate, brillo y metálico disponibles.',
        },
        {
          title: 'Logotipo y branding',
          desc: 'Serigrafía, impresión UV, grabado láser o logo en relieve en el producto, empaque y accesorios.',
        },
        {
          title: 'Empaque personalizado',
          desc: 'Cajas de regalo, color boxes, blísters y cajas a granel con el arte de su marca y códigos de barras.',
        },
        {
          title: 'Manual de usuario e insertos',
          desc: 'Manuales multilingües, tarjetas de garantía e inserts diseñados según su marca.',
        },
        {
          title: 'Voltaje y tipos de enchufe',
          desc: 'Configuraciones 110V/220V/240V con opciones de enchufe US, EU, UK, AU y universal.',
        },
        {
          title: 'Firmware e idioma',
          desc: 'Logo de arranque personalizado, idioma de la IU localizado y ajustes de funciones para requisitos regionales.',
        },
      ],
      rightTitle: 'Cronograma de muestras y producción',
      timeline: [
        { stage: 'Muestra ODM', time: '15–20 días', note: 'Basada en modelo existente con cambios de logo/color' },
        { stage: 'Muestra OEM (utillaje existente)', time: '18–22 días', note: 'Usando planos o muestras del cliente' },
        { stage: 'Muestra OEM (utillaje nuevo)', time: '20–25 días', note: 'Incluye diseño de molde e inspección del primer artículo' },
        { stage: 'Producción en masa (estándar)', time: '20–35 días', note: 'Tras aprobación de muestra y recepción del 30% de anticipo' },
        { stage: 'Producción en masa (gran volumen)', time: '35–45 días', note: 'Pedidos superiores a 5,000 pcs o contenedores mixtos' },
      ],
    },
    cta: {
      title: 'Inicie su proyecto OEM/ODM con HousePlus',
      descParts: ['Cuéntenos a ', ' sus requisitos de producto y prepararemos una cotización a medida con cronograma de muestras en 24 horas.'],
      buttonQuote: 'Solicitar cotización OEM/ODM',
      buttonBrowse: 'Ver catálogo ODM',
    },
  },
  de: {
    badges: ['MOQ ab 100 Stück', 'Lieferzeit 20–35 Tage', '12‑Monats-Garantie'],
    hero: {
      title: 'OEM/ODM-Fertigung — Private Label und kundenspezifische Produkte von HousePlus',
      descParts: [
        '',
        ' OEM/ODM‑Services decken Solarsysteme, Haushaltsgeräte und 3C‑Elektronik ab. MOQ ab 100 pcs mit 20–35 Tagen Durchlaufzeit aus einer ISO 9001‑zertifizierten 20.000 m² Fabrik, die seit 2010 über 441 Großhandelskunden in 53+ Ländern beliefert. Individuelle Verpackung, Pantone‑Farben und Formenentwicklung — alles unter einem Dach.',
      ],
    },
    services: [
      {
        title: 'OEM-Fertigungsprozess',
        desc: 'Senden Sie Muster, Zeichnungen oder technische Spezifikationen. Das HousePlus‑Engineering prüft die DFM‑Machbarkeit, entwickelt Werkzeuge und liefert Prototypen innerhalb von 20 Tagen.',
        points: [
          'Musterreplikation oder zeichnungsbasierte Entwicklung',
          'Interne Werkzeug- und Formenwerkstatt',
          'Prototypenvalidierung mit 3 Revisionen inbegriffen',
          'Serienfertigung ab MOQ 100 pcs',
        ],
      },
      {
        title: 'ODM‑Service für Private Label',
        desc: 'Wählen Sie aus 200+ bestehenden HousePlus‑Modellen. Fügen Sie Ihr Logo, individuelle Pantone‑Farben, Retail‑Verpackung und marktspezifische Konformitätskennzeichnung hinzu.',
        points: [
          '200+ markenfertige Produktmodelle',
          'Logo per Siebdruck, UV‑Druck oder Lasergravur',
          'Pantone‑Farbanpassung für Gehäuse und Zubehör',
          'Retail‑Verpackung mit Ihrer Markenidentität',
        ],
      },
      {
        title: 'Individuelle Verpackungslösungen',
        desc: 'Das HousePlus‑Verpackungsteam entwirft Retail‑Boxen, Geschenksets und Umkartons. Druckfreigaben werden innerhalb von 48 Stunden nach Designbestätigung bereitgestellt.',
        points: [
          'Retail‑Box, Color‑Box, Blisterpackung',
          'Gestaltung von Benutzerhandbuch und Einlegerkarten',
          'Druck von Barcodes und Konformitätslabels',
          'Umweltfreundliche Optionen in Kraft- und Wellpappe',
        ],
      },
      {
        title: 'Formenentwicklung & -änderung',
        desc: 'Kundenseitig finanziertes Werkzeug bleibt Ihr Eigentum. HousePlus lagert Formen sicher und wartet sie 3 Jahre kostenfrei. Engineering‑Änderungsaufträge werden innerhalb von 72 Stunden angeboten.',
        points: [
          'Änderungen von Spannung und Steckertyp',
          'Firmware‑Sprachlokalisierung',
          'Individuelle Zubehör‑Bundles',
          'Aktualisierung regionaler Konformitätskennzeichnungen',
        ],
      },
    ],
    process: {
      sectionTitle: 'HousePlus Prozess der kundenspezifischen Fertigung',
      sectionSubtitle: 'Ein transparenter 6‑stufiger Ablauf von der ersten Anfrage bis zum After‑Sales‑Support.',
      steps: [
        {
          step: '01',
          title: 'Anfrage & DFM‑Prüfung',
          desc: 'Teilen Sie Muster, Zeichnungen oder ausgewählte Modellnummern. HousePlus‑Ingenieure bewerten die Machbarkeit und stellen innerhalb von 24 Stunden ein Angebot.',
        },
        {
          step: '02',
          title: 'Musterentwicklung',
          desc: 'Es wird ein Prototyp oder Vorserienmuster gefertigt. Typische Durchlaufzeit: 15–20 Tage für ODM, 20–25 Tage für OEM mit neuem Werkzeug.',
        },
        {
          step: '03',
          title: 'Musterfreigabe',
          desc: 'Der Kunde bewertet das Muster und kann bis zu 3 Revisionen ohne Aufpreis anfordern. Die finale Freigabe löst die Produktionsauftragsbestätigung aus.',
        },
        {
          step: '04',
          title: 'Bestellung & Anzahlung',
          desc: 'Proforma‑Rechnung mit Produktionsplan wird ausgestellt. 30% Anzahlung bestätigt die Auftragserfassung im HousePlus‑ERP.',
        },
        {
          step: '05',
          title: 'Produktion & Qualitätskontrolle',
          desc: 'Serienproduktion mit IPQC an 4 Prüfpunkten. Prüfbericht und Fotos der Vorversand‑Inspektion werden vor dem Versand geteilt.',
        },
        {
          step: '06',
          title: 'Versand & Support',
          desc: 'Die Restzahlung löst den Versand aus. HousePlus bietet 12‑Monats‑Garantie, Ersatzteil‑Support und dediziertes Account Management.',
        },
      ],
    },
    moq: {
      sectionTitle: 'MOQ‑Stufen & Mengenrabatte',
      sectionSubtitleParts: ['Mindestbestellmengen und zugehörige Rabatte für die ', ' Services.'],
      tableHeaders: {
        tier: 'MOQ‑Stufe',
        discount: 'Mengenrabatt',
        products: 'Typische Produkte',
        sampleLead: 'Muster‑Vorlaufzeit',
      },
      rows: [
        { tier: '100 pcs', discount: 'Standard‑MOQ', products: '3C‑Elektronik, LED‑Beleuchtung, Kleingeräte', sampleLead: '15–20 Tage' },
        { tier: '200 pcs', discount: '3% Mengenrabatt', products: 'Haushaltsgeräte, Solar‑Zubehör, Powerbanks', sampleLead: '18–22 Tage' },
        { tier: '500 pcs', discount: '5% Mengenrabatt', products: 'Solarmodule, Wechselrichter, tragbare Power Stations', sampleLead: '20–25 Tage' },
        { tier: '1000+ pcs', discount: '7–10% Mengenrabatt', products: 'Komplette Produktlinien, gemischte Containerladungen', sampleLead: '20–25 Tage' },
      ],
    },
    customization: {
      leftTitle: 'Was Sie mit HousePlus anpassen können',
      items: [
        {
          title: 'Produktfarbe & Oberflächenfinish',
          desc: 'Abgleich beliebiger Pantone‑Codes für Gehäuse, Tasten und Zubehör. Matt, Glanz und Metallic verfügbar.',
        },
        {
          title: 'Logo & Branding',
          desc: 'Siebdruck, UV‑Druck, Lasergravur oder geprägtes Logo auf Produkt, Verpackung und Zubehör.',
        },
        {
          title: 'Individuelle Verpackung',
          desc: 'Geschenk‑Retail‑Boxen, Color‑Boxen, Blister und Umkartons mit Ihrem Artwork und Barcode‑Labels.',
        },
        {
          title: 'Benutzerhandbuch & Einleger',
          desc: 'Mehrsprachige Handbücher, Garantiekarten und Einleger gemäß Ihren Brand‑Guidelines.',
        },
        {
          title: 'Spannung & Steckertypen',
          desc: '110V/220V/240V‑Konfigurationen mit US‑, EU‑, UK‑, AU‑ und Universalstecker.',
        },
        {
          title: 'Firmware & Sprache',
          desc: 'Individuelles Boot‑Logo, lokalisierte UI‑Sprache und Funktionsanpassungen für regionale Anforderungen.',
        },
      ],
      rightTitle: 'Zeitplan für Muster & Produktion',
      timeline: [
        { stage: 'ODM‑Muster', time: '15–20 Tage', note: 'Auf bestehendem Modell mit Logo-/Farbänderungen' },
        { stage: 'OEM‑Muster (bestehendes Werkzeug)', time: '18–22 Tage', note: 'Unter Verwendung von Kundenzeichnungen oder Mustern' },
        { stage: 'OEM‑Muster (neues Werkzeug)', time: '20–25 Tage', note: 'Inklusive Formenkonstruktion und First Article Inspection' },
        { stage: 'Massenproduktion (Standard)', time: '20–35 Tage', note: 'Nach Musterfreigabe und Eingang der 30% Anzahlung' },
        { stage: 'Massenproduktion (großes Volumen)', time: '35–45 Tage', note: 'Aufträge über 5,000 pcs oder gemischte Container' },
      ],
    },
    cta: {
      title: 'Starten Sie Ihr OEM/ODM‑Projekt mit HousePlus',
      descParts: ['Teilen Sie ', ' Ihre Produktanforderungen mit, und wir erstellen innerhalb von 24 Stunden ein maßgeschneidertes Angebot mit Muster‑Zeitplan.'],
      buttonQuote: 'OEM/ODM‑Angebot anfordern',
      buttonBrowse: 'ODM‑Katalog durchsuchen',
    },
  },
  fr: {
    badges: ['MOQ dès 100 pièces', 'Délai 20–35 jours', 'Garantie 12 mois'],
    hero: {
      title: 'Fabrication OEM/ODM — Marque privée et produits personnalisés par HousePlus',
      descParts: [
        'Les services OEM/ODM de ',
        ' couvrent les systèmes d’énergie solaire, les appareils ménagers et l’électronique 3C. MOQ à partir de 100 pcs avec un délai de 20–35 jours depuis une usine ISO 9001 de 20 000 m², au service de 441+ clients grossistes dans 53+ pays depuis 2010. Emballage personnalisé, couleurs Pantone et développement de moules — tout sous le même toit.',
      ],
    },
    services: [
      {
        title: 'Processus de fabrication OEM',
        desc: 'Soumettez des échantillons, dessins ou spécifications techniques. L’ingénierie HousePlus évalue la faisabilité DFM, développe les outillages et livre des prototypes sous 20 jours.',
        points: [
          'Réplication d’échantillon ou développement basé sur dessin',
          'Atelier interne d’outillage et de moules',
          'Validation du prototype avec 3 révisions incluses',
          'Production de série à partir de MOQ 100 pcs',
        ],
      },
      {
        title: 'Service ODM de marque privée',
        desc: 'Choisissez parmi 200+ modèles HousePlus existants. Appliquez votre logo, des couleurs Pantone personnalisées, un emballage retail et un étiquetage de conformité propre à chaque marché.',
        points: [
          'Plus de 200 modèles prêts à marquer',
          'Logo en sérigraphie, impression UV ou gravure laser',
          'Ajustement de couleur Pantone pour boîtier et accessoires',
          'Emballage retail avec votre identité de marque',
        ],
      },
      {
        title: 'Solutions d’emballage personnalisées',
        desc: 'L’équipe packaging de HousePlus conçoit des boîtes retail, coffrets cadeaux et cartons vrac. Les BAT sont fournis sous 48 heures après validation du design.',
        points: [
          'Boîte retail, color box, blister',
          'Conception du manuel utilisateur et des cartes insérées',
          'Impression des codes-barres et étiquettes de conformité',
          'Options écoresponsables en kraft et carton ondulé',
        ],
      },
      {
        title: 'Développement et modification de moules',
        desc: 'Les outillages financés par le client restent votre propriété. HousePlus entrepose les moules en toute sécurité et les entretient gratuitement pendant 3 ans. Les demandes de modification d’ingénierie sont chiffrées sous 72 heures.',
        points: [
          'Modifications de tension et de type de prise',
          'Localisation linguistique du firmware',
          'Personnalisation du lot d’accessoires',
          'Mise à jour du marquage de conformité régional',
        ],
      },
    ],
    process: {
      sectionTitle: 'Processus de fabrication sur mesure HousePlus',
      sectionSubtitle: 'Un flux transparent en 6 étapes, de la première demande au support après‑vente.',
      steps: [
        {
          step: '01',
          title: 'Demande et revue DFM',
          desc: 'Partagez des échantillons, dessins ou références choisies. Les ingénieurs HousePlus évaluent la faisabilité et fournissent un devis sous 24 heures.',
        },
        {
          step: '02',
          title: 'Développement d’échantillon',
          desc: 'Un prototype ou échantillon de pré‑série est fabriqué. Délai typique : 15–20 jours pour l’ODM, 20–25 jours pour l’OEM avec nouvel outillage.',
        },
        {
          step: '03',
          title: 'Approbation de l’échantillon',
          desc: 'Le client évalue l’échantillon et peut demander jusqu’à 3 révisions sans frais. La validation finale déclenche la confirmation de l’ordre de production.',
        },
        {
          step: '04',
          title: 'Commande et acompte',
          desc: 'Facture proforma émise avec le planning de production. Un acompte de 30% confirme l’enregistrement de commande dans l’ERP HousePlus.',
        },
        {
          step: '05',
          title: 'Production et contrôle qualité',
          desc: 'Production en série avec IPQC à 4 points de contrôle. Rapport et photos d’inspection pré‑expédition partagés avant l’envoi.',
        },
        {
          step: '06',
          title: 'Expédition et support',
          desc: 'Le paiement du solde déclenche l’expédition. HousePlus fournit une garantie de 12 mois, des pièces de rechange et un gestionnaire de compte dédié.',
        },
      ],
    },
    moq: {
      sectionTitle: 'Paliers de MOQ et remises sur volume',
      sectionSubtitleParts: ['Quantités minimales de commande et remises associées pour les services ', ' OEM et ODM.'],
      tableHeaders: {
        tier: 'Palier de MOQ',
        discount: 'Remise sur volume',
        products: 'Produits typiques',
        sampleLead: 'Délai d’échantillon',
      },
      rows: [
        { tier: '100 pcs', discount: 'MOQ standard', products: 'Électronique 3C, éclairage LED, petits appareils', sampleLead: '15–20 jours' },
        { tier: '200 pcs', discount: 'Remise volume 3%', products: 'Appareils ménagers, accessoires solaires, power banks', sampleLead: '18–22 jours' },
        { tier: '500 pcs', discount: 'Remise volume 5%', products: 'Panneaux solaires, onduleurs, stations d’énergie portables', sampleLead: '20–25 jours' },
        { tier: '1000+ pcs', discount: 'Remise volume 7–10%', products: 'Gammes complètes, chargements conteneurs mixtes', sampleLead: '20–25 jours' },
      ],
    },
    customization: {
      leftTitle: 'Ce que vous pouvez personnaliser avec HousePlus',
      items: [
        {
          title: 'Couleur et finition du produit',
          desc: 'Correspondance de tout code Pantone pour le boîtier, les boutons et les accessoires. Finitions mates, brillantes et métalliques disponibles.',
        },
        {
          title: 'Logo et branding',
          desc: 'Sérigraphie, impression UV, gravure laser ou logo embossé sur le produit, l’emballage et les accessoires.',
        },
        {
          title: 'Emballage personnalisé',
          desc: 'Boîtes cadeaux retail, color boxes, blisters et cartons vrac avec l’illustration de votre marque et codes‑barres.',
        },
        {
          title: 'Manuel d’utilisation et inserts',
          desc: 'Manuels multilingues, cartes de garantie et inserts conçus selon votre charte de marque.',
        },
        {
          title: 'Tension et types de prise',
          desc: 'Configurations 110V/220V/240V avec prises US, EU, UK, AU et universelle.',
        },
        {
          title: 'Firmware et langue',
          desc: 'Logo de démarrage personnalisé, langue d’interface localisée et ajustements de fonctions selon les exigences régionales.',
        },
      ],
      rightTitle: 'Calendrier des échantillons et de la production',
      timeline: [
        { stage: 'Échantillon ODM', time: '15–20 jours', note: 'Basé sur un modèle existant avec changements de logo/couleur' },
        { stage: 'Échantillon OEM (outillage existant)', time: '18–22 jours', note: 'À partir des plans ou échantillons fournis par le client' },
        { stage: 'Échantillon OEM (nouvel outillage)', time: '20–25 jours', note: 'Inclut la conception du moule et l’inspection du premier article' },
        { stage: 'Production de série (standard)', time: '20–35 jours', note: 'Après approbation de l’échantillon et réception de l’acompte de 30%' },
        { stage: 'Production de série (grand volume)', time: '35–45 jours', note: 'Commandes supérieures à 5,000 pcs ou conteneurs mixtes' },
      ],
    },
    cta: {
      title: 'Lancez votre projet OEM/ODM avec HousePlus',
      descParts: ['Indiquez à ', ' vos exigences produit et nous préparerons sous 24 heures un devis sur mesure avec calendrier d’échantillons.'],
      buttonQuote: 'Demander un devis OEM/ODM',
      buttonBrowse: 'Parcourir le catalogue ODM',
    },
  },
  ar: {
    badges: ['حد أدنى للطلب من 100 قطعة', 'مهلة 20–35 يوماً', 'ضمان 12 شهراً'],
    hero: {
      title: 'تصنيع OEM/ODM — علامات خاصة ومنتجات مخصصة من هاوس بلس',
      descParts: [
        'تشمل خدمات ',
        ' OEM/ODM أنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C. حد أدنى للطلب 100 pcs مع مهلة 20–35 يوماً من مصنع بمساحة 20,000 م² معتمد ISO 9001 يخدم 441+ عميلاً بالجملة في أكثر من 53 دولة منذ 2010. تغليف مخصص وألوان Pantone وتطوير القوالب — كل ذلك تحت سقف واحد.',
      ],
    },
    services: [
      {
        title: 'عملية تصنيع OEM',
        desc: 'أرسل عينات المنتج أو الرسومات أو المواصفات التقنية. يراجع مهندسو هاوس بلس جدوى DFM ويطوّرون أدوات التصنيع ويسلمون النماذج الأولية خلال 20 يوماً.',
        points: [
          'استنساخ العينة أو تطوير يعتمد على الرسومات',
          'ورشة قوالب وتجهيزات داخلية',
          'اعتماد النموذج الأولي مع 3 تعديلات مشمولة',
          'إنتاج كمي ابتداءً من MOQ 100 pcs',
        ],
      },
      {
        title: 'خدمة ODM للعلامة الخاصة',
        desc: 'اختر من أكثر من 200 طراز قائم من HousePlus. أضف شعارك وألوان Pantone المخصصة وتغليف البيع بالتجزئة ووسم الامتثال الخاص بكل سوق.',
        points: [
          'أكثر من 200 طراز جاهز للعلامة التجارية',
          'شعار بطباعة حريرية أو طباعة UV أو حفر بالليزر',
          'مطابقة ألوان Pantone للهيكل والملحقات',
          'تغليف تجزئة بهوية علامتك',
        ],
      },
      {
        title: 'حلول تغليف مخصصة',
        desc: 'يقوم فريق التغليف في هاوس بلس بتصميم صناديق البيع بالتجزئة ومجموعات الهدايا وكرتونات الجملة. تُقدَّم براهين التصميم خلال 48 ساعة من تأكيد المخطط.',
        points: [
          'علبة تجزئة، علبة ملونة، عبوة بلاستيكية (blister)',
          'تصميم دليل المستخدم وبطاقات الإدراج',
          'طباعة الباركود وملصقات المطابقة',
          'خيارات صديقة للبيئة من ورق كرافت والورق المموج',
        ],
      },
      {
        title: 'تطوير القوالب وتعديلها',
        desc: 'تظل أدوات التصنيع الممولة من العميل ملكيتكم. تخزن هاوس بلس القوالب بأمان وتقوم بصيانتها مجاناً لمدة 3 سنوات. يتم تسعير أوامر تغيير الهندسة خلال 72 ساعة.',
        points: [
          'تغييرات الجهد وتكوين القابس',
          'توطين لغة البرنامج الثابت',
          'تخصيص حزمة الملحقات',
          'تحديث وسم المطابقة الإقليمي',
        ],
      },
    ],
    process: {
      sectionTitle: 'عملية التصنيع المخصص من هاوس بلس',
      sectionSubtitle: 'سير عمل شفاف من 6 خطوات من أول استفسار حتى دعم ما بعد البيع.',
      steps: [
        {
          step: '01',
          title: 'الاستفسار ومراجعة DFM',
          desc: 'شارك عينات أو رسومات أو أرقام الطراز المختارة. يقيّم مهندسو هاوس بلس الجدوى ويقدمون عرض سعر خلال 24 ساعة.',
        },
        {
          step: '02',
          title: 'تطوير العينة',
          desc: 'يتم تصنيع نموذج أولي أو عينة ما قبل الإنتاج. المهلة النموذجية: 15–20 يوماً لـ ODM، و20–25 يوماً لـ OEM مع أدوات جديدة.',
        },
        {
          step: '03',
          title: 'اعتماد العينة',
          desc: 'يقيم العميل العينة ويمكنه طلب ما يصل إلى 3 تعديلات دون رسوم. تؤدي الموافقة النهائية إلى تأكيد أمر الإنتاج.',
        },
        {
          step: '04',
          title: 'الطلب والدفعة المقدمة',
          desc: 'تصدر فاتورة أولية مع جدول الإنتاج. تؤكد دفعة مقدمة بنسبة 30% إدخال الطلب في نظام ERP الخاص بهاوس بلس.',
        },
        {
          step: '05',
          title: 'الإنتاج وضبط الجودة',
          desc: 'إنتاج كمي مع IPQC في 4 نقاط تفتيش. تتم مشاركة تقرير وصور الفحص قبل الشحن قبل الإرسال.',
        },
        {
          step: '06',
          title: 'الشحن والدعم',
          desc: 'يؤدي سداد الرصيد إلى الشحن. تقدم هاوس بلس ضماناً لمدة 12 شهراً ودعماً لقطع الغيار ومديراً مخصصاً للحساب.',
        },
      ],
    },
    moq: {
      sectionTitle: 'تدرجات MOQ وخصومات الحجم',
      sectionSubtitleParts: ['كميات الحد الأدنى للطلب والخصومات المقابلة لخدمات ', ' OEM وODM.'],
      tableHeaders: {
        tier: 'فئة MOQ',
        discount: 'خصم الحجم',
        products: 'منتجات نموذجية',
        sampleLead: 'مهلة العينة',
      },
      rows: [
        { tier: '100 pcs', discount: 'MOQ قياسي', products: 'إلكترونيات 3C، إضاءة LED، أجهزة صغيرة', sampleLead: '15–20 يوماً' },
        { tier: '200 pcs', discount: 'خصم حجم 3%', products: 'الأجهزة المنزلية، ملحقات الطاقة الشمسية، بنوك طاقة', sampleLead: '18–22 يوماً' },
        { tier: '500 pcs', discount: 'خصم حجم 5%', products: 'ألواح شمسية، محولات، محطات طاقة محمولة', sampleLead: '20–25 يوماً' },
        { tier: '1000+ pcs', discount: 'خصم حجم 7–10%', products: 'خطوط منتجات كاملة، حمولات حاويات مختلطة', sampleLead: '20–25 يوماً' },
      ],
    },
    customization: {
      leftTitle: 'ما الذي يمكن تخصيصه مع هاوس بلس',
      items: [
        {
          title: 'لون المنتج والتشطيب',
          desc: 'مطابقة أي رمز Pantone للهيكل والأزرار والملحقات. تتوفر تشطيبات مطفية ولامعة ومعدنية.',
        },
        {
          title: 'الشعار والهوية',
          desc: 'طباعة حريرية، طباعة UV، حفر بالليزر أو شعار بارز على المنتج والتغليف والملحقات.',
        },
        {
          title: 'تغليف مخصص',
          desc: 'علب هدايا للبيع بالتجزئة وعلب ملونة وعبوات blister وكرتونات بالجملة مع عمل فني لعلامتك وملصقات الباركود.',
        },
        {
          title: 'دليل المستخدم والإدراجات',
          desc: 'أدلة مستخدم متعددة اللغات وبطاقات ضمان وإدراجات مصممة وفق إرشادات علامتك.',
        },
        {
          title: 'الجهد وأنواع المقابس',
          desc: 'تهيئات 110V/220V/240V مع مقابس US وEU وUK وAU وعالمي.',
        },
        {
          title: 'البرنامج الثابت واللغة',
          desc: 'شعار إقلاع مخصص، لغة واجهة محلية وتعديلات الميزات حسب المتطلبات الإقليمية.',
        },
      ],
      rightTitle: 'الجدول الزمني للعينات والإنتاج',
      timeline: [
        { stage: 'عينة ODM', time: '15–20 يوماً', note: 'استناداً إلى طراز قائم مع تغييرات الشعار/الألوان' },
        { stage: 'عينة OEM (أدوات قائمة)', time: '18–22 يوماً', note: 'باستخدام رسومات أو عينات يقدّمها العميل' },
        { stage: 'عينة OEM (أدوات جديدة)', time: '20–25 يوماً', note: 'يشمل تصميم القالب وفحص القطعة الأولى' },
        { stage: 'إنتاج كمي (قياسي)', time: '20–35 يوماً', note: 'بعد اعتماد العينة واستلام دفعة 30%' },
        { stage: 'إنتاج كمي (حجم كبير)', time: '35–45 يوماً', note: 'طلبات تزيد عن 5,000 pcs أو حاويات مختلطة' },
      ],
    },
    cta: {
      title: 'ابدأ مشروع OEM/ODM مع هاوس بلس',
      descParts: ['أخبر ', ' بمتطلبات منتجك وسنعد عرض سعر مخصصاً مع جدول العينات خلال 24 ساعة.'],
      buttonQuote: 'اطلب عرض سعر OEM/ODM',
      buttonBrowse: 'تصفح كتالوج ODM',
    },
  },
};

export default async function OemOdmPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const t = copy[lang] || copy['en'];

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description:
      'OEM/ODM manufacturing for solar panels, power stations, air fryers, induction cooktops, TWS earphones and smart watches. MOQ from 100 pcs, 20–35 day lead time and 12-month warranty from a 20,000 m² ISO 9001 factory.',
    url: `https://www.houseplus-ch.com/${lang}/oem-odm`,
    lang,
    type: 'Organization',
  });

  const manufacturingServiceSchema = generateServiceSchema({
    name: 'HousePlus OEM Manufacturing Service',
    description:
      'Custom manufacturing from samples or drawings with tooling development, prototype validation and mass production. MOQ from 100 pcs with 20–35 day lead time.',
    url: `https://www.houseplus-ch.com/${lang}/oem-odm`,
    serviceType: 'ManufacturingService',
    areaServed: ['Worldwide', 'Europe', 'Africa', 'Middle East', 'Southeast Asia', 'North America', 'South America'],
    availableChannel: ['Online', 'Phone', 'Email', 'WhatsApp'],
  });

  const designServiceSchema = generateServiceSchema({
    name: 'HousePlus ODM & Private Label Design Service',
    description:
      'Select from existing product portfolio and apply your brand. Custom logo, Pantone colour matching, packaging design and user manual localisation with 15–20 day sample lead time.',
    url: `https://www.houseplus-ch.com/${lang}/oem-odm`,
    serviceType: 'DesignService',
    areaServed: ['Worldwide', 'Europe', 'Africa', 'Middle East', 'Southeast Asia', 'North America', 'South America'],
    availableChannel: ['Online', 'Phone', 'Email', 'WhatsApp'],
  });

  const icons = ['🏭', '🎨', '📦', '⚙️'];
  const oemServices = t.services.map((s, i) => ({ icon: icons[i] || '✓', ...s }));
  const process = t.process.steps;
  const moqTiers = t.moq.rows;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://www.houseplus-ch.com/${lang}` },
    { name: 'OEM/ODM', url: `https://www.houseplus-ch.com/${lang}/oem-odm` },
  ]);

  return (
    <>
      <SEOHead schemas={[organizationSchema, manufacturingServiceSchema, designServiceSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} slug="oem-odm" />

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {t.badges.map((b) => (
                  <span key={b} className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">
                    {b}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">{t.hero.title}</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {t.hero.descParts[0]}
                <strong>HousePlus</strong>
                {t.hero.descParts[1]}
              </p>
            </div>
          </div>
        </section>

        {/* Service Cards */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {oemServices.map((s) => (
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

        {/* 6-Step Process */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{t.process.sectionTitle}</h2>
              <p className="text-slate-500 max-w-xl mx-auto">{t.process.sectionSubtitle}</p>
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

        {/* MOQ Tiers */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{t.moq.sectionTitle}</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                {t.moq.sectionSubtitleParts[0]}
                <strong>HousePlus</strong>
                {t.moq.sectionSubtitleParts[1]}
              </p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="text-left px-6 py-4 font-bold">{t.moq.tableHeaders.tier}</th>
                      <th className="text-left px-6 py-4 font-bold">{t.moq.tableHeaders.discount}</th>
                      <th className="text-left px-6 py-4 font-bold">{t.moq.tableHeaders.products}</th>
                      <th className="text-left px-6 py-4 font-bold">{t.moq.tableHeaders.sampleLead}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moqTiers.map((row, i) => (
                      <tr key={row.tier + row.discount} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-6 py-4 font-bold text-slate-900">{row.tier}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">{row.discount}</td>
                        <td className="px-6 py-4 text-slate-600">{row.products}</td>
                        <td className="px-6 py-4 text-slate-600">{row.sampleLead}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Customisation Options */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">{t.customization.leftTitle}</h2>
                <div className="space-y-4">
                  {t.customization.items.map((item) => (
                    <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl border border-blue-100">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                        <p className="text-slate-600 text-sm mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">{t.customization.rightTitle}</h3>
                <div className="space-y-5">
                  {t.customization.timeline.map((tItem) => (
                    <div key={tItem.stage} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{tItem.stage}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{tItem.note}</p>
                      </div>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">{tItem.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">{t.cta.title}</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              {t.cta.descParts[0]}
              <strong>HousePlus</strong>
              {t.cta.descParts[1]}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5">
                {t.cta.buttonQuote}
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-700 text-white border border-blue-500 font-bold rounded-xl hover:bg-blue-800 transition-all hover:-translate-y-0.5">
                {t.cta.buttonBrowse}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}