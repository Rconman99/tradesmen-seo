import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { cities } from "@/config/cities";
import { services } from "@/config/services";
import { sanityFetch } from "@/sanity/lib/client";
import { POST_SLUGS_QUERY } from "@/sanity/lib/queries";

/**
 * Sitemap index — 5 sub-sitemaps split by content type.
 * Next.js generates /sitemap.xml as an index pointing to
 * /sitemap/0.xml through /sitemap/4.xml automatically.
 */
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const baseUrl = business.website;

  switch (id) {
    // ── Static pages ──────────────────────────────
    case 0:
      return [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        { url: `${baseUrl}/resources/storm-damage-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
      ];

    // ── Service hub pages ─────────────────────────
    case 1:
      return services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    // ── City pages ────────────────────────────────
    case 2:
      return cities.map((city) => ({
        url: `${baseUrl}/areas/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: city.priority === "high" ? 0.9 : city.priority === "medium" ? 0.7 : 0.6,
      }));

    // ── City × Service pages ──────────────────────
    case 3:
      return cities.flatMap((city) =>
        services.map((service) => ({
          url: `${baseUrl}/areas/${city.slug}/${service.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: city.priority === "high" ? 0.85 : city.priority === "medium" ? 0.65 : 0.55,
        }))
      );

    // ── Blog posts ────────────────────────────────
    case 4: {
      const postSlugs = await sanityFetch<string[]>({
        query: POST_SLUGS_QUERY,
        tags: ["post"],
      });
      return postSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }

    default:
      return [];
  }
}
