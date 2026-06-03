import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: `About ${business.shortName}`,
  description: `Learn about ${business.name} — a dual-trade excavation and concrete contractor serving Maple Valley and the King & Pierce County area of Washington.`,
};

const licenseText = business.license.registration
  ? `WA Registration #${business.license.registration}`
  : "Registered, Bonded & Insured in Washington";

export default function AboutPage() {
  return (
    <>
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">Who We Are</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            About <span className="text-gradient">{business.shortName}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Excavation and concrete under one roof — serving Maple Valley and the
            greater King &amp; Pierce County area of Washington.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 -mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "2-in-1", label: "Excavation + Concrete" },
                { value: "King & Pierce", label: "Counties Served" },
                { value: "WA", label: "Licensed • Bonded • Insured" },
                { value: "Free", label: "On-Site Estimates" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-3xl md:text-4xl font-black text-blue-600">{item.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-semibold">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Our Story</p>
          <h2 className="text-3xl font-black mb-2">Two Trades, One Crew</h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              {business.name} is a dual-trade contractor based in Maple Valley,
              Washington. We do something most contractors don&apos;t: we handle
              both the dirt work and the concrete. From trenching, grading, and
              site preparation to concrete driveways, patios, slabs, and
              sidewalks, the same crew carries a project from the first cut to the
              finished pour.
            </p>
            <p>
              That matters because, in Puget Sound soils, a concrete slab is only
              as good as the ground beneath it. When one team prepares the
              subgrade and places the concrete, the grading, drainage, and pour
              are built to work together — and you have fewer contractors to hire
              and coordinate.
            </p>
            <p>
              We serve homeowners and builders across King and Pierce County, and
              we&apos;re {licenseText.toLowerCase()}.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 concrete-texture">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Credentials</p>
          <h2 className="text-3xl font-black mb-2">Licensed &amp; Insured</h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs">WA</span>
                <h3 className="font-bold">Washington Contractor</h3>
              </div>
              <p className="text-gray-500 text-sm">{licenseText}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold text-xs">✓</span>
                <h3 className="font-bold">Fully Bonded</h3>
              </div>
              <p className="text-gray-500 text-sm">Bonded and insured for your protection</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold text-xs">✓</span>
                <h3 className="font-bold">Workers Comp</h3>
              </div>
              <p className="text-gray-500 text-sm">Full workers compensation coverage</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold text-xs">✓</span>
                <h3 className="font-bold">Permits Handled</h3>
              </div>
              <p className="text-gray-500 text-sm">We handle clearing, grading, and right-of-way permits as needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Our Promise</p>
          <h2 className="text-3xl font-black mb-2">Our Commitment to You</h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Every project starts with a free on-site estimate. We believe in
              transparent pricing, clear communication, and quality workmanship —
              we walk the site, talk through the ground conditions, and quote it
              straight.
            </p>
            <p>
              We serve communities across King and Pierce County, from Maple
              Valley, Covington, and Kent to Tacoma, Puyallup, and beyond. No
              matter where your project is, our team will be there.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 hover:scale-105">
              Get Free Estimate
            </Link>
            <Link href="/areas" className="bg-gray-100 text-gray-900 px-10 py-5 rounded-full font-bold text-lg text-center hover:bg-gray-200 transition-all">
              View Service Areas
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
