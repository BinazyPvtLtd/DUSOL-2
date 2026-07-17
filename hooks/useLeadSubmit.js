'use client'

import { useRouter } from 'next/navigation'
import { AddLeadAPI } from '@/api'

// Shared lead submission: every lead form goes through here so the
// /thank-you redirect happens in exactly one place.
export function useLeadSubmit () {
  const router = useRouter()

  return async (payload, { onSuccess } = {}) => {
    try {
      const response = await AddLeadAPI(payload)

      if (response.data.success) {
        onSuccess?.()
        router.push('/thank-you')
        return true
      }

      alert(response.data.message || 'Something went wrong.')
      return false
    } catch (error) {
      console.error('Add Lead Error:', error)

      alert(error.response?.data?.message || 'Failed to submit lead.')
      return false
    }
  }
}
