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
      title: 'Premium HousePlus Solar Solutions',
      subtitle: 'High-efficiency HousePlus panels and power stations for global wholesale partners',
      button_text: 'Explore HousePlus Solar',
      button_link: { url: '/en/products/solar-systems', cached_url: '/en/products/solar-systems' }
    },
    {
      _uid: 'default-2',
      image: { filename: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&q=80', alt: 'HousePlus Home Appliances' },
      title: 'Advanced HousePlus Home Appliances',
      subtitle: 'Energy-efficient refrigerators, washing machines and kitchen solutions',
      button_text: 'View HousePlus Appliances',
      button_link: { url: '/en/products/home-appliances', cached_url: '/en/products/home-appliances' }
    },
    {
      _uid: 'default-3',
      image: { filename: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80', alt: 'HousePlus Manufacturing' },
      title: 'Professional HousePlus Manufacturing',
      subtitle: 'Leading OEM/ODM partner for global brands since 2010',
      button_text: 'Visit HousePlus Factory',
      button_link: { url: '/en/factory', cached_url: '/en/factory' }
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
      className="relative w-full h-[600px] md:h-[800px] overflow-hidden group bg-slate-900"
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
            className="object-cover brightness-[0.6]"
            priority={index === 0}
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <h2 className={`text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight transition-all duration-1000 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {item.title}
              </h2>
              <p className={`text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {item.subtitle}
              </p>
              {item.button_text && (
                <div className={`flex flex-col md:flex-row gap-4 justify-center transition-all duration-1000 delay-400 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <Link
                    href={item.button_link?.cached_url || item.button_link?.url || '#'}
                    className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-full transition-all hover:scale-105 hover:shadow-2xl uppercase tracking-widest text-sm"
                  >
                    {item.button_text}
                  </Link>
                  <Link
                    href="/en/contact"
                    className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-black rounded-full transition-all hover:scale-105 uppercase tracking-widest text-sm"
                  >
                    Contact HousePlus
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => handleManualAction(goToPrevious)}
        className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all hidden md:flex z-20"
      >
        <ChevronLeft size={32} strokeWidth={3} />
      </button>
      <button
        onClick={() => handleManualAction(goToNext)}
        className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all hidden md:flex z-20"
      >
        <ChevronRight size={32} strokeWidth={3} />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {displayItems.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualAction(() => goToSlide(index))}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentIndex ? 'w-12 bg-blue-600' : 'w-3 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
