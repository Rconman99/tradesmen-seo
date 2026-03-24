// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileNav } from "@/components/MobileNav";
import { business } from "@/config/business";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("MobileNav", () => {
  it("renders hamburger button with correct aria-label", () => {
    render(<MobileNav />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("renders Call Now button", () => {
    render(<MobileNav />);
    expect(screen.getByText("Call Now")).toBeInTheDocument();
  });

  it("shows nav links when hamburger is clicked", () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByLabelText("Open menu"));

    const navLabels = [
      "Home",
      "About Us",
      "Our Services",
      "Service Areas",
      "Reviews",
      "Blog",
      "Contact Us",
    ];
    for (const label of navLabels) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("changes aria-label to Close menu when open", () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  it("closes menu when close button is clicked", () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(screen.getByText("About Us")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close menu"));
    // Menu should be closed — nav links hidden
    expect(screen.queryByText("Get Free Estimate")).not.toBeInTheDocument();
  });

  it("renders phone and estimate CTAs in open menu", () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByLabelText("Open menu"));

    expect(screen.getByText(`Call ${business.phone}`)).toBeInTheDocument();
    expect(screen.getByText("Get Free Estimate")).toBeInTheDocument();
  });

  it("phone CTA links to tel: href", () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByLabelText("Open menu"));

    const phoneLink = screen.getByText(`Call ${business.phone}`);
    expect(phoneLink).toHaveAttribute("href", `tel:${business.phoneTel}`);
  });

  it("Get Free Estimate links to /contact", () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByLabelText("Open menu"));

    const estimateLink = screen.getByText("Get Free Estimate");
    expect(estimateLink).toHaveAttribute("href", "/contact");
  });

  it("highlights current page link", () => {
    render(<MobileNav />);
    fireEvent.click(screen.getByLabelText("Open menu"));

    const homeLink = screen.getByText("Home");
    expect(homeLink.className).toContain("text-blue-600");
  });
});
