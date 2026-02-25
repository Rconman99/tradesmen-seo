import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { services, getServiceBySlug } from "@/config/services";
import { getCitiesByPriority } from "@/config/cities";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.name} Services`,
    description: `Professional ${service.name.toLowerCase()} services in Eastern Washington and Northern Idaho. ${service.description} Call ${business.phone} for a free estimate.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const highCities = getCitiesByPriority("high");
  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <>
      <SchemaMarkup schema={generateServiceSchema(service)} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: `/services/${service.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative bg-gray-950 text-white pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-10 right-20 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-gray-300 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-gray-300">{service.name}</span>
          </nav>

          <div className="w-16 h-16 bg-orange-600/20 rounded-2xl flex items-center justify-center text-4xl mb-6">
            {service.icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            {service.name}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed">
            {service.description}
          </p>
          <a
            href={`tel:${business.phoneTel}`}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/25"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Free Estimate \u2014 {business.phone}
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">Capabilities</p>
              <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
              <ul className="space-y-4">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-16">
                <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">Why Us</p>
                <h2 className="text-3xl font-bold mb-6">
                  Why Choose Us for {service.name}?
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    With {business.stats.yearsExperience}+ years of experience
                    and {business.stats.projectsCompleted.toLocaleString()}+
                    completed projects, {business.shortName} is the trusted
                    choice for {service.name.toLowerCase()} in Eastern Washington
                    and Northern Idaho.
                  </p>
                  <p>
                    We use professional-grade diamond equipment for clean, precise
                    results on every project. Our team is fully licensed and insured,
                    and we provide free on-site estimates so you know exactly what to
                    expect before work begins.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-gray-950 rounded-2xl p-6 sticky top-28 text-white">
                <h3 className="font-bold text-lg mb-5">Quick Facts</h3>
                <ul className="space-y-4 text-sm">
                  {[
                    { label: "Experience", value: `${business.stats.yearsExperience}+ years` },
                    { label: "Rating", value: `${business.stats.reviewAverage} ★` },
                    { label: "WA License", value: business.licenses.wa },
                    { label: "ID License", value: business.licenses.id },
                  ].map((row) => (
                    <li key={row.label} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0 last:pb-0">
                      <span className="text-gray-400">{row.label}</span>
                      <span className="font-semibold">{row.value}</span>
                    </li>
                  ))}
                  <li className="flex justify-between items-center">
                    <span className="text-gray-400">Estimates</span>
                    <span className="font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full text-xs">FREE</span>
                  </li>
                </ul>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="block w-full bg-orange-600 text-white text-center px-6 py-3.5 rounded-xl font-bold mt-6 hover:bg-orange-500 transition-colors"
                >
                  Call {business.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Available in these cities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">Available In</p>
          <h2 className="text-3xl font-bold mb-8">{service.name} Service Areas</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {highCities.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
              >
                <span className="font-bold group-hover:text-orange-600 transition-colors">{city.name}</span>
                <span className="text-gray-400">, {city.stateAbbr}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">More Services</p>
          <h2 className="text-3xl font-bold mb-8">Other Services</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-orange-100 transition-colors">
                  {s.icon}
                </div>
                <span className="font-bold group-hover:text-orange-600 transition-colors">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
