import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

interface LeadData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  size: string;
  budget: string;
  timeline: string;
  reference: string;
  ready: string;
  contact_preference: string;
  created_at: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, description, size, budget, timeline, reference, ready, contactPreference } = body;

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
      description: description || "",
      size: size || "",
      budget: budget || "",
      timeline: timeline || "",
      reference: reference || "",
      ready: ready || "",
      contact_preference: contactPreference || "",
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

    const leads = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url);
        const data = (await response.json()) as LeadData;
        return { url: blob.url, ...data };
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

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, password } = body;

    if (
      !process.env.ADMIN_PASSWORD ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!url) {
      return NextResponse.json(
        { error: "Blob URL is required." },
        { status: 400 }
      );
    }

    await del(url);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete lead." },
      { status: 500 }
    );
  }
}
