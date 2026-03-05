import { defineQuery } from "next-sanity";

// ── Blog Posts ──────────────────────────────────────────────

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category->{title, slug},
    author->{_id, name, slug, bio, image}
  }
`);

export const POSTS_PAGINATED_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) [$start..$end] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category->{title, slug},
    author->{_id, name, slug, bio, image}
  }
`);

export const POSTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "post"])
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seoTitle,
    seoDescription,
    excerpt,
    featuredImage,
    body,
    publishedAt,
    category->{title, slug},
    author->{_id, name, slug, bio, image},
    relatedServices,
    relatedCities
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)][].slug.current
`);

export const RECENT_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) [0..2] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category->{title, slug}
  }
`);

export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && slug.current != $slug && category._ref == $categoryId] | order(publishedAt desc) [0..2] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category->{title, slug}
  }
`);

export const POSTS_RSS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) [0..49] {
    title,
    slug,
    excerpt,
    publishedAt
  }
`);

// ── Testimonials ────────────────────────────────────────────

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(date desc) {
    _id,
    name,
    location,
    rating,
    text,
    projectType,
    date,
    featured
  }
`);

export const FEATURED_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && featured == true] | order(date desc) [0..5] {
    _id,
    name,
    location,
    rating,
    text,
    projectType
  }
`);

// ── Gallery ─────────────────────────────────────────────────

export const GALLERY_QUERY = defineQuery(`
  *[_type == "galleryImage"] | order(date desc) {
    _id,
    image,
    alt,
    caption,
    city,
    service,
    date
  }
`);

export const GALLERY_BY_CITY_QUERY = defineQuery(`
  *[_type == "galleryImage" && city == $city] | order(date desc) {
    _id,
    image,
    alt,
    caption,
    service,
    date
  }
`);

// ── Announcements ───────────────────────────────────────────

export const ANNOUNCEMENTS_QUERY = defineQuery(`
  *[_type == "announcement" && active == true] | order(date desc) [0..2] {
    _id,
    title,
    body,
    date
  }
`);
