import { notFound } from "next/navigation";

// Legacy placeholder route (formerly an expired "Coming Soon" countdown).
// "News" was never implemented as a standalone listing — the homepage has
// a "Latest News" section, but /blogs is a distinct content type (articles,
// not official notices), so it is not a safe equivalent. 404s instead of
// redirecting to unrelated content. See frontend audit, Critical Issues.
export default function NewsLegacyPage() {
  notFound();
}
