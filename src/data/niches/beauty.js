// Beauty & Salon landing page config - /for/beauty
// Salons, spas, lash techs, nail artists, barbers, skin clinics

export default {
  slug: 'beauty',
  accent: '#EC4899', // pink

  seo: {
    title: 'Website Design for Beauty & Salons | Stellio Creative Labs',
    description: 'Your work speaks for itself in person. Make sure your website does too. Professional branding and web design for Australian beauty businesses.',
  },

  hero: {
    eyebrow: 'For Beauty & Salons',
    headline: 'Your work is stunning. Your website needs to match.',
    headlineHighlight: 'needs to match',
    subline: 'Clients choose a salon based on how it looks online. If your website does not reflect the quality of your work, they book somewhere that does.',
    cta: 'Get a Website That Books Clients',
    ctaSecondary: 'See Our Work',
    ctaSecondaryLink: '/work',
    socialProof: '70+ beauty and small business brands built',
  },

  painPoints: {
    heading: 'Sound familiar?',
    items: [
      {
        icon: 'phone-missed',
        title: 'They judge your work by your website',
        desc: 'A dated or broken website tells clients your services might be dated too. First impressions are everything in beauty.',
      },
      {
        icon: 'wrench',
        title: 'Instagram-only presence',
        desc: 'You post daily but have nowhere to send people who want to book. No website means missed appointments every week.',
      },
      {
        icon: 'clock',
        title: 'DMs and texts for bookings',
        desc: 'You spend hours each week coordinating appointments through Instagram DMs and text messages. It is exhausting.',
      },
      {
        icon: 'dollar',
        title: 'No-shows and missed revenue',
        desc: 'Without an online booking system with deposits, no-shows eat into your income and waste your time.',
      },
    ],
  },

  packages: [
    {
      name: 'Starter',
      price: '$2,500',
      unit: 'AUD',
      desc: 'A gorgeous landing page with booking and your best work.',
      features: [
        'Single-page responsive website',
        'Online booking integration',
        'Service menu with pricing',
        'Photo gallery of your work',
        'Click-to-call and directions',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$4,500',
      unit: 'AUD',
      desc: 'A full website with your brand, services, and booking system.',
      features: [
        'Multi-page website (up to 5)',
        'Custom brand identity and logo',
        'Online booking with deposits',
        'Service and treatment pages',
        'Before/after gallery',
        'Google Business optimisation',
      ],
      cta: 'Get Professional',
      popular: true,
    },
    {
      name: 'Complete',
      price: '$6,000',
      unit: 'AUD',
      desc: 'Everything you need to grow your beauty brand.',
      features: [
        'Full website with unlimited pages',
        'Complete brand package (logo, cards, signage)',
        'Gift voucher and package system',
        'Product shop integration',
        'Social media templates',
        'Monthly performance report',
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
      desc: 'Logo, brand guide, business cards, appointment cards, and salon signage. Beautiful consistency across every touchpoint.',
      price: 'from $1,500',
    },
    {
      icon: 'bot',
      title: 'AI Booking Assistant',
      desc: 'A chatbot that handles appointment enquiries, suggests services, and takes deposits automatically. No more DM tennis.',
      price: 'from $800',
    },
    {
      icon: 'gift',
      title: 'Gift Voucher System',
      desc: 'Beautiful online gift vouchers with instant delivery. A revenue stream that sells itself, even while you are closed.',
      price: 'from $400',
    },
    {
      icon: 'camera',
      title: 'Before & After Gallery',
      desc: 'A curated, filterable portfolio of your best work. The single most powerful conversion tool on a beauty website.',
      price: 'from $500',
    },
  ],

  process: {
    heading: 'How it works',
    items: [
      {
        step: '1',
        title: 'Book a chat',
        desc: '15 minutes. Tell us about your salon, your style, and your dream online presence. No jargon.',
      },
      {
        step: '2',
        title: 'We design and build',
        desc: 'We create a website as beautiful as your best work. Booking, galleries, and a brand that pops. Revisions until it is perfect.',
      },
      {
        step: '3',
        title: 'Launch and book out',
        desc: 'Your site goes live. More bookings, less admin, fewer no-shows. We handle the tech while you focus on your clients.',
      },
    ],
  },

  testimonials: [
    {
      quote: 'Stellio captured the exact aesthetic we were going for. The booking system cut my admin time in half.',
      name: 'Isabella Henny',
      company: 'Macuace Football',
    },
    {
      quote: 'We went from Instagram-only to a real brand with a real website. New clients find us every week now.',
      name: 'Tim Bourassa',
      company: 'RevBoco',
    },
    {
      quote: 'The before/after gallery alone has converted so many website visitors into bookings. Best investment.',
      name: 'Will Engelbrecht',
      company: 'Gel Paints Australia',
    },
  ],

  finalCta: {
    heading: 'Ready for a website as beautiful as your work?',
    subline: 'Book a free 15-minute chat. No pressure - just a conversation about building your beauty brand online.',
    cta: 'Book a Free Chat',
    ctaLink: 'https://cal.com/stellio-koutsis/30min',
    ctaExternal: true,
  },

  faqs: [
    {
      q: 'How long does it take?',
      a: 'Most beauty sites launch within 2-3 weeks. Starter sites can be live in 7 days.',
    },
    {
      q: 'Can you integrate my booking system?',
      a: 'Yes. We work with Fresha, Bookwell, Timely, or custom booking forms - whatever you prefer.',
    },
    {
      q: 'Can I update my services and prices?',
      a: 'Yes. We build on a system you can update yourself. Change services, prices, and photos anytime.',
    },
    {
      q: 'What about gift vouchers?',
      a: 'Yes. We can set up online gift voucher sales with instant delivery. Great revenue stream.',
    },
    {
      q: 'Will it match my salon vibe?',
      a: 'That is the whole point. We design around your aesthetic, not a generic template. Your site should feel like your salon.',
    },
  ],

  showcase: {
    heading: 'See what your beauty website could look like',
    subline: 'Three styles, each designed to fill your appointment book.',
    examples: [
      {
        name: 'The Lookbook',
        tagline: 'Your work, beautifully displayed.',
        desc: 'For beauty professionals whose portfolio drives bookings. Gallery-forward, soft pink palette, and direct booking integration.',
        style: 'light-rose',
        template: 'beauty-lookbook',
        preview: { brand: 'ROSE & CO. BEAUTY', hero: 'Your beauty story, told with care', services: ['Brows', 'Lashes', 'Skin', 'Nails'], cta: 'BOOK NOW', trustBadge: '5-Star Reviews' },
      },
      {
        name: 'The Glow',
        tagline: 'Treat yourself. You deserve it.',
        desc: 'For salons selling self-care experiences. Warm and inviting, treatment menus, and a pampered feel throughout.',
        style: 'dark-neon',
        template: 'beauty-glow',
        preview: { brand: 'GLOW STUDIO', hero: 'Unleash your glow', services: ['Facials', 'Massage', 'Body Treatments'], cta: 'BOOK TREATMENT', trustBadge: 'Premium Products' },
      },
      {
        name: 'The Suite',
        tagline: 'Premium services, premium presentation.',
        desc: 'For high-end beauty suites and medi-spas. Luxurious dark theme, service tiers, and an exclusive feel.',
        style: 'light-blush',
        template: 'beauty-suite',
        preview: { brand: 'THE SUITE', hero: 'Beauty, one client at a time', services: ['Advanced Skin', 'Injectables', 'Body Sculpting'], cta: 'BOOK CONSULTATION', trustBadge: 'Medical-Grade Treatments' },
      },
    ],
  },
}
