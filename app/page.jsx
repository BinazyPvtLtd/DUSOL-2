import HomeClient from './HomeClient'
import { getHomePageDataAPI } from '@/api'
import { generateSEOMetadata } from './lib/seo'

export async function generateMetadata () {
  try {
    const response = await getHomePageDataAPI()

    const payload = response?.data
    const seo = payload?.seo || payload?.data?.seo || {}

    return generateSEOMetadata(seo)
  } catch (err) {
    return generateSEOMetadata({})
  }
}

export default async function HomePage () {
  const response = await getHomePageDataAPI()
  const initialData = response?.data || null

  return <HomeClient initialData={initialData} />
}

