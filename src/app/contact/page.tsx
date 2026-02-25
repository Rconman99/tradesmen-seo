import type { Metadata } from "next";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: `Contact Us — Free Estimates`,
  description: `Contact ${business.shortName} for a free estimate. Call ${business.phone} or fill out our online form. Serving Eastern Washington and Northern Idaho.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-slate-300">
            Get a free estimate for your project. We respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Request a Free Estimate
              </h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    City / Location *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="e.g., Spokane, WA"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  >
                    <option value="">Select a service...</option>
                    <option value="concrete-cutting">Concrete Cutting</option>
                    <option value="core-drilling">Core Drilling</option>
                    <option value="wall-sawing">Wall Sawing</option>
                    <option value="concrete-removal">
                      Concrete Removal &amp; Demolition
                    </option>
                    <option value="concrete-scanning">
                      Concrete Scanning (GPR)
                    </option>
                    <option value="flat-sawing">Flat Sawing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-400 transition-colors"
                >
                  Request Free Estimate
                </button>
                <p className="text-xs text-slate-400 text-center">
                  We typically respond within 24 hours.
                </p>
              </form>
            </div>

            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

              <div className="space-y-6">
                <div className="bg-amber-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-2">Call Us</h3>
                  <a
                    href={`tel:${business.phoneTel}`}
                    className="text-2xl font-bold text-amber-600 hover:text-amber-700"
                  >
                    {business.phone}
                  </a>
                  <p className="text-sm text-slate-600 mt-1">
                    Mon-Fri: {business.hours.weekdays}
                    <br />
                    Sat: {business.hours.saturday}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-2">Email</h3>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    {business.email}
                  </a>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-2">Location</h3>
                  <p>
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state}{" "}
                    {business.address.zip}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-2">
                    Licenses
                  </h3>
                  <p className="text-sm">
                    WA License: {business.licenses.wa}
                    <br />
                    ID License: {business.licenses.id}
                    <br />
                    Fully Bonded &amp; Insured
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
