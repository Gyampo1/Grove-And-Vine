import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, Compass } from 'lucide-react';
import { PageId } from '../types';

interface HeroProps {
  onPageChange: (page: PageId) => void;
}

export default function Hero({ onPageChange }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[650px] w-full flex items-center justify-center overflow-hidden bg-primary" aria-label="Welcome Hero">
      {/* Immersive Parallax Background */}
      <div className="absolute inset-0 z-0 select-none">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmLuWqfc9FZo4VbR30Nd2xiL2j_RAmjacK3qH2eYCMEYvbX0UB92XmsuPodDvTWAgJO_g9SYJ46dTiaJ1QholyzUdRVUtbJWFTpGNtbTHzRHqYMMXjNatInD3sUA5wveFMI8DdCYxkld3ou6KiwzkoA5ztXZQHgXun9Ofn6h8CsaKHNkhpDeTuyoWUeHKIowRKrW7IdzsSOLjAmbuEfU6GAWgHCEKjTKcajQ9nnTmHAGmJ_01xhpmZ65kP9R6NVlmjG3EzRCulIVo')",
            backgroundAttachment: 'scroll'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/30 to-background" />
      </div>

      {/* Decorative Floating Leaves / Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-xs md:text-sm text-secondary-fixed font-bold uppercase tracking-[0.3em] block mb-4"
        >
          Established 2024 — Cantonments, Accra
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-4xl sm:text-6xl md:text-7.5xl text-white font-bold leading-[1.1] tracking-tight mb-8 max-w-4xl mx-auto text-balance"
        >
          A Sanctuary of <br />
          <span className="italic font-normal text-secondary-fixed">Arboreal</span> Elegance.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-sm sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-12 font-light text-balance"
        >
          GROVE & VINE is a glass-walled love letter to the West African forest. Experience the precise discipline of fine dining amidst the untamed whisper of the canopy.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPageChange('reservations')}
            className="w-full sm:w-auto bg-secondary-fixed hover:bg-white text-primary font-sans text-xs font-semibold uppercase tracking-widest py-4.5 px-10 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-fixed focus:ring-offset-2 focus:ring-offset-primary"
          >
            <span>Book a Table</span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPageChange('menu')}
            className="w-full sm:w-auto border border-white/20 hover:border-white/55 text-white font-sans text-xs font-semibold uppercase tracking-widest py-4.5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Compass className="w-4 h-4 text-secondary-fixed animate-spin-slow" />
            <span>Explore Menu</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative bottom lines */}
      <div className="absolute bottom-10 left-10 hidden md:block text-left text-white/50 font-sans text-[10px] tracking-widest leading-normal z-10">
        <span className="block">GPS: 5.5866° N, 0.1747° W</span>
        <span className="block uppercase text-secondary-fixed/60 font-bold mt-1">Accra Botanical Corridor</span>
      </div>

      <div className="absolute bottom-10 right-10 hidden md:block text-right text-white/50 font-sans text-[10px] tracking-widest leading-normal z-10">
        <span className="block">TUE — SUN: 12:00 — 23:30</span>
        <span className="block mt-1">CLOSED ON MONDAYS</span>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button 
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight - 80,
            behavior: 'smooth'
          });
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors duration-300 cursor-pointer z-10"
        aria-label="Scroll down"
      >
        <span className="font-sans text-[10px] uppercase tracking-widest font-semibold">Discover More</span>
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}
