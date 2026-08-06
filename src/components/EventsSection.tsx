import { motion } from 'motion/react';
import { Calendar, Clock, Ticket, Users, Award, GlassWater } from 'lucide-react';
import { EVENTS } from '../data';
import { PageId } from '../types';

interface EventsSectionProps {
  onBookEvent: (eventName: string) => void;
}

export default function EventsSection({ onBookEvent }: EventsSectionProps) {
  return (
    <section className="py-24 bg-surface-container-low" aria-labelledby="events-section-title">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-secondary-fixed/30 py-1 px-3 rounded-full text-xs font-sans font-semibold text-on-secondary-fixed-variant tracking-wider uppercase mb-4">
            <GlassWater className="w-3.5 h-3.5 text-secondary" />
            <span>EXQUISITE PRIVATE GATHERINGS</span>
          </div>
          <h2 id="events-section-title" className="font-display text-3xl md:text-5xl text-primary font-bold tracking-tight mb-4">
            Botanical Soirées & Galas
          </h2>
          <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
            TREEHOUSE plays host to curated, multi-sensory experiences throughout the seasons. From educational clay workshops to midnight jazz under the stars, reserve your tickets early.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EVENTS.map((event, idx) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-background border border-outline-variant/15 hover:shadow-xl hover:border-outline-variant/35 transition-all duration-300"
            >
              {/* Image & Price */}
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-dim shrink-0">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-40" />

                {/* Price tag */}
                <div className="absolute bottom-4 right-4 bg-primary text-secondary-fixed font-display text-md font-bold py-1.5 px-3.5 rounded-xl shadow-lg flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-secondary-fixed" />
                  <span>{event.pricePerGuest}</span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div className="space-y-4">
                  {/* Meta Details */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 text-[10px] font-sans font-bold text-on-surface-variant/70 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-secondary-fixed-dim" />
                      <span>{event.date}</span>
                    </div>
                    <span className="hidden sm:inline w-1 h-1 rounded-full bg-outline-variant" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-secondary-fixed-dim" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl md:text-2xl font-bold text-primary">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="mt-8 pt-6 border-t border-outline-variant/15 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-secondary font-sans text-xs font-bold uppercase tracking-wider">
                    <Users className="w-4 h-4 text-secondary-fixed-dim" />
                    <span>{event.capacity}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onBookEvent(event.title)}
                    className="bg-primary hover:bg-primary-container text-secondary-fixed font-sans text-[10px] font-bold uppercase tracking-widest py-3 px-5 rounded-xl shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Inquire Slot
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Private bookings note */}
        <div className="mt-16 text-center max-w-xl mx-auto p-6 rounded-2xl bg-background border border-outline-variant/20 shadow-sm">
          <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
            Planning a milestone wedding, corporate dinner, or custom editorial banquet? Our entire glass canopy is available for full-buyout hire. <button onClick={() => onBookEvent('Full Venue Buyout')} className="text-secondary hover:text-primary font-bold underline cursor-pointer">Inquire with our event concierge</button>.
          </p>
        </div>

      </div>
    </section>
  );
}
