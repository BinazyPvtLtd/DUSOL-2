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

export const MenuDataProvider = ({ children }) => {
  const [courses, setCourses] = useState([])
  const [specializations, setSpecializations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [])

  return (
    <MenuDataContext.Provider value={{ courses, specializations, loading }}>
      {children}
    </MenuDataContext.Provider>
  )
}

export const useMenuData = () => useContext(MenuDataContext)
