import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ===== PROFESSIONALS AUTHORITY - Navy, credentials, thought leadership =====
// Layout: Credentials-first. Thought leadership. Consultation booking.
// For professionals whose authority is the differentiator.
export function ProfessionalAuthority() {
  const accent = '#3B5998'
  const brand = 'Henderson & Co. Law'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav - refined */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-[0.88rem] font-700 tracking-[0.08em] uppercase">{brand}</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Services</a>
            <a href="#credentials" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Credentials</a>
            <a href="#insights" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Insights</a>
            <a href="#consult" className="px-5 py-2 rounded-lg text-[0.78rem] font-600 border transition-all hover:bg-white hover:text-[#0A0A0A]" style={{ borderColor: accent, color: accent }}>Book Consultation</a>
          </div>
        </div>
      </nav>

      {/* Hero - authority */}
      <section className="pt-[100px] pb-[80px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ background: `${accent}06` }} />
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="max-w-[700px]">
            <span className="text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-6 block" style={{ color: accent }}>Established 2009 - Springfield QLD</span>
            <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-700 leading-[1.05] mb-5">
              Legal advice that protects<br />what you have built.
            </h1>
            <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[500px] mb-8">
              Henderson & Co. provides practical, results-focused legal services to businesses and families across the Ipswich region. Straight talk. Clear advice. Fair fees.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#consult" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-[0.92rem] font-600" style={{ background: accent }}>Book Consultation</a>
              <a href="#services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] text-[0.92rem] font-600 hover:border-white/[0.25] transition-all">Our Services</a>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section className="py-5 border-y border-white/[0.06] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-wrap gap-8 justify-center">
          {[
            { label: 'QLD Law Society Member', icon: 'shield' },
            { label: '15+ Years Experience', icon: 'award' },
            { label: '2,000+ Matters Handled', icon: 'briefcase' },
            { label: 'No Win No Fee (Select Matters)', icon: 'check' },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {c.icon === 'shield' && <g><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></g>}
                {c.icon === 'award' && <g><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></g>}
                {c.icon === 'briefcase' && <g><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></g>}
                {c.icon === 'check' && <g><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></g>}
              </svg>
              <span className="text-[0.78rem] text-[#A1A1AA]">{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">Practice areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { name: 'Business Law', desc: 'Company formation, shareholder agreements, commercial leases, contract review. We keep your business legally sound.', icon: 'briefcase' },
              { name: 'Property & Conveyancing', desc: 'Residential and commercial property transactions. We handle the paperwork so you can focus on the move.', icon: 'home' },
              { name: 'Family Law', desc: 'Divorce, parenting arrangements, property settlements. Compassionate, clear guidance through difficult times.', icon: 'heart' },
              { name: 'Wills & Estates', desc: 'Estate planning, wills, powers of attorney, probate. Protect your family and your legacy.', icon: 'file' },
              { name: 'Dispute Resolution', desc: 'Mediation, negotiation, and litigation when needed. We fight for fair outcomes without unnecessary court time.', icon: 'scale' },
              { name: 'Employment Law', desc: 'Contracts, workplace disputes, unfair dismissal. For employers and employees.', icon: 'users' },
            ].map((s, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all">
                <h3 className="text-[0.95rem] font-700 mb-2">{s.name}</h3>
                <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thought leadership / Insights */}
      <section id="insights" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">Latest insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'What the 2026 property law changes mean for landlords', category: 'Property', date: 'Jun 2026' },
              { title: 'Business structures explained: sole trader vs company', category: 'Business', date: 'May 2026' },
              { title: 'Why every adult needs a will (yes, even you)', category: 'Estates', date: 'Apr 2026' },
            ].map((a, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all cursor-pointer">
                <span className="text-[0.68rem] font-600 uppercase tracking-[0.1em] mb-2 block" style={{ color: accent }}>{a.category}</span>
                <h3 className="text-[0.92rem] font-700 mb-2 leading-snug">{a.title}</h3>
                <span className="text-[0.72rem] text-[#71717A]">{a.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[80px]">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Client feedback</h2>
          <div className="space-y-5">
            {[
              { name: 'David & Karen M.', matter: 'Property Settlement', quote: 'Henderson & Co. handled our settlement with sensitivity and efficiency. We always felt informed and supported. Fair pricing too.' },
              { name: 'Pacific Trade Solutions', matter: 'Business Law', quote: 'We have used Henderson & Co. for all our commercial legal needs since 2018. Responsive, practical, and genuinely care about getting the right outcome.' },
            ].map((r, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
                <p className="text-[0.9rem] text-[#A1A1AA] leading-relaxed mb-3">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-[0.82rem] font-600">{r.name} <span className="text-[#71717A] font-400">- {r.matter}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation booking */}
      <section id="consult" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Book a consultation</h2>
          <p className="text-[0.95rem] text-[#A1A1AA] mb-8">Initial 30-minute consultation is free. Let us understand your situation first.</p>
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
              <input type="tel" placeholder="Phone" className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            </div>
            <input type="email" placeholder="Email" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <select className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#71717A] focus:outline-none">
              <option>Area of law</option><option>Business Law</option><option>Property</option><option>Family Law</option><option>Wills & Estates</option><option>Dispute Resolution</option><option>Employment</option><option>Other</option>
            </select>
            <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-600" style={{ background: accent }}>Book Free Consultation</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.78rem] font-700 tracking-[0.06em] uppercase">{brand}</span>
          <p className="text-[0.7rem] text-[#71717A]">QLD Legal Practitioner #00000 | Springfield QLD</p>
        </div>
      </footer>
    </div>
  )
}

// ===== PROFESSIONALS PRACTICE - Clean white, team profiles, service areas =====
// Layout: Team-first. Service area grid. Client portal link.
// For practices where the team and breadth of service matters.
export function ProfessionalPractice() {
  const accent = '#0EA5E9'
  const brand = 'Meridian Accounting'

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      {/* Nav - clean */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/></svg>
            </div>
            <span className="text-[0.9rem] font-700">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#team" className="text-[0.82rem] text-[#888] hover:text-[#1A1A1A] transition-colors">Team</a>
            <a href="#services" className="text-[0.82rem] text-[#888] hover:text-[#1A1A1A] transition-colors">Services</a>
            <a href="#portal" className="text-[0.82rem] text-[#888] hover:text-[#1A1A1A] transition-colors">Client Portal</a>
            <a href="#contact" className="px-5 py-2 rounded-lg text-white text-[0.82rem] font-600" style={{ background: accent }}>Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero - professional clarity */}
      <section className="pt-[100px] pb-[60px] bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="max-w-[700px]">
            <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-4 block">CPA Registered - Springfield QLD</span>
            <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-700 leading-[1.05] mb-4">
              Accounting that keeps<br />your business on track.
            </h1>
            <p className="text-[1rem] text-[#666] leading-relaxed max-w-[500px] mb-6">
              Tax returns, BAS, business structuring, and strategic advice. We do the numbers so you can do what you do best.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[0.85rem] font-600" style={{ background: accent }}>
              Book a Discovery Call
            </a>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">Meet the team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { name: 'Lisa Tran', role: 'Principal CPA', speciality: 'Business Advisory', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&auto=format' },
              { name: 'Mark Robinson', role: 'Senior Accountant', speciality: 'Tax & Compliance', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&auto=format' },
              { name: 'Aisha Patel', role: 'Accountant', speciality: 'BAS & Bookkeeping', img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop&auto=format' },
              { name: 'Tom Green', role: 'Accountant', speciality: 'Self-Managed Super', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&auto=format' },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-black/[0.06] rounded-xl p-5 text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[0.92rem] font-700">{t.name}</h3>
                <p className="text-[0.78rem]" style={{ color: accent }}>{t.role}</p>
                <p className="text-[0.72rem] text-[#999]">{t.speciality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="py-[80px] bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">What we do</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Individual Tax Returns', 'Business Tax Returns', 'BAS Preparation',
              'Bookkeeping', 'Business Structuring', 'SMSF Setup & Audit',
              'Payroll Services', 'CGT Advice', 'Trust & Company Tax',
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-black/[0.04] hover:border-black/[0.1] transition-all cursor-pointer">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${accent}10` }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="text-[0.85rem] font-500">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client portal CTA */}
      <section id="portal" className="py-[80px]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div className="bg-white border border-black/[0.06] rounded-2xl p-8">
            <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center" style={{ background: `${accent}10` }}>
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3 className="text-[1.2rem] font-700 mb-2">Client Portal</h3>
            <p className="text-[0.92rem] text-[#666] mb-6">Upload documents, check your return status, and message your accountant securely.</p>
            <button className="px-6 py-3 rounded-xl text-white text-[0.88rem] font-600" style={{ background: accent }}>Log In to Portal</button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-[80px] bg-white">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Ready to get organised?</h2>
          <p className="text-[0.95rem] text-[#666] mb-8">Book a free 15-minute discovery call. No obligation.</p>
          <div className="border border-black/[0.06] rounded-2xl p-6 space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" />
              <input type="tel" placeholder="Phone" className="bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" />
            </div>
            <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-600" style={{ background: accent }}>Book Discovery Call</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.82rem] font-700">{brand}</span>
          <p className="text-[0.7rem] text-[#999]">CPA #00000 | Springfield QLD</p>
        </div>
      </footer>
    </div>
  )
}

// ===== PROFESSIONALS BRIEF - Ultra-minimal, black/white, efficiency =====
// Layout: Bare minimum. Direct. No fluff. Speed-focused.
// For consultants who sell efficiency and directness.
export function ProfessionalBrief() {
  const accent = '#FAFAFA'
  const brand = 'Clearpath Consulting'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav - minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between h-12">
          <span className="text-[0.82rem] font-700 tracking-[0.1em] uppercase">{brand}</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-[0.72rem] text-[#666] hover:text-white transition-colors">Work</a>
            <a href="#about" className="text-[0.72rem] text-[#666] hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-[0.72rem] text-[#666] hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero - ultra-minimal */}
      <section className="pt-[120px] pb-[80px]">
        <div className="max-w-[900px] mx-auto px-6">
          <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-700 leading-[1.02] mb-6">
            We solve problems.<br />Fast.
          </h1>
          <p className="text-[1.1rem] text-[#666] leading-relaxed max-w-[500px]">
            Business strategy. Operational efficiency. Process optimisation. We come in, find the issue, fix it, and leave. No long-term retainers. No unnecessary reports.
          </p>
        </div>
      </section>

      {/* Work - simple list */}
      <section id="work" className="py-[60px]">
        <div className="max-w-[900px] mx-auto px-6">
          <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#555] mb-8 block">What we do</span>
          <div className="space-y-0">
            {[
              { name: 'Strategy', desc: 'Where are you going and how do you get there? We map the path.' },
              { name: 'Operations', desc: 'Remove friction. Automate what can be automated. Eliminate what cannot.' },
              { name: 'Growth', desc: 'Scale without breaking what works. Revenue, team, systems.' },
              { name: 'Turnaround', desc: 'When things are not working. We diagnose fast and act faster.' },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-6 py-6 border-b border-white/[0.04] group cursor-pointer">
                <span className="text-[0.72rem] text-[#444] mt-1 w-[30px] shrink-0">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="text-[1rem] font-700 mb-1 group-hover:text-[#FB5005] transition-colors">{s.name}</h3>
                  <p className="text-[0.88rem] text-[#666] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About - short */}
      <section id="about" className="py-[60px]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '50+', label: 'Projects' },
              { num: '12', label: 'Industries' },
              { num: '3-6', label: 'Week Avg' },
              { num: '100%', label: 'Referral Rate' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-[1.8rem] font-700 text-white">{s.num}</div>
                <div className="text-[0.72rem] text-[#555] uppercase tracking-[0.08em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - minimal */}
      <section id="contact" className="py-[80px]">
        <div className="max-w-[500px] mx-auto px-6">
          <h2 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-700 mb-3">Tell us the problem.</h2>
          <p className="text-[0.92rem] text-[#666] mb-8">We will tell you if we can fix it. Free initial assessment.</p>
          <div className="space-y-3">
            <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-white/[0.1] px-0 py-3 text-[0.88rem] text-white focus:outline-none focus:border-white/30 placeholder-[#444]" />
            <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/[0.1] px-0 py-3 text-[0.88rem] text-white focus:outline-none focus:border-white/30 placeholder-[#444]" />
            <textarea placeholder="What is the problem?" rows={3} className="w-full bg-transparent border-b border-white/[0.1] px-0 py-3 text-[0.88rem] text-white focus:outline-none focus:border-white/30 placeholder-[#444] resize-none" />
            <button className="px-8 py-3 rounded-none text-[#0A0A0A] text-[0.88rem] font-700 bg-white hover:bg-[#E5E5E5] transition-colors mt-4">Send</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.04]">
        <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between">
          <span className="text-[0.68rem] text-[#444] uppercase tracking-[0.1em]">{brand}</span>
          <span className="text-[0.68rem] text-[#444]">hello@clearpath.consulting</span>
        </div>
      </footer>
    </div>
  )
}
