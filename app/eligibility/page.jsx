import { notFound } from "next/navigation";

// Legacy placeholder route (formerly an expired "Coming Soon" countdown).
// No standalone /eligibility page exists to redirect to: eligibility
// content lives per-course (/courses/[slug]) and as a section on the
// homepage, not as one canonical page, so this 404s instead of guessing
// a destination. See frontend audit, Critical Issues.
export default function EligibilityLegacyPage() {
  notFound();
}
