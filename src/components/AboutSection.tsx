import { motion } from 'motion/react';
import { Leaf, Award, Map, Users } from 'lucide-react';
import { CHEFS } from '../data';

export default function AboutSection() {
  const pillars = [
    {
      icon: Leaf,
      title: 'Botanical Architecture',
      description: 'Our structure is an architectural marvel — a fully enclosed, double-insulated glass sanctuary that houses over 120 species of rare indigenous West African flora. Dine beneath an alive, breathing botanical canopy.'
    },
    {
      icon: Award,
      title: 'Equatorial Gastronomy',
      description: 'Led by culinary visionary Chef Kojo Mensah, our kitchen operates as a laboratory of heritage gastronomy. We fuse classical European cooking disciplines with forgotten ingredients from the forest floor.'
    },
    {
      icon: Map,
      title: 'Accra Terroir Focus',
      description: 'We believe luxury lies in authenticity. 90% of our herbs, flowers, and organic root vegetables are grown directly in our climate-controlled conservatory soil or sourced from family micro-farms in the Volta region.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" aria-label="About Story">
      {/* Glow circles */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-container/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-secondary-fixed/30 py-1 px-3 rounded-full text-xs font-sans font-semibold text-on-secondary-fixed-variant tracking-wider uppercase">
              <Users className="w-3.5 h-3.5 text-secondary" />
              <span>THE ORIGIN STORY</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl text-primary font-bold tracking-tight">
              A Symphony of Glass, <br />
              <span className="italic font-normal text-secondary-fixed">Flora, and Soil</span>.
            </h2>

            <p className="font-sans text-sm md:text-md text-on-surface-variant leading-relaxed font-light">
              GROVE & VINE was born out of a single, radical question: Can Accra's metropolitan energy coexist with the absolute serene silence of the primeval West African rainforest?
            </p>

            <p className="font-sans text-sm md:text-md text-on-surface-variant leading-relaxed font-light">
              In 2024, our founders collaborated with master botanists and pioneering architects to construct an ecological sanctuary in the heart of Cantonments. Today, it stands not just as a restaurant, but as a living monument to organic design and sensory discovery, housing an intricate biome where fine dining lives in perfect symbiosis with nature.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Main Image Grid */}
            <div className="grid grid-cols-12 gap-4 items-stretch">
              <div className="col-span-8 overflow-hidden rounded-3xl h-[380px] bg-surface-variant relative group shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80" 
                  alt="Dine inside glass greenhouse canopy" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                <span className="absolute bottom-6 left-6 font-display text-white text-md font-semibold tracking-wider">The Conservatory</span>
              </div>

              <div className="col-span-4 flex flex-col gap-4">
                <div className="flex-1 overflow-hidden rounded-2xl bg-surface-variant relative group shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1545232979-fbf596a56767?auto=format&fit=crop&w=600&q=80" 
                    alt="Tropical greenhouse plants" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="flex-1 overflow-hidden rounded-2xl bg-surface-variant relative group shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80" 
                    alt="Table arrangement detail" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
              </div>
            </div>

            {/* Float Badge */}
            <div className="absolute -bottom-6 -left-6 bg-secondary-fixed text-primary p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-outline-variant/30 hidden sm:flex">
              <span className="font-display text-4xl font-extrabold tracking-tight">120+</span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest leading-relaxed text-primary/80">
                Indigenous <br /> Flora Species
              </span>
            </div>
          </motion.div>
        </div>

        {/* Pillars bento cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/10 hover:border-outline-variant/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed/20 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-display text-lg font-bold text-primary">{pillar.title}</h3>
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Master Craftsmen introductions */}
        <div>
          <div className="text-center mb-16 max-w-xl mx-auto">
            <h3 className="font-display text-2xl md:text-4xl text-primary font-bold tracking-tight mb-4">
              Our Master Craftsmen
            </h3>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed font-light">
              We gather visionary designers, certified sommeliers, and master culinary artisans to guide you through the canopy experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CHEFS.map((chef, idx) => (
              <motion.article
                key={chef.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group flex flex-col rounded-3xl overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-dim">
                  <img 
                    src={chef.image} 
                    alt={chef.name} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
                  
                  {/* Bio Reveal on hover */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-secondary-fixed mb-1 block">
                      {chef.role}
                    </span>
                    <h4 className="font-display text-xl text-white font-semibold mb-3">
                      {chef.name}
                    </h4>
                    <p className="font-sans text-xs text-white/80 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {chef.bio}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
