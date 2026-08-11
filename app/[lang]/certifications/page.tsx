import { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'HousePlus Certifications — CE, FCC, RoHS, ISO 9001',
    es: 'Certificaciones de HousePlus — CE, FCC, RoHS, ISO 9001',
    de: 'HousePlus Zertifizierungen — CE, FCC, RoHS, ISO 9001',
    fr: 'Certifications HousePlus — CE, FCC, RoHS, ISO 9001',
    ar: 'شهادات هاوس بلس — CE وFCC وRoHS وISO 9001',
  };

  const descriptions: Record<string, string> = {
    en: 'HousePlus holds CE, FCC, RoHS, ISO 9001, IEC and UN38.3 certifications for solar panels, inverters, batteries, appliances and electronics. Trusted by 441+ clients in 53+ countries.',
    es: 'HousePlus cuenta con certificaciones CE, FCC, RoHS, ISO 9001, IEC y UN38.3 para paneles solares, inversores, baterías, electrodomésticos y electrónica. Más de 441 clientes confían en nosotros.',
    de: 'HousePlus verfügt über CE-, FCC-, RoHS-, ISO 9001-, IEC- und UN38.3-Zertifizierungen für Solarmodule, Wechselrichter, Batterien, Haushaltsgeräte und Elektronik. 441+ Kunden in 53+ Ländern.',
    fr: 'HousePlus détient les certifications CE, FCC, RoHS, ISO 9001, IEC et UN38.3 pour panneaux solaires, onduleurs, batteries, électroménager et électronique. 441+ clients dans 53+ pays.',
    ar: 'هاوس بلس حاصلة على شهادات CE وFCC وRoHS وISO 9001 وIEC وUN38.3 للألواح الشمسية والمحولات والبطاريات والأجهزة المنزلية والإلكترونيات. أكثر من ٤٤١ عميل في ٥٣ دولة.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles['en'],
    description: descriptions[lang] || descriptions['en'],
    keywords: ['CE certification', 'FCC', 'RoHS', 'ISO 9001', 'IEC', 'UN38.3', 'HousePlus certifications', 'wholesale', 'factory certifications'],
    url: `/${lang}/certifications`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function CertificationsPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'CE, FCC, RoHS, ISO 9001, IEC and UN38.3 certified manufacturer of solar panels, inverters, lithium batteries, air fryers, induction cooktops, TWS earphones and smart watches from a 20,000 m² factory serving 53+ countries and 441+ wholesale clients since 2010.',
    url: `https://www.houseplus-ch.com/${lang}/certifications`,
    lang,
    type: 'Organization',
  });

  const certifications = [
    {
      icon: 'CE',
      title: 'CE Marking — European Market Access',
      desc: 'CE certification confirms HousePlus products meet EU safety, health and environmental requirements under the New Approach Directives.',
      markets: 'European Union (EU), European Economic Area (EEA), Turkey, Switzerland',
      standards: 'EN 60335 (household appliances), EN 61215 (solar modules), EN 55032 (EMC), EN 61000 (immunity)',
    },
    {
      icon: 'FCC',
      title: 'FCC Authorization — United States',
      desc: 'FCC certification validates electromagnetic compatibility for the North American market, ensuring devices do not cause harmful interference.',
      markets: 'United States, Canada (ISED), Mexico (IFT)',
      standards: 'FCC Part 15 (radiated & conducted emissions), FCC Part 18 (industrial equipment), ANSI C63.4 (measurement procedures)',
    },
    {
      icon: 'RoHS',
      title: 'RoHS Compliance — Environmental Safety',
      desc: 'RoHS restricts hazardous substances in electrical and electronic equipment, limiting lead, cadmium, mercury and other restricted materials.',
      markets: 'European Union, China, South Korea, United Arab Emirates, Saudi Arabia',
      standards: 'RoHS Directive 2011/65/EU, IEC 62321 (testing methods), XRF material verification at incoming inspection',
    },
    {
      icon: 'ISO',
      title: 'ISO 9001:2015 — Quality Management',
      desc: 'ISO 9001 certifies our quality management system covering design, procurement, production, inspection and continuous improvement.',
      markets: 'Global — recognized in 170+ countries',
      standards: 'ISO 9001:2015 (QMS), ISO 19011 (auditing), internal SOP-001 to SOP-247 covering all production stages',
    },
    {
      icon: 'IEC',
      title: 'IEC Standards — International Electrical Safety',
      desc: 'IEC certification covers international electrical safety benchmarks for photovoltaic and electronic products.',
      markets: 'Global — especially Middle East, Africa, Southeast Asia, Australia',
      standards: 'IEC 61215 (crystalline silicon PV modules), IEC 61683 (PV system performance), IEC 62109 (safety of power converters)',
    },
    {
      icon: 'UN38.3',
      title: 'UN38.3 — Battery Transport Safety',
      desc: 'UN38.3 certifies lithium battery transport safety for air, sea and road shipment under UN dangerous goods regulations.',
      markets: 'Global — mandatory for all lithium battery shipments via air (IATA DGR) and sea (IMDG Code)',
      standards: 'UN Manual of Tests and Criteria, Section 38.3 (altitude simulation, thermal, vibration, shock, short circuit, crush, forced discharge)',
    },
  ];

  const stats = [
    { value: '6', label: 'Active Certifications' },
    { value: '53+', label: 'Countries Served' },
    { value: '441+', label: 'Wholesale Clients' },
    { value: '2010', label: 'Founded Year' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://www.houseplus-ch.com/${lang}` },
    { name: 'Certifications', url: `https://www.houseplus-ch.com/${lang}/certifications` },
  ]);

  return (
    <>
      <SEOHead schemas={[organizationSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} slug="certifications" />

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">
                ISO 9001 Certified
              </span>
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full">
                CE / FCC / RoHS
              </span>
              <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest rounded-full">
                IEC & UN38.3
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">
              HousePlus Certifications — CE, FCC, RoHS, ISO 9001, IEC, UN38.3
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              <strong>HousePlus</strong> holds CE, FCC, RoHS, ISO 9001, IEC and UN38.3 certifications covering solar panels, inverters, lithium batteries, air fryers, induction cooktops, TWS earphones and smart watches. Our 20,000 m² ISO 9001 factory has served 53+ countries and 441+ wholesale clients since 2010. Every product ships with complete compliance documentation for seamless import clearance.
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

        {/* Certification Cards */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">HousePlus Certification Portfolio</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Every <strong>HousePlus</strong> product ships with the certification documentation your market requires.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((c) => (
                <div key={c.title} className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:border-blue-200 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-black mb-4">
                    {c.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{c.desc}</p>
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Applicable Markets</p>
                      <p className="text-sm text-slate-700">{c.markets}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Testing Standards</p>
                      <p className="text-sm text-slate-700">{c.standards}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Process */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">How HousePlus Maintains Certification Integrity</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Supplier Material Verification', desc: 'Incoming raw materials are screened with XRF analysers. 12% of lots are randomly sampled for RoHS compliance before release to production.' },
                    { title: 'In-Process Testing', desc: '4 QC checkpoints monitor solder joint strength, insulation resistance and earth continuity. Defect rates are logged per workstation hourly.' },
                    { title: 'Final Certification Audit', desc: '100% of finished goods undergo functional testing. Solar inverters are burn-in tested for 4 hours; batteries cycle-tested for 50 charge cycles.' },
                    { title: 'Document Control', desc: 'Test reports, certificates of conformity and packing declarations are archived for 5 years per ISO 9001 clause 7.5. Clients receive digital copies within 24 hours of request.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                        <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Certification Coverage by Market</h3>
                <div className="space-y-4">
                  {[
                    { market: 'European Union', certs: 'CE, RoHS, REACH', share: '38% export share' },
                    { market: 'North America', certs: 'FCC, UL (on request)', share: '22% export share' },
                    { market: 'Middle East', certs: 'SASO, GCC, CE', share: '18% export share' },
                    { market: 'Africa', certs: 'CE, SONCAP', share: '15% export share' },
                    { market: 'Southeast Asia', certs: 'IEC, SNI (on request)', share: '7% export share' },
                  ].map((m) => (
                    <div key={m.market} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{m.market}</p>
                        <p className="text-slate-500 text-xs">{m.certs}</p>
                      </div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{m.share}</span>
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
            <h2 className="text-3xl font-black mb-4">Need Certification Documentation?</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              <strong>HousePlus</strong> provides complete certification files — test reports, certificates of conformity and compliance declarations — for every order. Contact our team for sample documentation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5">
                Request Certification Pack
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-700 text-white border border-blue-500 font-bold rounded-xl hover:bg-blue-800 transition-all hover:-translate-y-0.5">
                Browse Certified Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
