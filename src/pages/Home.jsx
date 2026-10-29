import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import LogoCarousel from '../components/LogoCarousel'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'
import { HomePageSchema, BreadcrumbSchema } from '../components/JsonLd'

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
    desc: 'Custom GPTs, chatbots, workflow automation. Powered by Arclink. Private AI that works while you sleep.',
    price: 'From $2,500',
  },
  {
    icon: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
    title: 'Business OS',
    desc: 'Custom dashboards, client portals, CRM systems. No more spreadsheet chaos.',
    price: 'From $8,000',
  },
  {
    icon: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    title: 'Growth & Automation',
    desc: 'Email sequences, lead funnels, WhatsApp campaigns, CRM triggers. Set once, convert forever.',
    price: 'From $2,000',
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
    name: 'Green Funding',
    tagline: 'Sustainable Energy Finance Specialists',
    desc: 'Custom platform built for installers to generate proposals for clients. Advanced automation, API connections, Supabase and AI analytics.',
    metrics: ['40% less admin', '3x engagement'],
    gradient: 'from-[#1a2e1a] to-[#0f1f0f]',
    image: '/work/logo-greenfunding.png',
  },
  {
    name: 'PropCheck',
    tagline: 'Property Inspection Technology',
    desc: 'Brand, custom dashboard, automated reporting, CRM sync.',
    metrics: ['60% less reporting', '2.5x satisfaction'],
    gradient: 'from-[#1a1a2e] to-[#0f0f1f]',
    image: '/work/logo-propcheck.png',
  },
  {
    name: 'Queensland Carrying',
    tagline: 'Heavy Haulage in Australia',
    desc: 'Custom branding and website build. Custom job request form with advanced automation and AI integration. Custom pricing and distance tooling.',
    metrics: ['200% more jobs', '80% less admin'],
    gradient: 'from-[#2e1a1a] to-[#1f0f0f]',
    image: '/work/logo-qldcarrying.png',
  },
  {
    name: 'Southside Catering',
    tagline: 'E-Commerce Webdesign Redesign',
    desc: 'Landing page redesign, brand refresh. Modern e-commerce experience with a fresh visual identity.',
    metrics: ['Brand refresh', 'Redesigned UX'],
    gradient: 'from-[#2e1a2e] to-[#1f0f1f]',
    image: '/work/logo-southside.png',
  },
]

const processSteps = [
  { num: '01', title: 'Discover', desc: 'We dig into your goals, audience, and pain points. No assumptions. Just clarity.' },
  { num: '02', title: 'Design', desc: 'Rapid prototyping with AI-powered workflows and your constant feedback loop.' },
  { num: '03', title: 'Build', desc: 'Custom development with modern frameworks. Performance, security, scale.' },
  { num: '04', title: 'Automate', desc: 'Arclink AI agents, automations, and systems that work while you sleep.' },
]

