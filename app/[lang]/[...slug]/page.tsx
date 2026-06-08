import { Metadata } from 'next';
import { getStoryblokApi, renderRichText } from '@storyblok/react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string[] }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const fullSlug = slug?.join('/') || '';
  const titleParts = fullSlug.split('/').filter(p => p);
  
  let title = '';
  let description = '';
  
  // 为不同类型页面生成独特的 meta 数据
  const pageType = titleParts[0] || '';
  
  // 定义页面类型的专属描述模板
  const pageDescriptions: Record<string, (parts: string[], lang: string) => string> = {
    'products': (parts, lang) => {
      const productName = parts[1] ? parts[1].replace(/-/g, ' ') : 'Product';
      const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
      const descriptions: Record<string, string> = {
        en: `HousePlus ${capitalize(productName)} - Premium quality ${capitalize(productName)} for wholesale buyers. OEM/ODM available with CE, FCC, RoHS certifications.`,
        es: `HousePlus ${capitalize(productName)} - ${capitalize(productName)} de calidad premium para compradores mayoristas. OEM/ODM disponible con certificaciones CE, FCC, RoHS.`,
        de: `HousePlus ${capitalize(productName)} - Premium-Qualität ${capitalize(productName)} für Großhandelskäufer. OEM/ODM verfügbar mit CE-, FCC-, RoHS-Zertifizierungen.`,
        fr: `HousePlus ${capitalize(productName)} - ${capitalize(productName)} de qualité premium pour acheteurs en gros. OEM/ODM disponible avec certifications CE, FCC, RoHS.`,
        ar: `HousePlus ${capitalize(productName)} - ${capitalize(productName)} ذات جودة عالية لمشتري الجملة. OEM/ODM متوفر مع شهادات CE و FCC و RoHS.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'news': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `HousePlus News - Latest industry insights and updates on solar energy, home appliances, and 3C electronics. Stay informed with expert analysis and market trends.`,
        es: `Noticias de HousePlus - Últimas perspectivas de la industria y actualizaciones sobre energía solar, electrodomésticos y electrónica 3C. Manténgase informado con análisis expertos y tendencias del mercado.`,
        de: `HousePlus Nachrichten - Neueste Brancheneinblicke und Updates zu Solarenergie, Haushaltsgeräten und 3C-Elektronik. Bleiben Sie informiert mit Expertenanalysen und Markttrends.`,
        fr: `Actualités HousePlus - Dernières informations de l'industrie et mises à jour sur l'énergie solaire, les appareils électroménagers et l'électronique 3C. Restez informé avec des analyses d'experts et des tendances du marché.`,
        ar: `أخبار HousePlus - أحدث رؤى الصناعة وتحديثات حول الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. ابق على اطلاع دائم مع تحليلات الخبراء واتجاهات السوق.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'about-us': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `About HousePlus - Leading wholesale manufacturer of solar systems, home appliances, and 3C electronics. 14+ years of experience serving global B2B buyers across Africa, Asia, and Europe.`,
        es: `Sobre HousePlus - Fabricante líder al por mayor de sistemas solares, electrodomésticos y electrónica 3C. Más de 14 años de experiencia sirviendo a compradores B2B globales en África, Asia y Europa.`,
        de: `Über HousePlus - Führen Sie Großhandelshersteller von Solaranlagen, Haushaltsgeräten und 3C-Elektronik. Über 14 Jahre Erfahrung in der Betreuung globaler B2B-Käufer in Afrika, Asien und Europa.`,
        fr: `À propos de HousePlus - Principal fabricant en gros de systèmes solaires, d'appareils électroménagers et d'électronique 3C. Plus de 14 ans d'expérience au service d'acheteurs B2B mondiaux en Afrique, en Asie et en Europe.`,
        ar: `مع HousePlus - مصنع الجملة الرائد لأحكام الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. أكثر من 14 عامًا من الخبرة في خدمة مشتري B2B العالميين في أفريقيا وآسيا وأوروبا.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'contact': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `Contact HousePlus - Get in touch with our sales team for wholesale inquiries, OEM/ODM requests, and product quotations. Fast response within 24 hours.`,
        es: `Contactar a HousePlus - Póngase en contacto con nuestro equipo de ventas para consultas mayoristas, solicitudes OEM/ODM y cotizaciones de productos. Respuesta rápida dentro de las 24 horas.`,
        de: `Kontakt HousePlus - Kontaktieren Sie unser Vertriebsteam für Großhandelsanfragen, OEM/ODM-Anfragen und Produktangebote. Schnelle Antwort innerhalb von 24 Stunden.`,
        fr: `Contacter HousePlus - Prenez contact avec notre équipe commerciale pour des demandes de gros, des demandes OEM/ODM et des devis de produits. Réponse rapide dans les 24 heures.`,
        ar: `الاتصال بـ HousePlus - اتصل بفريق المبيعات لدينا لاستفسارات الجملة، وطلبات OEM/ODM، واقتباسات المنتجات. استجابة سريعة ضمن 24 ساعة.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'factory': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `HousePlus Factory - State-of-the-art manufacturing facility with ISO 9001 certification. Advanced production lines for solar panels, home appliances, and electronics.`,
        es: `Fábrica HousePlus - Instalación de fabricación de última generación con certificación ISO 9001. Líneas de producción avanzadas para paneles solares, electrodomésticos y electrónica.`,
        de: `HousePlus Fabrik - Modernste Produktionsstätte mit ISO 9001-Zertifizierung. Fortgeschrittene Produktionslinien für Solarmodule, Haushaltsgeräte und Elektronik.`,
        fr: `Usine HousePlus - Installation de fabrication de pointe avec certification ISO 9001. Lignes de production avancées pour panneaux solaires, appareils électroménagers et électronique.`,
        ar: `مصنع HousePlus - منشأة تصنيع متطورة مع شهادة ISO 9001. خطوط إنتاج متقدمة لألواح الطاقة الشمسية والأجهزة المنزلية والإلكترونيات.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'service': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `HousePlus Services - Comprehensive OEM/ODM manufacturing services. Custom product development, private labeling, and quality control for global B2B partners.`,
        es: `Servicios de HousePlus - Servicios completos de fabricación OEM/ODM. Desarrollo de productos personalizados, etiquetado privado y control de calidad para socios B2B globales.`,
        de: `HousePlus-Dienstleistungen - Umfassende OEM/ODM-Fertigungsdienstleistungen. Individuelle Produktentwicklung, Private Label und Qualitätskontrolle für globale B2B-Partner.`,
        fr: `Services HousePlus - Services complets de fabrication OEM et ODM. Développement de produits personnalisés, étiquetage privé et contrôle de qualité pour les partenaires B2B mondiaux.`,
        ar: `خدمات HousePlus - خدمات تصنيع OEM/ODM شاملة. تطوير منتجات مخصصة، وسمعة خاصة، ومراقبة الجودة لشركائنا B2B العالميين.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'faq': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `HousePlus FAQ - Frequently asked questions about wholesale purchasing, OEM/ODM services, shipping, certifications, and MOQ requirements.`,
        es: `FAQ de HousePlus - Preguntas frecuentes sobre compras mayoristas, servicios OEM/ODM, envíos, certificaciones y requisitos de MOQ.`,
        de: `HousePlus FAQ - Häufig gestellte Fragen zu Großhandelskäufen, OEM/ODM-Dienstleistungen, Versand, Zertifizierungen und MOQ-Anforderungen.`,
        fr: `FAQ HousePlus - Questions fréquentes sur les achats en gros, les services OEM/ODM, l'expédition, les certifications et les exigences MOQ.`,
        ar: `FAQ HousePlus - أسئلة شائعة حول شراء الجملة، وخدمات OEM/ODM، والشحن، والشهادات، ومتطلبات MOQ.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'team': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `Meet the HousePlus Team - Our experienced professionals dedicated to delivering quality products and exceptional service to global wholesale buyers.`,
        es: `Conoce al equipo de HousePlus - Nuestros profesionales experimentados dedicados a entregar productos de calidad y servicio excepcional a compradores mayoristas globales.`,
        de: `Lernen Sie das HousePlus-Team kennen - Unsere erfahrenen Fachkräfte, die sich der Lieferung qualitativ hochwertiger Produkte und exzellenten Service für globale Großhandelskäufer widmen.`,
        fr: `Rencontrez l'équipe HousePlus - Nos professionnels expérimentés dédiés à fournir des produits de qualité et un service exceptionnel aux acheteurs en gros mondiaux.`,
        ar: `التعرف على فريق HousePlus - محترفونا ذوو الخبرة المكرسون لتقديم منتجات ذات جودة وخدمة استثنائية لمشتري الجملة العالميين.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'careers': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `Careers at HousePlus - Join our dynamic team and grow your career in the solar, appliances, and electronics manufacturing industry.`,
        es: `Carreras en HousePlus - Únase a nuestro equipo dinámico y desarrolle su carrera en la industria de fabricación de energía solar, electrodomésticos y electrónica.`,
        de: `Karriere bei HousePlus - Treten Sie unserem dynamischen Team bei und entwickeln Sie Ihre Karriere in der Solar-, Haushaltsgeräte- und Elektronikfertigungsindustrie.`,
        fr: `Carrières chez HousePlus - Rejoignez notre équipe dynamique et développez votre carrière dans l'industrie de la fabrication solaire, des appareils électroménagers et de l'électronique.`,
        ar: `وظائف في HousePlus - انضم إلى فريقنا الديناميكي وطور مهنتك في صناعة تصنيع الطاقة الشمسية والأجهزة المنزلية والإلكترونيات.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'support': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `HousePlus Support - Technical support, product documentation, warranty information, and troubleshooting for our B2B customers.`,
        es: `Soporte de HousePlus - Soporte técnico, documentación de productos, información de garantía y solución de problemas para nuestros clientes B2B.`,
        de: `HousePlus-Support - Technischer Support, Produktdokumentation, Garantieinformationen und Fehlerbehebung für unsere B2B-Kunden.`,
        fr: `Support HousePlus - Support technique, documentation produit, informations de garantie et dépannage pour nos clients B2B.`,
        ar: `دعم HousePlus - دعم فني، وثائق المنتجات، معلومات الضمان، وإصلاح الأخطاء لعملائنا B2B.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'privacy': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `HousePlus Privacy Policy - Learn how we collect, use, and protect your personal information. Commitment to data protection and privacy.`,
        es: `Política de privacidad de HousePlus - Aprenda cómo recopilamos, usamos y protegemos su información personal. Compromiso con la protección de datos y la privacidad.`,
        de: `HousePlus-Datenschutzpolitik - Erfahren Sie, wie wir Ihre personenbezogenen Daten sammeln, verwenden und schützen. Engagement für Datenschutz.`,
        fr: `Politique de confidentialité HousePlus - Apprenez comment nous collectons, utilisons et protégeons vos informations personnelles. Engagement en matière de protection des données et de confidentialité.`,
        ar: `سياسة الخصوصية HousePlus - تعرف على كيفية جمعنا واستخدامنا وحماية معلوماتك الشخصية. التزام بحماية البيانات والخصوصية.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'terms': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `HousePlus Terms of Service - Legal terms and conditions for using our website and purchasing products from HousePlus.`,
        es: `Términos de servicio de HousePlus - Términos y condiciones legales para usar nuestro sitio web y comprar productos de HousePlus.`,
        de: `HousePlus-Nutzungsbedingungen - Rechtliche Bedingungen für die Nutzung unserer Website und den Kauf von Produkten bei HousePlus.`,
        fr: `Conditions d'utilisation HousePlus - Conditions générales de vente et d'utilisation de notre site web et d'achat de produits chez HousePlus.`,
        ar: `شروط الخدمة HousePlus - الشروط والاحكام القانونية لاستخدام موقعنا الإلكتروني وشراء المنتجات من HousePlus.`,
      };
      return descriptions[lang] || descriptions.en;
    },
    'regions': (parts, lang) => {
      const descriptions: Record<string, string> = {
        en: `HousePlus Global Presence - Serving wholesale markets across Africa, Southeast Asia, Europe, and beyond. Local support and logistics in key regions.`,
        es: `Presencia global de HousePlus - Sirviendo mercados mayoristas en África, Sudeste Asiático, Europa y más allá. Soporte local y logística en regiones clave.`,
        de: `HousePlus Globalpräsenz - Bedienung von Großhandelsmärkten in Afrika, Südostasien, Europa und darüber hinaus. Lokaler Support und Logistik in Schlüsselregionen.`,
        fr: `Présence mondiale de HousePlus - Desservant les marchés de gros en Afrique, en Asie du Sud-Est, en Europe et au-delà. Support local et logistique dans les régions clés.`,
        ar: `الوجود العالمي لـ HousePlus - خدمة أسواق الجملة في أفريقيا وجنوب شرق آسيا وأوروبا وما بعدها. دعم محلي ولوجستيات في المناطق الرئيسية.`,
      };
      return descriptions[lang] || descriptions.en;
    },
  };

  if (titleParts.length > 0) {
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const replacements: Record<string, string> = {
      'about-us': 'About Us',
      'contact': 'Contact',
      'products': 'Products',
      'news': 'News',
      'regions': 'Regions',
      'factory': 'Factory',
      'service': 'Services',
      'team': 'Team',
      'faq': 'FAQ',
      'careers': 'Careers',
      'support': 'Support',
      'privacy': 'Privacy Policy',
      'terms': 'Terms of Service',
      'cookie-policy': 'Cookie Policy',
      'sitemap-page': 'Sitemap',
    };
    
    const humanizedParts = titleParts.map(p => replacements[p] || capitalize(p.replace(/-/g, ' ')));
    
    title = `${humanizedParts.join(' | ')} | HousePlus`;
    
    // 使用专属描述或生成独特描述
    if (pageDescriptions[pageType]) {
      description = pageDescriptions[pageType](titleParts, lang);
    } else {
      // 为其他页面生成独特描述
      const uniqueDescriptions: Record<string, string> = {
        en: `Explore HousePlus ${humanizedParts.join(' ')} - Professional ${humanizedParts.join(' ')} solutions for wholesale buyers worldwide.`,
        es: `Explore HousePlus ${humanizedParts.join(' ')} - Soluciones profesionales ${humanizedParts.join(' ')} para compradores mayoristas en todo el mundo.`,
        de: `Entdecken Sie HousePlus ${humanizedParts.join(' ')} - Professionelle ${humanizedParts.join(' ')} Lösungen für Großhandelskäufer weltweit.`,
        fr: `Explorez HousePlus ${humanizedParts.join(' ')} - Solutions professionnelles ${humanizedParts.join(' ')} pour acheteurs en gros du monde entier.`,
        ar: `استكشف HousePlus ${humanizedParts.join(' ')} - حلول ${humanizedParts.join(' ')} احترافية لمشتري الجملة في جميع أنحاء العالم.`,
      };
      description = uniqueDescriptions[lang] || uniqueDescriptions.en;
    }
  } else {
    const defaultDescriptions: Record<string, string> = {
      en: 'HousePlus is a professional manufacturer of solar systems, home appliances and 3C electronics for global wholesale buyers. OEM/ODM services available from MOQ 100 units.',
      es: 'HousePlus es un fabricante profesional de sistemas solares, electrodomésticos y electrónica 3C para compradores mayoristas globales. Servicios OEM/ODM disponibles a partir de MOQ 100 unidades.',
      de: 'HousePlus ist ein professioneller Hersteller von Solaranlagen, Haushaltsgeräten und 3C-Elektronik für globale Großhandelskäufer. OEM/ODM-Dienstleistungen ab MOQ 100 Einheiten verfügbar.',
      fr: 'HousePlus est un fabricant professionnel de systèmes solaires, d\'appareils électroménagers et d\'électronique 3C pour les acheteurs en gros mondiaux. Services OEM/ODM disponibles à partir de MOQ 100 unités.',
      ar: 'HousePlus مصنع احترافي لأحكام الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C لمشتري الجملة العالميين. خدمات OEM/ODM متاحة من MOQ 100 وحدة.',
    };
    title = 'HousePlus - Professional Wholesale Manufacturer';
    description = defaultDescriptions[lang] || defaultDescriptions.en;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function CatchAllPage({ params }: { params: { lang: string; slug: string[] } }) {
  const { lang, slug } = params;
  const fullSlug = slug?.join('/') || '';
  
  let story: any = null;
  let subStories: any[] = [];

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.getStory(fullSlug, { 
      version: 'published', 
      language: lang,
      resolve_links: 'url',
    });
    story = data?.story;
  } catch (e) {
    console.error('Error fetching story:', e);
  }

  try {
    const storyblokApi = getStoryblokApi();
    const { data: listData } = await storyblokApi.getStories({
      starts_with: fullSlug + '/',
      version: 'published',
      language: lang,
    });
    subStories = listData?.stories || [];
  } catch (e) {
    console.error('Error fetching sub-stories:', e);
  }

  // If no story and no sub-stories, trigger 404
  if (!story && subStories.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto py-20 px-4 text-center">
          <h1 className="text-5xl font-black text-slate-900 mb-6">404 - Page Not Found</h1>
          <p className="text-xl text-slate-600 mb-8">The page you're looking for doesn't exist.</p>
          <a href={`/${lang}`} className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
            ← Return to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-50 py-24 px-4 border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight">
            {story?.content?.title || story?.name || fullSlug.split('/').pop()?.toUpperCase() || 'HousePlus'}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            {story?.content?.description || 'Professional HousePlus grade solution designed for reliability and performance.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-20 px-4">
        {/* Detail Content */}
        {story?.content?.body && (
          <div className="mb-24 prose prose-xl max-w-none prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-img:rounded-[2rem] prose-img:shadow-2xl" 
               dangerouslySetInnerHTML={{ __html: renderRichText(story.content.body) || '' }} />
        )}

        {/* List Content */}
        {subStories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {subStories.map((s: any, idx: number) => {
              const images = [
                'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&q=80',
                'https://images.unsplash.com/photo-1542338106-2b22e0b8f528?w=800&q=80',
                'https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&q=80',
                'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
                'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
                'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80',
              ];
              const productImg = s.content?.image?.filename || images[idx % images.length];

              return (
                <a key={s.uuid} href={`/${lang}/${s.full_slug}`} className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-500 transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={productImg} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full">HousePlus Certified</span>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <h2 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-blue-600 tracking-tight">{s.name}</h2>
                    <p className="text-slate-500 line-clamp-2 mb-8 flex-grow">{s.content?.description || 'Professional HousePlus grade solution designed for reliability and performance.'}</p>
                    <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest">View HousePlus Details →</div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!story && subStories.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Explore HousePlus Solutions</h2>
            <p className="text-slate-500 mb-8">Our professional product catalog is being updated. Please contact us for details.</p>
            <a href={`/${lang}/contact`} className="px-8 py-4 bg-blue-600 text-white font-black rounded-full uppercase tracking-widest text-sm">Contact HousePlus</a>
          </div>
        )}
      </div>
    </main>
  );
}
