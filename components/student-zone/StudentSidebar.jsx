'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AddLeadAPI } from '@/api'
import PhoneInputField from '@/components/PhoneInputField'

const SZ_LINKS = [
  ['Admission', 'dusol-admission'],
  ['Courses & Fees', 'dusol-courses-fees'],
  ['Hall Ticket', 'dusol-hall-ticket'],
  ['Study Material', 'du-sol-study-material'],
  ['Result', 'dusol-result'],
  ['Library Portal', 'du-sol-library-portal'],
  ['Assignment Status', 'du-sol-assignment-status'],
  ['Alternative Universities', 'dusol-alternative-universities']
]

export default function StudentSidebar({ pageKey }) {
  const [loading, setLoading] = useState(false)

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

    if (!formData.consent) {
      alert('Please provide your consent.')
      return
    }

    try {
      setLoading(true)

      const payload = buildLeadPayload(formData)

      const response = await AddLeadAPI(payload)

      if (response.data.success) {
        alert(response.data.message)
        resetForm()
      } else {
        alert(response.data.message || 'Something went wrong.')
      }
    } catch (error) {
      console.error(error)

      alert(error.response?.data?.message || 'Failed to submit lead.')
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
          {SZ_LINKS.map(([label, slug]) => (
            <li key={slug}>
              <Link
                href={`/student-zone?p=${slug}`}
                style={{
                  color:
                    pageKey === slug
                      ? 'var(--purple)'
                      : 'inherit',
                  fontWeight:
                    pageKey === slug ? 700 : 500
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