import { describe, it, expect } from "vitest";
import { cities, getCityBySlug } from "@/config/cities";
import { services } from "@/config/services";

describe("city data integrity", () => {
  it("every city has a non-empty slug", () => {
    for (const city of cities) {
      expect(city.slug, `City at index ${cities.indexOf(city)}`).toBeTruthy();
    }
  });

  it("every city has a non-empty name", () => {
    for (const city of cities) {
      expect(city.name, `slug: ${city.slug}`).toBeTruthy();
    }
  });

  it("every city has state and stateAbbr", () => {
    for (const city of cities) {
      expect(city.state, `slug: ${city.slug}`).toBeTruthy();
      expect(city.stateAbbr, `slug: ${city.slug}`).toBeTruthy();
    }
  });

  it("every city stateAbbr is WA or ID", () => {
    for (const city of cities) {
      expect(
        ["WA", "ID"].includes(city.stateAbbr),
        `${city.slug} has stateAbbr "${city.stateAbbr}"`
      ).toBe(true);
    }
  });

  it("every city has at least one ZIP code", () => {
    for (const city of cities) {
      expect(
        city.zip.length,
        `${city.slug} has no ZIP codes`
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it("every city has non-empty localContent", () => {
    for (const city of cities) {
      expect(city.localContent, `${city.slug}`).toBeTruthy();
    }
  });

  it("every city has a non-empty county", () => {
    for (const city of cities) {
      expect(city.county, `${city.slug}`).toBeTruthy();
    }
  });

  it("every city has valid latitude (roughly WA/ID range)", () => {
    for (const city of cities) {
      expect(city.lat, `${city.slug} lat`).toBeGreaterThan(44);
      expect(city.lat, `${city.slug} lat`).toBeLessThan(50);
    }
  });

  it("every city has valid longitude (roughly WA/ID range)", () => {
    for (const city of cities) {
      expect(city.lng, `${city.slug} lng`).toBeGreaterThan(-122);
      expect(city.lng, `${city.slug} lng`).toBeLessThan(-115);
    }
  });

  it("all city slugs are unique", () => {
    const slugs = cities.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every nearbyCity slug resolves to an existing city", () => {
    for (const city of cities) {
      for (const slug of city.nearbyCity || []) {
        expect(
          getCityBySlug(slug),
          `${city.slug} references nearbyCity "${slug}" which does not exist`
        ).toBeDefined();
      }
    }
  });

  it("every city has a valid priority", () => {
    for (const city of cities) {
      expect(
        ["high", "medium", "low"].includes(city.priority),
        `${city.slug} has priority "${city.priority}"`
      ).toBe(true);
    }
  });

  it("every city has a positive population", () => {
    for (const city of cities) {
      expect(city.population, `${city.slug}`).toBeGreaterThan(0);
    }
  });
});

describe("service data integrity", () => {
  it("every service has a non-empty slug", () => {
    for (const service of services) {
      expect(service.slug).toBeTruthy();
    }
  });

  it("every service has a non-empty name", () => {
    for (const service of services) {
      expect(service.name).toBeTruthy();
    }
  });

  it("every service has a non-empty description", () => {
    for (const service of services) {
      expect(service.description).toBeTruthy();
    }
  });

  it("every service has at least one keyword", () => {
    for (const service of services) {
      expect(service.keywords.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("every service has at least one detail", () => {
    for (const service of services) {
      expect(service.details.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("all service slugs are unique", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
