import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { sortedBlogPosts } from '@/lib/blog-data';
import localizedArticles from '@/lib/localized-content/articles.json';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamicParams = false;

type Lang = (typeof validLangs)[number];

const pageText: Record<Lang, { globalB2B: string; featured: string; readFeatured: string; explore: string; latestLabel: string; category: Record<string, string> }> = {
  en: { globalB2B: 'Global B2B intelligence', featured: 'Featured insight', readFeatured: 'Read featured insight', explore: 'Explore article', latestLabel: 'Latest HousePlus insights', category: { solar: 'Solar & Storage', electronics: '3C Electronics', appliances: 'Home Appliances', industry: 'Industry Insights' } },
  es: { globalB2B: 'Inteligencia B2B global', featured: 'Análisis destacado', readFeatured: 'Leer análisis destacado', explore: 'Explorar artículo', latestLabel: 'Últimos análisis de HousePlus', category: { solar: 'Energía solar y almacenamiento', electronics: 'Electrónica 3C', appliances: 'Electrodomésticos', industry: 'Perspectivas de la industria' } },
  de: { globalB2B: 'Globale B2B-Insights', featured: 'Ausgewählter Einblick', readFeatured: 'Ausgewählten Einblick lesen', explore: 'Artikel lesen', latestLabel: 'Aktuelle HousePlus-Einblicke', category: { solar: 'Solarenergie und Speicher', electronics: '3C-Elektronik', appliances: 'Haushaltsgeräte', industry: 'Brancheneinblicke' } },
  fr: { globalB2B: 'Analyses B2B internationales', featured: 'Analyse à la une', readFeatured: 'Lire l’analyse à la une', explore: 'Découvrir l’article', latestLabel: 'Dernières analyses HousePlus', category: { solar: 'Solaire et stockage', electronics: 'Électronique 3C', appliances: 'Électroménager', industry: 'Analyses du secteur' } },
  ar: { globalB2B: 'رؤى B2B العالمية', featured: 'رؤية مميزة', readFeatured: 'اقرأ الرؤية المميزة', explore: 'استكشف المقال', latestLabel: 'أحدث رؤى هاوس بلس', category: { solar: 'الطاقة الشمسية والتخزين', electronics: 'إلكترونيات 3C', appliances: 'الأجهزة المنزلية', industry: 'رؤى الصناعة' } },
};

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'HousePlus News & Insights - Stay Updated with Industry Trends',
    es: 'Noticias y Perspectivas de HousePlus - Manténgase Actualizado con las Tendencias de la Industria',
    de: 'HousePlus Nachrichten & Einblicke - Bleiben Sie auf dem Laufenden über Branchentrends',
    fr: 'Actualités et Perspectives HousePlus - Restez informé des tendances de l\'industrie',
    ar: 'أخبار ورؤى HousePlus - ابق على اطلاع دائم باتجاهات الصناعة',
  };

  const descriptions: Record<string, string> = {
    en: 'Read the latest news, articles, and insights from HousePlus Group. Explore trends in solar energy, home appliances, and 3C electronics. Your source for industry knowledge and company updates.',
    es: 'Lea las últimas noticias, artículos y perspectivas de HousePlus Group. Explore las tendencias en energía solar, electrodomésticos y electrónica 3C. Su fuente de conocimiento de la industria y actualizaciones de la empresa.',
    de: 'Lesen Sie die neuesten Nachrichten, Artikel und Einblicke der HousePlus Group. Entdecken Sie Trends in Solarenergie, Haushaltsgeräten und 3C-Elektronik. Ihre Quelle für Branchenwissen und Unternehmensaktualisierungen.',
    fr: 'Lisez les dernières actualités, articles et analyses du groupe HousePlus. Explorez les tendances en matière d\'énergie solaire, d\'appareils électroménagers et d\'électronique 3C. Votre source de connaissances de l\'industrie et des mises à jour de l\'entreprise.',
    ar: 'اقرأ آخر الأخبار والمقالات والرؤى من مجموعة HousePlus. استكشف الاتجاهات في الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. مصدرك للمعرفة الصناعية وتحديثات الشركة.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ["news", "blog", "articles", "solar", "appliances", "electronics", "HousePlus", "industry trends"],
    url: `/${lang}/news`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function NewsPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : 'Inicio', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : 'Noticias', url: `/${lang}/news` },
  ];

  const titles: Record<string, string> = {
    en: 'HousePlus News & Insights - Stay Updated with Industry Trends',
    es: 'Noticias y Perspectivas de HousePlus - Manténgase Actualizado con las Tendencias de la Industria',
    de: 'HousePlus Nachrichten & Einblicke - Bleiben Sie auf dem Laufenden über Branchentrends',
    fr: 'Actualités et Perspectives HousePlus - Restez informé des tendances de l\'industrie',
    ar: 'أخبار ورؤى HousePlus - ابق على اطلاع دائم باتجاهات الصناعة',
  };

  const descriptions: Record<string, string> = {
    en: 'Read the latest news, articles, and insights from HousePlus Group. Explore trends in solar energy, home appliances, and 3C electronics. Your source for industry knowledge and company updates.',
    es: 'Lea las últimas noticias, artículos y perspectivas de HousePlus Group. Explore las tendencias en energía solar, electrodomésticos y electrónica 3C. Su fuente de conocimiento de la industria y actualizaciones de la empresa.',
    de: 'Lesen Sie die neuesten Nachrichten, Artikel und Einblicke der HousePlus Group. Entdecken Sie Trends in Solarenergie, Haushaltsgeräten und 3C-Elektronik. Ihre Quelle für Branchenwissen und Unternehmensaktualisierungen.',
    fr: 'Lisez les dernières actualités, articles et analyses du groupe HousePlus. Explorez les tendances en matière d\'énergie solaire, d\'appareils électroménagers et d\'électronique 3C. Votre source de connaissances de l\'industrie et des mises à jour de l\'entreprise.',
    ar: 'اقرأ آخر الأخبار والمقالات والرؤى من مجموعة HousePlus. استكشف الاتجاهات في الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. مصدرك للمعرفة الصناعية وتحديثات الشركة.',
  };

  const blogArticles = sortedBlogPosts.map((post) => {
    const localized = (localizedArticles as Record<string, Partial<Record<Lang, { title: string; description: string }>>>)[post.slug];
    return {
      slug: post.slug,
      image: post.heroImage,
      imageAlt: post.heroImageAlt,
      title: Object.fromEntries(validLangs.map((locale) => [locale, localized?.[locale]?.title || post.title])),
      description: Object.fromEntries(validLangs.map((locale) => [locale, localized?.[locale]?.description || post.description])),
      date: post.datePublished,
    };
  });

  const articles = [
    ...blogArticles,
    {
      slug: 'consumer-electronics-battery-life-testing',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-consumer-electronics-battery-life-testing-b2b-guide/',
      imageAlt: 'Consumer electronics battery cycle life testing in a controlled laboratory',
      title: {
        en: 'Battery Cycle Life Testing Standards: Technical Analysis for Consumer Electronics',
        es: 'Estándares de Prueba de Ciclos de Vida de Baterías: Análisis Técnico',
        de: 'Batteriezykluslebensdauer-Teststandards: Technische Analyse',
        fr: 'Normes d\'essai de durée de vie des batteries: Analyse technique',
        ar: 'معايير اختبار دورة حياة البطارية: تحليل تقني للإلكترونيات الاستهلاكية',
      },
      description: {
        en: 'Technical analysis of battery cycle life testing standards. Learn about 80% capacity retention threshold, 1C charge-discharge protocol, 25°C test temperature, and DOD impact on lifespan with quantified data.',
        es: 'Análisis técnico de estándares de prueba de ciclos de vida de baterías. Datos cuantificados sobre umbral 80% retención, protocolo 1C, temperatura 25°C e impacto DOD.',
        de: 'Technische Analyse von Batteriezykluslebensdauer-Teststandards. Quantifizierte Daten zu 80% Kapazitätserhalt, 1C-Protokoll, 25°C Testtemperatur und DOD-Einfluss.',
        fr: 'Analyse technique des normes d\'essai de durée de vie des batteries. Données quantifiées sur seuil 80% rétention, protocole 1C, température 25°C et impact DOD.',
        ar: 'تحليل تقني لمعايير اختبار دورة حياة البطارية. بيانات كمية عن عتبة 80% احتفاظ، بروتوكول 1C، حرارة 25 درجة مئوية وتأثير DOD.',
      },
      date: '2026-07-12',
    },
    {
      slug: 'appliance-energy-efficiency-vs-actual-consumption',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-appliance-energy-efficiency-vs-actual-consumption-b2b-guide/',
      imageAlt: 'Appliance energy consumption measurement with a laboratory power meter',
      title: {
        en: 'Appliance Energy Efficiency Ratings vs Actual Consumption: Technical Analysis',
        es: 'Calificaciones de Eficiencia Energética vs Consumo Real: Análisis Técnico',
        de: 'Energieeffizienzklassen vs tatsächlicher Verbrauch: Technische Analyse',
        fr: 'Classes d\'efficacité énergétique vs consommation réelle: Analyse technique',
        ar: 'تصنيفات كفاءة الطاقة مقابل الاستهلاك الفعلي: تحليل تقني',
      },
      description: {
        en: 'Technical analysis of why energy labels differ from real-world consumption. Learn about the 15-30% variance, temperature impact, standby power loss, and maintenance effects with quantified data.',
        es: 'Análisis técnico de por qué etiquetas energéticas difieren del consumo real. Datos cuantificados sobre varianza 15-30%, impacto temperatura, pérdida standby y efectos mantenimiento.',
        de: 'Technische Analyse warum Energielabels vom Realverbrauch abweichen. Quantifizierte Daten zu 15-30% Abweichung, Temperatureinfluss, Standby-Verlust und Wartungseffekten.',
        fr: 'Analyse technique pourquoi les étiquettes diffèrent de la consommation réelle. Données quantifiées sur écart 15-30%, impact température, perte veille et effets maintenance.',
        ar: 'تحليل تقني لسبب اختلاف الملصقات الطاقية عن الاستهلاك الفعلي. بيانات كمية عن التباين 15-30%، تأثير الحرارة، فقدان الاستعداد وتأثيرات الصيانة.',
      },
      date: '2026-07-08',
    },
    {
      slug: 'solar-storage-efficiency-optimization-guide',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-solar-storage-efficiency-optimization-guide-b2b-guide/',
      imageAlt: 'Engineer reviewing industrial solar storage efficiency equipment',
      title: {
        en: 'Solar Storage Efficiency Optimization: Technical Guide for Industrial Systems',
        es: 'Optimización de Eficiencia de Almacenamiento Solar: Guía Técnica',
        de: 'Solar Speichereffizienz Optimierung: Technischer Leitfaden',
        fr: 'Optimisation Efficacité Stockage Solaire: Guide Technique',
        ar: 'تحسين كفاءة تخزين الطاقة الشمسية: دليل تقني',
      },
      description: {
        en: 'Technical guide to optimizing solar storage efficiency. Learn about 92-96% round-trip efficiency, 80% DOD best practice, 20-30°C optimal temperature, and EMS ROI with quantified data.',
        es: 'Guía técnica para optimizar eficiencia de almacenamiento solar. Datos cuantificados sobre eficiencia 92-96%, DOD 80%, temperatura óptima 20-30°C y ROI de EMS.',
        de: 'Technischer Leitfaden zur Optimierung der Solar Speichereffizienz. Quantifizierte Daten zu 92-96% Effizienz, 80% DOD, 20-30°C optimaler Temperatur und EMS ROI.',
        fr: 'Guide technique pour optimiser l\'efficacité du stockage solaire. Données quantifiées sur efficacité 92-96%, DOD 80%, température optimale 20-30°C et ROI EMS.',
        ar: 'دليل تقني لتحسين كفاءة التخزين الشمسي. بيانات كمية عن كفاءة 92-96%، DOD 80%، درجة حرارة مثالية 20-30 مئوية وعائد استثمار EMS.',
      },
      date: '2026-07-03',
    },
    {
      slug: '2026-solar-market-update',
    image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-2026-solar-market-update-b2b-guide/',
    imageAlt: 'Modern solar microgrid and battery energy storage equipment',
    title: {
    en: 'Solar Energy Innovations in 2026: HousePlus Leading the Industry',
    es: 'Innovaciones en Energía Solar en 2026: HousePlus Liderando la Industria',
    de: 'Innovationen in der Solarenergie im 2026: HousePlus an der Spitze der Branche',
    fr: 'Innovations en énergie solaire en 2026: HousePlus à la pointe de l\'industrie',
    ar: 'ابتكارات الطاقة الشمسية في 2026: HousePlus تقود الصناعة',
    },
    description: {
    en: 'Discover the latest solar energy innovations from HousePlus in 2026, including high-efficiency panels, advanced battery storage, and integrated smart solutions for B2B clients worldwide.',
    es: 'Descubre las últimas innovaciones en energía solar de HousePlus en 2026, incluyendo paneles de alta eficiencia, almacenamiento de baterías avanzado y soluciones inteligentes integradas para clientes B2B en todo el mundo.',
    de: 'Entdecke die neuesten Innovationen in der Solarenergie von HousePlus im 2026, darunter hocheffiziente Module, fortschrittliche Batteriespeicher und integrierte intelligente Lösungen für B2B-Kunden weltweit.',
    fr: 'Découvrez les dernières innovations en énergie solaire de HousePlus en 2026, incluant des panneaux à haut rendement, un stockage par batterie avancé et des solutions intelligentes intégrées pour les clients B2B du monde entier.',
    ar: 'اكتشف أحدث ابتكارات الطاقة الشمسية من HousePlus في 2026، بما في ذلك الألواح عالية الكفاءة، وتخزين البطاريات المتقدم، والحلول الذكية المتكاملة لعملاء B2B في جميع أنحاء العالم.',
    },
    date: '2026-03-08',
  },
  {
    slug: '2026-appliances-market-update',
    image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-2026-appliances-market-update-b2b-guide/',
    imageAlt: 'Energy-efficient smart home appliances in a modern kitchen',
    title: {
    en: 'Smart Home Appliances 2026: Energy-Efficient Designs for Global Markets',
    es: 'Electrodomésticos Inteligentes 2026: Diseños Eficientes Energéticamente para Mercados Globales',
    de: 'Smart-Home-Geräte 2026: Energieeffiziente Designs für globale Märkte',
    fr: 'Appareils électroménagers intelligents 2026: Des designs énergétiques pour les marchés mondiaux',
    ar: 'الأجهزة المنزلية الذكية 2026: تصميمات موفرة للطاقة للأسواق العالمية',
    },
    description: {
    en: 'Explore HousePlus\'s 2026 line of smart home appliances featuring AI-driven controls, energy monitoring, and seamless integration for wholesale buyers across Africa, Asia, and Europe.',
    es: 'Explora la línea 2026 de electrodomésticos inteligentes de HousePlus con controles impulsados por IA, monitoreo de energía e integración perfecta para compradores mayoristas en África, Asia y Europa.',
    de: 'Entdecke die 2026-Linie von smarten Haushaltsgeräten von HousePlus mit KI-gesteuerten Steuerungen, Energieüberwachung und nahtloser Integration für Großhandelskäufer in Afrika, Asien und Europa.',
    fr: 'Explorez la gamme 2026 d\'appareils électroménagers intelligents de HousePlus, avec des commandes pilotées par IA, un suivi de l\'énergie et une intégration transparente pour les acheteurs en gros en Afrique, en Asie et en Europe.',
    ar: 'استكشف سلسلة 2026 من الأجهزة المنزلية الذكية من HousePlus التي تتميز بتحكم مدفوع بالذكاء الاصطناعي، ومراقبة الطاقة، والتكامل السلس لمشتري الجملة في أفريقيا وآسيا وأوروبا.',
    },
    date: '2026-05-16',
  },
  {
    slug: '2026-electronics-market-update',
    image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-2026-electronics-market-update-b2b-guide/',
    imageAlt: '2026 3C electronics collection of audio, storage and charging products',
    title: {
    en: '3C Electronics Trends 2026: HousePlus Wholesale Innovation',
    es: 'Tendencias en Electrónica 3C 2026: Innovación al por Mayor de HousePlus',
    de: '3C-Elektronik-Trends 2026: HousePlus-Großhandelsinnovation',
    fr: 'Tendances de l\'électronique 3C 2026: Innovation en gros de HousePlus',
    ar: 'اتجاهات الإلكترونيات 3C 2026: ابتكار الجملة من HousePlus',
    },
    description: {
    en: 'Stay ahead in 2026 with HousePlus\'s latest 3C electronics - premium audio devices, smart wearables, and innovative power solutions for B2B distributors.',
    es: 'Mantente a la vanguardia en 2026 con los últimos productos de electrónica 3C de HousePlus: dispositivos de audio premium, wearables inteligentes y soluciones de energía innovadoras para distribuidores B2B.',
    de: 'Bleib im 2026 voraus mit den neuesten 3C-Elektronikprodukten von HousePlus – Premium-Audiogeräte, intelligente Wearables und innovative Stromlösungen für B2B-Distributoren.',
    fr: 'Restez en tête en 2026 avec les derniers produits d\'électronique 3C de HousePlus - des appareils audio premium, des wearables intelligents et des solutions d\'énergie innovantes pour les distributeurs B2B.',
    ar: 'ابق في المقدمة في 2026 مع أحدث إلكترونيات 3C من HousePlus - أجهزة صوتية عالية الجودة، وأجهزة قابلة للارتداء الذكية، وحلول طاقة مبتكرة لموزعي B2B.',
    },
    date: '2026-04-17',
  },

    {
      slug: '2026-smart-home-appliances-market-guide',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-2026-smart-home-appliances-market-guide-b2b-guide/',
      imageAlt: 'Connected smart home appliances and energy monitoring products',
      title: {
        en: '2026 Global Smart Home Appliance Market Trends & B2B Procurement Guide',
        es: 'Tendencias del Mercado Global de Electrodomésticos Inteligentes 2026 y Guía de Adquisiciones B2B',
        de: 'Globale Smart-Home-Geräte-Markttrends 2026 & B2B-Beschaffungsleitfaden',
        fr: 'Tendances du marché mondial des appareils électroménagers intelligents 2026 et guide d\'approvisionnement B2B',
        ar: 'اتجاهات سوق الأجهزة المنزلية الذكية العالمية 2026 ودليل المشتريات B2B',
      },
      description: {
        en: 'Explore the key trends shaping the smart home appliance market in 2026, including AI integration, energy efficiency, and sustainable manufacturing. A comprehensive guide for B2B buyers from HousePlus.',
        es: 'Explore las tendencias clave que configuran el mercado de electrodomésticos inteligentes en 2026, incluida la integración de IA, la eficiencia energética y la fabricación sostenible. Una guía completa para compradores B2B de HousePlus.',
        de: 'Entdecken Sie die wichtigsten Trends, die den Markt für intelligente Haushaltsgeräte im Jahr 2026 prägen, einschließlich KI-Integration, Energieeffizienz und nachhaltiger Fertigung. Ein umfassender Leitfaden für B2B-Käufer von HousePlus.',
        fr: 'Explorez les tendances clés qui façonnent le marché des appareils électroménagers intelligents en 2026, y compris l\'intégration de l\'IA, l\'efficacité énergétique et la fabrication durable. Un guide complet pour les acheteurs B2B de HousePlus.',
        ar: 'استكشف الاتجاهات الرئيسية التي تشكل سوق الأجهزة المنزلية الذكية في عام 2026، بما في ذلك تكامل الذكاء الاصطناعي، وكفاءة الطاقة، والتصنيع المستدام. دليل شامل للمشترين B2B من HousePlus.',
      },
      date: '2026-05-15',
    },
    {
      slug: 'solar-energy-storage-industrial-manufacturing',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-solar-energy-storage-industrial-manufacturing-b2b-guide/',
      imageAlt: 'Industrial lithium battery racks and solar energy storage infrastructure',
      title: {
        en: 'Solar Energy Storage Systems in Industrial Manufacturing: A Sustainable Approach',
        es: 'Sistemas de Almacenamiento de Energía Solar en la Fabricación Industrial: Un Enfoque Sostenible',
        de: 'Solare Energiespeichersysteme in der industriellen Fertigung: Ein nachhaltiger Ansatz',
        fr: 'Systèmes de stockage d\'énergie solaire dans la fabrication industrielle : Une approche durable',
        ar: 'أنظمة تخزين الطاقة الشمسية في التصنيع الصناعي: نهج مستدام',
      },
      description: {
        en: 'Explore the benefits and applications of solar energy storage systems in industrial manufacturing, focusing on sustainability, cost efficiency, and energy independence. Learn how HousePlus solutions empower a greener industrial future.',
        es: 'Explore los beneficios y aplicaciones de los sistemas de almacenamiento de energía solar en la fabricación industrial, centrándose en la sostenibilidad, la eficiencia de costos y la independencia energética. Descubra cómo las soluciones de HousePlus impulsan un futuro industrial más verde.',
        de: 'Entdecken Sie die Vorteile und Anwendungen von Solarenergiespeichersystemen in der industriellen Fertigung, mit Fokus auf Nachhaltigkeit, Kosteneffizienz und Energieunabhängigkeit. Erfahren Sie, wie HousePlus-Lösungen eine grünere industrielle Zukunft ermöglichen.',
        fr: 'Explorez les avantages et les applications des systèmes de stockage d\'énergie solaire dans la fabrication industrielle, en mettant l\'accent sur la durabilité, l\'efficacité des coûts et l\'indépendance énergétique. Découvrez comment les solutions HousePlus favorisent un avenir industriel plus vert.',
        ar: 'استكشف فوائد وتطبيقات أنظمة تخزين الطاقة الشمسية في التصنيع الصناعي، مع التركيز على الاستدامة وكفاءة التكلفة واستقلالية الطاقة. تعرف على كيفية تمكين حلول HousePlus لمستقبل صناعي أكثر اخضرارًا.',
      },
      date: '2026-05-15',
    },
    {
      slug: 'oem-odm-manufacturing-guide',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-oem-odm-manufacturing-guide-b2b-guide/',
      imageAlt: 'OEM and ODM product development with appliance prototypes and packaging samples',
      title: {
        en: 'OEM & ODM Manufacturing: How HousePlus Helps Brands Build Custom Products',
        es: 'Fabricación OEM y ODM: Cómo HousePlus Ayuda a las Marcas a Construir Productos Personalizados',
        de: 'OEM- und ODM-Fertigung: Wie HousePlus Marken beim Aufbau individueller Produkte hilft',
        fr: 'Fabrication OEM et ODM : Comment HousePlus aide les marques à créer des produits personnalisés',
        ar: 'تصنيع OEM وODM: كيف تساعد HousePlus العلامات التجارية على بناء منتجات مخصصة',
      },
      description: {
        en: 'HousePlus offers comprehensive OEM and ODM manufacturing services for wholesale buyers looking to build their own branded product lines. From design consultation to mass production, discover how our factory capabilities can accelerate your business growth.',
        es: 'HousePlus ofrece servicios integrales de fabricación OEM y ODM para compradores mayoristas que buscan construir sus propias líneas de productos de marca. Desde la consultoría de diseño hasta la producción en masa, descubra cómo las capacidades de nuestra fábrica pueden acelerar el crecimiento de su negocio.',
        de: 'HousePlus bietet umfassende OEM- und ODM-Fertigungsdienstleistungen für Großhandelskäufer an, die ihre eigenen Markenproduktlinien aufbauen möchten. Von der Designberatung bis zur Massenproduktion – entdecken Sie, wie unsere Fabrikkapazitäten Ihr Unternehmenswachstum beschleunigen können.',
        fr: 'HousePlus propose des services complets de fabrication OEM et ODM pour les acheteurs en gros souhaitant créer leurs propres gammes de produits de marque. De la consultation en conception à la production de masse, découvrez comment les capacités de notre usine peuvent accélérer la croissance de votre entreprise.',
        ar: 'تقدم HousePlus خدمات تصنيع OEM وODM شاملة لمشتري الجملة الذين يتطلعون إلى بناء خطوط منتجاتهم الخاصة ذات العلامة التجارية. من استشارة التصميم إلى الإنتاج الضخم، اكتشف كيف يمكن لقدرات مصنعنا تسريع نمو أعمالك.',
      },
      date: '2025-09-17',
    },
    {
      slug: 'energy-efficiency-standards-appliances',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-energy-efficiency-standards-appliances-b2b-guide/',
      imageAlt: 'Home appliance compliance testing in an energy efficiency laboratory',
      title: {
        en: 'Energy Efficiency Standards in Modern Appliances: HousePlus CE & RoHS Compliance',
        es: 'Estándares de Eficiencia Energética en Electrodomésticos Modernos: Cumplimiento CE y RoHS de HousePlus',
        de: 'Energieeffizienzstandards bei modernen Geräten: HousePlus CE- und RoHS-Konformität',
        fr: 'Normes d\'efficacité énergétique dans les appareils modernes : Conformité CE et RoHS de HousePlus',
        ar: 'معايير كفاءة الطاقة في الأجهزة الحديثة: امتثال HousePlus لمعايير CE وRoHS',
      },
      description: {
        en: 'Understanding international energy efficiency standards is critical for wholesale buyers. HousePlus products meet CE, FCC, RoHS, and ISO 9001 requirements, ensuring compliance and market access across Europe, the Americas, and Asia.',
        es: 'Comprender los estándares internacionales de eficiencia energética es fundamental para los compradores mayoristas. Los productos de HousePlus cumplen con los requisitos CE, FCC, RoHS e ISO 9001, garantizando el cumplimiento y el acceso al mercado en Europa, las Américas y Asia.',
        de: 'Das Verständnis internationaler Energieeffizienzstandards ist für Großhandelskäufer entscheidend. HousePlus-Produkte erfüllen die Anforderungen von CE, FCC, RoHS und ISO 9001 und gewährleisten Compliance und Marktzugang in Europa, Amerika und Asien.',
        fr: 'Comprendre les normes internationales d\'efficacité énergétique est essentiel pour les acheteurs en gros. Les produits HousePlus répondent aux exigences CE, FCC, RoHS et ISO 9001, garantissant la conformité et l\'accès au marché en Europe, dans les Amériques et en Asie.',
        ar: 'يعد فهم معايير كفاءة الطاقة الدولية أمرًا بالغ الأهمية لمشتري الجملة. تستوفي منتجات HousePlus متطلبات CE وFCC وRoHS وISO 9001، مما يضمن الامتثال والوصول إلى الأسواق في أوروبا والأمريكتين وآسيا.',
      },
      date: '2025-05-08',
    },
    {
      slug: 'global-wholesale-guide-home-appliances',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-global-wholesale-guide-home-appliances-b2b-guide/',
      imageAlt: 'Global wholesale logistics for export-ready home appliances',
      title: {
        en: 'The Complete Guide to Wholesale Home Appliances: How HousePlus Supports Global Buyers',
        es: 'La Guía Completa para Electrodomésticos al por Mayor: Cómo HousePlus Apoya a los Compradores Globales',
        de: 'Der vollständige Leitfaden für Haushaltsgeräte im Großhandel: Wie HousePlus globale Käufer unterstützt',
        fr: 'Le guide complet des appareils électroménagers en gros : Comment HousePlus soutient les acheteurs mondiaux',
        ar: 'الدليل الشامل لأجهزة المنزل بالجملة: كيف تدعم HousePlus المشترين العالميين',
      },
      description: {
        en: 'A comprehensive guide for wholesale buyers on sourcing high-quality home appliances from HousePlus. Learn about MOQ, OEM/ODM services, certifications, and how we support distributors across Africa, Southeast Asia, and Europe.',
        es: 'Una guía completa para compradores mayoristas sobre el abastecimiento de electrodomésticos de alta calidad de HousePlus. Conozca el MOQ, los servicios OEM/ODM, las certificaciones y cómo apoyamos a los distribuidores en África, el Sudeste Asiático y Europa.',
        de: 'Ein umfassender Leitfaden für Großhandelskäufer zur Beschaffung hochwertiger Haushaltsgeräte von HousePlus. Erfahren Sie mehr über MOQ, OEM/ODM-Dienstleistungen, Zertifizierungen und wie wir Distributoren in Afrika, Südostasien und Europa unterstützen.',
        fr: 'Un guide complet pour les acheteurs en gros sur l\'approvisionnement en appareils électroménagers de haute qualité auprès de HousePlus. Découvrez le MOQ, les services OEM/ODM, les certificaciones et how we support distributors en Afrique, en Asie du Sud-Est et en Europe.',
        ar: 'دليل شامل لمشتري الجملة حول مصادر الأجهزة المنزلية عالية الجودة من HousePlus. تعرف على MOQ وخدمات OEM/ODM والشهادات وكيف ندعم الموزعين في أفريقيا وجنوب شرق آسيا وأوروبا.',
      },
      date: '2025-01-20',
    },
    {
      slug: 'advanced-manufacturing-home-appliances',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-advanced-manufacturing-home-appliances-b2b-guide/',
      imageAlt: 'Advanced robotic manufacturing line for home appliances',
      title: {
        en: 'Advanced Manufacturing in Home Appliances: HousePlus Quality',
        es: 'Fabricación Avanzada en Electrodomésticos: Calidad HousePlus',
        de: 'Fortschrittliche Fertigung bei Haushaltsgeräten: HousePlus Qualität',
        fr: 'Fabrication avancée d\'appareils électroménagers : Qualité HousePlus',
        ar: 'التصنيع المتقدم في الأجهزة المنزلية: جودة HousePlus',
      },
      description: {
        en: 'Discover HousePlus\'s commitment to advanced manufacturing techniques, stringent control, and sustainable practices in producing high-quality home appliances for global wholesale markets.',
        es: 'Descubra el compromiso de HousePlus con las técnicas de fabricación avanzadas, el estricto control de calidad y las prácticas sostenibles en la producción de electrodomésticos de alta calidad para los mercados mayoristas globales.',
        de: 'Entdecken Sie das Engagement von HousePlus für fortschrittliche Fertigungstechniken, strenge Qualitätskontrolle und nachhaltige Praktiken bei der Herstellung hochwertiger Haushaltsgeräte für globale Großhandelsmärkte.',
        fr: 'Découvrez l\'engagement de HousePlus envers les techniques de fabrication avancées, le contrôle qualité rigoureux et les pratiques durables dans la production d\'appareils électroménagers de haute qualité pour les marchés de gros mondiaux.',
        ar: 'اكتشف التزام HousePlus بتقنيات التصنيع المتقدمة، ومراقبة الجودة الصارمة، والممارسات المستدامة في إنتاج الأجهزة المنزلية عالية الجودة لأسواق الجملة العالمية.',
      },
      date: '2024-10-14',
    },
    {
      slug: 'the-future-of-smart-home-appliances',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-the-future-of-smart-home-appliances-b2b-guide/',
      imageAlt: 'Future-ready connected home appliances in a refined contemporary interior',
      title: {
        en: 'The Future of Smart Home Appliances: HousePlus Innovations',
        es: 'El Futuro de los Electrodomésticos Inteligentes: Innovaciones HousePlus',
        de: 'Die Zukunft smarter Haushaltsgeräte: HousePlus Innovationen',
        fr: 'L\'avenir des appareils électroménagers intelligents : Innovations HousePlus',
        ar: 'مستقبل الأجهزة المنزلية الذكية: ابتكارات HousePlus',
      },
      description: {
        en: 'Discover how HousePlus is shaping the future of smart home appliances with energy-efficient, connected, and intuitive solutions for modern living and global wholesale markets.',
        es: 'Descubra cómo HousePlus está dando forma al futuro de los electrodomésticos inteligentes con soluciones energéticamente eficientes, conectadas e intuitivas para la vida moderna y los mercados mayoristas globales.',
        de: 'Entdecken Sie, wie HousePlus die Zukunft smarter Haushaltsgeräte mit energieeffizienten, vernetzten und intuitiven Lösungen für modernes Wohnen und globale Großhandelsmärkte gestaltet.',
        fr: 'Découvrez comment HousePlus façonne l’avenir des appareils ménagers intelligents grâce à des solutions économes en énergie, connectées et intuitives pour la vie moderne et les marchés mondiaux de gros.',
        ar: 'اكتشف كيف تشكل HousePlus مستقبل الأجهزة المنزلية الذكية من خلال حلول موفرة للطاقة ومتصلة وبديهية للحياة العصرية وأسواق الجملة العالمية.',
      },
      date: '2024-08-01',
    },
    {
      slug: 'smart-home-appliances',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-smart-home-appliances-connected-living-b2b-guide/',
      imageAlt: 'Modern kitchen with connected smart home appliances',
      title: {
        en: 'Smart Home Appliances: Efficiency, Innovation, and HousePlus Solutions',
        es: 'Electrodomésticos Inteligentes: Eficiencia, Innovación y Soluciones HousePlus',
        de: 'Smarte Haushaltsgeräte: Effizienz, Innovation und HousePlus-Lösungen',
        fr: 'Appareils électroménagers intelligents : Efficacité, innovation et solutions HousePlus',
        ar: 'الأجهزة المنزلية الذكية: الكفاءة والابتكار وحلول HousePlus',
      },
      description: {
        en: 'Explore smart home appliance trends, energy-efficiency considerations and OEM/ODM discussion for global product sourcing.',
        es: 'Descubra cómo HousePlus está redefiniendo la vida moderna con electrodomésticos inteligentes y energéticamente eficientes.',
        de: 'Entdecken Sie intelligente, energieeffiziente Haushaltsgeräte für globale Großhandelsmärkte.',
        fr: 'Découvrez des appareils électroménagers intelligents et économes en énergie pour les marchés de gros mondiaux.',
        ar: 'استكشف الأجهزة المنزلية الذكية والموفرة للطاقة لأسواق الجملة العالمية.',
      },
      date: '2023-07-22',
    },
    {
      slug: 'solar-energy-storage-solutions',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-solar-energy-storage-solutions-b2b-guide/',
      imageAlt: 'Solar energy storage equipment and battery systems',
      title: {
        en: 'Solar Energy Storage Solutions: HousePlus Innovations',
        es: 'Soluciones de Almacenamiento de Energía Solar: Innovaciones HousePlus',
        de: 'Solare Energiespeicherlösungen: HousePlus Innovationen',
        fr: 'Solutions de stockage d’énergie solaire : Innovations HousePlus',
        ar: 'حلول تخزين الطاقة الشمسية: ابتكارات HousePlus',
      },
      description: {
        en: 'Explore technical considerations for solar energy storage, including battery systems and portable power stations for global procurement.',
        es: 'Explore las soluciones avanzadas de almacenamiento de energía solar de HousePlus, incluidos los sistemas de baterías y las estaciones de energía portátiles.',
        de: 'Entdecken Sie fortschrittliche Solarenergiespeicherlösungen einschließlich Batteriesystemen und tragbaren Kraftwerken.',
        fr: 'Découvrez des solutions avancées de stockage d’énergie solaire, y compris les systèmes de batteries et les centrales électriques portables.',
        ar: 'استكشف حلول تخزين الطاقة الشمسية المتقدمة، بما في ذلك أنظمة البطاريات ومحطات الطاقة المحمولة.',
      },
      date: '2024-02-19',
    },
    {
      slug: 'the-evolution-of-3c-electronics',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-evolution-3c-electronics-b2b-guide/',
      imageAlt: 'Modern 3C electronics products and accessories',
      title: {
        en: 'The Evolution of 3C Electronics: Innovation and HousePlus Solutions',
        es: 'La Evolución de la Electrónica 3C: Innovación y Soluciones HousePlus',
        de: 'Die Evolution der 3C-Elektronik: Innovation und HousePlus-Lösungen',
        fr: 'L’évolution de l’électronique 3C : Innovation et solutions HousePlus',
        ar: 'تطور الإلكترونيات 3C: الابتكار وحلول HousePlus',
      },
      description: {
        en: 'Explore 3C electronics trends, smart devices and product sourcing considerations for global B2B buyers.',
        es: 'Explore los rápidos avances en electrónica 3C, desde dispositivos inteligentes hasta iluminación LED.',
        de: 'Entdecken Sie die rasanten Fortschritte in der 3C-Elektronik, von Smart Devices bis zur LED-Beleuchtung.',
        fr: 'Explorez les avancées rapides de l’électronique 3C, des appareils intelligents à l’éclairage LED.',
        ar: 'استكشف التطورات السريعة في الإلكترونيات 3C، من الأجهزة الذكية إلى إضاءة LED.',
      },
      date: '2023-11-08',
    },
    {
      slug: 'the-future-of-solar-energy',
      image: 'https://images.houseplus-ch.com/media/houseplus-articles-covers-legacy-future-solar-energy-b2b-guide/',
      imageAlt: 'Solar panels and portable power equipment',
      title: {
        en: 'The Future of Solar Energy: Innovations and HousePlus Solutions',
        es: 'El Futuro de la Energía Solar: Innovaciones y Soluciones HousePlus',
        de: 'Die Zukunft der Solarenergie: Innovationen und HousePlus-Lösungen',
        fr: 'L’avenir de l’énergie solaire : Innovations et solutions HousePlus',
        ar: 'مستقبل الطاقة الشمسية: الابتكارات وحلول HousePlus',
      },
      description: {
        en: 'Explore solar energy technology trends, including solar panels, portable power stations and system considerations for global procurement.',
        es: 'Explore las últimas innovaciones en tecnología de energía solar y soluciones sostenibles para mercados mayoristas globales.',
        de: 'Entdecken Sie die neuesten Innovationen in der Solarenergietechnologie und nachhaltige Lösungen für globale Großhandelsmärkte.',
        fr: 'Découvrez les dernières innovations en matière de technologie de l’énergie solaire et des solutions durables pour les marchés de gros mondiaux.',
        ar: 'استكشف أحدث الابتكارات في تكنولوجيا الطاقة الشمسية والحلول المستدامة لأسواق الجملة العالمية.',
      },
      date: '2023-03-15',
    },
  ];

  const text = pageText[(validLangs.includes(lang as Lang) ? lang : 'en') as Lang];
  const categoryFor = (slug: string) => {
    if (/(solar|battery|lifepo|mppt|pwm|energy-storage)/.test(slug)) return text.category.solar;
    if (/(ssd|earphone|electronics|3c|consumer-electronics)/.test(slug)) return text.category.electronics;
    if (/(oem|manufacturing|wholesale|appliance|air-fryer|kitchen)/.test(slug)) return text.category.appliances;
    return text.category.industry;
  };
  const featuredArticle = articles[0];
  const articleGrid = articles.slice(1);

  return (
    <main className="min-h-screen bg-white">
      <div className="relative overflow-hidden bg-slate-900 px-4 py-20 text-white md:py-32">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Breadcrumb lang={lang} slug="news" />
          <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-blue-300">{text.globalB2B}</p>
          <h1 className="mb-4 mt-3 text-3xl font-black leading-tight md:text-5xl">
            {titles[lang] || titles.en}
          </h1>
          <p className="text-lg text-slate-300 md:text-xl">
            {descriptions[lang] || descriptions.en}
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20" aria-label={text.latestLabel}>
        {featuredArticle && (
          <Link
            href={`/${lang}/news/${featuredArticle.slug}`}
            className="group mb-10 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_28px_56px_rgba(37,99,235,0.16)] md:mb-14 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <figure className="relative min-h-[17rem] overflow-hidden bg-slate-100 md:min-h-[25rem]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                title={featuredArticle.title[lang as keyof typeof featuredArticle.title] || featuredArticle.title.en}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/55 to-transparent" aria-hidden="true" />
              <figcaption className="absolute bottom-5 left-5 rounded-full border border-white/35 bg-slate-950/80 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
                {text.featured}
              </figcaption>
            </figure>
            <div className="flex flex-col justify-center bg-gradient-to-br from-white via-white to-blue-50/70 px-7 py-8 md:px-10 md:py-12">
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">{categoryFor(featuredArticle.slug)}</p>
              <time className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500" dateTime={featuredArticle.date}>{featuredArticle.date}</time>
              <h2 className="mb-5 text-3xl font-black leading-[1.08] tracking-tight text-slate-950 transition-colors group-hover:text-blue-700 md:text-4xl">
                {featuredArticle.title[lang as keyof typeof featuredArticle.title] || featuredArticle.title.en}
              </h2>
              <p className="mb-7 text-base leading-7 text-slate-600 md:text-lg">
                {featuredArticle.description[lang as keyof typeof featuredArticle.description] || featuredArticle.description.en}
              </p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                {text.readFeatured} <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {articleGrid.map((article) => (
            <Link
              key={article.slug}
              href={`/${lang}/news/${article.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_22px_45px_rgba(37,99,235,0.16)]"
            >
              <figure className="relative aspect-[16/10] overflow-hidden bg-slate-100 md:aspect-video">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  title={article.title[lang as keyof typeof article.title] || article.title.en}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/45 to-transparent" aria-hidden="true" />
                <figcaption className="absolute bottom-4 left-4">
                  <span className="rounded-full border border-white/35 bg-slate-950/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">{categoryFor(article.slug)}</span>
                </figcaption>
              </figure>
              <div className="flex flex-grow flex-col px-6 pb-6 pt-5 md:px-7 md:pb-7 md:pt-6">
                <time className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700" dateTime={article.date}>
                  {article.date}
                </time>
                <h2 className="mb-3 line-clamp-2 text-xl font-black leading-[1.2] tracking-tight text-slate-900 transition-colors group-hover:text-blue-700 md:text-[1.35rem]">
                  {article.title[lang as keyof typeof article.title] || article.title.en}
                </h2>
                <p className="mb-6 line-clamp-3 flex-grow text-sm leading-6 text-slate-600">
                  {article.description[lang as keyof typeof article.description] || article.description.en}
                </p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                  {text.explore} <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
