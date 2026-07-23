import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'HousePlus Case Studies — 441+ Clients in 53+ Countries',
    es: 'Casos de Éxito de HousePlus — 441+ Clientes en 53 Países',
    de: 'HousePlus Referenzkunden — 441+ Kunden in 53+ Ländern',
    fr: 'Références HousePlus — 441+ Clients dans 53 Pays',
    ar: 'دراسات حالة هاوس بلس — أكثر من ٤٤١ عميل في ٥٣ دولة',
  };

  const descriptions: Record<string, string> = {
    en: 'Discover how HousePlus serves 441+ wholesale clients across 53+ countries with solar systems, appliances and electronics. Real partnerships, proven results.',
    es: 'Descubra cómo HousePlus atiende a más de 441 clientes mayoristas en 53 países con sistemas solares, electrodomésticos y electrónica. Alianzas reales, resultados probados.',
    de: 'Erfahren Sie, wie HousePlus 441+ Großhandelskunden in 53+ Ländern mit Solaranlagen, Haushaltsgeräten und Elektronik beliefert. Echte Partnerschaften, messbare Erfolge.',
    fr: 'Découvrez comment HousePlus accompagne plus de 441 clients grossistes dans 53 pays avec des systèmes solaires, électroménager et électronique. Des partenariats concrets, des résultats prouvés.',
    ar: 'اكتشف كيف تخدم هاوس بلس أكثر من ٤٤١ عميل جملة في ٥٣ دولة بأنظمة الطاقة الشمسية والأجهزة المنزلية والإلكترونيات. شراكات حقيقية ونتائج ملموسة.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles['en'],
    description: descriptions[lang] || descriptions['en'],
    keywords: ['HousePlus case studies', 'wholesale clients', 'solar distributor', 'appliance importer', '3C electronics', 'B2B manufacturing', 'global export'],
    url: `/${lang}/case-studies`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function CaseStudiesPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'HousePlus has served 441+ wholesale clients across 53+ countries since 2010, delivering solar energy systems, home appliances and 3C electronics with 12-month warranty and 20–35 day lead time from a 20,000 m² factory.',
    url: `https://www.houseplus-ch.com/${lang}/case-studies`,
    lang,
    type: 'Organization',
  });

  const stats = [
    { value: '441+', label: 'Wholesale Clients' },
    { value: '53+', label: 'Countries Served' },
    { value: '24', label: 'Month Warranty' },
    { value: '2010', label: 'Founded Year' },
  ];

  const caseStudies = [
    {
      region: 'Europe',
      icon: '☀️',
      clientType: 'Solar Energy Wholesaler',
      location: 'Germany & Poland',
      volume: '8,000–12,000 pcs annually',
      productMix: 'Solar panels (400W & 550W), MPPT inverters, LiFePO4 batteries, mounting systems',
      partnership: '6 years (since 2019)',
      keyResults: [
        'Achieved 23% cost reduction versus previous Asian supplier',
        'Zero customs clearance issues with full CE & IEC documentation',
        'On-time delivery rate: 97.3% over 24 consecutive orders',
        'Re-order rate: 4.2 times per year',
      ],
      color: 'bg-amber-50 border-amber-100',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      region: 'Middle East',
      icon: '🏠',
      clientType: 'Home Appliance Importer',
      location: 'UAE & Saudi Arabia',
      volume: '5,000–8,000 pcs annually',
      productMix: 'Air fryers, induction cooktops, electric kettles, rice cookers',
      partnership: '4 years (since 2021)',
      keyResults: [
        'SASO and GCC certification support enabled market entry',
        'Custom Arabic-language packaging and user manuals',
        '30-day DDP delivery to Dubai warehouse',
        'Annual growth: 35% year-over-year in order volume',
      ],
      color: 'bg-blue-50 border-blue-100',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      region: 'Africa',
      icon: '📱',
      clientType: '3C Electronics Distributor',
      location: 'Nigeria & Kenya',
      volume: '15,000–20,000 pcs annually',
      productMix: 'TWS earphones, portable power banks, LED desk lamps, USB cables',
      partnership: '5 years (since 2020)',
      keyResults: [
        'SONCAP and CE documentation provided for all shipments',
        'Custom colour variants matching local market preferences',
        'Mixed-container strategy reduced freight cost by 18%',
        'Defect rate below 0.4% — lowest in client’s supplier portfolio',
      ],
      color: 'bg-green-50 border-green-100',
      badgeColor: 'bg-green-100 text-green-700',
    },
    {
      region: 'South America',
      icon: '🌍',
      clientType: 'Mixed-Product Procurement Client',
      location: 'Brazil & Colombia',
      volume: '6,000–10,000 pcs annually',
      productMix: 'Solar street lights, blenders, smart watches, portable fans',
      partnership: '3 years (since 2022)',
      keyResults: [
        'One-stop sourcing across 3 product categories reduced vendor count from 7 to 1',
        'INMETRO compliance support for appliance lines',
        'Custom 220V/60Hz configurations for Brazilian grid',
        'Payment terms: 30% deposit + 70% CAD via LC — fully honoured',
      ],
      color: 'bg-rose-50 border-rose-100',
      badgeColor: 'bg-rose-100 text-rose-700',
    },
  ];

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">
                441+ Wholesale Clients
              </span>
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full">
                53+ Countries
              </span>
              <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest rounded-full">
                Since 2010
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">
              HousePlus Case Studies — 441+ Wholesale Clients in 53+ Countries
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              <strong>HousePlus</strong> has served 441+ wholesale clients across 53+ countries since 2010, delivering solar energy systems, home appliances and 3C electronics with 12-month warranty and 20–35 day lead time from a 20,000 m² factory. Explore how global buyers partner with <strong>HousePlus</strong> for long-term growth.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-14 bg-blue-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-black mb-2">{stat.value}</p>
                  <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">HousePlus Client Success Stories</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Real partnerships, measurable results — how <strong>HousePlus</strong> powers wholesale growth across four continents.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((cs) => (
                <div key={cs.region} className={`bg-white border rounded-2xl p-8 hover:shadow-lg transition-all ${cs.color}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-3xl">{cs.icon}</div>
                    <div>
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${cs.badgeColor}`}>
                        {cs.region}
                      </span>
                      <p className="text-sm text-slate-500 mt-1">{cs.location}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{cs.clientType}</h3>
                  <p className="text-sm text-slate-500 mb-6">Partnership: {cs.partnership}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/70 rounded-xl p-4 border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Annual Volume</p>
                      <p className="text-sm font-bold text-slate-900">{cs.volume}</p>
                    </div>
                    <div className="bg-white/70 rounded-xl p-4 border border-slate-100">
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Product Mix</p>
                      <p className="text-sm font-bold text-slate-900">{cs.productMix}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Key Results</p>
                    <ul className="space-y-2">
                      {cs.keyResults.map((result, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-blue-500 font-bold flex-shrink-0">✓</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner with HousePlus */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Why Wholesale Buyers Trust HousePlus</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Consistent Quality', desc: 'ISO 9001-aligned QC with 4 in-process checkpoints and 100% final functional test.' },
                    { title: 'Reliable Lead Times', desc: 'Standard orders ship within 20–35 days. 97%+ on-time delivery rate tracked over 6 years.' },
                    { title: 'Full Certification Support', desc: 'CE, FCC, RoHS, IEC, UN38.3 and market-specific documentation (SASO, SONCAP, INMETRO) provided.' },
                    { title: 'Flexible Terms', desc: 'MOQ from 100 pcs, volume discounts at 200/500/1000+ tiers, and multiple payment options.' },
                    { title: 'Dedicated Account Management', desc: 'Each client receives a single point of contact for quotations, production updates and after-sales support.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                        <p className="text-slate-600 text-sm mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://images.houseplus-ch.com/site/team-working-together.jpg"
                  alt="HousePlus global wholesale partnerships"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">Join 441+ Wholesale Clients Worldwide</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Whether you are a solar distributor, appliance importer or electronics retailer — <strong>HousePlus</strong> has the production capacity, certification support and export experience to grow your business. Get a tailored quotation within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5">
                Request a Quote
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-700 text-white border border-blue-500 font-bold rounded-xl hover:bg-blue-800 transition-all hover:-translate-y-0.5">
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
