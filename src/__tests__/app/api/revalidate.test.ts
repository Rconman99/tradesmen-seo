import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/cache
const mockRevalidateTag = vi.fn();
vi.mock("next/cache", () => ({
  revalidateTag: mockRevalidateTag,
}));

// Mock next-sanity/webhook
const mockParseBody = vi.fn();
vi.mock("next-sanity/webhook", () => ({
  parseBody: mockParseBody,
}));

const { POST } = await import("@/app/api/revalidate/route");

function makeRequest(body?: object) {
  return new Request("https://example.com/api/revalidate", {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SANITY_REVALIDATE_SECRET = "test-secret";
  });

  it("returns 500 when SANITY_REVALIDATE_SECRET is missing", async () => {
    delete process.env.SANITY_REVALIDATE_SECRET;
    const res = await POST(makeRequest() as never);
    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).toContain("SANITY_REVALIDATE_SECRET");
  });

  it("returns 401 when signature is invalid", async () => {
    mockParseBody.mockResolvedValue({
      isValidSignature: false,
      body: { _type: "post" },
    });
    const res = await POST(makeRequest() as never);
    expect(res.status).toBe(401);
  });

  it("returns 400 when body has no _type", async () => {
    mockParseBody.mockResolvedValue({
      isValidSignature: true,
      body: {},
    });
    const res = await POST(makeRequest() as never);
    expect(res.status).toBe(400);
  });

  it("returns 400 when body is null", async () => {
    mockParseBody.mockResolvedValue({
      isValidSignature: true,
      body: null,
    });
    const res = await POST(makeRequest() as never);
    expect(res.status).toBe(400);
  });

  it("returns 200 and revalidates for valid request", async () => {
    mockParseBody.mockResolvedValue({
      isValidSignature: true,
      body: { _type: "post" },
    });
    const res = await POST(makeRequest() as never);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.revalidated).toBe(true);
    expect(json.type).toBe("post");
    expect(mockRevalidateTag).toHaveBeenCalledWith("post", "default");
  });

  it("returns 500 when an unexpected error occurs", async () => {
    mockParseBody.mockRejectedValue(new Error("boom"));
    const res = await POST(makeRequest() as never);
    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).toBe("boom");
  });
});
