/**
 * JSON-LD Schema Markup Generators
 * Generates structured data for Google rich results
 */

import { business } from "@/config/business";
import { City } from "@/config/cities";
import { Service } from "@/config/services";
import { services } from "@/config/services";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${business.website}/#business`,
    name: business.name,
    description: business.description,
    url: business.website,
    telephone: business.phoneTel,
    email: business.email,
    foundingDate: `${business.founded}`,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
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
        ],
        opens: business.hours.opensAt,
        closes: business.hours.closesAt,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.stats.reviewAverage,
      reviewCount: business.stats.reviewCount,
    },
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
      "@type": "LocalBusiness",
      "@id": `${business.website}/#business`,
      name: business.name,
      telephone: business.phoneTel,
    },
  };
}

export function generateCityServiceSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${business.category} in ${city.name}, ${city.stateAbbr}`,
    description: `Professional ${business.category.toLowerCase()} services in ${city.name}, ${city.stateAbbr}. ${business.description}`,
    serviceType: business.category,
    provider: {
      "@type": "LocalBusiness",
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
  const serviceName = business.category.toLowerCase();
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does ${serviceName} cost in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${business.category} costs in ${city.name}, ${city.stateAbbr} vary by project scope. Contact ${business.shortName} at ${business.phone} for a free on-site estimate.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you offer free estimates in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes! ${business.shortName} provides free on-site estimates for all ${serviceName} projects in ${city.name} and surrounding areas. Call us at ${business.phone}.`,
        },
      },
      {
        "@type": "Question",
        name: `Are you licensed to work in ${city.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, ${business.shortName} is fully licensed and insured for ${serviceName} work in ${city.state}. ${
            city.stateAbbr === "WA"
              ? `WA License #${business.licenses.wa}`
              : `ID License #${business.licenses.id}`
          }.`,
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
      "@type": "LocalBusiness",
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
          text: `${service.name} costs in ${city.name}, ${city.stateAbbr} depend on project size, concrete thickness, and access conditions. Contact ${business.shortName} at ${business.phone} for a free on-site estimate.`,
        },
      },
      {
        "@type": "Question",
        name: `How long does a ${svc} project take in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Most ${svc} projects in ${city.name} are completed in one day. Larger commercial jobs may take 2-3 days. We'll provide a timeline with your free estimate.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you need a permit for ${svc} in ${city.name}, ${city.stateAbbr}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Permit requirements for ${svc} in ${city.name} vary by project scope. ${business.shortName} is fully licensed in ${city.state} (${city.stateAbbr === "WA" ? `License #${business.licenses.wa}` : `License #${business.licenses.id}`}) and can advise on permits for your specific project.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${business.shortName} licensed for ${svc} in ${city.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. ${business.shortName} is fully licensed and insured for ${svc} in ${city.state}. ${city.stateAbbr === "WA" ? `WA License #${business.licenses.wa}` : `ID License #${business.licenses.id}`}. We carry full liability insurance on every job.`,
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
