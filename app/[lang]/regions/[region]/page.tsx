import { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import { getRegionCopy, translateRegionTemplate } from '@/lib/localized-content';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.flatMap((lang) =>
    Object.keys(regionConfigs).map((region) => ({ lang, region }))
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
  eu: {
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
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string; region: string };
}): Promise<Metadata> {
  const { lang, region } = params;
  const config = regionConfigs[region] || regionConfigs.africa;

  const titles: Record<string, Record<string, string>> = {
    en: {
      africa: 'HousePlus Africa - Solar & Home Appliances Wholesale',
      southeast_asia: 'HousePlus Southeast Asia - Solar & Home Appliances Wholesale',
      europe: 'HousePlus Europe - Solar & Home Appliances Wholesale',
      ng: 'HousePlus Nigeria - Solar & Home Appliances Wholesale',
      eu: 'HousePlus Europe - Solar & Home Appliances Wholesale',
    },
    es: {
      africa: 'HousePlus África - Mayorista de Energía Solar y Electrodomésticos',
      southeast_asia: 'HousePlus Sudeste Asiático - Mayorista de Energía Solar y Electrodomésticos',
      europe: 'HousePlus Europa - Mayorista de Energía Solar y Electrodomésticos',
      ng: 'HousePlus Nigeria - Mayorista de Energía Solar y Electrodomésticos',
      eu: 'HousePlus Europa - Mayorista de Energía Solar y Electrodomésticos',
    },
    de: {
      africa: 'HousePlus Afrika - Großhandel für Solar & Haushaltsgeräte',
      southeast_asia: 'HousePlus Südostasien - Großhandel für Solar & Haushaltsgeräte',
      europe: 'HousePlus Europa - Großhandel für Solar & Haushaltsgeräte',
      ng: 'HousePlus Nigeria - Großhandel für Solar & Haushaltsgeräte',
      eu: 'HousePlus Europa - Großhandel für Solar & Haushaltsgeräte',
    },
    fr: {
      africa: 'HousePlus Afrique - Gros Énergie Solaire et Électroménagers',
      southeast_asia: 'HousePlus Asie du Sud-Est - Gros Énergie Solaire et Électroménagers',
      europe: 'HousePlus Europe - Gros Énergie Solaire et Électroménagers',
      ng: 'HousePlus Nigeria - Gros Énergie Solaire et Électroménagers',
      eu: 'HousePlus Europe - Gros Énergie Solaire et Électroménagers',
    },
    ar: {
      africa: 'HousePlus أفريقيا - الجملة للطاقة الشمسية والأجهزة المنزلية',
      southeast_asia: 'HousePlus جنوب شرق آسيا - الجملة للطاقة الشمسية والأجهزة المنزلية',
      europe: 'HousePlus أوروبا - الجملة للطاقة الشمسية والأجهزة المنزلية',
      ng: 'HousePlus نيجيريا - الجملة للطاقة الشمسية والأجهزة المنزلية',
      eu: 'HousePlus أوروبا - الجملة للطاقة الشمسية والأجهزة المنزلية',
    },
  };

  const descriptions: Record<string, Record<string, string>> = {
    en: {
      africa: `HousePlus official distributor for Africa. Solar panels, home appliances & 3C electronics. ${config.shippingInfo}. Contact ${config.phoneDisplay}.`,
      southeast_asia: `HousePlus official distributor for Southeast Asia. Solar panels, home appliances & 3C electronics. ${config.shippingInfo}.`,
      europe: `HousePlus Europe - Professional wholesale supplier. CE/RoHS certified solar systems, home appliances & electronics. ${config.shippingInfo}.`,
      ng: `HousePlus official ${config.name} distributor. Solar panels, home appliances & 3C electronics. ${config.shippingInfo}. Contact ${config.phoneDisplay}.`,
      eu: `HousePlus Europe - Professional wholesale supplier. CE/RoHS certified solar systems, home appliances & electronics. ${config.shippingInfo}.`,
    },
    es: {
      africa: `Distribuidor oficial de HousePlus para África. Paneles solares, electrodomésticos y electrónica 3C. ${config.shippingInfo}. Contacto ${config.phoneDisplay}.`,
      southeast_asia: `Distribuidor oficial de HousePlus para Sudeste Asiático. Paneles solares, electrodomésticos y electrónica 3C. ${config.shippingInfo}.`,
      europe: `HousePlus Europa - Proveedor mayorista profesional. Sistemas solares certificados CE/RoHS, electrodomésticos y electrónica. ${config.shippingInfo}.`,
      ng: `Distribuidor oficial de HousePlus para ${config.name}. Paneles solares, electrodomésticos y electrónica 3C. ${config.shippingInfo}. Contacto ${config.phoneDisplay}.`,
      eu: `HousePlus Europa - Proveedor mayorista profesional. Sistemas solares certificados CE/RoHS, electrodomésticos y electrónica. ${config.shippingInfo}.`,
    },
    de: {
      africa: `HousePlus offizieller Händler für Afrika. Solarmodule, Haushaltsgeräte & 3C-Elektronik. ${config.shippingInfo}. Kontakt ${config.phoneDisplay}.`,
      southeast_asia: `HousePlus offizieller Händler für Südostasien. Solarmodule, Haushaltsgeräte & 3C-Elektronik. ${config.shippingInfo}.`,
      europe: `HousePlus Europa - Professioneller Großhandelslieferant. CE/RoHS-zertifizierte Solarsysteme, Haushaltsgeräte & Elektronik. ${config.shippingInfo}.`,
      ng: `HousePlus offizieller Händler für ${config.name}. Solarmodule, Haushaltsgeräte & 3C-Elektronik. ${config.shippingInfo}. Kontakt ${config.phoneDisplay}.`,
      eu: `HousePlus Europa - Professioneller Großhandelslieferant. CE/RoHS-zertifizierte Solarsysteme, Haushaltsgeräte & Elektronik. ${config.shippingInfo}.`,
    },
    fr: {
      africa: `Distributeur officiel HousePlus pour l'Afrique. Panneaux solaires, électroménagers et électronique 3C. ${config.shippingInfo}. Contact ${config.phoneDisplay}.`,
      southeast_asia: `Distributeur officiel HousePlus pour l'Asie du Sud-Est. Panneaux solaires, électroménagers et électronique 3C. ${config.shippingInfo}.`,
      europe: `HousePlus Europe - Fournisseur grossiste professionnel. Systèmes solaires certifiés CE/RoHS, électroménagers et électronique. ${config.shippingInfo}.`,
      ng: `Distributeur officiel HousePlus pour ${config.name}. Panneaux solaires, électroménagers et électronique 3C. ${config.shippingInfo}. Contact ${config.phoneDisplay}.`,
      eu: `HousePlus Europe - Fournisseur grossiste professionnel. Systèmes solaires certifiés CE/RoHS, électroménagers et électronique. ${config.shippingInfo}.`,
    },
    ar: {
      africa: `الموزع الرسمي لـ HousePlus لأفريقيا. الألواح الشمسية، الأجهزة المنزلية والإلكترونيات 3C. ${config.shippingInfo}. اتصل ${config.phoneDisplay}.`,
      southeast_asia: `الموزع الرسمي لـ HousePlus لجنوب شرق آسيا. الألواح الشمسية، الأجهزة المنزلية والإلكترونيات 3C. ${config.shippingInfo}.`,
      europe: `HousePlus أوروبا - مورد الجملة المحترف. أنظمة شمسية موثقة CE/RoHS، أجهزة منزلية وإلكترونيات. ${config.shippingInfo}.`,
      ng: `الموزع الرسمي لـ HousePlus لـ ${config.name}. الألواح الشمسية، الأجهزة المنزلية والإلكترونيات 3C. ${config.shippingInfo}. اتصل ${config.phoneDisplay}.`,
      eu: `HousePlus أوروبا - مورد الجملة المحترف. أنظمة شمسية موثقة CE/RoHS، أجهزة منزلية وإلكترونيات. ${config.shippingInfo}.`,
    },
  };

  return generateSEOMetadata({
    title: (titles[lang] || titles.en)[region] || (titles.en as any)[region],
    description: (descriptions[lang] || descriptions.en)[region] || (descriptions.en as any)[region],
    keywords: [
      'wholesale',
      config.name.toLowerCase(),
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

export default async function RegionPage({
  params,
}: {
  params: { lang: string; region: string };
}) {
  const { lang, region } = params;
  const config = regionConfigs[region] || regionConfigs.africa;
  const copy = getRegionCopy(lang);
  const t = (key: string) => translateRegionTemplate(copy[key] || key, config.name);

  const organizationSchema = generateOrganizationSchema({
    title: `HousePlus ${config.name}`,
    description: `Professional wholesale supplier of solar systems, home appliances and 3C electronics for ${config.name} market.`,
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
                WhatsApp: {config.phoneDisplay}
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
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Tax Information</p>
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
