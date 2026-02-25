# Test Coverage Analysis

## Current State

**Test coverage: 0%.** The project has no test files, no test runner, no test configuration, and no CI pipeline.

There is no `test` script in `package.json` — only `dev`, `build`, `start`, and `lint`.

---

## Recommended Test Framework Setup

**Vitest** is the recommended test runner for this Next.js + TypeScript project. It offers native ESM/TypeScript support, fast execution, and a Jest-compatible API. For component testing, pair with `@testing-library/react`.

Install:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

---

## Priority Areas for Testing

### 1. Utility Functions (`src/lib/utils.ts`) — HIGH PRIORITY

These are pure functions with zero dependencies on React or Next.js, making them the easiest and highest-value place to start.

| Function | What to test |
|---|---|
| `formatPhone(phone)` | Strips non-digit characters. Test with formatted numbers `(509) 555-0123`, already-clean numbers, empty strings, and strings with extensions. |
| `generateMetaTitle(page, city?, state?)` | Branches on whether `city`/`state` are provided. Test both paths, empty strings, and special characters in city names (e.g., "Coeur d'Alene"). |
| `generateMetaDescription(service, city?, state?)` | Same branching logic. Verify the output includes the lowercased service name and business phone number in both paths. |
| `slugToTitle(slug)` | Converts `"core-drilling"` → `"Core Drilling"`. Test single-word slugs, multi-word slugs, and edge cases like empty strings or already-capitalized input. |

**Estimated: ~15 test cases, <1 hour to write.**

---

### 2. City/Service Config Helpers (`src/config/cities.ts`, `src/config/services.ts`) — HIGH PRIORITY

These helper functions power the dynamic routing logic. Bugs here break entire pages.

| Function | What to test |
|---|---|
| `getCityBySlug(slug)` | Returns the correct city for `"spokane-wa"`, returns `undefined` for a nonexistent slug, handles edge cases like empty string or `null`. |
| `getCitiesByPriority(priority)` | Returns only cities of the given priority. Verify the count matches expectations (e.g., high-priority cities include Spokane, Kennewick, etc.). |
| `getCitiesByState(stateAbbr)` | Filters by state abbreviation. Test `"WA"` vs `"ID"`, and a nonexistent state like `"CA"` (should return empty). |
| `getNearbyCities(city)` | Resolves `nearbyCity` slugs to full City objects. Test with a city that has neighbors, a city with an empty `nearbyCity` array (e.g., Omak), and a city with a slug that references a nonexistent city. |
| `getServiceBySlug(slug)` | Returns the correct service for `"core-drilling"`, `undefined` for a nonexistent slug. |

**Estimated: ~20 test cases, <1 hour to write.**

---

### 3. JSON-LD Schema Generators (`src/lib/schema.ts`) — HIGH PRIORITY

Broken schema markup silently harms SEO. These functions produce structured objects that Google parses directly.

| Function | What to test |
|---|---|
| `generateLocalBusinessSchema()` | Verify the returned object has the correct `@type`, `name`, `telephone`, `address` fields, and that `hasOfferCatalog` contains all 6 services. |
| `generateServiceSchema(service)` | Pass in a known service and verify `name`, `description`, `provider.name`. |
| `generateCityServiceSchema(city)` | Verify it includes the city name in the `name` field and `areaServed.name`. Test with both WA and ID cities. |
| `generateCityFAQSchema(city)` | Verify 4 FAQ entries are generated. Verify the WA/ID license branching logic — a WA city should include `business.licenses.wa`, an ID city should include `business.licenses.id`. |
| `generateCityServiceDetailSchema(city, service)` | Verify all fields are populated with correct city/service data. |
| `generateCityServiceFAQSchema(city, service)` | Verify 5 FAQ entries. Same WA/ID license branching check. |
| `generateBreadcrumbSchema(items)` | Verify positions are 1-indexed, URLs are prefixed with the business website, and empty arrays produce an empty `itemListElement`. |

**Estimated: ~25 test cases, ~1.5 hours to write.**

---

### 4. Sitemap Generation (`src/app/sitemap.ts`) — MEDIUM PRIORITY

The sitemap function generates URLs for every city x service combination. It's async (fetches blog slugs from Sanity), so it requires mocking the Sanity client.

| What to test |
|---|
| Returns all 7 static pages (home, services, areas, about, contact, reviews, blog). |
| Returns one entry per service (6 services). |
| Returns one entry per city (50+ cities). |
| Returns city x service cross-product pages (50+ cities x 6 services = 300+ entries). |
| High-priority cities get higher `priority` values than low-priority cities. |
| Blog post slugs from Sanity are included. |

