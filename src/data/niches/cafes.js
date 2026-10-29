// Cafes & Hospitality landing page config - /for/cafes
// Cafes, restaurants, bars, food trucks, bakeries

export default {
  slug: 'cafes',
  accent: '#F59E0B', // warm amber

  seo: {
    title: 'Website Design for Cafes & Hospitality | Stellio Creative Labs',
    description: 'Your food speaks for itself. Make sure your website does too. Professional branding and web design for Australian cafes and restaurants.',
  },

  hero: {
    eyebrow: 'For Cafes & Hospitality',
    headline: 'Your food is unforgettable. Your website should be too.',
    headlineHighlight: 'should be too',
    subline: 'Customers decide where to eat in under 3 seconds on your website. If your menu is a PDF and your vibe is invisible online, they keep scrolling.',
    cta: 'Get a Website That Sells',
    ctaSecondary: 'See Our Work',
    ctaSecondaryLink: '/work',
    socialProof: '70+ hospitality and small business brands built',
  },

  painPoints: {
    heading: 'Sound familiar?',
    items: [
      {
        icon: 'phone-missed',
        title: 'Menu is a PDF',
        desc: 'Customers on mobile pinch and zoom to read your menu. Half of them give up and go somewhere else.',
      },
      {
        icon: 'wrench',
        title: 'Looks nothing like your venue',
        desc: 'Your space is warm, curated, and intentional. Your website looks like a template from 2015.',
      },
      {
        icon: 'clock',
        title: 'No online orders or bookings',
        desc: 'You are leaving money on the table every day by not letting customers book a table or order ahead.',
      },
      {
        icon: 'dollar',
        title: 'Invisible on Google',
        desc: 'When someone searches "coffee near me" or "best brunch in [your suburb]", your competitors show up instead.',
      },
    ],
  },

  packages: [
    {
      name: 'Starter',
      price: '$2,500',
      unit: 'AUD',
      desc: 'A beautiful one-page site that showcases your menu and vibe.',
      features: [
        'Single-page responsive website',
        'Mobile-optimised menu display',
        'Opening hours and location map',
        'Click-to-call and directions',
        'Instagram feed integration',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$4,500',
      unit: 'AUD',
      desc: 'A full website with your brand, story, and booking system.',
      features: [
        'Multi-page website (up to 5)',
        'Custom brand identity and logo',
        'Online booking system integration',
        'Photo gallery and virtual menu',
        'Local SEO for your suburb',
        'Google Business optimisation',
      ],
      cta: 'Get Professional',
      popular: true,
    },
    {
      name: 'Complete',
      price: '$6,000',
      unit: 'AUD',
      desc: 'Everything you need to dominate your local dining scene.',
      features: [
        'Full website with unlimited pages',
        'Complete brand package (logo, cards, signage)',
        'Online ordering or reservation system',
        'Event and catering page',
        'Social media templates',
        'Monthly analytics report',
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
      desc: 'Logo, brand guide, menus, signage, and coffee cup branding. Every touchpoint tells your story.',
      price: 'from $1,500',
    },
    {
      icon: 'bot',
      title: 'AI Booking Assistant',
      desc: 'A chatbot that handles reservation enquiries, answers menu questions, and books tables 24/7 - even during the rush.',
      price: 'from $800',
    },
    {
      icon: 'menu',
      title: 'Print Menu Design',
      desc: 'Beautifully designed printed menus, specials boards, and takeaway menus that match your online brand.',
      price: 'from $400',
    },
    {
      icon: 'camera',
      title: 'Social Content Templates',
      desc: 'Instagram and Facebook post templates for daily specials, events, and behind-the-scenes content. Post in minutes, not hours.',
      price: 'from $500',
    },
  ],

  process: {
    heading: 'How it works',
    items: [
      {
        step: '1',
        title: 'Book a chat',
        desc: '15 minutes. Tell us about your venue, your vibe, and what you want your website to do. No jargon.',
      },
      {
        step: '2',
        title: 'We design and build',
        desc: 'We create a website that matches your atmosphere. Menus that read beautifully on any device. Revisions until it is right.',
      },
      {
        step: '3',
        title: 'Launch and grow',
        desc: 'Your site goes live. More bookings, more orders, more regulars. We handle the tech while you handle the kitchen.',
      },
    ],
  },

  testimonials: [
    {
      quote: 'Stellio captured the exact feel of our venue online. Bookings went up 40% in the first month.',
      name: 'Tim Bourassa',
      company: 'RevBoco',
    },
    {
      quote: 'Our old website was embarrassing. Stellio gave us something that actually matches the quality of our food.',
      name: 'Will Engelbrecht',
      company: 'Gel Paints Australia',
    },
    {
      quote: 'The online menu alone was worth it. No more "can you send me the menu?" texts.',
      name: 'Isabella Henny',
      company: 'Macuace Football',
    },
  ],

  finalCta: {
    heading: 'Ready for a website that matches your food?',
    subline: 'Book a free 15-minute chat. No obligations - just a conversation about getting more customers through your door.',
    cta: 'Book a Free Chat',
    ctaLink: 'https://cal.com/stellio-koutsis/30min',
    ctaExternal: true,
  },

  faqs: [
    {
      q: 'How long does it take?',
      a: 'Most hospitality sites launch within 2-3 weeks. Starter sites can be live in 7 days.',
    },
    {
      q: 'Can I update my menu myself?',
      a: 'Yes. We build on a system where you can change menu items, prices, and specials without calling us.',
    },
    {
      q: 'Do you integrate booking systems?',
      a: 'Yes. We work with ResDiary, OpenTable, SevenRooms, or simple custom booking forms - whatever fits your setup.',
    },
    {
      q: 'What about online ordering?',
      a: 'We can set up online ordering that goes straight to your kitchen. No third-party commissions eating into your margins.',
    },
    {
      q: 'Will it look good on mobile?',
      a: 'Over 80% of your potential customers browse on their phone. Every site we build is mobile-first.',
    },
  ],

  showcase: {
    heading: 'See what your cafe website could look like',
    subline: 'Three unique styles, each designed to fill tables and grow your following.',
    examples: [
      {
        name: 'The Menu Board',
        tagline: 'Your menu, front and centre.',
        desc: 'For cafes where the food and drink speak loudest. Menu-dominant layout with daily specials and online ordering.',
        style: 'warm-amber',
        template: 'cafe-menu',
        preview: { brand: 'SUNRISE ESPRESSO', hero: 'Coffee that starts your day right', services: ['Espresso Bar', 'All-Day Brunch', 'Daily Specials'], cta: 'VIEW MENU', trustBadge: 'Open 7 Days' },
      },
      {
        name: 'The Vibe',
        tagline: 'Atmosphere that fills tables.',
        desc: 'For cafes whose aesthetic and atmosphere drive foot traffic. Photo-forward, Instagram-integrated, mood-driven.',
        style: 'dark-copper',
        template: 'cafe-vibe',
        preview: { brand: 'NIGHTCAP BAR', hero: 'Where the night comes alive', services: ['Specialty Coffee', 'Plant-Based Menu', 'Event Space'], cta: 'SEE THE VIBE', trustBadge: 'Est. 2019' },
      },
      {
        name: 'The Regular',
        tagline: 'Build loyalty, one visit at a time.',
        desc: 'For cafes that thrive on repeat customers. Loyalty programme, stamp cards, and community-first design.',
        style: 'warm-sage',
        template: 'cafe-regular',
        preview: { brand: 'THE CORNER CUP', hero: 'Your usual, made better', services: ['Loyalty Programme', 'Pre-Order', 'Catering'], cta: 'JOIN THE CLUB', trustBadge: '500+ Regulars' },
      },
    ],
  },
}
