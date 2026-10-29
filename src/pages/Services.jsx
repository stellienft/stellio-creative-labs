import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'
import { WebPageSchema, BreadcrumbSchema, ServiceSchema } from '../components/JsonLd'

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FB5005" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

const brandingPackages = [
  {
    name: 'Brand Essentials',
    price: '$2,500',
    unit: 'AUD',
    timeline: '10 days',
    desc: 'Clean logo and basic identity for startups that need to look professional fast.',
    features: [
      'Logo design (2 concepts)',
      'Favicon and app icon',
      'Colour palette and primary typefaces',
      'Brand usage guide (PDF)',
      'Social media profile kit',
      '2 revision rounds',
    ],
    cta: 'Get Started',
    ctaStyle: 'secondary',
  },
  {
    name: 'Brand System',
    price: '$5,000',
    unit: 'AUD',
    timeline: '3 weeks',
    desc: 'Complete visual identity with guidelines you can hand to any designer or agency.',
    features: [
      'Everything in Essentials',
      'Extended brand strategy session',
      'Typography system with scale rules',
      'Social media templates (6 styles)',
      'Business card and email signature',
      'Brand guidelines website',
      '3 revision rounds',
    ],
    cta: 'Most Popular',
    ctaStyle: 'primary',
    popular: true,
  },
  {
    name: 'Brand + Launch',
    price: '$8,500',
    unit: 'AUD',
    timeline: '5 weeks',
    desc: 'Full brand system plus a polished landing page to go live with immediately.',
    features: [
      'Everything in Brand System',
      'Single-page landing site',
      'Copywriting for core pages',
      'Email capture integration',
      'Domain and hosting setup',
      'Social launch kit (10 assets)',
      'Priority support',
    ],
    cta: 'Enquire',
    ctaStyle: 'secondary',
  },
]

const landingPagePackages = [
  {
    name: 'Landing Page Lite',
    price: '$2,500',
    unit: 'AUD',
    timeline: '1 week',
    desc: 'One-page site focused on a single offer. Perfect for product launches and lead gen.',
    features: [
      'Single-page design + build',
      'Mobile-responsive',
      'Contact or lead form',
      'Basic SEO setup',
      'Speed optimisation',
      '1 revision round',
    ],
    cta: 'Book This',
    ctaStyle: 'secondary',
  },
  {
    name: 'Landing Page Pro',
    price: '$4,500',
    unit: 'AUD',
    timeline: '2-3 weeks',
    desc: 'High-converting multi-section landing page with animations and integrations.',
    features: [
      'Everything in Lite',
      'Custom scroll animations',
      'CRM integration (HubSpot, etc.)',
      'Analytics and conversion tracking',
      'A/B test-ready structure',
      'CMS for content updates',
      '2 revision rounds',
    ],
    cta: 'Most Popular',
    ctaStyle: 'primary',
    popular: true,
  },
  {
    name: 'Landing + Funnel',
    price: '$6,000',
    unit: 'AUD',
    timeline: '4 weeks',
    desc: 'Full funnel: landing page, thank-you page, email sequence, and retargeting setup.',
    features: [
      'Everything in Pro',
      'Multi-step funnel pages',
      'Email automation workflow',
      'Retargeting pixel setup',
      'Performance dashboard',
      '30 days post-launch support',
      '3 revision rounds',
    ],
    cta: 'Enquire',
    ctaStyle: 'secondary',
  },
]

const websitePackages = [
  {
    name: 'Starter Site',
    price: '$4,500',
    unit: 'AUD',
    timeline: '2 weeks',
    desc: 'Up to 5 pages. Clean, fast, and professional. Ideal for service businesses.',
    features: [
      'Up to 5 custom pages',
      'Mobile-responsive',
      'Contact forms + map',
      'Blog or news section',
      'Basic SEO',
      'Speed optimised',
      '1 revision round',
    ],
    cta: 'Get Started',
    ctaStyle: 'secondary',
  },
  {
    name: 'Business Site',
    price: '$8,000',
    unit: 'AUD',
    timeline: '4 weeks',
    desc: 'Up to 10 pages with custom animations, CMS, and integrations.',
    features: [
      'Everything in Starter',
      'Up to 10 pages',
      'Custom animations',
      'CMS for all content',
      'CRM integration',
      'Analytics dashboard',
      '2 revision rounds',
    ],
    cta: 'Most Popular',
    ctaStyle: 'primary',
    popular: true,
  },
  {
    name: 'Platform Site',
    price: '$15,000',
    unit: 'AUD',
    timeline: '6-8 weeks',
    desc: 'Complex multi-page site with user accounts, dashboards, or custom features.',
    features: [
      'Everything in Business',
      'Unlimited pages',
      'Custom features / portals',
      'User authentication',
      'Database integration',
      'API connections',
      '3 months support',
    ],
    cta: 'Enquire',
    ctaStyle: 'secondary',
  },
]

