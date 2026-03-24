import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validLead = {
  firstName: "John",
  lastName: "Doe",
  phone: "(509) 555-1234",
  city: "Spokane, WA",
  email: "john@example.com",
  service: "concrete-cutting",
  message: "Need a driveway cut",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 200 with success for valid submission", async () => {
    const res = await POST(makeRequest(validLead));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.message).toContain("24 hours");
  });

  it("returns 200 without required email", async () => {
    const { email, ...noEmail } = validLead;
    const res = await POST(makeRequest(noEmail));
    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
  });

  it("returns 200 without optional message and service", async () => {
    const { message, service, ...minimal } = validLead;
    const res = await POST(makeRequest(minimal));
    expect(res.status).toBe(200);
    expect((await res.json()).success).toBe(true);
  });

  it("returns 400 when firstName is missing", async () => {
    const { firstName, ...noFirst } = validLead;
    const res = await POST(makeRequest(noFirst));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.message).toContain("firstName");
  });

  it("returns 400 when lastName is missing", async () => {
    const { lastName, ...noLast } = validLead;
    const res = await POST(makeRequest(noLast));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.message).toContain("lastName");
  });

  it("returns 400 when phone is missing", async () => {
    const { phone, ...noPhone } = validLead;
    const res = await POST(makeRequest(noPhone));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.message).toContain("phone");
  });

  it("returns 400 when city is missing", async () => {
    const { city, ...noCity } = validLead;
    const res = await POST(makeRequest(noCity));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.message).toContain("city");
  });

  it("returns 400 for empty string required fields", async () => {
    const res = await POST(makeRequest({ ...validLead, firstName: "   " }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid phone number", async () => {
    const res = await POST(makeRequest({ ...validLead, phone: "123" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toContain("phone");
  });

  it("accepts various phone formats", async () => {
    const formats = [
      "5095551234",
      "+1 509 555 1234",
      "(509) 555-1234",
      "509-555-1234",
    ];
    for (const phone of formats) {
      const res = await POST(makeRequest({ ...validLead, phone }));
      expect(res.status).toBe(200);
    }
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(makeRequest({ ...validLead, email: "notanemail" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.message).toContain("email");
  });

  it("silently accepts honeypot submissions (bot trap)", async () => {
    const res = await POST(makeRequest({ ...validLead, website: "http://spam.com" }));
    const json = await res.json();
    // Returns success to not reveal the trap, but doesn't process
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });

  it("returns 500 for malformed JSON", async () => {
    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("sanitizes and truncates long input", async () => {
    const longMessage = "x".repeat(2000);
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const res = await POST(makeRequest({ ...validLead, message: longMessage }));
    expect(res.status).toBe(200);

    // The logged data should have truncated message
    const loggedData = JSON.parse(spy.mock.calls[0][1]);
    expect(loggedData.message.length).toBe(1000);
    spy.mockRestore();
  });
});
