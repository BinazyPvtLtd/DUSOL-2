'use client'

import { useState } from 'react'
import Link from 'next/link'
import PhoneInputField from '@/components/PhoneInputField'
import { useLeadSubmit } from '@/hooks/useLeadSubmit'
import { useCourseOptions } from '@/hooks/useCourseOptions'
import { INDIAN_STATES } from '@/constant/indianStates'
import {
  STUDENT_ZONE_PAGES,
  buildStudentZoneUrl
} from '@/app/lib/studentZone'

export default function StudentSidebar({ pageKey, tenantSlug }) {
  const [loading, setLoading] = useState(false)
  const submitLead = useLeadSubmit()
  const courseOptions = useCourseOptions()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    state: '',
    remarks: '',
    consent: false
  })

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
    remarks: values.remarks || '',
    source: 'Student Zone',
    page_url:
      typeof window !== 'undefined' ? window.location.href : ''
  })

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      state: '',
      remarks: '',
      consent: false
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formData.consent) {
      alert('Please provide your consent.')
      return
    }

    try {
      setLoading(true)

      const payload = buildLeadPayload(formData)

      await submitLead(payload, { onSuccess: resetForm })
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside>
      <div className='counsel-card'>
        <div className='counsel-head'>
          <h3>Book 100% Free Counseling</h3>
          <p>Get 1 to 1 Expert Guidance from DU SOL</p>
        </div>

        <form className='counsel-body' onSubmit={handleSubmit}>
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
            onChange={phone =>
              setFormData(prev => ({
                ...prev,
                phone
              }))
            }
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

          <label className='consent'>
            <input
              type='checkbox'
              name='consent'
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <span>
              I authorise DU SOL to contact me with updates via
              SMS/Email/WhatsApp.
            </span>
          </label>

          <button
            type='submit'
            className='btn btn-purple btn-block'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'SUBMIT'}
          </button>
        </form>
      </div>

      <div className='side-card' style={{ marginTop: '22px' }}>
        <h3>Student Zone Links</h3>

        <ul className='qual-list'>
          {STUDENT_ZONE_PAGES.map(({ label, key }) => (
            <li key={key}>
              <Link
                href={buildStudentZoneUrl(tenantSlug, key)}
                style={{
                  color:
                    pageKey === key
                      ? 'var(--purple)'
                      : 'inherit',
                  fontWeight:
                    pageKey === key ? 700 : 500
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}