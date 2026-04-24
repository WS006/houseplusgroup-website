/**
 * GEO-Specific Keywords & Trade Terms for Foreign Trade Optimization
 * Targets: Africa, Southeast Asia, Europe
 */

export interface GeoRegion {
  name: string;
  code: string;
  countries: string[];
  keywords: string[];
  tradeTerms: string[];
  shippingPorts: string[];
  leadTime: string;
  moqAdjustment?: string;
  currencies: string[];
  languages: string[];
}

export const geoRegions: Record<string, GeoRegion> = {
  africa: {
    name: 'Africa',
    code: 'AF',
    countries: [
      'Nigeria',
      'Kenya',
      'South Africa',
      'Egypt',
      'Ghana',
      'Ethiopia',
      'Tanzania',
      'Uganda',
      'Morocco',
      'Ivory Coast',
    ],
    keywords: [
      'wholesale solar system Africa',
      'bulk home appliances supplier Nigeria',
      'OEM ODM electronics manufacturer Africa',
      'solar energy wholesale Africa',
      'portable power station Africa',
      'home appliance distributor Africa',
      '3C electronics wholesale Africa',
      'solar panel supplier Africa',
      'bulk electronics importer Africa',
      'Africa wholesale manufacturer',
      'African solar distributor',
      'Africa home appliances wholesale',
    ],
    tradeTerms: [
      'FOB (Free on Board) - Shenzhen/Guangzhou',
      'CIF (Cost, Insurance and Freight)',
      'CFR (Cost and Freight)',
      'DDP (Delivered Duty Paid)',
      'Payment: 50% T/T deposit, 50% before shipment',
      'L/C (Letter of Credit) accepted',
      'Alibaba Trade Assurance available',
    ],
    shippingPorts: [
      'Shenzhen Port',
      'Guangzhou Port',
      'Shanghai Port',
      'Port Said (Egypt)',
      'Port of Lagos (Nigeria)',
      'Port of Durban (South Africa)',
    ],
    leadTime: '20-35 days (Standard), 15-20 days (Expedited)',
    moqAdjustment: 'Flexible MOQ for bulk orders (500+ units)',
    currencies: ['USD', 'EUR', 'NGN', 'ZAR', 'GHS'],
    languages: ['English', 'French', 'Swahili'],
  },

  southeast_asia: {
    name: 'Southeast Asia',
    code: 'SEA',
    countries: [
      'Vietnam',
      'Thailand',
      'Indonesia',
      'Philippines',
      'Malaysia',
      'Singapore',
      'Cambodia',
      'Laos',
      'Myanmar',
      'Brunei',
    ],
    keywords: [
      'wholesale solar system Southeast Asia',
      'bulk home appliances supplier Vietnam',
      'OEM ODM electronics manufacturer Thailand',
      'solar energy wholesale Asia',
      'portable power station distributor',
      'home appliance wholesale Thailand',
      '3C electronics wholesale Vietnam',
      'solar panel supplier Southeast Asia',
      'bulk electronics importer Asia',
      'Asia wholesale manufacturer',
      'Southeast Asia solar distributor',
      'Vietnam home appliances wholesale',
      'Thailand electronics supplier',
    ],
    tradeTerms: [
      'FOB (Free on Board) - Shenzhen/Guangzhou',
      'CIF (Cost, Insurance and Freight)',
      'CFR (Cost and Freight)',
      'DDP (Delivered Duty Paid)',
      'Payment: 30% T/T deposit, 70% before shipment',
      'L/C (Letter of Credit) accepted',
      'Alibaba Trade Assurance available',
      'Flexible payment terms for established partners',
    ],
    shippingPorts: [
      'Shenzhen Port',
      'Guangzhou Port',
      'Shanghai Port',
      'Port of Ho Chi Minh (Vietnam)',
      'Port of Bangkok (Thailand)',
      'Port of Jakarta (Indonesia)',
      'Port of Manila (Philippines)',
    ],
    leadTime: '15-25 days (Standard), 10-15 days (Expedited)',
    moqAdjustment: 'Flexible MOQ for bulk orders (300+ units)',
    currencies: ['USD', 'EUR', 'VND', 'THB', 'IDR', 'PHP', 'SGD'],
    languages: ['English', 'Vietnamese', 'Thai'],
  },

  europe: {
    name: 'Europe',
    code: 'EU',
    countries: [
      'Germany',
      'France',
      'United Kingdom',
      'Italy',
      'Spain',
      'Netherlands',
      'Belgium',
      'Poland',
      'Sweden',
      'Denmark',
      'Portugal',
      'Greece',
    ],
    keywords: [
      'wholesale solar system Europe',
      'bulk home appliances supplier Germany',
      'OEM ODM electronics manufacturer Europe',
      'solar energy wholesale Europe',
      'portable power station Europe',
      'home appliance distributor Europe',
      '3C electronics wholesale Europe',
      'solar panel supplier Europe',
      'bulk electronics importer Europe',
      'Europe wholesale manufacturer',
      'European solar distributor',
      'Europe home appliances wholesale',
      'CE certified solar systems',
      'EU compliant electronics',
    ],
    tradeTerms: [
      'FOB (Free on Board) - Shenzhen/Guangzhou',
      'CIF (Cost, Insurance and Freight)',
      'CFR (Cost and Freight)',
      'DDP (Delivered Duty Paid)',
      'Payment: 30% T/T deposit, 70% before shipment',
      'L/C (Letter of Credit) accepted',
      'Alibaba Trade Assurance available',
      'CE certification included',
      'RoHS compliance guaranteed',
      'EU import duty assistance available',
    ],
    shippingPorts: [
      'Shenzhen Port',
      'Guangzhou Port',
      'Shanghai Port',
      'Port of Hamburg (Germany)',
      'Port of Rotterdam (Netherlands)',
      'Port of Antwerp (Belgium)',
      'Port of Barcelona (Spain)',
    ],
    leadTime: '25-35 days (Standard), 18-25 days (Expedited)',
    moqAdjustment: 'Flexible MOQ for bulk orders (200+ units)',
    currencies: ['USD', 'EUR', 'GBP'],
    languages: ['English', 'German', 'French', 'Spanish'],
  },
};

