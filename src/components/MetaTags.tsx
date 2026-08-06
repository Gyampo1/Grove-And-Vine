import { useEffect } from 'react';
import { PageId } from '../types';

interface MetaTagsProps {
  activePage: PageId;
}

export default function MetaTags({ activePage }: MetaTagsProps) {
  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: 'GROVE & VINE ACCRA | Fine Dining & Arboreal Elegance',
      menu: 'The Forest Culinary Menu | GROVE & VINE ACCRA',
      about: 'Our Origin Story & Craftsmen | GROVE & VINE ACCRA',
      gallery: 'The Forest Through Our Lens | GROVE & VINE ACCRA',
      reservations: 'Secure Your Glass Canopy Table | GROVE & VINE ACCRA',
      events: 'Immersive Botanical Soirées & Galas | GROVE & VINE ACCRA',
      contact: 'Connect Beneath the Canopy | GROVE & VINE ACCRA',
      admin: 'Staff Portal Operations Control | GROVE & VINE ACCRA'
    };

    const descriptions: Record<PageId, string> = {
      home: 'Experience Accra\'s premier forest-to-table fine dining. Dine inside a modern glass canopy nestled within a lush, tropical forest.',
      menu: 'Discover our Michelin-inspired culinary journey. Starters, main courses, fresh seafood, deconstructed desserts, and botanical cocktails.',
      about: 'Learn about our collective of master horticulturalists, Ghanaian visionaries, and international chefs redefining organic luxury.',
      gallery: 'Browse our beautiful masonry portfolio of forest-to-table plates, table arrangements, and twilight glass architecture.',
      reservations: 'Reserve your table in our organic glass sanctuary. Highly recommended for a high-sensory fine dining experience.',
      events: 'Host weddings, milestone celebrations, or corporate events inside the breathtaking glass sanctuary of Cantonments, Accra.',
      contact: 'Reach out to GROVE & VINE Accra. Find our Cantonments address, business hours, and connect with our dedicated concierge team.',
      admin: 'Grove & Vine operations staff control center. Restricted and encrypted panel access.'
    };

    // Update Document Title
    document.title = titles[activePage] || 'GROVE & VINE ACCRA';

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptions[activePage]);

    // Open Graph Simulation
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', titles[activePage]);
    updateOGTag('og:description', descriptions[activePage]);
    updateOGTag('og:type', 'website');
    updateOGTag('og:site_name', 'GROVE & VINE ACCRA');
    updateOGTag('og:image', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDVWqcbUBVcGpYKzF8Ewsmy2LiFyMLBXDt96lxhePhNkQZ7JjnJhe9jXyZc2dm2v2nD42SRsI_0AAbDWM9cBhofDr3RO4QILo7zRWELll11LSAdWm-LsDUZua7_avhOWk3Dr9f6Fxp1LmM0FQOa-iaxVgZHPIqUoeQWe3C8r8aNB4mR6BDd5yblqysI-ZV12qnwSIQW-8KY04aYw6DbBcm5rXVFX1XvhJYNrJyEf63rj_7PotLZuvnpyw82NTbkN5F6opk4naTcYU');

  }, [activePage]);

  return null;
}
