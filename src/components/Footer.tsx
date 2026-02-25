import Link from "next/link";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { cities, getCitiesByPriority } from "@/config/cities";

export function Footer() {
  const highPriorityCities = getCitiesByPriority("high");
  const mediumPriorityCities = getCitiesByPriority("medium");

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center transform -rotate-12">
                <span className="text-white font-black text-lg rotate-12">
                  NW
                </span>
              </div>
              <div>
                <div className="text-white font-bold leading-tight">
                  {business.shortName}
                </div>
                <div className="text-orange-500 text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Est. {business.founded}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {business.tagline}. Serving Eastern Washington and Northern Idaho
              with precision and professionalism.
            </p>
            <a
              href={`tel:${business.phoneTel}`}
              className="text-orange-400 font-bold text-lg hover:text-orange-300 transition-colors"
            >
              {business.phone}
            </a>
            <p className="text-sm mt-2">
              {business.address.city}, {business.address.state}{" "}
              {business.address.zip}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm hover:text-orange-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-orange-600 rounded-full" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Service Areas
            </h3>
            <ul className="space-y-3">
              {highPriorityCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/areas/${city.slug}`}
                    className="text-sm hover:text-orange-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-orange-600 rounded-full" />
                    {city.name}, {city.stateAbbr}
                  </Link>
                </li>
              ))}
              {mediumPriorityCities.slice(0, 3).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/areas/${city.slug}`}
                    className="text-sm hover:text-orange-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-orange-600 rounded-full" />
                    {city.name}, {city.stateAbbr}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-sm text-orange-400 hover:text-orange-300 font-medium"
                >
                  All {cities.length} service areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & Credentials */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Hours
            </h3>
            <ul className="space-y-2 text-sm mb-6">
              <li className="flex justify-between">
                <span>Mon – Fri</span>
                <span className="text-white">{business.hours.weekdays}</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">{business.hours.saturday}</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-gray-500">{business.hours.sunday}</span>
              </li>
            </ul>
            <div className="border-t border-white/10 pt-6">
              <p className="text-white font-semibold text-sm mb-3">
                Licensed &amp; Insured
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="bg-orange-600/20 text-orange-400 px-2 py-0.5 rounded font-mono">
                    WA
                  </span>
                  <span>{business.licenses.wa}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-orange-600/20 text-orange-400 px-2 py-0.5 rounded font-mono">
                    ID
                  </span>
                  <span>{business.licenses.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Available for estimates</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
