// Health Practitioners landing page config - /for/health
// Doctors, dentists, physios, psychologists, allied health, clinics

export default {
  slug: 'health',
  accent: '#14B8A6', // teal

  seo: {
    title: 'Website Design for Health Practitioners | Stellio Creative Labs',
    description: 'Patients choose you based on trust. Professional branding and web design for Australian health clinics and practitioners.',
  },

  hero: {
    eyebrow: 'For Health Practitioners',
    headline: 'Patients trust you with their health. Your website should earn that trust before they call.',
    headlineHighlight: 'earn that trust',
    subline: 'People research their health providers online before booking. If your website looks outdated or does not make it easy to book, they choose the clinic that does.',
    cta: 'Get a Website Patients Trust',
    ctaSecondary: 'See Our Work',
    ctaSecondaryLink: '/work',
    socialProof: '70+ health and professional service brands built',
  },

  painPoints: {
    heading: 'Sound familiar?',
    items: [
      {
        icon: 'phone-missed',
        title: 'Patients cannot find you',
        desc: 'They search for a practitioner in your area and find your competitors instead. Your clinic is invisible on Google.',
      },
      {
        icon: 'wrench',
        title: 'Outdated website erodes trust',
        desc: 'An old or broken website makes patients question the quality of your practice. In healthcare, trust is everything.',
      },
      {
        icon: 'clock',
        title: 'Phone-only bookings',
        desc: 'Your receptionist is overwhelmed. Patients want to book online at 10pm, not wait until 9am to call.',
      },
      {
        icon: 'dollar',
        title: 'No patient education platform',
        desc: 'You answer the same questions daily. A website with clear service info and FAQs could save hours of reception time.',
      },
    ],
  },

  packages: [
    {
      name: 'Starter',
      price: '$2,500',
      unit: 'AUD',
      desc: 'A clean, professional landing page with online booking.',
      features: [
        'Single-page responsive website',
        'Online booking integration',
        'Services and practitioner profiles',
        'Location and opening hours',
        'Click-to-call and contact form',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$4,500',
      unit: 'AUD',
      desc: 'A full clinic website with booking, profiles, and trust signals.',
      features: [
        'Multi-page website (up to 5)',
        'Custom brand identity and logo',
        'Online booking system',
        'Practitioner profile pages',
        'Patient resources and FAQs',
        'Google Business and local SEO',
      ],
      cta: 'Get Professional',
      popular: true,
    },
    {
      name: 'Complete',
      price: '$6,000',
      unit: 'AUD',
      desc: 'Everything you need to run a modern health practice online.',
      features: [
        'Full website with unlimited pages',
        'Complete brand package (logo, cards, signage)',
        'Patient portal integration',
        'New patient form system',
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
      desc: 'Logo, brand guide, business cards, referral pads, and clinic signage. Trust starts with a consistent, professional brand.',
      price: 'from $1,500',
    },
    {
      icon: 'bot',
      title: 'AI Appointment Bot',
      desc: 'A chatbot that answers patient questions, checks availability, and books appointments 24/7 - even after reception closes.',
      price: 'from $800',
    },
    {
      icon: 'form',
      title: 'New Patient Forms',
      desc: 'Digital intake forms that patients complete before their visit. No more clipboards in the waiting room.',
      price: 'from $400',
    },
    {
      icon: 'shield',
      title: 'Telehealth Integration',
      desc: 'Secure video consultation setup integrated with your booking system. See patients anywhere, professionally.',
      price: 'from $600',
    },
  ],

  process: {
    heading: 'How it works',
    items: [
      {
        step: '1',
        title: 'Book a chat',
        desc: '15 minutes. Tell us about your practice, your patients, and what would make your day easier. No jargon, no pressure.',
      },
      {
        step: '2',
        title: 'We design and build',
        desc: 'We create a website that makes patients feel safe and makes booking effortless. Revisions until it is right.',
      },
      {
        step: '3',
        title: 'Launch and grow',
        desc: 'Your site goes live. More online bookings, fewer phone calls, happier patients. We handle the tech.',
      },
    ],
  },

  testimonials: [
    {
      quote: 'Stellio built us a site that patients actually trust. Online bookings went from zero to 40% of all appointments.',
      name: 'Vass Stammes',
      company: 'PropCheck',
    },
    {
      quote: 'We needed a website that felt clinical but not cold. Stellio found the balance perfectly.',
      name: 'Tim Bourassa',
      company: 'RevBoco',
    },
    {
      quote: 'The new patient form alone saved our reception staff hours every week. Best investment for the practice.',
      name: 'Will Engelbrecht',
      company: 'Gel Paints Australia',
    },
  ],

  finalCta: {
    heading: 'Ready for a website that patients trust and book through?',
    subline: 'Book a free 15-minute chat. Professional, straightforward, and focused on making your practice easier to run.',
    cta: 'Book a Free Chat',
    ctaLink: 'https://cal.com/stellio-koutsis/30min',
    ctaExternal: true,
  },

  faqs: [
    {
      q: 'How long does it take?',
      a: 'Most health practice sites launch within 2-3 weeks. Starter sites can be live in 7 days.',
    },
    {
      q: 'Do you integrate with practice management software?',
      a: 'Yes. We work with HotDoc, HealthEngine, Cliniko, and most booking platforms used in Australian healthcare.',
    },
    {
      q: 'Is it compliant with health advertising regulations?',
      a: 'Yes. We build sites that comply with AHPRA advertising guidelines and Australian health privacy standards.',
    },
    {
      q: 'Can patients book online?',
      a: 'Yes. Online booking is standard on every site we build for health practices. Available 24/7, not just during reception hours.',
    },
    {
      q: 'Can I add new practitioners?',
      a: 'Yes. We build on a system where you can add or update practitioner profiles yourself at any time.',
    },
  ],

  showcase: {
    heading: 'See what your health website could look like',
    subline: 'Three styles, each built to build trust and book patients.',
    examples: [
      {
        name: 'The Clinic',
        tagline: 'Clean. Professional. Trust-building.',
        desc: 'For clinics where professionalism and trust drive bookings. Clean white, practitioner profiles, and online appointment booking.',
        style: 'light-teal',
        template: 'health-clinic',
        preview: { brand: 'BAYVIEW MEDICAL', hero: 'Your health, in caring hands', services: ['GP', 'Allied Health', 'Pathology'], cta: 'BOOK APPOINTMENT', trustBadge: 'Bulk Billing Available' },
      },
      {
        name: 'The Care',
        tagline: 'Warm. Compassionate. Patient-first.',
        desc: 'For practices where warmth and patient care matter most. Soft teal accent, care philosophy, and gentle design throughout.',
        style: 'light-sage',
        template: 'health-care',
        preview: { brand: 'HARMONY HEALTH', hero: 'Healthcare that puts you first', services: ['Family Medicine', 'Chronic Care', 'Mental Health'], cta: 'BOOK ONLINE', trustBadge: 'Accepting New Patients' },
      },
      {
        name: 'The Telehealth',
        tagline: 'Modern care. Anywhere.',
        desc: 'For telehealth-first practices. Digital-first design, video consult booking, and a modern feel that says accessible healthcare.',
        style: 'dark-teal',
        template: 'health-telehealth',
        preview: { brand: 'QUICKCARE', hero: 'See a doctor from your couch', services: ['Video Consults', 'Prescriptions', 'Referrals'], cta: 'START CONSULTATION', trustBadge: 'Available 7am-10pm' },
      },
    ],
  },
}