const arclinkPackages = [
  {
    name: 'Founders',
    price: '$149',
    unit: '/mo',
    timeline: 'Limited - 100 spots',
    desc: 'Your first autonomous agent. Raven command layer, core integrations, and locked-in founder pricing forever.',
    features: [
      'Single agent + ArcLink systems',
      'Raven command layer (Telegram & Discord)',
      'Core integrations (Notion, GitHub, webhooks, APIs)',
      'Basic memory & persistence',
      'Locked-in founder rate forever',
    ],
    cta: 'Claim Founder Price',
    ctaStyle: 'secondary',
  },
  {
    name: 'Sovereign',
    price: '$199',
    unit: '/mo',
    timeline: 'per month',
    desc: 'Full autonomous agent with complete memory and persistence. The standard ArcLink experience.',
    features: [
      'Single agent + ArcLink systems',
      'Raven command layer (Telegram & Discord)',
      'Core integrations (Notion, GitHub, webhooks, APIs)',
      'Full memory & persistence',
    ],
    cta: 'Most Popular',
    ctaStyle: 'primary',
    popular: true,
  },
  {
    name: 'Scale',
    price: '$275',
    unit: '/mo',
    timeline: 'Most Powerful',
    desc: 'Three agents with Federation deployment. Shared Knowledge Vault, Swarm intelligence, and priority support.',
    features: [
      'Three agents + ArcLink systems',
      'Federation Agent Deployment',
      'Agentic Federation: Shared Knowledge Vault',
      'Single Source of Truth + Swarm',
      'Priority provisioning & support',
    ],
    cta: 'Get Started',
    ctaStyle: 'secondary',
  },
]

function PackageCard({ pkg, index }) {
  return (
    <AnimatedSection delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -6 }}
        className={`relative bg-[#111111] border rounded-2xl p-8 h-full flex flex-col ${
          pkg.popular ? 'border-[#FB5005]/30' : 'border-white/[0.06] hover:border-white/[0.12]'
        } transition-all duration-500`}
      >
        {pkg.popular && (
          <span className="absolute -top-px left-1/2 -translate-x-1/2 bg-[#FB5005] text-white text-[0.7rem] font-700 uppercase tracking-[0.08em] px-4 py-1.5 rounded-b-lg">
            Most Popular
          </span>
        )}
        <h3 className="font-[Satoshi] text-[1.1rem] font-600 mb-2">{pkg.name}</h3>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="font-[Satoshi] text-[2.2rem] font-700">{pkg.price}</span>
          <span className="text-[0.9rem] text-[#71717A] font-500">{pkg.unit}</span>
        </div>
        <p className="text-[0.78rem] text-[#71717A] mb-4">{pkg.timeline}</p>
        <p className="text-[0.9rem] text-[#A1A1AA] leading-relaxed mb-6">{pkg.desc}</p>
        <ul className="flex-1 space-y-2.5 mb-8">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[0.85rem] text-[#A1A1AA]">
              <span className="mt-0.5 shrink-0"><Check /></span>
              {f}
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className={`block w-full text-center py-3 rounded-xl text-[0.85rem] font-600 transition-all duration-300 ${
            pkg.ctaStyle === 'primary'
              ? 'bg-[#FB5005] text-white hover:bg-[#E55A1F] hover:shadow-[0_0_20px_rgba(251,80,5,0.2)]'
              : 'border border-white/[0.12] text-[#FAFAFA] hover:border-[#FB5005] hover:text-[#FB5005]'
          }`}
        >
          {pkg.cta}
        </Link>
      </motion.div>
    </AnimatedSection>
  )
}

