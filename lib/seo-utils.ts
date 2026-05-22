import { Metadata } from 'next';
import { Locale } from './i18n-config';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  lang: Locale;
  type?: 'website' | 'article' | 'product';
  author?: string;
  datePublished?: string;
  dateModified?: string;
  geoRegion?: string; // e.g., 'CN' for China, 'US' for United States
  geoPlacename?: string; // e.g., 'Guangzhou', 'New York'
}

export const siteConfig = {
  name: 'HousePlus',
  url: 'https://www.houseplus-ch.com',
  description: 'HousePlus: Professional manufacturer of solar systems, home appliances, and 3C electronics. Global wholesale and OEM/ODM services. Contact us for competitive pricing and custom solutions. | Made in China',
  defaultImage: 'https://www.houseplus-ch.com/og-image.jpg',
};

// Get locale-specific Open Graph type
function getOGLocale(lang: string): string {
  const localeMap: Record<string, string> = {
    en: 'en_US',
    es: 'es_ES',
    de: 'de_DE',
    fr: 'fr_FR',
    ar: 'ar_SA',
  };
  return localeMap[lang] || 'en_US';
}

export function generateMetadata(config: SEOConfig): Metadata {
  const canonicalUrl = `${siteConfig.url}${config.url}`;
  
  // Default keywords if not provided, based on core business
  const defaultKeywords = ['solar systems', 'home appliances', '3C electronics', 'wholesale', 'OEM', 'ODM', 'Made in China'];
  const keywords = config.keywords && config.keywords.length > 0 ? config.keywords : defaultKeywords;

  return {
    title: config.title,
    description: config.description,
    keywords: keywords.join(', '),
    authors: config.author ? [{ name: config.author }] : undefined,
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: getOGLocale(config.lang),
      alternateLocale: config.lang !== 'en' ? ['en_US'] : ['es_ES', 'de_DE', 'fr_FR', 'ar_SA'],
      images: [
        {
          url: config.image || siteConfig.defaultImage,
          width: 1200,
          height: 630,
          alt: config.title,
          secureUrl: config.image || siteConfig.defaultImage,
          type: 'image/jpeg',
        },
      ],
      type: config.type === 'article' ? 'article' : config.type === 'product' ? 'product' : 'website',
      ...(config.datePublished && { publishedTime: config.datePublished }),
      ...(config.dateModified && { modifiedTime: config.dateModified }),
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      site: '@HousePlusGroup',
      creator: '@HousePlusGroup',
      images: [
        {
          url: config.image || siteConfig.defaultImage,
          width: 1200,
          height: 630,
          alt: config.title,
        }
      ],
    },
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteConfig.url}/en${config.url}`,
        'es': `${siteConfig.url}/es${config.url}`,
        'de': `${siteConfig.url}/de${config.url}`,
        'fr': `${siteConfig.url}/fr${config.url}`,
        'ar': `${siteConfig.url}/ar${config.url}`,
        'x-default': `${siteConfig.url}/en${config.url}`,
      },
    },
    // Add GEO meta tags if provided
    ...(config.geoRegion && { 'geo.region': config.geoRegion }),
    ...(config.geoPlacename && { 'geo.placename': config.geoPlacename }),
  };
}

export const industryKeywords = {
  solar: [
    'solar panels',
    'solar energy',
    'photovoltaic',
    'solar power',
    'renewable energy',
    'solar systems',
    'solar inverter',
    'charge controller',
    'portable power station',
  ],
  appliances: [
    'home appliances',
    'kitchen appliances',
    'washing machine',
    'refrigerator',
    'dishwasher',
    'electric cooker',
    'microwave',
    'household appliances',
  ],
  electronics: [
    '3C electronics',
    'digital gadgets',
    'LED lighting',
    'smart home',
    'electronic devices',
    'consumer electronics',
    'portable devices',
    'energy-saving devices',
  ],
};

export function getIndustryDescription(industry: 'solar' | 'appliances' | 'electronics', lang: Locale): string {
  const descriptions: Record<string, Record<Locale, string>> = {
    solar: {
      en: 'High-efficiency solar systems and portable power stations for sustainable energy solutions. We offer professional-grade solar panels, MPPT charge controllers, and energy storage systems for global wholesale buyers.',
      es: 'Sistemas solares de alta eficiencia y estaciones de energía portátiles para soluciones de energía sostenible. Ofrecemos paneles solares de grado profesional, controladores de carga MPPT y sistemas de almacenamiento de energía para compradores mayoristas globales.',
      de: 'Hocheffiziente Solarsysteme und tragbare Kraftwerke für nachhaltige Energielösungen. Wir bieten professionelle Solarpanels, MPPT-Laderegler und Energiespeichersysteme für globale Großhandelskäufer.',
      fr: 'Systèmes solaires haute efficacité et stations électriques portables pour des solutions énergétiques durables. Nous proposons des panneaux solaires de qualité professionnelle, des contrôleurs de charge MPPT et des systèmes de stockage d\'énergie pour les acheteurs en gros mondiaux.',
      ar: 'أنظمة شمسية عالية الكفاءة ومحطات طاقة محمولة لحلول الطاقة المستدامة. نحن نقدم الألواح الشمسية من الدرجة الاحترافية ومتحكمات الشحن MPPT وأنظمة تخزين الطاقة للمشترين بالجملة العالميين.',
    },
    appliances: {
      en: 'Premium home appliances combining energy efficiency with cutting-edge technology. From refrigerators to washing machines, our products meet international standards and are designed for modern living.',
      es: 'Electrodomésticos premium que combinan eficiencia energética con tecnología de vanguardia. Desde refrigeradores hasta lavadoras, nuestros productos cumplen con estándares internacionales y están diseñados para la vida moderna.',
      de: 'Premium-Haushaltsgeräte, die Energieeffizienz mit modernster Technologie verbinden. Von Kühlschränken bis zu Waschmaschinen erfüllen unsere Produkte internationale Standards und sind für modernes Wohnen konzipiert.',
      fr: 'Appareils électroménagers premium combinant efficacité énergétique et technologie de pointe. Des réfrigérateurs aux machines à laver, nos produits répondent aux normes internationales et sont conçus pour la vie moderne.',
      ar: 'أجهزة منزلية فاخرة تجمع بين كفاءة الطاقة والتكنولوجيا المتقدمة. من الثلاجات إلى الغسالات، تلبي منتجاتنا المعايير الدولية وتم تصميمها للعيش الحديث.',
    },
    electronics: {
      en: '3C electronics and digital gadgets featuring smart home solutions and energy-saving LED lighting. Our products are designed for the digital age with focus on sustainability and innovation.',
      es: 'Electrónica 3C y gadgets digitales con soluciones de hogar inteligente e iluminación LED de bajo consumo. Nuestros productos están diseñados para la era digital con enfoque en sostenibilidad e innovación.',
      de: '3C-Elektronik und digitale Gadgets mit Smart-Home-Lösungen und energiesparender LED-Beleuchtung. Unsere Produkte sind für das digitale Zeitalter konzipiert und legen den Fokus auf Nachhaltigkeit und Innovation.',
      fr: 'Électronique 3C et gadgets numériques avec solutions de maison intelligente et éclairage LED économe en énergie. Nos produits sont conçus pour l\'ère numérique en mettant l\'accent sur la durabilité et l\'innovation.',
      ar: 'إلكترونيات 3C والأجهزة الرقمية مع حلول المنزل الذكي والإضاءة LED الموفرة للطاقة. تم تصميم منتجاتنا لعصر رقمي مع التركيز على الاستدامة والابتكار.',
    },
  };
  return descriptions[industry][lang] || descriptions[industry].en;
}
