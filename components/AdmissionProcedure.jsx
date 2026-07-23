// components/AdmissionProcedure.jsx
'use client'

import IconMapper from './IconMapper'

// Tenant-themed colors, computed at runtime from the CSS variables the
// TenantContext injects onto <html>. Tailwind's arbitrary-value type
// inference for bracket classes like bg-[color-mix(...)] or text-[var(...)]
// is a build-time heuristic guess, not a guarantee — inline styles sidestep
// that guesswork entirely and always resolve the live CSS variable.
const secondaryTint6 = 'color-mix(in srgb, var(--secondary-color) 6%, white)'
const primaryTint25 = 'color-mix(in srgb, var(--primary-color) 25%, white)'
const primaryColorStyle = { color: 'var(--primary-color)' }
const isHtmlContent = value => /<\/?[a-z][\s\S]*>/i.test(value || '')

export default function AdmissionProcedure({ homeData }) {
  const admissionProcedure = homeData?.admissionProcedure
  const steps = admissionProcedure?.steps || []

  if (!admissionProcedure) return null

  return (
    <section
      className='w-full py-10 md:py-14 overflow-hidden'
      style={{ backgroundColor: secondaryTint6 }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-10 text-center lg:text-left'>
          <h2
            className='text-2xl sm:text-3xl font-bold text-center mb-2'
            style={primaryColorStyle}
          >
            {admissionProcedure.title}
          </h2>
       
          {admissionProcedure.description && (
            <div
              className="mt-3 text-gray-600 admission-content"
              dangerouslySetInnerHTML={{
                __html: admissionProcedure.description
              }}
            />
          )}         
        </div>

        {steps.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {steps.map((step, i) => (
              <div
                key={i}
                className='relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300'
              >
                <div
                  className='absolute top-4 right-4 w-7 h-7 rounded-full text-black text-xs font-bold flex items-center justify-center'
                  style={{ backgroundColor: 'var(--secondary-color)' }}
                >
                  {i + 1}
                </div>

                <div
                  className='w-14 h-14 rounded-xl border flex items-center justify-center'
                  style={{ borderColor: primaryTint25, backgroundColor: 'white' }}
                >
                  <IconMapper name={step.icon} className='w-7 h-7' style={primaryColorStyle} />
                </div>

                <h3 className='mt-4 text-sm font-semibold text-gray-900 leading-6'>
                  {step.title}
                </h3>

                {isHtmlContent(step.description) ? (
                  <div
                    className='mt-2 text-xs text-gray-500 leading-5 rich-content'
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                ) : (
                  <p className='mt-2 text-xs text-gray-500 leading-5'>
                    {step.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
