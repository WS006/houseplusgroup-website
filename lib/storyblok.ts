export async function storyblokApi() {
  return {
    get: async (slug: string, options: any = {}) => {
      try {
        const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
        const version = "published";

        // 单页面获取（about / contact / support 等）
        if (slug && !slug.includes('stories?')) {
          const fullSlug = slug.trim();
          const res = await fetch(
            `https://api.storyblok.com/v2/cdn/stories/${fullSlug}?token=${token}&version=${version}`,
            { next: { revalidate: 5 } }
          );
          return await res.json();
        }

        // 列表获取
        const res = await fetch(
          `https://api.storyblok.com/v2/cdn/${slug}&token=${token}&version=${version}`,
          { next: { revalidate: 5 } }
        );
        return await res.json();
      } catch (err) {
        console.error("Storyblok API error:", err);
        return { data: { story: null } };
      }
    },
  };
}
