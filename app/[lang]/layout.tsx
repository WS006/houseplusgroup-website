import { storyblokInit, apiPlugin } from '@storyblok/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceWidget from '@/components/ServiceWidget';
import ChatBot from '@/components/ChatBot';
import BackToTop from '@/components/BackToTop';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || '',
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
});

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(lang)};document.documentElement.dir=${JSON.stringify(lang === 'ar' ? 'rtl' : 'ltr')}`,
        }}
      />
      <Header lang={lang} />
      <main className="min-h-screen">{children}</main>
      <Footer lang={lang} />
      <ServiceWidget lang={lang} />
      <ChatBot lang={lang} />
      <BackToTop />
    </>
  );
}
