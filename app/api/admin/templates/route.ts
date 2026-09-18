import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';

async function getUniqueSlug(baseSlug: string): Promise<string> {
  let slug = slugify(baseSlug);
  let counter = 1;
  while (true) {
    const existing = await prisma.template.findUnique({ where: { slug } });
    if (!existing) return slug;
    slug = `${slugify(baseSlug)}-${counter}`;
    counter++;
  }
}

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      where: { deletedAt: null },
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json(templates);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const uniqueSlug = await getUniqueSlug(data.slug || data.name);

    const template = await prisma.template.create({
      data: {
        name: data.name,
        slug: uniqueSlug,
        university: data.university,
        degree: data.degree,
        category: data.category,
        shortDescription: data.shortDescription,
        thumbnailImage: data.thumbnailImage,
        previewImages: data.previewImages || [],
        badge: data.badge,
        isFeatured: data.isFeatured || false,
        displayOrder: parseInt(data.displayOrder) || 0,
        status: data.status,
      }
    });

    return NextResponse.json(template, { status: 201 });
  } catch (error: any) {
    console.error('Template Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
