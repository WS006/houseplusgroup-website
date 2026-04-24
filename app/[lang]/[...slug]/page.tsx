import { getStoryblokApi, renderRichText } from '@storyblok/react';
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string[] }> }) {
  const { lang, slug } = await params;
  const fullSlug = slug?.join('/') || '';
  const storyblokApi = getStoryblokApi();
  let story = null;

  try {
    // Correctly request the story by its slug and provide the language parameter
    const { data } = await storyblokApi.getStory(fullSlug, { 
      version: 'published', 
      language: lang,
      resolve_links: 'url'
    });
    story = data.story;
  } catch (error) {
    console.error(`Error fetching story for ${fullSlug} in ${lang}:`, error);
  }

  if (!story) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-4 text-gray-600">The page "{fullSlug}" could not be found in {lang}.</p>
        <p className="mt-2 text-sm text-gray-400">Please ensure the content is published in Storyblok.</p>
      </main>
    );
  }

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
