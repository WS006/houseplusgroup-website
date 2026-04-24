import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema-builder';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: 'The Future of Solar Energy: Innovations and HousePlus Solutions',
    es: 'El Futuro de la Energía Solar: Innovaciones y Soluciones HousePlus',
    de: 'Die Zukunft der Solarenergie: Innovationen und HousePlus-Lösungen',
    fr: 'L\'avenir de l\'énergie solaire : Innovations et solutions HousePlus',
    ar: 'مستقبل الطاقة الشمسية: الابتكارات وحلول HousePlus',
  };

  const descriptions: Record<string, string> = {
    en: 'Explore the latest innovations in solar energy technology and how HousePlus is leading the way with high-efficiency solar panels, portable power stations, and sustainable solutions for global wholesale markets.',
    es: 'Explore las últimas innovaciones en tecnología de energía solar y cómo HousePlus lidera el camino con paneles solares de alta eficiencia, estaciones de energía portátiles y soluciones sostenibles para mercados mayoristas globales.',
    de: 'Entdecken Sie die neuesten Innovationen in der Solarenergietechnologie und wie HousePlus mit hocheffizienten Solarmodulen, tragbaren Kraftwerken und nachhaltigen Lösungen für globale Großhandelsmärkte führend ist.',
    fr: 'Découvrez les dernières innovations en matière de technologie de l\'énergie solaire et comment HousePlus ouvre la voie avec des panneaux solaires à haut rendement, des centrales électriques portables et des solutions durables pour les marchés de gros mondiaux.',
    ar: 'استكشف أحدث الابتكارات في تكنولوجيا الطاقة الشمسية وكيف تقود HousePlus الطريق بألواح شمسية عالية الكفاءة ومحطات طاقة محمولة وحلول مستدامة لأسواق الجملة العالمية.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['solar energy', 'solar panels', 'portable power station', 'renewable energy', 'HousePlus', 'innovation', 'wholesale'],
    url: `/${lang}/news/the-future-of-solar-energy`,
    lang: lang as any,
    type: 'article',
  });
}

