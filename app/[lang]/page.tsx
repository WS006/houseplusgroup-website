import { getStoryblokApi } from '@storyblok/react';
import Carousel from '@/components/Carousel';
import IndustrySection from '@/components/IndustrySection';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';
import { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import Link from 'next/link';

const Counter = dynamicImport(() => import('@/components/Counter'), { ssr: false });

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return generateSEOMetadata({
    title: 'HousePlus - Solar Systems, Home Appliances & Electronics Wholesale',
    description: 'We manufacture and supply solar panels, home appliances, and 3C electronics to wholesale buyers in 60+ countries. OEM/ODM available, MOQ from 100 pcs.',
    keywords: ['solar panels', 'home appliances', 'portable power station', 'wholesale', 'OEM', 'ODM', '3C electronics', 'HousePlus'],
    url: `/${lang}`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
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

  const defaultCarouselItems = [
    {
      _uid: '1',
      image: {
        filename: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=1920&q=80',
        alt: 'HousePlus Solar Energy Solutions'
      },
      title: 'Solar Panels & Power Stations',
      subtitle: 'From 100W panels to 3000W portable stations - we supply what your customers need',
      button_text: 'View Solar Products',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    },
    {
      _uid: '2',
      image: {
        filename: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80',
        alt: 'HousePlus Home Appliances'
      },
      title: 'Home Appliances Wholesale',
      subtitle: 'Air fryers, induction cooktops, kettles - energy-efficient and built to last',
      button_text: 'View Appliances',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    },
    {
      _uid: '3',
      image: {
        filename: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1920&q=80',
        alt: 'HousePlus 3C Electronics'
      },
      title: '3C Electronics & Accessories',
      subtitle: 'TWS earphones, smart watches, SSDs - private-label branding available',
      button_text: 'View Electronics',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    },
  ];

  const displayCarouselItems = carouselItems.length >= 3 ? carouselItems : defaultCarouselItems;

  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics for global wholesale buyers.',
    url: `https://www.houseplus-ch.com/${lang}`,
    lang,
    type: 'Organization',
  });

  return (
    <>
      <SEOHead schemas={[organizationSchema]} />
      <main className="min-h-screen bg-white">
        {/* Hero Carousel */}
        <section className="w-full">
          <Carousel items={displayCarouselItems} autoPlayInterval={5000} />
        </section>

        {/* Brand Introduction */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              HousePlus - B2B Wholesale Manufacturer
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
              HousePlus Group - Your Wholesale Partner
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Since 2010, we have been supplying solar systems, home appliances and 3C electronics to distributors and retailers across 60+ countries. We handle OEM/ODM, hold CE/FCC/RoHS certifications, and keep our MOQ flexible - starting from just 100 units.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/products`} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5">
                Browse All Products
              </Link>
              <Link href={`/${lang}/contact`} className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all hover:-translate-y-0.5">
                Request a Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="py-14 border-y border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Counter end="14+" label="Years of Manufacturing" />
              <Counter end="500+" label="Wholesale Clients" />
              <Counter end="60+" label="Countries Served" />
              <Counter end="24m" label="Product Warranty" />
            </div>
          </div>
        </section>

        {/* Three Product Categories */}
        <div className="space-y-0">
          <IndustrySection
            title="Solar Energy Systems"
            description="We make solar panels (100W-500W), MPPT charge controllers, inverters (3kW-10kW), and portable power stations (300W-3000W). All products are CE, RoHS and IEC certified - ready for the European, Middle Eastern and African markets."
            image={{ filename: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=800&q=80', alt: 'Solar Energy Systems' }}
            industry_type="solar"
            button_link={`/${lang}/products`}
            button_text="View Solar Products"
          />
          <IndustrySection
            title="Home Appliances"
            description="Our appliance line includes air fryers, induction cooktops, electric kettles, toasters and more. We have in-house tooling and an R&D team, so we can deliver OEM/ODM solutions that meet CE, FCC and RoHS standards."
            image={{ filename: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Home Appliances' }}
            industry_type="appliances"
            button_link={`/${lang}/products`}
            button_text="View Home Appliances"
          />
          <IndustrySection
            title="3C Electronics & Accessories"
            description="We supply TWS earphones, over-ear headphones, smart watches, portable SSDs, micro SD cards and fast-charging USB-C cables. Every product is function-tested before shipping and available for private-label branding."
            image={{ filename: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80', alt: '3C Electronics' }}
            industry_type="electronics"
            button_link={`/${lang}/products`}
            button_text="View 3C Electronics"
          />
        </div>

        {/* Why Choose HousePlus */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Why Buyers Choose HousePlus</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">We combine 14+ years of manufacturing experience with hands-on service. Our team responds quickly and delivers on time - every time.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              [
                {
                  icon: 'Factory',
                  title: 'Our Own Factory',
                  desc: '20,000+ m² production space with in-house tooling, assembly lines and quality labs. We control the entire process from raw material to finished product.'
                },
                {
                  icon: 'Certified',
                  title: 'Certified Products',
                  desc: 'CE, FCC, RoHS, ISO 9001 and IEC certifications - our products meet regulatory requirements in Europe, North America and beyond.'
                },
                {
                  icon: 'Support',
                  title: 'OEM/ODM Support',
                  desc: 'Custom branding, private-label packaging and product modifications from MOQ 100 pcs. Every client gets a dedicated account manager.'
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
