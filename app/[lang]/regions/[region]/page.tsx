import { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

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
  ng: {
    code: 'NG',
    name: 'Nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    phonePrefix: '+234',
    phoneDisplay: '+234 800 123 4567',
    shippingInfo: 'Lagos warehouse: 3-5 business days',
    certifications: ['SONCAP', 'CE', 'RoHS'],
    warehouseInfo: 'Lagos Distribution Center - Stock available for immediate dispatch',
  },
  eu: {
    code: 'EU',
    name: 'Europe',
    currency: 'EUR',
    currencySymbol: '€',
    phonePrefix: '+49',
    phoneDisplay: '+49 30 12345678',
    shippingInfo: 'EU customs pre-cleared, 7-14 business days',
    certifications: ['CE', 'RoHS', 'REACH', 'WEEE'],
    warehouseInfo: 'EU Distribution Hub - Rotterdam port entry',
    vatInfo: 'EU VAT registered - VAT invoice available on request',
  },
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; region?: string }>;
  searchParams: Promise<{ region?: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { region } = await searchParams;
  const regionCode = region || 'ng';
  const config = regionConfigs[regionCode] || regionConfigs.ng;

  const titles: Record<string, string> = {
    ng: `HousePlus ${config.name} - Solar & Home Appliances Wholesale`,
    eu: `HousePlus Europe - Solar & Home Appliances Wholesale`,
  };

  const descriptions: Record<string, string> = {
    ng: `HousePlus official ${config.name} distributor. Solar panels, home appliances & 3C electronics. ${config.shippingInfo}. Contact ${config.phoneDisplay}.`,
    eu: `HousePlus Europe - Professional wholesale supplier. CE/RoHS certified solar systems, home appliances & electronics. ${config.shippingInfo}.`,
  };

  return generateSEOMetadata({
    title: titles[regionCode as keyof typeof titles] || titles.ng,
    description: descriptions[regionCode as keyof typeof descriptions] || descriptions.ng,
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
    url: `/${lang}/regions?region=${regionCode}`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function RegionPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; region?: string }>;
  searchParams: Promise<{ region?: string }>;
}) {
  const { lang } = await params;
  const { region } = await searchParams;
  const regionCode = region || 'ng';
  const config = regionConfigs[regionCode] || regionConfigs.ng;

  const organizationSchema = generateOrganizationSchema({
    title: `HousePlus ${config.name}`,
    description: `Professional wholesale supplier of solar systems, home appliances and 3C electronics for ${config.name} market.`,
    url: `https://www.houseplus-ch.com/${lang}/regions?region=${regionCode}`,
    lang,
    type: 'Organization',
  });

  const features = [
    {
      icon: '🚚',
      title: 'Fast Local Shipping',
      desc: config.shippingInfo,
    },
    {
      icon: '✅',
      title: 'Certified Products',
      desc: `All products certified: ${config.certifications.join(', ')}`,
    },
    {
      icon: '🏭',
      title: 'Local Support',
      desc: config.warehouseInfo,
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      desc: `Wholesale pricing in ${config.currencySymbol} (${config.currency}). MOQ from 100 units.`,
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
              🌍 {config.name} Regional Office
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight">
              HousePlus {config.name}
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              Your trusted wholesale partner for solar energy systems, home appliances and 3C electronics. 
              Serving {config.name} with local support and competitive pricing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${lang}/products`}
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
              >
                Browse Products
              </Link>
              <a
                href={`https://wa.me/${config.phonePrefix.replace('+', '')}8001234567`}
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
                Why Choose HousePlus {config.name}
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Dedicated support and services tailored for the {config.name} market
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
                Contact HousePlus {config.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp / Phone</p>
                    <a
                      href={`https://wa.me/${config.phonePrefix.replace('+', '')}8001234567`}
                      className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {config.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <a
                      href="mailto:sales@houseplus-ch.com"
                      className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      sales@houseplus-ch.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Business Hours</p>
                    <p className="text-slate-700">Mon - Fri: 9:00 - 18:00 (GMT+8)</p>
                    <p className="text-slate-700">Sat: 10:00 - 16:00 (GMT+8)</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Warehouse</p>
                    <p className="text-slate-700">{config.warehouseInfo}</p>
                  </div>
                  {config.vatInfo && (
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Tax Information</p>
                      <p className="text-slate-700">{config.vatInfo}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Currency</p>
                    <p className="text-slate-700">
                      Pricing available in {config.currencySymbol} ({config.currency})
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={`/${lang}/contact`}
                  className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                >
                  Request a Quote
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
                Popular Products in {config.name}
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Browse our best-selling products for the {config.name} market
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Solar Energy Systems',
                  desc: 'Solar panels, inverters, batteries and complete off-grid solutions',
                  link: `/${lang}/products`,
                },
                {
                  title: 'Home Appliances',
                  desc: 'Air fryers, induction cooktops, electric kettles and more',
                  link: `/${lang}/products`,
                },
                {
                  title: '3C Electronics',
                  desc: 'Headphones, power banks, smart watches and accessories',
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
                  <span className="text-blue-600 font-semibold">View Products →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
