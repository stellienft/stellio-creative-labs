import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { sendNotificationEmail } from '../lib/email'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'
import { WebPageSchema, BreadcrumbSchema, FAQSchema, SeoMeta } from '../components/JsonLd'

const API_ENDPOINT = '/site-audit-api.php'

const SECTIONS = [
  {
    icon: '<path d="M9 12l2 2 4-4"/><path d="M21 12c-1 0-3-1-3-3s2-3 3-3c0-2-2-4-4-4-1 0-2 1-3 1-1 0-2-1-3-1-2 0-4 2-4 4 1 0 3 1 3 3s-2 3-3 3c0 2 2 4 4 4 1 0 2-1 3-1 1 0 2 1 3 1 2 0 4-2 4-4z"/>',
    title: 'On-Page & SEO',
    desc: 'Titles, meta, headings, alt text, schema, social previews.',
  },
  {
    icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    title: 'DNS & Domain',
    desc: 'DNS records, SSL certificate health, SPF/DMARC, domain age.',
  },
  {
    icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    title: 'Performance',
    desc: 'Core Web Vitals, Lighthouse scores, real-user Chrome data.',
  },
  {
    icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    title: 'AI Design Audit',
    desc: 'AI reviews your visual design: hierarchy, contrast, CTAs, modern feel.',
  },
]

function ScoreRing({ score, size = 160 }) {
  const r = (size - 16) / 2
  const c = 2 * Math.PI * r
  const color = score >= 80 ? '#22C55E' : score >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
        <motion.circle
          cx={size/2} cy={size/2} r={r}
          stroke={color} strokeWidth="10" fill="none" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * score / 100) }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-[Satoshi] text-[2.6rem] font-700 leading-none" style={{ color }}>{score}</span>
        <span className="text-[0.68rem] text-[#71717A] uppercase tracking-[0.12em] mt-1">/ 100</span>
      </div>
    </div>
  )
}

