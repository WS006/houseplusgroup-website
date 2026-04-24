import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import SchemaRenderer from '@/components/SchemaRenderer';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builder';
import { geoRegions } from '@/lib/geo-keywords';
import { translations } from '@/lib/translations';

export default async function RegionsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Regions', url: '/regions' },
  ];

  const schemas = [
    buildOrganizationSchema(),
    buildBreadcrumbSchema(breadcrumbs),
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
              HousePlus Global Wholesale Markets
            </h1>
            <p className="text-xl opacity-90">
              Specialized wholesale solutions for Africa, Southeast Asia, and Europe
            </p>
          </div>
        </section>

        {/* Regions Banner Image */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=500&fit=crop"
                alt="HousePlus global wholesale markets - Africa, Southeast Asia, and Europe"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-blue-900/30" />
            </div>
          </div>
        </section>

        {/* Regions Grid */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Select Your Region
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Africa */}
              <Link href="/en/regions/africa">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg shadow hover:shadow-xl transition cursor-pointer h-full">
                  <h3 className="text-3xl font-bold mb-4 text-orange-600">🌍 Africa</h3>
                  <p className="text-gray-700 mb-6">
                    Serving Nigeria, Kenya, South Africa, Egypt, Ghana, and more
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>✓ 10+ countries covered</li>
                    <li>✓ FOB/CIF payment terms</li>
                    <li>✓ 20-35 days lead time</li>
                    <li>✓ Port of Lagos, Durban</li>
                  </ul>
                  <button className="text-orange-600 font-semibold hover:text-orange-700">
                    Learn More →
                  </button>
                </div>
              </Link>

              {/* Southeast Asia */}
              <Link href="/en/regions/southeast_asia">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg shadow hover:shadow-xl transition cursor-pointer h-full">
                  <h3 className="text-3xl font-bold mb-4 text-green-600">🌏 Southeast Asia</h3>
                  <p className="text-gray-700 mb-6">
                    Serving Vietnam, Thailand, Indonesia, Philippines, and more
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>✓ 10+ countries covered</li>
                    <li>✓ Flexible payment terms</li>
                    <li>✓ 15-25 days lead time</li>
                    <li>✓ Port of Ho Chi Minh, Bangkok</li>
                  </ul>
                  <button className="text-green-600 font-semibold hover:text-green-700">
                    Learn More →
                  </button>
                </div>
              </Link>

              {/* Europe */}
              <Link href="/en/regions/europe">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow hover:shadow-xl transition cursor-pointer h-full">
                  <h3 className="text-3xl font-bold mb-4 text-blue-600">🌎 Europe</h3>
                  <p className="text-gray-700 mb-6">
                    Serving Germany, France, UK, Spain, Netherlands, and more
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>✓ 12+ countries covered</li>
                    <li>✓ CE certified products</li>
                    <li>✓ 25-35 days lead time</li>
                    <li>✓ Port of Hamburg, Rotterdam</li>
                  </ul>
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    Learn More →
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Regional Pages */}
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Why Choose HousePlus for Regional Wholesale?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">🎯 Market Expertise</h3>
                <p className="text-gray-700">
                  Deep understanding of regional market needs, import regulations, and customer preferences across Africa, Southeast Asia, and Europe.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">📦 Logistics Optimization</h3>
                <p className="text-gray-700">
                  Optimized shipping routes, established partnerships with major ports, and efficient customs clearance processes for each region.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">💰 Competitive Pricing</h3>
                <p className="text-gray-700">
                  Volume discounts, flexible payment terms (FOB, CIF, L/C), and customized pricing for regional wholesale buyers.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">🚀 Fast Delivery</h3>
                <p className="text-gray-700">
                  Expedited shipping options, real-time tracking, and reliable lead times tailored to each region's requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Wholesale Partnership?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact our regional sales teams for customized quotes and support
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/en/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                Contact Sales
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
