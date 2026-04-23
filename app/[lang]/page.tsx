import { getStoryblokApi, renderRichText } from '@storyblok/react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const storyblokApi = getStoryblokApi();
  let story = null;

  try {
    const { data } = await storyblokApi.getStory('home', { 
      version: 'published', 
      language: lang 
    });
    story = data.story;
  } catch (error: any) {
    console.error(`Error fetching home for ${lang}:`, error);
    if (error.status === 404) {
      notFound();
    }
  }

  if (!story) {
    notFound();
  }

  const content = story.content;
  const title = content.title || content.Text || 'HousePlus';
  const bodyHtml = content.body || content.Body || '';
  const renderedBody = bodyHtml ? renderRichText(bodyHtml) : '';

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-900">{title}</h1>
        {renderedBody && (
          <div 
            className="prose prose-xl max-w-none text-gray-800 text-left" 
            dangerouslySetInnerHTML={{ __html: renderedBody }} 
          />
        )}
      </div>
    </main>
  );
}
