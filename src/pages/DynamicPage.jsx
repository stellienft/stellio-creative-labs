import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AnimatedSection from '../components/AnimatedSection'
import { WebPageSchema, BreadcrumbSchema } from '../components/JsonLd'

// Helper: create or update a meta tag (mirrors SettingsContext pattern)
function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value || '')
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href || '')
}

export default function DynamicPage() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setNotFound(false)
    supabase.from('pages').select('*').eq('slug', slug).eq('status', 'published').single()
      .then(({ data, error }) => {
        if (!active) return
        if (!error && data) {
          setPage(data)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
    return () => { active = false }
  }, [slug])

  // SEO meta injection - runs when page loads
  useEffect(() => {
    if (!page) return
    const url = page.seo_canonical || `https://stellio.com.au/${page.slug}`
    const fullTitle = page.seo_title || `${page.title} | Stellio Creative Labs`
    const desc = page.seo_description || ''

    const prevTitle = document.title
    document.title = fullTitle

    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    if (page.seo_og_image) {
      setMeta('property', 'og:image', page.seo_og_image)
      setMeta('name', 'twitter:image', page.seo_og_image)
      setMeta('name', 'twitter:card', 'summary_large_image')
    }
    setMeta('name', 'robots', page.seo_noindex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', url)

    return () => { document.title = prevTitle }
  }, [page])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FB5005] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-[Satoshi] text-[2rem] font-700 mb-3">Page Not Found</h1>
          <p className="text-[#A1A1AA] mb-6">The page you are looking for does not exist.</p>
          <Link to="/" className="px-5 py-2.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all">Back to Home</Link>
        </div>
      </div>
    )
  }

  // Parse optional custom JSON-LD from seo_schema (raw JSON string)
  let customSchema = null
  if (page.seo_schema && page.seo_schema.trim()) {
    try {
      customSchema = JSON.parse(page.seo_schema)
    } catch (e) {
      customSchema = null
    }
  }

  const pageUrl = `https://stellio.com.au/${page.slug}`

  return (
    <div className="min-h-screen pt-[100px] pb-20 px-6">
      <div className="max-w-[760px] mx-auto">
        {customSchema ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }} />
        ) : (
          <WebPageSchema name={page.seo_title || page.title} description={page.seo_description || ''} url={pageUrl} />
        )}
        <BreadcrumbSchema items={[
          { name: 'Home', url: 'https://stellio.com.au' },
          { name: page.title, url: pageUrl },
        ]} />

        <AnimatedSection>
          <h1 className="font-[Satoshi] text-[2.2rem] md:text-[2.8rem] font-700 leading-tight mb-8">{page.title}</h1>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <article className="prose prose-invert max-w-none text-[1.02rem] leading-[1.8]
            [&_h1]:font-[Satoshi] [&_h1]:text-[1.8rem] [&_h1]:font-700 [&_h1]:text-[#FAFAFA] [&_h1]:mt-10 [&_h1]:mb-4
            [&_h2]:font-[Satoshi] [&_h2]:text-[1.4rem] [&_h2]:font-700 [&_h2]:text-[#FAFAFA] [&_h2]:mt-8 [&_h2]:mb-3
            [&_h3]:font-[Satoshi] [&_h3]:text-[1.1rem] [&_h3]:font-600 [&_h3]:text-[#FAFAFA] [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:mb-4 [&_p]:text-[#A1A1AA]
            [&_strong]:text-[#FAFAFA] [&_strong]:font-600
            [&_a]:text-[#FB5005] [&_a]:no-underline [&_a:hover]:underline
            [&_ul]:my-4 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:text-[#A1A1AA]
            [&_ol]:my-4 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:text-[#A1A1AA]
            [&_li]:mb-1 [&_li]:text-[#A1A1AA]
            [&_code]:bg-[#1a1a1a] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.88rem] [&_code]:text-[#FB5005]
            [&_pre]:bg-[#111111] [&_pre]:border [&_pre]:border-white/[0.06] [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:overflow-x-auto [&_pre]:text-[0.85rem]
            [&_blockquote]:border-l-2 [&_blockquote]:border-[#FB5005] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#71717A]
          ">
            {page.content?.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>
              if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>
              if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>
              if (line.startsWith('- ')) return <li key={i}>{line.slice(2)}</li>
              if (line.startsWith('**') && line.endsWith('**') && line.length > 4) return <p key={i}><strong>{line.slice(2, -2)}</strong></p>
              if (line.trim() === '') return <br key={i} />
              return <p key={i}>{line}</p>
            })}
          </article>
        </AnimatedSection>
      </div>
    </div>
  )
}
