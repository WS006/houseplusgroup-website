import fs from 'fs';
import path from 'path';

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
export interface Dictionary {
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
    tagline: string;
    mainTitle: string;
    mainDescription: string;
    browseProducts: string;
    requestQuote: string;
    counter: {
      years: string;
      clients: string;
      countries: string;
      warranty: string;
    };
    industries: Array<{
      title: string;
      description: string;
      buttonText: string;
    }>;
    whyChoose: {
      title: string;
      subtitle: string;
      features: Array<{
        icon: string;
        title: string;
        desc: string;
      }>;
    };
    carousel: Array<{
      imageAlt: string;
      title: string;
      subtitle: string;
      buttonText: string;
    }>;
  };
  footer?: { description: string; quickLinks: string; contactUs: string; companyName: string; email: string; phone: string; address: string; serviceAreas: string };
}

// Cache for loaded dictionaries
const dictionaryCache: Partial<Record<Locale, Dictionary>> = {};

// Load dictionary from JSON file
function loadDictionary(locale: Locale): Dictionary {
  if (dictionaryCache[locale]) {
    return dictionaryCache[locale]!;
  }

  try {
    const filePath = path.join(process.cwd(), 'locales', `${locale}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const dictionary = JSON.parse(fileContent) as Dictionary;
    dictionaryCache[locale] = dictionary;
    return dictionary;
  } catch (error) {
    console.error(`Failed to load dictionary for ${locale}:`, error);
    // Fallback to English if dictionary fails to load
    if (locale !== defaultLocale) {
      return loadDictionary(defaultLocale);
    }
    throw error;
  }
}

// Legacy dictionaries for backward compatibility
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
      tagline: "HousePlus - Global B2B Wholesale Manufacturer",
      mainTitle: "HousePlus Group - Professional Wholesale Supplier",
      mainDescription: "Since 2010, HousePlus has been a trusted manufacturer of solar energy systems, home appliances and 3C electronics. We serve wholesale buyers in 60+ countries, offering OEM/ODM services with CE/FCC/RoHS certifications and MOQ from 100 units.",
      browseProducts: "Browse All Products",
      requestQuote: "Request a Quote",
      counter: {
        years: "Years of Manufacturing",
        clients: "Global Wholesale Clients",
        countries: "Countries Served",
        warranty: "Product Warranty",
      },
      industries: [
        {
          title: "High-Efficiency Solar Energy Systems",
          description: "We manufacture a wide range of solar products - from 100W monocrystalline panels to 3000W portable power stations. All products are CE, RoHS and IEC certified, ready for European, Middle Eastern and African markets.",
          buttonText: "Explore Solar Products",
        },
        {
          title: "Energy-Efficient Home Appliances",
          description: "From air fryers to electric kettles - our home appliance line is engineered for energy efficiency and durability. With in-house tooling and R&D team, we deliver OEM/ODM solutions that meet CE, FCC and RoHS standards.",
          buttonText: "View Home Appliances",
        },
        {
          title: "3C Electronics & Accessories",
          description: "From TWS earphones to portable SSDs - we supply a curated portfolio of 3C electronics. Each product undergoes rigorous quality control and supports private-label branding with custom packaging.",
          buttonText: "View 3C Electronics",
        },
      ],
      whyChoose: {
        title: "Why Global Buyers Choose HousePlus",
        subtitle: "With 14+ years of manufacturing experience and responsive service, HousePlus delivers reliable products on time, every time. Your success is our commitment.",
        features: [
          {
            icon: "Factory",
            title: "Vertically Integrated Factory",
            desc: "Over 20,000 m2 of production space with in-house tooling, assembly lines and quality labs - full control from raw material to finished product.",
          },
          {
            icon: "Certified",
            title: "International Certifications",
            desc: "CE, FCC, RoHS, ISO 9001 and IEC certifications ensure our products meet the regulatory requirements of Europe, North America and beyond.",
          },
          {
            icon: "Support",
            title: "Flexible OEM/ODM Support",
            desc: "Custom branding, private-label packaging and product modifications available from MOQ 100 pcs. Dedicated account managers for every client.",
          },
        ],
      },
      carousel: [
        {
          imageAlt: "HousePlus Solar Energy Solutions",
          title: "High-Efficiency Solar Solutions",
          subtitle: "Professional-grade solar panels, inverters and portable power stations for global wholesale partners",
          buttonText: "Explore Solar Products",
        },
        {
          imageAlt: "HousePlus Home Appliances",
          title: "Smart Home Appliances",
          subtitle: "Energy-efficient kitchen and household appliances with full OEM/ODM customisation support",
          buttonText: "View Appliances",
        },
        {
          imageAlt: "HousePlus 3C Electronics",
          title: "3C Electronics & Accessories",
          subtitle: "Premium headphones, smart watches, portable SSDs and charging accessories for modern consumers",
          buttonText: "View Electronics",
        },
      ],
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
    nav: { about: "Sobre Nosotros", products: "Productos", factory: "Fábrica", contact: "Contacto" },
    home: {
      categories: {
        title: "Nuestras Categorías de Producto",
        subtitle: "Soluciones integrales para hogares y empresas en todo el mundo",
        items: [
          { emoji: "☀️", title: "Bombas Solares", description: "Sistemas de bombeo con energía solar de alta eficiencia", href: "/products/solar-water-pumps" },
          { emoji: "⚡", title: "Cables Solares", description: "Soluciones premium de cables fotovoltaicos", href: "/products/solar-cables" },
          { emoji: "🏠", title: "Electrodomésticos", description: "Campanas, estufas, hornos y más", href: "/products/home-appliances" },
        ],
      },
      cta: { title: "¿Listo para Asociarnos?", subtitle: "Obtenga precios competitivos para pedidos por mayor y personalización OEM.", button: "Solicitar Cotización" },
      tagline: "HousePlus - Fabricante Mayorista Global B2B",
      mainTitle: "Grupo HousePlus - Proveedor Mayorista Profesional",
      mainDescription: "Desde 2010, HousePlus ha sido un fabricante confiable de sistemas de energía solar, electrodomésticos y electrónica 3C. Atendemos a compradores mayoristas en más de 60 países, ofreciendo servicios OEM/ODM con certificaciones CE/FCC/RoHS y MOQ desde 100 unidades.",
      browseProducts: "Ver Todos los Productos",
      requestQuote: "Solicitar Cotización",
      counter: {
        years: "Años de Fabricación",
        clients: "Clientes Mayoristas Globales",
        countries: "Países Atendidos",
        warranty: "Garantía del Producto",
      },
      industries: [
        {
          title: "Sistemas de Energía Solar de Alta Eficiencia",
          description: "Fabricamos una amplia gama de productos solares - desde paneles monocristalinos de 100W hasta estaciones de energía portátiles de 3000W. Todos los productos están certificados CE, RoHS e IEC, listos para mercados europeos, del Medio Oriente y africanos.",
          buttonText: "Explorar Productos Solares",
        },
        {
          title: "Electrodomésticos Eficientes en Energía",
          description: "Desde freidoras de aire hasta hervidores eléctricos - nuestra línea de electrodomésticos está diseñada para la eficiencia energética y durabilidad. Con herramientas internas y equipo de I+D, entregamos soluciones OEM/ODM que cumplen con los estándares CE, FCC y RoHS.",
          buttonText: "Ver Electrodomésticos",
        },
        {
          title: "Electrónica 3C y Accesorios",
          description: "Desde auriculares TWS hasta SSD portátiles - suministramos una cartera curada de electrónica 3C. Cada producto se somete a un riguroso control de calidad y admite marca privada con empaque personalizado.",
          buttonText: "Ver Electrónica 3C",
        },
      ],
      whyChoose: {
        title: "Por Qué los Compradores Globales Eligen HousePlus",
        subtitle: "Con más de 14 años de experiencia en fabricación y servicio receptivo, HousePlus entrega productos confiables a tiempo, siempre. Su éxito es nuestro compromiso.",
        features: [
          {
            icon: "Factory",
            title: "Fábrica Verticalmente Integrada",
            desc: "Más de 20,000 m2 de espacio de producción con herramientas internas, líneas de montaje y laboratorios de calidad - control completo desde materia prima hasta producto terminado.",
          },
          {
            icon: "Certified",
            title: "Certificaciones Internacionales",
            desc: "Certificaciones CE, FCC, RoHS, ISO 9001 e IEC garantizan que nuestros productos cumplen con los requisitos reglamentarios de Europa, América del Norte y más allá.",
          },
          {
            icon: "Support",
            title: "Soporte Flexible OEM/ODM",
            desc: "Marca personalizada, empaque de marca privada y modificaciones de productos disponibles desde MOQ 100 unidades. Gerentes de cuenta dedicados para cada cliente.",
          },
        ],
      },
      carousel: [
        {
          imageAlt: "HousePlus Soluciones de Energía Solar",
          title: "Soluciones Solares de Alta Eficiencia",
          subtitle: "Paneles solares, inversores y estaciones de energía portátiles de grado profesional para socios mayoristas globales",
          buttonText: "Explorar Productos Solares",
        },
        {
          imageAlt: "HousePlus Electrodomésticos",
          title: "Electrodomésticos Inteligentes",
          subtitle: "Electrodomésticos de cocina y hogar eficientes en energía con soporte completo de personalización OEM/ODM",
          buttonText: "Ver Electrodomésticos",
        },
        {
          imageAlt: "HousePlus Electrónica 3C",
          title: "Electrónica 3C y Accesorios",
          subtitle: "Auriculares premium, relojes inteligentes, SSD portátiles y accesorios de carga para consumidores modernos",
          buttonText: "Ver Electrónica",
        },
      ],
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
    nav: { about: "Über Uns", products: "Produkte", factory: "Fabrik", contact: "Kontakt" },
    home: {
      categories: {
        title: "Unsere Produktkategorien",
        subtitle: "Umfassende Lösungen für Häuser und Unternehmen weltweit",
        items: [
          { emoji: "☀️", title: "Solarwasserpumpen", description: "Hochleistungs-Solar-Pumpensysteme", href: "/products/solar-water-pumps" },
          { emoji: "⚡", title: "Solarkabel", description: "Premium-Photovoltaik-Kabellösungen", href: "/products/solar-cables" },
          { emoji: "🏠", title: "Haushaltsgeräte", description: "Dunstäbsüge, Gasherde, Öfen und mehr", href: "/products/home-appliances" },
        ],
      },
      cta: { title: "Bereit für eine Partnerschaft?", subtitle: "Erhalten Sie wettbewerbsfähige Preise für Großbestellungen und OEM-Anpassung.", button: "Angebot anfordern" },
      tagline: "HousePlus - Globaler B2B-Großhandelshersteller",
      mainTitle: "HousePlus Group - Professioneller Großhandelslieferant",
      mainDescription: "Seit 2010 ist HousePlus ein vertrauenswürdiger Hersteller von Solarenergiesystemen, Haushaltsgeräten und 3C-Elektronik. Wir beliefern Großhandelskäufer in über 60 Ländern und bieten OEM/ODM-Dienstleistungen mit CE/FCC/RoHS-Zertifizierungen und MOQ ab 100 Einheiten.",
      browseProducts: "Alle Produkte ansehen",
      requestQuote: "Angebot anfordern",
      counter: {
        years: "Jahre der Fertigung",
        clients: "Globale Großhandelskunden",
        countries: "Länder bedient",
        warranty: "Produktgarantie",
      },
      industries: [
        {
          title: "Hocheffiziente Solarenergiesysteme",
          description: "Wir fertigen eine breite Palette von Solarprodukten - von 100W-Monokristallin-Modulen bis zu 3000W-Tragbaren Kraftwerken. Alle Produkte sind CE-, RoHS- und IEC-zertifiziert und bereit für europäische, nahöstliche und afrikanische Märkte.",
          buttonText: "Solarprodukte erkunden",
        },
        {
          title: "Energieeffiziente Haushaltsgeräte",
          description: "Von Heißluftfritteusen bis zu Elektrokesseln - unsere Haushaltsgerätelinie ist auf Energieeffizienz und Haltbarkeit ausgelegt. Mit internem Werkzeugbau und F&E-Team liefern wir OEM/ODM-Lösungen, die CE-, FCC- und RoHS-Standards erfüllen.",
          buttonText: "Haushaltsgeräte ansehen",
        },
        {
          title: "3C-Elektronik & Zubehör",
          description: "Von TWS-Kopfhörern bis zu portablen SSDs - wir liefern ein kuratiertes Portfolio an 3C-Elektronik. Jedes Produkt durchläuft strenge Qualitätskontrollen und unterstützt Private-Label-Branding mit benutzerdefinierter Verpackung.",
          buttonText: "3C-Elektronik ansehen",
        },
      ],
      whyChoose: {
        title: "Warum globale Käufer HousePlus wählen",
        subtitle: "Mit über 14 Jahren Fertigungserfahrung und responsivem Service liefert HousePlus zuverlässige Produkte pünktlich, jedes Mal. Ihr Erfolg ist unser Engagement.",
        features: [
          {
            icon: "Factory",
            title: "Vertikal integrierte Fabrik",
            desc: "Über 20.000 m2 Produktionsfläche mit internem Werkzeugbau, Montagelinien und Qualitätslabors - volle Kontrolle von Rohmaterial bis Endprodukt.",
          },
          {
            icon: "Certified",
            title: "Internationale Zertifizierungen",
            desc: "CE-, FCC-, RoHS-, ISO 9001- und IEC-Zertifizierungen stellen sicher, dass unsere Produkte die regulatorischen Anforderungen von Europa, Nordamerika und darüber hinaus erfüllen.",
          },
          {
            icon: "Support",
            title: "Flexibler OEM/ODM-Support",
            desc: "Benutzerdefiniertes Branding, Private-Label-Verpackung und Produktmodifikationen ab MOQ 100 Stück verfügbar. Dedizierte Accountmanager für jeden Kunden.",
          },
        ],
      },
      carousel: [
        {
          imageAlt: "HousePlus Solarenergielösungen",
          title: "Hocheffiziente Solarlösungen",
          subtitle: "Professionelle Solarpanels, Wechselrichter und tragbare Kraftwerke für globale Großhandelspartner",
          buttonText: "Solarprodukte erkunden",
        },
        {
          imageAlt: "HousePlus Haushaltsgeräte",
          title: "Intelligente Haushaltsgeräte",
          subtitle: "Energieeffiziente Küchen- und Haushaltsgeräte mit vollem OEM/ODM-Anpassungssupport",
          buttonText: "Haushaltsgeräte ansehen",
        },
        {
          imageAlt: "HousePlus 3C-Elektronik",
          title: "3C-Elektronik & Zubehör",
          subtitle: "Premium-Kopfhörer, Smartwatches, tragbare SSDs und Ladezubehör für moderne Verbraucher",
          buttonText: "Elektronik ansehen",
        },
      ],
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
    nav: { about: "À Propos", products: "Produits", factory: "Usine", contact: "Contact" },
    home: {
      categories: {
        title: "Nos Catégories de Produits",
        subtitle: "Des solutions complètes pour les foyers et entreprises du monde entier",
        items: [
          { emoji: "☀️", title: "Pompes Solaires", description: "Systèmes de pompage à énergie solaire haute efficacité", href: "/products/solar-water-pumps" },
          { emoji: "⚡", title: "Câbles Solaires", description: "Solutions de câbles photovoltaïques premium", href: "/products/solar-cables" },
          { emoji: "🏠", title: "Appareils Ménagers", description: "Hottes, cuisinières, fours et plus", href: "/products/home-appliances" },
        ],
      },
      cta: { title: "Prêt à Partenariat ?", subtitle: "Obtenez des prix compétitifs pour les commandes en gros et la personnalisation OEM.", button: "Demander un Devis" },
      tagline: "HousePlus - Fabricant Global B2B en Gros",
      mainTitle: "Groupe HousePlus - Fournisseur Professionnel en Gros",
      mainDescription: "Depuis 2010, HousePlus est un fabricant fiable de systèmes d'énergie solaire, d'appareils ménagers et d'électronique 3C. Nous servons des acheteurs en gros dans plus de 60 pays, offrant des services OEM/ODM avec certifications CE/FCC/RoHS et MOQ à partir de 100 unités.",
      browseProducts: "Voir Tous les Produits",
      requestQuote: "Demander un Devis",
      counter: {
        years: "Années de Fabrication",
        clients: "Clients Gros Globaux",
        countries: "Pays Desservis",
        warranty: "Garantie Produit",
      },
      industries: [
        {
          title: "Systèmes d'Énergie Solaire Haute Efficacité",
          description: "Nous fabriquons une large gamme de produits solaires - des panneaux monocristallins 100W aux centrales électriques portables 3000W. Tous les produits sont certifiés CE, RoHS et IEC, prêts pour les marchés européens, du Moyen-Orient et africains.",
          buttonText: "Explorer les Produits Solaires",
        },
        {
          title: "Appareils Ménagers Économes en Énergie",
          description: "Des friteuses à air aux bouilloires électriques - notre gamme d'appareils ménagers est conçue pour l'efficacité énergétique et la durabilité. Avec outillage interne et équipe R&D, nous fournissons des solutions OEM/ODM répondant aux normes CE, FCC et RoHS.",
          buttonText: "Voir les Appareils Ménagers",
        },
        {
          title: "Électronique 3C & Accessoires",
          description: "Des écouteurs TWS aux SSD portables - nous fournissons un portefeuille sélectionné d'électronique 3C. Chaque produit subit un contrôle de qualité rigoureux et prend en charge le branding de marque privée avec emballage personnalisé.",
          buttonText: "Voir l'Électronique 3C",
        },
      ],
      whyChoose: {
        title: "Pourquoi les Acheteurs Globaux Choisissent HousePlus",
        subtitle: "Avec plus de 14 ans d'expérience en fabrication et un service réactif, HousePlus livre des produits fiables à temps, à chaque fois. Votre succès est notre engagement.",
        features: [
          {
            icon: "Factory",
            title: "Usine Verticalement Intégrée",
            desc: "Plus de 20 000 m2 d'espace de production avec outillage interne, lignes d'assemblage et laboratoires qualité - contrôle total de la matière première au produit fini.",
          },
          {
            icon: "Certified",
            title: "Certifications Internationales",
            desc: "Les certifications CE, FCC, RoHS, ISO 9001 et IEC garantissent que nos produits répondent aux exigences réglementaires de l'Europe, de l'Amérique du Nord et au-delà.",
          },
          {
            icon: "Support",
            title: "Support Flexible OEM/ODM",
            desc: "Branding personnalisé, emballage de marque privée et modifications de produits disponibles à partir de MOQ 100 pièces. Gestionnaires de compte dédiés pour chaque client.",
          },
        ],
      },
      carousel: [
        {
          imageAlt: "HousePlus Solutions d'Énergie Solaire",
          title: "Solutions Solaires Haute Efficacité",
          subtitle: "Panneaux solaires de qualité professionnelle, onduleurs et centrales électriques portables pour partenaires grossistes globaux",
          buttonText: "Explorer les Produits Solaires",
        },
        {
          imageAlt: "HousePlus Appareils Ménagers",
          title: "Appareils Ménagers Intelligents",
          subtitle: "Appareils de cuisine et ménagers économes en énergie avec support complet de personnalisation OEM/ODM",
          buttonText: "Voir les Appareils Ménagers",
        },
        {
          imageAlt: "HousePlus Électronique 3C",
          title: "Électronique 3C & Accessoires",
          subtitle: "Écouteurs premium, montres connectées, SSD portables et accessoires de charge pour consommateurs modernes",
          buttonText: "Voir l'Électronique",
        },
      ],
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
    nav: { about: "معلومات عنا", products: "المنتجات", factory: "المصنع", contact: "اتصل بنا" },
    home: {
      categories: {
        title: "فئات المنتجات الخاصة بنا",
        subtitle: "حلول شاملة للمنازل والشركات حول العالم",
        items: [
          { emoji: "☀️", title: "المضخات الشمسية", description: "أنظمة ضخ تعمل بالطاقة الشمسية عالية الكفاءة", href: "/products/solar-water-pumps" },
          { emoji: "⚡", title: "الكابلات الشمسية", description: "حلول كابلات فوتوفولتائية متميزة", href: "/products/solar-cables" },
          { emoji: "🏠", title: "الأجهزة المنزلية", description: "شفاطات، مواقد، أفران وأكثر", href: "/products/home-appliances" },
        ],
      },
      cta: { title: "مستعد للشراكة؟", subtitle: "احصل على أسعار تنافسية للطلبات بالجملة والتخصيص OEM.", button: "طلب عرض سعر" },
      tagline: "HousePlus - مصنع جملة عالمي B2B",
      mainTitle: "مجموعة HousePlus - مورد جملة محترف",
      mainDescription: "منذ عام 2010، HousePlus هو مصنع موثوق لأنظمة الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. نخدم مشتريي الجملة في أكثر من 60 دولة، ونقدم خدمات OEM/ODM مع شهادات CE/FCC/RoHS وMOQ بدءًا من 100 وحدة.",
      browseProducts: "عرض جميع المنتجات",
      requestQuote: "طلب عرض سعر",
      counter: {
        years: "سنوات التصنيع",
        clients: "عملاء الجملة العالميون",
        countries: "البلدان التي نخدمها",
        warranty: "ضمان المنتج",
      },
      industries: [
        {
          title: "أنظمة الطاقة الشمسية عالية الكفاءة",
          description: "نصنع مجموعة واسعة من المنتجات الشمسية - من الألواح أحادية البلور 100W إلى محطات الطاقة المحمولة 3000W. جميع المنتجات معتمدة CE وRoHS وIEC، جاهزة للأسواق الأوروبية والشرق الأوسط والأفريقية.",
          buttonText: "استكشف المنتجات الشمسية",
        },
        {
          title: "أجهزة منزلية موفرة للطاقة",
          description: "من مقلات الهواء الساخن إلى الأباريق الكهربائية - خط أجهزتنا المنزلية مصمم لكفاءة الطاقة والمتانة. مع أدوات داخلية وفريق بحث وتطوير، نقدم حلول OEM/ODM التي تفي بمعايير CE وFCC وRoHS.",
          buttonText: "عرض الأجهزة المنزلية",
        },
        {
          title: "الإلكترونيات 3C والملحقات",
          description: "من سماعة الأذن TWS إلى SSD محمول - نقدم مجموعة منتقاة من الإلكترونيات 3C. يخضع كل منتج لمراقبة جودة صارمة ويدعم العلامة التجارية الخاصة مع تغليف مخصص.",
          buttonText: "عرض الإلكترونيات 3C",
        },
      ],
      whyChoose: {
        title: "لماذا يختار المشترون العالميون HousePlus",
        subtitle: "مع أكثر من 14 عامًا من الخبرة في التصنيع وخدمة سريعة الاستجابة، توفر HousePlus منتجات موثوقة في الوقت المحدد، في كل مرة. نجاحك هو التزامنا.",
        features: [
          {
            icon: "Factory",
            title: "مصنع متكامل رأسيًا",
            desc: "أكثر من 20,000 متر مربع من مساحة الإنتاج مع أدوات داخلية وخطوط تجميع ومختبرات جودة - تحكم كامل من المادة الخام إلى المنتج النهائي.",
          },
          {
            icon: "Certified",
            title: "شهادات دولية",
            desc: "تضمن الشهادات CE وFCC وRoHS وISO 9001 وIEC أن منتجاتنا تفي بالمتطلبات التنظيمية لأوروبا وأمريكا الشمالية وما بعدها.",
          },
          {
            icon: "Support",
            title: "دعم مرن OEM/ODM",
            desc: "علامة تجارية مخصصة وتغليف علامة خاصة وتعديلات منتجات متوفرة من MOQ 100 قطعة. مديري حسابات مخصصين لكل عميل.",
          },
        ],
      },
      carousel: [
        {
          imageAlt: "HousePlus حلول الطاقة الشمسية",
          title: "حلول شمسية عالية الكفاءة",
          subtitle: "ألواح شمسية ومحولات ومحطات طاقة محمولة احترافية لشركاء الجملة العالميين",
          buttonText: "استكشف المنتجات الشمسية",
        },
        {
          imageAlt: "HousePlus الأجهزة المنزلية",
          title: "أجهزة منزلية ذكية",
          subtitle: "أجهزة مطبخ ومنزل موفرة للطاقة مع دعم تخصيص OEM/ODM كامل",
          buttonText: "عرض الأجهزة المنزلية",
        },
        {
          imageAlt: "HousePlus الإلكترونيات 3C",
          title: "الإلكترونيات 3C والملحقات",
          subtitle: "سماعة أذن فاخرة وساعات ذكية وSSD محمول وملحقات شحن للمستهلكين الحديثين",
          buttonText: "عرض الإلكترونيات",
        },
      ],
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
  try {
    const dictionary = loadDictionary(locale);
    return Promise.resolve(dictionary);
  } catch (error) {
    console.error(`Falling back to legacy dictionary for ${locale}`);
    return Promise.resolve(dictionaries[locale]);
  }
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
