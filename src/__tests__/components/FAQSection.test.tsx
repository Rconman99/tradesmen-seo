// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FAQSection } from "@/components/FAQSection";
import { business } from "@/config/business";
import { getCityBySlug } from "@/config/cities";

const spokane = getCityBySlug("spokane-wa")!;
const coeurDalene = getCityBySlug("coeur-dalene-id")!;

describe("FAQSection", () => {
  it("renders 5 FAQ items", () => {
    render(<FAQSection city={spokane} />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(5);
  });

  it("includes city name in the section heading", () => {
    render(<FAQSection city={spokane} />);
    expect(
      screen.getByText(`Questions About ${spokane.name}`)
    ).toBeInTheDocument();
  });

  it("includes city name in FAQ questions", () => {
    render(<FAQSection city={spokane} />);
    expect(
      screen.getByText(`How much does ${business.category.toLowerCase()} cost in Spokane?`)
    ).toBeInTheDocument();
  });

  it("shows WA license for a WA city", () => {
    render(<FAQSection city={spokane} />);
    expect(
      screen.getByText(new RegExp(business.licenses.wa))
    ).toBeInTheDocument();
  });

  it("shows ID license for an ID city", () => {
    render(<FAQSection city={coeurDalene} />);
    expect(
      screen.getByText(new RegExp(business.licenses.id))
    ).toBeInTheDocument();
  });

  it("includes business phone number in answers", () => {
    render(<FAQSection city={spokane} />);
    const phoneMatches = screen.getAllByText(new RegExp(business.phone.replace(/[()]/g, "\\$&")));
    expect(phoneMatches.length).toBeGreaterThan(0);
  });

  it("includes county name in the nearby areas answer", () => {
    render(<FAQSection city={spokane} />);
    const matches = screen.getAllByText(new RegExp(`${spokane.county} County`));
    expect(matches.length).toBeGreaterThan(0);
  });
});
