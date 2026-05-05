import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import Breadcrumb from '@/components/Breadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return generateSEOMetadata({
    title: 'About HousePlus — Vertically Integrated Manufacturer Since 2010',
    description: 'Discover the story behind HousePlus Group: a vertically integrated manufacturer of solar energy systems, home appliances and 3C electronics serving wholesale buyers in 60+ countries.',
    keywords: ['about HousePlus', 'manufacturer', 'solar systems', 'home appliances', '3C electronics', 'OEM ODM', 'wholesale'],
    url: `/${lang}/about-us`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Vertically integrated manufacturer of solar energy systems, home appliances and 3C electronics.',
    url: `https://www.houseplus-ch.com/${lang}/about-us`,
    lang,
    type: 'Organization',
  });

  const milestones = [
    { year: '2010', event: 'HousePlus founded in Guangdong, China, with an initial focus on home appliance OEM production.' },
    { year: '2013', event: 'Expanded into solar energy products; first export shipment to European distributors.' },
    { year: '2016', event: 'Obtained CE, RoHS and ISO 9001 certifications; opened dedicated 3C electronics division.' },
    { year: '2019', event: 'Reached 300+ active wholesale clients across 40 countries; moved to 20,000 m² factory.' },
    { year: '2022', event: 'Launched LiFePO4 battery and portable power station product lines for off-grid markets.' },
    { year: '2024', event: 'Serving 500+ clients in 60+ countries; annual production capacity exceeds 1.2 million units.' },
  ];

  const values = [
    {
      icon: '🔬',
      title: 'Precision Manufacturing',
      desc: 'Every product leaves our factory only after passing multi-stage quality inspections aligned with international standards. We invest continuously in automated testing equipment and process improvement.',
    },
    {
      icon: '🌱',
      title: 'Sustainable Innovation',
      desc: 'Our R&D team dedicates over 8% of annual revenue to developing energy-efficient products. From solar panels to low-power appliances, sustainability is built into our design philosophy.',
    },
    {
      icon: '🤝',
      title: 'Partnership-First Approach',
      desc: 'We treat every wholesale buyer as a long-term partner. Dedicated account managers, flexible MOQ, and responsive after-sales support ensure you can build your business with confidence.',
    },
    {
      icon: '🌍',
      title: 'Global Compliance',
      desc: 'Our products are certified for key markets worldwide — CE and RoHS for Europe, FCC for North America, and SASO for the Middle East. We handle documentation to streamline your import process.',
    },
  ];

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} />

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">
                    🏭 HousePlus — Established 2010
                  </span>
                  <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full">
                    Guangdong, China
                  </span>
                  <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest rounded-full">
                    ISO 9001 Certified
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                  🏭 HousePlus: Built on Manufacturing Excellence
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  <strong>HousePlus Group</strong> is a vertically integrated manufacturer specialising in solar energy systems, home appliances and 3C electronics. Over 14 years, <strong>HousePlus</strong> has grown from a single production line into a multi-division enterprise trusted by wholesale buyers across six continents. As a professional <strong>HousePlus</strong> manufacturer, we deliver OEM/ODM solutions with international certifications.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  The <strong>HousePlus</strong> factory spans 20,000 m² in Guangdong and houses dedicated assembly lines for each product category, an in-house tooling workshop, and a fully equipped quality laboratory — giving <strong>HousePlus</strong> complete control from raw material to finished product. This is why <strong>HousePlus</strong> is trusted by 500+ wholesale clients worldwide.
                </p>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="/images/about/manufacturing-facility.jpg"
                  alt="HousePlus manufacturing facility"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Numbers */}
        <section className="py-14 bg-blue-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: '14+', label: 'Years in Manufacturing' },
                { value: '500+', label: 'Wholesale Clients' },
                { value: '60+', label: 'Countries Served' },
                { value: '1.2M+', label: 'Units / Year' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-black mb-2">{stat.value}</p>
                  <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl">
              <div className="text-3xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To manufacture reliable, certified products that empower wholesale buyers to build profitable businesses — delivering consistent quality, competitive pricing and responsive support at every stage of the partnership.
              </p>
            </div>
            <div className="bg-green-50 border border-green-100 p-8 rounded-2xl">
              <div className="text-3xl mb-4">🔭</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be the preferred manufacturing partner for solar energy, home appliances and 3C electronics globally — recognised for product innovation, supply chain transparency and the highest standards of customer service.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">🏭 What Drives HousePlus</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Four principles guide every <strong>HousePlus</strong> decision — from product design to after-sales support. This is the <strong>HousePlus</strong> difference.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">🏭 The HousePlus Journey</h2>
              <p className="text-slate-500">Key milestones in the <strong>HousePlus</strong> manufacturing story since 2010.</p>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100" />
              <div className="space-y-8">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm z-10">
                      {m.year}
                    </div>
                    <div className="flex-1 bg-white border border-slate-100 rounded-xl p-5 shadow-sm mt-2">
                      <p className="text-slate-700 text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Capabilities */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">🏭 HousePlus Manufacturing Capabilities</h2>
                <div className="space-y-4">
                  {[
                    'Dedicated assembly lines for solar, appliances and 3C electronics',
                    'In-house tooling and mould workshop for rapid prototyping',
                    'Automated SMT and wave-soldering production for electronics',
                    'Full-cycle quality lab: incoming inspection, in-process QC, final testing',
                    'OEM/ODM services: custom design, private-label branding, bespoke packaging',
                    'Monthly capacity: 100,000+ units across all product categories',
                  ].map((cap, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-blue-100">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <p className="text-slate-700 text-sm">{cap}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="/images/about/production-line.jpg"
                  alt="HousePlus production line"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">🏭 Ready to Partner with HousePlus?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether you are sourcing for retail distribution, private-label branding or large-scale project supply, the <strong>HousePlus</strong> team is ready to discuss your requirements. As a professional <strong>HousePlus</strong> manufacturer with 14+ years of experience, we deliver quality and reliability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                Get in Touch
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
