import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generatePersonSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'Jack Hu — Founder & Editorial Lead | HousePlus',
    es: 'Jack Hu — Fundador y Director Editorial | HousePlus',
    de: 'Jack Hu — Gründer & Redaktionsleiter | HousePlus',
    fr: 'Jack Hu — Fondateur & Directeur de la Rédaction | HousePlus',
    ar: 'جاك هو — المؤسس والمدير التحريري | HousePlus',
  };

  const descriptions: Record<string, string> = {
    en: 'Jack Hu is the founder and editorial lead at HousePlus, with 16+ years in solar systems, home appliances and 3C electronics manufacturing. B2B wholesale expert serving 441+ clients across 53+ countries.',
    es: 'Jack Hu es fundador y director editorial en HousePlus, con más de 16 años en manufactura de sistemas solares, electrodomésticos y electrónica 3C. Experto en venta mayorista B2B con más de 441 clientes en 53+ países.',
    de: 'Jack Hu ist Gründer und Redaktionsleiter bei HousePlus, mit über 16 Jahren Erfahrung in Solaranlagen, Haushaltsgeräten und 3C-Elektronikfertigung. B2B-Großhandelsexperte mit 441+ Kunden in 53+ Ländern.',
    fr: 'Jack Hu est le fondateur et directeur de la rédaction de HousePlus, avec plus de 16 ans dans la fabrication de systèmes solaires, appareils électroménagers et électronique 3C. Expert en gros B2B avec 441+ clients dans 53+ pays.',
    ar: 'جاك هو هو المؤسس والمدير التحريري في HousePlus، مع أكثر من ١٦ عامًا من الخبرة في تصنيع أنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات ٣C. خبير الجملة B2B يخدم أكثر من ٤٤١ عميل في أكثر من ٥٣ دولة.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['Jack Hu', 'HousePlus founder', 'solar manufacturing expert', 'OEM ODM', 'wholesale electronics', 'B2B expert'],
    url: `/${lang}/author/jack-hu`,
    lang: lang as any,
    type: 'profile',
  });
}

