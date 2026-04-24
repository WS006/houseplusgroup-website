import { Metadata } from 'next';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import Breadcrumb from '@/components/Breadcrumb';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'About HousePlus - Professional Manufacturer Since 2010',
    es: 'Acerca de HousePlus - Fabricante Profesional desde 2010',
    de: 'Über HousePlus - Professioneller Hersteller seit 2010',
    fr: 'À Propos de HousePlus - Fabricant Professionnel depuis 2010',
    ar: 'حول HousePlus - مصنع احترافي منذ 2010',
  };

  const descriptions: Record<string, string> = {
    en: 'Learn about HousePlus Group, a leading manufacturer of solar systems, home appliances, and 3C electronics with over 10 years of industry experience and 500+ global clients.',
    es: 'Conozca HousePlus Group, un fabricante líder de sistemas solares, electrodomésticos y electrónica 3C con más de 10 años de experiencia en la industria y 500+ clientes globales.',
    de: 'Erfahren Sie mehr über HousePlus Group, einen führenden Hersteller von Solarsystemen, Haushaltsgeräten und 3C-Elektronik mit über 10 Jahren Branchenerfahrung und 500+ globalen Kunden.',
    fr: 'Découvrez HousePlus Group, un fabricant leader de systèmes solaires, d\'électroménagers et d\'électronique 3C avec plus de 10 ans d\'expérience industrielle et 500+ clients mondiaux.',
    ar: 'تعرف على مجموعة HousePlus، وهي شركة مصنعة رائدة للأنظمة الشمسية والأجهزة المنزلية والإلكترونيات 3C مع أكثر من 10 سنوات من الخبرة الصناعية و 500+ عميل عالمي.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['about', 'company', 'manufacturer', 'solar', 'appliances', 'electronics', 'HousePlus'],
    url: `/${lang}/about-us`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics',
    url: `https://www.houseplus-ch.com/${lang}/about-us`,
    lang,
    type: 'Organization',
  });

  const content: Record<string, any> = {
    en: {
      title: 'About HousePlus Group',
      intro: 'HousePlus Group is a professional manufacturer specializing in three core industries: HousePlus solar energy systems, HousePlus home appliances, and HousePlus 3C electronics. With over 10 years of HousePlus industry experience, we have established ourselves as a trusted partner for global wholesale buyers.',
      mission: 'HousePlus Mission',
      missionText: 'To deliver high-quality, innovative HousePlus products that meet international standards while providing exceptional value to our HousePlus wholesale partners worldwide.',
      vision: 'HousePlus Vision',
      visionText: 'To become the leading global manufacturer of HousePlus sustainable energy solutions and HousePlus consumer electronics, recognized for HousePlus quality and innovation.',
      history: 'HousePlus History',
      historyText: 'Founded in 2010, HousePlus Group has grown from a small manufacturing operation to a multi-industry HousePlus enterprise serving over 500 clients across 50+ countries.',
      values: 'HousePlus Core Values',
      valuesList: [
        { title: 'HousePlus Quality', desc: 'We maintain the highest HousePlus standards in manufacturing and quality assurance.' },
        { title: 'HousePlus Innovation', desc: 'We continuously invest in HousePlus R&D to bring cutting-edge products to market.' },
        { title: 'HousePlus Reliability', desc: 'HousePlus products and services are built on a foundation of trust and dependability.' },
      ],
      capabilities: 'HousePlus Manufacturing Capabilities',
      capList: [
        'HousePlus in-house manufacturing facilities with advanced equipment',
        'HousePlus vertical integration ensuring quality control at every stage',
        'HousePlus OEM/ODM services with custom design and branding',
        'HousePlus production capacity: 100,000+ units per month',
      ],
    },
  };

  const data = content[lang] || content.en;

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} />

        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">{data.title}</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">{data.intro}</p>
          </div>
        </section>

        {/* Mission & Vision with Images - Using reliable Unsplash links */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 shadow-sm">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">{data.mission}</h2>
              <p className="text-slate-600 leading-relaxed">{data.missionText}</p>
            </div>
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="HousePlus team meeting and collaboration"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Vision with Image */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white md:order-2">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
                alt="HousePlus manufacturing production line"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-green-50 p-8 rounded-3xl border border-green-100 shadow-sm md:order-1">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">{data.vision}</h2>
              <p className="text-slate-600 leading-relaxed">{data.visionText}</p>
            </div>
          </div>
        </section>

        {/* History with Image */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1565034946487-077786996e27?w=800&h=600&fit=crop"
                alt="HousePlus assembly line and manufacturing"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-slate-900">{data.history}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{data.historyText}</p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">{data.values}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.valuesList.map((value: any, idx: number) => (
                <div key={idx} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-blue-500 transition-colors">
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-slate-400">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Capabilities */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.capabilities}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                {data.capList.map((cap: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-2xl shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                    <p className="text-slate-700 pt-1">{cap}</p>
                  </div>
                ))}
              </div>
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1541933224352-22449775c629?w=800&h=1000&fit=crop"
                  alt="HousePlus manufacturing capabilities and equipment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">Partner with HousePlus Today</h2>
            <p className="text-xl mb-10 opacity-90">Contact us to learn more about HousePlus products and wholesale services.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={`/${lang}/contact`} className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl shadow-blue-900">Contact HousePlus</a>
              <a href={`/${lang}/products`} className="px-10 py-4 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 transition-all border border-blue-500">View HousePlus Products</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
