import React, { useEffect, useRef, useState } from 'react';
import { useGetStats } from '@workspace/api-client-react';

function Counter({ end, duration = 2000, suffix = "" }: { end: number | string, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const endNum = typeof end === 'string' ? parseFloat(end) : end;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isNaN(endNum)) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * endNum));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, endNum, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-5xl md:text-6xl text-primary font-bold mb-2">
        {isNaN(endNum) ? end : count}{suffix}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const { data: stats } = useGetStats();

  if (!stats) return null;

  // Ensure accuracyRate is a usable numeric/string value for Counter
  const rawAccuracy = stats.accuracyRate ?? '';
  const accuracyVal = rawAccuracy === '' || rawAccuracy === null || rawAccuracy === undefined
    ? 0
    : String(rawAccuracy).replace('%', '').trim();

  return (
    <section id="stats" className="py-20 border-y border-primary/20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-border">
          
          <div className="flex flex-col items-center justify-center p-4">
            <Counter end={stats.totalBreeds} suffix="+" />
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-medium mt-2 text-center">Breeds Identified</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4">
            <Counter end={stats.statesCovered} />
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-medium mt-2 text-center">States Covered</p>
          </div>
          
            <div className="flex flex-col items-center justify-center p-4">
            <Counter end={accuracyVal} suffix="%" />
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-medium mt-2 text-center">AI Accuracy</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="text-center">
                <span className="font-serif text-4xl text-primary font-bold block">{stats.cattleCount}</span>
                <span className="text-xs text-muted-foreground uppercase">Cattle</span>
              </div>
              <span className="text-border text-2xl font-light">/</span>
              <div className="text-center">
                <span className="font-serif text-4xl text-primary font-bold block">{stats.buffaloCount}</span>
                <span className="text-xs text-muted-foreground uppercase">Buffalo</span>
              </div>
            </div>
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-medium mt-2 text-center">Species Split</p>
          </div>
          
        </div>
      </div>
    </section>
  );
}