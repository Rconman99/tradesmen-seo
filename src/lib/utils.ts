import { business } from "@/config/business";

export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function generateMetaTitle(
  page: string,
  city?: string,
  state?: string
): string {
  if (city && state) {
    return `${page} in ${city}, ${state} | ${business.shortName}`;
  }
  return `${page} | ${business.shortName}`;
}

export function generateMetaDescription(
  service: string,
  city?: string,
  state?: string
): string {
  if (city && state) {
    return `Professional ${service.toLowerCase()} in ${city}, ${state}. Licensed & insured. Free estimates. Serving ${city} and surrounding areas. Call ${business.phone} today!`;
  }
  return `Professional ${service.toLowerCase()} services. Licensed & insured. Free estimates. Call ${business.phone} today!`;
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
