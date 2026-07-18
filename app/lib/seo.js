// lib/seo.js

// The CMS stores og/twitter images as storage-relative paths
// (e.g. "seo/01ABC.png"); social crawlers need absolute URLs.
const toAbsoluteImageUrl = url => {
  if (!url) return null
  if (/^https?:\/\//.test(url)) return url
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${url}`
}

export const generateSEOMetadata = (seo = {}) => {
  return {
    title: seo.meta_title,
    description: seo.meta_description,

    keywords: seo.meta_keywords
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean),

    alternates: {
      canonical: seo.canonical_url,
    },

    robots: seo.robots,

    openGraph: {
      title: seo.og_title || seo.meta_title,
      description: seo.og_description || seo.meta_description,
      url: seo.canonical_url,
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