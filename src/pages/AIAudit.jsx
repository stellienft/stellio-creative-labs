import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { sendNotificationEmail } from '../lib/email'
import AnimatedSection from '../components/AnimatedSection'
import { WebPageSchema, BreadcrumbSchema } from '../components/JsonLd'
import TextReveal from '../components/TextReveal'
import { promptCategories, skillsList, testimonials, demoSteps } from '../data/prompts'

function SkillBadge({ name }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-500 text-[#FB5005] bg-[#FB5005]/[0.08] px-2.5 py-1 rounded-md border border-[#FB5005]/[0.12]">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {name}
    </span>
  )
}

function TelegramBubble({ type, text, delay = 0 }) {
  const isUser = type === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl text-[0.88rem] leading-relaxed ${
          isUser
            ? 'bg-[#FB5005] text-white rounded-br-md'
            : 'bg-[#1A1A1A] text-[#A1A1AA] border border-white/[0.06] rounded-bl-md'
        }`}
      >
        {isUser ? (
          text
        ) : (
          <>
            <span className="text-[#FB5005] font-600 text-[0.75rem] uppercase tracking-wider block mb-1.5">Raven</span>
            {text}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default function AIAudit() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [showAllPrompts, setShowAllPrompts] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    // Save to submissions
    supabase.from('submissions').insert({
      name: 'AI Audit Lead',
      email: email,
      company: null,
      service: 'AI Audit',
      message: 'Downloaded the AI Prompt Playbook',
      status: 'new',
    }).then(() => {}).catch(() => {})

    // Send email notification
    sendNotificationEmail({
      to: 'hello@stellio.com.au',
      subject: `AI Audit lead: ${email}`,
      htmlBody: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0A0A0A;border-radius:16px;overflow:hidden;">
        <div style="background:#FB5005;padding:24px 32px;"><h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">AI Audit Lead</h1></div>
        <div style="padding:32px;color:#FAFAFA;">
          <p style="font-size:15px;">Someone just entered their email on the AI Audit page:</p>
          <p style="font-size:18px;"><a href="mailto:${email}" style="color:#FB5005;text-decoration:none;">${email}</a></p>
          <p style="color:#71717A;font-size:13px;margin-top:24px;">They downloaded the Raven Prompt Playbook.</p>
        </div>
        <div style="padding:16px 32px;background:#0E0E0E;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:12px;color:#71717A;">View in <a href="${window.location.origin}/admin" style="color:#FB5005;text-decoration:none;">Admin Panel</a></p>
        </div></div>`,
    }).catch(() => {})

    setSubmitted(true)
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <WebPageSchema
        name="Free AI Audit - Stellio Creative Labs"
        description="Get a free AI audit for your business. Discover how AI automation can save time, cut costs, and grow your startup."
        url="https://stellio.com.au/ai-audit"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://stellio.com.au' },
        { name: 'AI Audit', url: 'https://stellio.com.au/ai-audit' },
      ]} />
      {/* ========== HERO ========== */}
      <section className="relative min-h-[90vh] flex items-center pt-[80px] pb-[60px] overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#FB5005]/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#FB5005]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <AnimatedSection>
                <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-5">
                  Free Resource
                </span>
              </AnimatedSection>

              <TextReveal>
                <h1 className="font-[Satoshi] text-[clamp(2.2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                  You are using 10% of your AI's power.{" "}
                  <span className="gradient-text">Here is how to find the rest.</span>
                </h1>
              </TextReveal>

              <AnimatedSection delay={0.15}>
                <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed mb-8 max-w-[480px]">
                  The Raven Prompt Playbook gives you 15 battle-tested prompts that turn your AI agent from a chatbot into an operations engine. Built for Telegram and Discord deployment.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.25}>
                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    onClick={scrollToForm}
                    className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)]"
                  >
                    <span className="relative z-10">Get Free Prompt Playbook</span>
                    <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <a
                    href="https://arclink.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] text-[#FAFAFA] text-[0.88rem] font-600 hover:border-[#FB5005] hover:text-[#FB5005] transition-all"
                  >
                    See What ArcLink Does
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.35}>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {['MP', 'DL', 'PK'].map((init) => (
                      <div key={init} className="w-8 h-8 rounded-full bg-[#1A1A1A] border-2 border-[#0A0A0A] flex items-center justify-center text-[0.65rem] font-700 text-[#FB5005]">
                        {init}
                      </div>
                    ))}
                  </div>
                  <p className="text-[0.82rem] text-[#71717A]">
                    <span className="text-[#FAFAFA] font-600">1,200+</span> agency owners and founders already using these prompts
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right - Raven image */}
            <AnimatedSection delay={0.2} direction="left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FB5005]/20 to-transparent rounded-3xl blur-2xl" />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative bg-[#0E0E0E] border border-white/[0.06] rounded-3xl overflow-hidden"
                >
                  <img
                    src="https://arclink.online/raven-hero1.png"
                    alt="Raven ArcLink AI Operator"
                    className="w-full h-auto opacity-90"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent">
                    <p className="text-[0.78rem] text-[#71717A] mb-1">Powered by</p>
                    <p className="font-[Satoshi] text-[1rem] font-700 text-[#FAFAFA]">ArcLink Autonomous Agents</p>
                  </div>
                </motion.div>

                {/* Floating stat card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-4 -left-4 bg-[#111111] border border-white/[0.06] rounded-xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FB5005]/[0.1] border border-[#FB5005]/[0.15] flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FB5005" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <div>
                      <p className="text-[0.75rem] text-[#71717A]">Agents Online</p>
                      <p className="font-[Satoshi] text-[1.1rem] font-700 text-[#FAFAFA]">12,700+</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== THE HOOK ========== */}
      <section className="py-[100px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="text-center mb-16 max-w-[600px] mx-auto">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">The Problem</span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,4vw,2.4rem)] font-700 leading-[1.15]">
                Most businesses use AI like a smarter search bar.
              </h2>
            </TextReveal>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {/* Basic */}
            <AnimatedSection delay={0.1}>
              <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#71717A]" />
                  <span className="text-[0.75rem] font-600 text-[#71717A] uppercase tracking-wider">Basic AI Use</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/[0.04]">
                    <p className="text-[0.88rem] text-[#A1A1AA]">"Write me a social post"</p>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/[0.04]">
                    <p className="text-[0.88rem] text-[#A1A1AA]">"Summarise this article"</p>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/[0.04]">
                    <p className="text-[0.88rem] text-[#A1A1AA]">"Help me brainstorm ideas"</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <p className="text-[0.82rem] text-[#71717A]">Result: You still do all the work. AI just speeds up typing.</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Hermes/Raven */}
            <AnimatedSection delay={0.2}>
              <div className="bg-[#111111] border border-[#FB5005]/[0.15] rounded-2xl p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FB5005]/[0.03] rounded-full blur-3xl" />
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#FB5005]" />
                  <span className="text-[0.75rem] font-600 text-[#FB5005] uppercase tracking-wider">Agent Execution</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#FB5005]/[0.08]">
                    <p className="text-[0.88rem] text-[#FAFAFA]">"Scan my Notion draft, write 3 LinkedIn hooks, schedule them, track which gets best engagement"</p>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#FB5005]/[0.08]">
                    <p className="text-[0.88rem] text-[#FAFAFA]">"Monitor competitor pricing weekly and alert me on Telegram when anything changes"</p>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#FB5005]/[0.08]">
                    <p className="text-[0.88rem] text-[#FAFAFA]">"Pull project data, draft client updates, queue them for approval every Wednesday"</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <p className="text-[0.82rem] text-[#71717A]">Result: The agent executes end-to-end. You approve or iterate.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== MINI DEMO ========== */}
      <section className="py-[100px] bg-[#0E0E0E]">
        <div className="max-w-[700px] mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">See It In Action</span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,4vw,2.4rem)] font-700 leading-[1.15] mb-4">
                This is not a chatbot. It is an executor.
              </h2>
            </TextReveal>
            <p className="text-[0.95rem] text-[#71717A]">
              Raven does not suggest. It creates cron jobs, connects APIs, and reports back on Telegram.
            </p>
          </AnimatedSection>

          <div className="bg-[#111111] border border-white/[0.06] rounded-3xl p-6 sm:p-8">
            {/* Chat header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.06]">
              <div className="w-10 h-10 rounded-full bg-[#FB5005]/[0.1] border border-[#FB5005]/[0.15] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FB5005" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div>
                <p className="text-[0.88rem] font-600 text-[#FAFAFA]">Raven</p>
                <p className="text-[0.72rem] text-[#71717A]">ArcLink AI Operator</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[0.72rem] text-[#71717A]">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-1">
              {demoSteps.map((step, i) => (
                <div key={i}>
                  <TelegramBubble type="user" text={step.user} delay={i * 0.3} />
                  <TelegramBubble type="raven" text={step.raven} delay={i * 0.3 + 0.15} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== LEAD CAPTURE ========== */}
      <section ref={formRef} className="py-[120px]">
        <div className="max-w-[600px] mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Get The Playbook</span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,4vw,2.2rem)] font-700 leading-[1.15] mb-4">
                Enter your email. Get the full playbook instantly.
              </h2>
            </TextReveal>
            <p className="text-[0.95rem] text-[#71717A]">
              15 prompts, 5 categories, exact copy-paste text. No fluff.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-[#111111] border border-white/[0.06] rounded-2xl p-8">
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-[0.78rem] font-600 text-[#A1A1AA] mb-2 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-[0.9rem] text-[#FAFAFA] placeholder-[#71717A] focus:border-[#FB5005] focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.78rem] font-600 text-[#A1A1AA] mb-2 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-[0.9rem] text-[#FAFAFA] placeholder-[#71717A] focus:border-[#FB5005] focus:outline-none transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.78rem] font-600 text-[#A1A1AA] mb-2 uppercase tracking-wider">Role</label>
                    <select className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-[0.9rem] text-[#FAFAFA] focus:border-[#FB5005] focus:outline-none transition-colors appearance-none">
                      <option value="">Select your role</option>
                      <option value="agency">Agency Owner</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="inhouse">In-house Marketer</option>
                      <option value="developer">Developer</option>
                      <option value="founder">Founder</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[0.78rem] font-600 text-[#A1A1AA] mb-2 uppercase tracking-wider">Current AI Tool</label>
                    <div className="flex flex-wrap gap-2">
                      {['ChatGPT', 'Claude', 'Gemini', 'Nothing yet'].map((tool) => (
                        <label key={tool} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A0A0A] border border-white/[0.06] cursor-pointer hover:border-white/[0.12] transition-colors">
                          <input type="checkbox" className="w-4 h-4 rounded border-white/[0.12] bg-[#0A0A0A] text-[#FB5005] focus:ring-[#FB5005]" />
                          <span className="text-[0.82rem] text-[#A1A1AA]">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FB5005] text-white text-[0.9rem] font-600 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)]"
                >
                  <span className="relative z-10">Send Me The Playbook</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <p className="text-center text-[0.75rem] text-[#71717A] mt-4">
                  No spam. Unsubscribe anytime. Your email stays private.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111111] border border-[#FB5005]/[0.15] rounded-2xl p-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#FB5005]/[0.1] border border-[#FB5005]/[0.15] flex items-center justify-center mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FB5005" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3 className="font-[Satoshi] text-[1.3rem] font-700 mb-3">Playbook is on its way.</h3>
                <p className="text-[0.9rem] text-[#A1A1AA] mb-6">
                  Check your inbox. If it does not arrive in 2 minutes, check spam.
                </p>

                {/* Upgrade CTA */}
                <div className="pt-6 border-t border-white/[0.06]">
                  <p className="text-[0.85rem] text-[#71717A] mb-4">
                    Want these prompts to actually RUN themselves?
                  </p>
                  <a
                    href="https://arclink.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A0A0A] border border-[#FB5005]/[0.2] text-[#FB5005] text-[0.85rem] font-600 hover:bg-[#FB5005]/[0.08] transition-all"
                  >
                    Deploy Your Own Agent on ArcLink
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ========== SKILLS GRID ========== */}
      <section className="py-[100px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="text-center mb-12 max-w-[600px] mx-auto">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">What Agents Connect To</span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,4vw,2.4rem)] font-700 leading-[1.15]">
                Your agent talks to the tools you already use.
              </h2>
            </TextReveal>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {skillsList.map((skill, i) => (
              <AnimatedSection key={skill.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 text-center hover:border-white/[0.1] transition-colors duration-300 h-full"
                >
                  <p className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA] mb-1.5">{skill.name}</p>
                  <p className="text-[0.75rem] text-[#71717A] leading-relaxed">{skill.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SOCIAL PROOF ========== */}
      <section className="py-[100px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="text-center mb-12 max-w-[600px] mx-auto">
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">What Users Say</span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,4vw,2.4rem)] font-700 leading-[1.15]">
                Real agents. Real automation. Real time saved.
              </h2>
            </TextReveal>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-[#111111] border border-white/[0.06] rounded-2xl p-7 h-full flex flex-col hover:border-white/[0.1] transition-colors duration-300"
                >
                  {/* Platform badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] border border-white/[0.06] flex items-center justify-center">
                      {t.platform === 'Telegram' ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.03 6.203a2.24 2.24 0 0 0 .123 4.255l4.152 1.327a1.5 1.5 0 0 0 1.747-.64l2.581-4.54a.28.28 0 0 1 .413-.048.28.28 0 0 1 .048.413l-2.54 4.52a1.5 1.5 0 0 0 .64 1.747l3.098 1.137a2.24 2.24 0 0 0 2.555-.387l5.704-5.38a2.24 2.24 0 0 0-1.07-3.82z"/></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                      )}
                    </div>
                    <span className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-wider">{t.platform}</span>
                  </div>

                  <p className="text-[0.92rem] text-[#A1A1AA] leading-relaxed mb-6 flex-1">"{t.text}"</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                    <div className="w-9 h-9 rounded-full bg-[#0A0A0A] border border-white/[0.08] flex items-center justify-center text-[0.72rem] font-700 text-[#FB5005]">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-[0.88rem] font-600 text-[#FAFAFA]">{t.name}</h4>
                      <span className="text-[0.78rem] text-[#71717A]">{t.role}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-[100px] pb-[140px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <div className="relative bg-[#0E0E0E] border border-white/[0.06] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FB5005]/[0.03] rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10 max-w-[600px] mx-auto">
                <div className="w-16 h-16 rounded-full bg-[#FB5005]/[0.08] border border-[#FB5005]/[0.15] flex items-center justify-center mx-auto mb-6">
                  <img
                    src="https://arclink.online/Arclink_v3--orange_symbol_white_text%20copy.svg"
                    alt="ArcLink"
                    className="w-10 h-auto"
                  />
                </div>

                <TextReveal>
                  <h2 className="font-[Satoshi] text-[clamp(1.8rem,4vw,2.6rem)] font-700 mb-4">
                    Stop prompting.{" "}
                    <span className="gradient-text">Start delegating.</span>
                  </h2>
                </TextReveal>

                <p className="text-[1.05rem] text-[#A1A1AA] mb-10">
                  ArcLink deploys agents that run while you sleep. Research, reporting, follow-ups, data movement. All on autopilot.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://arclink.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(251,80,5,0.25)]"
                  >
                    <span className="relative z-10">Get ArcLink</span>
                    <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                  </a>
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] text-[#FAFAFA] text-[0.88rem] font-600 hover:border-[#FB5005] hover:text-[#FB5005] transition-all"
                  >
                    Get Free Prompt Playbook
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
