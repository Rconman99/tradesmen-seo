import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/react";

export interface SanityAuthor {
  _id: string;
  name: string | null;
  slug: { current: string } | null;
  bio: string | null;
  image: SanityImageSource | null;
}

export interface SanityPost {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  seoTitle: string | null;
  seoDescription: string | null;
  excerpt: string | null;
  featuredImage: SanityImageSource | null;
  body: PortableTextBlock[] | null;
  publishedAt: string | null;
  category: { title: string; slug: { current: string } } | null;
  author: SanityAuthor | null;
  relatedServices: string[] | null;
  relatedCities: string[] | null;
}

export interface SanityTestimonial {
  _id: string;
  name: string | null;
  location: string | null;
  rating: number | null;
  text: string | null;
  projectType: string | null;
  date: string | null;
  featured: boolean | null;
}

export interface SanityGalleryImage {
  _id: string;
  image: SanityImageSource | null;
  alt: string | null;
  caption: string | null;
  city: string | null;
  service: string | null;
  date: string | null;
}

export interface SanityAnnouncement {
  _id: string;
  title: string | null;
  body: string | null;
  date: string | null;
}
