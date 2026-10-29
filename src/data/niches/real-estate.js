// Real Estate Agents landing page config - /for/real-estate
// Agents, agencies, property managers

export default {
  slug: 'real-estate',
  accent: '#10B981', // emerald green

  seo: {
    title: 'Website Design for Real Estate Agents | Stellio Creative Labs',
    description: 'List more properties. Sign more vendors. Professional branding and web design built for Australian real estate agents.',
  },

  hero: {
    eyebrow: 'For Real Estate Agents',
    headline: 'Vendors judge your brand before they judge your listings.',
    headlineHighlight: 'judge your brand',
    subline: 'Before you get a foot in the door, they check your website. If it looks like every other agency template, you are invisible. Stand out and win more listings.',
    cta: 'Get a Website That Wins Listings',
    ctaSecondary: 'See Our Work',
    ctaSecondaryLink: '/work',
    socialProof: '70+ professional service brands built',
  },

  painPoints: {
    heading: 'Sound familiar?',
    items: [
      {
        icon: 'phone-missed',
        title: 'Lost listing presentations',
        desc: 'You lost the listing to an agency with a stronger online presence. Vendors trust what they can see.',
      },
      {
        icon: 'wrench',
        title: 'Same template as everyone else',
        desc: 'Your website uses the same real estate template as five other agencies in your suburb. No differentiation.',
      },
      {
        icon: 'clock',
        title: 'Cannot showcase your results',
        desc: 'Your sales results and testimonials are buried. There is no clear proof you deliver for vendors.',
      },
      {
        icon: 'dollar',
        title: 'Dependent on portals',
        desc: 'You pay thousands to realestate.com.au and domain every month. You have no direct channel to buyers.',
      },
    ],
  },

  packages: [
    {
      name: 'Starter',
      price: '$2,500',
      unit: 'AUD',
      desc: 'A sharp landing page that positions you as the local expert.',
      features: [
        'Single-page responsive website',
        'Property search integration',
        'Agent profile and testimonials',
        'Click-to-call and enquiry form',
        'Suburb-specific SEO setup',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$4,500',
      unit: 'AUD',
      desc: 'A full website with your brand, listings, and vendor pipeline.',
      features: [
        'Multi-page website (up to 5)',
        'Custom brand identity and logo',
        'Listing feed integration',
        'Vendor testimonial showcase',
        'Market report and suburb pages',
        'Google Business optimisation',
      ],
      cta: 'Get Professional',
      popular: true,
    },
    {
      name: 'Complete',
      price: '$6,000',
      unit: 'AUD',
      desc: 'Everything you need to dominate your territory online.',
      features: [
        'Full website with unlimited pages',
        'Complete brand package (logo, cards, signage)',
        'CRM and lead capture system',
        'Automated market updates',
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
      desc: 'Logo, brand guide, business cards, yard signs, and email signature. Present like the premium agency you are.',
      price: 'from $1,500',
    },
    {
      icon: 'bot',
      title: 'AI Vendor Chatbot',
      desc: 'A chatbot that qualifies vendors, answers property questions, and books appraisals automatically - even on weekends.',
      price: 'from $800',
    },
    {
      icon: 'chart',
      title: 'Market Report Templates',
      desc: 'Branded suburb reports and market updates you can send to vendors monthly. Position yourself as the local authority.',
      price: 'from $500',
    },
    {
      icon: 'crm',
      title: 'CRM Integration',
      desc: 'Connect your website to Rex, Agentbox, or VaultRE so leads flow straight into your pipeline. No manual data entry.',
      price: 'from $600',
    },
  ],

  process: {
    heading: 'How it works',
    items: [
      {
        step: '1',
        title: 'Book a chat',
        desc: '15 minutes. Tell us about your territory, your targets, and what holds you back. Straight talk, no fluff.',
      },
      {
        step: '2',
        title: 'We design and build',
        desc: 'We create a website that sells your expertise. Listings, results, and a brand vendors trust. Revisions until you are happy.',
      },
      {
        step: '3',
        title: 'Launch and win listings',
        desc: 'Your site goes live. More vendor enquiries, stronger listing presentations. We handle the tech while you close deals.',
      },
    ],
  },

  testimonials: [
    {
      quote: 'Stellio understood our market instantly. The brand they built gets us into listing presentations we would never have won before.',
      name: 'Tim Bourassa',
      company: 'RevBoco',
    },
    {
      quote: 'Our website went from forgettable to the first thing vendors mention when we walk in the door.',
      name: 'Vass Stammes',
      company: 'PropCheck',
    },
    {
      quote: 'We stopped blending in with every other agency on the strip. The website pays for itself every month.',
      name: 'Will Engelbrecht',
      company: 'Gel Paints Australia',
    },
  ],

  finalCta: {
    heading: 'Ready to win more listings with a brand vendors trust?',
    subline: 'Book a free 15-minute chat. No pressure - just a straight conversation about standing out in your territory.',
    cta: 'Book a Free Chat',
    ctaLink: 'https://cal.com/stellio-koutsis/30min',
    ctaExternal: true,
  },

  faqs: [
    {
      q: 'How long does it take?',
      a: 'Most agency sites launch within 2-3 weeks. Starter sites can be live in 7 days.',
    },
    {
      q: 'Can you integrate with my CRM?',
      a: 'Yes. We work with Rex, Agentbox, VaultRE, and most major CRMs. Leads flow straight in.',
    },
    {
      q: 'Do you connect property feeds?',
      a: 'Yes. We integrate REAXML feeds, API connections, or iframe embeds from your existing listing platform.',
    },
    {
      q: 'What about SEO for my suburb?',
      a: 'We build suburb-specific landing pages and optimise for local search so you rank when vendors search for agents near them.',
    },
    {
      q: 'Can I update listings myself?',
      a: 'Yes. Listings sync automatically from your CRM or portal. No manual updates needed.',
    },
  ],

  showcase: {
    heading: 'See what your real estate website could look like',
    subline: 'Three distinct styles, each built to move listings and win vendors.',
    examples: [
      {
        name: 'The Listings Hub',
        tagline: 'Properties first. Search-driven.',
        desc: 'For agencies whose listings are the product. Clean search, market data sidebar, and filter-driven property grid.',
        style: 'light',
        template: 'property-listings',
        preview: { brand: 'GREENFIELD PROPERTY', hero: 'Find your next home in the growth corridor.', services: ['Buy', 'Sell', 'Rent', 'Appraisal'], cta: 'SEARCH LISTINGS', trustBadge: '142 Sold This Year' },
      },
      {
        name: 'The Agent Brand',
        tagline: 'Your reputation, amplified.',
        desc: 'For agents whose personal brand closes deals. Premium dark theme, sold results, and area expertise showcase.',
        style: 'dark-gold',
        template: 'agent-profile',
        preview: { brand: 'SARAH MITCHELL PROPERTY', hero: 'Your home deserves a premium result.', services: ['Sold Results', 'Areas', 'Reviews'], cta: 'BOOK CONSULTATION', trustBadge: '200+ Homes Sold' },
      },
      {
        name: 'The Auction Room',
        tagline: 'Urgency sells. Show it.',
        desc: 'For auction-driven agencies. Countdown urgency, bid registration, and red-accent energy throughout.',
        style: 'dark-red',
        template: 'auction-hype',
        preview: { brand: 'AUCTIONHQ', hero: 'Buy at auction. No secrets. No games.', services: ['Upcoming Auctions', 'Register to Bid', 'How It Works'], cta: 'REGISTER NOW', trustBadge: 'Next Auction: Saturday' },
      },
    ],
  },
}
