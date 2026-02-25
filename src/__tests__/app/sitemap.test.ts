import { describe, it, expect, vi } from "vitest";
import { business } from "@/config/business";
import { cities } from "@/config/cities";
import { services } from "@/config/services";

// Mock sanityFetch before importing sitemap
vi.mock("@/sanity/lib/client", () => ({
  sanityFetch: vi.fn().mockResolvedValue(["test-blog-post", "another-post"]),
}));

// Dynamic import after mocking
const { default: sitemap } = await import("@/app/sitemap");

describe("sitemap", () => {
  it("returns an array of sitemap entries", async () => {
    const entries = await sitemap();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it("includes the homepage", async () => {
    const entries = await sitemap();
    expect(entries.find((e) => e.url === business.website)).toBeDefined();
  });

  it("includes all static pages", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${business.website}/services`);
    expect(urls).toContain(`${business.website}/areas`);
    expect(urls).toContain(`${business.website}/about`);
    expect(urls).toContain(`${business.website}/contact`);
    expect(urls).toContain(`${business.website}/reviews`);
    expect(urls).toContain(`${business.website}/blog`);
  });

  it("includes a page for each service", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    for (const service of services) {
      expect(urls).toContain(
        `${business.website}/services/${service.slug}`
      );
    }
  });

  it("includes a page for each city", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    for (const city of cities) {
      expect(urls).toContain(`${business.website}/areas/${city.slug}`);
    }
  });

  it("includes city x service cross-product pages", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    // Spot-check a few combinations
    expect(urls).toContain(
      `${business.website}/areas/spokane-wa/core-drilling`
    );
    expect(urls).toContain(
      `${business.website}/areas/coeur-dalene-id/concrete-cutting`
    );
  });

  it("includes blog posts from Sanity", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${business.website}/blog/test-blog-post`);
    expect(urls).toContain(`${business.website}/blog/another-post`);
  });

  it("gives higher priority to high-priority cities", async () => {
    const entries = await sitemap();
    const spokane = entries.find(
      (e) => e.url === `${business.website}/areas/spokane-wa`
    );
    const omak = entries.find(
      (e) => e.url === `${business.website}/areas/omak-wa`
    );
    expect(spokane!.priority).toBeGreaterThan(omak!.priority!);
  });
});
