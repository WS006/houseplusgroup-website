import { getStoryblokApi } from '@storyblok/react';
import { notFound } from 'next/navigation';
import Carousel from '@/components/Carousel';
import IndustrySection from '@/components/IndustrySection';
import ServiceWidget from '@/components/ServiceWidget';

export const dynamic = 'force-dynamic';

async function getStory(slug: string, lang: string) {
  const storyblokApi = getStoryblokApi();
  try {
    const { data } = await storyblokApi.getStory(slug, { 
      version: 'published', 
      language: lang,
      resolve_links: 'url'
    });
    return data.story;
  } catch (error) {
    console.error(`Error fetching home for ${lang}:`, error);
    return null;
  }
}

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const story = await getStory('home', lang);

  if (!story) {
    notFound();
  }

  const content = story.content;

  return (
    <div className="relative">
      {/* Render bloks-based content */}
      {content.body && Array.isArray(content.body) && content.body.length > 0 ? (
        content.body.map((blok: any) => {
          if (blok.component === 'carousel') {
            return <Carousel key={blok._uid} items={blok.items || []} />;
          }
          if (blok.component === 'industry_section') {
            return <IndustrySection key={blok._uid} {...blok} />;
          }
          if (blok.component === 'service_widget') {
            return <ServiceWidget key={blok._uid} {...blok} />;
          }
          return null;
        })
      ) : (
        /* Fallback if body is empty */
        <main className="max-w-4xl mx-auto py-20 px-4">
          <h1 className="text-4xl font-bold mb-8">{content.title || 'Welcome to HousePlus'}</h1>
          <p className="text-gray-600">Content is being prepared. Please check back soon.</p>
        </main>
      )}

      {/* Always show ServiceWidget */}
      <ServiceWidget />
    </div>
  );
}
