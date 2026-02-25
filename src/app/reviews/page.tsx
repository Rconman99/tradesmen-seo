import type { Metadata } from "next";
import { business } from "@/config/business";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: `Reviews — ${business.stats.reviewAverage} Star Rating`,
  description: `Read what our customers say about ${business.shortName}. ${business.stats.reviewCount}+ verified reviews with a ${business.stats.reviewAverage}-star average.`,
};

// Placeholder reviews — replace with real reviews or pull from Google API
const reviews = [
  {
    name: "Mike R.",
    location: "Spokane, WA",
    rating: 5,
    text: "Excellent work on our commercial project. Clean cuts, professional crew, and they finished ahead of schedule. Highly recommend for any concrete cutting needs in the Spokane area.",
    date: "2 weeks ago",
  },
  {
    name: "Sarah T.",
    location: "Coeur d'Alene, ID",
    rating: 5,
    text: "We needed core drilling for a bathroom remodel and they were fantastic. On time, clean work, and very fair pricing. Will definitely use them again.",
    date: "1 month ago",
  },
  {
    name: "David L.",
    location: "Kennewick, WA",
    rating: 5,
    text: "Had them remove an old concrete patio. They were in and out in one day. The area was left clean and ready for the new pour. Great communication throughout.",
    date: "1 month ago",
  },
  {
    name: "Jennifer M.",
    location: "Spokane Valley, WA",
    rating: 5,
    text: "Professional from start to finish. They cut a new doorway opening in our basement wall and it was perfect. Very reasonable pricing for the Spokane Valley area.",
    date: "2 months ago",
  },
  {
    name: "Tom H.",
    location: "Post Falls, ID",
    rating: 5,
    text: "Used them for GPR scanning before a commercial renovation. They found buried utilities we didn't know about and saved us from a potential disaster. Worth every penny.",
    date: "2 months ago",
  },
  {
    name: "Lisa K.",
    location: "Yakima, WA",
    rating: 4,
    text: "Good work on our driveway removal. Only reason for 4 stars is scheduling took a bit longer than expected, but the actual work was top-notch.",
    date: "3 months ago",
  },
];

export default function ReviewsPage() {
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
