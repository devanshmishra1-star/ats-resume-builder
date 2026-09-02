import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { SectionHeader } from "@/components/SectionHeader";
import { prisma } from "@/lib/prisma";

export async function BlogPreview() {
  const blogs = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 6
  });

  const featuredPosts = blogs.map(blog => ({
    slug: blog.slug,
    category: blog.category,
    title: blog.title,
    description: blog.metaDescription || '',
    readTime: blog.readTime || '',
    image: blog.featuredImage ? blog.featuredImage.replace('/assets/', '') : '',
    advice: [],
  }));

  return (
    <section className="content-section" id="blog">
      <div className="container">
        <div className="section-row">
          <SectionHeader
            kicker="Career Journal"
            title="Practical advice for the next move."
            copy="SEO-ready career guides with direct, usable guidance for job seekers."
          />
          <Link className="button-plain" href="/blog/">
            View all guides
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="blog-grid">
          {featuredPosts.map((post) => (
            <BlogCard post={post as any} key={post.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
