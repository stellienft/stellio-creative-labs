import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { sendNotificationEmail } from '../lib/email'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'
import { WebPageSchema, BreadcrumbSchema, FAQSchema } from '../components/JsonLd'

// Niche data imports
import tradies from '../data/niches/tradies'
import cafes from '../data/niches/cafes'
import realEstate from '../data/niches/real-estate'
import fitness from '../data/niches/fitness'
import beauty from '../data/niches/beauty'
import professionals from '../data/niches/professionals'
import ecommerce from '../data/niches/ecommerce'
import health from '../data/niches/health'

const NICHE_MAP = { tradies, cafes, 'real-estate': realEstate, fitness, beauty, professionals, ecommerce, health }

// SVG icons (24x24, stroke-based)
const icons = {
  'phone-missed': <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/><line x1="1" y1="1" x2="23" y2="23"/></>,
  'wrench': <><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></>,
  'clock': <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  'dollar': <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
}

export default function NicheLanding() {
  // Resolve niche from URL path
  const pathParts = window.location.pathname.split('/')
  const nicheKey = pathParts[2] // /for/:niche
  const data = NICHE_MAP[nicheKey]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[140px]">
        <div className="text-center">
          <h1 className="text-2xl font-700 text-[#FAFAFA] mb-4">Page not found</h1>
          <Link to="/" className="text-[#FB5005] hover:underline">Back to Home</Link>
        </div>
      </div>
    )
  }

  return <NicheLandingContent data={data} nicheKey={nicheKey} />
}

