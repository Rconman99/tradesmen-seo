import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { cities, getCitiesByState } from "@/config/cities";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Service Areas — Utah & Texas`,
  description: `${business.shortName} serves ${cities.length}+ communities across Utah and Texas. Find ${business.category.toLowerCase()} services near you.`,
};

export default function AreasPage() {
  const utCities = getCitiesByState("UT");
  const txCities = getCitiesByState("TX");

  const CityCard = ({ city }: { city: (typeof cities)[number] }) => (
    <Link
      href={`/areas/${city.slug}`}
      className="group bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/5 transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold group-hover:text-blue-600 transition-colors">
          {city.name}
        </span>
        <span className="text-xs text-gray-400 font-medium">{city.stateAbbr}</span>
      </div>
      <div className="text-xs text-gray-400">
        {city.zip.join(", ")} &middot; {city.population.toLocaleString()} pop.
      </div>
      {city.priority === "high" && (
        <span className="inline-block mt-2.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
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

      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">Coverage</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Service Areas</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Professional {business.category.toLowerCase()} services
            across {cities.length}+ communities in Utah and Texas.
          </p>
        </div>
      </section>

      {/* Utah */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs">UT</span>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em]">Utah</p>
          </div>
          <p className="text-gray-500 mb-2">
            {utCities.length} communities served &middot; License #{business.licenses.ut}
          </p>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {utCities
              .sort((a, b) => b.population - a.population)
              .map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
          </div>
        </div>
      </section>

      {/* Texas */}
      <section className="py-20 concrete-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs">TX</span>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em]">Texas</p>
          </div>
          <p className="text-gray-500 mb-2">
            {txCities.length} communities served &middot; License #{business.licenses.tx}
          </p>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {txCities
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
