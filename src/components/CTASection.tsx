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
      ? `Need Excavation or Concrete Work in ${cityName}?`
      : `Ready to Get Your Project Started?`);

  const sub =
    subtitle ||
    `Free estimates, fast scheduling. Call us or book online \u2014 we\u2019ll get back to you within 24 hours.`;

  return (
    <section className="relative bg-blue-600 text-white py-20 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-700/50 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
          {heading}
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          {sub}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:scale-105"
          >
            Book Online
          </Link>
          <a
            href={`tel:${business.phoneTel}`}
            className="bg-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
