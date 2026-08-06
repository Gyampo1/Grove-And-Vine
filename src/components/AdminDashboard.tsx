import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, Unlock, LayoutDashboard, Calendar, MessageSquare, Utensils, 
  DollarSign, Users, CheckCircle, XCircle, Trash2, 
  Edit, Plus, Search, LogOut, Clock, ShieldCheck, 
  AlertCircle, Filter, Check, Flame, PlusCircle, User
} from 'lucide-react';
import { MenuItem, Reservation, ContactMessage } from '../types';

interface AdminDashboardProps {
  reservations: Reservation[];
  onUpdateReservation: (id: string, status: 'pending' | 'approved' | 'cancelled') => void;
  onAddReservation: (reservation: Reservation) => void;
  onDeleteReservation: (id: string) => void;
  
  inquiries: ContactMessage[];
  onUpdateInquiry: (id: string, status: 'unread' | 'read' | 'responded') => void;
  onDeleteInquiry: (id: string) => void;
  
  menuItems: MenuItem[];
  onAddMenuItem: (item: MenuItem) => void;
  onEditMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  
  onClose: () => void;
}

export default function AdminDashboard({
  reservations,
  onUpdateReservation,
  onAddReservation,
  onDeleteReservation,
  inquiries,
  onUpdateInquiry,
  onDeleteInquiry,
  menuItems,
  onAddMenuItem,
  onEditMenuItem,
  onDeleteMenuItem,
  onClose
}: AdminDashboardProps) {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'inquiries' | 'menu' | 'profile'>('overview');

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState({
    name: 'Kojo Boateng',
    email: 'kojo@groveandvine.com',
    phone: '+233 24 123 4567',
    role: 'Operations Director',
    pin: '1234',
    bio: 'Overseeing Cantonments canopy calibrations and modern forest fine-dining customer experiences.'
  });

  const [tempProfile, setTempProfile] = useState({ ...adminProfile });

  // Custom Toast Notification System
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // Custom Confirmation Dialog system
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const triggerConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(null);
      }
    });
  };

  // Keyboard support for PIN screen
  useEffect(() => {
    if (isAuthenticated) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        if (pin.length < 4) {
          setPin(prev => prev + e.key);
        }
      } else if (e.key === 'Backspace') {
        setPin(prev => prev.slice(0, -1));
      } else if (e.key === 'Enter' && pin.length === 4) {
        if (pin === adminProfile.pin) {
          setIsAuthenticated(true);
          setAuthError('');
          showToast('Authenticated securely.', 'success');
        } else {
          setAuthError('Access Denied: Invalid PIN sequence.');
          setPin('');
          showToast('Invalid PIN sequence.', 'error');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isAuthenticated, adminProfile.pin]);

  // Search & Filter States
  const [resSearch, setResSearch] = useState('');
  const [resFilter, setResFilter] = useState<'all' | 'pending' | 'approved' | 'cancelled'>('all');
  
  const [inqSearch, setInqSearch] = useState('');
  const [inqFilter, setInqFilter] = useState<'all' | 'unread' | 'read' | 'responded'>('all');

  const [menuSearch, setMenuSearch] = useState('');
  const [menuFilter, setMenuFilter] = useState<'all' | 'starters' | 'mains' | 'seafood' | 'desserts' | 'drinks'>('all');

  // Form states
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [newRes, setNewRes] = useState<Partial<Reservation>>({
    name: '', email: '', phone: '', date: '', time: '18:30', guests: 2, message: ''
  });

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '', description: '', price: 100, category: 'mains', image: '', isSpicy: false, isVegan: false, isGlutenFree: false
  });

  const [replyMessage, setReplyMessage] = useState('');
  const [activeReplyInquiry, setActiveReplyInquiry] = useState<ContactMessage | null>(null);

  // Default Image Presets for new menu items
  const imagePresets = [
    { name: 'Red Snapper', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkP-ixOzYaLFH1H4f-ag_WZzmltPZs6LJHhz8Zlxi8N8U36pVtGeCDNTagcpdnKabm-JO83rBglh5ghZPTKC6ab0RwzsadwN5PnVA_68SBHOJdffVvbdK9am2dcWlDpoGQrxpSek2wcQ-OdiLZOvYJcwky6MvpY9CDmAWvc0boe0JQqwGR10fQ7AEIS5lQhw7icoyiwidVrnISokxvVggITNesH1y3zWvckrOCblPLuCXuojTldkQC8n4C6epOizZ6OM29OlyQNO0' },
    { name: 'Short Rib', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwX5Gxn_Wz0aXu38zX11jd5ey4fZ7L7jP_d2t22l04XjeM4670qr5UKekkllVrr9qJLNt7kbm4FajS_yoNcPjf1zQZO0UV1tWosa7B_TmmDYlpu4I7gkRAnV_FrDohiz902RD7TyhDKy53oMfNDIyC9vTULsDTWQb8iy8tai993a3tk8Gox9hshmQujCTS6eD5D0CQGFy-9QjaETfBiyYnNVwRzWYmmvv4PrdMV6kIwW-hNDpqaLp1cTtYv8AMv_T9qgH9CRhJUmI' },
    { name: 'Crisps Starter', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvgWsItjywXVoU1U-Mbyw-zqyqUYjzfjAEpnxU_0ZaxQHwjAvPWOj4FtELMuUw51yRoior71QEcpidUX7oPCtDz66OK2egTFrUBPM2XhuveHhJtHbZkoZGccPtAQwj21curXBh-Y_T4SedQfp-ea2FmzjyobkvBcuk3tjMLWJNI1oiX_jwZ979qpokabf0BzE4KMCWcsFHm_6b2bLH7UstOk90b46AA5KwYyzAJ0J_b9pqtQSDx-s2aEZGp9vYycvxzrmoanHcWKo' },
    { name: 'Dark Desert', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBroeulbTjUI6_5_ngUK45PKjqZWccYLTxOy8HzB0Crd5yBNcRtGODghI5et8yUaJcdN1qgnd3p_eRY2MGbPOqVkMdMXpFafsyqgx90y2PE1-5ykNNsCNefN29Ojdk7lJMLwf6k4cGin_oEa99T-7fmkw90zyCusjaXHkELCKuK739E74YkveiQmV6jbWZRTbUen-0Je63OSxjHZwTyRqWE7TIEJu-AwSBKN2pJVJDpL89SGqEh2fHgsiTQ3ek3PfwpOBkFuEQ6mZI' },
    { name: 'Tropical Drink', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfN4mbkS_SZ-55op6HVYOCOz09EnpgEePBKlWpTjc4Del4gmlYiNRm-f72xbZKFScj45RwFUIJQzNOQRY-3CLWrcxhvWVlfxvDbq8UNWwUGT15-PKw7c9yMH6nv2OfbbttOmMPJqSxwlxxwshr6kHOveb0VhYn10MHyHFFrDbTLjI1EiSqvB3VVRPSk6Yq0t64Kx27AXIxI0DnZoaDoJrFEYm01VklJwB3qJ0nOZVTuQei-ywRzs-8ssITdWhKH1Wk37aORfcdb-I' }
  ];

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === adminProfile.pin) {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Authenticated securely.', 'success');
    } else {
      setAuthError('Access Denied: Invalid PIN sequence.');
      setPin('');
      showToast('Login attempt blocked.', 'error');
    }
  };

  const handleKeyPress = (num: string) => {
    setAuthError('');
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handleClearPin = () => {
    setPin('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    showToast('Administrator signed out.', 'info');
  };

  // Status handlers
  const handleResStatusUpdate = (id: string, name: string, status: 'pending' | 'approved' | 'cancelled') => {
    onUpdateReservation(id, status);
    const label = status === 'approved' ? 'APPROVED' : status === 'cancelled' ? 'CANCELLED' : 'PENDING';
    const toastType = status === 'approved' ? 'success' : status === 'cancelled' ? 'info' : 'info';
    showToast(`Reservation for ${name} updated to ${label}.`, toastType);
  };

  const handleResDelete = (id: string, name: string) => {
    triggerConfirm(
      'Remove Reservation',
      `Are you sure you want to permanently delete the reservation for ${name}?`,
      () => {
        onDeleteReservation(id);
        showToast(`Reservation for ${name} removed from ledger.`, 'info');
      }
    );
  };

  const handleInquiryStatus = (id: string, sender: string, status: 'unread' | 'read' | 'responded') => {
    onUpdateInquiry(id, status);
    showToast(`Inquiry from ${sender} marked as ${status.toUpperCase()}.`, 'info');
  };

  const handleInquiryDelete = (id: string, sender: string) => {
    triggerConfirm(
      'Delete Inquiry',
      `Are you sure you want to delete the contact inquiry from ${sender}?`,
      () => {
        onDeleteInquiry(id);
        showToast(`Contact inquiry from ${sender} deleted.`, 'info');
      }
    );
  };

  const handleSendInquiryReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeReplyInquiry) return;
    
    onUpdateInquiry(activeReplyInquiry.id!, 'responded');
    showToast(`Email dispatch sent to ${activeReplyInquiry.email}.`, 'success');
    setActiveReplyInquiry(null);
    setReplyMessage('');
  };

  // manual booking submission
  const handleCreateManualReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRes.name || !newRes.email || !newRes.phone || !newRes.date || !newRes.time) {
      showToast('Please fill in all required seating fields.', 'error');
      return;
    }
    const id = `M-${Math.floor(1000 + Math.random() * 9000)}`;
    const completeRes: Reservation = {
      id,
      name: newRes.name,
      email: newRes.email,
      phone: newRes.phone,
      date: newRes.date,
      time: newRes.time,
      guests: Number(newRes.guests || 2),
      message: newRes.message || 'Staff Booking',
      status: 'approved'
    };
    onAddReservation(completeRes);
    setIsResModalOpen(false);
    showToast(`Manual booking added for ${completeRes.name} (${id})`, 'success');
    setNewRes({ name: '', email: '', phone: '', date: '', time: '18:30', guests: 2, message: '' });
  };

  // menu item handlers
  const handleSaveMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.description || !newItem.price) {
      showToast('Please enter a name, description, and price.', 'error');
      return;
    }

    const itemImage = newItem.image || imagePresets[0].url;

    if (editingItem) {
      const updated: MenuItem = {
        ...editingItem,
        name: newItem.name,
        description: newItem.description,
        price: Number(newItem.price),
        category: newItem.category as any,
        image: itemImage,
        isSpicy: !!newItem.isSpicy,
        isVegan: !!newItem.isVegan,
        isGlutenFree: !!newItem.isGlutenFree
      };
      onEditMenuItem(updated);
      showToast(`Plate '${updated.name}' details updated.`, 'success');
    } else {
      const created: MenuItem = {
        id: `DI-${Math.floor(1000 + Math.random() * 9000)}`,
        name: newItem.name,
        description: newItem.description,
        price: Number(newItem.price),
        category: newItem.category as any,
        image: itemImage,
        isSpicy: !!newItem.isSpicy,
        isVegan: !!newItem.isVegan,
        isGlutenFree: !!newItem.isGlutenFree
      };
      onAddMenuItem(created);
      showToast(`Dish '${created.name}' added to Canopy Menu.`, 'success');
    }

    setIsMenuModalOpen(false);
    setEditingItem(null);
    setNewItem({ name: '', description: '', price: 100, category: 'mains', image: '', isSpicy: false, isVegan: false, isGlutenFree: false });
  };

  const handleStartEditMenuItem = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isSpicy: !!item.isSpicy,
      isVegan: !!item.isVegan,
      isGlutenFree: !!item.isGlutenFree
    });
    setIsMenuModalOpen(true);
  };

  const handleMenuDelete = (id: string, name: string) => {
    triggerConfirm(
      'Remove Plate',
      `Are you sure you want to permanently remove '${name}' from the public menu?`,
      () => {
        onDeleteMenuItem(id);
        showToast(`Dish '${name}' deleted from Canopy Menu.`, 'info');
      }
    );
  };

  // Profile Form actions
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempProfile.name.trim() || !tempProfile.email.trim() || !tempProfile.phone.trim()) {
      showToast('Please fill in all mandatory profile fields.', 'error');
      return;
    }
    if (!/^\d{4}$/.test(tempProfile.pin)) {
      showToast('Security PIN must be exactly 4 numeric digits.', 'error');
      return;
    }
    setAdminProfile({ ...tempProfile });
    showToast('Administrator profile updated successfully!', 'success');
  };

  const handleResetProfileForm = () => {
    setTempProfile({ ...adminProfile });
    showToast('Form changes reverted to last saved state.', 'info');
  };

  // Stat Calculations
  const activeResCount = reservations.filter(r => r.status !== 'cancelled').length;
  const pendingResCount = reservations.filter(r => r.status === 'pending').length;
  const approvedResCount = reservations.filter(r => r.status === 'approved').length;
  const totalGuests = reservations.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.guests, 0);
  
  // Approximate Revenue (GHS ₵) based on approved bookings (e.g. ₵350 average spend per guest)
  const estimatedRevenue = totalGuests * 350;
  const unreadInquiriesCount = inquiries.filter(i => i.status === 'unread').length;

  // Search filter implementations
  const filteredReservations = reservations.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(resSearch.toLowerCase()) || 
                          r.email.toLowerCase().includes(resSearch.toLowerCase()) ||
                          r.phone.includes(resSearch);
    const matchesFilter = resFilter === 'all' || r.status === resFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(inqSearch.toLowerCase()) ||
                          i.email.toLowerCase().includes(inqSearch.toLowerCase()) ||
                          i.message.toLowerCase().includes(inqSearch.toLowerCase());
    const matchesFilter = inqFilter === 'all' || i.status === inqFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(menuSearch.toLowerCase());
    const matchesFilter = menuFilter === 'all' || item.category === menuFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-primary-container/10 text-primary pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            /* ================= LOCKSCREEN PANEL ================= */
            <motion.div
              key="auth-gate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto mt-12 bg-primary text-white border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-fixed/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-center space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed/20 border border-secondary-fixed/40 flex items-center justify-center mx-auto text-secondary-fixed">
                  <Lock className="w-6 h-6 stroke-[2]" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white uppercase">
                    Staff Portal Entrance
                  </h2>
                  <p className="font-sans text-xs text-white/60 font-light max-w-xs mx-auto leading-relaxed">
                    This administrative area is restricted to Treehouse Cantonments managers. Enter your 4-digit security PIN to proceed.
                  </p>
                </div>

                <form onSubmit={handlePinSubmit} className="space-y-6">
                  <div className="flex justify-center gap-3">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`w-12 h-14 rounded-xl border flex items-center justify-center text-xl font-bold font-mono transition-all duration-300 ${
                          pin.length > index
                            ? 'bg-secondary-fixed border-secondary-fixed text-primary shadow-md scale-105'
                            : 'bg-black/30 border-white/10 text-white/20'
                        }`}
                      >
                        {pin.length > index ? '●' : ''}
                      </div>
                    ))}
                  </div>

                  {authError && (
                    <p className="text-error-container text-[11px] font-sans flex items-center justify-center gap-1.5" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 text-error" />
                      <span className="text-error">{authError}</span>
                    </p>
                  )}

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-white/50 text-[10px] font-sans justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary-fixed-dim shrink-0" />
                    <span>Security PIN is <strong className="text-secondary-fixed font-extrabold font-mono">{adminProfile.pin}</strong> (Customizable in Profile)</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                      <motion.button
                        whileHover={{ scale: 1.08, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        whileTap={{ scale: 0.92 }}
                        key={num}
                        type="button"
                        onClick={() => handleKeyPress(num)}
                        className="h-12 rounded-xl bg-white/5 border border-white/[0.04] text-white font-sans text-sm font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
                      >
                        {num}
                      </motion.button>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.08, backgroundColor: 'rgba(186, 26, 26, 0.3)' }}
                      whileTap={{ scale: 0.92 }}
                      type="button"
                      onClick={handleClearPin}
                      className="h-12 rounded-xl bg-error/15 border border-error/20 text-error font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-error"
                    >
                      Clear
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      whileTap={{ scale: 0.92 }}
                      type="button"
                      onClick={() => handleKeyPress('0')}
                      className="h-12 rounded-xl bg-white/5 border border-white/[0.04] text-white font-sans text-sm font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-fixed"
                    >
                      0
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08, backgroundColor: '#ffffff', color: '#051b0e' }}
                      whileTap={{ scale: 0.92 }}
                      type="submit"
                      disabled={pin.length !== 4}
                      className="h-12 rounded-xl bg-secondary-fixed text-primary font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-secondary-fixed focus:ring-offset-2"
                    >
                      Enter
                    </motion.button>
                  </div>
                </form>

                <div className="pt-4 border-t border-white/5">
                  <motion.button
                    whileHover={{ scale: 1.04, color: '#ffffff' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onClose}
                    className="font-sans text-[11px] font-bold text-white/40 uppercase tracking-widest transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-white p-1 rounded"
                  >
                    Return to Main Dining Site
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ================= LOGGED IN ADMIN DASHBOARD ================= */
            <motion.div
              key="admin-workspace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-background border border-outline-variant/15 rounded-3xl overflow-hidden shadow-2xl min-h-[600px] flex flex-col lg:flex-row items-stretch text-left"
            >
              
              {/* ADMIN PANEL SIDEBAR NAVIGATION */}
              <aside className="p-6 lg:w-64 bg-primary text-white flex flex-col justify-between shrink-0 border-r border-outline-variant/15 gap-8">
                <div className="space-y-8">
                  {/* Brand header */}
                  <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                    <Unlock className="w-5 h-5 text-secondary-fixed" />
                    <div className="text-left">
                      <h3 className="font-display text-sm font-bold tracking-widest text-white uppercase leading-none">GROVE & VINE</h3>
                      <span className="font-sans text-[9px] text-secondary-fixed font-bold tracking-widest uppercase">STAFF PORTAL</span>
                    </div>
                  </div>

                  {/* Navigation Tab Links */}
                  <nav className="flex flex-col gap-1" aria-label="Staff Dashboard Tabs">
                    {[
                      { id: 'overview', label: 'Stats Overview', icon: LayoutDashboard },
                      { id: 'reservations', label: 'Reservations', icon: Calendar, badge: pendingResCount > 0 ? pendingResCount : undefined },
                      { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, badge: unreadInquiriesCount > 0 ? unreadInquiriesCount : undefined },
                      { id: 'menu', label: 'Menu Catalog', icon: Utensils },
                      { id: 'profile', label: 'Admin Profile', icon: User }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <motion.button
                          whileHover={{ scale: 1.02, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          key={tab.id}
                          onClick={() => {
                            if (tab.id === 'profile') {
                              setTempProfile({ ...adminProfile });
                            }
                            setActiveTab(tab.id as any);
                          }}
                          className={`w-full flex items-center justify-between py-3 px-4 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-fixed ${
                            isActive
                              ? 'bg-secondary-fixed text-primary font-bold shadow-md'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 shrink-0" />
                            <span>{tab.label}</span>
                          </div>
                          {tab.badge && (
                            <span className={`w-5 h-5 rounded-full text-[9px] font-extrabold flex items-center justify-center ${
                              isActive ? 'bg-primary text-white' : 'bg-secondary-fixed text-primary'
                            }`}>
                              {tab.badge}
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </nav>
                </div>

                <div className="space-y-4">
                  {/* Connected Profile info */}
                  <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed/20 flex items-center justify-center text-secondary-fixed font-sans text-xs font-bold shrink-0">
                      {adminProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="font-sans text-xs font-bold text-white truncate">{adminProfile.name}</p>
                      <span className="font-sans text-[9px] text-white/50 block truncate">{adminProfile.role}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(186, 26, 26, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full bg-white/10 hover:text-error py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/5 focus:outline-none focus:ring-2 focus:ring-error"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </motion.button>
                </div>
              </aside>

              {/* ADMIN PANEL WORKSPACE CONTENT */}
              <div className="flex-grow p-6 sm:p-8 flex flex-col justify-between overflow-x-hidden">
                <div className="space-y-6">
                  
                  {/* WORKSPACE HEADER */}
                  <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-outline-variant/10">
                    <div>
                      <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-secondary">Treehouse Operations</span>
                      <h2 className="font-display text-2xl font-bold text-primary capitalize">
                        {activeTab === 'overview' && 'Consolidated Control Desk'}
                        {activeTab === 'reservations' && 'Table Seating & Ledgers'}
                        {activeTab === 'inquiries' && 'Guest Inquiries Dispatch'}
                        {activeTab === 'menu' && 'Equatorial Gastronomy Menu'}
                        {activeTab === 'profile' && 'Administrative Staff Profile'}
                      </h2>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="font-sans text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest border border-outline-variant/30 hover:border-primary py-2.5 px-4 rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Exit Portal
                      </motion.button>
                    </div>
                  </header>

                  <AnimatePresence mode="wait">
                    
                    {/* ================= TABS CONTENT ================= */}

                    {/* OVERVIEW STATS TAB */}
                    {activeTab === 'overview' && (
                      <motion.div
                        key="tab-overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        {/* Stats Widgets grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-between">
                            <div className="space-y-1 text-left">
                              <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-on-surface-variant/60 block">Bookings Ledger</span>
                              <strong className="font-sans text-2xl font-bold text-primary">{activeResCount}</strong>
                              <span className="text-[10px] font-sans text-secondary-fixed-dim block font-semibold">{pendingResCount} awaiting verification</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/15 flex items-center justify-center text-primary">
                              <Calendar className="w-5 h-5" />
                            </div>
                          </div>

                          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-between">
                            <div className="space-y-1 text-left">
                              <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-on-surface-variant/60 block">Active Guests</span>
                              <strong className="font-sans text-2xl font-bold text-primary">{totalGuests}</strong>
                              <span className="text-[10px] font-sans text-secondary-fixed-dim block font-semibold">Approved seating list</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/15 flex items-center justify-center text-primary">
                              <Users className="w-5 h-5" />
                            </div>
                          </div>

                          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-between">
                            <div className="space-y-1 text-left">
                              <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-on-surface-variant/60 block">Est. Dining Revenue</span>
                              <strong className="font-sans text-2xl font-bold text-primary">₵{estimatedRevenue.toLocaleString()}</strong>
                              <span className="text-[10px] font-sans text-secondary-fixed-dim block font-semibold">₵350 avg ticket estimate</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/15 flex items-center justify-center text-primary">
                              <DollarSign className="w-5 h-5" />
                            </div>
                          </div>

                          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-between">
                            <div className="space-y-1 text-left">
                              <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-on-surface-variant/60 block">Unread Dispatches</span>
                              <strong className="font-sans text-2xl font-bold text-primary">{unreadInquiriesCount}</strong>
                              <span className="text-[10px] font-sans text-secondary-fixed-dim block font-semibold">Guest messages inbox</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/15 flex items-center justify-center text-primary">
                              <MessageSquare className="w-5 h-5" />
                            </div>
                          </div>
                        </div>

                        {/* Profile Context Card replacing the Logs console & Shortcuts */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                          {/* Left Panel: Active profile context */}
                          <div className="lg:col-span-7 bg-primary text-white rounded-3xl p-6 border border-white/5 flex flex-col justify-between min-h-[300px] text-left">
                            <div className="space-y-6">
                              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-secondary-fixed" />
                                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest">Active Profile Context</h4>
                                </div>
                                <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-full bg-secondary-fixed/10 border border-secondary-fixed/20 text-[9px] font-sans font-semibold text-secondary-fixed">
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>Secure Role</span>
                                </span>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                                <div className="w-16 h-16 rounded-full bg-secondary-fixed/25 flex items-center justify-center text-secondary-fixed font-sans text-2xl font-bold shrink-0 border border-secondary-fixed/45">
                                  {adminProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                </div>
                                <div className="space-y-1">
                                  <h3 className="font-display text-lg font-bold text-white leading-tight">{adminProfile.name}</h3>
                                  <p className="font-sans text-xs text-secondary-fixed font-medium">{adminProfile.role}</p>
                                  <p className="font-sans text-[11px] text-white/50">{adminProfile.email} • {adminProfile.phone}</p>
                                </div>
                              </div>

                              <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                                "{adminProfile.bio}"
                              </p>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                              <span className="text-[9px] font-sans text-white/40 uppercase tracking-widest">
                                PIN Security Gate: Active
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setTempProfile({ ...adminProfile });
                                  setActiveTab('profile');
                                }}
                                className="font-sans text-[10px] font-bold uppercase text-secondary-fixed hover:text-white transition-colors flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary-fixed p-1 rounded"
                              >
                                <span>Manage Profile</span>
                                <Edit className="w-3.5 h-3.5" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Right Panel: Quick Shortcuts */}
                          <div className="lg:col-span-5 border border-outline-variant/15 bg-surface-container-low rounded-3xl p-5 flex flex-col justify-between">
                            <div className="space-y-4">
                              <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-primary text-left">Administrative Shortcuts</h4>
                              <div className="grid grid-cols-2 gap-3">
                                <button
                                  onClick={() => setIsResModalOpen(true)}
                                  className="p-3 bg-background hover:bg-secondary-fixed/20 border border-outline-variant/20 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer group"
                                >
                                  <PlusCircle className="w-5 h-5 text-secondary group-hover:scale-105 transition-transform" />
                                  <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-primary">New Reservation</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingItem(null);
                                    setNewItem({ name: '', description: '', price: 100, category: 'mains', image: '', isSpicy: false, isVegan: false, isGlutenFree: false });
                                    setIsMenuModalOpen(true);
                                  }}
                                  className="p-3 bg-background hover:bg-secondary-fixed/20 border border-outline-variant/20 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer group"
                                >
                                  <Plus className="w-5 h-5 text-secondary group-hover:scale-105 transition-transform" />
                                  <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-primary">New Dish</span>
                                </button>
                                <button
                                  onClick={() => setActiveTab('reservations')}
                                  className="p-3 bg-background hover:bg-secondary-fixed/20 border border-outline-variant/20 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer group"
                                >
                                  <Calendar className="w-5 h-5 text-primary" />
                                  <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-primary">Review Seating</span>
                                </button>
                                <button
                                  onClick={() => setActiveTab('inquiries')}
                                  className="p-3 bg-background hover:bg-secondary-fixed/20 border border-outline-variant/20 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer group"
                                >
                                  <MessageSquare className="w-5 h-5 text-primary" />
                                  <span className="font-sans text-[9px] font-bold uppercase tracking-wider text-primary">Read Inquiries</span>
                                </button>
                              </div>
                            </div>
                            
                            <div className="text-[10px] font-sans text-on-surface-variant/40 uppercase tracking-widest text-center pt-4 border-t border-outline-variant/10 mt-4">
                              Database Mode: React Memory State
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* RESERVATIONS MANAGEMENT TAB */}
                    {activeTab === 'reservations' && (
                      <motion.div
                        key="tab-reservations"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        {/* Search and Filters panel */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                          <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                            <input
                              type="search"
                              placeholder="Search guest name, email, phone..."
                              value={resSearch}
                              onChange={(e) => setResSearch(e.target.value)}
                              className="w-full py-2.5 pl-11 pr-4 bg-background border border-outline-variant/20 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-end">
                            <Filter className="w-3.5 h-3.5 text-on-surface-variant/40 mr-1.5" />
                            {(['all', 'pending', 'approved', 'cancelled'] as const).map((status) => (
                              <button
                                key={status}
                                onClick={() => setResFilter(status)}
                                className={`font-sans text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                                  resFilter === status
                                    ? 'bg-primary border-primary text-secondary-fixed shadow-sm'
                                    : 'bg-background border-outline-variant/15 text-primary hover:border-primary/30'
                                }`}
                              >
                                {status}
                              </button>
                            ))}
                            <button
                              onClick={() => setIsResModalOpen(true)}
                              className="bg-secondary-fixed text-primary hover:bg-primary hover:text-secondary-fixed font-sans text-[9px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Manual Add</span>
                            </button>
                          </div>
                        </div>

                        {/* Reservations Table list */}
                        <div className="overflow-x-auto rounded-2xl border border-outline-variant/10 bg-surface-container-low">
                          <table className="w-full font-sans text-xs text-left border-collapse">
                            <thead>
                              <tr className="bg-primary/5 text-primary uppercase font-bold tracking-wider text-[9px] border-b border-outline-variant/15">
                                <th className="p-4">Guest Seating Details</th>
                                <th className="p-4">Date & Time</th>
                                <th className="p-4">Party Size</th>
                                <th className="p-4">Special Requests</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredReservations.length > 0 ? (
                                filteredReservations.map((res) => (
                                  <tr key={res.id} className="border-b border-outline-variant/10 hover:bg-primary/2 transition-colors">
                                    <td className="p-4 space-y-1">
                                      <strong className="font-sans text-primary font-bold block">{res.name}</strong>
                                      <span className="text-[10px] text-on-surface-variant/70 block font-mono">{res.email}</span>
                                      <span className="text-[10px] text-on-surface-variant/70 block">{res.phone}</span>
                                    </td>
                                    <td className="p-4 font-medium text-primary whitespace-nowrap">
                                      <div>{res.date}</div>
                                      <div className="text-[10px] text-on-surface-variant flex items-center gap-1 mt-0.5 font-bold uppercase">
                                        <Clock className="w-3 h-3 text-secondary" />
                                        <span>{res.time} UTC</span>
                                      </div>
                                    </td>
                                    <td className="p-4 font-bold text-primary">
                                      {res.guests} Guests
                                    </td>
                                    <td className="p-4 max-w-xs truncate text-on-surface-variant font-light text-[11px]" title={res.message}>
                                      {res.message || <span className="text-on-surface-variant/30 italic">None</span>}
                                    </td>
                                    <td className="p-4">
                                      <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                        res.status === 'approved' ? 'bg-secondary-fixed/30 text-primary' :
                                        res.status === 'cancelled' ? 'bg-error-container/15 text-error border border-error/10' :
                                        'bg-primary/10 text-primary-fixed border border-primary/20'
                                      }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                          res.status === 'approved' ? 'bg-secondary' :
                                          res.status === 'cancelled' ? 'bg-error' : 'bg-primary-fixed'
                                        }`} />
                                        <span>{res.status}</span>
                                      </span>
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end gap-1.5">
                                        {res.status !== 'approved' && (
                                          <button
                                            onClick={() => handleResStatusUpdate(res.id!, res.name, 'approved')}
                                            className="p-2 bg-secondary-fixed/15 hover:bg-secondary-fixed hover:text-primary text-primary rounded-xl transition-all cursor-pointer"
                                            title="Approve table"
                                          >
                                            <CheckCircle className="w-4 h-4 text-secondary stroke-[2]" />
                                          </button>
                                        )}
                                        {res.status !== 'cancelled' && (
                                          <button
                                            onClick={() => handleResStatusUpdate(res.id!, res.name, 'cancelled')}
                                            className="p-2 bg-error-container/10 hover:bg-error hover:text-white text-error rounded-xl transition-all cursor-pointer"
                                            title="Cancel seating"
                                          >
                                            <XCircle className="w-4 h-4 stroke-[2]" />
                                          </button>
                                        )}
                                        <button
                                          onClick={() => handleResDelete(res.id!, res.name)}
                                          className="p-2 hover:bg-error-container/10 text-on-surface-variant hover:text-error rounded-xl transition-all cursor-pointer"
                                          title="Remove permanent"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6} className="p-12 text-center text-on-surface-variant/40">
                                    <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="font-sans">No matching reservations inside the log ledger.</p>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}

                    {/* INQUIRIES MANAGEMENT TAB */}
                    {activeTab === 'inquiries' && (
                      <motion.div
                        key="tab-inquiries"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        {/* Filters toolbar */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                          <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                            <input
                              type="search"
                              placeholder="Search message text, sender name..."
                              value={inqSearch}
                              onChange={(e) => setInqSearch(e.target.value)}
                              className="w-full py-2.5 pl-11 pr-4 bg-background border border-outline-variant/20 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-end">
                            <Filter className="w-3.5 h-3.5 text-on-surface-variant/40 mr-1.5" />
                            {(['all', 'unread', 'read', 'responded'] as const).map((status) => (
                              <button
                                key={status}
                                onClick={() => setInqFilter(status)}
                                className={`font-sans text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                                  inqFilter === status
                                    ? 'bg-primary border-primary text-secondary-fixed shadow-sm'
                                    : 'bg-background border-outline-variant/15 text-primary hover:border-primary/30'
                                }`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Cards Layout list */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredInquiries.length > 0 ? (
                            filteredInquiries.map((inq) => (
                              <div
                                key={inq.id}
                                className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 text-left transition-all relative ${
                                  inq.status === 'unread'
                                    ? 'bg-secondary-fixed/5 border-secondary-fixed shadow-sm'
                                    : 'bg-surface-container-low border-outline-variant/10'
                                }`}
                              >
                                {inq.status === 'unread' && (
                                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-secondary" />
                                )}

                                <div className="space-y-2.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-secondary">
                                      {inq.subject}
                                    </span>
                                    <span className="text-[9px] font-mono text-on-surface-variant/50">
                                      {inq.createdAt || '09:30 UTC'}
                                    </span>
                                  </div>

                                  <div className="space-y-0.5">
                                    <strong className="font-sans text-xs sm:text-sm text-primary block">{inq.name}</strong>
                                    <span className="text-[10px] font-mono text-on-surface-variant/70 block">{inq.email}</span>
                                  </div>

                                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed font-light line-clamp-3">
                                    "{inq.message}"
                                  </p>
                                </div>

                                <div className="pt-3 border-t border-outline-variant/10 flex items-center justify-between">
                                  <span className={`text-[9px] font-sans font-bold uppercase tracking-widest ${
                                    inq.status === 'responded' ? 'text-secondary-fixed-dim' :
                                    inq.status === 'read' ? 'text-primary/60' : 'text-primary font-bold'
                                  }`}>
                                    Status: {inq.status}
                                  </span>

                                  <div className="flex items-center gap-1.5">
                                    {inq.status === 'unread' && (
                                      <button
                                        onClick={() => handleInquiryStatus(inq.id!, inq.name, 'read')}
                                        className="p-1.5 bg-background text-primary border border-outline-variant/20 hover:border-primary rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                      >
                                        Mark Read
                                      </button>
                                    )}
                                    <button
                                      onClick={() => setActiveReplyInquiry(inq)}
                                      className="p-1.5 bg-primary text-secondary-fixed hover:bg-primary-container rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                                    >
                                      <span>Reply</span>
                                    </button>
                                    <button
                                      onClick={() => handleInquiryDelete(inq.id!, inq.name)}
                                      className="p-1.5 hover:bg-error-container/15 text-on-surface-variant hover:text-error rounded-lg transition-colors cursor-pointer"
                                      aria-label="Delete inquiry"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-2 p-12 text-center text-on-surface-variant/40 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="font-sans">No matching dispatches found inside this inquiry category.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* MENU MANAGEMENT TAB */}
                    {activeTab === 'menu' && (
                      <motion.div
                        key="tab-menu"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                          <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
                            <input
                              type="search"
                              placeholder="Search ginger, snaps, scallops..."
                              value={menuSearch}
                              onChange={(e) => setMenuSearch(e.target.value)}
                              className="w-full py-2.5 pl-11 pr-4 bg-background border border-outline-variant/20 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                          </div>

                          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-end">
                            <Filter className="w-3.5 h-3.5 text-on-surface-variant/40 mr-1.5" />
                            {(['all', 'starters', 'mains', 'seafood', 'desserts', 'drinks'] as const).map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setMenuFilter(cat)}
                                className={`font-sans text-[9px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                                  menuFilter === cat
                                    ? 'bg-primary border-primary text-secondary-fixed shadow-sm'
                                    : 'bg-background border-outline-variant/15 text-primary hover:border-primary/30'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                            <button
                              onClick={() => {
                                setEditingItem(null);
                                setNewItem({ name: '', description: '', price: 100, category: 'mains', image: '', isSpicy: false, isVegan: false, isGlutenFree: false });
                                setIsMenuModalOpen(true);
                              }}
                              className="bg-secondary-fixed text-primary hover:bg-primary hover:text-secondary-fixed font-sans text-[9px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Dish</span>
                            </button>
                          </div>
                        </div>

                        {/* Dish items tabular view */}
                        <div className="overflow-x-auto rounded-2xl border border-outline-variant/10 bg-surface-container-low">
                          <table className="w-full font-sans text-xs text-left border-collapse">
                            <thead>
                              <tr className="bg-primary/5 text-primary uppercase font-bold tracking-wider text-[9px] border-b border-outline-variant/15">
                                <th className="p-4">Dish Details</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Diet Tags</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredMenuItems.length > 0 ? (
                                filteredMenuItems.map((dish) => (
                                  <tr key={dish.id} className="border-b border-outline-variant/10 hover:bg-primary/2 transition-colors">
                                    <td className="p-4">
                                      <div className="flex items-center gap-3">
                                        <img
                                          src={dish.image}
                                          alt={dish.name}
                                          className="w-10 h-10 rounded-lg object-cover bg-surface-dim shrink-0 text-[10px]"
                                          referrerPolicy="no-referrer"
                                        />
                                        <div className="text-left space-y-0.5">
                                          <strong className="font-sans text-primary font-bold block">{dish.name}</strong>
                                          <p className="font-sans text-[11px] text-on-surface-variant font-light max-w-sm line-clamp-1">{dish.description}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 capitalize font-medium text-primary">
                                      {dish.category}
                                    </td>
                                    <td className="p-4 font-bold text-secondary">
                                      ₵{dish.price}
                                    </td>
                                    <td className="p-4">
                                      <div className="flex flex-wrap gap-1">
                                        {dish.isVegan && (
                                          <span className="bg-primary/10 text-primary text-[8px] font-sans font-bold py-0.5 px-1.5 rounded-full uppercase tracking-wider border border-primary/20">
                                            Vegan
                                          </span>
                                        )}
                                        {dish.isGlutenFree && (
                                          <span className="bg-primary-container/30 text-primary text-[8px] font-sans font-bold py-0.5 px-1.5 rounded-full uppercase tracking-wider border border-primary/10">
                                            GF
                                          </span>
                                        )}
                                        {dish.isSpicy && (
                                          <span className="bg-error-container/10 text-error text-[8px] font-sans font-bold py-0.5 px-1.5 rounded-full uppercase tracking-wider border border-error/15 flex items-center gap-0.5">
                                            <Flame className="w-2.5 h-2.5 fill-error" />
                                            Spicy
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex items-center justify-end gap-1.5">
                                        <button
                                          onClick={() => handleStartEditMenuItem(dish)}
                                          className="p-2 hover:bg-secondary-fixed/20 text-primary rounded-xl transition-all cursor-pointer"
                                          title="Edit dish details"
                                        >
                                          <Edit className="w-4 h-4 text-primary" />
                                        </button>
                                        <button
                                          onClick={() => handleMenuDelete(dish.id, dish.name)}
                                          className="p-2 hover:bg-error-container/10 text-on-surface-variant hover:text-error rounded-xl transition-all cursor-pointer"
                                          title="Delete dish"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={5} className="p-12 text-center text-on-surface-variant/40">
                                    <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="font-sans">No matching dishes cataloged in this filter.</p>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}

                    {/* ADMIN PROFILE MANAGEMENT TAB */}
                    {activeTab === 'profile' && (
                      <motion.div
                        key="tab-profile"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6 text-left"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                          {/* Left column: Profile Visual Badge Card */}
                          <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant/10 rounded-3xl p-6 flex flex-col items-center justify-between text-center min-h-[350px]">
                            <div className="space-y-4 w-full">
                              <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/25 flex items-center justify-center text-primary font-sans text-3xl font-bold mx-auto shadow-sm">
                                {tempProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AD'}
                              </div>
                              <div className="space-y-1">
                                <h3 className="font-display text-base font-bold text-primary leading-tight">
                                  {tempProfile.name || 'Anonymous Admin'}
                                </h3>
                                <p className="font-sans text-xs text-secondary font-semibold">
                                  {tempProfile.role || 'Staff Member'}
                                </p>
                              </div>
                              <div className="p-3 bg-primary/5 border border-primary/5 rounded-xl text-[11px] font-sans text-on-surface-variant font-light leading-relaxed max-w-xs mx-auto">
                                "{tempProfile.bio || 'No bio written yet.'}"
                              </div>
                            </div>

                            <div className="w-full pt-4 border-t border-outline-variant/15 text-left space-y-2">
                              <div className="flex justify-between text-[11px] font-sans">
                                <span className="text-on-surface-variant/50">Primary Contact:</span>
                                <span className="text-primary font-semibold font-mono">{tempProfile.phone || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between text-[11px] font-sans">
                                <span className="text-on-surface-variant/50">Admin Email:</span>
                                <span className="text-primary font-semibold font-mono">{tempProfile.email || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between text-[11px] font-sans">
                                <span className="text-on-surface-variant/50">Active Gate PIN:</span>
                                <span className="text-secondary font-bold font-mono">•••• (Secured)</span>
                              </div>
                            </div>
                          </div>

                          {/* Right column: Form */}
                          <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant/10 rounded-3xl p-6">
                            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-primary mb-4 pb-2 border-b border-outline-variant/15">
                              Update Staff Profile Details
                            </h3>

                            <form onSubmit={handleSaveProfile} className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Full Name *</label>
                                  <input
                                    type="text"
                                    required
                                    value={tempProfile.name}
                                    onChange={(e) => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    placeholder="Kojo Boateng"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Operational Role *</label>
                                  <select
                                    value={tempProfile.role}
                                    onChange={(e) => setTempProfile(prev => ({ ...prev, role: e.target.value }))}
                                    className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                  >
                                    <option value="Operations Director">Operations Director</option>
                                    <option value="Executive Chef">Executive Chef</option>
                                    <option value="F&B Director">F&B Director</option>
                                    <option value="General Manager">General Manager</option>
                                    <option value="Duty Officer">Duty Officer</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Email Address *</label>
                                  <input
                                    type="email"
                                    required
                                    value={tempProfile.email}
                                    onChange={(e) => setTempProfile(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    placeholder="kojo@treehouse.com"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Phone Number *</label>
                                  <input
                                    type="tel"
                                    required
                                    value={tempProfile.phone}
                                    onChange={(e) => setTempProfile(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    placeholder="+233 24 123 4567"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2 space-y-1.5">
                                  <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Staff Biography</label>
                                  <textarea
                                    rows={3}
                                    value={tempProfile.bio}
                                    onChange={(e) => setTempProfile(prev => ({ ...prev, bio: e.target.value }))}
                                    className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    placeholder="Brief bio describing your role and responsibilities..."
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Gate Access PIN *</label>
                                  <input
                                    type="text"
                                    required
                                    maxLength={4}
                                    value={tempProfile.pin}
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/\D/g, '');
                                      setTempProfile(prev => ({ ...prev, pin: val }));
                                    }}
                                    className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs font-bold font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    placeholder="1234"
                                  />
                                  <span className="text-[9px] text-on-surface-variant/40 block leading-tight font-sans">
                                    Exactly 4 numeric digits. Needed for lock screen.
                                  </span>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-outline-variant/15 flex justify-end gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  type="button"
                                  onClick={handleResetProfileForm}
                                  className="font-sans text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest border border-outline-variant/20 py-2.5 px-5 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                  Revert
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  type="submit"
                                  className="bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-[10px] font-bold uppercase tracking-widest py-2.5 px-6 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                  Save Profile
                                </motion.button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                </div>

                <div className="pt-8 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-on-surface-variant/40 font-sans text-[9px] uppercase tracking-widest">
                  <div>
                    © {new Date().getFullYear()} Treehouse Operations Portal. Secure Level Admin.
                  </div>
                  <div className="flex gap-4">
                    <span>Cantonments HQ Accra</span>
                    <span>Encryption Active</span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= MODALS SECTION ================= */}

      {/* 1. SEATING MANUAL BOOKING MODAL */}
      <AnimatePresence>
        {isResModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResModalOpen(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg bg-background border border-outline-variant/20 rounded-3xl p-6 sm:p-8 z-[105] shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/15 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-primary">Manual Seating Registration</h3>
                </div>
                <button
                  onClick={() => setIsResModalOpen(false)}
                  className="p-1 rounded-xl text-primary hover:bg-secondary-container/20 cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateManualReservation} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Guest Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Mawuli Agbenu"
                      value={newRes.name}
                      onChange={(e) => setNewRes(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="mawuli@forest.com"
                      value={newRes.email}
                      onChange={(e) => setNewRes(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+233 55 901 0202"
                      value={newRes.phone}
                      onChange={(e) => setNewRes(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={newRes.date}
                      onChange={(e) => setNewRes(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Seating Time *</label>
                    <select
                      value={newRes.time}
                      onChange={(e) => setNewRes(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      <option value="12:00">12:00 (Lunch)</option>
                      <option value="13:30">13:30 (Lunch)</option>
                      <option value="15:00">15:00 (High Tea)</option>
                      <option value="17:00">17:00 (Sunset)</option>
                      <option value="18:30">18:30 (Dinner)</option>
                      <option value="20:00">20:00 (Dinner)</option>
                      <option value="21:30">21:30 (Late Night)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Guests count (1-12) *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={12}
                      value={newRes.guests}
                      onChange={(e) => setNewRes(prev => ({ ...prev, guests: Number(e.target.value) }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Internal Notes / Requests</label>
                    <input
                      type="text"
                      placeholder="e.g. VIP client, allergic to ginger"
                      value={newRes.message}
                      onChange={(e) => setNewRes(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/15 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsResModalOpen(false)}
                    className="font-sans text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest border border-outline-variant/20 py-2.5 px-5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-[10px] font-bold uppercase tracking-widest py-2.5 px-6 rounded-xl cursor-pointer"
                  >
                    Confirm Table Seating
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. MENU ADD/EDIT MODAL */}
      <AnimatePresence>
        {isMenuModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuModalOpen(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-xl bg-background border border-outline-variant/20 rounded-3xl p-6 sm:p-8 z-[105] shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/15 mb-6">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-secondary" />
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-primary">
                    {editingItem ? `Edit Plate: ${editingItem.name}` : 'Add New Plate to Canopy'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsMenuModalOpen(false)}
                  className="p-1 rounded-xl text-primary hover:bg-secondary-container/20 cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMenuItem} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Plate Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Spiced Cassava Dumpling"
                      value={newItem.name}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Price (₵ GHS) *</label>
                    <input
                      type="number"
                      required
                      min={10}
                      placeholder="120"
                      value={newItem.price}
                      onChange={(e) => setNewItem(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Plate Description *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Slow-baked cassava pearls seasoned with cardamon and bird's eye chili, served with whipped avocado cream."
                    value={newItem.description}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Plate Category *</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary capitalize"
                    >
                      <option value="starters">Starters</option>
                      <option value="mains">Main Courses</option>
                      <option value="seafood">Seafood Selections</option>
                      <option value="desserts">Desserts</option>
                      <option value="drinks">Drinks & Nectars</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Dietary Allergens</label>
                    <div className="flex gap-4 pt-2">
                      <label className="flex items-center gap-1.5 font-sans text-xs text-primary cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!newItem.isVegan}
                          onChange={(e) => setNewItem(prev => ({ ...prev, isVegan: e.target.checked }))}
                          className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                        />
                        <span>Vegan</span>
                      </label>
                      <label className="flex items-center gap-1.5 font-sans text-xs text-primary cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!newItem.isGlutenFree}
                          onChange={(e) => setNewItem(prev => ({ ...prev, isGlutenFree: e.target.checked }))}
                          className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                        />
                        <span>Gluten Free</span>
                      </label>
                      <label className="flex items-center gap-1.5 font-sans text-xs text-primary cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!newItem.isSpicy}
                          onChange={(e) => setNewItem(prev => ({ ...prev, isSpicy: e.target.checked }))}
                          className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                        />
                        <span>Spicy</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Plate Image Cover</label>
                  <div className="grid grid-cols-5 gap-2">
                    {imagePresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewItem(prev => ({ ...prev, image: preset.url }))}
                        className={`aspect-square rounded-xl overflow-hidden relative border-2 transition-all cursor-pointer ${
                          newItem.image === preset.url ? 'border-secondary-fixed ring-2 ring-primary' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        title={preset.name}
                      >
                        <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                        {newItem.image === preset.url && (
                          <div className="absolute inset-0 bg-primary/25 flex items-center justify-center">
                            <Check className="w-4 h-4 text-secondary stroke-[4]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2">
                    <input
                      type="url"
                      placeholder="Or paste custom unsplash url..."
                      value={newItem.image}
                      onChange={(e) => setNewItem(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full py-2 px-3.5 bg-background border border-outline-variant/25 rounded-lg font-sans text-[11px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/15 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMenuModalOpen(false)}
                    className="font-sans text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest border border-outline-variant/20 py-2.5 px-5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-[10px] font-bold uppercase tracking-widest py-2.5 px-6 rounded-xl cursor-pointer"
                  >
                    Save Public Plate
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. INQUIRY REPLY DISPATCH MODAL */}
      <AnimatePresence>
        {activeReplyInquiry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveReplyInquiry(null)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg bg-background border border-outline-variant/20 rounded-3xl p-6 sm:p-8 z-[105] shadow-2xl"
            >
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/15 mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-primary">Concierge Reply Dispatch</h3>
                </div>
                <button
                  onClick={() => setActiveReplyInquiry(null)}
                  className="p-1 rounded-xl text-primary hover:bg-secondary-container/20 cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-left">
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 text-xs text-on-surface-variant font-light space-y-2">
                  <div className="flex justify-between font-semibold text-primary">
                    <span>Sender: {activeReplyInquiry.name}</span>
                    <span>Topic: {activeReplyInquiry.subject}</span>
                  </div>
                  <p className="italic font-sans">"{activeReplyInquiry.message}"</p>
                </div>

                <form onSubmit={handleSendInquiryReply} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">Response Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Dear Guest, Thank you for reaching out. We would be absolutely delighted to accommodate your seating buyout requirements..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="w-full py-2.5 px-3.5 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="pt-4 border-t border-outline-variant/15 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveReplyInquiry(null)}
                      className="font-sans text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest border border-outline-variant/20 py-2.5 px-5 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-[10px] font-bold uppercase tracking-widest py-2.5 px-6 rounded-xl cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Send Dispatch</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= GLOBAL CUSTOM NOTIFICATION TOAST ================= */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            onAnimationComplete={() => {
              const timer = setTimeout(() => {
                setToast(null);
              }, 3000);
              return () => clearTimeout(timer);
            }}
            className="fixed bottom-6 right-6 z-[200] max-w-sm bg-primary border border-white/10 rounded-2xl p-4 shadow-2xl text-left"
          >
            <div className="flex gap-3 items-center">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                toast.type === 'success' ? 'bg-secondary-fixed/20 text-secondary-fixed' :
                toast.type === 'error' ? 'bg-error-container/20 text-error' : 'bg-white/10 text-white'
              }`}>
                {toast.type === 'success' ? <CheckCircle className="w-4 h-4 stroke-[2]" /> :
                 toast.type === 'error' ? <AlertCircle className="w-4 h-4 stroke-[2]" /> :
                 <Clock className="w-4 h-4 stroke-[2]" />}
              </div>
              <div className="flex-grow space-y-0.5">
                <span className="font-sans text-[10px] font-bold uppercase text-white/40 tracking-wider">System Event Notify</span>
                <p className="font-sans text-xs text-white leading-snug">{toast.message}</p>
              </div>
              <button
                onClick={() => setToast(null)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CUSTOM CONFIRMATION DIALOG MODAL ================= */}
      <AnimatePresence>
        {confirmDialog && confirmDialog.isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDialog(null)}
              className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-[250]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm bg-background border border-outline-variant/20 rounded-3xl p-6 z-[260] shadow-2xl text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <AlertCircle className="w-5 h-5 text-error shrink-0" />
                  <h4 className="font-sans text-sm font-bold uppercase tracking-wider">{confirmDialog.title}</h4>
                </div>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {confirmDialog.message}
                </p>
                <div className="pt-2 flex justify-end gap-2.5">
                  <button
                    onClick={() => setConfirmDialog(null)}
                    className="font-sans text-[10px] font-bold text-primary hover:text-secondary uppercase tracking-widest border border-outline-variant/20 py-2 px-4 rounded-xl cursor-pointer"
                  >
                    No, Cancel
                  </button>
                  <button
                    onClick={confirmDialog.onConfirm}
                    className="bg-error hover:bg-error/90 text-white font-sans text-[10px] font-bold uppercase tracking-widest py-2 px-4.5 rounded-xl cursor-pointer"
                  >
                    Yes, Proceed
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
