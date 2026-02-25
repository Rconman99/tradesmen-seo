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

      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Professional {business.category.toLowerCase()} services for
            residential and commercial projects across Eastern Washington and
            Northern Idaho.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg hover:border-amber-300 transition-all group"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-amber-600 transition-colors">
                  {service.name}
                </h2>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-sm text-slate-500 flex items-start gap-2"
                    >
                      <span className="text-amber-500 mt-1">&#10003;</span>
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
