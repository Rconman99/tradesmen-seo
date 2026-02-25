import { describe, it, expect } from "vitest";
import {
  formatPhone,
  generateMetaTitle,
  generateMetaDescription,
  slugToTitle,
} from "@/lib/utils";
import { business } from "@/config/business";

describe("formatPhone", () => {
  it("strips non-digit characters from a formatted phone number", () => {
    expect(formatPhone("(509) 555-0123")).toBe("5095550123");
  });

  it("returns digits unchanged", () => {
    expect(formatPhone("5095550123")).toBe("5095550123");
  });

  it("handles phone with extension", () => {
    expect(formatPhone("(509) 555-0123 ext. 4")).toBe("50955501234");
  });

  it("returns empty string for empty input", () => {
    expect(formatPhone("")).toBe("");
  });

  it("strips all non-digit characters", () => {
    expect(formatPhone("+1-509-555-0123")).toBe("15095550123");
  });
});

describe("generateMetaTitle", () => {
  it("returns title with city and state when both are provided", () => {
    const result = generateMetaTitle("Core Drilling", "Spokane", "WA");
    expect(result).toBe(`Core Drilling in Spokane, WA | ${business.shortName}`);
  });

  it("returns title without location when city/state are omitted", () => {
    const result = generateMetaTitle("Core Drilling");
    expect(result).toBe(`Core Drilling | ${business.shortName}`);
  });

  it("returns title without location when only city is provided", () => {
    const result = generateMetaTitle("Core Drilling", "Spokane");
    expect(result).toBe(`Core Drilling | ${business.shortName}`);
  });

  it("returns title without location when only state is provided", () => {
    const result = generateMetaTitle("Core Drilling", undefined, "WA");
    expect(result).toBe(`Core Drilling | ${business.shortName}`);
  });

  it("handles special characters in city names", () => {
    const result = generateMetaTitle("Core Drilling", "Coeur d'Alene", "ID");
    expect(result).toBe(
      `Core Drilling in Coeur d'Alene, ID | ${business.shortName}`
    );
  });
});

describe("generateMetaDescription", () => {
  it("includes city and state when both are provided", () => {
    const result = generateMetaDescription("Core Drilling", "Spokane", "WA");
    expect(result).toContain("core drilling");
    expect(result).toContain("Spokane, WA");
    expect(result).toContain(business.phone);
  });

  it("omits location when city/state are not provided", () => {
    const result = generateMetaDescription("Core Drilling");
    expect(result).toContain("core drilling");
    expect(result).toContain(business.phone);
    expect(result).not.toContain("Spokane");
  });

  it("lowercases the service name", () => {
    const result = generateMetaDescription("WALL SAWING");
    expect(result).toContain("wall sawing");
  });

  it("omits location when only city is provided", () => {
    const result = generateMetaDescription("Core Drilling", "Spokane");
    expect(result).not.toContain("Spokane");
  });
});

describe("slugToTitle", () => {
  it("converts a multi-word slug to title case", () => {
    expect(slugToTitle("core-drilling")).toBe("Core Drilling");
  });

  it("converts a single-word slug", () => {
    expect(slugToTitle("drilling")).toBe("Drilling");
  });

  it("handles already-capitalized words", () => {
    expect(slugToTitle("GPR-scanning")).toBe("GPR Scanning");
  });

  it("returns empty string for empty input", () => {
    expect(slugToTitle("")).toBe("");
  });

  it("handles three-word slugs", () => {
    expect(slugToTitle("concrete-wall-cutting")).toBe("Concrete Wall Cutting");
  });
});
