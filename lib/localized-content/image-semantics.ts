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

export function getLocalizedArticleImageTitle(slug: string, locale: string, fallback: string): string {
  return priorityArticleImageTitles[slug]?.[locale as Locale] || fallback;
}
