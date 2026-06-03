/**
 * JSON-LD Schema Markup Generators
 * Generates structured data for Google rich results
 *
 * Uses @type "GeneralContractor" (schema.org subtype of
 * HomeAndConstructionBusiness > LocalBusiness) — the closest
 * valid type for a dual-trade excavation + concrete contractor.
 */

import { business } from "@/config/business";
import { cities, City } from "@/config/cities";
import { Service } from "@/config/services";
import { services } from "@/config/services";

// Honest license/registration text. Falls back to a generic, true
// statement until the real WA L&I registration number is supplied.
const licenseText = business.license.registration
  ? `WA registration #${business.license.registration}`
  : "registered, bonded, and insured in Washington";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": business.schemaType,
    "@id": `${business.website}/#business`,
    name: business.name,
    description: business.description,
    url: business.website,
    telephone: business.phoneTel,
    email: business.email,
    priceRange: business.priceRange,
    image: `${business.website}/logo.webp`,
    logo: `${business.website}/logo.webp`,
    // Only assert a founding date when one is actually configured.
    ...(business.founded ? { foundingDate: `${business.founded}` } : {}),
    address: {
      "@type": "PostalAddress",
      // Service-area business: omit streetAddress when not published.
      ...(business.address.street
        ? { streetAddress: business.address.street }
        : {}),
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: business.hours.opensAt,
        closes: business.hours.closesAt,
      },
    ],
    // Only emit AggregateRating once real reviews exist — fake review
    // schema is a Google structured-data violation.
    ...(business.stats.reviewCount > 0 && business.stats.reviewAverage
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: business.stats.reviewAverage,
            reviewCount: business.stats.reviewCount,
          },
        }
      : {}),
    sameAs: [
      business.social.facebook,
      business.social.google,
      business.social.yelp,
      business.social.nextdoor,
    ].filter(Boolean),
    areaServed: cities.map((city) => ({
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: city.state,
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${business.shortName} Services`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
  };
}

export function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.name,
    provider: {
      "@type": business.schemaType,
      "@id": `${business.website}/#business`,
      name: business.name,
      telephone: business.phoneTel,
    },
    areaServed: cities.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
  };
}

export function generateCityServiceSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${business.category} in ${city.name}, ${city.stateAbbr}`,
    description: `Professional excavation and concrete services in ${city.name}, ${city.stateAbbr}. ${business.description}`,
    serviceType: business.category,
    provider: {
      "@type": business.schemaType,
      "@id": `${business.website}/#business`,
      name: business.name,
      telephone: business.phoneTel,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.stateAbbr,
        postalCode: city.zip[0],
      },
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: city.state,
      },
    },
  };
}

export function generateCityFAQSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does excavation or concrete work cost in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Costs in ${city.name}, ${city.stateAbbr} depend on the job — a concrete driveway, a footing or French-drain install, and lot grading or site prep all fall into different ranges based on access, soil, and scope. ${business.shortName} provides a free on-site estimate; call ${business.phone}.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you offer free estimates in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. ${business.shortName} provides free on-site estimates for excavation and concrete projects in ${city.name} and surrounding ${city.county} County. Call ${business.phone} to schedule.`,
        },
      },
      {
        "@type": "Question",
        name: `Are you licensed for excavation and concrete work in Washington?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes — ${business.shortName} is ${licenseText}, serving ${city.name} and the greater King and Pierce County area.`,
        },
      },
      {
        "@type": "Question",
        name: `Do I need a permit for grading or concrete in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Many clearing, grading, and driveway-approach projects in ${city.name} require permits through the city, and critical-areas rules can apply near slopes, wetlands, or streams. ${business.shortName} is familiar with the local permit process and handles permits as needed.`,
        },
      },
      {
        "@type": "Question",
        name: `What areas near ${city.name} do you serve?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `We serve ${city.name} and all surrounding communities in ${city.county} County, ${city.stateAbbr}. Contact us to confirm service availability for your specific location.`,
        },
      },
    ],
  };
}

export function generateCityServiceDetailSchema(city: City, service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}, ${city.stateAbbr}`,
    description: `Professional ${service.name.toLowerCase()} services in ${city.name}, ${city.stateAbbr}. ${service.description}`,
    serviceType: service.name,
    provider: {
      "@type": business.schemaType,
      "@id": `${business.website}/#business`,
      name: business.name,
      telephone: business.phoneTel,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.stateAbbr,
        postalCode: city.zip[0],
      },
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: city.state,
      },
    },
  };
}

export function generateCityServiceFAQSchema(city: City, service: Service) {
  const svc = service.name.toLowerCase();
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does ${svc} cost in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${service.name} costs in ${city.name}, ${city.stateAbbr} depend on site size, access, soil conditions, and project scope. Contact ${business.shortName} at ${business.phone} for a free on-site estimate.`,
        },
      },
      {
        "@type": "Question",
        name: `How long does a ${svc} project take in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Most ${svc} projects in ${city.name} take a few days depending on size, access, and ground conditions. We'll provide a timeline with your free estimate.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you need a permit for ${svc} in ${city.name}, ${city.stateAbbr}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Permit requirements for ${svc} in ${city.name} vary by scope — clearing, grading, and right-of-way work often require city permits. ${business.shortName} is ${licenseText} and handles permits as needed.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you handle both the excavation and the concrete for ${svc} in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes — that's the advantage of ${business.shortName}. One crew handles the dirt work (grading, subgrade prep, drainage) and the concrete, so you don't have to hire and coordinate two separate contractors in ${city.name}.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you offer free ${svc} estimates in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Absolutely. ${business.shortName} provides free on-site estimates for all ${svc} projects in ${city.name} and surrounding areas in ${city.county} County. Call ${business.phone} or book online.`,
        },
      },
    ],
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${business.website}${item.url}`,
    })),
  };
}
