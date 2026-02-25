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
      ? `Ready for ${business.category} in ${cityName}?`
      : `Ready to Get Started?`);

  const sub =
    subtitle ||
    `Call ${business.phone} for a free estimate or fill out our online form.`;

  return (
    <section className="bg-amber-500 text-slate-900 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
        <p className="text-lg mb-8">{sub}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${business.phoneTel}`}
            className="bg-slate-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-colors"
          >
            Call {business.phone}
          </a>
          <Link
            href="/contact"
            className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
