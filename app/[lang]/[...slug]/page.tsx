import { getStoryblokApi, renderRichText } from '@storyblok/react';
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string[] }> }) {
  const { lang, slug } = await params;
  const fullSlug = slug?.join('/') || '';
  const storyblokApi = getStoryblokApi();
  let story = null;
  let stories: any[] = [];

  try {
    // 1. Try to fetch as a direct story
    const { data } = await storyblokApi.getStory(fullSlug, { 
      version: 'published', 
      language: lang,
      resolve_links: 'url'
    });
    story = data.story;
  } catch (error) {
    // 2. If story not found, try to fetch as a folder/list
    try {
      const { data: listData } = await storyblokApi.getStories({
        starts_with: fullSlug + '/',
        version: 'published',
        language: lang,
      });
      stories = listData.stories || [];
    } catch (innerError) {
      console.error(`Error fetching as list for ${fullSlug}:`, innerError);
    }
  }

  if (!story && stories.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-4 text-gray-600">The page "{fullSlug}" could not be found.</p>
      </main>
    );
  }

  // If it's a folder/list (like /products)
  if (!story && stories.length > 0) {
    return (
      <main className="min-h-screen py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-gray-900 text-center capitalize">{fullSlug}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((s: any) => (
              <a key={s.uuid} href={`/${lang}/${s.full_slug}`} className="group block p-6 border rounded-xl hover:shadow-lg transition-all">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{s.name}</h2>
                <p className="text-gray-500 line-clamp-2">{s.content?.description || 'View details'}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // If it's a direct story (like /about or /products/item)
  if (story) {
    const content = story.content;
    const title = content.title || content.Text || story.name || 'HousePlus';
    const bodyHtml = content.body || content.Body || content.description || '';
    const renderedBody = typeof bodyHtml === 'string' ? bodyHtml : renderRichText(bodyHtml);

    return (
      <main className="min-h-screen py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">{title}</h1>
          {renderedBody && (
            <div 
              className="prose prose-lg max-w-none prose-img:rounded-xl prose-headings:text-gray-900" 
              dangerouslySetInnerHTML={{ __html: renderedBody }} 
            />
          )}
        </div>
      </main>
    );
  }

  return null;
}
