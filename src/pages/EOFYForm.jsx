import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { sendNotificationEmail } from '../lib/email'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'

const packages = [
  {
    id: 'logo-refresh',
    name: 'Logo Refresh Package',
    price: 'From $499 + GST',
    desc: 'Modernise your existing logo without starting from scratch.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    id: 'brand-starter-refresh',
    name: 'Brand Starter Refresh',
    price: 'From $999 + GST',
    desc: 'Logo refresh + business cards + email signature + brand guide.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    popular: true,
  },
  {
    id: 'print-refresh',
    name: 'Print Refresh Bundle',
    price: 'From $200 + GST',
    desc: 'Business cards, flyers, brochures, banners and more.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    id: 'complete-refresh',
    name: 'Complete Business Refresh',
    price: 'From $1,499 + GST',
    desc: 'Everything you need to start the new financial year looking sharp and professional.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

const whyNowItems = [
  { icon: 'check', text: 'Claim before June 30' },
  { icon: 'check', text: 'Refresh your brand for FY27' },
  { icon: 'check', text: 'Present your business with confidence' },
  { icon: 'check', text: 'Save with EOFY pricing' },
]

const steps = [
  {
    title: 'Your Details',
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: '04XX XXX XXX', required: false },
      { name: 'company', label: 'Business Name', type: 'text', placeholder: 'Your business name', required: true },
      { name: 'industry', label: 'Industry', type: 'select', options: ['Trades & Construction', 'Professional Services', 'Retail & E-commerce', 'Health & Wellness', 'Hospitality & Food', 'Real Estate', 'Creative & Media', 'Technology', 'Education', 'Other'], required: true },
      { name: 'website', label: 'Current Website (if any)', type: 'url', placeholder: 'https://...', required: false },
    ]
  },
  {
    title: 'Your Brand',
    fields: [
      { name: 'whatNeedsRefresh', label: 'What needs refreshing?', type: 'multi', options: ['Logo', 'Business Cards', 'Email Signature', 'Brand Guide', 'Flyers & Brochures', 'Banners & Signage', 'Social Media Graphics', 'Website', 'Letterhead', 'Other'], required: true },
      { name: 'currentIssues', label: 'What issues are you facing with your current branding?', type: 'textarea', placeholder: 'e.g. Looks dated, no longer reflects our services, inconsistent across materials...', required: false },
      { name: 'brandGoals', label: 'What do you want your brand to communicate?', type: 'textarea', placeholder: 'e.g. Professionalism, innovation, trustworthiness, approachability...', required: false },
    ]
  },
  {
    title: 'Choose Your Package',
    description: 'Select the EOFY package that suits your needs. Not sure? Choose "Not sure - recommend one" and I will review your brand for free.',
    fields: [
      { name: 'selectedPackage', label: 'Which package interests you?', type: 'package-select', required: true },
    ]
  },
  {
    title: 'Final Details',
    fields: [
      { name: 'timeline', label: 'When do you need this by?', type: 'select', options: ['Before June 30 (urgent)', 'Within 2 weeks', 'Within 1 month', 'July (start of FY27)', 'No rush'], required: true },
      { name: 'logoFile', label: 'Upload your current logo', type: 'file', accept: 'image/*,.ai,.eps,.svg,.pdf', required: false, help: 'PNG, JPG, SVG, AI, EPS or PDF. Max 10MB.' },
      { name: 'howHeard', label: 'How did you hear about this offer?', type: 'select', options: ['Social Media', 'Google Search', 'Referral', 'Email', 'Saw it on your website', 'Other'], required: false },
      { name: 'additionalInfo', label: 'Anything else you want me to know?', type: 'textarea', placeholder: 'Extra details, questions, specific requirements...', required: false },
    ]
  },
]

