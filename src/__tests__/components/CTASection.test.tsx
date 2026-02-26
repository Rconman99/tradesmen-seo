// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CTASection } from "@/components/CTASection";
import { business } from "@/config/business";

describe("CTASection", () => {
  it("renders default heading when no props are passed", () => {
    render(<CTASection />);
    expect(
      screen.getByText("Ready to Get Your Project Started?")
    ).toBeInTheDocument();
  });

  it("renders city-specific heading when cityName is provided", () => {
    render(<CTASection cityName="Spokane" />);
    expect(
      screen.getByText(`Need ${business.category} in Spokane?`)
    ).toBeInTheDocument();
  });

  it("renders custom title when title prop is provided", () => {
    render(<CTASection title="Custom Heading" />);
    expect(screen.getByText("Custom Heading")).toBeInTheDocument();
  });

  it("title prop takes precedence over cityName", () => {
    render(<CTASection title="Override" cityName="Spokane" />);
    expect(screen.getByText("Override")).toBeInTheDocument();
  });

  it("renders default subtitle when none provided", () => {
    render(<CTASection />);
    expect(
      screen.getByText(/Free estimates, fast scheduling/)
    ).toBeInTheDocument();
  });

  it("renders custom subtitle when provided", () => {
    render(<CTASection subtitle="Custom sub" />);
    expect(screen.getByText("Custom sub")).toBeInTheDocument();
  });

  it("renders a Book Online link pointing to /contact", () => {
    render(<CTASection />);
    const link = screen.getByText("Book Online");
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders a phone call link with correct tel: href", () => {
    render(<CTASection />);
    const phoneLink = screen.getByText(`Call ${business.phone}`);
    expect(phoneLink).toHaveAttribute("href", `tel:${business.phoneTel}`);
  });
});
