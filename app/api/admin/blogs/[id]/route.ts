import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id },
    });
    if (!blog) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const existingBlog = await prisma.blog.findUnique({ where: { id } });
    const isNowPublished = data.status === 'PUBLISHED' && existingBlog?.status !== 'PUBLISHED';

    
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        featuredImage: data.featuredImage,
        content: data.content,
        category: data.category,
        tags: data.tags || [],
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        canonicalUrl: data.canonicalUrl,
        ogImage: data.ogImage,
        faqSection: data.faqSection || [],
        author: data.author,
        status: data.status,
        readTime: data.readTime,
        publishedAt: isNowPublished ? new Date() : undefined,
      }
    });
    
    return NextResponse.json(blog);
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