function NicheLandingContent({ data, nicheKey }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const formRef = useRef(null)

  const accent = data.accent || '#3B82F6'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    supabase.from('submissions').insert({
      name: name || 'Niche Landing Lead',
      email,
      company: null,
      service: `${nicheKey} landing page`,
      message: `Lead from /for/${nicheKey} landing page`,
      status: 'new',
    }).then(() => {}).catch(() => {})

    sendNotificationEmail({
      to: 'hello@stellio.com.au',
      subject: `${nicheKey} landing lead: ${email}`,
      htmlBody: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0A0A0A;border-radius:16px;overflow:hidden;">
        <div style="background:#FB5005;padding:24px 32px;"><h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">${nicheKey} Landing Lead</h1></div>
        <div style="padding:32px;color:#FAFAFA;">
          <p style="font-size:15px;">Someone just signed up from the /for/${nicheKey} page:</p>
          <p style="font-size:18px;"><a href="mailto:${email}" style="color:#FB5005;text-decoration:none;">${email}</a></p>
          ${name ? `<p style="font-size:14px;color:#A1A1AA;">Name: ${name}</p>` : ''}
        </div>
        <div style="padding:16px 32px;background:#0E0E0E;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:12px;color:#71717A;">View in <a href="${window.location.origin}/admin" style="color:#FB5005;text-decoration:none;">Admin Panel</a></p>
        </div></div>`,
    }).catch(() => {})

    setSubmitted(true)
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <WebPageSchema
        name={data.seo.title}
        description={data.seo.description}
        url={`https://stellio.com.au/for/${nicheKey}`}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://stellio.com.au' },
        { name: data.seo.title.split('|')[0].trim(), url: `https://stellio.com.au/for/${nicheKey}` },
      ]} />
      {data.faqs && <FAQSchema faqs={data.faqs.map(f => ({ question: f.q, answer: f.a }))} />}

      {/* ========== HERO ========== */}
      <section className="relative min-h-[90vh] flex items-center pt-[100px] pb-[80px] overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#FB5005]/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: `${accent}06` }} />

        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="max-w-[720px]">
            <AnimatedSection>
              <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-5">
                {data.hero.eyebrow}
              </span>
            </AnimatedSection>

            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2.2rem,5vw,3.4rem)] font-700 leading-[1.08] mb-6">
                {data.hero.headline.split(data.hero.headlineHighlight)[0]}
                <span className="gradient-text">{data.hero.headlineHighlight}</span>
                {data.hero.headline.split(data.hero.headlineHighlight)[1]}
              </h1>
            </TextReveal>

            <AnimatedSection delay={0.15}>
              <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed mb-8 max-w-[520px]">
                {data.hero.subline}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={scrollToForm}
                  className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)]"
                >
                  <span className="relative z-10">{data.hero.cta}</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <Link
                  to={data.hero.ctaSecondaryLink || '/work'}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] text-[#FAFAFA] text-[0.88rem] font-600 hover:border-[#FB5005] hover:text-[#FB5005] transition-all"
                >
                  {data.hero.ctaSecondary}
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <p className="text-[0.82rem] text-[#71717A]">
                <span className="text-[#FAFAFA] font-600">{data.hero.socialProof}</span>
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== PAIN POINTS ========== */}
      <section className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-[Satoshi] text-[clamp(1.6rem,3vw,2.2rem)] font-700 text-[#FAFAFA] mb-12 text-center">
              {data.painPoints.heading}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.painPoints.items.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FB5005]/[0.08] border border-[#FB5005]/[0.15] flex items-center justify-center shrink-0 group-hover:bg-[#FB5005]/[0.15] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FB5005" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {icons[item.icon]}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[0.95rem] font-600 text-[#FAFAFA] mb-1.5">{item.title}</h3>
                      <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WEBSITE SHOWCASE ========== */}
      {data.showcase && data.showcase.examples && data.showcase.examples.length > 0 && (
        <section className="py-[80px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
                  See What Is Possible
                </span>
                <h2 className="font-[Satoshi] text-[clamp(1.6rem,3vw,2.2rem)] font-700 text-[#FAFAFA] mb-3">
                  {data.showcase.heading}
                </h2>
                <p className="text-[1rem] text-[#A1A1AA] max-w-[600px] mx-auto">
                  {data.showcase.subline}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.showcase.examples.map((ex, i) => (
                <AnimatedSection key={i} delay={i * 0.15}>
                  <div className="bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 group">
                    {/* Mini browser preview */}
                    <div className="relative">
                      {/* Browser chrome */}
                      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06]" style={{
                        background: ex.style.startsWith('dark') ? '#0D0D0D' : ex.style.startsWith('light') ? '#F8F8F8' : '#FDF6EE',
                      }}>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                        <div className="flex-1 mx-3 h-5 rounded-full" style={{
                          background: ex.style.startsWith('dark') ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                        }}>
                          <span className="text-[0.55rem] flex items-center justify-center h-full" style={{
                            color: ex.style.startsWith('dark') ? '#71717A' : '#999',
                          }}>{ex.preview.brand.toLowerCase().replace(/ /g, '').replace(/&/g, '').replace(/\./g, '')}.com.au</span>
                        </div>
                      </div>

                      {/* Page content - scaled mini preview */}
                      <div className="relative overflow-hidden" style={{ height: '280px' }}>
                        {(ex.style === 'dark') && (
                          /* Dark style: conversion-focused, green CTA */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.06em]">{ex.preview.brand}</span>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-700" style={{ background: '#22C55E', color: '#000' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="flex items-center gap-1 mb-2">
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22C55E' }} />
                                <span className="text-[0.35rem] font-600 uppercase tracking-[0.1em]" style={{ color: '#22C55E' }}>{ex.preview.trustBadge}</span>
                              </div>
                              <h3 className="text-[0.82rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              <div className="inline-flex mt-2">
                                <div className="px-2.5 py-1 rounded text-[0.38rem] font-700" style={{ background: '#22C55E', color: '#000' }}>{ex.preview.cta}</div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 bg-white/[0.04] rounded text-[0.32rem] text-[#71717A]">{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'dark-gold' && (
                          /* Dark gold style: luxury, premium, personal brand */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.08em] uppercase">{ex.preview.brand}</span>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 border" style={{ borderColor: '#D4A853', color: '#D4A853' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[0.35rem] font-600 uppercase tracking-[0.12em] mb-2" style={{ color: '#D4A853' }}>{ex.preview.trustBadge}</span>
                              <h3 className="text-[0.82rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              {/* Stats row */}
                              <div className="flex gap-4 mt-2">
                                {[1,2,3].map(n => (
                                  <div key={n}>
                                    <div className="text-[0.5rem] font-700" style={{ color: '#D4A853' }}>200+</div>
                                    <div className="text-[0.28rem] text-[#71717A] uppercase tracking-[0.05em]">Stat {n}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(212,168,83,0.1)', color: '#D4A853', border: '1px solid rgba(212,168,83,0.15)' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'dark-red' && (
                          /* Dark red style: urgency, countdown, limited */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.08em] uppercase">{ex.preview.brand}</span>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-700 text-white" style={{ background: '#EF4444' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="flex items-center gap-1 mb-2">
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#EF4444' }} />
                                <span className="text-[0.35rem] font-600 uppercase tracking-[0.1em]" style={{ color: '#EF4444' }}>{ex.preview.trustBadge}</span>
                              </div>
                              <h3 className="text-[0.82rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              <div className="inline-flex gap-2 mt-2">
                                <div className="px-2.5 py-1 rounded text-[0.38rem] font-700 text-white" style={{ background: '#EF4444' }}>{ex.preview.cta}</div>
                                <div className="px-2.5 py-1 rounded text-[0.38rem] font-600 border border-white/[0.12] text-white">Learn More</div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(239,68,68,0.08)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.12)' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'dark-navy' && (
                          /* Dark navy style: authority, credentials, law/professional */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.08em] uppercase">{ex.preview.brand}</span>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 border" style={{ borderColor: '#3B5998', color: '#3B5998' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[0.35rem] font-600 uppercase tracking-[0.12em] mb-2" style={{ color: '#3B5998' }}>{ex.preview.trustBadge}</span>
                              <h3 className="text-[0.82rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              <div className="inline-flex gap-2 mt-2">
                                <div className="px-2.5 py-1 rounded text-[0.38rem] font-600 text-white" style={{ background: '#3B5998' }}>{ex.preview.cta}</div>
                                <div className="px-2.5 py-1 rounded text-[0.38rem] font-600 border border-white/[0.12] text-white">Our Services</div>
                              </div>
                            </div>
                            {/* Credentials strip */}
                            <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/[0.04]">
                              {ex.preview.services.map(s => (
                                <span key={s} className="flex items-center gap-0.5 text-[0.32rem]" style={{ color: '#3B5998' }}>
                                  <svg className="w-2 h-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'dark-minimal' && (
                          /* Dark minimal: ultra-clean, white text on black, no color accent */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.1em] uppercase">{ex.preview.brand}</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <h3 className="text-[0.82rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              <span className="text-[0.35rem] text-[#555] uppercase tracking-[0.1em] mb-3">{ex.preview.trustBadge}</span>
                            </div>
                            {/* Numbered service list */}
                            <div className="space-y-1.5 mt-auto">
                              {ex.preview.services.map((s, i) => (
                                <div key={s} className="flex items-center gap-2">
                                  <span className="text-[0.28rem] text-[#444] w-3">0{i + 1}</span>
                                  <span className="text-[0.35rem] text-[#888]">{s}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'light-blue' && (
                          /* Light blue style: clean white, sky blue accent, team-focused */
                          <div className="absolute inset-0 bg-white p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-lg flex items-center justify-center" style={{ background: '#0EA5E9' }}>
                                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/></svg>
                                </div>
                                <span className="text-[0.55rem] font-700 text-[#1A1A1A]">{ex.preview.brand}</span>
                              </div>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 text-white" style={{ background: '#0EA5E9' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[0.35rem] font-600 uppercase tracking-[0.12em] mb-1" style={{ color: '#0EA5E9' }}>{ex.preview.trustBadge}</span>
                              <h3 className="text-[0.72rem] font-700 text-[#1A1A1A] leading-tight mb-2">{ex.preview.hero}</h3>
                              {/* Team avatars */}
                              <div className="flex -space-x-1.5 mt-2">
                                {[0,1,2,3].map(n => (
                                  <div key={n} className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[0.25rem] font-700 text-white" style={{ background: ['#0EA5E9','#0284C7','#0369A1','#0EA5E9'][n] }}>{['L','M','A','T'][n]}</div>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(14,165,233,0.1)', color: '#0284C7' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'dark-purple' && (
                          /* Dark purple style: product/store, category-driven */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.08em] uppercase">{ex.preview.brand}</span>
                              <svg className="w-3.5 h-3.5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <h3 className="text-[0.72rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              <div className="px-2.5 py-1 rounded text-[0.38rem] font-700 text-white inline-flex w-fit" style={{ background: '#8B5CF6' }}>{ex.preview.cta}</div>
                            </div>
                            {/* Product grid preview */}
                            <div className="grid grid-cols-3 gap-1.5 mt-3">
                              {[0,1,2].map(idx => (
                                <div key={idx} className="aspect-square rounded bg-[#1A1815] flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {(ex.style === 'light') && (
                          /* Light style: editorial, gallery-focused */
                          <div className="absolute inset-0 bg-[#FAFAFA] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded bg-[#1A1A1A]" />
                                <span className="text-[0.55rem] font-700 text-[#1A1A1A] tracking-[0.04em]">{ex.preview.brand}</span>
                              </div>
                              <div className="flex gap-3">
                                {['About', 'Work', 'Contact'].map(t => (
                                  <span key={t} className="text-[0.4rem] text-[#666]">{t}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                              <h3 className="text-[0.72rem] font-700 text-[#1A1A1A] leading-tight mb-2 max-w-[180px]">{ex.preview.hero}</h3>
                              <div className="w-8 h-[1px] bg-[#1A1A1A] mb-2" />
                              <span className="text-[0.38rem] text-[#888] mb-3">{ex.preview.trustBadge}</span>
                              <div className="px-3 py-1 border border-[#1A1A1A] rounded text-[0.4rem] font-600 text-[#1A1A1A]">{ex.preview.cta}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 mt-3">
                              {[0,1,2].map(idx => (
                                <div key={idx} className="aspect-[4/3] rounded bg-[#E5E5E5] flex items-center justify-center">
                                  <svg className="w-4 h-4 text-[#CCC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-2 py-0.5 bg-[#1A1A1A] text-white rounded text-[0.35rem]">{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'light-teal' && (
                          /* Light teal style: clinical, clean, professional */
                          <div className="absolute inset-0 p-4 flex flex-col" style={{ background: '#F0F9F4' }}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-lg flex items-center justify-center" style={{ background: '#14B8A6' }}>
                                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                </div>
                                <span className="text-[0.55rem] font-700 text-[#1A1A1A]">{ex.preview.brand}</span>
                              </div>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 text-white" style={{ background: '#14B8A6' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[0.35rem] font-600 uppercase tracking-[0.1em] mb-1" style={{ color: '#14B8A6' }}>{ex.preview.trustBadge}</span>
                              <h3 className="text-[0.72rem] font-700 text-[#1A1A1A] leading-tight mb-2">{ex.preview.hero}</h3>
                              {/* Team avatars */}
                              <div className="flex -space-x-1.5 mt-2">
                                {[0,1,2].map(n => (
                                  <div key={n} className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[0.3rem] font-700 text-white" style={{ background: ['#14B8A6','#0D9488','#0F766E'][n], borderColor: '#F0F9F4' }}>Dr</div>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(20,184,166,0.1)', color: '#0D9488' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'dark-teal' && (
                          /* Dark teal style: modern digital health, teal on dark */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.08em] uppercase">{ex.preview.brand}</span>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 text-white" style={{ background: '#14B8A6' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="flex items-center gap-1 mb-2">
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#14B8A6' }} />
                                <span className="text-[0.35rem] font-600 uppercase tracking-[0.1em]" style={{ color: '#14B8A6' }}>{ex.preview.trustBadge}</span>
                              </div>
                              <h3 className="text-[0.82rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              <div className="inline-flex mt-2">
                                <div className="px-2.5 py-1 rounded text-[0.38rem] font-600 text-white" style={{ background: '#14B8A6' }}>{ex.preview.cta}</div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(20,184,166,0.1)', color: '#14B8A6' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'light-sage' && (
                          /* Light sage style: warm, compassionate, care-focused */
                          <div className="absolute inset-0 p-4 flex flex-col" style={{ background: '#FDF8F4' }}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#7DB88F' }}>
                                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                </div>
                                <span className="text-[0.55rem] font-700 text-[#2D1B0E]">{ex.preview.brand}</span>
                              </div>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 text-white" style={{ background: '#7DB88F' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[0.35rem] font-600 uppercase tracking-[0.1em] mb-1" style={{ color: '#7DB88F' }}>{ex.preview.trustBadge}</span>
                              <h3 className="text-[0.72rem] font-700 text-[#2D1B0E] leading-tight mb-2">{ex.preview.hero}</h3>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(125,184,143,0.12)', color: '#5A8A6A' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'dark-amber' && (
                          /* Dark amber style: energetic, warm glow on dark */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.08em] uppercase">{ex.preview.brand}</span>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-700 text-black" style={{ background: '#F59E0B' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="flex items-center gap-1 mb-2">
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F59E0B' }} />
                                <span className="text-[0.35rem] font-600 uppercase tracking-[0.1em]" style={{ color: '#F59E0B' }}>{ex.preview.trustBadge}</span>
                              </div>
                              <h3 className="text-[0.82rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              <div className="inline-flex mt-2">
                                <div className="px-2.5 py-1 rounded text-[0.38rem] font-700 text-black" style={{ background: '#F59E0B' }}>{ex.preview.cta}</div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'dark-copper' && (
                          /* Dark copper style: moody bar, warm dark, atmospheric */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.06em]">{ex.preview.brand}</span>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 border" style={{ borderColor: '#C87941', color: '#C87941' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                              <h3 className="text-[0.72rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              <div className="w-8 h-[1px] mb-2" style={{ background: '#C87941' }} />
                              <span className="text-[0.35rem] text-[#888]">{ex.preview.trustBadge}</span>
                            </div>
                            {/* Gallery grid */}
                            <div className="grid grid-cols-3 gap-1.5 mt-3">
                              {[0,1,2].map(idx => (
                                <div key={idx} className="aspect-[4/3] rounded bg-[#1A1815] flex items-center justify-center">
                                  <svg className="w-3 h-3 text-[#C87941]/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(200,121,65,0.1)', color: '#C87941' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'warm-amber' && (
                          /* Warm amber style: cafe menu, warm cream, amber accent */
                          <div className="absolute inset-0 p-4 flex flex-col" style={{ background: '#FFF8F0' }}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#F59E0B' }}>
                                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M17 8h1a4 4 0 110 8h-1"/><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
                                </div>
                                <span className="text-[0.55rem] font-700 text-[#2D1B0E]">{ex.preview.brand}</span>
                              </div>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 text-white" style={{ background: '#F59E0B' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[0.35rem] font-600 uppercase tracking-[0.1em] mb-1" style={{ color: '#F59E0B' }}>{ex.preview.trustBadge}</span>
                              <h3 className="text-[0.72rem] font-700 text-[#2D1B0E] leading-tight mb-2">{ex.preview.hero}</h3>
                            </div>
                            {/* Menu items */}
                            <div className="space-y-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <div key={s} className="flex items-center gap-2 px-2 py-1 rounded" style={{ background: 'rgba(245,158,11,0.08)' }}>
                                  <div className="w-1 h-1 rounded-full" style={{ background: '#F59E0B' }} />
                                  <span className="text-[0.35rem] text-[#5A3E2B]">{s}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'warm-sage' && (
                          /* Warm sage style: neighbourhood, earthy green, friendly */
                          <div className="absolute inset-0 p-4 flex flex-col" style={{ background: '#F5EDE0' }}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#4A7C59' }}>
                                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                                <span className="text-[0.55rem] font-700 text-[#2D1B0E]">{ex.preview.brand}</span>
                              </div>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 text-white" style={{ background: '#4A7C59' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[0.4rem] font-500 mb-1.5" style={{ color: '#4A7C59' }}>{ex.preview.trustBadge}</span>
                              <h3 className="text-[0.72rem] font-700 text-[#2D1B0E] leading-tight mb-2">{ex.preview.hero}</h3>
                              <div className="flex gap-1.5">
                                <div className="px-3 py-1.5 rounded text-[0.4rem] font-600 text-white" style={{ background: '#4A7C59' }}>{ex.preview.cta}</div>
                                <div className="px-3 py-1.5 rounded text-[0.4rem] font-500 border" style={{ color: '#4A7C59', borderColor: 'rgba(74,124,89,0.3)' }}>Learn More</div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-auto">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(74,124,89,0.1)', color: '#4A7C59' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'dark-neon' && (
                          /* Dark neon style: dark bg, vibrant glow, visual-first */
                          <div className="absolute inset-0 bg-[#0A0A0A] p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-white tracking-[0.1em] uppercase">{ex.preview.brand}</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                              <h3 className="text-[0.82rem] font-700 text-white leading-tight mb-2">{ex.preview.hero}</h3>
                              <span className="text-[0.35rem] text-[#555] uppercase tracking-[0.1em]">{ex.preview.trustBadge}</span>
                            </div>
                            {/* Neon glow card */}
                            <div className="rounded-lg p-3 mb-2" style={{ background: 'rgba(255,255,255,0.03)', boxShadow: '0 0 30px rgba(139,92,246,0.15)' }}>
                              <div className="flex gap-1.5">
                                {ex.preview.services.map(s => (
                                  <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem] text-[#A1A1AA]">{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {ex.style === 'light-rose' && (
                          /* Light rose style: dusty rose, editorial, lookbook */
                          <div className="absolute inset-0 p-4 flex flex-col" style={{ background: '#FFF0F3' }}>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-[#2D1B0E] tracking-[0.1em] uppercase">{ex.preview.brand}</span>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 text-white" style={{ background: '#B76E79' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                              <h3 className="text-[0.72rem] font-700 text-[#2D1B0E] leading-tight mb-2">{ex.preview.hero}</h3>
                              <span className="text-[0.35rem] text-[#999] mb-2">{ex.preview.trustBadge}</span>
                            </div>
                            {/* Gallery grid */}
                            <div className="grid grid-cols-3 gap-1.5 mt-3">
                              {[0,1,2].map(idx => (
                                <div key={idx} className="aspect-[4/3] rounded-lg flex items-center justify-center" style={{ background: ['#F5E1E5','#EDE0E8','#F0E5E8'][idx] }}>
                                  <svg className="w-3 h-3 text-[#D4A0A7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(183,110,121,0.12)', color: '#8B4A55' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'light-blush' && (
                          /* Light blush style: muted rose, elegant, boutique */
                          <div className="absolute inset-0 p-4 flex flex-col" style={{ background: '#FAFAFA' }}>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-[#1A1A1A] tracking-[0.08em] uppercase">{ex.preview.brand}</span>
                              <div className="px-2 py-0.5 rounded text-[0.38rem] font-600 text-white" style={{ background: '#D4A0A7' }}>{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[0.35rem] font-600 uppercase tracking-[0.1em] mb-1" style={{ color: '#D4A0A7' }}>{ex.preview.trustBadge}</span>
                              <h3 className="text-[0.72rem] font-700 text-[#1A1A1A] leading-tight mb-2">{ex.preview.hero}</h3>
                            </div>
                            {/* Service cards */}
                            <div className="space-y-1.5 mt-auto">
                              {ex.preview.services.map(s => (
                                <div key={s} className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{ background: 'rgba(212,160,167,0.08)' }}>
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4A0A7' }} />
                                  <span className="text-[0.35rem] text-[#666]">{s}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {ex.style === 'light-pink' && (
                          /* Light pink style: beauty brand, soft, elegant */
                          <div className="absolute inset-0 p-4 flex flex-col" style={{ background: '#FDF2F8' }}>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[0.55rem] font-700 text-[#1A1A1A] tracking-[0.1em] uppercase">{ex.preview.brand}</span>
                              <div className="px-3 py-1 rounded-full text-[0.38rem] font-600 bg-[#1A1A1A] text-white">{ex.preview.cta}</div>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                              <h3 className="text-[0.72rem] font-700 text-[#1A1A1A] leading-tight mb-2">{ex.preview.hero}</h3>
                              <span className="text-[0.35rem] text-[#999] mb-2">{ex.preview.trustBadge}</span>
                            </div>
                            {/* Product/treatment grid */}
                            <div className="grid grid-cols-3 gap-1.5 mt-3">
                              {[0,1,2].map(idx => (
                                <div key={idx} className="aspect-square rounded-lg flex items-center justify-center" style={{ background: ['#F5E6E8','#E8E0F5','#E8F0F5'][idx] }}>
                                  <svg className="w-3 h-3 text-[#CCC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {ex.preview.services.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded text-[0.32rem]" style={{ background: 'rgba(236,72,153,0.1)', color: '#EC4899' }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {(ex.style === 'warm') && (
                          /* Warm style: community, neighbourhood, friendly */
                          <div className="absolute inset-0 p-4 flex flex-col" style={{ background: '#FDF6EE' }}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-full bg-[#C2703E]" />
                                <span className="text-[0.55rem] font-700 text-[#2D1B0E] tracking-[0.02em]">{ex.preview.brand}</span>
                              </div>
                              <div className="flex gap-3">
                                {['About', 'Services', 'Reviews'].map(t => (
                                  <span key={t} className="text-[0.4rem] text-[#8B6F5C]">{t}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <span className="text-[0.4rem] font-500 text-[#C2703E] mb-1.5">{ex.preview.trustBadge}</span>
                              <h3 className="text-[0.72rem] font-700 text-[#2D1B0E] leading-tight mb-2">{ex.preview.hero}</h3>
                              <div className="flex gap-1.5">
                                <div className="px-3 py-1.5 bg-[#C2703E] rounded text-[0.4rem] font-600 text-white">{ex.preview.cta}</div>
                                <div className="px-3 py-1.5 border border-[#C2703E]/30 rounded text-[0.4rem] font-500 text-[#C2703E]">Learn More</div>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <div className="w-14 h-14 rounded-lg bg-[#E8D5C0] flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4 text-[#C2703E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                              </div>
                              <div className="flex flex-wrap gap-1 content-start">
                                {ex.preview.services.map(s => (
                                  <span key={s} className="px-2 py-0.5 bg-white/60 rounded text-[0.36rem] text-[#5A3E2B] border border-[#C2703E]/10">{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Hover overlay */}
                        <Link to={`/examples/${ex.template || (ex.style === 'dark' ? 'closer' : ex.style === 'light' ? 'portfolio' : 'local')}`} className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="px-4 py-2 rounded-xl bg-[#FB5005] text-white text-[0.78rem] font-600">View Full Page</span>
                        </Link>
                      </div>
                    </div>

                    {/* Info below preview */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[0.72rem] font-700 text-[#FB5005] uppercase tracking-[0.08em]">{ex.name}</span>
                        <span className="text-[0.68rem] text-[#71717A]">-</span>
                        <span className="text-[0.78rem] text-[#A1A1AA]">{ex.tagline}</span>
                      </div>
                      <p className="text-[0.85rem] text-[#A1A1AA] leading-relaxed mb-4">{ex.desc}</p>
                      <Link to={`/examples/${ex.template || (ex.style === 'dark' ? 'closer' : ex.style === 'light' ? 'portfolio' : 'local')}`} className="inline-flex items-center gap-1.5 text-[0.82rem] font-600 text-[#FB5005] hover:underline">
                        View full page
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.4}>
              <p className="text-center text-[0.85rem] text-[#71717A] mt-6">
                Every site is custom-designed for your business. <button onClick={scrollToForm} className="text-[#FB5005] hover:underline">Tell us which style you like and we will make it yours.</button>
              </p>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ========== PACKAGES ========== */}
      <section className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
                What You Get
              </span>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,3vw,2.2rem)] font-700 text-[#FAFAFA]">
                Built for your business
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.packages.map((pkg, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`relative bg-[#111111] border rounded-2xl p-6 hover:border-white/[0.12] transition-all duration-300 flex flex-col h-full ${
                  pkg.popular ? 'border-[#FB5005]/40' : 'border-white/[0.06]'
                }`}>
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.7rem] font-600 text-white bg-[#FB5005] px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-[1.1rem] font-700 text-[#FAFAFA] mb-1">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-[1.6rem] font-700 text-[#FB5005]">{pkg.price}</span>
                    <span className="text-[0.82rem] text-[#71717A]">{pkg.unit}</span>
                  </div>
                  <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed mb-5">{pkg.desc}</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[0.85rem] text-[#A1A1AA]">
                        <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#FB5005]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={scrollToForm}
                    className={`w-full py-3 rounded-xl text-[0.88rem] font-600 transition-all ${
                      pkg.popular
                        ? 'bg-[#FB5005] text-white hover:shadow-[0_0_30px_rgba(251,80,5,0.2)]'
                        : 'border border-white/[0.12] text-[#FAFAFA] hover:border-[#FB5005] hover:text-[#FB5005]'
                    }`}
                  >
                    {pkg.cta}
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ADD-ONS ========== */}
      {data.addons && data.addons.length > 0 && (
        <section className="py-[80px]">
          <div className="max-w-[1100px] mx-auto px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
                  Level Up
                </span>
                <h2 className="font-[Satoshi] text-[clamp(1.6rem,3vw,2.2rem)] font-700 text-[#FAFAFA]">
                  Add-ons to supercharge your site
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.addons.map((addon, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-300 group h-full flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-[#FB5005]/[0.08] border border-[#FB5005]/[0.15] flex items-center justify-center mb-4 group-hover:bg-[#FB5005]/[0.15] transition-colors">
                      <svg className="w-5 h-5 text-[#FB5005]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {addon.icon === 'palette' && <><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M13.5 9v3a2 2 0 01-2 2H8.5"/><path d="M18 15.5V12a2 2 0 00-2-2h-3.5"/></>}
                        {addon.icon === 'bot' && <><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></>}
                        {addon.icon === 'map' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>}
                        {addon.icon === 'sign' && <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6V2"/><path d="M8 2h8"/></>}
                        {addon.icon === 'menu' && <><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="14" y2="18"/></>}
                        {addon.icon === 'camera' && <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>}
                        {addon.icon === 'chart' && <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>}
                        {addon.icon === 'crm' && <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>}
                        {addon.icon === 'shirt' && <><path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.34 2.23l1.38 8a2 2 0 001.87 1.67L12 16l6.47-.64a2 2 0 001.87-1.67l1.38-8a2 2 0 00-1.34-2.23z"/></>}
                        {addon.icon === 'video' && <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></>}
                        {addon.icon === 'gift' && <><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></>}
                        {addon.icon === 'doc' && <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>}
                        {addon.icon === 'pen' && <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></>}
                        {addon.icon === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>}
                        {addon.icon === 'box' && <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>}
                        {addon.icon === 'form' && <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>}
                        {addon.icon === 'shield' && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>}
                      </svg>
                    </div>
                    <h3 className="text-[0.95rem] font-600 text-[#FAFAFA] mb-1.5">{addon.title}</h3>
                    <p className="text-[0.82rem] text-[#A1A1AA] leading-relaxed mb-3 flex-1">{addon.desc}</p>
                    <span className="text-[0.78rem] font-600 text-[#FB5005]">{addon.price}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.4}>
              <p className="text-center text-[0.85rem] text-[#71717A] mt-6">
                All add-ons can be bundled with any package. <button onClick={scrollToForm} className="text-[#FB5005] hover:underline">Ask us about a custom combo.</button>
              </p>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ========== PROCESS ========== */}
      <section className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
                Simple Process
              </span>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,3vw,2.2rem)] font-700 text-[#FAFAFA]">
                {data.process.heading}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.process.items.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#FB5005]/[0.08] border border-[#FB5005]/[0.15] flex items-center justify-center mx-auto mb-5">
                    <span className="text-[1.1rem] font-700 text-[#FB5005]">{item.step}</span>
                  </div>
                  <h3 className="text-[1rem] font-600 text-[#FAFAFA] mb-2">{item.title}</h3>
                  <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
                Trusted By Business Owners
              </span>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,3vw,2.2rem)] font-700 text-[#FAFAFA]">
                Real results from real clients
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-[#FB5005]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-[0.9rem] text-[#A1A1AA] leading-relaxed mb-5 flex-1">"{t.quote}"</p>
                  <div>
                    <p className="text-[0.85rem] font-600 text-[#FAFAFA]">{t.name}</p>
                    <p className="text-[0.78rem] text-[#71717A]">{t.company}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-[80px] bg-[#0E0E0E]">
          <div className="max-w-[720px] mx-auto px-6">
            <AnimatedSection>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,3vw,2.2rem)] font-700 text-[#FAFAFA] mb-8 text-center">
                Common questions
              </h2>
            </AnimatedSection>

            <div className="space-y-3">
              {data.faqs.map((faq, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="bg-[#111111] border border-white/[0.06] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-[0.9rem] font-500 text-[#FAFAFA] pr-4">{faq.q}</span>
                      <svg
                        className={`w-4 h-4 shrink-0 text-[#71717A] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-5 pb-4 text-[0.88rem] text-[#A1A1AA] leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== FINAL CTA + FORM ========== */}
      <section className="py-[80px]" ref={formRef}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="relative bg-[#0E0E0E] border border-white/[0.06] rounded-3xl overflow-hidden">
            {/* Glow */}
            <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#FB5005]/[0.06] rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 p-8 md:p-12 text-center">
              <AnimatedSection>
                <h2 className="font-[Satoshi] text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-[#FAFAFA] mb-4 max-w-[600px] mx-auto leading-tight">
                  {data.finalCta.heading}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <p className="text-[1rem] text-[#A1A1AA] leading-relaxed mb-8 max-w-[520px] mx-auto">
                  {data.finalCta.subline}
                </p>
              </AnimatedSection>

              {submitted ? (
                <AnimatedSection>
                  <div className="bg-[#111111] border border-[#22C55E]/20 rounded-2xl p-8 max-w-[440px] mx-auto">
                    <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 className="text-[1.1rem] font-600 text-[#FAFAFA] mb-2">You are in.</h3>
                    <p className="text-[0.88rem] text-[#A1A1AA]">We will be in touch within 24 hours. Check your inbox.</p>
                  </div>
                </AnimatedSection>
              ) : (
                <AnimatedSection delay={0.2}>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-[500px] mx-auto mb-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 bg-[#111111] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#FB5005]/50 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-[#111111] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#FB5005]/50 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-[500px] mx-auto">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-3.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 hover:shadow-[0_0_30px_rgba(251,80,5,0.2)] transition-all"
                    >
                      {data.finalCta.cta}
                    </button>
                    {data.finalCta.ctaExternal && (
                      <a
                        href={data.finalCta.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 rounded-xl border border-white/[0.12] text-[#FAFAFA] text-[0.88rem] font-600 hover:border-[#FB5005] hover:text-[#FB5005] transition-all text-center"
                      >
                        Book on Cal.com
                      </a>
                    )}
                  </div>
                  <p className="text-[0.72rem] text-[#71717A] mt-4">No spam. No obligation. Just a chat about your business.</p>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
