import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import LogoQuestionnaire from './pages/LogoQuestionnaire'
import WebQuestionnaire from './pages/WebQuestionnaire'
import EOFYForm from './pages/EOFYForm'
import FAQ from './pages/FAQ'
import AIAudit from './pages/AIAudit'
import SiteAudit from './pages/SiteAudit'
import NicheLanding from './pages/NicheLanding'
import ExampleSite from './pages/ExampleSite'
import DesignShowcase from './pages/DesignShowcase'
import Admin from './pages/Admin'
import DynamicPage from './pages/DynamicPage'
import { AuthProvider } from './context/AuthContext'
import { SettingsProvider } from './context/SettingsContext'
import { AnalyticsProvider } from './context/AnalyticsContext'
import { OrganizationSchema } from './components/JsonLd'

const SmoothScrollContext = createContext(null)
export const useSmoothScroll = () => useContext(SmoothScrollContext)

function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    setReady(true)

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useSmoothScroll()

  useEffect(() => {
    if (lenis?.current) lenis.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])

  return null
}

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const isExample = location.pathname.startsWith('/examples/')
  const hideChrome = isAdmin || isExample || location.pathname === '/showcase'

  return (
    <AuthProvider>
      <SettingsProvider>
      <AnalyticsProvider>
      <SmoothScrollProvider>
        <div className={!hideChrome ? 'noise-overlay' : ''}>
          <OrganizationSchema />
          <ScrollToTop />
          {!hideChrome && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/ai-audit" element={<AIAudit />} />
            <Route path="/site-audit" element={<SiteAudit />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/logo-questionnaire" element={<LogoQuestionnaire />} />
            <Route path="/web-questionnaire" element={<WebQuestionnaire />} />
            <Route path="/eofy" element={<EOFYForm />} />
            <Route path="/for/:niche" element={<NicheLanding />} />
            <Route path="/examples/:template" element={<ExampleSite />} />
<Route path="/showcase" element={<DesignShowcase />} />
            <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
          {!hideChrome && <Footer />}
        </div>
      </SmoothScrollProvider>
      </AnalyticsProvider>
      </SettingsProvider>
    </AuthProvider>
  )
}

export default App
