import { MenuItem, GalleryItem, Testimonial, RestaurantEvent } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS & SOUPS
  {
    id: 's1',
    name: 'Chicken and Sweet Corn Soup',
    description: 'Vibrant sweet corn kernels in a velvety house-made chicken stock broth with aromatic herbs.',
    price: 140,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: false
  },
  {
    id: 's2',
    name: 'Pumpkin Soup',
    description: 'A silky, creamy blend of slow-roasted Cantonments pumpkins garnished with warm spices and pumpkin seeds.',
    price: 140,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isGlutenFree: true
  },
  {
    id: 's3',
    name: 'Prawns Bisque Twist',
    description: 'Rich, intensely flavored prawn shell reduction with cream, a twist of cognac, and local spices.',
    price: 140,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    isSpicy: true
  },
  {
    id: 's4',
    name: 'Tabbouleh of Fonio',
    description: 'An African-heritage twist on the classic Levantine salad, using steamed fonio grains, fresh parsley, tomatoes, mint, and lemon.',
    price: 130,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isGlutenFree: true
  },
  {
    id: 's5',
    name: 'Prawns Tempura',
    description: 'Light, golden crispy prawns served with your choice of a garlic mayonnaise dip or a spicy tomato & pepper sambal.',
    price: 240,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    isSpicy: true
  },
  {
    id: 's6',
    name: 'Lamb Flatbread',
    description: 'Wood-fired sourdough flatbread topped with richly seasoned, tender pulled lamb, local herbs, and organic drizzle.',
    price: 280,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    isSpicy: true
  },
  {
    id: 's7',
    name: 'Spicy Mozzarella Flatbread',
    description: 'Crispy flatbread topped with bubbling local buffalo mozzarella, fresh basil, and a generous splash of bird\'s eye chili oil.',
    price: 170,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80',
    isSpicy: true
  },

  // MAINS
  {
    id: 'm1',
    name: 'Slow Cooked Lamb Shank',
    description: 'Lamb shank, grilled carrot and pumpkin on a bed of creamy mashed potato, red wine reduction, and red onion pickle.',
    price: 500,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true
  },
  {
    id: 'm2',
    name: 'Duck Fillet',
    description: 'Succulent duck fillet, pineapple candied with roasted potato, served with a rich, dark fruit glaze.',
    price: 480,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm3',
    name: 'Beef Fillet Mignon',
    description: 'Tender beef fillet mignon, velvety tarragon sauce, and steamed green beans with your choice of side.',
    price: 360,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true
  },
  {
    id: 'm4',
    name: 'Vegetable Ragout',
    description: 'A robust, hearty stew of mixed seasonal forest vegetables and sweet potatoes.',
    price: 180,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isGlutenFree: true
  },
  {
    id: 'm5',
    name: 'Tagliatelle Pesto',
    description: 'House-made fresh flat pasta tossed in a vibrant wild herb basil pesto with sweet, slow-roasted candied tomatoes.',
    price: 180,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    isVegan: true
  },
  {
    id: 'm6',
    name: 'Grilled Beef Filet',
    description: 'Grilled beef filet, crispy Hasselback potato, roasted garlic, and mushroom butter sauce with almond and parmesan rocket salad.',
    price: 350,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: false
  },
  {
    id: 'm7',
    name: 'Steak Salad',
    description: 'Premium grilled steak slices served over wild greens, tossed with a punchy, fresh salsa verde vinaigrette.',
    price: 150,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true
  },

  // SEAFOOD
  {
    id: 'sf1',
    name: 'Sautéed Prawns',
    description: 'Plump sautéed wild prawns in an elegant champagne butter sauce, served with grilled vegetables and potato lyonnaise.',
    price: 360,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1559742811-82428952403e?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true
  },
  {
    id: 'sf2',
    name: 'Spicy Fried Fish',
    description: 'Crisp, spicy fried fish resting on a bed of pilaf rice, served with grilled zucchini and a vibrant orange citrus sauce.',
    price: 299,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    isSpicy: true
  },
  {
    id: 'sf3',
    name: 'Fish of the Day in Papillote',
    description: 'Freshly caught coastal fish steamed inside parchment paper with aromatic garden herbs, served with pilaf rice or couscous.',
    price: 280,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sf4',
    name: 'Fish Curry',
    description: 'Tender ocean fish cooked in a fragrant curry and coconut milk sauce, accompanied by spring onion rice and vegetable ribbons.',
    price: 260,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80',
    isSpicy: true
  },
  {
    id: 'sf5',
    name: 'Prawns in Coconut',
    description: 'Large wild-caught prawns simmered in a silky coconut and parsley-cream sauce, paired with vegetable rice.',
    price: 360,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true
  },

  // DESSERTS
  {
    id: 'd1',
    name: 'Bread & Butter Pudding',
    description: 'Golden-baked custardy heritage bread and butter layers, spiked with organic vanilla bean.',
    price: 120,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'd2',
    name: 'Chocolate Mousse',
    description: 'Delectably light and airy whipped 70% dark Ghanaian cocoa with a whisper of local espresso.',
    price: 120,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true
  },
  {
    id: 'd3',
    name: 'Crème Brûlée',
    description: 'Rich custard base topped with a perfectly level, hard layer of caramelized local organic sugar.',
    price: 128,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&w=600&q=80',
    isGlutenFree: true
  },
  {
    id: 'd4',
    name: 'Fluffy Chocolate Tart',
    description: 'A delicate chocolate crumb pastry base with a smooth cocoa filling, glazed in salted rich caramel.',
    price: 100,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'd5',
    name: 'Chocolate Fondant with Baileys Moon',
    description: 'Decadent lava cake with a molten center of warm chocolate, served alongside a cool Baileys Irish Cream infused ice-cream scoop.',
    price: 120,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?auto=format&fit=crop&w=600&q=80'
  },

  // DRINKS & COCKTAILS
  {
    id: 'dr1',
    name: 'Blueberry Paloma',
    description: 'Premium tequila, pink grapefruit juice, fresh forest blueberries, lemon juice, and Cantonments wild honey.',
    price: 120,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr2',
    name: 'Aphro Fashioned',
    description: 'Award-winning double-distilled ginger-infused Aphro palm spirit, fresh orange peel, cinnamon quill, natural vanilla, and wild honey.',
    price: 120,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    isSpicy: true
  },
  {
    id: 'dr3',
    name: 'Espresso Martini',
    description: 'Intense single-shot local dark roast espresso, sweet coffee liqueur, vodka, and house sugar syrup.',
    price: 120,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1545696913-911252f9905c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr4',
    name: '19 Crimes Cabernet',
    description: 'Rich, bold Australian red wine with thick forest fruit notes and dark chocolate oak finishes. Price per bottle.',
    price: 550,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr5',
    name: 'Constantia Glen Saddle Rosé',
    description: 'A elegant, fresh, strawberry-toned South African premium rosé. Price per bottle.',
    price: 450,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1553118219-c220f1a080f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dr6',
    name: 'Tropical Breeze Mocktail',
    description: 'Organic pineapple pulp, passion fruit nectar, freshly squeezed lemon juice, mint sprigs, and pure cold-pressed coconut oil.',
    price: 90,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isGlutenFree: true
  },
  {
    id: 'dr7',
    name: 'Bissap Canopy Mocktail',
    description: 'Traditionally infused hibiscus flower tea, zesty local lemon slices, wild Cantonments forest honey, and organic mint bouquet.',
    price: 90,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80',
    isVegan: true,
    isGlutenFree: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    category: 'food',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF1nK77kTLlFBKMSv2MNLjDz00kd7-c_HbRsGYzXhSmtpO_1YIo1mlH75M2BGYMtoahZZTaPXEnJINzFZLY6KD2PMzM56HLS2PZRQbpTnYuiDBoO71o5Npd92duTuhoC80ZsrFIxLfL0tHKj4OgVqOxun-5uqTSO8cHvFOIRqe_gFFQ7p3IFilpZKYtGB6CoOHo0xxIMSVsQYvXzCQweRooXnLL7BS5TIZRpZNqn1mND3OhwlwyUcDOGA9iowGCDHH8pXlNgln7mo',
    title: 'Signature Sea Scallops',
    description: 'Gently seared, paired with parsnip silk and fresh forest botanicals.'
  },
  {
    id: 'g2',
    category: 'ambiance',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDVWqcbUBVcGpYKzF8Ewsmy2LiFyMLBXDt96lxhePhNkQZ7JjnJhe9jXyZc2dm2v2nD42SRsI_0AAbDWM9cBhofDr3RO4QILo7zRWELll11LSAdWm-LsDUZua7_avhOWk3Dr9f6Fxp1LmM0FQOa-iaxVgZHPIqUoeQWe3C8r8aNB4mR6BDd5yblqysI-ZV12qnwSIQW-8KY04aYw6DbBcm5rXVFX1XvhJYNrJyEf63rj_7PotLZuvnpyw82NTbkN5F6opk4naTcYU',
    title: 'Main Dining Canopy',
    description: 'Ethereal glass walls framing the ancient mahogany forest at twilight.'
  },
  {
    id: 'g3',
    category: 'events',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyBH3jM6DtKQU59p1961DM60BSkklZYGq8s3Xi5Q27G1pXxfAcyTLnKsrYB7BN3-ovl6aAfL9auC1dcPH_DE_plzqVQg-dWygFs5-9B1CqCCsT0S3A8seNV1ao6XOTWe2RoyM8P0zpGsevVKyJ2GAnG6mO16q2SQDgN3jyxTjLyIOo95IkgX8Bu1iqreia9YbS6hhuym2qpa1qKJSXWfNO_drXoEOOPFkwxB1Lg0jxSPa_Fj2AKSBuKpHRa6dn4Fdat_nAf15XWrE',
    title: 'Botanical Soirée',
    description: 'Exclusive evening gatherings under a canopy of twinkling stars.'
  },
  {
    id: 'g4',
    category: 'food',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBroeulbTjUI6_5_ngUK45PKjqZWccYLTxOy8HzB0Crd5yBNcRtGODghI5et8yUaJcdN1qgnd3p_eRY2MGbPOqVkMdMXpFafsyqgx90y2PE1-5ykNNsCNefN29Ojdk7lJMLwf6k4cGin_oEa99T-7fmkw90zyCusjaXHkELCKuK739E74YkveiQmV6jbWZRTbUen-0Je63OSxjHZwTyRqWE7TIEJu-AwSBKN2pJVJDpL89SGqEh2fHgsiTQ3ek3PfwpOBkFuEQ6mZI',
    title: 'Dark Forest Sphere',
    description: 'A decadent dark chocolate sphere with wild berry coulis.'
  },
  {
    id: 'g5',
    category: 'ambiance',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2AdiHKMU-KeJZU3xtaVvt6I_Mxy8MVihqf1k94C362aCBXDlnId3N0d6dY9Viq-epfUBgclTol8LbV4IIIn17Al0EGzgTjgDY6xjanuaC62yHbzRzqFyi-7qfBFoT5EiyqtAMh_gotAw6MblRzyGTpESodQZWfOOIhxr7iHzO2VKwFXjQgUsbYh1FVMYwIuSl-76HSh_vtLF8k4Pahg6OXcYk-qkFS8QiPXM1bLvUNmq50vLlK98gCuqC7mFZ18JkDfd5Iz8zfEw',
    title: 'Curated Textures',
    description: 'Tactile stone platters, fine linen napkins, and custom-blown crystal.'
  },
  {
    id: 'g6',
    category: 'food',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvgWsItjywXVoU1U-Mbyw-zqyqUYjzfjAEpnxU_0ZaxQHwjAvPWOj4FtELMuUw51yRoior71QEcpidUX7oPCtDz66OK2egTFrUBPM2XhuveHhJtHbZkoZGccPtAQwj21curXBh-Y_T4SedQfp-ea2FmzjyobkvBcuk3tjMLWJNI1oiX_jwZ979qpokabf0BzE4KMCWcsFHm_6b2bLH7UstOk90b46AA5KwYyzAJ0J_b9pqtQSDx-s2aEZGp9vYycvxzrmoanHcWKo',
    title: 'Artisanal Provisions',
    description: 'Twice-baked crusty heritage bread served with smoked whipped truffle butter.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Kofi Owusu',
    role: 'Accra Gourmet Journal',
    text: 'A profound culinary awakening. Chef Kojo Mensah succeeds in transforming humble West African ingredients into high-concept art. The waakye with truffle is an absolute masterwork.',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOxgxuLRYgQESJ2Hrn-1uwe3QkUAURn4tQIVSc1e7YsVPt6vKAX0iTghuUG0L1BgTq9H40JcufDqjei90dbnW5yH1Z4Aw9C0f-Zap-y8xnGl4QYuCxVFtjFDDgSZ_W8Z9_hOYrtmHIITx0Ki8fxnquhJ91zfwlgAUCkZm1Yi-vdbiS-pahi76ehzF3jTW5nm_aH7XSuQuDxAVFmfgVZ8cUELz7qM6NkBuyUeOzI5BrFhd8pj943TKbOka0xY3awiNbz-ztaposFcg'
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'The Travel & Dining Critic',
    text: 'The glass-walled architecture of Grove & Vine is visually breathtaking, but the kitchen steals the show. The scallops on parsnip silk with fermented locust bean foam are unlike anything else in the world.',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA98SSLIKc_VHMJrUztnibadAydWBbAPDcR77mIxuEoc326sW7h0Fo0ayckp6lMCTS9XsgQe5LMSm3oVCVk5-p0uQM1uSbPBBUC_aid19OXh06kSrfrvP3HfjY0uurayhBfjnx2NEeWNZJBcN3AOcKy9UdKfOotqOdxogRxxKu5TUnT1KqGwfL1EDJjjwsdnnk2sr3T6MuIu7BQNBKXttCOMDLFrnGkvn9P-_ACxQ56ES5fbfYt7t-xSDJfgY64FYirJ9iv5nexBFE'
  },
  {
    id: 't3',
    name: 'Michael Diop',
    role: 'Culinary Anthropologist',
    text: 'Elena Vance\'s wine and cocktail pairings are surgical. Every glass of palm-sap inspired gin cocktail elevates the tropical forest experience. True luxury with organic integrity.',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGFnDJf_sPO2PdLFivt0g5dw_Pb3f05RhTjmONmB0R0InZwcU99_1YbCir1_TV2SfuC6cBSbtSekj7AYj0Idi0dTwmwrp_vErUztjZsq5xhjoIOVn8vGhFSIC5XJyoqwqr0a1b-ycAgf0NFd5fXbQYVcvdITwxrZBBms8r_LdliwgyahmMW0DwN-kZYWymbwpnbKAzHAzacRLjY6tSrG6DuYMccBgdPdJPP-7tQXS2nT78q4SzNjFrujJF_fwatUCkQQnB5hvFMSM'
  }
];

