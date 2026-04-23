import { getStoryblokApi, renderRichText } from '@storyblok/react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string[] }> }) {
  const { lang, slug } = await params;
  const fullSlug = slug?.join('/') || '';
  
  if (!fullSlug) {
    notFound();
  }

  const storyblokApi = getStoryblokApi();
  let story = null;

  try {
    const { data } = await storyblokApi.getStory(fullSlug, { 
      version: 'published', 
      language: lang 
    });
    story = data.story;
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }
    console.error(`Error fetching story for ${fullSlug} in ${lang}:`, error);
  }

  if (!story) {
    notFound();
  }

  const content = story.content;
  const title = content.title || content.Text || story.name;
  const bodyHtml = content.body || content.Body || '';
  const renderedBody = bodyHtml ? renderRichText(bodyHtml) : '';

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <article className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">{title}</h1>
        {renderedBody ? (
          <div 
            className="prose prose-lg max-w-none text-gray-800" 
            dangerouslySetInnerHTML={{ __html: renderedBody }} 
          />
        ) : (
          <p className="text-gray-500 italic">No content available for this page.</p>
        )}
      </article>
    </main>
  );
}
