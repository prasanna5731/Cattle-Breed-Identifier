import React from 'react';
import { Camera, ScanSearch, Leaf } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-card/30 border-y border-border relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 slide-in-up">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-4">How PashuDrishti Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto uppercase tracking-widest text-sm font-medium">Simple. Fast. Accurate.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center text-center relative group">
            <div className="w-24 h-24 rounded-2xl glassmorphism border-primary/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-primary transition-all duration-300">
              <Camera className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">1. Upload Photo</h3>
            <p className="text-muted-foreground text-sm">Take a clear photo of the cattle or buffalo from the side or front.</p>
            
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border"></div>
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center text-center relative group delay-100">
            <div className="w-24 h-24 rounded-2xl glassmorphism border-primary/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-primary transition-all duration-300 relative">
              <div className="absolute inset-2 border border-primary/50 rounded-xl rotate-ring opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <ScanSearch className="w-10 h-10 text-primary relative z-10" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">2. AI Scans Features</h3>
            <p className="text-muted-foreground text-sm">Our vision model analyzes horns, color, hump, and body structure.</p>
            
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border"></div>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center text-center group delay-200">
            <div className="w-24 h-24 rounded-2xl glassmorphism border-primary/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-primary transition-all duration-300">
              <Leaf className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">3. Get Profile</h3>
            <p className="text-muted-foreground text-sm">Receive detailed breed information, traits, and conservation status.</p>
          </div>
        </div>
      </div>
    </section>
  );
}