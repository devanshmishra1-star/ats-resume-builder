import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/site-data";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const isHttp = post.image.startsWith('http');
  const src = isHttp ? post.image : `/assets/${post.image.replace(".png", "")}-640.webp`;

  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}/`} className="blog-card-media" aria-label={post.title}>
        <Image
          src={src}
          alt={`${post.title} featured image`}
          width={640}
          height={420}
          sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1200px) 33vw, 380px"
        />
      </Link>
      <div className="blog-card-body">
        <p className="blog-meta">
          {post.category} / {post.readTime}
        </p>
        <h3>
          <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
        </h3>
        <p>{post.description}</p>
        <Link className="text-link" href={`/blog/${post.slug}/`}>
          Read guide
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
