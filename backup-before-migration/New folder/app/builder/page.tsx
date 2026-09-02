import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Build Resume",
  description: "Create your ATS-friendly resume with the Modern template.",
  path: "/builder/",
  image: "/assets/modern-resume-template.png"
});

type BuilderPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BuilderPage({ searchParams }: BuilderPageProps) {
  const params = searchParams ? await searchParams : {};
  const query = new URLSearchParams({ builder: "1" });
  const template = Array.isArray(params.template) ? params.template[0] : params.template;

  if (template) {
    query.set("template", template);
  }

  return (
    <main className="builder-route" aria-label="ATS Resume Builder">
      <iframe
        title="ATS Resume Builder"
        src={`/legacy/index.html?${query.toString()}`}
        allow="clipboard-write"
      />
    </main>
  );
}
