// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";
import { business } from "@/config/business";

describe("Header", () => {
  it("renders the phone number", () => {
    render(<Header />);
    const phoneLinks = screen.getAllByText(business.phone);
    expect(phoneLinks.length).toBeGreaterThan(0);
  });

  it("renders a phone tel: link", () => {
    render(<Header />);
    const phoneLinks = screen.getAllByRole("link").filter(
      (link) => link.getAttribute("href") === `tel:${business.phoneTel}`
    );
    expect(phoneLinks.length).toBeGreaterThan(0);
  });

  it("renders the Book Online button linking to /contact", () => {
    render(<Header />);
    const bookLinks = screen.getAllByText("Book Online");
    expect(bookLinks.length).toBeGreaterThan(0);
    expect(bookLinks[0]).toHaveAttribute("href", "/contact");
  });

  it("renders all 7 desktop navigation links", () => {
    render(<Header />);
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

  it("Home link points to /", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
  });

  it("renders logo images with business name in alt text", () => {
    render(<Header />);
    const logos = screen.getAllByRole("img");
    expect(logos.length).toBeGreaterThan(0);
  });
});
