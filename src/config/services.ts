/**
 * ============================================
 * SERVICES CONFIG — Taylor Creek Excavation & Concrete
 * ============================================
 * 8 excavation + concrete services × the configured cities
 * generate the service-area landing pages.
 *
 * Four EXCAVATION trades + four CONCRETE trades. The dual-trade
 * model (one crew for dirt work AND concrete) is the core
 * differentiator and is reflected in the copy throughout.
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
  // ───────────── EXCAVATION ─────────────
  {
    slug: "trenching",
    name: "Trenching",
    shortName: "Trenching",
    description:
      "Clean, accurate trenching for utilities, drainage, and footings. We dig to grade for water, sewer, power, and storm lines, and backfill and compact properly so the ground stays stable afterward.",
    details: [
      "Utility trenches for water, sewer, power, and gas",
      "Drainage and footing-drain trenching to grade",
      "Storm and French-drain line excavation",
      "Careful locating and daylighting around existing utilities",
      "Proper bedding, backfill, and compaction in lifts",
      "Restoration of disturbed surfaces after backfill",
    ],
    icon: "⛏️",
    keywords: [
      "trenching contractor",
      "utility trenching",
      "drainage trenching",
      "sewer line excavation",
      "footing drain trenching",
      "trenching services King County",
      "trenching Pierce County",
    ],
  },
  {
    slug: "grading",
    name: "Grading",
    shortName: "Grading",
    description:
      "Precision grading that moves water where it should go and leaves a stable, buildable surface. From rough cut to finish grade, we shape lots for proper drainage, foundations, and flatwork.",
    details: [
      "Rough and finish grading to engineered plans",
      "Lot leveling and slope correction",
      "Positive drainage away from structures",
      "Subgrade preparation and compaction for concrete",
      "Gravel base and driveway sub-base prep",
      "Erosion control during and after grading",
    ],
    icon: "🚜",
    keywords: [
      "grading contractor",
      "land grading",
      "lot leveling",
      "site grading",
      "yard regrading for drainage",
      "grading Maple Valley WA",
      "finish grading",
    ],
  },
  {
    slug: "site-preparation",
    name: "Site Preparation",
    shortName: "Site Prep",
    description:
      "Full site preparation that turns a raw or rough lot into a build-ready pad. Clearing, stripping, cut-and-fill, and compaction — done to plan and ready for foundations, utilities, and concrete.",
    details: [
      "Clearing, grubbing, and stripping of topsoil",
      "Cut-and-fill earthwork to building pad elevation",
      "Structural fill placed and compacted in lifts",
      "Building pad and foundation excavation",
      "Erosion and sediment control per Ecology standards",
      "Coordination with utilities and concrete in one crew",
    ],
    icon: "🏗️",
    keywords: [
      "site preparation contractor",
      "site prep",
      "lot clearing and grading",
      "building pad preparation",
      "new construction site prep",
      "site prep Covington WA",
      "excavation contractor",
    ],
  },
  {
    slug: "selective-demolition",
    name: "Selective Demolition",
    shortName: "Demolition",
    description:
      "Targeted demolition and removal — old slabs, driveways, foundations, and structures — with clean haul-off and a graded, ready surface left behind. We take out the old and prep for the new.",
    details: [
      "Concrete slab, driveway, and sidewalk removal",
      "Foundation and footing demolition",
      "Small structure and outbuilding teardown",
      "Debris haul-off and site cleanup",
      "Careful work around utilities and adjacent structures",
      "Regrade and compact after removal for the next phase",
    ],
    icon: "🧱",
    keywords: [
      "selective demolition",
      "concrete removal",
      "driveway demolition",
      "slab removal and haul-off",
      "foundation demolition",
      "demolition contractor King County",
      "site demolition",
    ],
  },

  // ───────────── CONCRETE ─────────────
  {
    slug: "concrete-driveways",
    name: "Concrete Driveways",
    shortName: "Driveways",
    description:
      "Durable concrete driveways built on a properly prepared sub-base — because the driveway is only as good as the ground under it. We handle the excavation, grading, and the pour as one job.",
    details: [
      "Excavation and compacted gravel sub-base",
      "Proper thickness and reinforcement for vehicle loads",
      "Drainage and slope built into the design",
      "Broom, exposed-aggregate, and finished options",
      "Control joints placed to manage cracking",
      "Old driveway removal and replacement available",
    ],
    icon: "🛣️",
    keywords: [
      "concrete driveway contractor",
      "driveway replacement",
      "new concrete driveway",
      "driveway installation",
      "concrete driveway Auburn WA",
      "residential concrete driveway",
      "driveway excavation and pour",
    ],
  },
  {
    slug: "concrete-patios",
    name: "Concrete Patios",
    shortName: "Patios",
    description:
      "Concrete patios designed to drain, resist cracking, and hold up to Pacific Northwest weather. We grade the base, form it right, and finish it to match how you want to use the space.",
    details: [
      "Compacted, well-drained patio sub-base",
      "Broom, stamped, and exposed-aggregate finishes",
      "Slope set for positive drainage away from the home",
      "Control and expansion joints to limit cracking",
      "Integration with walkways, steps, and footings",
      "Grading and demolition handled by the same crew",
    ],
    icon: "🧱",
    keywords: [
      "concrete patio contractor",
      "patio installation",
      "stamped concrete patio",
      "backyard concrete patio",
      "concrete patio Puyallup",
      "patio slab",
      "residential concrete patio",
    ],
  },
  {
    slug: "concrete-slabs",
    name: "Concrete Slabs",
    shortName: "Slabs",
    description:
      "Structural and flat concrete slabs for garages, shops, sheds, and equipment pads. We prep and compact the subgrade so the slab bears evenly and stays put through wet Northwest winters.",
    details: [
      "Garage, shop, shed, and outbuilding slabs",
      "Equipment and RV/parking pads",
      "Engineered subgrade prep and structural fill",
      "Vapor barrier and reinforcement as required",
      "Thickened edges and footings where needed",
      "Excavation, grading, and pour under one contract",
    ],
    icon: "🟫",
    keywords: [
      "concrete slab contractor",
      "garage slab",
      "shop floor slab",
      "equipment pad",
      "concrete slab installation",
      "slab on grade",
      "concrete contractor King County",
    ],
  },
  {
    slug: "concrete-sidewalks",
    name: "Concrete Sidewalks & Flatwork",
    shortName: "Sidewalks",
    description:
      "Sidewalks, walkways, and flatwork that are level, safe, and built to code. We handle grading, forming, and finishing — including ADA-aware approaches and right-of-way work where required.",
    details: [
      "Residential and commercial sidewalks",
      "Walkways, steps, and landings",
      "Code- and ADA-aware approaches and ramps",
      "Right-of-way and approach permits coordinated",
      "Removal and replacement of cracked or heaved flatwork",
      "Proper base prep so new flatwork stays level",
    ],
    icon: "🚶",
    keywords: [
      "concrete sidewalk contractor",
      "sidewalk installation",
      "concrete flatwork",
      "walkway concrete",
      "sidewalk replacement",
      "ADA sidewalk ramp",
      "concrete sidewalk Renton WA",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
