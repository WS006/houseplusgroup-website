import { notFound } from 'next/navigation';
import { getStoryblokApi } from '@storyblok/react';
import Carousel from '@/components/Carousel';
import IndustrySection from '@/components/IndustrySection';
import ServiceWidget from '@/components/ServiceWidget';
import { isValidLocale } from '@/lib/i18n-config';

export const dynamic = 'force-dynamic';

async function getStory(slug: string, lang: string) {
  try {
    const storyblokApi = getStoryblokApi();
    if (!storyblokApi) {
      console.error('Storyblok API not initialized');
      return null;
    }

    const { data } = await storyblokApi.getStory(slug, { 
      version: 'published', 
      language: lang,
      resolve_links: 'url'
    });
    
    return data?.story || null;
  } catch (error) {
    console.error(`Error fetching story "${slug}" for language "${lang}":`, error);
    return null;
  }
}

export default async function CatchAllPage({ 
  params 
}: { 
  params: Promise<{ lang: string; not_found?: string[] }> 
}) {
  try {
    const { lang, not_found: slugArray } = await params;

    // Validate language
    if (!isValidLocale(lang)) {
      notFound();
    }

    // Construct the slug
    const fullSlug = slugArray && slugArray.length > 0 ? slugArray.join('/') : 'home';

    // Fetch the story
    const story = await getStory(fullSlug, lang);
    
    if (!story) {
      console.error(`Story not found: ${fullSlug} in ${lang}`);
      notFound();
    }

    // Safely access content
    const content = story.content || {};
    const bloks = Array.isArray(content.body) ? content.body : [];

    return (
      <div className="relative">
        {/* Render bloks if available */}
        {bloks.length > 0 ? (
          bloks.map((blok: any) => {
            if (!blok || !blok._uid) return null;

            try {
              if (blok.component === 'carousel') {
                return (
                  <Carousel 
                    key={blok._uid} 
                    items={Array.isArray(blok.items) ? blok.items : []} 
                  />
                );
              }
              if (blok.component === 'industry_section') {
                return (
                  <IndustrySection 
                    key={blok._uid} 
                    title={blok.title || 'Industry Section'}
                    description={blok.description || ''}
                    image={blok.image || { filename: '', alt: '' }}
                    industry_type={blok.industry_type || 'solar'}
                    button_link={blok.button_link}
                    button_text={blok.button_text}
                  />
                );
              }
              if (blok.component === 'service_widget') {
                return <ServiceWidget key={blok._uid} />;
              }
              
              // Fallback for unknown components
              return (
                <div 
                  key={blok._uid} 
                  className="py-10 text-center text-gray-500"
                >
                  Component type "{blok.component}" is not supported yet
                </div>
              );
            } catch (blokError) {
              console.error(`Error rendering blok ${blok._uid}:`, blokError);
              return null;
            }
          })
        ) : (
          /* Fallback content when no bloks */
          <main className="max-w-4xl mx-auto py-20 px-4">
            <h1 className="text-4xl font-bold mb-8">
              {content.title || story.name || 'Welcome'}
            </h1>
            <p className="text-gray-600 text-lg">
              {content.description || 'Content for this page is being prepared.'}
            </p>
          </main>
        )}

        {/* Always show ServiceWidget as a global element */}
        <ServiceWidget />
      </div>
    );
  } catch (error) {
    console.error('Error in CatchAllPage:', error);
    notFound();
  }
}
