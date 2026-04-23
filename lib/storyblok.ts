import { StoryblokClient } from '@storyblok/client';

export const storyblokApi = async () => {
  return new StoryblokClient({
    accessToken: process.env.STORYBLOK_API_TOKEN || '',
  });
};