export const EVENTS: RestaurantEvent[] = [
  {
    id: 'e1',
    title: 'The Forest Gala',
    date: 'Saturday, October 17, 2026',
    time: '19:00 - 23:30',
    description: 'A grand multi-sensory evening featuring interactive food theater, live highlife-jazz ensembles, and a continuous flow of our premium botanical open bar. Set beneath a completely transparent glass ceiling.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlmRmIvdu_5q4j7X4M5bpuCRE2sNLv29qpJGx_octpSHYYpXUqkJlXC9nQ_AZOmh_nGW425t4Br8kAaCtqanEERlZN-usDwHiAE_GIjBZ6vPu7yPvDpiosSzvg5HmUef30Q9rZ4thOSw5gYWheXgblUjiacd2Wni2KCgKZxvU0gHhCeujP2uaz3DzXhPQZjltMnY0cX1EQjp8X_UPAZJ7ZJqFDjxszjF96kmv6MfBrsqdLwmGE8YepZuMYTjSLabsEr5SZUk0hNpE',
    pricePerGuest: '₵850',
    capacity: '80 guests max'
  },
  {
    id: 'e2',
    title: 'Cacao & Clay Masterclass',
    date: 'Thursday, November 12, 2026',
    time: '14:00 - 17:30',
    description: 'Explore the heritage of West African soil and cacao with Pastry Artisan Amara Diop. Mold organic terracotta dishes and learn to prepare chocolate soils, soufflés, and ganaches with 70% dark single-origin Ghanaian beans.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBroeulbTjUI6_5_ngUK45PKjqZWccYLTxOy8HzB0Crd5yBNcRtGODghI5et8yUaJcdN1qgnd3p_eRY2MGbPOqVkMdMXpFafsyqgx90y2PE1-5ykNNsCNefN29Ojdk7lJMLwf6k4cGin_oEa99T-7fmkw90zyCusjaXHkELCKuK739E74YkveiQmV6jbWZRTbUen-0Je63OSxjHZwTyRqWE7TIEJu-AwSBKN2pJVJDpL89SGqEh2fHgsiTQ3ek3PfwpOBkFuEQ6mZI',
    pricePerGuest: '₵450',
    capacity: '20 guests max'
  },
  {
    id: 'e3',
    title: 'The Equatorial Cellar Tasting',
    date: 'Friday, December 11, 2026',
    time: '18:30 - 21:00',
    description: 'An intimate, candles-only exploration of rare and vintage wines, curated by Head Sommelier Elena Vance. Savor exclusive bottles alongside custom-crafted micro-bites reflecting Accra\'s forest-to-table cuisine.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDVWqcbUBVcGpYKzF8Ewsmy2LiFyMLBXDt96lxhePhNkQZ7JjnJhe9jXyZc2dm2v2nD42SRsI_0AAbDWM9cBhofDr3RO4QILo7zRWELll11LSAdWm-LsDUZua7_avhOWk3Dr9f6Fxp1LmM0FQOa-iaxVgZHPIqUoeQWe3C8r8aNB4mR6BDd5yblqysI-ZV12qnwSIQW-8KY04aYw6DbBcm5rXVFX1XvhJYNrJyEf63rj_7PotLZuvnpyw82NTbkN5F6opk4naTcYU',
    pricePerGuest: '₵650',
    capacity: '12 guests max'
  }
];

