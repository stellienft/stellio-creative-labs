import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import AnimatedSection from '../components/AnimatedSection'
import { Em, SecHead, SecTag, BtnPrimary, BtnGhost, Card, IconChip } from '../components/ui'
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
    tag: 'Platform Build',
    desc: 'Custom platform for installers to generate proposals. Advanced automation, API connections, Supabase and AI analytics.',
    metrics: ['40% less admin', '3x engagement'],
    image: '/client-logos/logo-greenfunding.png',
  },
  {
    name: 'PropCheck',
    tag: 'Dashboard + Automation',
    desc: 'Brand, custom dashboard, automated reporting, CRM sync.',
    metrics: ['60% less reporting', '2.5x satisfaction'],
    image: '/client-logos/logo-propcheck.png',
  },
  {
    name: 'Queensland Carrying',
    tag: 'Brand + Website',
    desc: 'Custom branding and website build. Job request form with advanced automation and AI integration.',
    metrics: ['200% more jobs', '80% less admin'],
    image: '/client-logos/logo-qldcarrying.png',
  },
  {
    name: 'Southside Catering',
    tag: 'E-commerce Refresh',
    desc: 'Landing page redesign, brand refresh. Modern e-commerce experience with a fresh visual identity.',
    metrics: ['5.0 on Google'],
    image: '/client-logos/logo-southside.png',
  },
]

const apps = [
  {
    icon: '/apps/logo-parcel.png',
    name: 'Logo Parcel',
    badge: 'Free macOS app',
    tagline: 'Logo packaging, automated',
    desc: 'Turns finished logo artwork into a client-ready package: formats, colour modes, organised files and a delivery guide. Exports SVG, PNG, JPG, PDF, EPS and AI.',
    links: [
      { label: 'Download beta', href: 'https://github.com/stellienft/logo-parcel/releases/tag/v0.5.1-beta.1', primary: true },
      { label: 'Source on GitHub', href: 'https://github.com/stellienft/logo-parcel' },
    ],
  },
  {
    icon: '/apps/bijou.png',
    name: 'Bijou Agent',
    badge: 'AI Agent Platform',
    tagline: 'Build your own agent team',
    desc: 'Give each agent a name, a colour and a job: they research, write, plan and get things done, on your phone or computer.',
    links: [{ label: 'Visit Bijou Agent', href: 'https://bijouagent.xyz', primary: true }],
  },
  {
    icon: '/apps/ares.png',
    name: 'Ares Fitness',
    badge: 'iOS - Coming Soon',
    tagline: 'AI strength coach for iPhone',
    desc: 'Adaptive training programs, set-by-set logging, AI coaching, meal plans and progress tracking. Built end to end for iPhone.',
    links: [{ label: 'Visit aresfitness.xyz', href: 'https://aresfitness.xyz', primary: true }],
  },
  {
    icon: '/apps/hippius.png',
    name: 'Hippius',
    badge: 'Referral',
    tagline: 'Decentralised cloud storage',
    desc: 'S3-compatible storage on a blockchain-backed network. Fast, self-healing and pay-per-use. What I use for backups.',
    links: [
      { label: 'Try Hippius', href: 'https://console.hippius.com/login?ref=HIPPIUS17148345132862070510&src=stellio-website-9facc157', primary: true },
      { label: 'Learn more', href: 'https://hippius.com' },
    ],
  },
  {
    icon: '/apps/saygm.png',
    name: 'SayGM',
    badge: 'Referral',
    tagline: 'AI models below list price',
    desc: 'An LLM gateway for Claude, GPT, Gemini and open models. Up to 70% cheaper, sealed in a verifiable enclave. Where I route my AI workloads.',
    links: [
      { label: 'Try SayGM', href: 'https://saygm.com/r/e9lbieta', primary: true },
      { label: 'Learn more', href: 'https://saygm.com' },
    ],
  },
]

const workshopSteps = [
  { num: '01', title: 'Teach Claude your voice', desc: 'Train Claude on your brand tone, writing style, and playbooks so every output sounds like you wrote it.' },
  { num: '02', title: 'Build working automations', desc: 'Set up real workflows that handle research, content, client comms, and ops while you focus on growth.' },
  { num: '03', title: 'Roll it out to your team', desc: 'Get a 30-day implementation plan so your whole team adopts AI confidently, with guardrails that keep data safe.' },
]

const processSteps = [
  { num: '01', title: 'Discover', desc: 'A free call to map your goals, your market, and what the system needs to do.' },
  { num: '02', title: 'Design', desc: 'Identity, interface and messaging designed around conversion, not decoration.' },
  { num: '03', title: 'Build', desc: 'Fast, clean builds on a modern stack. You see progress every week.' },
  { num: '04', title: 'Automate', desc: 'AI and integrations wired in so the system keeps working after launch.' },
]

