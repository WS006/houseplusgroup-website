import { getStoryblokApi } from '@storyblok/react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import SEOHead from '@/components/SEOHead';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Sample product data - in production this would come from Storyblok
const sampleProducts = [
  {
    _uid: 'p1',
    name: '400W Monocrystalline Solar Panel',
    category: 'solar',
    image: { filename: 'https://images.unsplash.com/photo-1611369839216-81f22b86e6a3?w=800&q=80', alt: '400W Solar Panel' },
    description: '21.5% efficiency, IP68 junction box, 25-year performance warranty. Built for wholesale buyers who need reliable panels at scale.',
    price: '200-300',
    currency: 'USD',
    moq: '100 pcs',
    certifications: ['CE', 'IEC', 'RoHS'],
    isBestSeller: true,
    model: 'HP-SP400',
  },
  {
    _uid: 'p2',
    name: '3000W Portable Power Station',
    category: 'solar',
    image: { filename: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80', alt: '3000W Power Station' },
    description: 'LiFePO4 battery, 6000+ cycles, built-in BMS. Charge from solar, wall outlet, or car. We keep stock for fast shipping.',
    price: '500-700',
    currency: 'USD',
    moq: '50 pcs',
    certifications: ['CE', 'FCC', 'RoHS'],
    isBestSeller: false,
    model: 'HP-PS3000',
  },
  {
    _uid: 'p3',
    name: '5kW Hybrid Inverter',
    category: 'solar',
    image: { filename: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&q=80', alt: '5kW Hybrid Inverter' },
    description: 'Pure sine wave output, MPPT solar controller built-in. Works with battery storage or feeds back to grid. We handle customs paperwork.',
    price: '800-1200',
    currency: 'USD',
    moq: '50 pcs',
    certifications: ['CE', 'IEC'],
    isBestSeller: false,
    model: 'HP-INV5000',
  },
  {
    _uid: 'p4',
    name: 'Air Fryer 5.5L',
    category: 'appliances',
    image: { filename: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Air Fryer 5.5L' },
    description: '1200W, 360° hot air circulation, 8 preset modes. Our R&D team can modify temperature range and add your brand logo.',
    price: '30-45',
    currency: 'USD',
    moq: '200 pcs',
    certifications: ['CE', 'FCC', 'RoHS'],
    isBestSeller: true,
    model: 'HP-AF550',
  },
  {
    _uid: 'p5',
    name: 'Induction Cooktop 1800W',
    category: 'appliances',
    image: { filename: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Induction Cooktop' },
    description: 'Touch control, 10 power levels, child lock. Ships with English manual; we can print in your language.',
    price: '40-60',
    currency: 'USD',
    moq: '200 pcs',
    certifications: ['CE', 'RoHS'],
    isBestSeller: false,
    model: 'HP-IC1800',
  },
  {
    _uid: 'p6',
    name: 'Electric Kettle 1.8L',
    category: 'appliances',
    image: { filename: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Electric Kettle' },
    description: '1500W, auto shut-off, boil-dry protection. We have tooling ready - can adjust color and add your packaging.',
    price: '12-18',
    currency: 'USD',
    moq: '500 pcs',
    certifications: ['CE', 'FCC', 'RoHS'],
    isBestSeller: true,
    model: 'HP-EK1800',
  },
  {
    _uid: 'p7',
    name: 'TWS Earphones',
    category: 'electronics',
    image: { filename: 'https://images.unsplash.com/photo-1606220588913-b3aac36dfc97?w=800&q=80', alt: 'TWS Earphones' },
    description: 'Bluetooth 5.3, 30h playtime, IPX5 waterproof. We test every unit before shipping - returns stay below 2%.',
    price: '8-15',
    currency: 'USD',
    moq: '500 pcs',
    certifications: ['CE', 'FCC', 'RoHS'],
    isBestSeller: true,
    model: 'HP-TWS300',
  },
  {
    _uid: 'p8',
    name: 'Smart Watch Fitness Tracker',
    category: 'electronics',
    image: { filename: 'https://images.unsplash.com/photo-152327533ddd1-a578b674c4c8?w=800&q=80', alt: 'Smart Watch' },
    description: 'Heart rate, sleep monitor, IP68 waterproof. APP supports 20+ languages. We can pre-install your branded APP.',
    price: '15-25',
    currency: 'USD',
    moq: '300 pcs',
    certifications: ['CE', 'FCC', 'RoHS'],
    isBestSeller: false,
    model: 'HP-SW200',
  },
  {
    _uid: 'p9',
    name: 'Portable SSD 1TB',
    category: 'electronics',
    image: { filename: 'https://images.unsplash.com/photo-1597138804456-e7dca7f59d54?w=800&q=80', alt: 'Portable SSD 1TB' },
    description: 'Read 1050MB/s, write 1000MB/s, USB-C. Aluminum case, drop-resistant. We keep inventory for dropshipping.',
    price: '40-60',
    currency: 'USD',
    moq: '200 pcs',
    certifications: ['CE', 'FCC', 'RoHS'],
    isBestSeller: false,
    model: 'HP-SSD1TB',
  },
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'solar', name: 'Solar Energy' },
  { id: 'appliances', name: 'Home Appliances' },
  { id: 'electronics', name: '3C Electronics' },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return generateSEOMetadata({
    title: 'Products | HousePlus - Solar, Appliances & Electronics Wholesale',
    description: 'Browse our product catalogue: solar panels, power stations, home appliances, and 3C electronics. OEM/ODM available, MOQ from 100 pcs.',
    keywords: ['solar panels', 'home appliances', 'portable power station', 'wholesale', 'OEM', 'ODM', '3C electronics', 'HousePlus'],
    url: `/${lang}/products`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const storyblokApi = getStoryblokApi();
  let products = sampleProducts;

  try {
    const { data } = await storyblokApi.getStory('products', {
      version: 'published',
      language: lang,
      cv: Date.now()
    });
    if (data?.story?.content?.products && Array.isArray(data.story.content.products)) {
      products = data.story.content.products;
    }
  } catch (error) {
    console.error(`Error fetching products for ${lang}:`, error);
  }

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics for global wholesale buyers.',
    url: `https://www.houseplus-ch.com/${lang}/products`,
    lang,
    type: 'Organization',
  });

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">
        {/* Page Header */}
        <section className="pt-28 pb-16 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              HousePlus Wholesale
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
              Product Catalogue
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Solar panels, home appliances, and 3C electronics - all available for OEM/ODM. We hold CE, FCC and RoHS certifications and ship to 60+ countries.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg">Solar Systems</span>
              <span className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg">Home Appliances</span>
              <span className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg">3C Electronics</span>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product._uid} className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image
                      src={product.image.filename}
                      alt={product.image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Best Seller
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-slate-400">{product.model}</span>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{product.moq}+ MOQ</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{product.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.certifications.map((cert) => (
                        <span key={cert} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{cert}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-blue-600">${product.price}</span>
                      <Link
                        href={`/${lang}/contact`}
                        className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        Get Quotation
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OEM/ODM CTA */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Need Custom Branding?</h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              We handle OEM/ODM for all products. From 100 pcs, we can add your logo, custom packaging, and even modify product features. Our team responds within 4 business hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${lang}/contact`}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5"
              >
                Contact Our Team
              </Link>
              <Link
                href={`/${lang}/products`}
                className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5"
              >
                Download Catalogue
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
