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
    openGraph: { title, description, type: "website" },
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
          { name: `${city.name}, ${city.stateAbbr}`, url: `/areas/${city.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative bg-gray-950 text-white pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/areas" className="hover:text-gray-300 transition-colors">Service Areas</Link>
            <span>/</span>
            <span className="text-gray-300">{city.name}, {city.stateAbbr}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-600/10 border border-orange-600/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-orange-400 text-sm font-medium">
                {city.county} County, {city.state}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-[0.95]">
              {serviceName} in
              <br />
              <span className="text-orange-500">{city.name}, {city.stateAbbr}</span>
            </h1>

            <p className="text-lg text-gray-400 mb-6 max-w-xl leading-relaxed">
              Trusted {serviceName.toLowerCase()} for {city.name} homeowners and
              businesses. Licensed, insured, and serving {city.county} County
              since {business.founded}.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <div className="flex text-orange-400 text-lg tracking-wider">{"★★★★★"}</div>
              <span className="text-gray-400 text-sm">
                {business.stats.reviewAverage}/5 from {business.stats.reviewCount} reviews
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${business.phoneTel}`}
                className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/25"
              >
                Call {business.phone}
              </a>
              <Link
                href="/contact"
                className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-white/10 transition-all"
              >
                Free Quote in {city.name}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* Services grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">Available Services</p>
            <h2 className="text-3xl font-bold">
              What We Do in {city.name}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-600/5 transition-all"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-orange-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-orange-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500">Available in {city.name} and surrounding areas.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">Local Expertise</p>
              <h2 className="text-3xl font-bold mb-6">
                Why {city.name} Trusts {business.shortName}
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-lg leading-relaxed text-gray-600">{city.localContent}</p>
                <p className="text-gray-600">
                  Whether you need {services.map((s) => s.name.toLowerCase()).join(", ")},
                  our experienced team delivers quality results on every project
                  in {city.name} and surrounding {city.county} County areas.
                </p>
              </div>

              {city.neighborhoods && city.neighborhoods.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-bold mb-4">
                    Neighborhoods We Serve
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods.map((n) => (
                      <span
                        key={n}
                        className="bg-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-700"
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
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-28">
                <h3 className="font-bold text-lg mb-5">{city.name} Info</h3>
                <ul className="space-y-4 text-sm">
                  {[
                    { label: "Zip Code(s)", value: city.zip.join(", ") },
                    { label: "County", value: city.county },
                    { label: "State", value: city.state },
                    {
                      label: `${city.stateAbbr} License`,
                      value: city.stateAbbr === "WA" ? business.licenses.wa : business.licenses.id,
                    },
                  ].map((row) => (
                    <li key={row.label} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <span className="text-gray-400">{row.label}</span>
                      <span className="font-semibold text-gray-900">{row.value}</span>
                    </li>
                  ))}
                  <li className="flex justify-between items-center">
                    <span className="text-gray-400">Estimates</span>
                    <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">FREE</span>
                  </li>
                </ul>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="block w-full bg-orange-600 text-white text-center px-6 py-3.5 rounded-xl font-bold mt-6 hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20"
                >
                  Call {business.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: `${city.stateAbbr === "WA" ? "WA" : "ID"} Licensed`, label: "Licensed & Insured" },
              { value: `${business.stats.yearsExperience}+ Years`, label: "Experience" },
              { value: `${business.stats.reviewAverage} ★`, label: `${business.stats.reviewCount}+ Reviews` },
              { value: "Always Free", label: "Estimates" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-950 rounded-2xl p-6 text-center">
                <div className="text-xl font-black text-orange-500">{item.value}</div>
                <div className="text-sm text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-4">Service Area</h2>
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-64 md:h-80 flex items-center justify-center border border-gray-200">
            <div className="text-center text-gray-400">
              <p className="font-semibold">{city.name}, {city.stateAbbr}</p>
              <p className="text-sm mt-1">Google Maps embed goes here</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection city={city} />

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">Nearby</p>
            <h2 className="text-3xl font-bold mb-8">Also Serving Near {city.name}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {nearbyCities.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/areas/${nearby.slug}`}
                  className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-600/5 transition-all"
                >
                  <span className="font-bold group-hover:text-orange-600 transition-colors">
                    {nearby.name}
                  </span>
                  <span className="text-gray-400">, {nearby.stateAbbr}</span>
                  <p className="text-xs text-gray-400 mt-1">{business.category} available</p>
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
