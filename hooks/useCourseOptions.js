'use client'

import { useEffect, useState } from 'react'
import { getCourseDataAPI } from '@/api'

// Shared course list for lead form Course dropdowns: every form shows the
// complete list returned by the /courses API. The request is cached at
// module level so multiple forms on one page trigger a single fetch.
let coursesPromise = null

export function useCourseOptions () {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    let active = true

    if (!coursesPromise) {
      coursesPromise = getCourseDataAPI()
    }

    coursesPromise
      .then(response => {
        if (active) {
          setCourses(response?.data?.data || [])
        }
      })
      .catch(error => {
        coursesPromise = null
        console.error('Failed to fetch course options:', error)
      })

    return () => {
      active = false
    }
  }, [])

  return courses
}
