import InquiryForm from '../../../components/InquiryForm';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';
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
    es: 'Contacte al equipo mayorista de HousePlus para consultas de energía solar, electrodomésticos y electrónica 3C. Respuesta en 24 horas. WhatsApp +86 155 7811 9543. 16 años de experiencia. Fábrica ISO 9001 de 20.000 m². MOQ 100 pcs, entrega 20–35 días. 441+ clientes en 53+ países.',
    de: 'Kontaktieren Sie das HousePlus-Großhandelsteam für Anfragen zu Solar, Haushaltsgeräten und 3C-Elektronik. Antwort in 24 Stunden. WhatsApp +86 155 7811 9543. 16 Jahre Erfahrung. ISO 9001 Fabrik mit 20.000 m². MOQ 100 Stk., Lieferzeit 20–35 Tage. 441+ Kunden in 53+ Ländern.',
    fr: 'Contactez l\'équipe de vente en gros HousePlus pour les demandes de solaire, d\'électroménager et d\'électronique 3C. Réponse en 24 heures. WhatsApp +86 155 7811 9543. 16 ans d\'expérience. Usine ISO 9001 de 20 000 m². MOQ 100 pcs, délai 20–35 jours. 441+ clients dans 53+ pays.',
    ar: 'اتصل بفريق الجملة في HousePlus لاستفسارات الطاقة الشمسية والأجهزة المنزلية والإلكترونيات 3C. رد خلال 24 ساعة. واتساب +86 155 7811 9543. 16 سنة خبرة. مصنع ISO 9001 بمساحة 20,000 م². الحد الأدنى 100 قطعة، تسليم 20–35 يوم. 441+ عميل في 53+ دولة.',
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

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://www.houseplus-ch.com/${lang}` },
    { name: 'Contact', url: `https://www.houseplus-ch.com/${lang}/contact` },
  ]);

  return (
    <>
      <SEOHead schemas={[organizationSchema, breadcrumbSchema]} />
      <main className="min-h-screen py-20 px-4 bg-slate-50">
        <Breadcrumb lang={lang} slug="contact" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-8 rounded-3xl bg-white px-8 py-5 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100">
              <img
                src="https://images.houseplus-ch.com/media/d52528a6-ba27-4a75-9dea-a7c36c2780e7/"
                alt="HousePlus logo"
                title="HousePlus global wholesale manufacturer logo"
                className="h-14 w-auto object-contain md:h-[4.5rem]"
               decoding="async" />
            </div>
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
