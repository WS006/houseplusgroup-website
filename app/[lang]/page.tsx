import { getStoryblokApi, renderRichText } from '@storyblok/react';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const storyblokApi = getStoryblokApi();
  let story = null;

  try {
    const { data } = await storyblokApi.getStory('home', { 
      version: 'published', 
      language: lang 
    });
    story = data.story;
  } catch (error) {
    console.error(`Error fetching home for ${lang}:`, error);
  }

  const content = story?.content;
  const title = content?.title || content?.Text || 'HousePlus CH | Professional Manufacturer';
  const renderedBody = content?.body ? renderRichText(content.body) : '';

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            {title}
          </h1>
          {renderedBody ? (
            <div 
              className="prose prose-xl max-w-none text-gray-600 mb-10 mx-auto" 
              dangerouslySetInnerHTML={{ __html: renderedBody }} 
            />
          ) : (
            <p className="text-xl text-gray-600 mb-10">
              Professional manufacturer of solar systems, home appliances, and 3C electronics for global wholesale buyers.
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={`/${lang}/products`} 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Explore Products
            </a>
            <a 
              href={`/${lang}/contact`} 
              className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 font-bold rounded-full hover:border-gray-900 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-100">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">☀️</div>
            <h3 className="text-xl font-bold mb-4">Solar Energy</h3>
            <p className="text-gray-600">High-efficiency solar panels and power storage systems for a sustainable future.</p>
          </div>
          <div className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-green-100">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">🏠</div>
            <h3 className="text-xl font-bold mb-4">Home Appliances</h3>
            <p className="text-gray-600">Reliable and innovative household appliances designed for modern living.</p>
          </div>
          <div className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-purple-100">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">💻</div>
            <h3 className="text-xl font-bold mb-4">3C Electronics</h3>
            <p className="text-gray-600">Cutting-edge consumer electronics with superior performance and quality.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
