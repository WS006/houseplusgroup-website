import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateCollectionPageSchema, generateItemListSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';
import { PRODUCT_DATA } from '@/lib/product-data';
import { r2ImageDimensions } from '@/lib/r2-media-details';
import { getOGLocale } from '@/lib/seo-utils';
import { getLocalizedProduct } from '@/lib/localized-content';

const BASE_URL = 'https://www.houseplus-ch.com';
const LOCALES = ['en', 'es', 'de', 'fr', 'ar'];

const validLangs = ['en', 'es', 'de', 'fr', 'ar'] as const;
type Lang = (typeof validLangs)[number];
const ogLocales: Record<string, string> = { en: 'en_US', es: 'es_ES', de: 'de_DE', fr: 'fr_FR', ar: 'ar_SA' };

const productPageCopy: Record<Lang, { wholesale: string; catalogueTitle: string; catalogueDescription: string; viewDetails: string; productsLabel: string; categoryLabels: Record<string, string>; home: string; products: string; schemaName: string; schemaDescription: string }> = {
  en: { wholesale: 'HousePlus Professional Wholesale', catalogueTitle: 'HousePlus Complete Product Catalogue', catalogueDescription: 'Check out our full product range — from solar panels to smart watches, all available with OEM/ODM support and CE/FCC/RoHS certifications.', viewDetails: 'View Details', productsLabel: 'products', categoryLabels: { solar: 'Solar Energy Systems', appliances: 'Home Appliances', electronics: '3C Electronics' }, home: 'Home', products: 'Products', schemaName: 'HousePlus Complete Product Catalogue', schemaDescription: 'Solar systems, home appliances and 3C electronics for global wholesale buyers.' },
  es: { wholesale: 'Venta mayorista profesional de HousePlus', catalogueTitle: 'Catálogo completo de productos HousePlus', catalogueDescription: 'Consulte toda nuestra gama de productos — desde paneles solares hasta relojes inteligentes, con soporte OEM/ODM y certificaciones CE/FCC/RoHS.', viewDetails: 'Ver detalles', productsLabel: 'productos', categoryLabels: { solar: 'Sistemas de energía solar', appliances: 'Electrodomésticos', electronics: 'Electrónica 3C' }, home: 'Inicio', products: 'Productos', schemaName: 'Catálogo completo de productos HousePlus', schemaDescription: 'Sistemas solares, electrodomésticos y electrónica 3C para compradores mayoristas internacionales.' },
  de: { wholesale: 'Professioneller Großhandel von HousePlus', catalogueTitle: 'Vollständiger HousePlus-Produktkatalog', catalogueDescription: 'Entdecken Sie unser vollständiges Sortiment — von Solarmodulen bis zu Smartwatches, mit OEM/ODM-Unterstützung und CE/FCC/RoHS-Zertifizierungen.', viewDetails: 'Details ansehen', productsLabel: 'Produkte', categoryLabels: { solar: 'Solarenergiesysteme', appliances: 'Haushaltsgeräte', electronics: '3C-Elektronik' }, home: 'Startseite', products: 'Produkte', schemaName: 'Vollständiger HousePlus-Produktkatalog', schemaDescription: 'Solarsysteme, Haushaltsgeräte und 3C-Elektronik für internationale Großhandelskäufer.' },
  fr: { wholesale: 'Vente en gros professionnelle HousePlus', catalogueTitle: 'Catalogue complet des produits HousePlus', catalogueDescription: 'Découvrez toute notre gamme — des panneaux solaires aux montres connectées, avec accompagnement OEM/ODM et certifications CE/FCC/RoHS.', viewDetails: 'Voir les détails', productsLabel: 'produits', categoryLabels: { solar: 'Systèmes d’énergie solaire', appliances: 'Appareils électroménagers', electronics: 'Électronique 3C' }, home: 'Accueil', products: 'Produits', schemaName: 'Catalogue complet des produits HousePlus', schemaDescription: 'Systèmes solaires, appareils électroménagers et électronique 3C pour les acheteurs grossistes internationaux.' },
  ar: { wholesale: 'البيع بالجملة الاحترافي من هاوس بلس', catalogueTitle: 'كتالوج منتجات هاوس بلس الكامل', catalogueDescription: 'اطّلع على مجموعتنا الكاملة — من الألواح الشمسية إلى الساعات الذكية، مع دعم OEM/ODM وشهادات CE وFCC وRoHS.', viewDetails: 'عرض التفاصيل', productsLabel: 'منتجات', categoryLabels: { solar: 'أنظمة الطاقة الشمسية', appliances: 'الأجهزة المنزلية', electronics: 'إلكترونيات 3C' }, home: 'الرئيسية', products: 'المنتجات', schemaName: 'كتالوج منتجات هاوس بلس الكامل', schemaDescription: 'أنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C للمشترين بالجملة حول العالم.' },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: { params: Promise<{ lang: string }>; searchParams?: Promise<{ category?: string }> }
): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { lang } = params;
  const category = searchParams?.category;

  const categoryTitles: Record<string, Record<string, string>> = {
    solar: {
      en: 'Solar Energy Systems | HousePlus Wholesale — Solar Panels, Inverters & Batteries',
      es: 'Sistemas de Energía Solar | HousePlus Mayorista — Paneles Solares, Inversores y Baterías',
      de: 'Solarenergiesysteme | HousePlus Großhandel — Solarmodule, Wechselrichter und Batterien',
      fr: 'Systèmes d\'Énergie Solaire | HousePlus Gros — Panneaux Solaires, Onduleurs et Batteries',
      ar: 'أنظمة الطاقة الشمسية | هاوس بلس بالجملة — الألواح الشمسية والمحولات والبطاريات',
    },
    'home-appliances': {
      en: 'Home Appliances | HousePlus Wholesale — Kitchen & Household Appliances',
      es: 'Electrodomésticos | HousePlus Mayorista — Electrodomésticos de Cocina y Hogar',
      de: 'Haushaltsgeräte | HousePlus Großhandel — Küchen- und Haushaltsgeräte',
      fr: 'Appareils Électroménagers | HousePlus Gros — Appareils de Cuisine et Menagers',
      ar: 'أجهزة منزلية | هاوس بلس بالجملة — أجهزة المطبخ والمنزل',
    },
    '3c-electronics': {
      en: '3C Electronics | HousePlus Wholesale — Digital Gadgets & Accessories',
      es: 'Electrónica 3C | HousePlus Mayorista — Gadgets Digitales y Accesorios',
      de: '3C-Elektronik | HousePlus Großhandel — Digitale Gadgets und Zubehör',
      fr: 'Électronique 3C | HousePlus Gros — Gadgets Numériques et Accessoires',
      ar: 'إلكترونيات 3C | هاوس بلس بالجملة — الأجهزة الرقمية والإكسسوارات',
    },
  };

  const categoryDescriptions: Record<string, Record<string, string>> = {
    solar: {
      en: 'Explore HousePlus solar panels, MPPT charge controllers, inverters, lithium batteries and portable power stations. Request product documentation and a tailored wholesale quotation for your market.',
      es: 'Explore paneles solares, controladores MPPT, inversores, baterías de litio y estaciones de energía portátiles de HousePlus. Solicite documentación del producto y una cotización mayorista adaptada a su mercado.',
      de: 'Entdecken Sie Solarmodule, MPPT-Laderegler, Wechselrichter, Lithium-Batterien und tragbare Kraftwerke von HousePlus. Fordern Sie Produktunterlagen und ein passendes Großhandelsangebot für Ihren Markt an.',
      fr: 'Découvrez les panneaux solaires, contrôleurs MPPT, onduleurs, batteries lithium et stations électriques portables HousePlus. Demandez la documentation produit et un devis de gros adapté à votre marché.',
      ar: 'استكشف الألواح الشمسية ووحدات تحكم MPPT والمحولات وبطاريات الليثيوم ومحطات الطاقة المحمولة من هاوس بلس. اطلب وثائق المنتج وعرض أسعار بالجملة مناسبًا لسوقك.',
    },
    'home-appliances': {
      en: 'Explore HousePlus kitchen and household appliances, including air fryers, electric kettles, induction cooktops and toasters. Request product documentation and a wholesale quotation for your requirements.',
      es: 'Explore los electrodomésticos de cocina y hogar de HousePlus, incluidas freidoras de aire, hervidores eléctricos, placas de inducción y tostadoras. Solicite documentación del producto y una cotización mayorista según sus requisitos.',
      de: 'Entdecken Sie Küchen- und Haushaltsgeräte von HousePlus, darunter Heißluftfritteusen, Wasserkocher, Induktionskochfelder und Toaster. Fordern Sie Produktunterlagen und ein Großhandelsangebot für Ihre Anforderungen an.',
      fr: 'Découvrez les appareils de cuisine et du foyer HousePlus, notamment les friteuses à air, bouilloires électriques, plaques à induction et grille-pains. Demandez la documentation produit et un devis de gros selon vos besoins.',
      ar: 'استكشف أجهزة المطبخ والمنزل من هاوس بلس، بما في ذلك مقالي الهواء والغلايات الكهربائية ومواقد الحث والمحمصات. اطلب وثائق المنتج وعرض أسعار بالجملة وفقًا لمتطلباتك.',
    },
    '3c-electronics': {
      en: 'Explore HousePlus 3C electronics, including Bluetooth earphones, smart watches, power banks, portable SSDs and USB cables. Request product documentation and a wholesale quotation for your requirements.',
      es: 'Explore la electrónica 3C de HousePlus, incluidos auriculares Bluetooth, relojes inteligentes, baterías externas, SSD portátiles y cables USB. Solicite documentación del producto y una cotización mayorista según sus requisitos.',
      de: 'Entdecken Sie 3C-Elektronik von HousePlus, darunter Bluetooth-Kopfhörer, Smartwatches, Powerbanks, tragbare SSDs und USB-Kabel. Fordern Sie Produktunterlagen und ein Großhandelsangebot für Ihre Anforderungen an.',
      fr: 'Découvrez l’électronique 3C HousePlus, notamment les écouteurs Bluetooth, montres intelligentes, batteries externes, SSD portables et câbles USB. Demandez la documentation produit et un devis de gros selon vos besoins.',
      ar: 'استكشف إلكترونيات 3C من هاوس بلس، بما في ذلك سماعات بلوتوث والساعات الذكية وبنوك الطاقة ووحدات SSD المحمولة وكابلات USB. اطلب وثائق المنتج وعرض أسعار بالجملة وفقًا لمتطلباتك.',
    },
  };

  const baseTitles: Record<string, string> = {
    en: 'Products | HousePlus — Solar, Appliances & Electronics',
    es: 'Productos | HousePlus — Solar, Electrodomésticos y Electrónica',
    de: 'Produkte | HousePlus — Solar, Haushaltsgeräte & Elektronik',
    fr: 'Produits | HousePlus — Solaire, Électroménager et Électronique',
    ar: 'المنتجات | هاوس بلس — الطاقة الشمسية والأجهزة والإلكترونيات',
  };

  const baseDescriptions: Record<string, string> = {
    en: 'Browse the HousePlus catalogue of solar systems, home appliances and 3C electronics. Request product documentation, OEM/ODM scope and a wholesale quotation for your requirements.',
    es: 'Explore el catálogo HousePlus de sistemas solares, electrodomésticos y electrónica 3C. Solicite documentación del producto, el alcance OEM/ODM y una cotización mayorista según sus requisitos.',
    de: 'Durchsuchen Sie den HousePlus-Katalog für Solarsysteme, Haushaltsgeräte und 3C-Elektronik. Fordern Sie Produktunterlagen, den OEM/ODM-Umfang und ein Großhandelsangebot für Ihre Anforderungen an.',
    fr: 'Parcourez le catalogue HousePlus de systèmes solaires, appareils électroménagers et électronique 3C. Demandez la documentation produit, le périmètre OEM/ODM et un devis de gros selon vos besoins.',
    ar: 'تصفح كتالوج هاوس بلس لأنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C. اطلب وثائق المنتج ونطاق OEM/ODM وعرض أسعار بالجملة وفقًا لمتطلباتك.',
  };

  const isValidCategory = category && Object.keys(categoryTitles).includes(category);
  const title = isValidCategory ? categoryTitles[category][lang] || categoryTitles[category].en : baseTitles[lang] || baseTitles.en;
  const description = isValidCategory ? categoryDescriptions[category][lang] || categoryDescriptions[category].en : baseDescriptions[lang] || baseDescriptions.en;

  const categoryToProductType: Record<string, string> = { solar: 'solar', 'home-appliances': 'appliances', '3c-electronics': 'electronics' };
  const featuredProduct = Object.values(PRODUCT_DATA).find((product) => !category || product.category === categoryToProductType[category]) || Object.values(PRODUCT_DATA)[0];
  const imageDimensions = r2ImageDimensions(featuredProduct?.coverImage, { width: 900, height: 675 });

  const langAlternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    langAlternates[locale] = isValidCategory ? `${BASE_URL}/${locale}/products/?category=${category}` : `${BASE_URL}/${locale}/products/`;
  }
  langAlternates['x-default'] = isValidCategory ? `${BASE_URL}/en/products/?category=${category}` : `${BASE_URL}/en/products/`;

  const canonicalUrl = isValidCategory
    ? `${BASE_URL}/${lang}/products/?category=${category}`
    : `${BASE_URL}/${lang}/products/`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: langAlternates,
    },
    openGraph: featuredProduct ? {
      title,
      description,
      url: canonicalUrl,
      siteName: 'HousePlus',
      locale: getOGLocale(lang),
      alternateLocale: LOCALES.filter((locale) => locale !== lang).map((locale) => ogLocales[locale]),
      images: [{
        url: featuredProduct.coverImage,
        width: imageDimensions.width,
        height: imageDimensions.height,
        alt: featuredProduct.imageAlt || featuredProduct.name,
      }],
      type: 'website',
    } : undefined,
    twitter: featuredProduct ? {
      card: 'summary_large_image',
      title,
      description,
      site: '@HousePlusGroup',
      creator: '@HousePlusGroup',
      images: [{ url: featuredProduct.coverImage, alt: featuredProduct.imageAlt || featuredProduct.name }],
    } : undefined,
  };
}

