// Tradies landing page config - /for/tradies
// Plumbers, electricians, builders, landscapers, concreters

export default {
  slug: 'tradies',
  // Niche accent: steel blue (secondary, used sparingly)
  accent: '#3B82F6',

  // SEO
  seo: {
    title: 'Website Design for Tradies | Stellio Creative Labs',
    description: 'Stop losing jobs to competitors with better websites. Professional branding and web design built for Australian tradies. From $2,500.',
  },

  // Hero
  hero: {
    eyebrow: 'For Australian Tradies',
    headline: 'Your next job is not calling because your website looks like this.',
    headlineHighlight: 'is not calling',
    subline: 'While you are on site, your competitors with clean websites and clear calls-to-action are booking the jobs you should be getting. It does not have to be that way.',
    cta: 'Get a Website That Works',
    ctaSecondary: 'See Our Work',
    ctaSecondaryLink: '/work',
    socialProof: '70+ tradie and small business brands built',
  },

  // Pain points
  painPoints: {
    heading: 'Sound familiar?',
    items: [
      {
        icon: 'phone-missed',
        title: 'Leads go cold',
        desc: 'They find you on Google, check your site, and leave because it looks unfinished or they cannot find your number.',
      },
      {
        icon: 'wrench',
        title: '"My mate made my site"',
        desc: 'A DIY website says you cut corners. Clients assume your work quality matches your web presence.',
      },
      {
        icon: 'clock',
        title: 'No time to manage it',
        desc: 'You are on the tools all day. The last thing you want is to update a website or figure out SEO.',
      },
      {
        icon: 'dollar',
        title: 'Wasting money on ads',
        desc: 'Running ads to a bad website is like pouring water into a leaky bucket. Fix the bucket first.',
      },
    ],
  },

  // What you get (mapped to Stellio services)
  packages: [
    {
      name: 'Starter',
      price: '$2,500',
      unit: 'AUD',
      desc: 'A clean, fast landing page that converts visitors into calls.',
      features: [
        'Single-page responsive website',
        'Click-to-call and quote form',
        'Google Business integration',
        'Mobile-first design',
        'Fast loading under 2 seconds',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$4,500',
      unit: 'AUD',
      desc: 'A full website with your brand, services, and proof of work.',
      features: [
        'Multi-page website (up to 5)',
        'Custom brand identity and logo',
        'Project gallery or before/after',
        'Testimonials and reviews section',
        'SEO setup for your local area',
        'Google Maps integration',
      ],
      cta: 'Get Professional',
      popular: true,
    },
    {
      name: 'Complete',
      price: '$6,000',
      unit: 'AUD',
      desc: 'Everything you need to dominate your local area online.',
      features: [
        'Full website with unlimited pages',
        'Complete brand package (logo, cards, email signature)',
        'Booking and quote management system',
        'Local SEO and Google Business optimisation',
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
      desc: 'Logo, brand guide, business cards, email signature, and vehicle magnet design. Look consistent from the van to the invoice.',
      price: 'from $1,500',
    },
    {
      icon: 'bot',
      title: 'AI-Powered Lead Capture',
      desc: 'A chatbot on your site that qualifies leads, answers common questions, and books quote requests while you are on the tools.',
      price: 'from $800',
    },
    {
      icon: 'map',
      title: 'Local SEO Domination',
      desc: 'Google Business optimisation, local keyword targeting, and citation building so you rank first in your service area.',
      price: 'from $500',
    },
    {
      icon: 'sign',
      title: 'Site Signage Pack',
      desc: 'QR code for your site signs that links straight to your quote form. Turn every job site into a lead source.',
      price: 'from $300',
    },
  ],

  // Process
  process: {
    heading: 'How it works',
    items: [
      {
        step: '1',
        title: 'Book a chat',
        desc: '15 minutes. Tell us what you do and where you want to grow. No jargon, no pressure.',
      },
      {
        step: '2',
        title: 'We design and build',
        desc: 'We create your site around how your business actually works. Revisions until you are happy.',
      },
      {
        step: '3',
        title: 'Launch and grow',
        desc: 'Your site goes live. We handle the tech. You focus on the work that pays.',
      },
    ],
  },

  // Testimonials (niche-relevant or generic Stellio)
  testimonials: [
    {
      quote: 'Stellio understood exactly what our business needed. The site pays for itself every month in new leads.',
      name: 'Tim Bourassa',
      company: 'RevBoco',
    },
    {
      quote: 'We went from invisible online to the first result in our area. Best investment we made this year.',
      name: 'Vass Stammes',
      company: 'PropCheck',
    },
    {
      quote: 'Finally a designer who does not waste my time. Quick turnaround, great result, and the phone started ringing.',
      name: 'Will Engelbrecht',
      company: 'Gel Paints Australia',
    },
  ],

  // Website showcase examples
  showcase: {
    heading: 'Here are some examples of websites we create',
    subline: 'Three distinct styles, each built to convert. Pick the vibe that fits your business.',
    examples: [
      {
        name: 'The Closer',
        tagline: 'Dark. Green. Built to ring your phone.',
        desc: 'For tradies who want every visitor to call. Massive phone number, minimal scroll, single-viewport conversion machine.',
        style: 'dark',
        template: 'closer',
        preview: {
          brand: 'COASTLINE PLUMBING',
          hero: 'Got a plumbing emergency?',
          phone: '04XX XXX XXX',
          services: ['Emergency Repairs', 'Hot Water', 'Blocked Drains', 'Roofing'],
          cta: 'GET A FREE QUOTE',
          trustBadge: 'Licensed & Insured',
        },
      },
      {
        name: 'The Portfolio',
        tagline: 'Your work speaks. Your website amplifies it.',
        desc: 'For tradies whose past jobs sell the next one. Clean layout, project gallery, before/after showcases, and reviews that close the deal.',
        style: 'light',
        template: 'portfolio',
        preview: {
          brand: 'SOUTHSIDE CONSTRUCTIONS',
          hero: 'We build homes worth talking about.',
          phone: null,
          services: ['New Builds', 'Renovations', 'Extensions', 'Kitchens'],
          cta: 'VIEW OUR WORK',
          trustBadge: '5.0 on Google',
        },
      },
      {
        name: 'The Local',
        tagline: 'Neighbourhood trust, digital scale.',
        desc: 'For tradies who own their area. Service zone map, community credibility, and a warm feel that says "we are just around the corner."',
        style: 'warm',
        template: 'local',
        preview: {
          brand: 'REDBANK ELECTRICAL',
          hero: "Your neighbour's recommended sparky.",
          services: ['Rewiring', 'Safety Switches', 'Solar', 'Air Con'],
          cta: 'BOOK A CALL-OUT',
          trustBadge: 'Serving Redbank & Ipswich',
        },
      },
    ],
  },

  // Final CTA
  finalCta: {
    heading: 'Ready to stop losing jobs to worse tradies with better websites?',
    subline: 'Book a free 15-minute chat. No obligations, no jargon - just a straight conversation about getting you more work.',
    cta: 'Book a Free Chat',
    ctaLink: 'https://cal.com/stellio-koutsis/30min',
    ctaExternal: true,
  },

  // FAQ
  faqs: [
    {
      q: 'How long does it take?',
      a: 'Most tradie sites launch within 2-3 weeks. Starter sites can be live in 7 days.',
    },
    {
      q: 'Do I need to provide anything?',
      a: 'Just photos of your work, your services list, and any logos you already have. We handle the rest.',
    },
    {
      q: 'Will it work on mobile?',
      a: 'Over 70% of your potential clients search on their phone. Every site we build is mobile-first.',
    },
    {
      q: 'What about SEO?',
      a: 'We set up local SEO from day one - Google Business, local keywords, and fast loading so you rank in your area.',
    },
    {
      q: 'Can I update it myself?',
      a: 'Yes. We build on a system you can update without calling us. But we are here if you need help.',
    },
  ],
}
