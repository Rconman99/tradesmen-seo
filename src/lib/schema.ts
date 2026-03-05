/**
 * JSON-LD Schema Markup Generators
 * Generates structured data for Google rich results
 *
 * Uses @type "RoofingContractor" (schema.org subtype of
 * HomeAndConstructionBusiness > LocalBusiness) for maximum
 * relevance in roofing-related search results.
 */

import { business } from "@/config/business";
import { cities, City } from "@/config/cities";
import { Service } from "@/config/services";
import { services } from "@/config/services";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${business.website}/#business`,
    name: business.name,
    description: business.description,
    url: business.website,
    telephone: business.phoneTel,
    email: business.email,
    foundingDate: `${business.founded}`,
    priceRange: business.priceRange,
    image: `${business.website}/logo.webp`,
    logo: `${business.website}/logo.webp`,
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
      "@type": "RoofingContractor",
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
    description: `Professional ${business.category.toLowerCase()} services in ${city.name}, ${city.stateAbbr}. ${business.description}`,
    serviceType: business.category,
    provider: {
      "@type": "RoofingContractor",
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
        name: `How much does roofing cost in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Roofing costs in ${city.name}, ${city.stateAbbr} vary by roof size, materials, and project scope. A typical re-roof ranges from $8,000-$25,000+. Contact ${business.shortName} at ${business.phone} for a free inspection and estimate.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you offer free roof inspections in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes! ${business.shortName} provides free roof inspections and estimates for all projects in ${city.name} and surrounding areas in ${city.county} County. Call us at ${business.phone}.`,
        },
      },
      {
        "@type": "Question",
        name: `Are you licensed for roofing in ${city.state}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, ${business.shortName} is fully licensed and insured for roofing work in ${city.state}. ${
            city.stateAbbr === "UT"
              ? `UT License #${business.licenses.ut}`
              : `TX License #${business.licenses.tx}`
          }.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you handle insurance claims for storm damage in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Absolutely. ${business.shortName} has extensive experience with insurance claims for hail and wind damage in ${city.name}. We document damage, meet with adjusters, and handle the process so you don't have to.`,
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
      "@type": "RoofingContractor",
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
          text: `${service.name} costs in ${city.name}, ${city.stateAbbr} depend on roof size, materials, and project scope. Contact ${business.shortName} at ${business.phone} for a free on-site estimate.`,
        },
      },
      {
        "@type": "Question",
        name: `How long does a ${svc} project take in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Most ${svc} projects in ${city.name} are completed in 1-5 days depending on roof size and complexity. We'll provide a timeline with your free estimate.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you need a permit for ${svc} in ${city.name}, ${city.stateAbbr}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Permit requirements for ${svc} in ${city.name} vary by project scope. ${business.shortName} is fully licensed in ${city.state} (${city.stateAbbr === "UT" ? `License #${business.licenses.ut}` : `License #${business.licenses.tx}`}) and handles permits as needed.`,
        },
      },
      {
        "@type": "Question",
        name: `Does insurance cover ${svc} in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Many homeowner insurance policies cover ${svc} when caused by storm damage (hail, wind, etc.). ${business.shortName} works directly with insurance companies in ${city.name} to maximize your claim coverage.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you offer free ${svc} estimates in ${city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Absolutely. ${business.shortName} provides free inspections and estimates for all ${svc} projects in ${city.name} and surrounding areas in ${city.county} County. Call ${business.phone} or book online.`,
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
