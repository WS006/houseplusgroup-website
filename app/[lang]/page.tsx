import { getStoryblokApi, renderRichText } from '@storyblok/react';
import Carousel from '@/components/Carousel';
import IndustrySection from '@/components/IndustrySection';
import SEOHead from '@/components/SEOHead';
import Counter from '@/components/Counter';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema, generateFAQSchema } from '@/lib/schema-generator';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return generateSEOMetadata({
    title: 'HousePlus - Professional Manufacturer of Solar Systems, Home Appliances & 3C Electronics',
    description: 'Global B2B wholesale supplier of solar panels, portable power stations, home appliances, and 3C electronics. OEM/ODM support, CE/FCC/RoHS certified. MOQ 100-500 pcs.',
    keywords: ['solar panels', 'home appliances', 'portable power station', 'wholesale', 'OEM', 'ODM', '3C electronics', 'HousePlus'],
    url: `/${lang}`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const storyblokApi = getStoryblokApi();
  let story = null;
  let carouselItems: any[] = [];
  let industriesContent: any[] = [];

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
    if (story?.content?.industries && Array.isArray(story.content.industries)) {
      industriesContent = story.content.industries;
    }
  } catch (error) {
    console.error(`Error fetching home for ${lang}:`, error);
  }

  const content = story?.content || {};
  const title = content.title || 'HousePlus Group';
  
  const defaultCarouselItems = [
    {
      _uid: '1',
      image: {
        filename: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=1920&q=80',
        alt: 'HousePlus Solar Energy Solutions'
      },
      title: 'Premium HousePlus Solar Solutions',
      subtitle: 'High-efficiency HousePlus panels and power stations for global wholesale partners',
      button_text: 'Explore HousePlus Solar',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    },
    {
      _uid: '2',
      image: {
        filename: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&q=80',
        alt: 'HousePlus Home Appliances'
      },
      title: 'Modern HousePlus Appliances',
      subtitle: 'Energy-efficient HousePlus kitchen appliances with full OEM/ODM support',
      button_text: 'View HousePlus Appliances',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    },
  ];

  const displayCarouselItems = carouselItems.length > 0 ? carouselItems : defaultCarouselItems;

  return (
    <>
      <SEOHead schemas={[generateOrganizationSchema({ title: 'HousePlus', lang })]} />
      <main className="min-h-screen bg-white">
        <section className="w-full">
          <Carousel items={displayCarouselItems} autoPlayInterval={5000} />
        </section>

        <section className="py-24 px-4 text-center bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional HousePlus manufacturer of solar systems, home appliances, and 3C electronics. Delivering HousePlus quality and innovation to global markets since 2010.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href={`/${lang}/products`} className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1">View HousePlus Products</a>
              <a href={`/${lang}/contact`} className="px-10 py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded-2xl hover:border-slate-900 transition-all hover:-translate-y-1">Contact HousePlus</a>
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-slate-100 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Counter end="10+" label="Years HousePlus Exp" />
              <Counter end="500+" label="Global HousePlus Clients" />
              <Counter end="24m" label="HousePlus Warranty" />
              <Counter end="ISO" label="HousePlus Certified" />
            </div>
          </div>
        </section>

        <div className="space-y-0">
          <IndustrySection
            title="High-Efficiency HousePlus Solar Systems"
            description="We specialize in manufacturing professional-grade HousePlus solar panels and energy storage systems. Our HousePlus solar solutions are designed for sustainable energy worldwide. With HousePlus MOQ starting at 100 pieces, we support customized OEM/ODM projects."
            image={{ filename: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&q=80', alt: 'HousePlus Solar Solutions' }}
            industry_type="solar"
            button_link={`/${lang}/products`}
            button_text="Explore HousePlus Solar"
          />
          <IndustrySection
            title="Premium HousePlus Home Appliances"
            description="From refrigerators to washing machines, HousePlus home appliances combine energy efficiency with cutting-edge technology. We manufacture a complete range of HousePlus kitchen appliances that meet international standards (CE, FCC, RoHS)."
            image={{ filename: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', alt: 'HousePlus Home Appliances' }}
            industry_type="appliances"
            button_link={`/${lang}/products`}
            button_text="View HousePlus Appliances"
          />
        </div>
      </main>
    </>
  );
}
