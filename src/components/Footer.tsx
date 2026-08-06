import React, { useState } from 'react';
import { Leaf, Instagram, Facebook, Send, Check, AlertCircle } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onPageChange: (page: PageId) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email address is required.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1200);
  };

  const menuLinks: { label: string; page: PageId }[] = [
    { label: 'Tasting Menu', page: 'menu' },
    { label: 'The Glasshouse story', page: 'about' },
    { label: 'Media & Gallery', page: 'gallery' },
    { label: 'Reservations Desk', page: 'reservations' },
    { label: 'Soirées & Events', page: 'events' },
    { label: 'Contact Us', page: 'contact' }
  ];

  return (
    <footer className="bg-primary text-white border-t border-outline-variant/10 relative overflow-hidden" aria-label="Restaurant footer">
      {/* Subtle organic watermark */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-outline-variant/15">
          {/* Column 1: Brand details */}
          <div className="md:col-span-4 space-y-6">
            <button 
              onClick={() => onPageChange('home')}
              className="flex items-center gap-2 font-display font-bold text-xl tracking-wider uppercase text-white hover:text-secondary-fixed transition-colors cursor-pointer"
            >
              <Leaf className="w-5.5 h-5.5 text-secondary-fixed" />
              <span>GROVE & VINE</span>
            </button>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              An architectural and culinary sanctuary in Cantonments Accra, Ghana, dedicated to equatorial gastronomy and botanical heritage. Dine inside nature.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-all"
                aria-label="Follow Grove & Vine on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-all"
                aria-label="Follow Grove & Vine on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <nav className="md:col-span-3 space-y-5" aria-label="Footer Site Navigation">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-secondary-fixed">
              Explore Selections
            </h4>
            <ul className="space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      onPageChange(link.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-sans text-xs sm:text-sm text-white/70 hover:text-white transition-colors cursor-pointer block text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Contact & Hours */}
          <div className="md:col-span-2 space-y-5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-secondary-fixed">
              Operation Hours
            </h4>
            <div className="space-y-3 font-sans text-xs text-white/70 font-light">
              <div>
                <strong className="block text-[10px] uppercase font-bold text-white/95 mb-0.5 tracking-wider">TUE — SUN</strong>
                <span>12:00 — 23:30 UTC</span>
              </div>
              <div>
                <strong className="block text-[10px] uppercase font-bold text-white/95 mb-0.5 tracking-wider">MONDAYS</strong>
                <span>CLOSED FOR REGENERATION</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter field */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-secondary-fixed">
              Newsletter Subscription
            </h4>
            <p className="font-sans text-xs text-white/70 font-light leading-relaxed">
              Subscribe to receive early-access invites to our upcoming soirées, cooking masterclasses, and vineyard selections.
            </p>

            <form onSubmit={handleSubscribe} noValidate className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="name@domain.com"
                  className={`w-full py-3.5 pl-4 pr-12 bg-primary-container border text-white font-sans text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary-fixed placeholder-white/30 ${
                    error ? 'border-error' : 'border-white/10 focus:border-white/35'
                  }`}
                  disabled={isSubscribed}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || isSubscribed}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-secondary-fixed text-primary rounded-lg hover:bg-white transition-all disabled:opacity-50 cursor-pointer"
                  aria-label="Subscribe"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>

              {error && (
                <p className="text-error-container text-[11px] font-sans flex items-center gap-1 mt-1" role="alert">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{error}</span>
                </p>
              )}

              {isSubscribed && (
                <p className="text-secondary-fixed text-[11px] font-sans font-bold flex items-center gap-1 mt-1">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Subscription confirmed. Welcome, Guest.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/50 font-sans text-[10px] uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} TREEHOUSE ACCRA LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => onPageChange('admin')}
              className="hover:text-secondary-fixed transition-colors cursor-pointer text-left uppercase text-[10px] font-semibold text-white/60 hover:text-white"
            >
              Staff Workspace
            </button>
            <span className="text-white/20">•</span>
            <span>TERMS OF SEATING</span>
            <span className="text-white/20">•</span>
            <span>BOTANICAL CHARTER</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
