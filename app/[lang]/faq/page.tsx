import { Metadata } from 'next';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateFAQSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'HousePlus FAQ - Frequently Asked Questions',
    es: 'Preguntas Frecuentes HousePlus',
    de: 'Häufig Gestellte Fragen HousePlus',
    fr: 'FAQ HousePlus - Questions Fréquemment Posées',
    ar: 'الأسئلة الشائعة HousePlus',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: 'HousePlus FAQ for wholesale buyers. MOQ 100 pcs, 20–35 day lead time, 24-month warranty. CE, FCC, RoHS, ISO 9001 certified. 441+ clients across 53+ countries. OEM/ODM available. Solar, appliance and 3C electronics from 20,000 m² factory since 2010.',
    keywords: ['FAQ', 'questions', 'answers', 'help', 'support', 'HousePlus'],
    url: `/${lang}/faq`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const faqs: Record<string, any[]> = {
    en: [
      {
        category: 'Company & Factory',
        items: [
          { q: 'What is HousePlus?', a: 'HousePlus is a professional B2B manufacturer based in Guangdong, China, specializing in solar energy systems, home appliances, and 3C electronics for global wholesale buyers. We have been in business since 2010.' },
          { q: 'Where is your factory located?', a: 'Our 20,000 m² ISO 9001 certified factory is located in Foshan, Guangdong, China. We welcome factory visits by appointment for serious wholesale buyers.' },
          { q: 'How many years has HousePlus been manufacturing?', a: 'HousePlus was founded in 2010 and has over 16 years of manufacturing and international trade experience. We have served 441+ wholesale clients across 53+ countries.' },
          { q: 'Can I visit your factory?', a: 'Yes, we welcome factory inspections by appointment. Please contact us at least 7 days in advance to schedule your visit. We can also arrange video factory tours for overseas clients.' },
          { q: 'What is your production capacity?', a: 'Our factory operates 8 production lines with a monthly capacity of 50,000+ units across solar, appliance, and electronics categories.' },
        ]
      },
      {
        category: 'Products & Certifications',
        items: [
          { q: 'What products does HousePlus manufacture?', a: 'We manufacture three main categories: (1) Solar energy systems — panels, inverters, batteries, charge controllers, power stations; (2) Home appliances — air fryers, induction cooktops, electric kettles, toasters; (3) 3C electronics — TWS earphones, smart watches, power banks, SSDs, cables.' },
          { q: 'Are your products certified for international markets?', a: 'Yes. All products carry CE (EU), FCC (North America), RoHS, ISO 9001, and IEC certifications. Lithium battery products also hold UN38.3 for safe air/sea shipping. Full compliance documentation is provided with every shipment.' },
          { q: 'Do you have product datasheets and manuals?', a: 'Yes. We provide English datasheets, user manuals, packaging artwork, and compliance certificates in PDF format for every SKU.' },
          { q: 'Can I request product samples before placing a bulk order?', a: 'Yes. Samples are available at wholesale cost plus shipping. Sample lead time is 3–7 days. Sample cost is refundable against your first bulk order of 500+ pieces.' },
          { q: 'Do your products support dual voltage (110V / 220V)?', a: 'Most home appliances support 220–240V by default. We can customize voltage, plug type, and frequency (50/60Hz) for your target market. Please specify requirements when requesting a quote.' },
        ]
      },
      {
        category: 'Ordering & Pricing',
        items: [
          { q: 'What is your MOQ (Minimum Order Quantity)?', a: 'Standard MOQ is 100 pieces per model for most products. Customized/OEM products typically require 500 pieces minimum. Some high-value items like portable power stations have MOQ of 50 pieces.' },
          { q: 'What is your pricing structure?', a: 'We offer tiered pricing based on order volume: 100–499 pcs (standard), 500–999 pcs (5% discount), 1,000–4,999 pcs (10% discount), 5,000+ pcs (custom quote). Contact us for a detailed price list.' },
          { q: 'What payment terms do you accept?', a: 'We accept T/T (bank transfer) with 30% deposit and 70% balance before shipment. For orders over $20,000, we also accept L/C at sight. PayPal is available for sample orders only.' },
          { q: 'Can I mix different products in one order?', a: 'Yes. You can mix SKUs across solar, appliance, and electronics categories in one container. The total order value must meet our minimum of $3,000 per shipment.' },
          { q: 'Do you offer exclusive distribution agreements?', a: 'Yes. For buyers committing to annual purchase volumes of $100,000+, we offer exclusive territorial distribution rights with protected pricing and marketing support.' },
        ]
      },
      {
        category: 'Lead Time & Shipping',
        items: [
          { q: 'What is your standard lead time?', a: 'Standard lead time is 20–35 days after deposit confirmation. Stock items ship within 5–10 days. OEM/ODM orders with custom moulds take 30–45 days. Peak season (Q4) may add 5–10 days.' },
          { q: 'What shipping methods do you offer?', a: 'We offer sea freight (FOB Shenzhen/CIF/DDP), air freight, and express courier (DHL/FedEx/UPS). For full container loads (FCL), we recommend sea freight. For urgent samples, express courier is fastest.' },
          { q: 'What incoterms do you support?', a: 'We support EXW, FOB Shenzhen, CIF, and DDP. FOB is our standard term. DDP (delivered duty paid) is available for EU, US, UK, and select Middle East destinations with prior arrangement.' },
          { q: 'How long does shipping take?', a: 'Sea freight: 15–35 days depending on destination. Air freight: 5–10 days. Express courier: 3–7 days. We provide tracking numbers and shipping documents within 24 hours of dispatch.' },
          { q: 'Can you handle customs clearance?', a: 'For DDP shipments, we handle customs clearance and duties in the destination country. For FOB/CIF, the buyer is responsible for import clearance. We provide all necessary documents: commercial invoice, packing list, B/L, and certificates of origin.' },
        ]
      },
      {
        category: 'OEM, ODM & Customization',
        items: [
          { q: 'Do you support OEM and private-label branding?', a: 'Yes. We offer full OEM services including custom logo printing, private-label packaging, user manuals, and gift box design. MOQ for OEM branding starts from 100 pieces with free logo design support.' },
          { q: 'What is the difference between OEM and ODM at HousePlus?', a: 'OEM: You provide the design/specs, we manufacture to your requirements. ODM: You choose from our existing designs and we apply your branding. ODM is faster (20–35 days) and lower MOQ (100 pcs). OEM with custom moulds takes 30–45 days and MOQ 500 pcs.' },
          { q: 'Can you customize product colours and specifications?', a: 'Yes. We support Pantone colour matching, logo silk-screening/UV printing, custom cable lengths, capacity variations, and firmware customization for smart products. Custom mould development is also available.' },
          { q: 'How much does custom packaging cost?', a: 'Standard OEM packaging (custom logo on existing box) is free for orders of 500+ pieces. Fully custom gift box design starts at $0.50–$1.20 per unit depending on material and printing complexity.' },
          { q: 'Can you design products from scratch?', a: 'Yes. Our in-house R&D team of 12 engineers can develop custom products from concept to mass production. NRE (Non-Recurring Engineering) fees apply for new moulds and PCB designs. Typical NRE range: $2,000–$15,000 depending on complexity.' },
        ]
      },
      {
        category: 'Warranty & After-Sales',
        items: [
          { q: 'What warranty do you offer?', a: 'All HousePlus products come with a 24-month warranty against manufacturing defects. Solar panels carry a 25-year performance warranty. Batteries have a 3,000+ cycle life guarantee. Warranty claims are processed within 48 hours.' },
          { q: 'What is your defect rate?', a: 'Our current defect rate is below 0.3% thanks to our 5-stage QC process (incoming material inspection → in-process inspection → functional testing → aging test → final random inspection).' },
          { q: 'How do you handle defective products?', a: 'For warranty claims, we offer free replacement parts, full product replacement, or credit notes at our discretion. For urgent cases, we can air-ship replacements within 72 hours. Video evidence is required for claim verification.' },
          { q: 'Do you provide spare parts?', a: 'Yes. We maintain a spare parts inventory for all active product lines. Common spare parts (cables, adapters, remote controls) are available at cost. We recommend ordering 2–3% spare parts with your bulk order for local after-sales support.' },
          { q: 'Do you offer technical support?', a: 'Yes. Each wholesale client is assigned a dedicated account manager fluent in English. We provide product training videos, installation guides, and troubleshooting documentation. Technical support is available Monday–Friday, 9:00–18:00 CST.' },
        ]
      },
    ],
    es: [
      {
        category: 'Empresa y Fábrica',
        items: [
          { q: '¿Qué es HousePlus?', a: 'HousePlus es un fabricante B2B profesional con sede en Guangdong, China, especializado en sistemas de energía solar, electrodomésticos y electrónica 3C para compradores mayoristas globales. Operamos desde 2010.' },
          { q: '¿Dónde está ubicada su fábrica?', a: 'Nuestra fábrica certificada ISO 9001 de 20,000 m² está ubicada en Foshan, Guangdong, China. Damos la bienvenida a visitas de fábrica con cita previa para compradores mayoristas serios.' },
          { q: '¿Cuántos años tiene HousePlus fabricando?', a: 'HousePlus fue fundada en 2010 y cuenta con más de 16 años de experiencia en fabricación y comercio internacional. Hemos servido a más de 441 clientes mayoristas en 53+ países.' },
          { q: '¿Puedo visitar su fábrica?', a: 'Sí, damos la bienvenida a inspecciones de fábrica con cita previa. Contáctenos con al menos 7 días de anticipación para programar su visita. También podemos organizar tours virtuales de fábrica para clientes internacionales.' },
          { q: '¿Cuál es su capacidad de producción?', a: 'Nuestra fábrica opera 8 líneas de producción con una capacidad mensual de más de 50,000 unidades en categorías de solar, electrodomésticos y electrónica.' },
        ]
      },
      {
        category: 'Productos y Certificaciones',
        items: [
          { q: '¿Qué productos fabrica HousePlus?', a: 'Fabricamos tres categorías principales: (1) Sistemas de energía solar — paneles, inversores, baterías, controladores de carga, estaciones de energía; (2) Electrodomésticos — freidoras de aire, cocinas de inducción, hervidores eléctricos, tostadoras; (3) Electrónica 3C — auriculares TWS, relojes inteligentes, power banks, SSDs, cables.' },
          { q: '¿Sus productos están certificados para mercados internacionales?', a: 'Sí. Todos los productos cuentan con certificaciones CE (UE), FCC (Norteamérica), RoHS, ISO 9001 e IEC. Los productos con baterías de litio también tienen UN38.3 para envío seguro por aire/mar. Se proporciona documentación completa de cumplimiento con cada envío.' },
          { q: '¿Tienen fichas técnicas y manuales de productos?', a: 'Sí. Proporcionamos fichas técnicas en inglés, manuales de usuario, diseños de empaque y certificados de cumplimiento en formato PDF para cada SKU.' },
          { q: '¿Puedo solicitar muestras antes de hacer un pedido al por mayor?', a: 'Sí. Las muestras están disponibles al costo mayorista más envío. El tiempo de entrega de muestras es de 3–7 días. El costo de la muestra es reembolsable contra su primer pedido al por mayor de 500+ piezas.' },
          { q: '¿Sus productos admiten voltaje dual (110V / 220V)?', a: 'La mayoría de los electrodomésticos admiten 220–240V de forma predeterminada. Podemos personalizar el voltaje, tipo de enchufe y frecuencia (50/60Hz) para su mercado objetivo. Especifique los requisitos al solicitar una cotización.' },
        ]
      },
      {
        category: 'Pedidos y Precios',
        items: [
          { q: '¿Cuál es su MOQ (Cantidad Mínima de Pedido)?', a: 'El MOQ estándar es de 100 piezas por modelo para la mayoría de los productos. Los productos personalizados/OEM típicamente requieren un mínimo de 500 piezas. Algunos artículos de alto valor como estaciones de energía portátiles tienen MOQ de 50 piezas.' },
          { q: '¿Qué términos de pago aceptan?', a: 'Aceptamos T/T (transferencia bancaria) con 30% de depósito y 70% de saldo antes del envío. Para pedidos superiores a $20,000, también aceptamos L/C a la vista. PayPal está disponible solo para pedidos de muestra.' },
          { q: '¿Puedo mezclar diferentes productos en un solo pedido?', a: 'Sí. Puede mezclar SKUs de las categorías solar, electrodomésticos y electrónica en un solo contenedor. El valor total del pedido debe alcanzar nuestro mínimo de $3,000 por envío.' },
          { q: '¿Ofrecen acuerdos de distribución exclusiva?', a: 'Sí. Para compradores que se comprometen a volúmenes anuales de compra de $100,000+, ofrecemos derechos de distribución territorial exclusivos con precios protegidos y soporte de marketing.' },
        ]
      },
      {
        category: 'Plazo de Entrega y Envío',
        items: [
          { q: '¿Cuál es su plazo de entrega estándar?', a: 'El plazo de entrega estándar es de 20–35 días después de la confirmación del depósito. Los artículos en stock se envían en 5–10 días. Los pedidos OEM/ODM con moldes personalizados tardan 30–45 días. La temporada alta (Q4) puede agregar 5–10 días.' },
          { q: '¿Qué métodos de envío ofrecen?', a: 'Ofrecemos carga marítima (FOB Shenzhen/CIF/DDP), carga aérea y mensajería express (DHL/FedEx/UPS). Para contenedores completos (FCL), recomendamos carga marítima. Para muestras urgentes, la mensajería express es la más rápida.' },
          { q: '¿Qué incoterm soportan?', a: 'Soportamos EXW, FOB Shenzhen, CIF y DDP. FOB es nuestro término estándar. DDP (entregado con derechos pagados) está disponible para UE, EE.UU., Reino Unido y destinos selectos de Oriente Medio con acuerdo previo.' },
          { q: '¿Cuánto tiempo tarda el envío?', a: 'Carga marítima: 15–35 días según el destino. Carga aérea: 5–10 días. Mensajería express: 3–7 días. Proporcionamos números de seguimiento y documentos de envío dentro de las 24 horas posteriores al despacho.' },
        ]
      },
      {
        category: 'OEM, ODM y Personalización',
        items: [
          { q: '¿Soportan OEM y marca privada?', a: 'Sí. Ofrecemos servicios OEM completos que incluyen impresión de logotipo personalizado, empaque de marca privada, manuales de usuario y diseño de caja de regalo. El MOQ para branding OEM comienza en 100 piezas con soporte de diseño de logotipo gratuito.' },
          { q: '¿Cuál es la diferencia entre OEM y ODM en HousePlus?', a: 'OEM: Usted proporciona el diseño/especificaciones, nosotros fabricamos según sus requisitos. ODM: Usted elige de nuestros diseños existentes y aplicamos su marca. ODM es más rápido (20–35 días) y menor MOQ (100 piezas). OEM con moldes personalizados tarda 30–45 días y MOQ 500 piezas.' },
          { q: '¿Pueden personalizar colores y especificaciones de productos?', a: 'Sí. Soportamos coincidencia de colores Pantone, serigrafía/impresión UV de logotipo, longitudes de cable personalizadas, variaciones de capacidad y personalización de firmware para productos inteligentes. El desarrollo de moldes personalizados también está disponible.' },
          { q: '¿Cuánto cuesta el empaque personalizado?', a: 'El empaque OEM estándar (logotipo personalizado en caja existente) es gratuito para pedidos de 500+ piezas. El diseño completamente personalizado de caja de regalo comienza en $0.50–$1.20 por unidad según el material y la complejidad de impresión.' },
        ]
      },
      {
        category: 'Garantía y Postventa',
        items: [
          { q: '¿Qué garantía ofrecen?', a: 'Todos los productos HousePlus vienen con una garantía de 24 meses contra defectos de fabricación. Los paneles solares tienen una garantía de rendimiento de 25 años. Las baterías tienen una garantía de vida útil de 3,000+ ciclos. Las reclamaciones de garantía se procesan en 48 horas.' },
          { q: '¿Cuál es su tasa de defectos?', a: 'Nuestra tasa de defectos actual es inferior al 0.3% gracias a nuestro proceso de QC de 5 etapas (inspección de materiales entrantes → inspección en proceso → prueba funcional → prueba de envejecimiento → inspección aleatoria final).' },
          { q: '¿Cómo manejan los productos defectuosos?', a: 'Para reclamaciones de garantía, ofrecemos piezas de repuesto gratuitas, reemplazo completo del producto o notas de crédito a nuestra discreción. Para casos urgentes, podemos enviar reemplazos por aire en 72 horas. Se requiere evidencia en video para la verificación de la reclamación.' },
          { q: '¿Proporcionan piezas de repuesto?', a: 'Sí. Mantenemos un inventario de piezas de repuesto para todas las líneas de productos activas. Las piezas de repuesto comunes (cables, adaptadores, controles remotos) están disponibles al costo. Recomendamos ordenar 2–3% de piezas de repuesto con su pedido al por mayor para soporte postventa local.' },
        ]
      },
    ],
    de: [
      {
        category: 'Unternehmen & Fabrik',
        items: [
          { q: 'Was ist HousePlus?', a: 'HousePlus ist ein professioneller B2B-Hersteller mit Sitz in Guangdong, China, der sich auf Solarenergiesysteme, Haushaltsgeräte und 3C-Elektronik für globale Großhandelskäufer spezialisiert hat. Wir sind seit 2010 im Geschäft.' },
          { q: 'Wo befindet sich Ihre Fabrik?', a: 'Unsere ISO-9001-zertifizierte Fabrik mit 20.000 m² befindet sich in Foshan, Guangdong, China. Wir heißen ernsthafte Großhandelskäufer nach Voranmeldung zu Fabrikbesuchen willkommen.' },
          { q: 'Seit wie vielen Jahren fertigt HousePlus?', a: 'HousePlus wurde 2010 gegründet und verfügt über mehr als 16 Jahre Erfahrung in Fertigung und internationalem Handel. Wir haben 441+ Großhandelskunden in 53+ Ländern bedient.' },
          { q: 'Kann ich Ihre Fabrik besuchen?', a: 'Ja, wir heißen Fabrikinspektionen nach Voranmeldung willkommen. Bitte kontaktieren Sie uns mindestens 7 Tage im Voraus, um Ihren Besuch zu terminieren. Für ausländische Kunden können wir auch virtuelle Fabriktouren arrangieren.' },
          { q: 'Was ist Ihre Produktionskapazität?', a: 'Unsere Fabrik betreibt 8 Produktionslinien mit einer monatlichen Kapazität von 50.000+ Einheiten in den Kategorien Solar, Haushaltsgeräte und Elektronik.' },
        ]
      },
      {
        category: 'Produkte & Zertifizierungen',
        items: [
          { q: 'Welche Produkte fertigt HousePlus?', a: 'Wir fertigen drei Hauptkategorien: (1) Solarenergiesysteme — Paneele, Wechselrichter, Batterien, Laderegler, Kraftwerke; (2) Haushaltsgeräte — Heißluftfritteusen, Induktionskochfelder, Wasserkocher, Toaster; (3) 3C-Elektronik — TWS-Kopfhörer, Smartwatches, Powerbanks, SSDs, Kabel.' },
          { q: 'Sind Ihre Produkte für internationale Märkte zertifiziert?', a: 'Ja. Alle Produkte tragen CE (EU), FCC (Nordamerika), RoHS, ISO 9001 und IEC Zertifizierungen. Lithiumbatterieprodukte haben auch UN38.3 für sicheren Luft-/Seetransport. Vollständige Konformitätsdokumentation wird mit jeder Sendung bereitgestellt.' },
          { q: 'Haben Sie Produktdatenblätter und Handbücher?', a: 'Ja. Wir stellen englische Datenblätter, Bedienungsanleitungen, Verpackungsgrafiken und Konformitätszertifikate im PDF-Format für jede SKU zur Verfügung.' },
          { q: 'Kann ich Produktproben vor einer Großbestellung anfordern?', a: 'Ja. Proben sind zum Großhandelspreis plus Versandkosten verfügbar. Probenlieferzeit beträgt 3–7 Tage. Probenkosten sind gegen Ihre erste Großbestellung von 500+ Stück erstattungsfähig.' },
          { q: 'Unterstützen Ihre Produkte Dualspannung (110V / 220V)?', a: 'Die meisten Haushaltsgeräte unterstützen standardmäßig 220–240V. Wir können Spannung, Steckertyp und Frequenz (50/60Hz) für Ihren Zielmarkt anpassen. Bitte geben Sie Anforderungen bei der Angebotsanfrage an.' },
        ]
      },
      {
        category: 'Bestellung & Preisgestaltung',
        items: [
          { q: 'Was ist Ihr MOQ (Mindestbestellmenge)?', a: 'Der Standard-MOQ beträgt 100 Stück pro Modell für die meisten Produkte. Für kundenspezifische/OEM-Produkte sind typischerweise 500 Stück Mindestbestellmenge erforderlich. Einige hochwertige Artikel wie tragbare Kraftwerke haben einen MOQ von 50 Stück.' },
          { q: 'Welche Zahlungsbedingungen akzeptieren Sie?', a: 'Wir akzeptieren T/T (Banküberweisung) mit 30% Anzahlung und 70% Restbetrag vor Versand. Für Bestellungen über $20,000 akzeptieren wir auch L/C bei Sicht. PayPal ist nur für Probenbestellungen verfügbar.' },
          { q: 'Kann ich verschiedene Produkte in einer Bestellung mischen?', a: 'Ja. Sie können SKUs über die Kategorien Solar, Haushaltsgeräte und Elektronik in einem Container mischen. Der Gesamtbestellwert muss unser Minimum von $3,000 pro Sendung erreichen.' },
          { q: 'Bieten Sie exklusive Vertriebsvereinbarungen an?', a: 'Ja. Für Käufer, die sich zu jährlichen Einkaufsvolumina von $100,000+ verpflichten, bieten wir exklusive territoriale Vertriebsrechte mit geschützten Preisen und Marketingunterstützung an.' },
        ]
      },
      {
        category: 'Lieferzeit & Versand',
        items: [
          { q: 'Was ist Ihre Standardlieferzeit?', a: 'Die Standardlieferzeit beträgt 20–35 Tage nach Anzahlungsbestätigung. Lagerartikel werden innerhalb von 5–10 Tagen versandt. OEM/ODM-Bestellungen mit kundenspezifischen Formen dauern 30–45 Tage. Die Hochsaison (Q4) kann 5–10 Tage hinzufügen.' },
          { q: 'Welche Versandmethoden bieten Sie an?', a: 'Wir bieten Seefracht (FOB Shenzhen/CIF/DDP), Luftfracht und Express-Kurier (DHL/FedEx/UPS) an. Für Containerladungen (FCL) empfehlen wir Seefracht. Für dringende Proben ist Express-Kurier am schnellsten.' },
          { q: 'Welche Incoterms unterstützen Sie?', a: 'Wir unterstützen EXW, FOB Shenzhen, CIF und DDP. FOB ist unser Standard. DDP (Delivered Duty Paid) ist für die EU, USA, UK und ausgewählte Naher Osten-Ziele mit vorheriger Absprache verfügbar.' },
          { q: 'Wie lange dauert der Versand?', a: 'Seefracht: 15–35 Tage je nach Ziel. Luftfracht: 5–10 Tage. Express-Kurier: 3–7 Tage. Wir stellen Tracking-Nummern und Versanddokumente innerhalb von 24 Stunden nach Versand bereit.' },
        ]
      },
      {
        category: 'OEM, ODM & Anpassung',
        items: [
          { q: 'Unterstützen Sie OEM und Private-Label-Branding?', a: 'Ja. Wir bieten vollständige OEM-Dienstleistungen einschließlich kundenspezifischem Logo-Druck, Private-Label-Verpackung, Bedienungsanleitungen und Geschenkbox-Design. MOQ für OEM-Branding beginnt bei 100 Stück mit kostenlosem Logo-Design-Support.' },
          { q: 'Was ist der Unterschied zwischen OEM und ODM bei HousePlus?', a: 'OEM: Sie stellen das Design/die Spezifikationen bereit, wir fertigen nach Ihren Anforderungen. ODM: Sie wählen aus unseren bestehenden Designs und wir wenden Ihr Branding an. ODM ist schneller (20–35 Tage) und niedrigerer MOQ (100 Stück). OEM mit kundenspezifischen Formen dauert 30–45 Tage und MOQ 500 Stück.' },
          { q: 'Können Sie Produktfarben und Spezifikationen anpassen?', a: 'Ja. Wir unterstützen Pantone-Farbanpassung, Logo-Siebdruck/UV-Druck, kundenspezifische Kabellängen, Kapazitätsvariationen und Firmware-Anpassung für Smart-Produkte. Auch kundenspezifische Formenentwicklung ist verfügbar.' },
          { q: 'Wie viel kostet kundenspezifische Verpackung?', a: 'Standard-OEM-Verpackung (kundenspezifisches Logo auf bestehender Box) ist kostenlos für Bestellungen von 500+ Stück. Vollständig kundenspezifisches Geschenkbox-Design beginnt bei $0,50–$1,20 pro Einheit je nach Material und Druckkomplexität.' },
        ]
      },
      {
        category: 'Garantie & After-Sales',
        items: [
          { q: 'Welche Garantie bieten Sie an?', a: 'Alle HousePlus-Produkte kommen mit einer 24-monatigen Garantie gegen Herstellungsfehler. Solarmodule haben eine 25-jährige Leistungsgarantie. Batterien haben eine Lebensdauergarantie von 3.000+ Zyklen. Garantieansprüche werden innerhalb von 48 Stunden bearbeitet.' },
          { q: 'Wie hoch ist Ihre Fehlerrate?', a: 'Unsere aktuelle Fehlerrate liegt unter 0,3% dank unseres 5-stufigen QC-Prozesses (Eingangsmaterialinspektion → Prozessinspektion → Funktionstest → Alterungstest → abschließende Stichprobeninspektion).' },
          { q: 'Wie gehen Sie mit defekten Produkten um?', a: 'Für Garantieansprüche bieten wir kostenlose Ersatzteile, vollständigen Produktaustausch oder Gutschriften nach unserem Ermessen an. Für dringende Fälle können wir Ersatzteile innerhalb von 72 Stunden per Luftfracht versenden. Video-Beweis ist für die Anspruchsüberprüfung erforderlich.' },
          { q: 'Bieten Sie Ersatzteile an?', a: 'Ja. Wir führen ein Ersatzteillager für alle aktiven Produktlinien. Häufige Ersatzteile (Kabel, Adapter, Fernbedienungen) sind zum Selbstkostenpreis verfügbar. Wir empfehlen, 2–3% Ersatzteile mit Ihrer Großbestellung für lokalen After-Sales-Support zu bestellen.' },
        ]
      },
    ],
    fr: [
      {
        category: 'Entreprise & Usine',
        items: [
          { q: "Qu'est-ce que HousePlus?", a: "HousePlus est un fabricant B2B professionnel basé à Guangdong, en Chine, spécialisé dans les systèmes d'énergie solaire, les appareils ménagers et l'électronique 3C pour les acheteurs en gros mondiaux. Nous sommes en activité depuis 2010." },
          { q: 'Où se trouve votre usine?', a: "Notre usine certifiée ISO 9001 de 20 000 m² est située à Foshan, Guangdong, en Chine. Nous accueillons les visites d'usine sur rendez-vous pour les acheteurs en gros sérieux." },
          { q: "Depuis combien d'années HousePlus fabrique-t-il?", a: "HousePlus a été fondée en 2010 et possède plus de 16 ans d'expérience dans la fabrication et le commerce international. Nous avons servi 441+ clients grossistes dans 53+ pays." },
          { q: "Puis-je visiter votre usine?", a: "Oui, nous accueillons les inspections d'usine sur rendez-vous. Veuillez nous contacter au moins 7 jours à l'avance pour planifier votre visite. Nous pouvons également organiser des visites virtuelles d'usine pour les clients internationaux." },
          { q: 'Quelle est votre capacité de production?', a: "Notre usine exploite 8 lignes de production avec une capacité mensuelle de 50 000+ unités dans les catégories solaire, appareils ménagers et électronique." },
        ]
      },
      {
        category: 'Produits & Certifications',
        items: [
          { q: 'Quels produits fabrique HousePlus?', a: "Nous fabriquons trois catégories principales: (1) Systèmes d'énergie solaire — panneaux, onduleurs, batteries, régulateurs de charge, centrales électriques; (2) Appareils ménagers — friteuses à air, plaques à induction, bouilloires électriques, grille-pain; (3) Électronique 3C — écouteurs TWS, montres connectées, batteries externes, SSDs, câbles." },
          { q: 'Vos produits sont-ils certifiés pour les marchés internationaux?', a: "Oui. Tous les produits portent les certifications CE (UE), FCC (Amérique du Nord), RoHS, ISO 9001 et IEC. Les produits à batteries lithium ont également UN38.3 pour un transport aérien/maritime sûr. Une documentation complète de conformité est fournie avec chaque envoi." },
          { q: 'Avez-vous des fiches techniques et des manuels produits?', a: "Oui. Nous fournissons des fiches techniques en anglais, des manuels utilisateur, des maquettes d'emballage et des certificats de conformité au format PDF pour chaque SKU." },
          { q: "Puis-je demander des échantillons avant de passer une commande en gros?", a: "Oui. Les échantillons sont disponibles au coût de gros plus les frais d'expédition. Le délai de livraison des échantillons est de 3–7 jours. Le coût de l'échantillon est remboursable contre votre première commande en gros de 500+ pièces." },
          { q: 'Vos produits supportent-ils le double voltage (110V / 220V)?', a: "La plupart des appareils ménagers supportent 220–240V par défaut. Nous pouvons personnaliser la tension, le type de prise et la fréquence (50/60Hz) pour votre marché cible. Veuillez préciser les exigences lors de la demande de devis." },
        ]
      },
      {
        category: 'Commande & Tarification',
        items: [
          { q: "Quel est votre MOQ (Quantité Minimum de Commande)?", a: "Le MOQ standard est de 100 pièces par modèle pour la plupart des produits. Les produits personnalisés/OEM nécessitent généralement un minimum de 500 pièces. Certains articles à haute valeur comme les stations d'énergie portables ont un MOQ de 50 pièces." },
          { q: 'Quelles conditions de paiement acceptez-vous?', a: "Nous acceptons T/T (virement bancaire) avec 30% d'acompte et 70% de solde avant expédition. Pour les commandes de plus de $20,000, nous acceptons également L/C à vue. PayPal est disponible uniquement pour les commandes d'échantillons." },
          { q: 'Puis-je mélanger différents produits dans une seule commande?', a: "Oui. Vous pouvez mélanger des SKU dans les catégories solaire, appareils ménagers et électronique dans un seul conteneur. La valeur totale de la commande doit atteindre notre minimum de $3,000 par envoi." },
          { q: 'Proposez-vous des accords de distribution exclusifs?', a: "Oui. Pour les acheteurs s'engageant sur des volumes d'achat annuels de $100,000+, nous proposons des droits de distribution territoriaux exclusifs avec des prix protégés et un support marketing." },
        ]
      },
      {
        category: 'Délai de Livraison & Expédition',
        items: [
          { q: 'Quel est votre délai de livraison standard?', a: "Le délai de livraison standard est de 20–35 jours après confirmation de l'acompte. Les articles en stock sont expédiés en 5–10 jours. Les commandes OEM/ODM avec moules personnalisés prennent 30–45 jours. La haute saison (T4) peut ajouter 5–10 jours." },
          { q: "Quelles méthodes d'expédition proposez-vous?", a: "Nous proposons le fret maritime (FOB Shenzhen/CIF/DDP), le fret aérien et le courrier express (DHL/FedEx/UPS). Pour les chargements complets de conteneurs (FCL), nous recommandons le fret maritime. Pour les échantillons urgents, le courrier express est le plus rapide." },
          { q: "Quels incoterms supportez-vous?", a: "Nous supportons EXW, FOB Shenzhen, CIF et DDP. FOB est notre terme standard. DDP (Delivered Duty Paid) est disponible pour l'UE, les États-Unis, le Royaume-Uni et certaines destinations du Moyen-Orient avec arrangement préalable." },
          { q: "Combien de temps dure l'expédition?", a: "Fret maritime: 15–35 jours selon la destination. Fret aérien: 5–10 jours. Courrier express: 3–7 jours. Nous fournissons les numéros de suivi et les documents d'expédition dans les 24 heures suivant l'expédition." },
        ]
      },
      {
        category: 'OEM, ODM & Personnalisation',
        items: [
          { q: "Supportez-vous l'OEM et le branding sous marque privée?", a: "Oui. Nous proposons des services OEM complets incluant l'impression de logo personnalisé, l'emballage sous marque privée, les manuels utilisateur et la conception de boîtes cadeaux. Le MOQ pour le branding OEM commence à 100 pièces avec un support de conception de logo gratuit." },
          { q: "Quelle est la différence entre OEM et ODM chez HousePlus?", a: "OEM: Vous fournissez le design/les spécifications, nous fabriquons selon vos exigences. ODM: Vous choisissez parmi nos designs existants et nous appliquons votre branding. L'ODM est plus rapide (20–35 jours) et MOQ plus bas (100 pièces). L'OEM avec moules personnalisés prend 30–45 jours et MOQ 500 pièces." },
          { q: 'Pouvez-vous personnaliser les couleurs et spécifications produits?', a: "Oui. Nous supportons la correspondance des couleurs Pantone, la sérigraphie/impression UV de logo, les longueurs de câble personnalisées, les variations de capacité et la personnalisation du firmware pour les produits intelligents. Le développement de moules personnalisés est également disponible." },
          { q: "Combien coûte l'emballage personnalisé?", a: "L'emballage OEM standard (logo personnalisé sur boîte existante) est gratuit pour les commandes de 500+ pièces. La conception complètement personnalisée de boîte cadeau commence à $0,50–$1,20 par unité selon le matériau et la complexité d'impression." },
        ]
      },
      {
        category: 'Garantie & Après-Vente',
        items: [
          { q: 'Quelle garantie proposez-vous?', a: "Tous les produits HousePlus sont livrés avec une garantie de 24 mois contre les défauts de fabrication. Les panneaux solaires ont une garantie de performance de 25 ans. Les batteries ont une garantie de durée de vie de 3 000+ cycles. Les réclamations sous garantie sont traitées en 48 heures." },
          { q: "Quel est votre taux de défauts?", a: "Notre taux de défauts actuel est inférieur à 0,3% grâce à notre processus QC en 5 étapes (inspection des matériaux entrants → inspection en cours de processus → test fonctionnel → test de vieillissement → inspection aléatoire finale)." },
          { q: "Comment traitez-vous les produits défectueux?", a: "Pour les réclamations sous garantie, nous offrons des pièces de rechange gratuites, un remplacement complet du produit ou des notes de crédit à notre discrétion. Pour les cas urgents, nous pouvons expédier des remplacements par avion en 72 heures. Une preuve vidéo est requise pour la vérification de la réclamation." },
          { q: 'Fournissez-vous des pièces de rechange?', a: "Oui. Nous maintenons un inventaire de pièces de rechange pour toutes les lignes de produits actives. Les pièces de rechange courantes (câbles, adaptateurs, télécommandes) sont disponibles au prix coûtant. Nous recommandons de commander 2–3% de pièces de rechange avec votre commande en gros pour le support après-vente local." },
        ]
      },
    ],
    ar: [
      {
        category: 'الشركة والمصنع',
        items: [
          { q: 'ما هو HousePlus؟', a: 'HousePlus هو مصنع محترف B2B مقرها في مقاطعة قوانغدونغ، الصين، متخصص في أنظمة الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C لمشترين الجملة العالميين. نحن نعمل منذ عام 2010.' },
          { q: 'أين يقع مصنعكم؟', a: 'يقع مصنعنا المعتمد ISO 9001 بمساحة 20,000 متر مربع في فوشان، قوانغدونغ، الصين. نرحب بزيارات المصنع بالموعد المسبق للمشترين الجادين بالجملة.' },
          { q: 'كم عدد سنوات تصنيع HousePlus؟', a: 'تأسست HousePlus في عام 2010 ولديها أكثر من 16 عامًا من الخبرة في التصنيع والتجارة الدولية. لقد خدمنا أكثر من 441 عميل جملة في أكثر من 53 دولة.' },
          { q: 'هل يمكنني زيارة مصنعكم؟', a: 'نعم، نرحب بتفتيش المصنع بالموعد المسبق. يرجى الاتصال بنا قبل 7 أيام على الأقل لتحديد موعد زيارتك. يمكننا أيضًا ترتيب جولات افتراضية للمصنع للعملاء الدوليين.' },
          { q: 'ما هي قدرة الإنتاج لديكم؟', a: 'يعمل مصنعنا بـ 8 خطوط إنتاج بقدرة شهرية تزيد عن 50,000 وحدة في فئات الطاقة الشمسية والأجهزة المنزلية والإلكترونيات.' },
        ]
      },
      {
        category: 'المنتجات والشهادات',
        items: [
          { q: 'ما هي المنتجات التي تصنعها HousePlus؟', a: 'نصنع ثلاث فئات رئيسية: (1) أنظمة الطاقة الشمسية — الألواح الشمسية والمحولات والبطاريات ومنظمات الشحن ومحطات الطاقة؛ (2) الأجهزة المنزلية — مقلات الهواء الساخن ومواقد التحريض والغلايات الكهربائية والمحامص؛ (3) إلكترونيات 3C — سماعات TWS وساعات ذكية وبنوك طاقة وSSD وكابلات.' },
          { q: 'هل منتجاتكم معتمدة للأسواق الدولية؟', a: 'نعم. تحمل جميع المنتجات شهادات CE (الاتحاد الأوروبي) وFCC (أمريكا الشمالية) وRoHS وISO 9001 وIEC. منتجات بطاريات الليثيوم تحمل أيضًا UN38.3 للشحن الآمن جويًا وبحرًا. يتم تقديم وثائق الامتثال الكاملة مع كل شحنة.' },
          { q: 'هل لديكم أوراق بيانات المنتجات والكتيبات؟', a: 'نعم. نقدم أوراق البيانات باللغة الإنجليزية وأدلة المستخدم وتصاميم التغليف وشهادات الامتثال بتنسيق PDF لكل SKU.' },
          { q: 'هل يمكنني طلب عينات منتجات قبل تقديم طلب بالجملة؟', a: 'نعم. العينات متاحة بتكلفة الجملة بالإضافة إلى الشحن. وقت تسليم العينات هو 3–7 أيام. تكلفة العينة قابلة للاسترداد مقابل طلبك الأول بالجملة من 500+ قطعة.' },
          { q: 'هل منتجاتكم تدعم الجهد المزدوج (110V / 220V)؟', a: 'تدعم معظم الأجهزة المنزلية 220–240V افتراضيًا. يمكننا تخصيص الجهد ونوع القابس والتردد (50/60Hz) لسوقك المستهدف. يرجى تحديد المتطلبات عند طلب عرض الأسعار.' },
        ]
      },
      {
        category: 'الطلبات والأسعار',
        items: [
          { q: 'ما هو الحد الأدنى لكمية الطلب (MOQ)؟', a: 'الحد الأدنى للطلب القياسي هو 100 قطعة لكل طراز لمعظم المنتجات. المنتجات المخصصة/OEM تتطلب عادةً 500 قطعة كحد أدنى. بعض العناصر عالية القيمة مثل محطات الطاقة المحمولة لديها حد أدنى للطلب يبلغ 50 قطعة.' },
          { q: 'ما هي شروط الدفع التي تقبلونها؟', a: 'نقبل التحويل البنكي (T/T) مع دفعة أولى 30% و70% قبل الشحن. للطلبات التي تزيد عن 20,000 دولار، نقبل أيضًا الاعتماد المستندي L/C عند الرؤية. يتوفر PayPal فقط لطلبات العينات.' },
          { q: 'هل يمكنني مزج منتجات مختلفة في طلب واحد؟', a: 'نعم. يمكنك مزج وحدات SKU عبر فئات الطاقة الشمسية والأجهزة المنزلية والإلكترونيات في حاوية واحدة. يجب أن يصل إجمالي قيمة الطلب إلى الحد الأدنى البالغ 3,000 دولار لكل شحنة.' },
          { q: 'هل تقدمون اتفاقيات توزيع حصرية؟', a: 'نعم. للمشترين الملتزمين بحجم شراء سنوي يبلغ 100,000 دولار أو أكثر، نقدم حقوق توزيع إقليمية حصرية مع أسعار محمية ودعم تسويقي.' },
        ]
      },
      {
        category: 'وقت التسليم والشحن',
        items: [
          { q: 'ما هو وقت التسليم القياسي؟', a: 'وقت التسليم القياسي هو 20–35 يومًا بعد تأكيد الدفعة. يتم شحن العناصر المتوفرة في المخزون خلال 5–10 أيام. طلبات OEM/ODM مع قوالب مخصصة تستغرق 30–45 يومًا. قد تضيف موسم الذروة (الربع الرابع) 5–10 أيام.' },
          { q: 'ما هي طرق الشحن التي تقدمونها؟', a: 'نقدم الشحن البحري (FOB شنتشن/CIF/DDP) والشحن الجوي والبريد السريع (DHL/FedEx/UPS). لحاويات الحمولة الكاملة (FCL)، نوصي بالشحن البحري. للعينات العاجلة، البريد السريع هو الأسرع.' },
          { q: 'ما هي شروط التجارة (Incoterms) التي تدعمونها؟', a: 'ندعم EXW وFOB شنتشن وCIF وDDP. FOB هو شرطنا القياسي. DDP (التسليم مع دفع الرسوم الجمركية) متاح للاتحاد الأوروبي والولايات المتحدة والمملكة المتحدة وبعض وجهات الشرق الأوسط بالترتيب المسبق.' },
          { q: 'كم يستغرق الشحن؟', a: 'الشحن البحري: 15–35 يومًا حسب الوجهة. الشحن الجوي: 5–10 أيام. البريد السريع: 3–7 أيام. نقدم أرقام التتبع ومستندات الشحن خلال 24 ساعة من الإرسال.' },
        ]
      },
      {
        category: 'OEM وODM والتخصيص',
        items: [
          { q: 'هل تدعمون OEM والعلامة التجارية الخاصة؟', a: 'نعم. نقدم خدمات OEM الكاملة بما في ذلك طباعة الشعار المخصص والتغليف بالعلامة التجارية الخاصة وأدلة المستخدم وتصميم علب الهدايا. الحد الأدنى للطلب للعلامة التجارية OEM يبدأ من 100 قطعة مع دعم تصميم الشعار المجاني.' },
          { q: 'ما هو الفرق بين OEM وODM في HousePlus؟', a: 'OEM: تقدم التصميم/المواصفات، ونحن نصنع وفقًا لمتطلباتك. ODM: تختار من تصاميمنا الحالية ونطبق علامتك التجارية. ODM أسرع (20–35 يومًا) وحد أدنى للطلب أقل (100 قطعة). OEM مع قوالب مخصصة يستغرق 30–45 يومًا وحد أدنى للطلب 500 قطعة.' },
          { q: 'هل يمكنكم تخصيص ألوان ومواصفات المنتجات؟', a: 'نعم. ندعم مطابقة ألوان Pantone وطباعة الشعار بالشاشة الحريرية/الأشعة فوق البنفسجية وأطوال الكابلات المخصصة وتباينات السعة وتخصيص البرامج الثابتة للمنتجات الذكية. تطوير القوالب المخصصة متاح أيضًا.' },
          { q: 'كم تكلفة التغليف المخصص؟', a: 'التغليف OEM القياسي (شعار مخصص على الصندوق الحالي) مجاني لطلبات 500+ قطعة. تصميم علبة هدية مخصصة بالكامل يبدأ من 0.50–1.20 دولار للوحدة حسب المادة وتعقيد الطباعة.' },
        ]
      },
      {
        category: 'الضمان وما بعد البيع',
        items: [
          { q: 'ما هو الضمان الذي تقدمونه؟', a: 'تأتي جميع منتجات HousePlus بضمان 24 شهرًا ضد عيوب التصنيع. الألواح الشمسية تحمل ضمان أداء لمدة 25 عامًا. البطاريات لديها ضمان عمر يبلغ 3000+ دورة. تتم معالجة مطالبات الضمان خلال 48 ساعة.' },
          { q: 'ما هي معدل العيوب لديكم؟', a: 'معدل العيوب الحالي لدينا أقل من 0.3% بفضل عملية مراقبة الجودة من 5 مراحل (فحص المواد الواردة → الفحص أثناء العملية → الاختبار الوظيفي → اختبار التقادم → الفحص العشوائي النهائي).' },
          { q: 'كيف تتعاملون مع المنتجات المعيبة؟', a: 'لمطالبات الضمان، نقدم قطع غيار مجانية أو استبدال كامل للمنتج أو إشعارات ائتمان وفقًا لتقديرنا. للحالات العاجلة، يمكننا شحن البدائل جوًا خلال 72 ساعة. مطلوب دليل فيديو للتحقق من المطالبة.' },
          { q: 'هل تقدمون قطع الغيار؟', a: 'نعم. نحافظ على مخزون قطع الغيار لجميع خطوط الإنتاج النشطة. قطع الغيار الشائعة (الكابلات والمحولات وأجهزة التحكم عن بعد) متاحة بتكلفة الشراء. نوصي بطلب 2–3% من قطع الغيار مع طلبك بالجملة لدعم ما بعد البيع المحلي.' },
        ]
      },
    ],
  };

  const content = faqs[lang] || faqs.en;
  const allFaqs = content.flatMap((cat: any) => cat.items.map((item: any) => ({ question: item.q, answer: item.a })));
  const faqSchema = generateFAQSchema(allFaqs);

  return (
    <>
      <SEOHead schemas={[faqSchema]} />
      <main className="min-h-screen bg-white">
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
              HousePlus FAQ
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find answers to common questions about HousePlus products and services.
            </p>
          </div>
        </section>

        {/* FAQ Banner Image - Using reliable Unsplash link */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop"
                alt="HousePlus customer support team answering wholesale buyer questions"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/30" />
            </div>
          </div>
        </section>

        {/* GEO Lead-in Banner */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <p className="text-amber-900 leading-relaxed">
                <strong>HousePlus Quick Overview:</strong> Founded in 2010, we operate a 20,000 m² ISO 9001 certified factory in Guangdong, China. With 16 years of manufacturing experience, we serve 441+ wholesale clients across 53+ countries. Our B2B terms include MOQ 100–500 pcs, 20–35 day lead time, and a 24-month warranty. All products carry CE, FCC, RoHS, and IEC certifications. OEM/ODM services are available.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {content.map((category: any, catIdx: number) => (
              <div key={catIdx} className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-slate-900 pb-4 border-b-2 border-blue-200">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {lang === 'en' && catIdx === 0 && (
                    <details className="bg-white p-6 rounded-2xl border border-amber-200 hover:shadow-md transition-shadow group">
                      <summary className="text-xl font-bold text-amber-800 cursor-pointer flex items-center justify-between">
                        <span>Quick Facts — HousePlus at a Glance</span>
                        <span className="text-amber-600 text-sm font-normal group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">🏭</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">20,000 m² Factory</p>
                            <p className="text-slate-600 text-xs">ISO 9001 certified since 2010</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">🌍</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">53+ Countries</p>
                            <p className="text-slate-600 text-xs">441+ wholesale clients served</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">📦</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">MOQ 100–500 pcs</p>
                            <p className="text-slate-600 text-xs">Flexible for standard & custom orders</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">🚚</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">20–35 Day Lead Time</p>
                            <p className="text-slate-600 text-xs">From order confirmation to shipment</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">🛡️</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">24-Month Warranty</p>
                            <p className="text-slate-600 text-xs">Comprehensive after-sales support</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">✅</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">CE, FCC, RoHS, IEC</p>
                            <p className="text-slate-600 text-xs">Full international certification</p>
                          </div>
                        </div>
                      </div>
                    </details>
                  )}
                  {category.items.map((item: any, itemIdx: number) => (
                    <div key={itemIdx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold mb-3 text-slate-900">Q: {item.q}</h3>
                      <p className="text-slate-600 leading-relaxed">A: {item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still have HousePlus questions?</h2>
            <p className="text-slate-400 mb-8">Contact our HousePlus support team for more information.</p>
            <a href={`/${lang}/contact`} className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Contact HousePlus
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
