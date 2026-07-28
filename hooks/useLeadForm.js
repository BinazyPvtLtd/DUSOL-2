'use client'

import { useRef, useState } from 'react'
import { useLeadSubmit } from '@/hooks/useLeadSubmit'
import { useCourseOptions } from '@/hooks/useCourseOptions'

// Shared lead-form logic: every embedded/modal lead form (Blog, Blogs
// listing, Course, Specialization, Student Zone, LeadModal, ...) owns the
// same formData/loading state, handlers and payload shape. Centralising it
// here means the fields/validation only need to be correct in one place.
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  course: '',
  state: '',
  remarks: '',
  consent: false
}

export function useLeadForm ({
  source,
  redirectTo,
  onSuccess,
  pageId,
  pageType
} = {}) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [loading, setLoading] = useState(false)
  const submitLead = useLeadSubmit()
  const courseOptions = useCourseOptions()

  // Synchronous guard: setLoading(true) only takes effect on the next
  // render, so a fast double-click (or double Enter) before that repaint
  // can still slip a second submit past the `disabled={loading}` button.
  // A ref is read/set immediately, independent of React's render cycle.
  const submittingRef = useRef(false)

  const handleChange = e => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const setPhone = phone => {
    setFormData(prev => ({ ...prev, phone }))
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
  }

  const buildLeadPayload = values => {
    // The <select> stores the course's display label (short_name || name),
    // not its id, so it doubles as a human-readable field on the lead
    // record. Resolve the matching option here to also send course_id,
    // which is what the backend actually validates/links against.
    const selectedCourse = courseOptions.find(
      c => (c.short_name || c.name) === values.course
    )

    return {
      name: values.name,
      email: values.email,
      phone: values.phone,
      course: values.course || '',
      course_id: selectedCourse?.id ?? null,
      state: values.state,
      remarks: values.remarks || '',
      source,
      page_url: window.location.href
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Blocks a second submit that fires before the loading state above has
    // re-rendered the disabled button (rapid double-click, double Enter).
    if (submittingRef.current) return

    if (!formData.consent) {
      alert('Please provide your consent.')
      return
    }

    submittingRef.current = true
    setLoading(true)

    try {
      const payload = buildLeadPayload(formData)

      await submitLead(payload, {
        redirectTo,
        onSuccess: () => {
          resetForm()
          onSuccess?.()
        }
      })
    } finally {
      submittingRef.current = false
      setLoading(false)
    }
  }

  return {
    formData,
    loading,
    courseOptions,
    pageId,
    pageType,
    handleChange,
    setPhone,
    buildLeadPayload,
    resetForm,
    handleSubmit
  }
}
