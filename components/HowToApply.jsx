// components/HowToApply.jsx
'use client'

import { useState } from 'react'
import LeadModal from './LeadModal'
import {
    Globe,
    GraduationCap,
    FileText,
    Upload,
    CreditCard,
    BadgeCheck
} from 'lucide-react'


const steps = [
    {
        id: 1,
        icon: Globe,
        title: 'Visit the Official Website',
        desc: 'Students can visit the official website to check admission updates.'
    },
    {
        id: 2,
        icon: GraduationCap,
        title: 'Select Course & College',
        desc: 'Browse and choose the program and college that best fit your educational goals and interests.'
    },
    {
        id: 3,
        icon: FileText,
        title: 'Complete the Application Form',
        desc: 'Fill in all the required personal and academic details carefully in the online form.'
    },
    {
        id: 4,
        icon: Upload,
        title: 'Submit Documents',
        desc: 'Upload the required documents and certificates as per the admission guidelines.'
    },
    {
        id: 5,
        icon: CreditCard,
        title: 'Make the Application Payment',
        desc: 'Complete the application fee payment securely through the available online payment methods.'
    },
    {
        id: 6,
        icon: BadgeCheck,
        title: 'Final Submission & Confirmation',
        desc: 'Submit your application successfully and track further admission updates and confirmation details.'
    }
]

// Tenant-themed colors, computed at runtime from the CSS variables the
// TenantContext injects onto <html>. Tailwind's arbitrary-value type
// inference for bracket classes like bg-[color-mix(...)] or text-[var(...)]
// is a build-time heuristic guess (see tailwindcss/src/util/dataTypes.js
// `color()`), not a guarantee — using inline styles instead sidesteps that
// guesswork entirely and always resolves the live CSS variable.
const primaryTint4 = 'color-mix(in srgb, var(--primary-color) 4%, white)'
const primaryTint8 = 'color-mix(in srgb, var(--primary-color) 8%, white)'
const primaryTint25 = 'color-mix(in srgb, var(--primary-color) 25%, white)'
const primaryColorStyle = { color: 'var(--primary-color)' }

export default function HowToApply() {
    const [leadModalOpen, setLeadModalOpen] = useState(false)
    return (
        <>
        <section className='w-full py-10 md:py-14 overflow-hidden' style={{ backgroundColor: primaryTint4 }}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Heading */}
                <div className='mb-10 text-center lg:text-left'>
                    <h2 className='text-2xl sm:text-3xl font-bold uppercase' style={primaryColorStyle}>
                        How To Apply
                    </h2>

                    <div className='w-20 h-1 mt-3 rounded-full mx-auto lg:mx-0' style={{ backgroundColor: 'var(--secondary-color)' }}></div>
                </div>

                {/* Desktop Layout */}
                <div className='hidden lg:grid grid-cols-6 gap-6 relative'>
                    {/* Dotted Line */}
                    <div className='absolute top-8 left-0 w-full border-t-2 border-dashed z-0' style={{ borderColor: primaryTint25 }}></div>

                    {steps.map(step => {
                        const Icon = step.icon

                        return (
                            <div
                                key={step.id}
                                className='relative z-10 flex flex-col items-center text-center'
                            >
                                {/* Step Number */}
                                {/* <div className='absolute -top-2 right-10 bg-yellow-400 text-black text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow'>
                  {step.id}
                </div> */}

                                {/* Icon */}
                                <div className='w-16 h-16 rounded-2xl border bg-white flex items-center justify-center shadow-md' style={{ borderColor: primaryTint25 }}>
                                    <Icon className='w-8 h-8' style={primaryColorStyle} />
                                </div>

                                {/* Content */}
                                <h3 className='mt-5 text-sm font-semibold text-gray-900 leading-5 min-h-10.5'>
                                    {step.title}
                                </h3>

                                <p className='mt-2 text-xs text-gray-500 leading-5'>
                                    {step.desc}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Mobile & Tablet Layout */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden'>
                    {steps.map(step => {
                        const Icon = step.icon

                        return (
                            <div
                                key={step.id}
                                className='relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300'
                            >
                                {/* Step Number */}
                                <div className='absolute top-4 right-4 w-7 h-7 rounded-full text-black text-xs font-bold flex items-center justify-center' style={{ backgroundColor: 'var(--secondary-color)' }}>
                                    {step.id}
                                </div>

                                {/* Icon */}
                                <div className='w-14 h-14 rounded-xl border flex items-center justify-center' style={{ borderColor: primaryTint25, backgroundColor: primaryTint8 }}>
                                    <Icon className='w-7 h-7' style={primaryColorStyle} />
                                </div>

                                {/* Content */}
                                <h3 className='mt-4 text-sm font-semibold text-gray-900 leading-6'>
                                    {step.title}
                                </h3>

                                <p className='mt-2 text-xs text-gray-500 leading-5'>
                                    {step.desc}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Button */}
                <div className='flex justify-center mt-10'>
                    <button
  type="button"
  className="btn btn-purple"
  onClick={() => setLeadModalOpen(true)}
>
  APPLY NOW
</button>
                </div>
            </div>
        </section>

        <LeadModal
            open={leadModalOpen}
            setOpen={setLeadModalOpen}
        />
        </>
    )
}