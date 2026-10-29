import React, { createContext, useContext, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AnalyticsContext = createContext({})

export const useAnalytics = () => useContext(AnalyticsContext)

function getSessionId() {
  let id = sessionStorage.getItem('stellio_sid')
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : 'sess-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('stellio_sid', id)
  }
  return id
}

function getUTM(params) {
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
  }
}

export function AnalyticsProvider({ children }) {
  const location = useLocation()
  const lastPath = useRef(null)
  const sessionId = getSessionId()

  const trackPageView = useCallback(async (path) => {
    // Skip admin pages
    if (path.startsWith('/admin')) return
    // Dedupe rapid re-renders
    if (path === lastPath.current) return
    lastPath.current = path

    const params = new URLSearchParams(window.location.search)
    const payload = {
      path,
      referrer: document.referrer || '',
      user_agent: navigator.userAgent || '',
      screen_width: window.innerWidth || 0,
      session_id: sessionId,
      ...getUTM(params),
    }

    // Fire and forget - don't block rendering
    supabase.from('page_views').insert(payload).then(() => {}).catch(() => {})
  }, [sessionId])

  // Track on route change
  React.useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname, trackPageView])

  return (
    <AnalyticsContext.Provider value={{ trackPageView }}>
      {children}
    </AnalyticsContext.Provider>
  )
}
