import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { cities, getCitiesByPriority } from "@/config/cities";
import { CTASection } from "@/components/CTASection";
import { sanityFetch } from "@/sanity/lib/client";
import { FEATURED_TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import type { SanityTestimonial } from "@/sanity/types";

export const metadata: Metadata = {
  title: `Utah & Texas Roofing Contractor | ${business.shortName} — Free Estimates`,
  description: `${business.shortName} provides expert roofing, storm damage repair, and maintenance across Utah & Texas. ${business.stats.reviewAverage}-star rated, ${business.stats.projectsCompleted.toLocaleString()}+ projects completed. Call ${business.phone} for a free inspection.`,
};

export default async function HomePage() {
  const highPriorityCities = getCitiesByPriority("high");
  const featuredTestimonials = await sanityFetch<SanityTestimonial[]>({
    query: FEATURED_TESTIMONIALS_QUERY,
    tags: ["testimonial"],
  });

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero-concrete diagonal-cut relative text-white pt-20 pb-36 md:pt-28 md:pb-48 overflow-hidden">
        {/* Decorative saw blade */}
        <div className="absolute -right-32 -top-32 w-96 h-96 opacity-[0.04]">
          <svg viewBox="0 0 200 200" className="w-full h-full spin-slow">
            <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 6" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="100" cy="100" r="20" fill="white" fillOpacity="0.3" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="20"
                x2="100"
                y2="0"
                stroke="white"
                strokeWidth="3"
                transform={`rotate(${i * 15} 100 100)`}
              />
            ))}
          </svg>
        </div>

        {/* Blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Logo featured in hero */}
            <Image
              src="/logo.webp"
              alt={`${business.name} logo`}
              width={500}
              height={180}
              className="h-28 sm:h-36 md:h-44 w-auto mb-8"
              priority
            />

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.85] tracking-tight mb-8">
              Protect Your
              <br />
              <span className="text-gradient">Roof.</span>
              <br />
              Protect Your Home.
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-xl leading-relaxed font-light">
              Licensed roofing, storm damage repair, and maintenance across Utah &amp;
              Texas &mdash; backed by {business.stats.projectsCompleted.toLocaleString()}+ completed projects.
            </p>

            {/* Trust signals */}
            <div className="flex items-center gap-3 mb-10 text-sm text-gray-400">
              <div className="flex text-orange-400">{"★★★★★"}</div>
              <span>{business.stats.reviewAverage}/5 from {business.stats.reviewCount}+ verified reviews</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105"
              >
                Get Your Free Estimate
              </Link>
              <a
                href={`tel:${business.phoneTel}`}
                className="bg-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
              >
                Call Now &mdash; {business.phone}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg">
              {[
                { value: `${business.stats.yearsExperience}+`, label: "Years Experience" },
                { value: `${(business.stats.projectsCompleted / 1000).toFixed(1)}K+`, label: "Projects Done" },
                { value: `${business.stats.reviewAverage}`, label: "Star Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== SERVICES ====== */}
      <section className="py-20 md:py-28 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Our Services
            </h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-blue-600 transition-all hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-600/30">
                  <span className="group-hover:scale-110 transition-transform">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="absolute bottom-8 right-8 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-blue-600">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US ====== */}
      <section className="hero-concrete diagonal-cut py-24 md:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Built Different
            </h2>
            <div className="w-16 h-1 bg-orange-500 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🛡️",
                title: "Licensed & Insured",
                desc: `UT #${business.licenses.ut} · TX #${business.licenses.tx}. Fully bonded and insured for your protection.`,
                color: "blue",
              },
              {
                icon: "💰",
                title: "Free Estimates",
                desc: "No surprises, no hidden fees. We quote it right the first time, every time.",
                color: "green",
              },
              {
                icon: "⚡",
                title: `${business.stats.yearsExperience}+ Years`,
                desc: `Trusted since ${business.founded}. Thousands of projects completed across the region.`,
                color: "orange",
              },
              {
                icon: "⭐",
                title: `${business.stats.reviewAverage} Star Rating`,
                desc: `${business.stats.reviewCount}+ verified reviews from real customers. Results speak for themselves.`,
                color: "yellow",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURED TESTIMONIALS ====== */}
      {featuredTestimonials.length > 0 && (
        <section className="py-20 md:py-28 -mt-10 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
                What Our Clients Say
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Customer Reviews
              </h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTestimonials.map((t) => (
                <div
                  key={t._id}
                  className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div className="flex text-orange-400 mb-4">
                    {"★".repeat(t.rating || 5)}
                    {"☆".repeat(5 - (t.rating || 5))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.name?.[0] || "?"}
                    </div>
                    <div>
                      <span className="font-bold text-sm">{t.name}</span>
                      {t.location && (
                        <span className="text-gray-400 text-sm ml-2">
                          {t.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
              >
                See All Reviews
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ====== SERVICE AREAS ====== */}
      <section className="py-20 md:py-28 -mt-10 relative z-10 concrete-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
              Our Coverage
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Serving {cities.length}+ Communities
            </h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              From Heber City to Salt Lake City, Park City to Frisco &mdash;
              we cover Utah and Texas.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {highPriorityCities.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-600 transition-all hover:shadow-xl hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/5 rounded-bl-[40px] group-hover:bg-blue-600/10 transition-colors" />
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {city.county} County, {city.stateAbbr}
                    </p>
                  </div>
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {city.stateAbbr}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  ZIP: {city.zip.slice(0, 3).join(", ")}
                  {city.zip.length > 3 && ` +${city.zip.length - 3}`}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/areas"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-105"
            >
              View All {cities.length} Service Areas
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
