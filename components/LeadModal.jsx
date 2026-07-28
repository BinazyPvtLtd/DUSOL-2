'use client'

import { useEffect } from 'react'
import PhoneInputField from '@/components/PhoneInputField'
import { useLeadForm } from '@/hooks/useLeadForm'
import { INDIAN_STATES } from '@/constant/indianStates'

export default function LeadModal({ open, setOpen, pageType, pageId }) {
  const {
    formData,
    loading,
    courseOptions,
    handleChange,
    setPhone,
    handleSubmit
  } = useLeadForm({
    source: 'Homepage',
    redirectTo: '/thank-you?source=lead',
    onSuccess: () => setOpen(false),
    pageType,
    pageId
  })

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

          <PhoneInputField value={formData.phone} onChange={setPhone} />

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
