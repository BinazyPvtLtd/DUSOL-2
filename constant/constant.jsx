// src/constant/constant.js

const DEFAULT_API = process.env.NEXT_PUBLIC_DEFAULT_API
const DEFAULT_STORAGE =
  process.env.NEXT_PUBLIC_DEFAULT_STORAGE || process.env.NEXT_PUBLIC_IMAGE_URL

const isLocalHost = hostname => {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0'
  )
}

export const getCurrentSubdomain = () => {
  // SSR
  if (typeof window === 'undefined') {
    if (!DEFAULT_API) return 'dusol'

    try {
      const hostname = new URL(DEFAULT_API).hostname
      return hostname.split('.')[0]
    } catch {
      return 'dusol'
    }
  }

  const host = window.location.hostname

  // Localhost
  if (isLocalHost(host)) {
    try {
      const hostname = new URL(DEFAULT_API).hostname
      return hostname.split('.')[0]
    } catch {
      return 'dusol'
    }
  }

  return host.split('.')[0]
}

export const getTenantHost = () => {
  if (typeof window === 'undefined') return ''

  const host = window.location.hostname
  if (isLocalHost(host)) return 'dusol'

  const subdomain = host.split('.')[0]
  return !subdomain || subdomain === 'www' ? 'dusol' : subdomain
}

// export const getBaseUrl = () => {
//   // SSR: use default api if provided via env
//   if (typeof window === 'undefined') return DEFAULT_API

//   const host = window.location.hostname

//   if (isLocalHost(host)) {
//     return DEFAULT_API
//   }

//   return `https://${host}/api/v1`
// }

//give data base URL
// constant.js

export const getBaseUrl = () => {
  // Server Side
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_DEFAULT_API
  }

  const hostname = window.location.hostname

  // Local Development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return process.env.NEXT_PUBLIC_DEFAULT_API
  }

  // Live (Subdomain Based)
  return `${window.location.protocol}//${hostname}/api/v1`
}

export const getStorageBaseUrl = () => {
  // Server Side
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_IMAGE_URL
  }

  const hostname = window.location.hostname

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return process.env.NEXT_PUBLIC_IMAGE_URL
  }

  return `${window.location.protocol}//${hostname}/storage`
}
