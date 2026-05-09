import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'

const services = [
  {
    icon: '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.01 17.461 2 12 2z"/>',
    title: 'Brand Systems',
    desc: 'More than a logo. Complete visual and verbal identity systems that scale with you.',
    price: 'From $3,000',
  },
  {
    icon: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    title: 'Smart Websites',
    desc: 'Conversion-focused websites with analytics, AI chat, CRM integrations, and easy CMS editing.',
    price: 'From $4,500',
  },
  {
    icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M9 2v2M9 20v2M20 9h2M2 9h2M20 15h2M2 15h2"/>',
    title: 'AI Integration',
    desc: 'Custom GPTs, chatbots, workflow automation. Powered by Arclink — private AI that works while you sleep.',
    price: 'From $2,500',
  },
  {
    icon: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
    title: 'Business OS',
    desc: 'Custom dashboards, client portals, CRM systems. No more spreadsheet chaos.',
    price: 'From $8,000',
  },
  {
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 12 15 16 10"/>',
    title: 'Managed Stack',
    desc: 'Ongoing care: hosting, SSL, domain, email, monthly updates, analytics reports.',
    price: 'From $750/mo',
  },
]

const projects = [
  {
    name: 'greenfunding',
    tagline: 'Green-Tech Funding Platform',
    desc: 'Full brand and custom investor portal. React + Supabase + AI search.',
    metrics: ['40% less admin time', '3x engagement'],
    gradient: 'from-[#1a2e1a] to-[#0f1f0f]',
  },
  {
    name: 'PropCheck',
    tagline: 'Property Inspection Technology',
    desc: 'Brand, custom dashboard, automated reporting, CRM sync.',
    metrics: ['60% less reporting', '2.5x satisfaction'],
    gradient: 'from-[#1a1a2e] to-[#0f0f1f]',
  },
  {
    name: 'Macuace Football',
    tagline: 'Grassroots Football Community',
    desc: 'Complete rebrand: logo, kit design, social templates, event platform.',
    metrics: ['200% engagement', '30% less admin'],
    gradient: 'from-[#2e1a1a] to-[#1f0f0f]',
  },
  {
    name: 'Gel Paints',
    tagline: 'E-Commerce Nail Supply',
    desc: 'Shopify customisation, automated inventory alerts, AI chatbot.',
    metrics: ['50% conversion', '80% fewer stock-outs'],
    gradient: 'from-[#2e1a2e] to-[#1f0f1f]',
  },
]

const processSteps = [
  { num: '01', title: 'Discover', desc: 'We dig into your goals, audience, and pain points. No assumptions — just clarity.' },
  { num: '02', title: 'Design', desc: 'Rapid prototyping with AI-powered workflows and your constant feedback loop.' },
  { num: '03', title: 'Build', desc: 'Custom development with modern frameworks. Performance, security, scale.' },
  { num: '04', title: 'Automate', desc: 'Arclink AI agents, automations, and systems that work while you sleep.' },
]

