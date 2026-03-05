import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  name: string;
  phone: string;
  address?: string;
  service?: string;
  bestTime?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landingPage?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Log lead for now — replace with TradeWorker backend integration
    console.log("[LEAD]", {
      timestamp: new Date().toISOString(),
      name: body.name,
      phone: body.phone,
      address: body.address || "",
      service: body.service || "",
      bestTime: body.bestTime || "",
      utm_source: body.utm_source || "",
      utm_medium: body.utm_medium || "",
      utm_campaign: body.utm_campaign || "",
      landingPage: body.landingPage || "",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
