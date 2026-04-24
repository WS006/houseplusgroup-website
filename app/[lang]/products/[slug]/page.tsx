import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getStory } from '@/lib/storyblok';

export const dynamic = 'force-dynamic';

// Product cover images mapped by slug — professional, product-specific photography
const productCoverImages: Record<string, string> = {
  'solar-panel-500w': 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=85',
  'solar-inverter-3kw': 'https://images.unsplash.com/photo-1620216503901-515bb5c34c30?w=900&q=85',
  'lithium-battery-5kwh': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=85',
  'lead-acid-battery-100ah': 'https://images.unsplash.com/photo-1619641151040-af3bf8325790?w=900&q=85',
  'charge-controller-60a': 'https://images.unsplash.com/photo-1558444458-5f75bc94476c?w=900&q=85',
  'solar-street-light-200w': 'https://images.unsplash.com/photo-1542641728-6ca359b085f4?w=900&q=85',
  'solar-fan-20w': 'https://images.unsplash.com/photo-1565151443-325814491ebe?w=900&q=85',
  'solar-power-bank-20000mah': 'https://images.unsplash.com/photo-1609091839311-d53681962025?w=900&q=85',
  'air-fryer-5-8l': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=900&q=85',
  'induction-cooktop-2000w': 'https://images.unsplash.com/photo-1624452085375-343547842776?w=900&q=85',
  'electric-kettle-1-5l': 'https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1?w=900&q=85',
  'toaster-2-slice': 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=900&q=85',
  'headphone-over-ear': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85',
  'bluetooth-earphone-tws': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=85',
  'smart-watch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85',
  'portable-ssd-1tb': 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=900&q=85',
  'micro-sd-128gb': 'https://images.unsplash.com/photo-1558478551-1a378f63ad28?w=900&q=85',
  'usb-c-cable-2m': 'https://images.unsplash.com/photo-1619193100632-68046777174b?w=900&q=85',
};

// Category badge colours
const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  solar: { label: 'Solar Energy Systems', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  appliances: { label: 'Home Appliances', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  electronics: { label: '3C Electronics', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
};

const slugToCategory: Record<string, string> = {
  'solar-panel-500w': 'solar',
  'solar-inverter-3kw': 'solar',
  'lithium-battery-5kwh': 'solar',
  'lead-acid-battery-100ah': 'solar',
  'charge-controller-60a': 'solar',
  'solar-street-light-200w': 'solar',
  'solar-fan-20w': 'solar',
  'solar-power-bank-20000mah': 'solar',
  'air-fryer-5-8l': 'appliances',
  'induction-cooktop-2000w': 'appliances',
  'electric-kettle-1-5l': 'appliances',
  'toaster-2-slice': 'appliances',
  'headphone-over-ear': 'electronics',
  'bluetooth-earphone-tws': 'electronics',
  'smart-watch': 'electronics',
  'portable-ssd-1tb': 'electronics',
  'micro-sd-128gb': 'electronics',
  'usb-c-cable-2m': 'electronics',
};

// Parse Storyblok rich-text table nodes into key-value pairs
function extractTableRows(bodyContent: any[]): { key: string; value: string }[] {
  const rows: { key: string; value: string }[] = [];
  for (const node of bodyContent) {
    if (node.type === 'table') {
      for (const row of node.content || []) {
        const cells = row.content || [];
        if (cells.length >= 2) {
          const key = cells[0]?.content?.[0]?.content?.[0]?.text || '';
          const value = cells[1]?.content?.[0]?.content?.[0]?.text || '';
          if (key && value) rows.push({ key, value });
        }
      }
    }
  }
  return rows;
}

// Parse bullet list items
function extractBulletList(bodyContent: any[]): string[] {
  const items: string[] = [];
  for (const node of bodyContent) {
    if (node.type === 'bullet_list') {
      for (const li of node.content || []) {
        const text = li?.content?.[0]?.content?.[0]?.text || '';
        if (text) items.push(text);
      }
    }
  }
  return items;
}

// Parse headings and paragraphs for description sections
function extractSections(bodyContent: any[]): { heading: string; text: string }[] {
  const sections: { heading: string; text: string }[] = [];
  let currentHeading = '';
  for (const node of bodyContent) {
    if (node.type === 'heading') {
      currentHeading = node.content?.[0]?.text || '';
    } else if (node.type === 'paragraph' && currentHeading) {
      const text = node.content?.map((c: any) => c.text || '').join('') || '';
      if (text && !text.includes('Contact our sales team')) {
        sections.push({ heading: currentHeading, text });
        currentHeading = '';
      }
    }
  }
  return sections;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const story = await getStory(`products/${slug}`, lang);
  const name = story?.content?.Text || story?.name || slug;
  return {
    title: `${name} | HousePlus Products`,
    description: `Buy ${name} wholesale from HousePlus. CE/RoHS certified, OEM/ODM available, MOQ 100 pcs.`,
    alternates: { canonical: `/${lang}/products/${slug}` },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  const story = await getStory(`products/${slug}`, lang);

  const content = story?.content || {};
  const productName = content.Text || story?.name || slug;
  const bodyContent: any[] = content.body?.content || [];

  const coverImage =
    productCoverImages[slug] ||
    bodyContent.find((n: any) => n.type === 'image')?.attrs?.src ||
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85';

  const specRows = extractTableRows(bodyContent);
  const features = extractBulletList(bodyContent);
  const sections = extractSections(bodyContent);

  const category = slugToCategory[slug] || 'solar';
  const catConfig = categoryConfig[category];

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-slate-500">
          <Link href={`/${lang}`} className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${lang}/products`} className="hover:text-blue-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{productName}</span>
        </div>
      </div>

      {/* Product Hero */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
              <Image
                src={coverImage}
                alt={productName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                priority
              />
            </div>
            {/* Certifications */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['CE Certified', 'RoHS Compliant', 'ISO 9001', 'OEM/ODM Available'].map((cert) => (
                <span key={cert} className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold rounded-full">
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-bold ${catConfig.bg} ${catConfig.color}`}>
              {catConfig.label}
            </span>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {productName}
            </h1>

            {/* Short Description */}
            {sections.length > 0 && (
              <p className="text-slate-600 leading-relaxed text-base">
                {sections[0]?.text}
              </p>
            )}

            {/* Specifications Table */}
            {specRows.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  Technical Specifications
                </h2>
                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {specRows.map((row, i) => (
                        <tr
                          key={i}
                          className={`${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'} border-b border-slate-100 last:border-0`}
                        >
                          <td className="px-5 py-3.5 font-semibold text-slate-600 w-2/5">
                            {row.key}
                          </td>
                          <td className="px-5 py-3.5 text-slate-900 font-medium">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Key Features */}
            {features.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  Key Features
                </h2>
                <ul className="space-y-2.5">
                  {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Sections (Applications, etc.) */}
            {sections.slice(1).map((sec, i) => (
              <div key={i}>
                <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
                  {sec.heading}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">{sec.text}</p>
              </div>
            ))}

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
          </div>
        </div>
      </div>
    </main>
  );
}
