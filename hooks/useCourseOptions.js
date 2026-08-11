'use client'

import { useMenuData } from '@/context/MenuDataContext'

// Shared course list for lead form Course dropdowns: MenuDataContext (root
// layout) already fetches /courses once and shares it with Header/Footer —
// this reuses that same data instead of firing a second /courses request.
// Every consumer of this hook renders under the root layout, so
// MenuDataContext is always available here.
export function useCourseOptions () {
  const { courses } = useMenuData()

  return courses
}
