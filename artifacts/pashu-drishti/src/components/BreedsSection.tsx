import React, { useState } from 'react';
import { useListBreeds } from '@workspace/api-client-react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BreedsSection() {
  const [filter, setFilter] = useState<'All' | 'Cattle' | 'Buffalo' | 'Dairy' | 'Draft' | 'Dual Purpose' | 'Endangered'>('All');
  
  // Convert filter to API params
  const getParams = () => {
    switch(filter) {
      case 'Cattle': return { species: 'Cattle' as const };
      case 'Buffalo': return { species: 'Buffalo' as const };
      case 'Dairy': return { purpose: 'Dairy' as const };
      case 'Draft': return { purpose: 'Draft' as const };
      case 'Dual Purpose': return { purpose: 'Dual Purpose' as const };
      case 'Endangered': return { conservationStatus: 'Endangered' as const };
      default: return {};
    }
  };

  const { data: breeds, isLoading, isError } = useListBreeds(getParams());

  const filterTabs = ['All', 'Cattle', 'Buffalo', 'Dairy', 'Draft', 'Dual Purpose', 'Endangered'];

  return (
    <section id="breeds" className="py-24 container mx-auto px-4 md:px-6">
      <div className="text-center mb-12 slide-in-up">
        <h2 className="font-serif text-4xl font-bold text-foreground mb-4">India's Bovine Heritage</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto uppercase tracking-widest text-sm font-medium">Explore the diverse indigenous breeds of the subcontinent.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filterTabs.map(tab => (
          <Button
            key={tab}
            variant={filter === tab ? 'default' : 'outline'}
            onClick={() => setFilter(tab as any)}
            className={`rounded-full uppercase tracking-wider text-xs ${
              filter === tab ? 'bg-primary text-primary-foreground font-bold' : 'border-border text-muted-foreground hover:text-primary hover:border-primary/50'
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground uppercase tracking-widest font-display">Loading Breeds...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-destructive">
          <p>Failed to load breeds. Please try again later.</p>
        </div>
      ) : Array.isArray(breeds) && breeds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {breeds.map((breed, i) => {
            const b = breed || ({} as any);
            return (
            <div 
              key={b.id ?? i} 
              className="group glassmorphism rounded-xl border-border overflow-hidden hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(200,150,30,0.1)] hover:border-primary/50"
              style={{ animationDelay: `${(i % 10) * 50}ms` }}
            >
              <div className="h-32 bg-gradient-to-br from-card to-background relative overflow-hidden border-b border-border flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background"></div>
                <span className="font-serif text-6xl text-primary/30 opacity-50 absolute -right-4 -bottom-4 group-hover:scale-110 transition-transform">{String(b.name || '').charAt(0)}</span>
                <div className="relative z-10 text-center">
                  <h3 className="font-display text-2xl font-bold text-foreground">{b.name ?? 'Unknown'}</h3>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-secondary/20 text-secondary rounded text-[10px] font-bold uppercase tracking-wider border border-secondary/30">{b.species ?? ''}</span>
                  <span className="px-2 py-1 bg-background text-muted-foreground rounded text-[10px] font-bold uppercase tracking-wider border border-border">{b.purpose ?? ''}</span>
                  <span className="px-2 py-1 bg-background text-muted-foreground rounded text-[10px] font-bold uppercase tracking-wider border border-border">{b.state ?? ''}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{b.description ?? ''}</p>
                </div>
                
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <div className="flex gap-1 flex-wrap">
                    {(b.traits || []).slice(0,2).map((t: string, idx: number) => (
                      <span key={idx} className="text-[10px] text-muted-foreground uppercase bg-card px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        b.conservationStatus === 'Endangered' ? 'text-destructive' :
                        b.conservationStatus === 'Vulnerable' ? 'text-amber-500' : 'text-secondary'
                      }`}>
                    {b.conservationStatus ?? 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          )})}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p>No breeds found matching these filters.</p>
        </div>
      )}
    </section>
  );
}