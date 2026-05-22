import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      
      {/* Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glassmorphism py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div 
            className="flex items-baseline gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <h1 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-wider group-hover:text-amber-400 transition-colors">
              PashuDrishti
            </h1>
            <span className="text-muted-foreground text-sm font-medium tracking-widest uppercase ml-2 hidden sm:inline-block">
              पशु दृष्टि
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('how-it-works')} className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-widest">
              How It Works
            </button>
            <button onClick={() => scrollTo('breeds')} className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-widest">
              Breeds
            </button>
            <button onClick={() => scrollTo('stats')} className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-widest">
              Impact
            </button>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-display tracking-widest uppercase rounded-sm"
              onClick={() => scrollTo('analyze')}
            >
              Identify Breed
            </Button>
          </nav>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-foreground p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glassmorphism border-t border-border/50 py-4 px-4 flex flex-col gap-4 shadow-xl">
            <button onClick={() => scrollTo('how-it-works')} className="text-left py-2 text-foreground uppercase tracking-widest font-medium border-b border-border/30">
              How It Works
            </button>
            <button onClick={() => scrollTo('breeds')} className="text-left py-2 text-foreground uppercase tracking-widest font-medium border-b border-border/30">
              Breeds
            </button>
            <button onClick={() => scrollTo('stats')} className="text-left py-2 text-foreground uppercase tracking-widest font-medium border-b border-border/30">
              Impact
            </button>
            <Button 
              className="w-full bg-primary text-primary-foreground font-display tracking-widest uppercase rounded-sm mt-2"
              onClick={() => scrollTo('analyze')}
            >
              Identify Breed
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-primary mb-2">PashuDrishti</h2>
              <p className="text-muted-foreground font-medium tracking-widest uppercase text-xs mb-4">Indigenous Bovine Recognition System</p>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                Empowering Indian farmers and veterinarians with AI to recognize, protect, and celebrate our indigenous bovine heritage.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-lg text-foreground mb-2">Navigation</h3>
              <button onClick={() => scrollTo('how-it-works')} className="text-left text-muted-foreground hover:text-primary transition-colors w-fit">How It Works</button>
              <button onClick={() => scrollTo('breeds')} className="text-left text-muted-foreground hover:text-primary transition-colors w-fit">Breed Gallery</button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left text-muted-foreground hover:text-primary transition-colors w-fit">Upload Image</button>
            </div>
            
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-lg text-foreground mb-2">Connect</h3>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors w-fit">Contact Us</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors w-fit">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors w-fit">Terms of Service</a>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} PashuDrishti. All rights reserved.
            </p>
            <p className="text-sm font-medium text-foreground bg-background/50 py-2 px-4 border border-border rounded-full inline-flex items-center gap-2">
              Made for Indian Farmers <span className="text-lg">🇮🇳</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}