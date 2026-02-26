// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { getCitiesByPriority } from "@/config/cities";

describe("Footer", () => {
  it("renders all service names as links", () => {
    render(<Footer />);
    for (const service of services) {
      expect(screen.getByText(service.name)).toBeInTheDocument();
    }
  });

  it("service links point to correct paths", () => {
    render(<Footer />);
    for (const service of services) {
      const link = screen.getByText(service.name);
      expect(link).toHaveAttribute("href", `/services/${service.slug}`);
    }
  });

  it("renders high-priority cities", () => {
    render(<Footer />);
    const highCities = getCitiesByPriority("high");
    for (const city of highCities) {
      expect(
        screen.getByText(`${city.name}, ${city.stateAbbr}`)
      ).toBeInTheDocument();
    }
  });

  it("renders business hours", () => {
    render(<Footer />);
    expect(screen.getByText(business.hours.weekdays)).toBeInTheDocument();
    expect(screen.getByText(business.hours.saturday)).toBeInTheDocument();
    expect(screen.getByText(business.hours.sunday)).toBeInTheDocument();
  });

  it("renders WA and ID license numbers", () => {
    render(<Footer />);
    expect(screen.getByText(business.licenses.wa)).toBeInTheDocument();
    expect(screen.getByText(business.licenses.id)).toBeInTheDocument();
  });

  it("renders the phone number as a link", () => {
    render(<Footer />);
    const phoneLink = screen.getByText(business.phone);
    expect(phoneLink).toHaveAttribute("href", `tel:${business.phoneTel}`);
  });

  it("renders the copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`${year}.*${business.name.replace(/[()]/g, "\\$&")}`))
    ).toBeInTheDocument();
  });

  it("renders an 'All areas' link", () => {
    render(<Footer />);
    const allAreasLink = screen.getByText(/All.*areas/);
    expect(allAreasLink).toHaveAttribute("href", "/areas");
  });
});
