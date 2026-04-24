import { getStoryblokApi, renderRichText } from '@storyblok/react';
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string[] }> }) {
  const { lang, slug } = await params;
  const fullSlug = slug?.join('/') || 'home';
  const storyblokApi = getStoryblokApi();
  let story = null;

  try {
    const { data } = await storyblokApi.getStory(fullSlug, { version: 'published', language: lang });
    story = data.story;
  } catch (error) {
    console.error(`Error fetching story for ${fullSlug} in ${lang}:`, error);
  }

  if (!story) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-4">The page you are looking for does not exist.</p>
      </main>
    );
  }

  const content = story.content;
  const title = content.title || content.Text || 'HousePlus';
  const bodyHtml = content.body || content.Body || '';
  const renderedBody = bodyHtml ? renderRichText(bodyHtml) : '';

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      {renderedBody && (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: renderedBody }} />
      )}
    </main>
  );
}