export default async function AuthorPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'Author' : 'Autor', url: `/${lang}/author/jack-hu` },
  ];

  const authorBio: Record<string, any> = {
    en: {
      name: 'Jack Hu',
      role: 'Founder & Editorial Lead',
      company: 'HousePlus Group',
      location: 'Zhongshan, Guangdong, China',
      email: 'jack@houseplus-ch.com',
      experience: '16+ years',
      founded: '2010',
      employees: '500+',
      countries: '53+',
      clients: '441+',
      factorySize: '20,000 m²',
      certifications: 'ISO 9001, CE, FCC, RoHS',
      image: '/images/site/team-working-together.jpg',
      imageAlt: 'Jack Hu - Founder of HousePlus',
      intro: 'Jack Hu is the founder and editorial lead of HousePlus, a vertically integrated B2B manufacturer specializing in solar energy systems, home appliances, and 3C electronics. With over 16 years of hands-on experience in manufacturing and international trade, Jack leads a team of 500+ professionals serving 441+ wholesale clients across 53+ countries from a 20,000 m² ISO 9001 certified factory in Zhongshan, Guangdong.',
      expertise: [
        'Solar energy systems engineering & manufacturing',
        'Home appliance OEM/ODM product development',
        '3C electronics design and quality assurance',
        'International B2B wholesale strategy',
        'Supply chain optimization and QC management',
        'Energy efficiency standards and compliance',
      ],
      credentials: [
        'B.Eng. in Electrical Engineering, South China University of Technology',
        'ISO 9001 Lead Auditor Certified',
        'Patent holder: 12+ utility model patents in solar and appliance technology',
        'Regular speaker at China Import and Export Fair (Canton Fair)',
        'Member of China Electronics Chamber of Commerce',
      ],
      publishedArticles: '80+',
      publications: [
        'Technical contributor to Solar Power International conference proceedings',
        'Quoted in Appliance Magazine on OEM manufacturing trends',
        'Guest lecturer at Guangdong University of Technology — International Trade program',
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/jackhu-houseplus',
        twitter: 'https://twitter.com/jackhu_houseplus',
      },
    },
    es: {
      name: 'Jack Hu',
      role: 'Fundador y Director Editorial',
      company: 'HousePlus Group',
      location: 'Zhongshan, Guangdong, China',
      email: 'jack@houseplus-ch.com',
      experience: '16+ años',
      founded: '2010',
      employees: '500+',
      countries: '53+',
      clients: '441+',
      factorySize: '20,000 m²',
      certifications: 'ISO 9001, CE, FCC, RoHS',
      image: '/images/site/team-working-together.jpg',
      imageAlt: 'Jack Hu - Fundador de HousePlus',
      intro: 'Jack Hu es el fundador y director editorial de HousePlus, un fabricante B2B de integración vertical especializado en sistemas de energía solar, electrodomésticos y electrónica 3C. Con más de 16 años de experiencia práctica en manufactura y comercio internacional, Jack lidera un equipo de más de 500 profesionales que sirven a más de 441 clientes mayoristas en más de 53 países desde una fábrica certificada ISO 9001 de 20,000 m² en Zhongshan, Guangdong.',
      expertise: [
        'Ingeniería y manufactura de sistemas de energía solar',
        'Desarrollo de productos OEM/ODM de electrodomésticos',
        'Diseño de electrónica 3C y aseguramiento de calidad',
        'Estrategia de venta mayorista B2B internacional',
        'Optimización de cadena de suministro y gestión de QC',
        'Normas de eficiencia energética y cumplimiento',
      ],
      credentials: [
        'Ing. Eléctrica, Universidad de Tecnología del Sur de China',
        'Auditor Líder ISO 9001 Certificado',
        'Titular de patentes: 12+ patentes de modelo de utilidad en tecnología solar y de electrodomésticos',
        'Ponente regular en la Feria de Importación y Exportación de China (Feria de Cantón)',
        'Miembro de la Cámara de Comercio Electrónico de China',
      ],
      publishedArticles: '80+',
      publications: [
        'Contribuidor técnico en las actas de la conferencia Solar Power International',
        'Citado en Appliance Magazine sobre tendencias de manufactura OEM',
        'Profesor invitado en la Universidad de Tecnología de Guangdong — programa de Comercio Internacional',
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/jackhu-houseplus',
        twitter: 'https://twitter.com/jackhu_houseplus',
      },
    },
    de: {
      name: 'Jack Hu',
      role: 'Gründer & Redaktionsleiter',
      company: 'HousePlus Group',
      location: 'Zhongshan, Guangdong, China',
      email: 'jack@houseplus-ch.com',
      experience: '16+ Jahre',
      founded: '2010',
      employees: '500+',
      countries: '53+',
      clients: '441+',
      factorySize: '20.000 m²',
      certifications: 'ISO 9001, CE, FCC, RoHS',
      image: '/images/site/team-working-together.jpg',
      imageAlt: 'Jack Hu - Gründer von HousePlus',
      intro: 'Jack Hu ist Gründer und Redaktionsleiter von HousePlus, einem vertikal integrierten B2B-Hersteller, der sich auf Solarenergiesysteme, Haushaltsgeräte und 3C-Elektronik spezialisiert hat. Mit über 16 Jahren praktischer Erfahrung in Fertigung und internationalem Handel führt Jack ein Team von 500+ Fachkräften, das 441+ Großhandelskunden in 53+ Ländern von einer ISO-9001-zertifizierten Fabrik mit 20.000 m² in Zhongshan, Guangdong, beliefert.',
      expertise: [
        'Solarenergiesystemtechnik & -fertigung',
        'Entwicklung von Haushaltsgeräten OEM/ODM',
        '3C-Elektronikdesign und Qualitätsicherung',
        'Internationale B2B-Großhandelsstrategie',
        'Lieferkettenoptimierung und QC-Management',
        'Energieeffizienzstandards und Konformität',
      ],
      credentials: [
        'Diplom-Ing. Elektrotechnik, South China University of Technology',
        'ISO 9001 Lead Auditor zertifiziert',
        'Patentinhaber: 12+ Gebrauchsmusterpatente in Solar- und Gerätetechnologie',
        'Regelmäßiger Redner auf der China Import and Export Fair (Kantonmesse)',
        'Mitglied der China Electronics Chamber of Commerce',
      ],
      publishedArticles: '80+',
      publications: [
        'Technischer Mitarbeiter bei den Konferenzberichten von Solar Power International',
        'Zitiert in Appliance Magazine zu OEM-Fertigungstrends',
        'Gastdozent an der Guangdong University of Technology — Studiengang Internationaler Handel',
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/jackhu-houseplus',
        twitter: 'https://twitter.com/jackhu_houseplus',
      },
    },
    fr: {
      name: 'Jack Hu',
      role: 'Fondateur & Directeur de la Rédaction',
      company: 'HousePlus Group',
      location: 'Zhongshan, Guangdong, Chine',
      email: 'jack@houseplus-ch.com',
      experience: '16+ ans',
      founded: '2010',
      employees: '500+',
      countries: '53+',
      clients: '441+',
      factorySize: '20 000 m²',
      certifications: 'ISO 9001, CE, FCC, RoHS',
      image: '/images/site/team-working-together.jpg',
      imageAlt: 'Jack Hu - Fondateur de HousePlus',
      intro: 'Jack Hu est le fondateur et directeur de la rédaction de HousePlus, un fabricant B2B à intégration verticale spécialisé dans les systèmes d\'énergie solaire, les appareils électroménagers et l\'électronique 3C. Avec plus de 16 ans d\'expérience pratique dans la fabrication et le commerce international, Jack dirige une équipe de plus de 500 professionnels au service de 441+ clients grossistes dans 53+ pays depuis une usine certifiée ISO 9001 de 20 000 m² à Zhongshan, Guangdong.',
      expertise: [
        'Ingénierie et fabrication de systèmes solaires',
        'Développement de produits OEM/ODM pour appareils',
        'Conception électronique 3C et assurance qualité',
        'Stratégie de gros B2B international',
        'Optimisation de la chaîne d\'approvisionnement et gestion QC',
        'Normes d\'efficacité énergétique et conformité',
      ],
      credentials: [
        'Ingénieur en génie électrique, South China University of Technology',
        'Auditeur principal ISO 9001 certifié',
        'Détenteur de brevets : 12+ brevets de modèle d\'utilité dans la technologie solaire et des appareils',
        'Conférencier régulier à la Foire de l\'importation et de l\'exportation de Chine (Foire de Canton)',
        'Membre de la China Electronics Chamber of Commerce',
      ],
      publishedArticles: '80+',
      publications: [
        'Contributeur technique aux actes de la conférence Solar Power International',
        'Cité dans Appliance Magazine sur les tendances de fabrication OEM',
        'Conférencier invité à l\'Université de technologie du Guangdong — programme Commerce international',
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/jackhu-houseplus',
        twitter: 'https://twitter.com/jackhu_houseplus',
      },
    },
    ar: {
      name: 'جاك هو',
      role: 'المؤسس والمدير التحريري',
      company: 'HousePlus Group',
      location: 'تشونغشان، قوانغدونغ، الصين',
      email: 'jack@houseplus-ch.com',
      experience: 'أكثر من ١٦ عامًا',
      founded: '٢٠١٠',
      employees: '٥٠٠+',
      countries: '٥٣+',
      clients: '٤٤١+',
      factorySize: '٢٠٬٠٠٠ متر مربع',
      certifications: 'ISO 9001, CE, FCC, RoHS',
      image: '/images/site/team-working-together.jpg',
      imageAlt: 'جاك هو - مؤسس HousePlus',
      intro: 'جاك هو هو المؤسس والمدير التحريري لـ HousePlus، وهي شركة تصنيع B2B متكاملة رأسياً متخصصة في أنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C. مع أكثر من ١٦ عامًا من الخبرة العملية في التصنيع والتجارة الدولية، يقود جاك فريقًا من أكثر من ٥٠٠ محترف يخدمون أكثر من ٤٤١ عميل جملة في أكثر من ٥٣ دولة من مصنع معتمد ISO 9001 بمساحة ٢٠٬٠٠٠ متر مربع في تشونغشان، قوانغدونغ.',
      expertise: [
        'هندسة وتصنيع أنظمة الطاقة الشمسية',
        'تطوير منتجات الأجهزة المنزلية OEM/ODM',
        'تصميم الإلكترونيات 3C وضمان الجودة',
        'استراتيجية الجملة B2B الدولية',
        'تحسين سلسلة التوريد وإدارة مراقبة الجودة',
        'معايير كفاءة الطاقة والامتثال',
      ],
      credentials: [
        'بكالوريوس هندسة كهربائية، جامعة جنوب الصين للتكنولوجيا',
        'مدقق أول معتمد ISO 9001',
        'حامل براءات اختراع: ١٢+ براءة نموذج منفعل في تكنولوجيا الطاقة الشمسية والأجهزة',
        'متحدث منتظم في معرض الصين للاستيراد والتصدير (معرض كانتون)',
        'عضو في غرفة الصين للإلكترونيات',
      ],
      publishedArticles: '٨٠+',
      publications: [
        'مساهم تقني في وقائع مؤتمر Solar Power International',
        'مذكور في مجلة Appliance حول اتجاهات التصنيع OEM',
        'محاضر ضيف في جامعة قوانغدونغ للتكنولوجيا - برنامج التجارة الدولية',
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/jackhu-houseplus',
        twitter: 'https://twitter.com/jackhu_houseplus',
      },
    },
  };

  const data = authorBio[lang] || authorBio.en;

  const personSchema = generatePersonSchema({
    name: data.name,
    jobTitle: data.role,
    worksFor: data.company,
    email: data.email,
    image: data.image,
    description: data.intro,
    url: `https://www.houseplus-ch.com/${lang}/author/jack-hu`,
    sameAs: [data.social.linkedin, data.social.twitter],
  });

  const isRTL = lang === 'ar';

  const labels: Record<string, any> = {
    en: {
      expertise: 'Areas of Expertise',
      credentials: 'Credentials & Certifications',
      publications: 'Publications & Speaking',
      articles: 'Published Articles',
      factory: 'Factory Size',
      team: 'Team Size',
      reach: 'Global Reach',
      clients: 'B2B Clients',
      experience: 'Industry Experience',
      founded: 'Year Founded',
      contact: 'Contact',
      viewAllArticles: 'View All Articles →',
    },
    es: {
      expertise: 'Áreas de Experiencia',
      credentials: 'Credenciales y Certificaciones',
      publications: 'Publicaciones y Ponencias',
      articles: 'Artículos Publicados',
      factory: 'Tamaño de Fábrica',
      team: 'Tamaño de Equipo',
      reach: 'Alcance Global',
      clients: 'Clientes B2B',
      experience: 'Experiencia Sectorial',
      founded: 'Año de Fundación',
      contact: 'Contacto',
      viewAllArticles: 'Ver Todos los Artículos →',
    },
    de: {
      expertise: 'Fachgebiete',
      credentials: 'Qualifikationen & Zertifizierungen',
      publications: 'Publikationen & Vorträge',
      articles: 'Veröffentlichte Artikel',
      factory: 'Fabrikgröße',
      team: 'Teamgröße',
      reach: 'Globale Reichweite',
      clients: 'B2B-Kunden',
      experience: 'Branchenerfahrung',
      founded: 'Gründungsjahr',
      contact: 'Kontakt',
      viewAllArticles: 'Alle Artikel ansehen →',
    },
    fr: {
      expertise: 'Domaines d\'Expertise',
      credentials: 'Titres & Certifications',
      publications: 'Publications & Conférences',
      articles: 'Articles Publiés',
      factory: 'Taille de l\'Usine',
      team: 'Taille de l\'Équipe',
      reach: 'Portée Mondiale',
      clients: 'Clients B2B',
      experience: 'Expérience Secteur',
      founded: 'Année de Fondation',
      contact: 'Contact',
      viewAllArticles: 'Voir tous les articles →',
    },
    ar: {
      expertise: 'مجالات الخبرة',
      credentials: 'المؤهلات والشهادات',
      publications: 'المنشورات والمحاضرات',
      articles: 'المقالات المنشورة',
      factory: 'مساحة المصنع',
      team: 'حجم الفريق',
      reach: 'الانتشار العالمي',
      clients: 'عملاء B2B',
      experience: 'الخبرة الصناعية',
      founded: 'سنة التأسيس',
      contact: 'اتصل',
      viewAllArticles: 'عرض جميع المقالات ←',
    },
  };

  const t = labels[lang] || labels.en;

  return (
      <main className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
        <SEOHead schemas={[personSchema]} />

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20 px-4">
          <div className="max-w-5xl mx-auto mb-8">
            <Breadcrumb lang={lang} slug="author/jack-hu" />
          </div>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 border-4 border-white/20">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                className="object-cover"
                priority
                quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                {data.role}
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">{data.name}</h1>
              <p className="text-blue-100 text-lg mb-2">{data.company} · {data.location}</p>
              <p className="text-blue-200 text-sm mb-6">{data.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <a href={`mailto:${data.email}`} className="px-5 py-2.5 bg-white text-blue-700 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                  {t.contact}
                </a>
                <Link href={`/${lang}/news`} className="px-5 py-2.5 bg-white/15 text-white border border-white/30 rounded-xl font-bold text-sm hover:bg-white/25 transition-colors">
                  {t.viewAllArticles}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stat Grid */}
        <section className="max-w-5xl mx-auto px-4 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: t.experience, value: data.experience },
              { label: t.founded, value: data.founded },
              { label: t.team, value: data.employees },
              { label: t.factory, value: data.factorySize },
              { label: t.clients, value: data.clients },
              { label: t.reach, value: data.countries },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-lg p-4 text-center">
                <div className="text-2xl font-black text-blue-600 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bio */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-100">
            <p className="text-lg text-slate-700 leading-relaxed">{data.intro}</p>
            <p className="text-sm text-slate-500 mt-4">Certifications: {data.certifications}</p>
          </div>
        </section>

        {/* Expertise + Credentials */}
        <section className="max-w-5xl mx-auto px-4 pb-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-5">{t.expertise}</h2>
            <ul className="space-y-3">
              {data.expertise.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1 flex-shrink-0">✓</span>
                  <span className="text-slate-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-5">{t.credentials}</h2>
            <ul className="space-y-3">
              {data.credentials.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1 flex-shrink-0">★</span>
                  <span className="text-slate-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Publications */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-8 md:p-10">
            <h2 className="text-xl font-black text-slate-900 mb-5">{t.publications}</h2>
            <ul className="space-y-3">
              {data.publications.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-600 mt-1 flex-shrink-0">📄</span>
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-amber-200 flex items-center justify-between">
              <span className="text-slate-600 font-semibold">{t.articles}:</span>
              <span className="text-3xl font-black text-amber-700">{data.publishedArticles}</span>
            </div>
          </div>
        </section>
      </main>
  );
}
