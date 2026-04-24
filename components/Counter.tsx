'use client';
import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: string;
  label: string;
}

export default function Counter({ end, label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Extract numeric part
  const numericEnd = parseInt(end.replace(/\D/g, '')) || 0;
  const suffix = end.replace(/[0-9]/g, '');

  useEffect(() => {
    setIsMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !isMounted) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = numericEnd / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, isMounted, numericEnd]);

  // Initial render on server and before mounting on client
  if (!isMounted) {
    return (
      <div className="opacity-0">
        <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1 flex justify-center items-baseline">
          <span>0</span>
          <span className="text-blue-600 ml-0.5">{suffix}</span>
        </div>
        <div className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-bold">{label}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1 flex justify-center items-baseline">
        <span>{count}</span>
        <span className="text-blue-600 ml-0.5">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-bold">{label}</div>
    </div>
  );
}
