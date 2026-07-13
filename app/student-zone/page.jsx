'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  getAdmissionAPI,
  getCoursesFeesAPI,
  getHallTicketAPI,
  getStudyMaterialAPI,
  getResultAPI,
  getLibraryPortalAPI,
  getAssignmentStatusAPI,
  getAlternativeUniversitiesAPI
} from '@/api'

import StudentContentPage from '@/components/student-zone/StudentContentPage'

const apiMap = {
  admission: getAdmissionAPI,
  'courses-fees': getCoursesFeesAPI,
  'hall-ticket': getHallTicketAPI,
  'study-material': getStudyMaterialAPI,
  result: getResultAPI,
  'library-portal': getLibraryPortalAPI,
  'assignment-status': getAssignmentStatusAPI,
  'alternative-universities': getAlternativeUniversitiesAPI,
}

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

function StudentZoneContent() {
  const searchParams = useSearchParams()
  const pageKey = searchParams.get('p') || 'admission'

  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const api = apiMap[pageKey]

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

  if (!apiMap[pageKey]) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>
        Page not found
      </div>
    )
  }

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
    />
  )
}

export default function StudentZonePage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '80px', textAlign: 'center' }}>
          Loading...
        </div>
      }
    >
      <StudentZoneContent />
    </Suspense>
  )
}