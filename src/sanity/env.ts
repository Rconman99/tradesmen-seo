export const apiVersion = "2024-07-11";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "not-configured";

// Whether a real Sanity project is configured. The "not-configured" fallback
// is all lowercase + a hyphen, so it passed the old /^[a-z0-9-]+$/ check and
// fooled the client/image guards into building against a nonexistent project —
// crashing every build that lacked NEXT_PUBLIC_SANITY_PROJECT_ID (i.e. Vercel
// auto-deploys). Excluding the placeholder explicitly lets those builds degrade
// to an empty blog instead of failing.
export const isSanityConfigured =
  projectId !== "not-configured" && /^[a-z0-9-]+$/.test(projectId);
