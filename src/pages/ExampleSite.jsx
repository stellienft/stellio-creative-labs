import React, { useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Import all example templates
import { CafeMenu, CafeVibe, CafeRegular } from './examples/CafeExamples'
import { BeautyLookbook, BeautyGlow, BeautySuite } from './examples/BeautyExamples'
import { HealthClinic, HealthCare, HealthTelehealth } from './examples/HealthExamples'
import { RealEstateListings, RealEstateAgent, RealEstateAuction } from './examples/RealEstateExamples'
import { FitnessGrind, FitnessTribe, FitnessTransformation } from './examples/FitnessExamples'
import { ProfessionalAuthority, ProfessionalPractice, ProfessionalBrief } from './examples/ProfessionalExamples'
import { EcommerceStorefront, EcommerceBrand, EcommerceDrop } from './examples/EcommerceExamples'

// ===== THE CLOSER - Dark, green accent, conversion machine =====
// Layout: Minimal scroll. Phone number dominates. Single-viewport feel.
// The ENTIRE point is to get them to call. No fluff.
export function TheCloser() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const accent = '#22C55E' // green
  const phone = '0423 888 456'
  const brand = 'Coastline Plumbing'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Sticky nav - phone number always visible */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <span className="text-[0.85rem] font-700 tracking-[0.04em]">{brand}</span>
          </div>
          <a href={`tel:${phone.replace(/\s/g,'')}`} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[0.82rem] font-700 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]" style={{ background: accent, color: '#000' }}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            {phone}
          </a>
        </div>
      </nav>

      {/* Hero - MASSIVE phone number, minimal text, call-to-action above the fold */}
      <section className="pt-[100px] min-h-screen flex items-center relative overflow-hidden">
        {/* Pulsing glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ background: `${accent}06` }} />

        <div className="max-w-[1100px] mx-auto px-6 w-full">
          <div className="max-w-[800px] mx-auto text-center">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ background: `${accent}08`, borderColor: `${accent}20` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
              <span className="text-[0.75rem] font-600 tracking-[0.08em] uppercase" style={{ color: accent }}>Available Now - 24/7 Emergency</span>
            </div>

            {/* Massive headline */}
            <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-700 leading-[1] mb-4">
              Got a plumbing<br />emergency?
            </h1>

            {/* Giant phone number */}
            <a href={`tel:${phone.replace(/\s/g,'')}`} className="block text-[clamp(2.2rem,5vw,3.8rem)] font-700 tracking-[0.02em] mb-8 transition-all hover:opacity-80" style={{ color: accent }}>
              {phone}
            </a>

            <p className="text-[1.1rem] text-[#A1A1AA] leading-relaxed max-w-[500px] mx-auto mb-10">
              Blocked drains. Burst pipes. No hot water. One call, we are on our way. Fast response, honest pricing, guaranteed work.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a href={`tel:${phone.replace(/\s/g,'')}`} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-[1rem] font-700 transition-all hover:shadow-[0_0_50px_rgba(34,197,94,0.25)]" style={{ background: accent, color: '#000' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call Now
              </a>
              <a href="#callback" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.12] text-white text-[1rem] font-600 hover:border-white/[0.25] transition-all">
                Request Callback
              </a>
            </div>

            {/* Compact service badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: 'Emergency Repairs' },
                { label: 'Hot Water' },
                { label: 'Blocked Drains' },
                { label: 'Roofing' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-[0.72rem] text-[#A1A1AA]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip - horizontal, compact */}
      <section className="py-6 border-y border-white/[0.06] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '12+', label: 'Years' },
              { num: '2,500+', label: 'Jobs' },
              { num: '24/7', label: 'Availability' },
              { num: '5.0', label: 'Google Rating' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-[1.3rem] font-700" style={{ color: accent }}>{s.num}</div>
                <div className="text-[0.72rem] text-[#71717A] uppercase tracking-[0.08em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us - checklist format, not cards */}
      <section className="py-[80px]">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-700 text-center mb-10">Why people call us first</h2>
          <div className="space-y-4">
            {[
              { title: 'Upfront pricing', desc: 'You know the cost before we start. No surprises, no hidden fees.' },
              { title: 'Same-day service', desc: 'Call before 10am and we will be there today. Emergency? We come now.' },
              { title: 'Lifetime warranty', desc: 'We stand behind every job. If it breaks, we fix it for free.' },
              { title: 'Local & family-owned', desc: 'We live here too. Our reputation is everything.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#111111] border border-white/[0.06] rounded-xl p-5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${accent}12` }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h3 className="text-[0.92rem] font-600 mb-0.5">{item.title}</h3>
                  <p className="text-[0.85rem] text-[#A1A1AA]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews - stacked, not grid */}
      <section className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-700 text-center mb-10">What customers say</h2>
          <div className="space-y-5">
            {[
              { name: 'Sarah M.', area: 'Broadbeach', quote: 'Called at 9pm on a Friday and they were at my door in 40 minutes. Fixed the burst pipe and even cleaned up. Cannot recommend enough.' },
              { name: 'Dave R.', area: 'Surfers Paradise', quote: 'Honest pricing, quality work. Replaced our hot water system same day. Five stars.' },
            ].map((r, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[0.9rem] text-[#A1A1AA] leading-relaxed mb-3">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-[0.82rem] font-600">{r.name} <span className="text-[#71717A]">- {r.area}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Callback form - minimal, just name + phone */}
      <section id="callback" className="py-[80px]">
        <div className="max-w-[460px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-700 mb-3">
            Rather we call you?
          </h2>
          <p className="text-[0.95rem] text-[#A1A1AA] mb-8">Leave your number. We call back within 15 minutes.</p>
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <input type="text" placeholder="Your name" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white placeholder-[#71717A] focus:outline-none transition-colors" onFocus={e => e.target.style.borderColor = `${accent}50`} onBlur={e => e.target.style.borderColor = ''} />
            <input type="tel" placeholder="Phone number" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white placeholder-[#71717A] focus:outline-none transition-colors" onFocus={e => e.target.style.borderColor = `${accent}50`} onBlur={e => e.target.style.borderColor = ''} />
            <button className="w-full py-3.5 rounded-xl text-[0.92rem] font-700 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]" style={{ background: accent, color: '#000' }}>
              Call Me Back
            </button>
          </div>
          <p className="text-[0.72rem] text-[#71717A] mt-4">No spam. No obligation. Just a quick chat about your issue.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06] bg-[#0A0A0A]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <span className="text-[0.78rem] font-600">{brand}</span>
          </div>
          <p className="text-[0.7rem] text-[#71717A]">ABN 00 000 000 000 | QLD Licence #00000 | Gold Coast & Brisbane</p>
        </div>
      </footer>
    </div>
  )
}

// ===== THE PORTFOLIO - Light, editorial, gallery-first =====
// Layout: Full-bleed hero image. Masonry gallery. Horizontal scroll testimonials.
// For tradies whose work sells the next job.
export function ThePortfolio() {
  const [activeProject, setActiveProject] = useState(null)
  const brand = 'Southside Constructions'
  const projects = [
    { title: 'Mermaid Waters Renovation', desc: 'Complete kitchen and bathroom overhaul. Open-plan living transformation. The clients had lived here for 15 years and wanted a full refresh that honoured the original character while adding modern comfort.', tags: ['Renovation', 'Kitchen', 'Bathroom'], year: '2024', color: '#E8E4DF', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop&auto=format' },
    { title: 'Robina Custom Build', desc: '4-bedroom contemporary home with pool and outdoor entertaining area. Designed from scratch to capture the afternoon breezeway and maximise natural light throughout.', tags: ['New Build', 'Custom Home', 'Pool'], year: '2024', color: '#DDE5DF', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop&auto=format' },
    { title: 'Broadbeach Extension', desc: 'Second-storey addition adding 3 bedrooms and a parents retreat. Engineered to match the existing structure seamlessly - you would never know it was added later.', tags: ['Extension', 'Second Storey'], year: '2023', color: '#DFE0E8', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format' },
    { title: 'Palm Beach Kitchen', desc: 'Designer kitchen with butlers pantry, stone benchtops, and integrated appliances. The heart of the home, reimagined for a family that loves to cook and entertain.', tags: ['Kitchen', 'Renovation'], year: '2023', color: '#E5DFD8', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format' },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      {/* Thin elegant nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <span className="text-[0.9rem] font-700 tracking-[0.06em]">{brand}</span>
            <div className="hidden md:flex items-center gap-6">
              <a href="#projects" className="text-[0.78rem] text-[#888] hover:text-[#1A1A1A] transition-colors">Projects</a>
              <a href="#process" className="text-[0.78rem] text-[#888] hover:text-[#1A1A1A] transition-colors">Process</a>
              <a href="#about" className="text-[0.78rem] text-[#888] hover:text-[#1A1A1A] transition-colors">About</a>
            </div>
          </div>
          <a href="#contact" className="px-5 py-2 rounded-full bg-[#1A1A1A] text-white text-[0.78rem] font-600 hover:bg-[#333] transition-colors">Start a Project</a>
        </div>
      </nav>

      {/* Split hero */}
      <section className="pt-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16">
            <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-6">Established 2012 - Gold Coast</span>
            <h1 className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-700 leading-[1.05] mb-6">
              We build homes<br />worth talking about.
            </h1>
            <div className="w-16 h-[2px] bg-[#1A1A1A] mb-6" />
            <p className="text-[1rem] text-[#666] leading-relaxed max-w-[420px] mb-8">
              From custom new builds to complete renovations, every project gets the same attention to detail. See our work. Then let us talk about yours.
            </p>
            <div className="flex gap-4">
              <a href="#projects" className="px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-[0.85rem] font-600 hover:bg-[#333] transition-colors">View Projects</a>
              <a href="#contact" className="px-6 py-3 rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A] text-[0.85rem] font-600 hover:border-[#1A1A1A] transition-all">Get a Quote</a>
            </div>
          </div>
          <div className="bg-[#E8E4DF] flex items-center justify-center min-h-[400px] lg:min-h-0 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&auto=format" alt="Construction project" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Projects - expandable cards */}
      <section id="projects" className="py-[80px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-2 block">Selected Work</span>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">Recent projects</h2>
            </div>
            <span className="text-[0.82rem] text-[#999] hidden sm:block">Click to expand</span>
          </div>
          <div className="space-y-4">
            {projects.map((p, i) => (
              <div key={i} onClick={() => setActiveProject(activeProject === i ? null : i)} className="cursor-pointer group">
                <div className="rounded-2xl overflow-hidden border border-black/[0.06] transition-all duration-500" style={{ background: activeProject === i ? p.color : '#FAFAFA' }}>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-[45%] aspect-[4/3] md:aspect-auto overflow-hidden" style={{ background: p.color }}>
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-[55%] p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[0.68rem] text-[#999]">{p.year}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-[#1A1A1A] text-white rounded text-[0.6rem]">{t}</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-[1.2rem] font-700 mb-2">{p.title}</h3>
                      <AnimatePresence>
                        {activeProject === i ? (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                            <p className="text-[0.88rem] text-[#666] leading-relaxed">{p.desc}</p>
                          </motion.div>
                        ) : (
                          <p className="text-[0.82rem] text-[#999]">{p.desc.split('.')[0]}.</p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline process */}
      <section id="process" className="py-[80px] bg-[#FAFAFA]">
        <div className="max-w-[800px] mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-2 block">How We Work</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">From idea to handover</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-[#DDD]" />
            {[
              { step: '01', title: 'Consultation', desc: 'On-site visit to understand your vision, budget, and timeline. Free, no obligation.' },
              { step: '02', title: 'Design & Approvals', desc: 'Architectural plans, engineering, council approvals. We handle the paperwork.' },
              { step: '03', title: 'Construction', desc: 'Regular updates, fixed-price contract, and a dedicated site supervisor.' },
              { step: '04', title: 'Handover', desc: 'Final walkthrough, defect check, and QBCC certification. Your home, perfected.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 mb-10 last:mb-0">
                <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-[#1A1A1A] flex items-center justify-center shrink-0">
                  <span className="text-[0.7rem] font-700">{item.step}</span>
                </div>
                <div className="pt-1.5">
                  <h3 className="text-[1rem] font-700 mb-1">{item.title}</h3>
                  <p className="text-[0.88rem] text-[#666] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark stats band */}
      <section id="about" className="py-[80px] bg-[#1A1A1A] text-white">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 leading-tight mb-6">
                Not the biggest.<br />Just the one who answers.
              </h2>
              <p className="text-[0.95rem] text-[#999] leading-relaxed mb-8">
                Southside Constructions is a family-run building company on the Gold Coast. We take on a limited number of projects each year so we can give each one our full attention. When you call, the owner answers. When we build, the owner is on site.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1A1A1A] text-[0.85rem] font-600 hover:bg-[#E5E5E5] transition-colors">
                Talk to the owner
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: '12', label: 'Years Building' },
                { num: '180+', label: 'Projects Completed' },
                { num: '5.0', label: 'Google Rating' },
                { num: '100%', label: 'QBCC Licensed' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5">
                  <div className="text-[2rem] font-700 text-white">{s.num}</div>
                  <div className="text-[0.78rem] text-[#71717A]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal scroll testimonials */}
      <section className="py-[80px] bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-2 block">Testimonials</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-8">Kind words from past clients</h2>
        </div>
        <div className="overflow-x-auto pb-4 -mx-8 px-8 scrollbar-hide">
          <div className="flex gap-5" style={{ width: 'max-content' }}>
            {[
              { name: 'Sarah & Mike T.', project: 'Mermaid Waters Renovation', quote: 'Southside transformed our 90s kitchen into something out of a magazine. On budget, on time, and the attention to detail was incredible.' },
              { name: 'James & Lisa K.', project: 'Robina Custom Build', quote: 'Building from scratch is stressful but Dean made it feel manageable. Always available, always honest. Our dream home became reality.' },
              { name: 'Peter M.', project: 'Broadbeach Extension', quote: 'We were told a second storey could not be done on our block. Southside found a way. Brilliant engineers, even better builders.' },
              { name: 'The Nguyens', project: 'Palm Beach Kitchen', quote: 'The butlers pantry alone was worth it. Everything works exactly how we wanted. They really listen to what you need.' },
            ].map((r, i) => (
              <div key={i} className="w-[340px] shrink-0 bg-[#FAFAFA] border border-black/[0.06] rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#1A1A1A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[0.88rem] text-[#555] leading-relaxed mb-4">&ldquo;{r.quote}&rdquo;</p>
                <div>
                  <p className="text-[0.82rem] font-600">{r.name}</p>
                  <p className="text-[0.72rem] text-[#999]">{r.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA form */}
      <section id="contact" className="py-[100px] bg-[#FAFAFA]">
        <div className="max-w-[560px] mx-auto px-8 text-center">
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-700 leading-tight mb-4">Ready to build?</h2>
          <p className="text-[1rem] text-[#666] mb-10">Tell us about your project. We will arrange a free on-site consultation within 48 hours.</p>
          <div className="bg-white border border-black/[0.06] rounded-2xl p-6 text-left space-y-4 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your name" className="bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:border-[#1A1A1A]/30 transition-colors" />
              <input type="email" placeholder="Email address" className="bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:border-[#1A1A1A]/30 transition-colors" />
            </div>
            <select className="w-full bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#999] focus:outline-none focus:border-[#1A1A1A]/30 transition-colors">
              <option>What type of project?</option><option>New Build</option><option>Renovation</option><option>Extension</option><option>Kitchen</option><option>Other</option>
            </select>
            <textarea placeholder="Tell us about your project..." rows={3} className="w-full bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:border-[#1A1A1A]/30 transition-colors resize-none" />
            <button className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-[0.92rem] font-600 hover:bg-[#333] transition-colors">
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-black/[0.06] bg-white">
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.82rem] font-700 tracking-[0.04em]">{brand}</span>
          <p className="text-[0.7rem] text-[#999]">ABN 00 000 000 000 | QBCC Licence #00000 | Gold Coast QLD</p>
        </div>
      </footer>
    </div>
  )
}

// ===== THE LOCAL - Warm, community, flyer-style =====
// Layout: Neighbourhood feel. Service area map. "Text us" booking.
// Community credibility. Warm and personal.
export function TheLocal() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const brand = 'Redbank Electrical'
  const warm = '#C2703E'
  const warmBg = '#FDF6EE'
  const darkWarm = '#2D1B0E'
  const midWarm = '#8B6F5C'
  const lightWarm = '#F5ECDF'

  return (
    <div className="min-h-screen" style={{ background: warmBg, color: darkWarm }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: 'rgba(253,246,238,0.9)', borderColor: 'rgba(194,112,62,0.12)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: warm }}>
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <span className="text-[0.95rem] font-700 tracking-[0.02em]">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#areas" className="text-[0.85rem]" style={{ color: midWarm }}>Areas</a>
            <a href="#services" className="text-[0.85rem]" style={{ color: midWarm }}>Services</a>
            <a href="#community" className="text-[0.85rem]" style={{ color: midWarm }}>Community</a>
            <a href="#book" className="px-5 py-2.5 rounded-lg text-white text-[0.85rem] font-600 hover:opacity-90" style={{ background: warm }}>Book a Call-out</a>
          </div>
        </div>
      </nav>

      {/* Hero with map panel */}
      <section className="pt-[120px] pb-[60px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-5" style={{ color: warm }}>Serving Redbank & Ipswich Since 2015</span>
              <h1 className="text-[clamp(2.2rem,5vw,3.2rem)] font-700 leading-[1.08] mb-5">
                Your neighbour's<br />recommended sparky.
              </h1>
              <p className="text-[1.05rem] leading-relaxed mb-8 max-w-[480px]" style={{ color: midWarm }}>
                Family-owned. Same-day call-outs. We are the electrician your neighbour already trusts. Friendly, reliable, and always on time.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#book" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-[0.92rem] font-600 hover:opacity-90" style={{ background: warm }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  Book a Call-out
                </a>
                <a href="sms:0400000000" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border text-[0.92rem] font-600" style={{ borderColor: `${warm}30`, color: warm }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  Text Us
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl p-6" style={{ background: lightWarm, border: '1px solid rgba(194,112,62,0.1)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={warm} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span className="text-[0.82rem] font-600">Our Service Area</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Redbank', 'Redbank Plains', 'Augustine Heights', 'Bellbird Park', 'Goodna', 'Collingwood Park', 'Springfield', 'Brookwater'].map(a => (
                    <span key={a} className="px-2.5 py-1 rounded-lg text-[0.75rem] font-500" style={{ background: 'rgba(194,112,62,0.08)', border: '1px solid rgba(194,112,62,0.1)' }}>{a}</span>
                  ))}
                </div>
                <p className="text-[0.75rem] mt-4" style={{ color: midWarm }}>30-minute response time across all areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - pricelist format */}
      <section id="services" className="py-[80px]" style={{ background: lightWarm }}>
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4" style={{ color: warm }}>What We Do</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">Our services</h2>
          </div>
          <div className="space-y-0 rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(194,112,62,0.1)' }}>
            {[
              { service: 'Safety Switch Installation', from: '$180', desc: 'RCD testing and installation. Keep your family safe.' },
              { service: 'Full or Partial Rewire', from: '$2,500', desc: 'Older homes rewired to current standards. Safety-first.' },
              { service: 'Split System Air Con', from: '$800', desc: 'Supply and install. Any brand, any room.' },
              { service: 'Solar Panel Install', from: '$3,500', desc: 'Cut your power bill. Panels, inverter, and setup.' },
              { service: 'Power Point Installation', from: '$120', desc: 'Extra outlets where you need them. Indoor and outdoor.' },
              { service: 'LED Downlight Upgrade', from: '$65/point', desc: 'Swap old halogens for LED. Save on power instantly.' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-5 gap-4" style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.5)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(194,112,62,0.08)' : 'none' }}>
                <div className="flex-1">
                  <h3 className="text-[0.92rem] font-600 mb-0.5">{s.service}</h3>
                  <p className="text-[0.78rem]" style={{ color: midWarm }}>{s.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[0.82rem] font-700" style={{ color: warm }}>{s.from}</span>
                  <span className="text-[0.68rem] block" style={{ color: midWarm }}>from</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4" style={{ color: warm }}>Part of the Community</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">We are not just in your area.<br />We are part of it.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Redbank Plains JRL', desc: 'Sponsoring the under-12s since 2019. Go the Panthers!', icon: 'smile' },
              { title: 'Springfield Lions FC', desc: 'Season sponsor and proud dad on the sidelines.', icon: 'play' },
              { title: 'Goodna Street Fair', desc: 'Free safety checks at our stall every year. Come say hi.', icon: 'flag' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl p-6 border text-center" style={{ background: 'rgba(255,255,255,0.5)', borderColor: 'rgba(194,112,62,0.1)' }}>
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${warm}10` }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={warm} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon === 'smile' && <g><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></g>}
                    {c.icon === 'play' && <g><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16"/></g>}
                    {c.icon === 'flag' && <g><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></g>}
                  </svg>
                </div>
                <h3 className="text-[0.95rem] font-700 mb-1">{c.title}</h3>
                <p className="text-[0.82rem]" style={{ color: midWarm }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-[80px]" style={{ background: lightWarm }}>
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">What your neighbours say</h2>
          <div className="space-y-4">
            {[
              { name: 'Maria S.', street: 'Cassowary St, Redbank Plains', quote: 'Same day, less than we expected, and they even cleaned up. My husband was impressed and he is picky.' },
              { name: 'Tom & Lisa B.', street: 'Augustine Heights', quote: 'Finally an electrician who shows up on time. Great with our kids too - explained everything simply.' },
              { name: 'James P.', street: 'Bellbird Park', quote: 'Solar and safety switches in one visit. Professional, tidy, and genuinely friendly. Our go-to sparky now.' },
            ].map((r, i) => (
              <div key={i} className="bg-white/70 rounded-xl p-5 border" style={{ borderColor: 'rgba(194,112,62,0.1)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-[0.78rem] font-700" style={{ background: warm }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-3 h-3" viewBox="0 0 24 24" fill={warm}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      ))}
                    </div>
                    <p className="text-[0.88rem] leading-relaxed mb-2" style={{ color: midWarm }}>&ldquo;{r.quote}&rdquo;</p>
                    <p className="text-[0.78rem] font-600">{r.name} <span style={{ color: midWarm }}> - {r.street}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="py-[80px]">
        <div className="max-w-[560px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Need a sparky?</h2>
          <p className="text-[1rem] mb-10" style={{ color: midWarm }}>Book a call-out. We will be there today if you call before noon.</p>
          <div className="rounded-2xl p-8 border" style={{ background: 'rgba(255,255,255,0.5)', borderColor: 'rgba(194,112,62,0.1)' }}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your name" className="rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" style={{ background: lightWarm, border: '1px solid rgba(194,112,62,0.1)', color: darkWarm }} />
                <input type="tel" placeholder="Phone number" className="rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" style={{ background: lightWarm, border: '1px solid rgba(194,112,62,0.1)', color: darkWarm }} />
              </div>
              <select className="w-full rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" style={{ background: lightWarm, border: '1px solid rgba(194,112,62,0.1)', color: midWarm }}>
                <option>What do you need?</option><option>Safety Switch</option><option>Rewire</option><option>Air Con</option><option>Solar</option><option>Power Points</option><option>Other</option>
              </select>
              <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-600 hover:opacity-90" style={{ background: warm }}>
                Book a Call-out
              </button>
            </div>
            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgba(194,112,62,0.1)' }}>
              <p className="text-[0.78rem] mb-3" style={{ color: midWarm }}>Or just text us - we reply fast</p>
              <a href="sms:0400000000" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-[0.85rem] font-600" style={{ borderColor: `${warm}30`, color: warm }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                Text 0400 000 000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t" style={{ borderColor: 'rgba(194,112,62,0.12)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: warm }}>
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <span className="text-[0.82rem] font-700">{brand}</span>
          </div>
          <p className="text-[0.7rem]" style={{ color: midWarm }}>ABN 00 000 000 000 | QLD Electrical Licence #00000 | Redbank QLD</p>
        </div>
      </footer>
    </div>
  )
}

// ===== TEMPLATE REGISTRY =====
const TEMPLATES = {
  // Tradies
  closer: TheCloser,
  portfolio: ThePortfolio,
  local: TheLocal,
  // Cafes
  'cafe-menu': CafeMenu,
  'cafe-vibe': CafeVibe,
  'cafe-regular': CafeRegular,
  // Real Estate
  'property-listings': RealEstateListings,
  'agent-profile': RealEstateAgent,
  'auction-hype': RealEstateAuction,
  // Fitness
  'gym-grind': FitnessGrind,
  'fitness-tribe': FitnessTribe,
  'transformation': FitnessTransformation,
  // Beauty
  'beauty-lookbook': BeautyLookbook,
  'beauty-glow': BeautyGlow,
  'beauty-suite': BeautySuite,
  // Health
  'health-clinic': HealthClinic,
  'health-care': HealthCare,
  'health-telehealth': HealthTelehealth,
  // Professionals
  'authority': ProfessionalAuthority,
  'the-practice': ProfessionalPractice,
  'the-brief': ProfessionalBrief,
  // Ecommerce
  'storefront': EcommerceStorefront,
  'brand-story': EcommerceBrand,
  'the-drop': EcommerceDrop,
}

// Map template keys to their niche for the floating CTA back-link
const TEMPLATE_NICHE = {
  closer: 'tradies', portfolio: 'tradies', local: 'tradies',
  'cafe-menu': 'cafes', 'cafe-vibe': 'cafes', 'cafe-regular': 'cafes',
  'property-listings': 'real-estate', 'agent-profile': 'real-estate', 'auction-hype': 'real-estate',
  'gym-grind': 'fitness', 'fitness-tribe': 'fitness', 'transformation': 'fitness',
  'beauty-lookbook': 'beauty', 'beauty-glow': 'beauty', 'beauty-suite': 'beauty',
  'health-clinic': 'health', 'health-care': 'health', 'health-telehealth': 'health',
  'authority': 'professionals', 'the-practice': 'professionals', 'the-brief': 'professionals',
  'storefront': 'ecommerce', 'brand-story': 'ecommerce', 'the-drop': 'ecommerce',
}

export default function ExampleSite() {
  const { template } = useParams()
  const Component = TEMPLATES[template]
  const niche = TEMPLATE_NICHE[template] || 'tradies'

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[140px] bg-[#0A0A0A]">
        <div className="text-center">
          <h1 className="text-2xl font-700 text-[#FAFAFA] mb-4">Template not found</h1>
          <Link to={`/for/${niche}`} className="text-[#FB5005] hover:underline">Back to {niche.replace('-', ' ')}</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Component />
      {/* Floating "Get a site like this" CTA - links back to the niche page */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <Link
          to={`/for/${niche}`}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FB5005] text-white text-[0.82rem] font-600 shadow-[0_4px_24px_rgba(251,80,5,0.3)] hover:shadow-[0_4px_32px_rgba(251,80,5,0.4)] transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
          Get a site like this
        </Link>
      </div>
    </>
  )
}
