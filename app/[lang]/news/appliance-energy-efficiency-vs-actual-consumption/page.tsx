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
    en: 'Home Appliance Energy Efficiency Ratings vs Actual Consumption: Technical Analysis',
    es: 'Calificaciones de Eficiencia Energética vs Consumo Real: Análisis Técnico',
    de: 'Energieeffizienzklassen vs tatsächlicher Verbrauch: Technische Analyse',
    fr: 'Classes d\'efficacité énergétique vs consommation réelle: Analyse technique',
    ar: 'تصنيفات كفاءة الطاقة للأجهزة المنزلية مقابل الاستهلاك الفعلي: تحليل تقني',
  };

  const descriptions: Record<string, string> = {
    en: 'Technical analysis of why home appliance energy efficiency labels differ from real-world consumption. Learn about test conditions, load factors, usage patterns, and the 15-30% typical variance with quantified data.',
    es: 'Análisis técnico de por qué las etiquetas de eficiencia energética difieren del consumo real. Datos cuantificados sobre condiciones de prueba, factores de carga y patrones de uso.',
    de: 'Technische Analyse warum Energieeffizienzklassen vom tatsächlichen Verbrauch abweichen. Quantifizierte Daten zu Testbedingungen, Lastfaktoren und Nutzungsmustern.',
    fr: 'Analyse technique pourquoi les étiquettes d\'efficacité énergétique diffèrent de la consommation réelle. Données quantifiées sur conditions de test, facteurs de charge et modes d\'utilisation.',
    ar: 'تحليل تقني لسبب اختلاف ملصقات كفاءة الطاقة للأجهزة المنزلية عن الاستهلاك الفعلي. بيانات كمية عن ظروف الاختبار وعوامل الحمل وأنماط الاستخدام.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ["energy efficiency rating", "appliance energy consumption", "energy label accuracy", "real world energy use", "appliance testing standards", "energy savings", "technical analysis", "home appliances"],
    url: `/${lang}/news/appliance-energy-efficiency-vs-actual-consumption`,
    lang: lang as any,
    type: 'article',
    datePublished: '2026-07-08',
  });
}