export default async function SolarEnergyArticle({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
    { name: lang === 'en' ? 'The Future of Solar Energy' : 'El Futuro de la Energía Solar', url: `/${lang}/news/the-future-of-solar-energy` },
  ];

  const articleContent: Record<string, any> = {
    en: {
      title: 'The Future of Solar Energy: Innovations and HousePlus Solutions',
      authorName: 'Manus AI',
      datePublished: '2026-04-24',
      dateModified: '2026-04-24',
      image: '/images/products/solar-panel-3.jpg',
      imageAlt: 'Large-scale solar farm with HousePlus solar panels',
      sections: [
        {
          heading: 'The Global Shift Towards Renewable Energy',
          text: 'The world is witnessing an unprecedented shift towards renewable energy sources, with solar power leading the charge. As concerns about climate change and energy security grow, the demand for efficient and sustainable solar solutions is skyrocketing. This global transition presents immense opportunities for businesses and consumers alike, driving innovation and technological advancements in the sector. HousePlus is at the forefront of this revolution, providing cutting-edge solar products to meet the evolving needs of the market.',
          image: '/images/products/solar-panel-1.jpg',
          imageAlt: 'Professional solar panel installation on a rooftop',
        },
        {
          heading: 'Key Innovations Driving Solar Forward',
          text: 'Recent years have seen remarkable breakthroughs in solar technology. From more efficient photovoltaic cells to advanced energy storage systems, the industry is constantly evolving. Innovations include perovskite solar cells, bifacial modules that capture sunlight from both sides, and integrated solar solutions for smart homes. These advancements make solar power more accessible, affordable, and powerful than ever before. HousePlus leverages these innovations to ensure our partners receive the most advanced and reliable solar products.',
          image: '/images/products/solar-panel-2.jpg',
          imageAlt: 'Workers installing solar panels on a residential roof',
        },
        {
          heading: 'HousePlus: Your Partner in Sustainable Solar Solutions',
          text: 'At HousePlus, we are committed to empowering our global partners with superior solar energy solutions. Our product range includes high-efficiency solar panels, robust MPPT charge controllers, and versatile portable power stations (from 300W to 3000W). We understand the diverse needs of wholesale buyers in Africa, Southeast Asia, and Europe, offering flexible MOQ (100-500 pcs) and comprehensive OEM/ODM services. Our products are CE/FCC/RoHS certified, ensuring compliance with international quality standards. Partner with HousePlus to provide your customers with reliable, sustainable, and innovative solar products.',
          image: '/images/products/portable-power-station.jpg',
          imageAlt: 'HousePlus portable power station with solar panel',
        },
        {
          heading: 'The Rise of Portable Power Stations',
          text: 'Portable power stations are revolutionizing off-grid living, outdoor adventures, and emergency preparedness. These compact, high-capacity devices offer clean, silent power wherever it\'s needed, making them ideal for remote work, camping, and as reliable backup power. HousePlus\'s portable power stations are designed for durability and performance, integrating seamlessly with our solar panels for a complete off-grid energy solution. They are a perfect addition to any product portfolio targeting modern, eco-conscious consumers.',
          image: '/images/products/solar-power-station.jpg',
          imageAlt: 'HousePlus solar power station in an outdoor setting',
        },
        {
          heading: 'Looking Ahead: The Bright Future of Solar',
          text: 'The trajectory for solar energy is undeniably bright. Continued research and development, coupled with increasing global adoption, will further solidify its role as a primary energy source. HousePlus remains dedicated to innovation, investing in R&D to bring the next generation of solar technology to market. We invite wholesale distributors and partners to join us in building a sustainable and prosperous future.',
        },
      ],
    },
    es: {
      title: 'El Futuro de la Energía Solar: Innovaciones y Soluciones HousePlus',
      authorName: 'Manus AI',
      datePublished: '2026-04-24',
      dateModified: '2026-04-24',
      image: '/images/products/solar-panel-3.jpg',
      imageAlt: 'Granja solar a gran escala con paneles solares HousePlus',
      sections: [
        {
          heading: 'El Cambio Global Hacia las Energías Renovables',
          text: 'El mundo está presenciando un cambio sin precedentes hacia las fuentes de energía renovables, con la energía solar liderando la carga. A medida que crecen las preocupaciones sobre el cambio climático y la seguridad energética, la demanda de soluciones solares eficientes y sostenibles se dispara. Esta transición global presenta inmensas oportunidades tanto para empresas como para consumidores, impulsando la innovación y los avances tecnológicos en el sector. HousePlus está a la vanguardia de esta revolución, proporcionando productos solares de vanguardia para satisfacer las necesidades cambiantes del mercado.',
          image: '/images/products/solar-panel-1.jpg',
          imageAlt: 'Instalación profesional de paneles solares en un tejado',
        },
        {
          heading: 'Innovaciones Clave que Impulsan la Energía Solar',
          text: 'Los últimos años han sido testigos de avances notables en la tecnología solar. Desde células fotovoltaicas más eficientes hasta sistemas avanzados de almacenamiento de energía, la industria está en constante evolución. Las innovaciones incluyen células solares de perovskita, módulos bifaciales que capturan la luz solar de ambos lados y soluciones solares integradas para hogares inteligentes. Estos avances hacen que la energía solar sea más accesible, asequible y potente que nunca. HousePlus aprovecha estas innovaciones para garantizar que nuestros socios reciban los productos solares más avanzados y confiables.',
          image: '/images/products/solar-panel-2.jpg',
          imageAlt: 'Trabajadores instalando paneles solares en un tejado residencial',
        },
        {
          heading: 'HousePlus: Su Socio en Soluciones Solares Sostenibles',
          text: 'En HousePlus, estamos comprometidos a empoderar a nuestros socios globales con soluciones de energía solar superiores. Nuestra gama de productos incluye paneles solares de alta eficiencia, robustos controladores de carga MPPT y versátiles estaciones de energía portátiles (de 300W a 3000W). Entendemos las diversas necesidades de los compradores mayoristas en África, el Sudeste Asiático y Europa, ofreciendo MOQ flexibles (100-500 piezas) y servicios OEM/ODM completos. Nuestros productos cuentan con certificación CE/FCC/RoHS, lo que garantiza el cumplimiento de los estándares internacionales de calidad. Asóciese con HousePlus para proporcionar a sus clientes productos solares confiables, sostenibles e innovadores.',
          image: '/images/products/portable-power-station.jpg',
          imageAlt: 'Estación de energía portátil HousePlus con panel solar',
        },
        {
          heading: 'El Auge de las Estaciones de Energía Portátiles',
          text: 'Las estaciones de energía portátiles están revolucionando la vida fuera de la red, las aventuras al aire libre y la preparación para emergencias. Estos dispositivos compactos y de alta capacidad ofrecen energía limpia y silenciosa donde sea que se necesite, lo que los hace ideales para el trabajo remoto, el campamento y como energía de respaldo confiable. Las estaciones de energía portátiles de HousePlus están diseñadas para la durabilidad y el rendimiento, integrándose a la perfección con nuestros paneles solares para una solución de energía completa fuera de la red. Son una adición perfecta a cualquier cartera de productos dirigida a consumidores modernos y conscientes del medio ambiente.',
          image: '/images/products/solar-power-station.jpg',
          imageAlt: 'Estación de energía solar HousePlus en un entorno exterior',
        },
        {
          heading: 'Mirando Hacia Adelante: El Brillante Futuro de la Energía Solar',
          text: 'La trayectoria de la energía solar es innegablemente brillante. La investigación y el desarrollo continuos, junto con la creciente adopción global, solidificarán aún más su papel como fuente de energía principal. HousePlus sigue dedicada a la innovación, invirtiendo en I+D para llevar la próxima generación de tecnología solar al mercado. Invitamos a distribuidores mayoristas y socios a unirse a nosotros para construir un futuro sostenible y próspero.',
        },
      ],
    },
    de: {
      title: 'Die Zukunft der Solarenergie: Innovationen und HousePlus-Lösungen',
      authorName: 'Manus AI',
      datePublished: '2026-04-24',
      dateModified: '2026-04-24',
      image: '/images/products/solar-panel-3.jpg',
      imageAlt: 'Große Solaranlage mit HousePlus Solarmodulen',
      sections: [
        {
          heading: 'Der globale Wandel hin zu erneuerbaren Energien',
          text: 'Die Welt erlebt einen beispiellosen Wandel hin zu erneuerbaren Energiequellen, wobei die Solarenergie die Führung übernimmt. Mit zunehmenden Bedenken hinsichtlich des Klimawandels und der Energiesicherheit steigt die Nachfrage nach effizienten und nachhaltigen Solarlösungen sprunghaft an. Dieser globale Übergang bietet sowohl Unternehmen als auch Verbrauchern immense Chancen und treibt Innovationen und technologische Fortschritte in diesem Sektor voran. HousePlus steht an vorderster Front dieser Revolution und bietet modernste Solarprodukte an, um den sich entwickelnden Anforderungen des Marktes gerecht zu werden.',
          image: '/images/products/solar-panel-1.jpg',
          imageAlt: 'Professionelle Solarmodulinstallation auf einem Dach',
        },
        {
          heading: 'Schlüsselinnovationen, die die Solarenergie vorantreiben',
          text: 'In den letzten Jahren gab es bemerkenswerte Durchbrüche in der Solartechnologie. Von effizienteren Photovoltaikzellen bis hin zu fortschrittlichen Energiespeichersystemen entwickelt sich die Branche ständig weiter. Zu den Innovationen gehören Perowskit-Solarzellen, bifaziale Module, die Sonnenlicht von beiden Seiten einfangen, und integrierte Solarlösungen für Smart Homes. Diese Fortschritte machen Solarenergie zugänglicher, erschwinglicher und leistungsfähiger als je zuvor. HousePlus nutzt diese Innovationen, um sicherzustellen, dass unsere Partner die fortschrittlichsten und zuverlässigsten Solarprodukte erhalten.',
          image: '/images/products/solar-panel-2.jpg',
          imageAlt: 'Arbeiter installieren Solarmodule auf einem Wohnhausdach',
        },
        {
          heading: 'HousePlus: Ihr Partner für nachhaltige Solarlösungen',
          text: 'Bei HousePlus setzen wir uns dafür ein, unsere globalen Partner mit überlegenen Solarenergielösungen zu unterstützen. Unser Produktsortiment umfasst hocheffiziente Solarmodule, robuste MPPT-Laderegler und vielseitige tragbare Kraftwerke (von 300W bis 3000W). Wir verstehen die vielfältigen Bedürfnisse von Großhandelskäufern in Afrika, Südostasien und Europa und bieten flexible Mindestbestellmengen (100-500 Stück) und umfassende OEM/ODM-Dienstleistungen an. Unsere Produkte sind CE/FCC/RoHS-zertifiziert und gewährleisten die Einhaltung internationaler Qualitätsstandards. Arbeiten Sie mit HousePlus zusammen, um Ihren Kunden zuverlässige, nachhaltige und innovative Solarprodukte anzubieten.',
          image: '/images/products/portable-power-station.jpg',
          imageAlt: 'HousePlus tragbares Kraftwerk mit Solarmodul',
        },
        {
          heading: 'Der Aufstieg tragbarer Kraftwerke',
          text: 'Tragbare Kraftwerke revolutionieren das netzunabhängige Leben, Outdoor-Abenteuer und die Notfallvorsorge. Diese kompakten, leistungsstarken Geräte bieten saubere, leise Energie, wo immer sie benötigt wird, und sind somit ideal für Remote-Arbeit, Camping und als zuverlässige Notstromversorgung. Die tragbaren Kraftwerke von HousePlus sind auf Langlebigkeit und Leistung ausgelegt und lassen sich nahtlos in unsere Solarmodule integrieren, um eine vollständige netzunabhängige Energielösung zu bieten. Sie sind eine perfekte Ergänzung für jedes Produktportfolio, das moderne, umweltbewusste Verbraucher anspricht.',
          image: '/images/products/solar-power-station.jpg',
          imageAlt: 'HousePlus Solarkraftwerk in einer Außenumgebung',
        },
        {
          heading: 'Ausblick: Die glänzende Zukunft der Solarenergie',
          text: 'Die Entwicklung der Solarenergie ist unbestreitbar vielversprechend. Kontinuierliche Forschung und Entwicklung, gepaart mit einer zunehmenden globalen Akzeptanz, werden ihre Rolle als primäre Energiequelle weiter festigen. HousePlus bleibt der Innovation verpflichtet und investiert in Forschung und Entwicklung, um die nächste Generation der Solartechnologie auf den Markt zu bringen. Wir laden Großhändler und Partner ein, gemeinsam mit uns eine nachhaltige und erfolgreiche Zukunft aufzubauen.',
        },
      ],
    },
    fr: {
      title: 'L\'avenir de l\'énergie solaire : Innovations et solutions HousePlus',
      authorName: 'Manus AI',
      datePublished: '2026-04-24',
      dateModified: '2026-04-24',
      image: '/images/products/solar-panel-3.jpg',
      imageAlt: 'Grande ferme solaire avec panneaux solaires HousePlus',
      sections: [
        {
          heading: 'Le virage mondial vers les énergies renouvelables',
          text: 'Le monde assiste à un virage sans précédent vers les sources d\'énergie renouvelables, l\'énergie solaire étant en tête. À mesure que les préoccupations concernant le changement climatique et la sécurité énergétique augmentent, la demande de solutions solaires efficaces et durables monte en flèche. Cette transition mondiale offre d\'immenses opportunités aux entreprises et aux consommateurs, stimulant l\'innovation et les avancées technologiques dans le secteur. HousePlus est à l\'avant-garde de cette révolution, fournissant des produits solaires de pointe pour répondre aux besoins changeants du marché.',
          image: '/images/products/solar-panel-1.jpg',
          imageAlt: 'Installation professionnelle de panneaux solaires sur un toit',
        },
        {
          heading: 'Innovations clés propulsant l\'énergie solaire',
          text: 'Ces dernières années ont été marquées par des percées remarquables dans la technologie solaire. Des cellules photovoltaïques plus efficaces aux systèmes avancés de stockage d\'énergie, l\'industrie est en constante évolution. Les innovations incluent les cellules solaires à pérovskite, les modules bifaciaux qui captent la lumière du soleil des deux côtés, et les solutions solaires intégrées pour les maisons intelligentes. Ces avancées rendent l\'énergie solaire plus accessible, abordable et puissante que jamais. HousePlus tire parti de ces innovations pour garantir que nos partenaires reçoivent les produits solaires les plus avancés et fiables.',
          image: '/images/products/solar-panel-2.jpg',
          imageAlt: 'Ouvriers installant des panneaux solaires sur un toit résidentiel',
        },
        {
          heading: 'HousePlus : Votre partenaire en solutions solaires durables',
          text: 'Chez HousePlus, nous nous engageons à doter nos partenaires mondiaux de solutions d\'énergie solaire de qualité supérieure. Notre gamme de produits comprend des panneaux solaires à haut rendement, des contrôleurs de charge MPPT robustes et des centrales électriques portables polyvalentes (de 300W à 3000W). Nous comprenons les divers besoins des acheteurs en gros en Afrique, en Asie du Sud-Est et en Europe, offrant des MOQ flexibles (100-500 pièces) et des services OEM/ODM complets. Nos produits sont certifiés CE/FCC/RoHS, garantissant la conformité aux normes de qualité internationales. Partenaires avec HousePlus pour fournir à vos clients des produits solaires fiables, durables et innovants.',
          image: '/images/products/portable-power-station.jpg',
          imageAlt: 'Centrale électrique portable HousePlus avec panneau solaire',
        },
        {
          heading: 'L\'essor des centrales électriques portables',
          text: 'Les centrales électriques portables révolutionnent la vie hors réseau, les aventures en plein air et la préparation aux urgences. Ces appareils compacts et de grande capacité offrent une énergie propre et silencieuse partout où elle est nécessaire, ce qui les rend idéaux pour le travail à distance, le camping et comme source d\'alimentation de secours fiable. Les centrales électriques portables de HousePlus sont conçues pour la durabilité et la performance, s\'intégrant parfaitement à nos panneaux solaires pour une solution énergétique hors réseau complète. Elles constituent un ajout parfait à tout portefeuille de produits ciblant les consommateurs modernes et soucieux de l\'environnement.',
          image: '/images/products/solar-power-station.jpg',
          imageAlt: 'Centrale électrique solaire HousePlus en extérieur',
        },
        {
          heading: 'Perspectives : L\'avenir radieux de l\'énergie solaire',
          text: 'La trajectoire de l\'énergie solaire est indéniablement brillante. La recherche et le développement continus, associés à une adoption mondiale croissante, consolideront davantage son rôle de source d\'énergie principale. HousePlus reste dédiée à l\'innovation, investissant dans la R&D pour commercialiser la prochaine génération de technologie solaire. Nous invitons les distributeurs et partenaires grossistes à nous rejoindre pour construire un avenir durable et prospère.',
        },
      ],
    },
    ar: {
      title: 'مستقبل الطاقة الشمسية: الابتكارات وحلول HousePlus',
      authorName: 'Manus AI',
      datePublished: '2026-04-24',
      dateModified: '2026-04-24',
      image: '/images/products/solar-panel-3.jpg',
      imageAlt: 'مزرعة شمسية واسعة النطاق بألواح HousePlus الشمسية',
      sections: [
        {
          heading: 'التحول العالمي نحو الطاقة المتجددة',
          text: 'يشهد العالم تحولًا غير مسبوق نحو مصادر الطاقة المتجددة، مع تصدر الطاقة الشمسية المشهد. مع تزايد المخاوف بشأن تغير المناخ وأمن الطاقة، يتزايد الطلب على حلول الطاقة الشمسية الفعالة والمستدامة بشكل كبير. يوفر هذا التحول العالمي فرصًا هائلة للشركات والمستهلكين على حد سواء، مما يدفع الابتكار والتقدم التكنولوجي في هذا القطاع. HousePlus في طليعة هذه الثورة، حيث توفر منتجات شمسية متطورة لتلبية الاحتياجات المتغيرة للسوق.',
          image: '/images/products/solar-panel-1.jpg',
          imageAlt: 'تركيب احترافي للألواح الشمسية على سطح منزل',
        },
        {
          heading: 'الابتكارات الرئيسية التي تدفع الطاقة الشمسية إلى الأمام',
          text: 'شهدت السنوات الأخيرة اختراقات ملحوظة في تكنولوجيا الطاقة الشمسية. من الخلايا الكهروضوئية الأكثر كفاءة إلى أنظمة تخزين الطاقة المتقدمة، تتطور الصناعة باستمرار. تشمل الابتكارات خلايا البيروفسكايت الشمسية، والوحدات ثنائية الوجه التي تلتقط ضوء الشمس من كلا الجانبين، وحلول الطاقة الشمسية المتكاملة للمنازل الذكية. تجعل هذه التطورات الطاقة الشمسية أكثر سهولة في الوصول إليها وبأسعار معقولة وأكثر قوة من أي وقت مضى. تستفيد HousePlus من هذه الابتكارات لضمان حصول شركائنا على أحدث منتجات الطاقة الشمسية وأكثرها موثوقية.',
          image: '/images/products/solar-panel-2.jpg',
          imageAlt: 'عمال يركبون ألواحًا شمسية على سطح سكني',
        },
        {
          heading: 'HousePlus: شريكك في حلول الطاقة الشمسية المستدامة',
          text: 'في HousePlus، نحن ملتزمون بتمكين شركائنا العالميين بحلول طاقة شمسية متفوقة. تشمل مجموعة منتجاتنا ألواحًا شمسية عالية الكفاءة، ووحدات تحكم شحن MPPT قوية، ومحطات طاقة محمولة متعددة الاستخدامات (من 300 واط إلى 3000 واط). نحن نتفهم الاحتياجات المتنوعة للمشترين بالجملة في إفريقيا وجنوب شرق آسيا وأوروبا، حيث نقدم حد أدنى مرن للطلب (100-500 قطعة) وخدمات OEM/ODM شاملة. منتجاتنا حاصلة على شهادات CE/FCC/RoHS، مما يضمن الامتثال لمعايير الجودة الدولية. شارك مع HousePlus لتزويد عملائك بمنتجات طاقة شمسية موثوقة ومستدامة ومبتكرة.',
          image: '/images/products/portable-power-station.jpg',
          imageAlt: 'محطة طاقة محمولة HousePlus مع لوح شمسي',
        },
        {
          heading: 'صعود محطات الطاقة المحمولة',
          text: 'تُحدث محطات الطاقة المحمولة ثورة في الحياة خارج الشبكة، والمغامرات الخارجية، والتأهب للطوارئ. توفر هذه الأجهزة المدمجة عالية السعة طاقة نظيفة وصامتة أينما دعت الحاجة إليها، مما يجعلها مثالية للعمل عن بعد، والتخييم، وكمصدر طاقة احتياطي موثوق. تم تصميم محطات الطاقة المحمولة من HousePlus للمتانة والأداء، وتتكامل بسلاسة مع ألواحنا الشمسية للحصول على حل طاقة كامل خارج الشبكة. إنها إضافة مثالية لأي مجموعة منتجات تستهدف المستهلكين العصريين المهتمين بالبيئة.',
          image: '/images/products/solar-power-station.jpg',
          imageAlt: 'محطة طاقة شمسية HousePlus في بيئة خارجية',
        },
        {
          heading: 'التطلع إلى الأمام: مستقبل الطاقة الشمسية المشرق',
          text: 'مسار الطاقة الشمسية مشرق بلا شك. ستؤدي الأبحاث والتطوير المستمر، إلى جانب التبني العالمي المتزايد، إلى ترسيخ دورها كمصدر أساسي للطاقة. تظل HousePlus مكرسة للابتكار، وتستثمر في البحث والتطوير لجلب الجيل القادم من تكنولوجيا الطاقة الشمسية إلى السوق. ندعو الموزعين والشركاء بالجملة للانضمام إلينا في بناء مستقبل مستدام ومزدهر.',
        },
      ],
    },
  };

  const data = articleContent[lang] || articleContent.en;

  const articleSchema = buildArticleSchema({
    headline: data.title,
    image: `https://www.houseplus-ch.com${data.image}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    authorName: data.author,

    description: generateSEOMetadata({ lang: lang as any, type: 'article', title: data.title, description: data.sections[0].text, keywords: [], url: `/${lang}/news/the-future-of-solar-energy` }).description as string,
  });

  return (
    <SchemaRenderer schemas={[articleSchema, buildBreadcrumbSchema(breadcrumbs)]}>
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} />

        <article className="max-w-6xl mx-auto py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-slate-900">{data.title}</h1>
          <div className="text-center text-gray-600 mb-8">
            By {data.author} | {new Date(data.datePublished).toLocaleDateString(lang)}
          </div>

          <div className="relative w-full h-96 mb-10 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {data.sections.map((section: any, index: number) => (
            <section key={index} className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-slate-800">{section.heading}</h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className={section.image ? 'md:w-1/2' : 'w-full'}>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">{section.text}</p>
                  {section.image && index % 2 === 0 && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md mt-4">
                      <Image
                        src={section.image}
                        alt={section.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                {section.image && index % 2 !== 0 && (
                  <div className="md:w-1/2 relative h-64 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={section.image}
                      alt={section.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </section>
          ))}

          <div className="mt-12 p-8 bg-blue-50 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              {lang === 'en' && 'Partner with HousePlus for Your Solar Needs'}
              {lang === 'es' && 'Asóciese con HousePlus para sus Necesidades Solares'}
              {lang === 'de' && 'Arbeiten Sie mit HousePlus für Ihre Solaranforderungen zusammen'}
              {lang === 'fr' && 'Partenariat avec HousePlus pour vos besoins solaires'}
              {lang === 'ar' && 'شراكة مع HousePlus لتلبية احتياجاتك الشمسية'}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {lang === 'en' && 'As a leading manufacturer, HousePlus offers reliable, high-performance solar systems and portable power stations. Contact us today for wholesale inquiries and OEM/ODM services.'}
              {lang === 'es' && 'Como fabricante líder, HousePlus ofrece sistemas solares y estaciones de energía portátiles confiables y de alto rendimiento. Contáctenos hoy para consultas al por mayor y servicios OEM/ODM.'}
              {lang === 'de' && 'Als führender Hersteller bietet HousePlus zuverlässige, leistungsstarke Solarsysteme und tragbare Kraftwerke. Kontaktieren Sie uns noch heute für Großhandelsanfragen und OEM/ODM-Dienstleistungen.'}
              {lang === 'fr' && 'En tant que fabricant leader, HousePlus propose des systèmes solaires et des centrales électriques portables fiables et performants. Contactez-nous dès aujourd\'hui pour les demandes de gros et les services OEM/ODM.'}
              {lang === 'ar' && 'بصفتها شركة رائدة في التصنيع، تقدم HousePlus أنظمة طاقة شمسية ومحطات طاقة محمولة موثوقة وعالية الأداء. اتصل بنا اليوم للاستفسارات بالجملة وخدمات OEM/ODM.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {lang === 'en' && 'Contact HousePlus'}
              {lang === 'es' && 'Contactar a HousePlus'}
              {lang === 'de' && 'HousePlus kontaktieren'}
              {lang === 'fr' && 'Contacter HousePlus'}
              {lang === 'ar' && 'اتصل بـ HousePlus'}
            </Link>
          </div>
        </article>
      </main>
    </SchemaRenderer>
  );
}