// Export country-specific information
export const countryInfo: Record<string, any> = {
  // Africa
  Nigeria: {
    region: 'Africa',
    timezone: 'GMT+1',
    phone: '+234-907-808-0738',
    whatsapp: '+2349078080738',
    language: 'English',
    currency: 'NGN',
    mainPorts: ['Port of Lagos', 'Port of Calabar'],
    tradingHubs: ['Lagos', 'Abuja'],
  },
  'South Africa': {
    region: 'Africa',
    timezone: 'GMT+2',
    language: 'English',
    currency: 'ZAR',
    mainPorts: ['Port of Durban', 'Port of Cape Town'],
    tradingHubs: ['Johannesburg', 'Cape Town'],
  },
  Kenya: {
    region: 'Africa',
    timezone: 'GMT+3',
    language: 'English, Swahili',
    currency: 'KES',
    mainPorts: ['Port of Mombasa'],
    tradingHubs: ['Nairobi', 'Mombasa'],
  },

  // Southeast Asia
  Vietnam: {
    region: 'Southeast Asia',
    timezone: 'GMT+7',
    language: 'Vietnamese, English',
    currency: 'VND',
    mainPorts: ['Port of Ho Chi Minh', 'Port of Haiphong'],
    tradingHubs: ['Ho Chi Minh City', 'Hanoi'],
  },
  Thailand: {
    region: 'Southeast Asia',
    timezone: 'GMT+7',
    language: 'Thai, English',
    currency: 'THB',
    mainPorts: ['Port of Bangkok', 'Port of Laem Chabang'],
    tradingHubs: ['Bangkok', 'Chiang Mai'],
  },
  Indonesia: {
    region: 'Southeast Asia',
    timezone: 'GMT+7',
    language: 'Indonesian, English',
    currency: 'IDR',
    mainPorts: ['Port of Jakarta', 'Port of Surabaya'],
    tradingHubs: ['Jakarta', 'Surabaya'],
  },
  Philippines: {
    region: 'Southeast Asia',
    timezone: 'GMT+8',
    language: 'Filipino, English',
    currency: 'PHP',
    mainPorts: ['Port of Manila', 'Port of Cebu'],
    tradingHubs: ['Manila', 'Cebu'],
  },

  // Europe
  Germany: {
    region: 'Europe',
    timezone: 'GMT+1',
    language: 'German, English',
    currency: 'EUR',
    mainPorts: ['Port of Hamburg', 'Port of Bremen'],
    tradingHubs: ['Berlin', 'Hamburg', 'Munich'],
  },
  France: {
    region: 'Europe',
    timezone: 'GMT+1',
    language: 'French, English',
    currency: 'EUR',
    mainPorts: ['Port of Le Havre', 'Port of Marseille'],
    tradingHubs: ['Paris', 'Lyon', 'Marseille'],
  },
  'United Kingdom': {
    region: 'Europe',
    timezone: 'GMT+0',
    language: 'English',
    currency: 'GBP',
    mainPorts: ['Port of London', 'Port of Liverpool'],
    tradingHubs: ['London', 'Manchester', 'Birmingham'],
  },
  Netherlands: {
    region: 'Europe',
    timezone: 'GMT+1',
    language: 'Dutch, English',
    currency: 'EUR',
    mainPorts: ['Port of Rotterdam', 'Port of Amsterdam'],
    tradingHubs: ['Amsterdam', 'Rotterdam'],
  },
  Spain: {
    region: 'Europe',
    timezone: 'GMT+1',
    language: 'Spanish, English',
    currency: 'EUR',
    mainPorts: ['Port of Barcelona', 'Port of Valencia'],
    tradingHubs: ['Madrid', 'Barcelona', 'Valencia'],
  },
};

// Helper functions
export function getRegionKeywords(region: string): string[] {
  return geoRegions[region]?.keywords || [];
}

export function getRegionTradeTerms(region: string): string[] {
  return geoRegions[region]?.tradeTerms || [];
}

export function getRegionPorts(region: string): string[] {
  return geoRegions[region]?.shippingPorts || [];
}

export function getCountryInfo(country: string) {
  return countryInfo[country] || null;
}

export function getRegionByCountry(country: string): string | null {
  for (const [region, data] of Object.entries(geoRegions)) {
    if (data.countries.includes(country)) {
      return region;
    }
  }
  return null;
}

// Generate SEO-optimized text for regions
export function generateRegionSeoText(region: string): string {
  const regionData = geoRegions[region];
  if (!regionData) return '';

  const countries = regionData.countries.slice(0, 5).join(', ');
  const keywords = regionData.keywords.slice(0, 3).join(', ');

  return `HousePlus is a leading ${keywords} serving wholesale buyers across ${regionData.name} including ${countries} and more. With MOQ starting from ${regionData.moqAdjustment}, we offer flexible trade terms including FOB, CIF, and L/C payment options. Our standard lead time is ${regionData.leadTime}.`;
}
