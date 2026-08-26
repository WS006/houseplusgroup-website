import { storyblokInit, apiPlugin } from '@storyblok/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingTools from '@/components/FloatingTools';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || '',
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
});

export default async function LangLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

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
      <FloatingTools lang={lang} />
    </>
  );
}
