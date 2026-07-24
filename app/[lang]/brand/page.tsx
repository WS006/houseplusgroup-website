import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema-generator';

export const dynamic = 'force-static';
export const dynamicParams = false;

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

const titles: Record<string, string> = {
  en: 'HousePlus Group — Global Wholesale Manufacturer Brand',
  es: 'HousePlus Group — Marca de Fabricante Mayorista Global',
  de: 'HousePlus Group — Globale Großhandelsmarkenhersteller',
  fr: 'HousePlus Group — Marque de Fabricant Grossiste Mondial',
  ar: 'مجموعة هاوس بلس — علامة تصنيعية تجارية عالمية',
};

const descriptions: Record<string, string> = {
  en: 'Discover HousePlus Group, a vertically integrated manufacturer of solar energy systems, home appliances and 3C electronics. Founded in 2010, ISO 9001 certified, serving 441+ wholesale clients in 53+ countries.',
  es: 'Descubra HousePlus Group, un fabricante integrado de sistemas de energía solar, electrodomésticos y electrónica 3C. Fundado en 2010, certificado ISO 9001, sirviendo a más de 441 clientes mayoristas en 53+ países.',
  de: 'Entdecken Sie HousePlus Group, einen vertikal integrierten Hersteller von Solar-Energiesystemen, Haushaltsgeräten und 3C-Elektronik. Gegründet 2010, ISO 9001-zertifiziert, 441+ Großhandelskunden in 53+ Ländern.',
  fr: 'Découvrez HousePlus Group, un fabricant intégré de systèmes d\'énergie solaire, d\'appareils électroménagers et d\'électronique 3C. Fondé en 2010, certifié ISO 9001, plus de 441 clients grossistes dans 53+ pays.',
  ar: 'اكتشف مجموعة هاوس بلس، شركة تصنيع متكاملة لأنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C. تأسست عام 2010، حاصلة على شهادة ISO 9001، تخدم أكثر من 441 عميل جملة في أكثر من 53 دولة.',
};

const heroHeadlines: Record<string, string> = {
  en: 'HousePlus Group — Built for Global Wholesale',
  es: 'HousePlus Group — Construido para el Mayorista Global',
  de: 'HousePlus Group — Gebaut für den Globalen Großhandel',
  fr: 'HousePlus Group — Conçu pour le Commerce de Gros Mondial',
  ar: 'مجموعة هاوس بلس — مصممة للجملة العالمية',
};

const heroSubtitles: Record<string, string> = {
  en: 'A vertically integrated manufacturing brand trusted by 441+ wholesale buyers across 53+ countries since 2010.',
  es: 'Una marca de fabricación integrada de confianza de más de 441 compradores mayoristas en 53+ países desde 2010.',
  de: 'Eine vertrauenswürdige, vertikal integrierte Fertigungsmarke für 441+ Großhandelskäufer in 53+ Ländern seit 2010.',
  fr: 'Une marque de fabrication intégrée de confiance pour plus de 441 acheteurs en gros dans 53+ pays depuis 2010.',
  ar: 'علامة تصنيعية متكاملة موثوقة من أكثر من 441 مشتري جملة في أكثر من 53 دولة منذ عام 2010.',
};

const sectionTitles: Record<string, Record<string, string>> = {
  en: {
    story: 'The HousePlus Group Story',
    values: 'What HousePlus Group Stands For',
    capabilities: 'Manufacturing Capabilities',
    global: 'Global Reach & Certifications',
    cta: 'Partner with HousePlus Group',
  },
  es: {
    story: 'La Historia de HousePlus Group',
    values: 'Los Valores de HousePlus Group',
    capabilities: 'Capacidades de Fabricación',
    global: 'Alcance Global y Certificaciones',
    cta: 'Asóciese con HousePlus Group',
  },
  de: {
    story: 'Die Geschichte von HousePlus Group',
    values: 'Wofür HousePlus Group Steht',
    capabilities: 'Fertigungskapazitäten',
    global: 'Globale Reichweite & Zertifizierungen',
    cta: 'Partner von HousePlus Group Werden',
  },
  fr: {
    story: 'L\'Histoire de HousePlus Group',
    values: 'Les Valeurs de HousePlus Group',
    capabilities: 'Capacités de Fabrication',
    global: 'Rayonnement Mondial et Certifications',
    cta: 'Devenez Partenaire de HousePlus Group',
  },
  ar: {
    story: 'قصة مجموعة هاوس بلس',
    values: 'ما تمثله مجموعة هاوس بلس',
    capabilities: 'القدرات التصنيعية',
    global: 'الانتشار العالمي والشهادات',
    cta: 'كن شريكًا لمجموعة هاوس بلس',
  },
};

