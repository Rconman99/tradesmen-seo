import { business } from "@/config/business";
import { City } from "@/config/cities";

interface FAQSectionProps {
  city: City;
}

export function FAQSection({ city }: FAQSectionProps) {
  const serviceName = business.category.toLowerCase();
  const faqs = [
    {
      q: `How much does ${serviceName} cost in ${city.name}?`,
      a: `${business.category} costs in ${city.name}, ${city.stateAbbr} vary depending on the project scope, material thickness, and access conditions. Contact us at ${business.phone} for a free on-site estimate — we'll give you an accurate quote before any work begins.`,
    },
    {
      q: `Do you offer free estimates in ${city.name}?`,
      a: `Yes! We provide free on-site estimates for all ${serviceName} projects in ${city.name} and surrounding ${city.county} County areas. Call ${business.phone} to schedule.`,
    },
    {
      q: `Are you licensed and insured in ${city.state}?`,
      a: `Absolutely. ${business.shortName} is fully licensed and insured for work in ${city.state}. ${
        city.stateAbbr === "WA"
          ? `Our Washington license number is ${business.licenses.wa}.`
          : `Our Idaho license number is ${business.licenses.id}.`
      }`,
    },
    {
      q: `What areas near ${city.name} do you serve?`,
      a: `We serve ${city.name} and all surrounding communities in ${city.county} County. Contact us to confirm service availability for your specific location.`,
    },
    {
      q: `How quickly can you start a project in ${city.name}?`,
      a: `We typically schedule projects within 3-5 business days. For emergency or urgent needs in ${city.name}, call us directly at ${business.phone} and we'll do our best to accommodate your timeline.`,
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Frequently Asked Questions — {city.name}, {city.stateAbbr}
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {faq.q}
              </h3>
              <p className="text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
