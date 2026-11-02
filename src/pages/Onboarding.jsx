import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { sendNotificationEmail } from '../lib/email'
import { ONBOARDING_SECTIONS, domainIdeas, answersAsHtml } from '../data/onboardingSchema'

const LS_DRAFT = 'stellio_onboarding_draft_v2'
const LS_CID = 'stellio_onboarding_cid'
const LS_CREATED = 'stellio_onboarding_created'

function getClientId() {
  let cid = localStorage.getItem(LS_CID)
  if (!cid) {
    cid = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`)
    localStorage.setItem(LS_CID, cid)
  }
  return cid
}

function isAnswered(v) {
  if (v === undefined || v === null || v === '') return false
  if (Array.isArray(v)) return v.length > 0
  return true
}

export default function Onboarding() {
  const [answers, setAnswers] = useState({})
  const [status, setStatus] = useState('draft')
  const [savedAt, setSavedAt] = useState(null)
  const [saving, setSaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [theme, setTheme] = useState('dark')
  const saveTimer = useRef(null)
  const firstLoad = useRef(true)

  // noindex + title
  useEffect(() => {
    document.title = 'Client Onboarding - Stellio Creative Labs'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => { document.head.removeChild(meta) }
  }, [])

  // Load draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_DRAFT)
      if (raw) {
        const d = JSON.parse(raw)
        if (d.answers) setAnswers(d.answers)
        if (d.status) setStatus(d.status)
        if (d.status === 'submitted') setSubmitted(true)
      }
    } catch (e) { /* fresh start */ }
    firstLoad.current = false
  }, [])

  const doPersist = useCallback(async (next, nextStatus) => {
    setSaving(true)
    localStorage.setItem(LS_DRAFT, JSON.stringify({ answers: next, status: nextStatus, updatedAt: Date.now() }))
    // Save via security-definer RPC - anon UPDATEs are silently dropped by RLS,
    // and PostgREST upserts need SELECT, so direct table writes can't work
    const { error } = await supabase.rpc('save_onboarding', {
      p_client_id: getClientId(),
      p_answers: next,
      p_status: nextStatus,
      p_contact_name: next.contact_name || null,
      p_business: next.new_name_known || next.current_name || null,
    })
    if (error) console.error('Autosave failed:', error)
    setSaving(false)
    setSavedAt(new Date())
  }, [])

  // Serialize saves - an in-flight autosave must finish before a submit save runs
  const saveQueue = useRef(Promise.resolve())
  const persist = useCallback((next, nextStatus) => {
    saveQueue.current = saveQueue.current.then(() => doPersist(next, nextStatus))
    return saveQueue.current
  }, [doPersist])

  // Autosave ~2.5s after change (skip when nothing answered yet - avoids empty rows)
  useEffect(() => {
    if (firstLoad.current) return
    if (!Object.values(answers).some(isAnswered)) return
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => persist(answers, status), 2500)
    return () => clearTimeout(saveTimer.current)
  }, [answers, status, persist])

  const set = (id, value) => setAnswers(a => ({ ...a, [id]: value }))
  const toggleMulti = (id, opt) => setAnswers(a => {
    const cur = a[id] || []
    return { ...a, [id]: cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt] }
  })
  const toggleDomain = (d) => toggleMulti('domain_picks', d)

  const domains = useMemo(() => domainIdeas(answers.new_name_known, answers.name_shortlist), [answers.new_name_known, answers.name_shortlist])

  // Progress
  const sectionProgress = (s) => {
    const answered = s.fields.filter(f => isAnswered(answers[f.id])).length
    return { answered, total: s.fields.length }
  }
  const overall = useMemo(() => {
    let a = 0, t = 0
    ONBOARDING_SECTIONS.forEach(s => { const p = sectionProgress(s); a += p.answered; t += p.total })
    return t ? Math.round((a / t) * 100) : 0
  }, [answers])

  const scrollTo = (id) => {
    document.getElementById(`onb-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async () => {
    clearTimeout(saveTimer.current)
    setSubmitError('')
    const missing = []
    if (!answers.contact_name?.trim()) missing.push('your full name')
    if (!answers.contact_email?.trim()) missing.push('email')
    if (!answers.current_name?.trim()) missing.push('current business name')
    if (missing.length) {
      setSubmitError(`Required before submitting: ${missing.join(', ')}.`)
      scrollTo('you')
      return
    }
    setStatus('submitted')
    await persist(answers, 'submitted')
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const biz = answers.new_name_known || answers.current_name
    const esc = (s) => String(s).replace(/</g, '&lt;')
    sendNotificationEmail({
      to: 'hello@stellio.com.au',
      subject: `Onboarding ${status === 'submitted' ? 'updated' : 'submitted'}: ${answers.contact_name} (${biz})`,
      htmlBody: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
          <div style="background:#FB5005;padding:20px 28px;">
            <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:700;font-family:Arial,sans-serif;">Onboarding ${status === 'submitted' ? 'Updated' : 'Submitted'}: ${esc(biz)}</h1>
          </div>
          <div style="padding:24px 28px;">
            <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">
              <tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#666666;width:42%;">Name</td><td style="padding:6px 0;font-size:14px;color:#111111;font-weight:600;">${esc(answers.contact_name)}</td></tr>
              <tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#666666;">Email</td><td style="padding:6px 0;font-size:14px;"><a href="mailto:${esc(answers.contact_email)}" style="color:#FB5005;text-decoration:none;">${esc(answers.contact_email)}</a></td></tr>
              <tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#666666;">Business</td><td style="padding:6px 0;font-size:14px;color:#111111;">${esc(biz)}</td></tr>
            </table>
            ${answersAsHtml(answers)}
          </div>
          <div style="padding:14px 28px;background:#fafafa;border-top:1px solid #eeeeee;">
            <p style="margin:0;font-size:12px;color:#888888;font-family:Arial,sans-serif;">View all responses in the <a href="${window.location.origin}/admin" style="color:#FB5005;text-decoration:none;">Admin Panel</a> (Onboarding tab)</p>
          </div>
        </div>`,
    }).catch(err => console.error('Email notification failed:', err))
  }

  const light = theme === 'light'

  // Theme tokens
  const t = {
    page: light ? 'bg-[#F7F6F4] text-[#171717]' : 'bg-[#0A0A0A] text-[#FAFAFA]',
    card: light ? 'bg-white border-black/[0.08]' : 'bg-[#111111] border-white/[0.06]',
    input: light
      ? 'bg-[#FAFAF8] border-black/[0.12] text-[#171717] placeholder-[#9CA3AF]'
      : 'bg-[#0A0A0A] border-white/[0.08] text-[#FAFAFA] placeholder-[#52525B]',
    label: light ? 'text-[#52525B]' : 'text-[#71717A]',
    body: light ? 'text-[#3F3F46]' : 'text-[#A1A1AA]',
    pill: light
      ? 'bg-white text-[#3F3F46] border-black/[0.12] hover:border-black/[0.25]'
      : 'bg-[#0A0A0A] text-[#A1A1AA] border-white/[0.08] hover:border-white/[0.15]',
    divider: light ? 'border-black/[0.08]' : 'border-white/[0.06]',
    sidebar: light ? 'bg-white border-black/[0.08]' : 'bg-[#0E0E0E] border-white/[0.06]',
  }

  const inputCls = `w-full px-4 py-3 rounded-xl border text-[0.92rem] focus:border-[#FB5005] outline-none transition-colors ${t.input}`

  const renderField = (f) => {
    const v = answers[f.id]
    switch (f.type) {
      case 'textarea':
        return <textarea rows={3} value={v || ''} onChange={e => set(f.id, e.target.value)} className={`${inputCls} resize-y`} />
      case 'single':
        return (
          <div className="flex flex-wrap gap-2">
            {f.options.map(opt => (
              <button key={opt} type="button" onClick={() => set(f.id, opt)}
                className={`px-3.5 py-2 rounded-lg text-[0.82rem] font-500 border transition-all duration-200 ${v === opt ? 'bg-[#FB5005] text-white border-[#FB5005]' : t.pill}`}>
                {opt}
              </button>
            ))}
          </div>
        )
      case 'multi':
        return (
          <div className="flex flex-wrap gap-2">
            {f.options.map(opt => {
              const sel = (v || []).includes(opt)
              return (
                <button key={opt} type="button" onClick={() => toggleMulti(f.id, opt)}
                  className={`px-3.5 py-2 rounded-lg text-[0.82rem] font-500 border transition-all duration-200 ${sel ? 'bg-[#FB5005] text-white border-[#FB5005]' : t.pill}`}>
                  {opt}
                </button>
              )
            })}
          </div>
        )
      case 'scale':
        return (
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[0.75rem] font-600 w-24 text-right ${t.label}`}>{f.from}</span>
              <div className="flex gap-2 flex-1 justify-center">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} type="button" onClick={() => set(f.id, n)}
                    className={`w-10 h-10 rounded-full border text-[0.85rem] font-600 transition-all duration-200 ${v === n ? 'bg-[#FB5005] text-white border-[#FB5005] scale-110' : t.pill}`}>
                    {n}
                  </button>
                ))}
              </div>
              <span className={`text-[0.75rem] font-600 w-24 ${t.label}`}>{f.to}</span>
            </div>
          </div>
        )
      case 'domains':
        return (
          <div>
            {domains.length === 0 ? (
              <p className={`text-[0.85rem] ${t.body}`}>Add a new business name above (or a shortlist, one per line) and domain ideas will appear here.</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {domains.map(d => {
                    const sel = (v || []).includes(d)
                    return (
                      <button key={d} type="button" onClick={() => toggleDomain(d)}
                        className={`px-3 py-1.5 rounded-lg text-[0.8rem] font-500 border transition-all duration-200 ${sel ? 'bg-[#FB5005] text-white border-[#FB5005]' : t.pill}`}>
                        {sel && <span className="mr-1">✓</span>}{d}
                      </button>
                    )
                  })}
                </div>
                <p className={`text-[0.78rem] mt-3 ${t.label}`}>
                  Tick any you like. This is for preferences only - availability is not checked here. Stellio checks and registers the final domain.
                </p>
              </>
            )}
            <p className={`text-[0.78rem] mt-2 ${t.label}`}>
              Note: .com.au and .au domains need an ABN or ACN and should match or closely relate to the business name.
            </p>
          </div>
        )
      default:
        return <input type={f.type} value={v || ''} onChange={e => set(f.id, e.target.value)} className={inputCls} />
    }
  }

  // Thank-you view
  if (submitted) {
    return (
      <div className={`min-h-screen pt-[140px] pb-20 px-6 ${t.page}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
        <div className="max-w-[600px] mx-auto text-center">
          <div className={`border rounded-2xl p-12 ${t.card}`}>
            <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="text-[1.6rem] font-700 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Thank you!</h2>
            <p className={`text-[1rem] leading-relaxed mb-2 ${t.body}`}>
              Your questionnaire has been submitted. Stellio will review your answers and be in touch about the discovery workshop.
            </p>
            <p className={`text-[0.88rem] leading-relaxed mb-6 ${t.label}`}>
              Your answers are saved. You can come back and edit them any time, then resubmit.
            </p>
            <button onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all">
              Review or edit my answers
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${t.page}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Header */}
      <section className="pt-[130px] pb-10 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="max-w-[640px]">
              <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Client Onboarding</span>
              <h1 className="text-[clamp(1.9rem,4vw,2.8rem)] font-700 leading-[1.1] mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Let's get{' '}
                <em className="text-[#FB5005]" style={{ fontFamily: "'Playfair Display', serif" }}>started.</em>
              </h1>
              <p className={`text-[1rem] leading-relaxed ${t.body}`}>
                This questionnaire covers your brand, website and setup. Your answers save automatically as you go, so you can leave and come back any time. About 15 minutes.
              </p>
              <p className={`text-[0.82rem] mt-3 ${t.label}`}>
                Please do not enter any passwords or sensitive account details.
              </p>
            </div>
            <button onClick={() => setTheme(light ? 'dark' : 'light')}
              className={`px-4 py-2 rounded-lg border text-[0.78rem] font-600 transition-all ${t.pill}`}>
              {light ? '☾ Dark' : '☀ Light'}
            </button>
          </div>
        </div>
      </section>

      {/* Mobile progress bar */}
      <div className={`lg:hidden sticky top-[64px] z-30 px-6 py-3 border-y ${light ? 'bg-[#F7F6F4]/95 border-black/[0.08]' : 'bg-[#0A0A0A]/95 border-white/[0.06]'} backdrop-blur`}>
        <div className="flex items-center gap-3">
          <div className={`h-1.5 flex-1 rounded-full overflow-hidden ${light ? 'bg-black/[0.08]' : 'bg-white/[0.06]'}`}>
            <div className="h-full bg-[#FB5005] rounded-full transition-all duration-500" style={{ width: `${overall}%` }} />
          </div>
          <span className="text-[0.75rem] font-600 text-[#FB5005]">{overall}%</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pb-24 flex gap-8 items-start">
        {/* Sticky section index (desktop) */}
        <aside className="hidden lg:block w-[240px] shrink-0 sticky top-[110px]">
          <div className={`border rounded-2xl p-5 ${t.sidebar}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[0.7rem] font-600 uppercase tracking-[0.1em] ${t.label}`}>Progress</span>
              <span className="text-[0.8rem] font-700 text-[#FB5005]">{overall}%</span>
            </div>
            <div className={`h-1.5 rounded-full overflow-hidden mb-5 ${light ? 'bg-black/[0.08]' : 'bg-white/[0.06]'}`}>
              <div className="h-full bg-[#FB5005] rounded-full transition-all duration-500" style={{ width: `${overall}%` }} />
            </div>
            <nav className="space-y-1">
              {ONBOARDING_SECTIONS.map(s => {
                const p = sectionProgress(s)
                const done = p.answered === p.total
                return (
                  <button key={s.id} type="button" onClick={() => scrollTo(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[0.8rem] transition-colors flex items-center gap-2.5 ${light ? 'hover:bg-black/[0.04]' : 'hover:bg-white/[0.04]'}`}>
                    <em className="text-[0.72rem] not-italic text-[#FB5005] w-5 shrink-0" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{s.num}</em>
                    <span className={`flex-1 leading-snug ${done ? (light ? 'text-[#171717]' : 'text-[#FAFAFA]') : t.body}`}>{s.title}</span>
                    <span className={`text-[0.68rem] font-600 shrink-0 ${done ? 'text-[#22C55E]' : t.label}`}>
                      {done ? '✓' : `${p.answered}/${p.total}`}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Sections */}
        <main className="flex-1 min-w-0 space-y-6">
          {ONBOARDING_SECTIONS.map(s => (
            <section key={s.id} id={`onb-${s.id}`} className={`border rounded-2xl p-6 md:p-8 scroll-mt-[110px] ${t.card}`}>
              <div className="flex items-baseline gap-4 mb-2">
                <em className="text-[1.6rem] leading-none text-[#FB5005]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>{s.num}</em>
                <h2 className="text-[1.25rem] font-700" style={{ fontFamily: "'Outfit', sans-serif" }}>{s.title}</h2>
              </div>
              <p className={`text-[0.88rem] mb-7 ${t.body}`}>{s.blurb}</p>
              <div className="space-y-6">
                {s.fields.map(f => (
                  <div key={f.id}>
                    <label className={`block text-[0.85rem] font-600 mb-1.5 ${light ? 'text-[#171717]' : 'text-[#FAFAFA]'}`}>
                      {f.label}{f.required && <span className="text-[#FB5005] ml-1">*</span>}
                    </label>
                    {f.note && <p className={`text-[0.76rem] mb-2 ${t.label}`}>{f.note}</p>}
                    {renderField(f)}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Save / submit bar */}
          <div className={`border rounded-2xl p-6 md:p-8 ${t.card}`}>
            {submitError && <p className="text-[0.85rem] text-red-400 mb-4">{submitError}</p>}
            <div className="flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => persist(answers, status)} disabled={saving}
                className={`px-6 py-3 rounded-xl border text-[0.88rem] font-600 transition-all disabled:opacity-50 ${t.pill}`}>
                {saving ? 'Saving...' : 'Save progress'}
              </button>
              <button type="button" onClick={handleSubmit}
                className="px-8 py-3 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all hover:shadow-[0_0_20px_rgba(251,80,5,0.2)]">
                {status === 'submitted' ? 'Resubmit questionnaire' : 'Submit questionnaire'}
              </button>
              {savedAt && (
                <span className={`text-[0.78rem] ${t.label}`}>
                  Saved {savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
            <p className={`text-[0.78rem] mt-4 ${t.label}`}>
              Required to submit: your full name, email and current business name. Everything else can be filled in later.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
