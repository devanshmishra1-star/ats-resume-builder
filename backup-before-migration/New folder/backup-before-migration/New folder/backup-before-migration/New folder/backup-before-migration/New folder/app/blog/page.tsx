import { BlogCard } from "@/components/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { blogPosts, site } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Resume Guides & Career Advice",
  description:
    "Read practical resume guides, ATS tips, interview advice, and career articles from ATS Resume Builder.",
  path: "/blog/"
});

export default function BlogIndexPage() {
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "ATS Resume Builder Blog",
          url: `${site.url}/blog/`,
          description: metadata.description
        }}
      />
      <main>
        <PageHero
          eyebrow="Career Journal"
          title="Resume guides for clear next steps."
          lead="Practical, role-aware guidance for building resumes that are readable, accurate, and easier to scan."
        />
        <section className="content-section">
          <div className="container blog-grid">
            {blogPosts.map((post) => (
              <BlogCard post={post} key={post.slug} />
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
