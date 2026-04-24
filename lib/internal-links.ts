/**
 * Internal Linking Strategy for HousePlus
 * Implements hierarchical structure: Home → Category → Product
 * Supports SEO juice flow and user navigation
 */

export interface InternalLink {
  title: string;
  href: string;
  description?: string;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  relatedLinks?: string[];
}

export const internalLinkStructure = {
  // ===== TIER 1: HOMEPAGE =====
  homepage: {
    title: 'HousePlus - Global Manufacturer',
    href: '/',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics',
    priority: 'high',
    relatedLinks: [
      '/about-us',
      '/products',
      '/factory',
      '/contact',
    ],
  },

  // ===== TIER 2: CATEGORY PAGES =====
  categories: {
    solar: {
      title: 'Solar Energy Systems',
      href: '/solar-energy',
      description: 'High-efficiency solar panels, portable power stations, and complete solar solutions',
      category: 'products',
      priority: 'high',
      relatedLinks: [
        '/solar-energy/portable-power-stations',
        '/solar-energy/solar-panels',
        '/solar-energy/mppt-controllers',
        '/solar-energy/inverters',
        '/solar-energy/batteries',
      ],
    },
    appliances: {
      title: 'Home Appliances',
      href: '/home-appliances',
      description: 'Energy-efficient washing machines, refrigerators, air conditioners, and kitchen appliances',
      category: 'products',
      priority: 'high',
      relatedLinks: [
        '/home-appliances/washing-machines',
        '/home-appliances/refrigerators',
        '/home-appliances/air-conditioners',
        '/home-appliances/kitchen-appliances',
        '/home-appliances/water-heaters',
      ],
    },
    electronics: {
      title: '3C Digital Electronics',
      href: '/3c-electronics',
      description: 'Smart home devices, LED lighting, wireless chargers, and IoT products',
      category: 'products',
      priority: 'high',
      relatedLinks: [
        '/3c-electronics/smart-home',
        '/3c-electronics/led-lighting',
        '/3c-electronics/wireless-chargers',
        '/3c-electronics/power-banks',
        '/3c-electronics/smart-speakers',
      ],
    },
  },

  // ===== TIER 3: PRODUCT SUBCATEGORIES =====
  subcategories: {
    // Solar Subcategories
    portablePowerStations: {
      title: 'Portable Power Stations',
      href: '/solar-energy/portable-power-stations',
      description: 'Portable solar power stations for camping, RV, and emergency backup',
      category: 'solar',
      priority: 'high',
      relatedLinks: [
        '/solar-energy/portable-power-stations/500wh',
        '/solar-energy/portable-power-stations/1000wh',
        '/solar-energy/portable-power-stations/2000wh',
        '/solar-energy',
        '/3c-electronics/power-banks',
      ],
    },
    solarPanels: {
      title: 'Solar Panels',
      href: '/solar-energy/solar-panels',
      description: 'High-efficiency monocrystalline and polycrystalline solar panels',
      category: 'solar',
      priority: 'high',
      relatedLinks: [
        '/solar-energy/solar-panels/monocrystalline',
        '/solar-energy/solar-panels/polycrystalline',
        '/solar-energy/mppt-controllers',
        '/solar-energy/inverters',
        '/solar-energy',
      ],
    },
    mpptControllers: {
      title: 'MPPT Solar Charge Controllers',
      href: '/solar-energy/mppt-controllers',
      description: 'Advanced MPPT charge controllers for solar systems',
      category: 'solar',
      priority: 'medium',
      relatedLinks: [
        '/solar-energy/solar-panels',
        '/solar-energy/batteries',
        '/solar-energy/inverters',
        '/solar-energy',
      ],
    },
    solarInverters: {
      title: 'Solar Inverters',
      href: '/solar-energy/inverters',
      description: 'Off-grid and grid-tie solar inverters',
      category: 'solar',
      priority: 'medium',
      relatedLinks: [
        '/solar-energy/solar-panels',
        '/solar-energy/batteries',
        '/solar-energy/mppt-controllers',
        '/solar-energy',
      ],
    },
    solarBatteries: {
      title: 'Solar Batteries',
      href: '/solar-energy/batteries',
      description: 'Lithium and lead-acid solar storage batteries',
      category: 'solar',
      priority: 'medium',
      relatedLinks: [
        '/solar-energy/solar-panels',
        '/solar-energy/inverters',
        '/solar-energy/mppt-controllers',
        '/solar-energy',
      ],
    },

    // Appliances Subcategories
    washingMachines: {
      title: 'Washing Machines',
      href: '/home-appliances/washing-machines',
      description: 'Energy-efficient washing machines for residential and commercial use',
      category: 'appliances',
      priority: 'high',
      relatedLinks: [
        '/home-appliances/washing-machines/front-load',
        '/home-appliances/washing-machines/top-load',
        '/home-appliances',
      ],
    },
    refrigerators: {
      title: 'Refrigerators',
      href: '/home-appliances/refrigerators',
      description: 'Modern refrigerators with advanced cooling technology',
      category: 'appliances',
      priority: 'high',
      relatedLinks: [
        '/home-appliances/refrigerators/french-door',
        '/home-appliances/refrigerators/side-by-side',
        '/home-appliances',
      ],
    },
    airConditioners: {
      title: 'Air Conditioners',
      href: '/home-appliances/air-conditioners',
      description: 'Energy-efficient air conditioning systems',
      category: 'appliances',
      priority: 'high',
      relatedLinks: [
        '/home-appliances/air-conditioners/split-ac',
        '/home-appliances/air-conditioners/window-ac',
        '/home-appliances',
      ],
    },
    kitchenAppliances: {
      title: 'Kitchen Appliances',
      href: '/home-appliances/kitchen-appliances',
      description: 'Microwave ovens, dishwashers, cooktops, and range hoods',
      category: 'appliances',
      priority: 'medium',
      relatedLinks: [
        '/home-appliances/kitchen-appliances/microwave',
        '/home-appliances/kitchen-appliances/dishwasher',
        '/home-appliances',
      ],
    },
    waterHeaters: {
      title: 'Water Heaters',
      href: '/home-appliances/water-heaters',
      description: 'Electric and solar water heating solutions',
      category: 'appliances',
      priority: 'medium',
      relatedLinks: [
        '/home-appliances/water-heaters/electric',
        '/home-appliances/water-heaters/solar',
        '/home-appliances',
      ],
    },

    // Electronics Subcategories
    smartHome: {
      title: 'Smart Home Devices',
      href: '/3c-electronics/smart-home',
      description: 'Smart bulbs, plugs, switches, and home automation hubs',
      category: 'electronics',
      priority: 'high',
      relatedLinks: [
        '/3c-electronics/smart-home/smart-bulbs',
        '/3c-electronics/smart-home/smart-plugs',
        '/3c-electronics/led-lighting',
        '/3c-electronics',
      ],
    },
    ledLighting: {
      title: 'LED Lighting',
      href: '/3c-electronics/led-lighting',
      description: 'Smart and conventional LED lighting solutions',
      category: 'electronics',
      priority: 'high',
      relatedLinks: [
        '/3c-electronics/led-lighting/smart-bulbs',
        '/3c-electronics/led-lighting/panels',
        '/3c-electronics/smart-home',
        '/3c-electronics',
      ],
    },
    wirelessChargers: {
      title: 'Wireless Chargers',
      href: '/3c-electronics/wireless-chargers',
      description: 'Fast wireless charging solutions for smartphones and devices',
      category: 'electronics',
      priority: 'medium',
      relatedLinks: [
        '/3c-electronics/power-banks',
        '/3c-electronics',
      ],
    },
    powerBanks: {
      title: 'Power Banks',
      href: '/3c-electronics/power-banks',
      description: 'Portable power banks with fast charging technology',
      category: 'electronics',
      priority: 'medium',
      relatedLinks: [
        '/3c-electronics/wireless-chargers',
        '/3c-electronics',
      ],
    },
    smartSpeakers: {
      title: 'Smart Speakers',
      href: '/3c-electronics/smart-speakers',
      description: 'Voice-controlled smart speakers with AI integration',
      category: 'electronics',
      priority: 'medium',
      relatedLinks: [
        '/3c-electronics/smart-home',
        '/3c-electronics',
      ],
    },
  },

  // ===== TIER 4: SUPPORTING PAGES =====
  support: {
    about: {
      title: 'About HousePlus',
      href: '/about-us',
      description: 'Company history, mission, and values',
      priority: 'high',
      relatedLinks: ['/', '/factory', '/team', '/contact'],
    },
    factory: {
      title: 'Our Factory',
      href: '/factory',
      description: 'Manufacturing facilities and production capabilities',
      priority: 'high',
      relatedLinks: ['/about-us', '/team', '/service', '/'],
    },
    team: {
      title: 'Our Team',
      href: '/team',
      description: 'Meet the HousePlus team',
      priority: 'medium',
      relatedLinks: ['/about-us', '/factory', '/careers', '/'],
    },
    service: {
      title: 'Our Services',
      href: '/service',
      description: 'OEM/ODM, technical support, and after-sales services',
      priority: 'high',
      relatedLinks: ['/about-us', '/factory', '/contact', '/'],
    },
    faq: {
      title: 'FAQ',
      href: '/faq',
      description: 'Frequently asked questions about HousePlus products and services',
      priority: 'high',
      relatedLinks: ['/contact', '/service', '/'],
    },
    contact: {
      title: 'Contact Us',
      href: '/contact',
      description: 'Get in touch with HousePlus',
      priority: 'high',
      relatedLinks: ['/about-us', '/service', '/faq', '/'],
    },
    careers: {
      title: 'Careers',
      href: '/careers',
      description: 'Join the HousePlus team',
      priority: 'medium',
      relatedLinks: ['/about-us', '/team', '/'],
    },
    news: {
      title: 'News & Blog',
      href: '/news',
      description: 'Latest news and industry insights',
      priority: 'medium',
      relatedLinks: ['/about-us', '/'],
    },
    privacy: {
      title: 'Privacy Policy',
      href: '/privacy',
      description: 'Privacy and data protection policy',
      priority: 'low',
      relatedLinks: ['/contact', '/'],
    },
  },
};

