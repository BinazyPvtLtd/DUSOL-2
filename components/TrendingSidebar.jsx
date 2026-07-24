'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTrendingBlogsApi } from '@/api'
import { FALLBACK_TRENDING_BLOGS } from '@/constant/trendingFallback'

function TrendingThumb ({ blog }) {
  if (blog.featured_image) {
    return (
      <div className='trend-thumb'>
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.featured_image}`}
          alt={blog.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit'
          }}
        />
      </div>
    )
  }

  return (
    <div className='trend-thumb'>
      <svg viewBox='0 0 30 30' fill='none'>
        <rect
          x='4'
          y='3'
          width='22'
          height='24'
          rx='3'
          fill='rgba(255,255,255,.2)'
        />
        <rect
          x='8'
          y='9'
          width='14'
          height='2.5'
          rx='1.2'
          fill='rgba(255,255,255,.6)'
        />
        <rect
          x='8'
          y='14'
          width='10'
          height='2'
          rx='1'
          fill='rgba(255,255,255,.4)'
        />
      </svg>
    </div>
  )
}

// Fetches real trending blogs from the API. Falls back to a small static
// list only if the API call fails, so the sidebar never breaks the page.
export default function TrendingSidebar () {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const fetchTrending = async () => {
      try {
        const response = await getTrendingBlogsApi()
        if (!cancelled) setTrending(response?.data?.data || [])
      } catch (error) {
        console.error('Failed to fetch trending blogs:', error)
        if (!cancelled) setTrending(FALLBACK_TRENDING_BLOGS)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchTrending()

    return () => {
      cancelled = true
    }
  }, [])

  // Loading: render nothing. Empty: hide the section entirely.
  if (loading || trending.length === 0) return null

  return (
    <div className='card' style={{ padding: '22px' }}>
      <div className='side-trending'>
        <h3>Trending Post</h3>
        {trending.map(t => (
          <div key={t.slug} className='trend-item'>
            <TrendingThumb blog={t} />
            <div>
              <h4>{t.title}</h4>
              <Link href={`/blog/${t.slug}`}>Read More →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
