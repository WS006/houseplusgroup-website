import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateItemListSchema } from '@/lib/schema-generator';
import { PRODUCT_DATA } from '@/lib/product-data';

const BASE_URL = 'https://www.houseplus-ch.com';
const LOCALES = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const langAlternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    langAlternates[locale] = `${BASE_URL}/${locale}/products`;
  }
  langAlternates['x-default'] = `${BASE_URL}/en/products`;

  return {
    title: 'Products | HousePlus — Solar Systems, Home Appliances & 3C Electronics',
    description: 'HousePlus product catalogue: solar panels, inverters, lithium batteries, air fryers, induction cooktops, TWS earphones, smart watches and more. 20,000 m² ISO 9001 factory. 441+ wholesale clients in 53+ countries. MOQ 100 pcs, 20–35 day lead time. CE/FCC/RoHS. OEM/ODM available.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/products`,
      languages: langAlternates,
    },
  };
}

// Product catalogue — each entry has a dedicated professional cover image
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

const products = [
  // ── Solar Energy Systems ──────────────────────────────────────────────────
  {
    slug: 'solar-panel-500w',
    name: '500W Monocrystalline Solar Panel',
    category: 'solar',
    model: 'HP-SP500',
    coverImage: 'https://res.cloudinary.com/dgojpbdof/image/upload/v1777206360/products/solar-panel-500w.jpg',
    description: '21.5% conversion rate monocrystalline panel. Great for residential, commercial and off-grid installations.',
    badge: 'Best Seller',
  },
  {
    slug: 'solar-inverter-3kw',
    name: '3kW Pure Sine Wave Solar Inverter',
    category: 'solar',
    model: 'HP-INV3000',
    coverImage: 'https://res.cloudinary.com/dgojpbdof/image/upload/v1777206915/products/solar-inverter-3kw.jpg',
    description: 'Pure sine wave inverter with built-in MPPT charge controller. Supports both grid-tie and off-grid operation.',
    badge: 'CE Certified',
  },
  {
    slug: 'lithium-battery-5kwh',
    name: '5kWh LiFePO4 Lithium Battery',
    category: 'solar',
    model: 'HP-LFP5K',
    coverImage: 'https://res.cloudinary.com/dgojpbdof/image/upload/v1777206406/products/lithium-battery-5kwh.jpg',
    description: 'Long-cycle LiFePO4 battery with built-in BMS. 6000+ charge cycles, 10-year design life.',
    badge: 'New',
  },
  {
    slug: 'lead-acid-battery-100ah',
    name: '100Ah Deep Cycle Lead-Acid Battery',
    category: 'solar',
    model: 'HP-LA100',
    coverImage: 'https://res.cloudinary.com/dgojpbdof/image/upload/v1777206924/products/lead-acid-battery-100ah.jpg',
    description: 'Maintenance-free VRLA deep-cycle battery. Suitable for solar storage, UPS and marine applications.',
    badge: '',
  },
  {
    slug: 'charge-controller-60a',
    name: 'MPPT Solar Charge Controller 60A',
    category: 'solar',
    model: 'HP-MPPT60',
    coverImage: 'https://res.cloudinary.com/dgojpbdof/image/upload/v1777206928/products/charge-controller-60a.jpg',
    description: 'Advanced MPPT algorithm with 99.5% tracking efficiency. LCD display, multi-protection, supports 12V/24V/48V systems.',
    badge: '',
  },
  {
    slug: 'solar-street-light-200w',
    name: '200W All-in-One Solar Street Light',
    category: 'solar',
    model: 'HP-SSL200',
    coverImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&q=85',
    description: 'Integrated solar panel, lithium battery and LED light. Motion sensor, remote control, IP65 waterproof.',
    badge: '',
  },
  {
    slug: 'solar-fan-20w',
    name: 'DC Solar Fan 20W',
    category: 'solar',
    model: 'HP-SF20',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=85',
    description: 'Brushless DC motor fan powered directly by solar panel. Ideal for ventilation in off-grid cabins, greenhouses and livestock shelters.',
    badge: '',
  },
  {
    slug: 'solar-power-bank-20000mah',
    name: '20000mAh Solar Power Bank',
    category: 'solar',
    model: 'HP-SPB20K',
    coverImage: 'https://images.unsplash.com/photo-1609091839311-d53681962025?w=900&q=85',
    description: 'Dual USB + USB-C output, 18W PD fast charge. Waterproof casing with built-in solar charging panel for outdoor use.',
    badge: '',
  },

  // ── Home Appliances ───────────────────────────────────────────────────────
  {
    slug: 'air-fryer-5-8l',
    name: '5.8L Digital Air Fryer',
    category: 'appliances',
    model: 'HP-AF58',
    coverImage: 'https://res.cloudinary.com/dgojpbdof/image/upload/v1777206932/products/air-fryer-5l.jpg',
    description: 'Large 5.8L capacity with 8 preset programmes and touch panel. 360° rapid air circulation for healthier cooking.',
    badge: 'Top Rated',
  },
  {
    slug: 'induction-cooktop-2000w',
    name: '2000W Induction Cooktop',
    category: 'appliances',
    model: 'HP-IC2000',
    coverImage: 'https://images.unsplash.com/photo-1585650503743-6fc1e7a0e2d0?w=900&q=85',
    description: 'Slim ceramic glass cooktop with 10 power levels, child lock and automatic pan detection. CE/RoHS certified.',
    badge: '',
  },
  {
    slug: 'electric-kettle-1-5l',
    name: '1.5L Stainless Steel Electric Kettle',
    category: 'appliances',
    model: 'HP-EK15',
    coverImage: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&q=85',
    description: 'BPA-free stainless steel interior, 1500W rapid boil, 360° cordless base, auto shut-off and boil-dry protection.',
    badge: '',
  },
  {
    slug: 'toaster-2-slice',
    name: '2-Slice Stainless Steel Toaster',
    category: 'appliances',
    model: 'HP-TS2',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=85',
    description: 'Wide-slot toaster with 7 browning settings, removable crumb tray, cancel/reheat/defrost functions. Brushed stainless finish.',
    badge: '',
  },

  // ── 3C Electronics ────────────────────────────────────────────────────────
  {
    slug: 'headphone-over-ear',
    name: 'Over-Ear Headphone with Microphone',
    category: 'electronics',
    model: 'HP-HE01',
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85',
    description: 'Foldable over-ear headphone with 40mm drivers, built-in microphone and 3.5mm universal jack. Ideal for gaming, calls and music.',
    badge: 'Popular',
  },
  {
    slug: 'bluetooth-earphone-tws',
    name: 'True Wireless Bluetooth Earphones (TWS)',
    category: 'electronics',
    model: 'HP-TWS01',
    coverImage: 'https://images.unsplash.com/photo-1572569028738-411a196cb27c?w=900&q=85',
    description: 'Bluetooth 5.3 TWS earbuds with active noise cancellation, 6-hour playtime + 24-hour charging case, IPX5 water resistance.',
    badge: 'New',
  },
  {
    slug: 'smart-watch',
    name: 'Smart Watch with Heart Rate Monitor',
    category: 'electronics',
    model: 'HP-SW01',
    coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85',
    description: '1.7" colour touch screen, heart rate + SpO2 monitoring, 20+ sport modes, 7-day battery life, IP68 waterproof.',
    badge: '',
  },
  {
    slug: 'portable-ssd-1tb',
    name: '1TB USB-C Portable SSD',
    category: 'electronics',
    model: 'HP-SSD1T',
    coverImage: 'https://images.unsplash.com/photo-1597872252165-4827a235d9bb?w=900&q=85',
    description: 'Read up to 1050 MB/s, write up to 1000 MB/s. Shock-resistant aluminium casing, USB 3.2 Gen 2 interface, pocket-sized.',
    badge: '',
  },
  {
    slug: 'micro-sd-128gb',
    name: '128GB Micro SD Card (Class 10 / A2)',
    category: 'electronics',
    model: 'HP-SD128',
    coverImage: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=900&q=85',
    description: 'UHS-I U3 A2 rated micro SD card. Up to 100 MB/s read, 90 MB/s write. Waterproof, temperature-proof, X-ray-proof.',
    badge: '',
  },
  {
    slug: 'usb-c-cable-2m',
    name: 'Fast Charging USB-C Cable 2m',
    category: 'electronics',
    model: 'HP-CC2M',
    coverImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&q=85',
    description: '100W USB-C to USB-C braided cable. Supports PD 3.0, QC 4.0 and 480 Mbps data transfer. 2-metre length with durable nylon braid.',
    badge: '',
  },
  // ===== P0 GEO-Optimized Products (Added 2026-06-26) =====
  {
    slug: 'solar-panel-100w',
    name: '100W Monocrystalline Solar Panel',
    category: 'solar',
    model: 'HP-SOL-100W',
    coverImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=85',
    description: 'High-efficiency 100W monocrystalline solar panel with ≥21% conversion rate. Engineered for RV, marine, off-grid cabin and outdoor camping applications.',
    badge: 'Best Seller',
  },
  {
    slug: 'portable-power-station-3000w',
    name: '3000W Portable Power Station',
    category: 'solar',
    model: 'HP-SOL-3000',
    coverImage: 'https://images.unsplash.com/photo-1620216503901-515bb5c34c30?w=900&q=85',
    description: '3000Wh LiFePO4 portable power station with 3000W continuous output (6000W peak). Supports solar, AC, and car charging. Ideal for outdoor construction, emergency backup, and camping.',
    badge: 'Best Seller',
  },
  {
    slug: 'foldable-solar-panel-200w',
    name: '200W Foldable Solar Panel',
    category: 'solar',
    model: 'HP-SOL-200F',
    coverImage: 'https://images.unsplash.com/photo-1548613053-220e75581890?w=900&q=85',
    description: '200W foldable monocrystalline solar panel with ETFE surface. Folds to 550×450×50 mm, weighs 5.2 kg. IP65 waterproof with 5000+ fold cycles.',
    badge: 'New',
  },
  {
    slug: 'home-energy-storage-5000w',
    name: '5000W Home Energy Storage System',
    category: 'solar',
    model: 'HP-SOL-5000H',
    coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=85',
    description: '5000Wh modular LiFePO4 home energy storage system with 5000W output (10000W peak). Grid-tie/off-grid switchable. Cycle life ≥6000.',
    badge: 'New',
  },
  {
    slug: 'power-bank-60w-pd',
    name: '60W PD Fast Charging Power Bank',
    category: 'electronics',
    model: 'HP-3C-60W',
    coverImage: 'https://images.unsplash.com/photo-1566554738544-d962991c3fee?w=900&q=85',
    description: '20000mAh power bank with 60W PD fast charging and QC3.0. Dual USB-C + USB-A output. Aluminium casing. 350g lightweight.',
    badge: 'Popular',
  },
  {
    slug: 'lifepo4-battery-12v100ah',
    name: '12V 100Ah LiFePO4 Battery',
    category: 'solar',
    model: 'HP-SOL-12V100',
    coverImage: 'https://images.unsplash.com/photo-1619641151040-af3bf8325790?w=900&q=85',
    description: '12V 100Ah LiFePO4 deep cycle battery with 1280Wh capacity. Integrated BMS. 3000+ cycles. 12.5 kg. UN38.3 certified for shipping.',
    badge: 'Best Seller',
  },
  {
    slug: 'outdoor-power-station-600w',
    name: '600W Outdoor Power Station',
    category: 'solar',
    model: 'HP-SOL-600O',
    coverImage: 'https://images.unsplash.com/photo-1624452085375-343547842776?w=900&q=85',
    description: '600Wh LiFePO4 outdoor power station with 600W pure sine wave output. 2×AC + 2×USB + 1×DC. 7.2 kg with handle. Solar/AC/car charging.',
    badge: 'New',
  },
  {
    slug: 'mppt-controller-40a',
    name: 'MPPT 40A Solar Charge Controller',
    category: 'solar',
    model: 'HP-SOL-MPPT40',
    coverImage: 'https://images.unsplash.com/photo-1558444458-5f75bc94476c?w=900&q=85',
    description: 'MPPT 40A solar charge controller with ≥98% efficiency. Auto 12V/24V detection. LCD display. Supports lead-acid, gel, and LiFePO4 batteries.',
    badge: '',
  },
  {
    slug: 'magnetic-power-bank-10000mah',
    name: '10000mAh Magnetic Wireless Power Bank',
    category: 'electronics',
    model: 'HP-3C-MAG10K',
    coverImage: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=900&q=85',
    description: '10000mAh MagSafe-compatible magnetic wireless power bank with 15W wireless and 20W PD USB-C. 220g ultra-light. PC+ABS fire-resistant.',
    badge: 'New',
  },
  {
    slug: 'pure-sine-inverter-2000w',
    name: '2000W Pure Sine Wave Inverter',
    category: 'solar',
    model: 'HP-SOL-INV2K',
    coverImage: 'https://images.unsplash.com/photo-1780445392484-38a4852a1fd8?w=900&q=85',
    description: '2000W pure sine wave inverter with 4000W surge. ≥92% efficiency. THD <3%. 12V/24V/48V input. 110V/220V output. 8 protection layers.',
    badge: 'CE Certified',
  },
  {
    slug: 'flexible-solar-panel-400w',
    name: '400W Semi-Flexible Solar Panel',
    category: 'solar',
    model: 'HP-SOL-400F',
    coverImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=85',
    description: '400W semi-flexible monocrystalline solar panel with ETFE surface. 30° bend radius. 8.5 kg (60% lighter than glass). 3mm thickness. 3M adhesive or screw mount.',
    badge: 'New',
  },
  {
    slug: 'solar-generator-kit-300w',
    name: 'Portable Solar Generator Kit 300W',
    category: 'solar',
    model: 'HP-SOL-KIT300',
    coverImage: 'https://images.unsplash.com/photo-1662601619454-6fdb2afcf24a?w=900&q=85',
    description: 'All-in-one 300W solar generator kit: 100W panel + 300Wh LiFePO4 power station + cables + carry bag. 12 kg total. 6–8 hours solar charge.',
    badge: 'Popular',
  },
  {
    slug: 'smart-wifi-plug-meter',
    name: 'Smart WiFi Plug with Energy Meter',
    category: 'appliances',
    model: 'HP-HA-WIFI10',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=900&q=85',
    description: 'Smart WiFi plug with real-time energy monitoring. 16A/3680W max. 2.4GHz WiFi. Alexa/Google Home/SmartLife compatible. 85×85×35 mm.',
    badge: 'New',
  },
  {
    slug: 'usb-c-cable-100w-5a',
    name: 'Type-C 100W Fast Charging Cable (5A)',
    category: 'electronics',
    model: 'HP-3C-TC100W',
    coverImage: 'https://images.unsplash.com/photo-1619193100632-68046777174b?w=900&q=85',
    description: '100W PD USB-C to USB-C cable with 5A current. 1m/2m lengths. Nylon braided with aluminium connectors. 10000+ bend cycles. 480Mbps data.',
    badge: 'Best Seller',
  },
];

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

      {/* GEO Description */}
      <section className="bg-slate-50 border-b border-slate-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-700 text-lg leading-relaxed">
            Since 2010, HousePlus has operated a <strong>20,000 m² ISO 9001 certified factory</strong> delivering solar energy systems, home appliances and 3C electronics to <strong>441+ wholesale clients across 53+ countries</strong>. All products carry CE, FCC and RoHS certifications. We offer flexible <strong>MOQ from 100 pcs</strong>, <strong>20–35 day lead times</strong> and comprehensive <strong>OEM/ODM services</strong> with 12-month warranty support.
          </p>
        </div>
      </section>

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
                      alt={`${product.name} ${product.model ? `(${product.model})` : ''} — HousePlus Wholesale`}
                      title={`${product.name} | HousePlus OEM/ODM`}
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
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">
                      🏭 HousePlus {product.model}
                    </p>
                    <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {product.name}
                    </h2>
                    <p className="text-sm text-slate-500 line-clamp-2 flex-grow leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                        View Details →
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                        OEM/ODM ✓
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="bg-blue-50 border-t border-blue-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4">🏭 HousePlus Custom Solutions</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            <strong>HousePlus Professional OEM/ODM Services:</strong> We offer custom branding, private-label packaging and product modifications. MOQ from 100 units. Contact us for a tailored quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5"
            >
              Request a Quote
            </Link>
            <Link
              href={`/${lang}/service`}
              className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5"
            >
              OEM/ODM Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

