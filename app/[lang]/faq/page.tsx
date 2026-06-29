import { Metadata } from 'next';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateFAQSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'HousePlus FAQ - Frequently Asked Questions',
    es: 'Preguntas Frecuentes HousePlus',
    de: 'Häufig Gestellte Fragen HousePlus',
    fr: 'FAQ HousePlus - Questions Fréquemment Posées',
    ar: 'الأسئلة الشائعة HousePlus',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: 'HousePlus FAQ for wholesale buyers. MOQ 100 pcs, 20–35 day lead time, 24-month warranty. CE, FCC, RoHS, ISO 9001 certified. 441+ clients across 53+ countries. OEM/ODM available. Solar, appliance and 3C electronics from 20,000 m² factory since 2010.',
    keywords: ['FAQ', 'questions', 'answers', 'help', 'support', 'HousePlus'],
    url: `/${lang}/faq`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const faqs: Record<string, any[]> = {
    en: [
      {
        category: 'HousePlus General Information',
        items: [
          { q: 'What is HousePlus?', a: 'HousePlus is a professional manufacturer specializing in HousePlus solar systems, HousePlus home appliances, and HousePlus 3C electronics for global wholesale buyers.' },
          { q: 'How long has HousePlus been in business?', a: 'HousePlus was founded in 2010 and has over 14 years of manufacturing and international trade experience.' },
          { q: 'Where is HousePlus located?', a: 'HousePlus is based in China with state-of-the-art HousePlus manufacturing facilities and a global HousePlus distribution network.' },
        ]
      },
      {
        category: 'HousePlus Products & Customization',
        items: [
          { q: 'What products does HousePlus manufacture?', a: 'HousePlus manufactures HousePlus solar panels, HousePlus power stations, HousePlus home appliances, and HousePlus 3C electronics.' },
          { q: 'Are HousePlus products certified?', a: 'Yes, all HousePlus products comply with CE, FCC, RoHS, ISO 9001, and other international HousePlus standards.' },
          { q: 'Can I customize HousePlus products?', a: 'Yes, HousePlus offers comprehensive OEM/ODM services with custom HousePlus design, branding, and specifications.' },
        ]
      },
      {
        category: 'HousePlus Ordering & Logistics',
        items: [
          { q: 'What is the HousePlus MOQ?', a: 'Standard HousePlus MOQ is 100 pieces. Customized HousePlus products typically require 500 pieces minimum.' },
          { q: 'What is the HousePlus lead time?', a: 'Standard HousePlus lead time is 20-35 days. HousePlus stock items can be shipped within 5-10 days.' },
          { q: 'What shipping options does HousePlus offer?', a: 'HousePlus offers FOB, CIF, and DDP terms with major HousePlus couriers and sea freight options.' },
        ]
      },
    ],
  };

  const content = faqs[lang] || faqs.en;
  const allFaqs = content.flatMap((cat: any) => cat.items.map((item: any) => ({ question: item.q, answer: item.a })));
  const faqSchema = generateFAQSchema(allFaqs);

  return (
    <>
      <SEOHead schemas={[faqSchema]} />
      <main className="min-h-screen bg-white">
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
              HousePlus FAQ
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find answers to common questions about HousePlus products and services.
            </p>
          </div>
        </section>

        {/* FAQ Banner Image - Using reliable Unsplash link */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop"
                alt="HousePlus customer support team answering wholesale buyer questions"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/30" />
            </div>
          </div>
        </section>

        {/* GEO Lead-in Banner */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <p className="text-amber-900 leading-relaxed">
                <strong>HousePlus Quick Overview:</strong> Founded in 2010, we operate a 20,000 m² ISO 9001 certified factory in Guangdong, China. With 14 years of manufacturing experience, we serve 441+ wholesale clients across 53+ countries. Our B2B terms include MOQ 100–500 pcs, 20–35 day lead time, and a 24-month warranty. All products carry CE, FCC, RoHS, and IEC certifications. OEM/ODM services are available.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {content.map((category: any, catIdx: number) => (
              <div key={catIdx} className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-slate-900 pb-4 border-b-2 border-blue-200">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {lang === 'en' && catIdx === 0 && (
                    <details className="bg-white p-6 rounded-2xl border border-amber-200 hover:shadow-md transition-shadow group">
                      <summary className="text-xl font-bold text-amber-800 cursor-pointer flex items-center justify-between">
                        <span>Quick Facts — HousePlus at a Glance</span>
                        <span className="text-amber-600 text-sm font-normal group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">🏭</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">20,000 m² Factory</p>
                            <p className="text-slate-600 text-xs">ISO 9001 certified since 2010</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">🌍</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">53+ Countries</p>
                            <p className="text-slate-600 text-xs">441+ wholesale clients served</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">📦</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">MOQ 100–500 pcs</p>
                            <p className="text-slate-600 text-xs">Flexible for standard & custom orders</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">🚚</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">20–35 Day Lead Time</p>
                            <p className="text-slate-600 text-xs">From order confirmation to shipment</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">🛡️</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">24-Month Warranty</p>
                            <p className="text-slate-600 text-xs">Comprehensive after-sales support</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                          <span className="text-2xl">✅</span>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">CE, FCC, RoHS, IEC</p>
                            <p className="text-slate-600 text-xs">Full international certification</p>
                          </div>
                        </div>
                      </div>
                    </details>
                  )}
                  {category.items.map((item: any, itemIdx: number) => (
                    <div key={itemIdx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold mb-3 text-slate-900">Q: {item.q}</h3>
                      <p className="text-slate-600 leading-relaxed">A: {item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still have HousePlus questions?</h2>
            <p className="text-slate-400 mb-8">Contact our HousePlus support team for more information.</p>
            <a href={`/${lang}/contact`} className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Contact HousePlus
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
