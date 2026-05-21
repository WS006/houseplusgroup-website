#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Article templates data
const ARTICLE_TEMPLATES = [
  {
    category: 'solar',
    titleBase: {
      en: 'Solar Energy Innovations in {year}: HousePlus Leading the Industry',
      es: 'Innovaciones en Energía Solar en {year}: HousePlus Liderando la Industria',
      de: 'Innovationen in der Solarenergie im {year}: HousePlus an der Spitze der Branche',
      fr: 'Innovations en énergie solaire en {year}: HousePlus à la pointe de l\'industrie',
      ar: 'ابتكارات الطاقة الشمسية في {year}: HousePlus تقود الصناعة'
    },
    descriptionBase: {
      en: 'Discover the latest solar energy innovations from HousePlus in {year}, including high-efficiency panels, advanced battery storage, and integrated smart solutions for B2B clients worldwide.',
      es: 'Descubre las últimas innovaciones en energía solar de HousePlus en {year}, incluyendo paneles de alta eficiencia, almacenamiento de baterías avanzado y soluciones inteligentes integradas para clientes B2B en todo el mundo.',
      de: 'Entdecke die neuesten Innovationen in der Solarenergie von HousePlus im {year}, darunter hocheffiziente Module, fortschrittliche Batteriespeicher und integrierte intelligente Lösungen für B2B-Kunden weltweit.',
      fr: 'Découvrez les dernières innovations en énergie solaire de HousePlus en {year}, incluant des panneaux à haut rendement, un stockage par batterie avancé et des solutions intelligentes intégrées pour les clients B2B du monde entier.',
      ar: 'اكتشف أحدث ابتكارات الطاقة الشمسية من HousePlus في {year}، بما في ذلك الألواح عالية الكفاءة، وتخزين البطاريات المتقدم، والحلول الذكية المتكاملة لعملاء B2B في جميع أنحاء العالم.'
    },
    image: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&h=600&fit=crop',
    imageAlt: 'HousePlus solar panels and energy storage solutions',
    keywords: ['solar energy', 'solar panels', 'battery storage', 'renewable energy', 'B2B procurement', 'HousePlus']
  },
  {
    category: 'appliances',
    titleBase: {
      en: 'Smart Home Appliances {year}: Energy-Efficient Designs for Global Markets',
      es: 'Electrodomésticos Inteligentes {year}: Diseños Eficientes Energéticamente para Mercados Globales',
      de: 'Smart-Home-Geräte {year}: Energieeffiziente Designs für globale Märkte',
      fr: 'Appareils électroménagers intelligents {year}: Des designs énergétiques pour les marchés mondiaux',
      ar: 'الأجهزة المنزلية الذكية {year}: تصميمات موفرة للطاقة للأسواق العالمية'
    },
    descriptionBase: {
      en: 'Explore HousePlus\'s {year} line of smart home appliances featuring AI-driven controls, energy monitoring, and seamless integration for wholesale buyers across Africa, Asia, and Europe.',
      es: 'Explora la línea {year} de electrodomésticos inteligentes de HousePlus con controles impulsados por IA, monitoreo de energía e integración perfecta para compradores mayoristas en África, Asia y Europa.',
      de: 'Entdecke die {year}-Linie von smarten Haushaltsgeräten von HousePlus mit KI-gesteuerten Steuerungen, Energieüberwachung und nahtloser Integration für Großhandelskäufer in Afrika, Asien und Europa.',
      fr: 'Explorez la gamme {year} d\'appareils électroménagers intelligents de HousePlus, avec des commandes pilotées par IA, un suivi de l\'énergie et une intégration transparente pour les acheteurs en gros en Afrique, en Asie et en Europe.',
      ar: 'استكشف سلسلة {year} من الأجهزة المنزلية الذكية من HousePlus التي تتميز بتحكم مدفوع بالذكاء الاصطناعي، ومراقبة الطاقة، والتكامل السلس لمشتري الجملة في أفريقيا وآسيا وأوروبا.'
    },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    imageAlt: 'HousePlus smart home appliances lineup',
    keywords: ['smart home', 'home appliances', 'energy efficiency', 'AI integration', 'wholesale', 'HousePlus']
  },
  {
    category: 'electronics',
    titleBase: {
      en: '3C Electronics Trends {year}: HousePlus Wholesale Innovation',
      es: 'Tendencias en Electrónica 3C {year}: Innovación al por Mayor de HousePlus',
      de: '3C-Elektronik-Trends {year}: HousePlus-Großhandelsinnovation',
      fr: 'Tendances de l\'électronique 3C {year}: Innovation en gros de HousePlus',
      ar: 'اتجاهات الإلكترونيات 3C {year}: ابتكار الجملة من HousePlus'
    },
    descriptionBase: {
      en: 'Stay ahead in {year} with HousePlus\'s latest 3C electronics - premium audio devices, smart wearables, and innovative power solutions for B2B distributors.',
      es: 'Mantente a la vanguardia en {year} con los últimos productos de electrónica 3C de HousePlus: dispositivos de audio premium, wearables inteligentes y soluciones de energía innovadoras para distribuidores B2B.',
      de: 'Bleib im {year} voraus mit den neuesten 3C-Elektronikprodukten von HousePlus – Premium-Audiogeräte, intelligente Wearables und innovative Stromlösungen für B2B-Distributoren.',
      fr: 'Restez en tête en {year} avec les derniers produits d\'électronique 3C de HousePlus - des appareils audio premium, des wearables intelligents et des solutions d\'énergie innovantes pour les distributeurs B2B.',
      ar: 'ابق في المقدمة في {year} مع أحدث إلكترونيات 3C من HousePlus - أجهزة صوتية عالية الجودة، وأجهزة قابلة للارتداء الذكية، وحلول طاقة مبتكرة لموزعي B2B.'
    },
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop',
    imageAlt: 'HousePlus 3C electronics product showcase',
    keywords: ['3C electronics', 'consumer electronics', 'wholesale', 'B2B', 'wearables', 'HousePlus']
  }
];

