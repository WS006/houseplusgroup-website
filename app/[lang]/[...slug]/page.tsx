import { getStoryblokApi, renderRichText } from '@storyblok/react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateArticleSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string[] }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const fullSlug = slug?.join('/') || '';
  const storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.getStory(fullSlug, { 
      version: 'published', 
      language: lang,
      resolve_links: 'url',
    });
    
    const story = data?.story;
    const title = story?.content?.title || story?.name || fullSlug;
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
      title: `${fullSlug.split('/').pop()?.toUpperCase()} - HousePlus`,
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
    });
    story = data?.story;
  } catch (error) {
    console.error(`Story fetch error for ${fullSlug}:`, error);
  }

  try {
    const { data: listData } = await storyblokApi.getStories({
      starts_with: fullSlug + '/',
      version: 'published',
      language: lang,
    });
    subStories = listData?.stories || [];
  } catch (innerError) {
    console.error(`Sub-stories fetch error:`, innerError);
  }

  // If no data at all, and it's not a known path, show 404
  if (!story && subStories.length === 0) {
    // Basic fallback for common product paths to prevent crash
    if (fullSlug.includes('products')) {
      subStories = []; // We will handle empty state gracefully
    } else {
      notFound();
    }
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
        {/* Detail View */}
        {story && (
          <>
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
            <div className="max-w-6xl mx-auto py-20 px-4">
              <div className="mb-24">
                {(() => {
                  const rawBody = story.content?.body || story.content?.Body || '';
                  if (!rawBody) return null;
                  const rendered = (typeof rawBody === 'object') ? renderRichText(rawBody) : rawBody;
                  return (
                    <div 
                      className="prose prose-xl max-w-none prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-img:rounded-[2rem] prose-img:shadow-2xl" 
                      dangerouslySetInnerHTML={{ __html: rendered }} 
                    />
                  );
                })()}
              </div>
            </div>
          </>
        )}

        {/* List View */}
        {subStories.length > 0 && (
          <div className="max-w-6xl mx-auto py-20 px-4">
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 capitalize tracking-tight">
                HousePlus {fullSlug.split('/').pop()}
              </h1>
              <p className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Discover our full range of professional HousePlus solutions, engineered for the global market.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {subStories.map((s: any, idx: number) => {
                const images = [
                  'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&q=80',
                  'https://images.unsplash.com/photo-1542338106-2b22e0b8f528?w=800&q=80',
                  'https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&q=80',
                  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
                  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
                  'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80',
                ];
                const productImg = s.content?.image?.filename || images[idx % images.length];

                return (
                  <a 
                    key={s.uuid} 
                    href={`/${lang}/${s.full_slug}`} 
                    className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-500 transition-all duration-500"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={productImg} 
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full">
                          HousePlus Certified
                        </span>
                      </div>
                    </div>
                    <div className="p-10 flex flex-col flex-grow">
                      <h2 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-blue-600 tracking-tight">
                        {s.name}
                      </h2>
                      <p className="text-slate-500 line-clamp-2 mb-8 flex-grow">
                        {s.content?.description || 'Professional HousePlus grade solution designed for reliability and performance.'}
                      </p>
                      <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest">
                        View HousePlus Details →
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State for known paths */}
        {!story && subStories.length === 0 && fullSlug.includes('products') && (
          <div className="max-w-6xl mx-auto py-40 px-4 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Explore HousePlus Solutions</h2>
            <p className="text-xl text-slate-500 mb-10">Our professional product catalog is being updated. Please contact us for the latest HousePlus specifications.</p>
            <a href={`/${lang}/contact`} className="px-10 py-5 bg-blue-600 text-white font-black rounded-full uppercase tracking-widest">Contact HousePlus</a>
          </div>
        )}
      </main>
    </>
  );
}