const articleContent: Record<string, any> = {
  en: {
    title: 'Home Appliance Energy Efficiency Ratings vs Actual Consumption: Technical Analysis',
    authorName: 'HousePlus Technical Team',
    datePublished: '2026-07-08',
    dateModified: '2026-07-08',
    heroImage: '/images/articles/appliances/home-appliance-kitchen-modern.jpg',
    heroImageAlt: 'Comparison chart showing 15-30% variance between rated and actual home appliance energy consumption',
    sections: [
      {
        heading: 'Labels Underestimate Real Consumption by 15-30%',
        text: 'Standardized energy labels show 15-30% lower consumption than real-world use. Test conditions use 25°C ambient, standard loads, and ideal pressure vs variable household conditions.',
      },
      {
        heading: 'Refrigerator Use Rises 2.5-4% per °C Above 25°C',
        text: 'Refrigerators tested at 25°C consume 25-40% more energy at 35°C ambient. Door openings add 10-15% extra — 5-8 daily openings vs zero in laboratory test environments.',
      },
      {
        heading: 'Cold Water Washes Cut Energy 40-50%',
        text: 'Labels assume 90% load at 60°C, but households average 60-70% load at 30-40°C. Overloading by 20% above rated capacity reduces cleaning efficiency and increases energy use by 15%.',
      },
      {
        heading: 'AC Efficiency Drops 15-20% at 35°C Outdoor',
        text: 'SEER ratings measure at 27°C outdoor; real-world 35°C temperatures reduce efficiency 15-20%. Oversized units cycle frequently, cutting lifespan 30% and increasing consumption 25%.',
      },
      {
        heading: 'Standby Power Wastes 100-300 kWh Yearly',
        text: 'Appliances in standby consume 1-5W continuously, totaling 8.7-43.8 kWh annually per unit. Homes with 10+ standby devices waste 5-15% of total appliance energy consumption.',
      },
      {
        heading: '6-Month Maintenance Preserves 95% Efficiency',
        text: 'Dirty condenser coils reduce refrigerator efficiency 25-30% after 3 years. Clogged filters decrease AC airflow 15-20%. Regular biannual maintenance preserves original rating over 10 years.',
      },
      {
        heading: '10% Voltage Drop Raises Current 10-15%',
        text: 'Voltage fluctuations increase motor current and energy consumption proportionally. Spikes above 10% reduce component lifespan by 40-50%, while stabilizers maintain consistent efficiency.',
      },
      {
        heading: 'Core Conclusion',
        text: 'Expect 15-30% higher real consumption; optimize via proper sizing, temperature settings, and 6-month maintenance.',
      },
    ],
    faqs: [
      { q: 'How much do labels differ from actual use?', a: '15-30% variance; real conditions increase consumption vs standardized tests.' },
      { q: 'How does temperature affect fridge efficiency?', a: '2.5-4% more energy per °C above 25°C ambient baseline.' },
      { q: 'Does cold water wash save energy?', a: 'Yes, 40-50% less energy vs 60°C hot water wash cycles.' },
      { q: 'What reduces AC efficiency at high temps?', a: '15-20% efficiency drop at 35°C vs 27°C SEER test condition.' },
      { q: 'How much standby power do appliances use?', a: '1-5W per appliance, 100-300 kWh/year total for 10+ devices.' },
      { q: 'How often should appliances be maintained?', a: 'Every 6 months preserves 95% efficiency over 10-year lifespan.' },
      { q: 'Does voltage fluctuation affect consumption?', a: '10% voltage drop increases motor current and energy use by 10-15%.' },
    ],
  },
  es: {
    title: 'Calificaciones de Eficiencia Energética vs Consumo Real: Análisis Técnico',
    authorName: 'Equipo Técnico HousePlus',
    datePublished: '2026-02-21',
    dateModified: '2026-02-21',
    heroImage: '/images/articles/appliances/home-appliance-kitchen-modern.jpg',
    heroImageAlt: 'Gráfico comparativo que muestra la variación del 15-30% entre el consumo nominal y real de electrodomésticos',
    sections: [
      {
        heading: 'La Brecha del 15-30%: Etiqueta vs Consumo Real',
        text: 'Las etiquetas energéticas estandarizadas muestran 15-30% menos consumo que el uso real típico. Las condiciones de prueba usan temperatura ambiente óptima (25°C), cargas estándar y presión de agua ideal. Las condiciones reales pueden aumentar el consumo significativamente.',
      },
      {
        heading: 'Impacto de la Temperatura Ambiente en Refrigeradores',
        text: 'El consumo de refrigeradores aumenta 2.5-4% por °C sobre 25°C ambiente. Unidades probadas a 25°C pueden consumir 25-40% más a 35°C. La frecuencia de apertura de puerta añade 10-15% adicional.',
      },
      {
        heading: 'Factor de Carga y Temperatura del Agua en Lavadoras',
        text: 'Las etiquetas asumen carga al 90% a 60°C, pero los hogares promedian 60-70% de carga a 30-40°C. Lavados con agua fría reducen consumo 40-50%. Sobrecarga 20% aumenta energía 15%.',
      },
      {
        heading: 'Calificación SEER y Condiciones Reales en Aire Acondicionado',
        text: 'SEER mide eficiencia a 27°C exterior; a 35°C baja 15-20%. Unidades dimensionadas correctamente operan al 70-80% de capacidad. Sobredimensionadas reducen vida 30% y aumentan consumo 25%.',
      },
      {
        heading: 'Impacto del Consumo en Modo Standby',
        text: 'Electrodomésticos en standby consumen 1-5W continuamente, 8.7-43.8 kWh anuales por unidad. Hogares con 10+ aparatos desperdician 100-300 kWh/año, 5-15% del total. Tiras inteligentes eliminan 90%+ del desperdicio.',
      },
      {
        heading: 'Mantenimiento y Degradación de Eficiencia con el Tiempo',
        text: 'Bobinas de condensador sucias reducen eficiencia de refrigerador 25-30% después de 3 años. Filtros de aire obstruidos disminuyen flujo de aire AC 15-20%. Mantenimiento cada 6 meses preserva 95%+ de eficiencia por 10 años.',
      },
      {
        heading: 'Efectos de Fluctuación de Voltaje y Calidad de Energía',
        text: 'Caída de 10% de voltaje aumenta corriente del motor 10-15%, elevando consumo y calor. Picos de voltaje sobre 10% reducen vida de componentes 40-50%. Estabilizadores protegen y mantienen eficiencia.',
      },
      {
        heading: 'Conclusión Principal',
        text: 'Espere 15-30% más consumo real que las etiquetas; optimice con dimensionamiento correcto, ajustes de temperatura y mantenimiento regular.',
      },
    ],
    faqs: [
      { q: '¿Cuánto difieren las etiquetas del uso real?', a: 'Varianza típica 15-30%; condiciones reales aumentan consumo vs pruebas estandarizadas.' },
      { q: '¿Cómo afecta temperatura al refrigerador?', a: '2.5-4% más energía por °C sobre temperatura ambiente base 25°C.' },
      { q: '¿Ahorra energía lavar con agua fría?', a: 'Sí, 40-50% menos energía que ciclos de agua caliente 60°C.' },
      { q: '¿Qué reduce eficiencia AC a altas temps?', a: 'Caída 15-20% a 35°C exterior vs condición prueba SEER 27°C.' },
      { q: '¿Cuánto standby usan los aparatos?', a: '1-5W por aparato, total 100-300 kWh/año para 10+ dispositivos.' },
      { q: '¿Cada cuánto mantener electrodomésticos?', a: 'Cada 6 meses preserva 95%+ de eficiencia por vida útil de 10 años.' },
      { q: '¿Afecta fluctuación voltaje al consumo?', a: 'Caída 10% voltaje aumenta corriente motor y consumo 10-15%.' },
    ],
  },
  de: {
    title: 'Energieeffizienzklassen vs tatsächlicher Verbrauch: Technische Analyse',
    authorName: 'HousePlus Technikteam',
    datePublished: '2026-02-21',
    dateModified: '2026-02-21',
    heroImage: '/images/articles/appliances/home-appliance-kitchen-modern.jpg',
    heroImageAlt: 'Vergleichsdiagramm mit 15-30% Abweichung zwischen Nenn- und tatsächlichem Haushaltsgeräteverbrauch',
    sections: [
      {
        heading: 'Die 15-30% Lücke: Label vs Realverbrauch',
        text: 'Standardisierte Energielabels zeigen 15-30% weniger Verbrauch als typischer realer Einsatz. Testbedingungen nutzen optimale Umgebungstemperatur (25°C), Standardbeladung und idealen Wasserdruck. Reale Haushaltsbedingungen erhöhen Verbrauch deutlich.',
      },
      {
        heading: 'Umgebungstemperatur-Einfluss auf Kühlschrank-Effizienz',
        text: 'Kühlschrankstromverbrauch steigt 2.5-4% pro °C über 25°C Umgebungstemperatur. Bei 25°C getestete Geräte verbrauchen bei 35°C 25-40% mehr. Türöffnungshäufigkeit fügt weitere 10-15% hinzu.',
      },
      {
        heading: 'Beladungsfaktor und Wassertemperatur bei Waschmaschinen',
        text: 'Labels gehen von 90% Nennbeladung bei 60°C aus, Haushalte durchschnittlich 60-70% bei 30-40°C. Kaltwasserwäsche reduziert Verbrauch 40-50%. 20% Überladung erhöht Energie 15%.',
      },
      {
        heading: 'SEER-Bewertung und reale Bedingungen bei Klimaanlagen',
        text: 'SEER misst Effizienz bei 27°C Außentemperatur; bei 35°C sinkt sie 15-20%. Richtig dimensionierte Geräte arbeiten mit 70-80% Nennkapazität. Überdimensionierte reduzieren Lebensdauer 30% und erhöhen Verbrauch 25%.',
      },
      {
        heading: 'Standby-Stromverbrauch Auswirkung',
        text: 'Geräte im Standby verbrauchen kontinuierlich 1-5W, das sind 8.7-43.8 kWh jährlich pro Gerät. Haushalte mit 10+ Geräten verschwenden 100-300 kWh/Jahr, 5-15% des Gesamtverbrauchs. Intelligente Steckdosenleisten eliminieren 90%+ davon.',
      },
      {
        heading: 'Wartung und Effizienzminderung im Laufe der Zeit',
        text: 'Verschmutzte Kondensatorspulen reduzieren Kühlschrankeffizienz 25-30% nach 3 Jahren. Verstopfte Luftfilter verringern AC-Luftstrom 15-20%. Wartung alle 6 Monate erhält 95%+ Originaleffizienz über 10 Jahre.',
      },
      {
        heading: 'Spannungsschwankung und Netzqualitätseffekte',
        text: '10% Spannungsabfall erhöht Motorstrom 10-15%, steigert Verbrauch und Wärmeentwicklung. Spannungsspitzen über 10% reduzieren Bauteillebensdauer 40-50%. Spannungsstabilisatoren schützen und erhalten Effizienz.',
      },
      {
        heading: 'Kernschlussfolgerung',
        text: 'Erwarten Sie 15-30% höheren Realverbrauch als Labels; optimieren Sie durch korrekte Dimensionierung, Temperatureinstellungen und regelmäßige Wartung.',
      },
    ],
    faqs: [
      { q: 'Wie stark weichen Labels vom tatsächlichen Gebrauch ab?', a: 'Typische 15-30% Abweichung; reale Bedingungen erhöhen Verbrauch gegenüber Standardtests.' },
      { q: 'Wie beeinflusst Temperatur den Kühlschrank?', a: '2.5-4% mehr Energie pro °C über der 25°C Umgebungstemperatur-Basislinie.' },
      { q: 'Spart Kaltwasserwäsche Energie?', a: 'Ja, 40-50% weniger Energie als 60°C Heißwasserwaschzyklen.' },
      { q: 'Was reduziert AC-Effizienz bei hohen Temperaturen?', a: '15-20% Effizienzabfall bei 35°C außen vs 27°C SEER-Testbedingung.' },
      { q: 'Wie viel Standby-Strom verbrauchen Geräte?', a: '1-5W pro Gerät, insgesamt 100-300 kWh/Jahr für 10+ Geräte.' },
      { q: 'Wie oft sollten Geräte gewartet werden?', a: 'Alle 6 Monate erhält 95%+ Effizienz über 10-jährige Lebensdauer.' },
      { q: 'Beeinflusst Spannungsschwankung den Verbrauch?', a: '10% Spannungsabfall erhöht Motorstrom und Energieverbrauch um 10-15%.' },
    ],
  },
  fr: {
    title: 'Classes d\'efficacité énergétique vs consommation réelle: Analyse technique',
    authorName: 'Équipe Technique HousePlus',
    datePublished: '2026-02-21',
    dateModified: '2026-02-21',
    heroImage: '/images/articles/appliances/home-appliance-kitchen-modern.jpg',
    heroImageAlt: 'Graphique comparatif montrant écart 15-30% entre consommation nominale et réelle des appareils ménagers',
    sections: [
      {
        heading: 'L\'écart de 15-30%: étiquette vs consommation réelle',
        text: 'Les étiquettes énergétiques standardisées montrent 15-30% moins de consommation que l\'usage réel typique. Les conditions de test utilisent température ambiante optimale (25°C), charges standard et pression eau idéale. Conditions réelles augmentent consommation significativement.',
      },
      {
        heading: 'Impact température ambiante sur efficacité réfrigérateur',
        text: 'Consommation réfrigérateur augmente 2.5-4% par °C au-dessus 25°C ambiant. Appareils testés à 25°C consomment 25-40% plus à 35°C. Fréquence ouverture porte ajoute 10-15% supplémentaire.',
      },
      {
        heading: 'Facteur charge et température eau sur lave-linge',
        text: 'Étiquettes assument 90% charge nominale à 60°C, mais ménages moyenne 60-70% charge à 30-40°C. Lavage eau froide réduit consommation 40-50%. Surcharge 20% augmente énergie 15%.',
      },
      {
        heading: 'Note SEER et conditions réelles sur climatiseurs',
        text: 'SEER mesure efficacité à 27°C extérieur; à 35°C elle baisse 15-20%. Unités bien dimensionnées fonctionnent à 70-80% capacité nominale. Surdimensionnées réduisent vie 30% et augmentent consommation 25%.',
      },
      {
        heading: 'Impact consommation en mode veille',
        text: 'Appareils en veille consomment 1-5W en continu, soit 8.7-43.8 kWh annuels par unité. Ménages avec 10+ appareils gaspillent 100-300 kWh/an, 5-15% du total. Multiprises intelligentes éliminent 90%+ du gaspillage.',
      },
      {
        heading: 'Maintenance et dégradation efficacité dans le temps',
        text: 'Bobines condenseur sales réduisent efficacité réfrigérateur 25-30% après 3 ans. Filtres air obstrués diminuent débit air AC 15-20%. Maintenance tous les 6 mois préserve 95%+ efficacité initiale sur 10 ans.',
      },
      {
        heading: 'Fluctuation tension et effets qualité alimentation',
        text: 'Chute 10% tension augmente courant moteur 10-15%, élevant consommation et chaleur. Pics tension au-dessus 10% réduisent vie composants 40-50%. Stablilisateurs protègent et maintiennent efficacité.',
      },
      {
        heading: 'Conclusion Principale',
        text: 'Attendez-vous à 15-30% plus de consommation réelle que les étiquettes; optimisez par dimensionnement correct, réglages température et maintenance régulière.',
      },
    ],
    faqs: [
      { q: 'De combien les étiquettes diffèrent de l\'usage réel?', a: 'Écart typique 15-30%; conditions réelles augmentent consommation vs tests standardisés.' },
      { q: 'Comment température affecte le réfrigérateur?', a: '2.5-4% plus d\'énergie par °C au-dessus base 25°C température ambiante.' },
      { q: 'Lavage eau froide économise énergie?', a: 'Oui, 40-50% moins d\'énergie que cycles eau chaude 60°C.' },
      { q: 'Qu\'est-ce qui réduit efficacité AC à haute température?', a: 'Baisse 15-20% d\'efficacité à 35°C extérieur vs condition test SEER 27°C.' },
      { q: 'Combien de veille consomment les appareils?', a: '1-5W par appareil, total 100-300 kWh/an pour 10+ dispositifs.' },
      { q: 'À quelle fréquence entretenir les appareils?', a: 'Tous les 6 mois préserve 95%+ d\'efficacité sur 10 ans de vie.' },
      { q: 'Fluctuation tension affecte consommation?', a: 'Chute 10% tension augmente courant moteur et consommation 10-15%.' },
    ],
  },
  ar: {
    title: 'تصنيفات كفاءة الطاقة للأجهزة المنزلية مقابل الاستهلاك الفعلي: تحليل تقني',
    authorName: 'الفريق التقني HousePlus',
    datePublished: '2026-02-21',
    dateModified: '2026-02-21',
    heroImage: '/images/articles/appliances/home-appliance-kitchen-modern.jpg',
    heroImageAlt: 'مخطط مقارنة يُظهر تباين 15-30% بين الاستهلاك المُقَنن والفعلي للأجهزة المنزلية',
    sections: [
      {
        heading: 'الفجوة 15-30%: الملصق مقابل الاستهلاك الفعلي',
        text: 'تُظهر ملصقات الطاقة الموحدة استهلاكاً أقل بنسبة 15-30% من الاستخدام الفعلي النموذجي. تستخدم ظروف الاختبار درجة حرارة محيطة مثالية (25 درجة مئوية) وأحمال قياسية. الظروف المنزلية الفعلية تزيد الاستهلاك بشكل كبير.',
      },
      {
        heading: 'تأثير درجة الحرارة المحيطة على كفاءة الثلاجة',
        text: 'يزداد استهلاك طاقة الثلاجة بنسبة 2.5-4% لكل درجة مئوية فوق 25 درجة مئوية محيطة. قد تستهلك الوحدات التي تم اختبارها عند 25 درجة مئوية 25-40% أكثر عند 35 درجة مئوية. تضيف فتحة الباب 10-15% أخرى.',
      },
      {
        heading: 'عامل الحمل ودرجة حرارة المياه في الغسالات',
        text: 'تفترض الملصقات حملاً بنسبة 90% من السعة عند 60 درجة مئوية، لكن الأسر تبلغ في المتوسط 60-70% حمل عند 30-40 درجة مئوية. الغسيل بالماء البارد يقلل الاستهلاك بنسبة 40-50%. التحميل الزائد 20% يزيد الطاقة 15%.',
      },
      {
        heading: 'تصنيف SEER والظروف الفعلية في المكيفات',
        text: 'يقيس SEER الكفاءة عند 27 درجة مئوية خارجية؛ عند 35 درجة مئوية تنخفض 15-20%. تعمل الوحدات ذات الحجم الصحيح عند 70-80% من السعة الاسمية. الزائد في الحجم يقلل العمر بنسبة 30% ويزيد الاستهلاك 25%.',
      },
      {
        heading: 'تأثير استهلاك طاقة وضع الاستعداد',
        text: 'تستهلك الأجهزة في وضع الاستعداد 1-5 واط باستمرار، أي 8.7-43.8 كيلوواط ساعة سنوياً لكل جهاز. الأسر التي لديها 10+ أجهزة تهدر 100-300 كيلوواط ساعة/سنة، أي 5-15% من الإجمالي.',
      },
      {
        heading: 'الصيانة وتدهور الكفاءة بمرور الوقت',
        text: 'تقلل ملفات المكثف المتسخة من كفاءة الثلاجة بنسبة 25-30% بعد 3 سنوات. تقلل المرشحات الهوائية المسدودة من تدفق هواء المكيف بنسبة 15-20%. الصيانة كل 6 أشهر تحافظ على 95%+ من الكفاءة الأصلية لمدة 10 سنوات.',
      },
      {
        heading: 'تأثيرات تقلب الجهد وجودة الطاقة',
        text: 'انخفاض الجهد بنسبة 10% يزيد تيار المحرك بنسبة 10-15%، مما يرفع الاستهلاك وحرارة التوليد. تقلل ذروات الجهد فوق 10% من عمر المكونات بنسبة 40-50%. مثبتات الجهد تحمي وتحافظ على الكفاءة.',
      },
      {
        heading: 'الاستنتاج الأساسي',
        text: 'توقع استهلاكاً فعلياً أعلى بنسبة 15-30% من الملصقات؛ حسّن من خلال التحجيم الصحيح وإعدادات درجة الحرارة والصيانة المنتظمة.',
      },
    ],
    faqs: [
      { q: 'بكم تختلف الملصقات عن الاستخدام الفعلي؟', a: 'تباين نموذجي 15-30%؛ الظروف الفعلية تزيد الاستهلاك مقابل الاختبارات الموحدة.' },
      { q: 'كيف تؤثر درجة الحرارة على الثلاجة؟', a: '2.5-4% طاقة أكثر لكل درجة مئوية فوق خط الأساس 25 درجة مئوية محيطة.' },
      { q: 'هل غسيل الماء الباخر يوفر الطاقة؟', a: 'نعم، 40-50% طاقة أقل من دورات غسيل الماء الساخن 60 درجة مئوية.' },
      { q: 'ماذا يقلل كفاءة المكيف في درجات حرارة عالية؟', a: 'انخفاض كفاءة 15-20% عند 35 درجة مئوية خارجية مقابل حالة اختبار SEER 27 درجة مئوية.' },
      { q: 'كم يستهلك وضع الاستعداد للأجهزة؟', a: '1-5 واط لكل جهاز، بإجمالي 100-300 كيلوواط ساعة/سنة لـ 10+ أجهزة.' },
      { q: 'كم مرة يجب صيانة الأجهزة؟', a: 'كل 6 أشهر يحافظ على 95%+ من الكفاءة على مدار عمر افتراضي 10 سنوات.' },
      { q: 'هل تقلبات الجهد تؤثر على الاستهلاك؟', a: 'انخفاض الجهد 10% يزيد تيار المحرك واستهلاك الطاقة بنسبة 10-15%.' },
    ],
  },
};

