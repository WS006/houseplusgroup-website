import { Metadata } from 'next';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return generateSEOMetadata({
    title: 'Premium Home Appliances - HousePlus Group',
    description: 'Explore HousePlus high-efficiency refrigerators, washing machines, and kitchen solutions. Professional OEM/ODM manufacturing for global wholesale markets.',
    url: `/${lang}/products/home-appliances`,
    lang: lang as any,
    type: 'article',
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <SEOHead />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] flex items-center overflow-hidden bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1920&q=80" 
            alt="HousePlus Premium Appliances" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
              HousePlus<br/><span className="text-blue-500 text-4xl md:text-6xl">Home Appliances</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-medium">
              Redefining modern living with energy-efficient, smart, and reliable appliances engineered for the global market since 2010.
            </p>
          </div>
        </div>

        {/* Brand Advantage Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">The HousePlus Advantage</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                  Why Choose HousePlus for Your Wholesale Appliance Needs?
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">Certified Quality Standards</h3>
                      <p className="text-slate-500 leading-relaxed">All HousePlus appliances meet CE, RoHS, and FCC certifications, ensuring safety and performance for international markets.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">Eco-Friendly Innovation</h3>
                      <p className="text-slate-500 leading-relaxed">Our appliances feature advanced inverter technology and eco-friendly refrigerants to minimize energy consumption.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">OEM/ODM Capability</h3>
                      <p className="text-slate-500 leading-relaxed">From logo branding to custom specifications, HousePlus provides full-service manufacturing solutions for global brands.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80" 
                  alt="HousePlus Factory Quality" 
                  className="rounded-[3rem] shadow-2xl"
                />
                <div className="absolute -bottom-10 -left-10 bg-blue-600 p-10 rounded-[2rem] text-white shadow-2xl hidden md:block">
                  <div className="text-5xl font-black mb-2">15+</div>
                  <div className="text-sm font-bold uppercase tracking-widest opacity-80">Years of Manufacturing Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">HousePlus Product Range</h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">Explore our comprehensive collection of professional-grade appliances designed for distributors and wholesalers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Category 1 */}
              <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1571175432291-32473849794d?w=800&q=80" alt="HousePlus Refrigeration" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">Smart Refrigeration</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">Advanced cooling systems with smart temperature control and high-efficiency compressors.</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-sm font-bold text-slate-700"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>No-Frost Technology</li>
                    <li className="flex items-center text-sm font-bold text-slate-700"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Inverter Energy Saving</li>
                    <li className="flex items-center text-sm font-bold text-slate-700"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Custom Exterior Finishes</li>
                  </ul>
                </div>
              </div>

              {/* Category 2 */}
              <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1626806819282-2c1dc61a0e05?w=800&q=80" alt="HousePlus Washing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">Washing Solutions</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">High-capacity washing machines and dryers designed for durability and fabric care.</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-sm font-bold text-slate-700"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Steam Wash Cycles</li>
                    <li className="flex items-center text-sm font-bold text-slate-700"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Low-Noise Direct Drive</li>
                    <li className="flex items-center text-sm font-bold text-slate-700"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Smart App Connectivity</li>
                  </ul>
                </div>
              </div>

              {/* Category 3 */}
              <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556912177-f513332402e9?w=800&q=80" alt="HousePlus Kitchen" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">Kitchen Innovation</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">Complete kitchen suites including ovens, microwaves, and dishwashers for modern homes.</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-sm font-bold text-slate-700"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Built-in Design Options</li>
                    <li className="flex items-center text-sm font-bold text-slate-700"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Touch Control Interface</li>
                    <li className="flex items-center text-sm font-bold text-slate-700"><span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>Rapid Heat Technology</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500 skew-x-12 transform translate-x-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
              <div className="text-white">
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Ready to Partner with HousePlus?</h2>
                <p className="text-xl text-blue-100 max-w-xl font-medium">Get a custom quote for your wholesale appliance order and experience the HousePlus difference in quality and service.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`/${lang}/contact`} className="px-12 py-6 bg-white text-blue-600 font-black rounded-full hover:scale-105 transition-all shadow-xl uppercase tracking-widest text-sm">
                  Request HousePlus Quote
                </a>
                <a href={`/${lang}/service`} className="px-12 py-6 bg-blue-700 text-white font-black rounded-full hover:bg-blue-800 transition-all uppercase tracking-widest text-sm">
                  View Support Services
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
