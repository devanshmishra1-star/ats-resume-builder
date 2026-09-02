import type { MetadataRoute } from "next";
import { site } from "@/lib/site-data";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "builder/",
    "about/",
    "contact/",
    "blog/",
    "privacy/",
    "terms/",
    "cookies/",
    "disclaimer/"
  ];

  const blogs = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true, publishedAt: true },
  });

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}/${route}`,
      lastModified: new Date("2026-07-11"),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8
    })),
    ...blogs.map((post) => ({
      url: `${site.url}/blog/${post.slug}/`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
