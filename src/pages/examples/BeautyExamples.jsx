import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ===== BEAUTY LOOKBOOK - Soft pink/rose, gallery-first, elegant =====
// Layout: Soft romantic palette. 6 lookbook cards with hover overlay.
// Services as visual grid. Treatment menu as elegant list. Booking with service selector.
function BeautyLookbook() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const bg = '#FFF0F3'
  const accent = '#B76E79'
  const dark = '#3D2C2E'
  const mid = '#8B6B70'
  const light = '#FFF0F3'
  const brand = 'Rose & Co. Beauty'

  const lookbookCards = [
    { title: 'Bridal Glow', category: 'Bridal', desc: 'Radiant skin for your perfect day', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format' },
    { title: 'Evening Elegance', category: 'Makeup', desc: 'Sculpted and luminous for any event', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&auto=format' },
    { title: 'Skin Revival', category: 'Facial', desc: 'Deep hydration and renewal', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&auto=format' },
    { title: 'Lash Luxe', category: 'Lashes', desc: 'Volume and lift for every gaze', img: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee5a3f?w=400&h=300&fit=crop&auto=format' },
    { title: 'Nail Artistry', category: 'Nails', desc: 'Bespoke designs, flawless finish', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop&auto=format' },
    { title: 'Brow Sculpt', category: 'Brows', desc: 'Defined, natural, and polished', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&auto=format' },
  ]

  const services = [
    { icon: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />, title: 'Facials', desc: 'Customised skin treatments for every complexion' },
    { icon: <g><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></g>, title: 'Makeup', desc: 'From natural glam to full editorial looks' },
    { icon: <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />, title: 'Lashes & Brows', desc: 'Lifting, tinting, and extensions' },
    { icon: <g><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /></g>, title: 'Nails', desc: 'Gel, acrylic, and nail art' },
  ]

  const treatments = [
    { name: 'Signature Facial', duration: '60 min', price: '$120' },
    { name: 'Hydra Glow Treatment', duration: '75 min', price: '$155' },
    { name: 'Bridal Makeup & Trial', duration: '120 min', price: '$280' },
    { name: 'Event Makeup', duration: '60 min', price: '$110' },
    { name: 'Lash Lift & Tint', duration: '45 min', price: '$85' },
    { name: 'Brow Sculpt & Tint', duration: '30 min', price: '$65' },
    { name: 'Gel Manicure', duration: '45 min', price: '$70' },
    { name: 'Luxury Pedicure', duration: '60 min', price: '$90' },
  ]

  return (
    <div className="min-h-screen" style={{ background: bg, color: dark }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: 'rgba(255,240,243,0.92)', borderColor: 'rgba(183,110,121,0.12)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            </div>
            <span className="text-[0.95rem] font-700 tracking-[0.04em]" style={{ color: dark }}>{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#lookbook" className="text-[0.85rem] transition-colors" style={{ color: mid }}>Lookbook</a>
            <a href="#services" className="text-[0.85rem] transition-colors" style={{ color: mid }}>Services</a>
            <a href="#menu" className="text-[0.85rem] transition-colors" style={{ color: mid }}>Menu</a>
            <a href="#booking" className="px-5 py-2.5 rounded-lg text-white text-[0.85rem] font-600 transition-all hover:opacity-90" style={{ background: accent }}>Book Now</a>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
          </button>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t" style={{ borderColor: 'rgba(183,110,121,0.12)', background: bg }}>
              <div className="px-6 py-4 space-y-3">
                <a href="#lookbook" className="block text-[0.9rem]" style={{ color: mid }} onClick={() => setMobileMenu(false)}>Lookbook</a>
                <a href="#services" className="block text-[0.9rem]" style={{ color: mid }} onClick={() => setMobileMenu(false)}>Services</a>
                <a href="#menu" className="block text-[0.9rem]" style={{ color: mid }} onClick={() => setMobileMenu(false)}>Menu</a>
                <a href="#booking" className="block text-[0.9rem] font-600" style={{ color: accent }} onClick={() => setMobileMenu(false)}>Book Now</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero - elegant, soft */}
      <section className="pt-[120px] pb-[80px] relative overflow-hidden">
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none" style={{ background: `${accent}10` }} />
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="max-w-[700px] mx-auto text-center">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.16em] mb-5" style={{ color: accent }}>Beauty Redefined</span>
            <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] font-700 leading-[1.08] mb-5" style={{ color: dark }}>
              Your beauty story,<br />told with care.
            </h1>
            <p className="text-[1.05rem] leading-relaxed mb-8 max-w-[480px] mx-auto" style={{ color: mid }}>
              From everyday radiance to bridal perfection, our studio creates looks that feel like you, only more luminous.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#booking" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-[0.92rem] font-600 transition-all hover:opacity-90" style={{ background: accent }}>
                Book Your Session
              </a>
              <a href="#lookbook" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border text-[0.92rem] font-600 transition-all" style={{ borderColor: `${accent}30`, color: accent }}>
                View Lookbook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook - 6 cards with hover overlay */}
      <section id="lookbook" className="py-[80px]" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>Our Work</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700" style={{ color: dark }}>The Lookbook</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lookbookCards.map((card, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: 'rgba(61,44,46,0.85)' }}>
                  <span className="text-[0.68rem] font-600 uppercase tracking-[0.14em] text-white/60 mb-2">{card.category}</span>
                  <h3 className="text-[1.2rem] font-700 text-white mb-2">{card.title}</h3>
                  <p className="text-[0.85rem] text-white/70">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - visual grid */}
      <section id="services" className="py-[80px]" style={{ background: bg }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>What We Offer</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700" style={{ color: dark }}>Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <div key={i} className="rounded-2xl p-6 border transition-all hover:shadow-lg" style={{ background: '#FFFFFF', borderColor: 'rgba(183,110,121,0.1)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: `${accent}10` }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </div>
                <h3 className="text-[1rem] font-700 mb-1.5" style={{ color: dark }}>{s.title}</h3>
                <p className="text-[0.88rem]" style={{ color: mid }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Menu - elegant list */}
      <section id="menu" className="py-[80px]" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[700px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>Our Menu</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700" style={{ color: dark }}>Treatment Menu</h2>
          </div>
          <div className="space-y-0 rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(183,110,121,0.1)' }}>
            {treatments.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-5 gap-4" style={{ background: i % 2 === 0 ? 'rgba(255,240,243,0.5)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(183,110,121,0.08)' : 'none' }}>
                <div className="flex-1">
                  <h3 className="text-[0.92rem] font-600 mb-0.5" style={{ color: dark }}>{t.name}</h3>
                  <span className="text-[0.78rem]" style={{ color: mid }}>{t.duration}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[0.92rem] font-700" style={{ color: accent }}>{t.price}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[0.82rem] mt-6" style={{ color: mid }}>
            All prices include GST. Package discounts available. <a href="#booking" style={{ color: accent }} className="underline">Book now</a>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[80px]" style={{ background: bg }}>
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10" style={{ color: dark }}>What our clients say</h2>
          <div className="space-y-5">
            {[
              { name: 'Eloise M.', area: 'Bondi', quote: 'My bridal makeup was absolutely flawless. It lasted the entire day and looked even better in photos. Could not have asked for more.' },
              { name: 'Priya K.', area: 'Surry Hills', quote: 'The signature facial left my skin glowing for days. The whole experience felt so nurturing and personal.' },
              { name: 'Sophie T.', area: 'Paddington', quote: 'I have never felt so confident leaving a salon. The brow sculpt completely changed my face. I am obsessed.' },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border" style={{ borderColor: 'rgba(183,110,121,0.1)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-[0.78rem] font-700" style={{ background: accent }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-3 h-3" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </div>
                    <p className="text-[0.88rem] leading-relaxed mb-2" style={{ color: mid }}>"{r.quote}"</p>
                    <p className="text-[0.78rem] font-600" style={{ color: dark }}>{r.name} <span style={{ color: mid }}> - {r.area}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA with service selector */}
      <section id="booking" className="py-[80px]" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[520px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3" style={{ color: dark }}>Book your session</h2>
          <p className="text-[1rem] mb-10" style={{ color: mid }}>Choose your service and we will confirm your appointment within the hour.</p>
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,240,243,0.5)', borderColor: 'rgba(183,110,121,0.1)' }}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your name" className="rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ background: bg, border: '1px solid rgba(183,110,121,0.15)', color: dark }} onFocus={e => e.target.style.borderColor = `${accent}50`} onBlur={e => e.target.style.borderColor = 'rgba(183,110,121,0.15)'} />
                <input type="tel" placeholder="Phone number" className="rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ background: bg, border: '1px solid rgba(183,110,121,0.15)', color: dark }} onFocus={e => e.target.style.borderColor = `${accent}50`} onBlur={e => e.target.style.borderColor = 'rgba(183,110,121,0.15)'} />
              </div>
              <select className="w-full rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ background: bg, border: '1px solid rgba(183,110,121,0.15)', color: mid }}>
                <option>Select a service</option>
                <option>Signature Facial</option>
                <option>Hydra Glow Treatment</option>
                <option>Bridal Makeup & Trial</option>
                <option>Event Makeup</option>
                <option>Lash Lift & Tint</option>
                <option>Brow Sculpt & Tint</option>
                <option>Gel Manicure</option>
                <option>Luxury Pedicure</option>
              </select>
              <input type="date" className="w-full rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ background: bg, border: '1px solid rgba(183,110,121,0.15)', color: mid }} onFocus={e => e.target.style.borderColor = `${accent}50`} onBlur={e => e.target.style.borderColor = 'rgba(183,110,121,0.15)'} />
              <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-600 transition-all hover:opacity-90" style={{ background: accent }}>
                Confirm Booking
              </button>
            </div>
          </div>
          <p className="text-[0.75rem] mt-5" style={{ color: mid }}>Cancellations require 24 hours notice. We respect your time.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t" style={{ borderColor: 'rgba(183,110,121,0.12)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            </div>
            <span className="text-[0.82rem] font-700" style={{ color: dark }}>{brand}</span>
          </div>
          <p className="text-[0.7rem]" style={{ color: mid }}>ABN 00 000 000 000 | Sydney NSW</p>
        </div>
      </footer>
    </div>
  )
}

// ===== BEAUTY GLOW - Dark elegant, pink accent, gold touches =====
// Layout: Full-screen glowing hero. Before & After pairs. Premium packages as dark cards with gold borders.
// Star ratings on testimonials. 'Book Your Glow Up' form.
function BeautyGlow() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const bg = '#0A0A0A'
  const pink = '#EC4899'
  const gold = '#D4AF37'
  const dark = '#0A0A0A'
  const mid = '#A1A1AA'
  const brand = 'GLOW Studio'

  const beforeAfter = [
    { title: 'Skin Transformation', before: 'Dull, uneven complexion with visible pigmentation', after: 'Luminous, even-toned skin with lasting radiance', beforeImg: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop&auto=format', afterImg: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&auto=format' },
    { title: 'Brow Redesign', before: 'Over-plucked, sparse brows with no definition', after: 'Full, sculpted brows that frame the face naturally', beforeImg: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop&auto=format', afterImg: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&auto=format' },
    { title: 'Lash Enhancement', before: 'Short, straight lashes requiring daily mascara', after: 'Dramatic lift and volume that lasts for weeks', beforeImg: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop&auto=format', afterImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&auto=format' },
  ]

  const packages = [
    { name: 'The Glow', price: '$199', features: ['Signature facial', 'Brow sculpt & tint', 'Lash lift'], popular: false },
    { name: 'The Radiance', price: '$349', features: ['Hydra glow treatment', 'Full makeup application', 'Brow sculpt & tint', 'Lash lift & tint'], popular: true },
    { name: 'The Lumiere', price: '$499', features: ['Premium facial', 'Bridal-style makeup', 'Brow design', 'Lash extensions', 'Gel manicure', 'Luxury pedicure'], popular: false },
  ]

  return (
    <div className="min-h-screen text-white" style={{ background: bg }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/[0.06]" style={{ background: 'rgba(10,10,10,0.92)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${pink}, ${gold})` }}>
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span className="text-[0.95rem] font-700 tracking-[0.06em]">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#results" className="text-[0.85rem] text-[#A1A1AA] hover:text-white transition-colors">Results</a>
            <a href="#packages" className="text-[0.85rem] text-[#A1A1AA] hover:text-white transition-colors">Packages</a>
            <a href="#reviews" className="text-[0.85rem] text-[#A1A1AA] hover:text-white transition-colors">Reviews</a>
            <a href="#book" className="px-5 py-2.5 rounded-lg text-[0.85rem] font-600 transition-all hover:opacity-90" style={{ background: pink, color: '#000' }}>Book Your Glow Up</a>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
          </button>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t border-white/[0.06]" style={{ background: dark }}>
              <div className="px-6 py-4 space-y-3">
                <a href="#results" className="block text-[0.9rem] text-[#A1A1AA]" onClick={() => setMobileMenu(false)}>Results</a>
                <a href="#packages" className="block text-[0.9rem] text-[#A1A1AA]" onClick={() => setMobileMenu(false)}>Packages</a>
                <a href="#reviews" className="block text-[0.9rem] text-[#A1A1AA]" onClick={() => setMobileMenu(false)}>Reviews</a>
                <a href="#book" className="block text-[0.9rem] font-600" style={{ color: pink }} onClick={() => setMobileMenu(false)}>Book Your Glow Up</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero - full-screen glowing */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none" style={{ background: `${pink}08` }} />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none" style={{ background: `${gold}06` }} />
        <div className="max-w-[1100px] mx-auto px-6 w-full">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ background: `${pink}08`, borderColor: `${pink}20` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: pink }} />
              <span className="text-[0.75rem] font-600 tracking-[0.08em] uppercase" style={{ color: pink }}>Premium Beauty Studio</span>
            </div>
            <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-700 leading-[1.02] mb-5">
              Unleash your<br /><span style={{ color: pink }}>glow</span>.
            </h1>
            <p className="text-[1.1rem] text-[#A1A1AA] leading-relaxed max-w-[500px] mx-auto mb-10">
              Where science meets artistry. Transformative treatments designed to reveal your most radiant self.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#book" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[1rem] font-700 transition-all hover:shadow-[0_0_50px_rgba(236,72,153,0.25)]" style={{ background: pink, color: '#000' }}>
                Book Your Glow Up
              </a>
              <a href="#results" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.12] text-white text-[1rem] font-600 hover:border-white/[0.25] transition-all">
                See Results
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After - side-by-side pairs */}
      <section id="results" className="py-[80px]" style={{ background: '#0E0E0E' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.16em] mb-3" style={{ color: pink }}>Real Results</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">Before & After</h2>
          </div>
          <div className="space-y-6">
            {beforeAfter.map((pair, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl p-6 border border-white/[0.06] relative overflow-hidden" style={{ background: '#141414' }}>
                  <span className="absolute top-4 left-4 text-[0.68rem] font-600 uppercase tracking-[0.1em] px-3 py-1 rounded-full z-10" style={{ background: 'rgba(255,255,255,0.06)', color: '#71717A' }}>Before</span>
                  <div className="flex items-center justify-center min-h-[180px] mb-4 overflow-hidden rounded-xl">
                    <img src={pair.beforeImg} alt={`${pair.title} before`} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-[0.95rem] font-700 mb-1">{pair.title}</h3>
                  <p className="text-[0.82rem] text-[#71717A]">{pair.before}</p>
                </div>
                <div className="rounded-2xl p-6 border relative overflow-hidden" style={{ background: '#141414', borderColor: `${pink}20` }}>
                  <span className="absolute top-4 left-4 text-[0.68rem] font-600 uppercase tracking-[0.1em] px-3 py-1 rounded-full z-10" style={{ background: `${pink}15`, color: pink }}>After</span>
                  <div className="flex items-center justify-center min-h-[180px] mb-4 overflow-hidden rounded-xl">
                    <img src={pair.afterImg} alt={`${pair.title} after`} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-[0.95rem] font-700 mb-1">{pair.title}</h3>
                  <p className="text-[0.82rem]" style={{ color: pink }}>{pair.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium packages - dark cards with gold borders */}
      <section id="packages" className="py-[80px]" style={{ background: bg }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.16em] mb-3" style={{ color: gold }}>Premium Packages</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">Invest in your glow</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <div key={i} className="relative rounded-2xl p-6 transition-all hover:shadow-lg" style={{ background: '#141414', border: pkg.popular ? `2px solid ${gold}` : '1px solid rgba(255,255,255,0.06)' }}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[0.68rem] font-600 uppercase tracking-[0.1em]" style={{ background: gold, color: '#000' }}>
                    Most Popular
                  </div>
                )}
                <h3 className="text-[1.1rem] font-700 mb-1">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-[2rem] font-700" style={{ color: pink }}>{pkg.price}</span>
                  <span className="text-[0.78rem] text-[#71717A]">per session</span>
                </div>
                <ul className="space-y-3">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-[0.88rem]">
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      <span className="text-[#A1A1AA]">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#book" className="block text-center mt-6 py-3 rounded-xl text-[0.88rem] font-600 transition-all" style={{ background: pkg.popular ? pink : 'rgba(255,255,255,0.06)', color: pkg.popular ? '#000' : '#A1A1AA', border: pkg.popular ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                  Select Package
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with star ratings */}
      <section id="reviews" className="py-[80px]" style={{ background: '#0E0E0E' }}>
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">What our clients say</h2>
          <div className="space-y-5">
            {[
              { name: 'Victoria L.', rating: 5, area: 'Melbourne', quote: 'The Radiance package was a game-changer. My skin has never looked this good. The team made me feel like a VIP from start to finish.' },
              { name: 'Amara J.', rating: 5, area: 'South Yarra', quote: 'I was nervous about lash extensions but they listened to exactly what I wanted. Natural yet dramatic. I am coming back every month.' },
              { name: 'Rachel W.', rating: 5, area: 'Richmond', quote: 'Booked the Lumiere for my wedding. Every detail was perfect. My makeup lasted through tears, dancing, and the whole night. Absolutely worth it.' },
            ].map((r, i) => (
              <div key={i} className="bg-[#141414] border border-white/[0.06] rounded-xl p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4" viewBox="0 0 24 24" fill={j < r.rating ? gold : '#333'}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[0.9rem] text-[#A1A1AA] leading-relaxed mb-3">"{r.quote}"</p>
                <p className="text-[0.82rem] font-600">{r.name} <span className="text-[#71717A] font-400"> - {r.area}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Your Glow Up form */}
      <section id="book" className="py-[80px]" style={{ background: bg }}>
        <div className="max-w-[520px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Book Your Glow Up</h2>
          <p className="text-[1rem] text-[#A1A1AA] mb-10">Select your package and preferred date. We will confirm within 2 hours.</p>
          <div className="rounded-2xl p-6 bg-[#141414] border border-white/[0.06] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your name" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white placeholder-[#71717A] focus:outline-none transition-colors" onFocus={e => e.target.style.borderColor = `${pink}50`} onBlur={e => e.target.style.borderColor = ''} />
              <input type="email" placeholder="Email address" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white placeholder-[#71717A] focus:outline-none transition-colors" onFocus={e => e.target.style.borderColor = `${pink}50`} onBlur={e => e.target.style.borderColor = ''} />
            </div>
            <input type="tel" placeholder="Phone number" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white placeholder-[#71717A] focus:outline-none transition-colors" onFocus={e => e.target.style.borderColor = `${pink}50`} onBlur={e => e.target.style.borderColor = ''} />
            <select className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#71717A] focus:outline-none transition-colors" onFocus={e => e.target.style.borderColor = `${pink}50`} onBlur={e => e.target.style.borderColor = ''}>
              <option>Select a package</option>
              <option>The Glow - $199</option>
              <option>The Radiance - $349</option>
              <option>The Lumiere - $499</option>
              <option>Custom Treatment</option>
            </select>
            <input type="date" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#71717A] focus:outline-none transition-colors" onFocus={e => e.target.style.borderColor = `${pink}50`} onBlur={e => e.target.style.borderColor = ''} />
            <button className="w-full py-3.5 rounded-xl text-[0.92rem] font-700 transition-all hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]" style={{ background: pink, color: '#000' }}>
              Book Your Glow Up
            </button>
          </div>
          <p className="text-[0.72rem] text-[#71717A] mt-4">Premium service, premium experience. No hidden costs.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]" style={{ background: bg }}>
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${pink}, ${gold})` }}>
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <span className="text-[0.82rem] font-600">{brand}</span>
          </div>
          <p className="text-[0.7rem] text-[#71717A]">ABN 00 000 000 000 | Melbourne VIC</p>
        </div>
      </footer>
    </div>
  )
}

// ===== BEAUTY SUITE - White/minimal, black accents, subtle pink =====
// Layout: Private studio feel. Single-column tall cards (image left, text right).
// Meet Your Stylist bio. Simple 2-field booking form. Elegant thin-line footer.
function BeautySuite() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const bg = '#FAFAFA'
  const dark = '#1A1A1A'
  const mid = '#888888'
  const pink = '#F5E6E8'
  const accent = '#D4A0A7'
  const brand = 'The Suite'

  const services = [
    { title: 'Precision Facial', desc: 'A customised 60-minute facial tailored to your skins unique needs. Deep cleansing, exfoliation, and targeted serums for visible results from the very first visit.', duration: '60 min', price: '$130', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop&auto=format' },
    { title: 'Bespoke Makeup', desc: 'From a natural daytime look to a full editorial transformation. We work with you to create a look that feels authentic and elevated, never overdone.', duration: '75 min', price: '$145', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format' },
    { title: 'Brow Architecture', desc: 'Mapping, shaping, and tinting to create brows that perfectly frame your face. A precise, measured approach that delivers consistent results every time.', duration: '30 min', price: '$75', img: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee5a3f?w=400&h=300&fit=crop&auto=format' },
    { title: 'Lash Design', desc: 'Hand-applied individual extensions or a stunning lift and tint. Choose your level of drama and we will deliver it with meticulous attention to detail.', duration: '90 min', price: '$180', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&auto=format' },
  ]

  return (
    <div className="min-h-screen" style={{ background: bg, color: dark }}>
      {/* Nav - minimal, refined */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.04]">
        <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <span className="text-[0.88rem] font-700 tracking-[0.1em] uppercase">{brand}</span>
            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-[0.78rem]" style={{ color: mid }}>Services</a>
              <a href="#stylist" className="text-[0.78rem]" style={{ color: mid }}>Stylist</a>
              <a href="#reviews" className="text-[0.78rem]" style={{ color: mid }}>Reviews</a>
            </div>
          </div>
          <a href="#book" className="px-5 py-2 rounded-full text-[0.78rem] font-600 hover:bg-[#2A2A2A] transition-colors" style={{ background: dark, color: '#FFF' }}>Book a Session</a>
        </div>
      </nav>

      {/* Hero - minimal, private studio feel */}
      <section className="pt-[120px] pb-[80px]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="max-w-[600px]">
            <span className="inline-block text-[0.68rem] font-600 uppercase tracking-[0.2em] mb-6" style={{ color: accent }}>Private Studio | By Appointment</span>
            <h1 className="text-[clamp(2.2rem,4.5vw,3.2rem)] font-700 leading-[1.08] mb-5" style={{ color: dark }}>
              Beauty, one client<br />at a time.
            </h1>
            <div className="w-12 h-[1px] mb-5" style={{ background: accent }} />
            <p className="text-[1rem] leading-relaxed mb-8 max-w-[440px]" style={{ color: mid }}>
              A private studio experience where every treatment is tailored, every detail is considered, and your appointment is yours alone.
            </p>
            <div className="flex gap-4">
              <a href="#book" className="px-6 py-3 rounded-full text-[0.85rem] font-600 hover:bg-[#2A2A2A] transition-colors" style={{ background: dark, color: '#FFF' }}>Book a Session</a>
              <a href="#services" className="px-6 py-3 rounded-full border text-[0.85rem] font-600 hover:border-[#1A1A1A] transition-all" style={{ borderColor: 'rgba(26,26,26,0.15)', color: dark }}>View Services</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services - single column, tall cards, image left + text right */}
      <section id="services" className="py-[80px]" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[0.68rem] font-600 uppercase tracking-[0.2em] mb-3" style={{ color: accent }}>Our Services</span>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-700" style={{ color: dark }}>What we offer</h2>
          </div>
          <div className="space-y-5">
            {services.map((s, i) => (
              <div key={i} className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-black/[0.04] transition-all hover:shadow-sm" style={{ background: '#FAFAFA' }}>
                {/* Image placeholder left */}
                <div className="md:w-[280px] shrink-0 aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                </div>
                {/* Text right */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[1.1rem] font-700" style={{ color: dark }}>{s.title}</h3>
                    <span className="text-[0.92rem] font-700 shrink-0" style={{ color: accent }}>{s.price}</span>
                  </div>
                  <p className="text-[0.88rem] leading-relaxed mb-3" style={{ color: mid }}>{s.desc}</p>
                  <span className="text-[0.75rem] font-600 uppercase tracking-[0.08em]" style={{ color: accent }}>{s.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Stylist - personal bio section */}
      <section id="stylist" className="py-[80px]" style={{ background: bg }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            {/* Portrait placeholder */}
            <div className="md:col-span-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&auto=format" alt="Claudia Whitmore" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Bio */}
            <div className="md:col-span-3">
              <span className="inline-block text-[0.68rem] font-600 uppercase tracking-[0.2em] mb-4" style={{ color: accent }}>Meet Your Stylist</span>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-700 leading-tight mb-5" style={{ color: dark }}>
                Claudia Whitmore
              </h2>
              <div className="w-10 h-[1px] mb-5" style={{ background: accent }} />
              <p className="text-[0.95rem] leading-relaxed mb-4" style={{ color: mid }}>
                With over 12 years in the beauty industry, Claudia opened The Suite to offer something rare: a space where every client receives undivided attention, expert technique, and genuine care.
              </p>
              <p className="text-[0.95rem] leading-relaxed mb-6" style={{ color: mid }}>
                Trained in Paris and Melbourne, she specialises in precision facials and bespoke makeup. Her philosophy is simple: less is more, and quality always speaks for itself.
              </p>
              <div className="flex flex-wrap gap-6">
                <div>
                  <div className="text-[1.5rem] font-700" style={{ color: dark }}>12+</div>
                  <div className="text-[0.72rem] uppercase tracking-[0.08em]" style={{ color: mid }}>Years Experience</div>
                </div>
                <div>
                  <div className="text-[1.5rem] font-700" style={{ color: dark }}>500+</div>
                  <div className="text-[0.72rem] uppercase tracking-[0.08em]" style={{ color: mid }}>Happy Clients</div>
                </div>
                <div>
                  <div className="text-[1.5rem] font-700" style={{ color: dark }}>5.0</div>
                  <div className="text-[0.72rem] uppercase tracking-[0.08em]" style={{ color: mid }}>Google Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-[80px]" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-700 text-center mb-10" style={{ color: dark }}>Client experiences</h2>
          <div className="space-y-5">
            {[
              { name: 'Hannah R.', area: 'Kew', quote: 'The Suite is unlike any salon I have been to. Claudia takes the time to really understand what you want. The results speak for themselves.' },
              { name: 'Mei Lin C.', area: 'Hawthorn', quote: 'I have been coming here for six months and my skin has completely transformed. The precision facial is worth every cent.' },
              { name: 'Emma B.', area: 'Camberwell', quote: 'Booking my wedding makeup with Claudia was the best decision. She made me feel like the most beautiful version of myself. Truly special.' },
            ].map((r, i) => (
              <div key={i} className="rounded-xl p-5 border border-black/[0.04]" style={{ background: '#FAFAFA' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[0.78rem] font-700 text-white" style={{ background: dark }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-3 h-3" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </div>
                    <p className="text-[0.88rem] leading-relaxed mb-2" style={{ color: mid }}>"{r.quote}"</p>
                    <p className="text-[0.78rem] font-600" style={{ color: dark }}>{r.name} <span style={{ color: mid }}> - {r.area}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple 2-field booking form */}
      <section id="book" className="py-[80px]" style={{ background: bg }}>
        <div className="max-w-[460px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-700 mb-3" style={{ color: dark }}>Book a session</h2>
          <p className="text-[0.95rem] mb-8" style={{ color: mid }}>Leave your name and number. We will be in touch within the hour to arrange your appointment.</p>
          <div className="rounded-2xl p-6 border border-black/[0.04]" style={{ background: '#FFFFFF' }}>
            <div className="space-y-4">
              <input type="text" placeholder="Your name" className="w-full bg-[#FAFAFA] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ color: dark }} onFocus={e => e.target.style.borderColor = `${accent}50`} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.06)'} />
              <input type="tel" placeholder="Phone number" className="w-full bg-[#FAFAFA] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ color: dark }} onFocus={e => e.target.style.borderColor = `${accent}50`} onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.06)'} />
              <button className="w-full py-3.5 rounded-xl text-[0.92rem] font-600 hover:bg-[#2A2A2A] transition-colors" style={{ background: dark, color: '#FFF' }}>
                Request Appointment
              </button>
            </div>
          </div>
          <p className="text-[0.72rem] mt-4" style={{ color: mid }}>Private studio. One client at a time. Your session, your space.</p>
        </div>
      </section>

      {/* Footer - elegant thin-line */}
      <footer className="py-8 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="max-w-[900px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.78rem] font-700 tracking-[0.1em] uppercase" style={{ color: dark }}>{brand}</span>
          <p className="text-[0.68rem]" style={{ color: mid }}>ABN 00 000 000 000 | By Appointment Only | Melbourne VIC</p>
        </div>
      </footer>
    </div>
  )
}

// ===== ROUTER COMPONENT =====
const TEMPLATES = { lookbook: BeautyLookbook, glow: BeautyGlow, suite: BeautySuite }

export default function BeautyExamples() {
  const { template } = useParams()
  const Component = TEMPLATES[template]

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[140px]" style={{ background: '#FAFAFA' }}>
        <div className="text-center">
          <h1 className="text-2xl font-700 mb-4" style={{ color: '#1A1A1A' }}>Template not found</h1>
          <Link to="/for/beauty" className="hover:underline" style={{ color: '#B76E79' }}>Back to Beauty</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Component />
      {/* Floating "Get a site like this" CTA */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <Link
          to="/for/beauty"
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-[0.82rem] font-600 shadow-[0_4px_24px_rgba(183,110,121,0.3)] hover:shadow-[0_4px_32px_rgba(183,110,121,0.4)] transition-all"
          style={{ background: '#B76E79' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
          Get a site like this
        </Link>
      </div>
    </>
  )
}

export { BeautyLookbook, BeautyGlow, BeautySuite }
