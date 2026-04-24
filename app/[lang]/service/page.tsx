import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return generateSEOMetadata({
    title: 'HousePlus Services — OEM/ODM, Private Label & Technical Support',
    description: 'HousePlus offers comprehensive OEM/ODM manufacturing, private-label branding, custom packaging and dedicated after-sales technical support for global wholesale buyers.',
    keywords: ['OEM', 'ODM', 'private label', 'custom manufacturing', 'technical support', 'wholesale services', 'HousePlus'],
    url: `/${lang}/service`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function ServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'OEM/ODM manufacturing, private-label branding and technical support services.',
    url: `https://www.houseplus-ch.com/${lang}/service`,
    lang,
    type: 'Organization',
  });

  const services = [
    {
      icon: '🏭',
      title: 'OEM Manufacturing',
      desc: 'Supply us with your product specifications, drawings or samples and we manufacture to your exact requirements. Our engineering team handles DFM review, tooling, prototyping and mass production.',
      points: ['Custom specifications & drawings accepted', 'Tooling and mould development', 'Prototype samples within 15–20 days', 'Mass production from MOQ 100 pcs'],
    },
    {
      icon: '🎨',
      title: 'ODM & Private Label',
      desc: 'Choose from our existing product portfolio and apply your own brand identity. We handle custom logo printing, colour variants, packaging design and compliance labelling for your target market.',
      points: ['Custom logo and colour options', 'Private-label packaging design', 'Retail-ready barcodes and labels', 'Market-specific compliance marking'],
    },
    {
      icon: '📦',
      title: 'Custom Packaging',
      desc: 'From retail gift boxes to bulk export cartons, our packaging team designs and produces solutions that protect your products and reinforce your brand at the point of sale.',
      points: ['Retail box, colour box, gift box', 'Bulk carton and pallet configuration', 'Insert cards, user manuals, accessories', 'Eco-friendly packaging options'],
    },
    {
      icon: '🔧',
      title: 'Technical Support',
      desc: 'Our after-sales team provides multi-channel technical assistance throughout the product lifecycle — from pre-shipment testing to in-market troubleshooting.',
      points: ['Pre-shipment inspection reports', 'CE/FCC/RoHS certification support', 'Warranty claim processing', 'Dedicated account manager'],
    },
    {
      icon: '🚢',
      title: 'Logistics & Export',
      desc: 'We coordinate end-to-end export logistics including customs documentation, freight forwarding and delivery tracking — available on FOB, CIF and DDP terms.',
      points: ['FOB, CIF, DDP trade terms', 'Sea, air and express courier options', 'Full export documentation', 'Real-time shipment tracking'],
    },
    {
      icon: '🌍',
      title: 'Market Compliance',
      desc: 'We support clients in navigating regulatory requirements for key markets. Our compliance team prepares technical files and liaises with accredited third-party laboratories.',
      points: ['CE marking (EU)', 'FCC authorisation (USA)', 'RoHS and REACH compliance', 'SASO and GCC certifications'],
    },
  ];

  const process = [
    { step: '01', title: 'Enquiry & Brief', desc: 'Share your product requirements, target market, MOQ and timeline. We respond with a preliminary quotation within 24 hours.' },
    { step: '02', title: 'Sample Development', desc: 'Our engineering team develops a prototype or pre-production sample for your approval. Typical lead time: 15–20 working days.' },
    { step: '03', title: 'Order Confirmation', desc: 'Once the sample is approved, we issue a proforma invoice and production schedule. A 30% deposit confirms the order.' },
    { step: '04', title: 'Production & QC', desc: 'Mass production begins with IPQC checkpoints at every stage. A pre-shipment inspection report is issued before goods leave the factory.' },
    { step: '05', title: 'Shipment & Delivery', desc: 'We arrange freight forwarding, prepare all export documents and provide tracking information until goods arrive at your destination.' },
    { step: '06', title: 'After-Sales Support', desc: 'Your dedicated account manager remains available for warranty claims, reorders and any technical queries throughout the product lifecycle.' },
  ];

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-5">
              🏭 HousePlus End-to-End B2B Services
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-5 tracking-tight">
              🏭 HousePlus Services Built for Wholesale Buyers
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              From OEM manufacturing and private-label branding to logistics coordination and after-sales support — <strong>HousePlus</strong> provides a complete service ecosystem for global wholesale partners. Choose <strong>HousePlus</strong> for professional, reliable services.
            </p>
          </div>
        </section>

        {/* Service Cards */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.title} className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:border-blue-200 transition-all">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-blue-500 font-bold flex-shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">🏭 How We Work Together with HousePlus</h2>
              <p className="text-slate-500 max-w-xl mx-auto">A straightforward, transparent <strong>HousePlus</strong> process from first enquiry to final delivery.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {process.map((s) => (
                <div key={s.step} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="text-3xl font-black text-blue-200 mb-3">{s.step}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why HousePlus */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">🏭 Why Buyers Choose HousePlus Services</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Single-Source Convenience', desc: 'Solar, appliances and electronics — one supplier, one relationship, one quality standard.' },
                    { title: 'Transparent Pricing', desc: 'Itemised quotations with no hidden fees. Volume discounts available for orders above 500 units.' },
                    { title: 'Fast Turnaround', desc: 'Standard orders ship within 20–35 days. Expedited production available for urgent requirements.' },
                    { title: 'Certification Ready', desc: 'All products ship with the certifications your market requires — CE, FCC, RoHS, ISO 9001.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                        <p className="text-slate-600 text-sm mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="HousePlus team collaboration"
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
            <h2 className="text-3xl font-black mb-4">🏭 Ready to Start Your HousePlus Project?</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Tell the <strong>HousePlus</strong> team about your product requirements and we will prepare a tailored quotation within 24 hours. Partner with <strong>HousePlus</strong> for professional manufacturing solutions.
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
