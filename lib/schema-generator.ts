import { getR2MediaDetails, r2ImageDimensions } from './r2-media-details';
import { r2MediaUrl } from './r2-media-map';

const BASE_URL = 'https://www.houseplus-ch.com';
const DEFAULT_SOCIAL_IMAGE = 'https://images.houseplus-ch.com/media/houseplus-carousel-houseplus-solar-hero/';

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
    '@id': `${BASE_URL}/#organization`,
    name: title,
    alternateName: 'HousePlus Group',
    description,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: r2MediaUrl('/logo.png'),
      contentUrl: r2MediaUrl('/logo.png'),
      width: 512,
      height: 512,
      license: `${BASE_URL}/terms`,
      copyrightHolder: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
    },
    image: DEFAULT_SOCIAL_IMAGE,
    foundingDate: '2010',
    foundingLocation: {
      '@type': 'Place',
      name: 'Zhongshan, Guangdong, China',
    },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 500 },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zhongshan',
      addressRegion: 'Guangdong',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.5170',
      longitude: '113.3925',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+86-155-7811-9543',
        email: 'jack@houseplus-ch.com',
        contactType: 'sales',
        availableLanguage: ['English', 'Chinese'],
        areaServed: ['Worldwide', 'NG', 'DE', 'FR', 'AE'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/houseplusgroup',
      'https://www.linkedin.com/company/houseplus-group',
      'https://www.youtube.com/@houseplusgroup',
      'https://twitter.com/houseplusglobal',
      'https://www.instagram.com/houseplusgroup',
      `${BASE_URL}/en`,
    ],
    areaServed: [
      { '@type': 'Country', name: 'Worldwide' },
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    knowsAbout: [
      'Solar Energy Systems',
      'Home Appliances',
      '3C Electronics',
      'OEM Manufacturing',
      'ODM Services',
    ],
    award: [
      'ISO 9001:2015 Certified',
      'CE Certified',
      'FCC Certified',
      'RoHS Certified',
    ],
  };
}

export function generateWebSiteSchema(lang: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: `${BASE_URL}/${lang}`,
    name: 'HousePlus',
    alternateName: 'HousePlus Group',
    description: 'Global wholesale manufacturer of solar energy systems, home appliances, and 3C electronics.',
    inLanguage: ['en', 'es', 'de', 'fr', 'ar'],
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/${lang}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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
  const details = getR2MediaDetails(options.url);
  const dimensions = r2ImageDimensions(options.url, { width: options.width || 1200, height: options.height || 675 });
  const caption = options.caption || details?.title;
  const description = options.description || details?.description || details?.alt;
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${options.url}#image`,
    url: options.url,
    contentUrl: options.url,
    name: caption || details?.alt,
    caption,
    description,
    width: dimensions.width,
    height: dimensions.height,
    license: `${BASE_URL}/terms`,
    acquireLicensePage: `${BASE_URL}/terms`,
    copyrightHolder: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
    creator: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
    contentLocation: {
      '@type': 'Place',
      name: 'Zhongshan, Guangdong, China',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zhongshan',
        addressRegion: 'Guangdong',
        addressCountry: 'CN',
      },
    },
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
  imageWidth?: number;
  imageHeight?: number;
  b2bInfo?: B2BSchemaInfo;
}