const valueItems: Record<string, Array<{ title: string; desc: string }>> = {
  en: [
    { title: 'Quality First', desc: 'Every HousePlus Group product passes multi-stage inspections before leaving our ISO 9001 certified factory.' },
    { title: 'B2B Partnership', desc: 'We treat every wholesale buyer as a long-term partner with dedicated account managers and flexible MOQ.' },
    { title: 'Global Compliance', desc: 'CE, FCC, RoHS and IEC certifications ensure HousePlus Group products meet international market standards.' },
    { title: 'Sustainable Innovation', desc: 'Over 8% of annual revenue is reinvested into R&D for energy-efficient solar and appliance solutions.' },
  ],
  es: [
    { title: 'Calidad Primero', desc: 'Cada producto de HousePlus Group pasa inspecciones de varias etapas antes de salir de nuestra fábrica certificada ISO 9001.' },
    { title: 'Asociación B2B', desc: 'Tratamos a cada comprador mayorista como un socio a largo plazo con gerentes de cuenta dedicados y MOQ flexibles.' },
    { title: 'Cumplimiento Global', desc: 'Las certificaciones CE, FCC, RoHS e IEC garantizan que los productos de HousePlus Group cumplan con las normas del mercado internacional.' },
    { title: 'Innovación Sostenible', desc: 'Más del 8% de los ingresos anuales se reinvierten en I+D para soluciones solares y de electrodomésticos eficientes.' },
  ],
  de: [
    { title: 'Qualität zuerst', desc: 'Jedes HousePlus Group-Produkt durchläuft mehrstufige Inspektionen, bevor es unser ISO 9001-zertifiziertes Werk verlässt.' },
    { title: 'B2B-Partnerschaft', desc: 'Wir behandeln jeden Großhandelskäufer als langfristigen Partner mit dedizierten Account Managern und flexiblem MOQ.' },
    { title: 'Globale Compliance', desc: 'CE-, FCC-, RoHS- und IEC-Zertifizierungen stellen sicher, dass HousePlus Group-Produkte internationalen Marktstandards entsprechen.' },
    { title: 'Nachhaltige Innovation', desc: 'Mehr als 8% des Jahresumsatzes werden in F&E für energieeffiziente Solar- und Haushaltslösungen reinvestiert.' },
  ],
  fr: [
    { title: 'La Qualité d\'Abord', desc: 'Chaque produit HousePlus Group passe par des inspections en plusieurs étapes avant de quitter notre usine certifiée ISO 9001.' },
    { title: 'Partenariat B2B', desc: 'Nous traitons chaque acheteur grossiste comme un partenaire à long terme avec des responsables de compte dédiés et des MOQ flexibles.' },
    { title: 'Conformité Mondiale', desc: 'Les certifications CE, FCC, RoHS et IEC garantissent que les produits HousePlus Group répondent aux normes du marché international.' },
    { title: 'Innovation Durable', desc: 'Plus de 8% des revenus annuels sont réinvestis en R&D pour des solutions solaires et électroménagers écoénergétiques.' },
  ],
  ar: [
    { title: 'الجودة أولاً', desc: 'كل منتج من مجموعة هاوس بلس يمر بفحوصات متعددة المراحل قبل مغادرة مصنعنا الحاصل على شهادة ISO 9001.' },
    { title: 'شراكة B2B', desc: 'نعامل كل مشتري جملة كشريك طويل المدى مع مديري حسابات مخصصين وحد أدنى للطلب مرن.' },
    { title: 'الامتثال العالمي', desc: 'شهادات CE وFCC وRoHS وIEC تضمن أن منتجات مجموعة هاوس بلس تلبي معايير السوق الدولية.' },
    { title: 'الابتكار المستدام', desc: 'يتم إعادة استثمار أكثر من 8% من الإيرادات السنوية في البحث والتطوير لحلول الطاقة الشمسية والأجهزة المنزلية الموفرة للطاقة.' },
  ],
};

