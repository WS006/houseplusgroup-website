'use client';
import { useEffect, useState } from 'react';
import { getStoryblokApi, renderRichText } from '@storyblok/react';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const lang = params.lang as string;
  const slug = params.slug as string[];
  const fullSlug = slug?.join('/') || '';
  
  const [story, setStory] = useState<any>(null);
  const [subStories, setSubStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storyblokApi = getStoryblokApi();
      try {
        const { data } = await storyblokApi.getStory(fullSlug, { 
          version: 'published', 
          language: lang,
          resolve_links: 'url',
        });
        setStory(data?.story);
      } catch (e) {
        console.error('Error fetching story:', e);
      }

      try {
        const { data: listData } = await storyblokApi.getStories({
          starts_with: fullSlug + '/',
          version: 'published',
          language: lang,
        });
        setSubStories(listData?.stories || []);
      } catch (e) {
        console.error('Error fetching sub-stories:', e);
      }
      setLoading(false);
    };
    fetchData();
  }, [fullSlug, lang]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-50 py-24 px-4 border-b border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight">
            {story?.content?.title || story?.name || fullSlug.split('/').pop()?.toUpperCase()}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            {story?.content?.description || 'Professional HousePlus grade solution designed for reliability and performance.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-20 px-4">
        {/* Detail Content */}
        {story?.content?.body && (
          <div className="mb-24 prose prose-xl max-w-none prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-img:rounded-[2rem] prose-img:shadow-2xl" 
               dangerouslySetInnerHTML={{ __html: renderRichText(story.content.body) || '' }} />
        )}

        {/* List Content */}
        {subStories.length > 0 && (
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
                <a key={s.uuid} href={`/${lang}/${s.full_slug}`} className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-blue-500 transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={productImg} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full">HousePlus Certified</span>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <h2 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-blue-600 tracking-tight">{s.name}</h2>
                    <p className="text-slate-500 line-clamp-2 mb-8 flex-grow">{s.content?.description || 'Professional HousePlus grade solution designed for reliability and performance.'}</p>
                    <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest">View HousePlus Details →</div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!story && subStories.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Explore HousePlus Solutions</h2>
            <p className="text-slate-500 mb-8">Our professional product catalog is being updated. Please contact us for details.</p>
            <a href={`/${lang}/contact`} className="px-8 py-4 bg-blue-600 text-white font-black rounded-full uppercase tracking-widest text-sm">Contact HousePlus</a>
          </div>
        )}
      </div>
    </main>
  );
}
