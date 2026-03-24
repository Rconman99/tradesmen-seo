import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/", "/lp/"],
      },
      // Explicitly allow AI search engine crawlers for AI Overview visibility
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/studio", "/api/", "/lp/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/studio", "/api/", "/lp/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/studio", "/api/", "/lp/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/studio", "/api/", "/lp/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/studio", "/api/", "/lp/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/studio", "/api/", "/lp/"],
      },
    ],
    sitemap: `${business.website}/sitemap.xml`,
  };
}
