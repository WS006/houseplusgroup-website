export async function storyblokApi() {
  return {
    get: async (path: string, options: any = {}) => {
      try {
        const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
        const version = "published";
        const lang = options.lang || "en";

        // 拼接正确的页面路径：en/about, en/contact, en/support
        const slug = options.starts_with
          ? `stories?starts_with=${options.starts_with}`
          : `stories/${lang}/${path}`;

        const url = `https://api.storyblok/v2/cdn/${slug}&token=${token}&version=${version}`;
        const res = await fetch(url, { next: { revalidate: 5 } });
        const data = await res.json();

        return data;
      } catch (err) {
        console.error("Storyblok API 错误", err);
        return { data: { story: null, stories: [] } };
      }
    },
  };
}
