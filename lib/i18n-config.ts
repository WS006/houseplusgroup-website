export const locales = ["en", "es", "de", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  es: { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  de: { code: "de", name: "German", nativeName: "Deutsch", direction: "ltr" },
  fr: { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  ar: { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
};

// Dictionary types
interface Dictionary {
  site: { title: string; description: string };
  meta: { homeDescription: string; keywords: string };
  hero: {
    title: string;
    subtitle: string;
    cta: { products: string; contact: string };
  };
  nav?: Record<string, string>;
  home: {
    categories: { title: string; subtitle: string; items: Array<{ emoji: string; title: string; description: string; href: string }> };
    cta: { title: string; subtitle: string; button: string };
  };
  footer?: { description: string; quickLinks: string; contactUs: string; companyName: string; email: string; phone: string; address: string; serviceAreas: string };
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    site: { title: "Solar Systems & Home Appliances Wholesale | HousePlus | Made in China", description: "HousePlus: Professional manufacturer of solar systems, home appliances, and 3C electronics. Global wholesale and OEM/ODM services. Contact us for competitive pricing and custom solutions. | Made in China" },
    meta: { homeDescription: "HousePlus is a professional manufacturer of high-quality solar systems, home appliances, and 3C electronics for global wholesale and OEM/ODM. Explore our products and get a quote today.", keywords: "solar systems, home appliances, 3C electronics, wholesale, OEM, ODM" },
    hero: {
      title: "Quality Home Appliances & Solar Solutions",
      subtitle: "Leading Chinese manufacturer of solar water pumps, solar cables, home appliances, and portable power stations. OEM/ODM services available.",
      cta: { products: "View Products", contact: "Get Quote" },
    },
    nav: { about: "About Us", products: "Products", factory: "Factory", contact: "Contact" },
    home: {
      categories: {
        title: "Our Product Categories",
        subtitle: "Comprehensive solutions for homes and businesses worldwide",
        items: [
          { emoji: "☀️", title: "Solar Water Pumps", description: "High-efficiency solar-powered pumping systems", href: "/products/solar-water-pumps" },
          { emoji: "⚡", title: "Solar Cables", description: "Premium photovoltaic cable solutions", href: "/products/solar-cables" },
          { emoji: "🏠", title: "Home Appliances", description: "Range hoods, gas stoves, ovens & more", href: "/products/home-appliances" },
        ],
      },
      cta: { title: "Ready to Partner with Us?", subtitle: "Get competitive pricing for bulk orders and OEM customization.", button: "Request a Quote" },
    },
    footer: { 
      description: "Professional manufacturer of home appliances, solar systems, and portable power stations. Serving global markets with OEM/ODM capabilities.", 
      quickLinks: "Quick Links", 
      contactUs: "Contact Us",
      companyName: "HousePlus Group Co., Ltd.",
      email: "info@houseplus-ch.com",
      phone: "+86-123-4567-890",
      address: "No. 88, Innovation Road, Chancheng District, Foshan, Guangdong, China",
      serviceAreas: "Europe, Africa, Southeast Asia, North America"
    },
  },
  es: {
    site: { title: "Sistemas Solares y Electrodomésticos al Por Mayor | HousePlus | Hecho en China", description: "HousePlus: Fabricante profesional de sistemas solares, electrodomésticos y electrónica 3C. Servicios mayoristas y OEM/ODM globales. Contáctenos para precios competitivos y soluciones personalizadas." },
    meta: { homeDescription: "HousePlus es un fabricante profesional de sistemas solares, electrodomésticos y electrónica 3C de alta calidad para venta al por mayor global y OEM/ODM. Explore nuestros productos y solicite una cotización hoy.", keywords: "sistemas solares, electrodomésticos, electrónica 3C, venta al por mayor, OEM, ODM" },
    hero: {
      title: "Electrodomésticos de Calidad y Soluciones Solares",
      subtitle: "Fabricante líder chino de bombas solares, cables solares, electrodomésticos y estaciones de energía portátiles.",
      cta: { products: "Ver Productos", contact: "Cotizar" },
    },
    home: {
      categories: {
        title: "Nuestras Categorías de Producto",
        subtitle: "Soluciones integrales para hogares y empresas en todo el mundo",
        items: [
          { emoji: "☀️", title: "Bombas Solares", description: "Sistemas de bombeo con energía solar de alta eficiencia", href: "/es/products/solar-water-pumps" },
          { emoji: "⚡", title: "Cables Solares", description: "Soluciones premium de cables fotovoltaicos", href: "/es/products/solar-cables" },
          { emoji: "🏠", title: "Electrodomésticos", description: "Campanas, estufas, hornos y más", href: "/es/products/home-appliances" },
        ],
      },
      cta: { title: "¿Listo para Asociarnos?", subtitle: "Obtenga precios competitivos para pedidos por mayor y personalización OEM.", button: "Solicitar Cotización" },
    },
    footer: { 
      description: "Fabricante profesional de electrodomésticos, sistemas solares y estaciones de energía portátiles. Sirviendo a mercados globales con capacidades OEM/ODM.", 
      quickLinks: "Enlaces Rápidos", 
      contactUs: "Contáctenos",
      companyName: "HousePlus Group Co., Ltd.",
      email: "info@houseplus-ch.com",
      phone: "+86-123-4567-890",
      address: "No. 88, Innovation Road, Chancheng District, Foshan, Guangdong, China",
      serviceAreas: "Europa, África, Sudeste Asiático, América del Norte"
    },
  },
  de: {
    site: { title: "Solarsysteme & Haushaltsgeräte Großhandel | HousePlus | Hergestellt in China", description: "HousePlus: Professioneller Hersteller von Solarsystemen, Haushaltsgeräten und 3C-Elektronik. Globaler Großhandel und OEM/ODM-Dienstleistungen. Kontaktieren Sie uns für wettbewerbsfähige Preise und maßgeschneiderte Lösungen." },
    meta: { homeDescription: "HousePlus ist ein professioneller Hersteller von hochwertigen Solarsystemen, Haushaltsgeräten und 3C-Elektronik für den weltweiten Großhandel und OEM/ODM. Entdecken Sie unsere Produkte und fordern Sie noch heute ein Angebot an.", keywords: "Solarsysteme, Haushaltsgeräte, 3C-Elektronik, Großhandel, OEM, ODM" },
    hero: {
      title: "Qualitäts-Haushaltsgeräte & Solarlösungen",
      subtitle: "Führender chinesischer Hersteller von Solarwasserpumpen, Solarkabeln, Haushaltsgeräten und tragbaren Stromstationen.",
      cta: { products: "Produkte ansehen", contact: "Angebot anfordern" },
    },
    home: {
      categories: {
        title: "Unsere Produktkategorien",
        subtitle: "Umfassende Lösungen für Häuser und Unternehmen weltweit",
        items: [
          { emoji: "☀️", title: "Solarwasserpumpen", description: "Hochleistungs-Solar-Pumpensysteme", href: "/de/products/solar-water-pumps" },
          { emoji: "⚡", title: "Solarkabel", description: "Premium-Photovoltaik-Kabellösungen", href: "/de/products/solar-cables" },
          { emoji: "🏠", title: "Haushaltsgeräte", description: "Dunstäbsüge, Gasherde, Öfen und mehr", href: "/de/products/home-appliances" },
        ],
      },
      cta: { title: "Bereit für eine Partnerschaft?", subtitle: "Erhalten Sie wettbewerbsfähige Preise für Großbestellungen und OEM-Anpassung.", button: "Angebot anfordern" },
    },
    footer: { 
      description: "Professioneller Hersteller von Haushaltsgeräten, Solarsystemen und tragbaren Stromstationen. Serving global markets with OEM/ODM capabilities.", 
      quickLinks: "Schnelllinks", 
      contactUs: "Kontaktieren Sie uns",
      companyName: "HousePlus Group Co., Ltd.",
      email: "info@houseplus-ch.com",
      phone: "+86-123-4567-890",
      address: "No. 88, Innovation Road, Chancheng District, Foshan, Guangdong, China",
      serviceAreas: "Europa, Afrika, Südostasien, Nordamerika"
    },
  },
  fr: {
    site: { title: "Systèmes Solaires & Appareils Ménagers en Gros | HousePlus | Fabriqué en Chine", description: "HousePlus: Fabricant professionnel de systèmes solaires, d'appareils ménagers et d'électronique 3C. Services de gros et OEM/ODM mondiaux. Contactez-nous pour des prix compétitifs et des solutions personnalisées." },
    meta: { homeDescription: "HousePlus est un fabricant professionnel de systèmes solaires, d'appareils ménagers et d'électronique 3C de haute qualité pour la vente en gros mondiale et OEM/ODM. Explorez nos produits et demandez un devis dès aujourd'hui.", keywords: "systèmes solaires, appareils ménagers, électronique 3C, vente en gros, OEM, ODM" },
    hero: {
      title: "Appareils Ménagers de Qualité et Solutions Solaires",
      subtitle: "Fabricant chinois leader de pompes solaires, câbles solaires, appareils ménagers et stations d'énergie portables.",
      cta: { products: "Voir les Produits", contact: "Demander un Devis" },
    },
    home: {
      categories: {
        title: "Nos Catégories de Produits",
        subtitle: "Des solutions complètes pour les foyers et entreprises du monde entier",
        items: [
          { emoji: "☀️", title: "Pompes Solaires", description: "Systèmes de pompage à énergie solaire haute efficacité", href: "/fr/products/solar-water-pumps" },
          { emoji: "⚡", title: "Câbles Solaires", description: "Solutions de câbles photovoltaïques premium", href: "/fr/products/solar-cables" },
          { emoji: "🏠", title: "Appareils Ménagers", description: "Hottes, cuisinières, fours et plus", href: "/fr/products/home-appliances" },
        ],
      },
      cta: { title: "Prêt à Partenariat ?", subtitle: "Obtenez des prix compétitifs pour les commandes en gros et la personnalisation OEM.", button: "Demander un Devis" },
    },
    footer: { 
      description: "Fabricant professionnel d'appareils ménagers, de systèmes solaires et de stations d'énergie portables. Servir les marchés mondiaux avec des capacités OEM/ODM.", 
      quickLinks: "Liens Rapides", 
      contactUs: "Contactez-nous",
      companyName: "HousePlus Group Co., Ltd.",
      email: "info@houseplus-ch.com",
      phone: "+86-123-4567-890",
      address: "No. 88, Innovation Road, Chancheng District, Foshan, Guangdong, China",
      serviceAreas: "Europe, Afrique, Asie du Sud-Est, Amérique du Nord"
    },
  },
  ar: {
    site: { title: "أنظمة الطاقة الشمسية والأجهزة المنزلية بالجملة | HousePlus | صنع في الصين", description: "HousePlus: مصنع محترف لأنظمة الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. خدمات البيع بالجملة و OEM/ODM العالمية. اتصل بنا للحصول على أسعار تنافسية وحلول مخصصة." },
    meta: { homeDescription: "HousePlus هو مصنع محترف لأنظمة الطاقة الشمسية عالية الجودة والأجهزة المنزلية والإلكترونيات 3C للبيع بالجملة العالمية و OEM/ODM. استكشف منتجاتنا واحصل على عرض أسعار اليوم.", keywords: "أنظمة الطاقة الشمسية, الأجهزة المنزلية, الإلكترونيات 3C, البيع بالجملة, OEM, ODM" },
    hero: {
      title: "أجهزة منزلية عالية الجودة وحلول شمسية",
      subtitle: "رائد صيني في تصنيع المضخات الشمسية والكابلات الشمسية والأجهزة المنزلية ومحطات الطاقة المحمولة.",
      cta: { products: "عرض المنتجات", contact: "طلب عرض سعر" },
    },
    home: {
      categories: {
        title: "فئات المنتجات الخاصة بنا",
        subtitle: "حلول شاملة للمنازل والشركات حول العالم",
        items: [
          { emoji: "☀️", title: "المضخات الشمسية", description: "أنظمة ضخ تعمل بالطاقة الشمسية عالية الكفاءة", href: "/ar/products/solar-water-pumps" },
          { emoji: "⚡", title: "الكابلات الشمسية", description: "حلول كابلات فوتوفولتائية متميزة", href: "/ar/products/solar-cables" },
          { emoji: "🏠", title: "الأجهزة المنزلية", description: "شفاطات، مواقد، أفران وأكثر", href: "/ar/products/home-appliances" },
        ],
      },
      cta: { title: "مستعد للشراكة؟", subtitle: "احصل على أسعار تنافسية للطلبات بالجملة والتخصيص OEM.", button: "طلب عرض سعر" },
    },
    footer: { 
      description: "مصنع محترف للأجهزة المنزلية وأنظمة الطاقة الشمسية ومحطات الطاقة المحمولة. خدمة الأسواق العالمية بقدرات OEM/ODM.", 
      quickLinks: "روابط سريعة", 
      contactUs: "اتصل بنا",
      companyName: "HousePlus Group Co., Ltd.",
      email: "info@houseplus-ch.com",
      phone: "+86-123-4567-890",
      address: "No. 88, Innovation Road, Chancheng District, Foshan, Guangdong, China",
      serviceAreas: "أوروبا، أفريقيا، جنوب شرق آسيا، أمريكا الشمالية"
    },
  },
};

export function getDictionary(lang: string): Promise<Dictionary> {
  const locale: Locale = isValidLocale(lang) ? lang as Locale : defaultLocale;
  return Promise.resolve(dictionaries[locale]);
}

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as any);
}

export function getLocaleConfig(lang: Locale): LocaleConfig {
  return localeConfigs[lang];
}

export function getLocaleDirection(lang: Locale): "ltr" | "rtl" {
  return localeConfigs[lang].direction;
}

export function getAllLocales(): LocaleConfig[] {
  return locales.map((lang) => localeConfigs[lang]);
}
