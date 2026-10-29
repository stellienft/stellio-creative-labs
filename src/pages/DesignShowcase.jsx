import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = [
  {
    name: 'Tradies',
    slug: 'tradies',
    accent: '#22C55E',
    templates: [
      { key: 'closer', name: 'The Closer', tagline: 'Conversion machine', color: '#22C55E' },
      { key: 'portfolio', name: 'The Portfolio', tagline: 'Work speaks', color: '#1A1A1A' },
      { key: 'local', name: 'The Local', tagline: 'Neighbourhood trust', color: '#C2703E' },
    ],
  },
  {
    name: 'Cafes & Hospitality',
    slug: 'cafes',
    accent: '#F59E0B',
    templates: [
      { key: 'cafe-menu', name: 'The Menu', tagline: 'Warm & inviting', color: '#F59E0B' },
      { key: 'cafe-vibe', name: 'The Vibe', tagline: 'Atmosphere sells', color: '#C87941' },
      { key: 'cafe-regular', name: 'The Regular', tagline: 'Community hub', color: '#4A7C59' },
    ],
  },
  {
    name: 'Real Estate',
    slug: 'real-estate',
    accent: '#10B981',
    templates: [
      { key: 'property-listings', name: 'The Listings', tagline: 'Properties front & centre', color: '#10B981' },
      { key: 'agent-profile', name: 'The Agent Brand', tagline: 'Premium personal brand', color: '#D4A853' },
      { key: 'auction-hype', name: 'The Auction Room', tagline: 'Urgency sells', color: '#EF4444' },
    ],
  },
  {
    name: 'Fitness',
    slug: 'fitness',
    accent: '#22C55E',
    templates: [
      { key: 'gym-grind', name: 'The Grind', tagline: 'Sign members', color: '#22C55E' },
      { key: 'fitness-tribe', name: 'The Tribe', tagline: 'Community keeps them', color: '#F59E0B' },
      { key: 'transformation', name: 'The Transformation', tagline: 'Results sell', color: '#8B5CF6' },
    ],
  },
  {
    name: 'Beauty & Wellness',
    slug: 'beauty',
    accent: '#B76E79',
    templates: [
      { key: 'beauty-lookbook', name: 'The Lookbook', tagline: 'Beauty as art', color: '#B76E79' },
      { key: 'beauty-glow', name: 'The Glow', tagline: 'Immersive & visual', color: '#8B5CF6' },
      { key: 'beauty-suite', name: 'The Suite', tagline: 'Boutique elegance', color: '#D4A0A7' },
    ],
  },
  {
    name: 'Health & Medical',
    slug: 'health',
    accent: '#14B8A6',
    templates: [
      { key: 'health-clinic', name: 'The Clinic', tagline: 'Trust-building', color: '#14B8A6' },
      { key: 'health-care', name: 'The Care', tagline: 'Patient-first', color: '#7DB88F' },
      { key: 'health-telehealth', name: 'The Telehealth', tagline: 'Modern care anywhere', color: '#14B8A6' },
    ],
  },
  {
    name: 'Professionals',
    slug: 'professionals',
    accent: '#3B5998',
    templates: [
      { key: 'authority', name: 'The Authority', tagline: 'Credentials first', color: '#3B5998' },
      { key: 'the-practice', name: 'The Practice', tagline: 'Team & expertise', color: '#0EA5E9' },
      { key: 'the-brief', name: 'The Brief', tagline: 'No fluff, just results', color: '#FAFAFA' },
    ],
  },
  {
    name: 'Ecommerce',
    slug: 'ecommerce',
    accent: '#8B5CF6',
    templates: [
      { key: 'storefront', name: 'The Storefront', tagline: 'Products first', color: '#8B5CF6' },
      { key: 'brand-story', name: 'The Brand Story', tagline: 'Story-driven', color: '#EC4899' },
      { key: 'the-drop', name: 'The Drop', tagline: 'Limited edition energy', color: '#EF4444' },
    ],
  },
]

