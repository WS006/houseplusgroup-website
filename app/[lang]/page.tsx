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
        filename: '/images/home/solar-hero.jpg',
        alt: 'HousePlus Solar Energy Solutions'
      },
      title: 'High-Efficiency Solar Solutions',
      subtitle: 'Professional-grade solar panels, inverters and portable power stations for global wholesale partners',
      button_text: 'Explore Solar Products',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    },
    {
      _uid: '2',
      image: {
        filename: '/images/home/appliances-hero.jpg',
        alt: 'HousePlus Home Appliances'
      },
      title: 'Smart Home Appliances',
      subtitle: 'Energy-efficient kitchen and household appliances with full OEM/ODM customisation support',
      button_text: 'View Appliances',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    },
    {
      _uid: '3',
      image: {
        filename: '/images/home/electronics-hero.jpg',
        alt: 'HousePlus 3C Electronics'
      },
      title: '3C Electronics & Accessories',
      subtitle: 'Premium headphones, smart watches, portable SSDs and charging accessories for modern consumers',
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
        <section className="w-full">
          <Carousel items={displayCarouselItems} autoPlayInterval={5000} lang={lang} />
        </section>

        <section className="py-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              HousePlus - Global B2B Wholesale Manufacturer
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
              HousePlus Group - Professional Wholesale Supplier
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Since 2010, HousePlus has been a trusted manufacturer of solar energy systems, home appliances and 3C electronics. We serve wholesale buyers in 60+ countries, offering OEM/ODM services with CE/FCC/RoHS certifications and MOQ from 100 units.
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

        <section className="py-14 border-y border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Counter end="14+" label="Years of Manufacturing" />
              <Counter end="500+" label="Global Wholesale Clients" />
              <Counter end="60+" label="Countries Served" />
              <Counter end="24m" label="Product Warranty" />
            </div>
          </div>
        </section>

        <div className="space-y-0">
          <IndustrySection
            title="High-Efficiency Solar Energy Systems"
            description="We manufacture a wide range of solar products - from 100W monocrystalline panels to 3000W portable power stations. All products are CE, RoHS and IEC certified, ready for European, Middle Eastern and African markets."
            image={{ filename: '/images/home/solar-hero.jpg', alt: 'Solar Energy Systems' }}
            industry_type="solar"
            button_link={`/${lang}/products`}
            button_text="Explore Solar Products"
          />
          <IndustrySection
            title="Energy-Efficient Home Appliances"
            description="From air fryers to electric kettles - our home appliance line is engineered for energy efficiency and durability. With in-house tooling and R&D team, we deliver OEM/ODM solutions that meet CE, FCC and RoHS standards."
            image={{ filename: '/images/home/appliances-hero.jpg', alt: 'Home Appliances' }}
            industry_type="appliances"
            button_link={`/${lang}/products`}
            button_text="View Home Appliances"
          />
          <IndustrySection
            title="3C Electronics & Accessories"
            description="From TWS earphones to portable SSDs - we supply a curated portfolio of 3C electronics. Each product undergoes rigorous quality control and supports private-label branding with custom packaging."
            image={{ filename: '/images/home/electronics-hero.jpg', alt: '3C Electronics' }}
            industry_type="electronics"
            button_link={`/${lang}/products`}
            button_text="View 3C Electronics"
          />
        </div>

        <section className="py-20 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Why Global Buyers Choose HousePlus</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">With 14+ years of manufacturing experience and responsive service, <strong>HousePlus</strong> delivers reliable products on time, every time. Your success is our commitment.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'Factory',
                  title: 'Vertically Integrated Factory',
                  desc: 'Over 20,000 m2 of production space with in-house tooling, assembly lines and quality labs - full control from raw material to finished product.'
                },
                {
                  icon: 'Certified',
                  title: 'International Certifications',
                  desc: 'CE, FCC, RoHS, ISO 9001 and IEC certifications ensure our products meet the regulatory requirements of Europe, North America and beyond.'
                },
                {
                  icon: 'Support',
                  title: 'Flexible OEM/ODM Support',
                  desc: 'Custom branding, private-label packaging and product modifications available from MOQ 100 pcs. Dedicated account managers for every client.'
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
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
