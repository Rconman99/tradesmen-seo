#!/usr/bin/env npx tsx
/**
 * SEO Blog Post Generator & Publisher
 *
 * Two-step workflow — generate content for free, then publish to Sanity.
 *
 * Step 1: Get the SEO prompt for any keyword
 *   npm run generate-post -- --keyword "concrete cutting spokane" --prompt
 *   (Use the prompt with Claude Code, ChatGPT, or any free AI. Save JSON output to a file.)
 *
 * Step 2: Publish the generated JSON to Sanity
 *   npm run generate-post -- --input post.json --dry-run   # preview first
 *   npm run generate-post -- --input post.json              # publish
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

config({ path: resolve(__dirname, "../.env.local") });

// ── Inline config data ───────────────────────────────────────────────
// Duplicated from src/config/ because tsx can't resolve @/ path aliases.

const SERVICES = [
  { slug: "concrete-cutting", name: "Concrete Cutting", keywords: ["concrete cutting", "concrete saw cutting", "slab cutting", "concrete sawing"] },
  { slug: "core-drilling", name: "Core Drilling", keywords: ["core drilling", "concrete coring", "concrete drilling", "diamond core drilling"] },
  { slug: "wall-sawing", name: "Wall Sawing", keywords: ["wall sawing", "concrete wall cutting", "wall saw", "track sawing"] },
  { slug: "concrete-removal", name: "Concrete Removal & Demolition", keywords: ["concrete removal", "concrete demolition", "concrete breaking", "concrete hauling"] },
  { slug: "concrete-scanning", name: "Concrete Scanning (GPR)", keywords: ["concrete scanning", "GPR scanning", "ground penetrating radar", "concrete x-ray"] },
  { slug: "flat-sawing", name: "Flat Sawing", keywords: ["flat sawing", "slab sawing", "road sawing", "pavement cutting"] },
];

const CITIES = [
  { slug: "spokane-wa", name: "Spokane", state: "WA" },
  { slug: "spokane-valley-wa", name: "Spokane Valley", state: "WA" },
  { slug: "kennewick-wa", name: "Kennewick", state: "WA" },
  { slug: "yakima-wa", name: "Yakima", state: "WA" },
  { slug: "pasco-wa", name: "Pasco", state: "WA" },
  { slug: "richland-wa", name: "Richland", state: "WA" },
  { slug: "walla-walla-wa", name: "Walla Walla", state: "WA" },
  { slug: "wenatchee-wa", name: "Wenatchee", state: "WA" },
  { slug: "moses-lake-wa", name: "Moses Lake", state: "WA" },
  { slug: "ellensburg-wa", name: "Ellensburg", state: "WA" },
  { slug: "pullman-wa", name: "Pullman", state: "WA" },
  { slug: "sunnyside-wa", name: "Sunnyside", state: "WA" },
  { slug: "east-wenatchee-wa", name: "East Wenatchee", state: "WA" },
  { slug: "cheney-wa", name: "Cheney", state: "WA" },
  { slug: "liberty-lake-wa", name: "Liberty Lake", state: "WA" },
  { slug: "airway-heights-wa", name: "Airway Heights", state: "WA" },
  { slug: "selah-wa", name: "Selah", state: "WA" },
  { slug: "ephrata-wa", name: "Ephrata", state: "WA" },
  { slug: "othello-wa", name: "Othello", state: "WA" },
  { slug: "grandview-wa", name: "Grandview", state: "WA" },
  { slug: "prosser-wa", name: "Prosser", state: "WA" },
  { slug: "chelan-wa", name: "Chelan", state: "WA" },
  { slug: "leavenworth-wa", name: "Leavenworth", state: "WA" },
  { slug: "cle-elum-wa", name: "Cle Elum", state: "WA" },
  { slug: "omak-wa", name: "Omak", state: "WA" },
  { slug: "colville-wa", name: "Colville", state: "WA" },
  { slug: "toppenish-wa", name: "Toppenish", state: "WA" },
  { slug: "coeur-dalene-id", name: "Coeur d'Alene", state: "ID" },
  { slug: "post-falls-id", name: "Post Falls", state: "ID" },
  { slug: "lewiston-id", name: "Lewiston", state: "ID" },
  { slug: "moscow-id", name: "Moscow", state: "ID" },
  { slug: "hayden-id", name: "Hayden", state: "ID" },
  { slug: "sandpoint-id", name: "Sandpoint", state: "ID" },
  { slug: "rathdrum-id", name: "Rathdrum", state: "ID" },
  { slug: "bonners-ferry-id", name: "Bonners Ferry", state: "ID" },
  { slug: "orofino-id", name: "Orofino", state: "ID" },
  { slug: "grangeville-id", name: "Grangeville", state: "ID" },
  { slug: "spirit-lake-id", name: "Spirit Lake", state: "ID" },
  { slug: "priest-river-id", name: "Priest River", state: "ID" },
  { slug: "kellogg-id", name: "Kellogg", state: "ID" },
  { slug: "wallace-id", name: "Wallace", state: "ID" },
  { slug: "st-maries-id", name: "St. Maries", state: "ID" },
];

const BUSINESS = {
  name: "Northwest Concrete Cutting LLC",
  shortName: "Northwest Concrete Cutting",
  phone: "(509) 555-0123",
  website: "https://www.northwestconcretecutting.com",
};

// ── Types ────────────────────────────────────────────────────────────

interface Section {
  type: "heading" | "paragraph";
  level?: "h2" | "h3";
  text: string;
}

interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  sections: Section[];
}

// ── Valid routes (for link validation) ───────────────────────────────

const VALID_ROUTES = new Set([
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...CITIES.map((c) => `/areas/${c.slug}`),
  ...CITIES.flatMap((c) => SERVICES.map((s) => `/areas/${c.slug}/${s.slug}`)),
  "/contact",
  "/about",
  "/gallery",
  "/reviews",
  "/blog",
]);

// ── Helpers ──────────────────────────────────────────────────────────

function generateKey(): string {
  return Math.random().toString(36).substring(2, 14);
}

function matchKeyword(keyword: string) {
  const lower = keyword.toLowerCase();
  const matchedServices = SERVICES.filter((s) =>
    s.keywords.some((k) => lower.includes(k) || k.includes(lower))
  );
  const matchedCities = CITIES.filter((c) =>
    lower.includes(c.name.toLowerCase())
  );
  return { services: matchedServices, cities: matchedCities };
}

function getArg(args: string[], flag: string): string | undefined {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : undefined;
}

// ── Prompt builder ───────────────────────────────────────────────────

function buildPrompt(
  keyword: string,
  matchedServices: typeof SERVICES,
  matchedCities: typeof CITIES
): string {
  const serviceLinks = SERVICES.map(
    (s) => `  /services/${s.slug} = "${s.name}"`
  ).join("\n");

  const areaCities =
    matchedCities.length > 0
      ? matchedCities
      : CITIES.filter((c) =>
          ["spokane-wa", "spokane-valley-wa", "coeur-dalene-id"].includes(
            c.slug
          )
        );
  const areaLinks = areaCities
    .map((c) => `  /areas/${c.slug} = "${c.name}, ${c.state}"`)
    .join("\n");

  const comboLinks = areaCities
    .slice(0, 3)
    .flatMap((c) =>
      matchedServices.length > 0
        ? matchedServices.map(
            (s) =>
              `  /areas/${c.slug}/${s.slug} = "${s.name} in ${c.name}"`
          )
        : [
            `  /areas/${c.slug}/${SERVICES[0].slug} = "${SERVICES[0].name} in ${c.name}"`,
          ]
    )
    .join("\n");

  return `You are an SEO content writer for ${BUSINESS.name}, a concrete cutting company in Eastern Washington and Northern Idaho.

Write a blog post targeting the keyword: "${keyword}"

SEO RULES (follow precisely):
1. Title: Include the target keyword. Under 60 characters.
2. First paragraph: Include the keyword naturally within the first 2 sentences.
3. Word count: 1,200-1,800 words total.
4. Structure: 5-7 H2 subheadings, spaced every 200-300 words. Never use H1.
5. Keyword density: 2-3% (the keyword should appear 8-12 times naturally).
6. Internal links: Include 3+ internal links using this exact syntax: {{link:/path|anchor text}}
   Available service pages:
${serviceLinks}
   Available area pages:
${areaLinks}
   Available service+area pages:
${comboLinks}
7. Local signals: Mention Spokane-area cities, regional weather (freeze-thaw cycles, harsh winters), and local construction context.
8. LSI keywords: Include semantic variations and related terms naturally.
9. CTA: End with a call-to-action paragraph mentioning ${BUSINESS.phone}.
10. Voice: Professional, knowledgeable contractor. No fluff. Concrete industry expertise.

INTERNAL LINK SYNTAX:
Use {{link:/services/concrete-cutting|concrete cutting services}} to create links.
Only use paths from the lists above. Include at least one /services/ link and one /areas/ link.

Respond with ONLY valid JSON (no markdown fences, no comments) in this exact structure:
{
  "title": "SEO title under 60 chars with keyword",
  "slug": "url-friendly-slug-from-title",
  "excerpt": "150-200 char meta description with keyword",
  "category": "Industry Tips",
  "sections": [
    { "type": "paragraph", "text": "Opening paragraph with keyword..." },
    { "type": "heading", "level": "h2", "text": "Subheading text" },
    { "type": "paragraph", "text": "Content paragraph with {{link:/services/slug|anchor text}} links..." },
    { "type": "heading", "level": "h2", "text": "Another subheading" },
    { "type": "paragraph", "text": "More content..." }
  ]
}

Category must be one of: "Industry Tips", "Project Guides", "Safety & Compliance", "Local Spotlight", "Equipment & Technology"`;
}

// ── Portable Text conversion ─────────────────────────────────────────

function textToBlock(text: string, style: string = "normal") {
  const linkRegex = /\{\{link:(\/[^|]+)\|([^}]+)\}\}/g;
  const markDefs: { _key: string; _type: string; href: string }[] = [];
  const children: {
    _type: string;
    _key: string;
    text: string;
    marks: string[];
  }[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, href, anchorText] = match;

    if (match.index > lastIndex) {
      children.push({
        _type: "span",
        _key: generateKey(),
        text: text.slice(lastIndex, match.index),
        marks: [],
      });
    }

    if (VALID_ROUTES.has(href)) {
      const markKey = generateKey();
      markDefs.push({ _key: markKey, _type: "link", href });
      children.push({
        _type: "span",
        _key: generateKey(),
        text: anchorText,
        marks: [markKey],
      });
    } else {
      console.warn(`  Warning: Stripped invalid link: ${href}`);
      children.push({
        _type: "span",
        _key: generateKey(),
        text: anchorText,
        marks: [],
      });
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    children.push({
      _type: "span",
      _key: generateKey(),
      text: text.slice(lastIndex),
      marks: [],
    });
  }

  if (children.length === 0) {
    children.push({
      _type: "span",
      _key: generateKey(),
      text,
      marks: [],
    });
  }

  return { _type: "block", _key: generateKey(), style, markDefs, children };
}

function sectionsToPortableText(sections: Section[]) {
  return sections.map((section) => {
    if (section.type === "heading") {
      return {
        _type: "block",
        _key: generateKey(),
        style: section.level || "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: generateKey(),
            text: section.text,
            marks: [],
          },
        ],
      };
    }
    return textToBlock(section.text);
  });
}

// ── Sanity API ───────────────────────────────────────────────────────

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const SANITY_API = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-07-11/data`;

async function sanityMutate(mutations: Record<string, unknown>[]) {
  const res = await fetch(`${SANITY_API}/mutate/${SANITY_DATASET}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sanity mutation error (${res.status}): ${text}`);
  }
  return res.json();
}

async function sanityQuery<T = unknown>(query: string): Promise<T> {
  const encoded = encodeURIComponent(query);
  const res = await fetch(
    `${SANITY_API}/query/${SANITY_DATASET}?query=${encoded}`,
    { headers: { Authorization: `Bearer ${SANITY_TOKEN}` } }
  );
  if (!res.ok) throw new Error(`Sanity query error: ${res.status}`);
  const json = await res.json();
  return json.result;
}

async function ensureCategory(categoryTitle: string): Promise<string> {
  const slug = categoryTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const existing = await sanityQuery<{ _id: string } | null>(
    `*[_type == "category" && slug.current == "${slug}"][0]{ _id }`
  );
  if (existing?._id) return existing._id;

  const id = `category-${slug}`;
  await sanityMutate([
    {
      createOrReplace: {
        _id: id,
        _type: "category",
        title: categoryTitle,
        slug: { _type: "slug", current: slug },
      },
    },
  ]);
  console.log(`  + Created category: "${categoryTitle}"`);
  return id;
}

async function checkSlugExists(slug: string): Promise<boolean> {
  const count = await sanityQuery<number>(
    `count(*[_type == "post" && slug.current == "${slug}"])`
  );
  return count > 0;
}

// ── Stats ────────────────────────────────────────────────────────────

function printStats(post: GeneratedPost, keyword: string) {
  const fullText = post.sections.map((s) => s.text).join(" ");
  const wordCount = fullText.split(/\s+/).filter(Boolean).length;
  const escapedKw = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const keywordCount = (
    fullText.toLowerCase().match(new RegExp(escapedKw.toLowerCase(), "g")) ||
    []
  ).length;
  const density = ((keywordCount / wordCount) * 100).toFixed(1);
  const linkCount = (fullText.match(/\{\{link:/g) || []).length;
  const h2Count = post.sections.filter(
    (s) => s.type === "heading" && (s.level === "h2" || !s.level)
  ).length;

  console.log(`\nStats:`);
  console.log(`  Words:            ${wordCount}`);
  console.log(`  Keyword mentions: ${keywordCount} (${density}% density)`);
  console.log(`  H2 subheadings:   ${h2Count}`);
  console.log(`  Internal links:   ${linkCount}`);
}

function printPreview(post: GeneratedPost) {
  console.log(
    "\n────────────────── PREVIEW ──────────────────────────\n"
  );
  for (const section of post.sections) {
    if (section.type === "heading") {
      console.log(`\n## ${section.text}\n`);
    } else {
      const readable = section.text.replace(
        /\{\{link:[^|]+\|([^}]+)\}\}/g,
        "[$1]"
      );
      console.log(readable + "\n");
    }
  }
  console.log("─────────────────────────────────────────────────────");
}

// ── Main ─────────────────────────────────────────────────────────────

const USAGE = `SEO Blog Post Generator

Usage:
  npm run generate-post -- --keyword "your keyword" --prompt     Get SEO prompt
  npm run generate-post -- --input post.json --dry-run           Preview post
  npm run generate-post -- --input post.json                     Publish to Sanity

Flags:
  --keyword "..."   Target SEO keyword
  --prompt          Output the SEO prompt (use with any AI to generate content)
  --input <file>    Path to generated JSON file
  --dry-run         Preview without publishing`;

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h") || args.length === 0) {
    console.log(USAGE);
    process.exit(0);
  }

  const keyword = getArg(args, "--keyword");
  const inputFile = getArg(args, "--input");
  const showPrompt = args.includes("--prompt");
  const dryRun = args.includes("--dry-run");

  // ── Mode 1: Generate SEO prompt ──────────────────────────────────
  if (showPrompt) {
    if (!keyword) {
      console.error('Error: --prompt requires --keyword "your keyword"');
      process.exit(1);
    }

    const { services, cities } = matchKeyword(keyword);
    if (services.length)
      console.error(
        `Matched services: ${services.map((s) => s.name).join(", ")}`
      );
    if (cities.length)
      console.error(
        `Matched cities:   ${cities.map((c) => c.name).join(", ")}`
      );
    console.error(""); // blank line before prompt

    // Prompt goes to stdout (can be piped/copied), metadata to stderr
    console.log(buildPrompt(keyword, services, cities));
    return;
  }

  // ── Mode 2: Publish from JSON file ───────────────────────────────
  if (inputFile) {
    // Validate env vars for Sanity
    if (!SANITY_PROJECT_ID || SANITY_PROJECT_ID === "not-configured") {
      console.error(
        "Error: Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local"
      );
      process.exit(1);
    }
    if (!dryRun && !SANITY_TOKEN) {
      console.error(
        "Error: Missing SANITY_API_WRITE_TOKEN in .env.local (required for publishing)"
      );
      process.exit(1);
    }

    // Read and parse JSON
    let raw: string;
    try {
      raw = readFileSync(resolve(inputFile), "utf-8");
    } catch {
      console.error(`Error: Could not read file: ${inputFile}`);
      process.exit(1);
    }

    // Strip markdown fences if present
    raw = raw
      .replace(/^```(?:json)?\s*\n?/, "")
      .replace(/\n?\s*```$/, "")
      .trim();

    let post: GeneratedPost;
    try {
      post = JSON.parse(raw);
    } catch {
      console.error("Error: Invalid JSON in input file");
      process.exit(1);
    }

    // Infer keyword from title for stats (or use --keyword if provided)
    const kw = keyword || post.slug.replace(/-/g, " ");

    console.log(`\nTitle:    "${post.title}"`);
    console.log(`Slug:     ${post.slug}`);
    console.log(`Category: ${post.category}`);
    console.log(`Excerpt:  "${post.excerpt}"`);

    // Convert to Portable Text (validates links, logs warnings)
    const body = sectionsToPortableText(post.sections);

    printStats(post, kw);

    if (dryRun) {
      printPreview(post);
      console.log("\nDry run complete. Remove --dry-run to publish.\n");
      return;
    }

    // Check for duplicate slug
    let finalSlug = post.slug;
    if (await checkSlugExists(finalSlug)) {
      finalSlug = `${finalSlug}-2`;
      console.log(`\n  Slug collision — using: ${finalSlug}`);
    }

    // Ensure category exists
    console.log("\nEnsuring category...");
    const categoryId = await ensureCategory(post.category);

    // Publish
    console.log("Publishing to Sanity...");
    const result = await sanityMutate([
      {
        create: {
          _type: "post",
          title: post.title,
          slug: { _type: "slug", current: finalSlug },
          excerpt: post.excerpt,
          category: { _type: "reference", _ref: categoryId },
          body,
          publishedAt: new Date().toISOString(),
        },
      },
    ]);

    const docId = (result as { results?: { id: string }[] }).results?.[0]?.id;
    console.log(`\nPublished!`);
    console.log(`  Sanity ID: ${docId}`);
    console.log(`  Studio:    /studio/structure/post;${docId}`);
    console.log(`  Live URL:  /blog/${finalSlug}\n`);
    return;
  }

  // ── No valid mode ────────────────────────────────────────────────
  console.error("Error: Use --prompt to get the SEO prompt, or --input <file> to publish.\n");
  console.log(USAGE);
  process.exit(1);
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exit(1);
});