function CategoryScore({ label, score }) {
  const color = score >= 80 ? '#22C55E' : score >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[0.78rem] font-600 text-[#A1A1AA]">{label}</span>
        <span className="font-[Satoshi] text-[1.3rem] font-700" style={{ color }}>{score}</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

const impactStyle = {
  critical: 'text-red-400 bg-red-400/10 border-red-400/20',
  high: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  low: 'text-[#A1A1AA] bg-white/[0.04] border-white/[0.08]',
}

function OpportunityCard({ opp, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#111111] border border-white/[0.06] rounded-2xl p-4 hover:border-white/[0.12] transition-colors flex flex-col"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-[Satoshi] text-[0.7rem] font-700 text-[#FB5005] shrink-0">{String(i + 1).padStart(2, '0')}</span>
          <h4 className="text-[0.88rem] font-600 text-[#FAFAFA] leading-snug">{opp.title}</h4>
        </div>
        <span className={`text-[0.58rem] font-600 uppercase tracking-wider px-1.5 py-0.5 rounded-md border shrink-0 ${impactStyle[opp.impact] || impactStyle.low}`}>
          {opp.impact}
        </span>
      </div>
      <p className="text-[0.78rem] text-[#A1A1AA] leading-relaxed">{opp.detail}</p>
      {opp.fix && (
        <p className="text-[0.74rem] text-[#71717A] leading-relaxed mt-2 pt-2 border-t border-white/[0.04]">
          <span className="text-[#FB5005] font-600">Fix: </span>{opp.fix}
        </p>
      )}
    </motion.div>
  )
}

function AiDesignPanel({ design, screenshotUrl }) {
  if (!design) return null
  return (
    <div className="bg-[#111111] border border-[#FB5005]/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FB5005]/[0.06] rounded-full blur-[80px] pointer-events-none" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FB5005]/10 border border-[#FB5005]/25 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FB5005" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-700 text-[#FAFAFA]">AI Visual Design Audit</h3>
              <p className="text-[0.72rem] text-[#71717A]">GPT-4o vision review of your live homepage</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {design.modernity && (
              <span className="text-[0.68rem] font-600 uppercase tracking-wider text-[#A1A1AA] bg-white/[0.04] border border-white/[0.08] px-2.5 py-1.5 rounded-md capitalize">{design.modernity.replace('-', ' ')}</span>
            )}
            <span className="font-[Satoshi] text-[1.6rem] font-700 text-[#FB5005]">{design.design_score}<span className="text-[0.9rem] text-[#71717A]">/100</span></span>
          </div>
        </div>

        <p className="text-[0.92rem] text-[#A1A1AA] leading-relaxed mb-5">{design.overall_impression}</p>

        {screenshotUrl && (
          <div className="rounded-xl border border-white/[0.08] overflow-hidden mb-5 bg-[#0A0A0A]">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0E0E0E] border-b border-white/[0.06]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/70" />
            </div>
            <img src={screenshotUrl} alt="Audited site screenshot" className="w-full" loading="lazy" />
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          {design.strengths?.length > 0 && (
            <div>
              <p className="text-[0.7rem] font-600 uppercase tracking-[0.12em] text-[#22C55E] mb-3">Strengths</p>
              <ul className="space-y-2">
                {design.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[0.84rem] text-[#A1A1AA] leading-relaxed">
                    <svg className="w-3.5 h-3.5 mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {design.issues?.length > 0 && (
            <div>
              <p className="text-[0.7rem] font-600 uppercase tracking-[0.12em] text-[#EF4444] mb-3">Design Issues</p>
              <ul className="space-y-2">
                {design.issues.map((iss, i) => (
                  <li key={i} className="text-[0.84rem] text-[#A1A1AA] leading-relaxed">
                    <span className="text-[#FAFAFA] font-600">{iss.title}: </span>{iss.detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {design.recommendations?.length > 0 && (
          <div className="mt-5 pt-5 border-t border-white/[0.06]">
            <p className="text-[0.7rem] font-600 uppercase tracking-[0.12em] text-[#FB5005] mb-3">Recommendations</p>
            <ul className="space-y-2">
              {design.recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-[0.84rem] text-[#A1A1AA] leading-relaxed">
                  <span className="text-[#FB5005] font-700 shrink-0">{i + 1}.</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SiteAudit() {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanStep, setScanStep] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [emailCaptured, setEmailCaptured] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [lead, setLead] = useState({ name: '', email: '', message: '' })
  const [leadSent, setLeadSent] = useState(false)
  const [leadSending, setLeadSending] = useState(false)
  const [auditCount, setAuditCount] = useState(null)
  const resultsRef = useRef(null)
  const emailRef = useRef(null)
  const leadSavedRef = useRef(false)

  useEffect(() => {
    fetch(`${API_ENDPOINT}?action=count`)
      .then(r => r.json())
      .then(d => { if (typeof d.count === 'number' && d.count >= 3) setAuditCount(d.count) })
      .catch(() => {})
  }, [])

  const scanSteps = [
    'Fetching your homepage',
    'Analysing on-page SEO',
    'Checking DNS & SSL',
    'Running performance tests',
    'AI reviewing your design',
    'Compiling findings',
  ]

  const runAudit = async (e) => {
    e.preventDefault()
    if (!url.trim()) return
    // scroll down to the scan progress immediately (results section renders after)
    setTimeout(() => {
      const target = document.getElementById('scan-progress') || document.getElementById('audit-results')
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: window.scrollY + 500, behavior: 'smooth' })
    }, 150)
    setScanning(true)
    setError('')
    setResult(null)
    setEmailCaptured(false)
    setLeadSent(false)
    leadSavedRef.current = false
    setScanStep(0)

    // Animated stepper while the scan runs
    const stepTimer = setInterval(() => setScanStep(s => Math.min(s + 1, scanSteps.length - 2)), 2500)

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Audit failed. Try again.')
      }
      clearInterval(stepTimer)
      setScanStep(scanSteps.length - 1)
      setResult(data)
      // Note: the server API logs the audit to site_audits itself (site-audit-api.php).
      // Do NOT insert from the browser here - that caused every audit to be logged twice.
    } catch (err) {
      clearInterval(stepTimer)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      clearInterval(stepTimer)
      setScanning(false)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
    }
  }

  const captureEmailAndDownload = async (e) => {
    e.preventDefault()
    if (!email.trim() || !result || downloading) return
    setDownloading(true)
    setError('')

    try {
      // Save lead to Supabase (visible in admin + guarantees Boss sees it even if email fails)
      if (!leadSavedRef.current) {
        leadSavedRef.current = true
        const findingsSummary = [
          `OVERALL SCORE: ${result.overall_score}/100`,
          `CATEGORY SCORES: On-Page & SEO ${result.scores?.on_page ?? '-'}/100, Performance ${result.scores?.performance ?? '-'}/100, DNS & Domain ${result.scores?.dns_domain ?? '-'}/100, AI Design ${result.scores?.design ?? '-'}/100`,
          result.ai_design ? `AI DESIGN VERDICT: ${(result.ai_design.modernity || '').replace('-', ' ')} - ${result.ai_design.overall_impression || ''}` : '',
          '',
          `TOP OPPORTUNITIES (${result.opportunity_count} total):`,
          ...result.opportunities.slice(0, 10).map((o, i) => `${i + 1}. [${(o.impact || 'medium').toUpperCase()}] ${o.title}: ${(o.detail || '').slice(0, 160)}${o.fix ? ` | Fix: ${o.fix.slice(0, 120)}` : ''}`),
        ].filter(Boolean).join('\n')
        supabase.from('submissions').insert({
          name: 'Site Audit Lead',
          email: email.trim(),
          service: 'Free Site Audit (PDF)',
          message: `Audited site: ${result.url}\n\n${findingsSummary}`,
          status: 'new',
        }).then(() => {}).catch(() => {})
      }

      // Ask the server to generate the branded PDF + email it
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send_pdf', email: email.trim(), audit: result }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Could not send the PDF. Please try again.')
      if (!data.sent) throw new Error(data.message || 'Could not send the PDF. Please try again.')
      setEmailCaptured(true)
    } catch (err) {
      leadSavedRef.current = false
      setError(err.message || 'Could not send the PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }


  const submitLead = async (e) => {
    e.preventDefault()
    setLeadSending(true)
    try {
      await supabase.from('submissions').insert({
        name: lead.name || 'Site Audit Enquiry',
        email: lead.email,
        service: 'Site Audit - Book a Call',
        message: `${lead.message}\n\n[Audit context: ${result?.url || url} - score ${result?.overall_score || '?'}/100, ${result?.opportunity_count || '?'} opportunities]`,
        status: 'new',
      })
      sendNotificationEmail({
        to: 'hello@stellio.com.au',
        subject: `Audit call booking: ${lead.name} (${result?.host || 'site audit'})`,
        htmlBody: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;"><div style="background:#FB5005;padding:20px 28px;border-radius:12px 12px 0 0;"><h2 style="color:#fff;margin:0;font-size:18px;">Audit Call Request</h2></div><div style="background:#0A0A0A;padding:28px;border-radius:0 0 12px 12px;color:#FAFAFA;"><p><strong>Name:</strong> ${lead.name}</p><p><strong>Email:</strong> ${lead.email}</p><p><strong>Audited site:</strong> ${result?.url || url}</p><p><strong>Site score:</strong> ${result?.overall_score || '?'}/100</p><p><strong>Message:</strong></p><p style="color:#A1A1AA;">${lead.message || '-'}</p></div></div>`,
      }).catch(() => {})
      setLeadSent(true)
    } catch (err) {
      setError('Could not send your message. Please try again.')
    } finally {
      setLeadSending(false)
    }
  }

  return (
    <>
      {/* SEO: title, description, OG, twitter, canonical */}
      <SeoMeta
        title="Free Website Audit Tool Australia | Score Your Site in 30 Seconds - Stellio"
        description="Run a free instant website audit: on-page SEO, DNS and domain health, SSL, performance, Core Web Vitals, real-user data and an AI visual design review. Get your scored PDF report - no signup to see results."
        canonical="https://stellio.com.au/site-audit"
        ogImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=630&fit=crop&auto=format"
        ogType="website"
      />
      <WebPageSchema
        type="WebApplication"
        name="Stellio Free Website Audit Tool"
        description="Free instant website audit for Australian businesses: on-page SEO, DNS and domain health, SSL, performance, Core Web Vitals, real-user experience data and an AI visual design review, delivered as a scored PDF report."
        url="https://stellio.com.au/site-audit"
      />
      <FAQSchema faqs={[
        { question: 'Is the website audit really free?', answer: 'Yes. Paste your URL and see the full breakdown instantly. The only thing behind an email is the PDF version of the report.' },
        { question: 'What does the free website audit check?', answer: 'On-page SEO (titles, meta, headings, alt text, schema), DNS and domain health (records, SSL, SPF and DMARC), performance (Core Web Vitals, Lighthouse, real-user Chrome data) and an AI visual design review of your homepage screenshot.' },
        { question: 'How long does the audit take?', answer: 'About 30 seconds. The tool scans your live site in real time across more than 25 checks.' },
        { question: 'Who is this audit for?', answer: 'Australian small businesses and startups who want to know what to fix on their website before investing in a redesign or refresh.' },
      ]} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://stellio.com.au' }, { name: 'Free Site Audit', url: 'https://stellio.com.au/site-audit' }]} />

      {/* HERO */}
      <section className="pt-[140px] pb-[80px] relative overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#FB5005]/[0.07] rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-5">
              Free Instant Audit
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2.2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                How does your website<br />
                <span className="gradient-text">actually stack up?</span>
              </h1>
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.16}>
            <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[640px] mx-auto mb-10">
              Paste your website URL. In about 30 seconds you get a full breakdown: SEO, DNS and domain health,
              performance, real-user experience data, and an AI visual design review - with a prioritised list of
              opportunities. Free. No signup to see the results.
            </p>
          </AnimatedSection>

          {/* URL input */}
          <AnimatedSection delay={0.24}>
            <form onSubmit={runAudit} className="max-w-[560px] mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  </span>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="yourwebsite.com.au"
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-[#111111] border border-white/[0.1] text-[#FAFAFA] text-[0.95rem] placeholder:text-[#71717A] focus:outline-none focus:border-[#FB5005] transition-colors"
                    disabled={scanning}
                  />
                </div>
                <button
                  type="submit"
                  disabled={scanning || !url.trim()}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FB5005] text-white text-[0.9rem] font-600 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {scanning ? 'Scanning...' : 'Audit my site'}
                  {!scanning && (
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  )}
                </button>
              </div>
              <p className="text-[0.75rem] text-[#71717A] mt-3 flex items-center justify-center gap-2 flex-wrap">
                  <span>Takes about 30 seconds. No signup required to see results.</span>
                  {auditCount !== null && (
                    <span className="inline-flex items-center gap-1.5 text-[#FB5005] font-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FB5005] animate-pulse" />
                      {auditCount.toLocaleString()} audits run so far
                    </span>
                  )}
                </p>
            </form>
          </AnimatedSection>

          {error && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 text-[0.85rem] text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 max-w-[560px] mx-auto">
              {error}
            </motion.div>
          )}
        </div>
      </section>

      {/* WHAT WE CHECK */}
      <section className="pb-[100px]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTIONS.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.07} className="bg-[#0E0E0E] border border-white/[0.06] rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-[#FB5005]/10 border border-[#FB5005]/20 flex items-center justify-center text-[#FB5005] mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: s.icon }} />
                </div>
                <h3 className="text-[0.9rem] font-700 mb-1.5">{s.title}</h3>
                <p className="text-[0.78rem] text-[#A1A1AA] leading-relaxed">{s.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SCANNING STATE */}
      <AnimatePresence>
        {scanning && (
          <motion.section id="scan-progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-[100px] pt-8 scroll-mt-20">
            <div className="max-w-[560px] mx-auto px-6 text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#FB5005]/10 border border-[#FB5005]/25 flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FB5005" strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-9-9"/></svg>
                </motion.div>
              </div>
              <h3 className="font-[Satoshi] text-[1.3rem] font-700 mb-6">Scanning {url}</h3>
              <div className="space-y-3 text-left">
                {scanSteps.map((step, i) => (
                  <div key={step} className={`flex items-center gap-3 text-[0.85rem] transition-colors duration-300 ${i < scanStep ? 'text-[#22C55E]' : i === scanStep ? 'text-[#FAFAFA]' : 'text-[#71717A]'}`}>
                    {i < scanStep ? (
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : i === scanStep ? (
                      <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[#FB5005] ml-1 mr-1 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-white/[0.15] ml-1 mr-1 shrink-0" />
                    )}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* RESULTS */}
      <AnimatePresence>
        {result && !scanning && (
          <motion.section ref={resultsRef} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="pb-[100px] relative overflow-hidden" id="audit-results">
            <div className="max-w-[900px] mx-auto px-6">
              {/* Score header */}
              <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-3xl p-8 sm:p-10 mb-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#FB5005]/[0.05] rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-[0.72rem] font-600 uppercase tracking-[0.14em] text-[#71717A] mb-6">Audit complete - {result.host}</p>
                  <ScoreRing score={result.overall_score} />
                  <p className="text-[1.05rem] text-[#A1A1AA] mt-6 mb-2">
                    {result.overall_score >= 80 ? 'Strong site. A few tweaks could make it even better.' :
                     result.overall_score >= 60 ? 'Solid foundation, but there are real opportunities here.' :
                     'This site is leaving money on the table. The list below is your roadmap.'}
                  </p>
                  <p className="text-[0.85rem] text-[#71717A]">{result.opportunity_count} opportunities found</p>
                </div>
              </div>

              {/* Category scores */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  ['On-Page & SEO', result.scores?.on_page],
                  ['Performance', result.scores?.performance],
                  ['DNS & Domain', result.scores?.dns_domain],
                  ['AI Design', result.scores?.design],
                ].filter(c => c[1] !== null && c[1] !== undefined).map(([label, score]) => (
                  <CategoryScore key={label} label={label} score={score} />
                ))}
              </div>

              {/* AI Design panel */}
              <div className="mb-8">
                <AiDesignPanel design={result.ai_design} screenshotUrl={result.screenshot_url} />
              </div>

              {/* Opportunities */}
              <div className="mb-10">
                <h3 className="font-[Satoshi] text-[1.4rem] font-700 mb-5">
                  Opportunities <span className="text-[#FB5005]">({result.opportunity_count})</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {result.opportunities.map((opp, i) => (
                    <OpportunityCard key={i} opp={opp} i={i} />
                  ))}
                </div>
              </div>

              {/* PDF download - email gated */}
              <div className="bg-[#0E0E0E] border border-[#FB5005]/20 rounded-3xl p-8 text-center mb-10 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[#FB5005]/[0.06] rounded-full blur-[70px] pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-[Satoshi] text-[1.3rem] font-700 mb-2">Download the full PDF report</h3>
                  <p className="text-[0.9rem] text-[#A1A1AA] mb-6">All findings, fixes and the AI design review in one branded document you can share with your team.</p>
                  {!emailCaptured ? (
                    <form onSubmit={captureEmailAndDownload} className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@business.com.au"
                        required
                        className="flex-1 px-4 py-3.5 rounded-xl bg-[#111111] border border-white/[0.1] text-[#FAFAFA] text-[0.9rem] placeholder:text-[#71717A] focus:outline-none focus:border-[#FB5005] transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={downloading}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FB5005] text-white text-[0.85rem] font-600 transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {downloading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Preparing your PDF...
                          </>
                        ) : 'Get PDF report'}
                      </button>
                    </form>
                  ) : emailCaptured ? (
                    <div className="flex items-center justify-center gap-2 text-[#22C55E]">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-[0.9rem] font-600">Sent! Check your inbox (and spam folder just in case).</span>
                    </div>
                  ) : null}
                  {error && !scanning && (
                    <p className="text-[0.8rem] text-red-400 mt-4">{error}</p>
                  )}
                </div>
              </div>

              {/* Contact / booking form */}
              <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-3xl p-8 sm:p-10">
                <div className="text-center mb-8">
                  <h3 className="font-[Satoshi] text-[1.4rem] font-700 mb-2">Want to go over these findings on a call?</h3>
                  <p className="text-[0.92rem] text-[#A1A1AA]">I will walk you through what matters, what to fix first, and what a refresh would look like. No pressure, no jargon.</p>
                </div>
                {!leadSent ? (
                  <form onSubmit={submitLead} className="grid sm:grid-cols-2 gap-4 max-w-[640px] mx-auto">
                    <input
                      type="text"
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="px-4 py-3.5 rounded-xl bg-[#111111] border border-white/[0.1] text-[#FAFAFA] text-[0.9rem] placeholder:text-[#71717A] focus:outline-none focus:border-[#FB5005] transition-colors"
                    />
                    <input
                      type="email"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      placeholder="Email"
                      required
                      className="px-4 py-3.5 rounded-xl bg-[#111111] border border-white/[0.1] text-[#FAFAFA] text-[0.9rem] placeholder:text-[#71717A] focus:outline-none focus:border-[#FB5005] transition-colors"
                    />
                    <textarea
                      value={lead.message}
                      onChange={(e) => setLead({ ...lead, message: e.target.value })}
                      placeholder="Anything specific you want to discuss? (optional)"
                      rows={3}
                      className="sm:col-span-2 px-4 py-3.5 rounded-xl bg-[#111111] border border-white/[0.1] text-[#FAFAFA] text-[0.9rem] placeholder:text-[#71717A] focus:outline-none focus:border-[#FB5005] transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      disabled={leadSending}
                      className="sm:col-span-2 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#FB5005] text-white text-[0.9rem] font-600 transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)] disabled:opacity-50"
                    >
                      {leadSending ? 'Sending...' : 'Book a call to go over my audit'}
                    </button>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h4 className="font-[Satoshi] text-[1.1rem] font-700 mb-2">Message sent</h4>
                    <p className="text-[0.88rem] text-[#A1A1AA] mb-5">I will get back to you within one business day.</p>
                    <a href="https://cal.com/stellio/intro" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[0.85rem] font-600 text-[#FB5005] hover:text-[#E55A1F] transition-colors">
                      Or grab a time right now
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* FAQ strip */}
      <section className="pb-[120px]">
        <div className="max-w-[700px] mx-auto px-6">
          <AnimatedSection>
            <h3 className="font-[Satoshi] text-[1.3rem] font-700 mb-6 text-center">Common questions</h3>
            {[
              ['Is this really free?', 'Yes. Paste your URL, see the full breakdown. The only thing behind an email is the PDF version of the report.'],
              ['What does the AI design audit actually check?', 'A vision model reviews a real screenshot of your homepage for visual hierarchy, colour and contrast, typography, spacing, CTA visibility, trust signals and whether the design feels current or dated.'],
              ['Can you audit any website?', 'Any public website. If your site is behind a login or blocks bots, some checks may come back incomplete.'],
              ['What happens to my URL and email?', 'Your URL is scanned once in real time. Your email is only used to send the report and is never shared. No spam.'],
            ].map(([q, a]) => (
              <details key={q} className="group bg-[#0E0E0E] border border-white/[0.06] rounded-2xl mb-3 px-6 py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none text-[0.92rem] font-600 text-[#FAFAFA]">
                  {q}
                  <svg className="w-4 h-4 text-[#71717A] transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                </summary>
                <p className="text-[0.85rem] text-[#A1A1AA] leading-relaxed mt-3">{a}</p>
              </details>
            ))}
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
