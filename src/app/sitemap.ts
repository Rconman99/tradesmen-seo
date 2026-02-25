import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { cities } from "@/config/cities";
import { services } from "@/config/services";
import { sanityFetch } from "@/sanity/lib/client";
import { POST_SLUGS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = business.website;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/areas/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: city.priority === "high" ? 0.9 : city.priority === "medium" ? 0.7 : 0.6,
  }));

  const cityServicePages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    services.map((service) => ({
      url: `${baseUrl}/areas/${city.slug}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: city.priority === "high" ? 0.85 : city.priority === "medium" ? 0.65 : 0.55,
    }))
  );

  // Blog post pages from Sanity
  const postSlugs = await sanityFetch<string[]>({
    query: POST_SLUGS_QUERY,
    tags: ["post"],
  });

  const blogPages: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...cityPages, ...cityServicePages, ...blogPages];
}