const testimonials = [
  { text: "Refreshing working with Stellio. The AI integration was seamless, and the branding elevated how we're perceived.", name: 'Tim Bourassa', role: 'Founder, RevBoco', initials: 'TB' },
  { text: 'Quality results delivered fast. Stellio does not just design. He thinks about the entire user journey.', name: 'Vass Stammes', role: 'Director, PropCheck', initials: 'VS' },
  { text: 'Amazing experience, quick turnaround. The AI features have been a game-changer. 100% recommendation.', name: 'Will Engelbrecht', role: 'Founder, Gel Paints Australia', initials: 'WE' },
  { text: 'From logo to full platform in 6 weeks. The automated reporting alone was worth the investment.', name: 'Sarah K.', role: 'COO, HauOS', initials: 'SK' },
  { text: 'Great customer service and creative output. Stellio turned our vague brief into a brand system we use every day.', name: 'Isabella Henny', role: 'President, Macuace Football', initials: 'IH' },
  { text: 'Stellio is different. He actually delivers on what he promises, on time, with real results.', name: 'Rob J.', role: 'Director, BLNDL', initials: 'RJ' },
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
      <HomePageSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://stellio.com.au' }]} />
      <Hero />

      {/* ========== CLAUDE WORKSHOP COMING SOON ========== */}
      <section id="claude-workshop" className="py-[100px] relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FB5005]/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-14 max-w-[700px] mx-auto">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
              Coming Soon
            </span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.8rem)] font-700 leading-[1.1] mb-5">
                The Claude Workshop
              </h2>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed">
              A live, hands-on workshop where we build your business's AI system with you, on the call. No fluff. No theory. Just real systems, working, by the time you leave.
            </p>
          </AnimatedSection>

          {/* What you'll learn grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                ),
                title: 'Teach Claude your voice',
                desc: 'Train Claude on your brand tone, writing style, and playbooks so every output sounds like you wrote it.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                ),
                title: 'Build working automations',
                desc: 'Set up real workflows that handle research, content, client comms, and ops while you focus on growth.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: 'Roll it out to your team',
                desc: 'Get a 30-day implementation plan so your whole team adopts AI confidently, with guardrails that keep data safe.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} className="bg-[#111111] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#FB5005]/10 border border-[#FB5005]/20 flex items-center justify-center text-[#FB5005] mb-5">
                  {item.icon}
                </div>
                <h3 className="text-[1rem] font-700 mb-2">{item.title}</h3>
                <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed">{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>

          {/* More topics covered */}
          <AnimatedSection className="text-center mb-10">
            <div className="flex flex-wrap gap-2 justify-center max-w-[700px] mx-auto">
              {[
                'Business AI audit',
                'Prompting that works',
                'Research you can trust',
                'Digital filing cabinet',
                'Connectors & data',
                'Skills & playbooks',
                '30-day rollout plan',
              ].map((tag) => (
                <span key={tag} className="text-[0.75rem] font-600 text-[#A1A1AA] bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="text-center">
            <p className="text-[0.92rem] text-[#71717A] mb-5">The next cohort is coming. Secure your spot on the waitlist.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://waitlist.ai.stellio.com.au"
                target="_blank"
                rel="noopener"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)]"
              >
                Join the waitlist
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section id="services" className="py-[120px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="mb-20 max-w-[600px]">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
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
                  <div className="w-12 h-12 rounded-xl bg-[#FB5005]/[0.08] border border-[#FB5005]/[0.15] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#FB5005]/[0.15] group-hover:border-[#FB5005]/30">
                    <svg className="w-5 h-5 text-[#FB5005]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.icon }} />
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
            <Link to="/services" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.12] text-[0.85rem] font-600 text-[#FAFAFA] hover:border-[#FB5005] hover:text-[#FB5005] transition-all duration-300">
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
              <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Our Work</span>
              <TextReveal>
                <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.8rem)] font-700 leading-[1.1]">
                  Real results.<br /><span className="gradient-text">Real businesses.</span>
                </h2>
              </TextReveal>
            </div>
            <Link to="/work" className="px-5 py-2.5 rounded-lg border border-white/[0.12] text-[0.85rem] font-600 text-[#FAFAFA] hover:border-[#FB5005] hover:text-[#FB5005] transition-all duration-300 mb-1">
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
                  <div className="h-[180px] relative overflow-hidden bg-[#0E0E0E] flex items-center justify-center p-10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-60`} />
                    {p.image && (
                      <img src={p.image} alt={p.name} loading="lazy" className="relative max-h-full max-w-[75%] object-contain group-hover:scale-[1.05] transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-[Satoshi] text-[1.1rem] font-600 mb-1">{p.name}</h3>
                    <p className="text-[0.78rem] text-[#71717A] mb-3">{p.tagline}</p>
                    <p className="text-[0.88rem] text-[#A1A1AA] mb-4 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.metrics.map(m => (
                        <span key={m} className="text-[0.72rem] font-600 text-[#FB5005] bg-[#FB5005]/[0.08] px-2.5 py-1 rounded-md">
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

      {/* ========== APPS BUILT BY STELLIO ========== */}
      <section className="py-[100px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="mb-10 max-w-[600px]">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
              Apps Built By Stellio
            </span>
            <h2 className="font-[Satoshi] text-[clamp(1.6rem,3vw,2.2rem)] font-700 leading-[1.15] mb-3">
              Tools I build and tools I use daily to increase my productivity.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Logo Parcel */}
            <AnimatedSection delay={0}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group bg-[#111111] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-all duration-500 h-full flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <img
                    src="/apps/logo-parcel.png"
                    alt="Logo Parcel app icon"
                    className="w-14 h-14 rounded-xl shadow-lg"
                  />
                  <span className="text-[0.68rem] font-600 uppercase tracking-wider text-[#71717A] bg-white/[0.04] border border-white/[0.06] px-2 py-1 rounded-md">
                    Free & Open Source
                  </span>
                </div>
                <h3 className="font-[Satoshi] text-[1.05rem] font-700 mb-1.5">Logo Parcel</h3>
                <p className="text-[0.78rem] text-[#FB5005] mb-3">macOS app - Apple silicon, macOS 13+</p>
                <p className="text-[0.86rem] text-[#A1A1AA] leading-relaxed mb-5 flex-1">
                  Turns finished logo artwork into a client-ready package: formats, colour modes, organised files and an HTML delivery guide. Exports SVG, PNG, JPG, PDF, EPS and AI. Everything stays on your Mac.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  <a
                    href="https://github.com/stellienft/logo-parcel/releases/tag/v0.5.1-beta.1"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-600 text-[#FB5005] hover:text-[#E55A1F] transition-colors"
                  >
                    Download beta
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
                  </a>
                  <a
                    href="https://github.com/stellienft/logo-parcel"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-600 text-[#71717A] hover:text-[#FAFAFA] transition-colors"
                  >
                    Source on GitHub
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
                  </a>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Bijou Agent */}
            <AnimatedSection delay={0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group bg-[#111111] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-all duration-500 h-full flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <img
                    src="/apps/bijou.png"
                    alt="Bijou Agent app icon"
                    className="w-14 h-14 rounded-xl shadow-lg"
                  />
                  <span className="text-[0.68rem] font-600 uppercase tracking-wider text-[#71717A] bg-white/[0.04] border border-white/[0.06] px-2 py-1 rounded-md">
                    AI Agent Platform
                  </span>
                </div>
                <h3 className="font-[Satoshi] text-[1.05rem] font-700 mb-1.5">Bijou Agent</h3>
                <p className="text-[0.78rem] text-[#FB5005] mb-3">Build your own agent team</p>
                <p className="text-[0.86rem] text-[#A1A1AA] leading-relaxed mb-5 flex-1">
                  Build your own team of AI agents. Give each one a name, a colour and a job: they research, write, plan and get things done, on your phone or computer.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  <a
                    href="https://bijouagent.xyz"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-600 text-[#FB5005] hover:text-[#E55A1F] transition-colors"
                  >
                    Visit Bijou Agent
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
                  </a>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Ares Fitness */}
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group bg-[#111111] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-all duration-500 h-full flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <img
                    src="/apps/ares.png"
                    alt="Ares Fitness app icon"
                    className="w-14 h-14 rounded-xl shadow-lg"
                  />
                  <span className="text-[0.68rem] font-600 uppercase tracking-wider text-[#71717A] bg-white/[0.04] border border-white/[0.06] px-2 py-1 rounded-md">
                    AI Fitness App
                  </span>
                </div>
                <h3 className="font-[Satoshi] text-[1.05rem] font-700 mb-1.5">Ares Fitness</h3>
                <p className="text-[0.78rem] text-[#FB5005] mb-3">AI strength coach for iPhone</p>
                <p className="text-[0.86rem] text-[#A1A1AA] leading-relaxed mb-5 flex-1">
                  Adaptive training programs, set-by-set logging, AI coaching, meal plans and progress tracking. Built end to end for iPhone. Coming soon to iOS.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  <a
                    href="https://aresfitness.xyz"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-600 text-[#FB5005] hover:text-[#E55A1F] transition-colors"
                  >
                    Visit aresfitness.xyz
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
                  </a>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Hippius */}
            <AnimatedSection delay={0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group bg-[#111111] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-all duration-500 h-full flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <img
                    src="/apps/hippius.png"
                    alt="Hippius logo"
                    className="w-14 h-14 rounded-xl shadow-lg"
                  />
                  <span className="text-[0.68rem] font-600 uppercase tracking-wider text-[#71717A] bg-white/[0.04] border border-white/[0.06] px-2 py-1 rounded-md">
                    Referral Link
                  </span>
                </div>
                <h3 className="font-[Satoshi] text-[1.05rem] font-700 mb-1.5">Hippius</h3>
                <p className="text-[0.78rem] text-[#FB5005] mb-3">Decentralised cloud storage</p>
                <p className="text-[0.86rem] text-[#A1A1AA] leading-relaxed mb-5 flex-1">
                  S3-compatible storage on a blockchain-backed network - fast, self-healing and pay-per-use with everything recorded on-chain. What I use for decentralised file storage and backups.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  <a
                    href="https://console.hippius.com/login?ref=HIPPIUS17148345132862070510&src=stellio-website-9facc157"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-600 text-[#FB5005] hover:text-[#E55A1F] transition-colors"
                  >
                    Try Hippius
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
                  </a>
                  <a
                    href="https://hippius.com"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-600 text-[#71717A] hover:text-[#FAFAFA] transition-colors"
                  >
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
                  </a>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* SayGM */}
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group bg-[#111111] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.12] transition-all duration-500 h-full flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <img
                    src="/apps/saygm.png"
                    alt="SayGM logo"
                    className="w-14 h-14 rounded-xl shadow-lg"
                  />
                  <span className="text-[0.68rem] font-600 uppercase tracking-wider text-[#71717A] bg-white/[0.04] border border-white/[0.06] px-2 py-1 rounded-md">
                    Referral Link
                  </span>
                </div>
                <h3 className="font-[Satoshi] text-[1.05rem] font-700 mb-1.5">SayGM</h3>
                <p className="text-[0.78rem] text-[#FB5005] mb-3">AI models below list price</p>
                <p className="text-[0.86rem] text-[#A1A1AA] leading-relaxed mb-5 flex-1">
                  An LLM gateway for Claude, GPT, Gemini and open models - up to 70% cheaper than list price, sealed in a verifiable enclave. One base URL works with Cursor, Claude Code and the AI SDK. Where I route my AI workloads.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  <a
                    href="https://saygm.com/r/e9lbieta"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-600 text-[#FB5005] hover:text-[#E55A1F] transition-colors"
                  >
                    Try SayGM
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
                  </a>
                  <a
                    href="https://saygm.com"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-600 text-[#71717A] hover:text-[#FAFAFA] transition-colors"
                  >
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
                  </a>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Placeholder for future apps */}
            <AnimatedSection delay={0.08}>
              <div className="bg-[#0E0E0E] border border-dashed border-white/[0.08] rounded-2xl p-7 h-full flex flex-col items-center justify-center text-center min-h-[260px]">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4 text-[#71717A]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <p className="text-[0.88rem] font-600 text-[#71717A] mb-1">More in the works</p>
                <p className="text-[0.78rem] text-[#71717A]/70">Small tools I build for myself usually end up here.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="py-[120px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="text-center mb-20 max-w-[600px] mx-auto">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">How It Works</span>
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
                  <span className="relative font-[Satoshi] text-[0.85rem] font-700 text-[#FB5005] mb-4 block">{step.num}</span>
                  <h3 className="relative font-[Satoshi] text-[1.1rem] font-600 mb-3">{step.title}</h3>
                  <p className="relative text-[0.88rem] text-[#A1A1AA] leading-relaxed">{step.desc}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#FB5005] to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out" />
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
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Testimonials</span>
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
                    <div className="w-9 h-9 rounded-full bg-[#0A0A0A] border border-white/[0.08] flex items-center justify-center text-[0.72rem] font-700 text-[#FB5005]">
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FB5005]/[0.03] rounded-full blur-[120px] pointer-events-none" />
              
              <div className="relative z-10 max-w-[600px] mx-auto">
                <TextReveal>
                  <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.6rem)] font-700 mb-4">
                    Ready to build your<br className="hidden md:inline" />{' '}
                    <span className="gradient-text">Business OS?</span>
                  </h2>
                </TextReveal>
                <p className="text-[1.05rem] text-[#A1A1AA] mb-10">
                  Book a free 15-minute discovery call. No pressure, no pitch, just clarity.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)]">
                    <span className="relative z-10">Book Discovery Call</span>
                    <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link to="/ai-audit" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] text-[#FAFAFA] text-[0.88rem] font-600 hover:border-[#FB5005] hover:text-[#FB5005] transition-all">
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
