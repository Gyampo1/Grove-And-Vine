import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-24 bg-surface-container-low relative overflow-hidden" aria-label="Critics Testimonials">
      {/* Decorative leaf watermark */}
      <div className="absolute top-1/2 left-4 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Quote Icon Background watermark */}
        <div className="absolute -top-10 left-10 text-primary-container/5 pointer-events-none select-none">
          <Quote className="w-40 h-40 fill-primary-container/5" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-sans text-xs font-bold text-secondary-fixed uppercase tracking-[0.2em] block mb-2">
            The Critical Consensus
          </span>
          <h2 className="font-display text-2xl md:text-4xl text-primary font-bold tracking-tight">
            Journal Reviews
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[360px] flex flex-col justify-between items-center rounded-3xl bg-background border border-outline-variant/15 p-8 md:p-14 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-center space-y-8 flex-grow flex flex-col justify-center"
            >
              {/* Rating */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: current.rating }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 text-secondary-fixed fill-secondary-fixed" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="font-display text-lg sm:text-xl md:text-2xl italic text-primary leading-relaxed font-light px-2 sm:px-6">
                "{current.text}"
              </blockquote>

              {/* Critic Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                <img
                  src={current.image}
                  alt={current.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border border-outline-variant/50"
                />
                <div className="text-center sm:text-left">
                  <cite className="not-italic font-sans text-xs sm:text-sm font-bold text-primary block">
                    {current.name}
                  </cite>
                  <span className="font-sans text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-wider block">
                    {current.role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="flex justify-between items-center w-full mt-10">
            {/* Index Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary ${
                    activeIndex === idx ? 'w-6 bg-primary' : 'w-1.5 bg-outline-variant/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1, x: -1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-2 rounded-xl border border-outline-variant/30 text-primary hover:bg-secondary-fixed/20 hover:border-secondary-fixed transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-2 rounded-xl border border-outline-variant/30 text-primary hover:bg-secondary-fixed/20 hover:border-secondary-fixed transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
