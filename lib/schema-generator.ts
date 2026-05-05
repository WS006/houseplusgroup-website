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

export interface ProductSchemaOptions {
  name: string;
  description: string;
  image: string;
  sku: string;
  brand?: string;
  url: string;
  availability?: 'InStock' | 'PreOrder' | 'OutOfStock';
  category?: string;
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
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
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
    },
  };
}

export interface ItemListSchemaItem {
  name: string;
  url: string;
  image?: string;
  description?: string;
  position: number;
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
