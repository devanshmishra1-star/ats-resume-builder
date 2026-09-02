import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const [blogs, templates] = await Promise.all([
    prisma.blog.findMany({
      where: { status: 'PUBLISHED', deletedAt: null },
      orderBy: { publishedAt: 'desc' },
      take: 20
    }),
    prisma.template.findMany({
      where: { status: 'PUBLISHED', deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 20
    })
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ats-resume.com';

  const items = [
    ...blogs.map(b => ({
      title: b.title,
      link: `${siteUrl}/blog/${b.slug}`,
      description: b.metaDescription || b.title,
      date: b.publishedAt || b.createdAt
    })),
    ...templates.map(t => ({
      title: t.name,
      link: `${siteUrl}/templates`,
      description: t.shortDescription || t.name,
      date: t.createdAt
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>ATS Resume Builder Updates</title>
    <link>${siteUrl}</link>
    <description>Latest blogs and templates from ATS Resume Builder</description>
    ${items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.date.toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
