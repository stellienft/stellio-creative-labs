import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AnimatedSection from '../components/AnimatedSection'
import { BlogPostingSchema, BreadcrumbSchema } from '../components/JsonLd'

// Inline markdown: **bold**, *italic*, [text](url), bare URLs, `code`
function renderInline(text) {
  // Tokenise on markdown links first, then split the rest
  const linkRe = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
  const parts = []
  let last = 0
  let m
  let key = 0
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) parts.push(...renderText(text.slice(last, m.index), key))
    key++
    parts.push(<a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(...renderText(text.slice(last), key + 1000))
  return parts
}

function renderText(txt, baseKey = 0) {
  // Split on **bold**, *italic*, `code`, bare URLs
  const re = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|https?:\/\/[^\s)]+)/g
  const out = []
  let last = 0
  let m
  let key = baseKey * 1000
  while ((m = re.exec(txt)) !== null) {
    if (m.index > last) out.push(txt.slice(last, m.index))
    const tok = m[0]
    key++
    if (tok.startsWith('**')) out.push(<strong key={key}>{tok.slice(2, -2)}</strong>)
    else if (tok.startsWith('*')) out.push(<em key={key}>{tok.slice(1, -1)}</em>)
    else if (tok.startsWith('`')) out.push(<code key={key}>{tok.slice(1, -1)}</code>)
    else out.push(<a key={key} href={tok} target="_blank" rel="noopener noreferrer">{tok}</a>)
    last = m.index + tok.length
  }
  if (last < txt.length) out.push(txt.slice(last))
  return out
}

function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false)
  const url = `https://stellio.com.au/blog/${slug}`
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const buttons = [
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    },
  ]

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.1em] mr-1">Share</span>
      {buttons.map(b => (
        <a
          key={b.label}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] text-[0.75rem] text-[#A1A1AA] hover:border-[#FB5005]/40 hover:text-[#FB5005] transition-all"
        >
          {b.icon}
          {b.label}
        </a>
      ))}
      <button
        onClick={() => { navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) }) }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] text-[0.75rem] text-[#A1A1AA] hover:border-[#FB5005]/40 hover:text-[#FB5005] transition-all cursor-pointer"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('blog_posts').select('*').eq('slug', slug).eq('status', 'published').single()
      .then(({ data, error }) => {
        if (!error && data) setPost(data)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FB5005] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-[Satoshi] text-[2rem] font-700 mb-3">Post Not Found</h1>
          <p className="text-[#A1A1AA] mb-6">The blog post you are looking for does not exist.</p>
          <Link to="/blog" className="px-5 py-2.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all">Back to Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-[100px] pb-20 px-6">
      <div className="max-w-[700px] mx-auto">
        <BlogPostingSchema
          title={post.title}
          description={post.excerpt}
          datePublished={post.date}
          dateModified={post.updated_at || post.date}
          image={post.cover_image}
          url={`https://stellio.com.au/blog/${post.slug}`}
        />
        <BreadcrumbSchema items={[
          { name: 'Home', url: 'https://stellio.com.au' },
          { name: 'Blog', url: 'https://stellio.com.au/blog' },
          { name: post.title, url: `https://stellio.com.au/blog/${post.slug}` },
        ]} />
        <AnimatedSection>
          <Link to="/blog" className="text-[0.82rem] text-[#71717A] hover:text-[#FB5005] transition-colors mb-6 inline-block">&larr; Back to Blog</Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[0.68rem] font-600 text-[#FB5005] uppercase tracking-[0.1em]">{post.category}</span>
            <span className="text-[0.68rem] text-[#71717A]">·</span>
            <span className="text-[0.68rem] text-[#71717A]">{post.date}</span>
            {post.read_time && <><span className="text-[0.68rem] text-[#71717A]">·</span><span className="text-[0.68rem] text-[#71717A]">{post.read_time}</span></>}
          </div>
          <h1 className="font-[Satoshi] text-[2.2rem] md:text-[2.8rem] font-700 leading-tight mb-6">{post.title}</h1>
          <div className="mb-8">
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
          {post.cover_image && <img src={post.cover_image} alt={post.title} className="w-full rounded-2xl mb-8 border border-white/[0.06]" />}
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <article className="prose prose-invert prose-[#A1A1AA] max-w-none text-[1.02rem] leading-[1.8]
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
            {post.content?.split('\n').filter((line, i) => {
              // Skip leading "# Title" line if it duplicates the page h1
              if (i === 0 && line.trim() === `# ${post.title}`.trim()) return false
              return true
            }).map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i}>{renderInline(line.slice(2))}</h1>
              if (line.startsWith('## ')) return <h2 key={i}>{renderInline(line.slice(3))}</h2>
              if (line.startsWith('### ')) return <h3 key={i}>{renderInline(line.slice(4))}</h3>
              if (line.startsWith('- ')) return <li key={i}>{renderInline(line.slice(2))}</li>
              if (/^\d+\.\s/.test(line)) return <li key={i}>{renderInline(line.replace(/^\d+\.\s/, ''))}</li>
              if (line.trim() === '') return null
              return <p key={i}>{renderInline(line)}</p>
            })}
          </article>
        </AnimatedSection>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col gap-6">
          <ShareButtons title={post.title} slug={post.slug} />
          <div>
            <Link to="/blog" className="px-5 py-2.5 rounded-xl bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all inline-block">&larr; All Posts</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