// Product catalogue categories
const productCategories = [
  {
    id: 'solar',
    label: 'Solar Energy Systems',
    color: 'bg-amber-50 border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-700',
    icon: '☀️',
  },
  {
    id: 'appliances',
    label: 'Home Appliances',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: '🏠',
  },
  {
    id: 'electronics',
    label: '3C Electronics',
    color: 'bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-700',
    icon: '📱',
  },
];

// Build products from the same source as detail pages; localized fields are merged from products.json.
function getProductsForLocale(locale: string) {
  return Object.entries(PRODUCT_DATA).map(([slug, data]) => {
    const localizedData = getLocalizedProduct(slug, locale, data);
    const modelSpec = localizedData.specs.find((s) => s.key === 'Model' || s.key === 'SKU' || s.key === 'Modèle' || s.key === 'Modell' || s.key === 'Modelo' || s.key === 'الطراز');
    return {
      slug,
      name: localizedData.name,
      category: localizedData.category,
      model: modelSpec?.value || '',
      coverImage: localizedData.coverImage,
      description: localizedData.description,
      badge: localizedData.badge || '',
      imageAlt: localizedData.imageAlt || localizedData.name,
      imageTitle: localizedData.imageTitle || localizedData.name,
      imageDimensions: r2ImageDimensions(localizedData.coverImage, { width: 900, height: 675 }),
    };
  });
}

