import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'Careers at HousePlus - Join Our Team',
    es: 'Carreras en HousePlus - Únete a Nuestro Equipo',
    de: 'Karriere bei HousePlus - Treten Sie unserem Team bei',
    fr: 'Carrières chez HousePlus - Rejoignez notre équipe',
    ar: 'الوظائف في HousePlus - انضم إلى فريقنا',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: 'Explore career opportunities at HousePlus. Join our growing team of professionals.',
    keywords: ['careers', 'jobs', 'employment', 'opportunities'],
    url: `/${lang}/careers`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
            {lang === 'en' && 'Careers at HousePlus'}
            {lang === 'es' && 'Carreras en HousePlus'}
            {lang === 'de' && 'Karriere bei HousePlus'}
            {lang === 'fr' && 'Carrières chez HousePlus'}
            {lang === 'ar' && 'الوظائف في HousePlus'}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {lang === 'en' && 'Join our team and be part of a global manufacturing leader.'}
            {lang === 'es' && 'Únete a nuestro equipo y sé parte de un líder mundial en fabricación.'}
            {lang === 'de' && 'Treten Sie unserem Team bei und werden Sie Teil eines globalen Fertigungsführers.'}
            {lang === 'fr' && 'Rejoignez notre équipe et faites partie d\'un leader mondial de la fabrication.'}
            {lang === 'ar' && 'انضم إلى فريقنا وكن جزءاً من قائد التصنيع العالمي.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg text-slate-600 mb-8">
            {lang === 'en' && 'We are currently updating our careers page with open positions. Please check back soon or contact us directly.'}
            {lang === 'es' && 'Actualmente estamos actualizando nuestra página de carreras con posiciones abiertas. Por favor, vuelve pronto o contáctanos directamente.'}
            {lang === 'de' && 'Wir aktualisieren derzeit unsere Karriereseite mit offenen Stellen. Bitte schauen Sie bald vorbei oder kontaktieren Sie uns direkt.'}
            {lang === 'fr' && 'Nous mettons actuellement à jour notre page de carrières avec des postes ouverts. Veuillez revenir bientôt ou nous contacter directement.'}
            {lang === 'ar' && 'نحن نقوم حالياً بتحديث صفحة الوظائف الخاصة بنا مع المناصب المفتوحة. يرجى العودة قريباً أو الاتصال بنا مباشرة.'}
          </p>
          <Link href={`/${lang}/contact`} className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
            {lang === 'en' && 'Contact Us'}
            {lang === 'es' && 'Contáctenos'}
            {lang === 'de' && 'Kontaktieren Sie uns'}
            {lang === 'fr' && 'Nous contacter'}
            {lang === 'ar' && 'اتصل بنا'}
          </Link>
        </div>
      </section>
    </main>
  );
}
