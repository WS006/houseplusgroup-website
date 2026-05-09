import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return generateSEOMetadata({
    title: 'HousePlus Factory — 20,000 m² Manufacturing Facility in Guangdong',
    description: 'Tour the HousePlus manufacturing facility: dedicated production lines for solar, home appliances and 3C electronics, in-house quality lab, and monthly capacity of 100,000+ units.',
    keywords: ['factory', 'manufacturing', 'production line', 'quality control', 'OEM ODM', 'Guangdong', 'HousePlus'],
    url: `/${lang}/factory`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function FactoryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Vertically integrated manufacturer with 20,000 m² production facility in Guangdong, China.',
    url: `https://www.houseplus-ch.com/${lang}/factory`,
    lang,
    type: 'Organization',
  });

  const facilities = [
    {
      name: 'Solar Energy Production Line',
      icon: '☀️',
      desc: 'Dedicated line for solar panel lamination, inverter assembly and portable power station manufacturing. Capacity: 50,000+ units per month. Equipped with automated cell-string welding and EL imaging inspection.',
    },
    {
      name: 'Home Appliance Assembly',
      icon: '🏠',
      desc: 'Modern assembly lines for air fryers, induction cooktops, kettles and toasters. Automated torque control, 100% electrical safety testing and drop-test simulation for every batch.',
    },
    {
      name: '3C Electronics Workshop',
      icon: '📱',
      desc: 'SMT and wave-soldering lines for TWS earphones, smart watches and portable storage devices. ESD-protected workstations, automated optical inspection (AOI) and burn-in testing.',
    },
    {
      name: 'Quality Assurance Laboratory',
      icon: '🔬',
      desc: 'Fully equipped QA lab with environmental chambers (temperature, humidity, vibration), electrical safety testers, EMC pre-compliance equipment and third-party audit support.',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Design & Engineering', desc: 'Our R&D team translates client briefs into detailed product specifications, 3D models and prototype samples within 15–20 working days.' },
    { step: '02', title: 'Material Procurement', desc: 'Raw materials and components are sourced exclusively from audited, certified suppliers. Incoming quality inspection (IQC) is performed on every delivery.' },
    { step: '03', title: 'Production', desc: 'Manufacturing follows ISO 9001-aligned work instructions. In-process quality control (IPQC) checkpoints are built into every assembly stage.' },
    { step: '04', title: 'Quality Testing', desc: '100% finished-goods inspection covers appearance, function, safety and packaging integrity before any unit is cleared for shipment.' },
    { step: '05', title: 'Packaging & Labelling', desc: 'Products are packed in custom or standard cartons with client-specified branding, barcodes and compliance labels for the target market.' },
    { step: '06', title: 'Logistics & Export', desc: 'We coordinate FOB, CIF and DDP shipments via sea, air or express courier, with full documentation including CO, packing list and commercial invoice.' },
  ];

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-800 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    🏭 HousePlus Factory
                  </span>
                  <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    Guangdong, China
                  </span>
                  <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    20,000 m²
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
                  🏭 Where HousePlus Products Are Made
                </h1>
                <p className="text-slate-300 leading-relaxed text-lg mb-6">
                  The <strong>HousePlus</strong> vertically integrated factory in Guangdong houses four dedicated production divisions, an in-house tooling workshop and a fully equipped quality laboratory — giving <strong>HousePlus</strong> complete control from raw material to finished product. This is the <strong>HousePlus</strong> advantage.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '20,000 m²', label: 'Factory Area' },
                    { value: '500+', label: 'Employees' },
                    { value: '100K+', label: 'Units/Month' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-xl font-black">{s.value}</p>
                      <p className="text-slate-400 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                  alt="HousePlus main production line"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-12 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { src: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80', alt: 'Assembly line — precision manufacturing' },
                { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', alt: 'Quality control laboratory' },
                { src: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=800&q=80', alt: 'Automated production equipment' },
              ].map((img) => (
                <div key={img.src} className="relative h-60 rounded-2xl overflow-hidden shadow-md border border-slate-100">
                  <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Production Facilities */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">🏭 HousePlus Production Facilities</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Four specialised <strong>HousePlus</strong> divisions, each optimised for its product category.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((f) => (
                <div key={f.name} className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{f.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Process */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">🏭 HousePlus Manufacturing Process</h2>
              <p className="text-slate-500 max-w-xl mx-auto">From concept to delivery — the transparent <strong>HousePlus</strong> workflow.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((s) => (
                <div key={s.step} className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                  <div className="text-3xl font-black text-blue-200 mb-3">{s.step}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
                  alt="HousePlus quality assurance lab"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">🏭 HousePlus Quality Assurance</h2>
                <div className="space-y-4">
                  {[
                    'ISO 9001:2015 certified quality management system',
                    '100% finished-goods inspection before shipment',
                    'Environmental chamber testing: −20°C to +70°C, 95% RH',
                    'Electrical safety testing: hi-pot, insulation resistance, leakage current',
                    'EMC pre-compliance screening for CE and FCC markets',
                    'Third-party lab certification support (SGS, TÜV, Intertek)',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <p className="text-slate-700 text-sm">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">🏭 Interested in a HousePlus Factory Audit?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              <strong>HousePlus</strong> welcomes on-site visits and third-party factory audits. Contact the <strong>HousePlus</strong> team to arrange a tour or request our latest audit reports.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                Contact Us
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                View Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
