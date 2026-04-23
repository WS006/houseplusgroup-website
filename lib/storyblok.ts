export async function storyblokApi() {
  return {
    get: async (url: string, options: any) => {
      try {
        const token = process.env.STORYBLOK_API_TOKEN || '';
        const version = options.version || 'published';
        const starts_with = options.starts_with || '';

        const res = await fetch(
          `https://api.storyblok.com/v2/cdn/stories?token=${token}&version=${version}&starts_with=${starts_with}&per_page=${options.per_page}`,
          { next: { revalidate: 60 } }
        );

        return await res.json();
      } catch (err) {
        console.error('Storyblok API error', err);
        return { data: { stories: [] } };
      }
    },
  };
}
