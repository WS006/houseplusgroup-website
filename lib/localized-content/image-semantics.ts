type Locale = 'en' | 'es' | 'de' | 'fr' | 'ar';

/**
 * Image-specific labels for the priority editorial covers that appear on both
 * the news index and their article pages. They are intentionally separate from
 * editorial titles so image tooltips describe the visual subject, not a claim.
 */
const priorityArticleImageTitles: Partial<Record<string, Partial<Record<Locale, string>>>> = {
  'solar-panel-rfq-checklist-international-buyers': {
    es: 'Instalación de paneles solares en cubierta comercial',
    de: 'Solarpanel-Installation auf einem gewerblichen Dach',
    fr: 'Installation de panneaux solaires sur un toit commercial',
    ar: 'تركيب الألواح الشمسية على سطح تجاري',
  },
  'home-appliance-oem-sample-evaluation-checklist': {
    es: 'Muestra de electrodoméstico para evaluación OEM',
    de: 'Haushaltsgerätemuster zur OEM-Bewertung',
    fr: 'Échantillon d’appareil ménager pour évaluation OEM',
    ar: 'عينة جهاز منزلي لتقييم OEM',
  },
  'usb-c-accessories-wholesale-specification-checklist': {
    es: 'Cable USB-C para revisión de especificaciones',
    de: 'USB-C-Kabel für die Spezifikationsprüfung',
    fr: 'Câble USB-C pour l’examen des spécifications',
    ar: 'كابل USB-C لمراجعة المواصفات',
  },
  'battery-energy-storage-rfq-data-checklist': {
    es: 'Equipo de almacenamiento de energía para proyecto comercial',
    de: 'Batteriespeicher für ein gewerbliches Projekt',
    fr: 'Équipement de stockage d’énergie pour un projet commercial',
    ar: 'معدات تخزين الطاقة لمشروع تجاري',
  },
  'portable-power-supply-solar-storage-b2b-guide': {
    es: 'Fuentes de energía portátiles y almacenamiento solar HousePlus',
    de: 'Tragbare Stromversorgungen und Solarspeicher von HousePlus',
    fr: 'Alimentations portables et stockage solaire HousePlus',
    ar: 'مصادر طاقة محمولة وتخزين شمسي من HousePlus',
  },
};

