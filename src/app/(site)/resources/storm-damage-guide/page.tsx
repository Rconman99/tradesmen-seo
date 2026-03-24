import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { CTASection } from "@/components/CTASection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Storm Damage Insurance Claim Guide",
  description: `Download the free storm damage insurance claim guide from ${business.shortName}. Step-by-step instructions for filing hail and wind damage roof claims in Utah and Texas.`,
  openGraph: {
    title: `Free Storm Damage Insurance Claim Guide | ${business.shortName}`,
    description:
      "Step-by-step guide to filing a successful roof insurance claim after hail or wind damage. Includes documentation checklist, adjuster meeting tips, and claim timeline.",
    type: "website",
  },
};

const guideSteps = [
  {
    number: "01",
    title: "Document the Damage Immediately",
    description:
      "Take photos of all damage from multiple angles — roof, gutters, siding, windows, and any interior water damage. Record the date and time of the storm. Save any weather reports or hail size data for your area.",
  },
  {
    number: "02",
    title: "File Your Claim Within 72 Hours",
    description:
      "Contact your insurance company as soon as possible. Most policies require timely reporting. Provide your policy number, date of loss, and a brief description. Request a claim number and the name of your assigned adjuster.",
  },
  {
    number: "03",
    title: "Get a Professional Roof Inspection",
    description:
      "Have a licensed roofing contractor inspect your roof before the adjuster visit. A professional can identify hidden damage that homeowners often miss — cracked underlayment, compromised flashing, and granule loss on shingles.",
  },
  {
    number: "04",
    title: "Meet with the Insurance Adjuster",
    description:
      "Be present during the adjuster's inspection. Have your contractor's damage report ready. Walk the property together and ensure all damage is documented on the adjuster's report. Don't accept a lowball estimate without pushback.",
  },
  {
    number: "05",
    title: "Review Your Settlement & Begin Repairs",
    description:
      "Compare the insurance estimate to your contractor's quote. If the settlement is too low, you can file a supplement or request a re-inspection. Once approved, your contractor can begin repairs. Keep all receipts for your records.",
  },
];

const claimTips = [
  "Never sign a contract that assigns your insurance benefits to a third party",
  "Keep a copy of every document you send to or receive from your insurer",
  "Don't make permanent repairs before the adjuster inspects the damage",
  "Know your policy's deductible — it's your responsibility, not the contractor's",
  "Request an itemized estimate from both your contractor and the adjuster",
  "If denied, you have the right to appeal — most states allow 60-90 days",
];

