export async function storyblokApi() {
  return {
    get: async (slug: string, options: any = {}) => {
      try {
        const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
        const version = "published";
        const lang = options.lang || "en";
        const path = options.path || "";

        let url = `https://api.storyblok.com/v2/cdn/stories/${path}?token=${token}&version=${version}`;

        if (options.starts_with) {
          url = `https://api.storyblok.com/v2/cdn/stories?starts_with=${options.starts_with}&token=${token}&version=${version}`;
        }

        const res = await fetch(url, { next: { revalidate: 10 } });
        const data = await res.json();

        return data;
      } catch (err) {
        console.error("Storyblok fetch error:", err);
        return { data: { story: null, stories: [] } };
      }
    },
  };
}
