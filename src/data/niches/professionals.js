// Professional Services landing page config - /for/professionals
// Lawyers, accountants, consultants, financial advisors

export default {
  slug: 'professionals',
  accent: '#6366F1', // indigo

  seo: {
    title: 'Website Design for Professional Services | Stellio Creative Labs',
    description: 'Build trust before the first meeting. Professional branding and web design for Australian lawyers, accountants, and consultants.',
  },

  hero: {
    eyebrow: 'For Professional Services',
    headline: 'Your expertise is your product. Your website should prove it.',
    headlineHighlight: 'should prove it',
    subline: 'Prospective clients research you online before they call. If your website does not immediately convey authority and trust, they move on to the firm that does.',
    cta: 'Get a Website That Builds Trust',
    ctaSecondary: 'See Our Work',
    ctaSecondaryLink: '/work',
    socialProof: '70+ professional service brands built',
  },

  painPoints: {
    heading: 'Sound familiar?',
    items: [
      {
        icon: 'phone-missed',
        title: 'Prospects check you and leave',
        desc: 'They visit your site, see a generic template, and call a competitor whose site actually looks like a legitimate practice.',
      },
      {
        icon: 'wrench',
        title: 'Looks like every other firm',
        desc: 'Same navy template, same stock photos, same vague tagline. Nothing differentiates you from the firm down the street.',
      },
      {
        icon: 'clock',
        title: 'No thought leadership platform',
        desc: 'You have expertise but no way to publish insights. No blog, no case studies, no content that positions you as the expert.',
      },
      {
        icon: 'dollar',
        title: 'Referral-only pipeline',
        desc: 'Word of mouth is great, but it is not predictable. You need a website that generates enquiries while you work.',
      },
    ],
  },

  packages: [
    {
      name: 'Starter',
      price: '$2,500',
      unit: 'AUD',
      desc: 'A professional landing page that establishes credibility.',
      features: [
        'Single-page responsive website',
        'Services and expertise overview',
        'Team profiles and credentials',
        'Contact and enquiry form',
        'Professional SEO foundations',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$4,500',
      unit: 'AUD',
      desc: 'A full website with your brand, expertise, and lead capture.',
      features: [
        'Multi-page website (up to 5)',
        'Custom brand identity and logo',
        'Practice area pages',
        'Team and credentials showcase',
        'Blog and thought leadership',
        'Google Business optimisation',
      ],
      cta: 'Get Professional',
      popular: true,
    },
    {
      name: 'Complete',
      price: '$6,000',
      unit: 'AUD',
      desc: 'Everything you need to dominate your practice area online.',
      features: [
        'Full website with unlimited pages',
        'Complete brand package (logo, cards, email signature)',
        'Client portal integration',
        'Case study and testimonial system',
        'Social media and content templates',
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
      desc: 'Logo, brand guide, business cards, email signature, and letterhead. Professional consistency from the boardroom to the brief.',
      price: 'from $1,500',
    },
    {
      icon: 'bot',
      title: 'AI Intake Assistant',
      desc: 'A chatbot that qualifies enquiries, collects case details, and routes leads to the right practitioner. Save hours of intake admin.',
      price: 'from $800',
    },
    {
      icon: 'doc',
      title: 'Client Portal Setup',
      desc: 'Secure document sharing, invoicing, and communication. Give clients a branded experience they expect from a top-tier firm.',
      price: 'from $600',
    },
    {
      icon: 'pen',
      title: 'Thought Leadership Blog',
      desc: 'A content strategy and blog setup that positions you as the expert. Articles that rank and build authority in your practice area.',
      price: 'from $500',
    },
  ],

  process: {
    heading: 'How it works',
    items: [
      {
        step: '1',
        title: 'Book a chat',
        desc: '15 minutes. Tell us about your practice, your ideal clients, and how you want to be perceived. Straightforward and professional.',
      },
      {
        step: '2',
        title: 'We design and build',
        desc: 'We create a website that reflects your expertise. Practice areas, credentials, and a brand that commands trust. Revisions until it is right.',
      },
      {
        step: '3',
        title: 'Launch and grow',
        desc: 'Your site goes live. More enquiries, stronger credibility, and a platform for thought leadership. We handle the tech.',
      },
    ],
  },

  testimonials: [
    {
      quote: 'Stellio gave us a website that matches the calibre of our work. Client enquiries went up significantly.',
      name: 'Tim Bourassa',
      company: 'RevBoco',
    },
    {
      quote: 'We needed a site that conveyed authority without being stuffy. Stellio nailed it first try.',
      name: 'Vass Stammes',
      company: 'PropCheck',
    },
    {
      quote: 'The brand identity alone was worth it. We look like a firm twice our size now.',
      name: 'Will Engelbrecht',
      company: 'Gel Paints Australia',
    },
  ],

  finalCta: {
    heading: 'Ready for a website that commands the trust your expertise deserves?',
    subline: 'Book a free 15-minute chat. Professional, direct, and focused on results.',
    cta: 'Book a Free Chat',
    ctaLink: 'https://cal.com/stellio-koutsis/30min',
    ctaExternal: true,
  },

  faqs: [
    {
      q: 'How long does it take?',
      a: 'Most professional service sites launch within 2-3 weeks. Starter sites can be live in 7 days.',
    },
    {
      q: 'Do you understand professional services compliance?',
      a: 'Yes. We build sites that meet industry standards for legal, accounting, and financial services in Australia.',
    },
    {
      q: 'Can you set up a client portal?',
      a: 'Yes. We can integrate secure client portals for document sharing, invoicing, and communication.',
    },
    {
      q: 'What about SEO for my practice area?',
      a: 'We build practice-area-specific pages optimised for the exact terms your ideal clients are searching for.',
    },
    {
      q: 'Can I publish articles and insights?',
      a: 'Yes. We set up a blog or insights section with a simple editor. No technical knowledge needed.',
    },
  ],

  showcase: {
    heading: 'See what your professional website could look like',
    subline: 'Three styles, each built to establish authority and win clients.',
    examples: [
      {
        name: 'The Authority',
        tagline: 'Credentials first. Trust follows.',
        desc: 'For professionals whose authority is the differentiator. Navy accent, credentials strip, thought leadership section, and consultation booking.',
        style: 'dark-navy',
        template: 'authority',
        preview: { brand: 'HENDERSON & CO. LAW', hero: 'Legal advice that protects what you have built.', services: ['Business Law', 'Property', 'Family Law'], cta: 'BOOK CONSULTATION', trustBadge: '15+ Years Experience' },
      },
      {
        name: 'The Practice',
        tagline: 'Your team, your expertise.',
        desc: 'For practices where the team and breadth of service matters. Clean white, team profiles, service area grid, and client portal.',
        style: 'light-blue',
        template: 'the-practice',
        preview: { brand: 'MERIDIAN ACCOUNTING', hero: 'Accounting that keeps your business on track.', services: ['Tax Returns', 'BAS', 'Business Structuring'], cta: 'GET STARTED', trustBadge: 'CPA Registered' },
      },
      {
        name: 'The Brief',
        tagline: 'No fluff. Just results.',
        desc: 'For consultants who sell efficiency and directness. Ultra-minimal black and white, numbered service list, and speed-focused contact.',
        style: 'dark-minimal',
        template: 'the-brief',
        preview: { brand: 'CLEARPATH CONSULTING', hero: 'We solve problems. Fast.', services: ['Strategy', 'Operations', 'Growth'], cta: 'TELL US THE PROBLEM', trustBadge: '100% Referral Rate' },
      },
    ],
  },
}
