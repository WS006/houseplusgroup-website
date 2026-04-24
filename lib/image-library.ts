// Comprehensive image library with multilingual alt tags and industry categorization

export interface ImageAsset {
  id: string;
  src: string;
  category: 'solar' | 'appliances' | 'electronics' | 'factory' | 'team' | 'office' | 'product' | 'hero';
  alt: Record<string, string>;
  title: Record<string, string>;
  width: number;
  height: number;
  priority?: boolean;
}

export const imageLibrary: ImageAsset[] = [
  // Hero & Homepage Images
  {
    id: 'hero-solar-panel',
    src: 'https://images.unsplash.com/photo-1497440871597-41fa534db117?w=1200&h=600&fit=crop',
    category: 'solar',
    alt: {
      en: 'High-efficiency solar panels on rooftop - HousePlus solar energy solutions',
      es: 'Paneles solares de alta eficiencia en el techo - Soluciones de energía solar HousePlus',
      de: 'Hocheffiziente Solarpanels auf dem Dach - HousePlus Solarenergielösungen',
      fr: 'Panneaux solaires haute efficacité sur le toit - Solutions d\'énergie solaire HousePlus',
      ar: 'الألواح الشمسية عالية الكفاءة على السقف - حلول الطاقة الشمسية من HousePlus',
    },
    title: {
      en: 'Solar Energy Systems - HousePlus',
      es: 'Sistemas de Energía Solar - HousePlus',
      de: 'Solarsysteme - HousePlus',
      fr: 'Systèmes d\'Énergie Solaire - HousePlus',
      ar: 'أنظمة الطاقة الشمسية - HousePlus',
    },
    width: 1200,
    height: 600,
    priority: true,
  },
  {
    id: 'portable-power-station',
    src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop',
    category: 'solar',
    alt: {
      en: 'Portable solar power station for camping - HousePlus renewable energy',
      es: 'Estación de energía solar portátil para camping - Energía renovable HousePlus',
      de: 'Tragbares Solarkraftwerk zum Camping - Erneuerbare Energie HousePlus',
      fr: 'Centrale électrique solaire portable pour le camping - Énergie renouvelable HousePlus',
      ar: 'محطة الطاقة الشمسية المحمولة للتخييم - الطاقة المتجددة من HousePlus',
    },
    title: {
      en: 'Portable Power Station - HousePlus',
      es: 'Estación de Energía Portátil - HousePlus',
      de: 'Tragbares Kraftwerk - HousePlus',
      fr: 'Centrale Électrique Portable - HousePlus',
      ar: 'محطة الطاقة المحمولة - HousePlus',
    },
    width: 800,
    height: 600,
  },
  {
    id: 'home-appliances-kitchen',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    category: 'appliances',
    alt: {
      en: 'Modern kitchen appliances - HousePlus home appliance solutions',
      es: 'Electrodomésticos de cocina modernos - Soluciones de electrodomésticos HousePlus',
      de: 'Moderne Küchengeräte - HousePlus Haushaltsgerätlösungen',
      fr: 'Électroménagers de cuisine modernes - Solutions d\'électroménagers HousePlus',
      ar: 'أجهزة المطبخ الحديثة - حلول الأجهزة المنزلية من HousePlus',
    },
    title: {
      en: 'Kitchen Appliances - HousePlus',
      es: 'Electrodomésticos de Cocina - HousePlus',
      de: 'Küchengeräte - HousePlus',
      fr: 'Électroménagers de Cuisine - HousePlus',
      ar: 'أجهزة المطبخ - HousePlus',
    },
    width: 800,
    height: 600,
  },
  {
    id: 'smart-home-devices',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    category: 'electronics',
    alt: {
      en: 'Smart home devices and LED lighting - HousePlus 3C electronics',
      es: 'Dispositivos de hogar inteligente e iluminación LED - Electrónica 3C HousePlus',
      de: 'Smart-Home-Geräte und LED-Beleuchtung - HousePlus 3C-Elektronik',
      fr: 'Appareils maison intelligente et éclairage LED - Électronique 3C HousePlus',
      ar: 'أجهزة المنزل الذكي والإضاءة LED - إلكترونيات 3C من HousePlus',
    },
    title: {
      en: '3C Electronics - HousePlus',
      es: 'Electrónica 3C - HousePlus',
      de: '3C-Elektronik - HousePlus',
      fr: 'Électronique 3C - HousePlus',
      ar: 'إلكترونيات 3C - HousePlus',
    },
    width: 800,
    height: 600,
  },
  // Factory Images
  {
    id: 'factory-production-line',
    src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    category: 'factory',
    alt: {
      en: 'Advanced production line at HousePlus manufacturing facility',
      es: 'Línea de producción avanzada en la instalación de fabricación de HousePlus',
      de: 'Fortschrittliche Produktionslinie in der HousePlus-Fertigungsanlage',
      fr: 'Ligne de production avancée à l\'installation de fabrication HousePlus',
      ar: 'خط الإنتاج المتقدم في مرفق التصنيع HousePlus',
    },
    title: {
      en: 'HousePlus Manufacturing Facility',
      es: 'Instalación de Fabricación HousePlus',
      de: 'HousePlus-Fertigungsanlage',
      fr: 'Installation de Fabrication HousePlus',
      ar: 'مرفق التصنيع HousePlus',
    },
    width: 800,
    height: 600,
  },
  {
    id: 'quality-control-lab',
    src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    category: 'factory',
    alt: {
      en: 'Quality control laboratory with testing equipment - HousePlus ISO 9001',
      es: 'Laboratorio de control de calidad con equipo de prueba - ISO 9001 HousePlus',
      de: 'Qualitätskontrolllabor mit Testausrüstung - ISO 9001 HousePlus',
      fr: 'Laboratoire de contrôle de qualité avec équipement de test - ISO 9001 HousePlus',
      ar: 'مختبر مراقبة الجودة مع معدات الاختبار - ISO 9001 HousePlus',
    },
    title: {
      en: 'Quality Control - HousePlus',
      es: 'Control de Calidad - HousePlus',
      de: 'Qualitätskontrolle - HousePlus',
      fr: 'Contrôle de Qualité - HousePlus',
      ar: 'مراقبة الجودة - HousePlus',
    },
    width: 800,
    height: 600,
  },
  // Team Images
  {
    id: 'team-meeting',
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    category: 'team',
    alt: {
      en: 'HousePlus team meeting - Professional manufacturing team collaboration',
      es: 'Reunión del equipo HousePlus - Colaboración del equipo de fabricación profesional',
      de: 'HousePlus-Teammeeting - Zusammenarbeit des professionellen Fertigungsteams',
      fr: 'Réunion d\'équipe HousePlus - Collaboration d\'équipe de fabrication professionnelle',
      ar: 'اجتماع فريق HousePlus - تعاون فريق التصنيع المهني',
    },
    title: {
      en: 'HousePlus Team - Professional Manufacturing',
      es: 'Equipo HousePlus - Fabricación Profesional',
      de: 'HousePlus-Team - Professionelle Fertigung',
      fr: 'Équipe HousePlus - Fabrication Professionnelle',
      ar: 'فريق HousePlus - التصنيع المهني',
    },
    width: 800,
    height: 600,
  },
  {
    id: 'office-workspace',
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    category: 'office',
    alt: {
      en: 'HousePlus modern office workspace - Global manufacturing headquarters',
      es: 'Espacio de trabajo de oficina moderno HousePlus - Sede de fabricación global',
      de: 'Moderner Büroarbeitsplatz HousePlus - Globale Fertigungszentrale',
      fr: 'Espace de travail de bureau moderne HousePlus - Siège mondial de la fabrication',
      ar: 'مساحة العمل الحديثة في مكتب HousePlus - مقر التصنيع العالمي',
    },
    title: {
      en: 'HousePlus Office - Global Headquarters',
      es: 'Oficina HousePlus - Sede Global',
      de: 'HousePlus-Büro - Globale Zentrale',
      fr: 'Bureau HousePlus - Siège Mondial',
      ar: 'مكتب HousePlus - المقر العالمي',
    },
    width: 800,
    height: 600,
  },
  // Product Images
  {
    id: 'solar-panel-close-up',
    src: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    category: 'product',
    alt: {
      en: 'Close-up of high-efficiency solar panel - HousePlus photovoltaic technology',
      es: 'Primer plano del panel solar de alta eficiencia - Tecnología fotovoltaica HousePlus',
      de: 'Nahaufnahme des hocheffizienten Solarpanels - HousePlus Photovoltaik-Technologie',
      fr: 'Gros plan du panneau solaire haute efficacité - Technologie photovoltaïque HousePlus',
      ar: 'لقطة قريبة من لوح شمسي عالي الكفاءة - تكنولوجيا الفوتوفولطية HousePlus',
    },
    title: {
      en: 'Solar Panel Technology - HousePlus',
      es: 'Tecnología de Panel Solar - HousePlus',
      de: 'Solarpanel-Technologie - HousePlus',
      fr: 'Technologie de Panneau Solaire - HousePlus',
      ar: 'تكنولوجيا لوح شمسي - HousePlus',
    },
    width: 800,
    height: 600,
  },
  {
    id: 'washing-machine-product',
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    category: 'product',
    alt: {
      en: 'Premium washing machine - HousePlus home appliance manufacturing',
      es: 'Lavadora premium - Fabricación de electrodomésticos HousePlus',
      de: 'Premium-Waschmaschine - HousePlus Haushaltsgerätfertigung',
      fr: 'Machine à laver premium - Fabrication d\'électroménagers HousePlus',
      ar: 'غسالة فاخرة - تصنيع الأجهزة المنزلية HousePlus',
    },
    title: {
      en: 'Premium Washing Machine - HousePlus',
      es: 'Lavadora Premium - HousePlus',
      de: 'Premium-Waschmaschine - HousePlus',
      fr: 'Machine à Laver Premium - HousePlus',
      ar: 'غسالة فاخرة - HousePlus',
    },
    width: 800,
    height: 600,
  },
  {
    id: 'smart-bulb-led',
    src: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=800&h=600&fit=crop',
    category: 'product',
    alt: {
      en: 'Smart LED bulb with app control - HousePlus 3C digital electronics',
      es: 'Bombilla LED inteligente con control de aplicación - Electrónica digital 3C HousePlus',
      de: 'Intelligente LED-Glühbirne mit App-Steuerung - HousePlus 3C-Digitalelektronik',
      fr: 'Ampoule LED intelligente avec contrôle d\'application - Électronique numérique 3C HousePlus',
      ar: 'مصباح LED ذكي مع التحكم بالتطبيق - إلكترونيات رقمية 3C من HousePlus',
    },
    title: {
      en: 'Smart LED Bulb - HousePlus',
      es: 'Bombilla LED Inteligente - HousePlus',
      de: 'Intelligente LED-Glühbirne - HousePlus',
      fr: 'Ampoule LED Intelligente - HousePlus',
      ar: 'مصباح LED ذكي - HousePlus',
    },
    width: 800,
    height: 600,
  },
];

export function getImageAsset(id: string): ImageAsset | undefined {
  return imageLibrary.find(img => img.id === id);
}

export function getImagesByCategory(category: string): ImageAsset[] {
  return imageLibrary.filter(img => img.category === category);
}

export function getImageAlt(id: string, lang: string = 'en'): string {
  const image = getImageAsset(id);
  return image?.alt[lang as keyof typeof image.alt] || image?.alt.en || '';
}

export function getImageTitle(id: string, lang: string = 'en'): string {
  const image = getImageAsset(id);
  return image?.title[lang as keyof typeof image.title] || image?.title.en || '';
}
