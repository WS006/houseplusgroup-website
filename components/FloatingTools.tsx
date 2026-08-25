'use client';

import dynamic from 'next/dynamic';

const ServiceWidget = dynamic(() => import('@/components/ServiceWidget'), { ssr: false });
const ChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false });
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false });

export default function FloatingTools({ lang }: { lang: string }) {
  return (
    <>
      <ServiceWidget lang={lang} />
      <ChatBot lang={lang} />
      <BackToTop />
    </>
  );
}
