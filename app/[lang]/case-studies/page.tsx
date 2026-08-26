import { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'] as const;
type Lang = (typeof validLangs)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

type CaseStudy = {
  region: string;
  icon: string;
  clientType: string;
  location: string;
  volume: string;
  productMix: string;
  partnership: string;
  keyResults: string[];
  color: string;
  badgeColor: string;
};

type PageCopy = {
  title: string;
  description: string;
  organizationDescription: string;
  home: string;
  breadcrumb: string;
  clientsBadge: string;
  countriesBadge: string;
  sinceBadge: string;
  heroTitle: string;
  heroDescription: string;
  stats: { value: string; label: string }[];
  storiesTitle: string;
  storiesDescription: string;
  partnershipLabel: string;
  annualVolumeLabel: string;
  productMixLabel: string;
  keyResultsLabel: string;
  caseStudies: CaseStudy[];
  trustTitle: string;
  trustItems: { title: string; desc: string }[];
  imageAlt: string;
  ctaTitle: string;
  ctaDescription: string;
  quote: string;
  browse: string;
};

const pageCopy: Record<Lang, PageCopy> = {
  en: {
    title: 'HousePlus Case Studies — 441+ Clients in 53+ Countries',
    description: 'Discover how HousePlus serves 441+ wholesale clients across 53+ countries with solar systems, appliances and electronics. Real partnerships, proven results.',
    organizationDescription: 'HousePlus has served 441+ wholesale clients across 53+ countries since 2010, delivering solar energy systems, home appliances and 3C electronics with 12-month warranty and 20–35 day lead time from a 20,000 m² factory.',
    home: 'Home',
    breadcrumb: 'Case Studies',
    clientsBadge: '441+ Wholesale Clients',
    countriesBadge: '53+ Countries',
    sinceBadge: 'Since 2010',
    heroTitle: 'HousePlus Case Studies — 441+ Wholesale Clients in 53+ Countries',
    heroDescription: 'HousePlus has served 441+ wholesale clients across 53+ countries since 2010, delivering solar energy systems, home appliances and 3C electronics with 12-month warranty and 20–35 day lead time from a 20,000 m² factory. Explore how global buyers partner with HousePlus for long-term growth.',
    stats: [
      { value: '441+', label: 'Wholesale Clients' },
      { value: '53+', label: 'Countries Served' },
      { value: '12', label: 'Month Warranty' },
      { value: '2010', label: 'Founded Year' },
    ],
    storiesTitle: 'HousePlus Client Success Stories',
    storiesDescription: 'Real partnerships, measurable results — how HousePlus powers wholesale growth across four continents.',
    partnershipLabel: 'Partnership',
    annualVolumeLabel: 'Annual Volume',
    productMixLabel: 'Product Mix',
    keyResultsLabel: 'Key Results',
    caseStudies: [
      { region: 'Europe', icon: '☀️', clientType: 'Solar Energy Wholesaler', location: 'Germany & Poland', volume: '8,000–12,000 pcs annually', productMix: 'Solar panels (400W & 550W), MPPT inverters, LiFePO4 batteries, mounting systems', partnership: '6 years (since 2019)', keyResults: ['Achieved 23% cost reduction versus previous Asian supplier', 'Zero customs clearance issues with full CE & IEC documentation', 'On-time delivery rate: 97.3% over 24 consecutive orders', 'Re-order rate: 4.2 times per year'], color: 'bg-amber-50 border-amber-100', badgeColor: 'bg-amber-100 text-amber-700' },
      { region: 'Middle East', icon: '🏠', clientType: 'Home Appliance Importer', location: 'UAE & Saudi Arabia', volume: '5,000–8,000 pcs annually', productMix: 'Air fryers, induction cooktops, electric kettles, rice cookers', partnership: '4 years (since 2021)', keyResults: ['SASO and GCC certification support enabled market entry', 'Custom Arabic-language packaging and user manuals', '30-day DDP delivery to Dubai warehouse', 'Annual growth: 35% year-over-year in order volume'], color: 'bg-blue-50 border-blue-100', badgeColor: 'bg-blue-100 text-blue-700' },
      { region: 'Africa', icon: '📱', clientType: '3C Electronics Distributor', location: 'Nigeria & Kenya', volume: '15,000–20,000 pcs annually', productMix: 'TWS earphones, portable power banks, LED desk lamps, USB cables', partnership: '5 years (since 2020)', keyResults: ['SONCAP and CE documentation provided for all shipments', 'Custom colour variants matching local market preferences', 'Mixed-container strategy reduced freight cost by 18%', 'Defect rate below 0.4% — lowest in client’s supplier portfolio'], color: 'bg-green-50 border-green-100', badgeColor: 'bg-green-100 text-green-700' },
      { region: 'South America', icon: '🌍', clientType: 'Mixed-Product Procurement Client', location: 'Brazil & Colombia', volume: '6,000–10,000 pcs annually', productMix: 'Solar street lights, blenders, smart watches, portable fans', partnership: '3 years (since 2022)', keyResults: ['One-stop sourcing across 3 product categories reduced vendor count from 7 to 1', 'INMETRO compliance support for appliance lines', 'Custom 220V/60Hz configurations for Brazilian grid', 'Payment terms: 30% deposit + 70% CAD via LC — fully honoured'], color: 'bg-rose-50 border-rose-100', badgeColor: 'bg-rose-100 text-rose-700' },
    ],
    trustTitle: 'Why Wholesale Buyers Trust HousePlus',
    trustItems: [
      { title: 'Consistent Quality', desc: 'ISO 9001-aligned QC with 4 in-process checkpoints and 100% final functional test.' },
      { title: 'Reliable Lead Times', desc: 'Standard orders ship within 20–35 days. 97%+ on-time delivery rate tracked over 6 years.' },
      { title: 'Full Certification Support', desc: 'CE, FCC, RoHS, IEC, UN38.3 and market-specific documentation (SASO, SONCAP, INMETRO) provided.' },
      { title: 'Flexible Terms', desc: 'MOQ from 100 pcs, volume discounts at 200/500/1000+ tiers, and multiple payment options.' },
      { title: 'Dedicated Account Management', desc: 'Each client receives a single point of contact for quotations, production updates and after-sales support.' },
    ],
    imageAlt: 'HousePlus global wholesale partnerships and logistics review',
    ctaTitle: 'Join 441+ Wholesale Clients Worldwide',
    ctaDescription: 'Whether you are a solar distributor, appliance importer or electronics retailer — HousePlus has the production capacity, certification support and export experience to grow your business. Get a tailored quotation within 24 hours.',
    quote: 'Request a Quote',
    browse: 'Browse Products',
  },
  es: {
    title: 'Casos de éxito de HousePlus — Más de 441 clientes en 53 países',
    description: 'Descubra cómo HousePlus atiende a más de 441 clientes mayoristas en 53 países con sistemas solares, electrodomésticos y electrónica. Alianzas reales, resultados probados.',
    organizationDescription: 'Desde 2010, HousePlus ha atendido a más de 441 clientes mayoristas en 53 países, suministrando sistemas de energía solar, electrodomésticos y electrónica 3C con garantía de 12 meses y un plazo de entrega de 20–35 días desde una fábrica de 20.000 m².',
    home: 'Inicio', breadcrumb: 'Casos de éxito', clientsBadge: 'Más de 441 clientes mayoristas', countriesBadge: '53+ países', sinceBadge: 'Desde 2010',
    heroTitle: 'Casos de éxito de HousePlus — Más de 441 clientes mayoristas en 53 países',
    heroDescription: 'Desde 2010, HousePlus ha atendido a más de 441 clientes mayoristas en 53 países, suministrando sistemas de energía solar, electrodomésticos y electrónica 3C con garantía de 12 meses y un plazo de entrega de 20–35 días desde una fábrica de 20.000 m². Descubra cómo los compradores internacionales colaboran con HousePlus para crecer a largo plazo.',
    stats: [{ value: '441+', label: 'Clientes mayoristas' }, { value: '53+', label: 'Países atendidos' }, { value: '12', label: 'Meses de garantía' }, { value: '2010', label: 'Año de fundación' }],
    storiesTitle: 'Historias de éxito de clientes de HousePlus', storiesDescription: 'Alianzas reales y resultados medibles: así impulsa HousePlus el crecimiento mayorista en cuatro continentes.', partnershipLabel: 'Colaboración', annualVolumeLabel: 'Volumen anual', productMixLabel: 'Mezcla de productos', keyResultsLabel: 'Resultados clave',
    caseStudies: [
      { region: 'Europa', icon: '☀️', clientType: 'Mayorista de energía solar', location: 'Alemania y Polonia', volume: '8.000–12.000 unidades al año', productMix: 'Paneles solares (400 W y 550 W), inversores MPPT, baterías LiFePO4 y sistemas de montaje', partnership: '6 años (desde 2019)', keyResults: ['Reducción de costes del 23 % frente al proveedor asiático anterior', 'Cero incidencias de despacho aduanero con documentación CE e IEC completa', 'Entrega puntual del 97,3 % en 24 pedidos consecutivos', 'Tasa de recompra: 4,2 veces al año'], color: 'bg-amber-50 border-amber-100', badgeColor: 'bg-amber-100 text-amber-700' },
      { region: 'Oriente Medio', icon: '🏠', clientType: 'Importador de electrodomésticos', location: 'EAU y Arabia Saudí', volume: '5.000–8.000 unidades al año', productMix: 'Freidoras de aire, placas de inducción, hervidores eléctricos y arroceras', partnership: '4 años (desde 2021)', keyResults: ['El apoyo para las certificaciones SASO y GCC facilitó la entrada al mercado', 'Embalaje y manuales de usuario personalizados en árabe', 'Entrega DDP en 30 días al almacén de Dubái', 'Crecimiento anual del 35 % en el volumen de pedidos'], color: 'bg-blue-50 border-blue-100', badgeColor: 'bg-blue-100 text-blue-700' },
      { region: 'África', icon: '📱', clientType: 'Distribuidor de electrónica 3C', location: 'Nigeria y Kenia', volume: '15.000–20.000 unidades al año', productMix: 'Auriculares TWS, baterías externas, lámparas LED de escritorio y cables USB', partnership: '5 años (desde 2020)', keyResults: ['Documentación SONCAP y CE para todos los envíos', 'Variantes de color personalizadas según las preferencias locales', 'La estrategia de contenedores mixtos redujo el transporte un 18 %', 'Tasa de defectos inferior al 0,4 %, la más baja de la cartera de proveedores del cliente'], color: 'bg-green-50 border-green-100', badgeColor: 'bg-green-100 text-green-700' },
      { region: 'Sudamérica', icon: '🌍', clientType: 'Cliente de compras multiproducto', location: 'Brasil y Colombia', volume: '6.000–10.000 unidades al año', productMix: 'Farolas solares, batidoras, relojes inteligentes y ventiladores portátiles', partnership: '3 años (desde 2022)', keyResults: ['El abastecimiento integral en 3 categorías redujo de 7 a 1 el número de proveedores', 'Apoyo de conformidad INMETRO para las líneas de electrodomésticos', 'Configuraciones personalizadas de 220 V/60 Hz para la red brasileña', 'Condiciones de pago: 30 % de anticipo y 70 % CAD mediante LC, cumplidas íntegramente'], color: 'bg-rose-50 border-rose-100', badgeColor: 'bg-rose-100 text-rose-700' },
    ],
    trustTitle: 'Por qué los compradores mayoristas confían en HousePlus', trustItems: [{ title: 'Calidad constante', desc: 'Control de calidad alineado con ISO 9001, con 4 puntos de control durante el proceso y prueba funcional final al 100 %.' }, { title: 'Plazos fiables', desc: 'Los pedidos estándar se envían en 20–35 días. Tasa de entrega puntual superior al 97 % registrada durante 6 años.' }, { title: 'Asistencia completa en certificaciones', desc: 'Se proporciona documentación CE, FCC, RoHS, IEC, UN38.3 y documentación específica de cada mercado (SASO, SONCAP e INMETRO).' }, { title: 'Condiciones flexibles', desc: 'MOQ desde 100 unidades, descuentos por volumen en niveles de 200/500/1000+ unidades y varias opciones de pago.' }, { title: 'Gestión de cuentas dedicada', desc: 'Cada cliente cuenta con un interlocutor único para presupuestos, actualizaciones de producción y servicio posventa.' }], imageAlt: 'Alianzas mayoristas y revisión logística global de HousePlus', ctaTitle: 'Únase a más de 441 clientes mayoristas en todo el mundo', ctaDescription: 'Tanto si es distribuidor solar, importador de electrodomésticos o minorista de electrónica, HousePlus cuenta con capacidad de producción, apoyo de certificación y experiencia exportadora para hacer crecer su negocio. Reciba un presupuesto personalizado en 24 horas.', quote: 'Solicitar presupuesto', browse: 'Ver productos',
  },
  de: {
    title: 'HousePlus Referenzkunden — 441+ Kunden in 53+ Ländern',
    description: 'Erfahren Sie, wie HousePlus mehr als 441 Großhandelskunden in 53 Ländern mit Solarsystemen, Haushaltsgeräten und Elektronik beliefert. Echte Partnerschaften, nachweisbare Ergebnisse.',
    organizationDescription: 'HousePlus beliefert seit 2010 mehr als 441 Großhandelskunden in 53 Ländern mit Solarenergiesystemen, Haushaltsgeräten und 3C-Elektronik. Die Lieferung erfolgt ab einem 20.000 m² großen Werk mit 12 Monaten Garantie und 20–35 Tagen Lieferzeit.',
    home: 'Startseite', breadcrumb: 'Referenzkunden', clientsBadge: '441+ Großhandelskunden', countriesBadge: '53+ Länder', sinceBadge: 'Seit 2010',
    heroTitle: 'HousePlus Referenzkunden — 441+ Großhandelskunden in 53+ Ländern',
    heroDescription: 'Seit 2010 beliefert HousePlus mehr als 441 Großhandelskunden in 53 Ländern mit Solarenergiesystemen, Haushaltsgeräten und 3C-Elektronik. Die Produkte werden ab einem 20.000 m² großen Werk mit 12 Monaten Garantie und 20–35 Tagen Lieferzeit geliefert. Erfahren Sie, wie internationale Einkäufer mit HousePlus langfristig wachsen.',
    stats: [{ value: '441+', label: 'Großhandelskunden' }, { value: '53+', label: 'Belieferte Länder' }, { value: '12', label: 'Monate Garantie' }, { value: '2010', label: 'Gründungsjahr' }], storiesTitle: 'Erfolgsgeschichten der HousePlus-Kunden', storiesDescription: 'Echte Partnerschaften und messbare Ergebnisse: So unterstützt HousePlus das Großhandelswachstum auf vier Kontinenten.', partnershipLabel: 'Partnerschaft', annualVolumeLabel: 'Jahresvolumen', productMixLabel: 'Produktmix', keyResultsLabel: 'Wichtigste Ergebnisse',
    caseStudies: [
      { region: 'Europa', icon: '☀️', clientType: 'Solarenergie-Großhändler', location: 'Deutschland und Polen', volume: '8.000–12.000 Stück jährlich', productMix: 'Solarmodule (400 W und 550 W), MPPT-Wechselrichter, LiFePO4-Batterien und Montagesysteme', partnership: '6 Jahre (seit 2019)', keyResults: ['23 % Kostenreduzierung gegenüber dem vorherigen asiatischen Lieferanten', 'Keine Probleme bei der Zollabfertigung dank vollständiger CE- und IEC-Dokumentation', '97,3 % pünktliche Lieferungen über 24 aufeinanderfolgende Bestellungen', 'Nachbestellrate: 4,2-mal pro Jahr'], color: 'bg-amber-50 border-amber-100', badgeColor: 'bg-amber-100 text-amber-700' },
      { region: 'Nahost', icon: '🏠', clientType: 'Importeur von Haushaltsgeräten', location: 'VAE und Saudi-Arabien', volume: '5.000–8.000 Stück jährlich', productMix: 'Heißluftfritteusen, Induktionskochfelder, Wasserkocher und Reiskocher', partnership: '4 Jahre (seit 2021)', keyResults: ['Unterstützung bei SASO- und GCC-Zertifizierungen ermöglichte den Markteintritt', 'Individuelle arabische Verpackungen und Benutzerhandbücher', 'DDP-Lieferung innerhalb von 30 Tagen an das Lager in Dubai', 'Jährliches Wachstum des Bestellvolumens: 35 %'], color: 'bg-blue-50 border-blue-100', badgeColor: 'bg-blue-100 text-blue-700' },
      { region: 'Afrika', icon: '📱', clientType: '3C-Elektronik-Distributor', location: 'Nigeria und Kenia', volume: '15.000–20.000 Stück jährlich', productMix: 'TWS-Ohrhörer, Powerbanks, LED-Schreibtischlampen und USB-Kabel', partnership: '5 Jahre (seit 2020)', keyResults: ['SONCAP- und CE-Dokumentation für alle Lieferungen', 'Individuelle Farbvarianten nach den Vorlieben des lokalen Marktes', 'Gemischte Containerstrategie reduzierte Frachtkosten um 18 %', 'Fehlerquote unter 0,4 % – der niedrigste Wert im Lieferantenportfolio des Kunden'], color: 'bg-green-50 border-green-100', badgeColor: 'bg-green-100 text-green-700' },
      { region: 'Südamerika', icon: '🌍', clientType: 'Beschaffungskunde für mehrere Produktgruppen', location: 'Brasilien und Kolumbien', volume: '6.000–10.000 Stück jährlich', productMix: 'Solarstraßenleuchten, Mixer, Smartwatches und tragbare Ventilatoren', partnership: '3 Jahre (seit 2022)', keyResults: ['One-Stop-Beschaffung in 3 Kategorien reduzierte die Lieferantenzahl von 7 auf 1', 'INMETRO-Konformitätsunterstützung für Haushaltsgeräte', 'Individuelle 220-V/60-Hz-Konfigurationen für das brasilianische Stromnetz', 'Zahlungsbedingungen: 30 % Anzahlung und 70 % CAD per LC – vollständig eingehalten'], color: 'bg-rose-50 border-rose-100', badgeColor: 'bg-rose-100 text-rose-700' },
    ],
    trustTitle: 'Warum Großhandelskunden HousePlus vertrauen', trustItems: [{ title: 'Konstante Qualität', desc: 'ISO-9001-orientierte Qualitätskontrolle mit 4 Prüfungen während des Prozesses und 100 % abschließendem Funktionstest.' }, { title: 'Zuverlässige Lieferzeiten', desc: 'Standardbestellungen werden innerhalb von 20–35 Tagen versendet. Über 6 Jahre wurde eine pünktliche Lieferquote von mehr als 97 % erfasst.' }, { title: 'Umfassende Zertifizierungsunterstützung', desc: 'CE-, FCC-, RoHS-, IEC- und UN38.3-Dokumentation sowie marktspezifische Unterlagen (SASO, SONCAP, INMETRO) werden bereitgestellt.' }, { title: 'Flexible Konditionen', desc: 'MOQ ab 100 Stück, Mengenrabatte ab 200/500/1000+ Stück und mehrere Zahlungsoptionen.' }, { title: 'Persönliche Kundenbetreuung', desc: 'Jeder Kunde erhält einen festen Ansprechpartner für Angebote, Produktionsupdates und After-Sales-Service.' }], imageAlt: 'Globale Großhandelspartnerschaften und Logistikprüfung von HousePlus', ctaTitle: 'Werden Sie einer von 441+ Großhandelskunden weltweit', ctaDescription: 'Ob Solardistributor, Haushaltsgeräteimporteur oder Elektronikhändler: HousePlus verfügt über Produktionskapazität, Zertifizierungsunterstützung und Exporterfahrung, um Ihr Geschäft auszubauen. Erhalten Sie innerhalb von 24 Stunden ein individuelles Angebot.', quote: 'Angebot anfordern', browse: 'Produkte ansehen',
  },
  fr: {
    title: 'Références HousePlus — Plus de 441 clients dans 53 pays',
    description: 'Découvrez comment HousePlus accompagne plus de 441 clients grossistes dans 53 pays avec des systèmes solaires, de l’électroménager et de l’électronique. Des partenariats concrets et des résultats éprouvés.',
    organizationDescription: 'Depuis 2010, HousePlus accompagne plus de 441 clients grossistes dans 53 pays avec des systèmes solaires, de l’électroménager et de l’électronique 3C. Les produits sont expédiés depuis une usine de 20 000 m² avec une garantie de 12 mois et un délai de 20 à 35 jours.',
    home: 'Accueil', breadcrumb: 'Références', clientsBadge: 'Plus de 441 clients grossistes', countriesBadge: '53+ pays', sinceBadge: 'Depuis 2010',
    heroTitle: 'Références HousePlus — Plus de 441 clients grossistes dans 53 pays',
    heroDescription: 'Depuis 2010, HousePlus accompagne plus de 441 clients grossistes dans 53 pays avec des systèmes solaires, de l’électroménager et de l’électronique 3C. Les produits sont expédiés depuis une usine de 20 000 m² avec une garantie de 12 mois et un délai de 20 à 35 jours. Découvrez comment les acheteurs internationaux développent leur activité avec HousePlus sur le long terme.',
    stats: [{ value: '441+', label: 'Clients grossistes' }, { value: '53+', label: 'Pays desservis' }, { value: '12', label: 'Mois de garantie' }, { value: '2010', label: 'Année de création' }], storiesTitle: 'Réussites des clients HousePlus', storiesDescription: 'Des partenariats concrets et des résultats mesurables : HousePlus accompagne la croissance des grossistes sur quatre continents.', partnershipLabel: 'Partenariat', annualVolumeLabel: 'Volume annuel', productMixLabel: 'Gamme de produits', keyResultsLabel: 'Résultats clés',
    caseStudies: [
      { region: 'Europe', icon: '☀️', clientType: 'Grossiste en énergie solaire', location: 'Allemagne et Pologne', volume: '8 000–12 000 pièces par an', productMix: 'Panneaux solaires (400 W et 550 W), onduleurs MPPT, batteries LiFePO4 et systèmes de montage', partnership: '6 ans (depuis 2019)', keyResults: ['Réduction des coûts de 23 % par rapport au précédent fournisseur asiatique', 'Aucun problème de dédouanement grâce aux dossiers CE et IEC complets', 'Taux de livraison à temps de 97,3 % sur 24 commandes consécutives', 'Taux de réassort : 4,2 fois par an'], color: 'bg-amber-50 border-amber-100', badgeColor: 'bg-amber-100 text-amber-700' },
      { region: 'Moyen-Orient', icon: '🏠', clientType: 'Importateur d’électroménager', location: 'Émirats arabes unis et Arabie saoudite', volume: '5 000–8 000 pièces par an', productMix: 'Friteuses à air, plaques à induction, bouilloires électriques et cuiseurs à riz', partnership: '4 ans (depuis 2021)', keyResults: ['L’accompagnement pour les certifications SASO et GCC a facilité l’entrée sur le marché', 'Emballages et modes d’emploi personnalisés en arabe', 'Livraison DDP en 30 jours jusqu’à l’entrepôt de Dubaï', 'Croissance annuelle de 35 % du volume des commandes'], color: 'bg-blue-50 border-blue-100', badgeColor: 'bg-blue-100 text-blue-700' },
      { region: 'Afrique', icon: '📱', clientType: 'Distributeur d’électronique 3C', location: 'Nigeria et Kenya', volume: '15 000–20 000 pièces par an', productMix: 'Écouteurs TWS, batteries externes, lampes de bureau LED et câbles USB', partnership: '5 ans (depuis 2020)', keyResults: ['Dossiers SONCAP et CE fournis pour toutes les expéditions', 'Variantes de couleurs personnalisées selon les préférences locales', 'La stratégie de conteneurs mixtes a réduit le coût du fret de 18 %', 'Taux de défaut inférieur à 0,4 %, le plus bas du portefeuille de fournisseurs du client'], color: 'bg-green-50 border-green-100', badgeColor: 'bg-green-100 text-green-700' },
      { region: 'Amérique du Sud', icon: '🌍', clientType: 'Client d’approvisionnement multi-produits', location: 'Brésil et Colombie', volume: '6 000–10 000 pièces par an', productMix: 'Lampadaires solaires, blenders, montres connectées et ventilateurs portables', partnership: '3 ans (depuis 2022)', keyResults: ['L’achat centralisé dans 3 catégories a réduit le nombre de fournisseurs de 7 à 1', 'Accompagnement de la conformité INMETRO pour les gammes d’électroménager', 'Configurations 220 V/60 Hz personnalisées pour le réseau brésilien', 'Conditions de paiement : acompte de 30 % et 70 % CAD par LC, respectées intégralement'], color: 'bg-rose-50 border-rose-100', badgeColor: 'bg-rose-100 text-rose-700' },
    ],
    trustTitle: 'Pourquoi les acheteurs grossistes font confiance à HousePlus', trustItems: [{ title: 'Qualité constante', desc: 'Contrôle qualité aligné sur l’ISO 9001, avec 4 points de contrôle en cours de production et un test fonctionnel final à 100 %.' }, { title: 'Délais fiables', desc: 'Les commandes standard sont expédiées sous 20 à 35 jours. Le taux de livraison à temps dépasse 97 % sur 6 ans de suivi.' }, { title: 'Accompagnement complet des certifications', desc: 'Les dossiers CE, FCC, RoHS, IEC, UN38.3 et les documents propres à chaque marché (SASO, SONCAP, INMETRO) sont fournis.' }, { title: 'Conditions flexibles', desc: 'MOQ à partir de 100 pièces, remises par volume à partir de 200/500/1000+ pièces et plusieurs modes de paiement.' }, { title: 'Gestion de compte dédiée', desc: 'Chaque client dispose d’un interlocuteur unique pour les devis, le suivi de production et le service après-vente.' }], imageAlt: 'Partenariats de gros internationaux et revue logistique de HousePlus', ctaTitle: 'Rejoignez plus de 441 clients grossistes dans le monde', ctaDescription: 'Que vous soyez distributeur solaire, importateur d’électroménager ou revendeur d’électronique, HousePlus dispose de la capacité de production, de l’accompagnement réglementaire et de l’expérience export nécessaires au développement de votre activité. Recevez un devis personnalisé sous 24 heures.', quote: 'Demander un devis', browse: 'Voir les produits',
  },
  ar: {
    title: 'دراسات حالة هاوس بلس — أكثر من ٤٤١ عميلاً في ٥٣ دولة',
    description: 'اكتشف كيف تخدم هاوس بلس أكثر من ٤٤١ عميلاً بالجملة في ٥٣ دولة عبر أنظمة الطاقة الشمسية والأجهزة المنزلية والإلكترونيات. شراكات حقيقية ونتائج مثبتة.',
    organizationDescription: 'تخدم هاوس بلس منذ عام 2010 أكثر من ٤٤١ عميلاً بالجملة في ٥٣ دولة، وتوفر أنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C من مصنع مساحته 20,000 متر مربع، مع ضمان 12 شهراً ومدة توريد من 20 إلى 35 يوماً.',
    home: 'الرئيسية', breadcrumb: 'دراسات الحالة', clientsBadge: 'أكثر من ٤٤١ عميلاً بالجملة', countriesBadge: 'أكثر من ٥٣ دولة', sinceBadge: 'منذ 2010',
    heroTitle: 'دراسات حالة هاوس بلس — أكثر من ٤٤١ عميلاً بالجملة في ٥٣ دولة',
    heroDescription: 'منذ عام 2010، تخدم هاوس بلس أكثر من ٤٤١ عميلاً بالجملة في ٥٣ دولة، وتوفر أنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C من مصنع مساحته 20,000 متر مربع، مع ضمان 12 شهراً ومدة توريد من 20 إلى 35 يوماً. تعرّف إلى كيفية تعاون المشترين الدوليين مع هاوس بلس لتحقيق نمو طويل الأمد.',
    stats: [{ value: '441+', label: 'عميل بالجملة' }, { value: '53+', label: 'دولة نخدمها' }, { value: '12', label: 'شهراً من الضمان' }, { value: '2010', label: 'عام التأسيس' }], storiesTitle: 'قصص نجاح عملاء هاوس بلس', storiesDescription: 'شراكات حقيقية ونتائج قابلة للقياس: هكذا تدعم هاوس بلس نمو تجارة الجملة في أربع قارات.', partnershipLabel: 'الشراكة', annualVolumeLabel: 'الحجم السنوي', productMixLabel: 'مزيج المنتجات', keyResultsLabel: 'النتائج الرئيسية',
    caseStudies: [
      { region: 'أوروبا', icon: '☀️', clientType: 'تاجر جملة لأنظمة الطاقة الشمسية', location: 'ألمانيا وبولندا', volume: '8,000–12,000 قطعة سنوياً', productMix: 'ألواح شمسية بقدرة 400 و550 واط، عواكس MPPT، بطاريات LiFePO4 وأنظمة تثبيت', partnership: '6 سنوات (منذ 2019)', keyResults: ['خفض التكاليف بنسبة 23% مقارنة بالمورد الآسيوي السابق', 'عدم وجود مشكلات في التخليص الجمركي بفضل وثائق CE وIEC الكاملة', 'نسبة التسليم في الموعد 97.3% خلال 24 طلباً متتالياً', 'معدل إعادة الطلب 4.2 مرات سنوياً'], color: 'bg-amber-50 border-amber-100', badgeColor: 'bg-amber-100 text-amber-700' },
      { region: 'الشرق الأوسط', icon: '🏠', clientType: 'مستورد أجهزة منزلية', location: 'الإمارات العربية المتحدة والسعودية', volume: '5,000–8,000 قطعة سنوياً', productMix: 'قلايات هوائية، مواقد حثية، غلايات كهربائية وأجهزة طهي الأرز', partnership: '4 سنوات (منذ 2021)', keyResults: ['ساهم دعم شهادات SASO وGCC في دخول السوق', 'عبوات وأدلة استخدام مخصصة باللغة العربية', 'تسليم DDP خلال 30 يوماً إلى مستودع دبي', 'نمو سنوي بنسبة 35% في حجم الطلبات'], color: 'bg-blue-50 border-blue-100', badgeColor: 'bg-blue-100 text-blue-700' },
      { region: 'أفريقيا', icon: '📱', clientType: 'موزع إلكترونيات 3C', location: 'نيجيريا وكينيا', volume: '15,000–20,000 قطعة سنوياً', productMix: 'سماعات TWS، بنوك طاقة محمولة، مصابيح مكتب LED وكابلات USB', partnership: '5 سنوات (منذ 2020)', keyResults: ['توفير وثائق SONCAP وCE لجميع الشحنات', 'خيارات ألوان مخصصة بما يناسب تفضيلات السوق المحلي', 'خفضت استراتيجية الحاويات المختلطة تكلفة الشحن بنسبة 18%', 'معدل عيوب أقل من 0.4%، وهو الأدنى في محفظة موردي العميل'], color: 'bg-green-50 border-green-100', badgeColor: 'bg-green-100 text-green-700' },
      { region: 'أمريكا الجنوبية', icon: '🌍', clientType: 'عميل مشتريات متعدد المنتجات', location: 'البرازيل وكولومبيا', volume: '6,000–10,000 قطعة سنوياً', productMix: 'مصابيح شوارع شمسية، خلاطات، ساعات ذكية ومراوح محمولة', partnership: '3 سنوات (منذ 2022)', keyResults: ['خفض التوريد الشامل عبر 3 فئات عدد الموردين من 7 إلى 1', 'دعم الامتثال لمعيار INMETRO لخطوط الأجهزة المنزلية', 'تهيئات مخصصة بجهد 220 فولت وتردد 60 هرتز للشبكة البرازيلية', 'شروط الدفع: 30% دفعة مقدمة و70% CAD عبر اعتماد مستندي، وتم الالتزام بها بالكامل'], color: 'bg-rose-50 border-rose-100', badgeColor: 'bg-rose-100 text-rose-700' },
    ],
    trustTitle: 'لماذا يثق المشترون بالجملة في هاوس بلس؟', trustItems: [{ title: 'جودة ثابتة', desc: 'نظام مراقبة جودة متوافق مع ISO 9001، يضم 4 نقاط فحص أثناء الإنتاج واختباراً وظيفياً نهائياً بنسبة 100%.' }, { title: 'مواعيد توريد موثوقة', desc: 'تُشحن الطلبات القياسية خلال 20–35 يوماً، مع تسجيل نسبة تسليم في الموعد تتجاوز 97% على مدى 6 سنوات.' }, { title: 'دعم شامل للشهادات', desc: 'نوفر وثائق CE وFCC وRoHS وIEC وUN38.3، إضافة إلى الوثائق الخاصة بكل سوق مثل SASO وSONCAP وINMETRO.' }, { title: 'شروط مرنة', desc: 'حد أدنى للطلب يبدأ من 100 قطعة، وخصومات حجم عند مستويات 200/500/1000+ قطعة، وخيارات دفع متعددة.' }, { title: 'إدارة حساب مخصصة', desc: 'يحصل كل عميل على جهة اتصال واحدة لعروض الأسعار وتحديثات الإنتاج وخدمة ما بعد البيع.' }], imageAlt: 'شراكات هاوس بلس العالمية مع تجار الجملة ومراجعة الخدمات اللوجستية', ctaTitle: 'انضم إلى أكثر من ٤٤١ عميلاً بالجملة حول العالم', ctaDescription: 'سواء كنت موزعاً لأنظمة الطاقة الشمسية أو مستورداً للأجهزة المنزلية أو بائعاً للإلكترونيات، تمتلك هاوس بلس القدرة الإنتاجية ودعم الشهادات وخبرة التصدير اللازمة لتنمية أعمالك. احصل على عرض سعر مخصص خلال 24 ساعة.', quote: 'طلب عرض سعر', browse: 'تصفح المنتجات',
  },
};

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = (validLangs.includes(params.lang as Lang) ? params.lang : 'en') as Lang;
  const copy = pageCopy[lang];
  return generateSEOMetadata({ title: copy.title, description: copy.description, keywords: ['HousePlus case studies', 'wholesale clients', 'solar distributor', 'appliance importer', '3C electronics', 'B2B manufacturing', 'global export'], url: `/${lang}/case-studies`, lang, type: 'website' });
}

