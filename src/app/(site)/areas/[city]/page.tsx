import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { cities, getCityBySlug, getNearbyCities } from "@/config/cities";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateCityServiceSchema, generateCityFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const title = `${business.category} in ${city.name}, ${city.stateAbbr}`;
  const description = `Professional ${business.category.toLowerCase()} in ${city.name}, ${city.stateAbbr}. Licensed & insured. Free estimates. Call ${business.phone} today!`;
  return { title, description, openGraph: { title, description, type: "website" } };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  const nearbyCities = getNearbyCities(city);

  return (
    <>
      <SchemaMarkup schema={generateCityServiceSchema(city)} />
      <SchemaMarkup schema={generateCityFAQSchema(city)} />
      <SchemaMarkup schema={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Service Areas", url: "/areas" },
        { name: `${city.name}, ${city.stateAbbr}`, url: `/areas/${city.slug}` },
      ])} />

      {/* Hero */}
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 md:pt-16 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <Link href="/areas" className="hover:text-white transition-colors">Service Areas</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{city.name}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
              {city.county} County, {city.stateAbbr}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
              {business.category} in
              <br />
              <span className="text-gradient">{city.name}, {city.stateAbbr}</span>
            </h1>

            <p className="text-lg text-gray-300 mb-6 max-w-xl leading-relaxed">
              Excavation and concrete for {city.name} homeowners and builders —
              one crew handles the dirt work and the pour. Registered, bonded,
              and insured in Washington, with free on-site estimates.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <span className="bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
                🤝 Excavation + Concrete · One Crew
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 hover:scale-105">
                Book Online
              </Link>
              <a href={`tel:${business.phoneTel}`} className="bg-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 hover:scale-105">
                Request a Bid
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Available Services</p>
          <h2 className="text-3xl font-black mb-2">What We Do in {city.name}</h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <Link key={service.slug} href={`/areas/${city.slug}/${service.slug}`}
                className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-600 transition-all hover:shadow-xl hover:-translate-y-0.5">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                <p className="text-sm text-gray-500">Available in {city.name} and surrounding areas.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local content */}
      <section className="py-20 concrete-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Local Expertise</p>
              <h2 className="text-3xl font-black mb-2">Why {city.name} Trusts Us</h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{city.localContent}</p>
              <p className="text-gray-600 leading-relaxed">
                Whether you need {services.map((s) => s.name.toLowerCase()).join(", ")},
                our team delivers quality results on every project in {city.name} and {city.county} County.
              </p>

              {city.neighborhoods && city.neighborhoods.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-bold mb-4">Neighborhoods We Serve</h3>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods.map((n) => (
                      <span key={n} className="bg-white px-4 py-2 rounded-full text-sm font-medium border-2 border-gray-100 text-gray-700">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside>
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg sticky top-32">
                <h3 className="font-bold text-lg mb-5">{city.name} Info</h3>
                <ul className="space-y-4 text-sm">
                  {[
                    { label: "Zip Code(s)", value: city.zip.join(", ") },
                    { label: "County", value: `${city.county} County` },
                    { label: "State", value: city.state },
                    { label: "Licensed", value: "WA · Bonded · Insured" },
                  ].map((row) => (
                    <li key={row.label} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <span className="text-gray-400">{row.label}</span>
                      <span className="font-bold text-gray-900">{row.value}</span>
                    </li>
                  ))}
                  <li className="flex justify-between items-center">
                    <span className="text-gray-400">Estimates</span>
                    <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">FREE</span>
                  </li>
                </ul>
                <a href={`tel:${business.phoneTel}`}
                  className="block w-full bg-orange-500 text-white text-center px-6 py-4 rounded-full font-bold mt-6 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 text-lg">
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
              { value: "WA Licensed", label: "Bonded & Insured" },
              { value: "2-in-1", label: "Excavation + Concrete" },
              { value: `${city.county}`, label: "County Served" },
              { value: "Free", label: "Estimates Always" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl md:text-3xl font-black text-blue-400">{item.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-semibold">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-4">Service Area</h2>
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-64 md:h-80 flex items-center justify-center border-2 border-gray-200">
            <div className="text-center text-gray-400">
              <p className="font-semibold">{city.name}, {city.stateAbbr}</p>
              <p className="text-sm mt-1">Google Maps embed goes here</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection city={city} />

      {nearbyCities.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Nearby</p>
            <h2 className="text-3xl font-black mb-2">Also Serving Near {city.name}</h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {nearbyCities.map((nearby) => (
                <Link key={nearby.slug} href={`/areas/${nearby.slug}`}
                  className="group bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-blue-600 hover:shadow-lg transition-all">
                  <span className="font-bold group-hover:text-blue-600 transition-colors">{nearby.name}</span>
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
