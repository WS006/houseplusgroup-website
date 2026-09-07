import { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import { getRegionCopy, translateRegionTemplate } from '@/lib/localized-content';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];
const legacyRegionAliases: Record<string, string> = { eu: 'europe' };

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.flatMap((lang) =>
    [...Object.keys(regionConfigs), ...Object.keys(legacyRegionAliases)].map((region) => ({ lang, region }))
  );
}

interface RegionConfig {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  phonePrefix: string;
  phoneDisplay: string;
  shippingInfo: string;
  certifications: string[];
  warehouseInfo: string;
  vatInfo?: string;
}

const regionNames: Record<string, Record<string, string>> = {
  en: { AF: 'Africa', SEA: 'Southeast Asia', EU: 'Europe', NG: 'Nigeria' },
  es: { AF: 'África', SEA: 'Sudeste Asiático', EU: 'Europa', NG: 'Nigeria' },
  de: { AF: 'Afrika', SEA: 'Südostasien', EU: 'Europa', NG: 'Nigeria' },
  fr: { AF: 'Afrique', SEA: 'Asie du Sud-Est', EU: 'Europe', NG: 'Nigéria' },
  ar: { AF: 'أفريقيا', SEA: 'جنوب شرق آسيا', EU: 'أوروبا', NG: 'نيجيريا' },
};

const regionConfigs: Record<string, RegionConfig> = {
  africa: {
    code: 'AF',
    name: 'Africa',
    currency: 'USD',
    currencySymbol: '$',
    phonePrefix: '+86',
    phoneDisplay: '+86 155 7811 9543',
    shippingInfo: 'International shipping terms confirmed by quotation',
    certifications: ['Product-specific documentation available on request'],
    warehouseInfo: 'HousePlus export coordination from Zhongshan, Guangdong, China',
  },
  southeast_asia: {
    code: 'SEA',
    name: 'Southeast Asia',
    currency: 'USD',
    currencySymbol: '$',
    phonePrefix: '+86',
    phoneDisplay: '+86 155 7811 9543',
    shippingInfo: 'International shipping terms confirmed by quotation',
    certifications: ['Product-specific documentation available on request'],
    warehouseInfo: 'HousePlus export coordination from Zhongshan, Guangdong, China',
  },
  europe: {
    code: 'EU',
    name: 'Europe',
    currency: 'EUR',
    currencySymbol: '€',
    phonePrefix: '+86',
    phoneDisplay: '+86 155 7811 9543',
    shippingInfo: 'International shipping terms confirmed by quotation',
    certifications: ['Product-specific documentation available on request'],
    warehouseInfo: 'HousePlus export coordination from Zhongshan, Guangdong, China',
  },
  ng: {
    code: 'NG',
    name: 'Nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    phonePrefix: '+86',
    phoneDisplay: '+86 155 7811 9543',
    shippingInfo: 'International shipping terms confirmed by quotation',
    certifications: ['Product-specific documentation available on request'],
    warehouseInfo: 'HousePlus export coordination from Zhongshan, Guangdong, China',
  },
};

const regionSchemaDescriptions: Record<string, string> = {
  en: 'B2B sourcing support for solar systems, home appliances and 3C electronics in {region}.',
  es: 'Soporte de abastecimiento B2B para sistemas solares, electrodomésticos y electrónica 3C en {region}.',
  de: 'B2B-Beschaffungsunterstützung für Solarsysteme, Haushaltsgeräte und 3C-Elektronik in {region}.',
  fr: 'Accompagnement de l’approvisionnement B2B en systèmes solaires, appareils électroménagers et électronique 3C en {region}.',
  ar: 'دعم التوريد بين الشركات لأنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C في {region}.',
};

const regionUtilityLabels: Record<string, { whatsapp: string; taxInformation: string }> = {
  en: { whatsapp: 'WhatsApp', taxInformation: 'Tax Information' },
  es: { whatsapp: 'WhatsApp', taxInformation: 'Información fiscal' },
  de: { whatsapp: 'WhatsApp', taxInformation: 'Steuerinformationen' },
  fr: { whatsapp: 'WhatsApp', taxInformation: 'Informations fiscales' },
  ar: { whatsapp: 'واتساب', taxInformation: 'المعلومات الضريبية' },
};

