import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { sendNotificationEmail } from '../lib/email'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'

function buildWebQuestionnaireEmailHtml(form) {
  const row = (label, value) => value
    ? `<tr><td style="padding:8px 0;color:#71717A;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;width:140px;">${label}</td><td style="padding:8px 0;font-size:15px;color:#FAFAFA;white-space:pre-wrap;">${value}</td></tr>`
    : ''
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;background:#0A0A0A;border-radius:16px;overflow:hidden;">
      <div style="background:#FB5005;padding:24px 32px;">
        <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">New Web Design Questionnaire</h1>
      </div>
      <div style="padding:32px;color:#FAFAFA;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Name', form.fullName)}
          ${row('Email', form.email ? `<a href="mailto:${form.email}" style="color:#FB5005;text-decoration:none;">${form.email}</a>` : '')}
          ${row('Phone', form.phone)}
          ${row('Business', form.company)}
          ${row('Website', form.website ? `<a href="${form.website}" style="color:#FB5005;text-decoration:none;">${form.website}</a>` : '')}
        </table>
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="color:#71717A;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 8px 0;">Business</p>
          <table style="width:100%;border-collapse:collapse;">
            ${row('Description', form.businessDesc)}
            ${row('Target Audience', form.targetAudience)}
            ${row('Competitors', form.competitors)}
            ${row('Unique Factor', form.uniqueFactor)}
          </table>
        </div>
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="color:#71717A;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 8px 0;">The Website</p>
          <table style="width:100%;border-collapse:collapse;">
            ${row('Project Type', form.projectType)}
            ${row('Key Pages', form.keyPages)}
            ${row('Must-Haves', form.mustHave)}
            ${row('Style', form.styleDirection)}
            ${row('References', form.referenceSites)}
          </table>
        </div>
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="color:#71717A;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 8px 0;">Domain & Hosting</p>
          <table style="width:100%;border-collapse:collapse;">
            ${row('Domain', form.domainStatus)}
            ${row('Hosting', form.hostingStatus)}
            ${row('Email Needs', form.emailNeeds)}
            ${row('Current Tech', form.existingTech)}
          </table>
        </div>
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="color:#71717A;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 8px 0;">Budget & Timeline</p>
          <table style="width:100%;border-collapse:collapse;">
            ${row('Budget', form.budget)}
            ${row('Timeline', form.timeline)}
            ${row('Content Ready', form.contentReady)}
            ${row('Additional Info', form.additionalInfo)}
          </table>
        </div>
      </div>
    </div>`
}

const steps = [
  {
    title: 'About You',
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: '04XX XXX XXX', required: false },
      { name: 'company', label: 'Business Name', type: 'text', placeholder: 'Your business name', required: true },
      { name: 'website', label: 'Current Website (if any)', type: 'url', placeholder: 'https://...', required: false },
    ]
  },
  {
    title: 'Your Business',
    fields: [
      { name: 'businessDesc', label: 'What does your business do?', type: 'textarea', placeholder: 'A short description of your products or services...', required: true },
      { name: 'targetAudience', label: 'Who is your target audience?', type: 'textarea', placeholder: 'Age, location, industry, interests...', required: true },
      { name: 'competitors', label: 'Who are your main competitors?', type: 'textarea', placeholder: 'Names or websites of competitors...', required: false },
      { name: 'uniqueFactor', label: 'What makes you different?', type: 'textarea', placeholder: 'Why do clients choose you over others?', required: false },
    ]
  },
  {
    title: 'The Website',
    fields: [
      { name: 'projectType', label: 'What do you need?', type: 'multi', options: ['New Website', 'Website Redesign', 'Landing Page', 'E-Commerce Store', 'Web Application', 'Blog/Content Site'], required: true },
      { name: 'keyPages', label: 'Key Pages Needed', type: 'multi', options: ['Home', 'About', 'Services', 'Portfolio/Work', 'Contact', 'Blog', 'Pricing', 'FAQ', 'Testimonials', 'Bookings/Calendar'], required: true },
      { name: 'mustHave', label: 'Must-Have Features', type: 'multi', options: ['Contact Form', 'Online Bookings', 'E-Commerce/Payments', 'Client Portal/Login', 'Blog/CMS', 'SEO Optimisation', 'Analytics/Tracking', 'Live Chat', 'Maps/Location', 'Social Media Integration'], required: false },
      { name: 'styleDirection', label: 'Style Direction', type: 'multi', options: ['Modern & Clean', 'Bold & Dynamic', 'Minimal & Elegant', 'Corporate & Professional', 'Creative & Artistic', 'Dark & Moody', 'Bright & Playful'], required: true },
      { name: 'referenceSites', label: 'Websites you like', type: 'textarea', placeholder: 'URLs or descriptions of sites with the vibe you are after...', required: false },
    ]
  },
  {
    title: 'Domain & Hosting',
    fields: [
      { name: 'domainStatus', label: 'Do you have a domain name?', type: 'select', options: ['Yes, I already own my domain', 'No, I need to register one', 'Not sure - need guidance'], required: true },
      { name: 'hostingStatus', label: 'What about hosting?', type: 'select', options: ['I have hosting already', 'I need hosting set up', 'I run my own stack/servers', 'Not sure - need guidance'], required: true },
      { name: 'emailNeeds', label: 'Do you need custom business email?', type: 'select', options: ['Yes - Google Workspace (yourname@yourbusiness.com)', 'Yes - something else', 'No, I am fine with my current setup', 'Not sure - tell me more'], required: true },
      { name: 'existingTech', label: 'Current tech stack (if any)', type: 'textarea', placeholder: 'e.g. WordPress, Shopify, custom, Wix, Squarespace...', required: false },
    ]
  },
  {
    title: 'Budget & Timeline',
    fields: [
      { name: 'budget', label: 'Budget Range', type: 'select', options: ['Under $2,500', '$2,500 - $4,500', '$4,500 - $6,000', '$6,000 - $10,000', '$10,000 - $15,000', '$15,000+'], required: true },
      { name: 'timeline', label: 'Timeline', type: 'select', options: ['ASAP', 'Within 2 weeks', 'Within 1 month', 'Within 2 months', 'Within 3 months', 'No rush'], required: true },
      { name: 'contentReady', label: 'Is your content ready?', type: 'select', options: ['Yes, I have all text and images', 'Partially - still working on it', 'No, I need help with content', 'I have a brand guide to work from'], required: true },
      { name: 'additionalInfo', label: 'Anything else?', type: 'textarea', placeholder: 'Extra details, specific requirements, must-haves...', required: false },
    ]
  }
]

export default function WebQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0)
  const [form, setForm] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

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

  const buildMessageBody = () => {
    let msg = 'NEW WEB DESIGN QUESTIONNAIRE SUBMISSION\n\n'
    steps.forEach(step => {
      msg += `--- ${step.title.toUpperCase()} ---\n`
      step.fields.forEach(field => {
        const val = form[field.name]
        if (val) {
          msg += `${field.label}: ${Array.isArray(val) ? val.join(', ') : val}\n`
        }
      })
      msg += '\n'
    })
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
      service: 'Web Design Questionnaire',
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
      subject: `New web questionnaire: ${form.fullName}${form.company ? ` from ${form.company}` : ''}`,
      htmlBody: buildWebQuestionnaireEmailHtml(form),
    }).catch(err => console.error('Email notification failed:', err))

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
                <h2 className="font-[Satoshi] text-[1.6rem] font-700 mb-3">Questionnaire received!</h2>
                <p className="text-[1rem] text-[#A1A1AA] leading-relaxed mb-6">Thanks for filling that out. I will review your brief and get back to you within 24 hours with next steps.</p>
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
      <section className="pt-[140px] pb-12 text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Web Design</span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.2rem)] font-700 leading-[1.05] mb-6">
                Let's build your<br /><span className="gradient-text">next website.</span>
              </h1>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] max-w-[500px] mx-auto">
              A quick questionnaire so I can understand what you need. Takes about 4 minutes.
            </p>
          </AnimatedSection>
        </div>
      </section>

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
              <h2 className="font-[Satoshi] text-[1.3rem] font-700 mb-6">{step.title}</h2>

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
                  {sending ? 'Submitting...' : 'Submit Questionnaire'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
