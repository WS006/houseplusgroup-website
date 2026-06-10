import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SchemaRenderer from '@/components/SchemaRenderer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builder';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: 'HousePlus Global Wholesale Markets - Africa, Southeast Asia, Europe',
    es: 'Mercados Mayoristas Globales de HousePlus - África, Sudeste Asiático, Europa',
    de: 'HousePlus Globale Großhandelsmärkte - Afrika, Südostasien, Europa',
    fr: 'Marchés de Gros Mondiaux HousePlus - Afrique, Asie du Sud-Est, Europe',
    ar: 'أسواق الجملة العالمية HousePlus - أفريقيا، جنوب شرق آسيا، أوروبا',
  };

  const descriptions: Record<string, string> = {
    en: 'HousePlus specialized wholesale solutions for Africa, Southeast Asia, and Europe. Local support, fast shipping, and certified products for global B2B buyers.',
    es: 'Soluciones mayoristas especializadas de HousePlus para África, Sudeste Asiático y Europa. Soporte local, envíos rápidos y productos certificados para compradores B2B globales.',
    de: 'HousePlus spezialisierte Großhandelslösungen für Afrika, Südostasien und Europa. Lokaler Support, schnelle Lieferungen und zertifizierte Produkte für globale B2B-Käufer.',
    fr: 'Solutions de gros spécialisées HousePlus pour l\'Afrique, l\'Asie du Sud-Est et l\'Europe. Support local, livraison rapide et produits certifiés pour les acheteurs B2B mondiaux.',
    ar: 'حلول الجملة المتخصصة HousePlus لأفريقيا وجنوب شرق آسيا وأوروبا. دعم محلي، شحن سريع، ومنتجات موثقة للمشترين B2B العالميين.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['global wholesale', 'regional distribution', 'Africa', 'Southeast Asia', 'Europe', 'HousePlus', 'international trade', 'B2B wholesale', 'OEM ODM'],
    url: `/${lang}/regions`,
    lang: lang as any,
    type: 'website',
    geoRegion: 'CN-GD',
    geoPlacename: 'Guangdong',
  });
}

export default async function RegionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : lang === 'de' ? 'Startseite' : lang === 'fr' ? 'Accueil' : 'الرئيسية', url: `/${lang}` },
    { name: lang === 'en' ? 'Regions' : lang === 'es' ? 'Regiones' : lang === 'de' ? 'Regionen' : lang === 'fr' ? 'Régions' : 'المناطق', url: `/${lang}/regions` },
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
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              HousePlus Global Wholesale Markets
            </h1>
            <p className="text-xl opacity-90">
              Specialized HousePlus wholesale solutions for Africa, Southeast Asia, and Europe.
            </p>
          </div>
        </section>

        {/* Regions Banner Image - Using reliable Unsplash link */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
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
              Select Your HousePlus Region
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Africa */}
              <Link href={`/${lang}/regions/africa`}>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer h-full border border-orange-200">
                  <h3 className="text-3xl font-bold mb-4 text-orange-600">🌍 Africa</h3>
                  <p className="text-gray-700 mb-6">
                    HousePlus serving Nigeria, Kenya, South Africa, Egypt, Ghana, and more.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>✓ 10+ HousePlus countries covered</li>
                    <li>✓ HousePlus FOB/CIF payment terms</li>
                    <li>✓ 20-35 days HousePlus lead time</li>
                  </ul>
                  <span className="text-orange-600 font-bold hover:text-orange-700">
                    Explore Africa →
                  </span>
                </div>
              </Link>

              {/* Southeast Asia */}
              <Link href={`/${lang}/regions/southeast_asia`}>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer h-full border border-green-200">
                  <h3 className="text-3xl font-bold mb-4 text-green-600">🌏 Southeast Asia</h3>
                  <p className="text-gray-700 mb-6">
                    HousePlus serving Vietnam, Thailand, Indonesia, Philippines, and more.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>✓ 10+ HousePlus countries covered</li>
                    <li>✓ HousePlus flexible payment terms</li>
                    <li>✓ 15-25 days HousePlus lead time</li>
                  </ul>
                  <span className="text-green-600 font-bold hover:text-green-700">
                    Explore Asia →
                  </span>
                </div>
              </Link>

              {/* Europe */}
              <Link href={`/${lang}/regions/europe`}>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer h-full border border-blue-200">
                  <h3 className="text-3xl font-bold mb-4 text-blue-600">🌎 Europe</h3>
                  <p className="text-gray-700 mb-6">
                    HousePlus serving Germany, France, UK, Spain, Netherlands, and more.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>✓ 12+ HousePlus countries covered</li>
                    <li>✓ HousePlus CE certified products</li>
                    <li>✓ 25-35 days HousePlus lead time</li>
                  </ul>
                  <span className="text-blue-600 font-bold hover:text-blue-700">
                    Explore Europe →
                  </span>
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
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">🎯 HousePlus Market Expertise</h3>
                <p className="text-gray-700">
                  Deep understanding of regional market needs and HousePlus product compliance across global markets.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">📦 HousePlus Logistics</h3>
                <p className="text-gray-700">
                  Optimized HousePlus shipping routes and efficient customs clearance processes for each region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 text-white py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start HousePlus Wholesale Partnership?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact our regional HousePlus sales teams for customized quotes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${lang}/contact`}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900"
              >
                Contact HousePlus Sales
              </Link>
              <a
                href="https://wa.me/8615578119543"
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-900"
              >
                WhatsApp HousePlus
              </a>
            </div>
          </div>
        </section>
      </main>
    </SchemaRenderer>
  );
}
