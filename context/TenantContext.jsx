'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getTenantAPI } from '@/api/tenant'
import { getStorageBaseUrl } from '@/constant/constant'

const TenantContext = createContext(null)

export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTenant()
  }, [])

  const loadTenant = async () => {
    try {
      const res = await getTenantAPI()

      const currentTenant = res.data?.data?.university

      if (currentTenant) {
        setTenant(currentTenant)
        applyTheme(currentTenant)
      } else {
        console.warn('No tenant data found.')
      }
    } catch (error) {
      console.error('Failed to load tenant:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyTheme = tenant => {
    if (!tenant || typeof document === 'undefined') return

    const root = document.documentElement

    // Theme Colors
    root.style.setProperty(
      '--primary-color',
      tenant.primary_color?.trim()
    )

    root.style.setProperty(
      '--secondary-color',
      tenant.secondary_color?.trim()
    )

    root.style.setProperty(
      '--accent-color',
      tenant.accent_color?.trim()
    )

    // Font
    if (tenant.font_family) {
      const fontId = 'tenant-font'

      let fontLink = document.getElementById(fontId)

      if (!fontLink) {
        fontLink = document.createElement('link')
        fontLink.id = fontId
        fontLink.rel = 'stylesheet'
        document.head.appendChild(fontLink)
      }

      fontLink.href = `https://fonts.googleapis.com/css2?family=${tenant.font_family
        .trim()
        .replace(/\s+/g, '+')}:wght@300;400;500;600;700;800&display=swap`

      root.style.setProperty(
        '--font-family',
        `"${tenant.font_family.trim()}", sans-serif`
      )
    } else {
      root.style.setProperty('--font-family', '"Poppins", sans-serif')
    }

    // Page Title
    if (tenant.name) {
      document.title = tenant.name
    }

    // Favicon
    if (tenant.favicon) {
      let favicon = document.querySelector("link[rel='icon']")

      if (!favicon) {
        favicon = document.createElement('link')
        favicon.rel = 'icon'
        document.head.appendChild(favicon)
      }

      favicon.href = `${getStorageBaseUrl()}/${tenant.favicon}`
    }
  }

  return (
    <TenantContext.Provider
      value={{
        tenant,
        loading,
        reloadTenant: loadTenant,
        tenantId: tenant?.id
      }}
    >
      {children}
    </TenantContext.Provider>
  )
}

export const useTenant = () => useContext(TenantContext)