export default function StormDamageGuidePage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources/storm-damage-guide" },
          {
            name: "Storm Damage Guide",
            url: "/resources/storm-damage-guide",
          },
        ])}
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How long do I have to file a storm damage claim?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most insurance policies require you to report damage promptly — ideally within 72 hours. However, the statute of limitations varies by state: Utah allows up to 3 years, and Texas allows up to 2 years from the date of the storm.",
              },
            },
            {
              "@type": "Question",
              name: "Will filing a claim raise my insurance rates?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A single weather-related claim typically does not increase your rates, as storm damage is considered an act of nature. However, multiple claims within a short period may affect your premiums.",
              },
            },
            {
              "@type": "Question",
              name: "What if the insurance estimate is too low?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can request a supplement. Have your contractor provide a detailed estimate with line items. If the insurer still disagrees, you can request a re-inspection, file a complaint with your state's insurance commissioner, or hire a public adjuster.",
              },
            },
            {
              "@type": "Question",
              name: "Does insurance cover roof replacement or just repair?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Insurance covers the cost to restore your roof to its pre-damage condition. If damage is extensive enough that repair isn't feasible, a full replacement is covered.",
              },
            },
            {
              "@type": "Question",
              name: "Should I get a roof inspection before or after filing a claim?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Both. Get a professional inspection immediately to document damage, then have your contractor present during the adjuster's visit to ensure all damage is captured in the claim.",
              },
            },
          ],
        }}
      />

      {/* Hero */}
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-36 md:pt-16 md:pb-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
                Free Guide
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.9] mb-6">
                Storm Damage
                <br />
                <span className="text-gradient">Insurance Claim</span>
                <br />
                Guide
              </h1>
              <p className="text-lg text-gray-300 mb-6 max-w-xl leading-relaxed">
                Don&apos;t leave money on the table. Learn exactly how to file a
                successful roof insurance claim after hail or wind damage — step
                by step.
              </p>

              {/* AI-extractable summary block */}
              <p className="text-sm text-gray-400 border-l-2 border-blue-500/30 pl-4 mb-8 max-w-lg">
                After a hailstorm or windstorm, homeowners should document
                damage immediately, file an insurance claim within 72 hours, get
                a professional roof inspection, and be present during the
                adjuster visit. Most homeowner insurance policies cover storm
                damage repairs when properly documented.
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-orange-400">{"★★★★★"}</span>
                  Trusted by {business.stats.projectsCompleted.toLocaleString()}+ homeowners
                </span>
              </div>
            </div>

            {/* Email capture form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Get the Free Guide
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Plus a free storm damage inspection for your roof. No
                obligation.
              </p>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="guide-name"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="guide-name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="guide-email"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="guide-email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="guide-phone"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="guide-phone"
                    name="phone"
                    autoComplete="tel"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="(801) 555-0000"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition"
                >
                  Send Me the Free Guide
                </button>
                <p className="text-xs text-center text-gray-400">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 md:py-28 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
              What&apos;s Inside
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Your 5-Step Claim Roadmap
            </h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {guideSteps.map((step) => (
              <div
                key={step.number}
                className="flex gap-6 bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="shrink-0 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="py-20 md:py-28 concrete-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
                Pro Tips
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Avoid These Common Claim Mistakes
              </h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
              <ul className="space-y-4">
                {claimTips.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100"
                  >
                    <div className="w-6 h-6 bg-orange-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3.5 h-3.5 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm font-medium">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
              <h3 className="text-2xl font-black mb-4">
                Need Help With a Claim?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {business.shortName} has helped thousands of homeowners navigate
                the insurance claim process. We document damage, meet with
                adjusters, and handle the paperwork so you don&apos;t have to.
              </p>
              <div className="space-y-4 text-sm mb-6">
                {[
                  "Free storm damage inspection",
                  "Insurance adjuster coordination",
                  "Complete documentation for your claim",
                  `Licensed in UT (#${business.licenses.ut}) & TX (#${business.licenses.tx})`,
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="block w-full bg-blue-600 text-white text-center px-6 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-lg"
              >
                Schedule Free Inspection
              </Link>
              <a
                href={`tel:${business.phoneTel}`}
                className="block w-full bg-orange-500 text-white text-center px-6 py-4 rounded-full font-bold mt-3 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
              >
                Call {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Storm Damage Claim Questions
            </h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long do I have to file a storm damage claim?",
                a: "Most insurance policies require you to report damage promptly — ideally within 72 hours. However, the statute of limitations for filing a claim varies by state: Utah allows up to 3 years, and Texas allows up to 2 years from the date of the storm.",
              },
              {
                q: "Will filing a claim raise my insurance rates?",
                a: "A single weather-related claim typically does not increase your rates, as storm damage is considered an act of nature. However, multiple claims within a short period may affect your premiums. Check with your insurer for specifics.",
              },
              {
                q: "What if the insurance estimate is too low?",
                a: "You can request a supplement. Have your contractor provide a detailed estimate with line items. If the insurer still disagrees, you can request a re-inspection, file a complaint with your state's insurance commissioner, or hire a public adjuster.",
              },
              {
                q: "Does insurance cover roof replacement or just repair?",
                a: "Insurance covers the cost to restore your roof to its pre-damage condition. If damage is extensive enough that repair isn't feasible, a full replacement is covered. The adjuster's inspection determines the scope.",
              },
              {
                q: "Should I get a roof inspection before or after filing a claim?",
                a: "Both. Get a professional inspection immediately to document damage, then have your contractor present during the adjuster's visit to ensure all damage is captured in the claim.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-gray-900">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Had Recent Storm Damage?" />
    </>
  );
}
