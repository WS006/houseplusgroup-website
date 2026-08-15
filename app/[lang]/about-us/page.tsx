import { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema-generator';
import Breadcrumb from '@/components/Breadcrumb';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'About HousePlus — Vertically Integrated Manufacturer Since 2010',
    es: 'Acerca de HousePlus — Fabricante Integrado desde 2010',
    de: 'Über HousePlus — Vertikal Integrierter Hersteller seit 2010',
    fr: 'À Propos de HousePlus — Fabricant Intégré depuis 2010',
    ar: 'عن هاوس بلس — مصنع متكامل منذ عام ٢٠١٠',
  };

  const descriptions: Record<string, string> = {
    en: 'HousePlus is a vertically integrated manufacturer founded in 2010 with a 20,000 m² ISO 9001 certified factory, 441+ wholesale clients in 53+ countries.',
    es: 'HousePlus es un fabricante integrado fundado en 2010 con fábrica de 20.000 m² y certificación ISO 9001. Más de 441 clientes mayoristas en 53 países.',
    de: 'HousePlus ist ein vertikal integrierter Hersteller seit 2010 mit 20.000 m² ISO 9001-zertifizierter Fabrik und 441+ Großhandelskunden in 53+ Ländern.',
    fr: 'HousePlus est un fabricant intégré depuis 2010, usine de 20 000 m² certifiée ISO 9001. Plus de 441 clients grossistes dans 53 pays.',
    ar: 'هاوس بلس هي شركة تصنيع متكاملة تأسست عام ٢٠١٠ بمصنع مساحته ٢٠٬٠٠٠ م² حاصل على شهادة ISO 9001 وأكثر من ٤٤١ عميل جملة في ٥٣ دولة.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles['en'],
    description: descriptions[lang] || descriptions['en'],
    keywords: ['about HousePlus', 'manufacturer', 'solar systems', 'home appliances', '3C electronics', 'OEM ODM', 'wholesale'],
    url: `/${lang}/about-us`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Vertically integrated manufacturer of solar energy systems, home appliances and 3C electronics.',
    url: `https://www.houseplus-ch.com/${lang}/about-us`,
    lang,
    type: 'Organization',
  });

  const webSiteSchema = generateWebSiteSchema(lang);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `https://www.houseplus-ch.com/${lang}/about-us#webpage`,
    url: `https://www.houseplus-ch.com/${lang}/about-us`,
    name: 'About HousePlus',
    description: 'HousePlus is a vertically integrated manufacturer founded in 2010 with a 20,000 m² ISO 9001 certified factory.',
    inLanguage: lang,
    isPartOf: { '@id': 'https://www.houseplus-ch.com/#website' },
    about: { '@id': 'https://www.houseplus-ch.com/#organization' },
  };

  const copy = {
    en: {
      hero: {
        badges: ['🏭 HousePlus — Established 2010', 'Guangdong, China', 'ISO 9001 Certified'],
        title: '🏭 HousePlus: Built on Manufacturing Excellence',
        introParts: [
          <strong key="a">HousePlus Group</strong>,
          ' is a vertically integrated manufacturer specialising in solar energy systems, home appliances and 3C electronics. Over 16 years, ',
          <strong key="b">HousePlus</strong>,
          ' has grown from a single production line into a multi-division enterprise trusted by wholesale buyers across six continents. As a professional ',
          <strong key="c">HousePlus</strong>,
          ' manufacturer, we deliver OEM/ODM solutions with international certifications.',
        ],
        keyFactsTitle: 'Key B2B Facts',
        keyFacts: [
          'Founded 2010',
          '20,000 m² Factory',
          '16 Years Experience',
          '53+ Countries',
          '441+ Wholesale Clients',
          '12-Month Warranty',
          'CE FCC RoHS ISO9001 IEC',
          'MOQ 100 pcs',
          '20–35 Day Lead Time',
        ],
        factoryNoteParts: [
          'The ',
          <strong key="d">HousePlus</strong>,
          ' factory spans 20,000 m² in Guangdong and houses dedicated assembly lines for each product category, an in-house tooling workshop, and a fully equipped laboratory — giving ',
          <strong key="e">HousePlus</strong>,
          ' complete control from raw material to finished product. This is why ',
          <strong key="f">HousePlus</strong>,
          ' is trusted by 441+ wholesale clients worldwide.',
        ],
        imageAlt:
          'HousePlus Group Factory - Manufacturing solar energy systems, home appliances and 3C electronics in Guangdong, China since 2010',
        imageTitle: 'HousePlus Group Factory — Guangdong, China',
        imageCaption: 'HousePlus Group Factory — Guangdong, China',
      },
      stats: [
        { value: '16+', label: 'Years in Manufacturing' },
        { value: '441+', label: 'Wholesale Clients' },
        { value: '53+', label: 'Countries Served' },
        { value: '1.2M+', label: 'Units / Year' },
      ],
      missionVision: {
        missionIcon: '🎯',
        missionTitle: 'Our Mission',
        missionText:
          'To manufacture reliable, certified products that empower wholesale buyers to build profitable businesses — delivering consistent, competitive pricing and responsive support at every stage of the partnership.',
        visionIcon: '🔭',
        visionTitle: 'Our Vision',
        visionText:
          'To be the preferred manufacturing partner for solar energy, home appliances and 3C electronics globally — recognised for product innovation, supply chain transparency and the highest standards of customer service.',
      },
      values: {
        heading: '🏭 What Drives HousePlus',
        subheadingParts: [
          'Four principles guide every ',
          <strong key="vs1">HousePlus</strong>,
          ' decision — from product design to after-sales support. This is the ',
          <strong key="vs2">HousePlus</strong>,
          ' difference.',
        ],
        cards: [
          {
            icon: '🔬',
            title: 'Precision Manufacturing',
            desc:
              'Every product leaves our factory only after passing multi-stage inspections aligned with international standards. We invest continuously in automated testing equipment and process improvement.',
          },
          {
            icon: '🌱',
            title: 'Sustainable Innovation',
            desc:
              'Our R&D team dedicates over 8% of annual revenue to developing energy-efficient products. From solar panels to low-power appliances, sustainability is built into our design philosophy.',
          },
          {
            icon: '🤝',
            title: 'Partnership-First Approach',
            desc:
              'We treat every wholesale buyer as a long-term partner. Dedicated account managers, flexible MOQ, and responsive after-sales support ensure you can build your business with confidence.',
          },
          {
            icon: '🌍',
            title: 'Global Compliance',
            desc:
              'Our products are certified for key markets worldwide — CE and RoHS for Europe, FCC for North America, and SASO for the Middle East. We handle documentation to streamline your import process.',
          },
        ],
      },
      timeline: {
        heading: '🏭 The HousePlus Journey',
        subheadingParts: ['Key milestones in the ', <strong key="t">HousePlus</strong>, ' manufacturing story since 2010.'],
        items: [
          { year: '2010', event: 'HousePlus founded in Guangdong, China, with an initial focus on home appliance OEM production.' },
          { year: '2013', event: 'Expanded into solar energy products; first export shipment to European distributors.' },
          { year: '2016', event: 'Obtained CE, RoHS and ISO 9001 certifications; opened dedicated 3C electronics division.' },
          { year: '2019', event: 'Reached 441+ wholesale clients across 53+ countries; moved to 20,000 m² factory.' },
          { year: '2022', event: 'Launched LiFePO4 battery and portable power station product lines for off-grid markets.' },
          { year: '2024', event: 'Serving 441+ wholesale clients in 53+ countries; annual production capacity exceeds 1.2M+ units.' },
        ],
      },
      capabilities: {
        heading: '🏭 HousePlus Manufacturing Capabilities',
        bullets: [
          'Dedicated assembly lines for solar, appliances and 3C electronics',
          'In-house tooling and mould workshop for rapid prototyping',
          'Automated SMT and wave-soldering production for electronics',
          'Full-cycle lab: incoming inspection, in-process QC, final testing',
          'OEM/ODM services: custom design, private-label branding, bespoke packaging',
          'Monthly capacity: 100,000+ units across all product categories',
        ],
        imageAlt:
          'HousePlus automated manufacturing facility - Professional production of solar energy systems, home appliances and 3C electronics with control',
        imageTitle: 'HousePlus Automated Manufacturing — Quality Control & Production Excellence',
        imageCaption: 'HousePlus Automated Manufacturing — Quality Control & Production Excellence',
      },
      cta: {
        heading: '🏭 Ready to Partner with HousePlus?',
        textParts: [
          'Whether you are sourcing for retail distribution, private-label branding or large-scale project supply, the ',
          <strong key="c1">HousePlus</strong>,
          ' team is ready to discuss your requirements. As a professional ',
          <strong key="c2">HousePlus</strong>,
          ' manufacturer with 16+ years of experience, we deliver and reliability.',
        ],
        buttons: { contact: 'Get in Touch', products: 'Browse Products' },
      },
    },
    es: {
      hero: {
        badges: ['🏭 HousePlus — Establecida en 2010', 'Guangdong, China', 'Certificada ISO 9001'],
        title: '🏭 HousePlus: Construida sobre la excelencia manufacturera',
        introParts: [
          <strong key="a">HousePlus Group</strong>,
          ' es un fabricante verticalmente integrado especializado en sistemas de energía solar, electrodomésticos y electrónica 3C. Durante 16 años, ',
          <strong key="b">HousePlus</strong>,
          ' ha pasado de una única línea de producción a una empresa con múltiples divisiones en la que confían compradores mayoristas en seis continentes. Como fabricante profesional de ',
          <strong key="c">HousePlus</strong>,
          ', ofrecemos soluciones OEM/ODM con certificaciones internacionales.',
        ],
        keyFactsTitle: 'Datos clave B2B',
        keyFacts: [
          'Fundada en 2010',
          'Fábrica de 20,000 m²',
          '16 años de experiencia',
          '53+ países',
          '441+ clientes mayoristas',
          'Garantía de 12 meses',
          'CE FCC RoHS ISO9001 IEC',
          'MOQ 100 pcs',
          'Plazo de producción de 20–35 días',
        ],
        factoryNoteParts: [
          'La fábrica de ',
          <strong key="d">HousePlus</strong>,
          ' abarca 20,000 m² en Guangdong y cuenta con líneas de ensamblaje dedicadas para cada categoría de producto, un taller interno de herramentales y un laboratorio totalmente equipado — lo que otorga a ',
          <strong key="e">HousePlus</strong>,
          ' control total desde la materia prima hasta el producto terminado. Por eso ',
          <strong key="f">HousePlus</strong>,
          ' es la elección de 441+ clientes mayoristas en todo el mundo.',
        ],
        imageAlt:
          'Fábrica del Grupo HousePlus - Fabricación de sistemas de energía solar, electrodomésticos y electrónica 3C en Guangdong, China desde 2010',
        imageTitle: 'Fábrica del Grupo HousePlus — Guangdong, China',
        imageCaption: 'Fábrica del Grupo HousePlus — Guangdong, China',
      },
      stats: [
        { value: '16+', label: 'Años en fabricación' },
        { value: '441+', label: 'Clientes mayoristas' },
        { value: '53+', label: 'Países atendidos' },
        { value: '1.2M+', label: 'Unidades / año' },
      ],
      missionVision: {
        missionIcon: '🎯',
        missionTitle: 'Nuestra misión',
        missionText:
          'Fabricar productos confiables y certificados que permitan a los compradores mayoristas construir negocios rentables — ofreciendo precios consistentes y competitivos y soporte ágil en cada etapa de la colaboración.',
        visionIcon: '🔭',
        visionTitle: 'Nuestra visión',
        visionText:
          'Ser el socio de fabricación preferido para energía solar, electrodomésticos y electrónica 3C a nivel global — reconocido por la innovación de producto, la transparencia en la cadena de suministro y los más altos estándares de servicio al cliente.',
      },
      values: {
        heading: '🏭 Qué impulsa a HousePlus',
        subheadingParts: [
          'Cuatro principios guían cada decisión de ',
          <strong key="vs1">HousePlus</strong>,
          ' — desde el diseño del producto hasta el soporte posventa. Esta es la diferencia ',
          <strong key="vs2">HousePlus</strong>,
          '.',
        ],
        cards: [
          {
            icon: '🔬',
            title: 'Manufactura de precisión',
            desc:
              'Cada producto sale de nuestra fábrica solo después de superar inspecciones de múltiples etapas alineadas con normas internacionales. Invertimos continuamente en equipos de prueba automatizados y en la mejora de procesos.',
          },
          {
            icon: '🌱',
            title: 'Innovación sostenible',
            desc:
              'Nuestro equipo de I+D destina más del 8% de los ingresos anuales al desarrollo de productos de alta eficiencia energética. Desde paneles solares hasta electrodomésticos de bajo consumo, la sostenibilidad está integrada en nuestra filosofía de diseño.',
          },
          {
            icon: '🤝',
            title: 'Enfoque de asociación primero',
            desc:
              'Tratamos a cada comprador mayorista como un socio a largo plazo. Gestores de cuenta dedicados, MOQ flexible y soporte posventa ágil garantizan que pueda hacer crecer su negocio con confianza.',
          },
          {
            icon: '🌍',
            title: 'Cumplimiento global',
            desc:
              'Nuestros productos están certificados para los principales mercados del mundo — CE y RoHS para Europa, FCC para Norteamérica, y SASO para Medio Oriente. Gestionamos la documentación para agilizar su proceso de importación.',
          },
        ],
      },
      timeline: {
        heading: '🏭 El recorrido de HousePlus',
        subheadingParts: ['Hitos clave en la historia manufacturera de ', <strong key="t">HousePlus</strong>, ' desde 2010.'],
        items: [
          { year: '2010', event: 'HousePlus fundada en Guangdong, China, con enfoque inicial en producción OEM de electrodomésticos.' },
          { year: '2013', event: 'Expansión a productos de energía solar; primer envío de exportación a distribuidores europeos.' },
          { year: '2016', event: 'Obtención de certificaciones CE, RoHS e ISO 9001; apertura de división dedicada de electrónica 3C.' },
          { year: '2019', event: 'Alcanzó 441+ clientes mayoristas en 53+ países; traslado a fábrica de 20,000 m².' },
          { year: '2022', event: 'Lanzamiento de líneas de baterías LiFePO4 y estaciones de energía portátiles para mercados fuera de red.' },
          { year: '2024', event: 'Atendiendo a 441+ clientes mayoristas en 53+ países; la capacidad de producción anual supera 1.2M+ unidades.' },
        ],
      },
      capabilities: {
        heading: '🏭 Capacidades de manufactura de HousePlus',
        bullets: [
          'Líneas de ensamblaje dedicadas para solar, electrodomésticos y electrónica 3C',
          'Taller interno de herramentales y moldes para prototipado rápido',
          'Producción automatizada SMT y de soldadura por ola para electrónica',
          'Laboratorio de ciclo completo: inspección de entrada, QC en proceso, pruebas finales',
          'Servicios OEM/ODM: diseño a medida, marca de etiqueta privada, empaques personalizados',
          'Capacidad mensual: 100,000+ unidades en todas las categorías de producto',
        ],
        imageAlt:
          'Instalación de fabricación automatizada de HousePlus - Producción profesional de sistemas de energía solar, electrodomésticos y electrónica 3C con control',
        imageTitle: 'Fabricación automatizada de HousePlus — Control de calidad y excelencia en producción',
        imageCaption: 'Fabricación automatizada de HousePlus — Control de calidad y excelencia en producción',
      },
      cta: {
        heading: '🏭 ¿Listo para asociarse con HousePlus?',
        textParts: [
          'Ya sea que adquiera para distribución minorista, marca de etiqueta privada o suministro para proyectos a gran escala, el equipo de ',
          <strong key="c1">HousePlus</strong>,
          ' está listo para analizar sus requisitos. Como fabricante profesional de ',
          <strong key="c2">HousePlus</strong>,
          ' con 16+ años de experiencia, cumplimos y aportamos fiabilidad.',
        ],
        buttons: { contact: 'Póngase en contacto', products: 'Explorar productos' },
      },
    },
    de: {
      hero: {
        badges: ['🏭 HousePlus — Gegründet 2010', 'Guangdong, China', 'ISO 9001 zertifiziert'],
        title: '🏭 HousePlus: Aufgebaut auf Fertigungsexzellenz',
        introParts: [
          <strong key="a">HousePlus Group</strong>,
          ' ist ein vertikal integrierter Hersteller, spezialisiert auf Solarsysteme, Haushaltsgeräte und 3C‑Elektronik. Seit über 16 Jahren ist ',
          <strong key="b">HousePlus</strong>,
          ' von einer einzelnen Fertigungslinie zu einem Unternehmen mit mehreren Divisionen gewachsen, dem Großhandelskunden auf sechs Kontinenten vertrauen. Als professioneller ',
          <strong key="c">HousePlus</strong>,
          '‑Hersteller liefern wir OEM/ODM‑Lösungen mit internationalen Zertifizierungen.',
        ],
        keyFactsTitle: 'Wichtige B2B‑Fakten',
        keyFacts: [
          'Gegründet 2010',
          '20,000 m² Fabrik',
          '16 Jahre Erfahrung',
          '53+ Länder',
          '441+ Großhandelskunden',
          '12‑Monats‑Garantie',
          'CE FCC RoHS ISO9001 IEC',
          'MOQ 100 pcs',
          '20–35 Tage Lieferzeit',
        ],
        factoryNoteParts: [
          'Die ',
          <strong key="d">HousePlus</strong>,
          '‑Fabrik umfasst 20,000 m² in Guangdong und verfügt über eigene Montagelinien für jede Produktkategorie, eine interne Werkzeugbau‑Werkstatt sowie ein voll ausgestattetes Labor — so hat ',
          <strong key="e">HousePlus</strong>,
          ' die vollständige Kontrolle vom Rohmaterial bis zum fertigen Produkt. Deshalb vertrauen 441+ Großhandelskunden weltweit auf ',
          <strong key="f">HousePlus</strong>,
          '.',
        ],
        imageAlt:
          'HousePlus Group Fabrik – Fertigung von Solarsystemen, Haushaltsgeräten und 3C‑Elektronik in Guangdong, China seit 2010',
        imageTitle: 'HousePlus Group Fabrik — Guangdong, China',
        imageCaption: 'HousePlus Group Fabrik — Guangdong, China',
      },
      stats: [
        { value: '16+', label: 'Jahre in der Fertigung' },
        { value: '441+', label: 'Großhandelskunden' },
        { value: '53+', label: 'Bediente Länder' },
        { value: '1.2M+', label: 'Einheiten / Jahr' },
      ],
      missionVision: {
        missionIcon: '🎯',
        missionTitle: 'Unsere Mission',
        missionText:
          'Zuverlässige, zertifizierte Produkte zu fertigen, die Großhandelskunden befähigen, profitable Geschäfte aufzubauen — mit gleichbleibend wettbewerbsfähigen Preisen und reaktionsschneller Unterstützung in jeder Phase der Partnerschaft.',
        visionIcon: '🔭',
        visionTitle: 'Unsere Vision',
        visionText:
          'Der bevorzugte Fertigungspartner für Solarenergie, Haushaltsgeräte und 3C‑Elektronik weltweit zu sein — anerkannt für Produktinnovation, Transparenz in der Lieferkette und höchste Standards im Kundenservice.',
      },
      values: {
        heading: '🏭 Was HousePlus antreibt',
        subheadingParts: [
          'Vier Prinzipien leiten jede ',
          <strong key="vs1">HousePlus</strong>,
          '‑Entscheidung — vom Produktdesign bis zum After‑Sales‑Support. Das ist der ',
          <strong key="vs2">HousePlus</strong>,
          '‑Unterschied.',
        ],
        cards: [
          {
            icon: '🔬',
            title: 'Präzisionsfertigung',
            desc:
              'Jedes Produkt verlässt unser Werk erst nach mehrstufigen Prüfungen gemäß internationalen Standards. Wir investieren kontinuierlich in automatisierte Testausrüstung und Prozessverbesserung.',
          },
          {
            icon: '🌱',
            title: 'Nachhaltige Innovation',
            desc:
              'Unser F&E‑Team widmet über 8% des Jahresumsatzes der Entwicklung energieeffizienter Produkte. Von Solarmodulen bis zu stromsparenden Geräten ist Nachhaltigkeit Teil unserer Designphilosophie.',
          },
          {
            icon: '🤝',
            title: 'Partnerschaft an erster Stelle',
            desc:
              'Wir behandeln jeden Großhandelskäufer als langfristigen Partner. Dedizierte Account‑Manager, flexible MOQ und schneller After‑Sales‑Support stellen sicher, dass Sie Ihr Geschäft mit Zuversicht ausbauen können.',
          },
          {
            icon: '🌍',
            title: 'Globale Konformität',
            desc:
              'Unsere Produkte sind für Schlüsselmärkte weltweit zertifiziert — CE und RoHS für Europa, FCC für Nordamerika und SASO für den Nahen Osten. Wir kümmern uns um die Dokumentation, um Ihren Import zu vereinfachen.',
          },
        ],
      },
      timeline: {
        heading: '🏭 Die HousePlus‑Reise',
        subheadingParts: ['Zentrale Meilensteine in der ', <strong key="t">HousePlus</strong>, '‑Fertigungsgeschichte seit 2010.'],
        items: [
          { year: '2010', event: 'HousePlus in Guangdong, China gegründet; anfänglicher Fokus auf OEM‑Produktion von Haushaltsgeräten.' },
          { year: '2013', event: 'Einstieg in Solarprodukte; erste Exportlieferung an europäische Distributoren.' },
          { year: '2016', event: 'CE‑, RoHS‑ und ISO 9001‑Zertifizierungen erhalten; Einrichtung einer eigenen 3C‑Elektronik‑Division.' },
          { year: '2019', event: '441+ Großhandelskunden in 53+ Ländern erreicht; Umzug in eine 20,000 m² Fabrik.' },
          { year: '2022', event: 'Einführung von LiFePO4‑Batterien und tragbaren Power‑Station‑Produktlinien für Off‑Grid‑Märkte.' },
          { year: '2024', event: 'Betreuung von 441+ Großhandelskunden in 53+ Ländern; jährliche Produktionskapazität übersteigt 1.2M+ Einheiten.' },
        ],
      },
      capabilities: {
        heading: '🏭 HousePlus Fertigungskapazitäten',
        bullets: [
          'Eigene Montagelinien für Solar, Geräte und 3C‑Elektronik',
          'Interne Werkzeug‑ und Formenwerkstatt für schnelle Prototypen',
          'Automatisierte SMT‑ und Wellenlöt‑Fertigung für Elektronik',
          'Labor für den Vollzyklus: Wareneingangsprüfung, In‑Process‑QC, Endtests',
          'OEM/ODM‑Services: kundenspezifisches Design, Private‑Label‑Branding, maßgeschneiderte Verpackung',
          'Monatliche Kapazität: 100,000+ Einheiten über alle Produktkategorien',
        ],
        imageAlt:
          'Automatisierte Fertigungsanlage von HousePlus – Professionelle Produktion von Solarsystemen, Haushaltsgeräten und 3C‑Elektronik mit Kontrolle',
        imageTitle: 'HousePlus automatisierte Fertigung — Qualitätskontrolle & Produktionsexzellenz',
        imageCaption: 'HousePlus automatisierte Fertigung — Qualitätskontrolle & Produktionsexzellenz',
      },
      cta: {
        heading: '🏭 Bereit für eine Partnerschaft mit HousePlus?',
        textParts: [
          'Ob für den Einzelhandelsvertrieb, Private‑Label‑Branding oder die Belieferung großer Projekte — das ',
          <strong key="c1">HousePlus</strong>,
          '‑Team ist bereit, Ihre Anforderungen zu besprechen. Als professioneller ',
          <strong key="c2">HousePlus</strong>,
          '‑Hersteller mit 16+ Jahren Erfahrung liefern wir und bieten Zuverlässigkeit.',
        ],
        buttons: { contact: 'Kontakt aufnehmen', products: 'Produkte ansehen' },
      },
    },
    fr: {
      hero: {
        badges: ['🏭 HousePlus — Établie en 2010', 'Guangdong, Chine', 'Certifiée ISO 9001'],
        title: '🏭 HousePlus : fondée sur l’excellence industrielle',
        introParts: [
          <strong key="a">HousePlus Group</strong>,
          ' est un fabricant intégré verticalement, spécialisé dans les systèmes d’énergie solaire, les appareils électroménagers et l’électronique 3C. Depuis plus de 16 ans, ',
          <strong key="b">HousePlus</strong>,
          ' est passée d’une seule ligne de production à une entreprise multi‑divisions, reconnue par des acheteurs grossistes sur six continents. En tant que fabricant ',
          <strong key="c">HousePlus</strong>,
          ' professionnel, nous fournissons des solutions OEM/ODM avec des certifications internationales.',
        ],
        keyFactsTitle: 'Principaux faits B2B',
        keyFacts: [
          'Fondée en 2010',
          'Usine de 20,000 m²',
          '16 ans d’expérience',
          '53+ pays',
          '441+ clients grossistes',
          'Garantie de 12 mois',
          'CE FCC RoHS ISO9001 IEC',
          'MOQ 100 pcs',
          'Délai de production de 20–35 jours',
        ],
        factoryNoteParts: [
          'L’usine ',
          <strong key="d">HousePlus</strong>,
          ' s’étend sur 20,000 m² à Guangdong et comprend des lignes d’assemblage dédiées par catégorie de produit, un atelier d’outillage interne et un laboratoire entièrement équipé — offrant à ',
          <strong key="e">HousePlus</strong>,
          ' un contrôle complet, de la matière première au produit fini. C’est pourquoi ',
          <strong key="f">HousePlus</strong>,
          ' est digne de confiance auprès de 441+ clients grossistes dans le monde.',
        ],
        imageAlt:
          'Usine du groupe HousePlus - Fabrication de systèmes d’énergie solaire, d’appareils électroménagers et d’électronique 3C à Guangdong, Chine depuis 2010',
        imageTitle: 'Usine du groupe HousePlus — Guangdong, Chine',
        imageCaption: 'Usine du groupe HousePlus — Guangdong, Chine',
      },
      stats: [
        { value: '16+', label: 'Années dans l’industrie' },
        { value: '441+', label: 'Clients grossistes' },
        { value: '53+', label: 'Pays desservis' },
        { value: '1.2M+', label: 'Unités / an' },
      ],
      missionVision: {
        missionIcon: '🎯',
        missionTitle: 'Notre mission',
        missionText:
          'Fabriquer des produits fiables et certifiés qui permettent aux acheteurs grossistes de développer des entreprises rentables — avec des prix réguliers et compétitifs et un support réactif à chaque étape du partenariat.',
        visionIcon: '🔭',
        visionTitle: 'Notre vision',
        visionText:
          'Devenir le partenaire industriel de référence pour l’énergie solaire, l’électroménager et l’électronique 3C dans le monde — reconnu pour l’innovation produit, la transparence de la chaîne d’approvisionnement et les plus hauts standards de service client.',
      },
      values: {
        heading: '🏭 Ce qui motive HousePlus',
        subheadingParts: [
          'Quatre principes guident chaque décision chez ',
          <strong key="vs1">HousePlus</strong>,
          ' — du design produit au support après‑vente. C’est la différence ',
          <strong key="vs2">HousePlus</strong>,
          '.',
        ],
        cards: [
          {
            icon: '🔬',
            title: 'Fabrication de précision',
            desc:
              'Chaque produit ne quitte notre usine qu’après avoir passé des contrôles en plusieurs étapes, conformes aux normes internationales. Nous investissons en continu dans des équipements de test automatisés et l’amélioration des processus.',
          },
          {
            icon: '🌱',
            title: 'Innovation durable',
            desc:
              'Notre équipe R&D consacre plus de 8% des revenus annuels au développement de produits économes en énergie. Des panneaux solaires aux appareils basse consommation, la durabilité est intégrée à notre philosophie de conception.',
          },
          {
            icon: '🤝',
            title: 'Approche partenariale prioritaire',
            desc:
              'Nous considérons chaque acheteur grossiste comme un partenaire de long terme. Des gestionnaires de compte dédiés, un MOQ flexible et un support après‑vente réactif vous permettent de développer votre activité en toute confiance.',
          },
          {
            icon: '🌍',
            title: 'Conformité mondiale',
            desc:
              'Nos produits sont certifiés pour les principaux marchés mondiaux — CE et RoHS pour l’Europe, FCC pour l’Amérique du Nord et SASO pour le Moyen‑Orient. Nous gérons la documentation pour simplifier votre processus d’importation.',
          },
        ],
      },
      timeline: {
        heading: '🏭 Le parcours HousePlus',
        subheadingParts: ['Moments clés de l’histoire manufacturière de ', <strong key="t">HousePlus</strong>, ' depuis 2010.'],
        items: [
          { year: '2010', event: 'Création de HousePlus à Guangdong, Chine, avec un premier focus sur la production OEM d’appareils électroménagers.' },
          { year: '2013', event: 'Extension aux produits solaires ; premier envoi d’exportation vers des distributeurs européens.' },
          { year: '2016', event: 'Obtention des certifications CE, RoHS et ISO 9001 ; ouverture d’une division dédiée à l’électronique 3C.' },
          { year: '2019', event: 'Atteint 441+ clients grossistes dans 53+ pays ; déménagement vers une usine de 20,000 m².' },
          { year: '2022', event: 'Lancement des gammes de batteries LiFePO4 et de stations d’énergie portables pour les marchés hors réseau.' },
          { year: '2024', event: 'Au service de 441+ clients grossistes dans 53+ pays ; la capacité de production annuelle dépasse 1.2M+ unités.' },
        ],
      },
      capabilities: {
        heading: '🏭 Capacités industrielles de HousePlus',
        bullets: [
          'Lignes d’assemblage dédiées pour le solaire, l’électroménager et l’électronique 3C',
          'Atelier interne d’outillage et de moulage pour le prototypage rapide',
          'Production automatisée SMT et à soudure à la vague pour l’électronique',
          'Laboratoire cycle complet : contrôle à réception, QC en cours, tests finaux',
          'Services OEM/ODM : conception sur mesure, marque de distributeur, emballages personnalisés',
          'Capacité mensuelle : 100,000+ unités toutes catégories confondues',
        ],
        imageAlt:
          'Site de fabrication automatisée HousePlus - Production professionnelle de systèmes d’énergie solaire, d’appareils électroménagers et d’électronique 3C avec contrôle',
        imageTitle: 'Fabrication automatisée HousePlus — Contrôle qualité et excellence de production',
        imageCaption: 'Fabrication automatisée HousePlus — Contrôle qualité et excellence de production',
      },
      cta: {
        heading: '🏭 Prêt à devenir partenaire de HousePlus ?',
        textParts: [
          'Que vous achetiez pour la distribution au détail, une marque de distributeur ou l’approvisionnement de grands projets, l’équipe ',
          <strong key="c1">HousePlus</strong>,
          ' est prête à étudier vos besoins. En tant que fabricant ',
          <strong key="c2">HousePlus</strong>,
          ' professionnel avec 16+ ans d’expérience, nous livrons et apportons de la fiabilité.',
        ],
        buttons: { contact: 'Nous contacter', products: 'Parcourir les produits' },
      },
    },
    ar: {
      hero: {
        badges: ['🏭 هاوس بلس — تأسست 2010', 'غوانغدونغ، الصين', 'حاصلة على ISO 9001'],
        title: '🏭 هاوس بلس: مبنية على تميّز التصنيع',
        introParts: [
          <strong key="a">مجموعة هاوس بلس</strong>,
          ' مصنع متكامل عمودياً متخصص في أنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C. وعلى مدى 16 عاماً، نمت ',
          <strong key="b">هاوس بلس</strong>,
          ' من خط إنتاج واحد إلى مؤسسة متعددة الأقسام تحظى بثقة المشترين بالجملة عبر ست قارات. وبصفتنا مُصنّع ',
          <strong key="c">هاوس بلس</strong>,
          ' محترفاً، نقدّم حلول OEM/ODM مع شهادات دولية.',
        ],
        keyFactsTitle: 'حقائق أساسية B2B',
        keyFacts: [
          'تأسست 2010',
          'مصنع بمساحة 20,000 m²',
          'خبرة 16 سنة',
          '53+ دولة',
          '441+ عميل جملة',
          'ضمان لمدة 12 شهراً',
          'CE FCC RoHS ISO9001 IEC',
          'MOQ 100 pcs',
          'مهلة توريد 20–35 يوماً',
        ],
        factoryNoteParts: [
          'تمتد مصنع ',
          <strong key="d">هاوس بلس</strong>,
          ' على مساحة 20,000 m² في غوانغدونغ ويضم خطوط تجميع مخصصة لكل فئة من المنتجات، وورشة أدوات داخلية، ومختبراً مجهزاً بالكامل — ما يمنح ',
          <strong key="e">هاوس بلس</strong>,
          ' تحكماً كاملاً من المواد الخام إلى المنتج النهائي. لهذا تُوثَق ',
          <strong key="f">هاوس بلس</strong>,
          ' من قبل 441+ عميلاً بالجملة حول العالم.',
        ],
        imageAlt:
          'مصنع مجموعة هاوس بلس - تصنيع أنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C في غوانغدونغ، الصين منذ 2010',
        imageTitle: 'مصنع مجموعة هاوس بلس — غوانغدونغ، الصين',
        imageCaption: 'مصنع مجموعة هاوس بلس — غوانغدونغ، الصين',
      },
      stats: [
        { value: '16+', label: 'سنوات في التصنيع' },
        { value: '441+', label: 'عملاء الجملة' },
        { value: '53+', label: 'بلدان مخدَّمة' },
        { value: '1.2M+', label: 'وحدات / سنة' },
      ],
      missionVision: {
        missionIcon: '🎯',
        missionTitle: 'مهمّتنا',
        missionText:
          'تصنيع منتجات موثوقة ومُعتمَدة تمكّن المشترين بالجملة من بناء أعمال مربحة — مع تسعير ثابت وتنافسي ودعم سريع الاستجابة في كل مرحلة من الشراكة.',
        visionIcon: '🔭',
        visionTitle: 'رؤيتنا',
        visionText:
          'أن نكون الشريك التصنيعي المفضل عالمياً لأنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C — معترفاً بنا بابتكار المنتجات وشفافية سلسلة الإمداد وأعلى معايير خدمة العملاء.',
      },
      values: {
        heading: '🏭 ما الذي يدفع هاوس بلس',
        subheadingParts: [
          'أربعة مبادئ توجه كل قرار في ',
          <strong key="vs1">هاوس بلس</strong>,
          ' — من تصميم المنتج إلى ما بعد البيع. هذه هي ميزة ',
          <strong key="vs2">هاوس بلس</strong>,
          '.',
        ],
        cards: [
          {
            icon: '🔬',
            title: 'تصنيع دقيق',
            desc:
              'لا يغادر أي منتج مصنعنا إلا بعد اجتياز فحوصات متعددة المراحل متوافقة مع المعايير الدولية. نستثمر باستمرار في معدات اختبار آلية وتحسين العمليات.',
          },
          {
            icon: '🌱',
            title: 'ابتكار مستدام',
            desc:
              'يخصص فريق البحث والتطوير لدينا أكثر من 8% من الإيرادات السنوية لتطوير منتجات عالية الكفاءة في استهلاك الطاقة. من الألواح الشمسية إلى الأجهزة منخفضة الاستهلاك، تُبنى الاستدامة ضمن فلسفة التصميم لدينا.',
          },
          {
            icon: '🤝',
            title: 'نهج الشراكة أولاً',
            desc:
              'نتعامل مع كل مشتري جملة كشريك طويل الأمد. مدراء حسابات مخصصون، MOQ مرن، ودعم ما بعد البيع سريع يضمن لك تنمية أعمالك بثقة.',
          },
          {
            icon: '🌍',
            title: 'امتثال عالمي',
            desc:
              'منتجاتنا معتمدة للأسواق الرئيسية حول العالم — CE وRoHS لأوروبا، وFCC لأمريكا الشمالية، وSASO للشرق الأوسط. نتولى المستندات لتبسيط عملية الاستيراد لديك.',
          },
        ],
      },
      timeline: {
        heading: '🏭 رحلة هاوس بلس',
        subheadingParts: ['محطات رئيسية في قصة تصنيع ', <strong key="t">هاوس بلس</strong>, ' منذ 2010.'],
        items: [
          { year: '2010', event: 'تأسست هاوس بلس في غوانغدونغ، الصين، مع تركيز أولي على إنتاج OEM للأجهزة المنزلية.' },
          { year: '2013', event: 'التوسع إلى منتجات الطاقة الشمسية؛ أول شحنة تصدير إلى موزعين أوروبيين.' },
          { year: '2016', event: 'الحصول على شهادات CE وRoHS وISO 9001؛ افتتاح قسم مخصص لإلكترونيات 3C.' },
          { year: '2019', event: 'الوصول إلى 441+ عميلاً بالجملة في 53+ دولة؛ الانتقال إلى مصنع بمساحة 20,000 m².' },
          { year: '2022', event: 'إطلاق خطوط بطاريات LiFePO4 ومحطات الطاقة المحمولة لأسواق خارج الشبكة.' },
          { year: '2024', event: 'نخدم 441+ عميلاً بالجملة في 53+ دولة؛ تتجاوز الطاقة الإنتاجية السنوية 1.2M+ وحدة.' },
        ],
      },
      capabilities: {
        heading: '🏭 قدرات التصنيع لدى هاوس بلس',
        bullets: [
          'خطوط تجميع مخصصة للطاقة الشمسية والأجهزة وإلكترونيات 3C',
          'ورشة أدوات وقوالب داخلية للنمذجة السريعة',
          'إنتاج SMT آلي ولحام بالموجة للإلكترونيات',
          'مختبر دورة كاملة: فحص واردات، ضبط جودة أثناء العملية، اختبارات نهائية',
          'خدمات OEM/ODM: تصميم مخصص، علامة تجارية للملصق الخاص، وتغليف حسب الطلب',
          'القدرة الشهرية: 100,000+ وحدة عبر جميع فئات المنتجات',
        ],
        imageAlt:
          'منشأة تصنيع آلية من هاوس بلس - إنتاج احترافي لأنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C مع رقابة',
        imageTitle: 'تصنيع هاوس بلس الآلي — ضبط الجودة وتميّز الإنتاج',
        imageCaption: 'تصنيع هاوس بلس الآلي — ضبط الجودة وتميّز الإنتاج',
      },
      cta: {
        heading: '🏭 هل أنت مستعد للشراكة مع هاوس بلس؟',
        textParts: [
          'سواء كنت تؤمّن لتوزيع التجزئة، أو لعلامة خاصة، أو لتوريد مشاريع كبيرة، فإن فريق ',
          <strong key="c1">هاوس بلس</strong>,
          ' جاهز لمناقشة متطلباتك. وبصفتنا مُصنّع ',
          <strong key="c2">هاوس بلس</strong>,
          ' محترفاً بخبرة 16+ عاماً، نلتزم بالتسليم ونوفر موثوقية.',
        ],
        buttons: { contact: 'تواصل معنا', products: 'تصفّح المنتجات' },
      },
    },
  } as const;

  const t = (copy as any)[lang] || (copy as any).en;

  return (
    <>
      <SEOHead schemas={[organizationSchema, webSiteSchema, webPageSchema]} />
      <main className="min-h-screen bg-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <Breadcrumb lang={lang} slug="about-us" />

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {t.hero.badges.map((badge: string) => (
                    <span
                      key={badge}
                      className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                  {t.hero.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {t.hero.introParts.map((part: any, i: number) => (
                    <span key={i}>{part}</span>
                  ))}
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                  <p className="text-sm text-amber-900 font-semibold mb-2">{t.hero.keyFactsTitle}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-amber-800">
                    {t.hero.keyFacts.map((fact: string) => (
                      <div key={fact} className="flex items-center gap-2">
                        <span className="text-amber-600">●</span>
                        {fact}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {t.hero.factoryNoteParts.map((part: any, i: number) => (
                    <span key={i}>{part}</span>
                  ))}
                </p>
              </div>
              <figure className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="https://images.houseplus-ch.com/media/houseplus-factory-production-line/"
                  alt={t.hero.imageAlt}
                  title={t.hero.imageTitle}
                  className="object-cover"
                  decoding="async"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs px-4 py-3">
                  {t.hero.imageCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Key Numbers */}
        <section className="py-14 bg-blue-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {t.stats.map((stat: { value: string; label: string }) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-black mb-2">{stat.value}</p>
                  <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl">
              <div className="text-3xl mb-4">{t.missionVision.missionIcon}</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.missionVision.missionTitle}</h2>
              <p className="text-slate-600 leading-relaxed">
                {t.missionVision.missionText}
              </p>
            </div>
            <div className="bg-green-50 border border-green-100 p-8 rounded-2xl">
              <div className="text-3xl mb-4">{t.missionVision.visionIcon}</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.missionVision.visionTitle}</h2>
              <p className="text-slate-600 leading-relaxed">
                {t.missionVision.visionText}
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{t.values.heading}</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                {t.values.subheadingParts.map((part: any, i: number) => (
                  <span key={i}>{part}</span>
                ))}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.values.cards.map((v: { icon: string; title: string; desc: string }) => (
                <div key={v.title} className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{t.timeline.heading}</h2>
              <p className="text-slate-500">
                {t.timeline.subheadingParts.map((part: any, i: number) => (
                  <span key={i}>{part}</span>
                ))}
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100" />
              <div className="space-y-8">
                {t.timeline.items.map((m: { year: string; event: string }) => (
                  <div key={m.year} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm z-10">
                      {m.year}
                    </div>
                    <div className="flex-1 bg-white border border-slate-100 rounded-xl p-5 shadow-sm mt-2">
                      <p className="text-slate-700 text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Capabilities */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">{t.capabilities.heading}</h2>
                <div className="space-y-4">
                  {t.capabilities.bullets.map((cap: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-blue-100">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <p className="text-slate-700 text-sm">{cap}</p>
                    </div>
                  ))}
                </div>
              </div>
              <figure className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="https://images.houseplus-ch.com/media/houseplus-about-houseplus-automated-manufacturing-facility/"
                  alt={t.capabilities.imageAlt}
                  title={t.capabilities.imageTitle}
                  className="object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs px-4 py-3">
                  {t.capabilities.imageCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">{t.cta.heading}</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {t.cta.textParts.map((part: any, i: number) => (
                <span key={i}>{part}</span>
              ))}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                {t.cta.buttons.contact}
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                {t.cta.buttons.products}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}