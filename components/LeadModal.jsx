'use client'

import { useEffect } from 'react'

export default function LeadModal ({ open, setOpen }) {
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
    if (typeof document === 'undefined') return

    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null
  return (
    <div className='lead-modal open' aria-hidden={!open}>
      <div className='lead-overlay' onClick={() => setOpen(false)} />
      <div
        className='lead-box'
        role='dialog'
        aria-modal='true'
        aria-label='Book Free Counseling'
      >
        <button
          className='lead-x'
          onClick={() => setOpen(false)}
          aria-label='Close'
        >
          &times;
        </button>
        <h3>Book 100% Free Counseling</h3>
        <p className='lead-sub'>
          Get 1 to 1 Expert Guidance from College Drishti
        </p>
        <form
          className='lead-fields'
          onSubmit={e => {
            e.preventDefault()
            alert('Thank you! Our counsellor will contact you shortly.')
            setOpen(false)
            e.target.reset()
          }}
        >
          <input type='text' placeholder='Enter Your Name' required />
          <input type='email' placeholder='Enter Your Email' required />
          <div className='lead-phone'>
            <select aria-label='Country code'>
              <option>IN +91 (India)</option>
              <option>+1 (USA)</option>
              <option>+44 (UK)</option>
              <option>+971 (UAE)</option>
            </select>
            <input type='tel' placeholder='Enter Your Number' required />
          </div>
          <select required>
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
          <select required>
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
            <input type='checkbox' required /> I consent to share my details
            with UGC-DEB approved universities and receive updates via
            email/mobile. <a href='/'>Disclaimer</a>
          </label>
          <button type='submit' className='lead-submit'>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  )
}
