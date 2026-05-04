'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
    label: 'HousePlus Solar',
  },
  appliances: {
    color: 'from-blue-400 to-blue-600',
    icon: '⚙️',
    slug: 'home-appliances',
    label: 'HousePlus Appliances',
  },
  electronics: {
    color: 'from-purple-400 to-pink-500',
    icon: '📱',
    slug: '3c-electronics',
    label: 'HousePlus Electronics',
  },
};

export default function IndustrySection({
  title,
  description,
  image,
  industry_type,
  button_link,
  button_text = 'Explore HousePlus Solutions',
}: IndustrySectionProps) {
  const isEven = industry_type === 'appliances';
  const config = industryConfig[industry_type];
  const [imgSrc, setImgSrc] = useState(image?.filename || '');
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (imgSrc === image?.filename) {
      // First fallback: try a different Unsplash image
      setImgSrc(`https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80`);
    } else {
      // Second fallback: use a colored background with icon
      setImgError(true);
    }
  };

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
                {config.label}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              {title}
            </h2>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">HousePlus MOQ</p>
                <p className="text-lg font-black text-slate-900">100-500 pcs</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">HousePlus Lead Time</p>
                <p className="text-lg font-black text-slate-900">20-35 days</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">HousePlus Support</p>
                <p className="text-lg font-black text-slate-900">OEM/ODM</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">HousePlus Warranty</p>
                <p className="text-lg font-black text-slate-900">24 Months</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={button_link || `/products?category=${config.slug}`}
                className="inline-block bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:-translate-y-1"
              >
                {button_text}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 relative">
            <div className="relative h-[350px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              {!imgError && imgSrc && (
                <Image
                  src={imgSrc}
                  alt={image.alt || title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                  onError={handleImageError}
                />
              )}
              {imgError && (
                <div className={`w-full h-full bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                  <span className="text-8xl opacity-30">{config.icon}</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl font-bold bg-black/30 px-6 py-3 rounded-2xl backdrop-blur-sm">
                      {config.label}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Decorative gradient blob */}
            <div
              className={`absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br ${config.color} rounded-full -z-10 blur-3xl opacity-20`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
