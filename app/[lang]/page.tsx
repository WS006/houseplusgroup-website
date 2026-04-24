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
      language: lang,
      cv: Date.now() // Force fresh content
    });
    story = data.story;
  } catch (error) {
    console.error(`Error fetching home for ${lang}:`, error);
  }

  // Universal content mapping to handle different Storyblok schemas
  const content = story?.content || {};
  const title = content.title || content.Text || content.heading || story?.name || 'HousePlus CH';
  
  // Handle various body/description fields and formats
  const rawBody = content.body || content.Body || content.description || content.content || '';
  const renderedBody = (typeof rawBody === 'object' && rawBody !== null) 
    ? renderRichText(rawBody) 
    : (typeof rawBody === 'string' ? rawBody : '');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-4 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight">
            {title}
          </h1>
          
          {renderedBody ? (
            <div 
              className="prose prose-xl max-w-none text-slate-600 mb-12 mx-auto leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: renderedBody }} 
            />
          ) : (
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto">
              Professional manufacturer of solar systems, home appliances, and 3C electronics. Delivering quality and innovation to global markets since 2010.
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href={`/${lang}/products`} 
              className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1"
            >
              View Products
            </a>
            <a 
              href={`/${lang}/contact`} 
              className="px-10 py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded-2xl hover:border-slate-900 transition-all hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 border-y border-slate-50 bg-slate-50/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">10+</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest">Years Exp</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest">Global Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">24m</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest">Warranty</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-1">ISO</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest">Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Categories */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Business</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">We provide end-to-end manufacturing solutions across three primary industries.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Solar Energy', icon: '☀️', color: 'blue', desc: 'High-efficiency monocrystalline panels and advanced energy storage.' },
            { title: 'Home Appliances', icon: '🏠', color: 'green', desc: 'Modern kitchen and household appliances with OEM/ODM support.' },
            { title: '3C Electronics', icon: '💻', color: 'purple', desc: 'Latest consumer electronics, smart devices and digital accessories.' }
          ].map((cat) => (
            <div key={cat.title} className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-500">
              <div className={`w-20 h-20 bg-${cat.color}-50 text-${cat.color}-600 rounded-3xl flex items-center justify-center mb-8 text-4xl group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{cat.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-8">{cat.desc}</p>
              <a href={`/${lang}/products`} className="text-blue-600 font-bold flex items-center group-hover:gap-2 transition-all">
                Learn More <span className="ml-2">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
