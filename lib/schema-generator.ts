import { getR2MediaDetails, r2ImageDimensions } from './r2-media-details';
import { r2MediaUrl } from './r2-media-map';

const BASE_URL = 'https://www.houseplus-ch.com';
const DEFAULT_SOCIAL_IMAGE = 'https://images.houseplus-ch.com/media/houseplus-carousel-houseplus-solar-hero/';
const OFFICIAL_HORIZONTAL_LOGO = 'https://images.houseplus-ch.com/media/houseplus-horizontal-logo/';
const VERIFIED_ORGANIZATION_PROFILES = [
  'https://www.facebook.com/houseplusgroup',
  'https://www.linkedin.com/company/houseplus-group',
  'https://www.youtube.com/@houseplusgroup',
];

// These declarations apply only to approved HousePlus-owned or HousePlus-licensed
// R2 assets published through this website. Third-party assets must carry their
// verified per-asset creator, credit, copyright, and license information instead.
const HOUSEPLUS_IMAGE_RIGHTS = {
  license: `${BASE_URL}/terms`,
  acquireLicensePage: `${BASE_URL}/en/contact`,
  creditText: 'HousePlus Group',
  copyrightNotice: '© HousePlus Group. All rights reserved.',
  copyrightHolder: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
  creator: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
};

function houseplusImageReference(image: string) {
  return {
    '@type': 'ImageObject',
    '@id': `${image}#image`,
    url: image,
    contentUrl: image,
    ...HOUSEPLUS_IMAGE_RIGHTS,
  };
}

interface SchemaOptions {
  title: string;
  description: string;
  url: string;
  lang: string;
  type: string;
}

export function generateOrganizationSchema(options: SchemaOptions) {
  const { title, description, lang } = options;
  const logoImage = {
    '@type': 'ImageObject',
    '@id': `${OFFICIAL_HORIZONTAL_LOGO}#logo`,
    url: OFFICIAL_HORIZONTAL_LOGO,
    contentUrl: OFFICIAL_HORIZONTAL_LOGO,
    width: 611,
    height: 246,
    caption: 'Official HousePlus Group horizontal logo',
    representativeOfPage: true,
    ...HOUSEPLUS_IMAGE_RIGHTS,
  };
  const primaryImage = houseplusImageReference(DEFAULT_SOCIAL_IMAGE);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: title,
    alternateName: 'HousePlus Group',
    description,
    url: BASE_URL,
    inLanguage: lang,
    foundingDate: '2010',
    logo: logoImage,
    image: primaryImage,
    brand: {
      '@type': 'Brand',
      '@id': `${BASE_URL}/#brand`,
      name: 'HousePlus',
      alternateName: 'HousePlus Group',
      url: BASE_URL,
      logo: { '@id': logoImage['@id'] },
    },
    foundingLocation: {
      '@type': 'Place',
      name: 'Zhongshan, Guangdong, China',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zhongshan',
        addressRegion: 'Guangdong',
        addressCountry: 'CN',
      },
    },
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
        '@id': `${BASE_URL}/#sales-contact`,
        telephone: '+86-155-7811-9543',
        email: 'jack@houseplus-ch.com',
        contactType: 'sales',
        url: `${BASE_URL}/en/contact/`,
        availableLanguage: ['English', 'Chinese'],
        areaServed: ['Worldwide', 'NG', 'DE', 'FR', 'AE'],
        hoursAvailable: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '10:00',
            closes: '16:00',
          },
        ],
      },
    ],
    sameAs: VERIFIED_ORGANIZATION_PROFILES,
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
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'HousePlus Manufacturing Catalog',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'Solar Energy Systems' },
        { '@type': 'OfferCatalog', name: 'Home Appliances' },
        { '@type': 'OfferCatalog', name: '3C Electronics' },
      ],
    },
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

export function generateFAQSchema(faqItems: FAQItem[], lang: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
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
    ...HOUSEPLUS_IMAGE_RIGHTS,
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
  retailOffer?: {
    price: string;
    currency: string;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder' | 'BackOrder';
    purchaseUrl: string;
    shippingPolicyUrl?: string;
    returnPolicyUrl?: string;
  };
  category?: string;
  imageCaption?: string;
  imageDescription?: string;
  imageWidth?: number;
  imageHeight?: number;
  b2bInfo?: B2BSchemaInfo;
  lang?: string;
  contactUrl?: string;
  contactActionName?: string;
  contactActionDescription?: string;
  specifications?: Array<{ name: string; value: string }>;
}

