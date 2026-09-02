import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const post = await prisma.blog.findUnique({
    where: { slug }
  });

  if (!post) {
    return createMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}/`,
      noIndex: true
    });
  }

  return createMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || '',
    path: `/blog/${post.slug}/`,
    image: post.ogImage || (post.featuredImage ? post.featuredImage : undefined),
    type: "article"
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  const post = await prisma.blog.findUnique({
    where: { slug }
  });

  if (!post) notFound();

  // Get next and previous blogs
  const related = await prisma.blog.findMany({
    where: { 
      status: 'PUBLISHED',
      slug: { not: slug }
    },
    take: 2,
    orderBy: { publishedAt: 'desc' }
  });
  
  const previous = related[0];
  const next = related[1];

  const featuredImage = post.featuredImage && post.featuredImage.startsWith('http') 
    ? post.featuredImage 
    : post.featuredImage?.replace('/assets/', '') || '';

  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.metaDescription || '',
              datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
              dateModified: post.updatedAt.toISOString(),
              author: {
                "@type": "Organization",
                name: post.author || site.name
              },
              mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
              image: post.featuredImage
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog/` },
                { "@type": "ListItem", position: 3, name: post.title }
              ]
            },
            ...(Array.isArray(post.faqSection) && post.faqSection.length > 0 ? [{
              "@type": "FAQPage",
              mainEntity: post.faqSection.map((faq: any) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer
                }
              }))
            }] : [])
          ]
        }}
      />
      <main className="article-main">
        <div className="container article-shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog/">Blog</Link>
            <span>/</span>
            <span>{post.title}</span>
          </nav>
          <div className="article-layout">
            <article className="article">
              <p className="blog-meta">
                {post.category} / {post.readTime}
              </p>
              <h1>{post.title}</h1>
              <p className="article-byline">
                Published: {post.publishedAt ? post.publishedAt.toLocaleDateString() : post.createdAt.toLocaleDateString()} / Author: {post.author || 'ATS Resume Builder'}
              </p>
              {featuredImage && (
                <Image
                  className="article-image"
                  src={featuredImage.includes('http') ? featuredImage : `/assets/${featuredImage}`}
                  alt={`${post.title}`}
                  width={1200}
                  height={630}
                  priority
                  sizes="(max-width: 900px) calc(100vw - 32px), 760px"
                />
              )}
              
              <div 
                className="mt-8 prose prose-lg max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <h2>Read next</h2>
              <div className="related-grid">
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}/`}>
                    {item.title}
                  </Link>
                ))}
              </div>
              <nav className="article-nav" aria-label="Article navigation">
                {previous ? (
                  <Link href={`/blog/${previous.slug}/`}>
                    <ArrowLeft size={15} aria-hidden="true" />
                    Previous Article
                  </Link>
                ) : null}
                {next ? (
                  <Link href={`/blog/${next.slug}/`}>
                    Next Article
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                ) : null}
              </nav>
            </article>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