function getRandomTemplate() {
  return ARTICLE_TEMPLATES[Math.floor(Math.random() * ARTICLE_TEMPLATES.length)];
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateArticleData(template, month, year) {
  const day = Math.floor(Math.random() * 28) + 1;
  const dateStr = formatDate(new Date(year, month - 1, day));
  const slug = `${year}-${template.category}-market-update`;
  
  return {
    slug,
    date: dateStr,
    template,
    year,
    languages: {
      en: {
        title: template.titleBase.en.replace('{year}', year),
        description: template.descriptionBase.en.replace('{year}', year),
        heroImage: template.image,
        heroImageAlt: template.imageAlt,
        datePublished: dateStr,
        dateModified: dateStr,
        authorName: 'HousePlus Editorial'
      },
      es: {
        title: template.titleBase.es.replace('{year}', year),
        description: template.descriptionBase.es.replace('{year}', year),
        heroImage: template.image,
        heroImageAlt: template.imageAlt,
        datePublished: dateStr,
        dateModified: dateStr,
        authorName: 'HousePlus Editorial'
      },
      de: {
        title: template.titleBase.de.replace('{year}', year),
        description: template.descriptionBase.de.replace('{year}', year),
        heroImage: template.image,
        heroImageAlt: template.imageAlt,
        datePublished: dateStr,
        dateModified: dateStr,
        authorName: 'HousePlus Editorial'
      },
      fr: {
        title: template.titleBase.fr.replace('{year}', year),
        description: template.descriptionBase.fr.replace('{year}', year),
        heroImage: template.image,
        heroImageAlt: template.imageAlt,
        datePublished: dateStr,
        dateModified: dateStr,
        authorName: 'HousePlus Editorial'
      },
      ar: {
        title: template.titleBase.ar.replace('{year}', year),
        description: template.descriptionBase.ar.replace('{year}', year),
        heroImage: template.image,
        heroImageAlt: template.imageAlt,
        datePublished: dateStr,
        dateModified: dateStr,
        authorName: 'HousePlus Editorial'
      }
    },
    keywords: template.keywords
  };
}

function copyTemplateArticle(articleData) {
  const templatePath = path.join(__dirname, '..', 'app', '[lang]', 'news', '2026-smart-home-appliances-market-guide', 'page.tsx');
  const targetDir = path.join(__dirname, '..', 'app', '[lang]', 'news', articleData.slug);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  let content = fs.readFileSync(templatePath, 'utf8');
  
  // Replace article metadata
  content = content.replace(
    /url: `\/\${lang}\/news\/[^`]+`,/g,
    `url: \`/\${lang}/news/${articleData.slug}\`,`
  );
  
  content = content.replace(
    /2026-smart-home-appliances-market-guide/g,
    articleData.slug
  );
  
  // Replace titles
  Object.keys(articleData.languages).forEach(lang => {
    const titleRegex = new RegExp(`    ${lang}: '[^']*',`, 'g');
    const descRegex = new RegExp(`    ${lang}: '[^']*',`, 'g');
    
    content = content.replace(titleRegex, `    ${lang}: '${articleData.languages[lang].title}',`);
    content = content.replace(descRegex, `    ${lang}: '${articleData.languages[lang].description}',`);
  });
  
  // Replace keywords
  const kwStr = articleData.keywords.map(k => `"${k}"`).join(', ');
  content = content.replace(/keywords: \[[^\]]*\],/, `keywords: [${kwStr}],`);
  
  // Replace articleContent
  content = content.replace(
    /const articleContent: Record<string, any> = \{[\s\S]*?\};/,
    generateArticleContentJS(articleData)
  );
  
  fs.writeFileSync(path.join(targetDir, 'page.tsx'), content, 'utf8');
}

