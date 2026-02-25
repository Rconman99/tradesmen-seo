/**
 * ============================================
 * SERVICES CONFIG — Edit per client
 * ============================================
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
    slug: "concrete-cutting",
    name: "Concrete Cutting",
    shortName: "Cutting",
    description:
      "Precision concrete cutting for residential and commercial projects. We use diamond blade technology for clean, accurate cuts every time.",
    details: [
      "Flat sawing for floors, slabs, and pavements",
      "Cutting for plumbing and electrical access",
      "Expansion and control joint cutting",
      "Doorway and window openings",
      "Trench cutting for utilities",
    ],
    icon: "🔪",
    keywords: [
      "concrete cutting",
      "concrete saw cutting",
      "slab cutting",
      "concrete sawing",
    ],
  },
  {
    slug: "core-drilling",
    name: "Core Drilling",
    shortName: "Drilling",
    description:
      "Precise core drilling for pipes, conduits, and utilities. We drill clean, round holes from 1 inch to 60 inches in diameter.",
    details: [
      "Holes for plumbing and HVAC penetrations",
      "Electrical conduit access",
      "Structural testing cores",
      "Anchor bolt holes",
      "Handrail and post holes in concrete",
    ],
    icon: "🕳️",
    keywords: [
      "core drilling",
      "concrete coring",
      "concrete drilling",
      "diamond core drilling",
    ],
  },
  {
    slug: "wall-sawing",
    name: "Wall Sawing",
    shortName: "Wall Sawing",
    description:
      "Track-mounted wall sawing for creating openings in vertical and horizontal concrete surfaces with precision and minimal vibration.",
    details: [
      "Door and window openings in concrete walls",
      "HVAC and ventilation openings",
      "Stairwell and elevator shaft cuts",
      "Structural modification cuts",
      "Precise depth control for partial cuts",
    ],
    icon: "🧱",
    keywords: [
      "wall sawing",
      "concrete wall cutting",
      "wall saw",
      "track sawing",
    ],
  },
  {
    slug: "concrete-removal",
    name: "Concrete Removal & Demolition",
    shortName: "Removal",
    description:
      "Complete concrete removal and selective demolition services. We remove driveways, patios, sidewalks, foundations, and interior slabs.",
    details: [
      "Driveway removal and replacement prep",
      "Patio and sidewalk demolition",
      "Foundation removal",
      "Interior slab removal",
      "Concrete hauling and disposal included",
    ],
    icon: "🔨",
    keywords: [
      "concrete removal",
      "concrete demolition",
      "concrete breaking",
      "concrete hauling",
    ],
  },
  {
    slug: "concrete-scanning",
    name: "Concrete Scanning (GPR)",
    shortName: "Scanning",
    description:
      "Ground penetrating radar (GPR) scanning to locate rebar, post-tension cables, conduits, and utilities before cutting.",
    details: [
      "Rebar and post-tension cable detection",
      "Utility and conduit location",
      "Void detection",
      "Slab thickness measurement",
      "Pre-cut safety assessment",
    ],
    icon: "📡",
    keywords: [
      "concrete scanning",
      "GPR scanning",
      "ground penetrating radar",
      "concrete x-ray",
    ],
  },
  {
    slug: "flat-sawing",
    name: "Flat Sawing",
    shortName: "Flat Sawing",
    description:
      "Flat sawing (slab sawing) for horizontal surfaces including floors, bridge decks, pavements, and slabs using walk-behind saws.",
    details: [
      "Road and pavement cutting",
      "Floor and slab cutting",
      "Bridge deck sawing",
      "Parking lot repair cuts",
      "Utility trench cutting",
    ],
    icon: "🛤️",
    keywords: [
      "flat sawing",
      "slab sawing",
      "road sawing",
      "pavement cutting",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
