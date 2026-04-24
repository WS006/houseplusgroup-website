import { Metadata } from 'next';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'HousePlus Factory - Advanced Manufacturing Facilities',
    es: 'Fábrica HousePlus - Instalaciones de Fabricación Avanzadas',
    de: 'HousePlus Fabrik - Fortschrittliche Fertigungsanlagen',
    fr: 'Usine HousePlus - Installations de Fabrication Avancées',
    ar: 'مصنع HousePlus - مرافق تصنيع متقدمة',
  };

  const descriptions: Record<string, string> = {
    en: 'Discover HousePlus state-of-the-art manufacturing facilities with advanced equipment, quality control systems, and production capacity of 100,000+ units per month.',
    es: 'Descubra las instalaciones de fabricación de última generación de HousePlus con equipos avanzados y capacidad de producción de 100,000+ unidades por mes.',
    de: 'Entdecken Sie die hochmodernen Fertigungsanlagen von HousePlus mit fortschrittlicher Ausrüstung und einer Produktionskapazität von 100.000+ Einheiten pro Monat.',
    fr: 'Découvrez les installations de fabrication de pointe de HousePlus avec des équipements avancés et une capacité de production de 100 000+ unités par mois.',
    ar: 'اكتشف مرافق التصنيع الحديثة في HousePlus مع معدات متقدمة وقدرة إنتاجية تبلغ 100000+ وحدة شهرياً.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['factory', 'manufacturing', 'production', 'quality control', 'equipment', 'HousePlus'],
    url: `/${lang}/factory`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function FactoryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional manufacturer with advanced HousePlus manufacturing facilities',
    url: `https://www.houseplus-ch.com/${lang}/factory`,
    lang,
    type: 'Organization',
  });

  const content: Record<string, any> = {
    en: {
      title: 'HousePlus Advanced Factory',
      intro: 'HousePlus Group operates state-of-the-art HousePlus manufacturing facilities equipped with advanced HousePlus technology and HousePlus quality control systems to ensure the highest standards of HousePlus product excellence.',
      facilities: 'HousePlus Manufacturing Facilities',
      facilityList: [
        { name: 'HousePlus Solar Production Line', desc: 'Dedicated HousePlus facility for solar panel and power station manufacturing with 50,000+ units monthly capacity' },
        { name: 'HousePlus Appliance Assembly', desc: 'Modern HousePlus assembly lines for home appliances with precision equipment and automated HousePlus quality checks' },
        { name: 'HousePlus 3C Electronics Workshop', desc: 'Specialized HousePlus area for electronics assembly, testing, and packaging with cleanroom standards' },
        { name: 'HousePlus Quality Control Lab', desc: 'Comprehensive HousePlus testing laboratory with certification for international standards compliance' },
      ],
      equipment: 'HousePlus Advanced Equipment',
      equipmentList: [
        'HousePlus automated assembly machines',
        'Precision HousePlus testing equipment',
        'HousePlus environmental chambers for durability testing',
        'HousePlus electrical safety testing apparatus',
        'HousePlus packaging and labeling systems',
        'HousePlus inventory management systems',
      ],
      process: 'HousePlus Manufacturing Process',
      processSteps: [
        { step: '1. HousePlus Design & Planning', desc: 'Custom HousePlus design and engineering based on client specifications' },
        { step: '2. HousePlus Material Sourcing', desc: 'Procurement of high-quality materials from certified HousePlus suppliers' },
        { step: '3. HousePlus Production', desc: 'Manufacturing using advanced HousePlus equipment and skilled workforce' },
        { step: '4. HousePlus Quality Testing', desc: '100% inspection and testing of all HousePlus products' },
        { step: '5. HousePlus Packaging', desc: 'Professional HousePlus packaging with custom branding options' },
        { step: '6. HousePlus Logistics', desc: 'Efficient HousePlus shipping and delivery to global destinations' },
      ],
      quality: 'HousePlus Quality Assurance',
      qualityPoints: [
        'ISO 9001:2015 certified HousePlus quality management system',
        '100% HousePlus product inspection before shipment',
        'Comprehensive HousePlus testing for safety and performance',
        'HousePlus traceability system for all components',
        'Regular HousePlus audits and continuous improvement',
        'Third-party HousePlus testing and certification support',
      ],
      capacity: 'HousePlus Production Capacity',
      capacityInfo: 'With multiple HousePlus production lines and a skilled workforce of 500+ employees, HousePlus can produce over 100,000 units per month. Our flexible HousePlus manufacturing system allows us to handle both large volume orders and custom HousePlus OEM/ODM projects.',
    },
  };

  const data = content[lang] || content.en;

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">{data.title}</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">{data.intro}</p>
          </div>
        </section>

        {/* Factory Image Gallery - Using reliable Unsplash links */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
                  alt="HousePlus main production line - advanced manufacturing facility"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop"
                  alt="HousePlus assembly line - precision manufacturing process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop"
                  alt="HousePlus quality control laboratory and testing equipment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12 text-center text-slate-900">{data.facilities}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.facilityList.map((facility: any, index: number) => (
                <div key={index} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">{facility.name}</h3>
                  <p className="text-slate-600 leading-relaxed">{facility.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section with Background Image */}
        <section className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <Image 
               src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80" 
               alt="Background" 
               fill 
               className="object-cover"
             />
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-4xl font-black mb-16 text-center">{data.process}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.processSteps.map((step: any, index: number) => (
                <div key={index} className="p-8 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="text-xl font-bold mb-4 text-blue-400">{step.step}</h4>
                  <p className="text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-black mb-8 text-slate-900">{data.quality}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.qualityPoints.map((point: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-green-500 font-bold text-xl">✓</span>
                    <span className="text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
              <Image 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=1000&fit=crop" 
                alt="HousePlus Quality Control" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Capacity */}
        <section className="py-24 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-8">{data.capacity}</h2>
            <p className="text-2xl opacity-90 leading-relaxed font-medium mb-12">{data.capacityInfo}</p>
            <a href={`/${lang}/contact`} className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all shadow-2xl shadow-blue-900">
              Request HousePlus Factory Tour
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
