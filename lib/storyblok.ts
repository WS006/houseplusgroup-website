export async function storyblokApi() {
  return {
    get: async (path: string, options: any = {}) => {
      try {
        const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
        const version = options.version || "published";
        const lang = options.language || options.lang || "";
        
        let slug = path;
        if (options.starts_with) {
          slug = \`stories?starts_with=\${options.starts_with}\`;
        } else if (!path.startsWith('stories/')) {
          slug = \`stories/\${path}\`;
        }

        const url = new URL(\`https://api.storyblok.com/v2/cdn/\${slug}\`);
        url.searchParams.append('token', token || '');
        url.searchParams.append('version', version);
        if (lang && lang !== 'default') {
          url.searchParams.append('language', lang);
        }
        if (options.resolve_links) {
          url.searchParams.append('resolve_links', options.resolve_links);
        }
        if (options.per_page) {
          url.searchParams.append('per_page', options.per_page.toString());
        }

        const res = await fetch(url.toString(), { next: { revalidate: 5 } });
        const data = await res.json();
        return { data };
      } catch (err) {
        console.error("Storyblok API 错误", err);
        return { data: { story: null, stories: [] } };
      }
    },
  };
}
