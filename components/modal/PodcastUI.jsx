'use client'

export default function PodcastUI({ show, onClose }) {
  if (!show) return null

  return (
    <>
      <div
        className='modal fade show d-block'
        tabIndex='-1'
        aria-modal='true'
        role='dialog'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header border-0'>
              <h2 className='modal-title text-center w-100 fw-bold'>
                Delhi University, School Of Open Learning
              </h2>

              <button
                type='button'
                className='btn-close'
                onClick={onClose}
              />
            </div>

            <div className='modal-body'>
              <div className='bg-light rounded-pill p-3'>
                <audio controls className='w-100'>
                  <source src='/podcast.mp3' type='audio/mpeg' />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Backdrop */}
      <div
        className='modal-backdrop fade show'
        onClick={onClose}
      ></div>
    </>
  )
}