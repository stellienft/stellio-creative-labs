import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const SettingsContext = createContext({})

export const useSettings = () => useContext(SettingsContext)

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchSettings = useCallback(async () => {
    const { data, error } = await supabase.from('site_settings').select('key,value')
    if (!error && data) {
      const obj = {}
      data.forEach(row => { obj[row.key] = row.value })
      setSettings(obj)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchSettings() }, [fetchSettings])

  // Apply all site settings to the document
  useEffect(() => {
    // Site name -> <title> + og:title + twitter:title
    if (settings.site_name) {
      const tagline = settings.tagline ? ` | ${settings.tagline}` : ''
      const fullTitle = `${settings.site_name}${tagline}`
      document.title = fullTitle
      setMeta('property', 'og:title', fullTitle)
      setMeta('name', 'twitter:title', fullTitle)
    }

    // Meta description -> og:description + twitter:description
    if (settings.meta_description) {
      setMeta('name', 'description', settings.meta_description)
      setMeta('property', 'og:description', settings.meta_description)
      setMeta('name', 'twitter:description', settings.meta_description)
    }

    // Share image -> og:image + twitter:image
    if (settings.share_image_url) {
      setMeta('property', 'og:image', settings.share_image_url)
      setMeta('name', 'twitter:image', settings.share_image_url)
      setMeta('property', 'og:image:width', '1200')
      setMeta('property', 'og:image:height', '630')
      // Also set twitter card for rich previews
      setMeta('name', 'twitter:card', 'summary_large_image')
    }

    // Favicon
    if (settings.favicon_url) {
      let link = document.querySelector("link[rel='icon']")
      if (link) {
        link.href = settings.favicon_url
      } else {
        link = document.createElement('link')
        link.rel = 'icon'
        link.href = settings.favicon_url
        document.head.appendChild(link)
      }
      // Apple touch icon too
      let apple = document.querySelector("link[rel='apple-touch-icon']")
      if (apple) {
        apple.href = settings.favicon_url
      } else {
        apple = document.createElement('link')
        apple.rel = 'apple-touch-icon'
        apple.href = settings.favicon_url
        document.head.appendChild(apple)
      }
    }

    // OG type + url
    setMeta('property', 'og:type', 'website')
    if (typeof window !== 'undefined') {
      setMeta('property', 'og:url', window.location.origin)
    }
  }, [settings.site_name, settings.tagline, settings.meta_description, settings.share_image_url, settings.favicon_url])

  // Inject GTM
  useEffect(() => {
    if (!settings.gtm_code) return
    const existing = document.getElementById('gtm-script')
    if (existing) return
    const script = document.createElement('script')
    script.id = 'gtm-script'
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${settings.gtm_code}');`
    document.head.appendChild(script)
    const noscript = document.createElement('noscript')
    noscript.id = 'gtm-noscript'
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${settings.gtm_code}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    document.body.insertBefore(noscript, document.body.firstChild)
  }, [settings.gtm_code])

  // Inject GA4
  useEffect(() => {
    if (!settings.ga4_code) return
    const existing = document.getElementById('ga4-script')
    if (existing) return
    const script = document.createElement('script')
    script.id = 'ga4-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.ga4_code}`
    document.head.appendChild(script)
    const config = document.createElement('script')
    config.id = 'ga4-config'
    config.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.ga4_code}');`
    document.head.appendChild(config)
  }, [settings.ga4_code])

  return (
    <SettingsContext.Provider value={{ settings, loading, refetch: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}
