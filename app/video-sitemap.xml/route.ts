import { blogPosts } from '@/lib/blog-data';
import { canonicalSiteUrl } from '@/lib/urls';

const LANGUAGES = ['en', 'es', 'de', 'fr', 'ar'] as const;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function durationInSeconds(duration: string): number | null {
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return null;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  const total = hours * 3600 + minutes * 60 + seconds;
  return total > 0 ? total : null;
}

function generateVideoSitemap(): string {
  const entries = Object.values(blogPosts).flatMap((post) => {
    if (!post.video) return [];
    const video = post.video;
    const duration = durationInSeconds(video.duration);
    return LANGUAGES.map((lang) => {
      const pageUrl = canonicalSiteUrl(`/${lang}/news/${post.slug}`);
      const lastmod = post.dateModified || post.datePublished;
      const durationTag = duration ? `\n      <video:duration>${duration}</video:duration>` : '';
      return `  <url>\n    <loc>${escapeXml(pageUrl)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n    <video:video>\n      <video:thumbnail_loc>${escapeXml(video.poster)}</video:thumbnail_loc>\n      <video:title>${escapeXml(video.name)}</video:title>\n      <video:description>${escapeXml(video.description)}</video:description>\n      <video:content_loc>${escapeXml(video.contentUrl)}</video:content_loc>${durationTag}\n      <video:publication_date>${escapeXml(video.uploadDate)}</video:publication_date>\n      <video:family_friendly>yes</video:family_friendly>\n    </video:video>\n  </url>`;
    });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${entries.join('\n')}\n</urlset>`;
}

export async function GET() {
  return new Response(generateVideoSitemap(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
