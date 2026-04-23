import { notFound } from 'next/navigation';
import { getStoryblokApi, StoryblokComponent } from '@storyblok/react';
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
    return null;
  }
}

export default async function CatchAllPage({ params }: { params: Promise<{ lang: string; not_found: string[] }> }) {
  const { lang, not_found: slugArray } = await params;
  const fullSlug = slugArray?.join('/') || 'home';

  const story = await getStory(fullSlug, lang);
  if (!story) notFound();

  return (
    <div className="relative">
      {story.content.body?.map((blok: any) => {
        if (blok.component === 'carousel') {
          return <Carousel key={blok._uid} items={blok.items} />;
        }
        if (blok.component === 'industry_section') {
          return <IndustrySection key={blok._uid} {...blok} />;
        }
        if (blok.component === 'service_widget') {
          return <ServiceWidget key={blok._uid} {...blok} />;
        }
        // Fallback for other components if any
        return <div key={blok._uid} className="py-10 text-center">Component: {blok.component}</div>;
      })}
      
      {/* Always show ServiceWidget if not in body, or as a global fallback */}
      <ServiceWidget />
      
      {/* Basic content rendering if body is empty but it's a page */}
      {(!story.content.body || story.content.body.length === 0) && (
        <main className="max-w-4xl mx-auto py-20 px-4">
          <h1 className="text-4xl font-bold mb-8">{story.name}</h1>
          <p className="text-gray-600">Content for this page is being prepared.</p>
        </main>
      )}
    </div>
  );
}
