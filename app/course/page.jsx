import { permanentRedirect } from "next/navigation";

// Legacy placeholder route (formerly an expired "Coming Soon" countdown).
// /course has a direct, unambiguous live equivalent, so it permanently
// redirects there instead of 404ing. See frontend audit, Critical Issues.
export default function CourseLegacyPage() {
  permanentRedirect("/courses");
}
