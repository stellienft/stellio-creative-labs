import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AnimatedSection from '../components/AnimatedSection'
import { WebPageSchema, BreadcrumbSchema } from '../components/JsonLd'

export default function Work() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('projects').select('*').eq('published', true).order('ordering', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setProjects(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FB5005] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-[100px] pb-20 px-6">
      <WebPageSchema
        type="CollectionPage"
        name="Our Work - Stellio Creative Labs"
        description="Brands, platforms, and digital tools we have built for startups and scale-ups."
        url="https://stellio.com.au/work"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://stellio.com.au' },
        { name: 'Work', url: 'https://stellio.com.au/work' },
      ]} />
      <div className="max-w-[1100px] mx-auto">
        <AnimatedSection>
          <span className="text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em]">Portfolio</span>
          <h1 className="font-[Satoshi] text-[2.5rem] md:text-[3rem] font-700 mt-3 mb-4">Our Work</h1>
          <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed mb-12 max-w-[600px]">
            Brands, platforms, and digital tools we have built for startups and scale-ups.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.08}>
              <div className={`bg-gradient-to-br ${project.gradient || 'from-[#1a2a3a] to-[#0f1a24]'} border border-white/[0.06] rounded-2xl p-6 md:p-8 transition-all hover:border-white/[0.12] hover:shadow-lg h-full flex flex-col`}>
                {project.image_url && (
                  <img src={project.image_url} alt={project.name} className="w-full h-48 object-cover rounded-xl mb-4 border border-white/[0.06]" />
                )}
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA]">{project.name}</h3>
                  {project.year && <span className="text-[0.68rem] text-[#71717A] bg-white/[0.04] px-2 py-0.5 rounded">{project.year}</span>}
                </div>
                <p className="text-[0.95rem] text-[#FB5005] font-500 mb-3">{project.tagline}</p>
                <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed flex-1">{project.description}</p>
                {project.metrics && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <span className="text-[0.82rem] font-600 text-green-400">{project.metrics}</span>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