// Helper functions
export function getRelatedProducts(category: string): InternalLink[] {
  const links: InternalLink[] = [];
  
  if (category === 'solar') {
    Object.values(internalLinkStructure.subcategories).forEach(sub => {
      if (sub.category === 'solar') links.push(sub as InternalLink);
    });
  } else if (category === 'appliances') {
    Object.values(internalLinkStructure.subcategories).forEach(sub => {
      if (sub.category === 'appliances') links.push(sub as InternalLink);
    });
  } else if (category === 'electronics') {
    Object.values(internalLinkStructure.subcategories).forEach(sub => {
      if (sub.category === 'electronics') links.push(sub as InternalLink);
    });
  }
  
  return links;
}

export function getBreadcrumbLinks(path: string): InternalLink[] {
  const breadcrumbs: InternalLink[] = [
    { title: 'Home', href: '/', priority: 'high' },
  ];
  
  // Add category if applicable
  if (path.includes('solar')) {
    breadcrumbs.push(internalLinkStructure.categories.solar as InternalLink);
  } else if (path.includes('appliances')) {
    breadcrumbs.push(internalLinkStructure.categories.appliances as InternalLink);
  } else if (path.includes('electronics')) {
    breadcrumbs.push(internalLinkStructure.categories.electronics as InternalLink);
  }
  
  return breadcrumbs;
}

export function getNavigationMenu(): InternalLink[] {
  return [
    internalLinkStructure.homepage as InternalLink,
    internalLinkStructure.support.about as InternalLink,
    internalLinkStructure.categories.solar as InternalLink,
    internalLinkStructure.categories.appliances as InternalLink,
    internalLinkStructure.categories.electronics as InternalLink,
    internalLinkStructure.support.service as InternalLink,
    internalLinkStructure.support.faq as InternalLink,
    internalLinkStructure.support.contact as InternalLink,
  ];
}
