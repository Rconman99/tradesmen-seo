/**
 * ============================================
 * BUSINESS CONFIG — Edit this per client
 * ============================================
 * This is the ONLY file you need to change to
 * spin up a new tradesmen website. Everything
 * else generates from this config.
 */

export const business = {
  name: "Northwest Concrete Cutting LLC",
  shortName: "Northwest Concrete Cutting",
  tagline: "Professional Concrete Cutting Services",
  description:
    "Licensed and insured concrete cutting experts serving Eastern Washington and Northern Idaho. Flat sawing, core drilling, wall sawing, and concrete removal for residential and commercial projects.",
  founded: 2010,
  phone: "(509) 555-0123",
  phoneTel: "+15095550123", // for tel: links
  email: "info@northwestconcretecutting.com",
  website: "https://www.northwestconcretecutting.com",

  address: {
    street: "123 Industrial Way",
    city: "Spokane",
    state: "WA",
    stateFullName: "Washington",
    zip: "99201",
    country: "US",
  },

  coordinates: {
    lat: 47.6588,
    lng: -117.426,
  },

  hours: {
    weekdays: "7:00 AM - 5:00 PM",
    saturday: "8:00 AM - 2:00 PM",
    sunday: "Closed",
    opensAt: "07:00",
    closesAt: "17:00",
  },

  licenses: {
    wa: "NORTHCC840DN",
    id: "RCE-12345",
  },

  social: {
    facebook: "https://facebook.com/northwestconcretecutting",
    google: "", // Google Business Profile URL
    yelp: "",
    nextdoor: "",
  },

  stats: {
    yearsExperience: 15,
    projectsCompleted: 2500,
    reviewCount: 87,
    reviewAverage: 4.9,
  },

  priceRange: "$$",

  // Primary trade category - used for schema markup
  category: "Concrete Cutting Service",
  secondaryCategories: ["Demolition Contractor", "Concrete Contractor"],
} as const;

export type Business = typeof business;
