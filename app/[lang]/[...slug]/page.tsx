import { getStoryblokApi, renderRichText } from '@storyblok/react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateArticleSchema } from '@/lib/schema-generator';

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
      <main className="min-h-screen bg-white">
        {/* Hero Section for Detail Page */}
        {story && (
          <div className="bg-slate-50 py-24 px-4 border-b border-slate-100">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight">
                {story.content?.title || story.name}
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                {story.content?.description || 'Professional HousePlus grade solution designed for reliability and performance.'}
              </p>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto py-20 px-4">
          {story && (
            <div className="mb-24">
              {(() => {
                const rawBody = story.content?.body || story.content?.Body || story.content?.description || '';
                const rendered = (typeof rawBody === 'object' && rawBody !== null) 
                  ? renderRichText(rawBody) 
                  : (typeof rawBody === 'string' ? rawBody : '');
                
                return rendered ? (
                  <div 
                    className="prose prose-xl max-w-none prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-img:rounded-[2rem] prose-img:shadow-2xl bg-white" 
                    dangerouslySetInnerHTML={{ __html: rendered }} 
                  />
                ) : null;
              })()}
            </div>
          )}

          {subStories.length > 0 && (
            <div>
              {!story && (
                <div className="text-center mb-20">
                  <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 capitalize tracking-tight">
                    HousePlus {fullSlug.split('/').pop()}
                  </h1>
                  <p className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                    Discover our full range of professional HousePlus solutions, engineered for the global market.
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {subStories.map((s: any, idx: number) => {
                  // Diversified Unsplash images for products
                  const images = [
                    'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&q=80', // Solar 1
                    'https://images.unsplash.com/photo-1542338106-2b22e0b8f528?w=800&q=80', // Solar 2
                    'https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&q=80', // Solar 3
                    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', // Appliance 1
                    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80', // Appliance 2
                    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80', // Appliance 3
                    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80', // Electronic 1
                    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80', // Electronic 2
                    'https://images.unsplash.com/photo-1526733169359-8117178eb75e?w=800&q=80', // Electronic 3
                  ];
                  
                  let productImg = images[idx % images.length];
                  if (s.full_slug.includes('solar')) productImg = images[idx % 3];
                  if (s.full_slug.includes('appliance')) productImg = images[3 + (idx % 3)];
                  if (s.full_slug.includes('electronic')) productImg = images[6 + (idx % 3)];

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
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                            HousePlus Certified
                          </span>
                        </div>
                      </div>
                      <div className="p-10 flex flex-col flex-grow">
                        <h2 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">
                          {s.name}
                        </h2>
                        <p className="text-slate-500 line-clamp-2 mb-8 flex-grow leading-relaxed">
                          {s.content?.description || 'Professional HousePlus grade solution designed for reliability and performance in global markets.'}
                        </p>
                        <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
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
