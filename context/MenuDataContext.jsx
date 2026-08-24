'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getCourseDataAPI, getSpecializationsAPI } from '@/api'

// Single source of truth for /courses and /specializations, shared by
// Header and Footer. Both used to fetch these independently on mount
// (2 extra uncached requests per page, sitewide); this fetches once and
// both consumers read from the same state.
const MenuDataContext = createContext({
  courses: [],
  specializations: [],
  loading: true
})

// initialCourses/initialSpecializations: server-fetched data seeded in from
// app/layout.jsx (a Server Component), so Header/Footer have real menu data
// on the very first render instead of starting empty. `null` (as opposed to
// an empty array) specifically means "the server fetch didn't run or
// failed" — the trigger to still attempt the client-side fetch below,
// mirroring the initialData-present/absent pattern already used by
// CourseDetailClient/BlogClient/BlogsClient elsewhere in this codebase.
export const MenuDataProvider = ({
  children,
  initialCourses = null,
  initialSpecializations = null
}) => {
  const [courses, setCourses] = useState(initialCourses || [])
  const [specializations, setSpecializations] = useState(initialSpecializations || [])
  const [loading, setLoading] = useState(!(initialCourses && initialSpecializations))

  useEffect(() => {
    // Server already provided both lists — skip the redundant client fetch.
    if (initialCourses && initialSpecializations) return

    let active = true

    const loadMenuData = async () => {
      try {
        const [courseRes, specializationRes] = await Promise.all([
          getCourseDataAPI(),
          getSpecializationsAPI()
        ])

        if (!active) return

        setCourses(courseRes?.data?.data || [])
        setSpecializations(specializationRes?.data?.data || [])
      } catch (error) {
        console.error('Menu Data Error', error)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadMenuData()

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MenuDataContext.Provider value={{ courses, specializations, loading }}>
      {children}
    </MenuDataContext.Provider>
  )
}

export const useMenuData = () => useContext(MenuDataContext)
