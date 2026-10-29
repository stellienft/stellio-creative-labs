// E-commerce landing page config - /for/ecommerce
// Online stores, product brands, DTC businesses

export default {
  slug: 'ecommerce',
  accent: '#8B5CF6', // purple

  seo: {
    title: 'Website Design for E-Commerce Brands | Stellio Creative Labs',
    description: 'Turn browsers into buyers. Professional branding and web design for Australian e-commerce and product brands.',
  },

  hero: {
    eyebrow: 'For E-Commerce Brands',
    headline: 'Great products deserve more than a generic storefront.',
    headlineHighlight: 'more than a generic storefront',
    subline: 'You have spent months perfecting your product. Do not let a cookie-cutter template undermine it. A branded experience converts at 2-3x the rate of a default theme.',
    cta: 'Get a Store That Sells',
    ctaSecondary: 'See Our Work',
    ctaSecondaryLink: '/work',
    socialProof: '70+ e-commerce and product brands built',
  },

  painPoints: {
    heading: 'Sound familiar?',
    items: [
      {
        icon: 'phone-missed',
        title: 'Low conversion rate',
        desc: 'You get traffic but barely anyone buys. Your store looks like a hundred others and gives shoppers no reason to trust you.',
      },
      {
        icon: 'wrench',
        title: 'Default theme, zero personality',
        desc: 'Your Shopify or WooCommerce store uses the same free theme as your competitors. No brand recognition, no loyalty.',
      },
      {
        icon: 'clock',
        title: 'Painful checkout flow',
        desc: 'Cart abandonment is through the roof because your checkout is clunky, slow, or does not build trust at the finish line.',
      },
      {
        icon: 'dollar',
        title: 'Ad spend goes to waste',
        desc: 'You are paying for clicks that bounce because your landing page does not match the ad promise or convert.',
      },
    ],
  },

  packages: [
    {
      name: 'Starter',
      price: '$2,500',
      unit: 'AUD',
      desc: 'A high-converting landing page for your product.',
      features: [
        'Single-product landing page',
        'Custom branded design',
        'Trust signals and social proof',
        'Optimised checkout flow',
        'Mobile-first experience',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$4,500',
      unit: 'AUD',
      desc: 'A full branded store with custom design and product pages.',
      features: [
        'Multi-page store (up to 5 pages)',
        'Custom brand identity and logo',
        'Product page design and templates',
        'Cart and checkout optimisation',
        'Email capture and pop-ups',
        'SEO and Google Shopping setup',
      ],
      cta: 'Get Professional',
      popular: true,
    },
    {
      name: 'Complete',
      price: '$6,000',
      unit: 'AUD',
      desc: 'A complete e-commerce brand experience from click to delivery.',
      features: [
        'Full store with unlimited pages',
        'Complete brand package (logo, packaging, unboxing)',
        'Custom product page templates',
        'Automated email sequences',
        'Social media and ad templates',
        'Monthly conversion report',
      ],
      cta: 'Go Complete',
      popular: false,
    },
  ],

  // Add-ons (tailored to this niche)
  addons: [
    {
      icon: 'palette',
      title: 'Full Brand Identity',
      desc: 'Logo, brand guide, packaging design, and unboxing experience. Your brand should feel premium from click to delivery.',
      price: 'from $1,500',
    },
    {
      icon: 'bot',
      title: 'AI Shopping Assistant',
      desc: 'A chatbot that recommends products, answers sizing and shipping questions, and recovers abandoned carts automatically.',
      price: 'from $800',
    },
    {
      icon: 'mail',
      title: 'Email Automation Suite',
      desc: 'Abandoned cart recovery, post-purchase sequences, and win-back campaigns. Klaviyo setup that pays for itself.',
      price: 'from $600',
    },
    {
      icon: 'box',
      title: 'Packaging Design',
      desc: 'Custom packaging, tissue paper, and sticker designs that make unboxing an experience worth sharing.',
      price: 'from $500',
    },
  ],

  process: {
    heading: 'How it works',
    items: [
      {
        step: '1',
        title: 'Book a chat',
        desc: '15 minutes. Tell us about your product, your customers, and where you are losing sales. No fluff.',
      },
      {
        step: '2',
        title: 'We design and build',
        desc: 'We create a branded store experience that turns browsers into buyers. Product pages, checkout, and a brand people remember.',
      },
      {
        step: '3',
        title: 'Launch and scale',
        desc: 'Your store goes live with a design that converts. We handle the tech while you focus on growing your product.',
      },
    ],
  },

  testimonials: [
    {
      quote: 'Our conversion rate doubled after Stellio redesigned our store. The brand finally matches the product quality.',
      name: 'Will Engelbrecht',
      company: 'Gel Paints Australia',
    },
    {
      quote: 'We went from a generic Shopify theme to a brand experience. Customers now tell us they found us because the site looked legit.',
      name: 'Tim Bourassa',
      company: 'RevBoco',
    },
    {
      quote: 'Stellio understood that our store is not just a checkout - it is the entire brand experience. They nailed it.',
      name: 'Vass Stammes',
      company: 'PropCheck',
    },
  ],

  finalCta: {
    heading: 'Ready for a store that converts browsers into buyers?',
    subline: 'Book a free 15-minute chat. No pressure - just a conversation about building a brand that sells.',
    cta: 'Book a Free Chat',
    ctaLink: 'https://cal.com/stellio-koutsis/30min',
    ctaExternal: true,
  },

  faqs: [
    {
      q: 'How long does it take?',
      a: 'Most e-commerce sites launch within 2-3 weeks. Starter landing pages can be live in 7 days.',
    },
    {
      q: 'Do you work with Shopify or WooCommerce?',
      a: 'Both. We design custom themes for Shopify, WooCommerce, and headless setups. Whatever stack you are on.',
    },
    {
      q: 'Can you improve my existing store?',
      a: 'Yes. We can redesign your product pages, checkout, and branding without rebuilding from scratch.',
    },
    {
      q: 'What about email marketing?',
      a: 'We set up Klaviyo, Mailchimp, or your preferred platform with automated flows that recover abandoned carts and drive repeat purchases.',
    },
    {
      q: 'Will my store be fast?',
      a: 'Speed kills conversion. We optimise every page for sub-2-second load times on mobile.',
    },
  ],

  showcase: {
    heading: 'See what your ecommerce website could look like',
    subline: 'Three styles, each built to sell products and build brands.',
    examples: [
      {
        name: 'The Storefront',
        tagline: 'Products first. Buy in two clicks.',
        desc: 'For online stores where the product range sells itself. Category filters, quick-view cards, trust badges, and purple accent.',
        style: 'dark-purple',
        template: 'storefront',
        preview: { brand: 'WILD CO. AUSTRALIA', hero: 'Gear built for the Australian wild.', services: ['Clothing', 'Bags', 'Shoes', 'Accessories'], cta: 'SHOP NOW', trustBadge: 'Free Shipping Over $100' },
      },
      {
        name: 'The Brand Story',
        tagline: 'Your story sells. Tell it beautifully.',
        desc: 'For product brands whose identity drives sales. Brand narrative hero, featured products, reviews, and newsletter capture.',
        style: 'light-pink',
        template: 'brand-story',
        preview: { brand: 'LUXE SKIN CO.', hero: 'Skincare that actually does what it says.', services: ['Serums', 'Creams', 'Cleansers'], cta: 'SHOP PRODUCTS', trustBadge: 'Made in Australia' },
      },
      {
        name: 'The Drop',
        tagline: 'Scarcity sells. Build the hype.',
        desc: 'For brands that sell through scarcity and hype. Countdown-driven, limited drops, sold-out archive, and waitlist capture.',
        style: 'dark-red',
        template: 'the-drop',
        preview: { brand: 'RAWR. STUDIO', hero: 'Limited edition. When it is gone, it is gone.', services: ['Hoodies', 'Joggers', 'Tees'], cta: 'JOIN WAITLIST', trustBadge: 'Next Drop Coming Soon' },
      },
    ],
  },
}
