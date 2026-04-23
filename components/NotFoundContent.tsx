import Link from 'next/link';

interface Props {
  lang: string;
}

export default function NotFoundContent({ lang }: Props) {
  const messages: Record<string, { title: string; message: string; back: string }> = {
    en: { title: '404 - Page Not Found', message: 'Sorry, the page you are looking for does not exist.', back: 'Return to Home' },
    es: { title: '404 - Página no encontrada', message: 'Lo sentimos, la página que buscas no existe.', back: 'Volver al inicio' },
    de: { title: '404 - Seite nicht gefunden', message: 'Entschuldigung, die gesuchte Seite existiert nicht.', back: 'Zurück zur Startseite' },
    fr: { title: '404 - Page non trouvée', message: 'Désolé, la page que vous recherchez n\'existe pas.', back: 'Retour à l\'accueil' },
    ar: { title: '404 - الصفحة غير موجودة', message: 'عذراً، الصفحة التي تبحث عنها غير موجودة.', back: 'العودة إلى الرئيسية' },
  };
  const t = messages[lang] || messages.en;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-6xl font-bold text-gray-800">{t.title}</h1>
      <p className="mt-4 text-xl text-gray-600">{t.message}</p>
      <Link href={`/${lang}`} className="mt-6 text-blue-600 hover:underline">
        {t.back}
      </Link>
    </div>
  );
}
