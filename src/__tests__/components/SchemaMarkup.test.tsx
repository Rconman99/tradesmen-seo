// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SchemaMarkup } from "@/components/SchemaMarkup";

describe("SchemaMarkup", () => {
  it("renders a script tag with type application/ld+json", () => {
    const schema = { "@type": "LocalBusiness", name: "Test" };
    const { container } = render(<SchemaMarkup schema={schema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
  });

  it("contains valid JSON matching the schema", () => {
    const schema = { "@type": "Service", name: "Core Drilling" };
    const { container } = render(<SchemaMarkup schema={schema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script!.textContent!);
    expect(parsed).toEqual(schema);
  });

  it("handles nested schema objects", () => {
    const schema = {
      "@type": "FAQPage",
      mainEntity: [{ "@type": "Question", name: "How much?" }],
    };
    const { container } = render(<SchemaMarkup schema={schema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script!.textContent!);
    expect(parsed.mainEntity[0].name).toBe("How much?");
  });
});
