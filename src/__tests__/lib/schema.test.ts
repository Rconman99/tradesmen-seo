import { describe, it, expect } from "vitest";
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateCityServiceSchema,
  generateCityFAQSchema,
  generateCityServiceDetailSchema,
  generateCityServiceFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import { business } from "@/config/business";
import { services, getServiceBySlug } from "@/config/services";
import { getCityBySlug } from "@/config/cities";

const spokane = getCityBySlug("spokane-wa")!;
const coeurDalene = getCityBySlug("coeur-dalene-id")!;
const coreDrilling = getServiceBySlug("core-drilling")!;

describe("generateLocalBusinessSchema", () => {
  const schema = generateLocalBusinessSchema();

  it("has correct @type", () => {
    expect(schema["@type"]).toBe("LocalBusiness");
  });

  it("has correct @context", () => {
    expect(schema["@context"]).toBe("https://schema.org");
  });

  it("includes business name", () => {
    expect(schema.name).toBe(business.name);
  });

  it("includes telephone", () => {
    expect(schema.telephone).toBe(business.phoneTel);
  });

  it("includes address fields", () => {
    expect(schema.address).toMatchObject({
      "@type": "PostalAddress",
      addressLocality: business.address.city,
      addressRegion: business.address.state,
    });
  });

  it("includes geo coordinates", () => {
    expect(schema.geo).toMatchObject({
      "@type": "GeoCoordinates",
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng,
    });
  });

  it("includes all services in offer catalog", () => {
    const offers = schema.hasOfferCatalog.itemListElement;
    expect(offers).toHaveLength(services.length);
  });

  it("includes aggregate rating", () => {
    expect(schema.aggregateRating.ratingValue).toBe(
      business.stats.reviewAverage
    );
    expect(schema.aggregateRating.reviewCount).toBe(
      business.stats.reviewCount
    );
  });
});

describe("generateServiceSchema", () => {
  const schema = generateServiceSchema(coreDrilling);

  it("has correct @type", () => {
    expect(schema["@type"]).toBe("Service");
  });

  it("uses the service name", () => {
    expect(schema.name).toBe("Core Drilling");
  });

  it("uses the service description", () => {
    expect(schema.description).toBe(coreDrilling.description);
  });

  it("includes provider with business name", () => {
    expect(schema.provider.name).toBe(business.name);
  });
});

describe("generateCityServiceSchema", () => {
  it("includes city name in the service name for WA city", () => {
    const schema = generateCityServiceSchema(spokane);
    expect(schema.name).toContain("Spokane");
    expect(schema.name).toContain("WA");
  });

  it("includes city name in the service name for ID city", () => {
    const schema = generateCityServiceSchema(coeurDalene);
    expect(schema.name).toContain("Coeur d'Alene");
    expect(schema.name).toContain("ID");
  });

  it("includes areaServed with city and state", () => {
    const schema = generateCityServiceSchema(spokane);
    expect(schema.areaServed.name).toBe("Spokane");
    expect(schema.areaServed.containedInPlace.name).toBe("Washington");
  });

  it("uses first ZIP code in address", () => {
    const schema = generateCityServiceSchema(spokane);
    expect(schema.provider.address.postalCode).toBe(spokane.zip[0]);
  });
});

describe("generateCityFAQSchema", () => {
  it("has FAQPage type", () => {
    const schema = generateCityFAQSchema(spokane);
    expect(schema["@type"]).toBe("FAQPage");
  });

  it("generates 4 FAQ entries", () => {
    const schema = generateCityFAQSchema(spokane);
    expect(schema.mainEntity).toHaveLength(4);
  });

  it("includes WA license for WA city", () => {
    const schema = generateCityFAQSchema(spokane);
    const licenseAnswer = schema.mainEntity[2].acceptedAnswer.text;
    expect(licenseAnswer).toContain(business.licenses.wa);
  });

  it("includes ID license for ID city", () => {
    const schema = generateCityFAQSchema(coeurDalene);
    const licenseAnswer = schema.mainEntity[2].acceptedAnswer.text;
    expect(licenseAnswer).toContain(business.licenses.id);
  });

  it("includes city name in questions", () => {
    const schema = generateCityFAQSchema(spokane);
    expect(schema.mainEntity[0].name).toContain("Spokane");
  });
});

describe("generateCityServiceDetailSchema", () => {
  const schema = generateCityServiceDetailSchema(spokane, coreDrilling);

  it("has Service type", () => {
    expect(schema["@type"]).toBe("Service");
  });

  it("combines service and city in name", () => {
    expect(schema.name).toContain("Core Drilling");
    expect(schema.name).toContain("Spokane");
  });

  it("includes area served", () => {
    expect(schema.areaServed.name).toBe("Spokane");
  });
});

describe("generateCityServiceFAQSchema", () => {
  it("generates 5 FAQ entries", () => {
    const schema = generateCityServiceFAQSchema(spokane, coreDrilling);
    expect(schema.mainEntity).toHaveLength(5);
  });

  it("includes WA license for WA city", () => {
    const schema = generateCityServiceFAQSchema(spokane, coreDrilling);
    const licenseQ = schema.mainEntity.find((q) =>
      q.name.includes("licensed")
    );
    expect(licenseQ!.acceptedAnswer.text).toContain(business.licenses.wa);
  });

  it("includes ID license for ID city", () => {
    const schema = generateCityServiceFAQSchema(coeurDalene, coreDrilling);
    const licenseQ = schema.mainEntity.find((q) =>
      q.name.includes("licensed")
    );
    expect(licenseQ!.acceptedAnswer.text).toContain(business.licenses.id);
  });

  it("includes service name in questions", () => {
    const schema = generateCityServiceFAQSchema(spokane, coreDrilling);
    expect(schema.mainEntity[0].name).toContain("core drilling");
  });

  it("includes city name in questions", () => {
    const schema = generateCityServiceFAQSchema(spokane, coreDrilling);
    expect(schema.mainEntity[0].name).toContain("Spokane");
  });
});

describe("generateBreadcrumbSchema", () => {
  it("has BreadcrumbList type", () => {
    const schema = generateBreadcrumbSchema([
      { name: "Home", url: "/" },
    ]);
    expect(schema["@type"]).toBe("BreadcrumbList");
  });

  it("positions are 1-indexed", () => {
    const schema = generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
    ]);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
  });

  it("prefixes URLs with the business website", () => {
    const schema = generateBreadcrumbSchema([
      { name: "Services", url: "/services" },
    ]);
    expect(schema.itemListElement[0].item).toBe(
      `${business.website}/services`
    );
  });

  it("handles empty items array", () => {
    const schema = generateBreadcrumbSchema([]);
    expect(schema.itemListElement).toEqual([]);
  });

  it("preserves item names", () => {
    const schema = generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Spokane, WA", url: "/areas/spokane-wa" },
    ]);
    expect(schema.itemListElement[1].name).toBe("Spokane, WA");
  });
});
