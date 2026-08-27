// Escape `<` so a CMS-supplied string containing "</script>" (or "<!--")
// cannot break out of this inline <script> tag. `<` is still valid
// JSON and parses back to "<", so consumers see identical data.
const serialize = schema => JSON.stringify(schema).replace(/</g, '\\u003c')

export default function JsonLd ({ schema }) {
  if (!schema) return null

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: serialize(schema) }}
    />
  )
}
