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
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customer Reviews
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex text-amber-400 text-2xl">
              {"★".repeat(5)}
            </div>
            <span className="text-xl text-slate-300">
              {business.stats.reviewAverage} average from{" "}
              {business.stats.reviewCount}+ reviews
            </span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-bold">{review.name}</span>
                    <span className="text-slate-400 text-sm ml-2">
                      {review.location}
                    </span>
                  </div>
                  <span className="text-sm text-slate-400">{review.date}</span>
                </div>
                <div className="flex text-amber-400 mb-3">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="text-slate-700">{review.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">
              Want to share your experience?
            </p>
            <a
              href={business.social.google || "#"}
              className="inline-block bg-amber-500 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-amber-400 transition-colors"
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
