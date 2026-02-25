import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { cities, getCitiesByState } from "@/config/cities";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Service Areas \u2014 Eastern Washington & Northern Idaho`,
  description: `${business.shortName} serves ${cities.length}+ communities across Eastern Washington and Northern Idaho. Find ${business.category.toLowerCase()} services near you.`,
};

export default function AreasPage() {
  const waCities = getCitiesByState("WA");
  const idCities = getCitiesByState("ID");

  const CityCard = ({ city }: { city: (typeof cities)[number] }) => (
    <Link
      href={`/areas/${city.slug}`}
      className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-600/5 transition-all"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold group-hover:text-orange-600 transition-colors">
          {city.name}
        </span>
        <span className="text-xs text-gray-400 font-medium">{city.stateAbbr}</span>
      </div>
      <div className="text-xs text-gray-400">
        {city.zip.join(", ")} &middot; {city.population.toLocaleString()} pop.
      </div>
      {city.priority === "high" && (
        <span className="inline-block mt-2.5 text-[10px] font-semibold uppercase tracking-wider bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full">
          Major area
        </span>
      )}
    </Link>
  );

  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/areas" },
        ])}
      />

      <section className="relative bg-gray-950 text-white pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-2">Coverage</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Service Areas</h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Professional {business.category.toLowerCase()} services
            across {cities.length}+ communities in Eastern Washington and Northern Idaho.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* Washington */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-orange-600/10 text-orange-600 px-2.5 py-0.5 rounded font-mono text-xs font-bold">WA</span>
            <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Eastern Washington</p>
          </div>
          <p className="text-gray-500 mb-8">
            {waCities.length} communities served &middot; License #{business.licenses.wa}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {waCities
              .sort((a, b) => b.population - a.population)
              .map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
          </div>
        </div>
      </section>

      {/* Idaho */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-orange-600/10 text-orange-600 px-2.5 py-0.5 rounded font-mono text-xs font-bold">ID</span>
            <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Northern Idaho</p>
          </div>
          <p className="text-gray-500 mb-8">
            {idCities.length} communities served &middot; License #{business.licenses.id}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {idCities
              .sort((a, b) => b.population - a.population)
              .map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