type ProductListItem = ReturnType<typeof getProductsForLocale>[number];

// Helper: generate varied alt/title based on product name length (deterministic, avoids hydration mismatch)
function getImageAlt(product: ProductListItem) {
  const model = product.model ? `(${product.model})` : '';
  const catMap: Record<string, string> = { solar: 'Solar Energy', appliances: 'Home Appliance', electronics: '3C Electronic' };
  const cat = catMap[product.category] || 'Wholesale';
  const v = product.name.length % 3;
  if (v === 0) return `${product.name} ${model} — HousePlus ${cat} Wholesale`;
  if (v === 1) return `HousePlus ${cat} Supplier — ${product.name} ${model}`;
  return `${product.name} ${model} — CE/RoHS Certified HousePlus ${cat}`;
}
function getImageTitle(product: ProductListItem) {
  const model = product.model ? `(${product.model})` : '';
  const catMap: Record<string, string> = { solar: 'Solar Energy', appliances: 'Home Appliances', electronics: '3C Electronics' };
  const cat = catMap[product.category] || 'Wholesale';
  const v = product.name.length % 3;
  if (v === 0) return `${product.name} | HousePlus OEM/ODM ${cat}`;
  if (v === 1) return `HousePlus ${product.name} | Professional ${cat} Manufacturer`;
  return `${product.name} ${model} | HousePlus ${cat} Export`;
}

