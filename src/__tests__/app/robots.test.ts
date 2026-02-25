import { describe, it, expect } from "vitest";
import robots from "@/app/robots";
import { business } from "@/config/business";

describe("robots", () => {
  const result = robots();

  it("allows all user agents on /", () => {
    expect(result.rules).toMatchObject({
      userAgent: "*",
      allow: "/",
    });
  });

  it("disallows /studio", () => {
    const disallow = result.rules;
    expect(
      Array.isArray(disallow.disallow)
        ? disallow.disallow
        : [disallow.disallow]
    ).toContain("/studio");
  });

  it("disallows /api/", () => {
    const disallow = result.rules;
    expect(
      Array.isArray(disallow.disallow)
        ? disallow.disallow
        : [disallow.disallow]
    ).toContain("/api/");
  });

  it("points sitemap to the correct domain", () => {
    expect(result.sitemap).toBe(`${business.website}/sitemap.xml`);
  });
});
