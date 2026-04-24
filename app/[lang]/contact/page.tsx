import InquiryForm from '../../../components/InquiryForm';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'Contact HousePlus - Get in Touch with Our Sales Team',
    es: 'Contactar a HousePlus - Póngase en contacto con nuestro equipo de ventas',
    de: 'Kontaktieren Sie HousePlus - Treten Sie mit unserem Vertriebsteam in Verbindung',
    fr: 'Contactez HousePlus - Entrez en contact avec notre équipe commerciale',
    ar: 'اتصل بـ HousePlus - تواصل مع فريق المبيعات لدينا',
  };

  const descriptions: Record<string, string> = {
    en: 'Contact HousePlus for wholesale inquiries, product information, and OEM/ODM services. Our sales team responds within 24 hours.',
    es: 'Póngase en contacto con HousePlus para consultas mayoristas, información de productos y servicios OEM/ODM. Nuestro equipo de ventas responde en 24 horas.',
    de: 'Kontaktieren Sie HousePlus für Großhandelsinquirien, Produktinformationen und OEM/ODM-Services. Unser Vertriebsteam antwortet innerhalb von 24 Stunden.',
    fr: 'Contactez HousePlus pour les demandes de gros, les informations sur les produits et les services OEM/ODM. Notre équipe commerciale répond dans les 24 heures.',
    ar: 'اتصل بـ HousePlus للاستفسارات بالجملة ومعلومات المنتجات وخدمات OEM/ODM. يرد فريق المبيعات لدينا خلال 24 ساعة.',
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

  // Generate organization schema with contact information
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
      <main className="min-h-screen py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            {lang === 'en' && 'Contact Us'}
            {lang === 'es' && 'Contáctenos'}
            {lang === 'de' && 'Kontaktieren Sie uns'}
            {lang === 'fr' && 'Contactez-nous'}
            {lang === 'ar' && 'اتصل بنا'}
          </h1>
          <p className="text-center text-gray-600 mb-12 text-lg">
            {lang === 'en' && 'Fill out the form below and our sales team will get back to you within 24 hours.'}
            {lang === 'es' && 'Complete el formulario y nuestro equipo de ventas le responderá en 24 horas.'}
            {lang === 'de' && 'Füllen Sie das Formular aus und unser Vertriebsteam wird sich innerhalb von 24 Stunden bei Ihnen melden.'}
            {lang === 'fr' && 'Remplissez le formulaire et notre équipe commerciale vous répondra dans les 24 heures.'}
            {lang === 'ar' && 'املأ النموذج أدناه وسيقوم فريق المبيعات لدينا بالرد عليك في غضون 24 ساعة.'}
          </p>
          <InquiryForm lang={lang} />

          {/* Contact Information Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {lang === 'en' && 'Direct Contact'}
                {lang === 'es' && 'Contacto Directo'}
                {lang === 'de' && 'Direkter Kontakt'}
                {lang === 'fr' && 'Contact Direct'}
                {lang === 'ar' && 'الاتصال المباشر'}
              </h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900">WhatsApp/Phone:</p>
                  <a href="https://wa.me/8615578119543" className="text-blue-600 hover:underline">+86 15578119543</a>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email:</p>
                  <a href="mailto:jack@houseplus-ch.com" className="text-blue-600 hover:underline">jack@houseplus-ch.com</a>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">WeChat:</p>
                  <p>JackHousePlus</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone (Alternative):</p>
                  <p>+234 9078080738</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {lang === 'en' && 'Business Hours'}
                {lang === 'es' && 'Horario de Atención'}
                {lang === 'de' && 'Geschäftszeiten'}
                {lang === 'fr' && 'Heures d\'ouverture'}
                {lang === 'ar' && 'ساعات العمل'}
              </h2>
              <div className="space-y-2 text-gray-600">
                <p>
                  {lang === 'en' && 'Monday - Friday: 9:00 AM - 6:00 PM (GMT+8)'}
                  {lang === 'es' && 'Lunes - Viernes: 9:00 AM - 6:00 PM (GMT+8)'}
                  {lang === 'de' && 'Montag - Freitag: 9:00 Uhr - 18:00 Uhr (GMT+8)'}
                  {lang === 'fr' && 'Lundi - Vendredi: 9:00 - 18:00 (GMT+8)'}
                  {lang === 'ar' && 'الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً (GMT+8)'}
                </p>
                <p>
                  {lang === 'en' && 'Saturday: 10:00 AM - 4:00 PM (GMT+8)'}
                  {lang === 'es' && 'Sábado: 10:00 AM - 4:00 PM (GMT+8)'}
                  {lang === 'de' && 'Samstag: 10:00 Uhr - 16:00 Uhr (GMT+8)'}
                  {lang === 'fr' && 'Samedi: 10:00 - 16:00 (GMT+8)'}
                  {lang === 'ar' && 'السبت: 10:00 صباحاً - 4:00 مساءً (GMT+8)'}
                </p>
                <p className="text-sm mt-4">
                  {lang === 'en' && 'We respond to all inquiries within 24 hours.'}
                  {lang === 'es' && 'Respondemos a todas las consultas en 24 horas.'}
                  {lang === 'de' && 'Wir beantworten alle Anfragen innerhalb von 24 Stunden.'}
                  {lang === 'fr' && 'Nous répondons à toutes les demandes dans les 24 heures.'}
                  {lang === 'ar' && 'نرد على جميع الاستفسارات في غضون 24 ساعة.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
