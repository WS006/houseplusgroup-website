import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateItemListSchema } from '@/lib/schema-generator';
import { PRODUCT_DATA } from '@/lib/product-data';

const BASE_URL = 'https://www.houseplus-ch.com';
const LOCALES = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-static';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const langAlternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    langAlternates[locale] = `${BASE_URL}/${locale}/products`;
  }
  langAlternates['x-default'] = `${BASE_URL}/en/products`;

  const titles: Record<string, string> = {
    en: 'Products | HousePlus — Solar, Appliances & Electronics',
    es: 'Productos | HousePlus — Solar, Electrodomésticos y Electrónica',
    de: 'Produkte | HousePlus — Solar, Haushaltsgeräte & Elektronik',
    fr: 'Produits | HousePlus — Solaire, Électroménager et Électronique',
    ar: 'المنتجات | هاوس بلس — الطاقة الشمسية والأجهزة والإلكترونيات',
  };

  const descriptions: Record<string, string> = {
    en: 'Browse the full HousePlus product catalogue: solar panels, inverters, batteries, home appliances and 3C electronics. Wholesale pricing, OEM/ODM available. MOQ 100 pcs.',
    es: 'Explore el catálogo completo de HousePlus: paneles solares, inversores, baterías, electrodomésticos y electrónica 3C. Precios al por mayor, OEM/ODM disponibles desde 100 unidades.',
    de: 'Durchstöbern Sie das vollständige HousePlus-Produktprogramm: Solarmodule, Wechselrichter, Batterien, Haushaltsgeräte und 3C-Elektronik. Großhandelspreise, OEM/ODM ab 100 Stück.',
    fr: 'Parcourez le catalogue complet HousePlus : panneaux solaires, onduleurs, batteries, électroménager et électronique 3C. Prix de gros, OEM/ODM disponibles dès 100 pièces.',
    ar: 'تصفح كتالوج هاوس بلس الكامل: ألواح شمسية ومحولات وبطاريات وأجهزة منزلية وإلكترونيات 3C. أسعار الجملة مع توفر خدمات OEM/ODM ابتداءً من ١٠٠ قطعة.',
  };

  return {
    title: titles[lang] || titles['en'],
    description: descriptions[lang] || descriptions['en'],
    alternates: {
      canonical: `${BASE_URL}/${lang}/products`,
      languages: langAlternates,
    },
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

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

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

  return (
    <main className="min-h-screen bg-white">
      <SEOHead schemas={[itemListSchema]} />
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
                    <Image
                      src={product.coverImage}
                      alt={getImageAlt(product)}
                      title={getImageTitle(product)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={80}
                      loading="lazy"
                    />
                    {/* Hidden SEO-rich context for search engines */}
                    <span className="sr-only" data-seo-alt={PRODUCT_DATA[product.slug]?.imageAlt || ''} data-seo-title={PRODUCT_DATA[product.slug]?.imageTitle || ''}>
                      {PRODUCT_DATA[product.slug]?.imageAlt || ''}
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
