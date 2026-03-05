import Link from "next/link";
import type { Metadata } from "next";
import { business } from "@/config/business";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: `About ${business.shortName}`,
  description: `Learn about ${business.shortName}. ${business.stats.yearsExperience}+ years of ${business.category.toLowerCase()} experience serving Utah and Texas.`,
};

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
            {business.tagline} — serving Utah and Texas
            since {business.founded}.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 -mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${business.stats.yearsExperience}+`, label: "Years Experience" },
                { value: `${business.stats.projectsCompleted.toLocaleString()}+`, label: "Projects Completed" },
                { value: `${business.stats.reviewAverage} ★`, label: `${business.stats.reviewCount}+ Reviews` },
                { value: "2", label: "State Licenses" },
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
          <h2 className="text-3xl font-black mb-2">Built on Quality & Trust</h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-8" />
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Founded in {business.founded}, {business.name} has grown to become
              one of the most trusted {business.category.toLowerCase()}{" "}
              companies across Utah and Texas.
              With {business.stats.yearsExperience}+ years of experience and{" "}
              {business.stats.projectsCompleted.toLocaleString()}+ completed
              projects, we bring unmatched expertise to every job.
            </p>
            <p>
              We are fully licensed and insured in both Utah and Texas.
              Our commitment to professionalism and safety means you can trust
              us with your project.
            </p>
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section className="py-20 concrete-texture">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Credentials</p>
          <h2 className="text-3xl font-black mb-2">Licensed & Insured</h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { state: "UT", label: "Utah License", value: business.licenses.ut },
              { state: "TX", label: "Texas License", value: business.licenses.tx },
            ].map((lic) => (
              <div key={lic.state} className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-xs">{lic.state}</span>
                  <h3 className="font-bold">{lic.label}</h3>
                </div>
                <p className="text-gray-500 font-mono text-sm">{lic.value}</p>
              </div>
            ))}
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
              transparent pricing, clear communication, and quality workmanship.
              Our {business.stats.reviewAverage}-star rating across{" "}
              {business.stats.reviewCount}+ reviews speaks to the level of
              service our customers expect and receive.
            </p>
            <p>
              We serve communities across Utah and Texas, from Park City and
              Salt Lake City to the Dallas-Fort Worth metroplex.
              No matter where your project is located, our team will be there.
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
