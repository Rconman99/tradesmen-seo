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
      <section className="bg-slate-900 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {business.tagline} in{" "}
              <span className="text-amber-400">
                Eastern Washington &amp; Northern Idaho
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {business.description}
            </p>
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
                Get a Free Quote
              </Link>
            </div>
            <div className="flex gap-8 mt-8 text-sm text-slate-400">
              <span>
                <strong className="text-white">
                  {business.stats.yearsExperience}+
                </strong>{" "}
                Years Experience
              </span>
              <span>
                <strong className="text-white">
                  {business.stats.projectsCompleted.toLocaleString()}+
                </strong>{" "}
                Projects
              </span>
              <span>
                <strong className="text-white">
                  {business.stats.reviewAverage}
                </strong>{" "}
                ★ Rating
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Services
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            From precision cutting to complete removal, we handle every concrete
            project with expertise and professional equipment.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-amber-300 transition-all group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-600 text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose {business.shortName}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Licensed & Insured",
                desc: `Fully licensed in Washington (${business.licenses.wa}) and Idaho (${business.licenses.id}). Insured for your protection.`,
              },
              {
                title: "Free Estimates",
                desc: "We provide free on-site estimates for every project. No surprises, no hidden fees.",
              },
              {
                title: `${business.stats.yearsExperience}+ Years Experience`,
                desc: `Serving Eastern Washington and Northern Idaho since ${business.founded}. We know the region.`,
              },
              {
                title: `${business.stats.reviewAverage} ★ Reviews`,
                desc: `${business.stats.reviewCount}+ verified reviews from satisfied customers across our service area.`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Serving {cities.length}+ Communities
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            We provide {business.category.toLowerCase()} services throughout
            Eastern Washington and Northern Idaho.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {highPriorityCities.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="bg-slate-50 rounded-lg p-4 hover:bg-amber-50 hover:border-amber-300 border border-transparent transition-all"
              >
                <span className="font-semibold">{city.name}</span>
                <span className="text-slate-500">, {city.stateAbbr}</span>
                <p className="text-xs text-slate-400 mt-1">
                  {city.zip.join(", ")}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/areas"
              className="text-amber-600 font-semibold hover:text-amber-700"
            >
              View all {cities.length} service areas →
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
