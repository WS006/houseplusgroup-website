import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import Breadcrumb from '@/components/Breadcrumb';
import ResponsiveImage from '@/components/ResponsiveImage';
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
    { name: lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : lang === 'de' ? 'Startseite' : lang === 'fr' ? 'Accueil' : 'الرئيسية', url: `/${lang}` },
    { name: lang === 'en' ? 'Careers' : lang === 'es' ? 'Carreras' : lang === 'de' ? 'Karriere' : lang === 'fr' ? 'Carrières' : 'الوظائف', url: `/${lang}/careers` },
  ];

  const schemas = [
    buildOrganizationSchema({ lang }),
    buildBreadcrumbSchema(breadcrumbs),
  ];

  const jobListings = [
    {
      id: 1,
      titleEn: 'Manufacturing Engineer',
      titleEs: 'Ingeniero de Fabricación',
      titleDe: 'Fertigungsingenieur',
      titleFr: 'Ingénieur de Fabrication',
      titleAr: 'مهندس التصنيع',
      departmentEn: 'Manufacturing',
      departmentEs: 'Fabricación',
      departmentDe: 'Fertigung',
      departmentFr: 'Fabrication',
      departmentAr: 'التصنيع',
      locationEn: 'Shenzhen, China',
      locationEs: 'Shenzhen, China',
      locationDe: 'Shenzhen, China',
      locationFr: 'Shenzhen, China',
      locationAr: 'شنتشن، الصين',
      descriptionEn: 'Oversee manufacturing processes for solar systems and home appliances. Ensure quality standards and optimize production efficiency.',
      descriptionEs: 'Supervisar los procesos de fabricación de sistemas solares y electrodomésticos. Garantizar estándares de calidad y optimizar la eficiencia de producción.',
      descriptionDe: 'Überwachen Sie Fertigungsprozesse für Solarsysteme und Haushaltsgeräte. Gewährleisten Sie Qualitätsstandards und optimieren Sie die Produktionseffizienz.',
      descriptionFr: 'Superviser les processus de fabrication des systèmes solaires et des appareils électroménagers. Assurer les normes de qualité et optimiser l\'efficacité de la production.',
      descriptionAr: 'الإشراف على عمليات التصنيع للأنظمة الشمسية والأجهزة المنزلية. ضمان معايير الجودة وتحسين كفاءة الإنتاج.',
    },
    {
      id: 2,
      titleEn: 'Sales Manager - Africa',
      titleEs: 'Gerente de Ventas - África',
      titleDe: 'Vertriebsleiter - Afrika',
      titleFr: 'Responsable des Ventes - Afrique',
      titleAr: 'مدير المبيعات - أفريقيا',
      departmentEn: 'Sales',
      departmentEs: 'Ventas',
      departmentDe: 'Vertrieb',
      departmentFr: 'Ventes',
      departmentAr: 'المبيعات',
      locationEn: 'Lagos, Nigeria',
      locationEs: 'Lagos, Nigeria',
      locationDe: 'Lagos, Nigeria',
      locationFr: 'Lagos, Nigeria',
      locationAr: 'لاغوس، نيجيريا',
      descriptionEn: 'Lead sales operations for the African market. Develop relationships with wholesale buyers and expand market presence.',
      descriptionEs: 'Dirigir operaciones de ventas para el mercado africano. Desarrollar relaciones con compradores mayoristas y expandir la presencia en el mercado.',
      descriptionDe: 'Leiten Sie Verkaufsoperationen für den afrikanischen Markt. Entwickeln Sie Beziehungen zu Großhandelskäufern und erweitern Sie die Marktpräsenz.',
      descriptionFr: 'Diriger les opérations de vente pour le marché africain. Développer des relations avec les acheteurs en gros et élargir la présence sur le marché.',
      descriptionAr: 'قيادة عمليات المبيعات في السوق الأفريقية. تطوير العلاقات مع المشترين بالجملة وتوسيع الحضور في السوق.',
    },
    {
      id: 3,
      titleEn: 'Product Development Specialist',
      titleEs: 'Especialista en Desarrollo de Productos',
      titleDe: 'Spezialist für Produktentwicklung',
      titleFr: 'Spécialiste du Développement de Produits',
      titleAr: 'متخصص تطوير المنتجات',
      departmentEn: 'R&D',
      departmentEs: 'I+D',
      departmentDe: 'F&E',
      departmentFr: 'R&D',
      departmentAr: 'البحث والتطوير',
      locationEn: 'Shenzhen, China',
      locationEs: 'Shenzhen, China',
      locationDe: 'Shenzhen, China',
      locationFr: 'Shenzhen, China',
      locationAr: 'شنتشن، الصين',
      descriptionEn: 'Develop innovative products in solar, home appliances, and 3C electronics. Work with cross-functional teams to bring new solutions to market.',
      descriptionEs: 'Desarrollar productos innovadores en energía solar, electrodomésticos y electrónica 3C. Trabajar con equipos multifuncionales para llevar nuevas soluciones al mercado.',
      descriptionDe: 'Entwickeln Sie innovative Produkte in Solar-, Haushaltsgeräte- und 3C-Elektronik. Arbeiten Sie mit funktionsübergreifenden Teams zusammen, um neue Lösungen auf den Markt zu bringen.',
      descriptionFr: 'Développer des produits innovants en énergie solaire, appareils électroménagers et électronique 3C. Travailler avec des équipes interfonctionnelles pour commercialiser de nouvelles solutions.',
      descriptionAr: 'تطوير منتجات مبتكرة في الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. العمل مع فرق متعددة الوظائف لإطلاق حلول جديدة في السوق.',
    },
    {
      id: 4,
      titleEn: 'Quality Assurance Technician',
      titleEs: 'Técnico de Aseguramiento de Calidad',
      titleDe: 'Qualitätssicherungstechniker',
      titleFr: 'Technicien d\'Assurance Qualité',
      titleAr: 'فني ضمان الجودة',
      departmentEn: 'Quality Control',
      departmentEs: 'Control de Calidad',
      departmentDe: 'Qualitätskontrolle',
      departmentFr: 'Contrôle de Qualité',
      departmentAr: 'مراقبة الجودة',
      locationEn: 'Shenzhen, China',
      locationEs: 'Shenzhen, China',
      locationDe: 'Shenzhen, China',
      locationFr: 'Shenzhen, China',
      locationAr: 'شنتشن، الصين',
      descriptionEn: 'Ensure all products meet international quality standards. Conduct testing and inspections to maintain HousePlus quality reputation.',
      descriptionEs: 'Asegurar que todos los productos cumplan con los estándares de calidad internacional. Realizar pruebas e inspecciones para mantener la reputación de calidad de HousePlus.',
      descriptionDe: 'Stellen Sie sicher, dass alle Produkte internationale Qualitätsstandards erfüllen. Führen Sie Tests und Inspektionen durch, um den Qualitätsruf von HousePlus zu wahren.',
      descriptionFr: 'Assurer que tous les produits répondent aux normes de qualité internationales. Effectuer des tests et des inspections pour maintenir la réputation de qualité de HousePlus.',
      descriptionAr: 'ضمان أن جميع المنتجات تلبي معايير الجودة الدولية. إجراء الاختبارات والفحوصات للحفاظ على سمعة HousePlus في الجودة.',
    },
  ];

  const benefits = [
    {
      iconEn: '💰',
      titleEn: 'Competitive Salary',
      titleEs: 'Salario Competitivo',
      titleDe: 'Wettbewerbsfähiges Gehalt',
      titleFr: 'Salaire Compétitif',
      titleAr: 'راتب تنافسي',
      descriptionEn: 'Attractive compensation packages based on experience and qualifications.',
      descriptionEs: 'Paquetes de compensación atractivos basados en experiencia y calificaciones.',
      descriptionDe: 'Attraktive Vergütungspakete basierend auf Erfahrung und Qualifikationen.',
      descriptionFr: 'Packages de rémunération attrayants basés sur l\'expérience et les qualifications.',
      descriptionAr: 'حزم تعويضات جذابة بناءً على الخبرة والمؤهلات.',
    },
    {
      iconEn: '🏥',
      titleEn: 'Health Insurance',
      titleEs: 'Seguro de Salud',
      titleDe: 'Krankenversicherung',
      titleFr: 'Assurance Maladie',
      titleAr: 'تأمين صحي',
      descriptionEn: 'Comprehensive health coverage for employees and their families.',
      descriptionEs: 'Cobertura de salud integral para empleados y sus familias.',
      descriptionDe: 'Umfassende Krankenversicherung für Mitarbeiter und ihre Familien.',
      descriptionFr: 'Couverture santé complète pour les employés et leurs familles.',
      descriptionAr: 'تغطية صحية شاملة للموظفين وعائلاتهم.',
    },
    {
      iconEn: '📚',
      titleEn: 'Professional Development',
      titleEs: 'Desarrollo Profesional',
      titleDe: 'Berufliche Entwicklung',
      titleFr: 'Développement Professionnel',
      titleAr: 'التطور المهني',
      descriptionEn: 'Training programs and opportunities for career advancement.',
      descriptionEs: 'Programas de capacitación y oportunidades para el avance profesional.',
      descriptionDe: 'Schulungsprogramme und Aufstiegschancen.',
      descriptionFr: 'Programmes de formation et opportunités d\'avancement professionnel.',
      descriptionAr: 'برامج التدريب وفرص التطور الوظيفي.',
    },
    {
      iconEn: '🌍',
      titleEn: 'Global Opportunities',
      titleEs: 'Oportunidades Globales',
      titleDe: 'Globale Chancen',
      titleFr: 'Opportunités Mondiales',
      titleAr: 'فرص عالمية',
      descriptionEn: 'Work with international teams and expand your career globally.',
      descriptionEs: 'Trabaja con equipos internacionales y expande tu carrera globalmente.',
      descriptionDe: 'Arbeiten Sie mit internationalen Teams und erweitern Sie Ihre Karriere global.',
      descriptionFr: 'Travaillez avec des équipes internationales et développez votre carrière mondialement.',
      descriptionAr: 'العمل مع فرق دولية وتوسيع حياتك المهنية عالمياً.',
    },
    {
      iconEn: '⚖️',
      titleEn: 'Work-Life Balance',
      titleEs: 'Equilibrio Trabajo-Vida',
      titleDe: 'Work-Life-Balance',
      titleFr: 'Équilibre Travail-Vie',
      titleAr: 'التوازن بين العمل والحياة',
      descriptionEn: 'Flexible working arrangements and paid time off.',
      descriptionEs: 'Arreglos de trabajo flexible y tiempo libre pagado.',
      descriptionDe: 'Flexible Arbeitsverhältnisse und bezahlte Freizeit.',
      descriptionFr: 'Arrangements de travail flexibles et congés payés.',
      descriptionAr: 'ترتيبات عمل مرنة وإجازات مدفوعة الأجر.',
    },
    {
      iconEn: '🎯',
      titleEn: 'Performance Bonuses',
      titleEs: 'Bonificaciones por Desempeño',
      titleDe: 'Leistungsprämien',
      titleFr: 'Primes de Performance',
      titleAr: 'مكافآت الأداء',
      descriptionEn: 'Rewards for exceptional performance and contributions.',
      descriptionEs: 'Recompensas por desempeño excepcional y contribuciones.',
      descriptionDe: 'Belohnungen für außergewöhnliche Leistungen und Beiträge.',
      descriptionFr: 'Récompenses pour les performances exceptionnelles et les contributions.',
      descriptionAr: 'مكافآت للأداء الاستثنائي والمساهمات.',
    },
  ];

  return (
    <SchemaRenderer schemas={schemas}>
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <Breadcrumb lang={lang} />

        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {lang === 'en' && 'Build Your Career at HousePlus'}
              {lang === 'es' && 'Construye tu Carrera en HousePlus'}
              {lang === 'de' && 'Bauen Sie Ihre Karriere bei HousePlus auf'}
              {lang === 'fr' && 'Construisez votre carrière chez HousePlus'}
              {lang === 'ar' && 'بناء حياتك المهنية في HousePlus'}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl">
              {lang === 'en' && 'Join a global leader in manufacturing solar systems, home appliances, and 3C electronics. We\'re looking for talented individuals to help us innovate and grow.'}
              {lang === 'es' && 'Únete a un líder global en la fabricación de sistemas solares, electrodomésticos y electrónica 3C. Estamos buscando individuos talentosos para ayudarnos a innovar y crecer.'}
              {lang === 'de' && 'Treten Sie einem globalen Anführer in der Herstellung von Solarsystemen, Haushaltsgeräten und 3C-Elektronik bei. Wir suchen talentierte Personen, um uns bei Innovation und Wachstum zu helfen.'}
              {lang === 'fr' && 'Rejoignez un leader mondial dans la fabrication de systèmes solaires, d\'appareils électroménagers et d\'électronique 3C. Nous recherchons des personnes talentueuses pour nous aider à innover et à grandir.'}
              {lang === 'ar' && 'انضم إلى قائد عالمي في تصنيع الأنظمة الشمسية والأجهزة المنزلية والإلكترونيات 3C. نحن نبحث عن أفراد موهوبين لمساعدتنا على الابتكار والنمو.'}
            </p>
          </div>
        </section>

        {/* Why Join HousePlus */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {lang === 'en' && 'Why Join HousePlus?'}
              {lang === 'es' && '¿Por qué unirse a HousePlus?'}
              {lang === 'de' && 'Warum zu HousePlus beitreten?'}
              {lang === 'fr' && 'Pourquoi rejoindre HousePlus?'}
              {lang === 'ar' && 'لماذا تنضم إلى HousePlus؟'}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  {lang === 'en' && '🌟 Global Impact'}
                  {lang === 'es' && '🌟 Impacto Global'}
                  {lang === 'de' && '🌟 Globale Auswirkungen'}
                  {lang === 'fr' && '🌟 Impact Mondial'}
                  {lang === 'ar' && '🌟 التأثير العالمي'}
                </h3>
                <p className="text-gray-700">
                  {lang === 'en' && 'Work on products that serve customers in 30+ countries across Africa, Southeast Asia, and Europe. Your work directly impacts millions of lives.'}
                  {lang === 'es' && 'Trabaja en productos que sirven a clientes en más de 30 países en África, Sudeste Asiático y Europa. Tu trabajo impacta directamente a millones de vidas.'}
                  {lang === 'de' && 'Arbeiten Sie an Produkten, die Kunden in über 30 Ländern in Afrika, Südostasien und Europa bedienen. Ihre Arbeit wirkt sich direkt auf Millionen von Menschen aus.'}
                  {lang === 'fr' && 'Travaillez sur des produits qui servent les clients dans plus de 30 pays en Afrique, en Asie du Sud-Est et en Europe. Votre travail a un impact direct sur des millions de vies.'}
                  {lang === 'ar' && 'العمل على منتجات تخدم العملاء في أكثر من 30 دولة في أفريقيا وجنوب شرق آسيا وأوروبا. يؤثر عملك بشكل مباشر على ملايين الأشخاص.'}
                </p>
              </div>

              <div className="bg-green-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-green-600">
                  {lang === 'en' && '♻️ Sustainable Innovation'}
                  {lang === 'es' && '♻️ Innovación Sostenible'}
                  {lang === 'de' && '♻️ Nachhaltige Innovation'}
                  {lang === 'fr' && '♻️ Innovation Durable'}
                  {lang === 'ar' && '♻️ الابتكار المستدام'}
                </h3>
                <p className="text-gray-700">
                  {lang === 'en' && 'Be part of the renewable energy revolution. Our solar systems and energy-efficient products help build a sustainable future for the next generation.'}
                  {lang === 'es' && 'Sé parte de la revolución de las energías renovables. Nuestros sistemas solares y productos de eficiencia energética ayudan a construir un futuro sostenible.'}
                  {lang === 'de' && 'Seien Sie Teil der Energiewende. Unsere Solarsysteme und energieeffizienten Produkte helfen, eine nachhaltige Zukunft aufzubauen.'}
                  {lang === 'fr' && 'Faites partie de la révolution des énergies renouvelables. Nos systèmes solaires et produits éconergétiques aident à construire un avenir durable.'}
                  {lang === 'ar' && 'كن جزءاً من ثورة الطاقة المتجددة. تساعد أنظمتنا الشمسية والمنتجات الموفرة للطاقة في بناء مستقبل مستدام.'}
                </p>
              </div>

              <div className="bg-purple-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-purple-600">
                  {lang === 'en' && '🚀 Innovation Culture'}
                  {lang === 'es' && '🚀 Cultura de Innovación'}
                  {lang === 'de' && '🚀 Innovationskultur'}
                  {lang === 'fr' && '🚀 Culture d\'Innovation'}
                  {lang === 'ar' && '🚀 ثقافة الابتكار'}
                </h3>
                <p className="text-gray-700">
                  {lang === 'en' && 'We encourage creativity and new ideas. Our R&D team is constantly developing next-generation products in solar, appliances, and electronics.'}
                  {lang === 'es' && 'Fomentamos la creatividad y nuevas ideas. Nuestro equipo de I+D está constantemente desarrollando productos de próxima generación.'}
                  {lang === 'de' && 'Wir fördern Kreativität und neue Ideen. Unser F&E-Team entwickelt ständig Produkte der nächsten Generation.'}
                  {lang === 'fr' && 'Nous encourageons la créativité et les nouvelles idées. Notre équipe R&D développe constamment des produits de nouvelle génération.'}
                  {lang === 'ar' && 'نحن نشجع الإبداع والأفكار الجديدة. يقوم فريق البحث والتطوير لدينا بتطوير منتجات الجيل القادم باستمرار.'}
                </p>
              </div>

              <div className="bg-orange-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-orange-600">
                  {lang === 'en' && '🤝 Team Culture'}
                  {lang === 'es' && '🤝 Cultura de Equipo'}
                  {lang === 'de' && '🤝 Teamkultur'}
                  {lang === 'fr' && '🤝 Culture d\'Équipe'}
                  {lang === 'ar' && '🤝 ثقافة الفريق'}
                </h3>
                <p className="text-gray-700">
                  {lang === 'en' && 'Work with diverse, talented teams from around the world. We value collaboration, respect, and continuous learning in a supportive environment.'}
                  {lang === 'es' && 'Trabaja con equipos diversos y talentosos de todo el mundo. Valoramos la colaboración, el respeto y el aprendizaje continuo.'}
                  {lang === 'de' && 'Arbeiten Sie mit vielfältigen, talentierten Teams aus der ganzen Welt. Wir schätzen Zusammenarbeit, Respekt und kontinuierliches Lernen.'}
                  {lang === 'fr' && 'Travaillez avec des équipes diverses et talentueuses du monde entier. Nous valorisons la collaboration, le respect et l\'apprentissage continu.'}
                  {lang === 'ar' && 'العمل مع فرق متنوعة وموهوبة من جميع أنحاء العالم. نقدر التعاون والاحترام والتعلم المستمر.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {lang === 'en' && 'Our Benefits Package'}
              {lang === 'es' && 'Nuestro Paquete de Beneficios'}
              {lang === 'de' && 'Unser Leistungspaket'}
              {lang === 'fr' && 'Notre Paquet d\'Avantages'}
              {lang === 'ar' && 'حزمة الفوائد الخاصة بنا'}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.titleEn} className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{benefit.iconEn}</div>
                  <h3 className="text-xl font-bold mb-3">
                    {lang === 'en' && benefit.titleEn}
                    {lang === 'es' && benefit.titleEs}
                    {lang === 'de' && benefit.titleDe}
                    {lang === 'fr' && benefit.titleFr}
                    {lang === 'ar' && benefit.titleAr}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'en' && benefit.descriptionEn}
                    {lang === 'es' && benefit.descriptionEs}
                    {lang === 'de' && benefit.descriptionDe}
                    {lang === 'fr' && benefit.descriptionFr}
                    {lang === 'ar' && benefit.descriptionAr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {lang === 'en' && 'Open Positions'}
              {lang === 'es' && 'Posiciones Abiertas'}
              {lang === 'de' && 'Offene Stellen'}
              {lang === 'fr' && 'Postes Ouverts'}
              {lang === 'ar' && 'المناصب المفتوحة'}
            </h2>

            <div className="space-y-6">
              {jobListings.map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-600 mb-2">
                        {lang === 'en' && job.titleEn}
                        {lang === 'es' && job.titleEs}
                        {lang === 'de' && job.titleDe}
                        {lang === 'fr' && job.titleFr}
                        {lang === 'ar' && job.titleAr}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span>🏢</span>
                          {lang === 'en' && job.departmentEn}
                          {lang === 'es' && job.departmentEs}
                          {lang === 'de' && job.departmentDe}
                          {lang === 'fr' && job.departmentFr}
                          {lang === 'ar' && job.departmentAr}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📍</span>
                          {lang === 'en' && job.locationEn}
                          {lang === 'es' && job.locationEs}
                          {lang === 'de' && job.locationDe}
                          {lang === 'fr' && job.locationFr}
                          {lang === 'ar' && job.locationAr}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">
                    {lang === 'en' && job.descriptionEn}
                    {lang === 'es' && job.descriptionEs}
                    {lang === 'de' && job.descriptionDe}
                    {lang === 'fr' && job.descriptionFr}
                    {lang === 'ar' && job.descriptionAr}
                  </p>

                  <Link
                    href={`/${lang}/contact`}
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {lang === 'en' && 'Apply Now'}
                    {lang === 'es' && 'Solicitar Ahora'}
                    {lang === 'de' && 'Jetzt Bewerben'}
                    {lang === 'fr' && 'Postuler Maintenant'}
                    {lang === 'ar' && 'تقديم الطلب الآن'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 px-4 md:px-8 bg-blue-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {lang === 'en' && 'Application Process'}
              {lang === 'es' && 'Proceso de Solicitud'}
              {lang === 'de' && 'Bewerbungsprozess'}
              {lang === 'fr' && 'Processus de Candidature'}
              {lang === 'ar' && 'عملية التقديم'}
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  stepEn: '1. Submit',
                  stepEs: '1. Enviar',
                  stepDe: '1. Einreichen',
                  stepFr: '1. Soumettre',
                  stepAr: '1. إرسال',
                  descEn: 'Submit your resume and cover letter',
                  descEs: 'Envía tu currículum y carta de presentación',
                  descDe: 'Reichen Sie Ihren Lebenslauf und Anschreiben ein',
                  descFr: 'Soumettez votre CV et lettre de motivation',
                  descAr: 'أرسل سيرتك الذاتية وخطاب التقديم',
                },
                {
                  stepEn: '2. Review',
                  stepEs: '2. Revisar',
                  stepDe: '2. Überprüfung',
                  stepFr: '2. Examen',
                  stepAr: '2. المراجعة',
                  descEn: 'Our team reviews your application',
                  descEs: 'Nuestro equipo revisa tu solicitud',
                  descDe: 'Unser Team überprüft Ihre Bewerbung',
                  descFr: 'Notre équipe examine votre candidature',
                  descAr: 'يقوم فريقنا بمراجعة طلبك',
                },
                {
                  stepEn: '3. Interview',
                  stepEs: '3. Entrevista',
                  stepDe: '3. Interview',
                  stepFr: '3. Entretien',
                  stepAr: '3. المقابلة',
                  descEn: 'Participate in interviews with our team',
                  descEs: 'Participa en entrevistas con nuestro equipo',
                  descDe: 'Nehmen Sie an Interviews mit unserem Team teil',
                  descFr: 'Participez à des entretiens avec notre équipe',
                  descAr: 'شارك في المقابلات مع فريقنا',
                },
                {
                  stepEn: '4. Offer',
                  stepEs: '4. Oferta',
                  stepDe: '4. Angebot',
                  stepFr: '4. Offre',
                  stepAr: '4. العرض',
                  descEn: 'Receive and accept your job offer',
                  descEs: 'Recibe y acepta tu oferta de trabajo',
                  descDe: 'Erhalten und akzeptieren Sie Ihr Jobangebot',
                  descFr: 'Recevez et acceptez votre offre d\'emploi',
                  descAr: 'استقبل وقبل عرض العمل الخاص بك',
                },
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {lang === 'en' && step.stepEn}
                    {lang === 'es' && step.stepEs}
                    {lang === 'de' && step.stepDe}
                    {lang === 'fr' && step.stepFr}
                    {lang === 'ar' && step.stepAr}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'en' && step.descEn}
                    {lang === 'es' && step.descEs}
                    {lang === 'de' && step.descDe}
                    {lang === 'fr' && step.descFr}
                    {lang === 'ar' && step.descAr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {lang === 'en' && 'Ready to Join HousePlus?'}
              {lang === 'es' && '¿Listo para Unirse a HousePlus?'}
              {lang === 'de' && 'Bereit, HousePlus beizutreten?'}
              {lang === 'fr' && 'Prêt à rejoindre HousePlus?'}
              {lang === 'ar' && 'هل أنت مستعد للانضمام إلى HousePlus؟'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {lang === 'en' && 'Send us your resume and let\'s start a conversation about your future with HousePlus.'}
              {lang === 'es' && 'Envíanos tu currículum y comencemos una conversación sobre tu futuro con HousePlus.'}
              {lang === 'de' && 'Senden Sie uns Ihren Lebenslauf und lassen Sie uns ein Gespräch über Ihre Zukunft bei HousePlus beginnen.'}
              {lang === 'fr' && 'Envoyez-nous votre CV et commençons une conversation sur votre avenir chez HousePlus.'}
              {lang === 'ar' && 'أرسل لنا سيرتك الذاتية ودعنا نبدأ محادثة حول مستقبلك مع HousePlus.'}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href={`/${lang}/contact`}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
              >
                {lang === 'en' && 'Send Your Resume'}
                {lang === 'es' && 'Envía Tu Currículum'}
                {lang === 'de' && 'Senden Sie Ihren Lebenslauf'}
                {lang === 'fr' && 'Envoyez Votre CV'}
                {lang === 'ar' && 'أرسل سيرتك الذاتية'}
              </Link>
              <a
                href="https://wa.me/8615578119543"
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition inline-block"
              >
                {lang === 'en' && 'WhatsApp Us'}
                {lang === 'es' && 'WhatsApp'}
                {lang === 'de' && 'WhatsApp'}
                {lang === 'fr' && 'WhatsApp'}
                {lang === 'ar' && 'واتس آب'}
              </a>
            </div>
          </div>
        </section>
      </main>
    </SchemaRenderer>
  );
}
