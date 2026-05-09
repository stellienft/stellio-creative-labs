import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'

const plans = [
  {
    name: "Founder's Launchpad",
    price: '$5,000',
    unit: 'AUD',
    note: 'One-time — 2 weeks',
    popular: false,
    features: [
      'Logo + brand guide',
      '5-page custom website',
      'AI chatbot integration',
      'Domain + email setup',
      'Social media kit',
    ],
    cta: 'Get Started',
    ctaStyle: 'secondary',
  },
  {
    name: 'Business OS',
    price: '$12,000',
    unit: 'AUD',
    note: 'One-time — 4-6 weeks',
    popular: true,
    features: [
      'Everything in Launchpad',
      'Custom dashboard / portal',
      'CRM integration',
      'Automated reporting',
      '3 months Arclink AI',
    ],
    cta: 'Start Your Build',
    ctaStyle: 'primary',
  },
  {
    name: 'Growth Stack',
    price: '$750',
    unit: '/mo',
    note: 'Ongoing retainer',
    popular: false,
    features: [
      'Hosting + SSL + backups',
      'Monthly updates',
      'Analytics report',
      '2 hrs/mo AI tuning',
      'Priority support',
    ],
    cta: 'Enquire Now',
    ctaStyle: 'secondary',
  },
]

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

export default function Pricing() {
  return (
    <>
      <section className="pt-[140px] pb-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Pricing</span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                Clear pricing. <span className="gradient-text">No surprises.</span>
              </h1>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] max-w-[600px] mx-auto">
              Fixed scope, fixed price. No hidden fees, no scope creep, no stress.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`relative bg-[#111111] border rounded-2xl p-8 h-full flex flex-col ${
                    plan.popular ? 'border-[#FF6B2C]/30' : 'border-white/[0.06] hover:border-white/[0.12]'
                  } transition-all duration-500`}
                >
                  {plan.popular && (
                    <span className="absolute -top-px left-1/2 -translate-x-1/2 bg-[#FF6B2C] text-white text-[0.7rem] font-700 uppercase tracking-[0.08em] px-4 py-1.5 rounded-b-lg">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-[Satoshi] text-[1.1rem] font-600 mb-5">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-[Satoshi] text-[2.4rem] font-700">{plan.price}</span>
                    <span className="text-[0.95rem] text-[#71717A] font-500">{plan.unit}</span>
                  </div>
                  <p className="text-[0.8rem] text-[#71717A] mb-7">{plan.note}</p>
                  <ul className="flex-1 space-y-3.5 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-[0.88rem] text-[#A1A1AA]">
                        <Check /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`block w-full text-center py-3 rounded-xl text-[0.85rem] font-600 transition-all duration-300 ${
                      plan.ctaStyle === 'primary'
                        ? 'bg-[#FF6B2C] text-white hover:bg-[#E55A1F] hover:shadow-[0_0_20px_rgba(255,107,44,0.2)]'
                        : 'border border-white/[0.12] text-[#FAFAFA] hover:border-[#FF6B2C] hover:text-[#FF6B2C]'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Add-on */}
          <AnimatedSection delay={0.3}>
            <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-7 max-w-[700px] mx-auto flex flex-col md:flex-row items-center gap-8">
              <div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-[Satoshi] text-[1.8rem] font-700">$199</span>
                  <span className="text-[0.9rem] text-[#71717A]">/mo</span>
                </div>
                <p className="text-[0.8rem] text-[#71717A]">AI Agent Add-On</p>
              </div>
              <p className="flex-1 text-[0.9rem] text-[#A1A1AA] text-center md:text-left">
                Custom GPT trained on your business, integrated into your website or tools. Includes monthly tuning and prompt refinement.
              </p>
              <Link to="/contact" className="shrink-0 px-5 py-2.5 rounded-xl border border-[#FF6B2C] text-[#FF6B2C] text-[0.85rem] font-600 hover:bg-[#FF6B2C] hover:text-white transition-all duration-300">
                Add to Plan
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
