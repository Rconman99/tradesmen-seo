import Link from "next/link";
import { business } from "@/config/business";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  cityName?: string;
}

export function CTASection({ title, subtitle, cityName }: CTASectionProps) {
  const heading =
    title ||
    (cityName
      ? `Need ${business.category} in ${cityName}?`
      : `Let\u2019s Get Your Project Started`);

  const sub =
    subtitle ||
    `Free estimates, no obligation. Call us or fill out our form and we\u2019ll get back to you within 24 hours.`;

  return (
    <section className="relative bg-gray-950 text-white py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-orange-600/10 border border-orange-600/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-orange-400 text-sm font-medium">
            Accepting new projects
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          {heading}
        </h2>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          {sub}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${business.phoneTel}`}
            className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call {business.phone}
          </a>
          <Link
            href="/contact"
            className="bg-white/10 backdrop-blur text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
          >
            Request Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
