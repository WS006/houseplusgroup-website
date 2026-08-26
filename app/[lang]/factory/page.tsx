import { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'HousePlus Factory — 20,000 m² Manufacturing Facility in Guangdong',
    es: 'Fábrica de HousePlus — Planta de 20.000 m² en Guangdong',
    de: 'HousePlus Fabrik — 20.000 m² Produktionsstätte in Guangdong',
    fr: 'Usine HousePlus — Site de Production de 20 000 m² à Guangdong',
    ar: 'مصنع هاوس بلس — منشأة تصنيع مساحتها ٢٠٬٠٠٠ م² في قوانغدونغ',
  };

  const descriptions: Record<string, string> = {
    en: 'Tour the HousePlus 20,000 m² ISO 9001 certified factory in Guangdong. 500+ employees, 8 production lines, 100,000+ units monthly. Quality control for solar, appliances and electronics.',
    es: 'Conozca la fábrica de HousePlus de 20.000 m² certificada ISO 9001 en Guangdong. Más de 500 empleados, 8 líneas de producción, 100.000+ unidades al mes con control de calidad.',
    de: 'Besichtigen Sie die 20.000 m² ISO 9001-zertifizierte HousePlus Fabrik in Guangdong. 500+ Mitarbeiter, 8 Produktionslinien, 100.000+ Einheiten monatlich. Qualitätskontrolle für Solar, Geräte und Elektronik.',
    fr: 'Visitez l\'usine HousePlus de 20 000 m² certifiée ISO 9001 à Guangdong. 500+ collaborateurs, 8 lignes de production, 100 000+ unités par mois. Contrôle qualité pour solaire, électroménager et électronique.',
    ar: 'جولة في مصنع هاوس بلس بمساحة ٢٠٬٠٠٠ م² الحاصل على شهادة ISO 9001 في قوانغدونغ. أكثر من ٥٠٠ موظف و٨ خطوط إنتاج و١٠٠٬٠٠٠+ وحدة شهرياً مع رقابة جودة شاملة.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles['en'],
    description: descriptions[lang] || descriptions['en'],
    keywords: ['factory', 'manufacturing', 'production line', 'quality control', 'OEM ODM', 'Guangdong', 'HousePlus'],
    url: `/${lang}/factory`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function FactoryPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Vertically integrated manufacturer with 20,000 m² production facility in Guangdong, China.',
    url: `https://www.houseplus-ch.com/${lang}/factory`,
    lang,
    type: 'Organization',
  });

  type Lang = 'en' | 'es' | 'de' | 'fr' | 'ar';

  const copy: Record<
    Lang,
    {
      hero: {
        badges: string[];
        h1: string;
        p: { a: string; b: string; c: string; e: string; d: string };
        stats: { value: string; label: string }[];
        imgAlt: string;
        imgTitle: string;
      };
      geobar: { stats: { value: string; label: string }[] };
      gallery: { images: { src: string; alt: string }[] };
      facilities: {
        heading: string;
        sub: string;
        cards: { icon: string; name: string; desc: string }[];
      };
      process: {
        heading: string;
        sub: string;
        steps: { step: string; title: string; desc: string }[];
      };
      qa: {
        heading: string;
        bullets: string[];
        imgAlt: string;
        imgTitle: string;
      };
      cta: {
        heading: string;
        p: { a: string; b: string; c: string; d: string };
        contact: string;
        products: string;
      };
    }
  > = {
    en: {
      hero: {
        badges: ['🏭 HousePlus Factory', 'Guangdong, China', '20,000 m²'],
        h1: '🏭 Where HousePlus Products Are Made',
        p: {
          a: 'The ',
          b: ' vertically integrated factory in Guangdong houses four dedicated production divisions, an in-house tooling workshop and a fully equipped laboratory — giving ',
          c: ' complete control from raw material to finished product. ',
          e: 'This is the ',
          d: ' advantage.',
        },
        stats: [
          { value: '20,000 m²', label: 'Factory Area' },
          { value: '500+', label: 'Employees' },
          { value: '100K+', label: 'Units/Month' },
        ],
        imgAlt: 'HousePlus main production line',
        imgTitle: 'HousePlus main production line',
      },
      geobar: {
        stats: [
          { value: '2010', label: 'Founded' },
          { value: '20,000 m²', label: 'Factory Area' },
          { value: '500+', label: 'Staff' },
          { value: '100K+', label: 'Units/Month' },
          { value: '53+', label: 'Countries' },
          { value: '441+', label: 'Clients' },
        ],
      },
      gallery: {
        images: [
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-production-line/',
            alt: 'Home appliance production line — precision manufacturing',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-factory-solar-assembly-line/',
            alt: 'Solar energy equipment assembly line',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-assembly-line/',
            alt: 'Automated home appliance production equipment',
          },
        ],
      },
      facilities: {
        heading: '🏭 HousePlus Production Facilities',
        sub: 'Four specialised HousePlus divisions, each optimised for its product category.',
        cards: [
          {
            icon: '☀️',
            name: 'Solar Energy Production Line',
            desc: 'Dedicated lines for solar panel lamination, inverter assembly and portable power station manufacturing. Equipped with automated cell-string welding and EL imaging inspection.',
          },
          {
            icon: '🏠',
            name: 'Home Appliance Assembly',
            desc: 'Modern assembly lines for air fryers, induction cooktops, kettles and toasters. Automated torque control, 100% electrical safety testing and drop-test simulation for every batch.',
          },
          {
            icon: '📱',
            name: '3C Electronics Workshop',
            desc: 'SMT and wave-soldering lines for TWS earphones, smart watches and portable storage devices. ESD-protected workstations, automated optical inspection (AOI) and burn-in testing.',
          },
          {
            icon: '🔬',
            name: 'Quality Assurance Laboratory',
            desc: 'Fully equipped QA lab with environmental chambers (temperature, humidity, vibration), electrical safety testers, EMC pre-compliance equipment and third-party audit support.',
          },
        ],
      },
      process: {
        heading: '🏭 HousePlus Manufacturing Process',
        sub: 'From concept to delivery — the transparent HousePlus workflow.',
        steps: [
          {
            step: '01',
            title: 'Design & Engineering',
            desc: 'Our R&D team translates client briefs into detailed product specifications, 3D models and prototype samples within 15–20 working days.',
          },
          {
            step: '02',
            title: 'Material Procurement',
            desc: 'Raw materials and components are sourced exclusively from audited, certified suppliers. Incoming inspection (IQC) is performed on every delivery.',
          },
          {
            step: '03',
            title: 'Production',
            desc: 'Manufacturing follows ISO 9001-aligned work instructions. In-process control (IPQC) checkpoints are built into every assembly stage.',
          },
          {
            step: '04',
            title: 'Quality Testing',
            desc: '100% finished-goods inspection covers appearance, function, safety and packaging integrity before any unit is cleared for shipment.',
          },
          {
            step: '05',
            title: 'Packaging & Labelling',
            desc: 'Products are packed in custom or standard cartons with client-specified branding, barcodes and compliance labels for the target market.',
          },
          {
            step: '06',
            title: 'Logistics & Export',
            desc: 'We coordinate FOB, CIF and DDP shipments via sea, air or express courier, with full documentation including CO, packing list and commercial invoice.',
          },
        ],
      },
      qa: {
        heading: '🏭 HousePlus Quality Assurance',
        bullets: [
          'ISO 9001:2015 certified management system',
          '100% finished-goods inspection before shipment',
          'Environmental chamber testing: −20°C to +70°C, 95% RH',
          'Electrical safety testing: hi-pot, insulation resistance, leakage current',
          'EMC pre-compliance screening for CE and FCC markets',
          'Third-party lab certification support (SGS, TÜV, Intertek)',
        ],
        imgAlt: 'HousePlus home appliance quality assurance laboratory',
        imgTitle: 'HousePlus appliance quality assurance laboratory',
      },
      cta: {
        heading: '🏭 Interested in a HousePlus Factory Audit?',
        p: {
          a: '',
          b: ' welcomes on-site visits and third-party factory audits. ',
          c: 'Contact the ',
          d: ' team to arrange a tour or request our latest audit reports.',
        },
        contact: 'Contact Us',
        products: 'View Products',
      },
    },
    es: {
      hero: {
        badges: ['🏭 Fábrica de HousePlus', 'Guangdong, China', '20,000 m²'],
        h1: '🏭 Dónde se fabrican los productos de HousePlus',
        p: {
          a: 'La fábrica de ',
          b: ' de integración vertical en Guangdong alberga cuatro divisiones de producción dedicadas, un taller interno de utillaje y un laboratorio totalmente equipado — lo que brinda a ',
          c: ' control total desde la materia prima hasta el producto final. ',
          e: 'Esta es la ventaja de ',
          d: '.',
        },
        stats: [
          { value: '20,000 m²', label: 'Área de fábrica' },
          { value: '500+', label: 'Empleados' },
          { value: '100K+', label: 'Unidades/mes' },
        ],
        imgAlt: 'Línea de producción de HousePlus — línea principal',
        imgTitle: 'Línea principal de producción de HousePlus',
      },
      geobar: {
        stats: [
          { value: '2010', label: 'Fundada' },
          { value: '20,000 m²', label: 'Área de fábrica' },
          { value: '500+', label: 'Personal' },
          { value: '100K+', label: 'Unidades/mes' },
          { value: '53+', label: 'Países' },
          { value: '441+', label: 'Clientes' },
        ],
      },
      gallery: {
        images: [
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-production-line/',
            alt: 'Línea de producción de electrodomésticos — fabricación de precisión',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-factory-solar-assembly-line/',
            alt: 'Línea de ensamblaje de equipos de energía solar',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-assembly-line/',
            alt: 'Equipos automatizados de producción de electrodomésticos',
          },
        ],
      },
      facilities: {
        heading: '🏭 Instalaciones de producción de HousePlus',
        sub: 'Cuatro divisiones especializadas de HousePlus, cada una optimizada para su categoría de producto.',
        cards: [
          {
            icon: '☀️',
            name: 'Línea de producción de energía solar',
            desc: 'Líneas dedicadas para laminación de paneles solares, ensamblaje de inversores y fabricación de estaciones de energía portátiles. Equipadas con soldadura automatizada de cadenas de celdas y inspección de imagen EL.',
          },
          {
            icon: '🏠',
            name: 'Montaje de electrodomésticos',
            desc: 'Líneas de ensamblaje modernas para freidoras de aire, placas de inducción, hervidores y tostadoras. Control de par automatizado, pruebas de seguridad eléctrica al 100% y simulación de pruebas de caída para cada lote.',
          },
          {
            icon: '📱',
            name: 'Taller de electrónica 3C',
            desc: 'Líneas SMT y de soldadura por ola para auriculares TWS, relojes inteligentes y dispositivos de almacenamiento portátiles. Puestos con protección ESD, inspección óptica automatizada (AOI) y pruebas de burn-in.',
          },
          {
            icon: '🔬',
            name: 'Laboratorio de aseguramiento de calidad',
            desc: 'Laboratorio de QA totalmente equipado con cámaras ambientales (temperatura, humedad, vibración), equipos de pruebas de seguridad eléctrica, equipos de pre-cumplimiento EMC y soporte para auditorías de terceros.',
          },
        ],
      },
      process: {
        heading: '🏭 Proceso de fabricación de HousePlus',
        sub: 'Del concepto a la entrega — el flujo de trabajo transparente de HousePlus.',
        steps: [
          {
            step: '01',
            title: 'Diseño e ingeniería',
            desc: 'Nuestro equipo de I+D traduce los briefs de los clientes en especificaciones detalladas de producto, modelos 3D y prototipos en 15–20 días laborables.',
          },
          {
            step: '02',
            title: 'Adquisición de materiales',
            desc: 'Las materias primas y los componentes se obtienen exclusivamente de proveedores auditados y certificados. Se realiza inspección de entrada (IQC) en cada entrega.',
          },
          {
            step: '03',
            title: 'Producción',
            desc: 'La fabricación sigue instrucciones de trabajo alineadas con ISO 9001. Se incorporan puntos de control en proceso (IPQC) en cada etapa del ensamblaje.',
          },
          {
            step: '04',
            title: 'Pruebas de calidad',
            desc: 'La inspección del 100% de los productos terminados cubre apariencia, función, seguridad e integridad del embalaje antes de autorizar el envío.',
          },
          {
            step: '05',
            title: 'Embalaje y etiquetado',
            desc: 'Los productos se embalan en cajas personalizadas o estándar con la marca, códigos de barras y etiquetas de conformidad especificadas por el cliente para el mercado objetivo.',
          },
          {
            step: '06',
            title: 'Logística y exportación',
            desc: 'Coordinamos envíos FOB, CIF y DDP por mar, aire o mensajería exprés, con documentación completa que incluye CO, packing list y factura comercial.',
          },
        ],
      },
      qa: {
        heading: '🏭 Aseguramiento de la calidad de HousePlus',
        bullets: [
          'Sistema de gestión certificado ISO 9001:2015',
          'Inspección del 100% de los productos terminados antes del envío',
          'Pruebas en cámara ambiental: −20°C a +70°C, 95% RH',
          'Pruebas de seguridad eléctrica: hi-pot, resistencia de aislamiento, corriente de fuga',
          'Cribado de pre-cumplimiento EMC para los mercados CE y FCC',
          'Soporte de certificación con laboratorios externos (SGS, TÜV, Intertek)',
        ],
        imgAlt: 'Laboratorio de aseguramiento de calidad de electrodomésticos de HousePlus',
        imgTitle: 'Laboratorio de QA de electrodomésticos de HousePlus',
      },
      cta: {
        heading: '🏭 ¿Interesado en una auditoría de la fábrica de HousePlus?',
        p: {
          a: '',
          b: ' da la bienvenida a visitas in situ y auditorías de fábrica por terceros. ',
          c: 'Contacte con el equipo de ',
          d: ' para organizar una visita o solicitar nuestros informes de auditoría más recientes.',
        },
        contact: 'Contáctenos',
        products: 'Ver productos',
      },
    },
    de: {
      hero: {
        badges: ['🏭 HousePlus Fabrik', 'Guangdong, China', '20,000 m²'],
        h1: '🏭 Wo HousePlus Produkte hergestellt werden',
        p: {
          a: 'Die ',
          b: ' vertikal integrierte Fabrik in Guangdong umfasst vier spezialisierte Produktionsbereiche, eine hauseigene Werkzeugwerkstatt und ein vollständig ausgestattetes Labor — und verschafft ',
          c: ' die vollständige Kontrolle vom Rohmaterial bis zum fertigen Produkt. ',
          e: 'Das ist der ',
          d: ' Vorteil.',
        },
        stats: [
          { value: '20,000 m²', label: 'Fabrikfläche' },
          { value: '500+', label: 'Mitarbeiter' },
          { value: '100K+', label: 'Einheiten/Monat' },
        ],
        imgAlt: 'Hauptproduktionslinie von HousePlus',
        imgTitle: 'HousePlus Hauptproduktionslinie',
      },
      geobar: {
        stats: [
          { value: '2010', label: 'Gegründet' },
          { value: '20,000 m²', label: 'Fabrikfläche' },
          { value: '500+', label: 'Personal' },
          { value: '100K+', label: 'Einheiten/Monat' },
          { value: '53+', label: 'Länder' },
          { value: '441+', label: 'Kunden' },
        ],
      },
      gallery: {
        images: [
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-production-line/',
            alt: 'Haushaltsgeräte-Produktionslinie — Präzisionsfertigung',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-factory-solar-assembly-line/',
            alt: 'Montagelinie für Solarausrüstung',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-assembly-line/',
            alt: 'Automatisierte Produktionsanlagen für Haushaltsgeräte',
          },
        ],
      },
      facilities: {
        heading: '🏭 HousePlus Produktionsanlagen',
        sub: 'Vier spezialisierte HousePlus Bereiche, jeweils optimiert für die Produktkategorie.',
        cards: [
          {
            icon: '☀️',
            name: 'Solarenergie-Produktionslinie',
            desc: 'Dedizierte Linien für die Laminierung von Solarmodulen, Wechselrichtermontage und Fertigung tragbarer Power-Stationen. Ausgestattet mit automatischem Zellstring-Schweißen und EL Imaging-Inspektion.',
          },
          {
            icon: '🏠',
            name: 'Haushaltsgeräte-Montage',
            desc: 'Moderne Montagelinien für Heißluftfritteusen, Induktionskochfelder, Wasserkocher und Toaster. Automatisierte Drehmomentkontrolle, 100% elektrische Sicherheitsprüfung und Falltest-Simulation für jede Charge.',
          },
          {
            icon: '📱',
            name: '3C-Elektronikwerkstatt',
            desc: 'SMT- und Wellenlötlinien für TWS-Ohrhörer, Smartwatches und tragbare Speichergeräte. ESD-geschützte Arbeitsplätze, automatisierte optische Inspektion (AOI) und Burn-in-Tests.',
          },
          {
            icon: '🔬',
            name: 'Qualitätssicherungslabor',
            desc: 'Voll ausgestattetes QA-Labor mit Umweltkammern (Temperatur, Feuchtigkeit, Vibration), Prüfgeräten für elektrische Sicherheit, EMC-Pre-Compliance-Ausrüstung und Unterstützung bei Audits durch Drittparteien.',
          },
        ],
      },
      process: {
        heading: '🏭 HousePlus Herstellungsprozess',
        sub: 'Vom Konzept bis zur Auslieferung — der transparente HousePlus Workflow.',
        steps: [
          {
            step: '01',
            title: 'Design & Engineering',
            desc: 'Unser F&E-Team überführt Kundenbriefings innerhalb von 15–20 Arbeitstagen in detaillierte Produktspezifikationen, 3D-Modelle und Prototypen.',
          },
          {
            step: '02',
            title: 'Materialbeschaffung',
            desc: 'Rohmaterialien und Komponenten werden ausschließlich von auditierten, zertifizierten Lieferanten bezogen. Wareneingangskontrolle (IQC) bei jeder Lieferung.',
          },
          {
            step: '03',
            title: 'Produktion',
            desc: 'Die Fertigung folgt arbeitsanweisungen gemäß ISO 9001. IPQC-Inprozesskontrollen sind in jede Montagestufe integriert.',
          },
          {
            step: '04',
            title: 'Qualitätsprüfung',
            desc: '100% Endprüfung umfasst Erscheinungsbild, Funktion, Sicherheit und Verpackungsintegrität, bevor eine Einheit zum Versand freigegeben wird.',
          },
          {
            step: '05',
            title: 'Verpackung & Kennzeichnung',
            desc: 'Produkte werden in kundenspezifischen oder Standardkartons mit kundenspezifizierter Markenführung, Barcodes und Konformitätskennzeichnungen für den Zielmarkt verpackt.',
          },
          {
            step: '06',
            title: 'Logistik & Export',
            desc: 'Wir koordinieren FOB-, CIF- und DDP-Sendungen per See-, Luft- oder Expresskurier, mit vollständiger Dokumentation einschließlich CO, packing list und commercial invoice.',
          },
        ],
      },
      qa: {
        heading: '🏭 HousePlus Qualitätssicherung',
        bullets: [
          'ISO 9001:2015 zertifiziertes Managementsystem',
          '100% Endprüfung vor dem Versand',
          'Umweltkammertests: −20°C bis +70°C, 95% RH',
          'Prüfung der elektrischen Sicherheit: hi-pot, Isolationswiderstand, Ableitstrom',
          'EMV-Pre-Compliance-Screening für CE- und FCC-Märkte',
          'Unterstützung bei Zertifizierungen durch Drittanbieter-Labore (SGS, TÜV, Intertek)',
        ],
        imgAlt: 'HousePlus Qualitätssicherungslabor für Haushaltsgeräte',
        imgTitle: 'HousePlus Qualitätssicherungslabor für Geräte',
      },
      cta: {
        heading: '🏭 Interessiert an einem HousePlus Werksaudit?',
        p: {
          a: '',
          b: ' heißt Vor-Ort-Besuche und Werksaudi ts durch Dritte willkommen. ',
          c: 'Kontaktieren Sie das ',
          d: ' Team, um eine Besichtigung zu arrangieren oder unsere neuesten Auditberichte anzufordern.',
        },
        contact: 'Kontakt aufnehmen',
        products: 'Produkte ansehen',
      },
    },
    fr: {
      hero: {
        badges: ['🏭 Usine HousePlus', 'Guangdong, Chine', '20,000 m²'],
        h1: '🏭 Où sont fabriqués les produits HousePlus',
        p: {
          a: 'L’usine ',
          b: ' intégrée verticalement à Guangdong regroupe quatre divisions de production dédiées, un atelier d’outillage interne et un laboratoire entièrement équipé — offrant à ',
          c: ' un contrôle total de la matière première au produit fini. ',
          e: 'C’est l’avantage ',
          d: '.',
        },
        stats: [
          { value: '20,000 m²', label: 'Surface de l’usine' },
          { value: '500+', label: 'Employés' },
          { value: '100K+', label: 'Unités/mois' },
        ],
        imgAlt: 'Ligne de production principale HousePlus',
        imgTitle: 'Ligne de production principale HousePlus',
      },
      geobar: {
        stats: [
          { value: '2010', label: 'Fondée' },
          { value: '20,000 m²', label: 'Surface de l’usine' },
          { value: '500+', label: 'Personnel' },
          { value: '100K+', label: 'Unités/mois' },
          { value: '53+', label: 'Pays' },
          { value: '441+', label: 'Clients' },
        ],
      },
      gallery: {
        images: [
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-production-line/',
            alt: 'Ligne de production d’électroménager — fabrication de précision',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-factory-solar-assembly-line/',
            alt: 'Ligne d’assemblage d’équipements solaires',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-assembly-line/',
            alt: 'Équipements de production automatisés pour l’électroménager',
          },
        ],
      },
      facilities: {
        heading: '🏭 Installations de production HousePlus',
        sub: 'Quatre divisions HousePlus spécialisées, chacune optimisée pour sa catégorie de produit.',
        cards: [
          {
            icon: '☀️',
            name: 'Ligne de production d’énergie solaire',
            desc: 'Lignes dédiées au laminage de panneaux solaires, à l’assemblage d’onduleurs et à la fabrication de stations d’énergie portables. Équipées de soudure automatisée de chaînes de cellules et d’inspection par imagerie EL.',
          },
          {
            icon: '🏠',
            name: 'Assemblage d’électroménager',
            desc: 'Lignes d’assemblage modernes pour friteuses à air, tables à induction, bouilloires et grille-pain. Contrôle de couple automatisé, tests de sécurité électrique à 100% et simulation de tests de chute pour chaque lot.',
          },
          {
            icon: '📱',
            name: 'Atelier d’électronique 3C',
            desc: 'Lignes SMT et soudure à la vague pour écouteurs TWS, montres connectées et dispositifs de stockage portables. Postes protégés ESD, inspection optique automatisée (AOI) et tests de burn-in.',
          },
          {
            icon: '🔬',
            name: 'Laboratoire d’assurance qualité',
            desc: 'Laboratoire QA entièrement équipé avec chambres environnementales (température, humidité, vibration), testeurs de sécurité électrique, équipements de pré-conformité EMC et support d’audit tiers.',
          },
        ],
      },
      process: {
        heading: '🏭 Processus de fabrication HousePlus',
        sub: 'Du concept à la livraison — un workflow HousePlus transparent.',
        steps: [
          {
            step: '01',
            title: 'Conception & ingénierie',
            desc: 'Notre équipe R&D transforme les briefs clients en spécifications détaillées, modèles 3D et prototypes en 15–20 jours ouvrés.',
          },
          {
            step: '02',
            title: 'Approvisionnement en matériaux',
            desc: 'Matières premières et composants sourcés exclusivement auprès de fournisseurs audités et certifiés. Contrôle à réception (IQC) à chaque livraison.',
          },
          {
            step: '03',
            title: 'Production',
            desc: 'Fabrication selon des instructions de travail alignées sur ISO 9001. Des points de contrôle en cours de process (IPQC) sont intégrés à chaque étape d’assemblage.',
          },
          {
            step: '04',
            title: 'Tests qualité',
            desc: 'Inspection à 100% des produits finis couvrant l’apparence, la fonction, la sécurité et l’intégrité de l’emballage avant toute expédition.',
          },
          {
            step: '05',
            title: 'Emballage & étiquetage',
            desc: 'Produits emballés en cartons personnalisés ou standard avec branding, codes-barres et étiquettes de conformité spécifiés par le client pour le marché cible.',
          },
          {
            step: '06',
            title: 'Logistique & export',
            desc: 'Coordination des expéditions FOB, CIF et DDP par mer, air ou coursier express, avec documentation complète incluant CO, packing list et commercial invoice.',
          },
        ],
      },
      qa: {
        heading: '🏭 Assurance qualité HousePlus',
        bullets: [
          'Système de management certifié ISO 9001:2015',
          'Inspection à 100% des produits finis avant expédition',
          'Essais en chambre environnementale : −20°C à +70°C, 95% RH',
          'Essais de sécurité électrique : hi-pot, résistance d’isolement, courant de fuite',
          'Pré-dépistage de conformité CEM pour les marchés CE et FCC',
          'Support de certification par laboratoires tiers (SGS, TÜV, Intertek)',
        ],
        imgAlt: 'Laboratoire d’assurance qualité des appareils ménagers HousePlus',
        imgTitle: 'Laboratoire QA des appareils HousePlus',
      },
      cta: {
        heading: '🏭 Intéressé par un audit d’usine HousePlus ?',
        p: {
          a: '',
          b: ' accueille les visites sur site et les audits d’usine par des tiers. ',
          c: 'Contactez l’équipe ',
          d: ' pour organiser une visite ou demander nos derniers rapports d’audit.',
        },
        contact: 'Nous contacter',
        products: 'Voir les produits',
      },
    },
    ar: {
      hero: {
        badges: ['🏭 مصنع HousePlus', 'غوانغدونغ، الصين', '20,000 m²'],
        h1: '🏭 حيث يتم تصنيع منتجات HousePlus',
        p: {
          a: 'مصنع ',
          b: ' المتكامل رأسياً في غوانغدونغ يضم أربع وحدات إنتاج مخصصة، وورشة تشغيل قوالب داخلية، ومختبراً مجهزاً بالكامل — ما يمنح ',
          c: ' سيطرة كاملة من المواد الخام إلى المنتج النهائي. ',
          e: 'هذه هي ميزة ',
          d: '.',
        },
        stats: [
          { value: '20,000 m²', label: 'مساحة المصنع' },
          { value: '500+', label: 'الموظفون' },
          { value: '100K+', label: 'وحدات/شهر' },
        ],
        imgAlt: 'خط الإنتاج الرئيسي لدى HousePlus',
        imgTitle: 'خط الإنتاج الرئيسي لدى HousePlus',
      },
      geobar: {
        stats: [
          { value: '2010', label: 'سنة التأسيس' },
          { value: '20,000 m²', label: 'مساحة المصنع' },
          { value: '500+', label: 'الطاقم' },
          { value: '100K+', label: 'وحدات/شهر' },
          { value: '53+', label: 'الدول' },
          { value: '441+', label: 'العملاء' },
        ],
      },
      gallery: {
        images: [
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-production-line/',
            alt: 'خط إنتاج الأجهزة المنزلية — تصنيع عالي الدقة',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-factory-solar-assembly-line/',
            alt: 'خط تجميع معدات الطاقة الشمسية',
          },
          {
            src: 'https://images.houseplus-ch.com/media/houseplus-factory-assembly-line/',
            alt: 'معدات إنتاج مؤتمتة للأجهزة المنزلية',
          },
        ],
      },
      facilities: {
        heading: '🏭 مرافق الإنتاج لدى HousePlus',
        sub: 'أربع وحدات متخصصة من HousePlus، كل منها مُحسَّن لفئة المنتج الخاصة بها.',
        cards: [
          {
            icon: '☀️',
            name: 'خط إنتاج الطاقة الشمسية',
            desc: 'خطوط مخصصة لصفّ الألواح الشمسية، وتجميع العاكسات، وتصنيع محطات الطاقة المحمولة. مزودة بلحام تلقائي لسلاسل الخلايا وفحص EL Imaging.',
          },
          {
            icon: '🏠',
            name: 'تجميع الأجهزة المنزلية',
            desc: 'خطوط تجميع حديثة لقلايات الهواء، ومواقد الحث، والغلايات، والمحامص. تحكم آلي في العزم، واختبارات سلامة كهربائية بنسبة 100%، ومحاكاة لاختبارات السقوط لكل دفعة.',
          },
          {
            icon: '📱',
            name: 'ورشة إلكترونيات 3C',
            desc: 'خطوط SMT واللحام بالموجة لسماعات TWS، والساعات الذكية، وأجهزة التخزين المحمولة. محطات عمل محمية ESD، وفحص بصري آلي (AOI)، واختبارات burn-in.',
          },
          {
            icon: '🔬',
            name: 'مختبر ضمان الجودة',
            desc: 'مختبر QA مجهز بالكامل مع غرف بيئية (حرارة، رطوبة، اهتزاز)، وأجهزة اختبار السلامة الكهربائية، ومعدات ما قبل المطابقة EMC، ودعم تدقيق من أطراف ثالثة.',
          },
        ],
      },
      process: {
        heading: '🏭 عملية التصنيع لدى HousePlus',
        sub: 'من الفكرة إلى التسليم — سير عمل HousePlus بشفافية.',
        steps: [
          {
            step: '01',
            title: 'التصميم والهندسة',
            desc: 'يقوم فريق البحث والتطوير لدينا بتحويل موجزات العملاء إلى مواصفات منتج مفصلة ونماذج ثلاثية الأبعاد وعينات أولية خلال 15–20 يوم عمل.',
          },
          {
            step: '02',
            title: 'توريد المواد',
            desc: 'يتم توريد المواد الخام والمكونات حصراً من موردين مدققين ومعتمدين. يتم إجراء فحص وارد (IQC) لكل تسليم.',
          },
          {
            step: '03',
            title: 'الإنتاج',
            desc: 'يتم التصنيع وفق تعليمات عمل متوافقة مع ISO 9001. تُدمَج نقاط تفتيش IPQC في كل مرحلة تجميع.',
          },
          {
            step: '04',
            title: 'اختبارات الجودة',
            desc: 'يشمل الفحص بنسبة 100% للمنتجات النهائية المظهر والوظيفة والسلامة وسلامة التغليف قبل السماح بالشحن.',
          },
          {
            step: '05',
            title: 'التغليف ووضع الملصقات',
            desc: 'يتم تغليف المنتجات في صناديق مخصصة أو قياسية مع العلامة التجارية وأكواد الباركود وتسميات المطابقة المحددة من العميل للسوق المستهدف.',
          },
          {
            step: '06',
            title: 'اللوجستيات والتصدير',
            desc: 'ننسق شحنات FOB وCIF وDDP بحراً أو جواً أو عبر البريد السريع، مع مستندات كاملة تشمل CO وpacking list وcommercial invoice.',
          },
        ],
      },
      qa: {
        heading: '🏭 ضمان الجودة لدى HousePlus',
        bullets: [
          'نظام إدارة معتمد وفق ISO 9001:2015',
          'فحص بنسبة 100% للمنتجات النهائية قبل الشحن',
          'اختبار الغرفة البيئية: −20°C إلى +70°C، 95% RH',
          'اختبارات السلامة الكهربائية: hi-pot، مقاومة العزل، تيار التسرب',
          'فحص ما قبل المطابقة EMC لأسواق CE وFCC',
          'دعم شهادات المختبرات الخارجية (SGS، TÜV، Intertek)',
        ],
        imgAlt: 'مختبر ضمان جودة الأجهزة المنزلية لدى HousePlus',
        imgTitle: 'مختبر ضمان جودة أجهزة HousePlus',
      },
      cta: {
        heading: '🏭 هل تهتم بإجراء تدقيق لمصنع HousePlus؟',
        p: {
          a: '',
          b: ' ترحّب بالزيارات الميدانية وتدقيقات المصانع من أطراف ثالثة. ',
          c: 'تواصل مع فريق ',
          d: ' لتنظيم جولة أو لطلب أحدث تقارير التدقيق لدينا.',
        },
        contact: 'تواصل معنا',
        products: 'عرض المنتجات',
      },
    },
  };

  const t = copy[(lang as Lang) in copy ? (lang as Lang) : 'en'];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://www.houseplus-ch.com/${lang}` },
    { name: 'Factory', url: `https://www.houseplus-ch.com/${lang}/factory` },
  ]);

  return (
    <>
      <SEOHead schemas={[organizationSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} slug="factory" />

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-800 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {t.hero.badges.map((badge, i) => (
                    <span key={i} className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
                  {t.hero.h1}
                </h1>
                <p className="text-slate-300 leading-relaxed text-lg mb-6">
                  {t.hero.p.a}
                  <strong>HousePlus</strong>
                  {t.hero.p.b}
                  <strong>HousePlus</strong>
                  {t.hero.p.c}
                  {t.hero.p.e}
                  <strong>HousePlus</strong>
                  {t.hero.p.d}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {t.hero.stats.map((s, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-xl font-black">{s.value}</p>
                      <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.houseplus-ch.com/media/houseplus-articles-service-factory-assembly-workers-b2b-guide/"
                  alt={t.hero.imgAlt}
                  title={t.hero.imgTitle}
                  className="object-cover"
                  decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* GEO Data Bar */}
        <section className="py-10 px-4 bg-blue-700">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-white">
              {t.geobar.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl font-black mb-1">{stat.value}</p>
                  <p className="text-blue-200 text-xs font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-12 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {t.gallery.images.map((img, i) => (
                <div key={i} className="relative h-60 rounded-2xl overflow-hidden shadow-md border border-slate-100">
                  <img
                    src={img.src}
                    alt={img.alt}
                    title={img.alt}
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Production Facilities */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{t.facilities.heading}</h2>
              <p className="text-slate-500 max-w-xl mx-auto">{t.facilities.sub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.facilities.cards.map((f, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{f.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{t.process.heading}</h2>
              <p className="text-slate-500 max-w-xl mx-auto">{t.process.sub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.process.steps.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                  <div className="text-3xl font-black text-blue-200 mb-3">{s.step}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="https://images.houseplus-ch.com/media/houseplus-factory-factory-appliance-qc-lab/"
                  alt={t.qa.imgAlt}
                  title={t.qa.imgTitle}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">{t.qa.heading}</h2>
                <div className="space-y-4">
                  {t.qa.bullets.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <p className="text-slate-700 text-sm">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">{t.cta.heading}</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              <strong>HousePlus</strong>
              {t.cta.p.b}
              {t.cta.p.c}
              <strong>HousePlus</strong>
              {t.cta.p.d}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                {t.cta.contact}
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                {t.cta.products}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}