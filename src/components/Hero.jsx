import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LogoCarousel from './LogoCarousel'
import { Em, BtnPrimary, BtnGhost } from './ui'

const ease = [0.16, 1, 0.3, 1]

const stats = [
  { num: '70+', title: '5-star reviews', desc: 'Rated across branding, web and platform projects.' },
  { num: '40+', title: 'Brands launched', desc: 'From first logo to full Business OS.' },
  { num: '15+', title: 'Years designing & building', desc: 'Senior-level work. No junior teams, no bloat.' },
  { num: '100%', title: 'End to end, in-house', desc: 'Strategy, design, code and automation. One partner.' },
]

export default function Hero() {
  return (
    <section className="relative pt-[150px] pb-[80px] overflow-hidden">
      {/* Warm glow */}
      <div className="absolute -top-[260px] left-1/2 -translate-x-1/2 w-[900px] h-[560px] bg-[radial-gradient(closest-side,rgba(251,80,5,0.13),transparent)] pointer-events-none" />

      <div className="max-w-[1160px] mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-14 lg:gap-16 items-start">
          <div>
        {/* Availability badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="inline-flex items-center gap-2 border border-white/[0.07] bg-[#0E0E0E] rounded-full px-4 py-2 text-[0.8rem] text-[#A1A1AA]"
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[#22C55E]" />
          Taking new projects for <b className="text-[#FB5005] font-600">2026</b>
          <span className="text-[#71717A]">·</span>
          <span className="text-[#71717A]">Brisbane, Australia</span>
        </motion.span>

        {/* Display headline */}
        <div className="mt-7 overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="font-[Satoshi] font-900 text-[clamp(3.4rem,8.2vw,6.5rem)] leading-[0.98] tracking-[-0.045em]"
          >
            Build Bold.
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.38, ease }}
            className="font-[Satoshi] font-900 text-[clamp(3.4rem,8.2vw,6.5rem)] leading-[0.98] tracking-[-0.045em]"
          >
            Launch <Em>Smarter.</Em>
          </motion.h1>
        </div>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="max-w-[620px] mt-7 text-[1.1rem] leading-[1.65] text-[#A1A1AA]"
        >
          I'm Stellio. Designer, developer, and founder. I build the brands, websites, and
          AI-powered platforms that run modern businesses. From first impression to last
          automation. One partner, end to end.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.68, ease }}
          className="flex flex-wrap gap-3.5 mt-10"
        >
          <BtnPrimary to="/contact">Book a Free Call</BtnPrimary>
          <BtnGhost to="/work">See the Work</BtnGhost>
        </motion.div>

          </div>

          {/* Right: stats as process-style steps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-7 lg:pt-2"
          >
            {stats.map((s) => (
              <div key={s.title} className="relative pl-5 border-l-2 border-white/[0.07]">
                <span className="absolute -left-[2px] top-1 w-[2px] h-[26px] bg-[#FB5005]" />
                <span className="font-[Playfair_Display] italic text-[#FB5005] text-[2rem] leading-none">{s.num}</span>
                <h3 className="font-[Satoshi] text-[1rem] font-700 mt-2 tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[0.8rem] text-[#A1A1AA] leading-[1.55] mt-1">{s.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease }}
        >
          <LogoCarousel />
        </motion.div>
      </div>
    </section>
  )
}
