import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const defaultNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Free Audit', href: '/site-audit' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navLinks, setNavLinks] = useState(defaultNavLinks)
  const location = useLocation()

  // Fetch menu from DB (menu_items table). Falls back to defaults if empty.
  useEffect(() => {
    supabase.from('menu_items').select('label, href, ordering, is_external')
      .order('ordering', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setNavLinks(data.map(item => ({
            label: item.label,
            href: item.href,
            external: item.is_external,
          })))
        }
      })
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isActive = useCallback((href) => {
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.slice(1)
    return location.pathname === href
  }, [location])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="relative group"
          >
            <img
              src="/logo.png"
              alt="Stellio"
              className="h-9 w-auto block"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="relative text-[0.8rem] font-500 uppercase tracking-[0.08em] transition-colors duration-300 text-[#A1A1AA] hover:text-[#FAFAFA]">
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative text-[0.8rem] font-500 uppercase tracking-[0.08em] transition-colors duration-300 group ${
                    isActive(link.href) ? 'text-[#FAFAFA]' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#FB5005] transition-all duration-400 ease-out ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/ai-audit"
              className="text-[0.78rem] font-600 text-[#FAFAFA] px-4 py-2 rounded-lg border border-white/[0.12] hover:border-[#FB5005] hover:text-[#FB5005] transition-all duration-300"
            >
              AI Audit
            </Link>
            <Link
              to="/contact"
              className="text-[0.78rem] font-600 text-white px-5 py-2 rounded-lg bg-[#FB5005] hover:bg-[#E55A1F] transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,80,5,0.3)]"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/[0.08] text-[#FAFAFA] hover:border-white/[0.2] transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={menuOpen ? 'open' : 'closed'}
              className="w-5 h-5 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: -4 },
                  open: { rotate: 45, y: 1 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute w-5 h-[1.5px] bg-current"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
                className="absolute w-5 h-[1.5px] bg-current"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 4 },
                  open: { rotate: -45, y: 1 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute w-5 h-[1.5px] bg-current"
              />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 w-[min(340px,85vw)] h-[100dvh] bg-[#0E0E0E] border-l border-white/[0.06] z-50 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <span className="font-[Satoshi] text-[1.1rem] font-700">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/[0.08] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 p-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3.5 text-[1rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/[0.03] rounded-lg transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-white/[0.06] flex flex-col gap-3">
                <Link
                  to="/ai-audit"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center text-[0.85rem] font-600 text-[#FAFAFA] px-4 py-3 rounded-lg border border-white/[0.12] hover:border-[#FB5005] transition-all"
                >
                  Free AI Audit
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center text-[0.85rem] font-600 text-white px-4 py-3 rounded-lg bg-[#FB5005] hover:bg-[#E55A1F] transition-all"
                >
                  Book a Call
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
