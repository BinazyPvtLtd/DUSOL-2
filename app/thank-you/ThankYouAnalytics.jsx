'use client'

import { useEffect } from 'react'

// Fires the lead conversion exactly once, only from this page, using the
// gtag() loaded in app/layout.jsx. Keeping it here (instead of in every lead
// form) is what prevents duplicate conversion events.
export default function ThankYouAnalytics ({ source }) {
  useEffect(() => {
    if (source !== 'lead') return
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

    window.gtag('event', 'generate_lead', {
      event_category: 'Lead',
      event_label: source
    })
  }, [source])

  return null
}
