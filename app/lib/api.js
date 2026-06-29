// export const getApiBaseUrl = tenant => {
//   return `https://api.${tenant}.distanceeducationlearning.com/api/v1`
// }

// NOTE: This file is used by both server + client components.
// Keep it SSR-safe: never reference `window` or `document` at module scope.

export const getApiBaseUrl = tenant => {
  // If you want tenant-specific APIs, set NEXT_PUBLIC_API_BASE_URL to an absolute URL.
  const base = process.env.NEXT_PUBLIC_API_BASE_URL
  if (base) return base

  // Fallback to same-origin API route.
  return '/api/v1'
}

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

// Absolute/relative base URL helpers for the backend API
const joinUrl = (base, path) => {
  if (!base) return path
  if (base.endsWith('/') && path.startsWith('/')) return base + path.slice(1)
  if (!base.endsWith('/') && !path.startsWith('/')) return base + '/' + path
  return base + path
}

export const getHomePageDataAPI = async () => {
  const url = joinUrl(getApiBaseUrl(), '/home')
  return await (await import('axios')).default.get(url)
}

export const getUniversityDataAPI = async () => {
  const url = joinUrl(getApiBaseUrl(), '/universities/')
  return await (await import('axios')).default.get(url)
}

export const getCourseDataAPI = async () => {
  const url = joinUrl(getApiBaseUrl(), '/courses')
  return await (await import('axios')).default.get(url)
}

export const getOneCourseDataAPI = async slug => {
  const url = joinUrl(getApiBaseUrl(), `/courses/${slug}`)
  return await (await import('axios')).default.get(url)
}

export const getCoursesByLevelAPI = async level => {
  const url = joinUrl(getApiBaseUrl(), `/courses?level=${level}`)
  return await (await import('axios')).default.get(url)
}

export const getBlogDataApi = async () => {
  const url = joinUrl(getApiBaseUrl(), '/blogs')
  return await (await import('axios')).default.get(url)
}

export const getOneBlogDataApi = async slug => {
  const url = joinUrl(getApiBaseUrl(), `/blogs/${slug}`)
  return await (await import('axios')).default.get(url)
}

export const getBlogFaqsApi = async blogId => {
  const url = joinUrl(getApiBaseUrl(), `/blogs/${blogId}/faqs`)
  return await (await import('axios')).default.get(url)
}

export const getFeesDataApi = async () => {
  const url = joinUrl(getApiBaseUrl(), '/fees')
  return await (await import('axios')).default.get(url)
}

export const AddLeadAPI = async data => {
  const url = joinUrl(getApiBaseUrl(), '/leads')
  return await (await import('axios')).default.post(url, data, {
    headers: getHeaders()
  })
}