export interface ProductHowToSchemaOptions {
  name: string;
  description: string;
  image: string;
  url: string;
  lang: string;
  steps: Array<{ name: string; text: string }>;
}


export function generateProductSchema(options: ProductSchemaOptions) {
  const {
    name,
    description,
    image,
    sku,
    brand = 'HousePlus',
    url,
    retailOffer,
    category,
    imageCaption,
    imageDescription,
    imageWidth = 900,
    imageHeight = 675,
    b2bInfo,
    lang = 'en',
    contactUrl = `${BASE_URL}/en/contact`,
    contactActionName = 'Request a wholesale quotation',
    contactActionDescription = 'Contact HousePlus Group to request product documentation and a wholesale quotation.',
    specifications = [],
  } = options;

  const mediaDetails = getR2MediaDetails(image);
  const imageDimensions = r2ImageDimensions(image, { width: imageWidth, height: imageHeight });
  const resolvedImageCaption = imageCaption || mediaDetails?.title || name;
  const resolvedImageDescription = imageDescription || mediaDetails?.description || mediaDetails?.alt || description;
  // Technical specifications are published only when they are visibly shown
  // on the product page. B2B commercial terms remain quote-confirmed.
  const publishB2BProperties = false;
  const additionalProperty: Array<Record<string, string>> = specifications
    .filter((spec) => spec.name.trim().length > 0 && spec.value.trim().length > 0)
    .map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.name,
      value: spec.value,
    }));
  if (publishB2BProperties && b2bInfo?.moq) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'MOQ (Minimum Order Quantity)',
      value: b2bInfo.moq,
    });
  }
  if (publishB2BProperties && b2bInfo?.leadTime) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Lead Time',
      value: b2bInfo.leadTime,
    });
  }
  if (publishB2BProperties && b2bInfo?.warranty) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Warranty',
      value: b2bInfo.warranty,
    });
  }
  if (publishB2BProperties && b2bInfo?.certifications && b2bInfo.certifications.length > 0) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Certifications',
      value: b2bInfo.certifications.join(', '),
    });
  }
  if (publishB2BProperties && b2bInfo?.oemOdm) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'OEM/ODM Available',
      value: 'Yes',
    });
  }
  if (publishB2BProperties && b2bInfo?.factorySize) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Factory Size',
      value: b2bInfo.factorySize,
    });
  }
  if (publishB2BProperties && b2bInfo?.foundedYear) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Founded Year',
      value: String(b2bInfo.foundedYear),
    });
  }
  if (publishB2BProperties && b2bInfo?.exportCountries) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Export Countries',
      value: `${b2bInfo.exportCountries}+ countries`,
    });
  }
  if (publishB2BProperties && b2bInfo?.wholesaleClients) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Wholesale Clients',
      value: `${b2bInfo.wholesaleClients}+`,
    });
  }

  const productImageObject = {
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
    inLanguage: lang,
    ...HOUSEPLUS_IMAGE_RIGHTS,
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

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name,
    description,
    inLanguage: lang,
    image: [productImageObject],
    sku,
    mpn: sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    url,
    category,
    manufacturer: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'HousePlus Group',
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zhongshan',
        addressRegion: 'Guangdong',
        addressCountry: 'CN',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
      inLanguage: lang,
      primaryImageOfPage: { '@id': productImageObject['@id'] },
    },
    isRelatedTo: { '@id': `${BASE_URL}/#organization` },
    ...(retailOffer && {
      offers: {
        '@type': 'Offer',
        url: retailOffer.purchaseUrl,
        price: retailOffer.price,
        priceCurrency: retailOffer.currency,
        availability: `https://schema.org/${retailOffer.availability}`,
        itemCondition: 'https://schema.org/NewCondition',
        ...(retailOffer.returnPolicyUrl && {
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            '@id': retailOffer.returnPolicyUrl,
            url: retailOffer.returnPolicyUrl,
          },
        }),
      },
    }),
    potentialAction: retailOffer ? {
      '@type': 'BuyAction',
      name: 'Buy now',
      target: retailOffer.purchaseUrl,
      provider: { '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
    } : {
      '@type': 'ContactAction',
      name: contactActionName,
      target: contactUrl,
      description: contactActionDescription,
      provider: { '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
    },
    ...(additionalProperty.length > 0 && { additionalProperty }),
  };
}