const testimonials = [
  { text: "Refreshing working with Stellio. The AI integration was seamless, and the branding elevated how we're perceived.", name: 'Tim Bourassa', role: 'Founder, RevBoco', initials: 'TB' },
  { text: 'Quality results delivered fast. Stellio does not just design. He thinks about the entire user journey.', name: 'Vass Stammes', role: 'Director, PropCheck', initials: 'VS' },
  { text: 'Amazing experience, quick turnaround. The AI features have been a game-changer. 100% recommendation.', name: 'Will Engelbrecht', role: 'Founder, Gel Paints Australia', initials: 'WE' },
  { text: 'From logo to full platform in 6 weeks. The automated reporting alone was worth the investment.', name: 'Sarah K.', role: 'COO, HauOS', initials: 'SK' },
  { text: 'Great customer service and creative output. Stellio turned our vague brief into a brand system we use every day.', name: 'Isabella Henny', role: 'President, Macuace Football', initials: 'IH' },
  { text: 'Stellio is different. He actually delivers on what he promises, on time, with real results.', name: 'Rob J.', role: 'Director, BLNDL', initials: 'RJ' },
]

const arrowIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
)

export default function Home() {
  return (
    <>
      <HomePageSchema />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://stellio.com.au' }]} />
      <Hero />

      {/* ========== CLAUDE WORKSHOP ========== */}
      <section id="claude-workshop" className="py-[90px] bg-gradient-to-b from-[#0E0E0E] to-[#0A0A0A] border-y border-white/[0.07]">
        <div className="max-w-[1160px] mx-auto px-6">
          <AnimatedSection>
            <div className="border border-[#FB5005]/25 rounded-3xl p-8 md:p-11 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center bg-[radial-gradient(120%_140%_at_20%_0%,rgba(251,80,5,0.09),transparent_55%)] bg-[#111111]">
              <div>
                <SecTag>The Claude Workshop</SecTag>
                <h2 className="font-[Satoshi] font-900 text-[clamp(2rem,4vw,2.9rem)] leading-[1.06] tracking-[-0.035em] mt-4">
                  Your business, <Em>running on AI.</Em>
                </h2>
                <p className="mt-4 text-[0.97rem] leading-[1.65] text-[#A1A1AA]">
                  A live, hands-on workshop where we build your business's AI system with you, on the call. No fluff. No theory. Just real systems, working, by the time you leave.
                </p>
                <div className="mt-7">
                  <BtnPrimary href="https://waitlist.ai.stellio.com.au" target="_blank" rel="noopener">Join the Waitlist</BtnPrimary>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {workshopSteps.map((s) => (
                  <div key={s.num} className="flex gap-4 p-4 border border-white/[0.07] rounded-[14px] bg-white/[0.02]">
                    <span className="font-[Playfair_Display] italic text-[#FB5005] text-[1.25rem] w-7 shrink-0 leading-snug">{s.num}</span>
                    <div>
                      <h4 className="font-[Satoshi] text-[0.97rem] font-700">{s.title}</h4>
                      <p className="text-[0.82rem] text-[#A1A1AA] mt-1 leading-[1.55]">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section id="services" className="py-[110px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <AnimatedSection>
            <SecHead
              tag="Services"
              title={<>From brand to bot. <Em>Everything in between.</Em></>}
              sub="Most agencies design things. I design, build, and automate the systems that make your business run."
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.06}>
                <Card className="p-7 h-full flex flex-col">
                  <IconChip>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.icon }} />
                  </IconChip>
                  <h3 className="font-[Satoshi] text-[1.15rem] font-700 tracking-[-0.015em]">{s.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-[1.6] text-[#A1A1AA] flex-1">{s.desc}</p>
                  <span className="mt-5 inline-block text-[0.78rem] font-600 text-[#FB5005] bg-[#FB5005]/[0.08] px-3 py-1.5 rounded-md border border-[#FB5005]/[0.2] w-fit">
                    {s.price}
                  </span>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-12 text-center">
            <BtnGhost to="/services">See Full Pricing</BtnGhost>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== WORK ========== */}
      <section className="pb-[110px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <AnimatedSection className="flex flex-wrap items-end justify-between gap-4">
            <SecHead
              tag="Our Work"
              title={<>Real results. <Em>Real businesses.</Em></>}
              className="mb-0"
            />
            <Link to="/work" className="mb-2 px-5 py-2.5 rounded-xl border border-white/[0.14] text-[0.85rem] font-600 text-[#FAFAFA] hover:border-white/30 transition-all">
              View All Work
            </Link>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
            {projects.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.08}>
                <Card className="overflow-hidden h-full group">
                  <div className="relative h-[150px] flex items-end p-6 border-b border-white/[0.07] bg-[radial-gradient(130%_120%_at_80%_0%,rgba(251,80,5,0.10),transparent_60%)] bg-gradient-to-br from-[#141414] to-[#0D0D0D] overflow-hidden">
                    <span className="absolute -top-3 right-4 font-[Playfair_Display] italic text-[5.5rem] leading-none text-white/[0.08] select-none group-hover:text-[#FB5005]/[0.14] transition-colors duration-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="text-[0.68rem] font-600 text-[#FB5005] uppercase tracking-[0.1em] mb-2.5">{p.tag}</div>
                      <div className="font-[Satoshi] font-900 text-[1.7rem] tracking-[-0.03em] leading-none">
                        {p.metrics[0]}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-[Satoshi] text-[1.12rem] font-700 tracking-[-0.015em]">{p.name}</h3>
                    <p className="mt-2 text-[0.86rem] leading-[1.6] text-[#A1A1AA]">{p.desc}</p>
                    {p.metrics.length > 1 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-5">
                        {p.metrics.slice(1).map(m => (
                          <span key={m} className="text-[0.75rem] font-600 text-[#4ADE80] bg-[#22C55E]/[0.09] border border-[#22C55E]/[0.18] px-3 py-1 rounded-full">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== APPS GRID ========== */}
      <section className="pb-[110px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <AnimatedSection>
            <SecHead
              tag="Apps Built By Stellio"
              title={<>Tools I build. <Em>Tools I use daily.</Em></>}
              sub="Small products and platforms that make me faster. Some free, some client-grade, all built in-house."
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((a, i) => (
              <AnimatedSection key={a.name} delay={i * 0.06}>
                <Card className="p-7 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <img src={a.icon} alt={`${a.name} icon`} loading="lazy" className="w-[46px] h-[46px] rounded-[13px] shadow-lg" />
                    <span className="text-[0.66rem] font-600 uppercase tracking-[0.08em] text-[#71717A] bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-full">
                      {a.badge}
                    </span>
                  </div>
                  <h3 className="font-[Satoshi] text-[1.1rem] font-700 tracking-[-0.015em]">{a.name}</h3>
                  <p className="text-[0.8rem] text-[#FB5005] font-500 mt-0.5">{a.tagline}</p>
                  <p className="mt-2.5 text-[0.86rem] leading-[1.6] text-[#A1A1AA] flex-1">{a.desc}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4 mt-4 border-t border-white/[0.06]">
                    {a.links.map(l => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener"
                        className={`inline-flex items-center gap-1.5 text-[0.8rem] font-600 transition-colors ${l.primary ? 'text-[#FB5005] hover:text-[#E5470A]' : 'text-[#71717A] hover:text-[#FAFAFA]'}`}>
                        {l.label} {arrowIcon}
                      </a>
                    ))}
                  </div>
                </Card>
              </AnimatedSection>
            ))}
            {/* Placeholder */}
            <AnimatedSection delay={0.1}>
              <div className="bg-[#0E0E0E] border border-dashed border-white/[0.08] rounded-[18px] p-7 h-full flex flex-col items-center justify-center text-center min-h-[260px]">
                <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center mb-4 text-[#71717A]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <p className="text-[0.88rem] font-600 text-[#71717A] mb-1">More in the works</p>
                <p className="text-[0.78rem] text-[#71717A]/70">Small tools I build for myself usually end up here.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="pb-[110px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <AnimatedSection>
            <SecHead
              tag="Process"
              title={<>Simple process. <Em>Powerful outcomes.</Em></>}
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.08}>
                <div className="relative pl-6 py-2 border-l-2 border-white/[0.07]">
                  <span className="absolute -left-[2px] top-2 w-[2px] h-[34px] bg-[#FB5005]" />
                  <span className="font-[Playfair_Display] italic text-[#FB5005] text-[2.5rem] leading-none">{step.num}</span>
                  <h3 className="font-[Satoshi] text-[1.15rem] font-700 mt-3.5 tracking-[-0.015em]">{step.title}</h3>
                  <p className="text-[0.85rem] text-[#A1A1AA] leading-[1.6] mt-2">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="pb-[110px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <AnimatedSection>
            <SecHead
              tag="Testimonials"
              title={<>Don't take <Em>my word for it.</Em></>}
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.05}>
                <Card className="p-7 h-full flex flex-col">
                  <div className="text-[#FB5005] tracking-[3px] text-[0.82rem] mb-4">★★★★★</div>
                  <p className="text-[0.92rem] leading-[1.7] text-[#FAFAFA] flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 mt-5">
                    <div className="w-[38px] h-[38px] rounded-full bg-[#FB5005]/10 flex items-center justify-center text-[0.82rem] font-700 text-[#FB5005]">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="text-[0.85rem] font-600">{t.name}</h4>
                      <span className="text-[0.75rem] text-[#71717A]">{t.role}</span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative py-[130px] overflow-hidden text-center">
        <div className="absolute -bottom-[320px] left-1/2 -translate-x-1/2 w-[1000px] h-[640px] bg-[radial-gradient(closest-side,rgba(251,80,5,0.16),transparent)] pointer-events-none" />
        <div className="max-w-[1160px] mx-auto px-6 relative">
          <AnimatedSection>
            <h2 className="font-[Satoshi] font-900 text-[clamp(2.6rem,6.4vw,4.6rem)] leading-[1.02] tracking-[-0.04em]">
              Ready to build your<br /><Em>Business OS?</Em>
            </h2>
            <p className="mt-5 mx-auto max-w-[480px] text-[1.03rem] leading-[1.65] text-[#A1A1AA]">
              Book a free 20-minute call. We will map what your business needs, and you will leave with a plan either way.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5 mt-10">
              <BtnPrimary to="/contact">Book a Free Call</BtnPrimary>
              <BtnGhost href="mailto:hello@stellio.com.au">hello@stellio.com.au</BtnGhost>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
