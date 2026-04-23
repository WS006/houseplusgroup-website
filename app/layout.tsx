import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { storyblokInit, apiPlugin } from '@storyblok/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HousePlus - Home Appliances & Solar Systems Wholesale',
  description: 'Professional manufacturer of home appliances, solar systems, and portable power stations for global wholesale buyers.',
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
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}