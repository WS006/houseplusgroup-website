import Link from 'next/link';

interface Props {
  lang: string;
}

export default function NotFoundContent({ lang }: Props) {
  const messages: Record<string, { title: string; message: string; back: string; popular: string; products: string; about: string; contact: string; news: string }> = {
    en: {
      title: 'Page Not Found',
      message: 'Sorry, the page you are looking for doesn\'t exist or has been moved.',
      back: 'Go to Homepage',
      popular: 'Popular pages:',
      products: 'Products',
      about: 'About Us',
      contact: 'Contact',
      news: 'News',
    },
    es: {
      title: 'Página no encontrada',
      message: 'Lo sentimos, la página que buscas no existe o ha sido movida.',
      back: 'Ir al inicio',
      popular: 'Páginas populares:',
      products: 'Productos',
      about: 'Sobre Nosotros',
      contact: 'Contacto',
      news: 'Noticias',
    },
    de: {
      title: 'Seite nicht gefunden',
      message: 'Entschuldigung, die gesuchte Seite existiert nicht oder wurde verschoben.',
      back: 'Zur Startseite',
      popular: 'Beliebte Seiten:',
      products: 'Produkte',
      about: 'Über Uns',
      contact: 'Kontakt',
      news: 'Neuigkeiten',
    },
    fr: {
      title: 'Page non trouvée',
      message: 'Désolé, la page que vous recherchez n\'existe pas ou a été déplacée.',
      back: 'Aller à l\'accueil',
      popular: 'Pages populaires:',
      products: 'Produits',
      about: 'À Propos',
      contact: 'Contact',
      news: 'Actualités',
    },
    ar: {
      title: 'الصفحة غير موجودة',
      message: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      back: 'العودة إلى الرئيسية',
      popular: 'الصفحات الشائعة:',
      products: 'المنتجات',
      about: 'من نحن',
      contact: 'اتصل بنا',
      news: 'الأخبار',
    },
  };
  const t = messages[lang] || messages.en;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-md">
        {/* 404 图标 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200">404</div>
        </div>

        {/* 标题 */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {t.title}
        </h1>

        {/* 描述 */}
        <p className="text-lg text-gray-600 mb-8">
          {t.message}
        </p>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${lang}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            🏠 {t.back}
          </Link>
        </div>

        {/* 常用链接 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">{t.popular}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href={`/${lang}/products`} className="text-blue-600 hover:underline text-sm">{t.products}</Link>
            <span className="text-gray-300">|</span>
            <Link href={`/${lang}/about-us`} className="text-blue-600 hover:underline text-sm">{t.about}</Link>
            <span className="text-gray-300">|</span>
            <Link href={`/${lang}/contact`} className="text-blue-600 hover:underline text-sm">{t.contact}</Link>
            <span className="text-gray-300">|</span>
            <Link href={`/${lang}/news`} className="text-blue-600 hover:underline text-sm">{t.news}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
