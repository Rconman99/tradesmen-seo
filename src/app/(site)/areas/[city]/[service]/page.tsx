import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { services, getServiceBySlug } from "@/config/services";
import { cities, getCityBySlug, getNearbyCities } from "@/config/cities";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  generateCityServiceDetailSchema,
  generateCityServiceFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

export function generateStaticParams() {
  return cities.flatMap((city) =>
    services.map((service) => ({
      city: city.slug,
      service: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) return {};

  const title = `${service.name} in ${city.name}, ${city.stateAbbr}`;
  const description = `Professional ${service.name.toLowerCase()} in ${city.name}, ${city.stateAbbr}. ${service.description} Licensed & insured. Call ${business.phone} for a free estimate.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  const nearbyCities = getNearbyCities(city);
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const faqSchema = generateCityServiceFAQSchema(city, service);
  const faqQuestions = faqSchema.mainEntity;

  return (
    <>
      <SchemaMarkup schema={generateCityServiceDetailSchema(city, service)} />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/areas" },
          { name: `${city.name}, ${city.stateAbbr}`, url: `/areas/${city.slug}` },
          { name: service.name, url: `/areas/${city.slug}/${service.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 md:pt-16 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/areas" className="hover:text-white transition-colors">
              Service Areas
            </Link>
            <span className="text-gray-600">/</span>
            <Link
              href={`/areas/${city.slug}`}
              className="hover:text-white transition-colors"
            >
              {city.name}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{service.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center text-4xl mb-6 backdrop-blur-sm border border-blue-500/20">
              {service.icon}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
              {service.name} in
              <br />
              <span className="text-gradient">
                {city.name}, {city.stateAbbr}
              </span>
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              {service.description} Serving {city.name} and{" "}
              {city.county} County since {business.founded}.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 hover:scale-105"
              >
                Get Free Estimate
              </Link>
              <a
                href={`tel:${business.phoneTel}`}
                className="bg-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
                {service.name} Capabilities
              </p>
              <h2 className="text-3xl font-black mb-2">
                What We Offer in {city.name}
              </h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />

              <ul className="space-y-4">
                {service.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Why Choose Us */}
              <div className="mt-16">
                <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
                  Why Us
                </p>
                <h2 className="text-3xl font-black mb-2">
                  Why Choose Us for {service.name} in {city.name}?
                </h2>
                <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                  <p>
                    With {business.stats.yearsExperience}+ years of experience
                    and{" "}
                    {business.stats.projectsCompleted.toLocaleString()}+
                    completed projects, {business.shortName} is the trusted
                    choice for {service.name.toLowerCase()} in {city.name},{" "}
                    {city.stateAbbr}.
                  </p>
                  <p>{city.localContent}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg sticky top-32">
                <h3 className="font-bold text-lg mb-5">
                  {service.shortName} in {city.name}
                </h3>
                <ul className="space-y-4 text-sm">
                  {[
                    {
                      label: "Service",
                      value: service.shortName,
                    },
                    {
                      label: "Location",
                      value: `${city.name}, ${city.stateAbbr}`,
                    },
                    {
                      label: "Experience",
                      value: `${business.stats.yearsExperience}+ years`,
                    },
                    { label: "Rating", value: `${business.stats.reviewAverage} ★` },
                    {
                      label: `${city.stateAbbr} License`,
                      value:
                        city.stateAbbr === "UT"
                          ? business.licenses.ut
                          : business.licenses.tx,
                    },
                  ].map((row) => (
                    <li
                      key={row.label}
                      className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <span className="text-gray-400">{row.label}</span>
                      <span className="font-bold text-gray-900">
                        {row.value}
                      </span>
                    </li>
                  ))}
                  <li className="flex justify-between items-center">
                    <span className="text-gray-400">Estimates</span>
                    <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">
                      FREE
                    </span>
                  </li>
                </ul>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="block w-full bg-orange-500 text-white text-center px-6 py-4 rounded-full font-bold mt-6 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 text-lg"
                >
                  Call {business.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="hero-concrete py-16 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: `${city.stateAbbr} Licensed`, label: "Licensed & Insured" },
              { value: `${business.stats.yearsExperience}+ Yrs`, label: "Experience" },
              { value: `${business.stats.reviewAverage} ★`, label: `${business.stats.reviewCount}+ Reviews` },
              { value: "Free", label: "Estimates Always" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl md:text-3xl font-black text-blue-400">
                  {item.value}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-semibold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
            Common Questions
          </p>
          <h2 className="text-3xl font-black mb-2">
            {service.name} FAQ — {city.name}, {city.stateAbbr}
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />

          <div className="space-y-4">
            {faqQuestions.map((faq) => (
              <details
                key={faq.name}
                className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-gray-900 list-none">
                  {faq.name}
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby cities — same service */}
      {nearbyCities.length > 0 && (
        <section className="py-20 concrete-texture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
              Nearby
            </p>
            <h2 className="text-3xl font-black mb-2">
              {service.name} in Nearby Cities
            </h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {nearbyCities.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/areas/${nearby.slug}/${service.slug}`}
                  className="group bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-blue-600 hover:shadow-lg transition-all"
                >
                  <span className="font-bold group-hover:text-blue-600 transition-colors">
                    {service.shortName} in {nearby.name}
                  </span>
                  <span className="text-gray-400">, {nearby.stateAbbr}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other services in this city */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
            More Services
          </p>
          <h2 className="text-3xl font-black mb-2">
            Other Services in {city.name}
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/areas/${city.slug}/${s.slug}`}
                className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-600 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <span className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                  {s.name}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  Available in {city.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection cityName={city.name} />
    </>
  );
}
