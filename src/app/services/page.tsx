import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${business.category} Services`,
  description: `Professional ${business.category.toLowerCase()} services including ${services
    .map((s) => s.name.toLowerCase())
    .join(", ")}. Licensed & insured. Free estimates.`,
};

export default function ServicesPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />

      <section className="relative bg-gray-950 text-white pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-2">What We Do</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Our Services</h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Professional {business.category.toLowerCase()} services for residential and
            commercial projects across Eastern Washington and Northern Idaho.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-600/5 transition-all"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-3xl mb-5 group-hover:bg-orange-100 transition-colors">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                  {service.name}
                </h2>
                <p className="text-gray-500 mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="text-sm text-gray-400 flex items-start gap-2">
                      <svg className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
