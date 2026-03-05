/**
 * ============================================
 * BUSINESS CONFIG — Frame Restoration Utah
 * ============================================
 * This is the ONLY file you need to change to
 * spin up a new tradesmen website. Everything
 * else generates from this config.
 */

export const business = {
  name: "Frame Restoration Utah",
  shortName: "Frame Restoration",
  tagline: "Expert Roofing Services You Can Trust",
  description:
    "Frame Restoration Utah provides expert roofing solutions to residential and commercial clients across Utah and Texas. With over a decade of experience, we deliver high-quality craftsmanship backed by comprehensive warranties. Our team is dedicated to protecting your property with reliable, professional roofing services.",
  founded: 2014,
  phone: "(801) 555-0199",
  phoneTel: "+18015550199", // for tel: links
  email: "info@framerestorationutah.com",
  website: "https://www.framerestorationutah.com",

  address: {
    street: "123 Main Street",
    city: "Heber City",
    state: "UT",
    stateFullName: "Utah",
    zip: "84032",
    country: "US",
  },

  coordinates: {
    lat: 40.5069,
    lng: -111.4133,
  },

  hours: {
    weekdays: "7:00 AM - 6:00 PM",
    saturday: "8:00 AM - 3:00 PM",
    sunday: "Emergency Only",
    opensAt: "07:00",
    closesAt: "18:00",
  },

  licenses: {
    ut: "FRAMERU-001",
    tx: "FRAMERTX-001",
  },

  social: {
    facebook: "https://facebook.com/framerestorationutah",
    google: "", // Google Business Profile URL
    yelp: "",
    nextdoor: "",
  },

  stats: {
    yearsExperience: 12,
    projectsCompleted: 3500,
    reviewCount: 142,
    reviewAverage: 4.8,
  },

  priceRange: "$$",

  // Primary trade category - used for schema markup
  category: "Roofing Contractor",
  secondaryCategories: ["Storm Damage Repair", "Gutter Contractor"],
} as const;

export type Business = typeof business;