export default async function CaseStudiesPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = (validLangs.includes(params.lang as Lang) ? params.lang : 'en') as Lang;
  const copy = pageCopy[lang];
  const organizationSchema = generateOrganizationSchema({ title: 'HousePlus', description: copy.organizationDescription, url: `https://www.houseplus-ch.com/${lang}/case-studies`, lang, type: 'Organization' });
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: copy.home, url: `https://www.houseplus-ch.com/${lang}` }, { name: copy.breadcrumb, url: `https://www.houseplus-ch.com/${lang}/case-studies` }]);

  return (
    <>
      <SEOHead schemas={[organizationSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} slug="case-studies" />
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">{copy.clientsBadge}</span>
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full">{copy.countriesBadge}</span>
              <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest rounded-full">{copy.sinceBadge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">{copy.heroTitle}</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"><strong>HousePlus</strong> {copy.heroDescription.replace(/^HousePlus\s*/i, '')}</p>
          </div>
        </section>
        <section className="py-14 bg-blue-700">
          <div className="max-w-6xl mx-auto px-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">{copy.stats.map((stat) => <div key={stat.label}><p className="text-4xl md:text-5xl font-black mb-2">{stat.value}</p><p className="text-blue-200 text-sm font-medium">{stat.label}</p></div>)}</div></div>
        </section>
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{copy.storiesTitle}</h2><p className="text-slate-500 max-w-xl mx-auto">{copy.storiesDescription}</p></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">{copy.caseStudies.map((cs) => <div key={cs.region} className={`bg-white border rounded-2xl p-8 hover:shadow-lg transition-all ${cs.color}`}>
              <div className="flex items-center gap-3 mb-6"><div className="text-3xl">{cs.icon}</div><div><span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${cs.badgeColor}`}>{cs.region}</span><p className="text-sm text-slate-500 mt-1">{cs.location}</p></div></div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{cs.clientType}</h3><p className="text-sm text-slate-500 mb-6">{copy.partnershipLabel}: {cs.partnership}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"><div className="bg-white/70 rounded-xl p-4 border border-slate-100"><p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{copy.annualVolumeLabel}</p><p className="text-sm font-bold text-slate-900">{cs.volume}</p></div><div className="bg-white/70 rounded-xl p-4 border border-slate-100"><p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{copy.productMixLabel}</p><p className="text-sm font-bold text-slate-900">{cs.productMix}</p></div></div>
              <div><p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">{copy.keyResultsLabel}</p><ul className="space-y-2">{cs.keyResults.map((result, i) => <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><span className="text-blue-500 font-bold flex-shrink-0">✓</span>{result}</li>)}</ul></div>
            </div>)}</div>
          </div>
        </section>
        <section className="py-16 px-4 bg-slate-50"><div className="max-w-6xl mx-auto"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"><div><h2 className="text-3xl font-black text-slate-900 mb-6">{copy.trustTitle}</h2><div className="space-y-4">{copy.trustItems.map((item) => <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100"><span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span><div><p className="font-bold text-slate-900 text-sm">{item.title}</p><p className="text-slate-600 text-sm mt-0.5">{item.desc}</p></div></div>)}</div></div><div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-100"><img src="https://images.houseplus-ch.com/media/houseplus-site-case-studies-logistics-review/" alt={copy.imageAlt} className="object-cover" loading="lazy" title={copy.imageAlt} decoding="async" /></div></div></div></section>
        <section className="py-16 px-4 bg-blue-600 text-white"><div className="max-w-3xl mx-auto text-center"><h2 className="text-3xl font-black mb-4">{copy.ctaTitle}</h2><p className="text-blue-100 mb-8 leading-relaxed">{copy.ctaDescription}</p><div className="flex flex-wrap justify-center gap-4"><Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5">{copy.quote}</Link><Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-700 text-white border border-blue-500 font-bold rounded-xl hover:bg-blue-800 transition-all hover:-translate-y-0.5">{copy.browse}</Link></div></div></section>
      </main>
    </>
  );
}
