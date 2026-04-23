export async function storyblokApi() {
  return {
    get: async (url: string, options: any) => {
      try {
        // 读取你在 Vercel 设置的正确环境变量
        const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || '';
        const version = options.version || 'published';
        const starts_with = options.starts_with || '';
        const per_page = options.per_page || 100;

        const res = await fetch(
          `https://api.storyblok.com/v2/cdn/stories?token=${token}&version=${version}&starts_with=${starts_with}&per_page=${per_page}`,
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
