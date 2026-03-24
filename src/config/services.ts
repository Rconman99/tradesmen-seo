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
  /** 40-60 word AI-extractable answer block for AI Overview citations */
  aiSummary: string;
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
    aiSummary:
      "A re-roof (roof replacement) involves fully removing old roofing materials and installing a new system. Average cost ranges from $8,000 to $25,000+ depending on roof size and materials. The process typically takes 1-3 days for residential homes. Quality installations include 10-year workmanship warranties and 20-30 year manufacturer material warranties.",
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
    aiSummary:
      "Hail damage repair restores roofs impacted by hailstorms, addressing cracked shingles, dented flashing, and hidden structural damage. Most homeowner insurance policies cover hail damage repair when properly documented. A professional inspection should be scheduled within 72 hours of a storm to identify damage before it worsens into leaks or mold.",
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
    aiSummary:
      "Wind damage repair addresses roofing issues caused by high winds, including lifted or missing shingles, damaged flashing, and compromised underlayment. Winds above 60 mph can cause significant roof damage. Insurance typically covers wind damage when documented with photos and a professional inspection report within 30 days of the storm event.",
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
    aiSummary:
      "Roof leak repair involves locating and fixing the source of water intrusion, which commonly occurs at flashing, valleys, pipe boots, and damaged shingles. Average repair costs range from $300 to $1,500 depending on severity and location. Early detection using thermal imaging prevents costly interior water damage, mold growth, and structural deterioration.",
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
    aiSummary:
      "Seamless gutter installation and siding replacement protect homes from water damage by directing rainwater away from the foundation and shielding exterior walls. Seamless gutters cost $6-$12 per linear foot installed. Properly functioning gutters and siding can prevent up to 90% of foundation water damage and reduce energy costs by 10-20%.",
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
    aiSummary:
      "Commercial roofing includes flat roof systems like TPO, EPDM, and PVC membranes, as well as metal and built-up roofing. Commercial roofs typically cost $4-$12 per square foot installed. TPO is the most popular commercial option, offering 15-30 year lifespans with energy-efficient reflective properties that can reduce cooling costs by up to 30%.",
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
    aiSummary:
      "Roof maintenance agreements provide scheduled bi-annual inspections, debris removal, gutter cleaning, and minor repairs for a fixed annual fee. Regular maintenance extends roof lifespan by 25-40% and saves homeowners 20-30% on lifetime roofing costs by catching small issues before they become major repairs.",
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
