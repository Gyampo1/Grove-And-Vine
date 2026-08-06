import { useState } from 'react';
import { MapPin, Copy, Check, Compass, Info, Car, Clock } from 'lucide-react';

export default function MapPlaceholder() {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeStreet, setActiveStreet] = useState<string | null>(null);

  const coordinates = '5.5866, -0.1747';
  const addressText = '12 Cantonments Road, Accra, Ghana';

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(coordinates);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const features = [
    { name: 'DuBois Centre Road', detail: 'A historic tree-lined cultural boulevard just 2 mins west.' },
    { name: 'US Embassy Avenue', detail: 'A highly secure, serene, landscaped diplomatic corridor.' },
    { name: 'Accra Botanical Bypass', detail: 'Connecting our garden directly to the central nursery systems.' }
  ];

  return (
    <div className="rounded-3xl border border-outline-variant/15 overflow-hidden bg-surface-container-low shadow-lg flex flex-col lg:flex-row max-w-5xl mx-auto items-stretch">
      
      {/* Interactive Vector Map Canvas */}
      <div className="flex-grow bg-primary-container relative min-h-[350px] overflow-hidden p-6 flex flex-col justify-between select-none">
        {/* Abstract Street Vector Paths Overlay */}
        <div className="absolute inset-0 opacity-25">
          {/* Main Diagonal Road */}
          <div className="absolute top-0 bottom-0 left-[35%] w-8 bg-on-primary-container/30 rotate-12 origin-top transform" />
          {/* Intersection Road */}
          <div className="absolute left-0 right-0 top-[40%] h-8 bg-on-primary-container/30 -rotate-6 origin-left transform" />
          {/* Minor Lanes */}
          <div className="absolute top-[20%] bottom-0 left-[60%] w-4 bg-on-primary-container/20 -rotate-45" />
          <div className="absolute top-[65%] bottom-0 left-[15%] w-3 bg-on-primary-container/15 rotate-45" />
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-on-primary-container/10" />
        </div>

        {/* Floating Botanic Gardens Watermark */}
        <div className="absolute top-1/4 right-1/4 flex flex-col items-center opacity-30 text-secondary-fixed">
          <Compass className="w-24 h-24 animate-float text-secondary-fixed/20" />
          <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-secondary-fixed-dim mt-2">BOTANICAL CORRIDOR</span>
        </div>

        {/* Interactive Street hover labels */}
        <div className="absolute top-6 left-6 space-y-2 z-10">
          <span className="text-[9px] font-sans font-bold text-secondary-fixed-dim/70 uppercase tracking-widest block mb-2">Accra Cantonments Layout</span>
          <div className="flex flex-col gap-1.5 items-start">
            {features.map((street) => (
              <button
                key={street.name}
                onMouseEnter={() => setActiveStreet(street.name)}
                onMouseLeave={() => setActiveStreet(null)}
                className={`text-[10px] font-sans font-bold py-1 px-2.5 rounded-lg border transition-all cursor-crosshair ${
                  activeStreet === street.name
                    ? 'bg-secondary-fixed border-secondary-fixed text-primary shadow-sm'
                    : 'bg-primary/45 border-white/10 text-white/70 hover:text-white hover:border-white/20'
                }`}
              >
                {street.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pulsing Glowing Location Pin of Treehouse */}
        <div className="absolute top-[48%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          {/* Pulse Ripple */}
          <div className="absolute w-12 h-12 rounded-full bg-secondary-fixed/30 animate-ping pointer-events-none" />
          <div className="absolute w-20 h-20 rounded-full bg-secondary-fixed/15 animate-pulse-glow pointer-events-none" />
          
          <div className="bg-primary text-secondary-fixed border border-secondary-fixed p-3 rounded-2xl shadow-xl flex items-center gap-2">
            <MapPin className="w-5 h-5 text-secondary-fixed stroke-[2.5]" />
            <div className="text-left">
              <strong className="font-display text-xs font-bold block text-white uppercase tracking-wider">GROVE & VINE</strong>
              <span className="font-sans text-[9px] text-secondary-fixed/80 font-semibold uppercase tracking-widest">Glass Canopy</span>
            </div>
          </div>
        </div>

        {/* Dynamic Street Info overlay */}
        <div className="relative z-10 self-end w-full max-w-sm mt-auto">
          {activeStreet ? (
            <div className="p-3.5 rounded-xl bg-primary/90 backdrop-blur-sm border border-white/10 text-white text-[11px] font-sans leading-relaxed animate-fade-in-up">
              <strong>{activeStreet}:</strong> {features.find(f => f.name === activeStreet)?.detail}
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-primary/45 backdrop-blur-sm border border-white/5 text-white/50 text-[10px] font-sans tracking-wider uppercase flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-secondary-fixed-dim" />
              <span>Hover street tags to explore layout</span>
            </div>
          )}
        </div>
      </div>

      {/* Address & Logistics Sidebar */}
      <div className="p-8 lg:w-96 bg-background flex flex-col justify-between shrink-0 space-y-6">
        <div className="space-y-6">
          <div className="space-y-1.5">
            <span className="font-sans text-[10px] font-bold text-secondary uppercase tracking-widest">Concierge Logistics</span>
            <h3 className="font-display text-xl font-bold text-primary">Cantonments HQ</h3>
          </div>

          <div className="space-y-4">
            {/* Address copyable block */}
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/15 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-sans font-bold text-on-surface-variant/50 uppercase tracking-wider block">Physical Address</span>
                <p className="font-sans text-xs text-primary font-medium leading-relaxed">{addressText}</p>
              </div>
              <button
                onClick={handleCopyAddress}
                className="p-2 rounded-lg bg-background hover:bg-secondary-fixed/20 hover:text-primary text-on-surface-variant transition-colors cursor-pointer"
                aria-label="Copy Address"
              >
                {copiedAddress ? <Check className="w-4 h-4 text-secondary stroke-[2.5]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* GPS copyable block */}
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/15 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-sans font-bold text-on-surface-variant/50 uppercase tracking-wider block">GPS Coordinates</span>
                <p className="font-sans text-xs text-primary font-mono font-bold leading-relaxed">{coordinates}</p>
              </div>
              <button
                onClick={handleCopyCoords}
                className="p-2 rounded-lg bg-background hover:bg-secondary-fixed/20 hover:text-primary text-on-surface-variant transition-colors cursor-pointer"
                aria-label="Copy GPS Coordinates"
              >
                {copiedCoords ? <Check className="w-4 h-4 text-secondary stroke-[2.5]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Practical details list */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-center gap-3 text-xs font-sans text-on-surface-variant font-light">
              <Car className="w-4 h-4 text-secondary-fixed-dim shrink-0" />
              <span>Complimentary private secure valet parking.</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-sans text-on-surface-variant font-light">
              <Clock className="w-4 h-4 text-secondary-fixed-dim shrink-0" />
              <span>Closed Mondays. Lunch & Dinner Tue-Sun.</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-outline-variant/15 text-[10px] font-sans text-on-surface-variant/40 uppercase tracking-widest">
          Concierge: +233 (0) 55 900 1234
        </div>
      </div>

    </div>
  );
}
