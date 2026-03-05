import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { services, getServiceBySlug } from "@/config/services";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { ServiceAreaGrid } from "@/components/ServiceAreaGrid";
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
    description: `Professional ${service.name.toLowerCase()} services across Utah and Texas. ${service.description} Call ${business.phone} for a free estimate.`,
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
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 md:pt-16 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{service.name}</span>
          </nav>

          <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center text-4xl mb-6 backdrop-blur-sm border border-blue-500/20">
            {service.icon}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4">
            <span className="text-gradient">{service.name}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 hover:scale-105">
              Get Free Estimate
            </Link>
            <a href={`tel:${business.phoneTel}`} className="bg-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 hover:scale-105 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Capabilities</p>
              <h2 className="text-3xl font-black mb-2">What We Offer</h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
              <ul className="space-y-4">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-4 bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-16">
                <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Why Us</p>
                <h2 className="text-3xl font-black mb-2">
                  Why Choose Us for {service.name}?
                </h2>
                <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                  <p>
                    With {business.stats.yearsExperience}+ years of experience
                    and {business.stats.projectsCompleted.toLocaleString()}+
                    completed projects, {business.shortName} is the trusted
                    choice for {service.name.toLowerCase()} across Utah and
                    Texas.
                  </p>
                  <p>
                    We use premium materials and proven techniques for lasting
                    results on every project. Our team is fully licensed and insured,
                    and we provide free inspections and estimates so you know exactly
                    what to expect before work begins.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg sticky top-32">
                <h3 className="font-bold text-lg mb-5">Quick Facts</h3>
                <ul className="space-y-4 text-sm">
                  {[
                    { label: "Experience", value: `${business.stats.yearsExperience}+ years` },
                    { label: "Rating", value: `${business.stats.reviewAverage} ★` },
                    { label: "UT License", value: business.licenses.ut },
                    { label: "TX License", value: business.licenses.tx },
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

      {/* Available in these cities — ALL 14 cities */}
      <section className="py-20 concrete-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Available In</p>
          <h2 className="text-3xl font-black mb-2">{service.name} Service Areas</h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />
          <ServiceAreaGrid currentService={service} />
        </div>
      </section>

      {/* Other services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">More Services</p>
          <h2 className="text-3xl font-black mb-2">Other Services</h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-600 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {s.icon}
                </div>
                <span className="text-lg font-bold group-hover:text-blue-600 transition-colors">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
