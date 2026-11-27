import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'stellio_cookie_consent'

function applyConsent(value) {
  const granted = value === 'accepted' ? 'granted' : 'denied'
  const gtag = window.gtag
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      ad_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
      analytics_storage: granted,
    })
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let saved = ''
    try { saved = localStorage.getItem(STORAGE_KEY) || '' } catch (e) { /* noop */ }
    if (saved) { applyConsent(saved); return }
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const choose = (value) => {
    try { localStorage.setItem(STORAGE_KEY, value) } catch (e) { /* noop */ }
    applyConsent(value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 z-[9999] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/[0.1] bg-[#141414]/95 backdrop-blur rounded-2xl p-5 shadow-2xl max-w-xl">
      <p className="text-[0.85rem] leading-relaxed text-[#A1A1AA]">
        We use cookies and analytics to understand how visitors use our site. See our{' '}
        <Link to="/privacy" className="text-[#FB5005] underline decoration-white/20 underline-offset-2">Privacy Policy</Link>.
      </p>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => choose('declined')} className="text-[0.82rem] font-600 text-[#A1A1AA] hover:text-[#FAFAFA] px-3 py-2 transition-colors">Decline</button>
        <button onClick={() => choose('accepted')} className="text-[0.82rem] font-700 text-white bg-[#FB5005] rounded-lg px-4 py-2 hover:brightness-110 transition-all">Accept</button>
      </div>
    </div>
  )
}
