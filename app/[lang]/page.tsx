import { getStoryblokApi, renderRichText } from '@storyblok/react';
import Carousel from '@/components/Carousel';
import IndustrySection from '@/components/IndustrySection';
import SEOHead from '@/components/SEOHead';
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
    keywords: ['solar panels', 'home appliances', 'portable power station', 'wholesale', 'OEM', 'ODM', '3C electronics'],
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
      cv: Date.now() // Force fresh content
    });
    story = data.story;
    
    // Extract carousel items if available
    if (story?.content?.carousel && Array.isArray(story.content.carousel)) {
      carouselItems = story.content.carousel;
    }
    
    // Extract industry sections if available
    if (story?.content?.industries && Array.isArray(story.content.industries)) {
      industriesContent = story.content.industries;
    }
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

  // Default carousel items if not provided from Storyblok
  const defaultCarouselItems = [
    {
      _uid: '1',
      image: {
        filename: 'https://images.unsplash.com/photo-1497440871597-41fa534db117?w=1200&h=600&fit=crop',
        alt: 'Solar Energy Solutions'
      },
      title: 'Premium Solar Energy Solutions',
      subtitle: 'High-efficiency panels and portable power stations for global wholesale buyers',
      button_text: 'Explore Solar Products',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    },
    {
      _uid: '2',
      image: {
        filename: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
        alt: 'Home Appliances'
      },
      title: 'Modern Home Appliances',
      subtitle: 'Energy-efficient kitchen and household appliances with OEM/ODM support',
      button_text: 'View Appliances',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    },
    {
      _uid: '3',
      image: {
        filename: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
        alt: '3C Electronics'
      },
      title: 'Latest 3C Electronics & Smart Devices',
      subtitle: 'Digital gadgets, LED lighting, and smart home solutions for the modern world',
      button_text: 'Discover Electronics',
      button_link: { url: `/${lang}/products`, cached_url: `/${lang}/products` }
    }
  ];

  const displayCarouselItems = carouselItems.length > 0 ? carouselItems : defaultCarouselItems;

  // Generate structured data schemas
  const organizationSchema = generateOrganizationSchema({
    title: 'HousePlus',
    description: 'Professional manufacturer of solar systems, home appliances, and 3C electronics for global wholesale buyers.',
    url: `https://www.houseplus-ch.com/${lang}`,
    lang,
    type: 'Organization',
  });

  const faqSchema = generateFAQSchema([
    {
      question: 'What is the MOQ for HousePlus products?',
      answer: 'Our minimum order quantity is 100-500 pieces depending on the product model. We support mixed container orders for flexibility.'
    },
    {
      question: 'Do you offer OEM/ODM services?',
      answer: 'Yes, we provide comprehensive OEM/ODM services with custom branding, packaging, and product specifications tailored to your requirements.'
    },
    {
      question: 'What certifications do your products have?',
      answer: 'Our products are certified with CE, FCC, RoHS, and ISO standards, ensuring compliance with international quality and safety requirements.'
    },
    {
      question: 'What is the lead time for orders?',
      answer: 'Standard lead time is 20-35 days from order confirmation, depending on product type and order quantity.'
    },
    {
      question: 'What warranty do you provide?',
      answer: 'We provide 12-24 months warranty depending on the product category, with comprehensive after-sales support.'
    }
  ]);

  return (
    <>
      <SEOHead schemas={[organizationSchema, faqSchema]} />
      <main className="min-h-screen bg-white">
      {/* Carousel Section */}
      <section className="w-full">
        <Carousel items={displayCarouselItems} autoPlayInterval={5000} />
      </section>

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

      {/* Industry Sections */}
      {industriesContent && industriesContent.length > 0 ? (
        industriesContent.map((industry: any) => (
          <IndustrySection
            key={industry._uid}
            title={industry.title}
            description={industry.description}
            image={industry.image}
            industry_type={industry.industry_type}
            button_link={industry.button_link?.cached_url || industry.button_link?.url}
            button_text={industry.button_text}
          />
        ))
      ) : (
        <>
          <IndustrySection
            title="High-Efficiency Solar Systems & Portable Power Stations"
            description="We specialize in manufacturing professional-grade solar panels, MPPT charge controllers, and energy storage systems. Our solar solutions range from 300W to 3000W portable power stations, designed for sustainable energy solutions worldwide. With MOQ starting at 100 pieces and lead times of 20-35 days, we support both standard and customized OEM/ODM projects."
            image={{
              filename: 'https://images.unsplash.com/photo-1497440871597-41fa534db117?w=800&h=600&fit=crop',
              alt: 'Solar Energy Solutions'
            }}
            industry_type="solar"
            button_link={`/${lang}/products`}
            button_text="Explore Solar Solutions"
          />
          <IndustrySection
            title="Premium Home Appliances with Energy Efficiency"
            description="From refrigerators to washing machines, our home appliances combine energy efficiency with cutting-edge technology. We manufacture a complete range of kitchen and household appliances that meet international standards (CE, FCC, RoHS). Our products are designed for modern living with 12-24 months warranty and comprehensive OEM/ODM support for global wholesale buyers."
            image={{
              filename: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
              alt: 'Home Appliances'
            }}
            industry_type="appliances"
            button_link={`/${lang}/products`}
            button_text="View Appliances"
          />
          <IndustrySection
            title="3C Electronics & Smart Home Solutions"
            description="Our 3C electronics portfolio includes digital gadgets, smart home devices, and energy-saving LED lighting solutions. We focus on innovation and sustainability, offering the latest consumer electronics designed for the digital age. With comprehensive certifications and quality assurance, our products are trusted by wholesale buyers across the globe."
            image={{
              filename: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
              alt: '3C Electronics'
            }}
            industry_type="electronics"
            button_link={`/${lang}/products`}
            button_text="Discover Electronics"
          />
        </>
      )}
    </main>
    </>
  );
}
