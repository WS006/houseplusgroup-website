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

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!items || items.length <= 1 || !isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(goToNext, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items, isAutoPlaying, autoPlayInterval, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIsAutoPlaying(false);
        goToPrevious();
      }
      if (e.key === 'ArrowRight') {
        setIsAutoPlaying(false);
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  if (!items || items.length === 0) return null;

  const handleManualAction = (action: () => void) => {
    setIsAutoPlaying(false);
    action();
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[600px] overflow-hidden group bg-slate-100"
      role="region"
      aria-label="Product carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {items.map((item, index) => (
        <div
          key={item._uid || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          role="tabpanel"
          aria-hidden={index !== currentIndex}
        >
          {item.image?.filename && (
            <Image
              src={item.image.filename}
              alt={item.image.alt || item.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={85}
              onError={(e) => {
                // Fallback to a placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80';
              }}
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4 md:px-8">
            <div className="max-w-3xl">
              <h2 className={`text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-2 md:mb-4 transition-all duration-700 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {item.title}
              </h2>
              <p className={`text-sm md:text-lg lg:text-xl text-gray-100 mb-4 md:mb-8 transition-all duration-700 delay-200 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {item.subtitle}
              </p>
              {item.button_text && (
                <Link
                  href={item.button_link?.cached_url || item.button_link?.url || '#'}
                  className={`inline-block bg-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold hover:bg-blue-700 transition-all duration-700 delay-400 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  aria-label={`${item.button_text}: ${item.title}`}
                >
                  {item.button_text}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={() => handleManualAction(goToPrevious)}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="md:w-8 md:h-8" />
      </button>
      <button
        onClick={() => handleManualAction(goToNext)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="md:w-8 md:h-8" />
      </button>

      {/* Indicators */}
      <div
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20"
        role="tablist"
      >
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualAction(() => goToSlide(index))}
            className={`transition-all rounded-full ${
              index === currentIndex
                ? 'bg-white w-6 md:w-8 h-2 md:h-3'
                : 'bg-white/50 w-2 md:w-3 h-2 md:h-3 hover:bg-white/75'
            }`}
            role="tab"
            aria-selected={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}
