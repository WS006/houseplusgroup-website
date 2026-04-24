import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Products | HousePlus — Solar Systems, Home Appliances & 3C Electronics',
    description: 'Browse HousePlus full product catalogue: solar panels, inverters, power banks, air fryers, kettles, headphones, smart watches and more. OEM/ODM available from MOQ 100 pcs.',
    alternates: { canonical: `/${lang}/products` },
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
    coverImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80',
    description: 'High-efficiency monocrystalline solar panel with 21.5% conversion rate. Ideal for residential, commercial and off-grid installations.',
    badge: 'Best Seller',
  },
  {
    slug: 'solar-inverter-3kw',
    name: '3kW Pure Sine Wave Solar Inverter',
    category: 'solar',
    model: 'HP-INV3000',
    coverImage: 'https://images.unsplash.com/photo-1620216503901-515bb5c34c30?w=600&q=80',
    description: 'Pure sine wave output inverter with MPPT charge controller built-in. Supports grid-tie and off-grid operation.',
    badge: 'CE Certified',
  },
  {
    slug: 'lithium-battery-5kwh',
    name: '5kWh LiFePO4 Lithium Battery',
    category: 'solar',
    model: 'HP-LFP5K',
    coverImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80',
    description: 'Long-cycle LiFePO4 battery pack with built-in BMS. 6000+ charge cycles, 10-year design life.',
    badge: 'New',
  },
  {
    slug: 'lead-acid-battery-100ah',
    name: '100Ah Deep Cycle Lead-Acid Battery',
    category: 'solar',
    model: 'HP-LA100',
    coverImage: 'https://images.unsplash.com/photo-1619641151040-af3bf8325790?w=600&q=80',
    description: 'Maintenance-free VRLA deep-cycle battery. Suitable for solar storage, UPS and marine applications.',
    badge: '',
  },
  {
    slug: 'charge-controller-60a',
    name: 'MPPT Solar Charge Controller 60A',
    category: 'solar',
    model: 'HP-MPPT60',
    coverImage: 'https://images.unsplash.com/photo-1558444458-5f75bc94476c?w=600&q=80',
    description: 'Advanced MPPT algorithm with 99.5% tracking efficiency. LCD display, multi-protection, supports 12V/24V/48V systems.',
    badge: '',
  },
  {
    slug: 'solar-street-light-200w',
    name: '200W All-in-One Solar Street Light',
    category: 'solar',
    model: 'HP-SSL200',
    coverImage: 'https://images.unsplash.com/photo-1542641728-6ca359b085f4?w=600&q=80',
    description: 'Integrated solar panel, lithium battery and LED light. Motion sensor, remote control, IP65 waterproof.',
    badge: '',
  },
  {
    slug: 'solar-fan-20w',
    name: 'DC Solar Fan 20W',
    category: 'solar',
    model: 'HP-SF20',
    coverImage: 'https://images.unsplash.com/photo-1565151443-325814491ebe?w=600&q=80',
    description: 'Brushless DC motor fan powered directly by solar panel. Ideal for ventilation in off-grid cabins, greenhouses and livestock shelters.',
    badge: '',
  },
  {
    slug: 'solar-power-bank-20000mah',
    name: '20000mAh Solar Power Bank',
    category: 'solar',
    model: 'HP-SPB20K',
    coverImage: 'https://images.unsplash.com/photo-1609091839311-d53681962025?w=600&q=80',
    description: 'Dual USB + USB-C output, 18W PD fast charge. Waterproof casing with built-in solar charging panel for outdoor use.',
    badge: '',
  },

  // ── Home Appliances ───────────────────────────────────────────────────────
  {
    slug: 'air-fryer-5-8l',
    name: '5.8L Digital Air Fryer',
    category: 'appliances',
    model: 'HP-AF58',
    coverImage: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&q=80',
    description: 'Large-capacity digital air fryer with 8 preset programmes, touch panel and 360° rapid air circulation for healthier cooking.',
    badge: 'Top Rated',
  },
  {
    slug: 'induction-cooktop-2000w',
    name: '2000W Induction Cooktop',
    category: 'appliances',
    model: 'HP-IC2000',
    coverImage: 'https://images.unsplash.com/photo-1624452085375-343547842776?w=600&q=80',
    description: 'Slim ceramic glass induction cooktop with 10 power levels, child lock and automatic pan detection. CE/RoHS certified.',
    badge: '',
  },
  {
    slug: 'electric-kettle-1-5l',
    name: '1.5L Stainless Steel Electric Kettle',
    category: 'appliances',
    model: 'HP-EK15',
    coverImage: 'https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1?w=600&q=80',
    description: 'BPA-free stainless steel interior, 1500W rapid boil, 360° cordless base, auto shut-off and boil-dry protection.',
    badge: '',
  },
  {
    slug: 'toaster-2-slice',
    name: '2-Slice Stainless Steel Toaster',
    category: 'appliances',
    model: 'HP-TS2',
    coverImage: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=600&q=80',
    description: 'Wide-slot toaster with 7 browning settings, removable crumb tray, cancel/reheat/defrost functions. Brushed stainless finish.',
    badge: '',
  },

  // ── 3C Electronics ────────────────────────────────────────────────────────
  {
    slug: 'headphone-over-ear',
    name: 'Over-Ear Headphone with Microphone',
    category: 'electronics',
    model: 'HP-HE01',
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    description: 'Foldable over-ear headphone with 40mm drivers, built-in microphone and 3.5mm universal jack. Ideal for gaming, calls and music.',
    badge: 'Popular',
  },
  {
    slug: 'bluetooth-earphone-tws',
    name: 'True Wireless Bluetooth Earphones (TWS)',
    category: 'electronics',
    model: 'HP-TWS01',
    coverImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
    description: 'Bluetooth 5.3 TWS earbuds with active noise cancellation, 6-hour playtime + 24-hour charging case, IPX5 water resistance.',
    badge: 'New',
  },
  {
    slug: 'smart-watch',
    name: 'Smart Watch with Heart Rate Monitor',
    category: 'electronics',
    model: 'HP-SW01',
    coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    description: '1.7" colour touch screen, heart rate + SpO2 monitoring, 20+ sport modes, 7-day battery life, IP68 waterproof.',
    badge: '',
  },
  {
    slug: 'portable-ssd-1tb',
    name: '1TB USB-C Portable SSD',
    category: 'electronics',
    model: 'HP-SSD1T',
    coverImage: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=600&q=80',
    description: 'Read up to 1050 MB/s, write up to 1000 MB/s. Shock-resistant aluminium casing, USB 3.2 Gen 2 interface, pocket-sized.',
    badge: '',
  },
  {
    slug: 'micro-sd-128gb',
    name: '128GB Micro SD Card (Class 10 / A2)',
    category: 'electronics',
    model: 'HP-SD128',
    coverImage: 'https://images.unsplash.com/photo-1558478551-1a378f63ad28?w=600&q=80',
    description: 'UHS-I U3 A2 rated micro SD card. Up to 100 MB/s read, 90 MB/s write. Waterproof, temperature-proof, X-ray-proof.',
    badge: '',
  },
  {
    slug: 'usb-c-cable-2m',
    name: 'Fast Charging USB-C Cable 2m',
    category: 'electronics',
    model: 'HP-CC2M',
    coverImage: 'https://images.unsplash.com/photo-1619193100632-68046777174b?w=600&q=80',
    description: '100W USB-C to USB-C braided cable. Supports PD 3.0, QC 4.0 and 480 Mbps data transfer. 2-metre length with durable nylon braid.',
    badge: '',
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

  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            Full Product Catalogue
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight">
            HousePlus Products
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive range of solar energy systems, home appliances and 3C electronics. All products are available for OEM/ODM with CE, FCC and RoHS certifications.
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
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={80}
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      Model: {product.model}
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
          <h2 className="text-3xl font-black text-slate-900 mb-4">Need a Custom Solution?</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            HousePlus offers full OEM/ODM services with custom branding, private-label packaging and product modifications. Minimum order from 100 units. Contact our team for a personalised quote.
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
