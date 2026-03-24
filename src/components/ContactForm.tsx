"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/config/services";
import type { ContactResponse } from "@/app/api/contact/route";

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: ContactResponse = await res.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please call us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-black mb-2">Estimate Request Sent!</h2>
        <p className="text-gray-600 mb-6">
          We&apos;ll get back to you within 24 hours. For faster service, give us a call.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
      <p className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
        Book Online
      </p>
      <h2 className="text-2xl font-black mb-2">Get Your Free Estimate</h2>
      <p className="text-gray-500 text-sm mb-6">Takes 30 seconds. No obligation.</p>

      {status === "error" && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute opacity-0 pointer-events-none h-0 w-0"
        />

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
              autoComplete="given-name"
              className={inputClass}
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
              autoComplete="family-name"
              className={inputClass}
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
            autoComplete="tel"
            placeholder="(509) 555-1234"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
            Email <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
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
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-bold text-gray-700 mb-1">
            Service Needed
          </label>
          <select id="service" name="service" className={inputClass}>
            <option value="">Select a service...</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value="other">Other / Not Sure</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">
            Project Details <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell us about your project..."
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-blue-600 text-white px-8 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Get My Free Estimate"
          )}
        </button>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-1">
          <span>We respond within 24 hours</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>No spam, ever</span>
        </div>
      </form>
    </div>
  );
}
