import React from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'

const allProjects = [
  { name: 'greenfunding', tagline: 'Green-Tech Funding Platform', desc: 'Full brand and custom investor portal. React + Supabase + AI search. Led to 40% reduction in admin time and 3x engagement.', metrics: ['40% less admin', '3x engagement'], gradient: 'from-[#1a2e1a] to-[#0f1f0f]', year: '2025' },
  { name: 'PropCheck', tagline: 'Property Inspection Technology', desc: 'Brand, custom dashboard, automated reporting, CRM sync. Transformed how property inspections are conducted.', metrics: ['60% less reporting', '2.5x satisfaction'], gradient: 'from-[#1a1a2e] to-[#0f0f1f]', year: '2025' },
  { name: 'Macuace Football', tagline: 'Grassroots Football Community', desc: 'Complete rebrand: logo, kit design, social templates, event platform. Built community from the ground up.', metrics: ['200% engagement', '30% less admin'], gradient: 'from-[#2e1a1a] to-[#1f0f0f]', year: '2024' },
  { name: 'Gel Paints Australia', tagline: 'E-Commerce Nail Supply', desc: 'Shopify customisation, automated inventory alerts, AI chatbot. Turned a local supplier into a digital-first business.', metrics: ['50% conversion', '80% fewer stock-outs'], gradient: 'from-[#2e1a2e] to-[#1f0f1f]', year: '2024' },
  { name: 'HauOS', tagline: 'Smart Home Dashboard', desc: 'Custom dashboard for IoT device management. Real-time monitoring, automated scheduling, mobile-responsive design.', metrics: ['Real-time sync', 'Cross-platform'], gradient: 'from-[#1a2e3a] to-[#0f1f2a]', year: '2025' },
  { name: 'BLNDL', tagline: 'Creative Agency Platform', desc: 'Brand system and client portal with project tracking, file sharing, and automated invoicing.', metrics: ['Streamlined workflow', 'Client retention +40%'], gradient: 'from-[#3a2e1a] to-[#2a1f0f]', year: '2024' },
]

export default function Work() {
  return (
    <>
      <section className="pt-[140px] pb-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Portfolio</span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                Real work. <span className="gradient-text">Real impact.</span>
              </h1>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] max-w-[600px] mx-auto">
              Selected projects across branding, web development, AI integration, and business automation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-[120px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjects.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-500"
                >
                  <div className={`h-[220px] bg-gradient-to-br ${p.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.03)%22%20stroke-width%3D%221%22%3E%3Cpath%20d%3D%22M0%2060L60%200M-15%2015L15%20-15M45%2075L75%2045%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
                    <span className="font-[Satoshi] text-[2.5rem] font-700 text-white/10 tracking-tight">{p.name}</span>
                    <span className="absolute top-4 right-4 text-[0.72rem] text-white/20 font-500">{p.year}</span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-[Satoshi] text-[1.15rem] font-600 mb-1">{p.name}</h3>
                    <p className="text-[0.78rem] text-[#71717A] mb-3">{p.tagline}</p>
                    <p className="text-[0.9rem] text-[#A1A1AA] mb-5 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.metrics.map(m => (
                        <span key={m} className="text-[0.72rem] font-600 text-[#FF6B2C] bg-[#FF6B2C]/[0.08] px-2.5 py-1 rounded-md">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
