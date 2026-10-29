import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ===== REAL ESTATE LISTINGS - Clean white, property grid, market stats =====
// Layout: Search bar hero. Property cards with filters. Market data sidebar.
// For agencies whose listings are the product.
export function RealEstateListings() {
  const [activeFilter, setActiveFilter] = useState('All')
  const accent = '#10B981'
  const brand = 'Greenfield Property'

  const properties = [
    { title: '4 Bed Family Home', suburb: 'Springfield Lakes', price: '$685,000', beds: 4, baths: 2, cars: 2, type: 'House', tag: 'New', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&auto=format' },
    { title: 'Modern Townhouse', suburb: 'Augustine Heights', price: '$520,000', beds: 3, baths: 2, cars: 1, type: 'Townhouse', tag: null, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&auto=format' },
    { title: 'Investment Apartment', suburb: 'Redbank Plains', price: '$385,000', beds: 2, baths: 1, cars: 1, type: 'Apartment', tag: 'Under Contract', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop&auto=format' },
    { title: 'Luxury Residence', suburb: 'Brookwater', price: '$1,250,000', beds: 5, baths: 3, cars: 3, type: 'House', tag: 'Premium', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&auto=format' },
    { title: 'First Home Starter', suburb: 'Goodna', price: '$340,000', beds: 3, baths: 1, cars: 1, type: 'House', tag: null, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&auto=format' },
    { title: 'Duplex Opportunity', suburb: 'Collingwood Park', price: '$475,000', beds: 3, baths: 2, cars: 2, type: 'House', tag: 'New', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop&auto=format' },
  ]

  const filters = ['All', 'House', 'Townhouse', 'Apartment']
  const filtered = activeFilter === 'All' ? properties : properties.filter(p => p.type === activeFilter)

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      {/* Nav - clean, professional */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span className="text-[0.9rem] font-700 tracking-[0.02em]">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#listings" className="text-[0.82rem] text-[#888] hover:text-[#1A1A1A] transition-colors">Listings</a>
            <a href="#market" className="text-[0.82rem] text-[#888] hover:text-[#1A1A1A] transition-colors">Market Data</a>
            <a href="#about" className="text-[0.82rem] text-[#888] hover:text-[#1A1A1A] transition-colors">About</a>
            <a href="#contact" className="px-5 py-2 rounded-lg text-white text-[0.82rem] font-600" style={{ background: accent }}>Free Appraisal</a>
          </div>
        </div>
      </nav>

      {/* Hero with search bar */}
      <section className="pt-[80px] pb-[60px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[700px]">
            <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-4 block">Ipswich & Springfield Region</span>
            <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] font-700 leading-[1.05] mb-4">
              Find your next<br />home in the growth corridor.
            </h1>
            <p className="text-[1rem] text-[#666] leading-relaxed mb-8">
              Springfield, Redbank Plains, Augustine Heights, and beyond. We know this market because we live in it.
            </p>
          </div>
          {/* Search bar */}
          <div className="flex gap-3 max-w-[600px]">
            <input type="text" placeholder="Search by suburb, postcode, or address" className="flex-1 bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none focus:border-black/20" />
            <button className="px-6 py-3 rounded-xl text-white text-[0.88rem] font-600 shrink-0" style={{ background: accent }}>Search</button>
          </div>
        </div>
      </section>

      {/* Market stats strip */}
      <section className="py-4 border-y border-black/[0.04] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap gap-8">
          {[
            { num: '142', label: 'Properties Sold This Year' },
            { num: '$532K', label: 'Median House Price' },
            { num: '14 days', label: 'Average Days on Market' },
            { num: '98%', label: 'Auction Clearance Rate' },
          ].map((s, i) => (
            <div key={i}>
              <span className="text-[1rem] font-700" style={{ color: accent }}>{s.num}</span>
              <span className="text-[0.78rem] text-[#999] ml-2">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Listings with filters */}
      <section id="listings" className="py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">Current listings</h2>
            <div className="flex gap-2">
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} className="px-4 py-2 rounded-lg text-[0.78rem] font-600 transition-all" style={{ background: activeFilter === f ? accent : 'transparent', color: activeFilter === f ? 'white' : '#999', border: activeFilter === f ? 'none' : '1px solid #DDD' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <div key={i} className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  {p.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[0.68rem] font-600 text-white" style={{ background: p.tag === 'Under Contract' ? '#EF4444' : p.tag === 'Premium' ? '#1A1A1A' : accent }}>{p.tag}</span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[0.95rem] font-700">{p.title}</h3>
                  </div>
                  <p className="text-[0.82rem] text-[#999] mb-3">{p.suburb}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[1.1rem] font-700" style={{ color: accent }}>{p.price}</span>
                    <div className="flex gap-3 text-[0.72rem] text-[#999]">
                      <span>{p.beds} bed</span>
                      <span>{p.baths} bath</span>
                      <span>{p.cars} car</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About agent */}
      <section id="about" className="py-[80px] bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-4 block">Your Agent</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-6">Local knowledge sells homes</h2>
          <p className="text-[0.95rem] text-[#666] leading-relaxed mb-6">
            Greenfield Property has been operating in the Springfield-Ipswich corridor since 2016. We do not cover the whole of Brisbane - we specialise in this pocket because we believe depth beats breadth. When you list with us, you get an agent who knows every street, every school zone, and every comparable sale within 2km.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-[0.85rem] font-600" style={{ background: accent }}>
            Get a Free Appraisal
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-[80px]">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Want to know what your home is worth?</h2>
          <p className="text-[0.95rem] text-[#666] mb-8">Free appraisal, no obligation. We will come to you.</p>
          <div className="bg-white border border-black/[0.06] rounded-2xl p-6 space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" />
              <input type="tel" placeholder="Phone" className="bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" />
            </div>
            <input type="text" placeholder="Property address" className="w-full bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" />
            <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-600" style={{ background: accent }}>Request Free Appraisal</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-black/[0.06] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.82rem] font-700">{brand}</span>
          <p className="text-[0.7rem] text-[#999]">QLD Real Estate Licence #00000 | Springfield QLD</p>
        </div>
      </footer>
    </div>
  )
}

// ===== REAL ESTATE AGENT - Personal brand, dark premium =====
// Layout: Agent profile hero. Sold properties. Testimonials. Expertise areas.
// For agents whose personal brand is the differentiator.
export function RealEstateAgent() {
  const accent = '#D4A853'
  const brand = 'Sarah Mitchell Property'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav - luxury feel */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-[0.85rem] font-700 tracking-[0.08em] uppercase">{brand}</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#sold" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Sold</a>
            <a href="#areas" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Areas</a>
            <a href="#reviews" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Reviews</a>
            <a href="#contact" className="px-5 py-2 rounded-lg text-[0.78rem] font-600 border transition-all hover:bg-white hover:text-[#0A0A0A]" style={{ borderColor: accent, color: accent }}>List With Sarah</a>
          </div>
        </div>
      </nav>

      {/* Agent profile hero */}
      <section className="pt-[100px] min-h-[70vh] flex items-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <span className="inline-block text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-5" style={{ color: accent }}>Premium Residential Agent</span>
              <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-700 leading-[1.05] mb-5">
                Your home deserves<br />a premium result.
              </h1>
              <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[480px] mb-8">
                I am Sarah Mitchell. I have sold over 200 homes in the Springfield-Ipswich corridor. Every listing gets my full attention, professional photography, and a campaign designed to find the right buyer - not just any buyer.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { num: '200+', label: 'Homes Sold' },
                  { num: '$180M+', label: 'Total Sales' },
                  { num: '4.9', label: 'Google Rating' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-[1.3rem] font-700" style={{ color: accent }}>{s.num}</div>
                    <div className="text-[0.72rem] text-[#71717A] uppercase tracking-[0.08em]">{s.label}</div>
                  </div>
                ))}
              </div>
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[#0A0A0A] text-[0.92rem] font-600 transition-opacity hover:opacity-90" style={{ background: accent }}>
                Book a Consultation
              </a>
            </div>
            <div className="md:col-span-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&auto=format" alt="Sarah Mitchell - Premium Residential Agent" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sold properties */}
      <section id="sold" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-2 block">Recent Results</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">Recently sold</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { address: '14 Greenfield Dr, Springfield Lakes', sold: '$725,000', type: '4 bed house', above: true, img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&auto=format' },
              { address: '7 Orion Cres, Augustine Heights', sold: '$580,000', type: '3 bed townhouse', above: true, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&auto=format' },
              { address: '22 Redbank Rd, Redbank Plains', sold: '$445,000', type: '3 bed house', above: false, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&auto=format' },
              { address: '5 Brookwater Blvd, Brookwater', sold: '$1,380,000', type: '5 bed house', above: true, img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop&auto=format' },
            ].map((p, i) => (
              <div key={i} className="flex gap-5 bg-[#111111] border border-white/[0.06] rounded-xl p-5">
                <div className="w-[100px] h-[80px] rounded-lg shrink-0 overflow-hidden">
                  <img src={p.img} alt={p.address} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-[0.88rem] font-600 mb-0.5">{p.address}</h3>
                  <p className="text-[0.78rem] text-[#71717A] mb-1.5">{p.type}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.92rem] font-700" style={{ color: accent }}>{p.sold}</span>
                    {p.above && <span className="px-2 py-0.5 rounded text-[0.62rem] font-600 bg-[#22C55E]/10 text-[#22C55E]">Above Reserve</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise areas */}
      <section id="areas" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">Areas I specialise in</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Springfield', 'Springfield Lakes', 'Springfield Central', 'Augustine Heights', 'Brookwater', 'Redbank Plains', 'Collingwood Park', 'Goodna', 'Bellbird Park', 'Redbank', 'Ipswich'].map(a => (
              <span key={a} className="px-4 py-2 rounded-xl border text-[0.82rem] font-500" style={{ borderColor: `${accent}30`, color: accent }}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Client reviews</h2>
          <div className="space-y-5">
            {[
              { name: 'Mark & Jenny T.', quote: 'Sarah sold our home in 9 days for above asking. Her marketing was impeccable and her negotiation skills are second to none. We could not have asked for a better result.', stars: 5 },
              { name: 'David L.', quote: 'As a buyer, Sarah was transparent and professional throughout. She did not pressure us and helped us find exactly what we were looking for. Highly recommend.', stars: 5 },
            ].map((r, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(r.stars)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[0.9rem] text-[#A1A1AA] leading-relaxed mb-3">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-[0.82rem] font-600">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-[80px]">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Ready to sell?</h2>
          <p className="text-[0.95rem] text-[#A1A1AA] mb-8">Book a free, no-obligation appraisal. I will give you an honest assessment of your home and a clear plan to get the best price.</p>
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
              <input type="tel" placeholder="Phone" className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            </div>
            <input type="text" placeholder="Property address" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <button className="w-full py-3.5 rounded-xl text-[#0A0A0A] text-[0.92rem] font-600" style={{ background: accent }}>Book Appraisal</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.78rem] font-700 tracking-[0.06em] uppercase">{brand}</span>
          <p className="text-[0.7rem] text-[#71717A]">QLD Real Estate Licence #00000 | Springfield QLD</p>
        </div>
      </footer>
    </div>
  )
}

// ===== REAL ESTATE AUCTION - Dark, urgency, red accent, bid registration =====
// Layout: Countdown-driven. Auction-focused. Bid registration. Urgency throughout.
// For agents who sell by auction and want to create urgency.
export function RealEstateAuction() {
  const accent = '#EF4444'
  const brand = 'AuctionHQ'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav - bold, urgent */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <span className="text-[0.85rem] font-700 tracking-[0.04em]">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#properties" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Upcoming Auctions</a>
            <a href="#how" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">How It Works</a>
            <a href="#register" className="px-4 py-2 rounded-lg text-white text-[0.78rem] font-600" style={{ background: accent }}>Register to Bid</a>
          </div>
        </div>
      </nav>

      {/* Hero - auction countdown */}
      <section className="pt-[100px] pb-[60px] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ background: `${accent}08` }} />
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ background: `${accent}08`, borderColor: `${accent}20` }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
            <span className="text-[0.75rem] font-600 tracking-[0.08em] uppercase" style={{ color: accent }}>Next Auction: This Saturday 10am</span>
          </div>
          <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-700 leading-[1.02] mb-5">
            Buy at auction.<br />No secrets. No games.
          </h1>
          <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[500px] mx-auto mb-10">
            Transparent buying. Every property goes to the highest bidder. Register once, bid on any property. It is that simple.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-[1rem] font-700 transition-all hover:shadow-[0_0_50px_rgba(239,68,68,0.2)]" style={{ background: accent }}>
              Register to Bid
            </a>
            <a href="#properties" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.12] text-[1rem] font-600 hover:border-white/[0.25] transition-all">
              View Properties
            </a>
          </div>
        </div>
      </section>

      {/* How auction works - 3 steps */}
      <section id="how" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Register', desc: 'Sign up with your ID and deposit. One registration works for all auctions.' },
              { step: '2', title: 'Inspect', desc: 'Attend open homes. Read the contract. Do your building and pest checks.' },
              { step: '3', title: 'Bid', desc: 'Show up on auction day. Bid live. Highest bid wins. Done.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-[1.2rem] font-700" style={{ background: `${accent}12`, color: accent }}>{s.step}</div>
                <h3 className="text-[1rem] font-700 mb-2">{s.title}</h3>
                <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming auctions */}
      <section id="properties" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">Upcoming auctions</h2>
          <div className="space-y-4">
            {[
              { address: '22 Grand Ave, Springfield Lakes', price: 'Guide $650K - $700K', date: 'Sat 15 Jul, 10:00am', beds: 4, type: 'House', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&auto=format' },
              { address: '8 Park Lane, Redbank Plains', price: 'Guide $400K - $440K', date: 'Sat 15 Jul, 11:30am', beds: 3, type: 'House', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&auto=format' },
              { address: '3/15 Market St, Augustine Heights', price: 'Guide $350K - $380K', date: 'Sat 22 Jul, 10:00am', beds: 2, type: 'Apartment', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop&auto=format' },
            ].map((p, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 bg-[#111111] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all">
                <div className="w-full md:w-[160px] h-[100px] md:h-[80px] rounded-lg shrink-0 overflow-hidden">
                  <img src={p.img} alt={p.address} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[0.95rem] font-700 mb-0.5">{p.address}</h3>
                  <div className="flex flex-wrap gap-3 text-[0.78rem] text-[#71717A]">
                    <span>{p.type} - {p.beds} bed</span>
                    <span>{p.date}</span>
                  </div>
                </div>
                <div className="md:text-right">
                  <span className="text-[0.92rem] font-700 block" style={{ color: accent }}>{p.price}</span>
                  <a href="#register" className="text-[0.78rem] underline" style={{ color: accent }}>Register to bid</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bid registration form */}
      <section id="register" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Register to bid</h2>
          <p className="text-[0.95rem] text-[#A1A1AA] mb-8">One registration. Access to all upcoming auctions.</p>
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
              <input type="text" placeholder="Last name" className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            </div>
            <input type="email" placeholder="Email" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <input type="tel" placeholder="Phone" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-700" style={{ background: accent }}>Register Now</button>
          </div>
          <p className="text-[0.72rem] text-[#71717A] mt-4">By registering, you agree to the auction terms and conditions.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.82rem] font-700">{brand}</span>
          <p className="text-[0.7rem] text-[#71717A]">QLD Real Estate Licence #00000 | Springfield QLD</p>
        </div>
      </footer>
    </div>
  )
}
