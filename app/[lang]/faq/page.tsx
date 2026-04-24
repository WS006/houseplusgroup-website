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
    description: 'Find answers to frequently asked questions about HousePlus products, services, and ordering.',
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
          { q: 'How long has HousePlus been in business?', a: 'HousePlus was founded in 2010 and has over 10 years of HousePlus manufacturing and international trade experience.' },
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

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {content.map((category: any, catIdx: number) => (
              <div key={catIdx} className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-slate-900 pb-4 border-b-2 border-blue-200">
                  {category.category}
                </h2>
                <div className="space-y-6">
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
