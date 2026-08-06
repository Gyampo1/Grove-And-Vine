import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Leaf, Heart, CalendarRange } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export default function Navbar({ activePage, onPageChange, favoritesCount, onOpenFavorites }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'events', label: 'Events' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl z-50 rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel shadow-lg py-3 translate-y-2' 
            : 'bg-transparent py-5 translate-y-0'
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-10 mx-auto">
          {/* Logo */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPageChange('home')}
            className="flex items-center gap-2 font-display text-primary font-bold text-xl md:text-2xl tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg py-1 px-2 group cursor-pointer"
            aria-label="GROVE & VINE ACCRA Home"
          >
            <Leaf className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold tracking-widest text-primary text-lg md:text-xl uppercase">GROVE & VINE</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Desktop Navigation">
            {navLinks.map((link) => (
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                key={link.id}
                onClick={() => onPageChange(link.id)}
                className={`relative font-sans text-xs font-semibold uppercase tracking-widest py-2 transition-colors focus:outline-none focus:text-primary cursor-pointer ${
                  activePage === link.id ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
                aria-current={activePage === link.id ? 'page' : undefined}
              >
                {link.label}
                {activePage === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-fixed"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Favorites Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl border border-outline-variant/30 hover:bg-secondary-fixed/20 hover:border-secondary-fixed text-primary focus:outline-none focus:ring-2 focus:ring-secondary-fixed transition-all cursor-pointer group"
              aria-label={`View ${favoritesCount} favorite dishes`}
            >
              <Heart className={`w-4.5 h-4.5 transition-colors duration-300 ${favoritesCount > 0 ? 'fill-error text-error scale-110' : 'text-primary group-hover:scale-105'}`} />
              {favoritesCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-error text-white font-sans text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm"
                >
                  {favoritesCount}
                </motion.span>
              )}
            </motion.button>

            {/* Reserve Quick Link */}
            <motion.button
              whileHover={{ scale: 1.05, y: -1, boxShadow: '0 4px 12px -2px rgba(5, 27, 14, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange('reservations')}
              className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-[11px] font-semibold uppercase tracking-widest py-3 px-6 rounded-xl shadow-md transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <CalendarRange className="w-3.5 h-3.5" />
              <span>RESERVE</span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2.5 rounded-xl border border-outline-variant/30 text-primary hover:bg-secondary-container/20 md:hidden focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              aria-expanded={isMobileOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[45]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-background/95 backdrop-blur-md border-l border-outline-variant/20 z-50 p-8 flex flex-col justify-between"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
            >
              <div className="space-y-8">
                {/* Drawer Header */}
                <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                  <span className="font-display font-bold text-primary tracking-widest text-lg uppercase">GROVE & VINE</span>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 rounded-xl text-primary hover:bg-secondary-container/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
                  {navLinks.map((link, idx) => (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.id}
                      onClick={() => {
                        onPageChange(link.id);
                        setIsMobileOpen(false);
                      }}
                      className={`text-left font-sans text-sm font-semibold uppercase tracking-widest py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        activePage === link.id
                          ? 'bg-secondary-fixed/30 text-primary font-bold pl-4'
                          : 'text-on-surface-variant hover:text-primary hover:bg-secondary-fixed/10'
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onPageChange('reservations');
                    setIsMobileOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-secondary-fixed py-4 px-6 rounded-xl font-sans text-xs font-semibold uppercase tracking-widest hover:bg-primary-container shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <CalendarRange className="w-4 h-4" />
                  <span>Book a Table</span>
                </motion.button>
                <p className="text-center font-sans text-[10px] text-on-surface-variant/50 uppercase tracking-widest">
                  Cantonments Road, Accra, Ghana
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
