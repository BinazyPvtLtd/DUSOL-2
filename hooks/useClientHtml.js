'use client'

import { useEffect, useState } from 'react'

// SSR/CSR-safe wrapper for browser-only HTML transforms — e.g.
// applyInfoTableStyling/stripLinks in helperFunction/Helper.js, which use
// DOMParser and no-op during SSR since `document` doesn't exist there.
//
// Calling those transforms inline during render makes the server's output
// (untransformed) diverge from the client's first-render output
// (transformed, since `document` exists in the browser), which React's
// hydration pass rejects as a mismatch (errors #418/#422).
//
// This hook renders `rawHtml` unchanged on the first render — identical on
// both the server and the client's hydration-matching first render, since
// the transform hasn't run yet — then applies `transform` inside a
// useEffect once mounted. That update happens after hydration has already
// completed, so it's a normal client-side re-render, not a hydration
// comparison: the transformed (table-styled / link-stripped) markup still
// appears immediately after mount, same as before.
export function useClientHtml (rawHtml, transform) {
  const [html, setHtml] = useState(rawHtml)

  useEffect(() => {
    setHtml(transform(rawHtml))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHtml])

  return html
}
