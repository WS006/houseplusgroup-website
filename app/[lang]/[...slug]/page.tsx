import { getStoryblokApi, renderRichText } from '@storyblok/react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string[] }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const fullSlug = slug?.join('/') || '';
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.getStory(fullSlug, { 
      version: 'published', 
      language: lang,
      resolve_links: 'url',
      cv: Date.now()
    });
    
    const story = data.story;
    const title = story?.content?.title || story?.content?.Text || story?.name || fullSlug;
    const description = story?.content?.description || `Discover ${title} HousePlus solutions.`;
    
    return generateSEOMetadata({
      title: `${title} - HousePlus`,
      description,
      url: `/${lang}/${fullSlug}`,
      lang: lang as any,
      type: 'article',
    });
  } catch (error) {
    return generateSEOMetadata({
      title: `${fullSlug.charAt(0).toUpperCase() + fullSlug.slice(1)} - HousePlus`,
      description: `Explore professional HousePlus solutions.`,
      url: `/${lang}/${fullSlug}`,
      lang: lang as any,
      type: 'website',
    });
  }
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string[] }> } ) {
  const { lang, slug } = await params;
  const fullSlug = slug?.join('/') || '';
  const storyblokApi = getStoryblokApi();
  
  let story = null;
  let subStories: any[] = [];

  try {
    const { data } = await storyblokApi.getStory(fullSlug, { 
      version: 'published', 
      language: lang,
      resolve_links: 'url',
      cv: Date.now()
    });
    story = data.story;
  } catch (error) {
    console.log(`Story not found at ${fullSlug}`);
  }

  try {
    const { data: listData } = await storyblokApi.getStories({
      starts_with: fullSlug + '/',
      version: 'published',
      language: lang,
      cv: Date.now()
    });
    subStories = listData.stories || [];
  } catch (innerError) {
    console.error(`Error fetching sub-stories:`, innerError);
  }

  if (!story && subStories.length === 0) {
    notFound();
  }

  const schemas: any[] = [];
  if (story) {
    schemas.push(generateArticleSchema({
      title: story.content?.title || story.name,
      description: story.content?.description || '',
      url: `https://www.houseplus-ch.com/${lang}/${fullSlug}`,
      image: story.content?.image?.filename,
      lang,
      type: 'Article',
      datePublished: story.created_at,
      dateModified: story.updated_at,
    }));
  }

  return (
    <>
      <SEOHead schemas={schemas} />
      <main className="min-h-screen py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {story && (
            <div className="mb-20">
              <h1 className="text-5xl md:text-6xl font-black mb-12 text-slate-900 text-center">
                {story.content?.title || story.name}
              </h1>
              {(() => {
                const rawBody = story.content?.body || story.content?.Body || story.content?.description || '';
                const rendered = (typeof rawBody === 'object' && rawBody !== null) 
                  ? renderRichText(rawBody) 
                  : (typeof rawBody === 'string' ? rawBody : '');
                
                return rendered ? (
                  <div 
                    className="prose prose-xl max-w-none prose-slate shadow-2xl p-12 rounded-[3rem] border border-slate-50 bg-slate-50/30" 
                    dangerouslySetInnerHTML={{ __html: rendered }} 
                  />
                ) : null;
              })()}
            </div>
          )}

          {subStories.length > 0 && (
            <div>
              {!story && (
                <div className="text-center mb-16">
                  <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 capitalize">
                    HousePlus {fullSlug.split('/').pop()}
                  </h1>
                  <p className="text-slate-500 text-xl">Discover our full range of professional HousePlus solutions.</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {subStories.map((s: any) => {
                  // Reliable Unsplash images for products based on slug
                  let productImg = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'; // Default
                  if (s.full_slug.includes('solar')) productImg = 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&q=80';
                  if (s.full_slug.includes('appliance')) productImg = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80';
                  if (s.full_slug.includes('electronic')) productImg = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80';

                  return (
                    <a 
                      key={s.uuid} 
                      href={`/${lang}/${s.full_slug}`} 
                      className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-500 transition-all duration-500"
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img 
                          src={s.content?.image?.filename || productImg} 
                          alt={s.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-10 flex flex-col flex-grow">
                        <h2 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-blue-600 transition-colors">
                          {s.name}
                        </h2>
                        <p className="text-slate-500 line-clamp-2 mb-8 flex-grow">
                          {s.content?.description || 'Professional HousePlus grade solution designed for reliability and performance.'}
                        </p>
                        <div className="flex items-center text-blue-600 font-black text-sm uppercase tracking-widest">
                          View HousePlus Details
                          <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