export default async function BlogPostPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const content = articleContent[lang] || articleContent.en;

  const breadcrumbs = [
    { name: lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : lang === 'de' ? 'Startseite' : lang === 'fr' ? 'Accueil' : 'الرئيسية', url: `/${lang}` },
    { name: lang === 'en' ? 'News' : lang === 'es' ? 'Noticias' : lang === 'de' ? 'Neuigkeiten' : lang === 'fr' ? 'Actualités' : 'الأخبار', url: `/${lang}/news` },
    { name: content.title, url: `/${lang}/news/appliance-energy-efficiency-vs-actual-consumption` },
  ];

  const articleSchema = buildArticleSchema({
    headline: content.title,
    image: content.heroImage,
    datePublished: content.datePublished,
    dateModified: content.dateModified,
    authorName: content.authorName,
    description: content.sections[0].text,
  }, {
    url: `https://www.houseplus-ch.com/${lang}/news/appliance-energy-efficiency-vs-actual-consumption`,
    lang,
  });

  const imageObjectSchema = generateImageObjectSchema({
    url: content.heroImage,
    caption: content.heroImageAlt,
    description: 'Comparison of home appliance energy efficiency ratings vs actual consumption showing 15-30% variance',
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
        <div className="bg-gradient-to-br from-emerald-600 to-slate-900 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            {lang === 'en' ? 'Source Energy-Efficient Appliances for Your Market' :
             lang === 'es' ? 'Fuente de Electrodomésticos Eficientes para su Mercado' :
             lang === 'de' ? 'Energieeffiziente Geräte für Ihren Markt' :
             lang === 'fr' ? 'Appareils économes en énergie pour votre marché' :
             'أجهزة موفرة للطاقة لسوقك'}
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            {lang === 'en' ? 'Wholesale home appliances with verified efficiency ratings. 15-30% real-world savings, CE/FCC/RoHS certified, OEM/ODM available. MOQ from 100 units.' :
             lang === 'es' ? 'Electrodomésticos al por mayor con calificaciones de eficiencia verificadas. 15-30% de ahorro real, certificados CE/FCC/RoHS, OEM/ODM disponible. MOQ desde 100 unidades.' :
             lang === 'de' ? 'Großhandelshaushaltsgeräte mit verifizierten Effizienzklassen. 15-30% reale Einsparungen, CE/FCC/RoHS zertifiziert, OEM/ODM möglich. MOQ ab 100 Stück.' :
             lang === 'fr' ? 'Électroménagers en gros avec des notes d\'efficacité vérifiées. 15-30% d\'économies réelles, certifiés CE/FCC/RoHS, OEM/ODM disponible. MOQ à partir de 100 unités.' :
             'أجهزة منزلية بالجملة بتصنيفات كفاءة موثقة. توفير حقيقي 15-30%، معتمدة CE/FCC/RoHS، OEM/ODM متاح. الحد الأدنى للطلب من 100 وحدة.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/products`} className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 font-bold rounded-full hover:bg-emerald-50 transition-colors">
              {lang === 'en' ? 'View Appliance Catalog' :
               lang === 'es' ? 'Ver Catálogo de Electrodomésticos' :
               lang === 'de' ? 'Gerätekatalog ansehen' :
               lang === 'fr' ? 'Voir le catalogue d\'appareils' :
               'عرض كتالوج الأجهزة'}
            </Link>
            <Link href={`/${lang}/contact`} className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              {lang === 'en' ? 'Get Wholesale Pricing' :
               lang === 'es' ? 'Obtener Precios de Mayorista' :
               lang === 'de' ? 'Großhandelspreise erhalten' :
               lang === 'fr' ? 'Obtenir les prix de gros' :
               'الحصول على أسعار الجملة'}
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
