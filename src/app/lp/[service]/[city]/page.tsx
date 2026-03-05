import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { business } from "@/config/business";
import { services, getServiceBySlug } from "@/config/services";
import { cities } from "@/config/cities";
import { LeadForm } from "@/components/LeadForm";

interface PageProps {
  params: Promise<{ service: string; city: string }>;
}

export function generateStaticParams() {
  return cities.flatMap((city) =>
    services.map((service) => ({
      service: service.slug,
      city: city.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = cities.find((c) => c.slug === citySlug);
  if (!service || !city) return {};

  return {
    title: `${service.name} in ${city.name} | Free Estimate`,
    description: `Get a free estimate for ${service.name.toLowerCase()} in ${city.name}, ${city.stateAbbr}. ${business.stats.reviewAverage}★ rated, ${business.stats.projectsCompleted.toLocaleString()}+ projects. Licensed & insured. Call ${business.phone}.`,
    robots: { index: false, follow: false },
  };
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span className="text-yellow-400 text-2xl" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      {hasHalf && "½"}
      {"☆".repeat(5 - full - (hasHalf ? 1 : 0))}
    </span>
  );
}

export default async function LandingPage({ params }: PageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = cities.find((c) => c.slug === citySlug);

  if (!service || !city) notFound();

  const license =
    city.stateAbbr === "UT" ? business.licenses.ut : business.licenses.tx;
  const yearsInBusiness =
    new Date().getFullYear() - business.founded;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Above the Fold ────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Stars rating={business.stats.reviewAverage} />
            <span className="text-sm text-slate-300">
              {business.stats.reviewAverage} / 5 ({business.stats.reviewCount} reviews)
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            {service.name} in{" "}
            <span className="text-gradient">{city.name}, {city.stateAbbr}</span>
          </h1>

          <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
            {service.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${business.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand-orange)] px-8 py-4 text-lg font-bold text-white shadow-lg hover:brightness-110 transition glow-orange"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call {business.phone}
            </a>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-blue)] px-8 py-4 text-lg font-bold text-white shadow-lg hover:brightness-110 transition"
            >
              Get Your Free Inspection
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust Signals ─────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 px-4 py-8">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-black text-[var(--brand-blue)]">
              {yearsInBusiness}+
            </p>
            <p className="text-sm text-slate-600 font-medium">Years Experience</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-[var(--brand-blue)]">
              {business.stats.projectsCompleted.toLocaleString()}+
            </p>
            <p className="text-sm text-slate-600 font-medium">Projects Done</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-[var(--brand-orange)]">
              {business.stats.reviewAverage}★
            </p>
            <p className="text-sm text-slate-600 font-medium">
              {business.stats.reviewCount} Reviews
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-green-600">✓</p>
            <p className="text-sm text-slate-600 font-medium">Licensed & Insured</p>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">
          {city.stateAbbr} License #{license}
        </p>
      </section>

      {/* ── Service Details ───────────────────────── */}
      <section className="px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            What&apos;s Included
          </h2>
          <ul className="space-y-3">
            {service.details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <svg className="h-5 w-5 mt-0.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-700">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Lead Capture Form ─────────────────────── */}
      <section id="lead-form" className="bg-slate-50 px-4 py-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            Get Your Free Inspection
          </h2>
          <p className="text-slate-600 text-center mb-6">
            Fill out the form below and we&apos;ll call you to schedule.
          </p>
          <Suspense fallback={<div className="h-96 animate-pulse bg-slate-200 rounded-2xl" />}>
            <LeadForm service={serviceSlug} city={citySlug} />
          </Suspense>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────── */}
      <section className="bg-slate-900 text-white px-4 py-10 text-center">
        <p className="text-lg font-semibold mb-4">
          Prefer to talk now? Call us directly.
        </p>
        <a
          href={`tel:${business.phoneTel}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand-orange)] px-8 py-4 text-lg font-bold text-white shadow-lg hover:brightness-110 transition glow-orange"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {business.phone}
        </a>
        <p className="text-xs text-slate-400 mt-6">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </section>
    </div>
  );
}
