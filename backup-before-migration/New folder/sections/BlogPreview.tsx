import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { SectionHeader } from "@/components/SectionHeader";
import { featuredPosts } from "@/lib/site-data";

export function BlogPreview() {
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
            <BlogCard post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
