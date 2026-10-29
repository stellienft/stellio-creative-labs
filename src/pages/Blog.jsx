import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AnimatedSection from '../components/AnimatedSection'
import { WebPageSchema, BreadcrumbSchema } from '../components/JsonLd'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('blog_posts').select('*').eq('status', 'published').order('ordering', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setPosts(data)
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
        name="Blog - Stellio Creative Labs"
        description="Strategy, design, and automation insights for startups building bold brands and smart platforms."
        url="https://stellio.com.au/blog"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://stellio.com.au' },
        { name: 'Blog', url: 'https://stellio.com.au/blog' },
      ]} />
      <div className="max-w-[1080px] mx-auto">
        <AnimatedSection>
          <span className="text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em]">Insights</span>
          <h1 className="font-[Satoshi] text-[2.5rem] md:text-[3rem] font-700 mt-3 mb-4">Blog</h1>
          <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed mb-12 max-w-[600px]">
            Strategy, design, and automation insights for startups building bold brands and smart platforms.
          </p>
        </AnimatedSection>

        {posts.length === 0 ? (
          <AnimatedSection>
            <p className="text-[#71717A]">No posts yet. Check back soon.</p>
          </AnimatedSection>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.06}>
                <Link to={`/blog/${post.slug}`} className="block group h-full">
                  <div className="flex flex-col h-full bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden transition-all hover:border-white/[0.12] hover:shadow-lg">
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#0E0E0E]">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${post.gradient || 'from-[#1a2a3a] to-[#0f1a24]'}`} />
                      )}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[0.66rem] font-600 text-[#FB5005] uppercase tracking-[0.1em]">{post.category}</span>
                    </div>
                    <div className="flex flex-col gap-2.5 p-5 md:p-6 flex-1">
                      <div className="flex items-center gap-2 text-[0.68rem] text-[#71717A]">
                        <span>{post.date}</span>
                        {post.read_time && <><span>·</span><span>{post.read_time}</span></>}
                      </div>
                      <h2 className="font-[Satoshi] text-[1.05rem] md:text-[1.15rem] font-700 text-[#FAFAFA] leading-snug group-hover:text-[#FB5005] transition-colors">{post.title}</h2>
                      <p className="text-[0.85rem] text-[#A1A1AA] leading-relaxed line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
