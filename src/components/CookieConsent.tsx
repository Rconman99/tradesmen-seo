"use client";

import { useEffect, useState } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = document.cookie
      .split("; ")
      .find((c) => c.startsWith("cookie_consent="));
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function setCookie(value: string) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `cookie_consent=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    setVisible(false);
  }

  function handleAccept() {
    setCookie("accepted");
    window.dispatchEvent(new Event("cookie_consent_accepted"));
  }

  function handleDecline() {
    setCookie("declined");
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-slate-600 flex-1">
          We use cookies to improve your experience and measure site performance.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-[var(--brand-blue)] px-4 py-2 text-sm font-medium text-white hover:brightness-110 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