/**
 * Generates a HowTo only for the visible B2B/OEM quotation workflow shown on
 * product pages. It does not make unverified installation or operation claims.
 */
export function generateProductHowToSchema(options: ProductHowToSchemaOptions) {
  const { name, description, image, url, lang, steps } = options;
  const dimensions = r2ImageDimensions(image, { width: 900, height: 675 });
  const productImage = {
    '@type': 'ImageObject',
    '@id': `${image}#image`,
    url: image,
    contentUrl: image,
    width: dimensions.width,
    height: dimensions.height,
    ...HOUSEPLUS_IMAGE_RIGHTS,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#b2b-oem-sourcing-howto`,
    name,
    description,
    inLanguage: lang,
    image: productImage,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url, inLanguage: lang },
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${url}#b2b-oem-sourcing-howto`,
    })),
    provider: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'HousePlus Group',
    },
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
    logo: houseplusImageReference(OFFICIAL_HORIZONTAL_LOGO),
    image: houseplusImageReference(DEFAULT_SOCIAL_IMAGE),
    telephone: '+86-155-7811-9543',
    email: 'jack@houseplus-ch.com',
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
  items: ItemListSchemaItem[],
  lang: string = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    name,
    description,
    inLanguage: lang,
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

export interface CollectionPageSchemaOptions {
  name: string;
  description: string;
  url: string;
  lang: string;
  image?: string;
  itemListId?: string;
  categories?: string[];
}

export function generateCollectionPageSchema(options: CollectionPageSchemaOptions) {
  const { name, description, url, lang, image = DEFAULT_SOCIAL_IMAGE, itemListId = `${url}#itemlist`, categories = [] } = options;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
    mainEntity: { '@id': itemListId },
    primaryImageOfPage: houseplusImageReference(image),
    ...(categories.length > 0 && { about: categories.map((category) => ({ '@type': 'Thing', name: category })) }),
  };
}

export interface WebPageSchemaOptions {
  name: string;
  description: string;
  url: string;
  lang: string;
  image?: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'Service';
  about?: string[];
}

export function generateWebPageSchema(options: WebPageSchemaOptions) {
  const { name, description, url, lang, image = DEFAULT_SOCIAL_IMAGE, type = 'WebPage', about = [] } = options;
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
    primaryImageOfPage: houseplusImageReference(image),
    ...(about.length > 0 && { about: about.map((topic) => ({ '@type': 'Thing', name: topic })) }),
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
  const inferredLanguage = (() => {
    try { return new URL(url).pathname.split('/').filter(Boolean)[0] || 'en'; } catch { return 'en'; }
  })();
  const articleImage = image || DEFAULT_SOCIAL_IMAGE;
  const articleImageDetails = getR2MediaDetails(articleImage);
  const articleImageDimensions = r2ImageDimensions(articleImage, { width: 1200, height: 630 });
  const articleImageObject = {
    '@type': 'ImageObject',
    '@id': `${articleImage}#image`,
    url: articleImage,
    contentUrl: articleImage,
    width: articleImageDimensions.width,
    height: articleImageDimensions.height,
    caption: articleImageDetails?.title || headline,
    description: articleImageDetails?.description || articleImageDetails?.alt || description,
    name: articleImageDetails?.title || headline,
    representativeOfPage: true,
    ...HOUSEPLUS_IMAGE_RIGHTS,
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

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline,
    description,
    image: [articleImageObject],
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    inLanguage: inferredLanguage,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
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
        '@id': `${OFFICIAL_HORIZONTAL_LOGO}#logo`,
        url: OFFICIAL_HORIZONTAL_LOGO,
        contentUrl: OFFICIAL_HORIZONTAL_LOGO,
        width: 611,
        height: 246,
        caption: 'Official HousePlus Group horizontal logo',
        ...HOUSEPLUS_IMAGE_RIGHTS,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      inLanguage: inferredLanguage,
      primaryImageOfPage: { '@id': articleImageObject['@id'] },
    },
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