function generateArticleContentJS(articleData) {
  return `const articleContent: Record<string, any> = {
  en: {
    title: '${articleData.languages.en.title}',
    authorName: '${articleData.languages.en.authorName}',
    datePublished: '${articleData.languages.en.datePublished}',
    dateModified: '${articleData.languages.en.dateModified}',
    heroImage: '${articleData.languages.en.heroImage}',
    heroImageAlt: '${articleData.languages.en.heroImageAlt}',
    sections: [
      {
        heading: 'Introduction: Industry Trends in ${articleData.year}',
        text: 'The market continues to evolve in ${articleData.year}, with HousePlus at the forefront of innovation. This article explores our latest developments and what they mean for B2B buyers worldwide.'
      },
      {
        heading: 'Product Innovation and Quality',
        text: 'HousePlus maintains rigorous quality standards and innovative design approaches. All products meet international certifications including CE, FCC, RoHS, and ISO 9001.'
      },
      {
        heading: 'Global Market Strategy',
        text: 'HousePlus serves clients across Africa, Asia, Europe, and the Americas. Our OEM and ODM services provide flexible solutions for distributors and brand owners.'
      },
      {
        heading: 'Sustainability Commitment',
        text: 'We are committed to sustainable manufacturing practices, energy-efficient products, and reducing environmental impact throughout the supply chain.'
      },
      {
        heading: 'Why Partner with HousePlus',
        text: 'With competitive pricing, reliable quality, comprehensive after-sales support, and flexible MOQ options, HousePlus is your trusted partner for ${articleData.category} products.'
      }
    ]
  },
  es: {
    title: '${articleData.languages.es.title}',
    authorName: '${articleData.languages.es.authorName}',
    datePublished: '${articleData.languages.es.datePublished}',
    dateModified: '${articleData.languages.es.dateModified}',
    heroImage: '${articleData.languages.es.heroImage}',
    heroImageAlt: '${articleData.languages.es.heroImageAlt}',
    sections: [
      {
        heading: 'Introducción: Tendencias de la Industria en ${articleData.year}',
        text: 'El mercado continúa evolucionando en ${articleData.year}, con HousePlus a la vanguardia de la innovación. Este artículo explora nuestros últimos desarrollos y lo que significan para los compradores B2B en todo el mundo.'
      },
      {
        heading: 'Innovación de Productos y Calidad',
        text: 'HousePlus mantiene rigurosos estándares de calidad y enfoques de diseño innovadores. Todos los productos cumplen con certificaciones internacionales incluyendo CE, FCC, RoHS e ISO 9001.'
      },
      {
        heading: 'Estrategia de Mercado Global',
        text: 'HousePlus sirve a clientes en África, Asia, Europa y las Américas. Nuestros servicios OEM y ODM proporcionan soluciones flexibles para distribuidores y propietarios de marcas.'
      },
      {
        heading: 'Compromiso con la Sostenibilidad',
        text: 'Estamos comprometidos con prácticas de fabricación sostenible, productos eficientes energéticamente y la reducción del impacto ambiental en toda la cadena de suministro.'
      },
      {
        heading: 'Por Qué Asociarse con HousePlus',
        text: 'Con precios competitivos, calidad confiable, soporte post-venta completo y opciones flexibles de MOQ, HousePlus es su socio de confianza para productos de ${articleData.category}.'
      }
    ]
  },
  de: {
    title: '${articleData.languages.de.title}',
    authorName: '${articleData.languages.de.authorName}',
    datePublished: '${articleData.languages.de.datePublished}',
    dateModified: '${articleData.languages.de.dateModified}',
    heroImage: '${articleData.languages.de.heroImage}',
    heroImageAlt: '${articleData.languages.de.heroImageAlt}',
    sections: [
      {
        heading: 'Einführung: Branchentrends im ${articleData.year}',
        text: 'Der Markt entwickelt sich im ${articleData.year} weiter, wobei HousePlus an der Spitze der Innovation steht. Dieser Artikel untersucht unsere neuesten Entwicklungen und was sie für B2B-Käufer weltweit bedeuten.'
      },
      {
        heading: 'Produktinnovation und Qualität',
        text: 'HousePlus hält strenge Qualitätsstandards und innovative Designansätze ein. Alle Produkte erfüllen internationale Zertifizierungen wie CE, FCC, RoHS und ISO 9001.'
      },
      {
        heading: 'Globale Marktstrategie',
        text: 'HousePlus bedient Kunden in Afrika, Asien, Europa und Amerika. Unsere OEM- und ODM-Dienste bieten flexible Lösungen für Distributoren und Markeninhaber.'
      },
      {
        heading: 'Nachhaltigkeitsverpflichtung',
        text: 'Wir sind nachhaltigen Herstellungsverfahren, energieeffizienten Produkten und der Reduktion der Umweltauswirkungen in der gesamten Lieferkette verpflichtet.'
      },
      {
        heading: 'Warum mit HousePlus zusammenarbeiten',
        text: 'Mit wettbewerbsfähigen Preisen, zuverlässiger Qualität, umfassendem Kundendienst und flexiblen MOQ-Optionen ist HousePlus Ihr vertrauenswürdiger Partner für ${articleData.category}-Produkte.'
      }
    ]
  },
  fr: {
    title: '${articleData.languages.fr.title}',
    authorName: '${articleData.languages.fr.authorName}',
    datePublished: '${articleData.languages.fr.datePublished}',
    dateModified: '${articleData.languages.fr.dateModified}',
    heroImage: '${articleData.languages.fr.heroImage}',
    heroImageAlt: '${articleData.languages.fr.heroImageAlt}',
    sections: [
      {
        heading: 'Introduction: Tendances de l\\'industrie en ${articleData.year}',
        text: 'Le marché continue d\\'évoluer en ${articleData.year}, avec HousePlus à l\\'avant-garde de l\\'innovation. Cet article explore nos derniers développements et ce qu\\'ils signifient pour les acheteurs B2B du monde entier.'
      },
      {
        heading: 'Innovation produit et qualité',
        text: 'HousePlus maintient des normes de qualité rigoureuses et des approches de conception innovantes. Tous les produits répondent aux certifications internationales, notamment CE, FCC, RoHS et ISO 9001.'
      },
      {
        heading: 'Stratégie de marché mondial',
        text: 'HousePlus dessert des clients en Afrique, Asie, Europe et Amériques. Nos services OEM et ODM fournissent des solutions flexibles pour les distributeurs et les propriétaires de marques.'
      },
      {
        heading: 'Engagement pour la durabilité',
        text: 'Nous nous engageons pour des pratiques de fabrication durables, des produits énergétiques et la réduction de l\\'impact environnemental tout au long de la chaîne d\\'approvisionnement.'
      },
      {
        heading: 'Pourquoi s\\'associer à HousePlus',
        text: 'Avec des prix compétitifs, une qualité fiable, un support après-vente complet et des options MOQ flexibles, HousePlus est votre partenaire de confiance pour les produits ${articleData.category}.'
      }
    ]
  },
  ar: {
    title: '${articleData.languages.ar.title}',
    authorName: '${articleData.languages.ar.authorName}',
    datePublished: '${articleData.languages.ar.datePublished}',
    dateModified: '${articleData.languages.ar.dateModified}',
    heroImage: '${articleData.languages.ar.heroImage}',
    heroImageAlt: '${articleData.languages.ar.heroImageAlt}',
    sections: [
      {
        heading: 'مقدمة: اتجاهات الصناعة في ${articleData.year}',
        text: 'يستمر السوق في التطور في ${articleData.year}، مع HousePlus في طليعة الابتكار. يستكشف هذا المقال أحدث تطوراتنا وما تعنيه لمشتري B2B في جميع أنحاء العالم.'
      },
      {
        heading: 'الابتكار في المنتجات والجودة',
        text: 'تحافظ HousePlus على معايير جودة صارمة ونهج تصميم مبتكرة. جميع المنتجات تتوافق مع الشهادات الدولية بما في ذلك CE و FCC و RoHS و ISO 9001.'
      },
      {
        heading: 'استراتيجية السوق العالمية',
        text: 'تخدم HousePlus العملاء في أفريقيا وآسيا وأوروبا والأمريكتين. توفر خدماتنا OEM و ODM حلولاً مرنة للموزعين وأصحاب العلامات التجارية.'
      },
      {
        heading: 'الالتزام بالاستدامة',
        text: 'نحن ملتزمون بممارسات التصنيع المستدامة والمنتجات موفرة للطاقة وتقليل التأثير البيئي في جميع أنحاء سلسلة التوريد.'
      },
      {
        heading: 'لماذا تشارك مع HousePlus',
        text: 'مع أسعار تنافسية وجودة موثوقة ودعم شامل بعد البيع وخيارات MOQ مرنة، HousePlus هو شريكك الموثوق لمنتجات ${articleData.category}.'
      }
    ]
  }
};`;
}

