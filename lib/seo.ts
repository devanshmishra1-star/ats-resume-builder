import type { Metadata } from "next";
import { site } from "@/lib/site-data";

type PageMetadata = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "/",
  image = "/assets/ats-resume-guide-cover.png",
  type = "website",
  noIndex = false
}: PageMetadata): Metadata {
  const url = new URL(path, site.url).toString();
  const imageUrl = new URL(image, site.url).toString();

  return {
    title,
    description,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: site.name,
      images: [{ url: imageUrl }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.name,
        url: site.url,
        logo: `${site.url}/favicon.svg`
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: site.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.url}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
}
