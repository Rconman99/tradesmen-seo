"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/config/services";
import { trackLeadSubmission } from "@/lib/analytics";

interface LeadFormProps {
  service: string;
  city: string;
}

export function LeadForm({ service, city }: LeadFormProps) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      service: formData.get("service") as string,
      bestTime: formData.get("bestTime") as string,
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      landingPage: `/lp/${service}/${city}`,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      trackLeadSubmission(service, city);
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">We Got Your Info!</h3>
        <p className="text-green-700">
          A team member will call you shortly to schedule your free inspection.
        </p>
      </div>
    );
  }

  const defaultService = services.find((s) => s.slug === service)?.name || "";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
          Phone *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          autoComplete="tel"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          placeholder="(801) 555-0000"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">
          Property Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          autoComplete="street-address"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          placeholder="123 Main St"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-1">
          Service Needed
        </label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        >
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="bestTime" className="block text-sm font-semibold text-gray-700 mb-1">
          Best Time to Call
        </label>
        <select
          id="bestTime"
          name="bestTime"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        >
          <option value="morning">Morning (8am - 12pm)</option>
          <option value="afternoon">Afternoon (12pm - 5pm)</option>
          <option value="evening">Evening (5pm - 7pm)</option>
          <option value="anytime">Anytime</option>
        </select>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-[var(--brand-orange)] px-6 py-4 text-lg font-bold text-white shadow-lg hover:brightness-110 focus:ring-2 focus:ring-orange-300 disabled:opacity-60 transition glow-orange"
      >
        {status === "submitting" ? "Sending..." : "Get Your Free Inspection →"}
      </button>

      <p className="text-xs text-center text-gray-500">
        No spam. We&apos;ll call to schedule your free inspection.
      </p>
    </form>
  );
}
