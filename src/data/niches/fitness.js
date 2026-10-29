// Fitness & Coaching landing page config - /for/fitness
// PTs, gyms, yoga studios, online coaches, martial arts

export default {
  slug: 'fitness',
  accent: '#22C55E', // electric green

  seo: {
    title: 'Website Design for Fitness & Coaching | Stellio Creative Labs',
    description: 'Get more clients, more sign-ups, and a brand that matches your energy. Professional web design for Australian fitness businesses.',
  },

  hero: {
    eyebrow: 'For Fitness & Coaching',
    headline: 'Your training transforms bodies. Your website should transform your bookings.',
    headlineHighlight: 'transform your bookings',
    subline: 'While you are coaching clients, your competitors with polished websites and easy booking systems are filling their schedules. You deserve the same.',
    cta: 'Get a Website That Books Clients',
    ctaSecondary: 'See Our Work',
    ctaSecondaryLink: '/work',
    socialProof: '70+ fitness and small business brands built',
  },

  painPoints: {
    heading: 'Sound familiar?',
    items: [
      {
        icon: 'phone-missed',
        title: 'Clients book elsewhere',
        desc: 'They search "personal trainer near me", find someone with a clean site and easy booking, and never call you.',
      },
      {
        icon: 'wrench',
        title: 'Instagram is your website',
        desc: 'You hustle on socials but have nowhere to send people who want to actually book. No website means no credibility.',
      },
      {
        icon: 'clock',
        title: 'Manual bookings and payments',
        desc: 'You are texting back and forth to schedule sessions. Chasing payments. Wasting hours every week on admin.',
      },
      {
        icon: 'dollar',
        title: 'No online programmes',
        desc: 'You could be selling online coaching or group programmes, but you have no platform to deliver them.',
      },
    ],
  },

  packages: [
    {
      name: 'Starter',
      price: '$2,500',
      unit: 'AUD',
      desc: 'A high-energy landing page that gets you more enquiries.',
      features: [
        'Single-page responsive website',
        'Online booking integration',
        'Class schedule display',
        'Before/after showcase',
        'Click-to-call and contact form',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$4,500',
      unit: 'AUD',
      desc: 'A full website with your brand, programmes, and booking system.',
      features: [
        'Multi-page website (up to 5)',
        'Custom brand identity and logo',
        'Online booking and payments',
        'Programme and class pages',
        'Client testimonials showcase',
        'Local SEO for your area',
      ],
      cta: 'Get Professional',
      popular: true,
    },
    {
      name: 'Complete',
      price: '$6,000',
      unit: 'AUD',
      desc: 'Everything you need to scale your fitness business online.',
      features: [
        'Full website with unlimited pages',
        'Complete brand package (logo, cards, merch designs)',
        'Online programme delivery system',
        'Membership and payment integration',
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
      desc: 'Logo, brand guide, business cards, merch designs, and gym signage. Your brand, from the studio to the street.',
      price: 'from $1,500',
    },
    {
      icon: 'bot',
      title: 'AI Booking & Enquiry Bot',
      desc: 'A chatbot that handles class enquiries, answers pricing questions, and books sessions while you are training clients.',
      price: 'from $800',
    },
    {
      icon: 'shirt',
      title: 'Merch & Apparel Design',
      desc: 'Custom t-shirt, tank, and hoodie designs your clients actually want to wear. Turn your community into walking billboards.',
      price: 'from $400',
    },
    {
      icon: 'video',
      title: 'Workout Content Templates',
      desc: 'Branded video overlays, Instagram story templates, and reel covers for your training content. Look pro on every post.',
      price: 'from $500',
    },
  ],

  process: {
    heading: 'How it works',
    items: [
      {
        step: '1',
        title: 'Book a chat',
        desc: '15 minutes. Tell us about your training style, your clients, and what you want more of. No hard sell.',
      },
      {
        step: '2',
        title: 'We design and build',
        desc: 'We create a website that matches your energy. Booking systems, class schedules, and a brand that pops. Revisions until it feels right.',
      },
      {
        step: '3',
        title: 'Launch and fill your schedule',
        desc: 'Your site goes live. More bookings, less admin, more time coaching. We handle the tech while you train.',
      },
    ],
  },

  testimonials: [
    {
      quote: 'Stellio nailed the energy of our brand. The booking system alone saved me 5 hours a week on admin.',
      name: 'Tim Bourassa',
      company: 'RevBoco',
    },
    {
      quote: 'We went from Instagram-only to a real business with a real website. Client sign-ups tripled.',
      name: 'Isabella Henny',
      company: 'Macuace Football',
    },
    {
      quote: 'Finally a website that matches the intensity of what we do. No fluff, all impact.',
      name: 'Will Engelbrecht',
      company: 'Gel Paints Australia',
    },
  ],

  finalCta: {
    heading: 'Ready to fill your schedule with a website that works as hard as you do?',
    subline: 'Book a free 15-minute chat. No commitments - just a conversation about growing your fitness business.',
    cta: 'Book a Free Chat',
    ctaLink: 'https://cal.com/stellio-koutsis/30min',
    ctaExternal: true,
  },

  faqs: [
    {
      q: 'How long does it take?',
      a: 'Most fitness sites launch within 2-3 weeks. Starter sites can be live in 7 days.',
    },
    {
      q: 'Can you set up booking and payments?',
      a: 'Yes. We integrate with Mindbody, Glofox, or custom booking forms with Stripe payments.',
    },
    {
      q: 'Can I sell online programmes?',
      a: 'Yes. We can build a simple programme delivery system or integrate with platforms like Trainerize.',
    },
    {
      q: 'Do I need to provide content?',
      a: 'Just your training info, photos, and pricing. We write the copy and design everything.',
    },
    {
      q: 'Will it work on mobile?',
      a: 'Most of your clients will visit on their phone. Every site we build is mobile-first.',
    },
  ],

  showcase: {
    heading: 'See what your fitness website could look like',
    subline: 'Three styles, each built to sign members and fill classes.',
    examples: [
      {
        name: 'The Grind',
        tagline: 'Dark. Intense. Built to sign members.',
        desc: 'For gyms where the workout is the product. Full-screen intensity hero, programme cards, and membership pricing tiers.',
        style: 'dark',
        template: 'gym-grind',
        preview: { brand: 'IRONFORGE GYM', hero: 'Stop wishing. Start lifting.', services: ['Strength', 'HIIT', 'Conditioning'], cta: 'START FREE TRIAL', trustBadge: '24/7 Access' },
      },
      {
        name: 'The Tribe',
        tagline: 'Community keeps them coming back.',
        desc: 'For group-fitness studios where community drives retention. Interactive timetable, class types, and social atmosphere.',
        style: 'dark-amber',
        template: 'fitness-tribe',
        preview: { brand: 'TRIBEFIT STUDIO', hero: 'Stronger together.', services: ['HIIT', 'Box Fit', 'Yoga', 'Spin'], cta: 'FREE TRIAL CLASS', trustBadge: '150+ Classes/Week' },
      },
      {
        name: 'The Transformation',
        tagline: 'Results sell. Show them.',
        desc: 'For PTs and studios that sell through visible client results. Before/after stories, programme tiers, and coach profiles.',
        style: 'dark-purple',
        template: 'transformation',
        preview: { brand: 'TRANSFORMHQ', hero: '12 weeks to a body you are proud of.', services: ['12-Week Program', '1-on-1 PT', 'Nutrition'], cta: 'BOOK CONSULTATION', trustBadge: 'Real Transformations' },
      },
    ],
  },
}
