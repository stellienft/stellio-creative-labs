import React from 'react'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'

const creds = [
  { icon: 'rocket', title: 'BlockChat', desc: 'Founded & Acquired by Zapme' },
  { icon: 'award', title: 'Crypto Knights S2', desc: 'Featured Founder' },
  { icon: 'zap', title: 'Arclink', desc: 'AI Platform Creator' },
  { icon: 'star', title: '70+ Reviews', desc: '5-Star Average' },
  { icon: 'map-pin', title: 'Brisbane', desc: 'Based, Global Reach' },
  { icon: 'cpu', title: 'Web3 + AI', desc: 'Next-Gen Tech Focus' },
]

const iconPaths = {
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  star: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>',
  'map-pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  cpu: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M9 9h6v6H9z"/><path d="M3 9h2M3 15h2M19 9h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2"/>',
}

export default function About() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-[140px] pb-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">
              About
            </span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                Built by an entrepreneur<br />
                <span className="gradient-text">who's been in your shoes.</span>
              </h1>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] max-w-[600px] mx-auto">
              Stellio Koutsis — designer, developer, and founder with a track record of building and exiting companies.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Bio */}
      <section className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-12 min-h-[400px] flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <h2 className="font-[Satoshi] text-[1.8rem] font-700 mb-6">
                From Web3 founder to<br /><span className="gradient-text">platform builder.</span>
              </h2>
              <p className="text-[1rem] text-[#A1A1AA] leading-relaxed mb-5">
                I'm <strong className="text-[#FAFAFA]">Stellio Koutsis</strong> — designer, developer, and founder.
                Before Stellio Creative Labs, I built <strong className="text-[#FAFAFA]">BlockChat</strong>, a Web3 community
                platform that was <strong className="text-[#FAFAFA]">acquired by Zapme</strong>. I also featured on
                <strong className="text-[#FAFAFA]"> Crypto Knights Season 2</strong> sharing my founder journey.
              </p>
              <p className="text-[1rem] text-[#A1A1AA] leading-relaxed mb-5">
                I know what it's like to build from nothing. Stellio isn't just an agency — it's me and a tight
                network building systems, platforms, and automations. Every project is a partnership.
              </p>
              <p className="text-[1rem] text-[#A1A1AA] leading-relaxed">
                I use the same tools I build for clients: <strong className="text-[#FAFAFA]">React, Supabase, AI agents,</strong>
                and modern frameworks that ship fast and scale hard. No bloat, no overhead, no junior teams.
                Just senior-level work with founder empathy.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-[100px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Credentials</span>
            <TextReveal>
              <h2 className="font-[Satoshi] text-[clamp(1.6rem,3.5vw,2.2rem)] font-700">
                Proof, not promises.
              </h2>
            </TextReveal>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creds.map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.08}>
                <div className="bg-[#111111] border border-white/[0.06] rounded-xl p-6 hover:border-white/[0.12] transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-[#FF6B2C]/[0.08] border border-[#FF6B2C]/[0.15] flex items-center justify-center mb-4 group-hover:bg-[#FF6B2C]/[0.15] transition-colors">
                    <svg className="w-[18px] h-[18px] text-[#FF6B2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: iconPaths[c.icon] }} />
                  </div>
                  <h4 className="text-[0.95rem] font-600 mb-1">{c.title}</h4>
                  <span className="text-[0.8rem] text-[#71717A]">{c.desc}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