const testimonials = [
  { text: "Refreshing working with Stellio. The AI integration was seamless, and the branding elevated how we're perceived.", name: 'Tim Bourassa', role: 'Founder, RevBoco', initials: 'TB' },
  { text: 'Quality results delivered fast. Stellio does not just design — he thinks about the entire user journey.', name: 'Vass Stammes', role: 'Director, PropCheck', initials: 'VS' },
  { text: 'Amazing experience, quick turnaround. The AI features have been a game-changer. 100% recommendation.', name: 'Will Engelbrecht', role: 'Founder, Gel Paints Australia', initials: 'WE' },
  { text: 'From logo to full platform in 6 weeks. The automated reporting alone was worth the investment.', name: 'Sarah K.', role: 'COO, HauOS', initials: 'SK' },
  { text: 'Great customer service and creative output. Stellio turned our vague brief into a brand system we use every day.', name: 'Isabella Henny', role: 'President, Macuace Football', initials: 'IH' },
  { text: 'Stellio is different — he actually delivers on what he promises, on time, with real results.', name: 'Rob J.', role: 'Director, BLNDL', initials: 'RJ' },
]

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* ========== SERVICES ========== */}
      <section id="services" className="py-[120px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="mb-20 max-w-[600px]">
            <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
              What I Do
            </span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.8rem)] font-700 leading-[1.1] mb-5">
                From brand to bot.<br />
                <span className="gradient-text">Everything in between.</span>
              </h2>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed">
              Most agencies design things. I design, build, and automate the systems that make your business run.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group bg-[#111111] border border-white/[0.06] rounded-2xl p-8 card-shine hover:border-white/[0.12] transition-colors duration-500 h-full flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B2C]/[0.08] border border-[#FF6B2C]/[0.15] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#FF6B2C]/[0.15] group-hover:border-[#FF6B2C]/30">
                    <svg className="w-5 h-5 text-[#FF6B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.icon }} />
                  </div>
                  <h3 className="font-[Satoshi] text-[1.1rem] font-600 mb-3">{s.title}</h3>
                  <p className="text-[0.9rem] text-[#A1A1AA] leading-relaxed mb-5 flex-1">{s.desc}</p>
                  <span className="inline-block text-[0.78rem] font-600 text-[#71717A] bg-[#0A0A0A] px-3 py-1.5 rounded-md border border-white/[0.06] w-fit">
                    {s.price}
                  </span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/pricing" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.12] text-[0.85rem] font-600 text-[#FAFAFA] hover:border-[#FF6B2C] hover:text-[#FF6B2C] transition-all duration-300">
              See Full Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ========== WORK ========== */}
      <section className="py-[120px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="flex flex-wrap items-end justify-between gap-4 mb-16">
            <div>
              <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Our Work</span>
              <TextReveal>
                <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.8rem)] font-700 leading-[1.1]">
                  Real results.<br /><span className="gradient-text">Real businesses.</span>
                </h2>
              </TextReveal>
            </div>
            <Link to="/work" className="px-5 py-2.5 rounded-lg border border-white/[0.12] text-[0.85rem] font-600 text-[#FAFAFA] hover:border-[#FF6B2C] hover:text-[#FF6B2C] transition-all duration-300 mb-1">
              View All
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-500"
                >
                  <div className={`h-[200px] bg-gradient-to-br ${p.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.03)%22%20stroke-width%3D%221%22%3E%3Cpath%20d%3D%22M0%2060L60%200M-15%2015L15%20-15M45%2075L75%2045%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
                    <span className="font-[Satoshi] text-[2rem] font-700 text-white/10 tracking-tight">{p.name}</span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-[Satoshi] text-[1.1rem] font-600 mb-1">{p.name}</h3>
                    <p className="text-[0.78rem] text-[#71717A] mb-3">{p.tagline}</p>
                    <p className="text-[0.88rem] text-[#A1A1AA] mb-4 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.metrics.map(m => (
                        <span key={m} className="text-[0.72rem] font-600 text-[#FF6B2C] bg-[#FF6B2C]/[0.08] px-2.5 py-1 rounded-md">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="py-[120px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="text-center mb-20 max-w-[600px] mx-auto">
            <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">How It Works</span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.8rem)] font-700 leading-[1.1]">
                Simple process.<br /><span className="gradient-text">Powerful outcomes.</span>
              </h2>
            </TextReveal>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.1}>
                <div className="relative bg-[#111111] border border-white/[0.06] rounded-2xl p-8 overflow-hidden group hover:border-white/[0.12] transition-all duration-500">
                  <span className="absolute top-3 right-4 font-[Satoshi] text-[4.5rem] font-900 text-white/[0.02] leading-none select-none">
                    {step.num}
                  </span>
                  <span className="relative font-[Satoshi] text-[0.85rem] font-700 text-[#FF6B2C] mb-4 block">{step.num}</span>
                  <h3 className="relative font-[Satoshi] text-[1.1rem] font-600 mb-3">{step.title}</h3>
                  <p className="relative text-[0.88rem] text-[#A1A1AA] leading-relaxed">{step.desc}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#FF6B2C] to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-[120px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="text-center mb-20 max-w-[600px] mx-auto">
            <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Testimonials</span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.8rem)] font-700 leading-[1.1]">
                Don't take my word for it.
              </h2>
            </TextReveal>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-[#111111] border border-white/[0.06] rounded-2xl p-7 h-full flex flex-col hover:border-white/[0.1] transition-colors duration-300"
                >
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => <Star key={j} />)}
                  </div>
                  <p className="text-[0.92rem] text-[#A1A1AA] leading-relaxed mb-6 flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0A0A0A] border border-white/[0.08] flex items-center justify-center text-[0.72rem] font-700 text-[#FF6B2C]">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="text-[0.88rem] font-600">{t.name}</h4>
                      <span className="text-[0.78rem] text-[#71717A]">{t.role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-[100px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <div className="relative bg-[#0E0E0E] border border-white/[0.06] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B2C]/[0.03] rounded-full blur-[120px] pointer-events-none" />
              
              <div className="relative z-10 max-w-[600px] mx-auto">
                <TextReveal>
                  <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.6rem)] font-700 mb-4">
                    Ready to build your{' '}
                    <span className="gradient-text">Business OS?</span>
                  </h2>
                </TextReveal>
                <p className="text-[1.05rem] text-[#A1A1AA] mb-10">
                  Book a free 15-minute discovery call. No pressure, no pitch, just clarity.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF6B2C] text-white text-[0.88rem] font-600 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,107,44,0.25)]">
                    <span className="relative z-10">Book Discovery Call</span>
                    <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] text-[#FAFAFA] text-[0.88rem] font-600 hover:border-[#FF6B2C] hover:text-[#FF6B2C] transition-all">
                    Get Free AI Audit
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
