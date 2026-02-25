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
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-6xl mb-4">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {service.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-6">
            {service.description}
          </p>
          <a
            href={`tel:${business.phoneTel}`}
            className="inline-block bg-amber-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-400 transition-colors"
          >
            Get a Free Estimate — {business.phone}
          </a>
        </div>
      </section>

      {/* Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6">
                What We Offer
              </h2>
              <ul className="space-y-4">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-0.5">
                      &#10003;
                    </span>
                    <span className="text-lg text-slate-700">{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6">
                  Why Choose {business.shortName} for {service.name}?
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p>
                    With {business.stats.yearsExperience}+ years of experience
                    and {business.stats.projectsCompleted.toLocaleString()}+
                    completed projects, {business.shortName} is the trusted
                    choice for {service.name.toLowerCase()} in Eastern
                    Washington and Northern Idaho.
                  </p>
                  <p>
                    We use professional-grade diamond equipment for clean,
                    precise results on every project. Our team is fully licensed
                    and insured, and we provide free on-site estimates so you
                    know exactly what to expect before work begins.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-slate-50 rounded-xl p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Quick Facts</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-slate-500">Experience</span>
                    <span className="font-semibold">
                      {business.stats.yearsExperience}+ years
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">Rating</span>
                    <span className="font-semibold">
                      {business.stats.reviewAverage} ★
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">WA License</span>
                    <span className="font-semibold">
                      {business.licenses.wa}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">ID License</span>
                    <span className="font-semibold">
                      {business.licenses.id}
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

      {/* Available in these cities */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {service.name} Available In
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {highCities.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="bg-white rounded-lg p-4 hover:bg-amber-50 hover:shadow-sm transition-all"
              >
                <span className="font-semibold">{city.name}</span>
                <span className="text-slate-500">, {city.stateAbbr}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Other Services
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="bg-slate-50 rounded-lg p-4 hover:bg-amber-50 transition-all flex items-center gap-3"
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="font-semibold">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
