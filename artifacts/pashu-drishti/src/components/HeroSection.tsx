import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; s: number; d: number }[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 3 + 1,
      d: Math.random() * 5 + 5,
    }));
    setParticles(newParticles);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 overflow-hidden" id="hero">
      {/* Background Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle bg-primary/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            animationDuration: `${p.d}s`,
            animationDelay: `-${p.d / 2}s`
          }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left slide-in-up">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Know Your Breed. <br/>
            <span className="text-primary italic">Know Your Herd.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-8 font-medium">
            AI-powered identification of 30+ Indian cattle & buffalo breeds. Preserving our ancient agricultural heritage with cutting-edge technology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-12">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-wider uppercase"
              onClick={() => scrollTo('analyze')}
            >
              Analyze Image <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground font-display tracking-wider uppercase"
              onClick={() => scrollTo('breeds')}
            >
              Browse Breeds
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-sm font-display tracking-widest text-primary/80 uppercase">
            <span>30+ Breeds</span>
            <span className="h-1 w-1 rounded-full bg-primary/50"></span>
            <span>15 States</span>
            <span className="h-1 w-1 rounded-full bg-primary/50"></span>
            <span>95%+ Accuracy</span>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md mx-auto relative perspective-1000 slide-in-up delay-200">
          <div className="relative w-full aspect-[3/4] preserve-3d group">
            {/* 3D Stacked Cards effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-card to-background border border-primary/30 rounded-xl shadow-2xl transform transition-transform duration-700 -rotate-y-12 -rotate-x-12 translate-x-4 translate-y-4 group-hover:-rotate-y-6 group-hover:-rotate-x-6 z-10 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-luminosity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                <h3 className="font-display text-2xl text-primary mb-1">Gir</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-widest">Cattle • Gujarat</p>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-card border border-border rounded-xl transform transition-transform duration-700 -rotate-y-12 -rotate-x-12 translate-x-8 translate-y-8 z-0 opacity-50"></div>
            <div className="absolute inset-0 bg-card border border-border rounded-xl transform transition-transform duration-700 -rotate-y-12 -rotate-x-12 translate-x-12 translate-y-12 z-[-1] opacity-20"></div>
          </div>
        </div>
      </div>

      <div className="w-full mt-24 border-y border-primary/20 bg-background/50 backdrop-blur py-4 relative z-20">
        <div className="marquee-container">
          <div className="marquee-content flex gap-8 items-center text-primary/60 font-display tracking-widest text-sm uppercase whitespace-nowrap">
            <span>Gir</span> • <span>Sahiwal</span> • <span>Red Sindhi</span> • <span>Murrah</span> • <span>Tharparkar</span> • <span>Kankrej</span> • <span>Hariana</span> • <span>Ongole</span> • <span>Deoni</span> • <span>Nili-Ravi</span> • <span>Jafarabadi</span> • <span>Gir</span> • <span>Sahiwal</span> • <span>Red Sindhi</span> • <span>Murrah</span> • <span>Tharparkar</span>
          </div>
        </div>
      </div>
    </section>
  );
}