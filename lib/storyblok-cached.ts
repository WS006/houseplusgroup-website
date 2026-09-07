import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from '@storyblok/react/rsc';

const STORY_REVALIDATE_SECONDS = 24 * 60 * 60;

function cleanPath(path: string) {
  const value = path.replace(/^\/+|\/+$/g, '');
  return value || 'home';
}

function cacheKey(value: unknown) {
  return JSON.stringify(value ?? null);
}

export async function getCachedStory(path: string, lang = 'en', options: Record<string, unknown> = {}) {
  const storyPath = cleanPath(path);
  const load = unstable_cache(
    async () => {
      const api = getStoryblokApi();
      const { data } = await api.getStory(storyPath, {
        version: 'published',
        language: lang,
        ...options,
      });
      return data.story ?? null;
    },
    ['storyblok-story', storyPath, lang, cacheKey(options)],
    {
      revalidate: STORY_REVALIDATE_SECONDS,
      tags: [`story:${lang}:${storyPath}`, 'story-index'],
    },
  );
  return load();
}

export async function getCachedStories(options: Record<string, unknown> = {}) {
  const startsWith = typeof options.starts_with === 'string' ? options.starts_with : '';
  const load = unstable_cache(
    async () => {
      const api = getStoryblokApi();
      const { data } = await api.getStories({ version: 'published', ...options });
      return data.stories ?? [];
    },
    ['storyblok-stories', startsWith, cacheKey(options)],
    {
      revalidate: STORY_REVALIDATE_SECONDS,
      tags: ['story-index', startsWith ? `story-children:${startsWith}` : 'story-list'],
    },
  );
  return load();
}
