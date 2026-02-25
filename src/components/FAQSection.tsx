import { business } from "@/config/business";
import { City } from "@/config/cities";

export function FAQSection({ city }: { city: City }) {
  const serviceName = business.category.toLowerCase();
  const faqs = [
    {
      q: `How much does ${serviceName} cost in ${city.name}?`,
      a: `Costs in ${city.name}, ${city.stateAbbr} vary by project scope, material thickness, and access. Call ${business.phone} for a free on-site estimate.`,
    },
    {
      q: `Do you offer free estimates in ${city.name}?`,
      a: `Yes! Free on-site estimates for all projects in ${city.name} and surrounding ${city.county} County. Call ${business.phone} to schedule.`,
    },
    {
      q: `Are you licensed in ${city.state}?`,
      a: `Fully licensed and insured. ${city.stateAbbr === "WA" ? `WA License #${business.licenses.wa}` : `ID License #${business.licenses.id}`}.`,
    },
    {
      q: `What areas near ${city.name} do you serve?`,
      a: `We serve ${city.name} and all surrounding ${city.county} County communities. Contact us to confirm availability.`,
    },
    {
      q: `How fast can you start?`,
      a: `Typically 3\u20135 business days. For urgent needs in ${city.name}, call ${business.phone} directly.`,
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
