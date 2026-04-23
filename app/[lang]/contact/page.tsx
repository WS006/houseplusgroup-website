import InquiryForm from '../../../components/InquiryForm';

export const dynamic = 'force-dynamic';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
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
      </div>
    </main>
  );
}
