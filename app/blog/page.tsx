import { BlogCard } from "@/components/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

export const metadata = createMetadata({
  title: "Resume Guides & Career Advice",
  description:
    "Read practical resume guides, ATS tips, interview advice, and career articles from ATS Resume Builder.",
  path: "/blog/"
});

export default async function BlogIndexPage() {
  const blogs = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
  });

  // Map to match the existing BlogCard prop structure
  const formattedBlogs = blogs.map(blog => ({
    slug: blog.slug,
    category: blog.category,
    title: blog.title,
    description: blog.metaDescription || '',
    readTime: blog.readTime || '',
    image: blog.featuredImage ? blog.featuredImage.replace('/assets/', '') : '',
    advice: [],
  }));

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
            {formattedBlogs.map((post) => (
              <BlogCard post={post as any} key={post.slug} />
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
