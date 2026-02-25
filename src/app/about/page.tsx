import type { Metadata } from "next";
import { business } from "@/config/business";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: `About ${business.shortName}`,
  description: `Learn about ${business.shortName}. ${business.stats.yearsExperience}+ years of ${business.category.toLowerCase()} experience serving Eastern Washington and Northern Idaho.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About {business.shortName}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            {business.tagline} — serving Eastern Washington and Northern Idaho
            since {business.founded}.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-slate prose-lg max-w-none">
            <h2>Our Story</h2>
            <p>
              Founded in {business.founded}, {business.name} has grown to become
              one of the most trusted {business.category.toLowerCase()}{" "}
              companies in the Eastern Washington and Northern Idaho region.
              With {business.stats.yearsExperience}+ years of experience and{" "}
              {business.stats.projectsCompleted.toLocaleString()}+ completed
              projects, we bring unmatched expertise to every job.
            </p>

            <h2>Licensed & Insured</h2>
            <p>
              We are fully licensed and insured in both Washington and Idaho.
              Our commitment to professionalism and safety means you can trust
              us with your project.
            </p>
            <ul>
              <li>Washington License: {business.licenses.wa}</li>
              <li>Idaho License: {business.licenses.id}</li>
              <li>Fully bonded and insured</li>
              <li>Workers compensation coverage</li>
            </ul>

            <h2>Our Commitment</h2>
            <p>
              Every project starts with a free on-site estimate. We believe in
              transparent pricing, clear communication, and quality workmanship.
              Our {business.stats.reviewAverage}-star rating across{" "}
              {business.stats.reviewCount}+ reviews speaks to the level of
              service our customers expect and receive.
            </p>

            <h2>Service Area</h2>
            <p>
              We serve the entire Eastern Washington and Northern Idaho region,
              from Spokane and the Tri-Cities to Coeur d&apos;Alene and beyond.
              No matter where your project is located, our team will be there.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
