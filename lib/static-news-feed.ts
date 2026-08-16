import { r2MediaUrl } from './r2-media-map';

export interface StaticNewsFeedEntry {
  slug: string;
  title: string;
  datePublished: string;
  image: string;
  category: string;
}

const cover = (slug: string) => r2MediaUrl(`/images/articles/covers/${slug}.jpg`);

// These pages predate the data-driven blog registry. The feed deliberately uses
// neutral summaries so that it does not republish unverified product-specific
// commercial, certification, inventory, MOQ or performance statements.
export const staticNewsFeedEntries: StaticNewsFeedEntry[] = [
  { slug: 'consumer-electronics-battery-life-testing', title: 'Battery Cycle Life Testing Standards: Technical Analysis for Consumer Electronics', datePublished: '2026-07-12', image: cover('consumer-electronics-battery-life-testing'), category: '3C Electronics' },
  { slug: 'appliance-energy-efficiency-vs-actual-consumption', title: 'Home Appliance Energy Efficiency Ratings vs Actual Consumption: Technical Analysis', datePublished: '2026-07-08', image: cover('appliance-energy-efficiency-vs-actual-consumption'), category: 'Home Appliances' },
  { slug: 'solar-storage-efficiency-optimization-guide', title: 'Solar Storage Efficiency Optimization: Technical Guide for Industrial Systems', datePublished: '2026-07-03', image: cover('solar-storage-efficiency-optimization-guide'), category: 'Solar & Storage' },
  { slug: '2026-solar-market-update', title: 'Solar Energy Innovations in 2026', datePublished: '2026-03-08', image: cover('2026-solar-market-update'), category: 'Solar & Storage' },
  { slug: '2026-appliances-market-update', title: 'Smart Home Appliances 2026: Energy-Efficient Designs for Global Markets', datePublished: '2026-05-16', image: cover('2026-appliances-market-update'), category: 'Home Appliances' },
  { slug: '2026-electronics-market-update', title: '3C Electronics Trends 2026', datePublished: '2026-04-17', image: cover('2026-electronics-market-update'), category: '3C Electronics' },
  { slug: '2026-smart-home-appliances-market-guide', title: '2026 Global Smart Home Appliance Market Trends & B2B Procurement Guide', datePublished: '2026-05-15', image: cover('2026-smart-home-appliances-market-guide'), category: 'Home Appliances' },
  { slug: 'solar-energy-storage-industrial-manufacturing', title: 'Solar Energy Storage Systems in Industrial Manufacturing', datePublished: '2026-05-15', image: cover('solar-energy-storage-industrial-manufacturing'), category: 'Solar & Storage' },
  { slug: 'oem-odm-manufacturing-guide', title: 'OEM & ODM Manufacturing: Product Development Considerations', datePublished: '2025-09-17', image: cover('oem-odm-manufacturing-guide'), category: 'OEM & ODM' },
  { slug: 'energy-efficiency-standards-appliances', title: 'Energy Efficiency Standards in Modern Appliances', datePublished: '2025-05-08', image: cover('energy-efficiency-standards-appliances'), category: 'Home Appliances' },
  { slug: 'global-wholesale-guide-home-appliances', title: 'Guide to Wholesale Home Appliance Sourcing', datePublished: '2025-01-20', image: cover('global-wholesale-guide-home-appliances'), category: 'Home Appliances' },
  { slug: 'advanced-manufacturing-home-appliances', title: 'Advanced Manufacturing in Home Appliances', datePublished: '2024-10-14', image: cover('advanced-manufacturing-home-appliances'), category: 'Home Appliances' },
  { slug: 'the-future-of-smart-home-appliances', title: 'The Future of Smart Home Appliances', datePublished: '2024-08-01', image: cover('the-future-of-smart-home-appliances'), category: 'Home Appliances' },
  { slug: 'smart-home-appliances', title: 'Smart Home Appliances: Efficiency and Innovation', datePublished: '2023-07-22', image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-smart-home-appliances-connected-living-b2b-guide/', category: 'Home Appliances' },
  { slug: 'solar-energy-storage-solutions', title: 'Solar Energy Storage Solutions', datePublished: '2024-02-19', image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-solar-energy-storage-solutions-b2b-guide/', category: 'Solar & Storage' },
  { slug: 'the-evolution-of-3c-electronics', title: 'The Evolution of 3C Electronics', datePublished: '2023-11-08', image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-evolution-3c-electronics-b2b-guide/', category: '3C Electronics' },
  { slug: 'the-future-of-solar-energy', title: 'The Future of Solar Energy', datePublished: '2023-03-15', image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-future-solar-energy-b2b-guide/', category: 'Solar & Storage' },
];

export function staticNewsFeedDescription(entry: StaticNewsFeedEntry): string {
  return `HousePlus industry insight on ${entry.category}. Product availability, applicable documentation, certification scope and commercial terms are confirmed for each product and destination.`;
}

type LocalizedStaticNews = Pick<StaticNewsFeedEntry, 'title' | 'category'>;
const staticNewsLocales: Record<string, Record<string, LocalizedStaticNews>> = {
  es: {
    'consumer-electronics-battery-life-testing': { title: 'Normas de prueba de vida útil de baterías: análisis técnico para electrónica de consumo', category: 'Electrónica 3C' },
    'appliance-energy-efficiency-vs-actual-consumption': { title: 'Eficiencia energética de electrodomésticos frente al consumo real: análisis técnico', category: 'Electrodomésticos' },
    'solar-storage-efficiency-optimization-guide': { title: 'Optimización de eficiencia del almacenamiento solar: guía técnica para sistemas industriales', category: 'Solar y almacenamiento' },
    '2026-solar-market-update': { title: 'Innovaciones de energía solar en 2026', category: 'Solar y almacenamiento' },
    '2026-appliances-market-update': { title: 'Electrodomésticos inteligentes 2026: diseños eficientes para mercados globales', category: 'Electrodomésticos' },
    '2026-electronics-market-update': { title: 'Tendencias de electrónica 3C en 2026', category: 'Electrónica 3C' },
    '2026-smart-home-appliances-market-guide': { title: 'Tendencias globales 2026 de electrodomésticos inteligentes y guía de compras B2B', category: 'Electrodomésticos' },
    'solar-energy-storage-industrial-manufacturing': { title: 'Sistemas de almacenamiento de energía solar en fabricación industrial', category: 'Solar y almacenamiento' },
    'oem-odm-manufacturing-guide': { title: 'Fabricación OEM y ODM: consideraciones para el desarrollo de productos', category: 'OEM y ODM' },
    'energy-efficiency-standards-appliances': { title: 'Normas de eficiencia energética en electrodomésticos modernos', category: 'Electrodomésticos' },
    'global-wholesale-guide-home-appliances': { title: 'Guía de abastecimiento mayorista de electrodomésticos', category: 'Electrodomésticos' },
    'advanced-manufacturing-home-appliances': { title: 'Fabricación avanzada de electrodomésticos', category: 'Electrodomésticos' },
    'the-future-of-smart-home-appliances': { title: 'El futuro de los electrodomésticos inteligentes', category: 'Electrodomésticos' },
    'smart-home-appliances': { title: 'Electrodomésticos inteligentes: eficiencia e innovación', category: 'Electrodomésticos' },
    'solar-energy-storage-solutions': { title: 'Soluciones de almacenamiento de energía solar', category: 'Solar y almacenamiento' },
    'the-evolution-of-3c-electronics': { title: 'La evolución de la electrónica 3C', category: 'Electrónica 3C' },
    'the-future-of-solar-energy': { title: 'El futuro de la energía solar', category: 'Solar y almacenamiento' },
  },
  de: {
    'consumer-electronics-battery-life-testing': { title: 'Standards für Batteriezykluslebensdauer: technische Analyse für Unterhaltungselektronik', category: '3C-Elektronik' },
    'appliance-energy-efficiency-vs-actual-consumption': { title: 'Energieeffizienz von Haushaltsgeräten und tatsächlicher Verbrauch: technische Analyse', category: 'Haushaltsgeräte' },
    'solar-storage-efficiency-optimization-guide': { title: 'Optimierung der Solarspeicher-Effizienz: technischer Leitfaden für Industriesysteme', category: 'Solar und Speicher' },
    '2026-solar-market-update': { title: 'Solarenergie-Innovationen im Jahr 2026', category: 'Solar und Speicher' },
    '2026-appliances-market-update': { title: 'Smarte Haushaltsgeräte 2026: energieeffiziente Designs für globale Märkte', category: 'Haushaltsgeräte' },
    '2026-electronics-market-update': { title: '3C-Elektroniktrends 2026', category: '3C-Elektronik' },
    '2026-smart-home-appliances-market-guide': { title: 'Globale Markttrends 2026 für smarte Haushaltsgeräte und B2B-Beschaffungsleitfaden', category: 'Haushaltsgeräte' },
    'solar-energy-storage-industrial-manufacturing': { title: 'Solarenergiespeichersysteme in der industriellen Fertigung', category: 'Solar und Speicher' },
    'oem-odm-manufacturing-guide': { title: 'OEM- und ODM-Fertigung: Überlegungen zur Produktentwicklung', category: 'OEM und ODM' },
    'energy-efficiency-standards-appliances': { title: 'Energieeffizienzstandards in modernen Haushaltsgeräten', category: 'Haushaltsgeräte' },
    'global-wholesale-guide-home-appliances': { title: 'Leitfaden zur Großhandelsbeschaffung von Haushaltsgeräten', category: 'Haushaltsgeräte' },
    'advanced-manufacturing-home-appliances': { title: 'Fortschrittliche Fertigung von Haushaltsgeräten', category: 'Haushaltsgeräte' },
    'the-future-of-smart-home-appliances': { title: 'Die Zukunft smarter Haushaltsgeräte', category: 'Haushaltsgeräte' },
    'smart-home-appliances': { title: 'Smarte Haushaltsgeräte: Effizienz und Innovation', category: 'Haushaltsgeräte' },
    'solar-energy-storage-solutions': { title: 'Solarenergiespeicherlösungen', category: 'Solar und Speicher' },
    'the-evolution-of-3c-electronics': { title: 'Die Entwicklung der 3C-Elektronik', category: '3C-Elektronik' },
    'the-future-of-solar-energy': { title: 'Die Zukunft der Solarenergie', category: 'Solar und Speicher' },
  },
  fr: {
    'consumer-electronics-battery-life-testing': { title: 'Normes de test de durée de vie des batteries : analyse technique pour l’électronique grand public', category: 'Électronique 3C' },
    'appliance-energy-efficiency-vs-actual-consumption': { title: 'Efficacité énergétique des appareils et consommation réelle : analyse technique', category: 'Électroménager' },
    'solar-storage-efficiency-optimization-guide': { title: 'Optimisation de l’efficacité du stockage solaire : guide technique pour systèmes industriels', category: 'Solaire et stockage' },
    '2026-solar-market-update': { title: 'Innovations de l’énergie solaire en 2026', category: 'Solaire et stockage' },
    '2026-appliances-market-update': { title: 'Appareils intelligents 2026 : conceptions efficaces pour les marchés mondiaux', category: 'Électroménager' },
    '2026-electronics-market-update': { title: 'Tendances de l’électronique 3C en 2026', category: 'Électronique 3C' },
    '2026-smart-home-appliances-market-guide': { title: 'Tendances mondiales 2026 des appareils intelligents et guide d’approvisionnement B2B', category: 'Électroménager' },
    'solar-energy-storage-industrial-manufacturing': { title: 'Systèmes de stockage d’énergie solaire dans la fabrication industrielle', category: 'Solaire et stockage' },
    'oem-odm-manufacturing-guide': { title: 'Fabrication OEM et ODM : considérations pour le développement de produits', category: 'OEM et ODM' },
    'energy-efficiency-standards-appliances': { title: 'Normes d’efficacité énergétique dans les appareils modernes', category: 'Électroménager' },
    'global-wholesale-guide-home-appliances': { title: 'Guide d’approvisionnement en gros d’appareils ménagers', category: 'Électroménager' },
    'advanced-manufacturing-home-appliances': { title: 'Fabrication avancée d’appareils ménagers', category: 'Électroménager' },
    'the-future-of-smart-home-appliances': { title: 'L’avenir des appareils ménagers intelligents', category: 'Électroménager' },
    'smart-home-appliances': { title: 'Appareils ménagers intelligents : efficacité et innovation', category: 'Électroménager' },
    'solar-energy-storage-solutions': { title: 'Solutions de stockage de l’énergie solaire', category: 'Solaire et stockage' },
    'the-evolution-of-3c-electronics': { title: 'L’évolution de l’électronique 3C', category: 'Électronique 3C' },
    'the-future-of-solar-energy': { title: 'L’avenir de l’énergie solaire', category: 'Solaire et stockage' },
  },
  ar: {
    'consumer-electronics-battery-life-testing': { title: 'معايير اختبار العمر التشغيلي للبطاريات: تحليل تقني للإلكترونيات الاستهلاكية', category: 'إلكترونيات 3C' },
    'appliance-energy-efficiency-vs-actual-consumption': { title: 'تصنيفات كفاءة طاقة الأجهزة مقابل الاستهلاك الفعلي: تحليل تقني', category: 'الأجهزة المنزلية' },
    'solar-storage-efficiency-optimization-guide': { title: 'تحسين كفاءة التخزين الشمسي: دليل تقني للأنظمة الصناعية', category: 'الطاقة الشمسية والتخزين' },
    '2026-solar-market-update': { title: 'ابتكارات الطاقة الشمسية في 2026', category: 'الطاقة الشمسية والتخزين' },
    '2026-appliances-market-update': { title: 'الأجهزة المنزلية الذكية 2026: تصاميم موفرة للطاقة للأسواق العالمية', category: 'الأجهزة المنزلية' },
    '2026-electronics-market-update': { title: 'اتجاهات إلكترونيات 3C في 2026', category: 'إلكترونيات 3C' },
    '2026-smart-home-appliances-market-guide': { title: 'اتجاهات السوق العالمية 2026 للأجهزة الذكية ودليل الشراء B2B', category: 'الأجهزة المنزلية' },
    'solar-energy-storage-industrial-manufacturing': { title: 'أنظمة تخزين الطاقة الشمسية في التصنيع الصناعي', category: 'الطاقة الشمسية والتخزين' },
    'oem-odm-manufacturing-guide': { title: 'تصنيع OEM وODM: اعتبارات تطوير المنتجات', category: 'OEM وODM' },
    'energy-efficiency-standards-appliances': { title: 'معايير كفاءة الطاقة في الأجهزة الحديثة', category: 'الأجهزة المنزلية' },
    'global-wholesale-guide-home-appliances': { title: 'دليل التوريد بالجملة للأجهزة المنزلية', category: 'الأجهزة المنزلية' },
    'advanced-manufacturing-home-appliances': { title: 'التصنيع المتقدم للأجهزة المنزلية', category: 'الأجهزة المنزلية' },
    'the-future-of-smart-home-appliances': { title: 'مستقبل الأجهزة المنزلية الذكية', category: 'الأجهزة المنزلية' },
    'smart-home-appliances': { title: 'الأجهزة المنزلية الذكية: الكفاءة والابتكار', category: 'الأجهزة المنزلية' },
    'solar-energy-storage-solutions': { title: 'حلول تخزين الطاقة الشمسية', category: 'الطاقة الشمسية والتخزين' },
    'the-evolution-of-3c-electronics': { title: 'تطور إلكترونيات 3C', category: 'إلكترونيات 3C' },
    'the-future-of-solar-energy': { title: 'مستقبل الطاقة الشمسية', category: 'الطاقة الشمسية والتخزين' },
  },
};

export function getLocalizedStaticNewsEntry(entry: StaticNewsFeedEntry, lang: string): StaticNewsFeedEntry {
  const localized = staticNewsLocales[lang]?.[entry.slug];
  return localized ? { ...entry, ...localized } : entry;
}
