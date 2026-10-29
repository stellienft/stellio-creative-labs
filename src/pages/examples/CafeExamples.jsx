import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ===== CAFE MENU - Warm amber, menu-board style =====
// Layout: Menu-first. Food categories with prices. Reservation form.
// For cafes whose menu sells the visit.
export function CafeMenu() {
  const accent = '#F59E0B'
  const bg = '#FFF8F0'
  const dark = '#2D1B0E'
  const mid = '#8B6F5C'
  const brand = 'Sunrise Espresso'

  const menuCategories = [
    {
      name: 'Breakfast',
      items: [
        { name: 'Smashed Avocado', price: '$18', desc: 'Sourdough, feta, chilli flakes, lime' },
        { name: 'Big Brekkie Roll', price: '$16', desc: 'Egg, bacon, relish, aioli on brioche' },
        { name: 'Acai Bowl', price: '$17', desc: 'Granola, banana, berries, coconut' },
      ]
    },
    {
      name: 'Lunch',
      items: [
        { name: 'Chicken Schnitty', price: '$22', desc: 'Slaw, chips, gravy' },
        { name: 'Fish Tacos', price: '$20', desc: 'Battered fish, slaw, lime crema x3' },
        { name: 'Pumpkin Salad', price: '$18', desc: 'Feta, walnuts, pomegranate, balsamic' },
      ]
    },
    {
      name: 'Coffee',
      items: [
        { name: 'Flat White', price: '$5', desc: 'Double ristretto, silky milk' },
        { name: 'Long Black', price: '$4.50', desc: 'House blend or single origin' },
        { name: 'Iced Latte', price: '$6', desc: 'Cold brew, your milk' },
      ]
    },
    {
      name: 'Sweet',
      items: [
        { name: 'Banana Bread', price: '$7', desc: 'Warm, buttered, with honey' },
        { name: 'Pistachio Slice', price: '$8', desc: 'House-made, rosewater cream' },
        { name: 'Choc Brownie', price: '$7', desc: 'Fudgy centre, sea salt' },
      ]
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: bg, color: dark }}>
      {/* Nav - simple, warm */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: 'rgba(255,248,240,0.95)', borderColor: 'rgba(245,158,11,0.12)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>
            </div>
            <span className="text-[0.95rem] font-700 tracking-[0.02em]">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-[0.85rem] hover:opacity-70 transition-opacity" style={{ color: mid }}>Menu</a>
            <a href="#about" className="text-[0.85rem] hover:opacity-70 transition-opacity" style={{ color: mid }}>Our Story</a>
            <a href="#reviews" className="text-[0.85rem] hover:opacity-70 transition-opacity" style={{ color: mid }}>Reviews</a>
            <a href="#reserve" className="px-5 py-2 rounded-lg text-white text-[0.85rem] font-600 transition-opacity hover:opacity-90" style={{ background: accent }}>Reserve a Table</a>
          </div>
        </div>
      </nav>

      {/* Hero - warm, inviting */}
      <section className="pt-[100px] pb-[60px]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-5" style={{ color: accent }}>Open 6am - 3pm Daily</span>
          <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-700 leading-[1.05] mb-5">
            Coffee that starts<br />your day right.
          </h1>
          <p className="text-[1.05rem] leading-relaxed max-w-[520px] mx-auto mb-8" style={{ color: mid }}>
            Freshly roasted. Locally baked. A place where the coffee is as good as the conversation. Pull up a chair.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#menu" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-[0.92rem] font-600 transition-opacity hover:opacity-90" style={{ background: accent }}>
              View Our Menu
            </a>
            <a href="#reserve" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border text-[0.92rem] font-600 transition-all" style={{ borderColor: `${accent}30`, color: accent }}>
              Book a Table
            </a>
          </div>
        </div>
      </section>

      {/* Opening hours strip */}
      <section className="py-4 border-y" style={{ borderColor: 'rgba(245,158,11,0.12)', background: 'rgba(245,158,11,0.04)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex flex-wrap justify-center gap-6 text-center">
          {[
            { day: 'Mon - Fri', hours: '6am - 3pm' },
            { day: 'Saturday', hours: '7am - 3pm' },
            { day: 'Sunday', hours: '7am - 2pm' },
          ].map((h, i) => (
            <div key={i}>
              <span className="text-[0.82rem] font-600">{h.day}</span>
              <span className="text-[0.82rem] ml-2" style={{ color: mid }}>{h.hours}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Menu - the star of the show */}
      <section id="menu" className="py-[80px]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4" style={{ color: accent }}>Our Menu</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">What we serve</h2>
          </div>

          <div className="space-y-10">
            {menuCategories.map((cat, ci) => (
              <div key={ci}>
                <h3 className="text-[1.1rem] font-700 mb-4 pb-2 border-b" style={{ borderColor: 'rgba(245,158,11,0.15)' }}>{cat.name}</h3>
                <div className="space-y-3">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="flex items-baseline justify-between gap-4 rounded-xl p-4" style={{ background: ci % 2 === 0 ? 'rgba(255,255,255,0.6)' : 'transparent' }}>
                      <div>
                        <span className="text-[0.92rem] font-600">{item.name}</span>
                        <p className="text-[0.78rem] mt-0.5" style={{ color: mid }}>{item.desc}</p>
                      </div>
                      <span className="text-[0.92rem] font-700 shrink-0" style={{ color: accent }}>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[0.82rem] mt-8" style={{ color: mid }}>
            Prices include GST. Vegan and GF options available - just ask.
          </p>
        </div>
      </section>

      {/* Our story - brief */}
      <section id="about" className="py-[80px]" style={{ background: 'rgba(245,158,11,0.04)' }}>
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4" style={{ color: accent }}>Our Story</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-6">Started with a bag of beans</h2>
          <p className="text-[1rem] leading-relaxed mb-6" style={{ color: mid }}>
            Sunrise Espresso opened in 2019 with one goal: serve the best coffee in Springfield. We source our beans from a micro-roaster in Byron Bay, bake everything in-house, and treat every customer like a regular. Because you are.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { num: '2019', label: 'Est.' },
              { num: '4.9', label: 'Google Rating' },
              { num: '300+', label: 'Coffees Daily' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[1.3rem] font-700" style={{ color: accent }}>{s.num}</div>
                <div className="text-[0.72rem] uppercase tracking-[0.08em]" style={{ color: mid }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-[80px]">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">What people say</h2>
          <div className="space-y-5">
            {[
              { name: 'Emma L.', quote: 'Best flat white in the area, hands down. The banana bread is dangerous - I order it every time.' },
              { name: 'Josh & Kate R.', quote: 'Our weekend ritual. Kids love the acai bowls, we love the coffee. Win win.' },
              { name: 'Priya M.', quote: 'Finally a cafe that takes gluten-free seriously. The pumpkin salad is incredible.' },
            ].map((r, i) => (
              <div key={i} className="rounded-xl p-5 border" style={{ background: 'rgba(255,255,255,0.5)', borderColor: 'rgba(245,158,11,0.1)' }}>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[0.9rem] leading-relaxed mb-3" style={{ color: mid }}>&ldquo;{r.quote}&rdquo;</p>
                <p className="text-[0.82rem] font-600">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation form */}
      <section id="reserve" className="py-[80px]" style={{ background: 'rgba(245,158,11,0.04)' }}>
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Reserve a table</h2>
          <p className="text-[0.95rem] mb-8" style={{ color: mid }}>Walk-ins always welcome. Or lock in your spot.</p>
          <div className="rounded-2xl p-6 border space-y-4" style={{ background: 'rgba(255,255,255,0.6)', borderColor: 'rgba(245,158,11,0.1)' }}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ background: '#FFF8F0', border: '1px solid rgba(245,158,11,0.1)', color: dark }} />
              <input type="tel" placeholder="Phone" className="rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ background: '#FFF8F0', border: '1px solid rgba(245,158,11,0.1)', color: dark }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="date" className="rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ background: '#FFF8F0', border: '1px solid rgba(245,158,11,0.1)', color: mid }} />
              <select className="rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ background: '#FFF8F0', border: '1px solid rgba(245,158,11,0.1)', color: mid }}>
                <option>Guests</option><option>1-2</option><option>3-4</option><option>5-6</option><option>7+</option>
              </select>
            </div>
            <select className="w-full rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none transition-colors" style={{ background: '#FFF8F0', border: '1px solid rgba(245,158,11,0.1)', color: mid }}>
              <option>Time</option><option>7:00am</option><option>8:00am</option><option>9:00am</option><option>10:00am</option><option>11:00am</option><option>12:00pm</option><option>1:00pm</option>
            </select>
            <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-600 transition-opacity hover:opacity-90" style={{ background: accent }}>
              Book Table
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t" style={{ borderColor: 'rgba(245,158,11,0.12)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>
            </div>
            <span className="text-[0.82rem] font-700">{brand}</span>
          </div>
          <p className="text-[0.7rem]" style={{ color: mid }}>45 Springfield Ave, Springfield QLD | 07 3000 1234</p>
        </div>
      </footer>
    </div>
  )
}

// ===== CAFE VIBE - Dark/moody, atmospheric, Instagram-style =====
// Layout: Full-bleed hero. Photo grid. Founder story. Visit section.
// For cafes whose atmosphere is the product.
export function CafeVibe() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const accent = '#C87941'
  const brand = 'Nightcap Bar'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Thin elegant nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-[0.9rem] font-700 tracking-[0.06em]">{brand}</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#gallery" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Gallery</a>
            <a href="#story" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Our Story</a>
            <a href="#visit" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Visit</a>
            <a href="#drinks" className="px-4 py-2 rounded-full text-[0.78rem] font-600 border transition-colors hover:bg-white hover:text-[#0A0A0A]" style={{ borderColor: accent, color: accent }}>Drinks Menu</a>
          </div>
        </div>
      </nav>

      {/* Full-bleed hero - atmospheric */}
      <section className="pt-[80px] min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none" style={{ background: `${accent}10` }} />

        <div className="max-w-[800px] mx-auto px-6 text-center relative z-20">
          <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-8 block">Craft Cocktails - Springfield</span>
          <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-700 leading-[1.02] mb-6">
            Where the night<br />comes alive.
          </h1>
          <div className="w-16 h-[2px] mx-auto mb-6" style={{ background: accent }} />
          <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[480px] mx-auto mb-10">
            Craft cocktails, natural wine, and a room that knows how to set a mood. No rush. No pretence. Just good drinks and better company.
          </p>
          <a href="#visit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[0.85rem] font-600 text-[#0A0A0A] transition-opacity hover:opacity-90" style={{ background: accent }}>
            Find Us
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* Photo gallery - Instagram-style grid */}
      <section id="gallery" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-2 block">The Space</span>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">Step inside</h2>
            </div>
            <span className="text-[0.78rem] text-[#666] hidden sm:block">@nightcap.springfield</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Bar', color: '#1A1512', img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop&auto=format' },
              { label: 'Cocktail', color: '#151218', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop&auto=format' },
              { label: 'Interior', color: '#121518', img: 'https://images.unsplash.com/photo-1551133287304-03e60b6c2e80?w=400&h=300&fit=crop&auto=format' },
              { label: 'Wine Shelf', color: '#181512', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&auto=format' },
              { label: 'Corner Booth', color: '#151815', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&auto=format' },
              { label: 'Neon Sign', color: '#181215', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format' },
            ].map((img, i) => (
              <div key={i} className="aspect-square rounded-xl flex items-center justify-center group cursor-pointer overflow-hidden" style={{ background: img.color }}>
                <img src={img.img} alt={img.label} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story section */}
      <section id="story" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-4 block">Our Story</span>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 leading-tight mb-6">
                A room with<br />the right vibe.
              </h2>
              <p className="text-[0.95rem] text-[#A1A1AA] leading-relaxed mb-4">
                Nightcap started in 2021 when two friends decided Springfield needed a bar that took drinks seriously without taking itself seriously. We curate every spirit, train every bartender, and dim every light with intention.
              </p>
              <p className="text-[0.95rem] text-[#A1A1AA] leading-relaxed">
                No dress code. No guest list. Just walk in and let us pour you something you have not had before.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '50+', label: 'Cocktails' },
                { num: '30', label: 'Natural Wines' },
                { num: '4.8', label: 'Google Rating' },
                { num: '2021', label: 'Established' },
              ].map((s, i) => (
                <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 text-center">
                  <div className="text-[1.5rem] font-700" style={{ color: accent }}>{s.num}</div>
                  <div className="text-[0.72rem] text-[#71717A] uppercase tracking-[0.08em]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal scroll specials */}
      <section id="drinks" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-2 block">This Week</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-8">Seasonal specials</h2>
        </div>
        <div className="overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex gap-5" style={{ width: 'max-content' }}>
            {[
              { name: 'Blood Orange Negroni', price: '$22', desc: 'Gin, campari, blood orange, vermouth', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop&auto=format' },
              { name: 'Smoky Mezcal Sour', price: '$24', desc: 'Mezcal, lime, agave, egg white', img: 'https://images.unsplash.com/photo-1551133287304-03e60b6c2e80?w=400&h=300&fit=crop&auto=format' },
              { name: 'Yuzu Spritz', price: '$19', desc: 'Prosecco, yuzu, elderflower, soda', img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop&auto=format' },
              { name: 'Espresso Martini', price: '$21', desc: 'Vodka, coffee, kahlua, vanilla', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&h=300&fit=crop&auto=format' },
            ].map((d, i) => (
              <div key={i} className="w-[280px] shrink-0 bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
                <div className="w-full aspect-[4/3] rounded-xl mb-4 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[0.92rem] font-700 mb-1">{d.name}</h3>
                <p className="text-[0.78rem] text-[#71717A] mb-3">{d.desc}</p>
                <span className="text-[0.85rem] font-700" style={{ color: accent }}>{d.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit section */}
      <section id="visit" className="py-[80px]">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-8">Come find us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-6 text-left">
              <h3 className="text-[0.82rem] font-600 mb-3">Hours</h3>
              <div className="space-y-1.5 text-[0.82rem] text-[#A1A1AA]">
                <p>Tue - Thu: 5pm - 11pm</p>
                <p>Fri - Sat: 5pm - 1am</p>
                <p>Sunday: 4pm - 10pm</p>
                <p className="text-[#71717A]">Monday: Closed</p>
              </div>
            </div>
            <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-6 text-left">
              <h3 className="text-[0.82rem] font-600 mb-3">Location</h3>
              <p className="text-[0.82rem] text-[#A1A1AA]">12 Orion Lane<br />Springfield Central QLD 4300</p>
              <p className="text-[0.82rem] text-[#A1A1AA] mt-3">07 3000 5678</p>
              <p className="text-[0.82rem] mt-2" style={{ color: accent }}>Free parking behind the building</p>
            </div>
          </div>
          <p className="text-[0.82rem] text-[#71717A]">No bookings needed. Walk in and grab a seat.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.82rem] font-700 tracking-[0.04em]">{brand}</span>
          <p className="text-[0.7rem] text-[#71717A]">Liquor Licence #00000 | Springfield QLD</p>
        </div>
      </footer>
    </div>
  )
}

// ===== CAFE REGULAR - Cream/earthy, loyalty-focused, community =====
// Layout: Featured items. Loyalty card. Community board. "Your usual" feel.
// For neighbourhood cafes that live on repeat customers.
export function CafeRegular() {
  const accent = '#4A7C59'
  const bg = '#F5EDE0'
  const dark = '#2D2416'
  const mid = '#7A6F5E'
  const brand = 'The Corner Cup'

  return (
    <div className="min-h-screen" style={{ background: bg, color: dark }}>
      {/* Nav - friendly */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ background: 'rgba(245,237,224,0.95)', borderColor: 'rgba(74,124,89,0.12)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>
            </div>
            <span className="text-[0.9rem] font-700">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-[0.82rem]" style={{ color: mid }}>Menu</a>
            <a href="#loyalty" className="text-[0.82rem]" style={{ color: mid }}>Loyalty</a>
            <a href="#community" className="text-[0.82rem]" style={{ color: mid }}>Community</a>
            <a href="#join" className="px-4 py-2 rounded-lg text-white text-[0.82rem] font-600 transition-opacity hover:opacity-90" style={{ background: accent }}>Join the Fam</a>
          </div>
        </div>
      </nav>

      {/* Hero - "your usual" */}
      <section className="pt-[100px] pb-[60px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-5" style={{ color: accent }}>Your Neighbourhood Cafe</span>
            <h1 className="text-[clamp(2.2rem,5vw,3.2rem)] font-700 leading-[1.08] mb-5">
              Your usual,<br />made better.
            </h1>
            <p className="text-[1.05rem] leading-relaxed max-w-[480px] mx-auto mb-8" style={{ color: mid }}>
              The Corner Cup is the kind of place where we learn your name, your order, and how you like your eggs. Not fancy. Just right.
            </p>
          </div>
        </div>
      </section>

      {/* Featured items - 3 hero menu items */}
      <section id="menu" className="py-[60px]" style={{ background: 'rgba(74,124,89,0.04)' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'The Corner Brekkie', desc: 'Eggs your way, bacon, toast, tomato, hash brown. The works.', price: '$19', tag: 'Most Ordered', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&auto=format' },
              { name: 'House Blend Flat White', desc: 'Locally roasted. Smooth, chocolatey, never bitter.', price: '$5', tag: 'Our Signature', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format' },
              { name: 'Mums Banana Bread', desc: 'Our mums recipe. Warm, buttered, with a honey drizzle.', price: '$7', tag: 'Fan Favourite', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&auto=format' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border" style={{ background: 'rgba(255,255,255,0.6)', borderColor: 'rgba(74,124,89,0.1)' }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[0.95rem] font-700">{item.name}</h3>
                    <span className="text-[0.92rem] font-700" style={{ color: accent }}>{item.price}</span>
                  </div>
                  <p className="text-[0.82rem] mb-2" style={{ color: mid }}>{item.desc}</p>
                  <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-600" style={{ background: 'rgba(74,124,89,0.1)', color: accent }}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty card */}
      <section id="loyalty" className="py-[80px]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4" style={{ color: accent }}>Rewards</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Every 10th coffee is free</h2>
          <p className="text-[0.95rem] mb-8" style={{ color: mid }}>No app. No points. Just a stamp card we keep behind the counter with your name on it.</p>

          {/* Visual loyalty card */}
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(74,124,89,0.15)' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[0.82rem] font-700">{brand}</span>
              <span className="text-[0.68rem] uppercase tracking-[0.1em]" style={{ color: accent }}>Loyalty Card</span>
            </div>
            <div className="grid grid-cols-5 gap-3 mb-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl flex items-center justify-center" style={{ background: i < 7 ? accent : 'rgba(74,124,89,0.08)', border: i < 7 ? 'none' : '1px dashed rgba(74,124,89,0.2)' }}>
                  {i < 7 ? (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[0.78rem]" style={{ color: mid }}>7 of 10 stamps collected. 3 more to go!</p>
          </div>
        </div>
      </section>

      {/* Community board */}
      <section id="community" className="py-[80px]" style={{ background: 'rgba(74,124,89,0.04)' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4" style={{ color: accent }}>Community Board</span>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">More than a cafe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Saturday Markets', desc: 'We host a pop-up market on the first Saturday of every month. Local makers, live music, great vibes.', icon: 'calendar' },
              { title: 'Book Club', desc: 'Third Wednesday of each month. Come for the book, stay for the wine. All welcome.', icon: 'book' },
              { title: 'Kids Story Time', desc: 'Tuesday mornings at 9:30am. Free hot chocolate for the little ones while you grab a coffee.', icon: 'star' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl p-6 border" style={{ background: 'rgba(255,255,255,0.5)', borderColor: 'rgba(74,124,89,0.1)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(74,124,89,0.1)' }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon === 'calendar' && <g><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></g>}
                    {c.icon === 'book' && <g><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></g>}
                    {c.icon === 'star' && <g><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></g>}
                  </svg>
                </div>
                <h3 className="text-[0.92rem] font-700 mb-1">{c.title}</h3>
                <p className="text-[0.82rem]" style={{ color: mid }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Fam */}
      <section id="join" className="py-[80px]">
        <div className="max-w-[460px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Join the fam</h2>
          <p className="text-[0.95rem] mb-8" style={{ color: mid }}>Get early access to specials, events, and your very own loyalty card.</p>
          <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.5)', borderColor: 'rgba(74,124,89,0.1)' }}>
            <div className="flex gap-3">
              <input type="email" placeholder="Your email" className="flex-1 rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" style={{ background: bg, border: '1px solid rgba(74,124,89,0.1)', color: dark }} />
              <button className="px-6 py-3 rounded-xl text-white text-[0.88rem] font-600 transition-opacity hover:opacity-90 shrink-0" style={{ background: accent }}>
                Join
              </button>
            </div>
          </div>
          <p className="text-[0.72rem] mt-4" style={{ color: mid }}>No spam. Just good stuff. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t" style={{ borderColor: 'rgba(74,124,89,0.12)' }}>
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>
            </div>
            <span className="text-[0.82rem] font-700">{brand}</span>
          </div>
          <p className="text-[0.7rem]" style={{ color: mid }}>8 Springfield Blvd, Springfield QLD | 07 3000 4321</p>
        </div>
      </footer>
    </div>
  )
}
