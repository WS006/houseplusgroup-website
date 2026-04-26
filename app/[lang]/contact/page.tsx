import InquiryForm from '@/components/InquiryForm';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'Contact Us - Wholesale Support',
    es: 'Contactar - Soporte Mayorista',
    de: 'Kontaktieren - Großhandels-Support',
    fr: 'Contactez - Support Grossiste',
    ar: 'اتصل بنا - دعم الجملة',
  };
  
  const descriptions: Record<string, string> = {
    en: 'Contact us for wholesale inquiries, product information, and OEM/ODM services. Our sales team responds within 24 hours.',
    es: 'Póngase en contacto para consultas mayoristas y servicios OEM/ODM.',
    de: 'Kontaktieren Sie uns für Großhandelsanfragen und OEM/ODM-Services.',
    fr: 'Contactez-nous pour les demandes de gros et les services OEM/ODM.',
    ar: 'اتصل بنا للاستفسارات بالجملة وخدمات OEM/ODM.',
  };
  
  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['contact', 'inquiry', 'wholesale', 'sales', 'OEM', 'ODM'],
    url: `/${lang}/contact`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
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
              Contact Us
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-xl leading-relaxed">
              Fill out the form and our sales team will get back to you within 24 hours with a quote.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
              <InquiryForm lang={lang} />
            </div>
            
            <div className="space-y-8">
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl shadow-slate-200">
                <h2 className="text-2xl font-bold mb-6">Direct Contact</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-1">WhatsApp</p>
                    <a href="https://wa.me/8615578119543" className="text-xl font-bold hover:text-blue-400 transition-colors">+86 155 7811 9543</a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-1">Email</p>
                    <a href="mailto:jack@houseplus-ch.com" className="text-xl font-bold hover:text-blue-400 transition-colors">jack@houseplus-ch.com</a>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-1">WeChat</p>
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
