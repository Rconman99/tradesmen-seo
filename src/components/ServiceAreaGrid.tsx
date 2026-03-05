import Link from "next/link";
import { cities, type City } from "@/config/cities";
import { services, type Service } from "@/config/services";

interface ServiceAreaGridProps {
  /** When provided, shows all cities for this service */
  currentService?: Service;
  /** When provided, shows all services for this city */
  currentCity?: City;
}

/**
 * Compact grid showing service × city combinations.
 * Used on service hub pages (all cities for a service)
 * and area listing pages (all services for all cities).
 */
export function ServiceAreaGrid({
  currentService,
  currentCity,
}: ServiceAreaGridProps) {
  // Service hub: show all cities for this service
  if (currentService) {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/areas/${city.slug}/${currentService.slug}`}
            className="group bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <span className="font-bold text-sm group-hover:text-blue-600 transition-colors">
              {currentService.shortName} in {city.name}
            </span>
            <span className="text-gray-400 text-sm">, {city.stateAbbr}</span>
            {city.priority === "high" && (
              <span className="ml-2 text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">
                HQ Area
              </span>
            )}
          </Link>
        ))}
      </div>
    );
  }

  // Area listing: show full service × city matrix
  if (currentCity) {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/areas/${currentCity.slug}/${service.slug}`}
            className="group bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{service.icon}</span>
              <span className="font-bold text-sm group-hover:text-blue-600 transition-colors">
                {service.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Full matrix (for areas listing page)
  return (
    <div className="space-y-8">
      {services.map((service) => (
        <div key={service.slug}>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span>{service.icon}</span>
            <Link
              href={`/services/${service.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {service.name}
            </Link>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {cities.map((city) => (
              <Link
                key={`${service.slug}-${city.slug}`}
                href={`/areas/${city.slug}/${service.slug}`}
                className="text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded transition-colors text-center truncate"
                title={`${service.name} in ${city.name}, ${city.stateAbbr}`}
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
