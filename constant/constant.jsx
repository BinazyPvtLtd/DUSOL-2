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


export const getStorageBaseUrl = () => {
  if (typeof window === 'undefined') return DEFAULT_STORAGE

  const host = window.location.hostname

  if (isLocalHost(host)) {
    return DEFAULT_STORAGE

  }

  return `https://${host}/storage`
}


export const getBaseUrl = () => {
  console.log("DEFAULT_API =", DEFAULT_API);

  if (typeof window === "undefined") {
    return DEFAULT_API;
  }

  const host = window.location.hostname;

  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0"
  ) {
    return DEFAULT_API;
  }

  return https://${host}/api/v1;
};