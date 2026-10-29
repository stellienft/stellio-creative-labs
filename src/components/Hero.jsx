import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import LogoCarousel from './LogoCarousel'

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const springConfig = { stiffness: 300, damping: 30 }
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.02)
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.02)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleCursor)
    return () => window.removeEventListener('mousemove', handleCursor)
  }, [])

  return (
    <>
      {/* Custom cursor follower (desktop only) */}
      <motion.div
        className="fixed w-5 h-5 rounded-full border border-[#FB5005]/50 pointer-events-none z-[9998] hidden lg:block"
        animate={{ x: cursorPos.x - 10, y: cursorPos.y - 10 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />

      <motion.section
        ref={containerRef}
        style={{ opacity, scale }}
        className="relative min-h-[100dvh] flex items-center pt-[100px] pb-20 overflow-hidden"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] pointer-events-none" />

        {/* Floating gradient orbs */}
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#FB5005]/[0.04] blur-[120px] pointer-events-none"
        />
        <motion.div
          style={{ x: useTransform(mouseX, v => -v * 0.5), y: useTransform(mouseY, v => -v * 0.5) }}
          className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#FB5005]/[0.03] blur-[100px] pointer-events-none"
        />

        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="relative z-10">
              {/* Animated label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.12em] mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-[#FB5005] animate-pulse" />
                Powered by Arclink AI
              </motion.div>

              {/* Headline with character stagger */}
              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="font-[Satoshi] text-[clamp(2.8rem,6vw,5rem)] font-700 leading-[0.95] tracking-[-0.02em]"
                >
                  Build Bold.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-[Satoshi] text-[clamp(2.8rem,6vw,5rem)] font-700 leading-[0.95] tracking-[-0.02em]"
                >
                  Launch <span className="gradient-text">Smarter.</span>
                </motion.h1>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[480px] mb-10"
              >
                I'm Stellio. Designer, developer, and founder. I build the brands, websites, and
                AI-powered platforms that run modern businesses. From first impression to last
                automation. One partner, end to end.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FB5005] text-white text-[0.85rem] font-600 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,80,5,0.3)]"
                >
                  <span className="relative z-10">Start Your Project</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  <div className="absolute inset-0 bg-[#E55A1F] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <a
                  href="#claude-workshop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.12] text-[#FAFAFA] text-[0.85rem] font-600 hover:border-[#FB5005] hover:text-[#FB5005] transition-all duration-300"
                >
                  Claude Workshop
                </a>
              </motion.div>
            </div>

            {/* Right: Mockup + floating cards */}
            <motion.div
              style={{ y: y1 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Main mockup card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[420px] bg-[#111111] border border-white/[0.08] rounded-2xl p-6 shadow-2xl"
              >
                {/* Window chrome */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  </div>
                  <span className="text-[0.7rem] text-[#71717A] font-500 tracking-wide">Business OS</span>
                </div>

                {/* Mockup content */}
                <div className="space-y-3">
                  <div className="h-2 rounded-full bg-[#FB5005]/20 w-[30%]" />
                  <div className="h-2 rounded-full bg-white/[0.06] w-[55%]" />
                  <div className="h-2 rounded-full bg-white/[0.06] w-full mt-4" />
                  <div className="h-2 rounded-full bg-white/[0.06] w-[70%]" />
                  <div className="h-2 rounded-full bg-white/[0.06] w-[45%]" />
                  <div className="inline-flex items-center gap-2 mt-4 px-3 py-2 rounded-lg bg-[#FB5005]/10 border border-[#FB5005]/20">
                    <span className="w-2 h-2 rounded-full bg-[#FB5005] animate-pulse" />
                    <span className="text-[0.78rem] font-600 text-[#FB5005]">AI Agent Online. 3 Active</span>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#FB5005]/5 to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-4 -right-4 bg-[#0E0E0E] border border-white/[0.08] rounded-xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2 text-[0.8rem] text-[#A1A1AA]">
                  <svg className="w-4 h-4 text-[#FB5005]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  Live in 30 days
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-20 -right-4 bg-[#0E0E0E] border border-white/[0.08] rounded-xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2 text-[0.8rem] text-[#A1A1AA]">
                  <svg className="w-4 h-4 text-[#FB5005]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  70+ 5-star reviews
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-4 right-4 bg-[#0E0E0E] border border-white/[0.08] rounded-xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2 text-[0.8rem] text-[#A1A1AA]">
                  <svg className="w-4 h-4 text-[#FB5005]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
                  No lock-in contracts
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Trust bar */}
          <LogoCarousel />
        </div>
      </motion.section>
    </>
  )
}
