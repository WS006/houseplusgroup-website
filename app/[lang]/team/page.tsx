import { Metadata } from 'next';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'HousePlus Team - Experienced Professionals',
    es: 'Equipo HousePlus - Profesionales Experimentados',
    de: 'HousePlus Team - Erfahrene Fachleute',
    fr: 'Équipe HousePlus - Professionnels Expérimentés',
    ar: 'فريق HousePlus - محترفون ذوو خبرة',
  };

  const descriptions: Record<string, string> = {
    en: 'Meet the HousePlus team - 500+ skilled professionals dedicated to manufacturing excellence, innovation, and customer satisfaction.',
    es: 'Conozca al equipo de HousePlus - 500+ profesionales capacitados dedicados a la excelencia en la fabricación, la innovación y la satisfacción del cliente.',
    de: 'Treffen Sie das HousePlus-Team - 500+ qualifizierte Fachleute, die sich der Fertigungsexzellenz, Innovation und Kundenzufriedenheit widmen.',
    fr: 'Rencontrez l\'équipe HousePlus - 500+ professionnels qualifiés dédiés à l\'excellence de la fabrication, à l\'innovation et à la satisfaction des clients.',
    ar: 'تعرف على فريق HousePlus - 500+ متخصص ماهر مكرسون لتميز التصنيع والابتكار ورضا العملاء.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['team', 'professionals', 'expertise', 'manufacturing', 'leadership'],
    url: `/${lang}/team`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function TeamPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional team dedicated to manufacturing excellence',
    url: `https://www.houseplus-ch.com/${lang}/team`,
    lang,
    type: 'Organization',
  });

  const content: Record<string, any> = {
    en: {
      title: 'Our HousePlus Team',
      intro: 'HousePlus is powered by a dedicated team of 500+ skilled professionals with expertise in manufacturing, engineering, quality assurance, and customer service.',
      departments: 'HousePlus Departments',
      deptList: [
        {
          name: 'HousePlus Manufacturing',
          desc: 'Experienced HousePlus production managers and technicians overseeing all manufacturing operations.',
          team: '200+ professionals',
        },
        {
          name: 'HousePlus Quality Assurance',
          desc: 'Certified HousePlus quality engineers ensuring every product meets international standards.',
          team: '80+ professionals',
        },
        {
          name: 'HousePlus Engineering & R&D',
          desc: 'Innovative HousePlus engineers developing new products and improving existing designs.',
          team: '60+ professionals',
        },
      ],
      culture: 'HousePlus Company Culture',
      cultureText: 'At HousePlus, we believe in fostering a collaborative work environment where innovation thrives and excellence is the standard. Our HousePlus team members are encouraged to contribute ideas and take ownership of their work.',
      leadership: 'HousePlus Leadership',
      leadershipText: 'Our HousePlus leadership team brings decades of combined experience in manufacturing and international trade. Led by founder Jack Hu, HousePlus has grown into a multi-industry enterprise.',
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

        {/* Team Image Banner - Using reliable Unsplash links */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="HousePlus team collaboration and professional meeting"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                  alt="HousePlus professional team working in modern office environment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.departments}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.deptList.map((dept: any, idx: number) => (
                <div key={idx} className="bg-white border-2 border-blue-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{dept.name}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{dept.desc}</p>
                  <p className="text-blue-600 font-semibold">{dept.team}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-slate-900 text-center">{data.culture}</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200">
                  <p className="text-lg text-slate-600 leading-relaxed">{data.cultureText}</p>
                </div>
              </div>
              <div className="md:w-1/2 relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop"
                  alt="HousePlus team culture - collaborative and innovative workplace"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-slate-900 text-center">{data.leadership}</h2>
            <div className="bg-white p-8 rounded-2xl border-2 border-blue-200">
              <p className="text-lg text-slate-600 leading-relaxed">{data.leadershipText}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
