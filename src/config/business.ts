/**
 * ============================================
 * BUSINESS CONFIG — Taylor Creek Excavation & Concrete
 * ============================================
 * This is the ONLY file you need to change to
 * spin up a new tradesmen website. Everything
 * else generates from this config.
 *
 * NOTE ON HONEST CLAIMS: stats are intentionally null /
 * zero until real numbers exist. Review UI is hidden while
 * reviewCount is 0 (avoids fake AggregateRating schema, which
 * Google penalizes). Fill `license.registration` with the real
 * WA L&I contractor registration number when available.
 */

export const business = {
  name: "Taylor Creek Excavation & Concrete",
  shortName: "Taylor Creek",
  tagline: "Excavation & Concrete — One Crew, Two Trades",
  description:
    "Taylor Creek Excavation & Concrete is a dual-trade contractor serving Maple Valley and the greater King and Pierce County area of Washington. We handle both the dirt work and the concrete — trenching, grading, site preparation, and selective demolition, plus concrete driveways, patios, slabs, and sidewalks — so homeowners and builders don't have to hire and coordinate two separate companies. Licensed, bonded, and insured in Washington.",
  // Founding year unknown — left null so no "since YYYY" claim is fabricated.
  founded: null as number | null,
  phone: "(425) 465-5586",
  phoneTel: "+14254655586", // for tel: links
  email: "geoffharrington3@gmail.com",
  website: "https://www.taylorcreekexcavation.com",

  address: {
    // Service-area business — no public street address published.
    street: "",
    city: "Maple Valley",
    state: "WA",
    stateFullName: "Washington",
    zip: "98038",
    country: "US",
  },

  coordinates: {
    lat: 47.3873,
    lng: -122.0454,
  },

  hours: {
    weekdays: "7:00 AM - 6:00 PM",
    saturday: "7:00 AM - 6:00 PM",
    sunday: "Closed",
    opensAt: "07:00",
    closesAt: "18:00",
  },

  // WA contractors register with L&I (bonded + insured) rather than
  // hold a trade license. Add the real registration/UBI number here.
  license: {
    state: "WA",
    stateFullName: "Washington",
    registration: "", // e.g. "TAYLOCE123AB" — TODO: add Geoff's WA L&I registration
  },

  social: {
    facebook: "",
    google: "", // Google Business Profile URL — add once claimed
    yelp: "",
    nextdoor: "",
  },

  // Honest proof points. No fabricated counts. reviewCount stays 0
  // (and reviewAverage null) until real Google reviews are wired in,
  // which keeps the rating UI and AggregateRating schema hidden.
  stats: {
    reviewCount: 0,
    reviewAverage: null as number | null,
  },

  priceRange: "$$",

  // Primary trade category — used for schema markup.
  // GeneralContractor is the closest valid schema.org LocalBusiness subtype
  // for a dual-trade excavation + concrete contractor.
  category: "Excavation & Concrete Contractor",
  schemaType: "GeneralContractor",
  primaryTrades: ["Excavation", "Concrete"],
  secondaryCategories: ["Excavation Contractor", "Concrete Contractor"],
  serviceAreaLabel: "King & Pierce County, WA",
} as const;

export type Business = typeof business;
