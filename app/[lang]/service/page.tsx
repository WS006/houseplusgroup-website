import { Metadata } from 'next';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'HousePlus Services - OEM/ODM & Technical Support',
    es: 'Servicios HousePlus - OEM/ODM y Soporte Técnico',
    de: 'HousePlus Services - OEM/ODM und technischer Support',
    fr: 'Services HousePlus - OEM/ODM et Support Technique',
    ar: 'خدمات HousePlus - OEM/ODM والدعم الفني',
  };

  const descriptions: Record<string, string> = {
    en: 'Comprehensive OEM/ODM services, technical support, customization, and after-sales service from HousePlus.',
    es: 'Servicios integrales de OEM/ODM, soporte técnico, personalización y servicio posventa de HousePlus.',
    de: 'Umfassende OEM/ODM-Services, technischer Support, Anpassung und After-Sales-Service von HousePlus.',
    fr: 'Services OEM/ODM complets, support technique, personnalisation et service après-vente de HousePlus.',
    ar: 'خدمات OEM/ODM شاملة والدعم الفني والتخصيص وخدمة ما بعد البيع من HousePlus.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['OEM', 'ODM', 'service', 'support', 'customization', 'technical'],
    url: `/${lang}/service`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function ServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional OEM/ODM and technical support services',
    url: `https://www.houseplus-ch.com/${lang}/service`,
    lang,
    type: 'Organization',
  });

  const content: Record<string, any> = {
    en: {
      title: 'HousePlus Services',
      intro: 'HousePlus provides comprehensive OEM/ODM services, technical support, and customization solutions tailored to your business needs.',
      oem: 'HousePlus OEM/ODM Services',
      oemDesc: 'HousePlus offers full Original Equipment Manufacturing (OEM) and Original Design Manufacturing (ODM) services, allowing you to brand HousePlus products as your own.',
      oemServices: [
        { title: 'Custom HousePlus Design', desc: 'Work with our HousePlus engineering team to design products that meet your specifications.' },
        { title: 'HousePlus Brand Customization', desc: 'Custom HousePlus logos, packaging, and product branding.' },
        { title: 'HousePlus Specification Modification', desc: 'Tailor HousePlus product features to your specific market needs.' },
      ],
      technical: 'HousePlus Technical Support',
      technicalDesc: 'The HousePlus technical support team provides comprehensive assistance throughout the product lifecycle.',
      technicalServices: [
        { title: 'HousePlus Documentation', desc: 'Detailed HousePlus specifications, manuals, and technical guides.' },
        { title: 'HousePlus Installation Support', desc: 'Video guides and remote HousePlus installation assistance.' },
        { title: 'HousePlus Troubleshooting', desc: '24/7 technical support for all HousePlus products.' },
      ],
      afterSales: 'HousePlus After-Sales Service',
      afterSalesDesc: 'HousePlus stands behind our products with comprehensive after-sales support and warranty coverage.',
      afterSalesPoints: [
        'Extended HousePlus warranty options available',
        'HousePlus spare parts availability and supply',
        'HousePlus repair and replacement services',
        'HousePlus product lifecycle management',
      ],
      logistics: 'HousePlus Logistics & Shipping',
      logisticsDesc: 'HousePlus handles all aspects of international logistics to ensure timely delivery of your orders.',
      logisticsServices: [
        { title: 'HousePlus FOB Shipping', desc: 'Free on board pricing with flexible carrier selection.' },
        { title: 'HousePlus CIF Shipping', desc: 'Cost, insurance, and freight included by HousePlus.' },
        { title: 'HousePlus DDP Delivery', desc: 'HousePlus delivered duty paid to your destination.' },
      ],
      quality: 'HousePlus Quality Certification',
      qualityPoints: [
        'HousePlus ISO 9001:2015 Management',
        'HousePlus CE Mark Compliance',
        'HousePlus FCC Certification',
        'HousePlus RoHS Compliance',
      ],
    },
  };

  const data = content[lang] || content.en;

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">{data.title}</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">{data.intro}</p>
          </div>
        </section>

        {/* Service Banner Image - Using reliable Unsplash link */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&h=500&fit=crop"
                alt="HousePlus professional service team providing global wholesale support"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <p className="text-2xl md:text-3xl font-bold">
                    Comprehensive HousePlus Services for Global Wholesale Partners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OEM/ODM Services */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 text-center">{data.oem}</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">{data.oemDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.oemServices.map((service: any, idx: number) => (
                <div key={idx} className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Support */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 text-center">{data.technical}</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">{data.technicalDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.technicalServices.map((service: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* After-Sales Service */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 text-center">{data.afterSales}</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">{data.afterSalesDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.afterSalesPoints.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1 text-white text-xs">✓</div>
                  <p className="text-slate-600">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logistics */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 text-center">{data.logistics}</h2>
            <p className="text-lg text-slate-600 text-center mb-8 max-w-3xl mx-auto">{data.logisticsDesc}</p>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg mb-10">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=400&fit=crop"
                alt="HousePlus global logistics and shipping - international port operations"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.logisticsServices.map((service: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Certification */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-slate-900 text-center">{data.quality}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.qualityPoints.map((cert: string, idx: number) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center border-2 border-blue-200">
                  <p className="font-semibold text-slate-900">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Discuss Your HousePlus Service Needs?</h2>
            <a href={`/${lang}/contact`} className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Contact HousePlus Sales Team
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
