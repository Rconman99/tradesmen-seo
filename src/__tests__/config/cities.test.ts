import { describe, it, expect } from "vitest";
import {
  cities,
  getCityBySlug,
  getCitiesByPriority,
  getCitiesByState,
  getNearbyCities,
} from "@/config/cities";

describe("getCityBySlug", () => {
  it("returns the correct city for a valid slug", () => {
    const city = getCityBySlug("spokane-wa");
    expect(city).toBeDefined();
    expect(city!.name).toBe("Spokane");
    expect(city!.stateAbbr).toBe("WA");
  });

  it("returns undefined for a nonexistent slug", () => {
    expect(getCityBySlug("nonexistent-city")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(getCityBySlug("")).toBeUndefined();
  });

  it("finds an Idaho city", () => {
    const city = getCityBySlug("coeur-dalene-id");
    expect(city).toBeDefined();
    expect(city!.name).toBe("Coeur d'Alene");
    expect(city!.stateAbbr).toBe("ID");
  });
});

describe("getCitiesByPriority", () => {
  it("returns only high-priority cities", () => {
    const highCities = getCitiesByPriority("high");
    expect(highCities.length).toBeGreaterThan(0);
    expect(highCities.every((c) => c.priority === "high")).toBe(true);
  });

  it("returns only medium-priority cities", () => {
    const medCities = getCitiesByPriority("medium");
    expect(medCities.length).toBeGreaterThan(0);
    expect(medCities.every((c) => c.priority === "medium")).toBe(true);
  });

  it("returns only low-priority cities", () => {
    const lowCities = getCitiesByPriority("low");
    expect(lowCities.length).toBeGreaterThan(0);
    expect(lowCities.every((c) => c.priority === "low")).toBe(true);
  });

  it("all cities are accounted for across priorities", () => {
    const high = getCitiesByPriority("high").length;
    const med = getCitiesByPriority("medium").length;
    const low = getCitiesByPriority("low").length;
    expect(high + med + low).toBe(cities.length);
  });
});

describe("getCitiesByState", () => {
  it("returns WA cities", () => {
    const waCities = getCitiesByState("WA");
    expect(waCities.length).toBeGreaterThan(0);
    expect(waCities.every((c) => c.stateAbbr === "WA")).toBe(true);
  });

  it("returns ID cities", () => {
    const idCities = getCitiesByState("ID");
    expect(idCities.length).toBeGreaterThan(0);
    expect(idCities.every((c) => c.stateAbbr === "ID")).toBe(true);
  });

  it("WA + ID cities equal total", () => {
    const wa = getCitiesByState("WA").length;
    const id = getCitiesByState("ID").length;
    expect(wa + id).toBe(cities.length);
  });

  it("returns empty array for a state with no cities", () => {
    expect(getCitiesByState("CA")).toEqual([]);
  });
});

describe("getNearbyCities", () => {
  it("resolves nearby city slugs to full city objects", () => {
    const spokane = getCityBySlug("spokane-wa")!;
    const nearby = getNearbyCities(spokane);
    expect(nearby.length).toBeGreaterThan(0);
    expect(nearby.every((c) => c.slug !== undefined)).toBe(true);
  });

  it("returns empty array for a city with no neighbors", () => {
    const omak = getCityBySlug("omak-wa")!;
    const nearby = getNearbyCities(omak);
    expect(nearby).toEqual([]);
  });

  it("does not include the city itself in its nearby list", () => {
    const spokane = getCityBySlug("spokane-wa")!;
    const nearby = getNearbyCities(spokane);
    expect(nearby.find((c) => c.slug === "spokane-wa")).toBeUndefined();
  });
});
