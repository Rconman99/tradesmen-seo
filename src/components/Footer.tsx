import Link from "next/link";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { cities, getCitiesByPriority } from "@/config/cities";

export function Footer() {
  const highPriorityCities = getCitiesByPriority("high");
  const mediumPriorityCities = getCitiesByPriority("medium");

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              {business.shortName}
            </h3>
            <p className="text-sm mb-4">{business.tagline}</p>
            <p className="text-sm">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.state}{" "}
              {business.address.zip}
            </p>
            <p className="mt-2">
              <a
                href={`tel:${business.phoneTel}`}
                className="text-amber-400 font-bold hover:text-amber-300"
              >
                {business.phone}
              </a>
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2 text-sm">
              {highPriorityCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/areas/${city.slug}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {city.name}, {city.stateAbbr}
                  </Link>
                </li>
              ))}
              {mediumPriorityCities.slice(0, 4).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/areas/${city.slug}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {city.name}, {city.stateAbbr}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-amber-400 hover:text-amber-300"
                >
                  View all {cities.length} service areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & License */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hours</h3>
            <ul className="space-y-2 text-sm">
              <li>Mon-Fri: {business.hours.weekdays}</li>
              <li>Saturday: {business.hours.saturday}</li>
              <li>Sunday: {business.hours.sunday}</li>
            </ul>
            <div className="mt-4 text-sm">
              <p className="text-white font-semibold">Licensed & Insured</p>
              <p>WA #{business.licenses.wa}</p>
              <p>ID #{business.licenses.id}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700 mt-12 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
