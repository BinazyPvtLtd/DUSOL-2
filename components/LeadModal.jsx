'use client'

import { useEffect, useState } from 'react'
import PhoneInputField from '@/components/PhoneInputField'
import { useLeadSubmit } from '@/hooks/useLeadSubmit'
import { useCourseOptions } from '@/hooks/useCourseOptions'
import { INDIAN_STATES } from '@/constant/indianStates'

export default function LeadModal({ open, setOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    state: '',
    remarks: '',
    consent: false
  })

  const [loading, setLoading] = useState(false)

  const submitLead = useLeadSubmit()
  const courseOptions = useCourseOptions()

  useEffect(() => {
    if (typeof document === 'undefined') return

    const handler = e => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [setOpen])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const handleChange = e => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const buildLeadPayload = values => ({
    name: values.name,
    email: values.email,
    phone: values.phone,
    state: values.state,
    remarks: values.remarks,
    source: 'Homepage',
    page_url: window.location.href
  })

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      state: '',
      remarks: '',
      consent: false
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const payload = buildLeadPayload(formData)

      await submitLead(payload, {
        onSuccess: () => {
          resetForm()
          setOpen(false)
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='lead-modal open'>
      <div className='lead-overlay' onClick={() => setOpen(false)} />

      <div className='lead-box'>
        <button className='lead-x' onClick={() => setOpen(false)}>
          &times;
        </button>

        <h3>Book 100% Free Counseling</h3>

        <form className='lead-fields' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Enter Your Name'
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type='email'
            name='email'
            placeholder='Enter Your Email'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <PhoneInputField
            value={formData.phone}
            onChange={phone => setFormData(prev => ({ ...prev, phone }))}
          />

          <select
            name='course'
            value={formData.course}
            onChange={handleChange}
          >
            <option value=''>Select Course</option>
            {courseOptions.map(c => (
              <option key={c.id} value={c.short_name || c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name='state'
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value=''>Select State</option>
            {INDIAN_STATES.map(state => (
              <option key={state}>{state}</option>
            ))}
          </select>

          <label className='lead-consent'>
            <input
              type='checkbox'
              name='consent'
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            I consent to share my details.
          </label>

          <button type='submit' className='lead-submit' disabled={loading}>
            {loading ? 'Submitting...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  )
}
