import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { cities, getCitiesByState } from "@/config/cities";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Service Areas — Eastern Washington & Northern Idaho`,
  description: `${business.shortName} serves ${cities.length}+ communities across Eastern Washington and Northern Idaho. Find ${business.category.toLowerCase()} services near you.`,
};

export default function AreasPage() {
  const waCities = getCitiesByState("WA");
  const idCities = getCitiesByState("ID");

  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/areas" },
        ])}
      />

      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Service Areas
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            We provide professional {business.category.toLowerCase()} services
            across {cities.length}+ communities in Eastern Washington and
            Northern Idaho.
          </p>
        </div>
      </section>

      {/* Washington */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">
            Eastern Washington
          </h2>
          <p className="text-slate-600 mb-8">
            {waCities.length} communities served — WA License #{business.licenses.wa}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {waCities
              .sort((a, b) => b.population - a.population)
              .map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-amber-300 transition-all"
                >
                  <div className="font-semibold">
                    {city.name}
                    <span className="text-slate-400 font-normal">
                      , {city.stateAbbr}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {city.zip.join(", ")} &middot;{" "}
                    {city.population.toLocaleString()} pop.
                  </div>
                  {city.priority === "high" && (
                    <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                      Major service area
                    </span>
                  )}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Idaho */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">
            Northern Idaho
          </h2>
          <p className="text-slate-600 mb-8">
            {idCities.length} communities served — ID License #{business.licenses.id}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {idCities
              .sort((a, b) => b.population - a.population)
              .map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-amber-300 transition-all"
                >
                  <div className="font-semibold">
                    {city.name}
                    <span className="text-slate-400 font-normal">
                      , {city.stateAbbr}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {city.zip.join(", ")} &middot;{" "}
                    {city.population.toLocaleString()} pop.
                  </div>
                  {city.priority === "high" && (
                    <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                      Major service area
                    </span>
                  )}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
