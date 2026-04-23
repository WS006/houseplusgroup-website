import { getStoryblokApi } from '@storyblok/react';
import { notFound } from 'next/navigation';
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
    console.error(`Error fetching home for ${lang}:`, error);
    return null;
  }
}

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  try {
    const { lang } = await params;

    // Validate language
    if (!isValidLocale(lang)) {
      notFound();
    }

    const story = await getStory('home', lang);

    if (!story) {
      console.error(`Home story not found for language: ${lang}`);
      notFound();
    }

    // Safely access content
    const content = story.content || {};
    const bloks = Array.isArray(content.body) ? content.body : [];

    return (
      <div className="relative">
        {/* Render bloks-based content */}
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
          /* Fallback if body is empty */
          <main className="max-w-4xl mx-auto py-20 px-4">
            <h1 className="text-4xl font-bold mb-8">
              {content.title || 'Welcome to HousePlus'}
            </h1>
            <p className="text-gray-600 text-lg">
              {content.description || 'Content is being prepared. Please check back soon.'}
            </p>
          </main>
        )}

        {/* Always show ServiceWidget */}
        <ServiceWidget />
      </div>
    );
  } catch (error) {
    console.error('Error in LangHome:', error);
    notFound();
  }
}
