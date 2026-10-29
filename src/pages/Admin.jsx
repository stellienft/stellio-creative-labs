import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

// SVG Icon component (24x24, stroke-based, like WP dashicons)
const Icon = ({ name, size = 24 }) => {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    analytics: <><rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="6" width="4" height="15" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" /></>,
    audit: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    pages: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /></>,
    blog: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></>,
    projects: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></>,
    faqs: <><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    submissions: <><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 4 12 13 2 4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
    chevronDown: <><polyline points="6 9 12 15 18 9" /></>,
    check: <><polyline points="20 6 9 17 4 12" /></>,
    externalLink: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  }
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="shrink-0" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

// Sidebar sections with headers
const SIDEBAR_SECTIONS = [
  { items: [{ key: 'dashboard', label: 'Dashboard', icon: 'dashboard' }] },
  { header: 'Insights', items: [
    { key: 'analytics', label: 'Analytics', icon: 'analytics' },
    { key: 'siteAudits', label: 'Site Audits', icon: 'audit' },
  ] },
  { header: 'Content', items: [
    { key: 'pages', label: 'Pages', icon: 'pages' },
    { key: 'blog', label: 'Blog Posts', icon: 'blog' },
    { key: 'projects', label: 'Projects', icon: 'projects' },
    { key: 'faqs', label: 'FAQs', icon: 'faqs' },
  ]},
  { header: 'Management', items: [{ key: 'submissions', label: 'Submissions', icon: 'submissions' }] },
  { header: 'Appearance', items: [{ key: 'menus', label: 'Menus', icon: 'menu' }] },
  { header: 'System', items: [{ key: 'settings', label: 'Settings', icon: 'settings' }] },
]

