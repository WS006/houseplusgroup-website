import InquiryForm from '../../../components/InquiryForm';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import { Metadata } from 'next';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  
  const titles: Record<string, string> = {
    en: 'Contact HousePlus - Global Wholesale Support',
    es: 'Contactar a HousePlus - Soporte Mayorista Global',
    de: 'Kontaktieren Sie HousePlus - Globaler Großhandels-Support',
    fr: 'Contactez HousePlus - Support Grossiste Mondial',
    ar: 'اتصل بـ HousePlus - دعم الجملة العالمي',
  };

  const descriptions: Record<string, string> = {
    en: 'Contact HousePlus wholesale team for solar, appliance and 3C electronics inquiries. 24-hour response. WhatsApp +86 155 7811 9543. 16 years manufacturing experience. 20,000 m² ISO 9001 factory. MOQ 100 pcs, 20–35 day lead time. 441+ clients across 53+ countries.',
    es: 'Contact HousePlus wholesale team for solar, appliance and 3C electronics inquiries. 24-hour response. WhatsApp +86 155 7811 9543. 16 years manufacturing experience. 20,000 m² ISO 9001 factory. MOQ 100 pcs, 20–35 day lead time. 441+ clients across 53+ countries.',
    de: 'Contact HousePlus wholesale team for solar, appliance and 3C electronics inquiries. 24-hour response. WhatsApp +86 155 7811 9543. 16 years manufacturing experience. 20,000 m² ISO 9001 factory. MOQ 100 pcs, 20–35 day lead time. 441+ clients across 53+ countries.',
    fr: 'Contact HousePlus wholesale team for solar, appliance and 3C electronics inquiries. 24-hour response. WhatsApp +86 155 7811 9543. 16 years manufacturing experience. 20,000 m² ISO 9001 factory. MOQ 100 pcs, 20–35 day lead time. 441+ clients across 53+ countries.',
    ar: 'Contact HousePlus wholesale team for solar, appliance and 3C electronics inquiries. 24-hour response. WhatsApp +86 155 7811 9543. 16 years manufacturing experience. 20,000 m² ISO 9001 factory. MOQ 100 pcs, 20–35 day lead time. 441+ clients across 53+ countries.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['contact', 'inquiry', 'wholesale', 'sales', 'HousePlus', 'OEM', 'ODM'],
    url: `/${lang}/contact`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics',
    url: `https://www.houseplus-ch.com/${lang}/contact`,
    lang,
    type: 'Organization',
  });

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
              Contact HousePlus
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-xl leading-relaxed">
              Fill out the form and we'll get back to you within 24 hours with a quote.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
              <InquiryForm lang={lang} />
            </div>

            <div className="space-y-8">
              <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl shadow-blue-200">
                <h2 className="text-2xl font-bold mb-6">Why Choose HousePlus</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🏭</span>
                    <div>
                      <p className="font-bold text-sm">20,000 m² ISO 9001 Factory</p>
                      <p className="text-blue-100 text-xs">Guangdong, China — Founded 2010</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📞</span>
                    <div>
                      <p className="font-bold text-sm">WhatsApp +86 155 7811 9543</p>
                      <p className="text-blue-100 text-xs">24-hour response guaranteed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📧</span>
                    <div>
                      <p className="font-bold text-sm">jack@houseplus-ch.com</p>
                      <p className="text-blue-100 text-xs">Direct sales inquiry</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🌍</span>
                    <div>
                      <p className="font-bold text-sm">441+ Clients in 53+ Countries</p>
                      <p className="text-blue-100 text-xs">16 years of manufacturing trust</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <div>
                      <p className="font-bold text-sm">MOQ 100 pcs · 20–35 Day Lead Time</p>
                      <p className="text-blue-100 text-xs">12-month warranty · CE FCC RoHS</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl shadow-slate-200">
                <h2 className="text-2xl font-bold mb-6">Direct Contact</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-1">WhatsApp/Phone</p>
                    <a href="https://wa.me/8615578119543" className="text-xl font-bold hover:text-blue-400 transition-colors">+86 155 7811 9543</a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-1">Email</p>
                    <a href="mailto:jack@houseplus-ch.com" className="text-xl font-bold hover:text-blue-400 transition-colors">jack@houseplus-ch.com</a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-1">WeChat ID</p>
                    <p className="text-xl font-bold">JackHousePlus</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Business Hours</h2>
                <div className="space-y-4 text-slate-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Mon - Fri</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                  <p className="text-xs mt-6 pt-6 border-t border-slate-100 text-slate-400">
                    * All times are GMT+8 (China Standard Time).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
