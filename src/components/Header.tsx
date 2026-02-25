import Link from "next/link";
import { business } from "@/config/business";

export function Header() {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-amber-500 text-slate-900 text-sm py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="font-medium">
            Serving Eastern Washington &amp; Northern Idaho
          </span>
          <a
            href={`tel:${business.phoneTel}`}
            className="font-bold hover:underline"
          >
            Call Now: {business.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {business.shortName}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <Link
              href="/services"
              className="hover:text-amber-400 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/areas"
              className="hover:text-amber-400 transition-colors"
            >
              Service Areas
            </Link>
            <Link
              href="/about"
              className="hover:text-amber-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/reviews"
              className="hover:text-amber-400 transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/contact"
              className="bg-amber-500 text-slate-900 px-5 py-2 rounded font-bold hover:bg-amber-400 transition-colors"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <a
              href={`tel:${business.phoneTel}`}
              className="bg-amber-500 text-slate-900 px-4 py-2 rounded font-bold text-sm"
            >
              Call Us
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
