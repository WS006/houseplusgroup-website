import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema-builder';
import { generateImageObjectSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: 'Consumer Electronics Battery Cycle Life Testing Standards: Technical Analysis',
    es: 'Estándares de Prueba de Ciclos de Vida de Baterías: Análisis Técnico',
    de: 'Batteriezykluslebensdauer-Teststandards: Technische Analyse',
    fr: 'Normes d\'essai de durée de vie des batteries: Analyse technique',
    ar: 'معايير اختبار دورة حياة بطارية الإلكترونيات المستهلكية: تحليل تقني',
  };

  const descriptions: Record<string, string> = {
    en: 'Technical analysis of battery cycle life testing standards for consumer electronics. Learn about charge-discharge protocols, capacity retention thresholds, and industry test methods with quantified data.',
    es: 'Análisis técnico de estándares de prueba de ciclos de vida de baterías para electrónica de consumo. Datos cuantificados sobre protocolos de carga-descarga y umbrales de retención de capacidad.',
    de: 'Technische Analyse von Batteriezykluslebensdauer-Teststandards für Konsumelektronik. Quantifizierte Daten zu Lade-Entlade-Protokollen und Kapazitätserhaltungs-Schwellenwerten.',
    fr: 'Analyse technique des normes d\'essai de durée de vie des batteries pour l\'électronique grand public. Données quantifiées sur les protocoles charge-décharge et seuils de rétention de capacité.',
    ar: 'تحليل تقني لمعايير اختبار دورة حياة البطارية للإلكترونيات الاستهلاكية. بيانات كمية حول بروتوكولات الشحن-التفريغ وعتبات الاحتفاظ بالسعة.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ["battery cycle life", "battery testing standards", "capacity retention", "charge-discharge protocol", "battery degradation", "consumer electronics", "technical analysis"],
    url: `/${lang}/news/consumer-electronics-battery-life-testing`,
    lang: lang as any,
    type: 'article',
    datePublished: '2026-07-12',
  });
}