export const CHEFS = [
  {
    name: 'Kojo Mensah',
    role: 'EXECUTIVE CHEF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOxgxuLRYgQESJ2Hrn-1uwe3QkUAURn4tQIVSc1e7YsVPt6vKAX0iTghuUG0L1BgTq9H40JcufDqjei90dbnW5yH1Z4Aw9C0f-Zap-y8xnGl4QYuCxVFtjFDDgSZ_W8Z9_hOYrtmHIITx0Ki8fxnquhJ91zfwlgAUCkZm1Yi-vdbiS-pahi76ehzF3jTW5nm_aH7XSuQuDxAVFmfgVZ8cUELz7qM6NkBuyUeOzI5BrFhd8pj943TKbOka0xY3awiNbz-ztaposFcg',
    bio: 'Kojo brings 15 years of fine dining expertise from Paris and London back to his roots in Accra, infusing modern French technique into local ingredients.'
  },
  {
    name: 'Elena Vance',
    role: 'HEAD SOMMELIER',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA98SSLIKc_VHMJrUztnibadAydWBbAPDcR77mIxuEoc326sW7h0Fo0ayckp6lMCTS9XsgQe5LMSm3oVCVk5-p0uQM1uSbPBBUC_aid19OXh06kSrfrvP3HfjY0uurayhBfjnx2NEeWNZJBcN3AOcKy9UdKfOotqOdxogRxxKu5TUnT1KqGwfL1EDJjjwsdnnk2sr3T6MuIu7BQNBKXttCOMDLFrnGkvn9P-_ACxQ56ES5fbfYt7t-xSDJfgY64FYirJ9iv5nexBFE',
    bio: 'An expert in equatorial terroir, Elena curates a stellar wine list of old-world vintages and small-batch biodynamic producers.'
  },
  {
    name: 'Amara Diop',
    role: 'PASTRY ARTISAN',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGFnDJf_sPO2PdLFivt0g5dw_Pb3f05RhTjmONmB0R0InZwcU99_1YbCir1_TV2SfuC6cBSbtSekj7AYj0Idi0dTwmwrp_vErUztjZsq5xhjoIOVn8vGhFSIC5XJyoqwqr0a1b-ycAgf0NFd5fXbQYVcvdITwxrZBBms8r_LdliwgyahmMW0DwN-kZYWymbwpnbKAzHAzacRLjY6tSrG6DuYMccBgdPdJPP-7tQXS2nT78q4SzNjFrujJF_fwatUCkQQnB5hvFMSM',
    bio: 'Amara deconstructs traditional West African flavors like plantain and mango, blending them with organic dark Ghanaian cacao to create botanical sweet art.'
  }
];
