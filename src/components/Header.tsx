import Link from "next/link";
import Image from "next/image";
import { business } from "@/config/business";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — logo centered, phone + book online on sides */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-4">
          {/* Phone */}
          <a
            href={`tel:${business.phoneTel}`}
            className="text-orange-500 font-bold text-lg hover:text-orange-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4 hidden sm:block" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {business.phone}
          </a>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.webp"
              alt={`${business.name} logo`}
              width={220}
              height={80}
              className="h-14 sm:h-16 w-auto"
              priority
            />
          </Link>

          {/* Free Estimate CTA */}
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            Free Estimate
          </Link>
        </div>
      </div>

      {/* Main nav — blue bar */}
      <nav className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center">
            {/* Desktop nav links — centered */}
            <div className="hidden md:flex items-center">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Our Services" },
                { href: "/areas", label: "Service Areas" },
                { href: "/reviews", label: "Reviews" },
                { href: "/blog", label: "Blog" },
                { href: "/resources/storm-damage-guide", label: "Free Guide" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white font-semibold px-5 py-4 text-sm hover:bg-blue-700 transition-colors relative"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center justify-between w-full py-3">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.webp"
                  alt={business.name}
                  width={140}
                  height={50}
                  className="h-10 w-auto brightness-0 invert"
                />
              </Link>
              <a
                href={`tel:${business.phoneTel}`}
                className="bg-orange-500 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
