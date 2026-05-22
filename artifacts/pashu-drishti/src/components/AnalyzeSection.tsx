import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, AlertCircle, Copy, CheckCircle2, ChevronDown, ChevronUp, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnalyzeBreed } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';

export default function AnalyzeSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const analyzeMutation = useAnalyzeBreed();
  const result = analyzeMutation.data;
  
  const [isCopied, setIsCopied] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    analyzeMutation.reset(); // Reset previous results
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    analyzeMutation.mutate(
      { data: { image: selectedFile } },
      {
        onError: () => {
          toast({
            title: "Analysis Failed",
            description: "There was an error analyzing the image. Please try again.",
            variant: "destructive"
          });
        }
      }
    );
  };

  const copyResult = () => {
    if (!result) return;
    const text = `PashuDrishti Analysis:\nBreed: ${result.breedName}\nSpecies: ${result.species}\nConfidence: ${result.confidence}%\nPurpose: ${result.purpose}`;
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({ title: "Copied to clipboard" });
    });
  };

  const isScanning = analyzeMutation.isPending;

  return (
    <section id="analyze" className="py-24 container mx-auto px-4 md:px-6">
      <div className="text-center mb-12 slide-in-up">
        <h2 className="font-serif text-4xl font-bold text-primary mb-4">Identify Breed</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto uppercase tracking-widest text-sm font-medium">Upload a photo of cattle or buffalo to analyze.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {!result ? (
          <div className="glassmorphism p-8 rounded-2xl border-primary/20 shadow-[0_0_30px_rgba(200,150,30,0.05)] relative overflow-hidden transition-all duration-300">
            {isScanning && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                <div className="relative">
                  <Scan className="w-16 h-16 text-primary rotate-ring mb-4" />
                  <div className="absolute inset-0 scan-line"></div>
                </div>
                <h3 className="font-display text-xl text-primary tracking-widest uppercase animate-pulse">Scanning Image</h3>
                <p className="text-muted-foreground mt-2 text-sm">Analyzing bovine features...</p>
              </div>
            )}
            
            <div 
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                previewUrl ? 'border-primary/50 bg-primary/5' : 'border-muted hover:border-primary/50 hover:bg-primary/5'
              } ${!isScanning && !previewUrl ? 'scan-line relative' : ''}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  if (fileInputRef.current) {
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    fileInputRef.current.files = dt.files;
                    const event = new Event('change', { bubbles: true });
                    fileInputRef.current.dispatchEvent(event);
                  }
                }
              }}
            >
              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <div className="w-64 h-64 mb-6 relative">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover hex-clip border-2 border-primary/50" />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="mb-2">
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mb-6 shadow-lg border border-border group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">Drop your cattle image here</h3>
                  <p className="text-muted-foreground mb-6 text-sm">or click to upload (JPG, PNG up to 10MB)</p>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/jpeg,image/png,image/webp" 
                className="hidden" 
              />
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground font-display tracking-widest uppercase w-full md:w-auto min-w-[200px]"
                disabled={!selectedFile || isScanning}
                onClick={handleAnalyze}
              >
                {isScanning ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                ) : 'Analyze Breed'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="slide-in-up">
            <div className="flex justify-between items-center mb-6">
              <Button variant="outline" onClick={() => { analyzeMutation.reset(); setSelectedFile(null); setPreviewUrl(null); }} className="border-border text-foreground hover:bg-card">
                ← New Analysis
              </Button>
              <Button variant="outline" onClick={copyResult} className="border-primary/50 text-primary hover:bg-primary/10">
                {isCopied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Share Result
              </Button>
            </div>

            <div className="glassmorphism rounded-2xl border-primary/30 overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row">
                {/* Left: Image */}
                <div className="w-full md:w-2/5 p-6 bg-card/50 flex flex-col items-center justify-center border-r border-border/50">
                  <div className="w-full max-w-[250px] aspect-square relative mb-4">
                    <div className="absolute inset-0 bg-primary/20 hex-clip transform scale-105"></div>
                    <img src={previewUrl!} alt="Analyzed" className="w-full h-full object-cover hex-clip relative z-10" />
                  </div>
                  
                  {/* Confidence Circle */}
                  <div className="flex items-center gap-4 mt-6 bg-background rounded-full px-6 py-3 border border-border">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-muted" />
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                          strokeDasharray="125.6" 
                          strokeDashoffset={125.6 - (125.6 * result.confidence) / 100}
                          className="text-primary transition-all duration-1000 ease-out" 
                        />
                      </svg>
                      <span className="absolute text-xs font-bold text-foreground">{result.confidence}%</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Confidence Score</p>
                      {result.confidence > 85 ? (
                        <p className="text-sm font-medium text-accent">High Confidence</p>
                      ) : result.confidence < 60 ? (
                        <p className="text-sm font-medium text-amber-500">Possible Match</p>
                      ) : (
                        <p className="text-sm font-medium text-foreground">Good Match</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-3/5 p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold uppercase tracking-wider">
                        {result.species}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-card border border-border text-muted-foreground text-xs font-bold uppercase tracking-wider">
                        {result.originState}
                      </span>
                    </div>
                    <h3 className="font-display text-4xl text-primary mb-1">{result.breedName}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-card p-4 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Purpose</p>
                      <p className="font-medium text-foreground">{result.purpose}</p>
                    </div>
                    <div className="bg-card p-4 rounded-xl border border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                      <p className={`font-medium ${
                        result.conservationStatus === 'Endangered' ? 'text-destructive' :
                        result.conservationStatus === 'Vulnerable' ? 'text-amber-500' : 'text-secondary'
                      }`}>{result.conservationStatus}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                      {result.keyFeatures.map((f, i) => (
                        <span key={i} className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion Profile */}
              <div className="border-t border-border bg-background/50">
                <button 
                  onClick={() => setShowFullProfile(!showFullProfile)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-card/50 transition-colors"
                >
                  <span className="font-display text-lg tracking-widest uppercase text-foreground">Full Breed Profile</span>
                  {showFullProfile ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-primary" />}
                </button>
                
                {showFullProfile && (
                  <div className="p-6 pt-0 border-t border-border/30 slide-in-up">
                    <p className="text-muted-foreground leading-relaxed mb-6">{result.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Body Color</p>
                        <p className="text-foreground">{result.bodyColor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Horn Type</p>
                        <p className="text-foreground">{result.hornType}</p>
                      </div>
                      {result.milkYield && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Milk Yield</p>
                          <p className="text-foreground">{result.milkYield}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Alternate Breeds */}
            {result.alternateBreeds && result.alternateBreeds.length > 0 && (
              <div className="mt-8">
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4 text-center">Other Possible Matches</p>
                <div className="flex justify-center gap-4">
                  {result.alternateBreeds.map((ab, i) => (
                    <div key={i} className="glassmorphism px-6 py-3 rounded-lg border-border text-center">
                      <p className="font-display text-primary">{ab}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}