'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    linktype?: string;
  };
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
  lang?: string;
}

export default function Carousel({ items, autoPlayInterval = 5000, lang = 'en' }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(() => new Set([0]));
  const [initialSlideReady, setInitialSlideReady] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const localeCopy: Record<string, { badge: string; quote: string; previous: string; next: string; goTo: string; slides: Array<Pick<CarouselItem, 'title' | 'subtitle' | 'button_text'>> }> = {
    en: { badge: 'HousePlus — Global Wholesale Manufacturer', quote: 'Get a Quote', previous: 'Previous slide', next: 'Next slide', goTo: 'Go to slide', slides: [{ title: 'High-Efficiency Solar Solutions', subtitle: 'Professional-grade solar panels, inverters and portable power stations for global wholesale partners', button_text: 'Explore Solar Products' }, { title: 'Smart Home Appliances', subtitle: 'Energy-efficient kitchen and household appliances with full OEM/ODM customisation support', button_text: 'View Appliances' }, { title: '3C Electronics & Accessories', subtitle: 'Premium headphones, smart watches, portable SSDs and charging accessories for modern consumers', button_text: 'View Electronics' }] },
    es: { badge: 'HousePlus — Fabricante mayorista global', quote: 'Solicitar cotización', previous: 'Diapositiva anterior', next: 'Diapositiva siguiente', goTo: 'Ir a la diapositiva', slides: [{ title: 'Soluciones solares de alta eficiencia', subtitle: 'Paneles solares, inversores y estaciones de energía portátiles de grado profesional para socios mayoristas globales', button_text: 'Explorar productos solares' }, { title: 'Electrodomésticos inteligentes', subtitle: 'Electrodomésticos de cocina y hogar eficientes con soporte completo de personalización OEM/ODM', button_text: 'Ver electrodomésticos' }, { title: 'Electrónica y accesorios 3C', subtitle: 'Auriculares, relojes inteligentes, SSD portátiles y accesorios de carga para consumidores modernos', button_text: 'Ver electrónica' }] },
    de: { badge: 'HousePlus — Globaler Großhandelshersteller', quote: 'Angebot anfordern', previous: 'Vorherige Folie', next: 'Nächste Folie', goTo: 'Zur Folie', slides: [{ title: 'Hocheffiziente Solarlösungen', subtitle: 'Professionelle Solarmodule, Wechselrichter und tragbare Kraftwerke für globale Großhandelspartner', button_text: 'Solarprodukte entdecken' }, { title: 'Smarte Haushaltsgeräte', subtitle: 'Energieeffiziente Küchen- und Haushaltsgeräte mit umfassender OEM/ODM-Anpassung', button_text: 'Haushaltsgeräte ansehen' }, { title: '3C-Elektronik und Zubehör', subtitle: 'Premium-Kopfhörer, Smartwatches, portable SSDs und Ladezubehör für moderne Verbraucher', button_text: 'Elektronik ansehen' }] },
    fr: { badge: 'HousePlus — Fabricant grossiste mondial', quote: 'Demander un devis', previous: 'Diapositive précédente', next: 'Diapositive suivante', goTo: 'Aller à la diapositive', slides: [{ title: 'Solutions solaires à haut rendement', subtitle: 'Panneaux solaires, onduleurs et stations d’énergie portables de qualité professionnelle pour partenaires grossistes mondiaux', button_text: 'Explorer les produits solaires' }, { title: 'Appareils ménagers intelligents', subtitle: 'Appareils de cuisine et de maison économes en énergie avec prise en charge OEM/ODM complète', button_text: 'Voir les appareils' }, { title: 'Électronique et accessoires 3C', subtitle: 'Casques haut de gamme, montres intelligentes, SSD portables et accessoires de charge pour consommateurs modernes', button_text: 'Voir l’électronique' }] },
    ar: { badge: 'HousePlus — مصنع جملة عالمي', quote: 'اطلب عرض سعر', previous: 'الشريحة السابقة', next: 'الشريحة التالية', goTo: 'انتقل إلى الشريحة', slides: [{ title: 'حلول شمسية عالية الكفاءة', subtitle: 'ألواح شمسية ومحولات ومحطات طاقة محمولة احترافية لشركاء الجملة حول العالم', button_text: 'استكشف المنتجات الشمسية' }, { title: 'أجهزة منزلية ذكية', subtitle: 'أجهزة مطبخ ومنزل موفرة للطاقة مع دعم كامل للتخصيص OEM/ODM', button_text: 'عرض الأجهزة المنزلية' }, { title: 'إلكترونيات وملحقات 3C', subtitle: 'سماعات وساعات ذكية ووحدات SSD محمولة وملحقات شحن للمستهلكين العصريين', button_text: 'عرض الإلكترونيات' }] },
  };
  const copy = localeCopy[lang] || localeCopy.en;

  // Professional HousePlus default items — self-hosted R2 images for SEO
  const getDefaultItems = (): CarouselItem[] => [
    {
      _uid: 'default-1',
      image: { filename: 'https://images.houseplus-ch.com/media/houseplus-carousel-houseplus-solar-hero/', alt: 'HousePlus Solar Energy Solutions — Solar Panels, Inverters and Battery Storage for Wholesale' },
      ...copy.slides[0],
      button_link: { url: `/products`, cached_url: `/products` }
    },
    {
      _uid: 'default-2',
      image: { filename: 'https://images.houseplus-ch.com/media/houseplus-carousel-houseplus-home-appliances-hero/', alt: 'HousePlus Smart Home Appliances — Induction Cooktops, Air Fryers and Electric Kettles for OEM ODM' },
      ...copy.slides[1],
      button_link: { url: `/products`, cached_url: `/products` }
    },
    {
      _uid: 'default-3',
      image: { filename: 'https://images.houseplus-ch.com/media/houseplus-carousel-houseplus-3c-electronics-hero/', alt: 'HousePlus 3C Electronics — Headphones, Smart Watches, SSD and Charging Accessories Wholesale' },
      ...copy.slides[2],
      button_link: { url: `/products`, cached_url: `/products` }
    }
  ];

  const defaultItems = getDefaultItems();

  const displayItems = items && items.length > 0 ? items : defaultItems;

  const markSlideLoaded = useCallback((index: number) => {
    setLoadedIndexes((previousIndexes) => {
      if (previousIndexes.has(index)) return previousIndexes;
      const nextIndexes = new Set(previousIndexes);
      nextIndexes.add(index);
      return nextIndexes;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    markSlideLoaded(index);
    setCurrentIndex(index);
  }, [markSlideLoaded]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % displayItems.length);
  }, [currentIndex, displayItems.length, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide((currentIndex - 1 + displayItems.length) % displayItems.length);
  }, [currentIndex, displayItems.length, goToSlide]);

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

  // Transparent absolute slides still sit in the browser's viewport geometry,
  // so native lazy loading can request them during the initial navigation.
  // Keep first-view bandwidth for the LCP slide, then prepare only the next
  // slide after the first image has completed.
  useEffect(() => {
    if (!initialSlideReady || displayItems.length <= 1) return;
    const nextIndex = (currentIndex + 1) % displayItems.length;
    const preloadTimer = window.setTimeout(() => markSlideLoaded(nextIndex), 1500);
    return () => window.clearTimeout(preloadTimer);
  }, [currentIndex, displayItems.length, initialSlideReady, markSlideLoaded]);

  const handleManualAction = (action: () => void) => {
    setIsAutoPlaying(false);
    action();
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const formatLink = (link: any) => {
    if (!link) return `/${lang}/products`;
    let url = link.cached_url || link.url || '';
    
    if (url.startsWith('http')) {
      return url;
    }
    
    if (url.startsWith(`/${lang}/`)) {
      return url;
    }
    
    if (url.startsWith('/')) {
      return `/${lang}${url}`;
    }
    
    return `/${lang}/${url}`;
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
          {loadedIndexes.has(index) && (
            <Image
              src={item.image.filename}
              alt={item.image.alt || item.title}
              title={item.image.alt || item.title}
              fill
              sizes="(max-width: 767px) 100vw, 1400px"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              onLoad={index === 0 ? () => setInitialSlideReady(true) : undefined}
              className="object-cover brightness-[0.75]"
            />
          )}
          {/* Left-aligned gradient overlay for business style */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/65 via-slate-800/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-start px-8 md:px-20">
            <div className="max-w-2xl">
              {/* Slide badge */}
              <span className={`inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-5 transition-all duration-700 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>{copy.badge}</span>
              <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-tight transition-all duration-1000 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {item.title}
              </h2>
              <p className={`text-base md:text-xl text-slate-200 mb-8 max-w-xl leading-relaxed transition-all duration-1000 delay-200 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {item.subtitle}
              </p>
              {item.button_text && (
                <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <Link
                    href={formatLink(item.button_link)}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-wide"
                  >
                    {item.button_text}
                  </Link>
                  <Link
                    href={`/${lang}/contact`}
                    className="px-8 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/40 font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wide"
                  >
                    {copy.quote}
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
        aria-label={copy.previous}
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>
      <button
        onClick={() => handleManualAction(goToNext)}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full transition-all hidden md:flex z-20 border border-white/30"
        aria-label={copy.next}
      >
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {displayItems.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualAction(() => goToSlide(index))}
            className="relative flex h-11 min-w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            aria-label={`${copy.goTo} ${index + 1}`}
          >
            <span
              aria-hidden="true"
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex ? 'w-10 bg-blue-500' : 'w-3 bg-white/50 group-hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>
      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm font-medium z-20 hidden md:block">
        {currentIndex + 1} / {displayItems.length}
      </div>
    </div>
  );
}
