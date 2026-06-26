const BASE_URL = 'https://www.houseplus-ch.com';

interface SchemaOptions {
  title: string;
  description: string;
  url: string;
  lang: string;
  type: string;
}

export function generateOrganizationSchema(options: SchemaOptions) {
  const { title, description, url } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: title,
    alternateName: 'HousePlus Group',
    description,
    url,
    logo: `${BASE_URL}/icon.png`,
    foundingDate: '2010',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 500 },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Foshan',
      addressRegion: 'Guangdong',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.1291',
      longitude: '113.2644',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+86-155-7811-9543',
        contactType: 'sales',
        availableLanguage: ['English', 'Chinese'],
        contactOption: 'TollFree',
        areaServed: ['Worldwide', 'NG', 'DE', 'FR', 'AE'],
      },
      {
        '@type': 'ContactPoint',
        email: 'sales@houseplus-ch.com',
        contactType: 'customer service',
        areaServed: ['Worldwide', 'NG', 'DE', 'FR', 'AE'],
      },
    ],
    sameAs: [
      `${BASE_URL}/en`,
    ],
    areaServed: 'Worldwide',
    knowsAbout: [
      'Solar Energy Systems',
      'Home Appliances',
      '3C Electronics',
      'OEM Manufacturing',
      'ODM Services',
    ],
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqItems: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface ImageObjectOptions {
  url: string;
  caption?: string;
  description?: string;
  width?: number;
  height?: number;
}

export function generateImageObjectSchema(options: ImageObjectOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: options.url,
    caption: options.caption,
    description: options.description,
    ...(options.width && { width: options.width }),
    ...(options.height && { height: options.height }),
  };
}

export interface B2BSchemaInfo {
  moq?: string;
  leadTime?: string;
  warranty?: string;
  certifications?: string[];
  oemOdm?: boolean;
  factorySize?: string;
  foundedYear?: number;
  exportCountries?: number;
  wholesaleClients?: number;
}

export interface ProductSchemaOptions {
  name: string;
  description: string;
  image: string;
  sku: string;
  brand?: string;
  url: string;
  availability?: 'InStock' | 'PreOrder' | 'OutOfStock';
  category?: string;
  imageCaption?: string;
  imageDescription?: string;
  b2bInfo?: B2BSchemaInfo;
}

export function generateProductSchema(options: ProductSchemaOptions) {
  const {
    name,
    description,
    image,
    sku,
    brand = 'HousePlus',
    url,
    availability = 'InStock',
    category,
    imageCaption,
    imageDescription,
    b2bInfo,
  } = options;

  const additionalProperty = [];
  if (b2bInfo?.moq) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'MOQ (Minimum Order Quantity)',
      value: b2bInfo.moq,
    });
  }
  if (b2bInfo?.leadTime) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Lead Time',
      value: b2bInfo.leadTime,
    });
  }
  if (b2bInfo?.warranty) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Warranty',
      value: b2bInfo.warranty,
    });
  }
  if (b2bInfo?.certifications && b2bInfo.certifications.length > 0) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Certifications',
      value: b2bInfo.certifications.join(', '),
    });
  }
  if (b2bInfo?.oemOdm) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'OEM/ODM Available',
      value: 'Yes',
    });
  }
  if (b2bInfo?.factorySize) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Factory Size',
      value: b2bInfo.factorySize,
    });
  }
  if (b2bInfo?.foundedYear) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Founded Year',
      value: String(b2bInfo.foundedYear),
    });
  }
  if (b2bInfo?.exportCountries) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Export Countries',
      value: `${b2bInfo.exportCountries}+ countries`,
    });
  }
  if (b2bInfo?.wholesaleClients) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Wholesale Clients',
      value: `${b2bInfo.wholesaleClients}+`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: {
      '@type': 'ImageObject',
      contentUrl: image,
      caption: imageCaption || name,
      description: imageDescription || description,
    },
    sku,
    mpn: sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    url,
    category,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31)
        .toISOString()
        .split('T')[0],
      availability: `https://schema.org/${availability}`,
      seller: {
        '@type': 'Organization',
        name: 'HousePlus Group',
        url: BASE_URL,
      },
      itemCondition: 'https://schema.org/NewCondition',
      ...(b2bInfo?.moq && { minimumOrderQuantity: { '@type': 'QuantitativeValue', value: b2bInfo.moq.replace(/\D/g, '') } }),
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'HousePlus Group',
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Foshan',
        addressRegion: 'Guangdong',
        addressCountry: 'CN',
      },
      ...(b2bInfo?.foundedYear && { foundingDate: String(b2bInfo.foundedYear) }),
      ...(b2bInfo?.exportCountries && { areaServed: `${b2bInfo.exportCountries}+ countries worldwide` }),
    },
    ...(additionalProperty.length > 0 && { additionalProperty }),
  };
}

export interface ServiceSchemaOptions {
  name: string;
  description: string;
  providerName?: string;
  url: string;
  serviceType?: string;
  areaServed?: string[];
  availableChannel?: string[];
}

export function generateServiceSchema(options: ServiceSchemaOptions) {
  const {
    name,
    description,
    providerName = 'HousePlus Group',
    url,
    serviceType,
    areaServed,
    availableChannel,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: providerName,
      url: BASE_URL,
    },
    url,
    ...(serviceType && { serviceType }),
    ...(areaServed && { areaServed }),
    ...(availableChannel && { availableChannel }),
  };
}

export interface ItemListSchemaItem {
  name: string;
  url: string;
  image?: string;
  description?: string;
  position: number;
}

export function generateLocalBusinessSchema(options: SchemaOptions) {
  const { title, description, url, lang } = options;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'HousePlus Group',
    alternateName: 'HousePlus',
    description,
    url,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
    telephone: '+86-155-7811-9543',
    email: 'sales@houseplus-ch.com',
    priceRange: '$$$',
    foundingDate: '2010',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 500 },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Foshan',
      addressRegion: 'Guangdong',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.1291',
      longitude: '113.2644',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      `${BASE_URL}/en`,
      url,
    ],
    areaServed: 'Worldwide',
    knowsAbout: [
      'Solar Energy Systems',
      'Home Appliances',
      '3C Electronics',
      'OEM Manufacturing',
      'ODM Services',
    ],
  };
}

export function generateItemListSchema(
  name: string,
  description: string,
  url: string,
  items: ItemListSchemaItem[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      url: item.url,
      name: item.name,
      image: item.image,
      description: item.description,
    })),
  };
}