function TemplatePreview({ template, onClick }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      {/* Browser chrome */}
      <div className="rounded-t-xl overflow-hidden border border-white/[0.06] border-b-0">
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: '#1A1A1A' }}>
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
          <div className="flex-1 mx-2 h-4 rounded-full bg-white/[0.06] flex items-center justify-center">
            <span className="text-[0.45rem] text-[#71717A] truncate px-2">
              {template.name.toLowerCase().replace(/ /g, '').replace(/&/g, '')}.com.au
            </span>
          </div>
        </div>
      </div>

      {/* Scaled iframe thumbnail - shows just the hero/above-the-fold */}
      <div
        className="border border-white/[0.06] border-t-0 rounded-b-xl overflow-hidden relative"
        style={{ height: '260px' }}
        ref={ref}
      >
        {isVisible && (
          <div
            className="origin-top-left"
            style={{
              width: '1280px',
              height: '800px',
              transform: 'scale(0.328)',
              transformOrigin: 'top left',
            }}
          >
            <iframe
              src={`/examples/${template.key}`}
              title={template.name}
              className="w-full h-full border-0"
              style={{ width: '1280px', height: '800px' }}
              loading="lazy"
            />
          </div>
        )}
        {/* Click catcher - sits on top of iframe */}
        <div className="absolute inset-0 z-10 cursor-pointer" onClick={onClick} />
        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
          <span className="px-4 py-2 rounded-xl bg-[#FB5005] text-white text-[0.78rem] font-600">View full page</span>
        </div>
      </div>

      {/* Label */}
      <div className="mt-3 flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: template.color }} />
        <div>
          <h3 className="text-[0.92rem] font-700 text-white">{template.name}</h3>
          <p className="text-[0.78rem] text-[#71717A]">{template.tagline}</p>
        </div>
      </div>
    </motion.div>
  )
}

function FullPreview({ template, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-[1400px] bg-[#111111] rounded-2xl overflow-hidden border border-white/[0.08] flex flex-col"
        style={{ height: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/[0.06] shrink-0" style={{ background: '#1A1A1A' }}>
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] cursor-pointer" onClick={onClose} />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <div className="flex-1 mx-4 h-6 rounded-full bg-white/[0.06] flex items-center justify-center">
            <span className="text-[0.68rem] text-[#71717A]">
              stellio.com.au/examples/{template.key}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/examples/${template.key}`}
              target="_blank"
              rel="noopener"
              className="text-[0.72rem] text-[#71717A] hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-white/[0.06]"
              onClick={(e) => e.stopPropagation()}
            >
              New tab
            </a>
            <button onClick={onClose} className="text-[0.72rem] text-[#71717A] hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-white/[0.06]">
              ESC
            </button>
          </div>
        </div>

        {/* Full template - scrollable iframe */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={`/examples/${template.key}`}
            title={template.name}
            className="w-full h-full border-0"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DesignShowcase() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [fullscreen, setFullscreen] = useState(null)

  const filteredCategories = activeFilter === 'all'
    ? CATEGORIES
    : CATEGORIES.filter(c => c.slug === activeFilter)

  // Lock body scroll when fullscreen open
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [fullscreen])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        <p className="text-[0.78rem] font-600 uppercase tracking-[0.16em] text-[#FB5005] mb-3">Design Showcase</p>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-700 leading-[1.05] mb-4">
          21 designs. 7 industries.<br />One studio.
        </h1>
        <p className="text-[1.05rem] text-[#A1A1AA] max-w-[600px] leading-relaxed">
          Every business is different. These are starting points, each with its own personality, layout, and colour strategy. Click any design to explore it fully.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-[0.82rem] font-600 transition-all ${
              activeFilter === 'all'
                ? 'bg-[#FB5005] text-white'
                : 'bg-white/[0.04] text-[#A1A1AA] hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            All Industries
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setActiveFilter(cat.slug)}
              className={`px-4 py-2 rounded-xl text-[0.82rem] font-600 transition-all ${
                activeFilter === cat.slug
                  ? 'text-white'
                  : 'bg-white/[0.04] text-[#A1A1AA] hover:bg-white/[0.08] hover:text-white'
              }`}
              style={activeFilter === cat.slug ? { background: cat.accent } : {}}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          {filteredCategories.map((cat) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-16"
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-8 rounded-full" style={{ background: cat.accent }} />
                <div>
                  <h2 className="text-[1.4rem] font-700">{cat.name}</h2>
                  <p className="text-[0.82rem] text-[#71717A]">3 distinct design approaches</p>
                </div>
              </div>

              {/* Template grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cat.templates.map((template) => (
                  <TemplatePreview
                    key={template.key}
                    template={template}
                    onClick={() => setFullscreen(template)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Fullscreen preview modal */}
      <AnimatePresence>
        {fullscreen && (
          <FullPreview
            template={fullscreen}
            onClose={() => setFullscreen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
