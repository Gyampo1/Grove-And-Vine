import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationFormProps {
  onSuccess?: (reservation: Reservation) => void;
}

export default function ReservationForm({ onSuccess }: ReservationFormProps) {
  // Form Steps: 1 = Date, Time & Guests; 2 = Guest Contact Info
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const [formData, setFormData] = useState<Reservation>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    message: ''
  });

  const availableTimeSlots = [
    '12:00', '13:30', '15:00', '17:00', '18:30', '20:00', '21:30'
  ];

  // Live validator
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.date) {
        newErrors.date = 'Please select a dining date.';
      } else {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors.date = 'Dining date must be today or in the future.';
        }
      }

      if (!formData.time) {
        newErrors.time = 'Please select a preferred seating time.';
      }

      if (!formData.guests || formData.guests < 1 || formData.guests > 12) {
        newErrors.guests = 'Reservations must be between 1 and 12 guests.';
      }
    }

    if (currentStep === 2) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required.';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters.';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = 'Email address is required.';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please provide a valid email address.';
      }

      const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required.';
      } else if (formData.phone.length < 8 || !phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please provide a valid contact number (min 8 digits).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(1)) {
      setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      const generatedRef = `TH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(generatedRef);

      if (onSuccess) {
        onSuccess(formData);
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear live errors for edited fields
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  return (
    <section className="py-24 bg-surface-container-lowest" aria-labelledby="reservation-form-title">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header section */}
        <div className="text-center mb-12">
          <span className="font-sans text-xs font-bold text-secondary-fixed uppercase tracking-[0.25em] block mb-2">
            Secure Your Culinary Journey
          </span>
          <h2 id="reservation-form-title" className="font-display text-3xl md:text-5xl text-primary font-bold tracking-tight mb-4">
            Glass Sanctuary Seating
          </h2>
          <p className="font-sans text-sm text-on-surface-variant font-light max-w-lg mx-auto">
            Bookings are released 30 days in advance. Standard slots allow for a 2-hour high-sensory immersive experience.
          </p>
        </div>

        {/* Wizard Panel */}
        <div className="bg-background rounded-3xl border border-outline-variant/20 shadow-xl overflow-hidden min-h-[480px]">
          {/* Progress Indicators */}
          <div className="bg-surface-container-low px-8 py-5 border-b border-outline-variant/15 flex items-center justify-between">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/70">
              {submitSuccess ? 'BOOKING COMPLETE' : `STEP ${step} OF 2 : ${step === 1 ? 'SEATING SCHEDULER' : 'CONTACT VERIFICATION'}`}
            </span>
            <div className="flex gap-1.5">
              <span className={`h-1.5 rounded-full transition-all duration-300 ${submitSuccess ? 'w-4 bg-secondary-fixed' : step === 1 ? 'w-6 bg-primary' : 'w-2 bg-primary/20'}`} />
              <span className={`h-1.5 rounded-full transition-all duration-300 ${submitSuccess ? 'w-4 bg-secondary-fixed' : step === 2 ? 'w-6 bg-primary' : 'w-2 bg-primary/20'}`} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.form
                key="form-fields"
                onSubmit={handleSubmit}
                noValidate
                className="p-8 sm:p-12 space-y-8"
                initial={{ opacity: 0, x: step === 1 ? -15 : 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step === 1 ? 15 : -15 }}
                transition={{ duration: 0.35 }}
              >
                {/* STEP 1: Scheduler details */}
                {step === 1 && (
                  <div className="space-y-6">
                    {/* Guest Count Selector */}
                    <div className="space-y-3">
                      <label id="guests-label" className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-primary">
                        <Users className="w-4 h-4 text-secondary-fixed" />
                        <span>Dining Party Size</span>
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3" role="radiogroup" aria-labelledby="guests-label">
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={num}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, guests: num }))}
                            className={`py-3 rounded-xl font-sans text-sm font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                              formData.guests === num
                                ? 'bg-primary border-primary text-secondary-fixed shadow-md'
                                : 'bg-background border-outline-variant/30 text-primary hover:border-primary/50'
                            }`}
                          >
                            {num}
                          </motion.button>
                        ))}
                      </div>
                      {errors.guests && (
                        <p className="text-error text-xs flex items-center gap-1.5 mt-2 font-sans" role="alert">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.guests}</span>
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Date selection */}
                      <div className="space-y-3">
                        <label htmlFor="date-input" className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-primary">
                          <Calendar className="w-4 h-4 text-secondary-fixed" />
                          <span>Preferred Date</span>
                        </label>
                        <input
                          id="date-input"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full py-4 px-4 bg-background border rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            errors.date ? 'border-error ring-1 ring-error' : 'border-outline-variant/35 focus:border-primary'
                          }`}
                        />
                        {errors.date && (
                          <p className="text-error text-xs flex items-center gap-1.5 mt-1.5 font-sans" role="alert">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.date}</span>
                          </p>
                        )}
                      </div>

                      {/* Time Slots Selector */}
                      <div className="space-y-3">
                        <label id="time-label" className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-primary">
                          <Clock className="w-4 h-4 text-secondary-fixed" />
                          <span>Seating Time</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-labelledby="time-label">
                          {availableTimeSlots.map((time) => (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              key={time}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, time }))}
                              className={`py-3 rounded-xl font-sans text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                                formData.time === time
                                  ? 'bg-primary border-primary text-secondary-fixed'
                                  : 'bg-background border-outline-variant/30 text-primary hover:border-primary/55'
                              }`}
                            >
                              {time}
                            </motion.button>
                          ))}
                        </div>
                        {errors.time && (
                          <p className="text-error text-xs flex items-center gap-1.5 mt-1.5 font-sans" role="alert">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.time}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Step 1 CTA */}
                    <div className="pt-6 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.03, x: 2 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-xs font-semibold uppercase tracking-widest py-4 px-8 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <span>Seating Details</span>
                        <ArrowRight className="w-4 h-4 text-secondary-fixed" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Contact verification */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-sans text-xs font-bold uppercase tracking-wider text-primary block">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Kojo Mensah"
                          className={`w-full py-4 px-4 bg-background border rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            errors.name ? 'border-error ring-1 ring-error' : 'border-outline-variant/35 focus:border-primary'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-error text-xs flex items-center gap-1.5 mt-1.5 font-sans" role="alert">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-sans text-xs font-bold uppercase tracking-wider text-primary block">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="kojo@accra.com"
                          className={`w-full py-4 px-4 bg-background border rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            errors.email ? 'border-error ring-1 ring-error' : 'border-outline-variant/35 focus:border-primary'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-error text-xs flex items-center gap-1.5 mt-1.5 font-sans" role="alert">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone input */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="font-sans text-xs font-bold uppercase tracking-wider text-primary block">
                        Contact Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+233 55 123 4567"
                        className={`w-full py-4 px-4 bg-background border rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.phone ? 'border-error ring-1 ring-error' : 'border-outline-variant/35 focus:border-primary'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-error text-xs flex items-center gap-1.5 mt-1.5 font-sans" role="alert">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Message input */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-sans text-xs font-bold uppercase tracking-wider text-primary block">
                        Special Requests / Dietary Restrictions <span className="text-on-surface-variant/40 font-light lowercase italic">(optional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Please let us know of any severe food allergies, or if you are celebrating a special milestone."
                        className="w-full py-4 px-4 bg-background border border-outline-variant/35 rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    {/* Step 2 Buttons */}
                    <div className="pt-6 flex justify-between items-center">
                      <motion.button
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handlePrev}
                        className="text-primary hover:text-secondary font-sans text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary p-1 rounded"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Scheduler</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03, y: -1, boxShadow: '0 8px 20px -4px rgba(5, 27, 14, 0.3)' }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-xs font-semibold uppercase tracking-widest py-4 px-10 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-secondary-fixed border-t-transparent rounded-full animate-spin" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-secondary-fixed" />
                            <span>Confirm Reservation</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.form>
            ) : (
              /* Success Screen */
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-14 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-secondary-fixed/30 flex items-center justify-center mx-auto text-primary animate-float">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                    Canopy Table Secured
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light max-w-md mx-auto">
                    Thank you, {formData.name}. We have logged your request and sent a digital verification ticket to <strong className="text-primary font-semibold">{formData.email}</strong>.
                  </p>
                </div>

                {/* Summary Ticket */}
                <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-left max-w-md mx-auto space-y-3.5 font-sans">
                  <div className="flex justify-between items-center text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider border-b border-outline-variant/15 pb-2.5">
                    <span>DIGITAL PASS</span>
                    <span className="text-secondary-fixed-dim font-extrabold">{bookingRef}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="block text-[10px] text-on-surface-variant/50 uppercase font-bold tracking-wider mb-0.5">Guests</span>
                      <strong className="text-primary font-semibold">{formData.guests} Seated</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-on-surface-variant/50 uppercase font-bold tracking-wider mb-0.5">Date</span>
                      <strong className="text-primary font-semibold">{formData.date}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-on-surface-variant/50 uppercase font-bold tracking-wider mb-0.5">Time</span>
                      <strong className="text-primary font-semibold">{formData.time} UTC</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-on-surface-variant/50 uppercase font-bold tracking-wider mb-0.5">Location</span>
                      <strong className="text-primary font-semibold">Cantonments, Accra</strong>
                    </div>
                  </div>

                  {formData.message && (
                    <div className="pt-2 border-t border-outline-variant/15">
                      <span className="block text-[10px] text-on-surface-variant/50 uppercase font-bold tracking-wider mb-1">Dietary / Notes</span>
                      <p className="text-[11px] text-on-surface-variant font-light italic leading-relaxed">
                        "{formData.message}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setSubmitSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        date: '',
                        time: '',
                        guests: 2,
                        message: ''
                      });
                      setErrors({});
                    }}
                    className="border border-outline-variant/30 hover:border-primary/50 text-primary font-sans text-xs font-semibold uppercase tracking-widest py-3 px-8 rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Reserve Another Table
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
