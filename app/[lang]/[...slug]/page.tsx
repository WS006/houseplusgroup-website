import { getStoryblokApi, renderRichText } from '@storyblok/react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string[] }> }) {
  const { lang, slug } = await params;
  const fullSlug = slug?.join('/') || '';
  const storyblokApi = getStoryblokApi();
  
  let story = null;
  let subStories: any[] = [];

  try {
    // 1. Try to fetch the specific story
    const { data } = await storyblokApi.getStory(fullSlug, { 
      version: 'published', 
      language: lang,
      resolve_links: 'url'
    });
    story = data.story;
  } catch (error) {
    console.log(`Story not found at ${fullSlug}, checking if it is a folder...`);
  }

  // 2. Check if it's a folder (like /products) by fetching children
  try {
    const { data: listData } = await storyblokApi.getStories({
      starts_with: fullSlug + '/',
      version: 'published',
      language: lang,
    });
    subStories = listData.stories || [];
  } catch (innerError) {
    console.error(`Error fetching sub-stories for ${fullSlug}:`, innerError);
  }

  // If nothing found at all
  if (!story && subStories.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* If we have a direct story, render its content */}
        {story && (
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
              {story.content?.title || story.content?.Text || story.name}
            </h1>
            {story.content?.body && (
              <div 
                className="prose prose-lg max-w-none prose-img:rounded-xl prose-headings:text-gray-900" 
                dangerouslySetInnerHTML={{ __html: renderRichText(story.content.body) }} 
              />
            )}
          </div>
        )}

        {/* If this is a folder/category page, show the list of sub-items */}
        {subStories.length > 0 && (
          <div>
            {!story && (
              <h1 className="text-4xl font-bold mb-12 text-gray-900 text-center capitalize">
                {fullSlug.split('/').pop()}
              </h1>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subStories.map((s: any) => (
                <a 
                  key={s.uuid} 
                  href={`/${lang}/${s.full_slug}`} 
                  className="group block p-6 border border-gray-100 rounded-2xl hover:shadow-xl hover:border-blue-500 transition-all bg-gray-50"
                >
                  {s.content?.body?.content?.find((c: any) => c.type === 'image') && (
                    <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-200">
                       <img 
                        src={s.content.body.content.find((c: any) => c.type === 'image').attrs.src} 
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                       />
                    </div>
                  )}
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{s.name}</h2>
                  <p className="text-gray-600 line-clamp-2 text-sm">
                    {s.content?.Text || 'Click to view product details and specifications.'}
                  </p>
                  <div className="mt-4 text-blue-500 font-medium text-sm flex items-center">
                    Learn more 
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
