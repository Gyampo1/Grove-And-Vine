# Grove & Vine — Fine Dining Restaurant Website Template

An exquisite, production-ready web application template for modern luxury fine-dining restaurants. Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Motion** (Framer Motion).

![Grove & Vine Banner](https://lh3.googleusercontent.com/aida-public/AB6AXuAmLuWqfc9FZo4VbR30Nd2xiL2j_RAmjacK3qH2eYCMEYvbX0UB92XmsuPodDvTWAgJO_g9SYJ46dTiaJ1QholyzUdRVUtbJWFTpGNtbTHzRHqYMMXjNatInD3sUA5wveFMI8DdCYxkld3ou6KiwzkoA5ztXZQHgXun9Ofn6h8CsaKHNkhpDeTuyoWUeHKIowRKrW7IdzsSOLjAmbuEfU6GAWgHCEKjTKcajQ9nnTmHAGmJ_01xhpmZ65kP9R6NVlmjG3EzRCulIVo)

---

## Overview

**Grove & Vine** reflects arboreal elegance and botanical luxury set in Cantonments, Accra. Designed as a glass-walled dining sanctuary nestled amidst lush West African flora, this website template provides an immersive, responsive digital experience for fine-dining patrons and restaurant operations teams alike.

---

## Key Features

- **Interactive Full-Progression Menu**:
  - Filterable by course category (*Starters, Mains, Seafood, Desserts, Botanical Drinks*).
  - Real-time dietary badges (*Vegan, Gluten-Free, Spicy*) with instant single-click preference toggles.
- **Saved Favorites Drawer**:
  - Save desired culinary selections across sessions.
  - Slide-out side drawer with quick table booking integration.
- **Multi-Step Reservation Wizard**:
  - Dynamic guest selector, seating layout preferences (Glasshouse Canopy, Botanical Courtyard, Chef's Table, Private Cellar), date picker, and time slot generator.
  - Automatic digital verification ticket generator with unique booking reference codes.
- **Lightbox Media Gallery**:
  - Categorized masonry gallery with full-screen lightbox modal and smooth keyboard navigation.
- **Events & Soirées Manager**:
  - Exclusive gala listings, masterclasses, and cellar wine tastings with guest capacity trackers and direct ticket reservation flows.
- **Encrypted Staff Operations Portal**:
  - Security PIN gate (`1234`) with tactile keypad.
  - Comprehensive dashboard for managing table reservations (approve/cancel/filter), customer inquiries, live menu catalog management (add/edit/delete dishes), and staff profile settings.
- **Cantonments Vector Map**:
  - Interactive street-level map preview with copyable coordinates and location details.
- **Fully Responsive & Accessible**:
  - Smooth Motion page transitions, keyboard traps, WCAG AA contrast compliance, and desktop/mobile navigation drawers.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (`motion/react`)
- **Icons**: [Lucide React](https://lucide.react.dev/)

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **bun** / **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/grove-and-vine-restaurant-template.git
   cd grove-and-vine-restaurant-template
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Type check / Linting**:
   ```bash
   npm run lint
   ```

---

## Staff Portal Credentials

To access the built-in Staff Operations Portal (click the Lock icon or footer link):

- **Default PIN**: `1234`

*(PIN security can be modified inside the Staff Portal > Admin Profile tab).*

---

## Directory Structure

```text
├── index.html              # Entry HTML file
├── metadata.json           # Application metadata & capabilities
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── src/
    ├── main.tsx            # React application entry point
    ├── App.tsx             # Main layout, router & state engine
    ├── data.ts             # Sample menu, gallery, events & chefs data
    ├── types.ts            # TypeScript interface declarations
    └── components/
        ├── AboutSection.tsx    # Botanical origin story component
        ├── AdminDashboard.tsx  # Staff operations portal with PIN auth
        ├── ContactForm.tsx     # Customer concierge form
        ├── EventsSection.tsx   # Gala and masterclass events showcase
        ├── FavoritesList.tsx   # Slide-out saved dishes drawer
        ├── Footer.tsx          # Restaurant footer with newsletter & hours
        ├── GallerySection.tsx # Filterable masonry image gallery
        ├── Hero.tsx            # Full-screen welcome hero banner
        ├── MapPlaceholder.tsx  # Interactive location map
        ├── MenuSection.tsx     # Featured dishes section
        ├── MetaTags.tsx        # Dynamic page titles & SEO tags
        ├── Navbar.tsx          # Floating header navigation
        ├── ReservationForm.tsx # 2-Step table booking wizard
        └── Testimonials.tsx    # Critic reviews carousel
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).
