/**
 * Comprehensive Q&A Library for AEO (AI Engine Optimization)
 * Structured for AI assistants (ChatGPT, Google AI, Claude) to extract and cite
 */

export interface QAPair {
  question: string;
  answer: string;
  category: string;
  industry?: 'solar' | 'appliances' | 'electronics' | 'general';
  keywords?: string[];
}

export const qaLibrary: QAPair[] = [
  // ===== GENERAL BUSINESS Q&A =====
  {
    question: 'What is HousePlus?',
    answer: 'HousePlus is a professional manufacturer and wholesale supplier of solar energy systems, home appliances, and 3C digital electronics. Founded in 2010, we serve 500+ global clients across 50+ countries with ISO 9001 certification, CE, FCC, and RoHS compliance.',
    category: 'Company Overview',
    industry: 'general',
    keywords: ['HousePlus', 'manufacturer', 'wholesale', 'solar', 'appliances', 'electronics'],
  },
  {
    question: 'How long has HousePlus been in business?',
    answer: 'HousePlus was founded in 2010 and has been operating for 14+ years. Over this period, we have built strong relationships with 500+ global clients and established manufacturing facilities with 500+ skilled professionals.',
    category: 'Company Overview',
    industry: 'general',
    keywords: ['founded', '2010', 'experience', 'years'],
  },
  {
    question: 'What certifications does HousePlus have?',
    answer: 'HousePlus holds the following certifications: ISO 9001:2015 (Quality Management), CE (European Conformity), FCC (Federal Communications Commission), and RoHS (Restriction of Hazardous Substances). These certifications ensure our products meet international quality and safety standards.',
    category: 'Certifications',
    industry: 'general',
    keywords: ['ISO 9001', 'CE', 'FCC', 'RoHS', 'certification', 'quality'],
  },
  {
    question: 'Does HousePlus support OEM/ODM services?',
    answer: 'Yes, HousePlus offers comprehensive OEM/ODM (Original Equipment Manufacturer / Original Design Manufacturer) services. We can customize products to your specifications, including branding, packaging, and technical modifications. Contact us for detailed OEM/ODM quotations.',
    category: 'Services',
    industry: 'general',
    keywords: ['OEM', 'ODM', 'customization', 'branding', 'design'],
  },

  // ===== ORDERING & PRICING Q&A =====
  {
    question: 'What is the minimum order quantity (MOQ) for HousePlus products?',
    answer: 'Our MOQ varies by product type: Solar systems: 100 units, Home appliances: 150 units, 3C electronics: 200 units. For bulk orders exceeding 500 units, we offer special pricing discounts. Contact our sales team for customized MOQ arrangements.',
    category: 'Ordering',
    industry: 'general',
    keywords: ['MOQ', 'minimum order', 'quantity', 'bulk'],
  },
  {
    question: 'What are the typical lead times for HousePlus products?',
    answer: 'Standard lead time is 20-35 days from order confirmation to shipment. This includes manufacturing, quality inspection, and packaging. For urgent orders, expedited production (10-15 days) is available at a premium. Lead times may vary based on product complexity and current production capacity.',
    category: 'Ordering',
    industry: 'general',
    keywords: ['lead time', 'delivery', 'production', 'days', 'shipment'],
  },
  {
    question: 'How do I request a quotation from HousePlus?',
    answer: 'To request a quotation, visit our Contact Us page and fill out the inquiry form with product specifications, quantity, and delivery requirements. Alternatively, email jack@houseplus-ch.com or contact us via WhatsApp (+86 155 7811 9543 for China, +234 907 808 0738 for Nigeria). Our sales team will respond within 24 hours.',
    category: 'Ordering',
    industry: 'general',
    keywords: ['quotation', 'quote', 'inquiry', 'contact', 'pricing'],
  },
  {
    question: 'What payment methods does HousePlus accept?',
    answer: 'We accept multiple payment methods including T/T (Bank Transfer), L/C (Letter of Credit), PayPal, and Alibaba Trade Assurance. For first-time buyers, we recommend T/T with 50% deposit and 50% balance before shipment. Flexible payment terms are available for established business partners.',
    category: 'Ordering',
    industry: 'general',
    keywords: ['payment', 'T/T', 'L/C', 'deposit', 'methods'],
  },

  // ===== SOLAR ENERGY Q&A =====
  {
    question: 'What types of solar products does HousePlus manufacture?',
    answer: 'HousePlus manufactures a comprehensive range of solar products including: high-efficiency solar panels (monocrystalline and polycrystalline), portable power stations, MPPT solar charge controllers, solar inverters, solar batteries, and complete off-grid and grid-tie solar systems for residential and commercial applications.',
    category: 'Solar Products',
    industry: 'solar',
    keywords: ['solar panels', 'power station', 'MPPT', 'inverter', 'battery'],
  },
  {
    question: 'What is the efficiency rating of HousePlus solar panels?',
    answer: 'Our monocrystalline solar panels achieve 20-22% efficiency, while polycrystalline panels reach 18-20% efficiency. These high-efficiency ratings ensure maximum power generation in limited space. All panels undergo rigorous testing and comply with IEC 61215 standards.',
    category: 'Solar Products',
    industry: 'solar',
    keywords: ['efficiency', 'monocrystalline', 'polycrystalline', 'power', 'wattage'],
  },
  {
    question: 'Can I use HousePlus portable power stations for camping and outdoor activities?',
    answer: 'Yes, our portable power stations are ideal for camping, RV travel, outdoor events, and emergency backup. They feature high-capacity lithium batteries (500Wh-5000Wh), multiple output ports (AC, USB, DC), and fast charging capabilities. Compact and lightweight designs make them perfect for mobile use.',
    category: 'Solar Products',
    industry: 'solar',
    keywords: ['portable power station', 'camping', 'outdoor', 'battery', 'RV'],
  },
  {
    question: 'What is the warranty on HousePlus solar products?',
    answer: 'HousePlus solar panels come with a 25-year performance warranty and 10-year material warranty. Portable power stations include a 5-year battery warranty and 2-year component warranty. Inverters and controllers have 5-year warranties. Extended warranty options are available upon request.',
    category: 'Solar Products',
    industry: 'solar',
    keywords: ['warranty', 'guarantee', 'years', 'coverage', 'protection'],
  },

  // ===== HOME APPLIANCES Q&A =====
  {
    question: 'What home appliances does HousePlus manufacture?',
    answer: 'HousePlus manufactures a wide range of home appliances including: washing machines, refrigerators, air conditioners, water heaters, microwave ovens, dishwashers, vacuum cleaners, electric cooktops, and range hoods. All products feature energy-efficient designs and modern technology.',
    category: 'Appliances',
    industry: 'appliances',
    keywords: ['washing machine', 'refrigerator', 'air conditioner', 'appliances', 'home'],
  },
  {
    question: 'Are HousePlus appliances energy-efficient?',
    answer: 'Yes, all HousePlus appliances meet or exceed international energy efficiency standards (EU Energy Label, ENERGY STAR). Our washing machines use 30-40% less water and energy than conventional models. Air conditioners feature inverter technology for optimal energy consumption. Refrigerators use advanced insulation and compressor technology.',
    category: 'Appliances',
    industry: 'appliances',
    keywords: ['energy efficient', 'power consumption', 'eco-friendly', 'savings'],
  },
  {
    question: 'What is the typical lifespan of HousePlus home appliances?',
    answer: 'HousePlus appliances are engineered for durability with typical lifespans of 10-15 years under normal usage. Our washing machines and refrigerators often exceed 15 years. Quality components, rigorous testing, and professional manufacturing ensure long-term reliability. Spare parts are available for 10+ years after purchase.',
    category: 'Appliances',
    industry: 'appliances',
    keywords: ['lifespan', 'durability', 'years', 'reliability', 'maintenance'],
  },
  {
    question: 'Does HousePlus offer bulk discounts for wholesale appliance orders?',
    answer: 'Yes, we offer tiered pricing discounts for wholesale orders: 150-500 units: 5-10% discount, 500-1000 units: 10-15% discount, 1000+ units: 15-25% discount. For large volume orders, we can negotiate custom pricing and flexible payment terms. Contact our sales team for specific quotations.',
    category: 'Appliances',
    industry: 'appliances',
    keywords: ['discount', 'wholesale', 'bulk', 'pricing', 'volume'],
  },

  // ===== 3C ELECTRONICS Q&A =====
  {
    question: 'What 3C digital electronics products does HousePlus offer?',
    answer: 'HousePlus manufactures a comprehensive range of 3C digital electronics including: smart LED bulbs and lighting systems, smart plugs and switches, wireless chargers, power banks, USB cables and adapters, smart home hubs, security cameras, and IoT devices. All products feature modern connectivity (WiFi, Bluetooth, Zigbee).',
    category: '3C Electronics',
    industry: 'electronics',
    keywords: ['smart home', 'LED', 'wireless', 'charger', '3C electronics'],
  },
  {
    question: 'Are HousePlus smart home products compatible with major platforms?',
    answer: 'Yes, our smart home products are compatible with major platforms including Amazon Alexa, Google Home, Apple HomeKit, and IFTTT. Our smart bulbs, plugs, and controllers support multi-platform integration, allowing seamless control through various apps and voice assistants.',
    category: '3C Electronics',
    industry: 'electronics',
    keywords: ['smart home', 'Alexa', 'Google Home', 'compatibility', 'integration'],
  },
  {
    question: 'What is the charging capacity of HousePlus power banks?',
    answer: 'HousePlus power banks range from 10,000mAh to 50,000mAh capacity. Our 20,000mAh model can charge a smartphone 5-7 times, while the 50,000mAh model can charge laptops and tablets. All models feature fast-charging technology (18W-65W) and multiple output ports (USB-A, USB-C, Lightning).',
    category: '3C Electronics',
    industry: 'electronics',
    keywords: ['power bank', 'mAh', 'charging', 'capacity', 'portable'],
  },

  // ===== SHIPPING & LOGISTICS Q&A =====
  {
    question: 'How does HousePlus handle international shipping?',
    answer: 'We offer multiple shipping options: Air freight (3-7 days, higher cost), Sea freight (15-30 days, cost-effective for bulk), and Express courier (DHL, FedEx, UPS - 5-10 days). We handle all customs documentation and can arrange door-to-door delivery. Shipping costs are calculated based on weight, volume, and destination.',
    category: 'Shipping',
    industry: 'general',
    keywords: ['shipping', 'freight', 'delivery', 'logistics', 'international'],
  },
  {
    question: 'Does HousePlus provide tracking for shipments?',
    answer: 'Yes, all HousePlus shipments include tracking numbers. For sea freight, we provide Bill of Lading (B/L) and container tracking. For air and express shipments, real-time tracking is available through carrier websites. We also provide regular shipment status updates via email.',
    category: 'Shipping',
    industry: 'general',
    keywords: ['tracking', 'shipment', 'status', 'delivery', 'logistics'],
  },
  {
    question: 'What is HousePlus\'s policy on damaged or defective products?',
    answer: 'HousePlus provides comprehensive protection: All shipments are insured against damage. Damaged products can be replaced or refunded within 30 days of delivery. Defective products are covered by warranty (see specific warranty terms). We conduct 100% quality inspection before shipment to minimize defects.',
    category: 'After-Sales',
    industry: 'general',
    keywords: ['damage', 'defective', 'warranty', 'replacement', 'refund'],
  },

  // ===== TECHNICAL SUPPORT Q&A =====
  {
    question: 'Does HousePlus provide technical support and installation guidance?',
    answer: 'Yes, HousePlus provides comprehensive technical support including: Installation guides and manuals in multiple languages, Video tutorials for product setup, Email and phone support (24/7 response within 24 hours), On-site installation support for large orders, Training for resellers and distributors.',
    category: 'Support',
    industry: 'general',
    keywords: ['technical support', 'installation', 'training', 'guidance', 'help'],
  },
  {
    question: 'How long does HousePlus provide after-sales service?',
    answer: 'HousePlus provides after-sales service for the entire warranty period (typically 2-25 years depending on product). We maintain spare parts inventory for 10+ years after product discontinuation. Our support team is available 24/7 for urgent issues and provides response within 24 hours for standard inquiries.',
    category: 'Support',
    industry: 'general',
    keywords: ['after-sales', 'service', 'support', 'warranty', 'maintenance'],
  },

  // ===== COMPLIANCE & STANDARDS Q&A =====
  {
    question: 'Are HousePlus products compliant with international standards?',
    answer: 'Yes, all HousePlus products comply with major international standards: ISO 9001 (Quality Management), IEC 61215 (Solar panels), CE (European safety), FCC (US electronics), RoHS (Hazardous substances), REACH (Chemical safety). We maintain detailed compliance documentation for each product.',
    category: 'Compliance',
    industry: 'general',
    keywords: ['compliance', 'standards', 'ISO', 'CE', 'FCC', 'RoHS'],
  },
];

// Helper functions
export function getQAByCategory(category: string): QAPair[] {
  return qaLibrary.filter(qa => qa.category === category);
}

export function getQAByIndustry(industry: string): QAPair[] {
  return qaLibrary.filter(qa => qa.industry === industry || qa.industry === 'general');
}

export function searchQA(keyword: string): QAPair[] {
  const lowerKeyword = keyword.toLowerCase();
  return qaLibrary.filter(qa =>
    qa.question.toLowerCase().includes(lowerKeyword) ||
    qa.answer.toLowerCase().includes(lowerKeyword) ||
    qa.keywords?.some(k => k.toLowerCase().includes(lowerKeyword))
  );
}

export function getRandomQA(count: number = 5): QAPair[] {
  const shuffled = [...qaLibrary].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
