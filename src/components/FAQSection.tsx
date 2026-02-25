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
      a: `${business.category} costs in ${city.name}, ${city.stateAbbr} vary depending on the project scope, material thickness, and access conditions. Contact us at ${business.phone} for a free on-site estimate \u2014 we\u2019ll give you an accurate quote before any work begins.`,
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
      a: `We typically schedule projects within 3\u20135 business days. For emergency or urgent needs in ${city.name}, call us directly at ${business.phone} and we\u2019ll do our best to accommodate your timeline.`,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Common Questions \u2014 {city.name}
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 transition-colors"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-3">
                <span className="text-orange-600 font-black text-sm bg-orange-50 rounded-lg w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                  Q
                </span>
                {faq.q}
              </h3>
              <p className="text-gray-600 ml-11 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
