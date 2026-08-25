// lib/seo.js

// The CMS stores og/twitter images as storage-relative paths
// (e.g. "seo/01ABC.png"); social crawlers need absolute URLs.
const toAbsoluteImageUrl = url => {
  if (!url) return null
  if (/^https?:\/\//.test(url)) return url
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${url}`
}

// fallbackCanonicalUrl: the page's own real, self-referencing absolute URL
// (e.g. "https://dusol.example.com/courses/du-sol-distance-ba-course"),
// passed in by each route's generateMetadata() since only the route itself
// knows its own URL pattern. Used only when the CMS canonical_url field is
// empty — a populated CMS value always wins. Deliberately not a generic
// "default to the homepage" fallback: that would make every page with a
// blank canonical_url claim the homepage as its canonical, which is worse
// than omitting the tag (Next.js already omits it when both are absent).
export const generateSEOMetadata = (seo = {}, fallbackCanonicalUrl) => {
  const canonicalUrl = seo.canonical_url || fallbackCanonicalUrl

  return {
    title: seo.meta_title,
    description: seo.meta_description,

    keywords: seo.meta_keywords
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean),

    alternates: {
      canonical: canonicalUrl,
    },

    robots: seo.robots,

    openGraph: {
      title: seo.og_title || seo.meta_title,
      description: seo.og_description || seo.meta_description,
      url: canonicalUrl,
      images: seo.og_image
        ? [
            {
              url: toAbsoluteImageUrl(seo.og_image),
              width: 1200,
              height: 630,
            },
          ]
        : [],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seo.twitter_title || seo.meta_title,
      description:
        seo.twitter_description || seo.meta_description,
      images: seo.twitter_image
        ? [toAbsoluteImageUrl(seo.twitter_image)]
        : [],
    },
  };
};