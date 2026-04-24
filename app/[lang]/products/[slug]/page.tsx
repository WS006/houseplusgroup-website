import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_DATA, CATEGORY_CONFIG } from '@/lib/product-data';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const product = PRODUCT_DATA[slug];
  const name = product?.name || slug;
  return {
    title: `${name} | HousePlus Products — Professional Wholesale`,
    description: `Buy ${name} wholesale from HousePlus. CE/RoHS certified, OEM/ODM available, MOQ 100 pcs. Professional manufacturer since 2010.`,
    alternates: { canonical: `/${lang}/products/${slug}` },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const product = PRODUCT_DATA[slug];

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Product Not Found</h1>
          <p className="text-slate-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link
            href={`/${lang}/products`}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
          >
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const catConfig = CATEGORY_CONFIG[product.category];

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-slate-500">
          <Link href={`/${lang}`} className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${lang}/products`} className="hover:text-blue-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
              <Image
                src={product.coverImage}
                alt={`HousePlus ${product.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                priority
              />
            </div>
            {/* Certifications */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['✓ CE Certified', '✓ RoHS Compliant', '✓ ISO 9001', '✓ OEM/ODM Available'].map((cert) => (
                <span key={cert} className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold rounded-full">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* HousePlus Brand Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">
                🏭 HousePlus Professional
              </span>
              {product.badge && (
                <span className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest rounded-full">
                  ⭐ {product.badge}
                </span>
              )}
            </div>

            {/* Category Badge */}
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-bold ${catConfig.bg} ${catConfig.color}`}>
              {catConfig.icon} {catConfig.label}
            </span>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-slate-600 leading-relaxed text-base">
              {product.description}
            </p>

            {/* Specifications Table */}
            {product.specs.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  HousePlus Technical Specifications
                </h2>
                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr
                          key={i}
                          className={`${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'} border-b border-slate-100 last:border-0`}
                        >
                          <td className="px-5 py-3.5 font-semibold text-slate-600 w-2/5">
                            {spec.key}
                          </td>
                          <td className="px-5 py-3.5 text-slate-900 font-medium">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Key Features */}
            {product.features.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  Key Features
                </h2>
                <ul className="space-y-2.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Applications */}
            {product.applications && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  HousePlus Applications
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">{product.applications}</p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/contact`}
                className="flex-1 text-center px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5"
              >
                Request a Quote
              </Link>
              <Link
                href={`/${lang}/products`}
                className="flex-1 text-center px-6 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5"
              >
                ← Back to Products
              </Link>
            </div>

            {/* Wholesale Info */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: 'Min. Order', value: '100 pcs' },
                { label: 'Lead Time', value: '20–35 days' },
                { label: 'Warranty', value: '24 months' },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            {/* HousePlus CTA */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-slate-700 mb-3">
                <strong>🏭 HousePlus OEM/ODM Services:</strong> Custom branding, private-label packaging, and product modifications available from MOQ 100 units.
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-block text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Contact HousePlus Sales Team →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
