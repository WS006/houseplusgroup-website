import Image from 'next/image';
import Link from 'next/link';

interface IndustrySectionProps {
  title: string;
  description: string;
  image: {
    filename: string;
    alt: string;
  };
  industry_type: 'solar' | 'appliances' | 'electronics';
  button_link?: string;
  button_text?: string;
}

const industryConfig = {
  solar: {
    color: 'from-yellow-400 to-orange-500',
    icon: '☀️',
    slug: 'solar-systems',
  },
  appliances: {
    color: 'from-blue-400 to-blue-600',
    icon: '⚙️',
    slug: 'home-appliances',
  },
  electronics: {
    color: 'from-purple-400 to-pink-500',
    icon: '📱',
    slug: '3c-electronics',
  },
};

export default function IndustrySection({
  title,
  description,
  image,
  industry_type,
  button_link,
  button_text = 'Explore Solutions',
}: IndustrySectionProps) {
  const isEven = industry_type === 'appliances';
  const config = industryConfig[industry_type];

  return (
    <section
      className="py-16 md:py-20 bg-white overflow-hidden"
      aria-label={`${title} section`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col lg:flex-row items-center gap-8 md:gap-12 ${
            isEven ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full">
              <span className="text-2xl">{config.icon}</span>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                {industry_type.replace('_', ' ')}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-bold text-gray-500 uppercase">MOQ</p>
                <p className="text-lg font-bold text-gray-900">100-500 pcs</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-bold text-gray-500 uppercase">Lead Time</p>
                <p className="text-lg font-bold text-gray-900">20-35 days</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-bold text-gray-500 uppercase">Support</p>
                <p className="text-lg font-bold text-gray-900">OEM/ODM</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-bold text-gray-500 uppercase">Warranty</p>
                <p className="text-lg font-bold text-gray-900">12-24 months</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={button_link || `/products?category=${config.slug}`}
                className="inline-block bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-3 rounded-lg font-bold hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl"
              >
                {button_text}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 relative">
            <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              {image?.filename && (
                <Image
                  src={image.filename}
                  alt={image.alt || title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              )}
            </div>
            {/* Decorative gradient blob */}
            <div
              className={`absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br ${config.color} rounded-full -z-10 blur-3xl opacity-20`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