**Requires mocking `sanityFetch`.** This makes it slightly more complex than pure-function tests but catches real bugs like missing URL segments or incorrect priority values.

---

### 5. Revalidation API Route (`src/app/api/revalidate/route.ts`) — MEDIUM PRIORITY

This is the only API endpoint. It handles Sanity webhooks and has multiple error paths.

| What to test |
|---|
| Returns 500 if `SANITY_REVALIDATE_SECRET` is missing from env. |
| Returns 401 if the webhook signature is invalid. |
| Returns 400 if the body has no `_type`. |
| Returns 200 and calls `revalidateTag` for a valid request. |
| Returns 500 and logs when an unexpected error occurs. |

**Requires mocking `next-sanity/webhook` (`parseBody`) and `next/cache` (`revalidateTag`).**

---

### 6. Robots.txt (`src/app/robots.ts`) — LOW PRIORITY (but trivial)

| What to test |
|---|
| Allows `/` for all user agents. |
| Disallows `/studio` and `/api/`. |
| Sitemap URL points to the correct domain. |

**Only ~3 test cases, takes minutes.**

---

### 7. React Components — LOWER PRIORITY (add after unit tests are solid)

The components are mostly presentational, but some contain conditional logic worth testing:

| Component | Testable logic |
|---|---|
| `FAQSection` | WA vs ID license branching in FAQ answers. Correct city name interpolation. Renders 5 FAQ items. |
| `CTASection` | Default heading when no props are passed. Custom heading with `cityName`. Custom `title` overrides `cityName`. Phone `tel:` link uses correct format. |
| `Header` | Renders all 7 navigation links. Phone link and "Book Online" link are present. |
| `Footer` | Renders all services. Renders high-priority cities. Shows correct business hours and license numbers. |
| `SchemaMarkup` | Renders a `<script type="application/ld+json">` tag with valid JSON. |

**These require `@testing-library/react` and a jsdom environment.**

---

### 8. Data Integrity Tests — MEDIUM PRIORITY

The city and service config files are the backbone of the entire site. A typo or missing field can break pages silently.

| What to test |
|---|
| Every city has a non-empty `slug`, `name`, `state`, `stateAbbr`, `county`, `localContent`. |
| Every city's `stateAbbr` is either `"WA"` or `"ID"`. |
| Every city has at least one ZIP code. |
| Every city has valid `lat`/`lng` coordinates (within reasonable bounds for WA/ID). |
| Every `nearbyCity` slug actually resolves to an existing city. |
| Every city slug is unique (no duplicates). |
| Every service has a non-empty `slug`, `name`, `description`, and at least one `keyword`. |
| Every service slug is unique. |
| Priority values are only `"high"`, `"medium"`, or `"low"`. |

**These are high-value regression tests. If someone adds a new city with a typo in `nearbyCity`, these tests catch it immediately.**

---

## Suggested File Structure

```
src/
├── __tests__/
│   ├── lib/
│   │   ├── utils.test.ts
│   │   └── schema.test.ts
│   ├── config/
│   │   ├── cities.test.ts
│   │   ├── services.test.ts
│   │   └── data-integrity.test.ts
│   ├── app/
│   │   ├── sitemap.test.ts
│   │   ├── robots.test.ts
│   │   └── api/
│   │       └── revalidate.test.ts
│   └── components/
│       ├── FAQSection.test.tsx
│       ├── CTASection.test.tsx
│       ├── Header.test.tsx
│       ├── Footer.test.tsx
│       └── SchemaMarkup.test.tsx
```

---

## Implementation Order

| Phase | Area | Effort | Impact |
|---|---|---|---|
| **Phase 1** | `utils.ts` + `cities.ts`/`services.ts` helpers + data integrity | Low | High |
| **Phase 2** | `schema.ts` generators + `robots.ts` | Low | High |
| **Phase 3** | `sitemap.ts` + `revalidate/route.ts` (require mocking) | Medium | Medium |
| **Phase 4** | React component rendering tests | Medium | Lower |

Phase 1 alone would give meaningful coverage of the most critical business logic with minimal setup.

---

## Summary

| Category | Files | Estimated Test Cases | Priority |
|---|---|---|---|
| Utility functions | `utils.ts` | ~15 | High |
| Config helpers | `cities.ts`, `services.ts` | ~20 | High |
| Schema generators | `schema.ts` | ~25 | High |
| Data integrity | `cities.ts`, `services.ts` | ~15 | Medium |
| Sitemap | `sitemap.ts` | ~8 | Medium |
| API route | `revalidate/route.ts` | ~5 | Medium |
| Robots | `robots.ts` | ~3 | Low |
| Components | 5 component files | ~20 | Lower |
| **Total** | | **~111** | |