function PackageSection({ title, subtitle, packages, id }) {
  return (
    <section id={id} className="py-[100px]">
      <div className="max-w-[1100px] mx-auto px-6">
        <AnimatedSection className="mb-14 max-w-[600px]">
          <TextReveal>
            <h2 className="font-[Satoshi] text-[clamp(1.6rem,3.5vw,2.2rem)] font-700 mb-4">
              {title}
            </h2>
          </TextReveal>
          <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed">{subtitle}</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <WebPageSchema
        name="Services - Stellio Creative Labs"
        description="Branding, web design, landing pages, AI integration, and managed services. Clear packages, no hidden extras."
        url="https://stellio.com.au/services"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://stellio.com.au' },
        { name: 'Services', url: 'https://stellio.com.au/services' },
      ]} />
      <ServiceSchema name="Brand Systems" description="Complete visual and verbal identity systems that scale with your business. Logo, typography, guidelines, and launch assets." price="From $3000 AUD" url="https://stellio.com.au/services#branding" />
      <ServiceSchema name="Smart Websites" description="Conversion-focused websites with analytics, AI chat, CRM integrations, and easy CMS editing." price="From $4500 AUD" url="https://stellio.com.au/services#websites" />
      <ServiceSchema name="AI Integration" description="Custom GPTs, chatbots, workflow automation. Private AI that works while you sleep." price="From $2500 AUD" url="https://stellio.com.au/services" />
      <ServiceSchema name="Business OS" description="Custom dashboards, client portals, CRM systems. No more spreadsheet chaos." price="From $8000 AUD" url="https://stellio.com.au/services#websites" />
      <ServiceSchema name="Growth & Automation" description="Email sequences, lead funnels, WhatsApp campaigns, CRM triggers. Set once, convert forever." price="From $2000 AUD" url="https://stellio.com.au/services" />
      <ServiceSchema name="Managed Stack" description="Ongoing care: hosting, SSL, domain, email, monthly updates, analytics reports." price="From $750 AUD/mo" url="https://stellio.com.au/services" />
      {/* Hero */}
      <section className="pt-[140px] pb-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Services</span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                Fix your brand.<br />
                <span className="gradient-text">Build your platform.</span>
              </h1>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] max-w-[600px] mx-auto leading-relaxed">
              Four service categories. Clear packages. No hidden extras. Pick what you need and book in.
            </p>
          </AnimatedSection>

          {/* Quick nav pills */}
          <AnimatedSection delay={0.15} className="mt-10">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Branding', href: '#branding' },
                { label: 'Landing Pages', href: '#landing-pages' },
                { label: 'Websites', href: '#websites' },
                { label: 'ArcLink AI', href: '#arclink' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 rounded-lg border border-white/[0.08] text-[0.82rem] font-500 text-[#A1A1AA] hover:border-[#FB5005] hover:text-[#FB5005] transition-all duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Branding */}
      <PackageSection
        id="branding"
        title="Branding Packages"
        subtitle="Logos that mean something. Guidelines you can actually use. Identity systems that grow with your business."
        packages={brandingPackages}
      />

      {/* Landing Pages */}
      <PackageSection
        id="landing-pages"
        title="Landing Page Design and Build"
        subtitle="Single-focus pages built to convert. Whether you are launching a product or collecting leads, every section has a job."
        packages={landingPagePackages}
      />

      {/* Websites */}
      <PackageSection
        id="websites"
        title="Website Packages"
        subtitle="Multi-page sites that load fast, look sharp, and scale as your business grows. Built with modern tools, no templates."
        packages={websitePackages}
      />

      {/* ArcLink */}
      <section id="arclink" className="py-[100px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="mb-14 max-w-[600px]">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">AI Powered</span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,3.5vw,2.2rem)] font-700 mb-4">
                ArcLink AI Agents
              </h2>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed">
              Autonomous agents that handle research, data movement, status updates, and scheduled tasks. No setup fees. No contracts. Cancel anytime.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {arclinkPackages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>

          <AnimatedSection delay={0.2} className="text-center">
            <Link
              to="/ai-audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-[0.88rem] font-600 text-[#FAFAFA] hover:border-[#FB5005] hover:text-[#FB5005] transition-all duration-300"
            >
              See Full ArcLink Details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[100px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <div className="relative bg-[#111111] border border-white/[0.06] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FB5005]/[0.03] rounded-full blur-[120px] pointer-events-none" />
              <div className="relative z-10 max-w-[600px] mx-auto">
                <TextReveal>
                  <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.6rem)] font-700 mb-4">
                    Not sure what you need?
                  </h2>
                </TextReveal>
                <p className="text-[1.05rem] text-[#A1A1AA] mb-10">
                  Book a free 15-minute discovery call. I will help you figure out the right package for your goals and budget.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)]"
                  >
                    Book Discovery Call
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] text-[#FAFAFA] text-[0.88rem] font-600 hover:border-[#FB5005] hover:text-[#FB5005] transition-all"
                  >
                    Send a Brief
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
