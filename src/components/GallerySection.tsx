import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'ambiance' | 'events'>('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Filtered Items
  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  // Keyboard navigation for Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') setSelectedItemIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex]);

  const handlePrev = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length));
  };

  const handleNext = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
  };

  const currentItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <section className="py-24 bg-background" aria-labelledby="gallery-section-title">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-secondary-fixed/30 py-1 px-3 rounded-full text-xs font-sans font-semibold text-on-secondary-fixed-variant tracking-wider uppercase mb-4">
            <ImageIcon className="w-3.5 h-3.5 text-secondary" />
            <span>THE CANOPY PORTFOLIO</span>
          </div>
          <h2 id="gallery-section-title" className="font-display text-3xl md:text-5xl text-primary font-bold tracking-tight mb-4">
            The Forest Gallery
          </h2>
          <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
            Stroll through high-fidelity visual representations of our organic plates, curated dining settings, and the magnificent glass-and-mahogany environment at dusk.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-14" role="tablist" aria-label="Gallery filter tabs">
          {(['all', 'food', 'ambiance', 'events'] as const).map((filter) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => {
                setActiveFilter(filter);
                setSelectedItemIndex(null); // Reset index mapping
              }}
              className={`font-sans text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-xl border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                activeFilter === filter
                  ? 'bg-primary border-primary text-secondary-fixed shadow-md'
                  : 'bg-background border-outline-variant/30 text-primary hover:border-primary/50'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Grid Display */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface-dim border border-outline-variant/10 shadow-sm cursor-pointer hover:shadow-xl hover:border-outline-variant/30 transition-all duration-500"
                onClick={() => setSelectedItemIndex(index)}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Glass Hover Cover */}
                <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  {/* Top Icon */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-secondary-fixed">
                      <ZoomIn className="w-5 h-5 text-secondary-fixed" />
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-secondary-fixed/80 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] text-white/80 font-light line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fullscreen Interactive Lightbox Modal */}
        <AnimatePresence>
          {currentItem && selectedItemIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
              role="dialog"
              aria-modal="true"
              aria-label="Image lightbox viewer"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedItemIndex(null)}
                className="absolute top-6 right-6 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-fixed cursor-pointer z-50"
                aria-label="Close viewer"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Prev Button */}
              <motion.button
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 md:left-8 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-secondary-fixed cursor-pointer z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Image & Detail Card */}
              <motion.div 
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col lg:flex-row max-w-5xl w-full max-h-[85vh] bg-background rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                {/* Full-size Image Panel */}
                <div className="flex-grow bg-primary flex items-center justify-center min-h-[300px] lg:min-h-[500px] max-h-[50vh] lg:max-h-none overflow-hidden select-none">
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="w-full h-full object-cover lg:object-contain max-h-[50vh] lg:max-h-[85vh]"
                  />
                </div>

                {/* Text Details Sidebar */}
                <div className="p-8 lg:w-96 bg-surface-container-low flex flex-col justify-between shrink-0">
                  <div className="space-y-4">
                    <span className="inline-block bg-secondary-fixed/30 text-primary font-sans text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                      {currentItem.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-primary">
                      {currentItem.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light">
                      {currentItem.description}
                    </p>
                  </div>

                  {/* Navigation stats & brand details */}
                  <div className="pt-8 border-t border-outline-variant/15 flex justify-between items-center text-on-surface-variant/50 font-sans text-[10px] uppercase tracking-widest">
                    <span>TREEHOUSE ARCHIVES</span>
                    <span>{selectedItemIndex + 1} / {filteredItems.length}</span>
                  </div>
                </div>
              </motion.div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 md:right-8 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-secondary-fixed cursor-pointer z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
