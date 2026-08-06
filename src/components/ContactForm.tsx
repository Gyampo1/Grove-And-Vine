import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactFormProps {
  onSuccess?: (message: ContactMessage) => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message text is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate submission to server
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      if (onSuccess) {
        onSuccess(formData);
      }

      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
      {/* Contact Cards column */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-secondary-fixed/30 py-1 px-3 rounded-full text-xs font-sans font-semibold text-on-secondary-fixed-variant tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-secondary" />
            <span>Concierge Desks</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-primary font-bold tracking-tight">
            Connect With Our Concierge
          </h3>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light">
            We are dedicated to preparing your seating meticulously. Feel free to contact our specialized desks directly for any custom requests.
          </p>
        </div>

        <div className="space-y-4">
          {/* Card 1: Phone */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/20 flex items-center justify-center text-primary shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-sans font-bold text-on-surface-variant/50 uppercase tracking-widest block">Direct Phone</span>
              <p className="font-sans text-xs sm:text-sm text-primary font-bold">+233 (0) 55 900 1234</p>
              <span className="text-[10px] font-sans text-on-surface-variant/60 block">Concierge & Event Bookings</span>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/20 flex items-center justify-center text-primary shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-sans font-bold text-on-surface-variant/50 uppercase tracking-widest block">Dedicated Email</span>
              <p className="font-sans text-xs sm:text-sm text-primary font-bold">concierge@groveandvine.com</p>
              <span className="text-[10px] font-sans text-on-surface-variant/60 block">Standard response inside 6 hours</span>
            </div>
          </div>

          {/* Card 3: Hours */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/20 flex items-center justify-center text-primary shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-sans font-bold text-on-surface-variant/50 uppercase tracking-widest block">Reception hours</span>
              <p className="font-sans text-xs sm:text-sm text-primary font-bold">Tue — Sun: 10:00 — 22:00</p>
              <span className="text-[10px] font-sans text-on-surface-variant/60 block">Closed Mondays for botanical service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form panel column */}
      <div className="lg:col-span-7 bg-background rounded-3xl border border-outline-variant/20 p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!submitSuccess ? (
            <motion.form
              key="contact-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="font-sans text-xs font-bold uppercase tracking-wider text-primary block">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Amara Diop"
                    className={`w-full py-3.5 px-4 bg-background border rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 ${
                      errors.name ? 'border-error ring-1 ring-error' : 'border-outline-variant/35 focus:border-primary'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-error text-[11px] font-sans flex items-center gap-1 mt-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="font-sans text-xs font-bold uppercase tracking-wider text-primary block">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="amara@terroir.org"
                    className={`w-full py-3.5 px-4 bg-background border rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 ${
                      errors.email ? 'border-error ring-1 ring-error' : 'border-outline-variant/35 focus:border-primary'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-error text-[11px] font-sans flex items-center gap-1 mt-1" role="alert">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="space-y-2">
                <label htmlFor="contact-subject" className="font-sans text-xs font-bold uppercase tracking-wider text-primary block">
                  Inquiry Topic
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full py-3.5 px-4 bg-background border border-outline-variant/35 rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary"
                >
                  <option value="General Inquiry">General Concierge Inquiry</option>
                  <option value="Media/PR">Media & Editorial Request</option>
                  <option value="Private Event Buyout">Private Event Canopy Hire</option>
                  <option value="Career Opportunities">Culinary Careers</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="contact-message" className="font-sans text-xs font-bold uppercase tracking-wider text-primary block">
                  How can we serve you?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your requirements or comments in detail..."
                  className={`w-full py-3.5 px-4 bg-background border rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 ${
                    errors.message ? 'border-error ring-1 ring-error' : 'border-outline-variant/35 focus:border-primary'
                  }`}
                />
                {errors.message && (
                  <p className="text-error text-[11px] font-sans flex items-center gap-1 mt-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit btn */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-xs font-semibold uppercase tracking-widest py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-secondary-fixed border-t-transparent rounded-full animate-spin" />
                      <span>Sending Dispatch...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-secondary-fixed" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            /* Success State */
            <motion.div
              key="contact-success"
              className="text-center space-y-5 py-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full bg-secondary-fixed/30 flex items-center justify-center mx-auto text-primary animate-float">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h4 className="font-display text-xl font-bold text-primary">Message Dispatched</h4>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. We have received your query and routed it to our Head Concierge. Expect a detailed response shortly.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubmitSuccess(false)}
                className="border border-outline-variant/30 hover:border-primary/50 text-primary font-sans text-xs font-semibold uppercase tracking-widest py-2.5 px-6 rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Send Another Message
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
