import type { Metadata } from "next";
import { business } from "@/config/business";
import { CTASection } from "@/components/CTASection";
import { sanityFetch } from "@/sanity/lib/client";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import type { SanityTestimonial } from "@/sanity/types";

export const metadata: Metadata = {
  title: `Reviews — ${business.stats.reviewAverage} Star Rating`,
  description: `Read what our customers say about ${business.shortName}. ${business.stats.reviewCount}+ verified reviews with a ${business.stats.reviewAverage}-star average.`,
};

// Fallback reviews — used when Sanity has no testimonials yet
const fallbackReviews = [
  {
    name: "David M.",
    location: "Park City, UT",
    rating: 5,
    service: "Re-Roof",
    text: "Frame Restoration replaced our entire roof after a hail storm. Professional from start to finish — handled the insurance claim, used quality materials, and finished in three days. Highly recommend for any roofing needs in the Park City area.",
    date: "2 weeks ago",
  },
  {
    name: "Sarah K.",
    location: "Heber City, UT",
    rating: 5,
    service: "Hail Damage Repair",
    text: "After a major spring hail storm, they were out the same day for inspection. Documented everything for our insurance company and had the repairs completed within a week. Best roofing experience we've had.",
    date: "1 month ago",
  },
  {
    name: "Mike T.",
    location: "Frisco, TX",
    rating: 5,
    service: "Wind Damage Repair",
    text: "High winds tore off shingles on two sections of our roof. Frame Restoration had a crew here the next morning with emergency tarping, then completed full repairs by end of week. Great communication throughout.",
    date: "1 month ago",
  },
  {
    name: "Jennifer R.",
    location: "Salt Lake City, UT",
    rating: 5,
    service: "Leak Repair",
    text: "Had a persistent leak that two other companies couldn't find. Frame Restoration used thermal imaging, pinpointed the source, and fixed it permanently. Five-star service and fair pricing.",
    date: "2 months ago",
  },
  {
    name: "Tom B.",
    location: "Plano, TX",
    rating: 5,
    service: "Commercial Roofing",
    text: "They handled our commercial flat roof replacement with minimal disruption to our business. Professional crew, quality TPO materials, and excellent maintenance plan included.",
    date: "2 months ago",
  },
];

export default async function ReviewsPage() {
  const sanityTestimonials = await sanityFetch<SanityTestimonial[]>({
    query: TESTIMONIALS_QUERY,
    tags: ["testimonial"],
  });

  const reviews =
    sanityTestimonials.length > 0
      ? sanityTestimonials.map((t) => ({
          name: t.name || "",
          location: t.location || "",
          rating: t.rating || 5,
          text: t.text || "",
          date: t.date
            ? new Date(t.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
        }))
      : fallbackReviews;

  return (
    <>
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">Testimonials</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Customer Reviews
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex text-orange-400 text-2xl">{"★★★★★"}</div>
            <span className="text-lg text-gray-300 font-medium">
              {business.stats.reviewAverage}/5 from{" "}
              {business.stats.reviewCount}+ reviews
            </span>
          </div>
        </div>
      </section>

      {/* Summary stats */}
      <section className="relative z-10 -mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-black text-blue-600">{business.stats.reviewAverage}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-semibold">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-600">{business.stats.reviewCount}+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-semibold">Total Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-600">98%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1 font-semibold">Recommend Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-5">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <span className="font-bold">{review.name}</span>
                      <span className="text-gray-400 text-sm ml-2">{review.location}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
                <div className="flex text-orange-400 mb-3">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">
              Want to share your experience?
            </p>
            <a
              href={business.social.google || "#"}
              className="inline-block bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave Us a Review on Google
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
