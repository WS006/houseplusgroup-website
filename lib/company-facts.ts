export type CompanyFactsLocale = 'en' | 'es' | 'de' | 'fr' | 'ar';

export const companyFacts: Record<CompanyFactsLocale, {
  factoryArea: string;
  manufacturingSince: string;
  wholesaleClients: string;
  markets: string;
  labels: [string, string, string, string];
}> = {
  en: {
    factoryArea: '20,000 m²', manufacturingSince: 'Since 2010', wholesaleClients: '441+', markets: '53+',
    labels: ['Production area', 'Manufacturing experience', 'Wholesale clients', 'Countries and markets served'],
  },
  es: {
    factoryArea: '20.000 m²', manufacturingSince: 'Desde 2010', wholesaleClients: '441+', markets: '53+',
    labels: ['Área de producción', 'Experiencia de fabricación', 'Clientes mayoristas', 'Países y mercados atendidos'],
  },
  de: {
    factoryArea: '20.000 m²', manufacturingSince: 'Seit 2010', wholesaleClients: '441+', markets: '53+',
    labels: ['Produktionsfläche', 'Fertigungserfahrung', 'Großhandelskunden', 'Bediente Länder und Märkte'],
  },
  fr: {
    factoryArea: '20 000 m²', manufacturingSince: 'Depuis 2010', wholesaleClients: '441+', markets: '53+',
    labels: ['Surface de production', 'Expérience de fabrication', 'Clients grossistes', 'Pays et marchés desservis'],
  },
  ar: {
    factoryArea: '20,000 م²', manufacturingSince: 'منذ 2010', wholesaleClients: '+441', markets: '+53',
    labels: ['مساحة الإنتاج', 'خبرة التصنيع', 'عملاء الجملة', 'الدول والأسواق التي نخدمها'],
  },
};

export function getCompanyFacts(locale: string) {
  return companyFacts[(locale as CompanyFactsLocale)] || companyFacts.en;
}