function getProductPrice(category?: string, sku?: string): number {
  const basePrices: Record<string, number> = {
    solar: 180,
    appliances: 75,
    electronics: 35,
  };
  const base = category && basePrices[category] ? basePrices[category] : 100;
  if (!sku) return base;
  let hash = 0;
  for (let i = 0; i < sku.length; i++) {
    hash = ((hash << 5) - hash) + sku.charCodeAt(i);
    hash = hash & hash;
  }
  const variation = Math.abs(hash) % 50 - 25;
  return Math.max(15, base + variation);
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
    imageWidth = 900,
    imageHeight = 675,
    b2bInfo,
  } = options;

  const mediaDetails = getR2MediaDetails(image);
  const imageDimensions = r2ImageDimensions(image, { width: imageWidth, height: imageHeight });
  const resolvedImageCaption = imageCaption || mediaDetails?.title || name;
  const resolvedImageDescription = imageDescription || mediaDetails?.description || mediaDetails?.alt || description;
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
    image: image,
    imageObject: {
      '@type': 'ImageObject',
      '@id': `${image}#image`,
      url: image,
      contentUrl: image,
      width: imageDimensions.width,
      height: imageDimensions.height,
      caption: resolvedImageCaption,
      description: resolvedImageDescription,
      name: resolvedImageCaption,
      representativeOfPage: true,
      license: `${BASE_URL}/terms`,
      acquireLicensePage: `${BASE_URL}/terms`,
      copyrightHolder: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
      creator: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
      contentLocation: {
        '@type': 'Place',
        name: 'Zhongshan, Guangdong, China',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Zhongshan',
          addressRegion: 'Guangdong',
          addressCountry: 'CN',
        },
      },
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
      price: getProductPrice(category, sku),
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
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: getProductPrice(category, sku),
        priceCurrency: 'USD',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'H87',
        },
      },
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: b2bInfo?.moq ? parseInt(b2bInfo.moq) : 100,
        unitCode: 'H87',
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
        addressLocality: 'Zhongshan',
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
    logo: r2MediaUrl('/logo.png'),
    image: DEFAULT_SOCIAL_IMAGE,
    telephone: '+86-155-7811-9543',
    email: 'jack@houseplus-ch.com',
    priceRange: '$$$',
    foundingDate: '2010',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 500 },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zhongshan',
      addressRegion: 'Guangdong',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.5170',
      longitude: '113.3925',
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

export interface ArticleSchemaOptions {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  authorImage?: string;
  url?: string;
}

// Article / BlogPosting Schema - 统一品牌实体为 HousePlus Group，邮箱 jack@houseplus-ch.com
export function generateArticleSchema(options: ArticleSchemaOptions) {
  const {
    headline,
    description,
    image,
    datePublished,
    dateModified,
    authorName = 'Jack Hu',
    authorUrl = `${BASE_URL}/en/author/jack-hu`,
    authorImage = 'https://images.houseplus-ch.com/media/houseplus-group-logo/',
    url = BASE_URL,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    headline,
    description,
    image: image || DEFAULT_SOCIAL_IMAGE,
    imageObject: (() => {
      const articleImage = image || DEFAULT_SOCIAL_IMAGE;
      const details = getR2MediaDetails(articleImage);
      const dimensions = r2ImageDimensions(articleImage, { width: 1200, height: 630 });
      return {
      '@type': 'ImageObject',
      '@id': `${articleImage}#image`,
      url: articleImage,
      contentUrl: articleImage,
      width: dimensions.width,
      height: dimensions.height,
      caption: details?.title || headline,
      description: details?.description || details?.alt || description,
      name: details?.title || headline,
      representativeOfPage: true,
      license: `${BASE_URL}/terms`,
      acquireLicensePage: `${BASE_URL}/terms`,
      copyrightHolder: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
      creator: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
      contentLocation: {
        '@type': 'Place',
        name: 'Zhongshan, Guangdong, China',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Zhongshan',
          addressRegion: 'Guangdong',
          addressCountry: 'CN',
        },
      },
      };
    })(),
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    author: {
      '@type': 'Person',
      '@id': authorUrl,
      name: authorName,
      url: authorUrl,
      image: authorImage,
      jobTitle: 'Founder & Editorial Lead',
      email: 'jack@houseplus-ch.com',
      worksFor: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'HousePlus Group',
        url: BASE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'HousePlus Group',
      logo: {
        '@type': 'ImageObject',
        url: r2MediaUrl('/logo.png'),
        contentUrl: r2MediaUrl('/logo.png'),
        width: 512,
        height: 512,
        license: `${BASE_URL}/terms`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleBody: description,
  };
}

export interface PersonSchemaOptions {
  name: string;
  jobTitle?: string;
  worksFor?: string;
  email?: string;
  image?: string;
  description?: string;
  url?: string;
  sameAs?: string[];
}

// Person Schema - 作者实体，统一 worksFor 指向 HousePlus Group Organization
export function generatePersonSchema(options: PersonSchemaOptions) {
  const {
    name,
    jobTitle,
    worksFor = 'HousePlus Group',
    email = 'jack@houseplus-ch.com',
    image,
    description,
    url,
    sameAs,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': url || `${BASE_URL}/en/author/jack-hu`,
    name,
    jobTitle: jobTitle || '',
    image: image || '',
    description: description || '',
    url: url || `${BASE_URL}/en/author/jack-hu`,
    email,
    worksFor: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: worksFor,
      url: BASE_URL,
    },
    sameAs: sameAs || [],
  };
}
