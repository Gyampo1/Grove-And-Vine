import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { MenuItem, PageId } from '../types';

interface FavoritesListProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allItems: MenuItem[];
  onToggleFavorite: (id: string) => void;
  onPageChange: (page: PageId) => void;
}

export default function FavoritesList({
  isOpen,
  onClose,
  favorites,
  allItems,
  onToggleFavorite,
  onPageChange
}: FavoritesListProps) {
  // Map favorite ids to real item data
  const favoriteItems = allItems.filter(item => favorites.includes(item.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[90]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-background/95 backdrop-blur-md border-l border-outline-variant/20 z-[95] p-6 flex flex-col justify-between shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Favorites selections drawer"
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/15">
                <div className="flex items-center gap-2 text-primary">
                  <Heart className="w-5 h-5 text-error fill-error animate-float" />
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest">My Saved Favorites</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-xl text-primary hover:bg-secondary-container/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* List Body */}
            <div className="flex-grow my-6 overflow-y-auto pr-1 space-y-4 no-scrollbar">
              {favoriteItems.length > 0 ? (
                favoriteItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3 bg-surface-container-low border border-outline-variant/10 rounded-2xl flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-surface-dim"
                      />
                      <div className="space-y-0.5 text-left">
                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-on-surface-variant/60">
                          {item.category}
                        </span>
                        <h4 className="font-sans text-xs sm:text-sm font-semibold text-primary leading-tight line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="font-display text-xs text-secondary-fixed font-bold block">
                          ₵{item.price}
                        </span>
                      </div>
                    </div>

                    {/* Trash remove button */}
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(186, 26, 26, 0.1)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onToggleFavorite(item.id)}
                      className="p-2.5 rounded-xl border border-outline-variant/10 text-on-surface-variant hover:text-error hover:border-error/20 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-error"
                      aria-label={`Remove ${item.name} from favorites`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ))
              ) : (
                /* Empty state */
                <div className="text-center py-16 px-6 space-y-4 flex flex-col justify-center h-full">
                  <div className="w-12 h-12 rounded-full border border-dashed border-outline-variant/50 flex items-center justify-center mx-auto text-on-surface-variant/40">
                    <Heart className="w-5 h-5 text-on-surface-variant/30" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-sans text-xs sm:text-sm text-primary font-bold">No Selections Saved</p>
                    <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed max-w-xs mx-auto">
                      Dine with curiosity. Browse our tasting menu and hit the heart icon to save dishes for your seating plan.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer triggers */}
            <div className="pt-4 border-t border-outline-variant/15 space-y-3">
              {favoriteItems.length > 0 ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onPageChange('reservations');
                      onClose();
                    }}
                    className="w-full bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-xs font-semibold uppercase tracking-widest py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <span>Reserve Seating to Savor</span>
                    <ArrowRight className="w-4 h-4 text-secondary-fixed" />
                  </motion.button>
                  <p className="text-center font-sans text-[10px] text-on-surface-variant/50 uppercase tracking-widest">
                    Accra Forest-To-Table Fine Dining
                  </p>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onPageChange('menu');
                    onClose();
                  }}
                  className="w-full bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-xs font-semibold uppercase tracking-widest py-4 px-6 rounded-xl transition-all cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Browse Menu Selections
                </motion.button>
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
