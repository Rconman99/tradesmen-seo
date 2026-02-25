import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { cities, getCitiesByPriority } from "@/config/cities";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: `${business.shortName} | ${business.tagline} in Eastern WA & Northern ID`,
  description: business.description,
};

export default function HomePage() {
  const highPriorityCities = getCitiesByPriority("high");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-950 text-white pt-16 pb-24 md:pt-24 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-20 w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-[80px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-300 text-sm">
                Now booking projects across Eastern WA &amp; Northern ID
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.9] tracking-tight mb-6">
              Precision{" "}
              <span className="text-orange-500">Concrete Cutting</span>
              <br />
              <span className="text-gray-500">Done Right.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              {business.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href={`tel:${business.phoneTel}`}
                className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/25 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {business.phone}
              </a>
              <Link
                href="/contact"
                className="bg-white/5 backdrop-blur border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-white/10 transition-all"
              >
                Get a Free Quote
              </Link>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {[
                { value: `${business.stats.yearsExperience}+`, label: "Years" },
                {
                  value: `${business.stats.projectsCompleted.toLocaleString()}+`,
                  label: "Projects",
                },
                {
                  value: `${business.stats.reviewAverage}`,
                  label: `★ (${business.stats.reviewCount} reviews)`,
                },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-black text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagonal cut */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-br from-transparent via-transparent to-white" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">
              What We Do
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Our Services
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-600/5 transition-all"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:bg-orange-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 text-orange-600 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 concrete-bg" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-2">
              Why Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Built on Trust
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: "Licensed & Insured",
                desc: `WA #${business.licenses.wa} \u00B7 ID #${business.licenses.id}`,
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Free Estimates",
                desc: "No surprises. No hidden fees. Ever.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L12 4.37m-5.68 5.7h11.36M4.26 19.67A10 10 0 1119.74 4.33 10 10 0 014.26 19.67z" />
                  </svg>
                ),
                title: `${business.stats.yearsExperience}+ Years`,
                desc: `Serving the region since ${business.founded}.`,
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
                title: `${business.stats.reviewAverage} ★ Rating`,
                desc: `${business.stats.reviewCount}+ verified customer reviews.`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur border border-white/5 rounded-2xl p-6 hover:border-orange-500/20 transition-colors"
              >
                <div className="text-orange-500 mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Coverage Area
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Serving {cities.length}+ Communities
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From Spokane to the Tri-Cities, Coeur d&apos;Alene to Yakima \u2014 we cover
              Eastern Washington and Northern Idaho.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {highPriorityCities.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-600/5 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold group-hover:text-orange-600 transition-colors">
                    {city.name}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {city.stateAbbr}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {city.zip.slice(0, 3).join(", ")}
                  {city.zip.length > 3 ? ` +${city.zip.length - 3} more` : ""}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/areas"
              className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              View all {cities.length} service areas
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
