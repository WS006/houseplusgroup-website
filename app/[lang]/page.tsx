import { draftMode } from 'next/headers';
import { storyblokApi } from '@/lib/storyblok';
import { generateMetadata as generateMeta } from '@/lib/seo-utils';
import { renderRichText } from '@storyblok/react';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return generateMeta({
    title: 'HousePlus CH | Professional Solar & Home Appliances Manufacturer',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics for global wholesale buyers.',
    url: `/${lang}`,
    lang: lang as any,
    type: 'website',
  });
}

async function getHomeContent(lang: string) {
  try {
    const { isEnabled } = draftMode();
    const sb = await storyblokApi();
    const res = await sb.get('home', {
      version: isEnabled ? 'draft' : 'published',
      language: lang,
    });
    return res.data?.story?.content || null;
  } catch (err) {
    console.error('Storyblok 加载失败', err);
    return null;
  }
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const content = await getHomeContent(lang);

  if (!content) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center p-10">
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome to HousePlus CH</h1>
          <p className="text-gray-600">Content for this page is being prepared.</p>
        </div>
      </main>
    );
  }

  const title = content.title || content.Text || 'Home';
  const renderedBody = content.body ? renderRichText(content.body) : content.description || '';

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center">{title}</h1>
        {renderedBody && (
          <div 
            className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: typeof renderedBody === 'string' ? renderedBody : '' }} 
          />
        )}
      </div>
    </main>
  );
}
