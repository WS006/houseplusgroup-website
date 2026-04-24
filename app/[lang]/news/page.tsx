import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'News & Blog - HousePlus',
    es: 'Noticias y Blog - HousePlus',
    de: 'Nachrichten und Blog - HousePlus',
    fr: 'Actualités et Blog - HousePlus',
    ar: 'الأخبار والمدونة - HousePlus',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: 'Stay updated with the latest news, industry insights, and company updates from HousePlus.',
    keywords: ['news', 'blog', 'updates', 'industry', 'insights'],
    url: `/${lang}/news`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const news: Record<string, any[]> = {
    en: [
      {
        title: 'HousePlus Expands Solar Product Line',
        date: '2024-04-15',
        category: 'Product Launch',
        excerpt: 'We are excited to announce the launch of our new high-efficiency solar panel series with 22% efficiency rating.',
        image: 'https://images.unsplash.com/photo-1497440871597-41fa534db117?w=400&h=300&fit=crop',
      },
      {
        title: 'Achieving ISO 14001 Environmental Certification',
        date: '2024-03-20',
        category: 'Certification',
        excerpt: 'HousePlus has successfully obtained ISO 14001 certification, demonstrating our commitment to environmental management.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      },
      {
        title: 'Record Q1 Sales Growth',
        date: '2024-02-28',
        category: 'Company News',
        excerpt: 'HousePlus reports 35% year-over-year growth in Q1 2024, driven by strong demand for solar and smart home products.',
        image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=300&fit=crop',
      },
    ],
    es: [
      {
        title: 'HousePlus Expande la Línea de Productos Solares',
        date: '2024-04-15',
        category: 'Lanzamiento de Producto',
        excerpt: 'Nos complace anunciar el lanzamiento de nuestra nueva serie de paneles solares de alta eficiencia con calificación de eficiencia del 22%.',
        image: 'https://images.unsplash.com/photo-1497440871597-41fa534db117?w=400&h=300&fit=crop',
      },
      {
        title: 'Lograr la Certificación Ambiental ISO 14001',
        date: '2024-03-20',
        category: 'Certificación',
        excerpt: 'HousePlus ha obtenido exitosamente la certificación ISO 14001, demostrando nuestro compromiso con la gestión ambiental.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      },
      {
        title: 'Crecimiento Récord de Ventas en Q1',
        date: '2024-02-28',
        category: 'Noticias de la Empresa',
        excerpt: 'HousePlus reporta un crecimiento interanual del 35% en Q1 2024, impulsado por la fuerte demanda de productos solares y de hogar inteligente.',
        image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=300&fit=crop',
      },
    ],
  };

  const content = news[lang] || news.en;

  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
            {lang === 'en' && 'News & Blog'}
            {lang === 'es' && 'Noticias y Blog'}
            {lang === 'de' && 'Nachrichten und Blog'}
            {lang === 'fr' && 'Actualités et Blog'}
            {lang === 'ar' && 'الأخبار والمدونة'}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {lang === 'en' && 'Stay updated with the latest news and insights from HousePlus.'}
            {lang === 'es' && 'Manténgase actualizado con las últimas noticias e información de HousePlus.'}
            {lang === 'de' && 'Bleiben Sie mit den neuesten Nachrichten und Erkenntnissen von HousePlus auf dem Laufenden.'}
            {lang === 'fr' && 'Restez informé des dernières actualités et informations de HousePlus.'}
            {lang === 'ar' && 'ابق على اطلاع بأحدث الأخبار والمعلومات من HousePlus.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.map((article, idx) => (
              <article key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    {lang === 'en' && 'Read More →'}
                    {lang === 'es' && 'Leer Más →'}
                    {lang === 'de' && 'Mehr Lesen →'}
                    {lang === 'fr' && 'Lire la Suite →'}
                    {lang === 'ar' && 'اقرأ أكثر →'}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg text-slate-600 mb-8">
            {lang === 'en' && 'More articles coming soon. Subscribe to our newsletter for updates.'}
            {lang === 'es' && 'Más artículos próximamente. Suscríbase a nuestro boletín para actualizaciones.'}
            {lang === 'de' && 'Weitere Artikel folgen in Kürze. Abonnieren Sie unseren Newsletter für Updates.'}
            {lang === 'fr' && 'Plus d\'articles à venir bientôt. Abonnez-vous à notre newsletter pour les mises à jour.'}
            {lang === 'ar' && 'المزيد من المقالات قريباً. اشترك في نشرتنا الإخبارية للحصول على التحديثات.'}
          </p>
          <Link href={`/${lang}/contact`} className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
            {lang === 'en' && 'Subscribe'}
            {lang === 'es' && 'Suscribirse'}
            {lang === 'de' && 'Abonnieren'}
            {lang === 'fr' && 'S\'abonner'}
            {lang === 'ar' && 'اشترك'}
          </Link>
        </div>
      </section>
    </main>
  );
}
