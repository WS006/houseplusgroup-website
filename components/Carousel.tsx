'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  _uid: string;
  image: {
    filename: string;
    alt: string;
  };
  title: string;
  subtitle: string;
  button_text: string;
  button_link: {
    url: string;
    cached_url: string;
  };
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

export default function Carousel({ items, autoPlayInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Professional HousePlus default items if none provided by Storyblok
  const defaultItems: CarouselItem[] = [
    {
      _uid: 'default-1',
      image: { filename: 'https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=1920&q=80', alt: 'HousePlus Solar Solutions' },
      title: 'High-Efficiency Solar Solutions',
      subtitle: 'Professional-grade solar panels, inverters and portable power stations for global wholesale partners',
      button_text: 'Explore Solar Products',
      button_link: { url: '/en/products', cached_url: '/en/products' }
    },
    {
      _uid: 'default-2',
      image: { filename: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80', alt: 'HousePlus Home Appliances' },
      title: 'Smart Home Appliances',
      subtitle: 'Energy-efficient kitchen and household appliances with full OEM/ODM customisation support',
      button_text: 'View Appliances',
      button_link: { url: '/en/products', cached_url: '/en/products' }
    },
    {
      _uid: 'default-3',
      image: { filename: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1920&q=80', alt: 'HousePlus 3C Electronics' },
      title: '3C Electronics & Accessories',
      subtitle: 'Premium headphones, smart watches, portable SSDs and charging accessories for modern consumers',
      button_text: 'View Electronics',
      button_link: { url: '/en/products', cached_url: '/en/products' }
    }
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % displayItems.length);
  }, [displayItems.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
  }, [displayItems.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (displayItems.length <= 1 || !isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(goToNext, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [displayItems, isAutoPlaying, autoPlayInterval, goToNext]);

  const handleManualAction = (action: () => void) => {
    setIsAutoPlaying(false);
    action();
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div
      className="relative w-full h-[520px] md:h-[680px] overflow-hidden group bg-slate-800"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {displayItems.map((item, index) => (
        <div
          key={item._uid || index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
          }`}
        >
          <Image
            src={item.image.filename}
            alt={item.image.alt || item.title}
            fill
            className="object-cover brightness-[0.75]"
            priority={index === 0}
            sizes="100vw"
            quality={90}
          />
          {/* Left-aligned gradient overlay for business style */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/65 via-slate-800/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-start px-8 md:px-20">
            <div className="max-w-2xl">
              {/* Slide badge */}
              <span className={`inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-5 transition-all duration-700 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>HousePlus — Global Wholesale Manufacturer</span>
              <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-tight transition-all duration-1000 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {item.title}
              </h2>
              <p className={`text-base md:text-xl text-slate-200 mb-8 max-w-xl leading-relaxed transition-all duration-1000 delay-200 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {item.subtitle}
              </p>
              {item.button_text && (
                <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <Link
                    href={item.button_link?.cached_url || item.button_link?.url || '#'}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-wide"
                  >
                    {item.button_text}
                  </Link>
                  <Link
                    href="/en/contact"
                    className="px-8 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/40 font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wide"
                  >
                    Get a Quote
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => handleManualAction(goToPrevious)}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full transition-all hidden md:flex z-20 border border-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>
      <button
        onClick={() => handleManualAction(goToNext)}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full transition-all hidden md:flex z-20 border border-white/30"
        aria-label="Next slide"
      >
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {displayItems.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualAction(() => goToSlide(index))}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentIndex ? 'w-10 bg-blue-500' : 'w-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm font-medium z-20 hidden md:block">
        {currentIndex + 1} / {displayItems.length}
      </div>
    </div>
  );
}
