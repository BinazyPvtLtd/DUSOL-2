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
  'dusol-admission': getAdmissionAPI,
  'dusol-courses-fees': getCoursesFeesAPI,
  'dusol-hall-ticket': getHallTicketAPI,
  'du-sol-study-material': getStudyMaterialAPI,
  'dusol-result': getResultAPI,
  'du-sol-library-portal': getLibraryPortalAPI,
  'du-sol-assignment-status': getAssignmentStatusAPI,
  'dusol-alternative-universities': getAlternativeUniversitiesAPI,
}

const NORMALIZE_KEY_MAP = {
  'dusol-admission': 'admission',
  'dusol-courses-fees': 'courses-fees',
  'dusol-hall-ticket': 'hall-ticket',
  'du-sol-study-material': 'study-material',
  'dusol-result': 'result',
  'du-sol-library-portal': 'library-portal',
  'du-sol-assignment-status': 'assignment-status',
  'dusol-alternative-universities': 'alternative-universities',
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

function StudentZoneContent () {
  const searchParams = useSearchParams()
 const pageKey = searchParams.get('p') || 'dusol-admission'
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
  const fetchData = async () => {
    const api = apiMap[pageKey]

    if (!api) {
      setLoading(false)
      setPage(null)
      return
    }

    try {
      setLoading(true)

      const response = await api()

const normalized = normalizeResponse(NORMALIZE_KEY_MAP[pageKey] || pageKey, response)

setPage(normalized)
    } catch (error) {
      console.error(error)
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
    <>
    

      {/* CONTENT */}
    <StudentContentPage
    page={page}
    pageKey={pageKey}
/>
    </>
  )
}

export default function StudentZonePage () {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '80px', textAlign: 'center' }}>Loading...</div>
      }
    >
      <StudentZoneContent />
    </Suspense>
  )
}
