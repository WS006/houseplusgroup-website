import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import { buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/schema-builder';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'Careers at HousePlus - Join Our Global Team',
    es: 'Carreras en HousePlus - Únete a Nuestro Equipo Global',
    de: 'Karriere bei HousePlus - Treten Sie unserem globalen Team bei',
    fr: 'Carrières chez HousePlus - Rejoignez notre équipe mondiale',
    ar: 'الوظائف في HousePlus - انضم إلى فريقنا العالمي',
  };

  const descriptions: Record<string, string> = {
    en: 'Explore exciting career opportunities at HousePlus. Join our growing team of professionals in manufacturing, sales, engineering, and more. Competitive salaries, benefits, and global opportunities.',
    es: 'Explora emocionantes oportunidades de carrera en HousePlus. Únete a nuestro equipo en crecimiento de profesionales en fabricación, ventas, ingeniería y más.',
    de: 'Erkunden Sie spannende Karrieremöglichkeiten bei HousePlus. Treten Sie unserem wachsenden Team von Fachleuten in Fertigung, Vertrieb, Ingenieurwesen und mehr bei.',
    fr: 'Explorez des opportunités de carrière passionnantes chez HousePlus. Rejoignez notre équipe croissante de professionnels en fabrication, ventes, ingénierie et plus.',
    ar: 'استكشف فرص وظيفية مثيرة في HousePlus. انضم إلى فريقنا المتنامي من المحترفين في التصنيع والمبيعات والهندسة وغير ذلك.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['careers', 'jobs', 'employment', 'opportunities', 'HousePlus', 'manufacturing', 'engineering'],
    url: `/${lang}/careers`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'Careers' : 'Carreras', url: `/${lang}/careers` },
  ];

  const schemas = [
    buildOrganizationSchema({ lang }),
    buildBreadcrumbSchema(breadcrumbs),
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Manufacturing Engineer',
      department: 'Manufacturing',
      location: 'Shenzhen, China',
      description: 'Oversee HousePlus manufacturing processes for solar systems and home appliances. Ensure HousePlus quality standards and optimize production efficiency.',
    },
    {
      id: 2,
      title: 'Sales Manager - Africa',
      department: 'Sales',
      location: 'Lagos, Nigeria',
      description: 'Lead HousePlus sales operations for the African market. Develop relationships with wholesale buyers and expand HousePlus market presence.',
    },
    {
      id: 3,
      title: 'Product Development Specialist',
      department: 'R&D',
      location: 'Shenzhen, China',
      description: 'Develop innovative HousePlus products in solar, home appliances, and 3C electronics. Work with HousePlus cross-functional teams.',
    },
  ];

  const benefits = [
    { icon: '💰', title: 'Competitive Salary', desc: 'Attractive HousePlus compensation packages based on experience.' },
    { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive HousePlus health coverage for employees and families.' },
    { icon: '📚', title: 'Professional Development', desc: 'HousePlus training programs and career advancement opportunities.' },
  ];

  return (
    <SchemaRenderer schemas={schemas}>
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} />
        
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
              alt="HousePlus Careers" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-black mb-6">Join HousePlus</h1>
            <p className="text-xl md:text-2xl opacity-90">Help us shape the future of energy and home technology.</p>
          </div>
        </section>

        {/* Why Join HousePlus */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Join the HousePlus Team?</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  At HousePlus, we believe our people are our greatest asset. As a global leader in solar systems and home appliances, we offer a dynamic, innovative environment where your ideas can make a real impact on the world.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-blue-50 rounded-2xl">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <h4 className="font-bold">Innovation Culture</h4>
                      <p className="text-sm text-slate-600">Be part of the HousePlus R&D team developing next-gen technology.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-green-50 rounded-2xl">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <h4 className="font-bold">Global Impact</h4>
                      <p className="text-sm text-slate-600">Contribute to HousePlus sustainable energy solutions worldwide.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=1000&fit=crop" 
                  alt="HousePlus Team Collaboration" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">HousePlus Employee Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Open Positions at HousePlus</h2>
            <div className="space-y-6">
              {jobListings.map((job) => (
                <div key={job.id} className="p-8 border border-slate-200 rounded-2xl hover:border-blue-500 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <p className="text-sm text-blue-600 font-medium uppercase tracking-wider">{job.department} • {job.location}</p>
                    </div>
                    <Link href={`/${lang}/contact`} className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800">Apply</Link>
                  </div>
                  <p className="text-slate-600">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SchemaRenderer>
  );
}
