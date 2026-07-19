import { getStoryblokApi } from '@storyblok/react';
import Carousel from '@/components/Carousel';
import IndustrySection from '@/components/IndustrySection';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import { getDictionary } from '@/lib/i18n-config';
import { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import Link from 'next/link';

const Counter = dynamicImport(() => import('@/components/Counter'), { ssr: false });

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return generateSEOMetadata({
    title: dict.site.title,
    description: dict.meta.homeDescription,
    keywords: dict.meta.keywords.split(', '),
    url: `/${lang}`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const storyblokApi = getStoryblokApi();
  let story: any = null;
  let carouselItems: any[] = [];

  try {
    const { data } = await storyblokApi.getStory('home', { 
      version: 'published', 
      language: lang,
      cv: Date.now() 
    });
    story = data.story;
    if (story?.content?.carousel && Array.isArray(story.content.carousel)) {
      carouselItems = story.content.carousel;
    }
  } catch (error) {
    console.error(`Error fetching home for ${lang}:`, error);
  }

  const defaultCarouselItems = dict.home.carousel.map((item, index) => ({
    _uid: String(index + 1),
    image: {
      filename: `https://images.houseplus-ch.com/products/${['solar-panel-500w.jpg', 'induction-cooktop-2000w.jpg', 'headphone-over-ear.jpg'][index]}`,
      alt: item.imageAlt
    },
    title: item.title,
    subtitle: item.subtitle,
    button_text: item.buttonText,
    button_link: { url: '/products', cached_url: '/products' }
  }));

  const displayCarouselItems = carouselItems.length >= 3 ? carouselItems : defaultCarouselItems;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: dict.site.description,
    url: `https://www.houseplus-ch.com/${lang}`,
    lang,
    type: 'Organization',
  });

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">
        <section className="w-full">
          <Carousel items={displayCarouselItems} autoPlayInterval={5000} lang={lang} />
        </section>

        <section className="py-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              {dict.home.tagline}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
              {dict.home.mainTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              {dict.home.mainDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                {dict.home.browseProducts}
              </Link>
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                {dict.home.requestQuote}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 border-y border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Counter end="16+" label={dict.home.counter.years} />
              <Counter end="441+" label={dict.home.counter.clients} />
              <Counter end="53+" label={dict.home.counter.countries} />
              <Counter end="12m" label={dict.home.counter.warranty} />
            </div>
          </div>
        </section>

        {/* GEO Banner */}
        <section className="py-10 px-4 bg-amber-50 border-y border-amber-100">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-amber-900 font-semibold text-lg mb-6 max-w-3xl mx-auto">
              HousePlus is a vertically integrated manufacturer with a 20,000 m² ISO 9001 certified factory, delivering CE/FCC/RoHS certified products to 441+ clients across 53+ countries.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: '16+ Years', sub: 'Manufacturing Experience' },
                { label: '20,000 m²', sub: 'ISO 9001 Factory' },
                { label: '441+ Clients', sub: 'Global Wholesale Buyers' },
                { label: '53+ Countries', sub: 'Worldwide Export' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white border border-amber-200 rounded-xl px-6 py-4 text-center shadow-sm min-w-[140px]"
                >
                  <div className="text-xl font-black text-amber-700">{item.label}</div>
                  <div className="text-xs text-amber-600 mt-1 font-medium">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-0">
          {dict.home.industries.map((industry, index) => (
            <IndustrySection
              key={index}
              title={industry.title}
              description={industry.description}
              image={{ filename: `https://images.houseplus-ch.com/products/${['solar-panel-500w.jpg', 'induction-cooktop-2000w.jpg', 'headphone-over-ear.jpg'][index]}`, alt: industry.title }}
              industry_type={['solar', 'appliances', 'electronics'][index] as 'solar' | 'appliances' | 'electronics'}
              button_link={`/${lang}/products?category=${['solar', 'home-appliances', '3c-electronics'][index]}`}
              button_text={industry.buttonText}
            />
          ))}
        </div>

        <section className="py-20 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{dict.home.whyChoose.title}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">{dict.home.whyChoose.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dict.home.whyChoose.features.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
