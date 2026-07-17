// Renders nothing when no brochure URL exists — no dead links.
// Plain <a>, not next/link: the URL is an external file, not a route.
// target='_blank' because browsers ignore `download` on cross-origin URLs.
export default function BrochureButton ({ url, className = 'btn btn-outline-white' }) {
  if (!url) return null

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      download
      className={className}
    >
      DOWNLOAD BROCHURE
    </a>
  )
}
