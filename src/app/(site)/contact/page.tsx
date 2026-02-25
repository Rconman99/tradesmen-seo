import type { Metadata } from "next";
import { business } from "@/config/business";
import { services } from "@/config/services";

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
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Book Online</p>
              <h2 className="text-2xl font-black mb-6">Request a Free Estimate</h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-1">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="e.g., Spokane, WA"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-bold text-gray-700 mb-1">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>{s.name}</option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:scale-[1.02]"
                >
                  Request Free Estimate
                </button>
                <p className="text-xs text-gray-400 text-center">
                  We typically respond within 24 hours.
                </p>
              </form>
            </div>

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
