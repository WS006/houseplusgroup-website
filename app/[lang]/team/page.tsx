import { Metadata } from 'next';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  
  const titles: Record<string, string> = {
    en: 'HousePlus Team - Experienced Professionals',
    es: 'Equipo HousePlus - Profesionales Experimentados',
    de: 'HousePlus Team - Erfahrene Fachleute',
    fr: 'Équipe HousePlus - Professionnels Expérimentés',
    ar: 'فريق HousePlus - محترفون ذوو خبرة',
  };

  const descriptions: Record<string, string> = {
    en: 'HousePlus team: 500+ professionals across manufacturing, R&D, assurance and customer service. 16 years of industry experience. 60+ R&D engineers. 80+ QA specialists. 200+ production staff. Supporting 441+ wholesale clients in 53+ countries from our 20,000 m² Guangdong facility.',
    es: 'Equipo de HousePlus: 500+ profesionales en fabricación, I+D, control de calidad y servicio al cliente. 16 años de experiencia. 60+ ingenieros de I+D. 80+ especialistas de QA. 200+ personal de producción. Apoyamos a 441+ clientes mayoristas en 53+ países desde nuestra instalación de 20.000 m² en Guangdong.',
    de: 'HousePlus-Team: 500+ Fachleute in Fertigung, F&E, Qualitätsicherung und Kundenservice. 16 Jahre Erfahrung. 60+ F&E-Ingenieure. 80+ QA-Spezialisten. 200+ Produktionsmitarbeiter. Wir unterstützen 441+ Großhandelskunden in 53+ Ländern von unserer 20.000 m² Anlage in Guangdong.',
    fr: 'Équipe HousePlus : 500+ professionnels en fabrication, R&D, assurance qualité et service client. 16 ans d\'expérience. 60+ ingénieurs R&D. 80+ spécialistes QA. 200+ personnel de production. Nous accompagnons 441+ clients de gros dans 53+ pays depuis notre installation de 20 000 m² au Guangdong.',
    ar: 'فريق HousePlus: أكثر من 500 محترف في التصنيع والبحث والتطوير وضمان الجودة وخدمة العملاء. 16 سنة خبرة. 60+ مهندس بحث وتطوير. 80+ متخصص ضمان الجودة. 200+ موظف إنتاج. ندعم 441+ عميل جملة في 53+ دولة من منشأتنا بمساحة 20,000 م² في قوانغدونغ.',
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

export default async function TeamPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional team dedicated to manufacturing excellence',
    url: `https://www.houseplus-ch.com/${lang}/team`,
    lang,
    type: 'Organization',
  });

  const copy = {
    en: {
      hero: {
        badge: 'HousePlus Team',
        title: 'Our HousePlus Team',
        intro: 'is powered by a dedicated team of 500+ skilled professionals with expertise in manufacturing, engineering, assurance, and customer service.',
      },
      images: {
        manufacturing: {
          alt: 'HousePlus manufacturing operations team reviewing production performance',
          title: 'HousePlus manufacturing operations team',
        },
        quality: {
          alt: 'HousePlus quality engineers conducting product testing',
          title: 'HousePlus quality engineering team',
        },
        culture: {
          alt: 'HousePlus R&D team collaborating on product innovation',
          title: 'HousePlus innovation and company culture',
        },
      },
      geo: {
        paragraph:
          'HousePlus team consists of 500+ professionals across manufacturing, R&D, assurance and customer service. With 16 years of industry experience, our 60+ R&D engineers, 80+ QA specialists and 200+ production staff work from a 20,000 m² Guangdong facility to support 441+ wholesale clients in 53+ countries. Every department is committed to delivering CE, FCC, RoHS and ISO 9001 certified products with a 12-month warranty.',
      },
      departments: {
        heading: 'HousePlus Departments',
        note: 'The HousePlus organization structure',
        list: [
          {
            name: 'HousePlus Manufacturing',
            desc: 'Experienced HousePlus production managers and technicians overseeing all manufacturing operations.',
            team: '200+ professionals',
          },
          {
            name: 'HousePlus Quality Assurance',
            desc: 'Certified HousePlus engineers ensuring every product meets international standards.',
            team: '80+ professionals',
          },
          {
            name: 'HousePlus Engineering & R&D',
            desc: 'Innovative HousePlus engineers developing new products and improving existing designs.',
            team: '60+ professionals',
          },
        ],
      },
      culture: {
        heading: 'HousePlus Company Culture',
        text:
          'At HousePlus, we believe in fostering a collaborative work environment where innovation thrives and excellence is the standard. Our HousePlus team members are encouraged to contribute ideas and take ownership of their work.',
        bullets: ['Innovation & Collaboration', 'Professional Development', 'Work-Life Balance', 'Competitive Compensation'],
      },
      leadership: {
        heading: 'HousePlus Leadership',
        text:
          'Our HousePlus leadership team brings decades of combined experience in manufacturing and international trade. Led by founder Jack Hu, HousePlus has grown into a multi-industry enterprise.',
        people: [
          { name: 'Jack Hu', role: 'Founder & CEO', bio: 'Visionary leader with 20+ years in manufacturing and international trade' },
          { name: 'Sarah Chen', role: 'VP Manufacturing', bio: 'Expert in production optimization and management systems' },
          { name: 'Michael Rodriguez', role: 'VP Sales & Business Development', bio: 'Experienced in wholesale distribution and global market expansion' },
        ],
      },
      cta: {
        heading: 'Join the HousePlus Team',
        pre: 'We are always looking for talented professionals to join our growing',
        post:
          'organization. If you are passionate about manufacturing excellence and want to make an impact, we would love to hear from you.',
        contact: 'Contact HR',
        learn: 'Learn More About HousePlus',
      },
    },
    es: {
      hero: {
        badge: 'Equipo HousePlus',
        title: 'Nuestro Equipo HousePlus',
        intro:
          'está impulsado por un equipo dedicado de 500+ profesionales capacitados con experiencia en manufactura, ingeniería, aseguramiento de calidad y servicio al cliente.',
      },
      images: {
        manufacturing: {
          alt: 'Equipo de operaciones de fabricación de HousePlus revisando el desempeño de producción',
          title: 'Equipo de operaciones de fabricación de HousePlus',
        },
        quality: {
          alt: 'Ingenieros de calidad de HousePlus realizando pruebas de producto',
          title: 'Equipo de ingeniería de calidad de HousePlus',
        },
        culture: {
          alt: 'Equipo de I+D de HousePlus colaborando en la innovación de productos',
          title: 'Innovación y cultura empresarial de HousePlus',
        },
      },
      geo: {
        paragraph:
          'El equipo de HousePlus está compuesto por 500+ profesionales en fabricación, I+D, aseguramiento de calidad y servicio al cliente. Con 16 años de experiencia en la industria, nuestros 60+ ingenieros de I+D, 80+ especialistas de QA y 200+ personal de producción trabajan desde una instalación de 20,000 m² en Guangdong para apoyar a 441+ clientes mayoristas en 53+ países. Cada departamento se compromete a entregar productos certificados CE, FCC, RoHS e ISO 9001 con una garantía de 12 meses.',
      },
      departments: {
        heading: 'Departamentos HousePlus',
        note: 'La estructura organizativa de HousePlus',
        list: [
          {
            name: 'Manufactura HousePlus',
            desc: 'Gerentes de producción y técnicos experimentados de HousePlus supervisan todas las operaciones de fabricación.',
            team: '200+ profesionales',
          },
          {
            name: 'Aseguramiento de Calidad HousePlus',
            desc: 'Ingenieros de calidad certificados de HousePlus aseguran que cada producto cumpla con los estándares internacionales.',
            team: '80+ profesionales',
          },
          {
            name: 'Ingeniería e I+D HousePlus',
            desc: 'Ingenieros innovadores de HousePlus desarrollan nuevos productos y mejoran diseños existentes.',
            team: '60+ profesionales',
          },
        ],
      },
      culture: {
        heading: 'Cultura Empresarial HousePlus',
        text:
          'En HousePlus, creemos en fomentar un ambiente de trabajo colaborativo donde la innovación prospera y la excelencia es el estándar. Se anima a los miembros del equipo de HousePlus a aportar ideas y asumir la responsabilidad de su trabajo.',
        bullets: ['Innovación y colaboración', 'Desarrollo profesional', 'Equilibrio entre vida y trabajo', 'Compensación competitiva'],
      },
      leadership: {
        heading: 'Liderazgo HousePlus',
        text:
          'Nuestro equipo de liderazgo de HousePlus aporta décadas de experiencia combinada en manufactura y comercio internacional. Bajo la dirección del fundador Jack Hu, HousePlus se ha convertido en una empresa multisectorial.',
        people: [
          { name: 'Jack Hu', role: 'Fundador y CEO', bio: 'Líder visionario con 20+ años en manufactura y comercio internacional' },
          { name: 'Sarah Chen', role: 'VP de Manufactura', bio: 'Experta en optimización de producción y sistemas de gestión' },
          { name: 'Michael Rodriguez', role: 'VP de Ventas y Desarrollo Comercial', bio: 'Con experiencia en distribución mayorista y expansión de mercados globales' },
        ],
      },
      cta: {
        heading: 'Únete al equipo de HousePlus',
        pre: 'Siempre buscamos profesionales con talento para unirse a nuestra creciente',
        post:
          'organización. Si te apasiona la excelencia en la manufactura y quieres generar impacto, nos encantaría conocerte.',
        contact: 'Contactar RR. HH.',
        learn: 'Conoce más sobre HousePlus',
      },
    },
    de: {
      hero: {
        badge: 'HousePlus-Team',
        title: 'Unser HousePlus-Team',
        intro:
          'wird von einem engagierten Team von 500+ qualifizierten Fachleuten mit Expertise in Fertigung, Ingenieurwesen, Qualitätssicherung und Kundenservice angetrieben.',
      },
      images: {
        manufacturing: {
          alt: 'HousePlus-Team für Fertigungsabläufe überprüft die Produktionsleistung',
          title: 'HousePlus-Team für Fertigungsabläufe',
        },
        quality: {
          alt: 'Qualitätsingenieure von HousePlus führen Produkttests durch',
          title: 'HousePlus-Team für Qualitätsingenieurwesen',
        },
        culture: {
          alt: 'HousePlus F&E-Team arbeitet gemeinsam an Produktinnovationen',
          title: 'HousePlus Innovation und Unternehmenskultur',
        },
      },
      geo: {
        paragraph:
          'Das HousePlus-Team besteht aus 500+ Fachleuten in Fertigung, F&E, Qualitätssicherung und Kundenservice. Mit 16 Jahren Branchenerfahrung arbeiten unsere 60+ F&E-Ingenieure, 80+ QA-Spezialisten und 200+ Produktionsmitarbeiter von einer 20,000 m² Anlage in Guangdong aus und unterstützen 441+ Großhandelskunden in 53+ Ländern. Jede Abteilung verpflichtet sich zur Lieferung von CE-, FCC-, RoHS- und ISO 9001-zertifizierten Produkten mit einer Garantie von 12 Monaten.',
      },
      departments: {
        heading: 'HousePlus-Abteilungen',
        note: 'Die Organisationsstruktur von HousePlus',
        list: [
          {
            name: 'HousePlus-Fertigung',
            desc: 'Erfahrene HousePlus-Produktionsmanager und Techniker überwachen alle Fertigungsvorgänge.',
            team: '200+ Fachleute',
          },
          {
            name: 'HousePlus-Qualitätssicherung',
            desc: 'Zertifizierte HousePlus-Ingenieure stellen sicher, dass jedes Produkt internationale Standards erfüllt.',
            team: '80+ Fachleute',
          },
          {
            name: 'HousePlus-Ingenieurwesen & F&E',
            desc: 'Innovative HousePlus-Ingenieure entwickeln neue Produkte und verbessern bestehende Designs.',
            team: '60+ Fachleute',
          },
        ],
      },
      culture: {
        heading: 'HousePlus-Unternehmenskultur',
        text:
          'Bei HousePlus fördern wir ein kollaboratives Arbeitsumfeld, in dem Innovation gedeiht und Exzellenz der Standard ist. Mitglieder des HousePlus-Teams werden ermutigt, Ideen einzubringen und Verantwortung für ihre Arbeit zu übernehmen.',
        bullets: ['Innovation und Zusammenarbeit', 'Professionelle Weiterentwicklung', 'Work-Life-Balance', 'Wettbewerbsfähige Vergütung'],
      },
      leadership: {
        heading: 'HousePlus-Führung',
        text:
          'Unser HousePlus-Führungsteam bringt Jahrzehnte kombinierter Erfahrung in Fertigung und internationalem Handel mit. Unter der Führung des Gründers Jack Hu ist HousePlus zu einem Mehrbranchenunternehmen herangewachsen.',
        people: [
          { name: 'Jack Hu', role: 'Gründer & CEO', bio: 'Visionäre Führungskraft mit 20+ Jahren in Fertigung und internationalem Handel' },
          { name: 'Sarah Chen', role: 'VP Fertigung', bio: 'Expertin für Produktionsoptimierung und Managementsysteme' },
          { name: 'Michael Rodriguez', role: 'VP Vertrieb & Business Development', bio: 'Erfahren in Großhandelsvertrieb und globaler Marktexpansion' },
        ],
      },
      cta: {
        heading: 'Werde Teil des HousePlus-Teams',
        pre: 'Wir suchen stets talentierte Fachkräfte, die sich unserer wachsenden',
        post:
          'Organisation anschließen möchten. Wenn Sie für Fertigungs-Exzellenz brennen und etwas bewirken wollen, freuen wir uns auf Ihre Nachricht.',
        contact: 'Kontakt Personalabteilung',
        learn: 'Mehr über HousePlus erfahren',
      },
    },
    fr: {
      hero: {
        badge: 'Équipe HousePlus',
        title: 'Équipe HousePlus',
        intro:
          'est portée par une équipe dédiée de 500+ professionnels qualifiés, experts en fabrication, ingénierie, assurance qualité et service client.',
      },
      images: {
        manufacturing: {
          alt: 'Équipe des opérations de fabrication de HousePlus examinant les performances de production',
          title: 'Équipe des opérations de fabrication de HousePlus',
        },
        quality: {
          alt: 'Ingénieurs qualité de HousePlus réalisant des tests produits',
          title: 'Équipe d’ingénierie qualité de HousePlus',
        },
        culture: {
          alt: 'Équipe R&D de HousePlus collaborant sur l’innovation produit',
          title: 'Innovation et culture d’entreprise HousePlus',
        },
      },
      geo: {
        paragraph:
          'L\'équipe HousePlus est composée de 500+ professionnels en fabrication, R&D, assurance qualité et service client. Avec 16 ans d’expérience dans le secteur, nos 60+ ingénieurs R&D, 80+ spécialistes QA et 200+ personnels de production travaillent depuis une installation de 20,000 m² au Guangdong pour accompagner 441+ clients de gros dans 53+ pays. Chaque département s’engage à fournir des produits certifiés CE, FCC, RoHS et ISO 9001 avec une garantie de 12 mois.',
      },
      departments: {
        heading: 'Départements HousePlus',
        note: 'La structure organisationnelle de HousePlus',
        list: [
          {
            name: 'Fabrication HousePlus',
            desc: 'Des gestionnaires de production et des techniciens expérimentés de HousePlus supervisent toutes les opérations de fabrication.',
            team: '200+ professionnels',
          },
          {
            name: 'Assurance Qualité HousePlus',
            desc: 'Les ingénieurs qualité certifiés de HousePlus s’assurent que chaque produit respecte les normes internationales.',
            team: '80+ professionnels',
          },
          {
            name: 'Ingénierie et R&D HousePlus',
            desc: 'Les ingénieurs innovants de HousePlus développent de nouveaux produits et améliorent les conceptions existantes.',
            team: '60+ professionnels',
          },
        ],
      },
      culture: {
        heading: 'Culture d’Entreprise HousePlus',
        text:
          'Chez HousePlus, nous favorisons un environnement de travail collaboratif où l’innovation s’épanouit et l’excellence est la norme. Les membres de l’équipe HousePlus sont encouragés à proposer des idées et à assumer la responsabilité de leur travail.',
        bullets: ['Innovation et collaboration', 'Développement professionnel', 'Équilibre vie-travail', 'Rémunération compétitive'],
      },
      leadership: {
        heading: 'Leadership HousePlus',
        text:
          'L’équipe de direction HousePlus apporte des décennies d’expérience cumulée en fabrication et en commerce international. Sous la direction du fondateur Jack Hu, HousePlus est devenue une entreprise multi-secteurs.',
        people: [
          { name: 'Jack Hu', role: 'Fondateur & CEO', bio: 'Leader visionnaire avec 20+ ans en fabrication et commerce international' },
          { name: 'Sarah Chen', role: 'VP Fabrication', bio: 'Experte en optimisation de la production et systèmes de gestion' },
          { name: 'Michael Rodriguez', role: 'VP Ventes & Développement Commercial', bio: 'Expérimenté en distribution de gros et expansion sur les marchés mondiaux' },
        ],
      },
      cta: {
        heading: 'Rejoignez l’équipe HousePlus',
        pre: 'Nous recherchons en permanence des professionnels talentueux pour rejoindre notre',
        post:
          'organisation en croissance. Si vous êtes passionné par l’excellence manufacturière et souhaitez avoir un impact, nous serions ravis d’échanger avec vous.',
        contact: 'Contacter RH',
        learn: 'En savoir plus sur HousePlus',
      },
    },
    ar: {
      hero: {
        badge: 'فريق HousePlus',
        title: 'فريق HousePlus',
        intro:
          'مدعومة بفريق مكرّس يضم 500+ من المتخصصين المهرة ذوي الخبرة في التصنيع والهندسة وضمان الجودة وخدمة العملاء.',
      },
      images: {
        manufacturing: {
          alt: 'فريق عمليات التصنيع في HousePlus يراجع أداء الإنتاج',
          title: 'فريق عمليات التصنيع في HousePlus',
        },
        quality: {
          alt: 'مهندسو جودة HousePlus يجرون اختبارات للمنتجات',
          title: 'فريق هندسة الجودة في HousePlus',
        },
        culture: {
          alt: 'فريق البحث والتطوير في HousePlus يتعاون على ابتكار المنتجات',
          title: 'ثقافة الشركة والابتكار في HousePlus',
        },
      },
      geo: {
        paragraph:
          'يتكون فريق HousePlus من 500+ محترف عبر التصنيع والبحث والتطوير وضمان الجودة وخدمة العملاء. مع 16 سنة من الخبرة في القطاع، يعمل لدينا 60+ مهندس R&D و80+ متخصص QA و200+ موظف إنتاج من منشأة بمساحة 20,000 م² في قوانغدونغ لدعم 441+ عميل جملة في 53+ دولة. تلتزم كل دائرة بتقديم منتجات معتمدة CE وFCC وRoHS وISO 9001 مع ضمان لمدة 12 شهرًا.',
      },
      departments: {
        heading: 'أقسام HousePlus',
        note: 'الهيكل التنظيمي لـ HousePlus',
        list: [
          {
            name: 'التصنيع HousePlus',
            desc: 'مديرو الإنتاج والفنيون المتمرسون من HousePlus يشرفون على جميع عمليات التصنيع.',
            team: '200+ متخصص',
          },
          {
            name: 'ضمان الجودة HousePlus',
            desc: 'مهندسو HousePlus المعتمدون يضمنون أن كل منتج يلبّي المعايير الدولية.',
            team: '80+ متخصص',
          },
          {
            name: 'الهندسة والبحث HousePlus',
            desc: 'مهندسو HousePlus المبتكرون يطوّرون منتجات جديدة ويحسّنون التصاميم القائمة.',
            team: '60+ متخصص',
          },
        ],
      },
      culture: {
        heading: 'ثقافة HousePlus',
        text:
          'في HousePlus نعمل على تعزيز بيئة عمل تعاونية تزدهر فيها الابتكارات ويكون التميّز هو المعيار. نُشجّع أعضاء فريق HousePlus على طرح الأفكار وتحمل مسؤولية أعمالهم.',
        bullets: ['الابتكار والتعاون', 'التطوير المهني', 'توازن الحياة والعمل', 'تعويضات تنافسية'],
      },
      leadership: {
        heading: 'قيادة HousePlus',
        text:
          'يجلب فريق القيادة في HousePlus عقودًا من الخبرة المجمّعة في التصنيع والتجارة الدولية. تحت قيادة المؤسس Jack Hu، نمت HousePlus لتصبح مؤسسة متعددة القطاعات.',
        people: [
          { name: 'Jack Hu', role: 'المؤسس والرئيس التنفيذي', bio: 'قائد صاحب رؤية مع خبرة 20+ سنة في التصنيع والتجارة الدولية' },
          { name: 'Sarah Chen', role: 'نائب الرئيس للتصنيع', bio: 'خبيرة في تحسين الإنتاج وأنظمة الإدارة' },
          { name: 'Michael Rodriguez', role: 'نائب الرئيس للمبيعات وتطوير الأعمال', bio: 'خبير في التوزيع بالجملة وتوسيع الأسواق العالمية' },
        ],
      },
      cta: {
        heading: 'انضم إلى فريق HousePlus',
        pre: 'نبحث دائماً عن محترفين موهوبين للانضمام إلى منظمتنا',
        post:
          'المتنـامية. إذا كان شغفك التميز في التصنيع وترغب في إحداث أثر، يسعدنا التواصل معك.',
        contact: 'تواصل مع الموارد البشرية',
        learn: 'تعرّف أكثر على HousePlus',
      },
    },
  } as const;

  const activeLang = (validLangs as readonly string[]).includes(lang)
    ? (lang as keyof typeof copy)
    : 'en';
  const t = copy[activeLang];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://www.houseplus-ch.com/${lang}` },
    { name: 'Team', url: `https://www.houseplus-ch.com/${lang}/team` },
  ]);

  return (
    <>
      <SEOHead schemas={[organizationSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} slug="team" />
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              🏭 {t.hero.badge}
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">🏭 {t.hero.title}</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              <strong>HousePlus</strong> {t.hero.intro}
            </p>
          </div>
        </section>

        {/* Team Image Banner - Using reliable Unsplash links */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.houseplus-ch.com/media/houseplus-team-team-manufacturing-collaboration/"
                  alt={t.images.manufacturing.alt}
                  title={t.images.manufacturing.title}
                  className="w-full h-full object-cover"
                  decoding="async" />
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.houseplus-ch.com/media/houseplus-team-team-quality-engineering/"
                  alt={t.images.quality.alt}
                  title={t.images.quality.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* GEO Team Description */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
              <p className="text-slate-700 leading-relaxed">
                {t.geo.paragraph}
              </p>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-3">🏭 {t.departments.heading}</h2>
              <p className="text-slate-500">{t.departments.note}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.departments.list.map((dept) => (
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
                <img
                  src="https://images.houseplus-ch.com/media/houseplus-team-team-innovation-culture/"
                  alt={t.images.culture.alt}
                  title={t.images.culture.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">🏭 {t.culture.heading}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">{t.culture.text}</p>
                <div className="space-y-3">
                  {t.culture.bullets.map((item) => (
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
              <h2 className="text-3xl font-black text-slate-900 mb-3">🏭 {t.leadership.heading}</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">{t.leadership.text}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.leadership.people.map((leader) => (
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
            <h2 className="text-3xl font-black text-slate-900 mb-4">🏭 {t.cta.heading}</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {t.cta.pre} <strong>HousePlus</strong> {t.cta.post}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`/${lang}/contact`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                {t.cta.contact}
              </a>
              <a href={`/${lang}/about-us`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                {t.cta.learn}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
