import Link from "next/link";
import { business } from "@/config/business";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-orange-600 text-white text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span className="font-medium tracking-wide uppercase text-xs">
              Serving Eastern Washington &amp; Northern Idaho
            </span>
          </div>
          <a
            href={`tel:${business.phoneTel}`}
            className="font-bold tracking-wide hover:text-orange-200 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {business.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-gray-950/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform">
                <span className="text-white font-black text-lg rotate-12 group-hover:rotate-0 transition-transform">
                  NW
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-bold text-lg leading-tight tracking-tight">
                  {business.shortName}
                </div>
                <div className="text-orange-400 text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Since {business.founded}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/areas", label: "Service Areas" },
                { href: "/about", label: "About" },
                { href: "/reviews", label: "Reviews" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-3 bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20"
              >
                Free Quote
              </Link>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden flex items-center gap-3">
              <a
                href={`tel:${business.phoneTel}`}
                className="bg-orange-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-orange-600/20"
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