const articleContent: Record<string, any> = {
  en: {
    title: 'Consumer Electronics Battery Cycle Life Testing Standards: Technical Analysis',
    authorName: 'HousePlus Technical Team',
    datePublished: '2026-07-12',
    dateModified: '2026-07-12',
    heroImage: '/images/articles/electronics/battery-testing-lab-equipment.jpg',
    heroImageAlt: 'Battery cycle life testing equipment performing 1C charge-discharge cycles at 25°C standard conditions for consumer electronics',
    sections: [
      {
        heading: '80% Capacity Retention Defines End-of-Life',
        text: 'Industry standard defines battery end-of-life at 80% capacity retention after cycling. Most consumer electronics warranties guarantee 80% capacity after 300-500 full charge-discharge cycles under normal use conditions.',
      },
      {
        heading: '1C Charge-Discharge Is Standard Test Protocol',
        text: 'IEC 62660 and UL 1642 standards use 1C charge-discharge rate for cycle life testing. 1C means full charge or discharge in 1 hour; 0.5C rate testing typically shows 20-30% longer cycle life results.',
      },
      {
        heading: '25°C Is Standard Test Temperature',
        text: 'Cycle life tests are conducted at 25°C ±2°C per industry standards. Testing at 45°C reduces cycle life by 40-50%, while 0°C testing decreases capacity by 25-30% compared to room temperature baseline.',
      },
      {
        heading: 'Cutoff Voltage Determines Usable Capacity',
        text: 'Li-ion batteries use 4.2V upper and 3.0V lower cutoff voltage for standard testing. Reducing lower cutoff to 2.5V adds 5-10% capacity but accelerates degradation by 35-40% over extended cycling.',
      },
      {
        heading: 'CC-CV Charging Is Industry Standard Method',
        text: 'Constant Current-Constant Voltage charging is used in all standard battery tests. CC phase charges at 1C to 4.2V; CV phase holds voltage until current drops to 0.05C, typically taking 2.5-3 hours total.',
      },
      {
        heading: 'Depth of Discharge Directly Impacts Cycle Count',
        text: '100% DOD yields 300-500 cycles; 50% DOD extends to 1200-1500 cycles for typical Li-ion. Shallow discharge cycling is the single most effective way to extend consumer electronics battery lifespan.',
      },
      {
        heading: 'Calendar Aging Runs Parallel to Cycle Aging',
        text: 'Batteries lose 2-3% capacity yearly from calendar aging alone, even without cycling. Storage at 40% charge and 15°C minimizes calendar degradation to less than 1% per year for premium cell chemistries.',
      },
      {
        heading: 'Core Conclusion',
        text: '80% capacity at 300-500 cycles at 1C/25°C is standard; extend life via shallow DOD and cool storage.',
      },
    ],
    faqs: [
      { q: 'What defines battery end-of-life?', a: '80% capacity retention after specified charge-discharge cycles.' },
      { q: 'What is standard cycle life test rate?', a: '1C charge-discharge per IEC 62660 and UL 1642 standards.' },
      { q: 'What temperature are tests conducted at?', a: '25°C ±2°C is standard for battery cycle life testing.' },
      { q: 'What is standard Li-ion cutoff voltage?', a: '4.2V upper, 3.0V lower cutoff for consumer batteries.' },
      { q: 'How does DOD affect cycle life?', a: '50% DOD gives 3x longer life vs 100% DOD cycling.' },
      { q: 'How much calendar capacity loss is normal?', a: '2-3% yearly even without any cycling usage.' },
      { q: 'What storage conditions minimize degradation?', a: '40% charge at 15°C reduces aging to under 1% per year.' },
    ],
  },
  es: {
    title: 'Estándares de Prueba de Ciclos de Vida de Baterías: Análisis Técnico',
    authorName: 'Equipo Técnico HousePlus',
    datePublished: '2026-06-08',
    dateModified: '2026-06-08',
    heroImage: '/images/articles/electronics/battery-testing-lab-equipment.jpg',
    heroImageAlt: 'Equipo de prueba de ciclos de vida de baterías 1C carga-descarga a 25°C para electrónica de consumo',
    sections: [
      {
        heading: '80% de Retención Define Fin de Vida',
        text: 'El estándar industrial define fin de vida al 80% de retención de capacidad tras ciclos. La mayoría de garantías de electrónica de consumo garantizan 80% de capacidad después de 300-500 ciclos completos.',
      },
      {
        heading: '1C Carga-Descarga Es Protocolo Estándar',
        text: 'Normas IEC 62660 y UL 1642 usan tasa 1C para pruebas de vida útil. 1C significa carga o descarga completa en 1 hora; pruebas a 0.5C típicamente muestran 20-30% más ciclos.',
      },
      {
        heading: '25°C Es Temperatura de Prueba Estándar',
        text: 'Pruebas de vida útil se conducen a 25°C ±2°C según estándares. Pruebas a 45°C reducen vida útil 40-50%, mientras que 0°C disminuye capacidad 25-30% vs temperatura ambiente base.',
      },
      {
        heading: 'Voltaje de Corte Determina Capacidad Útil',
        text: 'Baterías Li-ion usan 4.2V límite superior y 3.0V inferior para pruebas estándar. Reducir corte inferior a 2.5V añade 5-10% capacidad pero acelera degradación 35-40% en ciclos extendidos.',
      },
      {
        heading: 'Carga CC-CV Es Método Estándar Industrial',
        text: 'Carga de Corriente Constante-Voltaje Constante se usa en todas las pruebas estándar. Fase CC carga a 1C hasta 4.2V; fase CV mantiene voltaje hasta que corriente cae a 0.05C, total 2.5-3 horas.',
      },
      {
        heading: 'Profundidad de Descarga Afecta Conteo de Ciclos',
        text: '100% DOD rinde 300-500 ciclos; 50% DOD extiende a 1200-1500 ciclos para Li-ion típico. Ciclos de descarga superficial son la forma más efectiva de extender vida de batería.',
      },
      {
        heading: 'Envejecimiento de Calendario Paralelo al Cíclico',
        text: 'Baterías pierden 2-3% capacidad anual por envejecimiento de calendario, incluso sin ciclos. Almacenamiento al 40% carga y 15°C minimiza degradación a menos de 1% anual para celdas premium.',
      },
      {
        heading: 'Conclusión Principal',
        text: '80% capacidad a 300-500 ciclos a 1C/25°C es estándar; extienda vida con DOD superficial y almacenamiento frío.',
      },
    ],
    faqs: [
      { q: '¿Qué define fin de vida de batería?', a: '80% de retención de capacidad tras ciclos especificados.' },
      { q: '¿Cuál es tasa de prueba estándar?', a: '1C carga-descarga según normas IEC 62660 y UL 1642.' },
      { q: '¿A qué temperatura se realizan pruebas?', a: '25°C ±2°C es estándar para pruebas de vida útil.' },
      { q: '¿Cuál es voltaje de corte Li-ion estándar?', a: '4.2V superior, 3.0V inferior para baterías de consumo.' },
      { q: '¿Cómo afecta DOD a vida de ciclos?', a: '50% DOD da 3x más vida que ciclos de 100% DOD.' },
      { q: '¿Cuánta pérdida calendar es normal?', a: '2-3% anual incluso sin uso ni ciclos.' },
      { q: '¿Qué almacenamiento minimiza degradación?', a: '40% carga a 15°C reduce envejecimiento a <1% anual.' },
    ],
  },
  de: {
    title: 'Batteriezykluslebensdauer-Teststandards: Technische Analyse',
    authorName: 'HousePlus Technikteam',
    datePublished: '2026-06-08',
    dateModified: '2026-06-08',
    heroImage: '/images/articles/electronics/battery-testing-lab-equipment.jpg',
    heroImageAlt: 'Batterie-Zyklenlebensdauer-Prüfgerät mit 1C Lade-Entlade bei 25°C Standardbedingungen für Unterhaltungselektronik',
    sections: [
      {
        heading: '80% Kapazitätserhalt Definiert Lebensende',
        text: 'Industriestandard definiert Batterielebensende bei 80% Kapazitätserhalt nach Zyklen. Die meisten Konsumelektronik-Garantien gewährleisten 80% Kapazität nach 300-500 vollen Lade-Entlade-Zyklen.',
      },
      {
        heading: '1C Lade-Entladung Ist Standardtestprotokoll',
        text: 'IEC 62660 und UL 1642 verwenden 1C-Rate für Zykluslebensdauertests. 1C bedeutet volle Ladung oder Entladung in 1 Stunde; 0.5C-Tests zeigen typischerweise 20-30% längere Zykluslebensdauer.',
      },
      {
        heading: '25°C Ist Standardtesttemperatur',
        text: 'Zykluslebensdauertests werden bei 25°C ±2°C nach Industriestandards durchgeführt. Tests bei 45°C reduzieren Lebensdauer um 40-50%, während 0°C Kapazität um 25-30% gegenüber Raumtemperatur senkt.',
      },
      {
        heading: 'Grenzspannung Bestimmt Nutzbare Kapazität',
        text: 'Li-Ionen-Batterien verwenden 4.2V obere und 3.0V untere Grenzspannung für Standardtests. Senken der unteren Grenze auf 2.5V fügt 5-10% Kapazität hinzu, beschleunigt aber Degradation um 35-40%.',
      },
      {
        heading: 'CC-CV-Ladung Ist Industriestandardverfahren',
        text: 'Konstanter Strom-Konstante Spannung Ladung wird in allen Standardtests verwendet. CC-Phase lädt mit 1C auf 4.2V; CV-Phase hält Spannung bis Strom auf 0.05C fällt, insgesamt 2.5-3 Stunden.',
      },
      {
        heading: 'Entladungstiefe Beeinflusst Zyklusanzahl Direkt',
        text: '100% DOD ergibt 300-500 Zyklen; 50% DOD erweitert auf 1200-1500 Zyklen für typisches Li-Ion. Flache Entladezyklen sind die effektivste Weise zur Verlängerung der Batterielebensdauer.',
      },
      {
        heading: 'Kalenderalterung Läuft Parallel zur Zyklusalterung',
        text: 'Batterien verlieren 2-3% Kapazität jährlich allein durch Kalenderalterung, auch ohne Zyklen. Lagerung bei 40% Ladung und 15°C minimiert Kalenderdegradation auf unter 1% pro Jahr für Premium-Zellen.',
      },
      {
        heading: 'Kernschlussfolgerung',
        text: '80% Kapazität bei 300-500 Zyklen mit 1C/25°C ist Standard; verlängern Sie die Lebensdauer durch flache DOD und kühle Lagerung.',
      },
    ],
    faqs: [
      { q: 'Was definiert Batterielebensende?', a: '80% Kapazitätserhalt nach angegebenen Lade-Entlade-Zyklen.' },
      { q: 'Was ist Standard-Zykluslebensdauertestrate?', a: '1C Lade-Entladung nach IEC 62660 und UL 1642.' },
      { q: 'Bei welcher Temperatur werden Tests durchgeführt?', a: '25°C ±2°C ist Standard für Zykluslebensdauertests.' },
      { q: 'Was ist Standard-Li-Ionen-Grenzspannung?', a: '4.2V oben, 3.0V unten für Konsumbatterien.' },
      { q: 'Wie beeinflusst DOD die Zykluslebensdauer?', a: '50% DOD ergibt 3x längere Lebensdauer vs 100% DOD-Zyklen.' },
      { q: 'Wie viel Kalenderkapazitätsverlust ist normal?', a: '2-3% jährlich auch ohne jegliche Zyklennutzung.' },
      { q: 'Welche Lagerung minimiert Degradation?', a: '40% Ladung bei 15°C reduziert Alterung auf <1% jährlich.' },
    ],
  },
  fr: {
    title: 'Normes d\'essai de durée de vie des batteries: Analyse technique',
    authorName: 'Équipe Technique HousePlus',
    datePublished: '2026-06-08',
    dateModified: '2026-06-08',
    heroImage: '/images/articles/electronics/battery-testing-lab-equipment.jpg',
    heroImageAlt: 'Équipement test cycles de vie batterie 1C charge-décharge à 25°C pour électronique grand public',
    sections: [
      {
        heading: '80% de Rétention Définit Fin de Vie',
        text: 'La norme industrielle définit fin de vie de batterie à 80% de rétention après cycles. La plupart des garanties électronique grand public garantissent 80% de capacité après 300-500 cycles complets.',
      },
      {
        heading: '1C Charge-Décharge Est Protocole Standard',
        text: 'Normes IEC 62660 et UL 1642 utilisent taux 1C pour tests durée de vie. 1C signifie charge ou décharge complète en 1 heure; tests à 0.5C montrent typiquement 20-30% plus de cycles.',
      },
      {
        heading: '25°C Est Température de Test Standard',
        text: 'Tests de durée de vie sont menés à 25°C ±2°C selon normes industrielles. Tests à 45°C réduisent durée de vie 40-50%, tandis que 0°C diminue capacité 25-30% vs température ambiante.',
      },
      {
        heading: 'Tension de Coupe Détermine Capacité Utile',
        text: 'Batteries Li-ion utilisent 4.2V limite supérieure et 3.0V inférieure pour tests standard. Réduire coupe inférieure à 2.5V ajoute 5-10% capacité mais accélère dégradation 35-40% sur cycles étendus.',
      },
      {
        heading: 'Charge CC-CV Est Méthode Standard Industrielle',
        text: 'Charge Courant Constant-Tension Constante est utilisée dans tous les tests standard. Phase CC charge à 1C jusqu\'à 4.2V; phase CV maintient tension jusqu\'à ce que courant tombe à 0.05C, total 2.5-3 heures.',
      },
      {
        heading: 'Profondeur de Décharge Affecte Nombre de Cycles',
        text: '100% DOD donne 300-500 cycles; 50% DOD étend à 1200-1500 cycles pour Li-ion typique. Cycles de décharge superficielle sont le moyen le plus efficace d\'étendre durée de vie.',
      },
      {
        heading: 'Vieillissement Calendaire Parallèle au Cyclique',
        text: 'Batteries perdent 2-3% capacité annuelle par vieillissement calendaire, même sans cycles. Stockage à 40% charge et 15°C minimise dégradation à moins de 1% par an pour cellules premium.',
      },
      {
        heading: 'Conclusion Principale',
        text: '80% capacité à 300-500 cycles à 1C/25°C est standard; prolongez vie avec DOD superficiel et stockage frais.',
      },
    ],
    faqs: [
      { q: 'Qu\'est-ce qui définit fin de vie batterie?', a: '80% de rétention de capacité après cycles spécifiés.' },
      { q: 'Quel est taux de test standard durée de vie?', a: '1C charge-décharge selon normes IEC 62660 et UL 1642.' },
      { q: 'À quelle température sont effectués les tests?', a: '25°C ±2°C est standard pour tests durée de vie cycles.' },
      { q: 'Quelle est tension de coupe Li-ion standard?', a: '4.2V supérieur, 3.0V inférieur pour batteries consommation.' },
      { q: 'Comment DOD affecte-t-il durée de vie cycles?', a: '50% DOD donne 3x plus de vie que cycles 100% DOD.' },
      { q: 'Quelle perte calendaire capacité est normale?', a: '2-3% annuel même sans aucune utilisation cyclique.' },
      { q: 'Quel stockage minimise dégradation?', a: '40% charge à 15°C réduit vieillissement à <1% annuel.' },
    ],
  },
  ar: {
    title: 'معايير اختبار دورة حياة بطارية الإلكترونيات المستهلكية: تحليل تقني',
    authorName: 'الفريق التقني HousePlus',
    datePublished: '2026-06-08',
    dateModified: '2026-06-08',
    heroImage: '/images/articles/electronics/battery-testing-lab-equipment.jpg',
    heroImageAlt: 'معدات اختبار دورة حياة البطارية 1C شحن-تفريغ عند 25 درجة مئوية للإلكترونيات الاستهلاكية',
    sections: [
      {
        heading: '80% من الاحتفاظ بالسعة يحدد نهاية العمر',
        text: 'يحدد المعيار الصناعي نهاية عمر البطارية عند 80% من الاحتفاظ بالسعة بعد الدورات. تضمن معظم ضمانات الإلكترونيات الاستهلاكية 80% سعة بعد 300-500 دورة شحن-تفريغ كاملة.',
      },
      {
        heading: 'شحن-تفريغ 1C هو بروتوكول الاختبار القياسي',
        text: 'تستخدم معايير IEC 62660 وUL 1642 معدل 1C لاختبارات عمر الدورة. 1C تعني شحن أو تفريغ كامل في ساعة واحدة؛ اختبارات 0.5C تظهر عادة 20-30% عمر دورة أطول.',
      },
      {
        heading: '25 درجة مئوية هي درجة حرارة الاختبار القياسية',
        text: 'تُجرى اختبارات عمر الدورة عند 25 درجة مئوية ±2 درجة مئوية وفقاً للمعايير الصناعية. الاختبارات عند 45 درجة مئوية تقلل العمر بنسبة 40-50%، بينما 0 درجة مئوية تقلل السعة 25-30%.',
      },
      {
        heading: 'جهد القطع يحدد السعة القابلة للاستخدام',
        text: 'تستخدم بطاريات الليثيوم أيون 4.2 فولت حد أعلى و 3.0 فولت حد أدنى للاختبارات القياسية. تقليل القطع السفلي إلى 2.5 فولت يضيف 5-10% سعة لكنه يسرع التدهور بنسبة 35-40%.',
      },
      {
        heading: 'شحن CC-CV هو الطريقة الصناعية القياسية',
        text: 'شحن التيار المستمر-الجهد المستمر يُستخدم في جميع الاختبارات القياسية. مرحلة CC تشحن بـ 1C حتى 4.2 فولت؛ مرحلة CV تحافظ على الجهد حتى ينخفض التيار إلى 0.05C، إجمالي 2.5-3 ساعات.',
      },
      {
        heading: 'عمق التفريغ يؤثر على عدد الدورات مباشرة',
        text: '100% DOD ينتج 300-500 دورة؛ 50% DOD يمتد إلى 1200-1500 دورة لليثيوم أيون النموذجي. دورات التفريغ السطحية هي الطريقة الأكثر فعالية لإطالة عمر البطارية.',
      },
      {
        heading: 'تقدم التقويم يعمل بالتوازي مع تقدم الدورة',
        text: 'تفقد البطاريات 2-3% سعة سنوياً بسبب تقدم التقويم، حتى بدون دورات. التخزين عند 40% شحن و 15 درجة مئوية يقلل تدهور التقويم إلى أقل من 1% سنوياً للخلايا الممتازة.',
      },
      {
        heading: 'الاستنتاج الأساسي',
        text: '80% سعة عند 300-500 دورة بـ 1C/25 درجة مئوية هو القياسي؛ إطالة العمر عبر DOD سطحي وتخزين بارد.',
      },
    ],
    faqs: [
      { q: 'ما الذي يحدد نهاية عمر البطارية؟', a: '80% من الاحتفاظ بالسعة بعد دورات شحن-تفريغ محددة.' },
      { q: 'ما هو معدل اختبار عمر الدورة القياسي؟', a: '1C شحن-تفريغ وفقاً لمعايير IEC 62660 وUL 1642.' },
      { q: 'أي درجة حرارة تُجرى فيها الاختبارات؟', a: '25 درجة مئوية ±2 هو القياسي لاختبارات عمر الدورة.' },
      { q: 'ما هو جهد قطع Li-ion القياسي؟', a: '4.2 فولت أعلى، 3.0 فولت أدنى للبطاريات الاستهلاكية.' },
      { q: 'كيف يؤثر DOD على عمر الدورة؟', a: '50% DOD يعطي عمراً أطول ب 3 مرات مقابل دورات 100% DOD.' },
      { q: 'كم فقدان سعة تقويمي طبيعي؟', a: '2-3% سنوياً حتى بدون أي استخدام دوري.' },
      { q: 'ما التخزين الذي يقلل التدهور؟', a: '40% شحن عند 15 درجة مئوية يقلل الشيخوخة إلى <1% سنوياً.' },
    ],
  },
};

