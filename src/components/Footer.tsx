import Link from "next/link";
import Image from "next/image";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { cities, getCitiesByPriority } from "@/config/cities";

export function Footer() {
  const highPriorityCities = getCitiesByPriority("high");
  const mediumPriorityCities = getCitiesByPriority("medium");

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/logo.webp"
              alt={`${business.name} logo`}
              width={200}
              height={72}
              className="h-16 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed mb-5">
              Excavation &amp; concrete — one crew, two trades. Serving {business.serviceAreaLabel}.
            </p>
            <a
              href={`tel:${business.phoneTel}`}
              className="inline-block bg-orange-500 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-colors"
            >
              {business.phone}
            </a>
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
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
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
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {city.name}, {city.stateAbbr}
                  </Link>
                </li>
              ))}
              {mediumPriorityCities.slice(0, 3).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/areas/${city.slug}`}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {city.name}, {city.stateAbbr}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/areas" className="text-sm text-blue-400 hover:text-blue-300 font-semibold">
                  All {cities.length} areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Hours &amp; License
            </h3>
            <ul className="space-y-2 text-sm mb-6">
              <li className="flex justify-between">
                <span>Mon – Fri</span>
                <span className="text-white font-medium">{business.hours.weekdays}</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white font-medium">{business.hours.saturday}</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>{business.hours.sunday}</span>
              </li>
            </ul>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">WA</span>
                <span>
                  {business.license.registration
                    ? business.license.registration
                    : "Registered, Bonded & Insured"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
