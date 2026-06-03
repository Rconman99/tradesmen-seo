import type { Metadata } from "next";
import { business } from "@/config/business";
import { CTASection } from "@/components/CTASection";
import { sanityFetch } from "@/sanity/lib/client";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import type { SanityTestimonial } from "@/sanity/types";

export const metadata: Metadata = {
  title: `Reviews`,
  description: `Read what customers say about ${business.name} — excavation and concrete in the King & Pierce County area of Washington.`,
};

export default async function ReviewsPage() {
  const sanityTestimonials = await sanityFetch<SanityTestimonial[]>({
    query: TESTIMONIALS_QUERY,
    tags: ["testimonial"],
  });

  const reviews = sanityTestimonials.map((t) => ({
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
  }));

  const hasReviews = reviews.length > 0;
  const avgRating = hasReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <>
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">Testimonials</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Customer Reviews
          </h1>
          {hasReviews ? (
            <div className="flex items-center gap-4">
              <div className="flex text-orange-400 text-2xl">{"★★★★★"}</div>
              <span className="text-lg text-gray-300 font-medium">
                {avgRating}/5 from {reviews.length} review
                {reviews.length === 1 ? "" : "s"}
              </span>
            </div>
          ) : (
            <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
              Real feedback from real projects across King &amp; Pierce County.
            </p>
          )}
        </div>
      </section>

      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {hasReviews ? (
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
                        {review.location && (
                          <span className="text-gray-400 text-sm ml-2">{review.location}</span>
                        )}
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
          ) : (
            <div className="bg-white rounded-2xl p-10 border-2 border-gray-100 text-center">
              <div className="text-5xl mb-4">🚧</div>
              <h2 className="text-2xl font-black mb-3">Reviews Coming Soon</h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                We let our work speak for itself. If we&apos;ve handled a project
                for you, we&apos;d be grateful if you shared your experience —
                and if you&apos;re considering us, call {business.phone} for a
                free on-site estimate.
              </p>
            </div>
          )}

          {business.social.google && (
            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-4">Want to share your experience?</p>
              <a
                href={business.social.google}
                className="inline-block bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave Us a Review on Google
              </a>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
