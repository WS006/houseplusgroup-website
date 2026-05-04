'use client';

import { useState, useEffect } from 'react';

interface CounterProps {
  end: string;
  label: string;
}

export default function Counter({ end, label }: CounterProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // 简单的数字动画
    const numericPart = parseInt(end.replace(/[^0-9]/g, ''));
    if (isNaN(numericPart)) return;
    
    const duration = 2000; // 2秒
    const steps = 60;
    const increment = numericPart / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      current += increment;
      
      if (step >= steps) {
        clearInterval(timer);
        setCount(numericPart);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [end]);
  
  // 保留原来的后缀（如 +, m 等）
  const suffix = end.replace(/[0-9]/g, '');
  
  return (
    <div className="text-center">
      <div className="text-4xl font-black text-blue-600">{count}{suffix}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}
