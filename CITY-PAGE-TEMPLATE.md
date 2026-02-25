# City Landing Page Template
## Structure for Each Geo-Targeted Page

---

### URL Pattern
`/areas/[city-slug]-[state]/`
Example: `/areas/spokane-wa/`, `/areas/coeur-dalene-id/`

---

### Page Structure

```
┌─────────────────────────────────────────────┐
│ HERO SECTION                                │
│ H1: [Service] in [City], [State]            │
│ Subheadline: Trusted [service] for [City]   │
│ homeowners and businesses since [year]       │
│ [CTA Button: Get a Free Quote]              │
│ [Phone Number - Click to Call]              │
│ ★★★★★ "Rated 4.9 from 87 reviews"          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SERVICES IN [CITY]                          │
│ We provide the following services in [City]:│
│ • Service 1 — brief description             │
│ • Service 2 — brief description             │
│ • Service 3 — brief description             │
│ [Link to full service pages]                │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ LOCAL CONTENT (200-500 words UNIQUE)        │
│                                             │
│ Why [City] Residents Choose Us              │
│ - Reference local landmarks/neighborhoods   │
│ - Mention local building codes/requirements │
│ - Talk about common concrete issues in area │
│ - Reference local weather/climate factors   │
│ - Mention nearby areas also served          │
│                                             │
│ Example for Spokane:                        │
│ "Spokane's freeze-thaw cycles are tough on  │
│ concrete. From the South Hill to the North  │
│ Side, we've helped hundreds of Spokane      │
│ homeowners repair and cut concrete damaged  │
│ by our harsh winters..."                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ TRUST SIGNALS                               │
│ • Licensed & Insured in WA/ID              │
│ • [X] Years Experience                      │
│ • [X]+ Completed Projects in [City]        │
│ • WA License #: XXXXXXXX                    │
│ • ID License #: XXXXXXXX                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ LOCAL TESTIMONIAL                           │
│ "Great work on our driveway in [City]..."   │
│ — John D., [Neighborhood], [City]           │
│ ★★★★★                                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ EMBEDDED GOOGLE MAP                         │
│ [Map centered on City]                      │
│ Showing service radius                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ AREAS WE SERVE NEAR [CITY]                  │
│ Internal links to neighboring city pages:   │
│ • [Nearby City 1] | [Nearby City 2]        │
│ • [Nearby City 3] | [Nearby City 4]        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ FAQ SECTION (with FAQ Schema)               │
│ Q: How much does [service] cost in [City]?  │
│ Q: Do you serve [nearby area]?              │
│ Q: How long does a typical project take?    │
│ Q: Do you offer free estimates in [City]?   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ CTA SECTION                                 │
│ Ready for [service] in [City]?              │
│ Call [phone] or fill out our form.          │
│ [CTA Button: Get Your Free Quote]           │
└─────────────────────────────────────────────┘
```

---

### SEO Elements Per City Page

#### Title Tag (under 60 chars)
`[Service] in [City], [State] | [Brand Name]`
Example: `Concrete Cutting in Spokane, WA | Northwest Concrete Cutting`

#### Meta Description (under 160 chars)
`Professional [service] in [City], [State]. Licensed & insured. Free estimates. Serving [City] and surrounding areas. Call [phone] today!`

#### H1
`[Service] in [City], [State]`

#### H2s
- "Our [Service] Services in [City]"
- "Why [City] Chooses [Brand]"
- "Areas We Serve Near [City]"
- "Frequently Asked Questions"

#### Image Alt Text
- `[service] project completed in [city] [state]`
- `[brand] team working on [service] in [neighborhood] [city]`
- `before and after [service] in [city]`

---

### Schema Markup Per City Page

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Concrete Cutting in Spokane, WA",
  "serviceType": "Concrete Cutting",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Northwest Concrete Cutting LLC",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Spokane",
      "addressRegion": "WA",
      "postalCode": "99201"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "Spokane",
    "containedInPlace": {
      "@type": "State",
      "name": "Washington"
    }
  },
  "description": "Professional concrete cutting services in Spokane, WA. Flat sawing, core drilling, wall sawing, and concrete removal."
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does concrete cutting cost in Spokane?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Concrete cutting in Spokane typically costs $3-$8 per linear foot for flat sawing..."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer free estimates in Spokane?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We provide free on-site estimates for all concrete cutting projects in Spokane and surrounding areas."
      }
    }
  ]
}
```

---

### Content Differentiation Tips

To avoid Google's "thin content" penalty, each city page MUST be unique. Here's how:

1. **Local references**: Mention specific neighborhoods, streets, landmarks
2. **Local building codes**: Reference city-specific permit requirements
3. **Climate factors**: How local weather affects concrete (freeze-thaw, heat)
4. **Past projects**: Reference specific work done in that city
5. **Travel context**: "Located just 30 minutes from our base in [City]"
6. **Community ties**: Sponsor local events, member of local chamber
7. **Local statistics**: "Over 200 projects completed in [City] since 2015"
8. **Neighborhood coverage**: List specific neighborhoods/subdivisions served
