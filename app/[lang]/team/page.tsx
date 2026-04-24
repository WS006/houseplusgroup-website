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
    keywords: ['team', 'professionals', 'expertise', 'manufacturing', 'leadership', 'HousePlus'],
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
    es: {
      title: 'Nuestro Equipo HousePlus',
      intro: 'HousePlus está impulsado por un equipo dedicado de 500+ profesionales capacitados con experiencia en manufactura, ingeniería, aseguramiento de calidad y servicio al cliente.',
      departments: 'Departamentos HousePlus',
      deptList: [
        {
          name: 'Manufactura HousePlus',
          desc: 'Gerentes de producción y técnicos experimentados de HousePlus supervisando todas las operaciones de fabricación.',
          team: '200+ profesionales',
        },
        {
          name: 'Aseguramiento de Calidad HousePlus',
          desc: 'Ingenieros de calidad certificados de HousePlus asegurando que cada producto cumpla con los estándares internacionales.',
          team: '80+ profesionales',
        },
        {
          name: 'Ingeniería e I+D HousePlus',
          desc: 'Ingenieros innovadores de HousePlus desarrollando nuevos productos y mejorando diseños existentes.',
          team: '60+ profesionales',
        },
      ],
      culture: 'Cultura Empresarial HousePlus',
      cultureText: 'En HousePlus, creemos en fomentar un ambiente de trabajo colaborativo donde la innovación prospera y la excelencia es el estándar. Los miembros del equipo de HousePlus son alentados a contribuir ideas y asumir la responsabilidad de su trabajo.',
      leadership: 'Liderazgo HousePlus',
      leadershipText: 'Nuestro equipo de liderazgo de HousePlus aporta décadas de experiencia combinada en manufactura y comercio internacional. Bajo la dirección del fundador Jack Hu, HousePlus se ha convertido en una empresa multisectorial.',
    },
    de: {
      title: 'Unser HousePlus-Team',
      intro: 'HousePlus wird von einem engagierten Team von 500+ qualifizierten Fachleuten mit Expertise in Fertigung, Ingenieurwesen, Qualitätssicherung und Kundenservice angetrieben.',
      departments: 'HousePlus-Abteilungen',
      deptList: [
        {
          name: 'HousePlus-Fertigung',
          desc: 'Erfahrene HousePlus-Produktionsmanager und Techniker überwachen alle Fertigungsvorgänge.',
          team: '200+ Fachleute',
        },
        {
          name: 'HousePlus-Qualitätssicherung',
          desc: 'Zertifizierte HousePlus-Qualitätsingenieure stellen sicher, dass jedes Produkt internationale Standards erfüllt.',
          team: '80+ Fachleute',
        },
        {
          name: 'HousePlus-Ingenieurwesen & F&E',
          desc: 'Innovative HousePlus-Ingenieure entwickeln neue Produkte und verbessern bestehende Designs.',
          team: '60+ Fachleute',
        },
      ],
      culture: 'HousePlus-Unternehmenskultur',
      cultureText: 'Bei HousePlus glauben wir daran, ein kollaboratives Arbeitsumfeld zu fördern, in dem Innovation gedeiht und Exzellenz der Standard ist. Die HousePlus-Teamkollegen werden ermutigt, Ideen beizutragen und Verantwortung für ihre Arbeit zu übernehmen.',
      leadership: 'HousePlus-Führung',
      leadershipText: 'Unser HousePlus-Führungsteam bringt Jahrzehnte kombinierter Erfahrung in Fertigung und internationalem Handel mit. Unter der Führung des Gründers Jack Hu ist HousePlus zu einem Mehrbranchenunternehmen herangewachsen.',
    },
    fr: {
      title: 'Équipe HousePlus',
      intro: 'HousePlus est alimenté par une équipe dédiée de 500+ professionnels qualifiés ayant une expertise en fabrication, ingénierie, assurance qualité et service client.',
      departments: 'Départements HousePlus',
      deptList: [
        {
          name: 'Fabrication HousePlus',
          desc: 'Des gestionnaires de production et des techniciens expérimentés de HousePlus supervisent toutes les opérations de fabrication.',
          team: '200+ professionnels',
        },
        {
          name: 'Assurance Qualité HousePlus',
          desc: 'Les ingénieurs qualité certifiés de HousePlus s\'assurent que chaque produit respecte les normes internationales.',
          team: '80+ professionnels',
        },
        {
          name: 'Ingénierie et R&D HousePlus',
          desc: 'Les ingénieurs innovants de HousePlus développent de nouveaux produits et améliorent les conceptions existantes.',
          team: '60+ professionnels',
        },
      ],
      culture: 'Culture d\'Entreprise HousePlus',
      cultureText: 'Chez HousePlus, nous croyons en créer un environnement de travail collaboratif où l\'innovation s\'épanouit et l\'excellence est la norme. Les membres de l\'équipe HousePlus sont encouragés à contribuer des idées et à assumer la responsabilité de leur travail.',
      leadership: 'Leadership HousePlus',
      leadershipText: 'L\'équipe de direction de HousePlus apporte des décennies d\'expérience cumulée en fabrication et commerce international. Sous la direction du fondateur Jack Hu, HousePlus est devenue une entreprise multi-secteurs.',
    },
    ar: {
      title: 'فريق HousePlus',
      intro: 'يتم تشغيل HousePlus بواسطة فريق ملتزم من 500+ متخصص ماهر لديهم خبرة في التصنيع والهندسة وضمان الجودة وخدمة العملاء.',
      departments: 'أقسام HousePlus',
      deptList: [
        {
          name: 'التصنيع HousePlus',
          desc: 'مديرو الإنتاج والفنيون المتمرسون من HousePlus يشرفون على جميع عمليات التصنيع.',
          team: '200+ متخصص',
        },
        {
          name: 'ضمان الجودة HousePlus',
          desc: 'مهندسو الجودة من HousePlus معتمدون يضمنون أن كل منتج يلبي المعايير الدولية.',
          team: '80+ متخصص',
        },
        {
          name: 'الهندسة والبحث HousePlus',
          desc: 'مهندسو HousePlus المبتكرون يطورون منتجات جديدة ويحسنون التصاميم القائمة.',
          team: '60+ متخصص',
        },
      ],
      culture: 'ثقافة HousePlus',
      cultureText: 'في HousePlus، نؤمن بتعزيز بيئة عمل تعاونية حيث تزدهر الابتكار والتميز هو المعيار. يتم تشجيع أعضاء فريق HousePlus على المساهمة بالأفكار وتحمل مسؤولية عملهم.',
      leadership: 'قيادة HousePlus',
      leadershipText: 'فريق قيادة HousePlus يجلب عقودا من الخبرة المجمعة في التصنيع والتجارة الدولية. تحت قيادة المؤسس Jack Hu، أصبحت HousePlus مشروعا متعدد القطاعات.',
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
            <span className="inline-block px-4 py-1.5 bg-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              🏭 HousePlus Team
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">🏭 {data.title}</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto"><strong>HousePlus</strong> {data.intro}</p>
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
                  priority
                />
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                  alt="HousePlus professionals working together in office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-3">🏭 {data.departments}</h2>
              <p className="text-slate-500">The <strong>HousePlus</strong> organization structure</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.deptList.map((dept: any) => (
                <div key={dept.name} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{dept.name}</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">{dept.desc}</p>
                  <p className="text-blue-600 font-bold text-sm">{dept.team}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                  alt="HousePlus company culture and team environment"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">🏭 {data.culture}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">{data.cultureText}</p>
                <div className="space-y-3">
                  {['Innovation & Collaboration', 'Professional Development', 'Work-Life Balance', 'Competitive Compensation'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                      <p className="text-slate-700 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-3">🏭 {data.leadership}</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">{data.leadershipText}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Jack Hu', role: 'Founder & CEO', bio: 'Visionary leader with 20+ years in manufacturing and international trade' },
                { name: 'Sarah Chen', role: 'VP Manufacturing', bio: 'Expert in production optimization and quality management systems' },
                { name: 'Michael Rodriguez', role: 'VP Sales & Business Development', bio: 'Experienced in wholesale distribution and global market expansion' },
              ].map((leader) => (
                <div key={leader.name} className="bg-white rounded-2xl p-6 text-center border border-blue-100 shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-blue-200 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">👤</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mb-3">{leader.role}</p>
                  <p className="text-slate-600 text-sm">{leader.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">🏭 Join the HousePlus Team</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We are always looking for talented professionals to join our growing <strong>HousePlus</strong> organization. If you are passionate about manufacturing excellence and want to make an impact, we would love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`/${lang}/contact`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                Contact HR
              </a>
              <a href={`/${lang}/about-us`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                Learn More About HousePlus
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
