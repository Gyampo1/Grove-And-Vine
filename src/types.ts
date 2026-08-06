export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in GHS (₵)
  category: 'starters' | 'mains' | 'seafood' | 'desserts' | 'drinks';
  image: string;
  isSpicy?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface GalleryItem {
  id: string;
  category: 'food' | 'ambiance' | 'events';
  image: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export interface RestaurantEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  pricePerGuest: string;
  capacity: string;
}

export interface Reservation {
  id?: string;
  status?: 'pending' | 'approved' | 'cancelled';
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message?: string;
}

export interface ContactMessage {
  id?: string;
  status?: 'unread' | 'read' | 'responded';
  createdAt?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type PageId = 'home' | 'menu' | 'about' | 'gallery' | 'reservations' | 'events' | 'contact' | 'admin';
