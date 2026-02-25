import { describe, it, expect } from "vitest";
import { services, getServiceBySlug } from "@/config/services";

describe("getServiceBySlug", () => {
  it("returns the correct service for a valid slug", () => {
    const service = getServiceBySlug("core-drilling");
    expect(service).toBeDefined();
    expect(service!.name).toBe("Core Drilling");
  });

  it("returns undefined for a nonexistent slug", () => {
    expect(getServiceBySlug("nonexistent-service")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(getServiceBySlug("")).toBeUndefined();
  });

  it("finds each service by its slug", () => {
    for (const service of services) {
      expect(getServiceBySlug(service.slug)).toBe(service);
    }
  });
});

describe("services array", () => {
  it("has 6 services", () => {
    expect(services).toHaveLength(6);
  });

  it("includes concrete cutting", () => {
    expect(services.find((s) => s.slug === "concrete-cutting")).toBeDefined();
  });

  it("includes core drilling", () => {
    expect(services.find((s) => s.slug === "core-drilling")).toBeDefined();
  });
});
