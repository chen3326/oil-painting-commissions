import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

interface LeadData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  size: string;
  ready: string;
  created_at: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, size, ready } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const leadData: LeadData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject || "",
      size: size || "",
      ready: ready || "",
      created_at: new Date().toISOString(),
    };

    await put(`leads/${Date.now()}.json`, JSON.stringify(leadData), {
      contentType: "application/json",
      access: "public",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: "leads/" });

    const leads: LeadData[] = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url);
        return response.json() as Promise<LeadData>;
      })
    );

    // Sort newest first
    leads.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json(leads);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}