const regionBreadcrumbLabels: Record<string, string> = {
  en: 'Regions',
  es: 'Regiones',
  de: 'Regionen',
  fr: 'Régions',
  ar: 'المناطق',
};

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string; region: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const { lang, region } = params;
  if (legacyRegionAliases[region]) {
    return {
      robots: { index: false, follow: true },
      alternates: { canonical: `https://www.houseplus-ch.com/${lang}/regions/${legacyRegionAliases[region]}` },
    };
  }
  const config = regionConfigs[region] || regionConfigs.africa;
  const regionName = regionNames[lang]?.[config.code] || config.name;

  const titles: Record<string, Record<string, string>> = {
    en: {
      africa: 'HousePlus Africa - Solar & Home Appliances Wholesale',
      southeast_asia: 'HousePlus Southeast Asia - Solar & Home Appliances Wholesale',
      europe: 'HousePlus Europe - Solar & Home Appliances Wholesale',
      ng: 'HousePlus Nigeria - Solar & Home Appliances Wholesale',
    },
    es: {
      africa: 'HousePlus África - Mayorista de Energía Solar y Electrodomésticos',
      southeast_asia: 'HousePlus Sudeste Asiático - Mayorista de Energía Solar y Electrodomésticos',
      europe: 'HousePlus Europa - Mayorista de Energía Solar y Electrodomésticos',
      ng: 'HousePlus Nigeria - Mayorista de Energía Solar y Electrodomésticos',
    },
    de: {
      africa: 'HousePlus Afrika - Großhandel für Solar & Haushaltsgeräte',
      southeast_asia: 'HousePlus Südostasien - Großhandel für Solar & Haushaltsgeräte',
      europe: 'HousePlus Europa - Großhandel für Solar & Haushaltsgeräte',
      ng: 'HousePlus Nigeria - Großhandel für Solar & Haushaltsgeräte',
    },
    fr: {
      africa: 'HousePlus Afrique - Gros Énergie Solaire et Électroménagers',
      southeast_asia: 'HousePlus Asie du Sud-Est - Gros Énergie Solaire et Électroménagers',
      europe: 'HousePlus Europe - Gros Énergie Solaire et Électroménagers',
      ng: 'HousePlus Nigeria - Gros Énergie Solaire et Électroménagers',
    },
    ar: {
      africa: 'HousePlus أفريقيا - الجملة للطاقة الشمسية والأجهزة المنزلية',
      southeast_asia: 'HousePlus جنوب شرق آسيا - الجملة للطاقة الشمسية والأجهزة المنزلية',
      europe: 'HousePlus أوروبا - الجملة للطاقة الشمسية والأجهزة المنزلية',
      ng: 'HousePlus نيجيريا - الجملة للطاقة الشمسية والأجهزة المنزلية',
    },
  };

  const descriptions: Record<string, string> = {
    en: `HousePlus supports B2B buyers in ${regionName} with solar systems, home appliances and 3C electronics. Discuss specifications, documentation, OEM/ODM scope and quotation terms with our export team.`,
    es: `HousePlus apoya a compradores B2B en ${regionName} con sistemas solares, electrodomésticos y electrónica 3C. Consulte las especificaciones, la documentación, el alcance de OEM/ODM y las condiciones de cotización con nuestro equipo de exportación.`,
    de: `HousePlus unterstützt B2B-Käufer in ${regionName} mit Solarsystemen, Haushaltsgeräten und 3C-Elektronik. Besprechen Sie Spezifikationen, Dokumentation, OEM/ODM-Umfang und Angebotsbedingungen mit unserem Exportteam.`,
    fr: `HousePlus accompagne les acheteurs B2B en ${regionName} pour les systèmes solaires, les appareils électroménagers et l’électronique 3C. Discutez des spécifications, de la documentation, du périmètre OEM/ODM et des conditions du devis avec notre équipe export.`,
    ar: `تدعم HousePlus المشترين من الشركات في ${regionName} بأنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C. ناقش المواصفات والوثائق ونطاق OEM/ODM وشروط عرض الأسعار مع فريق التصدير لدينا.`,
  };

  return generateSEOMetadata({
    title: (titles[lang] || titles.en)[region] || (titles.en as any)[region],
    description: descriptions[lang] || descriptions.en,
    keywords: [
      'wholesale',
      regionName.toLowerCase(),
      'solar panels',
      'home appliances',
      'OEM',
      'ODM',
      'import',
      'distributor',
    ],
    url: `/${lang}/regions/${region}`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function RegionPage(
  props: {
    params: Promise<{ lang: string; region: string }>;
  }
) {
  const params = await props.params;
  const { lang, region } = params;
  if (legacyRegionAliases[region]) {
    permanentRedirect(`/${lang}/regions/${legacyRegionAliases[region]}`);
  }
  const config = regionConfigs[region] || regionConfigs.africa;
  const regionName = regionNames[lang]?.[config.code] || config.name;
  const copy = getRegionCopy(lang);
  const t = (key: string) => translateRegionTemplate(copy[key] || key, regionName);
  const utility = regionUtilityLabels[lang] || regionUtilityLabels.en;
  const regionBreadcrumbLabel = regionBreadcrumbLabels[lang] || regionBreadcrumbLabels.en;

  const organizationSchema = generateOrganizationSchema({
    title: `HousePlus ${regionName}`,
    description: (regionSchemaDescriptions[lang] || regionSchemaDescriptions.en).replace('{region}', regionName),
    url: `https://www.houseplus-ch.com/${lang}/regions/${region}`,
    lang,
    type: 'Organization',
  });

  const features = [
    {
      icon: '🚚',
      title: t('featureLogisticsTitle'),
      desc: t('featureLogisticsDescription'),
    },
    {
      icon: '✅',
      title: t('featureCertificationTitle'),
      desc: t('featureCertificationDescription'),
    },
    {
      icon: '🏭',
      title: t('featureTechnicalTitle'),
      desc: t('featureTechnicalDescription'),
    },
    {
      icon: '💰',
      title: t('featureQuoteTitle'),
      desc: t('featureQuoteDescription'),
    },
  ];

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">
        <div className="bg-white px-4 pt-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb
              lang={lang}
              slug={`regions/${region}`}
              customLabel={regionName}
              labelOverrides={{ regions: regionBreadcrumbLabel }}
            />
          </div>
        </div>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-5">
              🌍 {t('heroKicker')}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              {t('heroDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${lang}/products`}
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
              >
                {t('browseProducts')}
              </Link>
              <a
                href={`https://wa.me/${config.phoneDisplay.replace(/\D/g, '')}`}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all border border-blue-500"
              >
                {utility.whatsapp}: {config.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* Regional Features */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                {t('whyChooseTitle')}
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                {t('whyChooseDescription')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">
                {t('contactTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{t('phoneLabel')}</p>
                    <a
                      href={`https://wa.me/${config.phoneDisplay.replace(/\D/g, '')}`}
                      className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {config.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{t('emailLabel')}</p>
                    <a
                      href="mailto:jack@houseplus-ch.com"
                      className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      jack@houseplus-ch.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{t('businessHoursLabel')}</p>
                    <p className="text-slate-700">{t('weekdayHours')}</p>
                    <p className="text-slate-700">{t('saturdayHours')}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{t('featureTechnicalTitle')}</p>
                    <p className="text-slate-700">{t('featureTechnicalDescription')}</p>
                  </div>
                  {config.vatInfo && (
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{utility.taxInformation}</p>
                      <p className="text-slate-700">{config.vatInfo}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{t('currencyLabel')}</p>
                    <p className="text-slate-700">{t('currencyDescription')}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                >
                  {t('requestQuote')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                {t('popularProductsTitle')}
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                {t('popularProductsDescription')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: t('solarTitle'),
                  desc: t('solarDescription'),
                  link: `/${lang}/products`,
                },
                {
                  title: t('applianceTitle'),
                  desc: t('applianceDescription'),
                  link: `/${lang}/products`,
                },
                {
                  title: t('electronicsTitle'),
                  desc: t('electronicsDescription'),
                  link: `/${lang}/products`,
                },
              ].map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.link}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                  <p className="text-slate-600 mb-4">{cat.desc}</p>
                  <span className="text-blue-600 font-semibold">{t('viewProducts')} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
