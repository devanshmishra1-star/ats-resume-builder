import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const template = await prisma.template.findUnique({
      where: { id },
    });
    if (!template) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    return NextResponse.json(template);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const template = await prisma.template.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
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
    
    return NextResponse.json(template);
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.template.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