export default function EOFYForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [form, setForm] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleMulti = (name, option) => {
    setForm(f => {
      const current = f[name] || []
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option]
      return { ...f, [name]: updated }
    })
  }

  const handleFileUpload = async (file) => {
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10MB.')
      return
    }
    setUploading(true)
    setError('')
    const ext = file.name.split('.').pop()
    const filePath = `eofy-uploads/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`
    const { error: uploadError } = await supabase.storage.from('site-assets').upload(filePath, file, { upsert: true })
    if (uploadError) {
      setError('Upload failed. Please try again.')
      setUploading(false)
      return
    }
    const { data: urlData } = supabase.storage.from('site-assets').getPublicUrl(filePath)
    setForm(f => ({ ...f, logoFileUrl: urlData.publicUrl, logoFileName: file.name }))
    setUploading(false)
  }

  const buildMessageBody = () => {
    let msg = 'EOFY BRAND REFRESH OFFER - ONBOARDING FORM\n\n'
    steps.forEach(step => {
      msg += `--- ${step.title.toUpperCase()} ---\n`
      step.fields.forEach(field => {
        const val = form[field.name]
        if (val) {
          if (field.name === 'selectedPackage') {
            const pkg = packages.find(p => p.id === val)
            msg += `Package: ${pkg ? pkg.name : val}\n`
          } else {
            msg += `${field.label}: ${Array.isArray(val) ? val.join(', ') : val}\n`
          }
        }
      })
      msg += '\n'
    })
    if (form.logoFileUrl) {
      msg += `--- LOGO UPLOAD ---\nFile: ${form.logoFileName}\nURL: ${form.logoFileUrl}\n\n`
    }
    return msg
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')

    const { error: supaError } = await supabase.from('submissions').insert({
      name: form.fullName || 'Unknown',
      email: form.email || '',
      company: form.company || null,
      service: 'EOFY Brand Refresh',
      message: buildMessageBody(),
      status: 'new',
    })

    setSending(false)

    if (supaError) {
      setError('Something went wrong. Please try again.')
      console.error(supaError)
      return
    }

    // Send email notification (non-blocking)
    sendNotificationEmail({
      to: 'hello@stellio.com.au',
      subject: `EOFY Lead: ${form.fullName} from ${form.company || 'No company'} - ${packages.find(p => p.id === form.selectedPackage)?.name || 'Package TBD'}`,
      htmlBody: `
        <div style="background:#0A0A0A;padding:0;margin:0;font-family:Inter,sans-serif;">
          <div style="background:#FB5005;padding:16px 24px;">
            <h1 style="margin:0;color:#fff;font-size:18px;font-weight:700;">EOFY Brand Refresh Lead</h1>
          </div>
          <div style="padding:24px;color:#FAFAFA;">
            <p style="margin:0 0 16px;font-size:15px;"><strong>${form.fullName}</strong> from <strong>${form.company || 'N/A'}</strong></p>
            <p style="margin:0 0 8px;font-size:13px;color:#A1A1AA;">Email: <a href="mailto:${form.email}" style="color:#FB5005;">${form.email}</a></p>
            ${form.phone ? `<p style="margin:0 0 8px;font-size:13px;color:#A1A1AA;">Phone: ${form.phone}</p>` : ''}
            <p style="margin:0 0 16px;font-size:13px;color:#A1A1AA;">Industry: ${form.industry || 'N/A'}</p>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:16px 0;" />
            <p style="margin:0 0 8px;font-size:14px;"><strong>Package:</strong> ${packages.find(p => p.id === form.selectedPackage)?.name || 'Not selected'}</p>
            <p style="margin:0 0 8px;font-size:14px;"><strong>Needs Refresh:</strong> ${Array.isArray(form.whatNeedsRefresh) ? form.whatNeedsRefresh.join(', ') : 'N/A'}</p>
            <p style="margin:0 0 8px;font-size:14px;"><strong>Timeline:</strong> ${form.timeline || 'N/A'}</p>
            ${form.currentIssues ? `<p style="margin:0 0 8px;font-size:14px;"><strong>Current Issues:</strong> ${form.currentIssues}</p>` : ''}
            ${form.additionalInfo ? `<p style="margin:0 0 8px;font-size:14px;"><strong>Notes:</strong> ${form.additionalInfo}</p>` : ''}
            ${form.logoFileUrl ? `<p style="margin:0 0 8px;font-size:14px;"><strong>Logo:</strong> <a href="${form.logoFileUrl}" style="color:#FB5005;">${form.logoFileName || 'View file'}</a></p>` : ''}
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:16px 0;" />
            <a href="https://stellio.com.au/admin" style="display:inline-block;background:#FB5005;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">View in Admin</a>
          </div>
        </div>
      `,
      textBody: buildMessageBody(),
    }).catch(() => {})

    setSubmitted(true)
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  if (submitted) {
    return (
      <>
        <section className="pt-[140px] pb-20 text-center">
          <div className="max-w-[600px] mx-auto px-6">
            <AnimatedSection>
              <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-12">
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="font-[Satoshi] text-[1.6rem] font-700 mb-3">You're in!</h2>
                <p className="text-[1rem] text-[#A1A1AA] leading-relaxed mb-6">Thanks for your interest in the EOFY Brand Refresh. I will review your details and get back to you within 24 hours with a free brand assessment and package recommendation.</p>
                <a href="/" className="inline-flex items-center gap-2 text-[0.88rem] font-600 text-[#FB5005] hover:text-[#FAFAFA] transition-colors">
                  Back to Home
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </>
    )
  }

  const step = steps[currentStep]

  return (
    <>
      {/* Hero */}
      <section className="pt-[140px] pb-8">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-[#FB5005]/10 border border-[#FB5005]/20 rounded-full px-4 py-1.5 text-[0.72rem] font-600 text-[#FB5005] uppercase tracking-[0.1em] mb-6">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              EOFY Special - Ends June 30
            </span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.2rem)] font-700 leading-[1.05] mb-6">
                Brand Refresh<br /><span className="gradient-text">for the New Financial Year.</span>
              </h1>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] max-w-[520px] mx-auto mb-8">
              Your business has worked hard this financial year. Has your branding kept up? Fill out this quick form and I will provide a free review of your current branding.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Package Cards */}
      <section className="pb-10">
        <div className="max-w-[700px] mx-auto px-6">
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {packages.map(pkg => (
                <div
                  key={pkg.id}
                  className={`relative bg-[#111111] border rounded-xl p-5 transition-all duration-200 ${
                    form.selectedPackage === pkg.id
                      ? 'border-[#FB5005]/50 shadow-[0_0_20px_rgba(251,80,5,0.1)]'
                      : 'border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2.5 left-4 bg-[#FB5005] text-white text-[0.6rem] font-700 uppercase tracking-[0.08em] px-2.5 py-0.5 rounded-full">Most Popular</span>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FB5005]/[0.08] border border-[#FB5005]/[0.15] flex items-center justify-center shrink-0 text-[#FB5005]">
                      {pkg.icon}
                    </div>
                    <div>
                      <h3 className="font-[Satoshi] text-[0.9rem] font-700 text-[#FAFAFA] mb-0.5">{pkg.name}</h3>
                      <span className="text-[0.78rem] font-600 text-[#FB5005]">{pkg.price}</span>
                      <p className="text-[0.78rem] text-[#71717A] leading-relaxed mt-1">{pkg.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Why Now */}
          <AnimatedSection delay={0.15}>
            <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-xl p-5 mb-2">
              <h3 className="font-[Satoshi] text-[0.88rem] font-700 text-[#FAFAFA] mb-3">Why now?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {whyNowItems.map(item => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#22C55E] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-[0.82rem] text-[#A1A1AA]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Form */}
      <section className="pb-[120px]">
        <div className="max-w-[640px] mx-auto px-6">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em]">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-[0.72rem] font-600 text-[#FB5005]">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-[#111111] rounded-full overflow-hidden">
              <div className="h-full bg-[#FB5005] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-8">
              <h2 className="font-[Satoshi] text-[1.3rem] font-700 mb-1">{step.title}</h2>
              {step.description && (
                <p className="text-[0.88rem] text-[#71717A] mb-6">{step.description}</p>
              )}
              {!step.description && <div className="mb-6" />}

              <div className="space-y-5">
                {step.fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">
                      {field.label}{field.required && <span className="text-[#FB5005] ml-1">*</span>}
                    </label>

                    {field.type === 'textarea' && (
                      <textarea
                        name={field.name}
                        value={form[field.name] || ''}
                        onChange={handleChange}
                        rows={3}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FB5005] outline-none transition-colors resize-y"
                      />
                    )}

                    {field.type === 'file' && (
                      <div>
                        <label className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl bg-[#0A0A0A] border border-dashed border-white/[0.12] text-[#A1A1AA] text-[0.88rem] cursor-pointer hover:border-[#FB5005]/40 hover:text-[#FAFAFA] transition-all">
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                          {form.logoFileName ? (
                            <span className="text-[#22C55E] font-500">{form.logoFileName}</span>
                          ) : uploading ? (
                            <span className="text-[#FB5005]">Uploading...</span>
                          ) : (
                            <span>Click to upload your logo</span>
                          )}
                          <input
                            type="file"
                            accept={field.accept}
                            onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                        {field.help && <p className="text-[0.72rem] text-[#71717A] mt-1.5">{field.help}</p>}
                        {form.logoFileUrl && (
                          <button type="button" onClick={() => setForm(f => ({ ...f, logoFileUrl: '', logoFileName: '' }))} className="text-[0.72rem] text-[#EF4444] mt-1.5 hover:underline">Remove file</button>
                        )}
                      </div>
                    )}

                    {field.type === 'multi' && (
                      <div className="flex flex-wrap gap-2">
                        {field.options.map(option => {
                          const selected = (form[field.name] || []).includes(option)
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleMulti(field.name, option)}
                              className={`px-3.5 py-2 rounded-lg text-[0.82rem] font-500 transition-all duration-200 ${
                                selected
                                  ? 'bg-[#FB5005] text-white'
                                  : 'bg-[#0A0A0A] text-[#A1A1AA] border border-white/[0.08] hover:border-white/[0.15]'
                              }`}
                            >
                              {option}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {field.type === 'select' && (
                      <select
                        name={field.name}
                        value={form[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/[0.08] text-[#A1A1AA] text-[0.92rem] focus:border-[#FB5005] outline-none transition-colors appearance-none"
                      >
                        <option value="">Select an option...</option>
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {field.type === 'package-select' && (
                      <div className="space-y-2.5">
                        {packages.map(pkg => {
                          const selected = form.selectedPackage === pkg.id
                          return (
                            <button
                              key={pkg.id}
                              type="button"
                              onClick={() => setForm(f => ({ ...f, selectedPackage: pkg.id }))}
                              className={`w-full text-left flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                                selected
                                  ? 'bg-[#FB5005]/[0.08] border-2 border-[#FB5005]/50'
                                  : 'bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.15]'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                selected ? 'border-[#FB5005]' : 'border-white/[0.15]'
                              }`}>
                                {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#FB5005]" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className={`text-[0.88rem] font-600 ${selected ? 'text-[#FAFAFA]' : 'text-[#A1A1AA]'}`}>{pkg.name}</span>
                                  <span className="text-[0.72rem] font-600 text-[#FB5005]">{pkg.price}</span>
                                  {pkg.popular && (
                                    <span className="text-[0.6rem] font-600 bg-[#FB5005]/10 text-[#FB5005] px-1.5 py-0.5 rounded">Popular</span>
                                  )}
                                </div>
                                <p className="text-[0.76rem] text-[#71717A] mt-0.5">{pkg.desc}</p>
                              </div>
                            </button>
                          )
                        })}
                        <button
                          type="button"
                          onClick={() => setForm(f => ({ ...f, selectedPackage: 'not-sure' }))}
                          className={`w-full text-left flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                            form.selectedPackage === 'not-sure'
                              ? 'bg-[#FB5005]/[0.08] border-2 border-[#FB5005]/50'
                              : 'bg-[#0A0A0A] border border-white/[0.08] hover:border-white/[0.15]'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            form.selectedPackage === 'not-sure' ? 'border-[#FB5005]' : 'border-white/[0.15]'
                          }`}>
                            {form.selectedPackage === 'not-sure' && <div className="w-2.5 h-2.5 rounded-full bg-[#FB5005]" />}
                          </div>
                          <span className={`text-[0.88rem] font-600 ${form.selectedPackage === 'not-sure' ? 'text-[#FAFAFA]' : 'text-[#A1A1AA]'}`}>Not sure - recommend one for me</span>
                        </button>
                      </div>
                    )}

                    {(field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'url') && (
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FB5005] outline-none transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="text-[0.82rem] text-red-400 mt-4">{error}</p>}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(s => s - 1)}
                  className="px-6 py-3 rounded-xl border border-white/[0.12] text-[#FAFAFA] text-[0.88rem] font-600 hover:border-white/[0.2] transition-all"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(s => s + 1)}
                  className="px-6 py-3 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all hover:shadow-[0_0_20px_rgba(251,80,5,0.2)]"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={sending}
                  className="px-8 py-3 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all hover:shadow-[0_0_20px_rgba(251,80,5,0.2)] disabled:opacity-50"
                >
                  {sending ? 'Submitting...' : 'Get My Free Brand Review'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
