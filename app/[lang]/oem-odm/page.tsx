import { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'OEM/ODM Manufacturing — Private Label from HousePlus',
    es: 'Fabricación OEM/ODM — Marca Privada con HousePlus',
    de: 'OEM/ODM Fertigung — Private Label von HousePlus',
    fr: 'Fabrication OEM/ODM — Marque Privée par HousePlus',
    ar: 'تصنيع OEM/ODM — العلامات الخاصة من هاوس بلس',
  };

  const descriptions: Record<string, string> = {
    en: 'HousePlus OEM/ODM services: custom manufacturing, private label branding, bespoke packaging and mould development. MOQ from 100 pcs with 20–35 day lead time. Solar, appliances and electronics.',
    es: 'Servicios OEM/ODM de HousePlus: fabricación a medida, marca privada, empaque personalizado y desarrollo de moldes. MOQ desde 100 unidades, entrega en 20–35 días.',
    de: 'HousePlus OEM/ODM Services: Maßanfertigung, Private Label, individuelle Verpackung und Formenentwicklung. MOQ ab 100 Stück, 20–35 Tage Lieferzeit für Solar, Geräte und Elektronik.',
    fr: 'Services OEM/ODM HousePlus : fabrication sur mesure, marque privée, emballage personnalisé et développement de moules. MOQ à partir de 100 pièces, délai 20–35 jours.',
    ar: 'خدمات OEM/ODM من هاوس بلس: تصنيع مخصص وملصقات تجارية خاصة وتعبئة حسب الطلب وتطوير القوالب. الحد الأدنى للطلب ١٠٠ قطعة مع فترة تسليم ٢٠-٣٥ يوماً.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles['en'],
    description: descriptions[lang] || descriptions['en'],
    keywords: ['OEM', 'ODM', 'private label', 'custom manufacturing', 'MOQ 100', 'HousePlus OEM', 'wholesale customization', 'Pantone color', 'custom packaging', 'mould development'],
    url: `/${lang}/oem-odm`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function OemOdmPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'OEM/ODM manufacturing for solar panels, power stations, air fryers, induction cooktops, TWS earphones and smart watches. MOQ from 100 pcs, 20–35 day lead time and 12-month warranty from a 20,000 m² ISO 9001 factory.',
    url: `https://www.houseplus-ch.com/${lang}/oem-odm`,
    lang,
    type: 'Organization',
  });

  const manufacturingServiceSchema = generateServiceSchema({
    name: 'HousePlus OEM Manufacturing Service',
    description: 'Custom manufacturing from samples or drawings with tooling development, prototype validation and mass production. MOQ from 100 pcs with 20–35 day lead time.',
    url: `https://www.houseplus-ch.com/${lang}/oem-odm`,
    serviceType: 'ManufacturingService',
    areaServed: ['Worldwide', 'Europe', 'Africa', 'Middle East', 'Southeast Asia', 'North America', 'South America'],
    availableChannel: ['Online', 'Phone', 'Email', 'WhatsApp'],
  });

  const designServiceSchema = generateServiceSchema({
    name: 'HousePlus ODM & Private Label Design Service',
    description: 'Select from existing product portfolio and apply your brand. Custom logo, Pantone colour matching, packaging design and user manual localisation with 15–20 day sample lead time.',
    url: `https://www.houseplus-ch.com/${lang}/oem-odm`,
    serviceType: 'DesignService',
    areaServed: ['Worldwide', 'Europe', 'Africa', 'Middle East', 'Southeast Asia', 'North America', 'South America'],
    availableChannel: ['Online', 'Phone', 'Email', 'WhatsApp'],
  });

  const oemServices = [
    {
      icon: '🏭',
      title: 'OEM Manufacturing Process',
      desc: 'Submit product samples, drawings or technical specifications. HousePlus engineering reviews DFM feasibility, develops tooling and delivers prototypes within 20 days.',
      points: ['Sample replication or drawing-based development', 'In-house tooling and mould workshop', 'Prototype validation with 3 revisions included', 'Mass production from MOQ 100 pcs'],
    },
    {
      icon: '🎨',
      title: 'ODM Private Label Service',
      desc: 'Choose from 200+ existing HousePlus models. Apply your logo, custom Pantone colours, retail packaging and market-specific compliance labelling.',
      points: ['200+ ready-to-brand product models', 'Logo silk-screen, UV print or laser engraving', 'Pantone colour matching for body and accessories', 'Retail packaging with your brand identity'],
    },
    {
      icon: '📦',
      title: 'Custom Packaging Solutions',
      desc: 'HousePlus packaging team designs retail boxes, gift sets and bulk cartons. Artwork proofs are provided within 48 hours of design confirmation.',
      points: ['Retail box, colour box, blister pack', 'User manual and insert card design', 'Barcode and compliance label printing', 'Eco-friendly Kraft and corrugated options'],
    },
    {
      icon: '⚙️',
      title: 'Mould Development & Modification',
      desc: 'Client-funded tooling remains your property. HousePlus stores moulds securely and maintains them free of charge for 3 years. Engineering change orders quoted within 72 hours.',
      points: ['Voltage and plug configuration changes', 'Firmware language localisation', 'Accessory bundle customisation', 'Regional compliance marking update'],
    },
  ];

  const process = [
    { step: '01', title: 'Enquiry & DFM Review', desc: 'Share samples, drawings or selected model numbers. HousePlus engineers assess feasibility and provide quotation within 24 hours.' },
    { step: '02', title: 'Sample Development', desc: 'Prototype or pre-production sample is manufactured. Typical lead time: 15–20 days for ODM, 20–25 days for OEM with new tooling.' },
    { step: '03', title: 'Sample Approval', desc: 'Client evaluates sample and requests up to 3 revisions at no charge. Final sign-off triggers production order confirmation.' },
    { step: '04', title: 'Order & Deposit', desc: 'Proforma invoice issued with production schedule. 30% deposit confirms order entry into HousePlus ERP system.' },
    { step: '05', title: 'Production & QC', desc: 'Mass production with IPQC at 4 checkpoints. Pre-shipment inspection report and photos are shared before dispatch.' },
    { step: '06', title: 'Shipment & Support', desc: 'Balance payment triggers shipment. HousePlus provides 12-month warranty, spare parts support and dedicated account management.' },
  ];

  const moqTiers = [
    { tier: '100 pcs', discount: 'Standard MOQ', products: '3C electronics, LED lighting, small appliances', sampleLead: '15–20 days' },
    { tier: '200 pcs', discount: '3% volume discount', products: 'Home appliances, solar accessories, power banks', sampleLead: '18–22 days' },
    { tier: '500 pcs', discount: '5% volume discount', products: 'Solar panels, inverters, portable power stations', sampleLead: '20–25 days' },
    { tier: '1000+ pcs', discount: '7–10% volume discount', products: 'Full product lines, mixed container loads', sampleLead: '20–25 days' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://www.houseplus-ch.com/${lang}` },
    { name: 'OEM/ODM', url: `https://www.houseplus-ch.com/${lang}/oem-odm` },
  ]);

  return (
    <>
      <SEOHead schemas={[organizationSchema, manufacturingServiceSchema, designServiceSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} slug="oem-odm" />

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">
                  MOQ from 100 pcs
                </span>
                <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full">
                  20–35 Day Lead Time
                </span>
                <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest rounded-full">
                  12-Month Warranty
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">
                OEM/ODM Manufacturing — Private Label & Custom Products from HousePlus
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                <strong>HousePlus</strong> OEM/ODM services cover solar energy systems, home appliances and 3C electronics. MOQ from 100 pcs with 20–35 day lead time from a 20,000 m² ISO 9001 factory serving 441+ wholesale clients across 53+ countries since 2010. Custom packaging, Pantone colours and mould development — all under one roof.
              </p>
            </div>
          </div>
        </section>

        {/* Service Cards */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {oemServices.map((s) => (
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

        {/* 6-Step Process */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">HousePlus Custom Manufacturing Process</h2>
              <p className="text-slate-500 max-w-xl mx-auto">A transparent 6-step workflow from first enquiry to after-sales support.</p>
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

        {/* MOQ Tiers */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">MOQ Gradients & Volume Discounts</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Minimum order quantities and corresponding discounts for <strong>HousePlus</strong> OEM and ODM services.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="text-left px-6 py-4 font-bold">MOQ Tier</th>
                      <th className="text-left px-6 py-4 font-bold">Volume Discount</th>
                      <th className="text-left px-6 py-4 font-bold">Typical Products</th>
                      <th className="text-left px-6 py-4 font-bold">Sample Lead Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moqTiers.map((row, i) => (
                      <tr key={row.tier} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-6 py-4 font-bold text-slate-900">{row.tier}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">{row.discount}</td>
                        <td className="px-6 py-4 text-slate-600">{row.products}</td>
                        <td className="px-6 py-4 text-slate-600">{row.sampleLead}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Customisation Options */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">What You Can Customise with HousePlus</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Product Colour & Finish', desc: 'Match any Pantone code for body shell, buttons and accessories. Matte, gloss and metallic finishes available.' },
                    { title: 'Logo & Branding', desc: 'Silk-screen, UV print, laser engraving or embossed logo on product body, packaging and accessories.' },
                    { title: 'Custom Packaging', desc: 'Retail gift boxes, colour boxes, blister packs and bulk cartons with your brand artwork and barcode labels.' },
                    { title: 'User Manual & Inserts', desc: 'Multi-language user manuals, warranty cards and insert cards designed to your brand guidelines.' },
                    { title: 'Voltage & Plug Types', desc: '110V/220V/240V configurations with US, EU, UK, AU and universal plug options.' },
                    { title: 'Firmware & Language', desc: 'Custom boot logo, localised UI language and feature-set adjustments for regional requirements.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl border border-blue-100">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                        <p className="text-slate-600 text-sm mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Sample & Production Timeline</h3>
                <div className="space-y-5">
                  {[
                    { stage: 'ODM Sample', time: '15–20 days', note: 'Based on existing model with logo/colour changes' },
                    { stage: 'OEM Sample (existing tooling)', time: '18–22 days', note: 'Using client-supplied drawings or samples' },
                    { stage: 'OEM Sample (new tooling)', time: '20–25 days', note: 'Includes mould design and first article inspection' },
                    { stage: 'Mass Production (standard)', time: '20–35 days', note: 'After sample approval and 30% deposit receipt' },
                    { stage: 'Mass Production (large volume)', time: '35–45 days', note: 'Orders above 5,000 pcs or mixed containers' },
                  ].map((t) => (
                    <div key={t.stage} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{t.stage}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{t.note}</p>
                      </div>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">{t.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-4">Start Your HousePlus OEM/ODM Project</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Tell <strong>HousePlus</strong> about your product requirements and we will prepare a tailored quotation with sample timeline within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5">
                Request OEM/ODM Quote
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-700 text-white border border-blue-500 font-bold rounded-xl hover:bg-blue-800 transition-all hover:-translate-y-0.5">
                Browse ODM Catalogue
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