function updateNewsList(articles) {
  const newsPagePath = path.join(__dirname, '..', 'app', '[lang]', 'news', 'page.tsx');
  let newsPageContent = fs.readFileSync(newsPagePath, 'utf8');
  
  const articlesMatch = newsPageContent.match(/const articles = \[([\s\S]*?)\];/);
  if (articlesMatch) {
    const existingArticlesStr = articlesMatch[1];
    const newEntries = articles.map(article => {
      const langTitleEntries = Object.keys(article.languages).map(lang => 
        `    ${lang}: '${article.languages[lang].title}',`
      ).join('\n');
      
      const langDescEntries = Object.keys(article.languages).map(lang => 
        `    ${lang}: '${article.languages[lang].description}',`
      ).join('\n');
      
      return `  {
    slug: '${article.slug}',
    image: '${article.template.image}',
    imageAlt: '${article.template.imageAlt}',
    title: {
${langTitleEntries}
    },
    description: {
${langDescEntries}
    },
    date: '${article.date}',
  }`;
    }).join(',\n');
    
    const updatedArticlesStr = newEntries + ',\n' + existingArticlesStr;
    newsPageContent = newsPageContent.replace(existingArticlesStr, updatedArticlesStr);
    
    fs.writeFileSync(newsPagePath, newsPageContent, 'utf8');
    console.log('✅ Updated news list page');
  }
}

