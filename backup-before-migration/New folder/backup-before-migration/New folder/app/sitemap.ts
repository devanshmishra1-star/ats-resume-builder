import type { MetadataRoute } from "next";
import { blogPosts, site } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}/${route}`,
      lastModified: new Date("2026-07-11"),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8
    })),
    ...blogPosts.map((post) => ({
      url: `${site.url}/blog/${post.slug}/`,
      lastModified: new Date("2026-07-11"),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