export default async function BlogPostPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const content = articleContent[lang] || articleContent.en;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : lang === 'de' ? 'Startseite' : lang === 'fr' ? 'Accueil' : 'الرئيسية', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : lang === 'es' ? 'Noticias' : lang === 'de' ? 'Neuigkeiten' : lang === 'fr' ? 'Actualités' : 'الأخبار', url: `/${lang}/news` },
    { name: content.title, url: `/${lang}/news/consumer-electronics-battery-life-testing` },
  ];

  const articleSchema = buildArticleSchema({
    headline: content.title,
    image: content.heroImage,
    datePublished: content.datePublished,
    dateModified: content.dateModified,
    authorName: content.authorName,
    description: content.sections[0].text,
  }, {
    url: `https://www.houseplus-ch.com/${lang}/news/consumer-electronics-battery-life-testing`,
    lang,
  });

  const imageObjectSchema = generateImageObjectSchema({
    url: content.heroImage,
    caption: content.heroImageAlt,
    description: 'Battery cycle life testing equipment performing 1C charge-discharge cycles at 25°C standard test conditions',
    width: 1200,
    height: 675,
  });

  return (
    <main className="min-h-screen bg-white">
      <SchemaRenderer schemas={[articleSchema, imageObjectSchema, buildBreadcrumbSchema(breadcrumbs)]} />
      <div className="relative bg-slate-900 text-white py-20 md:py-32 px-4 overflow-hidden">
        <Image
          src={content.heroImage}
          alt={content.heroImageAlt}
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <Breadcrumb lang={lang} customLabel={content.title} />
          <h1 className="text-3xl md:text-5xl font-black mt-6 mb-4 leading-tight">
            {content.title}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-6">
            {content.sections[0].text.split('.')[0] + '.'}
          </p>
          <div className="text-slate-400 text-sm">
            By {content.authorName} | Published on {content.datePublished}
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto py-16 px-4 prose prose-lg prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-li:text-slate-700 prose-strong:text-slate-900">
        {content.sections.map((section: any, index: number) => (
          <div key={index}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </div>
        ))}
      </article>

      {content.faqs && content.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200">
            <h2 className="text-3xl font-black text-slate-900 mb-8">FAQ</h2>
            <div className="space-y-6">
              {content.faqs.map((faq: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">Q: {faq.q}</h3>
                  <p className="text-slate-600">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-amber-500 to-orange-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            {lang === 'en' ? 'Premium 3C Electronics with Long-Lasting Batteries' :
             lang === 'es' ? 'Electrónica 3C Premium con Baterías de Larga Duración' :
             lang === 'de' ? 'Premium 3C-Elektronik mit langlebigen Batterien' :
             lang === 'fr' ? 'Électronique 3C premium avec batteries longue durée' :
             'إلكترونيات 3C ممتازة ببطاريات طويلة العمر'}
          </h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
            {lang === 'en' ? 'B2B wholesale 3C electronics with tested battery quality. 80% capacity after 500 cycles, UL/IEC certified, OEM/ODM custom branding. MOQ from 100 units.' :
             lang === 'es' ? 'Electrónica 3C al por mayor B2B con calidad de batería probada. 80% capacidad después de 500 ciclos, certificada UL/IEC, marca personalizada OEM/ODM. MOQ desde 100 unidades.' :
             lang === 'de' ? 'B2B-Großhandel 3C-Elektronik mit getesteter Batteriequalität. 80% Kapazität nach 500 Zyklen, UL/IEC zertifiziert, OEM/ODM Custom Branding. MOQ ab 100 Stück.' :
             lang === 'fr' ? 'Électronique 3C en gros B2B avec qualité de batterie testée. 80% de capacité après 500 cycles, certifiée UL/IEC, personnalisation OEM/ODM. MOQ à partir de 100 unités.' :
             'إلكترونيات 3C بالجملة لـ B2B بجودة بطارية مختبرة. 80% سعة بعد 500 دورة، معتمدة UL/IEC، علامة تجارية مخصصة OEM/ODM. الحد الأدنى للطلب من 100 وحدة.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/products`} className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-700 font-bold rounded-full hover:bg-orange-50 transition-colors">
              {lang === 'en' ? 'Browse 3C Products' :
               lang === 'es' ? 'Explorar Productos 3C' :
               lang === 'de' ? '3C-Produkte durchsuchen' :
               lang === 'fr' ? 'Parcourir les produits 3C' :
               'تصفح منتجات 3C'}
            </Link>
            <Link href={`/${lang}/contact`} className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              {lang === 'en' ? 'Request OEM Samples' :
               lang === 'es' ? 'Solicitar Muestras OEM' :
               lang === 'de' ? 'OEM-Muster anfordern' :
               lang === 'fr' ? 'Demander des échantillons OEM' :
               'طلب عينات OEM'}
            </Link>
          </div>
        </div>
      </section>

      <div className="text-center py-12 bg-slate-50 border-t border-slate-100">
        <Link href={`/${lang}/news`} className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to all News & Insights
        </Link>
      </div>
    </main>
  );
}