const ctaButtons: Record<string, { about: string; products: string; contact: string }> = {
  en: { about: 'About HousePlus', products: 'Browse Products', contact: 'Contact Sales' },
  es: { about: 'Sobre HousePlus', products: 'Ver Productos', contact: 'Contactar Ventas' },
  de: { about: 'Über HousePlus', products: 'Produkte Durchsuchen', contact: 'Vertrieb Kontaktieren' },
  fr: { about: 'À Propos de HousePlus', products: 'Parcourir les Produits', contact: 'Contacter les Ventes' },
  ar: { about: 'عن هاوس بلس', products: 'تصفح المنتجات', contact: 'تواصل مع المبيعات' },
};

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['HousePlus Group', 'HousePlus brand', 'wholesale manufacturer', 'solar systems', 'home appliances', '3C electronics', 'OEM ODM'],
    url: `/${lang}/brand`,
    lang: lang as any,
    type: 'website',
  });
}

export default function BrandPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const t = sectionTitles[lang] || sectionTitles.en;
  const values = valueItems[lang] || valueItems.en;
  const cta = ctaButtons[lang] || ctaButtons.en;
  const isRTL = lang === 'ar';

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus Group',
    description: descriptions[lang] || descriptions.en,
    url: `https://www.houseplus-ch.com/${lang}/brand`,
    lang,
    type: 'Organization',
  });

  const webSiteSchema = generateWebSiteSchema(lang);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://www.houseplus-ch.com/${lang}/brand#webpage`,
    url: `https://www.houseplus-ch.com/${lang}/brand`,
    name: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    inLanguage: lang,
    isPartOf: { '@id': 'https://www.houseplus-ch.com/#website' },
    about: { '@id': 'https://www.houseplus-ch.com/#organization' },
  };

  return (
    <>
      <SEOHead schemas={[organizationSchema, webSiteSchema, webPageSchema]} />
      <main className="min-h-screen bg-white">
        <section className="max-w-6xl mx-auto px-4 py-6">
          <Breadcrumb lang={lang} slug="brand" />
        </section>

        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                  HousePlus Group
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                  {heroHeadlines[lang] || heroHeadlines.en}
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                  {heroSubtitles[lang] || heroSubtitles.en}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                    {cta.products}
                  </Link>
                  <Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                    {cta.contact}
                  </Link>
                </div>
              </div>
              <figure className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://images.houseplus-ch.com/factory/production-line.jpg"
                  alt="HousePlus Group manufacturing facility in Guangdong, China"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs px-4 py-3">
                  HousePlus Group — ISO 9001 Certified Factory
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{t.story}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              <strong>HousePlus Group</strong> was founded in 2010 in Guangdong, China, with a clear mission: to manufacture reliable, certified products that empower wholesale buyers worldwide. Starting from a single home-appliance production line, <strong>HousePlus Group</strong> has grown into a vertically integrated enterprise spanning solar energy systems, home appliances and 3C electronics.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Today, <strong>HousePlus Group</strong> operates a 20,000 m² ISO 9001 certified factory, serves <strong>441+ wholesale clients</strong> across <strong>53+ countries</strong>, and maintains a 12-month warranty on all products. Our brand stands for precision manufacturing, transparent partnerships and global compliance.
            </p>
          </div>
        </section>

        {/* Key Numbers */}
        <section className="py-14 bg-blue-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: '16+', label: 'Years in Manufacturing' },
                { value: '441+', label: 'Wholesale Clients' },
                { value: '53+', label: 'Countries Served' },
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

        {/* Values */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t.values}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t.capabilities}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                HousePlus Group controls the entire production journey — from raw materials to finished goods — ensuring consistent quality and competitive pricing.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Solar Energy Systems', desc: 'Panels, inverters, batteries, charge controllers and portable power stations for residential, commercial and off-grid projects.' },
                { title: 'Home Appliances', desc: 'Air fryers, induction cooktops, electric kettles, toasters and more — designed for energy efficiency and durability.' },
                { title: '3C Electronics', desc: 'TWS earphones, smart watches, power banks, cables and storage devices with private-label branding support.' },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Reach */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t.global}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                HousePlus Group products are certified for key markets and shipped through regional hubs in Africa, Southeast Asia, Europe and the Middle East.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {['CE Certified', 'FCC Certified', 'RoHS Certified', 'ISO 9001:2015', 'IEC Certified', 'SASO Ready'].map((cert) => (
                <span key={cert} className="px-5 py-2 bg-white border border-blue-200 text-blue-800 text-sm font-bold rounded-full">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t.cta}</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether you are a distributor, retailer or project contractor, HousePlus Group provides OEM/ODM manufacturing with MOQ from 100 units and lead times of 20–35 days.
            </p>
            <div className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link href={`/${lang}/about-us`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                {cta.about}
              </Link>
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                {cta.products}
              </Link>
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all hover:-translate-y-0.5">
                {cta.contact}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
