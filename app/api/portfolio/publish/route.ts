import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { slug, data } = await req.json();

    if (!slug || !data) {
      return NextResponse.json({ error: "Missing slug or data" }, { status: 400 });
    }

    // Clean slug
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "");

    // Check if slug exists
    const existing = await prisma.digitalPortfolio.findUnique({
      where: { slug: cleanSlug }
    });

    if (existing) {
      return NextResponse.json({ error: "Username/slug is already taken." }, { status: 400 });
    }

    // Generate edit token
    const editToken = crypto.randomBytes(32).toString("hex");

    // Save to DB
    const portfolio = await prisma.digitalPortfolio.create({
      data: {
        slug: cleanSlug,
        data: data,
        editToken: editToken,
        isPublished: true,
        isSearchable: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      portfolio: {
        slug: portfolio.slug,
        editToken: portfolio.editToken
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error("Publish Portfolio Error:", error);
    return NextResponse.json({ error: error.message || "Failed to publish portfolio" }, { status: 500 });
  }
}