const staticNewsImageAlts: Partial<Record<string, Partial<Record<Locale, string>>>> = {
  'consumer-electronics-battery-life-testing': { es: 'Pruebas de vida útil de ciclos de batería para electrónica de consumo en un laboratorio controlado', de: 'Zyklenlebensdauerprüfung von Batterien für Unterhaltungselektronik in einem kontrollierten Labor', fr: 'Essais de durée de vie en cycles de batteries pour l’électronique grand public dans un laboratoire contrôlé', ar: 'اختبار عمر دورة البطارية للإلكترونيات الاستهلاكية في مختبر مُراقَب' },
  'appliance-energy-efficiency-vs-actual-consumption': { es: 'Medición del consumo energético de electrodomésticos con un medidor de potencia de laboratorio', de: 'Messung des Energieverbrauchs von Haushaltsgeräten mit einem Labormessgerät', fr: 'Mesure de la consommation énergétique d’appareils ménagers avec un wattmètre de laboratoire', ar: 'قياس استهلاك الطاقة للأجهزة المنزلية باستخدام جهاز قياس مختبري' },
  'solar-storage-efficiency-optimization-guide': { es: 'Ingeniero revisando equipos industriales de almacenamiento de energía solar', de: 'Ingenieur prüft industrielle Solarenergiespeicheranlagen', fr: 'Ingénieur examinant un équipement industriel de stockage d’énergie solaire', ar: 'مهندس يراجع معدات صناعية لتخزين الطاقة الشمسية' },
  '2026-solar-market-update': { es: 'Microrred solar moderna y equipos de almacenamiento de energía con baterías', de: 'Modernes Solar-Mikronetz und Batteriespeicheranlagen', fr: 'Microréseau solaire moderne et équipement de stockage d’énergie par batterie', ar: 'شبكة شمسية مصغرة حديثة ومعدات تخزين طاقة بالبطاريات' },
  '2026-appliances-market-update': { es: 'Electrodomésticos inteligentes de bajo consumo en una cocina moderna', de: 'Energieeffiziente smarte Haushaltsgeräte in einer modernen Küche', fr: 'Appareils ménagers intelligents économes en énergie dans une cuisine moderne', ar: 'أجهزة منزلية ذكية موفرة للطاقة في مطبخ عصري' },
  '2026-electronics-market-update': { es: 'Colección 2026 de electrónica 3C con productos de audio, almacenamiento y carga', de: '3C-Elektronikkollektion 2026 mit Audio-, Speicher- und Ladeprodukten', fr: 'Collection électronique 3C 2026 avec produits audio, de stockage et de charge', ar: 'مجموعة إلكترونيات 3C لعام 2026 تضم منتجات صوت وتخزين وشحن' },
  '2026-smart-home-appliances-market-guide': { es: 'Electrodomésticos inteligentes conectados y productos de monitorización de energía', de: 'Vernetzte smarte Haushaltsgeräte und Produkte zur Energieüberwachung', fr: 'Appareils ménagers intelligents connectés et produits de suivi de l’énergie', ar: 'أجهزة منزلية ذكية متصلة ومنتجات لمراقبة الطاقة' },
  'solar-energy-storage-industrial-manufacturing': { es: 'Racks industriales de baterías de litio e infraestructura de almacenamiento de energía solar', de: 'Industrielle Lithium-Batterieracks und Solarenergiespeicher-Infrastruktur', fr: 'Baies industrielles de batteries au lithium et infrastructure de stockage d’énergie solaire', ar: 'رفوف بطاريات ليثيوم صناعية وبنية تحتية لتخزين الطاقة الشمسية' },
  'oem-odm-manufacturing-guide': { es: 'Desarrollo de productos OEM y ODM con prototipos de electrodomésticos y muestras de embalaje', de: 'OEM- und ODM-Produktentwicklung mit Haushaltsgeräteprototypen und Verpackungsmustern', fr: 'Développement de produits OEM et ODM avec prototypes d’appareils ménagers et échantillons d’emballage', ar: 'تطوير منتجات OEM وODM مع نماذج أولية للأجهزة المنزلية وعينات تغليف' },
  'energy-efficiency-standards-appliances': { es: 'Pruebas de conformidad de electrodomésticos en un laboratorio de eficiencia energética', de: 'Konformitätsprüfung von Haushaltsgeräten in einem Energieeffizienzlabor', fr: 'Essais de conformité d’appareils ménagers dans un laboratoire d’efficacité énergétique', ar: 'اختبارات مطابقة للأجهزة المنزلية في مختبر كفاءة الطاقة' },
  'global-wholesale-guide-home-appliances': { es: 'Logística mayorista global para electrodomésticos preparados para exportación', de: 'Globale Großhandelslogistik für exportfertige Haushaltsgeräte', fr: 'Logistique de gros mondiale pour appareils ménagers prêts à l’exportation', ar: 'لوجستيات الجملة العالمية للأجهزة المنزلية الجاهزة للتصدير' },
  'advanced-manufacturing-home-appliances': { es: 'Línea de fabricación robótica avanzada para electrodomésticos', de: 'Fortschrittliche robotergestützte Fertigungslinie für Haushaltsgeräte', fr: 'Ligne de fabrication robotisée avancée pour appareils ménagers', ar: 'خط تصنيع روبوتي متقدم للأجهزة المنزلية' },
  'the-future-of-smart-home-appliances': { es: 'Electrodomésticos conectados preparados para el futuro en un interior contemporáneo', de: 'Zukunftsfähige vernetzte Haushaltsgeräte in einem modernen Wohnumfeld', fr: 'Appareils ménagers connectés prêts pour l’avenir dans un intérieur contemporain', ar: 'أجهزة منزلية متصلة مهيأة للمستقبل في مساحة داخلية عصرية' },
  'smart-home-appliances': { es: 'Cocina moderna con electrodomésticos inteligentes conectados', de: 'Moderne Küche mit vernetzten smarten Haushaltsgeräten', fr: 'Cuisine moderne avec appareils ménagers intelligents connectés', ar: 'مطبخ عصري مزود بأجهزة منزلية ذكية متصلة' },
  'solar-energy-storage-solutions': { es: 'Equipos de almacenamiento de energía solar y sistemas de baterías', de: 'Solarenergiespeicheranlagen und Batteriesysteme', fr: 'Équipement de stockage d’énergie solaire et systèmes de batteries', ar: 'معدات تخزين الطاقة الشمسية وأنظمة البطاريات' },
  'the-evolution-of-3c-electronics': { es: 'Productos y accesorios modernos de electrónica 3C', de: 'Moderne 3C-Elektronikprodukte und Zubehör', fr: 'Produits et accessoires électroniques 3C modernes', ar: 'منتجات وملحقات إلكترونية 3C حديثة' },
  'the-future-of-solar-energy': { es: 'Paneles solares y equipos de energía portátil', de: 'Solarpaneele und tragbare Energieausrüstung', fr: 'Panneaux solaires et équipement d’énergie portable', ar: 'ألواح شمسية ومعدات طاقة محمولة' },
};

export function getLocalizedArticleImageTitle(slug: string, locale: string, fallback: string): string {
  return priorityArticleImageTitles[slug]?.[locale as Locale] || fallback;
}

export function getLocalizedStaticNewsImageAlt(slug: string, locale: string, fallback: string): string {
  return staticNewsImageAlts[slug]?.[locale as Locale] || fallback;
}
