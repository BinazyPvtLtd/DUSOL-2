import { fetchApi } from '@/app/lib/serverApi'
import BlogsClient from './BlogsClient'

const getBlogs = page => fetchApi(`/blogs?page=${page}`)

export default async function Page ({ searchParams }) {
  const pageParam = Number(searchParams?.page)
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1

  let initialData = null

  try {
    initialData = await getBlogs(page)
  } catch (err) {
    initialData = null
  }

  return <BlogsClient initialData={initialData} initialPage={page} />
}
