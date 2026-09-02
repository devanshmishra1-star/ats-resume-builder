import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q');

  if (!q) {
    return NextResponse.json({ blogs: [], templates: [] });
  }

  try {
    const [blogs, templates] = await Promise.all([
      prisma.blog.findMany({
        where: {
          status: 'PUBLISHED',
          deletedAt: null,
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { content: { contains: q, mode: 'insensitive' } },
            { tags: { has: q } }
          ]
        },
        select: { id: true, title: true, slug: true, featuredImage: true, category: true, readTime: true, publishedAt: true },
        take: 10
      }),
      prisma.template.findMany({
        where: {
          status: 'PUBLISHED',
          deletedAt: null,
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { category: { contains: q, mode: 'insensitive' } },
            { university: { contains: q, mode: 'insensitive' } }
          ]
        },
        select: { id: true, name: true, slug: true, thumbnailImage: true, category: true, badge: true },
        take: 10
      })
    ]);

    return NextResponse.json({ blogs, templates });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
