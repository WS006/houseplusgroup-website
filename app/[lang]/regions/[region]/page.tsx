import { useParams } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import SchemaRenderer from '@/components/SchemaRenderer';
import { buildOrganizationSchema, buildLocalBusinessSchema, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema-builder';
import { geoRegions, generateRegionSeoText, getRegionKeywords } from '@/lib/geo-keywords';
import { translations } from '@/lib/translations';

interface RegionalPageProps {
  params: Promise<{
    lang: string;
    region: string;
  }>;
}

// Generate metadata for regional pages
export async function generateMetadata({ params }: RegionalPageProps): Promise<Metadata> {
  const { lang, region } = await params;
  const regionData = geoRegions[region];

  if (!regionData) {
    return { title: 'Region Not Found' };
  }

  const t = translations[lang as keyof typeof translations] || translations.en;
  const regionName = regionData.name;

  return {
    title: `${regionName} Wholesale Solar & Home Appliances | HousePlus OEM/ODM`,
    description: `Professional wholesale supplier of solar systems, home appliances, and 3C electronics for ${regionName}. FOB, CIF, and L/C payment terms. ${regionData.leadTime} lead time.`,
    keywords: `wholesale ${region}, bulk supplier ${region}, OEM ODM ${region}, solar wholesale, home appliances distributor`,
    alternates: {
      canonical: `/${lang}/regions/${region}`,
      languages: {
        en: `/en/regions/${region}`,
        es: `/es/regions/${region}`,
        de: `/de/regions/${region}`,
        fr: `/fr/regions/${region}`,
        ar: `/ar/regions/${region}`,
      },
    },
  };
}

export default async function RegionalPage({ params }: RegionalPageProps) {
  const { lang, region } = await params;
  const regionData = geoRegions[region];

  if (!regionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Region Not Found</h1>
          <Link href={`/${lang}`} className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const t = translations[lang as keyof typeof translations] || translations.en;
  const breadcrumbs = [
    { name: 'Home', url: `/${lang}` },
    { name: 'Regions', url: `/${lang}/regions` },
    { name: regionData.name, url: `/${lang}/regions/${region}` },
  ];

  const schemas = [
    buildOrganizationSchema({ lang }),
    buildLocalBusinessSchema({ lang }),
    buildBreadcrumbSchema(breadcrumbs),
    buildServiceSchema({
      name: `Wholesale Supply for ${regionData.name}`,
      description: generateRegionSeoText(region),
      areaServed: regionData.countries,
    }),
  ];

  return (
    <SchemaRenderer schemas={schemas}>
      <main className="min-h-screen bg-white">
        {/* Breadcrumb Navigation */}
        <nav className="bg-gray-100 py-4 px-4 md:px-8">
          <div className="max-w-6xl mx-auto flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <Link href={item.url} className="text-blue-600 hover:underline">
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              HousePlus Wholesale Solutions for {regionData.name}
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Professional OEM/ODM supplier of solar systems, home appliances, and 3C electronics
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${lang}/contact`}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Request Quote
              </Link>
              <Link
                href={`/${lang}/service`}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Key Information */}
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Why Choose HousePlus for {regionData.name}?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Lead Time */}
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">⏱️ Fast Delivery</h3>
                <p className="text-gray-700 mb-4">{regionData.leadTime}</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Standard: {regionData.leadTime.split(',')[0]}</li>
                  <li>✓ Expedited options available</li>
                  <li>✓ Real-time shipment tracking</li>
                </ul>
              </div>

              {/* MOQ & Pricing */}
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">📦 Flexible MOQ</h3>
                <p className="text-gray-700 mb-4">{regionData.moqAdjustment}</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Volume discounts available</li>
                  <li>✓ Customized pricing for bulk orders</li>
                  <li>✓ Transparent cost breakdown</li>
                </ul>
              </div>

              {/* Payment Terms */}
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">💳 Trade Terms</h3>
                <ul className="space-y-2 text-gray-600">
                  {regionData.tradeTerms.slice(0, 4).map((term, idx) => (
                    <li key={idx}>✓ {term}</li>
                  ))}
                </ul>
              </div>

              {/* Shipping */}
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">🚢 Shipping Ports</h3>
                <ul className="space-y-2 text-gray-600">
                  {regionData.shippingPorts.slice(0, 4).map((port, idx) => (
                    <li key={idx}>✓ {port}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Target Countries */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Serving {regionData.countries.length} Countries in {regionData.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {regionData.countries.map((country, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-600 mb-3">{country}</h3>
                  <p className="text-gray-700 text-sm">
                    Professional wholesale supplier with established distribution network
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Product Categories for {regionData.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Solar */}
              <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-4 text-yellow-600">☀️ Solar Energy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• High-efficiency solar panels</li>
                  <li>• Portable power stations</li>
                  <li>• MPPT controllers</li>
                  <li>• Solar inverters</li>
                  <li>• Battery storage systems</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Wholesale solar system supplier for {regionData.name}
                </p>
              </div>

              {/* Appliances */}
              <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">🏠 Home Appliances</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Washing machines</li>
                  <li>• Refrigerators</li>
                  <li>• Air conditioners</li>
                  <li>• Kitchen appliances</li>
                  <li>• Water heaters</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Bulk home appliances supplier for {regionData.name}
                </p>
              </div>

              {/* Electronics */}
              <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-4 text-purple-600">📱 3C Electronics</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Smart home devices</li>
                  <li>• LED lighting</li>
                  <li>• Wireless chargers</li>
                  <li>• Power banks</li>
                  <li>• Smart speakers</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  OEM/ODM electronics manufacturer for {regionData.name}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Source from HousePlus?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get a customized quote for your {regionData.name} market today
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href={`/${lang}/contact`}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                Contact Sales Team
              </Link>
              <a
                href="https://wa.me/8615578119543"
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition inline-block"
              >
                WhatsApp: +86 155 7811 9543
              </a>
            </div>
          </div>
        </section>
      </main>
    </SchemaRenderer>
  );
}
