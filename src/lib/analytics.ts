/**
 * Analytics helpers — push events to GTM's dataLayer.
 * All functions are safe to call server-side (no-op when window is undefined).
 */

type EventParams = Record<string, string>;

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

function pushEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

export function trackEvent(name: string, params?: EventParams) {
  pushEvent(name, params);
}

export function trackLeadSubmission(service: string, city: string) {
  pushEvent("lead_submission", { service, city });
}

export function trackPhoneClick(phoneNumber: string) {
  pushEvent("phone_click", { phoneNumber });
}

export function trackCTAClick(label: string) {
  pushEvent("cta_click", { label });
}
