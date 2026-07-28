'use client'

import { useState, useEffect } from 'react'
import { STUDENT_ZONE_API_MAP } from '@/app/lib/studentZone'

import StudentContentPage from '@/components/student-zone/StudentContentPage'

const normalizeResponse = (pageKey, response) => {
  const data = response?.data?.data

  switch (pageKey) {
    case 'admission':
      return {
        title: data?.admission?.title,
        description: data?.admission?.short_description,
        content: data?.admission?.content,
        items: [],
        seo: data?.seo,
      }

    case 'courses-fees':
      return {
        title: data?.title,
        description: data?.description,
        content: data?.footer_content,
        items: data?.items || [],
        seo: data?.seo,
      }

    case 'alternative-universities':
      return {
        title: data?.title,
        description: data?.description,
        content: data?.content,
        items: data?.items || [],
        seo: data?.seo,
      }

    default:
      return {
        title: data?.title,
        description: data?.description || data?.short_description,
        content: data?.content,
        items: data?.items || [],
        seo: data?.seo,
      }
  }
}

export default function StudentZoneClient({ pageKey, tenantSlug }) {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const api = STUDENT_ZONE_API_MAP[pageKey]

      if (!api) {
        setPage(null)
        return
      }

      try {
        setLoading(true)

        const response = await api()
        const normalized = normalizeResponse(pageKey, response)

        setPage(normalized)
      } catch (error) {
        console.error(error)
        setPage(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [pageKey])

  if (loading && !page) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>
        Loading...
      </div>
    )
  }

  return (
    <StudentContentPage
      page={page}
      pageKey={pageKey}
      tenantSlug={tenantSlug}
    />
  )
}