// Status badge helper
const StatusBadge = ({ status }) => {
  const isPublished = status === 'published' || status === true
  const label = typeof status === 'boolean' ? (status ? 'Live' : 'Draft') : (status === 'published' ? 'Live' : status === 'new' ? 'New' : status === 'contacted' ? 'Contacted' : status === 'closed' ? 'Closed' : 'Draft')
  const dotColor = isPublished ? 'bg-green-400' : status === 'new' ? 'bg-[#FB5005]' : status === 'contacted' ? 'bg-blue-400' : 'bg-yellow-400'
  const textColor = isPublished ? 'text-green-400' : status === 'new' ? 'text-[#FB5005]' : status === 'contacted' ? 'text-blue-400' : 'text-yellow-400'
  const bgColor = isPublished ? 'bg-green-500/10' : status === 'new' ? 'bg-[#FB5005]/10' : status === 'contacted' ? 'bg-blue-500/10' : 'bg-yellow-500/10'
  return (
    <span className={`inline-flex items-center gap-1.5 text-[0.65rem] font-600 px-2 py-0.5 rounded ${bgColor} ${textColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {label}
    </span>
  )
}

// Metabox component
const Metabox = ({ title, children, defaultOpen = true, onToggle }) => {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = () => { setOpen(!open); onToggle && onToggle() }
  return (
    <div className="border border-white/[0.08] rounded-lg overflow-hidden mb-4">
      <button type="button" onClick={toggle} className="w-full flex items-center justify-between px-4 py-2.5 bg-[#0E0E0E] hover:bg-white/[0.02] transition-colors">
        <span className="text-[0.82rem] font-600 text-[#FAFAFA]">{title}</span>
        <span className="text-[#71717A] text-[0.7rem]">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="p-4 border-t border-white/[0.06]">{children}</div>}
    </div>
  )
}

export default function Admin() {
  const { session, signIn, signOut, loading: authLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Data state
  const [blogPosts, setBlogPosts] = useState([])
  const [projects, setProjects] = useState([])
  const [faqs, setFaqs] = useState([])
  const [pages, setPages] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [settings, setSettings] = useState({})
  const [viewingSubmission, setViewingSubmission] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)

  // Analytics state
  const [analytics, setAnalytics] = useState(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [analyticsRange, setAnalyticsRange] = useState('7d')

  // Site audits state
  const [auditsData, setAuditsData] = useState(null)
  const [auditsLoading, setAuditsLoading] = useState(false)
  const [auditsRange, setAuditsRange] = useState('30d')

  // Form state
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [blogForm, setBlogForm] = useState(emptyBlog())
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [projectForm, setProjectForm] = useState(emptyProject())
  const [showFaqForm, setShowFaqForm] = useState(false)
  const [editingFaq, setEditingFaq] = useState(null)
  const [faqForm, setFaqForm] = useState(emptyFaq())
  const [showPageForm, setShowPageForm] = useState(false)
  const [editingPage, setEditingPage] = useState(null)
  const [pageForm, setPageForm] = useState(emptyPage())
  const [pageSeoOpen, setPageSeoOpen] = useState(false)
  const [slugEditedManually, setSlugEditedManually] = useState(false)
  // Menu state
  const [menuItems, setMenuItems] = useState([])
  const [showMenuForm, setShowMenuForm] = useState(false)
  const [editingMenuItem, setEditingMenuItem] = useState(null)
  const [menuForm, setMenuForm] = useState({ label: '', href: '', is_external: false })
  const [settingsForm, setSettingsForm] = useState({})
  const [uploading, setUploading] = useState({})
  const [saving, setSaving] = useState(false)

  // WP-style additional state
  const [selectedItems, setSelectedItems] = useState({})
  const [quickEditId, setQuickEditId] = useState(null)
  const [quickEditForm, setQuickEditForm] = useState({})
  const [showNewDropdown, setShowNewDropdown] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [bulkAction, setBulkAction] = useState('')

  function emptyBlog() {
    return { slug: '', title: '', category: '', date: '', read_time: '3 min read', excerpt: '', gradient: 'from-[#1a2a3a] to-[#0f1a24]', content: '', cover_image: '', status: 'published', ordering: 0 }
  }

  function emptyProject() {
    return { name: '', tagline: '', description: '', metrics: '', gradient: 'from-[#1a2a3a] to-[#0f1a24]', image_url: '', year: '2026', published: true, ordering: 0 }
  }

  function emptyFaq() {
    return { question: '', answer: '', category: 'General', ordering: 0, status: 'published' }
  }

  function emptyPage() {
    return {
      slug: '', title: '', content: '', status: 'draft', ordering: 0,
      show_in_nav: false, nav_label: '',
      seo_title: '', seo_description: '', seo_canonical: '', seo_og_image: '',
      seo_noindex: false, seo_schema: '', template: 'standard',
    }
  }

  function slugify(str) {
    return (str || '')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  // Reserved slugs that collide with fixed routes - block these
  const RESERVED_SLUGS = ['', 'about', 'work', 'services', 'contact', 'blog', 'faq', 'ai-audit', 'admin', 'privacy', 'terms', 'logo-questionnaire', 'web-questionnaire', 'eofy', 'for', 'examples']

  useEffect(() => {
    if (session) fetchData()
  }, [session])

  const fetchData = async () => {
    setDataLoading(true)
    const [blogRes, projRes, faqRes, subRes, setRes, pageRes, menuRes] = await Promise.all([
      supabase.from('blog_posts').select('*').order('ordering', { ascending: false }),
      supabase.from('projects').select('*').order('ordering', { ascending: false }),
      supabase.from('faqs').select('*').order('ordering', { ascending: true }),
      supabase.from('submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('site_settings').select('key,value'),
      supabase.from('pages').select('*').order('ordering', { ascending: false }),
      supabase.from('menu_items').select('*').order('ordering', { ascending: false }),
    ])
    if (blogRes.data) setBlogPosts(blogRes.data)
    if (projRes.data) setProjects(projRes.data)
    if (faqRes.data) setFaqs(faqRes.data)
    if (subRes.data) setSubmissions(subRes.data)
    if (pageRes.data) setPages(pageRes.data)
    if (menuRes.data) setMenuItems(menuRes.data)
    if (setRes.data) {
      const obj = {}
      setRes.data.forEach(r => { obj[r.key] = r.value })
      setSettings(obj)
      setSettingsForm(obj)
    }
    // Auto-seed missing hardcoded pages so they appear in admin
    if (pageRes.data) {
      const existingSlugs = new Set(pageRes.data.map(p => p.slug))
      const HARDCODED_PAGES = [
        { slug: 'eofy', title: 'EOFY Brand Refresh', template: 'hardcoded', status: 'published', show_in_nav: false, ordering: 0, seo_title: 'EOFY Brand Refresh - Stellio Creative Labs', seo_description: 'Refresh your brand for the new financial year. Professional branding packages from $499 + GST.' },
        { slug: 'for/tradies', title: 'Website Design for Tradies', template: 'hardcoded', status: 'published', show_in_nav: false, ordering: 0, seo_title: 'Website Design for Tradies | Stellio Creative Labs', seo_description: 'Stop losing jobs to competitors with better websites. Professional branding and web design built for Australian tradies.' },
        { slug: 'for/cafes', title: 'Website Design for Cafes & Hospitality', template: 'hardcoded', status: 'published', show_in_nav: false, ordering: 0, seo_title: 'Website Design for Cafes & Hospitality | Stellio Creative Labs', seo_description: 'Your food speaks for itself. Make sure your website does too. Professional branding and web design for Australian cafes.' },
        { slug: 'for/real-estate', title: 'Website Design for Real Estate Agents', template: 'hardcoded', status: 'published', show_in_nav: false, ordering: 0, seo_title: 'Website Design for Real Estate Agents | Stellio Creative Labs', seo_description: 'List more properties. Sign more vendors. Professional branding and web design built for Australian real estate agents.' },
        { slug: 'for/fitness', title: 'Website Design for Fitness & Coaching', template: 'hardcoded', status: 'published', show_in_nav: false, ordering: 0, seo_title: 'Website Design for Fitness & Coaching | Stellio Creative Labs', seo_description: 'Get more clients and a brand that matches your energy. Professional web design for Australian fitness businesses.' },
        { slug: 'for/beauty', title: 'Website Design for Beauty & Salons', template: 'hardcoded', status: 'published', show_in_nav: false, ordering: 0, seo_title: 'Website Design for Beauty & Salons | Stellio Creative Labs', seo_description: 'Your work is stunning. Your website needs to match. Professional branding and web design for Australian beauty businesses.' },
        { slug: 'for/professionals', title: 'Website Design for Professional Services', template: 'hardcoded', status: 'published', show_in_nav: false, ordering: 0, seo_title: 'Website Design for Professional Services | Stellio Creative Labs', seo_description: 'Build trust before the first meeting. Professional branding and web design for Australian lawyers, accountants, and consultants.' },
        { slug: 'for/ecommerce', title: 'Website Design for E-Commerce Brands', template: 'hardcoded', status: 'published', show_in_nav: false, ordering: 0, seo_title: 'Website Design for E-Commerce Brands | Stellio Creative Labs', seo_description: 'Turn browsers into buyers. Professional branding and web design for Australian e-commerce and product brands.' },
        { slug: 'for/health', title: 'Website Design for Health Practitioners', template: 'hardcoded', status: 'published', show_in_nav: false, ordering: 0, seo_title: 'Website Design for Health Practitioners | Stellio Creative Labs', seo_description: 'Patients choose you based on trust. Professional branding and web design for Australian health clinics and practitioners.' },
      ]
      const missing = HARDCODED_PAGES.filter(p => !existingSlugs.has(p.slug))
      if (missing.length > 0) {
        const { data: inserted } = await supabase.from('pages').upsert(missing, { onConflict: 'slug' }).select()
        if (inserted) {
          // Refresh pages list
          const { data: refreshed } = await supabase.from('pages').select('*').order('ordering', { ascending: false })
          if (refreshed) setPages(refreshed)
        }
      }
    }
    setDataLoading(false)
  }

  // --- Analytics ---
  const fetchAnalytics = async (range = '7d') => {
    setAnalyticsLoading(true)
    const days = range === '30d' ? 30 : range === '7d' ? 7 : range === '90d' ? 90 : 1
    const since = new Date(Date.now() - days * 86400000).toISOString()

    const { data, error } = await supabase.from('page_views')
      .select('path, referrer, session_id, created_at, utm_source, utm_medium, utm_campaign, screen_width')
      .gte('created_at', since)
      .order('created_at', { ascending: false })

    if (error || !data) { setAnalyticsLoading(false); return }

    // Process analytics
    const totalViews = data.length
    const uniqueVisitors = new Set(data.map(v => v.session_id)).size

    // Page views by path
    const pageMap = {}
    data.forEach(v => { pageMap[v.path] = (pageMap[v.path] || 0) + 1 })
    const topPages = Object.entries(pageMap).sort((a, b) => b[1] - a[1]).slice(0, 15)

    // Referrers
    const refMap = {}
    data.forEach(v => {
      if (!v.referrer) return
      try {
        const host = new URL(v.referrer).hostname.replace(/^www\./, '')
        if (host && !host.includes('stellio.com.au') && !host.includes('cloudwaysapps.com')) {
          refMap[host] = (refMap[host] || 0) + 1
        }
      } catch {}
    })
    const topReferrers = Object.entries(refMap).sort((a, b) => b[1] - a[1]).slice(0, 10)

    // UTM campaigns
    const utmMap = {}
    data.forEach(v => {
      const key = [v.utm_source, v.utm_medium, v.utm_campaign].filter(Boolean).join(' / ')
      if (key) utmMap[key] = (utmMap[key] || 0) + 1
    })
    const utmCampaigns = Object.entries(utmMap).sort((a, b) => b[1] - a[1]).slice(0, 10)

    // Daily trend
    const dayMap = {}
    data.forEach(v => {
      const day = new Date(v.created_at).toLocaleDateString('en-AU', { day: '2-digit', month: 'short' })
      if (!dayMap[day]) dayMap[day] = { views: 0, visitors: new Set() }
      dayMap[day].views++
      dayMap[day].visitors.add(v.session_id)
    })
    const dailyTrend = Object.entries(dayMap).map(([date, d]) => ({
      date, views: d.views, visitors: d.visitors.size
    }))

    // Device breakdown
    const desktop = data.filter(v => v.screen_width >= 1024).length
    const tablet = data.filter(v => v.screen_width >= 640 && v.screen_width < 1024).length
    const mobile = data.filter(v => v.screen_width > 0 && v.screen_width < 640).length

    setAnalytics({ totalViews, uniqueVisitors, topPages, topReferrers, utmCampaigns, dailyTrend, desktop, tablet, mobile })
    setAnalyticsLoading(false)
  }

  useEffect(() => {
    if (session && activeTab === 'analytics') fetchAnalytics(analyticsRange)
  }, [session, activeTab, analyticsRange])

  // --- Site Audits analytics ---
  const fetchAudits = async (range) => {
    setAuditsLoading(true)
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90
    const since = new Date(Date.now() - days * 86400000).toISOString()
    const { data } = await supabase.from('site_audits').select('*').gte('created_at', since).order('created_at', { ascending: false })
    if (!data) { setAuditsLoading(false); return }

    const totalRuns = data.length
    const avgScore = totalRuns ? Math.round(data.reduce((s, a) => s + (a.overall_score || 0), 0) / totalRuns) : 0
    const avgDesign = totalRuns ? Math.round(data.reduce((s, a) => s + (a.design_score || 0), 0) / totalRuns) : 0
    const uniqueHosts = new Set(data.map(a => a.host)).size

    // Host frequency
    const hostMap = {}
    data.forEach(a => { hostMap[a.host] = (hostMap[a.host] || 0) + 1 })
    const topHosts = Object.entries(hostMap).sort((a, b) => b[1] - a[1]).slice(0, 10)

    // Score distribution buckets
    const buckets = { '0-39': 0, '40-59': 0, '60-79': 0, '80-100': 0 }
    data.forEach(a => {
      const s = a.overall_score ?? 0
      if (s < 40) buckets['0-39']++
      else if (s < 60) buckets['40-59']++
      else if (s < 80) buckets['60-79']++
      else buckets['80-100']++
    })

    // Daily trend
    const dayMap = {}
    data.forEach(a => {
      const day = new Date(a.created_at).toLocaleDateString('en-AU', { day: '2-digit', month: 'short' })
      dayMap[day] = (dayMap[day] || 0) + 1
    })
    const dailyTrend = Object.entries(dayMap).map(([date, count]) => ({ date, count }))

    // /site-audit page views from the analytics table (conversion context)
    const { data: pv } = await supabase.from('page_views').select('path').eq('path', '/site-audit').gte('created_at', since)
    const pageVisits = pv ? pv.length : 0

    // Email captures from the PDF lead gate
    const { data: pdfLeads } = await supabase.from('submissions').select('id').eq('service', 'Free Site Audit (PDF)').gte('created_at', since)
    const withEmails = pdfLeads ? pdfLeads.length : 0

    setAuditsData({ rows: data.slice(0, 50), totalRuns, avgScore, avgDesign, uniqueHosts, withEmails, topHosts, buckets, dailyTrend, pageVisits })
    setAuditsLoading(false)
  }

  useEffect(() => {
    if (session && activeTab === 'siteAudits') fetchAudits(auditsRange)
  }, [session, activeTab, auditsRange])

  // --- Auth ---
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    const { error } = await signIn(email, password)
    if (error) setLoginError(error.message || 'Invalid credentials.')
    setLoginLoading(false)
  }

  // --- Blog ---
  const saveBlogPost = async () => {
    setSaving(true)
    const payload = { ...blogForm, ordering: parseInt(blogForm.ordering) || 0 }
    let error
    if (editingBlog) {
      ({ error } = await supabase.from('blog_posts').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingBlog.id))
    } else {
      ({ error } = await supabase.from('blog_posts').insert(payload))
    }
    if (error) { alert('Error: ' + error.message); setSaving(false); return }
    setShowBlogForm(false); setEditingBlog(null); setBlogForm(emptyBlog()); fetchData(); setSaving(false)
  }

  const deleteBlogPost = async (id) => {
    if (!confirm('Delete this post?')) return
    await supabase.from('blog_posts').delete().eq('id', id); fetchData()
  }

  const toggleBlogStatus = async (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    await supabase.from('blog_posts').update({ status: newStatus }).eq('id', post.id); fetchData()
  }

  // --- Projects ---
  const saveProject = async () => {
    setSaving(true)
    const payload = { ...projectForm, ordering: parseInt(projectForm.ordering) || 0, published: projectForm.published }
    let error
    if (editingProject) {
      ({ error } = await supabase.from('projects').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingProject.id))
    } else {
      ({ error } = await supabase.from('projects').insert(payload))
    }
    if (error) { alert('Error: ' + error.message); setSaving(false); return }
    setShowProjectForm(false); setEditingProject(null); setProjectForm(emptyProject()); fetchData(); setSaving(false)
  }

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id); fetchData()
  }

  const toggleProjectPublished = async (proj) => {
    await supabase.from('projects').update({ published: !proj.published }).eq('id', proj.id); fetchData()
  }

  // --- FAQs ---
  const saveFaq = async () => {
    setSaving(true)
    const payload = { ...faqForm, ordering: parseInt(faqForm.ordering) || 0 }
    let error
    if (editingFaq) {
      ({ error } = await supabase.from('faqs').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingFaq.id))
    } else {
      ({ error } = await supabase.from('faqs').insert(payload))
    }
    if (error) { alert('Error: ' + error.message); setSaving(false); return }
    setShowFaqForm(false); setEditingFaq(null); setFaqForm(emptyFaq()); fetchData(); setSaving(false)
  }

  const deleteFaq = async (id) => {
    if (!confirm('Delete this FAQ?')) return
    await supabase.from('faqs').delete().eq('id', id); fetchData()
  }

  const toggleFaqStatus = async (faq) => {
    const newStatus = faq.status === 'published' ? 'draft' : 'published'
    await supabase.from('faqs').update({ status: newStatus }).eq('id', faq.id); fetchData()
  }

  // --- Pages ---
  const openPageEditor = (page) => {
    if (page) {
      setEditingPage(page)
      setPageForm({ ...emptyPage(), ...page })
      setSlugEditedManually(true)
    } else {
      setEditingPage(null)
      setPageForm(emptyPage())
      setSlugEditedManually(false)
    }
    setPageSeoOpen(false)
    setShowPageForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closePageEditor = () => {
    setShowPageForm(false)
    setEditingPage(null)
    setPageForm(emptyPage())
    setSlugEditedManually(false)
  }

  // Auto-slug from title unless the user has manually edited the slug
  const onPageTitleChange = (value) => {
    setPageForm(prev => ({
      ...prev,
      title: value,
      slug: (!slugEditedManually && !editingPage) ? slugify(value) : prev.slug,
    }))
  }

  const savePage = async () => {
    const slug = slugify(pageForm.slug)
    if (!pageForm.title.trim()) { alert('Title is required.'); return }
    if (!slug) { alert('A valid permalink (slug) is required.'); return }
    if (RESERVED_SLUGS.includes(slug)) {
      alert(`"/${slug}" is a reserved system route and cannot be used as a page permalink.`)
      return
    }
    // Slug collision check against other pages
    const clash = pages.find(p => p.slug === slug && (!editingPage || p.id !== editingPage.id))
    if (clash) { alert(`The permalink "/${slug}" is already used by another page.`); return }

    // Validate custom JSON-LD if provided
    if (pageForm.seo_schema && pageForm.seo_schema.trim()) {
      try { JSON.parse(pageForm.seo_schema) }
      catch (e) { alert('Custom Schema (JSON-LD) is not valid JSON: ' + e.message); return }
    }

    setSaving(true)
    const payload = {
      slug,
      title: pageForm.title,
      content: pageForm.content,
      status: pageForm.status,
      ordering: parseInt(pageForm.ordering) || 0,
      show_in_nav: !!pageForm.show_in_nav,
      nav_label: pageForm.nav_label || null,
      seo_title: pageForm.seo_title || null,
      seo_description: pageForm.seo_description || null,
      seo_canonical: pageForm.seo_canonical || null,
      seo_og_image: pageForm.seo_og_image || null,
      seo_noindex: !!pageForm.seo_noindex,
      seo_schema: pageForm.seo_schema || null,
      template: pageForm.template || 'standard',
    }
    let error
    if (editingPage) {
      ({ error } = await supabase.from('pages').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingPage.id))
    } else {
      ({ error } = await supabase.from('pages').insert(payload))
    }
    if (error) { alert('Error: ' + error.message); setSaving(false); return }
    closePageEditor(); fetchData(); setSaving(false)
  }

  const deletePage = async (id) => {
    if (!confirm('Delete this page? This cannot be undone.')) return
    await supabase.from('pages').delete().eq('id', id); fetchData()
  }

  const togglePageStatus = async (page) => {
    const newStatus = page.status === 'published' ? 'draft' : 'published'
    await supabase.from('pages').update({ status: newStatus }).eq('id', page.id); fetchData()
  }

  const uploadPageOgImage = async (file) => {
    setUploading({ ...uploading, page_og: true })
    const ext = file.name.split('.').pop()
    const filePath = `page-og/${slugify(pageForm.slug) || 'untitled'}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('site-assets').upload(filePath, file, { upsert: true })
    if (error) { alert('Upload error: ' + error.message); setUploading({ ...uploading, page_og: false }); return }
    const { data: urlData } = supabase.storage.from('site-assets').getPublicUrl(filePath)
    setPageForm(prev => ({ ...prev, seo_og_image: urlData.publicUrl }))
    setUploading({ ...uploading, page_og: false })
  }

  // --- Menu CRUD ---
  const saveMenuItem = async () => {
    if (!menuForm.label.trim() || !menuForm.href.trim()) { alert('Label and URL are required.'); return }
    const maxOrder = menuItems.length > 0 ? Math.max(...menuItems.map(m => m.ordering || 0)) : 0
    const payload = { label: menuForm.label.trim(), href: menuForm.href.trim(), is_external: menuForm.is_external, ordering: editingMenuItem ? editingMenuItem.ordering : maxOrder + 10 }
    if (editingMenuItem) {
      await supabase.from('menu_items').update(payload).eq('id', editingMenuItem.id)
    } else {
      await supabase.from('menu_items').insert(payload)
    }
    setShowMenuForm(false); setEditingMenuItem(null); setMenuForm({ label: '', href: '', is_external: false }); fetchData()
  }

  const deleteMenuItem = async (id) => {
    if (!confirm('Remove this menu item?')) return
    await supabase.from('menu_items').delete().eq('id', id); fetchData()
  }

  const moveMenuItem = async (item, direction) => {
    const sorted = [...menuItems].sort((a, b) => (b.ordering || 0) - (a.ordering || 0))
    const idx = sorted.findIndex(m => m.id === item.id)
    const swapWith = direction === 'up' ? sorted[idx - 1] : sorted[idx + 1]
    if (!swapWith) return
    await Promise.all([
      supabase.from('menu_items').update({ ordering: swapWith.ordering }).eq('id', item.id),
      supabase.from('menu_items').update({ ordering: item.ordering }).eq('id', swapWith.id),
    ])
    fetchData()
  }

  // --- Settings ---
  const saveSettings = async () => {
    setSaving(true)
    const updates = Object.entries(settingsForm).map(([key, value]) =>
      supabase.from('site_settings').update({ value, updated_at: new Date().toISOString() }).eq('key', key)
    )
    await Promise.all(updates)
    setSettings({ ...settingsForm }); setSaving(false)

    // Refresh server-side meta tags for social sharing previews
    try {
      await fetch(window.location.origin + '/refresh-meta.php', { method: 'POST' })
    } catch (e) { console.warn('Meta refresh failed:', e) }

    alert('Settings saved! Share previews updated.')
  }

  const uploadFile = async (file, settingKey, path) => {
    setUploading({ ...uploading, [settingKey]: true })
    const ext = file.name.split('.').pop()
    const filePath = `${path}/${settingKey}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('site-assets').upload(filePath, file, { upsert: true })
    if (error) { alert('Upload error: ' + error.message); setUploading({ ...uploading, [settingKey]: false }); return }
    const { data: urlData } = supabase.storage.from('site-assets').getPublicUrl(filePath)
    const url = urlData.publicUrl
    await supabase.from('site_settings').update({ value: url, updated_at: new Date().toISOString() }).eq('key', settingKey)
    setSettingsForm({ ...settingsForm, [settingKey]: url })
    setSettings({ ...settings, [settingKey]: url })
    setUploading({ ...uploading, [settingKey]: false })
  }

  const uploadCoverImage = async (file, formType) => {
    const key = formType === 'blog' ? 'cover_image' : 'image_url'
    const setter = formType === 'blog' ? setBlogForm : setProjectForm
    const current = formType === 'blog' ? blogForm : projectForm
    setUploading({ ...uploading, [key]: true })
    const ext = file.name.split('.').pop()
    const filePath = `${formType}-images/${current.slug || current.name || 'untitled'}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('site-assets').upload(filePath, file, { upsert: true })
    if (error) { alert('Upload error: ' + error.message); setUploading({ ...uploading, [key]: false }); return }
    const { data: urlData } = supabase.storage.from('site-assets').getPublicUrl(filePath)
    setter({ ...current, [key]: urlData.publicUrl })
    setUploading({ ...uploading, [key]: false })
  }

  // --- Submissions ---
  const updateStatus = async (id, status) => {
    await supabase.from('submissions').update({ status }).eq('id', id); fetchData()
  }

  const formatDate = (str) => {
    if (!str) return '-'
    return new Date(str).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  // --- WP-style Bulk Actions ---
  const toggleSelectAll = (items) => {
    const allSelected = items.length > 0 && items.every(item => selectedItems[item.id])
    const newSelected = { ...selectedItems }
    items.forEach(item => { newSelected[item.id] = !allSelected })
    setSelectedItems(newSelected)
  }

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const applyBulkAction = async () => {
    if (!bulkAction) return
    const ids = Object.entries(selectedItems).filter(([_, v]) => v).map(([k]) => k)
    if (ids.length === 0) return

    if (bulkAction === 'delete') {
      if (!confirm(`Delete ${ids.length} selected item(s)? This cannot be undone.`)) return
    }

    const tableMap = { blog: 'blog_posts', projects: 'projects', faqs: 'faqs', pages: 'pages' }
    const table = tableMap[activeTab]
    if (!table) return

    for (const id of ids) {
      if (bulkAction === 'delete') {
        await supabase.from(table).delete().eq('id', id)
      } else if (bulkAction === 'publish') {
        if (activeTab === 'projects') {
          await supabase.from(table).update({ published: true }).eq('id', id)
        } else {
          await supabase.from(table).update({ status: 'published' }).eq('id', id)
        }
      } else if (bulkAction === 'unpublish') {
        if (activeTab === 'projects') {
          await supabase.from(table).update({ published: false }).eq('id', id)
        } else {
          await supabase.from(table).update({ status: 'draft' }).eq('id', id)
        }
      }
    }
    setSelectedItems({})
    setBulkAction('')
    fetchData()
  }

  // --- WP-style Quick Edit ---
  const openQuickEdit = (item, type) => {
    setQuickEditId(item.id)
    if (type === 'blog') setQuickEditForm({ title: item.title, status: item.status, ordering: item.ordering })
    else if (type === 'projects') setQuickEditForm({ name: item.name, published: item.published, ordering: item.ordering })
    else if (type === 'faqs') setQuickEditForm({ question: item.question, status: item.status, ordering: item.ordering })
    else if (type === 'pages') setQuickEditForm({ title: item.title, status: item.status, ordering: item.ordering })
  }

  const saveQuickEdit = async () => {
    const tableMap = { blog: 'blog_posts', projects: 'projects', faqs: 'faqs', pages: 'pages' }
    const table = tableMap[activeTab]
    if (!table) return

    let payload = {}
    if (activeTab === 'blog') payload = { title: quickEditForm.title, status: quickEditForm.status, ordering: parseInt(quickEditForm.ordering) || 0 }
    else if (activeTab === 'projects') payload = { name: quickEditForm.name, published: quickEditForm.published, ordering: parseInt(quickEditForm.ordering) || 0 }
    else if (activeTab === 'faqs') payload = { question: quickEditForm.question, status: quickEditForm.status, ordering: parseInt(quickEditForm.ordering) || 0 }
    else if (activeTab === 'pages') payload = { title: quickEditForm.title, status: quickEditForm.status, ordering: parseInt(quickEditForm.ordering) || 0 }

    await supabase.from(table).update({ ...payload, updated_at: new Date().toISOString() }).eq('id', quickEditId)
    setQuickEditId(null)
    setQuickEditForm({})
    fetchData()
  }

  // Close dropdowns on click outside
  useEffect(() => {
    const handler = () => { setShowNewDropdown(false); setShowUserDropdown(false) }
    if (showNewDropdown || showUserDropdown) {
      document.addEventListener('click', handler)
      return () => document.removeEventListener('click', handler)
    }
  }, [showNewDropdown, showUserDropdown])

  // --- Login Screen ---
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#FB5005] border-t-transparent rounded-full animate-spin" /></div>

  if (!session) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-6">
        <div className="w-full max-w-[400px] bg-[#111111] border border-white/[0.06] rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="text-3xl mb-3">⚡</div>
            <h1 className="font-[Satoshi] text-[1.5rem] font-700 mb-2">Stellio Admin</h1>
            <p className="text-[0.85rem] text-[#71717A]">Sign in to manage your site</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FB5005] outline-none transition-colors" placeholder="hello@stellio.com.au" />
            </div>
            <div>
              <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FB5005] outline-none transition-colors" placeholder="••••••••" />
            </div>
            {loginError && <p className="text-[0.82rem] text-red-400">{loginError}</p>}
            <button type="submit" disabled={loginLoading} className="w-full py-3.5 rounded-lg bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all disabled:opacity-50">
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // --- Dashboard Layout ---
  const publishedPosts = blogPosts.filter(p => p.status === 'published').length
  const draftPosts = blogPosts.filter(p => p.status === 'draft').length
  const publishedProjects = projects.filter(p => p.published).length
  const newSubmissions = submissions.filter(s => s.status === 'new').length

  const userInitials = (session.user.email || 'A').substring(0, 2).toUpperCase()

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A]">
      {/* WP-style Top Admin Bar */}
      <header className="sticky top-0 z-50 h-12 bg-[#0E0E0E] border-b border-white/[0.06] flex items-center px-4 gap-3">
        {/* Left: Hamburger + Site name */}
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#A1A1AA] hover:text-[#FAFAFA]">
          <Icon name="menu" size={20} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[1.1rem]">⚡</span>
          <span className="font-[Satoshi] text-[0.88rem] font-700 text-[#FAFAFA] hidden sm:inline">Stellio Creative Labs</span>
        </div>

        <div className="flex-1" />

        {/* + New dropdown */}
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setShowNewDropdown(!showNewDropdown) }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FB5005] text-white text-[0.78rem] font-600 hover:bg-[#E55A1F] transition-all">
            <Icon name="plus" size={14} />
            <span className="hidden sm:inline">New</span>
          </button>
          {showNewDropdown && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-[#111111] border border-white/[0.1] rounded-lg shadow-xl py-1 z-50" onClick={e => e.stopPropagation()}>
              {[
                { label: 'New Page', action: () => { setActiveTab('pages'); openPageEditor(null) } },
                { label: 'New Post', action: () => { setActiveTab('blog'); setEditingBlog(null); setBlogForm(emptyBlog()); setShowBlogForm(true) } },
                { label: 'New Project', action: () => { setActiveTab('projects'); setEditingProject(null); setProjectForm(emptyProject()); setShowProjectForm(true) } },
                { label: 'New FAQ', action: () => { setActiveTab('faqs'); setEditingFaq(null); setFaqForm(emptyFaq()); setShowFaqForm(true) } },
              ].map(item => (
                <button key={item.label} onClick={() => { item.action(); setShowNewDropdown(false) }}
                  className="w-full text-left px-4 py-2 text-[0.82rem] text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/[0.04] transition-colors">
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification bell */}
        <button onClick={() => setActiveTab('submissions')} className="relative text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors p-1">
          <Icon name="bell" size={18} />
          {newSubmissions > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#FB5005] text-white text-[0.55rem] font-700 w-4 h-4 flex items-center justify-center rounded-full">{newSubmissions}</span>
          )}
        </button>

        {/* User avatar dropdown */}
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setShowUserDropdown(!showUserDropdown) }}
            className="flex items-center gap-2 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
            <span className="w-7 h-7 rounded-full bg-[#FB5005]/20 text-[#FB5005] text-[0.65rem] font-700 flex items-center justify-center">{userInitials}</span>
          </button>
          {showUserDropdown && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-[#111111] border border-white/[0.1] rounded-lg shadow-xl py-1 z-50" onClick={e => e.stopPropagation()}>
              <div className="px-4 py-2 border-b border-white/[0.06]">
                <p className="text-[0.82rem] text-[#FAFAFA] truncate">{session.user.email}</p>
              </div>
              <a href="/" target="_blank" rel="noopener" className="w-full flex items-center gap-2 px-4 py-2 text-[0.82rem] text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/[0.04] transition-colors">
                <Icon name="externalLink" size={14} /> View Site
              </a>
              <button onClick={() => { signOut(); setShowUserDropdown(false) }}
                className="w-full flex items-center gap-2 px-4 py-2 text-[0.82rem] text-[#A1A1AA] hover:text-red-400 hover:bg-white/[0.04] transition-colors">
                <Icon name="logout" size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Mobile overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-[#0E0E0E] border-r border-white/[0.06] flex flex-col transform transition-transform lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-4 border-b border-white/[0.06] lg:hidden">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <div>
                <h1 className="font-[Satoshi] text-[0.92rem] font-700 text-[#FAFAFA]">Stellio</h1>
                <p className="text-[0.6rem] text-[#71717A] uppercase tracking-[0.1em]">Admin Panel</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 py-2 overflow-y-auto">
            {SIDEBAR_SECTIONS.map((section, si) => (
              <div key={si}>
                {section.header && (
                  <div className="px-5 pt-4 pb-1">
                    <span className="text-[0.62rem] font-600 text-[#71717A] uppercase tracking-[0.1em]">{section.header}</span>
                  </div>
                )}
                {section.items.map(item => (
                  <button key={item.key} onClick={() => { setActiveTab(item.key); setSidebarOpen(false); setSelectedItems({}); setQuickEditId(null) }}
                    className={`w-full flex items-center gap-3 px-5 py-2.5 text-[0.85rem] font-500 transition-all border-l-[3px] ${
                      activeTab === item.key
                        ? 'bg-[#FB5005]/10 text-[#FB5005] border-[#FB5005]'
                        : 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/[0.02] border-transparent'
                    }`}>
                    <span className={activeTab === item.key ? 'text-[#FB5005]' : 'text-[#71717A]'}>
                      <Icon name={item.icon} size={20} />
                    </span>
                    {item.label}
                    {item.key === 'submissions' && newSubmissions > 0 && (
                      <span className="ml-auto bg-[#FB5005] text-white text-[0.55rem] font-700 px-1.5 py-0.5 rounded-full">{newSubmissions}</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="p-6 max-w-[1200px]">
            {dataLoading ? (
              <div className="flex items-center justify-center py-32"><div className="w-8 h-8 border-2 border-[#FB5005] border-t-transparent rounded-full animate-spin" /></div>
            ) : (
              <>
                {/* Dashboard */}
                {activeTab === 'dashboard' && (
                  <div>
                    {/* At a Glance widget */}
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg mb-6">
                      <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                        <h3 className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA]">At a Glance</h3>
                      </div>
                      <div className="p-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { label: 'Pages', value: pages.filter(p => p.status === 'published').length, color: 'border-blue-400', dot: 'bg-blue-400', icon: 'pages' },
                            { label: 'Posts', value: publishedPosts, color: 'border-green-400', dot: 'bg-green-400', icon: 'blog' },
                            { label: 'Projects', value: publishedProjects, color: 'border-purple-400', dot: 'bg-purple-400', icon: 'projects' },
                            { label: 'FAQs', value: faqs.filter(f => f.status === 'published').length, color: 'border-yellow-400', dot: 'bg-yellow-400', icon: 'faqs' },
                          ].map(stat => (
                            <div key={stat.label} className={`bg-[#0E0E0E] border-l-[3px] ${stat.color} rounded-lg p-4`}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`w-2 h-2 rounded-full ${stat.dot}`} />
                                <span className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em]">{stat.label}</span>
                              </div>
                              <p className="font-[Satoshi] text-[1.8rem] font-700 text-[#FAFAFA]">{stat.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Activity widget */}
                      <div className="md:col-span-2 bg-[#111111] border border-white/[0.08] rounded-lg">
                        <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                          <h3 className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA]">Activity</h3>
                        </div>
                        <div className="p-5">
                          {submissions.length === 0 ? (
                            <p className="text-[0.85rem] text-[#71717A]">No recent activity</p>
                          ) : submissions.slice(0, 8).map(s => (
                            <div key={s.id} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="w-7 h-7 rounded-full bg-[#FB5005]/10 text-[#FB5005] text-[0.6rem] font-700 flex items-center justify-center shrink-0">
                                  {(s.name || s.email || '?').substring(0, 1).toUpperCase()}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-[0.85rem] text-[#FAFAFA] truncate">{s.name || s.email}</p>
                                  <p className="text-[0.7rem] text-[#71717A]">{formatDate(s.created_at)}</p>
                                </div>
                              </div>
                              <StatusBadge status={s.status} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Draft widget */}
                      <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                        <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                          <h3 className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA]">Quick Draft</h3>
                        </div>
                        <div className="p-5 space-y-3">
                          <button onClick={() => { setActiveTab('blog'); setEditingBlog(null); setBlogForm(emptyBlog()); setShowBlogForm(true) }}
                            className="w-full text-left px-4 py-3 rounded-lg border border-white/[0.08] text-[0.85rem] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#FB5005]/30 transition-all">
                            + New Blog Post
                          </button>
                          <button onClick={() => openPageEditor(null)}
                            className="w-full text-left px-4 py-3 rounded-lg border border-white/[0.08] text-[0.85rem] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#FB5005]/30 transition-all">
                            + New Page
                          </button>
                          <button onClick={() => { setActiveTab('projects'); setEditingProject(null); setProjectForm(emptyProject()); setShowProjectForm(true) }}
                            className="w-full text-left px-4 py-3 rounded-lg border border-white/[0.08] text-[0.85rem] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#FB5005]/30 transition-all">
                            + New Project
                          </button>

                          <div className="pt-3 border-t border-white/[0.06]">
                            <h4 className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Recent Drafts</h4>
                            {blogPosts.filter(p => p.status === 'draft').slice(0, 3).map(p => (
                              <button key={p.id} onClick={() => { setActiveTab('blog'); setEditingBlog(p); setBlogForm({ ...p }); setShowBlogForm(true) }}
                                className="block w-full text-left py-1.5 text-[0.82rem] text-[#A1A1AA] hover:text-[#FB5005] truncate transition-colors">
                                {p.title}
                              </button>
                            ))}
                            {blogPosts.filter(p => p.status === 'draft').length === 0 && (
                              <p className="text-[0.78rem] text-[#71717A]">No drafts</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Posts summary */}
                    <div className="mt-6 bg-[#111111] border border-white/[0.08] rounded-lg">
                      <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                        <h3 className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA]">Recent Posts</h3>
                      </div>
                      <div className="p-5">
                        {blogPosts.slice(0, 5).map(p => (
                          <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                            <span className="text-[0.85rem] text-[#FAFAFA] truncate">{p.title}</span>
                            <StatusBadge status={p.status} />
                          </div>
                        ))}
                        {blogPosts.length === 0 && <p className="text-[0.85rem] text-[#71717A]">No posts yet</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Blog Posts */}
                {activeTab === 'blog' && (
                  <>
                    {/* Blog Form - Metabox layout */}
                    {showBlogForm && (
                      <div className="border border-[#FB5005]/30 rounded-lg mb-6 overflow-hidden">
                        <div className="px-5 py-3 border-b border-[#FB5005]/20 bg-[#0E0E0E]">
                          <h3 className="font-[Satoshi] text-[1rem] font-600 text-[#FAFAFA]">{editingBlog ? 'Edit Post' : 'New Post'}</h3>
                        </div>
                        <div className="p-5">
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Main content column */}
                            <div className="flex-1 min-w-0 space-y-4">
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Title</label>
                                <input value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                  className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FB5005] outline-none"
                                  placeholder="Post title" />
                              </div>
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Content (Markdown)</label>
                                <textarea value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                  rows={16} className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.85rem] focus:border-[#FB5005] outline-none font-mono leading-relaxed resize-y" />
                              </div>
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Excerpt</label>
                                <input value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                  className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  { key: 'slug', label: 'Slug' },
                                  { key: 'category', label: 'Category' },
                                  { key: 'date', label: 'Date', placeholder: 'June 2026' },
                                  { key: 'read_time', label: 'Read Time', placeholder: '4 min read' },
                                  { key: 'gradient', label: 'Gradient', placeholder: 'from-[#1a2a3a] to-[#0f1a24]' },
                                ].map(f => (
                                  <div key={f.key}>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">{f.label}</label>
                                    <input value={blogForm[f.key]} onChange={(e) => setBlogForm({ ...blogForm, [f.key]: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none"
                                      placeholder={f.placeholder || ''} />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Sidebar metaboxes */}
                            <div className="lg:w-[280px] shrink-0">
                              {/* Publish metabox */}
                              <Metabox title="Publish">
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Status</label>
                                    <select value={blogForm.status} onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none">
                                      <option value="published">Published</option>
                                      <option value="draft">Draft</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Ordering</label>
                                    <input type="number" value={blogForm.ordering} onChange={(e) => setBlogForm({ ...blogForm, ordering: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none" />
                                  </div>
                                  <div className="pt-2 space-y-2">
                                    <button onClick={saveBlogPost} disabled={saving}
                                      className="w-full px-5 py-2.5 rounded-lg bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all disabled:opacity-50">
                                      {saving ? 'Saving...' : editingBlog ? 'Update' : 'Publish'}
                                    </button>
                                    <button onClick={() => { setShowBlogForm(false); setEditingBlog(null); setBlogForm(emptyBlog()) }}
                                      className="w-full px-5 py-2.5 rounded-lg border border-white/[0.12] text-[0.82rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Cancel</button>
                                  </div>
                                </div>
                              </Metabox>

                              {/* Featured Image metabox */}
                              <Metabox title="Featured Image">
                                <div>
                                  <div className="flex gap-3 items-center">
                                    <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && uploadCoverImage(e.target.files[0], 'blog')}
                                      className="text-[0.82rem] text-[#A1A1AA] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-white/[0.1] file:bg-[#0E0E0E] file:text-[#A1A1AA] file:text-[0.78rem] file:cursor-pointer" />
                                    {uploading.cover_image && <span className="text-[0.78rem] text-[#FB5005]">Uploading...</span>}
                                  </div>
                                  {blogForm.cover_image && <img src={blogForm.cover_image} alt="Cover" className="mt-2 h-20 rounded-lg object-cover" />}
                                </div>
                              </Metabox>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bulk Actions + table header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#A1A1AA] text-[0.78rem] focus:border-[#FB5005] outline-none">
                          <option value="">Bulk Actions</option>
                          <option value="delete">Delete Selected</option>
                          <option value="publish">Publish Selected</option>
                          <option value="unpublish">Unpublish Selected</option>
                        </select>
                        <button onClick={applyBulkAction}
                          className="px-3 py-1.5 rounded-lg border border-white/[0.12] text-[0.78rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Apply</button>
                        <span className="text-[0.78rem] text-[#71717A] ml-2">{blogPosts.length} posts</span>
                      </div>
                      <button onClick={() => { setEditingBlog(null); setBlogForm(emptyBlog()); setShowBlogForm(true) }}
                        className="px-4 py-2 rounded-lg bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all">Add New</button>
                    </div>

                    {/* WP-style table */}
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg overflow-hidden">
                      <table className="w-full text-[0.85rem]">
                        <thead>
                          <tr className="border-b border-white/[0.08] bg-[#0E0E0E]">
                            <th className="w-10 px-3 py-2.5"><input type="checkbox" checked={blogPosts.length > 0 && blogPosts.every(p => selectedItems[p.id])} onChange={() => toggleSelectAll(blogPosts)} className="accent-[#FB5005] w-3.5 h-3.5" /></th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Title</th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5 hidden md:table-cell">Category</th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5 hidden md:table-cell">Date</th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Status</th>
                            <th className="text-right font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogPosts.map((post, i) => (
                            <React.Fragment key={post.id}>
                              <tr className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i % 2 === 1 ? 'bg-white/[0.01]' : ''}`}>
                                <td className="px-3 py-3"><input type="checkbox" checked={!!selectedItems[post.id]} onChange={() => toggleSelectItem(post.id)} className="accent-[#FB5005] w-3.5 h-3.5" /></td>
                                <td className="px-3 py-3">
                                  <span className="font-600 text-[#FAFAFA]">{post.title}</span>
                                  <span className="text-[0.72rem] text-[#71717A] ml-2">/{post.slug}</span>
                                </td>
                                <td className="px-3 py-3 text-[#A1A1AA] hidden md:table-cell">{post.category}</td>
                                <td className="px-3 py-3 text-[#A1A1AA] hidden md:table-cell">{post.date}</td>
                                <td className="px-3 py-3"><StatusBadge status={post.status} /></td>
                                <td className="px-3 py-3 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button onClick={() => { setEditingBlog(post); setBlogForm({ ...post }); setShowBlogForm(true) }}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FB5005] transition-colors">Edit</button>
                                    <button onClick={() => openQuickEdit(post, 'blog')}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FB5005] transition-colors">Quick Edit</button>
                                    <button onClick={() => toggleBlogStatus(post)}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">{post.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                                    <button onClick={() => deleteBlogPost(post.id)}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-red-400 transition-colors">Delete</button>
                                  </div>
                                </td>
                              </tr>
                              {quickEditId === post.id && (
                                <tr className="border-b border-white/[0.04] bg-[#0E0E0E]">
                                  <td colSpan="6" className="px-5 py-4">
                                    <div className="flex flex-wrap items-end gap-3">
                                      <div>
                                        <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Title</label>
                                        <input value={quickEditForm.title || ''} onChange={(e) => setQuickEditForm({ ...quickEditForm, title: e.target.value })}
                                          className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none w-48" />
                                      </div>
                                      <div>
                                        <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Status</label>
                                        <select value={quickEditForm.status || 'published'} onChange={(e) => setQuickEditForm({ ...quickEditForm, status: e.target.value })}
                                          className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none">
                                          <option value="published">Published</option>
                                          <option value="draft">Draft</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Ordering</label>
                                        <input type="number" value={quickEditForm.ordering || 0} onChange={(e) => setQuickEditForm({ ...quickEditForm, ordering: e.target.value })}
                                          className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none w-20" />
                                      </div>
                                      <button onClick={saveQuickEdit} className="px-3 py-1.5 rounded bg-[#FB5005] text-white text-[0.78rem] font-600 hover:bg-[#E55A1F] transition-all">Update</button>
                                      <button onClick={() => { setQuickEditId(null); setQuickEditForm({}) }} className="px-3 py-1.5 rounded border border-white/[0.12] text-[0.78rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Cancel</button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                          {blogPosts.length === 0 && (
                            <tr><td colSpan="6" className="px-5 py-8 text-center text-[#71717A]">No posts yet.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* Projects */}
                {activeTab === 'projects' && (
                  <>
                    {/* Project Form - Metabox layout */}
                    {showProjectForm && (
                      <div className="border border-[#FB5005]/30 rounded-lg mb-6 overflow-hidden">
                        <div className="px-5 py-3 border-b border-[#FB5005]/20 bg-[#0E0E0E]">
                          <h3 className="font-[Satoshi] text-[1rem] font-600 text-[#FAFAFA]">{editingProject ? 'Edit Project' : 'New Project'}</h3>
                        </div>
                        <div className="p-5">
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Main content column */}
                            <div className="flex-1 min-w-0 space-y-4">
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Name</label>
                                <input value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                                  className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FB5005] outline-none"
                                  placeholder="Project name" />
                              </div>
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Description</label>
                                <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                  rows={6} className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none resize-y" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  { key: 'tagline', label: 'Tagline' },
                                  { key: 'year', label: 'Year', placeholder: '2026' },
                                  { key: 'gradient', label: 'Gradient', placeholder: 'from-[#1a2a3a] to-[#0f1a24]' },
                                  { key: 'metrics', label: 'Metrics' },
                                ].map(f => (
                                  <div key={f.key}>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">{f.label}</label>
                                    <input value={projectForm[f.key]} onChange={(e) => setProjectForm({ ...projectForm, [f.key]: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none"
                                      placeholder={f.placeholder || ''} />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Sidebar metaboxes */}
                            <div className="lg:w-[280px] shrink-0">
                              {/* Publish metabox */}
                              <Metabox title="Publish">
                                <div className="space-y-3">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={projectForm.published} onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })}
                                      className="accent-[#FB5005] w-4 h-4" />
                                    <span className="text-[0.82rem] text-[#A1A1AA]">Published</span>
                                  </label>
                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Ordering</label>
                                    <input type="number" value={projectForm.ordering} onChange={(e) => setProjectForm({ ...projectForm, ordering: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none" />
                                  </div>
                                  <div className="pt-2 space-y-2">
                                    <button onClick={saveProject} disabled={saving}
                                      className="w-full px-5 py-2.5 rounded-lg bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all disabled:opacity-50">
                                      {saving ? 'Saving...' : editingProject ? 'Update' : 'Create Project'}
                                    </button>
                                    <button onClick={() => { setShowProjectForm(false); setEditingProject(null); setProjectForm(emptyProject()) }}
                                      className="w-full px-5 py-2.5 rounded-lg border border-white/[0.12] text-[0.82rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Cancel</button>
                                  </div>
                                </div>
                              </Metabox>

                              {/* Project Image metabox */}
                              <Metabox title="Project Image">
                                <div>
                                  <div className="flex gap-3 items-center">
                                    <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && uploadCoverImage(e.target.files[0], 'project')}
                                      className="text-[0.82rem] text-[#A1A1AA] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-white/[0.1] file:bg-[#0E0E0E] file:text-[#A1A1AA] file:text-[0.78rem] file:cursor-pointer" />
                                    {uploading.image_url && <span className="text-[0.78rem] text-[#FB5005]">Uploading...</span>}
                                  </div>
                                  {projectForm.image_url && <img src={projectForm.image_url} alt="Project" className="mt-2 h-20 rounded-lg object-cover" />}
                                </div>
                              </Metabox>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bulk Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#A1A1AA] text-[0.78rem] focus:border-[#FB5005] outline-none">
                          <option value="">Bulk Actions</option>
                          <option value="delete">Delete Selected</option>
                          <option value="publish">Publish Selected</option>
                          <option value="unpublish">Unpublish Selected</option>
                        </select>
                        <button onClick={applyBulkAction}
                          className="px-3 py-1.5 rounded-lg border border-white/[0.12] text-[0.78rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Apply</button>
                        <span className="text-[0.78rem] text-[#71717A] ml-2">{projects.length} projects</span>
                      </div>
                      <button onClick={() => { setEditingProject(null); setProjectForm(emptyProject()); setShowProjectForm(true) }}
                        className="px-4 py-2 rounded-lg bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all">Add New</button>
                    </div>

                    {/* WP-style table */}
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg overflow-hidden">
                      <table className="w-full text-[0.85rem]">
                        <thead>
                          <tr className="border-b border-white/[0.08] bg-[#0E0E0E]">
                            <th className="w-10 px-3 py-2.5"><input type="checkbox" checked={projects.length > 0 && projects.every(p => selectedItems[p.id])} onChange={() => toggleSelectAll(projects)} className="accent-[#FB5005] w-3.5 h-3.5" /></th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Name</th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5 hidden md:table-cell">Tagline</th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5 hidden md:table-cell">Year</th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Status</th>
                            <th className="text-right font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((proj, i) => (
                            <React.Fragment key={proj.id}>
                              <tr className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i % 2 === 1 ? 'bg-white/[0.01]' : ''}`}>
                                <td className="px-3 py-3"><input type="checkbox" checked={!!selectedItems[proj.id]} onChange={() => toggleSelectItem(proj.id)} className="accent-[#FB5005] w-3.5 h-3.5" /></td>
                                <td className="px-3 py-3 font-600 text-[#FAFAFA]">{proj.name}</td>
                                <td className="px-3 py-3 text-[#A1A1AA] hidden md:table-cell truncate max-w-[200px]">{proj.tagline}</td>
                                <td className="px-3 py-3 text-[#A1A1AA] hidden md:table-cell">{proj.year}</td>
                                <td className="px-3 py-3"><StatusBadge status={proj.published} /></td>
                                <td className="px-3 py-3 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button onClick={() => { setEditingProject(proj); setProjectForm({ ...proj, metrics: proj.metrics || '' }); setShowProjectForm(true) }}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FB5005] transition-colors">Edit</button>
                                    <button onClick={() => openQuickEdit(proj, 'projects')}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FB5005] transition-colors">Quick Edit</button>
                                    <button onClick={() => toggleProjectPublished(proj)}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">{proj.published ? 'Unpublish' : 'Publish'}</button>
                                    <button onClick={() => deleteProject(proj.id)}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-red-400 transition-colors">Delete</button>
                                  </div>
                                </td>
                              </tr>
                              {quickEditId === proj.id && (
                                <tr className="border-b border-white/[0.04] bg-[#0E0E0E]">
                                  <td colSpan="6" className="px-5 py-4">
                                    <div className="flex flex-wrap items-end gap-3">
                                      <div>
                                        <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Name</label>
                                        <input value={quickEditForm.name || ''} onChange={(e) => setQuickEditForm({ ...quickEditForm, name: e.target.value })}
                                          className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none w-48" />
                                      </div>
                                      <div>
                                        <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Published</label>
                                        <select value={quickEditForm.published ? 'true' : 'false'} onChange={(e) => setQuickEditForm({ ...quickEditForm, published: e.target.value === 'true' })}
                                          className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none">
                                          <option value="true">Published</option>
                                          <option value="false">Draft</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Ordering</label>
                                        <input type="number" value={quickEditForm.ordering || 0} onChange={(e) => setQuickEditForm({ ...quickEditForm, ordering: e.target.value })}
                                          className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none w-20" />
                                      </div>
                                      <button onClick={saveQuickEdit} className="px-3 py-1.5 rounded bg-[#FB5005] text-white text-[0.78rem] font-600 hover:bg-[#E55A1F] transition-all">Update</button>
                                      <button onClick={() => { setQuickEditId(null); setQuickEditForm({}) }} className="px-3 py-1.5 rounded border border-white/[0.12] text-[0.78rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Cancel</button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                          {projects.length === 0 && (
                            <tr><td colSpan="6" className="px-5 py-8 text-center text-[#71717A]">No projects yet.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* FAQs */}
                {activeTab === 'faqs' && (
                  <>
                    {/* FAQ Form - Metabox layout */}
                    {showFaqForm && (
                      <div className="border border-[#FB5005]/30 rounded-lg mb-6 overflow-hidden">
                        <div className="px-5 py-3 border-b border-[#FB5005]/20 bg-[#0E0E0E]">
                          <h3 className="font-[Satoshi] text-[1rem] font-600 text-[#FAFAFA]">{editingFaq ? 'Edit FAQ' : 'New FAQ'}</h3>
                        </div>
                        <div className="p-5">
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Main content column */}
                            <div className="flex-1 min-w-0 space-y-4">
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Question</label>
                                <input value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                                  className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.92rem] focus:border-[#FB5005] outline-none"
                                  placeholder="How long does a project take?" />
                              </div>
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Answer</label>
                                <textarea value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                                  rows={6} className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none resize-y" />
                              </div>
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Category</label>
                                <input value={faqForm.category} onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                                  className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none"
                                  placeholder="General" />
                              </div>
                            </div>

                            {/* Sidebar metaboxes */}
                            <div className="lg:w-[280px] shrink-0">
                              <Metabox title="Publish">
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Status</label>
                                    <select value={faqForm.status} onChange={(e) => setFaqForm({ ...faqForm, status: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none">
                                      <option value="published">Published</option>
                                      <option value="draft">Draft</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Ordering</label>
                                    <input type="number" value={faqForm.ordering} onChange={(e) => setFaqForm({ ...faqForm, ordering: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none" />
                                  </div>
                                  <div className="pt-2 space-y-2">
                                    <button onClick={saveFaq} disabled={saving}
                                      className="w-full px-5 py-2.5 rounded-lg bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all disabled:opacity-50">
                                      {saving ? 'Saving...' : editingFaq ? 'Update' : 'Create FAQ'}
                                    </button>
                                    <button onClick={() => { setShowFaqForm(false); setEditingFaq(null); setFaqForm(emptyFaq()) }}
                                      className="w-full px-5 py-2.5 rounded-lg border border-white/[0.12] text-[0.82rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Cancel</button>
                                  </div>
                                </div>
                              </Metabox>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bulk Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#A1A1AA] text-[0.78rem] focus:border-[#FB5005] outline-none">
                          <option value="">Bulk Actions</option>
                          <option value="delete">Delete Selected</option>
                          <option value="publish">Publish Selected</option>
                          <option value="unpublish">Unpublish Selected</option>
                        </select>
                        <button onClick={applyBulkAction}
                          className="px-3 py-1.5 rounded-lg border border-white/[0.12] text-[0.78rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Apply</button>
                        <span className="text-[0.78rem] text-[#71717A] ml-2">{faqs.length} FAQs</span>
                      </div>
                      <button onClick={() => { setEditingFaq(null); setFaqForm(emptyFaq()); setShowFaqForm(true) }}
                        className="px-4 py-2 rounded-lg bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all">Add New</button>
                    </div>

                    {/* WP-style table */}
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg overflow-hidden">
                      <table className="w-full text-[0.85rem]">
                        <thead>
                          <tr className="border-b border-white/[0.08] bg-[#0E0E0E]">
                            <th className="w-10 px-3 py-2.5"><input type="checkbox" checked={faqs.length > 0 && faqs.every(f => selectedItems[f.id])} onChange={() => toggleSelectAll(faqs)} className="accent-[#FB5005] w-3.5 h-3.5" /></th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Question</th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5 hidden md:table-cell">Category</th>
                            <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Status</th>
                            <th className="text-right font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faqs.map((faq, i) => (
                            <React.Fragment key={faq.id}>
                              <tr className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i % 2 === 1 ? 'bg-white/[0.01]' : ''}`}>
                                <td className="px-3 py-3"><input type="checkbox" checked={!!selectedItems[faq.id]} onChange={() => toggleSelectItem(faq.id)} className="accent-[#FB5005] w-3.5 h-3.5" /></td>
                                <td className="px-3 py-3">
                                  <span className="font-600 text-[#FAFAFA]">{faq.question}</span>
                                  <p className="text-[0.75rem] text-[#71717A] line-clamp-1 mt-0.5">{faq.answer}</p>
                                </td>
                                <td className="px-3 py-3 text-[#A1A1AA] hidden md:table-cell">{faq.category}</td>
                                <td className="px-3 py-3"><StatusBadge status={faq.status} /></td>
                                <td className="px-3 py-3 text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    <button onClick={() => { setEditingFaq(faq); setFaqForm({ ...faq }); setShowFaqForm(true) }}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FB5005] transition-colors">Edit</button>
                                    <button onClick={() => openQuickEdit(faq, 'faqs')}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FB5005] transition-colors">Quick Edit</button>
                                    <button onClick={() => toggleFaqStatus(faq)}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">{faq.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                                    <button onClick={() => deleteFaq(faq.id)}
                                      className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-red-400 transition-colors">Delete</button>
                                  </div>
                                </td>
                              </tr>
                              {quickEditId === faq.id && (
                                <tr className="border-b border-white/[0.04] bg-[#0E0E0E]">
                                  <td colSpan="5" className="px-5 py-4">
                                    <div className="flex flex-wrap items-end gap-3">
                                      <div>
                                        <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Question</label>
                                        <input value={quickEditForm.question || ''} onChange={(e) => setQuickEditForm({ ...quickEditForm, question: e.target.value })}
                                          className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none w-64" />
                                      </div>
                                      <div>
                                        <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Status</label>
                                        <select value={quickEditForm.status || 'published'} onChange={(e) => setQuickEditForm({ ...quickEditForm, status: e.target.value })}
                                          className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none">
                                          <option value="published">Published</option>
                                          <option value="draft">Draft</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Ordering</label>
                                        <input type="number" value={quickEditForm.ordering || 0} onChange={(e) => setQuickEditForm({ ...quickEditForm, ordering: e.target.value })}
                                          className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none w-20" />
                                      </div>
                                      <button onClick={saveQuickEdit} className="px-3 py-1.5 rounded bg-[#FB5005] text-white text-[0.78rem] font-600 hover:bg-[#E55A1F] transition-all">Update</button>
                                      <button onClick={() => { setQuickEditId(null); setQuickEditForm({}) }} className="px-3 py-1.5 rounded border border-white/[0.12] text-[0.78rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Cancel</button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                          {faqs.length === 0 && (
                            <tr><td colSpan="5" className="px-5 py-8 text-center text-[#71717A]">No FAQs yet.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* Pages */}
                {activeTab === 'pages' && (
                  <>
                    {/* Page Form - Metabox layout */}
                    {showPageForm && (
                      <div className="border border-[#FB5005]/30 rounded-lg mb-6 overflow-hidden">
                        <div className="px-5 py-3 border-b border-[#FB5005]/20 bg-[#0E0E0E]">
                          <h3 className="font-[Satoshi] text-[1rem] font-600 text-[#FAFAFA]">{editingPage ? 'Edit Page' : 'Add New Page'}</h3>
                        </div>
                        <div className="p-5">
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Main content column */}
                            <div className="flex-1 min-w-0 space-y-4">
                              {/* Title */}
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Title</label>
                                <input value={pageForm.title} onChange={(e) => onPageTitleChange(e.target.value)}
                                  className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.95rem] focus:border-[#FB5005] outline-none"
                                  placeholder="Page title" />
                              </div>

                              {/* Permalink */}
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Permalink</label>
                                <div className="flex items-center gap-2 bg-[#0E0E0E] border border-white/[0.08] rounded-lg px-4 py-2.5 focus-within:border-[#FB5005]">
                                  <span className="text-[0.85rem] text-[#71717A] whitespace-nowrap">stellio.com.au/</span>
                                  <input value={pageForm.slug}
                                    onChange={(e) => { setSlugEditedManually(true); setPageForm({ ...pageForm, slug: e.target.value }) }}
                                    onBlur={(e) => setPageForm(prev => ({ ...prev, slug: slugify(e.target.value) }))}
                                    className="flex-1 bg-transparent text-[#FAFAFA] text-[0.85rem] outline-none min-w-0"
                                    placeholder="page-slug" />
                                </div>
                                <p className="text-[0.7rem] text-[#71717A] mt-1">Auto-generated from the title. Edit to customise. Lowercase, hyphens only.</p>
                              </div>

                              {/* Content */}
                              <div>
                                <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Content (Markdown)</label>
                                <textarea value={pageForm.content} onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                                  rows={16} className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.85rem] focus:border-[#FB5005] outline-none font-mono leading-relaxed resize-y"
                                  placeholder={'# Heading\n## Subheading\nParagraph text. Use **bold**.\n- List item'} />
                                <p className="text-[0.7rem] text-[#71717A] mt-1"># H1, ## H2, ### H3, - list item, **bold paragraph**. Blank line for spacing.</p>
                              </div>

                              {/* Nav toggle */}
                              <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-lg p-4">
                                <label className="flex items-center gap-2 cursor-pointer mb-2">
                                  <input type="checkbox" checked={pageForm.show_in_nav} onChange={(e) => setPageForm({ ...pageForm, show_in_nav: e.target.checked })}
                                    className="w-4 h-4 accent-[#FB5005]" />
                                  <span className="text-[0.85rem] font-600 text-[#FAFAFA]">Show in navigation menu</span>
                                </label>
                                {pageForm.show_in_nav && (
                                  <input value={pageForm.nav_label} onChange={(e) => setPageForm({ ...pageForm, nav_label: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.85rem] focus:border-[#FB5005] outline-none"
                                    placeholder="Nav label (defaults to page title)" />
                                )}
                                <p className="text-[0.68rem] text-[#71717A] mt-2">Note: nav rendering reads this flag. Flagged pages are stored; wiring the navbar to read them is a follow-up step.</p>
                              </div>
                            </div>

                            {/* Sidebar metaboxes */}
                            <div className="lg:w-[280px] shrink-0">
                              {/* Publish metabox */}
                              <Metabox title="Publish">
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Status</label>
                                    <select value={pageForm.status} onChange={(e) => setPageForm({ ...pageForm, status: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none">
                                      <option value="published">Published</option>
                                      <option value="draft">Draft</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Ordering</label>
                                    <input type="number" value={pageForm.ordering} onChange={(e) => setPageForm({ ...pageForm, ordering: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none" />
                                  </div>
                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Template</label>
                                    <select value={pageForm.template} onChange={(e) => setPageForm({ ...pageForm, template: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none">
                                      <option value="standard">Standard</option>
                                      <option value="hardcoded">Hardcoded (React Route)</option>
                                    </select>
                                  </div>
                                  <div className="pt-2 space-y-2">
                                    <button onClick={savePage} disabled={saving}
                                      className="w-full px-5 py-2.5 rounded-lg bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all disabled:opacity-50">
                                      {saving ? 'Saving...' : editingPage ? 'Update Page' : 'Publish Page'}
                                    </button>
                                    {editingPage && pageForm.status === 'published' && (
                                      <a href={`/${slugify(pageForm.slug)}`} target="_blank" rel="noopener noreferrer"
                                        className="block text-center px-5 py-2.5 rounded-lg border border-white/[0.12] text-[0.82rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">View Live &nearr;</a>
                                    )}
                                    <button onClick={closePageEditor}
                                      className="w-full px-5 py-2.5 rounded-lg border border-white/[0.12] text-[0.82rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Cancel</button>
                                  </div>
                                </div>
                              </Metabox>

                              {/* SEO metabox */}
                              <Metabox title="SEO & Social" defaultOpen={pageSeoOpen} onToggle={() => setPageSeoOpen(!pageSeoOpen)}>
                                <div className="space-y-3">
                                  {/* Google preview */}
                                  <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-lg p-3">
                                    <p className="text-[0.6rem] uppercase tracking-[0.1em] text-[#71717A] mb-1.5">Search Result Preview</p>
                                    <p className="text-[#A1A1AA] text-[0.68rem]">stellio.com.au &rsaquo; {slugify(pageForm.slug) || 'page-slug'}</p>
                                    <p className="text-[#5b9dff] text-[0.95rem] leading-tight truncate">{pageForm.seo_title || pageForm.title || 'Page Title'} | Stellio Creative Labs</p>
                                    <p className="text-[#A1A1AA] text-[0.75rem] leading-snug line-clamp-2">{pageForm.seo_description || 'Add an SEO description to control how this page appears in search results.'}</p>
                                  </div>

                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">SEO Title <span className="normal-case text-[#52525B]">(blank = page title)</span></label>
                                    <input value={pageForm.seo_title} onChange={(e) => setPageForm({ ...pageForm, seo_title: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none" />
                                    <p className={`text-[0.68rem] mt-1 ${(pageForm.seo_title || '').length > 60 ? 'text-yellow-400' : 'text-[#71717A]'}`}>{(pageForm.seo_title || '').length}/60 chars</p>
                                  </div>

                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Meta Description</label>
                                    <textarea value={pageForm.seo_description} onChange={(e) => setPageForm({ ...pageForm, seo_description: e.target.value })}
                                      rows={2} className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.85rem] focus:border-[#FB5005] outline-none resize-y" />
                                    <p className={`text-[0.68rem] mt-1 ${(pageForm.seo_description || '').length > 160 ? 'text-yellow-400' : 'text-[#71717A]'}`}>{(pageForm.seo_description || '').length}/160 chars</p>
                                  </div>

                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Canonical URL <span className="normal-case text-[#52525B]">(blank = self)</span></label>
                                    <input value={pageForm.seo_canonical} onChange={(e) => setPageForm({ ...pageForm, seo_canonical: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.85rem] focus:border-[#FB5005] outline-none"
                                      placeholder="https://stellio.com.au/..." />
                                  </div>

                                  <div>
                                    <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Custom Schema (JSON-LD) <span className="normal-case text-[#52525B]">(optional)</span></label>
                                    <textarea value={pageForm.seo_schema} onChange={(e) => setPageForm({ ...pageForm, seo_schema: e.target.value })}
                                      rows={3} className="w-full px-4 py-2.5 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.8rem] focus:border-[#FB5005] outline-none font-mono resize-y"
                                      placeholder='{"@context":"https://schema.org",...}' />
                                    <p className="text-[0.68rem] text-[#71717A] mt-1">Leave blank for auto-generated WebPage schema.</p>
                                  </div>

                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={pageForm.seo_noindex} onChange={(e) => setPageForm({ ...pageForm, seo_noindex: e.target.checked })}
                                      className="w-4 h-4 accent-[#FB5005]" />
                                    <span className="text-[0.78rem] text-[#A1A1AA]">Discourage search engines (noindex)</span>
                                  </label>
                                </div>
                              </Metabox>

                              {/* Featured Image metabox */}
                              <Metabox title="Featured Image">
                                <div>
                                  <div className="flex gap-3 items-center">
                                    <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && uploadPageOgImage(e.target.files[0])}
                                      className="text-[0.82rem] text-[#A1A1AA] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-white/[0.1] file:bg-[#0E0E0E] file:text-[#A1A1AA] file:text-[0.78rem] file:cursor-pointer" />
                                    {uploading.page_og && <span className="text-[0.78rem] text-[#FB5005]">Uploading...</span>}
                                  </div>
                                  <input value={pageForm.seo_og_image} onChange={(e) => setPageForm({ ...pageForm, seo_og_image: e.target.value })}
                                    className="w-full mt-2 px-4 py-2 rounded-lg bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.8rem] focus:border-[#FB5005] outline-none"
                                    placeholder="Or paste an image URL" />
                                  {pageForm.seo_og_image && <img src={pageForm.seo_og_image} alt="OG" className="mt-2 h-20 rounded-lg object-cover border border-white/[0.06]" />}
                                </div>
                              </Metabox>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bulk Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#A1A1AA] text-[0.78rem] focus:border-[#FB5005] outline-none">
                          <option value="">Bulk Actions</option>
                          <option value="delete">Delete Selected</option>
                          <option value="publish">Publish Selected</option>
                          <option value="unpublish">Unpublish Selected</option>
                        </select>
                        <button onClick={applyBulkAction}
                          className="px-3 py-1.5 rounded-lg border border-white/[0.12] text-[0.78rem] font-500 text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Apply</button>
                        <span className="text-[0.78rem] text-[#71717A] ml-2">{pages.length} page{pages.length !== 1 ? 's' : ''}</span>
                      </div>
                      <button onClick={() => openPageEditor(null)}
                        className="px-4 py-2 rounded-lg bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all">Add New</button>
                    </div>

                    {/* Pages list - WP table */}
                    {pages.length === 0 && !showPageForm ? (
                      <div className="bg-[#111111] border border-white/[0.08] rounded-lg p-12 text-center">
                        <p className="text-[0.9rem] text-[#71717A] mb-4">No pages yet. Create your first page.</p>
                        <button onClick={() => openPageEditor(null)}
                          className="px-4 py-2 rounded-lg bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all">Add New Page</button>
                      </div>
                    ) : pages.length > 0 && (
                      <div className="bg-[#111111] border border-white/[0.08] rounded-lg overflow-hidden">
                        <table className="w-full text-[0.85rem]">
                          <thead>
                            <tr className="border-b border-white/[0.08] bg-[#0E0E0E]">
                              <th className="w-10 px-3 py-2.5"><input type="checkbox" checked={pages.length > 0 && pages.every(p => selectedItems[p.id])} onChange={() => toggleSelectAll(pages)} className="accent-[#FB5005] w-3.5 h-3.5" /></th>
                              <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Title</th>
                              <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5 hidden md:table-cell">Permalink</th>
                              <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Status</th>
                              <th className="text-right font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-3 py-2.5">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pages.map((page, i) => (
                              <React.Fragment key={page.id}>
                                <tr className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i % 2 === 1 ? 'bg-white/[0.01]' : ''}`}>
                                  <td className="px-3 py-3"><input type="checkbox" checked={!!selectedItems[page.id]} onChange={() => toggleSelectItem(page.id)} className="accent-[#FB5005] w-3.5 h-3.5" /></td>
                                  <td className="px-3 py-3">
                                    <span className="font-600 text-[#FAFAFA]">{page.title}</span>
                                    {page.show_in_nav && <span className="ml-2 text-[0.6rem] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">NAV</span>}
                                  </td>
                                  <td className="px-3 py-3 hidden md:table-cell">
                                    <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="text-[#71717A] hover:text-[#FB5005] transition-colors">/{page.slug}</a>
                                  </td>
                                  <td className="px-3 py-3"><StatusBadge status={page.status} /></td>
                                  <td className="px-3 py-3 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                      <button onClick={() => openPageEditor(page)}
                                        className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FB5005] transition-colors">Edit</button>
                                      <button onClick={() => openQuickEdit(page, 'pages')}
                                        className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-[#FB5005] transition-colors">Quick Edit</button>
                                      <button onClick={() => deletePage(page.id)}
                                        className="px-2 py-1 text-[0.72rem] text-[#A1A1AA] hover:text-red-400 transition-colors">Delete</button>
                                    </div>
                                  </td>
                                </tr>
                                {quickEditId === page.id && (
                                  <tr className="border-b border-white/[0.04] bg-[#0E0E0E]">
                                    <td colSpan="5" className="px-5 py-4">
                                      <div className="flex flex-wrap items-end gap-3">
                                        <div>
                                          <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Title</label>
                                          <input value={quickEditForm.title || ''} onChange={(e) => setQuickEditForm({ ...quickEditForm, title: e.target.value })}
                                            className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none w-48" />
                                        </div>
                                        <div>
                                          <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Status</label>
                                          <select value={quickEditForm.status || 'published'} onChange={(e) => setQuickEditForm({ ...quickEditForm, status: e.target.value })}
                                            className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none">
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                          </select>
                                        </div>
                                        <div>
                                          <label className="block text-[0.65rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Ordering</label>
                                          <input type="number" value={quickEditForm.ordering || 0} onChange={(e) => setQuickEditForm({ ...quickEditForm, ordering: e.target.value })}
                                            className="px-3 py-1.5 rounded bg-[#0A0A0A] border border-white/[0.08] text-[#FAFAFA] text-[0.82rem] focus:border-[#FB5005] outline-none w-20" />
                                        </div>
                                        <button onClick={saveQuickEdit} className="px-3 py-1.5 rounded bg-[#FB5005] text-white text-[0.78rem] font-600 hover:bg-[#E55A1F] transition-all">Update</button>
                                        <button onClick={() => { setQuickEditId(null); setQuickEditForm({}) }} className="px-3 py-1.5 rounded border border-white/[0.12] text-[0.78rem] text-[#A1A1AA] hover:text-[#FAFAFA] transition-all">Cancel</button>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}

                {/* Submissions */}
                {activeTab === 'submissions' && (
                  submissions.length === 0 ? (
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg p-12 text-center">
                      <p className="text-[#71717A]">No submissions yet.</p>
                    </div>
                  ) : (
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg overflow-hidden">
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-[0.85rem]">
                          <thead>
                            <tr className="border-b border-white/[0.08] bg-[#0E0E0E]">
                              <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-5 py-2.5">Date</th>
                              <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-5 py-2.5">Name</th>
                              <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-5 py-2.5">Email</th>
                              <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-5 py-2.5">Service</th>
                              <th className="text-left font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-5 py-2.5">Status</th>
                              <th className="text-right font-600 text-[0.68rem] text-[#71717A] uppercase tracking-[0.05em] px-5 py-2.5">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {submissions.map((sub, i) => (
                              <tr key={sub.id} className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer ${i % 2 === 1 ? 'bg-white/[0.01]' : ''}`} onClick={() => setViewingSubmission(sub)}>
                                <td className="px-5 py-3.5 text-[#A1A1AA] whitespace-nowrap">{formatDate(sub.created_at)}</td>
                                <td className="px-5 py-3.5 text-[#FAFAFA] font-500">{sub.name || '-'}</td>
                                <td className="px-5 py-3.5"><a href={`mailto:${sub.email}`} className="text-[#FB5005] hover:underline" onClick={e => e.stopPropagation()}>{sub.email}</a></td>
                                <td className="px-5 py-3.5 text-[#A1A1AA]">{sub.service || '-'}</td>
                                <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                                  <select value={sub.status || 'new'} onChange={(e) => updateStatus(sub.id, e.target.value)}
                                    className={`px-2 py-1 rounded text-[0.75rem] font-500 outline-none cursor-pointer ${
                                      sub.status === 'new' ? 'bg-[#FB5005]/10 text-[#FB5005] border border-[#FB5005]/20' :
                                      sub.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                      'bg-green-500/10 text-green-400 border border-green-500/20'
                                    }`}>
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="closed">Closed</option>
                                  </select>
                                </td>
                                <td className="px-5 py-3.5 text-right">
                                  <button onClick={(e) => { e.stopPropagation(); setViewingSubmission(sub) }} className="text-[0.75rem] font-600 text-[#FB5005] hover:text-[#FAFAFA] transition-colors">View</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="md:hidden">
                        {submissions.map(sub => (
                          <div key={sub.id} className="border-b border-white/[0.04] p-5 cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={() => setViewingSubmission(sub)}>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <h3 className="text-[0.92rem] font-600 text-[#FAFAFA]">{sub.name || 'No name'}</h3>
                                <a href={`mailto:${sub.email}`} className="text-[0.82rem] text-[#FB5005]" onClick={e => e.stopPropagation()}>{sub.email}</a>
                              </div>
                              <select value={sub.status || 'new'} onChange={(e) => updateStatus(sub.id, e.target.value)} onClick={e => e.stopPropagation()}
                                className={`px-2 py-1 rounded text-[0.7rem] font-500 outline-none cursor-pointer ${
                                  sub.status === 'new' ? 'bg-[#FB5005]/10 text-[#FB5005] border border-[#FB5005]/20' :
                                  sub.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                  'bg-green-500/10 text-green-400 border border-green-500/20'
                                }`}>
                                <option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option>
                              </select>
                            </div>
                            <p className="text-[0.75rem] text-[#71717A] mb-2">{formatDate(sub.created_at)} · {sub.service || 'No service'}</p>
                            {sub.message && <p className="text-[0.82rem] text-[#A1A1AA] leading-relaxed line-clamp-3">{sub.message}</p>}
                            <button onClick={(e) => { e.stopPropagation(); setViewingSubmission(sub) }} className="mt-2 text-[0.75rem] font-600 text-[#FB5005]">View Full Details</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}

                {/* Submission Detail Modal */}
                {viewingSubmission && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setViewingSubmission(null)}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div className="relative bg-[#111111] border border-white/[0.08] rounded-2xl w-full max-w-[640px] max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                      {/* Modal Header */}
                      <div className="sticky top-0 bg-[#111111] border-b border-white/[0.06] px-6 py-4 flex items-center justify-between z-10">
                        <div>
                          <h2 className="font-[Satoshi] text-[1.1rem] font-700 text-[#FAFAFA]">{viewingSubmission.name || 'No name'}</h2>
                          <p className="text-[0.75rem] text-[#71717A]">{viewingSubmission.service || 'General'} · {formatDate(viewingSubmission.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <select value={viewingSubmission.status || 'new'} onChange={(e) => { updateStatus(viewingSubmission.id, e.target.value); setViewingSubmission(s => ({...s, status: e.target.value})) }}
                            className={`px-2.5 py-1 rounded text-[0.75rem] font-500 outline-none cursor-pointer ${
                              viewingSubmission.status === 'new' ? 'bg-[#FB5005]/10 text-[#FB5005] border border-[#FB5005]/20' :
                              viewingSubmission.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                              'bg-green-500/10 text-green-400 border border-green-500/20'
                            }`}>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                          <button onClick={() => setViewingSubmission(null)} className="text-[#71717A] hover:text-[#FAFAFA] transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </div>
                      </div>
                      {/* Modal Body */}
                      <div className="px-6 py-5 space-y-5">
                        {/* Contact Info */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[0.68rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Email</p>
                            <a href={`mailto:${viewingSubmission.email}`} className="text-[0.88rem] text-[#FB5005] hover:underline">{viewingSubmission.email || '-'}</a>
                          </div>
                          {viewingSubmission.company && (
                            <div>
                              <p className="text-[0.68rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Company</p>
                              <p className="text-[0.88rem] text-[#FAFAFA]">{viewingSubmission.company}</p>
                            </div>
                          )}
                        </div>
                        {/* Message */}
                        {viewingSubmission.message && (
                          <div>
                            <p className="text-[0.68rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Message</p>
                            <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl p-4">
                              {viewingSubmission.message.split('\n').map((line, i) => {
                                const trimmed = line.trim()
                                if (!trimmed) return <div key={i} className="h-2" />
                                if (trimmed.startsWith('---') && trimmed.endsWith('---')) return <h4 key={i} className="font-[Satoshi] text-[0.88rem] font-700 text-[#FAFAFA] mt-3 mb-1">{trimmed.replace(/^-+|-+$/g, '').trim()}</h4>
                                if (trimmed.includes(':')) {
                                  const [label, ...rest] = trimmed.split(':')
                                  return <p key={i} className="text-[0.82rem] leading-relaxed"><span className="text-[#71717A]">{label}:</span><span className="text-[#A1A1AA]">{rest.join(':')}</span></p>
                                }
                                return <p key={i} className="text-[0.82rem] text-[#A1A1AA] leading-relaxed">{trimmed}</p>
                              })}
                            </div>
                          </div>
                        )}
                        {/* Quick Actions */}
                        <div className="flex gap-3 pt-2">
                          <a href={`mailto:${viewingSubmission.email}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FB5005] text-white text-[0.82rem] font-600 hover:bg-[#E55A1F] transition-all">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            Reply via Email
                          </a>
                          <button onClick={() => setViewingSubmission(null)} className="px-4 py-2.5 rounded-xl border border-white/[0.12] text-[#A1A1AA] text-[0.82rem] font-600 hover:text-[#FAFAFA] hover:border-white/[0.2] transition-all">
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Site Audits */}
                {activeTab === 'siteAudits' && (
                  <div>
                    {/* Range selector */}
                    <div className="flex items-center gap-2 mb-6">
                      {['7d', '30d', '90d'].map(r => (
                        <button key={r} onClick={() => setAuditsRange(r)}
                          className={`px-3 py-1.5 rounded-lg text-[0.78rem] font-600 transition-all ${
                            auditsRange === r ? 'bg-[#FB5005] text-white' : 'bg-[#111111] text-[#A1A1AA] border border-white/[0.08] hover:text-[#FAFAFA]'
                          }`}>
                          {r.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {auditsLoading ? (
                      <div className="flex items-center justify-center py-32"><div className="w-8 h-8 border-2 border-[#FB5005] border-t-transparent rounded-full animate-spin" /></div>
                    ) : !auditsData ? (
                      <div className="bg-[#111111] border border-white/[0.08] rounded-lg p-12 text-center">
                        <p className="text-[#71717A]">No audit data yet. Runs from stellio.com.au/site-audit will appear here.</p>
                      </div>
                    ) : (
                      <>
                        {/* Stat cards */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                          <div className="bg-[#111111] border border-white/[0.08] border-l-[3px] border-l-[#FB5005] rounded-lg p-5">
                            <p className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Audits Run</p>
                            <p className="font-[Satoshi] text-[1.9rem] font-700 text-[#FB5005]">{auditsData.totalRuns}</p>
                          </div>
                          <div className="bg-[#111111] border border-white/[0.08] border-l-[3px] border-l-[#FAFAFA] rounded-lg p-5">
                            <p className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Avg Score</p>
                            <p className="font-[Satoshi] text-[1.9rem] font-700 text-[#FAFAFA]">{auditsData.avgScore}</p>
                          </div>
                          <div className="bg-[#111111] border border-white/[0.08] border-l-[3px] border-l-purple-400 rounded-lg p-5">
                            <p className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Avg AI Design</p>
                            <p className="font-[Satoshi] text-[1.9rem] font-700 text-purple-400">{auditsData.avgDesign}</p>
                          </div>
                          <div className="bg-[#111111] border border-white/[0.08] border-l-[3px] border-l-blue-400 rounded-lg p-5">
                            <p className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Unique Sites</p>
                            <p className="font-[Satoshi] text-[1.9rem] font-700 text-blue-400">{auditsData.uniqueHosts}</p>
                          </div>
                          <div className="bg-[#111111] border border-white/[0.08] border-l-[3px] border-l-green-400 rounded-lg p-5">
                            <p className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Emails Captured</p>
                            <p className="font-[Satoshi] text-[1.9rem] font-700 text-green-400">{auditsData.withEmails}</p>
                          </div>
                        </div>

                        {/* Conversion strip */}
                        <div className="bg-[#111111] border border-white/[0.08] rounded-lg p-5 mb-6 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-[0.82rem] text-[#A1A1AA]">
                            <span className="text-[#FAFAFA] font-600">{auditsData.pageVisits}</span> visits to /site-audit, <span className="text-[#FAFAFA] font-600">{auditsData.totalRuns}</span> audits run
                          </p>
                          <p className="text-[0.82rem]">
                            <span className="text-[#71717A]">Visit to Audit conversion: </span>
                            <span className="text-[#FB5005] font-600">{auditsData.pageVisits > 0 ? Math.round((auditsData.totalRuns / auditsData.pageVisits) * 100) : 0}%</span>
                          </p>
                        </div>

                        {/* Score distribution + top hosts */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-[#111111] border border-white/[0.08] rounded-lg p-5">
                            <p className="text-[0.82rem] font-600 mb-4">Score Distribution</p>
                            {Object.entries(auditsData.buckets).map(([range, count]) => {
                              const max = Math.max(...Object.values(auditsData.buckets), 1)
                              return (
                                <div key={range} className="mb-3 last:mb-0">
                                  <div className="flex justify-between text-[0.75rem] text-[#A1A1AA] mb-1.5">
                                    <span>{range}</span>
                                    <span>{count}</span>
                                  </div>
                                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#FB5005] rounded-full" style={{ width: `${(count / max) * 100}%` }} />
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <div className="bg-[#111111] border border-white/[0.08] rounded-lg p-5">
                            <p className="text-[0.82rem] font-600 mb-2">Most Audited Sites</p>
                            {auditsData.topHosts.length === 0 ? (
                              <p className="text-[0.8rem] text-[#71717A] py-4">No sites audited yet.</p>
                            ) : auditsData.topHosts.map(([host, count]) => (
                              <div key={host} className="flex justify-between items-center py-2 border-b border-white/[0.04] last:border-0 text-[0.8rem]">
                                <span className="text-[#FAFAFA] truncate">{host}</span>
                                <span className="text-[#71717A] shrink-0 ml-3">{count}x</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recent audits table */}
                        <div className="bg-[#111111] border border-white/[0.08] rounded-lg overflow-hidden">
                          <div className="px-5 py-3.5 border-b border-white/[0.08] bg-[#0E0E0E]">
                            <p className="text-[0.82rem] font-600">Recent Audits</p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-[0.8rem]">
                              <thead>
                                <tr className="text-left text-[#71717A] border-b border-white/[0.06]">
                                  <th className="px-5 py-2.5 font-600">Site</th>
                                  <th className="px-5 py-2.5 font-600">Score</th>
                                  <th className="px-5 py-2.5 font-600">AI Design</th>
                                  <th className="px-5 py-2.5 font-600">Opportunities</th>
                                  <th className="px-5 py-2.5 font-600">When</th>
                                </tr>
                              </thead>
                              <tbody>
                                {auditsData.rows.length === 0 ? (
                                  <tr><td colSpan={5} className="px-5 py-8 text-center text-[#71717A]">No audits in this period.</td></tr>
                                ) : auditsData.rows.map(a => {
                                  const d = new Date(a.created_at)
                                  return (
                                  <tr key={a.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                                    <td className="px-5 py-3 text-[#FAFAFA] whitespace-nowrap">{a.host}</td>
                                    <td className={`px-5 py-3 font-600 ${a.overall_score >= 80 ? 'text-green-400' : a.overall_score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{a.overall_score ?? '-'}</td>
                                    <td className="px-5 py-3 text-[#A1A1AA]">{a.design_score ?? '-'}</td>
                                    <td className="px-5 py-3 text-[#A1A1AA]">{a.opportunity_count ?? '-'}</td>
                                    <td className="px-5 py-3 text-[#71717A] whitespace-nowrap" title={d.toISOString()}>
                                      {d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}{' '}
                                      {d.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                                    </td>
                                  </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {/* Analytics */}
                {activeTab === 'analytics' && (
                  <div>
                    {/* Range selector */}
                    <div className="flex items-center gap-2 mb-6">
                      {['1d', '7d', '30d', '90d'].map(r => (
                        <button key={r} onClick={() => setAnalyticsRange(r)}
                          className={`px-3 py-1.5 rounded-lg text-[0.78rem] font-600 transition-all ${
                            analyticsRange === r ? 'bg-[#FB5005] text-white' : 'bg-[#111111] text-[#A1A1AA] border border-white/[0.08] hover:text-[#FAFAFA]'
                          }`}>
                          {r === '1d' ? 'Today' : r.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {analyticsLoading ? (
                      <div className="flex items-center justify-center py-32"><div className="w-8 h-8 border-2 border-[#FB5005] border-t-transparent rounded-full animate-spin" /></div>
                    ) : !analytics ? (
                      <div className="bg-[#111111] border border-white/[0.08] rounded-lg p-12 text-center">
                        <p className="text-[#71717A]">Unable to load analytics data.</p>
                      </div>
                    ) : (
                      <>
                        {/* Stat cards with border-left accent */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                          <div className="bg-[#111111] border border-white/[0.08] border-l-[3px] border-l-[#FAFAFA] rounded-lg p-5">
                            <p className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Page Views</p>
                            <p className="font-[Satoshi] text-[2rem] font-700 text-[#FAFAFA]">{analytics.totalViews.toLocaleString()}</p>
                          </div>
                          <div className="bg-[#111111] border border-white/[0.08] border-l-[3px] border-l-[#FB5005] rounded-lg p-5">
                            <p className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Unique Visitors</p>
                            <p className="font-[Satoshi] text-[2rem] font-700 text-[#FB5005]">{analytics.uniqueVisitors.toLocaleString()}</p>
                          </div>
                          <div className="bg-[#111111] border border-white/[0.08] border-l-[3px] border-l-blue-400 rounded-lg p-5">
                            <p className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Avg Pages/Visit</p>
                            <p className="font-[Satoshi] text-[2rem] font-700 text-blue-400">
                              {analytics.uniqueVisitors > 0 ? (analytics.totalViews / analytics.uniqueVisitors).toFixed(1) : '0'}
                            </p>
                          </div>
                          <div className="bg-[#111111] border border-white/[0.08] border-l-[3px] border-l-yellow-400 rounded-lg p-5">
                            <p className="text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Bounce Rate</p>
                            <p className="font-[Satoshi] text-[2rem] font-700 text-yellow-400">
                              {analytics.totalViews > 0
                                ? Math.round((analytics.topPages.filter(p => p[1] === 1).length / Math.max(analytics.uniqueVisitors, 1)) * 100) + '%'
                                : '0%'}
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                          {/* Device breakdown */}
                          <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                            <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                              <h3 className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA]">Devices</h3>
                            </div>
                            <div className="p-5">
                              {[
                                { label: 'Desktop', value: analytics.desktop, color: 'bg-blue-500' },
                                { label: 'Tablet', value: analytics.tablet, color: 'bg-purple-500' },
                                { label: 'Mobile', value: analytics.mobile, color: 'bg-green-500' },
                              ].map(d => {
                                const total = Math.max(analytics.desktop + analytics.tablet + analytics.mobile, 1)
                                const pct = Math.round((d.value / total) * 100)
                                return (
                                  <div key={d.label} className="mb-3">
                                    <div className="flex justify-between text-[0.82rem] mb-1">
                                      <span className="text-[#A1A1AA]">{d.label}</span>
                                      <span className="text-[#FAFAFA] font-500">{d.value} ({pct}%)</span>
                                    </div>
                                    <div className="h-2 bg-[#0E0E0E] rounded-full overflow-hidden">
                                      <div className={`h-full ${d.color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          {/* Top Referrers */}
                          <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                            <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                              <h3 className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA]">Top Referrers</h3>
                            </div>
                            <div className="p-5">
                              {analytics.topReferrers.length === 0 ? (
                                <p className="text-[0.82rem] text-[#71717A]">No referrers yet</p>
                              ) : analytics.topReferrers.map(([host, count]) => (
                                <div key={host} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                                  <span className="text-[0.82rem] text-[#A1A1AA] truncate mr-2">{host}</span>
                                  <span className="text-[0.78rem] font-600 text-[#FAFAFA] whitespace-nowrap">{count}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* UTM Campaigns */}
                          <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                            <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                              <h3 className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA]">UTM Campaigns</h3>
                            </div>
                            <div className="p-5">
                              {analytics.utmCampaigns.length === 0 ? (
                                <p className="text-[0.82rem] text-[#71717A]">No UTM traffic yet</p>
                              ) : analytics.utmCampaigns.map(([key, count]) => (
                                <div key={key} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                                  <span className="text-[0.82rem] text-[#A1A1AA] truncate mr-2">{key}</span>
                                  <span className="text-[0.78rem] font-600 text-[#FB5005] whitespace-nowrap">{count}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Daily trend */}
                          <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                            <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                              <h3 className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA]">Daily Trend</h3>
                            </div>
                            <div className="p-5">
                              {analytics.dailyTrend.length === 0 ? (
                                <p className="text-[0.82rem] text-[#71717A]">No data yet</p>
                              ) : (
                                <div className="space-y-2">
                                  {analytics.dailyTrend.map(d => {
                                    const maxViews = Math.max(...analytics.dailyTrend.map(t => t.views), 1)
                                    const pct = Math.round((d.views / maxViews) * 100)
                                    return (
                                      <div key={d.date} className="flex items-center gap-3">
                                        <span className="text-[0.72rem] text-[#71717A] w-14 shrink-0">{d.date}</span>
                                        <div className="flex-1 h-5 bg-[#0E0E0E] rounded overflow-hidden">
                                          <div className="h-full bg-[#FB5005]/30 rounded flex items-center transition-all" style={{ width: `${Math.max(pct, 4)}%` }}>
                                            <span className="text-[0.65rem] font-600 text-[#FB5005] px-1.5 whitespace-nowrap">{d.views}</span>
                                          </div>
                                        </div>
                                        <span className="text-[0.65rem] text-[#71717A] w-14 text-right">{d.visitors} visitors</span>
                                      </div>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Top Pages */}
                          <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                            <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                              <h3 className="font-[Satoshi] text-[0.92rem] font-600 text-[#FAFAFA]">Top Pages</h3>
                            </div>
                            <div className="p-5">
                              {analytics.topPages.length === 0 ? (
                                <p className="text-[0.82rem] text-[#71717A]">No page views yet</p>
                              ) : analytics.topPages.map(([path, count]) => {
                                const maxViews = analytics.topPages[0][1]
                                const pct = Math.round((count / maxViews) * 100)
                                return (
                                  <div key={path} className="mb-2">
                                    <div className="flex justify-between text-[0.82rem] mb-1">
                                      <span className="text-[#A1A1AA] truncate mr-2">{path || '/'}</span>
                                      <span className="text-[#FAFAFA] font-500 whitespace-nowrap">{count}</span>
                                    </div>
                                    <div className="h-1.5 bg-[#0E0E0E] rounded-full overflow-hidden">
                                      <div className="h-full bg-[#FB5005] rounded-full transition-all" style={{ width: `${pct}%` }} />
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Menus */}
                {activeTab === 'menus' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-[1.1rem] font-700 text-[#FAFAFA]">Navigation Menu</h2>
                        <p className="text-[0.78rem] text-[#71717A] mt-1">Manage the items displayed in the site navigation bar.</p>
                      </div>
                      <button onClick={() => { setShowMenuForm(true); setEditingMenuItem(null); setMenuForm({ label: '', href: '', is_external: false }) }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FB5005] hover:bg-[#E55A1F] text-white text-[0.82rem] font-600 rounded-lg transition-colors">
                        <Icon name="plus" size={14} /> Add Menu Item
                      </button>
                    </div>

                    {/* Quick add from existing pages */}
                    {pages.filter(p => p.status === 'published' && !menuItems.some(m => m.href === `/${p.slug}`)).length > 0 && (
                      <Metabox title="Add from Pages">
                        <div className="flex flex-wrap gap-2">
                          {pages.filter(p => p.status === 'published' && !menuItems.some(m => m.href === `/${p.slug}`)).map(p => (
                            <button key={p.id} onClick={async () => {
                              const maxOrder = menuItems.length > 0 ? Math.max(...menuItems.map(m => m.ordering || 0)) : 0
                              await supabase.from('menu_items').insert({ label: p.nav_label || p.title, href: `/${p.slug}`, is_external: false, ordering: maxOrder + 10 })
                              fetchData()
                            }}
                              className="px-3 py-1.5 text-[0.75rem] bg-[#161616] hover:bg-[#1a1a1a] text-[#A1A1AA] hover:text-[#FAFAFA] border border-white/[0.08] rounded-md transition-colors">
                              + {p.nav_label || p.title}
                            </button>
                          ))}
                        </div>
                      </Metabox>
                    )}

                    {/* Menu items list */}
                    <div className="border border-white/[0.08] rounded-lg overflow-hidden">
                      <div className="bg-[#0E0E0E] px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
                        <span className="text-[0.82rem] font-600 text-[#FAFAFA]">Menu Items</span>
                        <span className="text-[0.7rem] text-[#71717A]">{menuItems.length} items</span>
                      </div>
                      {menuItems.length === 0 ? (
                        <div className="p-8 text-center text-[#71717A] text-[0.85rem]">No menu items yet. Add one above.</div>
                      ) : (
                        <div className="divide-y divide-white/[0.04]">
                          {menuItems.map((item, i) => (
                            <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors group">
                              {/* Reorder buttons */}
                              <div className="flex flex-col gap-0.5">
                                <button onClick={() => moveMenuItem(item, 'up')} disabled={i === 0}
                                  className="text-[0.6rem] text-[#71717A] hover:text-[#FAFAFA] disabled:opacity-30 transition-colors">▲</button>
                                <button onClick={() => moveMenuItem(item, 'down')} disabled={i === menuItems.length - 1}
                                  className="text-[0.6rem] text-[#71717A] hover:text-[#FAFAFA] disabled:opacity-30 transition-colors">▼</button>
                              </div>
                              {/* Drag handle */}
                              <span className="text-[#71717A] cursor-grab">⠿</span>
                              {/* Item info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[0.85rem] font-500 text-[#FAFAFA]">{item.label}</span>
                                  {item.is_external && <span className="text-[0.6rem] px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded font-600">External</span>}
                                </div>
                                <span className="text-[0.72rem] text-[#71717A]">{item.href}</span>
                              </div>
                              {/* Actions */}
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setEditingMenuItem(item); setMenuForm({ label: item.label, href: item.href, is_external: item.is_external }); setShowMenuForm(true) }}
                                  className="text-[0.72rem] text-[#A1A1AA] hover:text-[#FAFAFA] px-2 py-1 border border-white/[0.08] rounded transition-colors">Edit</button>
                                <button onClick={() => deleteMenuItem(item.id)}
                                  className="text-[0.72rem] text-red-400 hover:text-red-300 px-2 py-1 border border-red-400/20 rounded transition-colors">Remove</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Menu form modal */}
                    {showMenuForm && (
                      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowMenuForm(false)}>
                        <div className="bg-[#111111] border border-white/[0.08] rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                          <h3 className="text-[1rem] font-700 text-[#FAFAFA] mb-4">{editingMenuItem ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[0.78rem] font-500 text-[#A1A1AA] mb-1.5">Label</label>
                              <input value={menuForm.label} onChange={e => setMenuForm(prev => ({ ...prev, label: e.target.value }))}
                                placeholder="e.g. Services" className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/[0.08] rounded-lg text-[0.85rem] text-[#FAFAFA] focus:border-[#FB5005] outline-none transition-colors" />
                            </div>
                            <div>
                              <label className="block text-[0.78rem] font-500 text-[#A1A1AA] mb-1.5">URL / Path</label>
                              <input value={menuForm.href} onChange={e => setMenuForm(prev => ({ ...prev, href: e.target.value }))}
                                placeholder="e.g. /services or https://..." className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/[0.08] rounded-lg text-[0.85rem] text-[#FAFAFA] focus:border-[#FB5005] outline-none transition-colors" />
                              <p className="text-[0.68rem] text-[#71717A] mt-1">Use /slug for internal pages or full URL for external links.</p>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={menuForm.is_external} onChange={e => setMenuForm(prev => ({ ...prev, is_external: e.target.checked }))}
                                className="w-4 h-4 rounded border-white/[0.12] bg-[#0A0A0A] accent-[#FB5005]" />
                              <span className="text-[0.82rem] text-[#A1A1AA]">Open in new tab (external link)</span>
                            </label>
                          </div>
                          <div className="flex gap-3 mt-6">
                            <button onClick={saveMenuItem} className="flex-1 px-4 py-2.5 bg-[#FB5005] hover:bg-[#E55A1F] text-white text-[0.82rem] font-600 rounded-lg transition-colors">
                              {editingMenuItem ? 'Update' : 'Add to Menu'}
                            </button>
                            <button onClick={() => { setShowMenuForm(false); setEditingMenuItem(null) }} className="px-4 py-2.5 border border-white/[0.08] text-[#A1A1AA] hover:text-[#FAFAFA] text-[0.82rem] font-500 rounded-lg transition-colors">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Settings */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    {/* Site Identity */}
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                      <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                        <h3 className="font-[Satoshi] text-[1rem] font-600 text-[#FAFAFA]">Site Identity</h3>
                        <p className="text-[0.72rem] text-[#71717A]">Core brand information displayed across the site</p>
                      </div>
                      <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { key: 'site_name', label: 'Site Name' },
                            { key: 'tagline', label: 'Tagline' },
                            { key: 'email', label: 'Email' },
                            { key: 'phone', label: 'Phone' },
                            { key: 'address', label: 'Address' },
                          ].map(f => (
                            <div key={f.key}>
                              <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">{f.label}</label>
                              <input value={settingsForm[f.key] || ''} onChange={(e) => setSettingsForm({ ...settingsForm, [f.key]: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none" />
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Meta Description</label>
                          <textarea value={settingsForm.meta_description || ''} onChange={(e) => setSettingsForm({ ...settingsForm, meta_description: e.target.value })}
                            rows={3} className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none resize-y" />
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                      <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                        <h3 className="font-[Satoshi] text-[1rem] font-600 text-[#FAFAFA]">Social Links</h3>
                        <p className="text-[0.72rem] text-[#71717A]">Social media and external profiles</p>
                      </div>
                      <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { key: 'linkedin', label: 'LinkedIn URL' },
                            { key: 'twitter', label: 'X / Twitter URL' },
                            { key: 'instagram', label: 'Instagram URL' },
                            { key: 'github', label: 'GitHub URL' },
                            { key: 'youtube', label: 'YouTube URL' },
                          ].map(f => (
                            <div key={f.key}>
                              <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">{f.label}</label>
                              <input value={settingsForm[f.key] || ''} onChange={(e) => setSettingsForm({ ...settingsForm, [f.key]: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none"
                                placeholder="https://" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* File Uploads */}
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                      <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                        <h3 className="font-[Satoshi] text-[1rem] font-600 text-[#FAFAFA]">Media</h3>
                        <p className="text-[0.72rem] text-[#71717A]">Share image and favicon for SEO and branding</p>
                      </div>
                      <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">OG Share Image</label>
                            <div className="flex gap-3 items-center mb-2">
                              <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && uploadFile(e.target.files[0], 'share_image_url', 'brand')}
                                className="text-[0.82rem] text-[#A1A1AA] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-white/[0.1] file:bg-[#0E0E0E] file:text-[#A1A1AA] file:text-[0.78rem] file:cursor-pointer" />
                              {uploading.share_image_url && <span className="text-[0.78rem] text-[#FB5005]">Uploading...</span>}
                            </div>
                            {settingsForm.share_image_url && <img src={settingsForm.share_image_url} alt="Share" className="h-24 rounded-lg object-cover border border-white/[0.06]" />}
                            <input value={settingsForm.share_image_url || ''} onChange={(e) => setSettingsForm({ ...settingsForm, share_image_url: e.target.value })}
                              className="w-full mt-2 px-4 py-2 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.78rem] focus:border-[#FB5005] outline-none"
                              placeholder="Or paste URL manually" />
                          </div>
                          <div>
                            <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-2">Favicon</label>
                            <div className="flex gap-3 items-center mb-2">
                              <input type="file" accept="image/*,.ico" onChange={(e) => e.target.files[0] && uploadFile(e.target.files[0], 'favicon_url', 'brand')}
                                className="text-[0.82rem] text-[#A1A1AA] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-white/[0.1] file:bg-[#0E0E0E] file:text-[#A1A1AA] file:text-[0.78rem] file:cursor-pointer" />
                              {uploading.favicon_url && <span className="text-[0.78rem] text-[#FB5005]">Uploading...</span>}
                            </div>
                            {settingsForm.favicon_url && <img src={settingsForm.favicon_url} alt="Favicon" className="h-12 w-12 rounded-lg object-cover border border-white/[0.06]" />}
                            <input value={settingsForm.favicon_url || ''} onChange={(e) => setSettingsForm({ ...settingsForm, favicon_url: e.target.value })}
                              className="w-full mt-2 px-4 py-2 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.78rem] focus:border-[#FB5005] outline-none"
                              placeholder="Or paste URL manually" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Analytics & Tracking */}
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                      <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                        <h3 className="font-[Satoshi] text-[1rem] font-600 text-[#FAFAFA]">Analytics & Tracking</h3>
                        <p className="text-[0.72rem] text-[#71717A]">Google Tag Manager and GA4 tracking codes</p>
                      </div>
                      <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">Google Tag Manager ID</label>
                            <input value={settingsForm.gtm_code || ''} onChange={(e) => setSettingsForm({ ...settingsForm, gtm_code: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none"
                              placeholder="GTM-XXXXXXX" />
                            <p className="text-[0.68rem] text-[#71717A] mt-1">Tag manager script will be injected into the site head</p>
                          </div>
                          <div>
                            <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">GA4 Measurement ID</label>
                            <input value={settingsForm.ga4_code || ''} onChange={(e) => setSettingsForm({ ...settingsForm, ga4_code: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none"
                              placeholder="G-XXXXXXXXXX" />
                            <p className="text-[0.68rem] text-[#71717A] mt-1">Analytics gtag.js will be loaded automatically</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Elastic Mail */}
                    <div className="bg-[#111111] border border-white/[0.08] rounded-lg">
                      <div className="px-5 py-3 border-b border-white/[0.06] bg-[#0E0E0E]">
                        <h3 className="font-[Satoshi] text-[1rem] font-600 text-[#FAFAFA]">Elastic Email</h3>
                        <p className="text-[0.72rem] text-[#71717A]">API configuration for transactional email via Elastic Mail</p>
                      </div>
                      <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">API Key</label>
                            <input type="password" value={settingsForm.elastic_mail_api_key || ''} onChange={(e) => setSettingsForm({ ...settingsForm, elastic_mail_api_key: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none"
                              placeholder="Enter API key" />
                            <p className="text-[0.68rem] text-[#71717A] mt-1">Stored securely, never exposed to the frontend</p>
                          </div>
                          <div>
                            <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">From Email</label>
                            <input value={settingsForm.elastic_mail_from_email || ''} onChange={(e) => setSettingsForm({ ...settingsForm, elastic_mail_from_email: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none"
                              placeholder="hello@stellio.com.au" />
                          </div>
                          <div>
                            <label className="block text-[0.72rem] font-600 text-[#71717A] uppercase tracking-[0.05em] mb-1">From Name</label>
                            <input value={settingsForm.elastic_mail_from_name || ''} onChange={(e) => setSettingsForm({ ...settingsForm, elastic_mail_from_name: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E0E] border border-white/[0.08] text-[#FAFAFA] text-[0.88rem] focus:border-[#FB5005] outline-none"
                              placeholder="Stellio Creative Labs" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Save */}
                    <div className="flex justify-end">
                      <button onClick={saveSettings} disabled={saving}
                        className="px-6 py-3 rounded-lg bg-[#FB5005] text-white text-[0.88rem] font-600 hover:bg-[#E55A1F] transition-all disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save All Settings'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
