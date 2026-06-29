// lib/seo.js

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
              url: seo.og_image,
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
        ? [seo.twitter_image]
        : [],
    },
  };
};