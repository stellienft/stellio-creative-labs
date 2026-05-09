import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-10">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-[Satoshi] text-[1.3rem] font-800 text-[#FAFAFA]">STELLIO</span>
            </Link>
            <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed mb-6 max-w-[280px]">
              Brisbane's AI-powered brand and platform studio. Built by Stellio Koutsis.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Instagram', href: 'https://instagram.com/stelliogd' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/stellio-koutsis/' },
                { label: 'Facebook', href: 'https://facebook.com/stelliocreativelabs' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#71717A] hover:text-[#FAFAFA] hover:border-white/[0.15] transition-all duration-300"
                  aria-label={s.label}
                >
                  {s.label === 'Instagram' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  )}
                  {s.label === 'LinkedIn' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  )}
                  {s.label === 'Facebook' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[0.72rem] font-600 uppercase tracking-[0.1em] text-[#71717A] mb-5">Services</h4>
            <div className="flex flex-col gap-3">
              {['Brand Systems', 'Smart Websites', 'AI Integration', 'Business OS', 'Managed Stack'].map((s) => (
                <Link
                  key={s}
                  to="/#services"
                  className="text-[0.87rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[0.72rem] font-600 uppercase tracking-[0.1em] text-[#71717A] mb-5">Company</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Our Work', href: '/work' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'About', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-[0.87rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.72rem] font-600 uppercase tracking-[0.1em] text-[#71717A] mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@stellio.com.au" className="text-[0.87rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200">
                hello@stellio.com.au
              </a>
              <a href="tel:0421675940" className="text-[0.87rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200">
                0421 675 940
              </a>
              <span className="text-[0.87rem] text-[#71717A]">Brisbane, Australia</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/[0.06] mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[0.82rem] text-[#71717A]">© 2026 Stellio Creative Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-[0.82rem] text-[#71717A] hover:text-[#FAFAFA] transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[0.82rem] text-[#71717A] hover:text-[#FAFAFA] transition-colors">Terms</Link>
            <a href="https://arclink.online" target="_blank" rel="noopener noreferrer" className="text-[0.82rem] text-[#71717A] hover:text-[#FF6B2C] transition-colors">Arclink AI</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
