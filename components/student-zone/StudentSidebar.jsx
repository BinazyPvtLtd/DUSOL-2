'use client'

import Link from 'next/link'
import PhoneInputField from '@/components/PhoneInputField'
import { useLeadForm } from '@/hooks/useLeadForm'
import { INDIAN_STATES } from '@/constant/indianStates'
import {
  STUDENT_ZONE_PAGES,
  buildStudentZoneUrl
} from '@/app/lib/studentZone'

export default function StudentSidebar({ pageKey, tenantSlug }) {
  const {
    formData,
    loading,
    courseOptions,
    handleChange,
    setPhone,
    handleSubmit
  } = useLeadForm({ source: 'Student Zone' })

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