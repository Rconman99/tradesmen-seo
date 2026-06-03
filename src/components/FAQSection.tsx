import { business } from "@/config/business";
import { City } from "@/config/cities";

export function FAQSection({ city }: { city: City }) {
  const licenseText = business.license.registration
    ? `WA registration #${business.license.registration}`
    : "registered, bonded, and insured in Washington";

  const faqs = [
    {
      q: `How much does excavation or concrete work cost in ${city.name}?`,
      a: `Costs in ${city.name}, ${city.stateAbbr} depend on the job — driveways, footing or French drains, and lot grading or site prep all vary with access, soil, and scope. Call ${business.phone} for a free on-site estimate.`,
    },
    {
      q: `Do you offer free estimates in ${city.name}?`,
      a: `Yes! Free on-site estimates for excavation and concrete projects in ${city.name} and the surrounding ${city.county} County area. Call ${business.phone} to schedule.`,
    },
    {
      q: `Are you licensed in ${city.state}?`,
      a: `${business.shortName} is ${licenseText}.`,
    },
    {
      q: `Do I need a permit for grading or concrete in ${city.name}?`,
      a: `Many clearing, grading, and driveway-approach projects require a permit from the city, and critical-areas rules can apply near slopes, wetlands, or streams. We know the local process and handle permits as needed.`,
    },
    {
      q: `Do you do both the excavation and the concrete?`,
      a: `Yes — that's our advantage. One crew handles the dirt work (grading, subgrade prep, drainage) and the concrete, so you don't have to coordinate two separate contractors.`,
    },
    {
      q: `How fast can you start?`,
      a: `Scheduling depends on the season and the size of the job. Call ${business.phone} and we'll give you a realistic start window with your free estimate.`,
    },
  ];

  return (
    <section className="py-20 concrete-texture">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black">
            Questions About {city.name}
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
