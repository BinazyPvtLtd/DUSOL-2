import axios from 'axios'
import { getBaseUrl } from '@/constant/constant'

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

export const getHomePageDataAPI = async () => {
  try {
    return await axios.get(`${getBaseUrl()}/home`)
  } catch (err) {
    // Workaround for TLS cert alt-name mismatch in some environments.
    // Only applies when baseUrl is absolute (SSR generateMetadata/build).
    if (err?.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
      return await axios.get(`${getBaseUrl()}/home`, {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
      })
    }
    throw err
  }
}

export const getUniversityDataAPI = async () => {
  return await axios.get(`${getBaseUrl()}/universities/`)
}

export const getCourseDataAPI = async () => {
  return await axios.get(`${getBaseUrl()}/courses`)
}

export const getOneCourseDataAPI = async slug => {
  return await axios.get(`${getBaseUrl()}/courses/${slug}`)
}

export const getCoursesByLevelAPI = async level => {
  return await axios.get(`${getBaseUrl()}/courses?level=${level}`)
}

export const getSpecializationsAPI = async () => {
  return await axios.get(`${getBaseUrl()}/specializations`)
}

export const getOneSpecializationAPI = async slug => {
  return await axios.get(`${getBaseUrl()}/specializations/${slug}`)
}

export const getBlogDataApi = async (page = 1) => {
  return await axios.get(`${getBaseUrl()}/blogs`, { params: { page } })
}

export const getOneBlogDataApi = async slug => {
  return await axios.get(`${getBaseUrl()}/blogs/${slug}`)
}

export const getTrendingBlogsApi = async () => {
  return await axios.get(`${getBaseUrl()}/blogs/trending`)
}
// api/index.js

export const getBlogFaqsApi = async blogId => {
  return await axios.get(`${getBaseUrl()}/blogs/${blogId}/faqs`)
}

export const getFeesDataApi = async () => {
  return await axios.get(`${getBaseUrl()}/fees`)
}

export const AddLeadAPI = async data => {
  return await axios.post(`${getBaseUrl()}/leads`, data, {
    headers: getHeaders()
  })
}

export const getAdmissionAPI = async (config = {}) => {
  return await axios.get(`${getBaseUrl()}/admission`, config)
}

export const getCoursesFeesAPI = async (config = {}) => {
  return await axios.get(`${getBaseUrl()}/courses-fees`, config)
}

export const getHallTicketAPI = async (config = {}) => {
  return await axios.get(`${getBaseUrl()}/hall-ticket`, config)
}

export const getStudyMaterialAPI = async (config = {}) => {
  return await axios.get(`${getBaseUrl()}/study-material`, config)
}

export const getResultAPI = async (config = {}) => {
  return await axios.get(`${getBaseUrl()}/result`, config)
}

export const getLibraryPortalAPI = async (config = {}) => {
  return await axios.get(`${getBaseUrl()}/library-portal`, config)
}

export const getAssignmentStatusAPI = async (config = {}) => {
  return await axios.get(`${getBaseUrl()}/assignment-status`, config)
}

export const getAlternativeUniversitiesAPI = async (config = {}) => {
  return await axios.get(`${getBaseUrl()}/alternative-universities`, config)
}