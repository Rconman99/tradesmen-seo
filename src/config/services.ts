/**
 * ============================================
 * SERVICES CONFIG — Frame Restoration Utah
 * ============================================
 * 7 roofing services × 14 cities = 98 landing pages
 */

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  details: string[];
  icon: string; // emoji for now, swap for icons later
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: "re-roof",
    name: "Re-Roof",
    shortName: "Re-Roof",
    description:
      "Complete roof replacement with quality materials and expert installation. Our team handles every aspect from inspection and material selection to installation and cleanup.",
    details: [
      "Full tear-off and replacement for lasting results",
      "Premium asphalt shingle, metal, and tile options",
      "10-year workmanship warranty on all projects",
      "Free inspection and detailed estimate",
      "Insurance claim coordination available",
      "20-30 year manufacturer material warranties",
    ],
    icon: "🏠",
    keywords: [
      "re-roofing services",
      "roof replacement",
      "new roof installation",
      "residential roofing",
      "commercial re-roofing",
      "roof installation contractor",
      "durable roofing solutions",
    ],
  },
  {
    slug: "hail-damage-repair",
    name: "Hail Damage Repair",
    shortName: "Hail Damage",
    description:
      "Fast, professional repair for hail-damaged roofs and storm damage. We respond quickly to emergency calls and work with insurance companies to get your property restored.",
    details: [
      "24/7 emergency response during hail season",
      "Thorough hidden damage assessment",
      "Insurance adjuster coordination",
      "Complete documentation for claims",
      "Same-day inspections available",
      "Full restoration to pre-storm condition",
    ],
    icon: "🌨️",
    keywords: [
      "hail damage repair",
      "storm damage roofing",
      "hail damage assessment",
      "roof hail claims",
      "emergency roof repair",
      "storm damage contractor",
      "insurance roof claims",
    ],
  },
  {
    slug: "wind-damage-repair",
    name: "Wind Damage Repair",
    shortName: "Wind Damage",
    description:
      "Professional repair of wind-damaged roofing systems and structural issues. We assess wind damage comprehensively and make repairs that restore integrity and weatherproofing.",
    details: [
      "Emergency tarping and temporary repairs",
      "Structural damage assessment",
      "Shingle replacement and re-sealing",
      "Drone inspection for detailed assessment",
      "Insurance documentation and coordination",
      "Complete restoration of roof integrity",
    ],
    icon: "💨",
    keywords: [
      "wind damage repair",
      "high wind roofing",
      "roof wind damage",
      "storm roof repair",
      "wind damage restoration",
      "structural roof repair",
      "wind damage insurance claims",
    ],
  },
  {
    slug: "leak-repair",
    name: "Leak Repair",
    shortName: "Leak Repair",
    description:
      "Precise identification and repair of roof leaks to prevent water damage. We use advanced detection methods to find leak sources and fix the root cause, not just the symptom.",
    details: [
      "Advanced leak detection with thermal imaging",
      "Water testing to trace entry points",
      "Localized repair without full replacement",
      "5-year workmanship warranty on repairs",
      "Flashing, shingle, and seal repairs",
      "Prevention of interior water damage",
    ],
    icon: "💧",
    keywords: [
      "roof leak repair",
      "leak detection services",
      "water damage repair",
      "roof leak fix",
      "interior water damage",
      "leak repair contractor",
      "roof waterproofing",
    ],
  },
  {
    slug: "gutters-and-siding",
    name: "Gutters & Siding",
    shortName: "Gutters & Siding",
    description:
      "Gutter installation, repair, and seamless siding solutions for complete home protection. Quality gutters and siding work together with your roof to protect your home from water damage.",
    details: [
      "Custom-fit seamless gutter installation",
      "Vinyl, fiber cement, wood, and metal siding",
      "Proper grading and downspout placement",
      "Gutter cleaning and maintenance programs",
      "Insulated siding for energy efficiency",
      "Fascia and soffit repair and replacement",
    ],
    icon: "🏡",
    keywords: [
      "gutter installation",
      "seamless gutters",
      "siding repair",
      "siding replacement",
      "fascia repair",
      "gutter cleaning",
      "home exterior protection",
    ],
  },
  {
    slug: "commercial-roofing",
    name: "Commercial Roofing",
    shortName: "Commercial",
    description:
      "Professional commercial roofing systems designed for durability and energy efficiency. We specialize in flat roofs, metal systems, and low-slope applications with extended warranties.",
    details: [
      "TPO, EPDM, PVC, and metal systems",
      "Flat roof and low-slope specialists",
      "Superior drainage design",
      "Energy-efficient materials and coatings",
      "Maintenance programs for commercial properties",
      "Minimal disruption to business operations",
    ],
    icon: "🏢",
    keywords: [
      "commercial roofing",
      "flat roof installation",
      "commercial roof repair",
      "industrial roofing",
      "commercial roof maintenance",
      "metal roofing systems",
      "TPO roofing",
    ],
  },
  {
    slug: "roof-maintenance-agreements",
    name: "Roof Maintenance Agreements",
    shortName: "Maintenance",
    description:
      "Proactive maintenance programs that extend roof lifespan and prevent costly emergency repairs. Scheduled inspections, cleaning, minor repairs, and detailed documentation.",
    details: [
      "Bi-annual professional inspections",
      "Debris clearing and gutter cleaning",
      "Minor repair coverage included",
      "Detailed condition documentation",
      "20-30% savings on lifetime roofing costs",
      "Customizable plans for any roof type",
    ],
    icon: "🔧",
    keywords: [
      "roof maintenance",
      "preventative maintenance",
      "roof inspection program",
      "maintenance agreement",
      "annual roof service",
      "roof care plan",
      "roof longevity",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
