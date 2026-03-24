"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { business } from "@/config/business";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/areas", label: "Service Areas" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="md:hidden flex items-center justify-between w-full py-3">
        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 -ml-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Call Now button */}
        <a
          href={`tel:${business.phoneTel}`}
          className="bg-orange-500 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg"
        >
          Call Now
        </a>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(theme(spacing.14)+theme(spacing.3)+theme(spacing.12)+theme(spacing.3))] z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu panel */}
          <nav className="relative bg-white shadow-2xl max-h-[calc(100vh-10rem)] overflow-y-auto">
            <div className="py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-6 py-4 text-base font-semibold border-b border-gray-100 transition-colors ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="p-4 space-y-3 border-t-2 border-gray-100">
              <a
                href={`tel:${business.phoneTel}`}
                className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-orange-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call {business.phone}
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-blue-700 transition-colors"
              >
                Get Free Estimate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
