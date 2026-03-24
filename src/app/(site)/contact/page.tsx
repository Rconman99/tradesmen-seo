import type { Metadata } from "next";
import { business } from "@/config/business";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Contact Us — Free Estimates`,
  description: `Contact ${business.shortName} for a free estimate. Call ${business.phone} or fill out our online form. Serving Eastern Washington and Northern Idaho.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="hero-concrete diagonal-cut relative text-white pt-12 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Get a free estimate for your project. We respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact form */}
            <ContactForm />

            {/* Contact info */}
            <div className="space-y-5">
              <div className="bg-blue-600 rounded-2xl p-8 text-white">
                <h3 className="font-black text-xl mb-3">Call Us Now</h3>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="text-3xl font-black hover:text-blue-200 transition-colors"
                >
                  {business.phone}
                </a>
                <p className="text-blue-200 mt-3">
                  Mon-Fri: {business.hours.weekdays}
                  <br />
                  Sat: {business.hours.saturday}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <a
                  href={`mailto:${business.email}`}
                  className="text-blue-600 hover:text-blue-700 font-bold text-lg"
                >
                  {business.email}
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                <h3 className="font-bold text-lg mb-2">Location</h3>
                <p className="text-gray-600">
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.state}{" "}
                  {business.address.zip}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                <h3 className="font-bold text-lg mb-3">Licenses</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-bold text-xs">WA</span>
                    <span className="text-gray-600 text-sm font-mono">{business.licenses.wa}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-bold text-xs">ID</span>
                    <span className="text-gray-600 text-sm font-mono">{business.licenses.id}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Fully Bonded &amp; Insured</p>
                </div>
              </div>

              <a
                href={`tel:${business.phoneTel}`}
                className="block w-full bg-orange-500 text-white text-center px-8 py-5 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
              >
                Request a Bid — {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
