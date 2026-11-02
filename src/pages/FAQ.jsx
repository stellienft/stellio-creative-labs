import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'
import { Em, PageHero, BtnPrimary } from '../components/ui'
import { WebPageSchema, BreadcrumbSchema, FAQSchema } from '../components/JsonLd'

export default function FAQ() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    supabase.from('faqs').select('*').eq('status', 'published').order('ordering', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setFaqs(data)
        setLoading(false)
      })
  }, [])

  const categories = ['All', ...new Set(faqs.map(f => f.category))]
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FB5005] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <WebPageSchema
        name="FAQ - Stellio Creative Labs"
        description="Frequently asked questions about branding, web design, AI integration, pricing, and working with Stellio Creative Labs."
        url="https://stellio.com.au/faq"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://stellio.com.au' },
        { name: 'FAQ', url: 'https://stellio.com.au/faq' },
      ]} />
      <FAQSchema faqs={faqs.map(f => ({ question: f.question, answer: f.answer }))} />

      <div className="min-h-screen pb-20 px-6">
        <PageHero
          tag="FAQ"
          title={<>Got questions? <Em>Good.</Em></>}
          sub="Everything you need to know about working with Stellio. If your question is not here, reach out directly."
        />
        <div className="max-w-[800px] mx-auto">

          {/* Category filter */}
          {categories.length > 2 && (
            <AnimatedSection delay={0.1} className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
                    className={`px-4 py-2 rounded-full text-[0.82rem] font-500 transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-[#FB5005] text-white'
                        : 'border border-white/[0.1] text-[#A1A1AA] hover:border-[#FB5005] hover:text-[#FB5005]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* FAQ items */}
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <AnimatedSection key={faq.id} delay={i * 0.05}>
                <div
                  className={`bg-[#111111] border rounded-[16px] overflow-hidden transition-all duration-300 ${
                    openIndex === i ? 'border-[#FB5005]/40' : 'border-white/[0.07] hover:border-white/[0.14]'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <span className="text-[0.68rem] font-600 text-[#FB5005] uppercase tracking-[0.08em] mb-1.5 block">{faq.category}</span>
                      <h3 className="font-[Satoshi] text-[1.05rem] font-600 text-[#FAFAFA] leading-snug">{faq.question}</h3>
                    </div>
                    <span className={`mt-6 shrink-0 text-[#71717A] transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-5 pt-0">
                      <div className="border-t border-white/[0.06] pt-4">
                        <p className="text-[0.95rem] text-[#A1A1AA] leading-[1.7]">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.3} className="mt-16 text-center">
            <p className="text-[1rem] text-[#71717A] mb-6">Still have questions?</p>
            <BtnPrimary to="/contact">Get in Touch</BtnPrimary>
          </AnimatedSection>
        </div>
      </div>
    </>
  )
}