async function main() {
  const now = new Date();
  const year = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  console.log('📰 Generating news articles...');
  
  // Create 2-3 articles
  const numArticles = 2 + Math.floor(Math.random() * 2);
  
  const articles = [];
  const usedCategories = new Set();
  const usedMonths = new Set();
  
  for (let i = 0; i < numArticles; i++) {
    let template;
    do {
      template = getRandomTemplate();
    } while (usedCategories.has(template.category) && usedCategories.size < ARTICLE_TEMPLATES.length);
    
    usedCategories.add(template.category);
    
    let articleMonth;
    do {
      articleMonth = Math.max(1, Math.min(12, currentMonth - Math.floor(Math.random() * 3)));
    } while (usedMonths.has(articleMonth) && usedMonths.size < 3);
    
    usedMonths.add(articleMonth);
    const articleYear = year;
    
    const articleData = generateArticleData(template, articleMonth, articleYear);
    articles.push(articleData);
    
    // Copy and modify template article
    copyTemplateArticle(articleData);
    
    console.log(`✅ Created article: ${articleData.slug}`);
  }
  
  // Update news list
  updateNewsList(articles);
  
  console.log('\n✨ Done! Generated', numArticles, 'new articles.');
  console.log('\n📋 Next steps:');
  console.log('1. Review the generated files');
  console.log('2. Commit and push to deploy');
}

main().catch(console.error);
