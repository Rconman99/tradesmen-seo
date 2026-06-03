import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${business.category} Services`,
  description: `Professional ${business.category.toLowerCase()} services including ${services.map((s) => s.name.toLowerCase()).join(", ")}. Licensed & insured. Free estimates.`,
};

export default function ServicesPage() {
  return (
    <>
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])} />

      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">What We Do</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Our Services</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Excavation and concrete for residential and light commercial projects across King and Pierce County, Washington.
          </p>
        </div>
      </section>

      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-blue-600 transition-all hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-1">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-600/30">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{service.name}</h2>
                <p className="text-gray-500 mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="text-sm text-gray-400 flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
