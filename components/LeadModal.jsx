'use client'

import { AddLeadAPI } from '@/api'
import { useTenant } from '@/context/TenantContext'
import { useEffect, useState } from 'react'

export default function LeadModal ({ open, setOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    // course: '',
    state: '',
    remarks: '',
    consent: false
  })
  const { tenant } = useTenant()

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

  const buildLeadPayload = values => {
    return {
      name: values.name,
      email: values.email,
      phone: values.phone,
      state: values.state,
      // course: values.course,
      remarks: values.remarks,
      source: 'Google Ads',
      page_url: window.location.href,
      university_id: tenant?.id
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!tenant?.id) {
      alert('University information is not available. Please try again.')
      return
    }

    try {
      const payload = buildLeadPayload(formData)

      const response = await AddLeadAPI(payload)
      
      if (response?.success) {
        alert('Lead submitted successfully!')

        setFormData({
          name: '',
          email: '',
          phone: '',
          // course: '',
          state: '',
          remarks: '',
          consent: false
        })

        setOpen(false)
      } else {
        alert(response?.message || 'Something went wrong.')
      }
    } catch (error) {
      console.error('Add Lead Error:', error)
      alert('Failed to submit lead.')
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

          <div className='lead-phone'>
            <select>
              <option>IN +91</option>
            </select>

            <input
              type='tel'
              name='phone'
              placeholder='Enter Your Number'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <select
            name='course'
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value=''>Select Course</option>
            <option>BA</option>
            <option>BBA</option>
            <option>BCom</option>
            <option>BMS</option>
            <option>MA</option>
            <option>MBA</option>
            <option>MCom</option>
            <option>MCA</option>
            <option>MLIS</option>
            <option>MSc</option>
          </select>

          <select
            name='state'
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value=''>Select State</option>
            <option>Delhi</option>
            <option>Bihar</option>
            <option>Uttar Pradesh</option>
            <option>Haryana</option>
            <option>Punjab</option>
            <option>Rajasthan</option>
            <option>Madhya Pradesh</option>
            <option>Maharashtra</option>
            <option>West Bengal</option>
            <option>Other</option>
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

          <button type='submit' className='lead-submit'>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  )
}
