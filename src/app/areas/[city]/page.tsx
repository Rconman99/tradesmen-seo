import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { cities, getCityBySlug, getNearbyCities } from "@/config/cities";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import {
  generateCityServiceSchema,
  generateCityFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

// Pre-render all city pages at build time
export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const title = `${business.category} in ${city.name}, ${city.stateAbbr}`;
  const description = `Professional ${business.category.toLowerCase()} in ${city.name}, ${city.stateAbbr}. Licensed & insured. Free estimates. Serving ${city.name} and surrounding ${city.county} County areas. Call ${business.phone} today!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const nearbyCities = getNearbyCities(city);
  const serviceName = business.category;

  return (
    <>
      <SchemaMarkup schema={generateCityServiceSchema(city)} />
      <SchemaMarkup schema={generateCityFAQSchema(city)} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/areas" },
          {
            name: `${city.name}, ${city.stateAbbr}`,
            url: `/areas/${city.slug}`,
          },
        ])}
      />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-amber-400 font-semibold mb-2">
              {city.county} County, {city.state}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {serviceName} in {city.name}, {city.stateAbbr}
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              Trusted {serviceName.toLowerCase()} for {city.name} homeowners and
              businesses. Licensed, insured, and serving {city.county} County
              since {business.founded}.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-amber-400 text-lg">
                {"★".repeat(5)}
              </div>
              <span className="text-slate-300">
                Rated {business.stats.reviewAverage} from{" "}
                {business.stats.reviewCount} reviews
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${business.phoneTel}`}
                className="bg-amber-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg text-center hover:bg-amber-400 transition-colors"
              >
                Call {business.phone}
              </a>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg text-center hover:bg-white hover:text-slate-900 transition-colors"
              >
                Get a Free Quote in {city.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services in this city */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">
            Our Services in {city.name}, {city.stateAbbr}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-amber-300 transition-all group"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-amber-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-600">{service.shortName} services available in {city.name}.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local content — THE SEO MONEY SECTION */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6">
                Why {city.name} Chooses {business.shortName}
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg">{city.localContent}</p>
                <p>
                  Whether you need {services.map((s) => s.name.toLowerCase()).join(", ")},
                  our experienced team delivers quality results on every project
                  in {city.name} and surrounding {city.county} County areas.
                </p>
              </div>

              {/* Neighborhoods */}
              {city.neighborhoods && city.neighborhoods.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">
                    Neighborhoods We Serve in {city.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods.map((n) => (
                      <span
                        key={n}
                        className="bg-white px-3 py-1 rounded-full text-sm border border-slate-200"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">
                  {city.name} Quick Info
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-slate-500">Zip Code(s)</span>
                    <span className="font-semibold">
                      {city.zip.join(", ")}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">County</span>
                    <span className="font-semibold">{city.county}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">State</span>
                    <span className="font-semibold">{city.state}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">
                      {city.stateAbbr} License
                    </span>
                    <span className="font-semibold">
                      {city.stateAbbr === "WA"
                        ? business.licenses.wa
                        : business.licenses.id}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">Estimates</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </li>
                </ul>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="block w-full bg-amber-500 text-slate-900 text-center px-6 py-3 rounded-lg font-bold mt-6 hover:bg-amber-400 transition-colors"
                >
                  Call {business.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Licensed & Insured",
                value: `${city.stateAbbr === "WA" ? "WA" : "ID"} Licensed`,
              },
              {
                label: "Experience",
                value: `${business.stats.yearsExperience}+ Years`,
              },
              {
                label: "Reviews",
                value: `${business.stats.reviewAverage} ★ (${business.stats.reviewCount}+)`,
              },
              { label: "Estimates", value: "Always Free" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-slate-50 rounded-lg p-6 text-center"
              >
                <div className="text-2xl font-bold text-amber-600">
                  {item.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map embed */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">
            Our Service Area in {city.name}
          </h2>
          <div className="bg-slate-200 rounded-xl overflow-hidden h-64 md:h-96 flex items-center justify-center">
            {/* Replace with actual Google Maps embed in production */}
            <div className="text-center text-slate-500">
              <p className="text-lg font-semibold">
                Google Map — {city.name}, {city.stateAbbr}
              </p>
              <p className="text-sm mt-1">
                Embed your Google Maps iframe here
              </p>
              <p className="text-xs mt-2 font-mono">
                Lat: {city.lat}, Lng: {city.lng}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection city={city} />

      {/* Nearby cities — critical for internal linking */}
      {nearbyCities.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">
              Also Serving Near {city.name}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nearbyCities.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/areas/${nearby.slug}`}
                  className="bg-slate-50 rounded-lg p-4 hover:bg-amber-50 hover:shadow-sm transition-all"
                >
                  <span className="font-semibold">{nearby.name}</span>
                  <span className="text-slate-500">
                    , {nearby.stateAbbr}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    {business.category} services available
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection cityName={city.name} />
    </>
  );
}
