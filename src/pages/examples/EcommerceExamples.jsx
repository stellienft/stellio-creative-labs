import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ===== ECOMMERCE STOREFRONT - Product grid, categories, trust badges =====
// Layout: Product-first. Category navigation. Quick-view cards.
// For online stores where the product range sells itself.
export function EcommerceStorefront() {
  const [activeCategory, setActiveCategory] = useState('All')
  const accent = '#8B5CF6'
  const brand = 'WILD CO. Australia'

  const products = [
    { name: 'Adventure Backpack', price: '$149', category: 'Bags', tag: 'Best Seller', color: '#1A1518', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format' },
    { name: 'Trail Runner Pro', price: '$219', category: 'Shoes', tag: null, color: '#151218', img: 'https://images.unsplash.com/photo-1520219306100-ec4afeeefe58?w=400&h=300&fit=crop&auto=format' },
    { name: 'Merino Base Layer', price: '$89', category: 'Clothing', tag: 'New', color: '#121815', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop&auto=format' },
    { name: 'Titanium Water Bottle', price: '$59', category: 'Accessories', tag: null, color: '#181515', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&auto=format' },
    { name: 'Weatherproof Jacket', price: '$299', category: 'Clothing', tag: 'Premium', color: '#151218', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop&auto=format' },
    { name: 'Compact Day Pack', price: '$99', category: 'Bags', tag: null, color: '#181815', img: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=300&fit=crop&auto=format' },
  ]

  const categories = ['All', 'Clothing', 'Bags', 'Shoes', 'Accessories']
  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav - store style with cart */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-[0.9rem] font-700 tracking-[0.1em] uppercase">{brand}</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#products" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Shop</a>
            <a href="#about" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">About</a>
            <a href="#reviews" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Reviews</a>
            <button className="relative p-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[0.6rem] font-700 flex items-center justify-center" style={{ background: accent }}>0</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero - product showcase */}
      <section className="pt-[80px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh] items-center gap-10">
            <div>
              <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-6 block">Australian Outdoor Gear</span>
              <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-700 leading-[1.02] mb-5">
                Gear built for<br />the Australian wild.
              </h1>
              <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[480px] mb-8">
                Tested in the outback. Worn in the city. Our products are designed for people who refuse to choose between performance and style.
              </p>
              <a href="#products" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-[0.92rem] font-600" style={{ background: accent }}>
                Shop Now
              </a>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format" alt="Adventure Backpack" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-4 border-y border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap gap-6 justify-center">
          {[
            { label: 'Free Shipping Over $100', icon: 'truck' },
            { label: '30-Day Returns', icon: 'refresh' },
            { label: '2-Year Warranty', icon: 'shield' },
            { label: 'Australian Owned', icon: 'flag' },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {b.icon === 'truck' && <g><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></g>}
                {b.icon === 'refresh' && <g><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></g>}
                {b.icon === 'shield' && <g><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></g>}
                {b.icon === 'flag' && <g><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></g>}
              </svg>
              <span className="text-[0.78rem] text-[#A1A1AA]">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Products with category filter */}
      <section id="products" className="py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700">Shop</h2>
            <div className="flex gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} className="px-4 py-2 rounded-lg text-[0.72rem] font-600 transition-all" style={{ background: activeCategory === c ? accent : '#111111', color: activeCategory === c ? 'white' : '#888' }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square rounded-2xl mb-3 relative overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  {p.tag && <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[0.68rem] font-600 text-white" style={{ background: p.tag === 'Premium' ? '#1A1A1A' : accent }}>{p.tag}</span>}
                  <div className="absolute inset-0 bg-[#0A0A0A]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-5 py-2.5 rounded-xl text-[0.82rem] font-600" style={{ background: accent }}>Quick View</span>
                  </div>
                </div>
                <h3 className="text-[0.88rem] font-600 mb-0.5">{p.name}</h3>
                <span className="text-[0.92rem] font-700" style={{ color: accent }}>{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-6">Built tough. Priced fair.</h2>
          <p className="text-[0.95rem] text-[#A1A1AA] leading-relaxed mb-6">
            WILD CO. started in 2020 when two mates could not find outdoor gear that survived the Kimberley without costing a fortune. We cut out the middleman, source premium materials, and sell direct. The result: gear that lasts at prices that do not hurt.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { num: '12,000+', label: 'Happy Customers' },
              { num: '4.8', label: 'Avg Rating' },
              { num: '100%', label: 'Aussie Owned' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[1.3rem] font-700" style={{ color: accent }}>{s.num}</div>
                <div className="text-[0.72rem] text-[#71717A] uppercase tracking-[0.08em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-[80px]">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Reviews</h2>
          <div className="space-y-5">
            {[
              { name: 'Sarah T.', product: 'Adventure Backpack', quote: 'Took it on a 5-day hike through the Blue Mountains. Comfortable, waterproof, and held everything I needed. Best pack I have owned.' },
              { name: 'James K.', product: 'Trail Runner Pro', quote: 'Grippy on wet rock, breathable in the heat. These are now my go-to trail shoes. Amazing value for the quality.' },
            ].map((r, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed mb-3">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-[0.82rem] font-600">{r.name} <span className="text-[#71717A] font-400">- {r.product}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.78rem] font-700 tracking-[0.06em] uppercase">{brand}</span>
          <p className="text-[0.7rem] text-[#71717A]">Free shipping Australia-wide over $100 | ABN 00 000 000 000</p>
        </div>
      </footer>
    </div>
  )
}

// ===== ECOMMERCE BRAND - Story-driven, product showcase, reviews =====
// Layout: Brand story first. Featured products. Newsletter.
// For product brands whose story and identity drive sales.
export function EcommerceBrand() {
  const accent = '#EC4899'
  const brand = 'LUXE Skin Co.'

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      {/* Nav - beauty brand feel */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.04]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-[0.88rem] font-700 tracking-[0.12em] uppercase">{brand}</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#products" className="text-[0.78rem] text-[#888] hover:text-[#1A1A1A]">Products</a>
            <a href="#story" className="text-[0.78rem] text-[#888] hover:text-[#1A1A1A]">Our Story</a>
            <a href="#reviews" className="text-[0.78rem] text-[#888] hover:text-[#1A1A1A]">Reviews</a>
            <a href="#products" className="px-5 py-2 rounded-full bg-[#1A1A1A] text-white text-[0.78rem] font-600 hover:bg-[#333] transition-colors">Shop Now</a>
          </div>
        </div>
      </nav>

      {/* Hero - brand story */}
      <section className="pt-[80px] bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[80vh]">
            <div className="order-2 md:order-1">
              <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-6 block">Clean Beauty - Made in Australia</span>
              <h1 className="text-[clamp(2.2rem,4.5vw,3.2rem)] font-700 leading-[1.05] mb-5">
                Skincare that actually does what it says.
              </h1>
              <p className="text-[1rem] text-[#666] leading-relaxed max-w-[440px] mb-8">
                No fillers. No fragrances. No false promises. Just active ingredients at clinical concentrations, formulated in our Brisbane lab.
              </p>
              <div className="flex gap-4">
                <a href="#products" className="px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-[0.85rem] font-600">Shop Products</a>
                <a href="#story" className="px-6 py-3 rounded-full border border-[#1A1A1A]/20 text-[0.85rem] font-600 hover:border-[#1A1A1A] transition-all">Our Story</a>
              </div>
            </div>
            <div className="order-1 md:order-2 aspect-[4/5] rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format" alt="LUXE Skin Co. Products" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="products" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Vitamin C Serum 20%', price: '$68', desc: 'Brightens, evens skin tone, protects against environmental damage.', badge: 'No.1 Seller', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop&auto=format' },
              { name: 'Retinol Night Cream', price: '$79', desc: 'Reduces fine lines and wrinkles. Gentle enough for sensitive skin.', badge: 'Award Winner', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=300&fit=crop&auto=format' },
              { name: 'Hyaluronic Acid Serum', price: '$55', desc: 'Deep hydration plumps and smooths. Layer under moisturiser.', badge: null, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format' },
            ].map((p, i) => (
              <div key={i} className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  {p.badge && <span className="inline-block px-2 py-0.5 rounded text-[0.62rem] font-600 mb-2 text-white" style={{ background: accent }}>{p.badge}</span>}
                  <h3 className="text-[0.95rem] font-700 mb-1">{p.name}</h3>
                  <p className="text-[0.82rem] text-[#666] mb-3">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[1rem] font-700">{p.price}</span>
                    <button className="px-4 py-2 rounded-lg text-[0.78rem] font-600 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-[80px] bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-4 block">Our Story</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-6">Started in a kitchen. Now in 5,000+ bathrooms.</h2>
          <p className="text-[0.95rem] text-[#666] leading-relaxed mb-6">
            LUXE Skin Co. was born when our founder, a cosmetic chemist, could not find affordable skincare with actual active ingredients at effective concentrations. So she made her own. Three years later, we formulate in a proper lab but the philosophy has not changed: less ingredients, more actives, real results.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { num: '5,000+', label: 'Customers' },
              { num: '4.9', label: 'Avg Rating' },
              { num: '0', label: 'Fillers' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[1.5rem] font-700" style={{ color: accent }}>{s.num}</div>
                <div className="text-[0.72rem] text-[#999] uppercase tracking-[0.08em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Real results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Emily R.', product: 'Vitamin C Serum', quote: 'My dark spots have faded noticeably in 4 weeks. I have tried serums 3x the price that did nothing.' },
              { name: 'Catherine W.', product: 'Retinol Night Cream', quote: 'Gentle but effective. No redness, no peeling. Just smoother skin.' },
              { name: 'Anika S.', product: 'HA Serum', quote: 'My skin drinks this up. Plump and dewy by morning. Will not go without it.' },
            ].map((r, i) => (
              <div key={i} className="bg-white border border-black/[0.06] rounded-xl p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-[0.88rem] text-[#666] leading-relaxed mb-3">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-[0.82rem] font-600">{r.name} <span className="text-[#999] font-400">- {r.product}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-[80px] bg-white">
        <div className="max-w-[460px] mx-auto px-6 text-center">
          <h3 className="text-[1.2rem] font-700 mb-2">Join the LUXE list</h3>
          <p className="text-[0.88rem] text-[#666] mb-6">New launches, skincare tips, and 10% off your first order.</p>
          <div className="flex gap-3">
            <input type="email" placeholder="Your email" className="flex-1 bg-[#F5F5F5] border border-black/[0.06] rounded-xl px-4 py-3 text-[0.88rem] focus:outline-none" />
            <button className="px-6 py-3 rounded-xl text-white text-[0.88rem] font-600 shrink-0" style={{ background: accent }}>Join</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.78rem] font-700 tracking-[0.08em] uppercase">{brand}</span>
          <p className="text-[0.7rem] text-[#999]">Free shipping over $50 | ABN 00 000 000 000</p>
        </div>
      </footer>
    </div>
  )
}

// ===== ECOMMERCE DROP - Dark, countdown, limited drops, waitlist =====
// Layout: Drop model. Countdown. Product reveals. Waitlist-driven.
// For brands that sell through scarcity and hype.
export function EcommerceDrop() {
  const accent = '#EF4444'
  const brand = 'RAWR. Studio'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav - bold */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-[0.9rem] font-700 tracking-[0.1em] uppercase">{brand}</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#drop" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Next Drop</a>
            <a href="#archive" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Archive</a>
            <a href="#waitlist" className="px-5 py-2 rounded-lg text-white text-[0.78rem] font-700" style={{ background: accent }}>Join Waitlist</a>
          </div>
        </div>
      </nav>

      {/* Hero - drop countdown */}
      <section className="pt-[100px] min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ background: `${accent}06` }} />
        <div className="max-w-[900px] mx-auto px-6 text-center relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ background: `${accent}08`, borderColor: `${accent}20` }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
            <span className="text-[0.75rem] font-600 tracking-[0.08em] uppercase" style={{ color: accent }}>Drop 004 - Coming Soon</span>
          </div>
          <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-700 leading-[0.95] mb-6">
            Limited edition.<br />When it is gone,<br />it is gone.
          </h1>
          <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[500px] mx-auto mb-10">
            RAWR. drops limited-run streetwear. No restocks. No second chances. Every piece is a one-time release. Join the waitlist or miss out.
          </p>
          <a href="#waitlist" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-[1rem] font-700 transition-all hover:shadow-[0_0_50px_rgba(239,68,68,0.2)]" style={{ background: accent }}>
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* Next drop preview */}
      <section id="drop" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <span className="text-[0.68rem] font-600 uppercase tracking-[0.16em] text-[#999] mb-2 block">Drop 004 Preview</span>
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">What is coming</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Oversized Hoodie', color: '#1A1518', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop&auto=format' },
              { name: 'Cargo Joggers', color: '#151218', img: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&h=300&fit=crop&auto=format' },
              { name: 'Graphic Tee v1', color: '#121815', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&auto=format' },
              { name: 'Graphic Tee v2', color: '#181515', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop&auto=format' },
            ].map((p, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-xl flex items-center justify-center mb-3 relative overflow-hidden" style={{ background: p.color }}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#0A0A0A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg text-[0.72rem] font-600" style={{ background: accent }}>Coming Soon</span>
                  </div>
                </div>
                <h3 className="text-[0.82rem] font-600">{p.name}</h3>
                <span className="text-[0.72rem] text-[#71717A]">Limited to 50 pieces</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past drops archive */}
      <section id="archive" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">Past drops</h2>
          <div className="space-y-4">
            {[
              { name: 'Drop 003 - Neon Nights', date: 'May 2026', status: 'Sold Out', pieces: 75 },
              { name: 'Drop 002 - Concrete Jungle', date: 'Mar 2026', status: 'Sold Out', pieces: 50 },
              { name: 'Drop 001 - Genesis', date: 'Jan 2026', status: 'Sold Out', pieces: 30 },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between bg-[#111111] border border-white/[0.06] rounded-xl p-5">
                <div>
                  <h3 className="text-[0.95rem] font-700">{d.name}</h3>
                  <p className="text-[0.78rem] text-[#71717A]">{d.date} - {d.pieces} pieces</p>
                </div>
                <span className="px-3 py-1 rounded-lg text-[0.72rem] font-600 bg-[#71717A]/10 text-[#71717A]">{d.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Do not miss the next drop</h2>
          <p className="text-[0.95rem] text-[#A1A1AA] mb-8">Waitlist members get 2-hour early access before the public drop.</p>
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <input type="email" placeholder="Email address" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <input type="text" placeholder="Instagram handle (optional)" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-700" style={{ background: accent }}>Join Waitlist</button>
          </div>
          <p className="text-[0.72rem] text-[#71717A] mt-4">No spam. Just drop notifications and early access.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.78rem] font-700 tracking-[0.06em] uppercase">{brand}</span>
          <p className="text-[0.7rem] text-[#71717A]">ABN 00 000 000 000 | Brisbane QLD</p>
        </div>
      </footer>
    </div>
  )
}
