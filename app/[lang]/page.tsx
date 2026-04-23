import { draftMode } from 'next/headers';
import { storyblokApi } from '@/lib/storyblok';
import { generateMetadata as generateMeta } from '@/lib/seo-utils';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props) {
  const { lang } = params;
  return generateMeta({
    title: 'HousePlus CH | Professional Solar & Home Appliances Manufacturer',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics for global wholesale buyers.',
    url: `/${lang}`,
    lang: lang as any,
    type: 'website',
  });
}

async function getHomePage(lang: string) {
  try {
    const { isEnabled } = draftMode();
    const sb = await storyblokApi();

    const res = await sb.get('cdn/stories', {
      version: isEnabled ? 'draft' : 'published',
      starts_with: `${lang}/home`,
      per_page: 1,
    });

    return res.data?.stories[0] || null;
  } catch (err) {
    console.error('Storyblok API 拉取失败', err);
    return null;
  }
}

export default async function HomePage({ params }: Props) {
  const { lang } = params;
  const page = await getHomePage(lang);

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to HousePlus CH</h1>
        <p className="text-lg mb-10">
          Professional manufacturer of solar systems, home appliances, and 3C electronics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-2">Solar Systems</h2>
            <p>High-efficiency solar panels & portable power stations.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-2">Home Appliances</h2>
            <p>Premium refrigerators, washing machines & kitchen appliances.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-2">3C Electronics</h2>
            <p>Smart home, LED lighting & portable electronic devices.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