export default async function ProductsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const locale = (validLangs.includes(lang as Lang) ? lang : 'en') as Lang;
  const copy = productPageCopy[locale];

  const products = getProductsForLocale(locale);
  const solarProducts = products.filter((p) => p.category === 'solar');
  const applianceProducts = products.filter((p) => p.category === 'appliances');
  const electronicsProducts = products.filter((p) => p.category === 'electronics');

  const categoryGroups = [
    { ...productCategories[0], label: copy.categoryLabels.solar, items: solarProducts },
    { ...productCategories[1], label: copy.categoryLabels.appliances, items: applianceProducts },
    { ...productCategories[2], label: copy.categoryLabels.electronics, items: electronicsProducts },
  ];

  // Generate ItemList structured data
  const itemListSchema = generateItemListSchema(
    copy.schemaName,
    copy.schemaDescription,
    `${BASE_URL}/${lang}/products`,
    products.map((p, i) => ({
      position: i + 1,
      name: p.name,
      url: `${BASE_URL}/${lang}/products/${p.slug}`,
      image: p.coverImage,
      description: p.description,
    })),
    lang
  );

  const catalogSchema = generateCollectionPageSchema({
    name: copy.schemaName,
    description: copy.schemaDescription,
    url: `${BASE_URL}/${lang}/products`,
    lang,
    image: products[0]?.coverImage,
    categories: [copy.categoryLabels.solar, copy.categoryLabels.appliances, copy.categoryLabels.electronics],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: copy.home, url: `${BASE_URL}/${lang}` },
    { name: copy.products, url: `${BASE_URL}/${lang}/products` },
  ]);

  return (
    <main className="min-h-screen bg-white">
      <SEOHead schemas={[catalogSchema, itemListSchema, breadcrumbSchema]} />
      <Breadcrumb lang={lang} slug="products" />
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-5">
             🏭 {copy.wholesale}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight">
            {copy.catalogueTitle}
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {copy.catalogueDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categoryGroups.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-5 py-2.5 bg-white/15 hover:bg-white/30 text-white border border-white/30 rounded-xl text-sm font-semibold transition-all"
              >
                {cat.icon} {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {categoryGroups.map((group) => (
          <section key={group.id} id={group.id}>
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-10">
              <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold ${group.color} ${group.badgeColor}`}>
                <span className="text-xl">{group.icon}</span>
                {group.label}
              </div>
              <div className="flex-1 h-px bg-slate-100" />
                              <span className="text-slate-400 text-sm">{group.items.length} {copy.productsLabel}</span>

            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {group.items.map((product) => (
                <Link
                  key={product.slug}
                  href={`/${lang}/products/${product.slug}`}
                  className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                    <Image
                      src={product.coverImage}
                      alt={product.imageAlt || getImageAlt(product)}
                      title={product.imageTitle || getImageTitle(product)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                      quality={78}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async" />
                    {/* Hidden SEO-rich context for search engines */}
                    <span className="sr-only" data-seo-alt={product.imageAlt} data-seo-title={product.imageTitle}>
                      {product.imageAlt}
                    </span>
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    {product.model && (
                      <p className="text-xs text-slate-400 font-medium mb-2">{product.model}</p>
                    )}
                    <p className="text-xs text-slate-500 leading-relaxed flex-1">
                      {product.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-blue-600 font-semibold">{copy.viewDetails} →</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {product.category === 'solar' ? copy.categoryLabels.solar : product.category === 'appliances' ? copy.categoryLabels.appliances : copy.categoryLabels.electronics}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
