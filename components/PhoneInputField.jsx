'use client'

import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

/**
 * SSR-safe phone input with country flag selector.
 * Uses a mounted guard to avoid hydration mismatches.
 *
 * Props:
 *   value      {string}   - phone number string (controlled)
 *   onChange   {function} - called with the new phone string
 *   required   {boolean}  - whether the field is required (default: true)
 *   name       {string}   - input name attribute (default: 'phone')
 */
export default function PhoneInputField ({
  value,
  onChange,
  required = true,
  name = 'phone'
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <input
        type='tel'
        name={name}
        placeholder='Enter Your Number'
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
      />
    )
  }

  return (
    <PhoneInput
      country={'in'}
      value={value}
      onChange={onChange}
      inputProps={{
        name,
        required,
        placeholder: 'Enter Your Number'
      }}
      containerClass='lead-phone-container'
      inputClass='lead-phone-input'
      buttonClass='lead-phone-btn'
      enableSearch
      searchPlaceholder='Search country...'
      preferredCountries={['in', 'us', 'gb', 'ae', 'ca', 'au']}
    />
  )
}
