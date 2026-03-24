import { type NextRequest, NextResponse } from "next/server";

export type ContactFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  city: string;
  service?: string;
  message?: string;
};

export type ContactResponse = {
  success: boolean;
  message: string;
};

const REQUIRED_FIELDS: (keyof ContactFormData)[] = [
  "firstName",
  "lastName",
  "phone",
  "city",
];

function validatePhone(phone: string): boolean {
  // Accept digits, spaces, dashes, parens, plus — at least 7 digits
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: string): string {
  return value.trim().slice(0, 1000);
}

export async function POST(req: NextRequest): Promise<NextResponse<ContactResponse>> {
  try {
    const body = await req.json();

    // Honeypot check — if a hidden field is filled, it's a bot
    if (body.website) {
      // Return success to not reveal the trap
      return NextResponse.json(
        { success: true, message: "Thank you! We'll be in touch within 24 hours." },
        { status: 200 }
      );
    }

    // Validate required fields
    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
        return NextResponse.json(
          { success: false, message: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    const data: ContactFormData = {
      firstName: sanitize(body.firstName),
      lastName: sanitize(body.lastName),
      phone: sanitize(body.phone),
      email: body.email ? sanitize(body.email) : undefined,
      city: sanitize(body.city),
      service: body.service ? sanitize(body.service) : undefined,
      message: body.message ? sanitize(body.message) : undefined,
    };

    // Validate phone
    if (!validatePhone(data.phone)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (data.email && !validateEmail(data.email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Log the lead (in production, this would send to email, CRM, or database)
    console.log("[LEAD]", JSON.stringify(data, null, 2));

    return NextResponse.json(
      { success: true, message: "Thank you! We'll be in touch within 24 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please call us directly." },
      { status: 500 }
    );
  }
}
