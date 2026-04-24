import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { storyblokInit, apiPlugin } from '@storyblok/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HousePlus - Home Appliances & Solar Systems Wholesale',
  description: 'Professional manufacturer of home appliances, solar systems, and portable power stations for global wholesale buyers.',
  metadataBase: new URL('https://www.houseplus-ch.com'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || '',
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-blue-100 selection:text-blue-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
