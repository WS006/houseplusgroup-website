import { storyblokInit, apiPlugin } from '@storyblok/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import '../globals.css';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isRTL = params.lang === 'ar';
  return (
    <html lang={params.lang} dir={isRTL ? 'rtl' : 'ltr'}>
      <body>
        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}
