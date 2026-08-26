import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import { generateOrganizationSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

type CareerCopy = {
  heroTitle: string; heroSubtitle: string; whyTitle: string; whyBody: string;
  innovationTitle: string; innovationBody: string; impactTitle: string; impactBody: string;
  benefitsTitle: string; benefits: { icon: string; title: string; desc: string }[];
  jobsTitle: string; apply: string; heroAlt: string; teamAlt: string;
  jobs: { id: number; title: string; department: string; location: string; description: string }[];
};

const careerCopy: Record<string, CareerCopy> = {
  en: { heroTitle: 'Join HousePlus', heroSubtitle: 'Help us shape the future of energy and home technology.', whyTitle: 'Why Join the HousePlus Team?', whyBody: 'At HousePlus, we believe our people are our greatest asset. As a global leader in solar systems and home appliances, we offer a dynamic, innovative environment where your ideas can make a real impact on the world.', innovationTitle: 'Innovation Culture', innovationBody: 'Be part of the HousePlus R&D team developing next-gen technology.', impactTitle: 'Global Impact', impactBody: 'Contribute to HousePlus sustainable energy solutions worldwide.', benefitsTitle: 'HousePlus Employee Benefits', benefits: [{ icon: '💰', title: 'Competitive Salary', desc: 'Attractive HousePlus compensation packages based on experience.' }, { icon: '🏥', title: 'Health Insurance', desc: 'Comprehensive HousePlus health coverage for employees and families.' }, { icon: '📚', title: 'Professional Development', desc: 'HousePlus training programs and career advancement opportunities.' }], jobsTitle: 'Open Positions at HousePlus', apply: 'Apply', heroAlt: 'HousePlus Careers', teamAlt: 'HousePlus Team Collaboration', jobs: [{ id: 1, title: 'Manufacturing Engineer', department: 'Manufacturing', location: 'Shenzhen, China', description: 'Oversee HousePlus manufacturing processes for solar systems and home appliances. Ensure HousePlus standards and optimize production efficiency.' }, { id: 2, title: 'Sales Manager - Africa', department: 'Sales', location: 'Lagos, Nigeria', description: 'Lead HousePlus sales operations for the African market. Develop relationships with wholesale buyers and expand HousePlus market presence.' }, { id: 3, title: 'Product Development Specialist', department: 'R&D', location: 'Shenzhen, China', description: 'Develop innovative HousePlus products in solar, home appliances, and 3C electronics. Work with HousePlus cross-functional teams.' }] },
  es: { heroTitle: 'Únete a HousePlus', heroSubtitle: 'Ayúdanos a dar forma al futuro de la energía y la tecnología del hogar.', whyTitle: '¿Por qué unirte al equipo de HousePlus?', whyBody: 'En HousePlus creemos que nuestra gente es nuestro mayor activo. Como líder global en sistemas solares y electrodomésticos, ofrecemos un entorno dinámico e innovador donde tus ideas pueden tener un impacto real en el mundo.', innovationTitle: 'Cultura de innovación', innovationBody: 'Sé parte del equipo de I+D de HousePlus que desarrolla tecnología de próxima generación.', impactTitle: 'Impacto global', impactBody: 'Contribuye a las soluciones de energía sostenible de HousePlus en todo el mundo.', benefitsTitle: 'Beneficios para empleados de HousePlus', benefits: [{ icon: '💰', title: 'Salario competitivo', desc: 'Paquetes de compensación atractivos de HousePlus según la experiencia.' }, { icon: '🏥', title: 'Seguro de salud', desc: 'Cobertura de salud integral de HousePlus para empleados y familias.' }, { icon: '📚', title: 'Desarrollo profesional', desc: 'Programas de formación HousePlus y oportunidades de crecimiento profesional.' }], jobsTitle: 'Vacantes en HousePlus', apply: 'Postular', heroAlt: 'Carreras en HousePlus', teamAlt: 'Colaboración del equipo de HousePlus', jobs: [{ id: 1, title: 'Ingeniero de fabricación', department: 'Fabricación', location: 'Shenzhen, China', description: 'Supervisar los procesos de fabricación de HousePlus para sistemas solares y electrodomésticos. Garantizar los estándares de HousePlus y optimizar la eficiencia de producción.' }, { id: 2, title: 'Gerente de ventas - África', department: 'Ventas', location: 'Lagos, Nigeria', description: 'Liderar las operaciones de ventas de HousePlus para el mercado africano. Desarrollar relaciones con compradores mayoristas y ampliar la presencia de HousePlus en el mercado.' }, { id: 3, title: 'Especialista en desarrollo de productos', department: 'I+D', location: 'Shenzhen, China', description: 'Desarrollar productos innovadores de HousePlus en solar, electrodomésticos y electrónica 3C. Trabajar con equipos multifuncionales de HousePlus.' }] },
  de: { heroTitle: 'Werde Teil von HousePlus', heroSubtitle: 'Hilf mit, die Zukunft von Energie und Haustechnik zu gestalten.', whyTitle: 'Warum dem HousePlus-Team beitreten?', whyBody: 'Bei HousePlus sind unsere Mitarbeitenden unser größtes Kapital. Als globaler Anbieter von Solarsystemen und Haushaltsgeräten bieten wir ein dynamisches, innovatives Umfeld, in dem deine Ideen spürbare Wirkung entfalten.', innovationTitle: 'Innovationskultur', innovationBody: 'Sei Teil des HousePlus F&E-Teams und entwickle Technologie der nächsten Generation.', impactTitle: 'Globaler Impact', impactBody: 'Trage weltweit zu den nachhaltigen Energielösungen von HousePlus bei.', benefitsTitle: 'Mitarbeitervorteile bei HousePlus', benefits: [{ icon: '💰', title: 'Wettbewerbsfähiges Gehalt', desc: 'Attraktive Vergütungspakete von HousePlus basierend auf Erfahrung.' }, { icon: '🏥', title: 'Krankenversicherung', desc: 'Umfassender Gesundheitsschutz von HousePlus für Mitarbeitende und Familien.' }, { icon: '📚', title: 'Professionelle Weiterentwicklung', desc: 'Schulungsprogramme von HousePlus und Karriereentwicklungsmöglichkeiten.' }], jobsTitle: 'Offene Stellen bei HousePlus', apply: 'Bewerben', heroAlt: 'Karriere bei HousePlus', teamAlt: 'Teamzusammenarbeit bei HousePlus', jobs: [{ id: 1, title: 'Fertigungsingenieur', department: 'Fertigung', location: 'Shenzhen, China', description: 'Überwachung der HousePlus-Fertigungsprozesse für Solarsysteme und Haushaltsgeräte. Sicherstellen der HousePlus-Standards und Optimierung der Produktionseffizienz.' }, { id: 2, title: 'Vertriebsleiter – Afrika', department: 'Vertrieb', location: 'Lagos, Nigeria', description: 'Leitung der HousePlus-Vertriebsaktivitäten für den afrikanischen Markt. Beziehungen zu Großhandelskunden aufbauen und die Marktpräsenz von HousePlus ausbauen.' }, { id: 3, title: 'Spezialist Produktentwicklung', department: 'F&E', location: 'Shenzhen, China', description: 'Entwicklung innovativer HousePlus-Produkte in Solar, Haushaltsgeräten und 3C-Elektronik. Zusammenarbeit mit funktionsübergreifenden HousePlus-Teams.' }] },
  fr: { heroTitle: 'Rejoignez HousePlus', heroSubtitle: 'Aidez-nous à façonner l’avenir de l’énergie et de la technologie domestique.', whyTitle: 'Pourquoi rejoindre l’équipe HousePlus ?', whyBody: 'Chez HousePlus, nous considérons nos équipes comme notre atout le plus précieux. Leader mondial des systèmes solaires et des appareils domestiques, nous offrons un environnement dynamique et innovant où vos idées peuvent avoir un impact réel.', innovationTitle: 'Culture d’innovation', innovationBody: 'Faites partie de l’équipe R&D de HousePlus qui conçoit les technologies de prochaine génération.', impactTitle: 'Impact mondial', impactBody: 'Contribuez aux solutions d’énergie durable de HousePlus dans le monde entier.', benefitsTitle: 'Avantages pour les employés de HousePlus', benefits: [{ icon: '💰', title: 'Salaire compétitif', desc: 'Packages de rémunération attractifs de HousePlus selon l’expérience.' }, { icon: '🏥', title: 'Assurance santé', desc: 'Couverture santé complète de HousePlus pour les employés et leurs familles.' }, { icon: '📚', title: 'Développement professionnel', desc: 'Programmes de formation HousePlus et opportunités d’évolution de carrière.' }], jobsTitle: 'Postes ouverts chez HousePlus', apply: 'Postuler', heroAlt: 'Carrières chez HousePlus', teamAlt: 'Collaboration de l’équipe HousePlus', jobs: [{ id: 1, title: 'Ingénieur fabrication', department: 'Fabrication', location: 'Shenzhen, China', description: 'Superviser les processus de fabrication HousePlus pour les systèmes solaires et les appareils domestiques. Garantir les normes HousePlus et optimiser l’efficacité de la production.' }, { id: 2, title: 'Responsable des ventes - Afrique', department: 'Ventes', location: 'Lagos, Nigeria', description: 'Piloter les opérations de vente HousePlus pour le marché africain. Développer des relations avec les acheteurs en gros et renforcer la présence de HousePlus sur le marché.' }, { id: 3, title: 'Spécialiste développement produit', department: 'R&D', location: 'Shenzhen, China', description: 'Développer des produits innovants HousePlus dans le solaire, les appareils domestiques et l’électronique 3C. Travailler avec des équipes interfonctionnelles HousePlus.' }] },
  ar: { heroTitle: 'انضم إلى HousePlus', heroSubtitle: 'ساعدنا في تشكيل مستقبل الطاقة وتقنيات المنزل.', whyTitle: 'لماذا تنضم إلى فريق HousePlus؟', whyBody: 'في HousePlus نؤمن بأن موظفينا هم أعظم أصولنا. وبصفتنا شركة عالمية في أنظمة الطاقة الشمسية والأجهزة المنزلية، نوفر بيئة ديناميكية ومبتكرة حيث يمكن لأفكارك أن تُحدث أثراً حقيقياً.', innovationTitle: 'ثقافة الابتكار', innovationBody: 'كن جزءاً من فريق البحث والتطوير في HousePlus لتطوير تقنيات الجيل القادم.', impactTitle: 'أثر عالمي', impactBody: 'ساهم في حلول الطاقة المستدامة من HousePlus حول العالم.', benefitsTitle: 'مزايا موظفي HousePlus', benefits: [{ icon: '💰', title: 'راتب تنافسي', desc: 'حزم تعويضات جذابة من HousePlus تعتمد على الخبرة.' }, { icon: '🏥', title: 'تأمين صحي', desc: 'تغطية صحية شاملة من HousePlus للموظفين وعائلاتهم.' }, { icon: '📚', title: 'تطوير مهني', desc: 'برامج تدريب HousePlus وفرص التقدم المهني.' }], jobsTitle: 'وظائف شاغرة في HousePlus', apply: 'قدِّم طلبك', heroAlt: 'الوظائف في HousePlus', teamAlt: 'تعاون فريق HousePlus', jobs: [{ id: 1, title: 'مهندس تصنيع', department: 'التصنيع', location: 'Shenzhen, China', description: 'الإشراف على عمليات التصنيع في HousePlus لأنظمة الطاقة الشمسية والأجهزة المنزلية. ضمان معايير HousePlus وتحسين كفاءة الإنتاج.' }, { id: 2, title: 'مدير مبيعات - أفريقيا', department: 'المبيعات', location: 'Lagos, Nigeria', description: 'قيادة عمليات المبيعات في HousePlus للسوق الأفريقي. بناء علاقات مع المشترين بالجملة وتوسيع حضور HousePlus في السوق.' }, { id: 3, title: 'أخصائي تطوير المنتجات', department: 'البحث والتطوير', location: 'Shenzhen, China', description: 'تطوير منتجات مبتكرة من HousePlus في مجالات الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C. العمل مع فرق متعددة التخصصات في HousePlus.' }] },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { lang } = params;

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

export default async function CareersPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const locale = (validLangs as readonly string[]).includes(lang) ? lang : 'en';
  const t = careerCopy[locale];

  const schemas = [
    generateOrganizationSchema({ title: 'HousePlus', description: 'HousePlus careers and open positions in manufacturing, sales and R&D.', url: 'https://www.houseplus-ch.com/' + lang + '/careers', lang, type: 'Organization' }),
  ];

  const jobListings = t.jobs;
  const benefits = t.benefits;

  return (
    <SchemaRenderer schemas={schemas}>
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={locale} slug="careers" />
        
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.houseplus-ch.com/media/houseplus-site-careers-growth-workshop/"
              alt={t.heroAlt}
              className="object-cover"
            loading="lazy"
             title={t.heroAlt} decoding="async" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-black mb-6">{t.heroTitle}</h1>
            <p className="text-xl md:text-2xl opacity-90">{t.heroSubtitle}</p>
          </div>
        </section>

        {/* Why Join HousePlus */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t.whyTitle}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {t.whyBody}
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-blue-50 rounded-2xl">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <h4 className="font-bold">{t.innovationTitle}</h4>
                      <p className="text-sm text-slate-600">{t.innovationBody}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-green-50 rounded-2xl">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <h4 className="font-bold">{t.impactTitle}</h4>
                      <p className="text-sm text-slate-600">{t.impactBody}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.houseplus-ch.com/media/houseplus-site-office-meeting-boardroom/"
                  alt={t.teamAlt}
                  className="object-cover"
                loading="lazy"
                 title={t.teamAlt} decoding="async" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">{t.benefitsTitle}</h2>
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
            <h2 className="text-3xl font-bold mb-12 text-center">{t.jobsTitle}</h2>
            <div className="space-y-6">
              {jobListings.map((job) => (
                <div key={job.id} className="p-8 border border-slate-200 rounded-2xl hover:border-blue-500 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <p className="text-sm text-blue-600 font-medium uppercase tracking-wider">{job.department} • {job.location}</p>
                    </div>
                    <Link href={`/${locale}/contact`} className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800">{t.apply}</Link>
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
