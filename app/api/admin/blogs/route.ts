import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';
import { sanitizeHtml } from '@/lib/security';
import { revalidatePath } from 'next/cache';

async function getUniqueSlug(baseSlug: string): Promise<string> {
  let slug = slugify(baseSlug);
  let counter = 1;
  while (true) {
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (!existing) return slug;
    slug = `${slugify(baseSlug)}-${counter}`;
    counter++;
  }
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const uniqueSlug = await getUniqueSlug(data.slug || data.title);

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: uniqueSlug,
        featuredImage: data.featuredImage,
        content: sanitizeHtml(data.content),
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
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      }
    });

    revalidatePath('/blog');
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error('Blog Create Error Details:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
