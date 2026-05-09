import React from 'react'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'

const articles = [
  { title: '5 Signs Your Business Needs an AI Agent', category: 'AI for Business', date: 'May 2026', excerpt: 'When repetitive work slows you down, an AI agent might be the faster solution.', gradient: 'from-[#1a3a2a] to-[#0f2415]' },
  { title: "Why Your 'Spreadsheet Business' Is Costing You Growth", category: 'Platforms', date: 'May 2026', excerpt: "Custom dashboards aren't just for big companies. Here's why SMBs need them now.", gradient: 'from-[#1a2a3a] to-[#0f1a24]' },
  { title: 'Brand System vs. Logo: What Actually Moves the Needle', category: 'Branding', date: 'April 2026', excerpt: 'A logo is nice. A brand system is what turns visitors into believers.', gradient: 'from-[#3a1a3a] to-[#240f24]' },
  { title: 'How We Built greenfunding in 8 Weeks', category: 'Case Study', date: 'March 2026', excerpt: 'The full story behind the brand, platform, and AI integration for a green-tech funding startup.', gradient: 'from-[#1a2e1a] to-[#0f1f0f]' },
  { title: 'The Future of Web3 Branding', category: 'Web3', date: 'March 2026', excerpt: 'Why decentralised brands need different thinking — and how to get it right.', gradient: 'from-[#2a1a3a] to-[#1a0f24]' },
  { title: 'From Idea to MVP: A Founder's Guide', category: 'Startups', date: 'February 2026', excerpt: 'How to validate, build, and launch your product without wasting months.', gradient: 'from-[#3a2e1a] to-[#2a1f0f]' },
]

export default function Blog() {
  return (
    <>
      <section className="pt-[140px] pb-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block text-[#FF6B2C] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Blog</span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                Free knowledge. <span className="gradient-text">Real tactics.</span>
              </h1>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] max-w-[600px] mx-auto">
              Thoughts on branding, AI, web design, and building businesses that last.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-[120px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.08}>
                <article className="group bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-500 cursor-pointer">
                  <div className={`h-[160px] bg-gradient-to-br ${a.gradient} flex items-center justify-center relative`}>
                    <span className="font-[Satoshi] text-[1.8rem] font-700 text-white/10">{a.category}</span>
                  </div>
                  <div className="p-6">
                    <span className="text-[0.72rem] text-[#FF6B2C] font-600 uppercase tracking-[0.05em]">{a.category}</span>
                    <h3 className="font-[Satoshi] text-[1.05rem] font-600 mt-2 mb-2 leading-snug group-hover:text-[#FF6B2C] transition-colors">{a.title}</h3>
                    <p className="text-[0.85rem] text-[#A1A1AA] mb-4 leading-relaxed">{a.excerpt}</p>
                    <span className="text-[0.78rem] text-[#71717A]">{a.date}</span>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
