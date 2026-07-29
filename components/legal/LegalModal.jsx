'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function LegalModal({ open, onClose, title, viewFullPageHref, children }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)

  // Remember what had focus before opening, and move focus into the dialog.
  useEffect(() => {
    if (!open) return

    triggerRef.current = document.activeElement
    closeButtonRef.current?.focus()

    return () => {
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus()
      }
    }
  }, [open])

  // Lock background scroll while the modal is open.
  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // ESC to close + Tab focus trap.
  useEffect(() => {
    if (!open) return

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const titleId = `legal-modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`

  const handleOutsideMouseDown = e => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose()
    }
  }

  return (
    <div
      className='fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6'
      onMouseDown={handleOutsideMouseDown}
    >
      <div className='absolute inset-0 bg-ink/60 backdrop-blur-sm' aria-hidden='true' />

      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        className='relative flex h-[80vh] max-h-[85vh] w-full max-w-[900px] flex-col overflow-hidden rounded-site bg-white shadow-lg'
      >
        <div className='h-full overflow-y-auto'>
          <div className='sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white px-5 py-4 sm:px-8'>
            <h2 id={titleId} className='font-head text-lg font-bold text-purple sm:text-2xl'>
              {title}
            </h2>

            <button
              ref={closeButtonRef}
              type='button'
              onClick={onClose}
              aria-label='Close'
              className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-line text-xl leading-none text-ink transition hover:bg-bg'
            >
              &times;
            </button>
          </div>

          <div className='px-5 py-6 sm:px-8'>
            {children}

            {viewFullPageHref && (
              <div className='mt-8 border-t border-line pt-5'>
                <Link
                  href={viewFullPageHref}
                  onClick={onClose}
                  className='inline-flex items-center gap-1 font-semibold text-purple hover:underline'
                >
                  View Full Page
                  <span aria-hidden='true'>&rarr;</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
