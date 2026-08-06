import { motion } from 'motion/react';
import { Heart, Sparkles, Flame, Check, ArrowRight } from 'lucide-react';
import { MenuItem } from '../types';

interface FeaturedDishesProps {
  items: MenuItem[];
  onToggleFavorite: (id: string) => void;
  favorites: string[];
  onPageChange: (page: 'menu' | 'reservations') => void;
}

export default function FeaturedDishes({ items, onToggleFavorite, favorites, onPageChange }: FeaturedDishesProps) {
  // Filter out some signature dishes to feature on the Home Page
  const featuredIds = ['sf1', 'm1', 'd1'];
  const featuredItems = items.filter(item => featuredIds.includes(item.id));

  return (
    <section className="py-24 md:py-32 bg-surface-container-lowest relative overflow-hidden" aria-labelledby="featured-title">
      {/* Decorative leaf watermarks */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-container/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-2 bg-secondary-fixed/35 py-1 px-3 rounded-full text-[10px] md:text-xs font-sans font-semibold text-on-secondary-fixed-variant tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3 h-3 text-secondary" />
            <span>Curated Culinary Masterpieces</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            id="featured-title"
            className="font-display text-3xl md:text-5xl text-primary font-bold tracking-tight mb-4"
          >
            Signature Creations
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm md:text-md text-on-surface-variant leading-relaxed font-light"
          >
            These plates represent the heart of TREEHOUSE. Each serves as a unique narrative of Ghanaian terroir, translated through surgical Michelin-star technique.
          </motion.p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {featuredItems.map((item, index) => {
            const isFav = favorites.includes(item.id);
            const isMainFeatured = item.id === 'sf1'; // Let the scallops take the larger spotlight card

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`group flex flex-col justify-between overflow-hidden rounded-3xl bg-background border border-outline-variant/15 hover:shadow-xl hover:border-outline-variant/40 transition-all duration-500 ${
                  isMainFeatured ? 'lg:col-span-8' : 'lg:col-span-4'
                }`}
              >
                {/* Image Container with Hover zoom */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[320px] overflow-hidden bg-surface-dim">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {item.isVegan && (
                      <span className="bg-primary/85 text-secondary-fixed text-[9px] font-sans font-bold py-1 px-2.5 rounded-full uppercase tracking-wider backdrop-blur-[4px]">
                        Vegan
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span className="bg-primary-container/85 text-primary-fixed text-[9px] font-sans font-bold py-1 px-2.5 rounded-full uppercase tracking-wider backdrop-blur-[4px]">
                        Gluten Free
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-error-container/85 text-error text-[9px] font-sans font-bold py-1 px-2.5 rounded-full uppercase tracking-wider backdrop-blur-[4px] flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-error" />
                        Spicy
                      </span>
                    )}
                  </div>

                  {/* Favorite Toggle Button */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => onToggleFavorite(item.id)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-background/85 hover:bg-background text-primary hover:text-error shadow-md transition-all z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-error"
                    aria-label={isFav ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
                  >
                    <Heart className={`w-4 h-4 transition-colors duration-300 ${isFav ? 'fill-error text-error' : 'text-primary'}`} />
                  </motion.button>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 right-4 bg-primary text-secondary-fixed font-display text-lg font-bold py-1.5 px-4 rounded-xl shadow-lg">
                    ₵{item.price}
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-on-secondary-fixed-variant">
                        {item.category}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
                      <span className="text-[10px] font-sans font-bold text-on-surface-variant/70 uppercase">
                        House Specialty
                      </span>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl text-primary font-bold group-hover:text-secondary-fixed-dim transition-colors duration-300">
                      {item.name}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Call to Actions on each featured card */}
                  <div className="mt-8 pt-6 border-t border-outline-variant/15 flex items-center justify-between">
                    <motion.button
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onPageChange('reservations')}
                      className="text-primary hover:text-secondary font-sans text-[11px] font-semibold uppercase tracking-widest flex items-center gap-1.5 group/btn cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 p-1 rounded"
                    >
                      <span>Book to Savor</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform duration-350" />
                    </motion.button>

                    {isFav && (
                      <span className="flex items-center gap-1.5 text-secondary text-[11px] font-sans font-bold uppercase tracking-wider">
                        <Check className="w-4 h-4 text-secondary stroke-[3]" />
                        <span>In Favorites</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View full menu trigger */}
        <div className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 10px 25px -5px rgba(5, 27, 14, 0.4)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onPageChange('menu')}
            className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-xs font-semibold uppercase tracking-widest py-4.5 px-10 rounded-xl shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <span>View Full Tasting Menu</span>
            <ArrowRight className="w-4 h-4 text-secondary-fixed" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
