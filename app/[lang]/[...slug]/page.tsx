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
    const description = story?.content?.description || story?.content?.Text || `Discover ${title} at HousePlus`;
    
    return generateSEOMetadata({
      title,
      description,
      url: `/${lang}/${fullSlug}`,
      lang: lang as any,
      type: 'article',
    });
  } catch (error) {
    return generateSEOMetadata({
      title: fullSlug.charAt(0).toUpperCase() + fullSlug.slice(1),
      description: `Explore ${fullSlug} at HousePlus`,
      url: `/${lang}/${fullSlug}`,
      lang: lang as any,
      type: 'website',
    });
  }
}

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
      resolve_links: 'url',
      cv: Date.now()
    });
    story = data.story;
  } catch (error) {
    console.log(`Story not found at ${fullSlug}, checking if it is a folder...`);
  }

  // 2. Check if it's a folder (like /products)
  try {
    const { data: listData } = await storyblokApi.getStories({
      starts_with: fullSlug + '/',
      version: 'published',
      language: lang,
      cv: Date.now()
    });
    subStories = listData.stories || [];
  } catch (innerError) {
    console.error(`Error fetching sub-stories for ${fullSlug}:`, innerError);
  }

  if (!story && subStories.length === 0) {
    notFound();
  }

  // Generate structured data schemas
  const schemas: any[] = [];
  
  if (story) {
    const articleSchema = generateArticleSchema({
      title: story.content?.title || story.name,
      description: story.content?.description || '',
      url: `https://www.houseplus-ch.com/${lang}/${fullSlug}`,
      image: story.content?.image?.filename,
      lang,
      type: 'Article',
      datePublished: story.created_at,
      dateModified: story.updated_at,
    });
    schemas.push(articleSchema);
    
    // Add FAQ schema if content contains FAQ data
    if (story.content?.faq && Array.isArray(story.content.faq)) {
      const faqSchema = generateFAQSchema(story.content.faq);
      schemas.push(faqSchema);
    }
  }
  
  // Add breadcrumb schema
  const breadcrumbItems = [
    { name: 'Home', url: `https://www.houseplus-ch.com/${lang}` },
    ...slug.map((s, i) => ({
      name: s.charAt(0).toUpperCase() + s.slice(1),
      url: `https://www.houseplus-ch.com/${lang}/${slug.slice(0, i + 1).join('/')}`
    }))
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  schemas.push(breadcrumbSchema);

  return (
    <>
      <SEOHead schemas={schemas} />
      <main className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Story Content Rendering */}
        {story && (
          <div className="mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-slate-900 text-center">
              {story.content?.title || story.content?.Text || story.content?.heading || story.name}
            </h1>
            
            {/* Universal Body Rendering */}
            {(() => {
              const rawBody = story.content?.body || story.content?.Body || story.content?.description || '';
              const rendered = (typeof rawBody === 'object' && rawBody !== null) 
                ? renderRichText(rawBody) 
                : (typeof rawBody === 'string' ? rawBody : '');
              
              return rendered ? (
                <div 
                  className="prose prose-lg md:prose-xl max-w-none prose-slate prose-img:rounded-3xl prose-headings:text-slate-900 shadow-sm p-8 md:p-12 rounded-[2rem] border border-slate-50 bg-slate-50/20" 
                  dangerouslySetInnerHTML={{ __html: rendered }} 
                />
              ) : null;
            })()}
          </div>
        )}

        {/* Sub-items/Folder Rendering (e.g., Products List) */}
        {subStories.length > 0 && (
          <div>
            {!story && (
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 capitalize">
                  {fullSlug.split('/').pop()}
                </h1>
                <p className="text-slate-500 text-lg">Discover our full range of professional solutions.</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {subStories.map((s: any) => {
                // Try to find an image in the content
                const findImage = (obj: any): string | null => {
                  if (!obj) return null;
                  if (obj.type === 'image' && obj.attrs?.src) return obj.attrs.src;
                  if (Array.isArray(obj.content)) {
                    for (const child of obj.content) {
                      const found = findImage(child);
                      if (found) return found;
                    }
                  }
                  if (typeof obj === 'object') {
                    for (const key in obj) {
                      const found = findImage(obj[key]);
                      if (found) return found;
                    }
                  }
                  return null;
                };

                const imageUrl = findImage(s.content);

                return (
                  <a 
                    key={s.uuid} 
                    href={`/${lang}/${s.full_slug}`} 
                    className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:border-blue-500 transition-all duration-500"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={s.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-5xl">📦</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                        {s.name}
                      </h2>
                      <p className="text-slate-500 line-clamp-2 mb-6 flex-grow">
                        {s.content?.Text || s.content?.description || 'Professional grade solution designed for reliability and performance.'}
                      </p>
                      <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider">
                        View Details
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
