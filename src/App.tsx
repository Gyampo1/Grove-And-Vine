import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageId, MenuItem, Reservation, ContactMessage } from './types';
import { MENU_ITEMS } from './data';
import AdminDashboard from './components/AdminDashboard';

// Component Imports
import MetaTags from './components/MetaTags';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedDishes from './components/FeaturedDishes';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import GallerySection from './components/GallerySection';
import ReservationForm from './components/ReservationForm';
import EventsSection from './components/EventsSection';
import MapPlaceholder from './components/MapPlaceholder';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FavoritesList from './components/FavoritesList';

// Lucide icon helper
import { Search, SlidersHorizontal, Leaf, Flame, Sparkles, AlertCircle, Heart, X } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  
  // Custom states for reservations and menu
  const [selectedEventName, setSelectedEventName] = useState<string | null>(null);
  const [menuSearch, setMenuSearch] = useState('');
  const [menuFilterCategory, setMenuFilterCategory] = useState<'all' | 'starters' | 'mains' | 'seafood' | 'desserts' | 'drinks'>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'vegan' | 'glutenFree' | 'spicy'>('all');

  // Elevated states for real-time manager operations
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'TH-2026-1049',
      status: 'pending',
      name: 'Kwame Boateng',
      email: 'kwame@gold.gh',
      phone: '+233 24 456 7890',
      date: '2026-10-17',
      time: '18:30',
      guests: 4,
      message: 'Prefer glass window seating next to the mahogany trunk if possible.'
    },
    {
      id: 'TH-2026-4033',
      status: 'approved',
      name: 'Naa Adjei',
      email: 'naa.adjei@accralux.com',
      phone: '+233 50 123 4567',
      date: '2026-10-18',
      time: '20:00',
      guests: 2,
      message: 'Celebrating our wedding anniversary!'
    },
    {
      id: 'TH-2026-9021',
      status: 'cancelled',
      name: 'Marcus Diop',
      email: 'marcus@dioptravel.org',
      phone: '+33 6 1234 5678',
      date: '2026-10-19',
      time: '13:30',
      guests: 3,
      message: 'Wheelchair access requested.'
    }
  ]);
  const [inquiries, setInquiries] = useState<ContactMessage[]>([
    {
      id: 'INQ-9011',
      status: 'unread',
      createdAt: '10:14 UTC',
      name: 'Amina Mensah',
      email: 'amina.m@ghmediagroup.com',
      subject: 'Media/PR',
      message: 'Hi Treehouse, we are looking to host our annual luxury media roundtable under your glass canopy in December. Could you send us your catalog for private venue buyouts?'
    },
    {
      id: 'INQ-1402',
      status: 'read',
      createdAt: '11:22 UTC',
      name: 'Ekow Appiah',
      email: 'ekow.appiah@careers.gh',
      subject: 'Career Opportunities',
      message: 'Hello, I am a seasoned sous chef with 8 years of experience in modern African cooking. I would love to join Chef Kojo\'s brigade.'
    },
    {
      id: 'INQ-4055',
      status: 'responded',
      createdAt: '12:05 UTC',
      name: 'Sarah Jenkins',
      email: 'sjenkins@worldtravel.com',
      subject: 'General Inquiry',
      message: 'Is secure valet parking complimentary for fine-dining reservations?'
    }
  ]);

  // Handlers for menu items
  const handleAddMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [item, ...prev]);
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setMenuItems(prev => prev.map(m => m.id === item.id ? item : m));
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(m => m.id !== id));
  };

  // Handlers for reservations
  const handleAddReservation = (res: Reservation) => {
    setReservations(prev => [res, ...prev]);
  };

  const handleUpdateReservation = (id: string, status: 'pending' | 'approved' | 'cancelled') => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleDeleteReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  // Handlers for inquiries
  const handleAddInquiry = (msg: ContactMessage) => {
    const newInq: ContactMessage = {
      ...msg,
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'unread',
      createdAt: new Date().toTimeString().split(' ')[0].slice(0, 5) + ' UTC'
    };
    setInquiries(prev => [newInq, ...prev]);
  };

  const handleUpdateInquiry = (id: string, status: 'unread' | 'read' | 'responded') => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  // Load favorites from localStorage on start
  useEffect(() => {
    try {
      const stored = localStorage.getItem('treehouse_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to parse saved favorites:', e);
    }
  }, []);

  // Save favorites to localStorage
  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id];
      try {
        localStorage.setItem('treehouse_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save favorites to disk:', e);
      }
      return updated;
    });
  };

  const handlePageChange = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct event book click link
  const handleBookEvent = (eventName: string) => {
    setSelectedEventName(eventName);
    handlePageChange('reservations');
  };

  // Filter Menu Items
  const filteredMenuItems = menuItems.filter(item => {
    // 1. Category check
    const matchesCategory = menuFilterCategory === 'all' || item.category === menuFilterCategory;
    
    // 2. Search check
    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) || 
                          item.description.toLowerCase().includes(menuSearch.toLowerCase());
    
    // 3. Diet check
    let matchesDiet = true;
    if (dietFilter === 'vegan') matchesDiet = !!item.isVegan;
    if (dietFilter === 'glutenFree') matchesDiet = !!item.isGlutenFree;
    if (dietFilter === 'spicy') matchesDiet = !!item.isSpicy;

    return matchesCategory && matchesSearch && matchesDiet;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between selection:bg-secondary-fixed selection:text-primary">
      {/* SEO metadata updates */}
      <MetaTags activePage={activePage} />

      {/* Top scroll progress indicator */}
      <ScrollProgress />

      {/* Top Floating Glass Header */}
      <Navbar 
        activePage={activePage} 
        onPageChange={handlePageChange} 
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main Pages Content routing */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <div className="animate-scale-up">
            <Hero onPageChange={handlePageChange} />
            <FeaturedDishes 
              items={menuItems} 
              onToggleFavorite={handleToggleFavorite} 
              favorites={favorites} 
              onPageChange={(dest) => handlePageChange(dest as PageId)} 
            />
            <AboutSection />
            <Testimonials />
            
            {/* Quick Map & Contact Intro in Home Page */}
            <section className="py-24 bg-background px-6" aria-label="Quick Location Intro">
              <div className="max-w-5xl mx-auto space-y-16">
                <div className="text-center max-w-xl mx-auto space-y-4">
                  <span className="font-sans text-xs font-bold text-secondary uppercase tracking-[0.25em] block">
                    Our Botanical Location
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl text-primary font-bold">
                    Accra Forest Sanctuary
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light">
                    Located inside the botanical corridor of Cantonments, we offer secure private parking, valet service, and strict security buyouts.
                  </p>
                </div>
                <MapPlaceholder />
              </div>
            </section>
          </div>
        )}

        {activePage === 'menu' && (
          <section className="pt-32 pb-24 px-6 bg-background animate-scale-up" aria-labelledby="menu-view-title">
            <div className="max-w-7xl mx-auto">
              
              {/* Menu Title */}
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="font-sans text-xs font-bold text-secondary-fixed uppercase tracking-[0.25em] block mb-2">
                  Heritage equatorial gastronomy
                </span>
                <h1 id="menu-view-title" className="font-display text-4xl md:text-6.5xl text-primary font-bold tracking-tight mb-4">
                  The Canopy Menu
                </h1>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light">
                  A sensory progression through West African terroir. Select a category, search for flavors, and flag favorites to map your evening.
                </p>
              </div>

              {/* Menu Search and Diet Filter Dock */}
              <div className="mb-12 p-6 rounded-3xl bg-surface-container-low border border-outline-variant/15 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search box */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                  <input
                    type="search"
                    placeholder="Search ginger, cocoa, snapper..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full py-3.5 pl-11 pr-4 bg-background border border-outline-variant/25 rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    aria-label="Search tasting menu items"
                  />
                </div>

                {/* Dietary preference switcher */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                  <SlidersHorizontal className="w-4 h-4 text-on-surface-variant/40 mr-1.5 hidden sm:inline" />
                  <span className="font-sans text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mr-2 hidden sm:inline">Diet Preferences:</span>
                  {(['all', 'vegan', 'glutenFree', 'spicy'] as const).map((pref) => (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      key={pref}
                      onClick={() => setDietFilter(pref)}
                      className={`font-sans text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary ${
                        dietFilter === pref
                          ? 'bg-primary border-primary text-secondary-fixed shadow-sm'
                          : 'bg-background border-outline-variant/20 text-on-surface-variant hover:border-primary/30'
                      }`}
                    >
                      {pref === 'all' && 'All Plates'}
                      {pref === 'vegan' && 'Vegan Only'}
                      {pref === 'glutenFree' && 'Gluten Free'}
                      {pref === 'spicy' && 'Spicy Only'}
                    </motion.button>
                  ))}
                </div>

              </div>

              {/* Menu Category Tabs */}
              <div className="flex flex-wrap gap-2 justify-center mb-16 border-b border-outline-variant/10 pb-6" role="tablist" aria-label="Menu Categories">
                {(['all', 'starters', 'mains', 'seafood', 'desserts', 'drinks'] as const).map((cat) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={cat}
                    role="tab"
                    aria-selected={menuFilterCategory === cat}
                    onClick={() => setMenuFilterCategory(cat)}
                    className={`font-sans text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-xl border transition-all duration-350 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                      menuFilterCategory === cat
                        ? 'bg-primary border-primary text-secondary-fixed shadow-md'
                        : 'bg-background border-outline-variant/25 text-primary hover:border-primary/40'
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>

              {/* Food Items Grid layout */}
              {filteredMenuItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                  {filteredMenuItems.map((item) => {
                    const isFav = favorites.includes(item.id);
                    return (
                      <article
                        key={item.id}
                        className="group bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/10 hover:border-outline-variant/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Image Panel */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-surface-dim shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'; }}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-30" />

                          {/* Allergen tags */}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                            {item.isVegan && (
                              <span className="bg-primary/90 text-secondary-fixed text-[8px] font-sans font-bold py-1 px-2 rounded-full uppercase tracking-wider backdrop-blur-[2px]">
                                Vegan
                              </span>
                            )}
                            {item.isGlutenFree && (
                              <span className="bg-primary-container/90 text-primary-fixed text-[8px] font-sans font-bold py-1 px-2 rounded-full uppercase tracking-wider backdrop-blur-[2px]">
                                Gluten Free
                              </span>
                            )}
                            {item.isSpicy && (
                              <span className="bg-error-container/90 text-error text-[8px] font-sans font-bold py-1 px-2 rounded-full uppercase tracking-wider backdrop-blur-[2px] flex items-center gap-0.5">
                                <Flame className="w-3 h-3 fill-error" />
                                Spicy
                              </span>
                            )}
                          </div>

                          {/* Heart toggle */}
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            onClick={() => handleToggleFavorite(item.id)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-background/90 hover:bg-background text-primary hover:text-error shadow-md transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-error"
                            aria-label={isFav ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
                          >
                            <Heart className={`w-4 h-4 transition-colors duration-300 ${isFav ? 'fill-error text-error scale-110' : 'text-primary'}`} />
                          </motion.button>

                          {/* Price Tag Overlay */}
                          <div className="absolute bottom-4 right-4 bg-primary text-secondary-fixed font-display text-md font-bold py-1.5 px-3 rounded-xl shadow-lg">
                            ₵{item.price}
                          </div>
                        </div>

                        {/* Info card text */}
                        <div className="p-6 flex flex-col justify-between flex-grow">
                          <div className="space-y-2.5">
                            <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-on-secondary-fixed-variant">
                              {item.category}
                            </span>
                            <h3 className="font-display text-lg font-bold text-primary group-hover:text-secondary-fixed-dim transition-colors">
                              {item.name}
                            </h3>
                            <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                /* No items search result */
                <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline-variant/15 max-w-xl mx-auto space-y-4">
                  <AlertCircle className="w-10 h-10 text-on-surface-variant/40 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-sans text-sm font-bold text-primary uppercase tracking-widest">No Dishes Found</h3>
                    <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light max-w-xs mx-auto">
                      No dishes matched your specific search criteria. Try removing filters or searching simpler terms.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </section>
        )}

        {activePage === 'about' && (
          <div className="animate-scale-up pt-12">
            <AboutSection />
          </div>
        )}

        {activePage === 'gallery' && (
          <div className="animate-scale-up pt-12">
            <GallerySection />
          </div>
        )}

        {activePage === 'reservations' && (
          <div className="animate-scale-up pt-32 pb-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
              {selectedEventName && (
                <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl bg-secondary-fixed/20 border border-secondary-fixed/40 text-primary font-sans text-xs font-bold flex items-center justify-between gap-4 animate-float">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary shrink-0" />
                    <span>Selected Event: <strong className="text-primary font-extrabold uppercase">{selectedEventName}</strong>. Standard ticket rules apply.</span>
                  </div>
                  <button 
                    onClick={() => setSelectedEventName(null)}
                    className="p-1 rounded hover:bg-secondary-fixed/30 cursor-pointer"
                    aria-label="Clear selected event"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <ReservationForm 
                onSuccess={(res) => {
                  console.log('Reservation logged successfully:', res);
                  setSelectedEventName(null); // Clear selected event after successful submission
                  
                  // Log in dynamic operations state
                  const newBooking: Reservation = {
                    ...res,
                    id: `TH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
                    status: 'pending' as const
                  };
                  handleAddReservation(newBooking);
                }} 
              />
            </div>
          </div>
        )}

        {activePage === 'events' && (
          <div className="animate-scale-up pt-20">
            <EventsSection onBookEvent={handleBookEvent} />
          </div>
        )}

        {activePage === 'contact' && (
          <section className="pt-32 pb-24 px-6 bg-background animate-scale-up" aria-labelledby="contact-view-title">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="font-sans text-xs font-bold text-secondary-fixed uppercase tracking-[0.25em] block">
                  Beneath Accra's Glass Canopy
                </span>
                <h1 id="contact-view-title" className="font-display text-4xl md:text-6.5xl text-primary font-bold tracking-tight">
                  Connect With Us
                </h1>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light">
                  Find our Cantonments coordinates, view secure valet parking directions, or dispatch an inquiry to our head sommelier or pastry desks.
                </p>
              </div>

              {/* Grid split */}
              <ContactForm 
                onSuccess={(msg) => {
                  handleAddInquiry(msg);
                }}
              />

              {/* Full Interactive Layout map */}
              <div className="pt-10">
                <MapPlaceholder />
              </div>
            </div>
          </section>
        )}

        {activePage === 'admin' && (
          <div className="animate-scale-up">
            <AdminDashboard
              reservations={reservations}
              onUpdateReservation={handleUpdateReservation}
              onAddReservation={handleAddReservation}
              onDeleteReservation={handleDeleteReservation}
              inquiries={inquiries}
              onUpdateInquiry={handleUpdateInquiry}
              onDeleteInquiry={handleDeleteInquiry}
              menuItems={menuItems}
              onAddMenuItem={handleAddMenuItem}
              onEditMenuItem={handleEditMenuItem}
              onDeleteMenuItem={handleDeleteMenuItem}
              onClose={() => handlePageChange('home')}
            />
          </div>
        )}
      </main>

      {/* Bottom Footer block */}
      <Footer onPageChange={handlePageChange} />

      {/* Favorites slide drawer popup */}
      <FavoritesList 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)} 
        favorites={favorites} 
        allItems={menuItems} 
        onToggleFavorite={handleToggleFavorite}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
