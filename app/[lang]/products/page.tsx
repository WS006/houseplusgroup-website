import { Metadata } from 'next';
import Link from 'next/link';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateCollectionPageSchema, generateItemListSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';
import { PRODUCT_DATA } from '@/lib/product-data';
import { r2ImageDimensions } from '@/lib/r2-media-details';

const BASE_URL = 'https://www.houseplus-ch.com';
const LOCALES = ['en', 'es', 'de', 'fr', 'ar'];

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params, searchParams }: { params: { lang: string }; searchParams?: { category?: string } }): Promise<Metadata> {
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
      en: 'HousePlus solar energy systems: high-efficiency solar panels, MPPT charge controllers, pure sine wave inverters, lithium batteries and portable power stations. CE/IEC/RoHS certified for global wholesale buyers.',
      es: 'Sistemas de energía solar de HousePlus: paneles solares de alta eficiencia, controladores de carga MPPT, inversores de onda senoidal pura, baterías de litio y estaciones de energía portátiles. Certificados CE/IEC/RoHS para compradores mayoristas globales.',
      de: 'HousePlus Solarenergiesysteme: Hocheffiziente Solarmodule, MPPT-Laderegler, Sinus-Wechselrichter, Lithium-Batterien und tragbare Kraftwerke. CE/IEC/RoHS-zertifiziert für globale Großhandelskäufer.',
      fr: 'Systèmes solaires HousePlus : panneaux solaires haute efficacité, contrôleurs de charge MPPT, onduleurs à onde sinusoïdale pure, batteries lithium et stations électriques portables. Certifiés CE/IEC/RoHS pour acheteurs en gros mondiaux.',
      ar: 'أنظمة الطاقة الشمسية من هاوس بلس: ألواح شمسية عالية الكفاءة، ومتحكمات شحن MPPT، ومحولات موجات جيبية نقية، وبطاريات ليثيوم ومحطات طاقة محمولة. مع شهادات CE/IEC/RoHS لمشتري الجملة العالميين.',
    },
    'home-appliances': {
      en: 'HousePlus home appliances: energy-efficient kitchen appliances including air fryers, electric kettles, induction cooktops and toasters. CE/FCC/RoHS certified wholesale appliances for global distributors.',
      es: 'Electrodomésticos de HousePlus: electrodomésticos de cocina eficientes energéticamente que incluyen freidoras de aire, hervidoras eléctricas, vitrocerámicas y tostadoras. Electrodomésticos mayoristas certificados CE/FCC/RoHS para distribuidores globales.',
      de: 'HousePlus Haushaltsgeräte: Energieeffiziente Küchengeräte wie Heißluftfritteusen, Wasserkocher, Induktionskochfelder und Toaster. CE/FCC/RoHS-zertifizierte Großhandelsgeräte für globale Distributoren.',
      fr: 'Appareils électroménagers HousePlus : appareils de cuisine éconergétiques incluant frites à air chaud, bouilloires électriques, plaques à induction et grille-pains. Appareils en gros certifiés CE/FCC/RoHS pour distributeurs mondiaux.',
      ar: 'أجهزة منزلية هاوس بلس: أجهزة مطبخ موفرة للطاقة تشمل مقلاة الهواء، والغلايات الكهربائية، والأغطية الحثية، والتوستات. أجهزة منزلية بالجملة مع شهادات CE/FCC/RoHS لموزعين عالميين.',
    },
    '3c-electronics': {
      en: 'HousePlus 3C electronics: Bluetooth earphones, smart watches, power banks, portable SSDs and USB cables. Premium quality consumer electronics with CE/FCC/RoHS certifications for wholesale buyers worldwide.',
      es: 'Electrónica 3C de HousePlus: auriculares Bluetooth, relojes inteligentes, power banks, SSD portátiles y cables USB. Electrónica de consumo de calidad premium con certificaciones CE/FCC/RoHS para compradores mayoristas en todo el mundo.',
      de: 'HousePlus 3C-Elektronik: Bluetooth-Kopfhörer, Smartwatches, Powerbanks, tragbare SSDs und USB-Kabel. Premium-Qualitäts-Konsumelektronik mit CE/FCC/RoHS-Zertifizierungen für Großhandelskäufer weltweit.',
      fr: 'Électronique 3C HousePlus : écouteurs Bluetooth, montres intelligentes, powerbanks, SSD portables et câbles USB. Électronique grand public de qualité premium avec certifications CE/FCC/RoHS pour acheteurs en gros du monde entier.',
      ar: 'إلكترونيات 3C هاوس بلس: سماعات بلوتوث، وساعات ذكية، وبنوك الطاقة، و SSD المحمولة، وكابلات USB. إلكترونيات استهلاكية ذات جودة عالية مع شهادات CE/FCC/RoHS لمشتري الجملة في جميع أنحاء العالم.',
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
    en: 'Browse the full HousePlus product catalogue: solar panels, inverters, batteries, home appliances and 3C electronics. Wholesale pricing, OEM/ODM available. MOQ 100 pcs.',
    es: 'Explore el catálogo completo de HousePlus: paneles solares, inversores, baterías, electrodomésticos y electrónica 3C. Precios al por mayor, OEM/ODM disponibles desde 100 unidades.',
    de: 'Durchstöbern Sie das vollständige HousePlus-Produktprogramm: Solarmodule, Wechselrichter, Batterien, Haushaltsgeräte und 3C-Elektronik. Großhandelspreise, OEM/ODM ab 100 Stück.',
    fr: 'Parcourez le catalogue complet HousePlus : panneaux solaires, onduleurs, batteries, électroménager et électronique 3C. Prix de gros, OEM/ODM disponibles dès 100 pièces.',
    ar: 'تصفح كتالوج هاوس بلس الكامل: ألواح شمسية ومحولات وبطاريات وأجهزة منزلية وإلكترونيات 3C. أسعار الجملة مع توفر خدمات OEM/ODM ابتداءً من ١٠٠ قطعة.',
  };

  const isValidCategory = category && Object.keys(categoryTitles).includes(category);
  const title = isValidCategory ? categoryTitles[category][lang] || categoryTitles[category].en : baseTitles[lang] || baseTitles.en;
  const description = isValidCategory ? categoryDescriptions[category][lang] || categoryDescriptions[category].en : baseDescriptions[lang] || baseDescriptions.en;

  const categoryToProductType: Record<string, string> = { solar: 'solar', 'home-appliances': 'appliances', '3c-electronics': 'electronics' };
  const featuredProduct = Object.values(PRODUCT_DATA).find((product) => !category || product.category === categoryToProductType[category]) || Object.values(PRODUCT_DATA)[0];
  const imageDimensions = r2ImageDimensions(featuredProduct?.coverImage, { width: 900, height: 675 });

  const langAlternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    langAlternates[locale] = isValidCategory ? `${BASE_URL}/${locale}/products?category=${category}` : `${BASE_URL}/${locale}/products`;
  }
  langAlternates['x-default'] = isValidCategory ? `${BASE_URL}/en/products?category=${category}` : `${BASE_URL}/en/products`;

  return {
    title,
    description,
    alternates: {
      canonical: isValidCategory ? `${BASE_URL}/${lang}/products?category=${category}` : `${BASE_URL}/${lang}/products`,
      languages: langAlternates,
    },
    openGraph: featuredProduct ? {
      title,
      description,
      url: isValidCategory ? `${BASE_URL}/${lang}/products?category=${category}` : `${BASE_URL}/${lang}/products`,
      siteName: 'HousePlus',
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

// Build products array directly from PRODUCT_DATA to ensure list page and detail page are always in sync
const products = Object.entries(PRODUCT_DATA).map(([slug, data]) => {
  const modelSpec = data.specs.find((s) => s.key === 'Model' || s.key === 'SKU');
  return {
    slug,
    name: data.name,
    category: data.category,
    model: modelSpec?.value || '',
    coverImage: data.coverImage,
    description: data.description,
    badge: data.badge || '',
    imageAlt: data.imageAlt || data.name,
    imageTitle: data.imageTitle || data.name,
    imageDimensions: r2ImageDimensions(data.coverImage, { width: 900, height: 675 }),
  };
});

// Helper: generate varied alt/title based on product name length (deterministic, avoids hydration mismatch)
function getImageAlt(product: typeof products[0]) {
  const model = product.model ? `(${product.model})` : '';
  const catMap: Record<string, string> = { solar: 'Solar Energy', appliances: 'Home Appliance', electronics: '3C Electronic' };
  const cat = catMap[product.category] || 'Wholesale';
  const v = product.name.length % 3;
  if (v === 0) return `${product.name} ${model} — HousePlus ${cat} Wholesale`;
  if (v === 1) return `HousePlus ${cat} Supplier — ${product.name} ${model}`;
  return `${product.name} ${model} — CE/RoHS Certified HousePlus ${cat}`;
}
function getImageTitle(product: typeof products[0]) {
  const model = product.model ? `(${product.model})` : '';
  const catMap: Record<string, string> = { solar: 'Solar Energy', appliances: 'Home Appliances', electronics: '3C Electronics' };
  const cat = catMap[product.category] || 'Wholesale';
  const v = product.name.length % 3;
  if (v === 0) return `${product.name} | HousePlus OEM/ODM ${cat}`;
  if (v === 1) return `HousePlus ${product.name} | Professional ${cat} Manufacturer`;
  return `${product.name} ${model} | HousePlus ${cat} Export`;
}

export default async function ProductsPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const solarProducts = products.filter((p) => p.category === 'solar');
  const applianceProducts = products.filter((p) => p.category === 'appliances');
  const electronicsProducts = products.filter((p) => p.category === 'electronics');

  const categoryGroups = [
    { ...productCategories[0], items: solarProducts },
    { ...productCategories[1], items: applianceProducts },
    { ...productCategories[2], items: electronicsProducts },
  ];

  // Generate ItemList structured data
  const itemListSchema = generateItemListSchema(
    'HousePlus Complete Product Catalogue',
    'Solar systems, home appliances and 3C electronics for global wholesale buyers.',
    `${BASE_URL}/${lang}/products`,
    products.map((p, i) => ({
      position: i + 1,
      name: p.name,
      url: `${BASE_URL}/${lang}/products/${p.slug}`,
      image: p.coverImage,
      description: p.description,
    }))
  );

  const catalogSchema = generateCollectionPageSchema({
    name: 'HousePlus Complete Product Catalogue',
    description: 'Solar energy systems, home appliances and 3C electronics for global wholesale buyers.',
    url: `${BASE_URL}/${lang}/products`,
    lang,
    image: products[0]?.coverImage,
    categories: ['Solar Energy Systems', 'Home Appliances', '3C Electronics'],
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/${lang}` },
    { name: 'Products', url: `${BASE_URL}/${lang}/products` },
  ]);

  return (
    <main className="min-h-screen bg-white">
      <SEOHead schemas={[catalogSchema, itemListSchema, breadcrumbSchema]} />
      <Breadcrumb lang={lang} slug="products" />
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            🏭 HousePlus Professional Wholesale
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight">
            HousePlus Complete Product Catalogue
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Check out our full product range - from solar panels to smart watches, all available with OEM/ODM support and CE/FCC/RoHS certifications.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {productCategories.map((cat) => (
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
              <span className="text-slate-400 text-sm">{group.items.length} products</span>
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
                    <img
                      src={product.coverImage}
                      alt={product.imageAlt || getImageAlt(product)}
                      title={product.imageTitle || getImageTitle(product)}
                      width={product.imageDimensions.width}
                      height={product.imageDimensions.height}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                      <span className="text-xs text-blue-600 font-semibold">View Details →</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {product.category === 'solar' ? 'Solar' : product.category === 'appliances' ? 'Appliance' : '3C'}
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
