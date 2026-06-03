import { ImageResponse } from "next/og";
import { business } from "@/config/business";

export const runtime = "nodejs";
export const alt = `${business.name} — ${business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #2563eb, #3b82f6, #f97316)",
            display: "flex",
          }}
        />

        {/* Business name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: "16px",
            display: "flex",
          }}
        >
          {business.name}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: "40px",
            display: "flex",
          }}
        >
          {business.tagline}
        </div>

        {/* Highlights row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: "#3b82f6", display: "flex" }}>
              Excavation
            </div>
            <div style={{ fontSize: 14, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex" }}>
              Site Prep & Grading
            </div>
          </div>
          <div style={{ width: "1px", height: "48px", background: "#334155", display: "flex" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: "#3b82f6", display: "flex" }}>
              Concrete
            </div>
            <div style={{ fontSize: 14, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex" }}>
              Driveways · Slabs · Patios
            </div>
          </div>
          <div style={{ width: "1px", height: "48px", background: "#334155", display: "flex" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: "#f97316", display: "flex" }}>
              Free
            </div>
            <div style={{ fontSize: 14, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex" }}>
              On-Site Estimates
            </div>
          </div>
        </div>

        {/* Phone */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: 22,
            color: "#f97316",
            fontWeight: 700,
            display: "flex",
          }}
        >
          Call {business.phone} — Free Estimates
        </div>
      </div>
    ),
    { ...size }
  );
}
