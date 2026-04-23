import { getStoryblokApi, renderRichText } from '@storyblok/react';

export default async function Home() {
  const storyblokApi = getStoryblokApi();
  let story = null;

  try {
    const { data } = await storyblokApi.getStory('home', { version: 'published' });
    story = data.story;
  } catch (error) {
    console.error('Error fetching story:', error);
  }

  if (!story) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Loading...</h1>
        <p className="mt-4">If this persists, please check your Storyblok token and that the "home" story exists.</p>
      </main>
    );
  }

  const content = story.content;
  const title = content.title || content.Text || 'HousePlus';
  // 富文本内容需要渲染为 HTML
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
