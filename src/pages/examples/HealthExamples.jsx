import React, { useState } from 'react'

// ============================================================
// HealthClinic - Clean teal, professional clinical feel
// #F0F9F4 bg, #14B8A6 accent, white cards
// Services grid, team section, booking grid, health fund badges
// ============================================================
export function HealthClinic() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const accent = '#14B8A6'
  const bg = '#F0F9F4'
  const brand = 'Bayview Medical Centre'

  const services = [
    { icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>, name: 'General Practice', desc: 'Comprehensive GP consultations for all ages and health needs.' },
    { icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>, name: 'Heart Health', desc: 'Cardiac screening, blood pressure management and heart health plans.' },
    { icon: <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>, name: 'Skin Checks', desc: 'Full-body skin examinations and mole mapping for early detection.' },
    { icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>, name: 'Health Checks', desc: 'Preventative health assessments tailored to your age and risk factors.' },
    { icon: <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>, name: 'Mental Health', desc: 'Supportive mental health care plans and counselling referrals.' },
    { icon: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>, name: 'Eye Exams', desc: 'Vision testing and referral to specialist ophthalmology services.' },
  ]

  const team = [
    { name: 'Dr. Sarah Chen', role: 'General Practitioner', qual: 'MBBS, FRACGP', img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop&auto=format' },
    { name: 'Dr. James Okoye', role: 'Cardiologist', qual: 'MBBS, PhD, FCSANZ', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop&auto=format' },
    { name: 'Dr. Emily Parsons', role: 'Dermatologist', qual: 'MBBS, FACD', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop&auto=format' },
  ]

  const bookingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const bookingSlots = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00']

  return (
    <div className="min-h-screen" style={{ background: bg }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b" style={{ borderColor: `${accent}15` }}>
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <span className="text-[1rem] font-700 text-[#1A1A2E] tracking-tight">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Our Team', 'Bookings', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[0.85rem] font-500 text-[#4A5568] hover:text-[#1A1A2E] transition-colors">{item}</a>
            ))}
            <a href="#bookings" className="px-5 py-2 rounded-lg text-[0.85rem] font-600 text-white transition-all hover:opacity-90" style={{ background: accent }}>Book Online</a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-6 h-6 text-[#1A1A2E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={mobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/></svg>
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-white border-t px-6 pb-4" style={{ borderColor: `${accent}15` }}>
            {['Services', 'Our Team', 'Bookings', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenu(false)} className="block py-3 text-[0.9rem] font-500 text-[#4A5568] border-b" style={{ borderColor: `${accent}10` }}>{item}</a>
            ))}
            <a href="#bookings" className="mt-4 block text-center px-5 py-3 rounded-lg text-[0.9rem] font-600 text-white" style={{ background: accent }}>Book Online</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ background: 'white', borderColor: `${accent}25` }}>
            <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <span className="text-[0.78rem] font-600" style={{ color: accent }}>Now accepting new patients</span>
          </div>
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-700 text-[#1A1A2E] leading-[1.1] mb-5">
            Your health, in caring hands
          </h1>
          <p className="text-[1.05rem] text-[#5A6B7F] leading-relaxed max-w-[560px] mx-auto mb-8">
            Bayview Medical Centre provides comprehensive, patient-centred healthcare for individuals and families across the Sunshine Coast.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#bookings" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[0.92rem] font-600 text-white transition-all hover:opacity-90" style={{ background: accent }}>
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Book an Appointment
            </a>
            <a href="tel:0754001234" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border text-[0.92rem] font-600 transition-all hover:border-[#14B8A6]" style={{ borderColor: `${accent}30`, color: '#1A1A2E' }}>
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              Call (07) 5400 1234
            </a>
          </div>
        </div>
      </section>

      {/* Services - 3 col grid */}
      <section id="services" className="py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 text-[#1A1A2E] mb-3">Our Services</h2>
            <p className="text-[0.95rem] text-[#5A6B7F] max-w-[480px] mx-auto">Comprehensive healthcare services delivered with expertise and genuine care.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border transition-all hover:shadow-lg hover:-translate-y-0.5" style={{ borderColor: `${accent}12` }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: `${accent}10` }}>
                  <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </div>
                <h3 className="text-[1.05rem] font-600 text-[#1A1A2E] mb-2">{s.name}</h3>
                <p className="text-[0.85rem] text-[#5A6B7F] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section id="our-team" className="py-16 md:py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 text-[#1A1A2E] mb-3">Meet Our Team</h2>
            <p className="text-[0.95rem] text-[#5A6B7F] max-w-[460px] mx-auto">Experienced practitioners dedicated to your wellbeing.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((t, i) => (
              <div key={i} className="text-center p-6 rounded-xl border" style={{ borderColor: `${accent}12` }}>
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[1.05rem] font-600 text-[#1A1A2E] mb-1">{t.name}</h3>
                <p className="text-[0.82rem] font-500 mb-1" style={{ color: accent }}>{t.role}</p>
                <p className="text-[0.78rem] text-[#8A96A6]">{t.qual}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Booking */}
      <section id="bookings" className="py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 text-[#1A1A2E] mb-3">Book Online</h2>
            <p className="text-[0.95rem] text-[#5A6B7F]">Select a day and time that suits you.</p>
          </div>
          <div className="bg-white rounded-xl border p-6 overflow-x-auto" style={{ borderColor: `${accent}12` }}>
            <div className="min-w-[600px]">
              <div className="grid grid-cols-6 gap-0 border-b" style={{ borderColor: `${accent}12` }}>
                <div className="p-3 text-[0.78rem] font-600 text-[#8A96A6] uppercase tracking-wider">Time</div>
                {bookingDays.map(d => (
                  <div key={d} className="p-3 text-[0.78rem] font-600 text-[#1A1A2E] uppercase tracking-wider text-center">{d.slice(0, 3)}</div>
                ))}
              </div>
              {bookingSlots.map(slot => (
                <div key={slot} className="grid grid-cols-6 gap-0 border-b last:border-0" style={{ borderColor: `${accent}08` }}>
                  <div className="p-3 text-[0.82rem] font-500 text-[#5A6B7F]">{slot}</div>
                  {bookingDays.map(d => {
                    const avail = Math.random() > 0.4
                    return (
                      <div key={d} className="p-3 text-center">
                        {avail ? (
                          <button className="px-3 py-1.5 rounded-md text-[0.78rem] font-500 border transition-all hover:border-[#14B8A6] hover:text-[#14B8A6]" style={{ borderColor: `${accent}20`, color: accent }}>
                            {slot}
                          </button>
                        ) : (
                          <span className="text-[0.78rem] text-[#C4CEDB] line-through">{slot}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Health Fund Badges */}
      <section className="py-10">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <p className="text-[0.82rem] text-[#8A96A6] uppercase tracking-wider font-600 mb-6">Accepted Health Funds</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {['Medicare', 'Bupa', 'Medibank', 'HCF', 'NIB', 'HBF'].map(fund => (
              <div key={fund} className="px-5 py-3 bg-white rounded-lg border text-[0.85rem] font-600 text-[#4A5568]" style={{ borderColor: `${accent}15` }}>
                {fund}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 text-[#1A1A2E] mb-3">What Our Patients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rachel M.', text: 'Dr. Chen took the time to really listen. I finally feel like my health concerns are being addressed properly.' },
              { name: 'David K.', text: 'The online booking system is fantastic. No waiting on hold, just pick a time and show up. Easy.' },
              { name: 'Priya S.', text: 'Clean, modern clinic with friendly staff. The team here genuinely cares about their patients.' },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-xl border" style={{ borderColor: `${accent}12` }}>
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-4 h-4" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[0.9rem] text-[#4A5568] leading-relaxed mb-4">{t.text}</p>
                <p className="text-[0.82rem] font-600 text-[#1A1A2E]">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 md:py-20">
        <div className="max-w-[600px] mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 text-[#1A1A2E] mb-3">Get in Touch</h2>
            <p className="text-[0.95rem] text-[#5A6B7F]">Have a question? Send us a message and we will get back to you.</p>
          </div>
          <div className="bg-white rounded-xl border p-6 md:p-8" style={{ borderColor: `${accent}12` }}>
            <div className="space-y-4">
              <div>
                <label className="block text-[0.82rem] font-500 text-[#4A5568] mb-1.5">Full Name</label>
                <input type="text" placeholder="Your full name" className="w-full px-4 py-3 rounded-lg border text-[0.9rem] focus:outline-none focus:ring-2 transition-all" style={{ borderColor: `${accent}20` }} />
              </div>
              <div>
                <label className="block text-[0.82rem] font-500 text-[#4A5568] mb-1.5">Email</label>
                <input type="email" placeholder="you@email.com" className="w-full px-4 py-3 rounded-lg border text-[0.9rem] focus:outline-none focus:ring-2 transition-all" style={{ borderColor: `${accent}20` }} />
              </div>
              <div>
                <label className="block text-[0.82rem] font-500 text-[#4A5568] mb-1.5">Phone</label>
                <input type="tel" placeholder="04XX XXX XXX" className="w-full px-4 py-3 rounded-lg border text-[0.9rem] focus:outline-none focus:ring-2 transition-all" style={{ borderColor: `${accent}20` }} />
              </div>
              <div>
                <label className="block text-[0.82rem] font-500 text-[#4A5568] mb-1.5">Message</label>
                <textarea rows="4" placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border text-[0.9rem] focus:outline-none focus:ring-2 transition-all resize-none" style={{ borderColor: `${accent}20` }} />
              </div>
              <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-600 transition-all hover:opacity-90" style={{ background: accent }}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t" style={{ borderColor: `${accent}15` }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: accent }}>
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <span className="text-[0.9rem] font-700 text-[#1A1A2E]">{brand}</span>
            </div>
            <div className="flex items-center gap-6 text-[0.82rem] text-[#5A6B7F]">
              <span>12 Bayview Rd, Maroochydore QLD</span>
              <span>(07) 5400 1234</span>
            </div>
            <p className="text-[0.72rem] text-[#8A96A6]">ABN 00 000 000 000</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ============================================================
// HealthCare - Warm soft, patient-focused
// #FDF8F4 bg, #7DB88F accent, warm text
// Patient stories, accordion services, gentle CTA, accessibility
// ============================================================
export function HealthCare() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [openService, setOpenService] = useState(null)
  const accent = '#7DB88F'
  const bg = '#FDF8F4'
  const brand = 'Harmony Health'
  const warmText = '#4A3F35'
  const mutedText = '#8A7E72'

  const services = [
    { name: 'General Practice', desc: 'Our GPs provide thorough, unhurried consultations. We take the time to understand your full health picture, not just your immediate symptoms. Bulk billing available for eligible patients.' },
    { name: 'Chronic Disease Management', desc: 'Living with a chronic condition? We create personalised care plans that bring together your specialists, allied health providers, and support network under one coordinated approach.' },
    { name: 'Women\'s Health', desc: 'From contraception and fertility through to menopause management, our female practitioners provide compassionate, confidential care in a comfortable setting.' },
    { name: 'Children\'s Health', desc: 'Immunisations, developmental checks, and childhood illness management. We make visits calm and positive for little ones and their parents.' },
    { name: 'Allied Health Referrals', desc: 'Need a physio, psychologist, dietitian, or podiatrist? We coordinate referrals and shared care plans so you get the right support without the runaround.' },
    { name: 'Preventative Screenings', desc: 'Regular health checks, cancer screenings, and risk assessments catch problems early when they are most treatable. Prevention is always better than cure.' },
  ]

  const stories = [
    { name: 'Margaret, 68', title: 'Finding the right care at the right time', text: 'After years of putting everyone else first, Margaret finally found a practice that put her first. A routine screening picked up an early warning sign that changed everything.', highlight: 'Early detection saved my life. The team here treated me like family, not a number.' },
    { name: 'Tom, 34', title: 'Managing chronic pain without feeling dismissed', text: 'Tom had seen four different doctors before coming to Harmony Health. He was tired of being told his pain was just stress.', highlight: 'For the first time, someone actually listened. We built a plan together and my quality of life has improved dramatically.' },
    { name: 'Aisha, 27', title: 'Navigating anxiety with the right support', text: 'Aisha was reluctant to seek help for anxiety, worried about judgement. A friend recommended the practice.', highlight: 'They made the whole process feel normal and manageable. No pressure, no shame, just support.' },
  ]

  return (
    <div className="min-h-screen" style={{ background: bg }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#FDF8F4]/95 backdrop-blur-md border-b" style={{ borderColor: `${accent}20` }}>
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </div>
            <span className="text-[1rem] font-700 tracking-tight" style={{ color: warmText }}>{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Stories', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[0.85rem] font-500 transition-colors hover:opacity-70" style={{ color: mutedText }}>{item}</a>
            ))}
            <a href="#contact" className="px-5 py-2 rounded-full text-[0.85rem] font-600 text-white transition-all hover:opacity-90" style={{ background: accent }}>Make an Enquiry</a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-6 h-6" style={{ color: warmText }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={mobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/></svg>
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t px-6 pb-4" style={{ borderColor: `${accent}15` }}>
            {['Services', 'Stories', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="block py-3 text-[0.9rem] font-500 border-b" style={{ color: mutedText, borderColor: `${accent}10` }}>{item}</a>
            ))}
            <a href="#contact" className="mt-4 block text-center px-5 py-3 rounded-full text-[0.9rem] font-600 text-white" style={{ background: accent }}>Make an Enquiry</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: `${accent}15` }}>
              <svg className="w-4 h-4" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              <span className="text-[0.8rem] font-600" style={{ color: accent }}>Patient-centred healthcare</span>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-700 leading-[1.1] mb-5" style={{ color: warmText }}>
              Healthcare that puts you first
            </h1>
            <p className="text-[1.05rem] leading-relaxed mb-8" style={{ color: mutedText }}>
              At Harmony Health, every consultation is unhurried, every concern is heard, and every patient is treated with the respect and warmth they deserve. Your health journey matters to us.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[0.92rem] font-600 text-white transition-all hover:opacity-90" style={{ background: accent }}>
                Make an Enquiry
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border text-[0.92rem] font-500 transition-all hover:opacity-70" style={{ borderColor: `${accent}30`, color: warmText }}>
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Stories */}
      <section id="stories" className="py-16 md:py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 mb-3" style={{ color: warmText }}>Patient Stories</h2>
            <p className="text-[0.95rem] max-w-[480px] mx-auto" style={{ color: mutedText }}>Real experiences from people who found the care they needed.</p>
          </div>
          <div className="space-y-6">
            {stories.map((s, i) => (
              <div key={i} className="p-6 md:p-8 rounded-2xl border" style={{ borderColor: `${accent}18`, background: bg }}>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-[0.9rem] font-700 text-white" style={{ background: accent }}>
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-[0.82rem] font-600 mb-1" style={{ color: accent }}>{s.name}</p>
                    <h3 className="text-[1.1rem] font-600 mb-3" style={{ color: warmText }}>{s.title}</h3>
                    <p className="text-[0.9rem] leading-relaxed mb-4" style={{ color: mutedText }}>{s.text}</p>
                    <div className="pl-4 border-l-2 italic" style={{ borderColor: accent, color: warmText }}>
                      <p className="text-[0.9rem] leading-relaxed">{s.highlight}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Accordion */}
      <section id="services" className="py-16 md:py-20">
        <div className="max-w-[700px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 mb-3" style={{ color: warmText }}>Our Services</h2>
            <p className="text-[0.95rem]" style={{ color: mutedText }}>Click any service to learn more about how we can help.</p>
          </div>
          <div className="space-y-3">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: `${accent}18` }}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenService(openService === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${accent}15` }}>
                      <svg className="w-4 h-4" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    </div>
                    <span className="text-[0.95rem] font-600" style={{ color: warmText }}>{s.name}</span>
                  </div>
                  <svg className="w-5 h-5 transition-transform flex-shrink-0" style={{ color: accent, transform: openService === i ? 'rotate(180deg)' : 'rotate(0deg)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {openService === i && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="pl-11">
                      <p className="text-[0.88rem] leading-relaxed" style={{ color: mutedText }}>{s.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gentle CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: `${accent}15` }}>
            <svg className="w-8 h-8" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </div>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 mb-4" style={{ color: warmText }}>Ready to take the first step?</h2>
          <p className="text-[0.95rem] mb-8" style={{ color: mutedText }}>
            Whether you need a check-up, have a specific concern, or simply want to register with a practice that cares, we are here for you.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[1rem] font-600 text-white transition-all hover:opacity-90" style={{ background: accent }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            Make an Enquiry
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Jenny L.', text: 'I have never felt so comfortable at a doctor\'s surgery. The whole team is warm and welcoming.' },
              { name: 'Robert H.', text: 'They took the time to explain everything clearly. No rush, no jargon. Just genuine care.' },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border" style={{ borderColor: `${accent}18` }}>
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-4 h-4" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[0.9rem] leading-relaxed mb-3" style={{ color: mutedText }}>{t.text}</p>
                <p className="text-[0.82rem] font-600" style={{ color: warmText }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility Statement */}
      <section className="py-10 bg-white">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <div className="p-6 rounded-2xl border" style={{ borderColor: `${accent}18`, background: bg }}>
            <svg className="w-6 h-6 mx-auto mb-3" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <h3 className="text-[0.95rem] font-600 mb-2" style={{ color: warmText }}>Accessibility Commitment</h3>
            <p className="text-[0.82rem] leading-relaxed" style={{ color: mutedText }}>
              Our clinic is wheelchair accessible with designated parking, hearing loop equipped reception, and AUSLAN interpreters available on request. We are committed to ensuring every patient can access quality healthcare with dignity and ease.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 md:py-20">
        <div className="max-w-[560px] mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 mb-3" style={{ color: warmText }}>Get in Touch</h2>
            <p className="text-[0.95rem]" style={{ color: mutedText }}>We would love to hear from you. Fill in the form below and we will be in touch soon.</p>
          </div>
          <div className="bg-white rounded-2xl border p-6 md:p-8" style={{ borderColor: `${accent}18` }}>
            <div className="space-y-4">
              <div>
                <label className="block text-[0.82rem] font-500 mb-1.5" style={{ color: mutedText }}>Your Name</label>
                <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-lg border text-[0.9rem] focus:outline-none focus:ring-2 transition-all" style={{ borderColor: `${accent}20`, color: warmText }} />
              </div>
              <div>
                <label className="block text-[0.82rem] font-500 mb-1.5" style={{ color: mutedText }}>Email Address</label>
                <input type="email" placeholder="you@email.com" className="w-full px-4 py-3 rounded-lg border text-[0.9rem] focus:outline-none focus:ring-2 transition-all" style={{ borderColor: `${accent}20`, color: warmText }} />
              </div>
              <div>
                <label className="block text-[0.82rem] font-500 mb-1.5" style={{ color: mutedText }}>Phone Number</label>
                <input type="tel" placeholder="04XX XXX XXX" className="w-full px-4 py-3 rounded-lg border text-[0.9rem] focus:outline-none focus:ring-2 transition-all" style={{ borderColor: `${accent}20`, color: warmText }} />
              </div>
              <div>
                <label className="block text-[0.82rem] font-500 mb-1.5" style={{ color: mutedText }}>How can we help?</label>
                <textarea rows="4" placeholder="Tell us a bit about what you need..." className="w-full px-4 py-3 rounded-lg border text-[0.9rem] focus:outline-none focus:ring-2 transition-all resize-none" style={{ borderColor: `${accent}20`, color: warmText }} />
              </div>
              <button className="w-full py-3.5 rounded-full text-white text-[0.92rem] font-600 transition-all hover:opacity-90" style={{ background: accent }}>
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t" style={{ borderColor: `${accent}18` }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: accent }}>
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </div>
              <span className="text-[0.9rem] font-700" style={{ color: warmText }}>{brand}</span>
            </div>
            <div className="flex items-center gap-6 text-[0.82rem]" style={{ color: mutedText }}>
              <span>45 Harmony Lane, Byron Bay NSW</span>
              <span>(02) 6680 1234</span>
            </div>
            <p className="text-[0.72rem]" style={{ color: mutedText }}>ABN 00 000 000 000</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ============================================================
// HealthTelehealth - Dark modern, tech-forward
// #0A0A0A bg, #14B8A6 accent
// Hero, 3-step flow, video mockup, pulsing indicator, booking form
// ============================================================
export function HealthTelehealth() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const accent = '#14B8A6'
  const brand = 'QuickCare'

  const steps = [
    { num: '01', title: 'Book', desc: 'Choose a time that works. Appointments available 7 days a week, 7am to 10pm.', icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> },
    { num: '02', title: 'Connect', desc: 'Join a secure video call from your phone, tablet, or computer. No app download needed.', icon: <><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></> },
    { num: '03', title: 'Get Care', desc: 'See an Australian-registered doctor. Get prescriptions, referrals, and medical certificates sent instantly.', icon: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></> },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-4.5 h-4.5 text-[#0A0A0A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <span className="text-[0.9rem] font-700 tracking-tight">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['How It Works', 'Features', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-[0.82rem] font-500 text-[#A1A1AA] hover:text-white transition-colors">{item}</a>
            ))}
            <a href="#book" className="px-5 py-2 rounded-lg text-[0.82rem] font-700 transition-all hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]" style={{ background: accent, color: '#0A0A0A' }}>Book Now</a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={mobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/></svg>
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-[#0A0A0A] border-t border-white/[0.06] px-6 pb-4">
            {['How It Works', 'Features', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} onClick={() => setMobileMenu(false)} className="block py-3 text-[0.9rem] font-500 text-[#A1A1AA] border-b border-white/[0.04]">{item}</a>
            ))}
            <a href="#book" className="mt-4 block text-center px-5 py-3 rounded-lg text-[0.9rem] font-700" style={{ background: accent, color: '#0A0A0A' }}>Book Now</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-[120px] min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none" style={{ background: `${accent}06` }} />
        <div className="max-w-[1100px] mx-auto px-6 w-full">
          <div className="max-w-[720px] mx-auto text-center">
            {/* Pulsing Available Now */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ background: `${accent}08`, borderColor: `${accent}20` }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accent }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: accent }} />
              </span>
              <span className="text-[0.75rem] font-600 tracking-[0.08em] uppercase" style={{ color: accent }}>Available Now</span>
            </div>

            <h1 className="text-[clamp(2.2rem,5.5vw,3.8rem)] font-700 leading-[1.05] mb-5">
              See a doctor<br />from your couch
            </h1>
            <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[500px] mx-auto mb-8">
              Australian-registered GPs, available by video call in under 15 minutes. Prescriptions sent to your phone. No waiting rooms.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#book" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[0.92rem] font-700 transition-all hover:shadow-[0_0_40px_rgba(20,184,166,0.25)]" style={{ background: accent, color: '#0A0A0A' }}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Book a Call
              </a>
              <a href="#how-it-works" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.1] text-[0.92rem] font-600 hover:border-white/[0.2] transition-all">
                How It Works
              </a>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-8 justify-center mt-12 pt-8 border-t border-white/[0.06]">
              {[
                { val: '<15 min', label: 'Wait Time' },
                { val: '50,000+', label: 'Consults' },
                { val: '4.9', label: 'App Rating' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-[1.3rem] font-700" style={{ color: accent }}>{s.val}</div>
                  <div className="text-[0.72rem] text-[#71717A] uppercase tracking-[0.08em]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Flow */}
      <section id="how-it-works" className="py-20 md:py-24 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 mb-3">How It Works</h2>
            <p className="text-[0.95rem] text-[#A1A1AA]">Three steps to seeing a doctor from anywhere in Australia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector lines (desktop) */}
            <div className="hidden md:block absolute top-[60px] left-[calc(33.33%+8px)] right-[calc(33.33%+8px)] h-[2px]" style={{ background: `${accent}20` }} />
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-[120px] mx-auto mb-6 relative">
                  <div className="w-[120px] h-[120px] rounded-2xl border flex items-center justify-center mx-auto relative" style={{ borderColor: `${accent}20`, background: `${accent}04` }}>
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{step.icon}</svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-[0.7rem] font-700" style={{ background: accent, color: '#0A0A0A' }}>
                    {step.num}
                  </div>
                </div>
                <h3 className="text-[1.2rem] font-600 mb-2">{step.title}</h3>
                <p className="text-[0.85rem] text-[#A1A1AA] leading-relaxed max-w-[280px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Call Mockup */}
      <section id="features" className="py-20 md:py-24 bg-[#0E0E0E] border-y border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 mb-3">Your Consultation, Reimagined</h2>
            <p className="text-[0.95rem] text-[#A1A1AA]">Secure video calls with Australian-registered doctors. No downloads required.</p>
          </div>
          {/* Browser chrome mockup */}
          <div className="max-w-[700px] mx-auto">
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: `${accent}15` }}>
              {/* Browser top bar */}
              <div className="bg-[#1A1A1A] px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-[#0A0A0A] rounded-md px-3 py-1.5 text-[0.72rem] text-[#71717A] text-center">
                    quickcare.com.au/consult/dr-chen
                  </div>
                </div>
              </div>
              {/* Video call area */}
              <div className="relative bg-[#111] aspect-video flex items-center justify-center">
                {/* Main doctor area */}
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-[1.6rem] font-700" style={{ background: `${accent}20`, color: accent }}>
                    DC
                  </div>
                  <p className="text-[0.9rem] font-600 mb-1">Dr. Chen</p>
                  <p className="text-[0.72rem] text-[#71717A]">Connected 03:42</p>
                </div>
                {/* Self-view PIP */}
                <div className="absolute bottom-4 right-4 w-28 h-20 rounded-lg bg-[#1A1A1A] border border-white/[0.08] flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[0.7rem] font-600" style={{ background: `${accent}15`, color: accent }}>
                    You
                  </div>
                </div>
                {/* Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                  {[
                    { icon: <><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>, active: true },
                    { icon: <><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></>, active: true },
                    { icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>, active: false },
                  ].map((ctrl, i) => (
                    <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: ctrl.active ? `${accent}20` : '#DC262620', border: ctrl.active ? 'none' : '1px solid #DC262640' }}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={ctrl.active ? accent : '#DC2626'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ctrl.icon}</svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, title: 'Secure & Private', desc: 'End-to-end encryption. Your health data stays in Australia.' },
              { icon: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>, title: 'Australian Doctors', desc: 'Every practitioner is AHPRA-registered and based in Australia.' },
              { icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>, title: 'Prescriptions Instantly', desc: 'E-scripts sent to your phone. Pick up at any pharmacy.' },
              { icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>, title: 'Medical Certificates', desc: 'Valid certificates for work, school, or centrelink. Sent digitally.' },
              { icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>, title: 'Specialist Referrals', desc: 'Need a specialist? Get a referral letter during your consultation.' },
              { icon: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>, title: 'Medicare Rebates', desc: 'Eligible consultations bulk billed. No upfront cost for Medicare cardholders.' },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${accent}10` }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </div>
                <h3 className="text-[1rem] font-600 mb-2">{f.title}</h3>
                <p className="text-[0.82rem] text-[#A1A1AA] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-[#0E0E0E] border-y border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 mb-3">Trusted by Thousands</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Lauren T.', text: 'I saw a doctor on my lunch break without leaving the office. Prescription was at my pharmacy within the hour. Incredible.' },
              { name: 'Sam W.', text: 'Living rural, getting to a GP was always a hassle. QuickCare changed everything. The video quality is crystal clear.' },
              { name: 'Mei L.', text: 'My kids were sick at 9pm on a Sunday. Had a consult within 10 minutes. The doctor was thorough and kind. A lifesaver.' },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/[0.06]">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-4 h-4" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed mb-4">{t.text}</p>
                <p className="text-[0.82rem] font-600">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Booking Form */}
      <section id="book" className="py-20 md:py-24">
        <div className="max-w-[500px] mx-auto px-6">
          <div className="text-center mb-8">
            {/* Pulsing indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ background: `${accent}08`, borderColor: `${accent}20` }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accent }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: accent }} />
              </span>
              <span className="text-[0.78rem] font-600" style={{ color: accent }}>Doctors available now</span>
            </div>
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 mb-3">Book Instantly</h2>
            <p className="text-[0.95rem] text-[#A1A1AA]">Enter your details and we will connect you with a doctor right away.</p>
          </div>
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="space-y-4">
              <div>
                <label className="block text-[0.82rem] font-500 text-[#A1A1AA] mb-1.5">Your Name</label>
                <input type="text" placeholder="Full name" className="w-full px-4 py-3 rounded-lg border border-white/[0.08] bg-[#0E0E0E] text-white text-[0.9rem] focus:outline-none focus:border-[#14B8A6] transition-all placeholder:text-[#52525B]" />
              </div>
              <div>
                <label className="block text-[0.82rem] font-500 text-[#A1A1AA] mb-1.5">Phone Number</label>
                <input type="tel" placeholder="04XX XXX XXX" className="w-full px-4 py-3 rounded-lg border border-white/[0.08] bg-[#0E0E0E] text-white text-[0.9rem] focus:outline-none focus:border-[#14B8A6] transition-all placeholder:text-[#52525B]" />
              </div>
              <button className="w-full py-4 rounded-xl text-[0.95rem] font-700 transition-all hover:shadow-[0_0_40px_rgba(20,184,166,0.25)]" style={{ background: accent, color: '#0A0A0A' }}>
                Connect Now
              </button>
              <p className="text-[0.72rem] text-[#52525B] text-center">By booking, you agree to our terms. Medicare bulk billing available for eligible patients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-20 bg-[#0E0E0E] border-t border-white/[0.06]">
        <div className="max-w-[600px] mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-700 mb-3">Need Help?</h2>
            <p className="text-[0.95rem] text-[#A1A1AA]">Our support team is here to assist you with any questions.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[0.82rem] font-500 text-[#A1A1AA] mb-1.5">Name</label>
              <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-lg border border-white/[0.08] bg-[#0A0A0A] text-white text-[0.9rem] focus:outline-none focus:border-[#14B8A6] transition-all placeholder:text-[#52525B]" />
            </div>
            <div>
              <label className="block text-[0.82rem] font-500 text-[#A1A1AA] mb-1.5">Email</label>
              <input type="email" placeholder="you@email.com" className="w-full px-4 py-3 rounded-lg border border-white/[0.08] bg-[#0A0A0A] text-white text-[0.9rem] focus:outline-none focus:border-[#14B8A6] transition-all placeholder:text-[#52525B]" />
            </div>
            <div>
              <label className="block text-[0.82rem] font-500 text-[#A1A1AA] mb-1.5">Message</label>
              <textarea rows="4" placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-white/[0.08] bg-[#0A0A0A] text-white text-[0.9rem] focus:outline-none focus:border-[#14B8A6] transition-all resize-none placeholder:text-[#52525B]" />
            </div>
            <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-600 border transition-all hover:border-[#14B8A6]" style={{ borderColor: `${accent}30` }}>
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: accent }}>
                <svg className="w-3.5 h-3.5 text-[#0A0A0A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <span className="text-[0.85rem] font-700">{brand}</span>
            </div>
            <div className="flex items-center gap-6 text-[0.78rem] text-[#71717A]">
              <span>Available Australia-wide</span>
              <span>support@quickcare.com.au</span>
            </div>
            <p className="text-[0.68rem] text-[#52525B]">ABN 00 000 000 000 | AHPRA Reg. #MED0000000000</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
