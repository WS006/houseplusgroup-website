import { Metadata } from 'next';
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
      title: 'Our Team',
      intro: 'HousePlus is powered by a dedicated team of 500+ skilled professionals with expertise in manufacturing, engineering, quality assurance, and customer service.',
      departments: 'Our Departments',
      deptList: [
        {
          name: 'Manufacturing & Production',
          desc: 'Experienced production managers and technicians overseeing all manufacturing operations across three industry verticals.',
          team: '200+ professionals',
        },
        {
          name: 'Quality Assurance & Testing',
          desc: 'Certified quality engineers ensuring every product meets international standards and customer specifications.',
          team: '80+ professionals',
        },
        {
          name: 'Engineering & R&D',
          desc: 'Innovative engineers developing new products and improving existing designs for market competitiveness.',
          team: '60+ professionals',
        },
        {
          name: 'Sales & Customer Service',
          desc: 'Dedicated sales team and customer service representatives providing support in multiple languages.',
          team: '50+ professionals',
        },
        {
          name: 'Logistics & Supply Chain',
          desc: 'Expert logistics coordinators managing efficient shipping and delivery to global destinations.',
          team: '40+ professionals',
        },
        {
          name: 'Administration & Finance',
          desc: 'Professional administrative and financial staff ensuring smooth business operations.',
          team: '30+ professionals',
        },
      ],
      expertise: 'Core Expertise',
      expertiseList: [
        'Solar panel manufacturing and installation',
        'Home appliance design and production',
        '3C electronics assembly and testing',
        'Quality control and certification',
        'OEM/ODM customization',
        'International logistics and shipping',
        'Customer relationship management',
        'Continuous process improvement',
      ],
      culture: 'Company Culture',
      cultureText: 'At HousePlus, we believe in fostering a collaborative work environment where innovation thrives and excellence is the standard. Our team members are encouraged to contribute ideas, take ownership of their work, and continuously develop their skills. We invest in employee training and development programs to ensure our team stays at the forefront of industry advancements.',
      leadership: 'Leadership',
      leadershipText: 'Our leadership team brings decades of combined experience in manufacturing, international trade, and business development. Led by founder Jack Hu, HousePlus has grown from a small startup to a multi-industry enterprise serving global markets. Our management philosophy emphasizes transparency, accountability, and customer-centric decision making.',
      join: 'Join Our Team',
      joinText: 'Are you passionate about manufacturing excellence and innovation? HousePlus is always looking for talented individuals to join our growing team. We offer competitive compensation, professional development opportunities, and a dynamic work environment.',
    },
    es: {
      title: 'Nuestro Equipo',
      intro: 'HousePlus está impulsado por un equipo dedicado de 500+ profesionales capacitados con experiencia en fabricación, ingeniería, aseguramiento de calidad y servicio al cliente.',
      departments: 'Nuestros Departamentos',
      deptList: [
        {
          name: 'Fabricación y Producción',
          desc: 'Gerentes de producción y técnicos experimentados supervisando todas las operaciones de fabricación en tres verticales de la industria.',
          team: '200+ profesionales',
        },
        {
          name: 'Aseguramiento de Calidad y Pruebas',
          desc: 'Ingenieros de calidad certificados garantizando que cada producto cumpla con estándares internacionales y especificaciones del cliente.',
          team: '80+ profesionales',
        },
        {
          name: 'Ingeniería e I+D',
          desc: 'Ingenieros innovadores desarrollando nuevos productos y mejorando diseños existentes para la competitividad del mercado.',
          team: '60+ profesionales',
        },
        {
          name: 'Ventas y Servicio al Cliente',
          desc: 'Equipo de ventas dedicado y representantes de servicio al cliente brindando soporte en múltiples idiomas.',
          team: '50+ profesionales',
        },
        {
          name: 'Logística y Cadena de Suministro',
          desc: 'Coordinadores de logística expertos gestionando envíos eficientes y entrega a destinos globales.',
          team: '40+ profesionales',
        },
        {
          name: 'Administración y Finanzas',
          desc: 'Personal administrativo y financiero profesional asegurando operaciones comerciales fluidas.',
          team: '30+ profesionales',
        },
      ],
      expertise: 'Experiencia Central',
      expertiseList: [
        'Fabricación e instalación de paneles solares',
        'Diseño y producción de electrodomésticos',
        'Ensamblaje y prueba de electrónica 3C',
        'Control de calidad y certificación',
        'Personalización OEM/ODM',
        'Logística y envío internacional',
        'Gestión de relaciones con clientes',
        'Mejora continua de procesos',
      ],
      culture: 'Cultura Empresarial',
      cultureText: 'En HousePlus, creemos en fomentar un entorno de trabajo colaborativo donde la innovación prospera y la excelencia es el estándar. Se alienta a los miembros del equipo a contribuir con ideas, asumir la responsabilidad de su trabajo y desarrollar continuamente sus habilidades. Invertimos en programas de capacitación y desarrollo de empleados para garantizar que nuestro equipo se mantenga a la vanguardia de los avances de la industria.',
      leadership: 'Liderazgo',
      leadershipText: 'Nuestro equipo de liderazgo aporta décadas de experiencia combinada en fabricación, comercio internacional y desarrollo empresarial. Liderado por el fundador Jack Hu, HousePlus ha crecido de una pequeña empresa emergente a una empresa multi-industria que sirve a mercados globales. Nuestra filosofía de gestión enfatiza la transparencia, la responsabilidad y la toma de decisiones centrada en el cliente.',
      join: 'Únete a Nuestro Equipo',
      joinText: '¿Te apasiona la excelencia en la fabricación y la innovación? HousePlus siempre está buscando individuos talentosos para unirse a nuestro equipo en crecimiento. Ofrecemos compensación competitiva, oportunidades de desarrollo profesional y un entorno de trabajo dinámico.',
    },
    de: {
      title: 'Unser Team',
      intro: 'HousePlus wird von einem engagierten Team von 500+ qualifizierten Fachleuten mit Expertise in Fertigung, Ingenieurwesen, Qualitätssicherung und Kundenservice angetrieben.',
      departments: 'Unsere Abteilungen',
      deptList: [
        {
          name: 'Fertigung und Produktion',
          desc: 'Erfahrene Produktionsleiter und Techniker überwachen alle Fertigungsvorgänge in drei Branchensegmenten.',
          team: '200+ Fachleute',
        },
        {
          name: 'Qualitätssicherung und Prüfung',
          desc: 'Zertifizierte Qualitätsingenieure stellen sicher, dass jedes Produkt internationalen Standards und Kundenspezifikationen entspricht.',
          team: '80+ Fachleute',
        },
        {
          name: 'Ingenieurwesen und F&E',
          desc: 'Innovative Ingenieure entwickeln neue Produkte und verbessern bestehende Designs für Marktkonkurrenzfähigkeit.',
          team: '60+ Fachleute',
        },
        {
          name: 'Vertrieb und Kundenservice',
          desc: 'Engagiertes Vertriebsteam und Kundendienstvertreter bieten Unterstützung in mehreren Sprachen.',
          team: '50+ Fachleute',
        },
        {
          name: 'Logistik und Lieferkette',
          desc: 'Erfahrene Logistikkoordinatoren verwalten effiziente Versand- und Liefervorgänge zu globalen Zielen.',
          team: '40+ Fachleute',
        },
        {
          name: 'Verwaltung und Finanzen',
          desc: 'Professionelles Verwaltungs- und Finanzpersonal gewährleistet reibungslose Geschäftsabläufe.',
          team: '30+ Fachleute',
        },
      ],
      expertise: 'Kernkompetenz',
      expertiseList: [
        'Solarmodulfertigung und -installation',
        'Haushaltsgerätedesign und -produktion',
        '3C-Elektronikbestückung und -prüfung',
        'Qualitätskontrolle und Zertifizierung',
        'OEM/ODM-Anpassung',
        'Internationale Logistik und Versand',
        'Kundenbeziehungsmanagement',
        'Kontinuierliche Prozessverbesserung',
      ],
      culture: 'Unternehmenskultur',
      cultureText: 'Bei HousePlus glauben wir daran, ein kollaboratives Arbeitsumfeld zu schaffen, in dem Innovation gedeiht und Exzellenz der Standard ist. Unsere Teamkollegen werden ermutigt, Ideen beizutragen, Verantwortung für ihre Arbeit zu übernehmen und ihre Fähigkeiten kontinuierlich zu entwickeln. Wir investieren in Schulungs- und Entwicklungsprogramme für Mitarbeiter, um sicherzustellen, dass unser Team an der Spitze der Branchenfortschritte bleibt.',
      leadership: 'Führung',
      leadershipText: 'Unser Führungsteam bringt Jahrzehnte gesammelter Erfahrung in Fertigung, internationalem Handel und Geschäftsentwicklung mit. Unter der Leitung von Gründer Jack Hu ist HousePlus von einem kleinen Startup zu einem Multi-Industrie-Unternehmen herangewachsen, das globale Märkte bedient. Unsere Managementphilosophie betont Transparenz, Rechenschaftspflicht und kundenorientierte Entscheidungsfindung.',
      join: 'Treten Sie unserem Team bei',
      joinText: 'Sind Sie leidenschaftlich für Fertigungsexzellenz und Innovation? HousePlus sucht immer nach talentierten Personen, die unser wachsendes Team verstärken. Wir bieten wettbewerbsfähige Vergütung, berufliche Entwicklungsmöglichkeiten und ein dynamisches Arbeitsumfeld.',
    },
    fr: {
      title: 'Notre Équipe',
      intro: 'HousePlus est animée par une équipe dévouée de 500+ professionnels qualifiés ayant une expertise en fabrication, ingénierie, assurance qualité et service client.',
      departments: 'Nos Départements',
      deptList: [
        {
          name: 'Fabrication et Production',
          desc: 'Gestionnaires de production expérimentés et techniciens supervisant toutes les opérations de fabrication dans trois secteurs verticaux.',
          team: '200+ professionnels',
        },
        {
          name: 'Assurance Qualité et Tests',
          desc: 'Ingénieurs qualité certifiés garantissant que chaque produit répond aux normes internationales et aux spécifications des clients.',
          team: '80+ professionnels',
        },
        {
          name: 'Ingénierie et R&D',
          desc: 'Ingénieurs innovants développant de nouveaux produits et améliorant les conceptions existantes pour la compétitivité du marché.',
          team: '60+ professionnels',
        },
        {
          name: 'Ventes et Service Client',
          desc: 'Équipe commerciale dédiée et représentants du service client fournissant un soutien en plusieurs langues.',
          team: '50+ professionnels',
        },
        {
          name: 'Logistique et Chaîne d\'Approvisionnement',
          desc: 'Coordinateurs logistiques experts gérant l\'expédition efficace et la livraison vers les destinations mondiales.',
          team: '40+ professionnels',
        },
        {
          name: 'Administration et Finance',
          desc: 'Personnel administratif et financier professionnel assurant le bon fonctionnement des opérations commerciales.',
          team: '30+ professionnels',
        },
      ],
      expertise: 'Expertise Centrale',
      expertiseList: [
        'Fabrication et installation de panneaux solaires',
        'Conception et production d\'électroménagers',
        'Assemblage et test d\'électronique 3C',
        'Contrôle de qualité et certification',
        'Personnalisation OEM/ODM',
        'Logistique et expédition internationales',
        'Gestion des relations clients',
        'Amélioration continue des processus',
      ],
      culture: 'Culture d\'Entreprise',
      cultureText: 'Chez HousePlus, nous croyons en la création d\'un environnement de travail collaboratif où l\'innovation prospère et l\'excellence est la norme. Les membres de notre équipe sont encouragés à contribuer des idées, à prendre la responsabilité de leur travail et à développer continuellement leurs compétences. Nous investissons dans des programmes de formation et de développement des employés pour assurer que notre équipe reste à la pointe des avancées de l\'industrie.',
      leadership: 'Leadership',
      leadershipText: 'Notre équipe de direction apporte des décennies d\'expérience combinée en fabrication, commerce international et développement commercial. Dirigée par le fondateur Jack Hu, HousePlus est passée d\'une petite startup à une entreprise multi-secteurs servant les marchés mondiaux. Notre philosophie de gestion met l\'accent sur la transparence, la responsabilité et la prise de décision centrée sur le client.',
      join: 'Rejoignez Notre Équipe',
      joinText: 'Êtes-vous passionné par l\'excellence de la fabrication et l\'innovation? HousePlus recherche toujours des individus talentueux pour rejoindre notre équipe en croissance. Nous offrons une rémunération compétitive, des opportunités de développement professionnel et un environnement de travail dynamique.',
    },
    ar: {
      title: 'فريقنا',
      intro: 'يتم تشغيل HousePlus بواسطة فريق مكرس من 500+ متخصص ماهر مع خبرة في التصنيع والهندسة وضمان الجودة وخدمة العملاء.',
      departments: 'أقسامنا',
      deptList: [
        {
          name: 'التصنيع والإنتاج',
          desc: 'مديرو إنتاج وفنيون ذوو خبرة يشرفون على جميع عمليات التصنيع في ثلاثة قطاعات صناعية.',
          team: '200+ متخصص',
        },
        {
          name: 'ضمان الجودة والاختبار',
          desc: 'مهندسو جودة معتمدون يضمنون أن كل منتج يلبي المعايير الدولية ومواصفات العميل.',
          team: '80+ متخصص',
        },
        {
          name: 'الهندسة والبحث والتطوير',
          desc: 'مهندسون مبتكرون يطورون منتجات جديدة ويحسنون التصاميم الموجودة للقدرة التنافسية في السوق.',
          team: '60+ متخصص',
        },
        {
          name: 'المبيعات وخدمة العملاء',
          desc: 'فريق مبيعات مكرس وممثلو خدمة العملاء يقدمون الدعم بلغات متعددة.',
          team: '50+ متخصص',
        },
        {
          name: 'اللوجستيات وسلسلة التوريد',
          desc: 'منسقو لوجستيات خبراء يديرون الشحن الفعال والتسليم إلى الوجهات العالمية.',
          team: '40+ متخصص',
        },
        {
          name: 'الإدارة والمالية',
          desc: 'موظفون إداريون وماليون محترفون يضمنون سير العمليات التجارية بسلاسة.',
          team: '30+ متخصص',
        },
      ],
      expertise: 'الخبرة الأساسية',
      expertiseList: [
        'تصنيع وتركيب الألواح الشمسية',
        'تصميم وإنتاج الأجهزة المنزلية',
        'تجميع واختبار الإلكترونيات 3C',
        'مراقبة الجودة والشهادة',
        'تخصيص OEM/ODM',
        'اللوجستيات والشحن الدوليين',
        'إدارة علاقات العملاء',
        'تحسين العملية المستمر',
      ],
      culture: 'ثقافة الشركة',
      cultureText: 'في HousePlus، نؤمن بتعزيز بيئة عمل تعاونية حيث تزدهر الابتكار والتميز هو المعيار. يتم تشجيع أعضاء فريقنا على المساهمة بالأفكار وتحمل مسؤولية عملهم والتطور المستمر لمهاراتهم. نستثمر في برامج تدريب وتطوير الموظفين لضمان بقاء فريقنا في طليعة التطورات الصناعية.',
      leadership: 'القيادة',
      leadershipText: 'يجلب فريق القيادة لدينا عقوداً من الخبرة المجمعة في التصنيع والتجارة الدولية وتطوير الأعمال. بقيادة المؤسس جاك هو، نمت HousePlus من شركة ناشئة صغيرة إلى مؤسسة متعددة الصناعات تخدم الأسواق العالمية. تؤكد فلسفة الإدارة لدينا على الشفافية والمساءلة واتخاذ القرارات المتمركزة حول العميل.',
      join: 'انضم إلى فريقنا',
      joinText: 'هل أنت شغوف بتميز التصنيع والابتكار؟ تبحث HousePlus دائماً عن أفراد موهوبين للانضمام إلى فريقنا المتنامي. نحن نقدم تعويضات تنافسية وفرص تطوير مهني وبيئة عمل ديناميكية.',
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

        {/* Departments */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.departments}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Expertise */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.expertise}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.expertiseList.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-slate-900 text-center">{data.culture}</h2>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200">
              <p className="text-lg text-slate-600 leading-relaxed">{data.cultureText}</p>
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

        {/* Join */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-slate-900 text-center">{data.join}</h2>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-200 mb-8">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">{data.joinText}</p>
              <a href={`/${lang}/careers`} className="inline-block px-10 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                {lang === 'en' && 'View Open Positions'}
                {lang === 'es' && 'Ver Posiciones Abiertas'}
                {lang === 'de' && 'Offene Stellen anzeigen'}
                {lang === 'fr' && 'Voir les postes ouverts'}
                {lang === 'ar' && 'عرض الوظائف المفتوحة'}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
