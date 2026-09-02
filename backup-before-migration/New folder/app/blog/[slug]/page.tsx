import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { blogPosts, site } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const sections = [
  "Introduction",
  "Core approach",
  "Practical steps",
  "Common mistakes to avoid",
  "Examples and practical checklist",
  "Frequently asked questions",
  "Conclusion"
];

function findPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) {
    return createMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}/`,
      noIndex: true
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    image: `/assets/${post.image}`,
    type: "article"
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) notFound();

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 4);
  const previous = related[0];
  const next = related[1];

  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: "2026-07-11",
              dateModified: "2026-07-11",
              author: {
                "@type": "Organization",
                name: site.name
              },
              mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
              image: `${site.url}/assets/${post.image}`
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog/` },
                { "@type": "ListItem", position: 3, name: post.title }
              ]
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How can I improve this resume?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Use a clear structure, relevant evidence, and language that matches the job requirements."
                  }
                }
              ]
            }
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
                Published: July 11, 2026 / Updated: July 11, 2026 / Author: ATS Resume Builder
              </p>
              <Image
                className="article-image"
                src={`/assets/${post.image}`}
                alt={`${post.title} guide`}
                width={1200}
                height={630}
                priority
                sizes="(max-width: 900px) calc(100vw - 32px), 760px"
              />
              {sections.map((section, index) => {
                const advice = index === 0 ? post.description : post.advice[(index - 1) % post.advice.length];

                return (
                  <section id={`section-${index}`} key={section}>
                    <h2>{section}</h2>
                    <p>{advice}</p>
                    <p>
                      Apply this advice to the requirements of each role instead of
                      copying a generic version. Keep your claims accurate, use
                      evidence that you can explain, and review the final document
                      before sending it.
                    </p>
                    {index === 2 ? (
                      <ul>
                        <li>Start with the role requirements and choose evidence that supports them.</li>
                        <li>Use concrete results, tools, and examples wherever they are available.</li>
                        <li>Keep wording clear enough for both a recruiter and an applicant tracking system.</li>
                      </ul>
                    ) : null}
                    {index === 4 ? (
                      <table>
                        <thead>
                          <tr>
                            <th>Do</th>
                            <th>Avoid</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Use specific results and relevant evidence</td>
                            <td>Generic claims without proof</td>
                          </tr>
                          <tr>
                            <td>Use clear, standard formatting</td>
                            <td>Complex layouts that hide important details</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : null}
                  </section>
                );
              })}
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
            <aside className="toc">
              <strong>Contents</strong>
              {sections.map((section, index) => (
                <a href={`#section-${index}`} key={section}>
                  {section}
                </a>
              ))}
            </aside>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
