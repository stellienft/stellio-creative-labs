import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AnimatedSection from '../components/AnimatedSection'
import { Em, PageHero, Card } from '../components/ui'
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
    <div className="min-h-screen pb-20">
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
      <PageHero
        tag="Portfolio"
        title={<>Real results. <Em>Real businesses.</Em></>}
        sub="Brands, platforms, and digital tools we have built for startups and scale-ups."
      />
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.08}>
              <Card className="overflow-hidden h-full">
                {project.image_url && (
                  <div className="h-[170px] flex items-center justify-center bg-gradient-to-br from-[#141414] to-[#0D0D0D] border-b border-white/[0.07]">
                    <img src={project.image_url} alt={project.name} className="max-h-[72px] max-w-[70%] object-contain" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <h3 className="font-[Satoshi] text-[1.2rem] font-700 tracking-[-0.015em] text-[#FAFAFA]">{project.name}</h3>
                    {project.year && <span className="text-[0.68rem] text-[#71717A] bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-full">{project.year}</span>}
                  </div>
                  <p className="text-[0.85rem] text-[#FB5005] font-500 mt-1">{project.tagline}</p>
                  <p className="text-[0.88rem] text-[#A1A1AA] leading-[1.6] mt-2.5">{project.description}</p>
                  {project.metrics && (
                    <div className="mt-4">
                      <span className="text-[0.75rem] font-600 text-[#4ADE80] bg-[#22C55E]/[0.09] border border-[#22C55E]/[0.18] px-3 py-1 rounded-full">{project.metrics}</span>
                    </div>
                  )}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
