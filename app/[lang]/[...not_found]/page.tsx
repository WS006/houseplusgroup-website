import { notFound } from 'next/navigation';
import { getStoryblokApi, renderRichText } from '@storyblok/react';

export const dynamic = 'force-dynamic';

// 已知静态页面的 slug（直接对应 Storyblok 中的 story slug）
const staticPages = ['about', 'contact', 'privacy', 'terms', 'support'];

async function renderStory(slug: string, lang: string) {
  const storyblokApi = getStoryblokApi();
  let story = null;
  try {
    const { data } = await storyblokApi.getStory(slug, { version: 'published', language: lang });
    story = data.story;
  } catch (error) {
    console.error(\`Story not found: \${slug} in \${lang}\`);
  }
  if (!story) notFound();

  const content = story.content;
  const title = content.title || content.Text || 'HousePlus';
  const bodyHtml = content.body || content.Body || '';
  const renderedBody = bodyHtml ? renderRichText(bodyHtml) : '';

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      {renderedBody && <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: renderedBody }} />}
    </main>
  );
}

export default async function CatchAllPage({ params }: { params: Promise<{ lang: string; not_found: string[] }> }) {
  const { lang, not_found: slugArray } = await params;
  const fullSlug = slugArray?.join('/') || 'home';

  // 首页处理
  if (fullSlug === 'home' || slugArray?.length === 0) {
    return renderStory('home', lang);
  }

  const firstSegment = slugArray?.[0];
  // 静态页面
  if (staticPages.includes(firstSegment)) {
    return renderStory(firstSegment, lang);
  }

  // 产品详情页（以 products/ 开头）
  if (fullSlug.startsWith('products/')) {
    return renderStory(fullSlug, lang);
  }

  // 其余所有路径 → 404
  notFound();
}
