import React, { useState } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <section className="pt-[140px] pb-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Contact</span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                Let's build something<br /><span className="gradient-text">remarkable.</span>
              </h1>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] max-w-[600px] mx-auto">
              Book a free 15-minute discovery call. No pressure, no pitch — just clarity on what's possible.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-[120px]">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FF6B2C] outline-none transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Email</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FF6B2C] outline-none transition-colors" placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Company</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FF6B2C] outline-none transition-colors" placeholder="Company name (optional)" />
                </div>
                <div>
                  <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Service</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-[#A1A1AA] text-[0.92rem] focus:border-[#FF6B2C] outline-none transition-colors appearance-none">
                    <option>What's this about?</option>
                    <option>Brand System</option>
                    <option>Smart Website</option>
                    <option>AI Integration</option>
                    <option>Business OS</option>
                    <option>Managed Stack</option>
                    <option>AI Audit</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Message</label>
                  <textarea rows="5" required className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FF6B2C] outline-none transition-colors resize-y" placeholder="Tell me about your project..."></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#FF6B2C] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all hover:shadow-[0_0_20px_rgba(255,107,44,0.2)]"
                >
                  {submitted ? 'Message sent!' : 'Send Message'}
                </button>
              </form>
            </AnimatedSection>

            {/* Contact info */}
            <AnimatedSection delay={0.15} className="lg:col-span-2">
              <div className="space-y-4">
                {[
                  { label: 'Email', value: 'hello@stellio.com.au', href: 'mailto:hello@stellio.com.au' },
                  { label: 'Phone', value: '0421 675 940', href: 'tel:0421675940' },
                  { label: 'Location', value: 'Brisbane, Australia', href: null },
                ].map((item) => (
                  <div key={item.label} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#FF6B2C]/[0.08] border border-[#FF6B2C]/[0.15] flex items-center justify-center shrink-0">
                      <svg className="w-[18px] h-[18px] text-[#FF6B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {item.label === 'Email' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>}
                        {item.label === 'Phone' && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></>}
                        {item.label === 'Location' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[0.82rem] font-600 text-[#FAFAFA] mb-0.5">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-[0.85rem] text-[#A1A1AA] hover:text-[#FF6B2C] transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-[0.85rem] text-[#A1A1AA]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-6 mt-6">
                  <p className="text-[0.88rem] text-[#A1A1AA] mb-4 leading-relaxed">
                    Prefer a call? Book directly in my calendar and we'll chat within 24 hours.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[0.85rem] font-600 text-[#FF6B2C] hover:text-[#E55A1F] transition-colors"
                  >
                    Book a Call
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
