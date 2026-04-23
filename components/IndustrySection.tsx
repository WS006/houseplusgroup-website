import Image from 'next/image';

interface IndustrySectionProps {
  title: string;
  description: string;
  image: {
    filename: string;
    alt: string;
  };
  industry_type: 'solar' | 'appliances' | 'electronics';
}

export default function IndustrySection({ title, description, image, industry_type }: IndustrySectionProps) {
  const isEven = industry_type === 'appliances';

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
          <div className="flex-1 space-y-6">
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider">
              {industry_type}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
            <div className="pt-4">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                Explore Solutions
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              {image?.filename && (
                <Image
                  src={image.filename}
                  alt={image.alt || title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/10 rounded-full -z-10 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
