import type { Metadata } from "next";
import { BuilderFrame } from "@/components/BuilderFrame";
import { createMetadata } from "@/lib/seo";
import Link from "next/link";
import { Home } from "lucide-react";
import fs from "fs";
import path from "path";

export const metadata: Metadata = createMetadata({
  title: "Build Resume",
  description: "Create your ATS-friendly resume with the LPU Official Format template.",
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

  // Default to the original monolithic builder
  let builderFile = "index.html";

  if (template) {
    query.set("template", template);
    
    // Check if a specific builder file exists for this template in public/legacy/
    const templateFilePath = path.join(process.cwd(), "public", "legacy", `${template}.html`);
    if (fs.existsSync(templateFilePath)) {
      builderFile = `${template}.html`;
    }
  }
  if (params.edit) query.set("edit", "true");
  if (params.print) query.set("print", "true");
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (id) query.set("id", id);

  // Removed cache-busting to allow instant loading of the builder iframe
  const builderSrc = `/legacy/${builderFile}?${query.toString()}`;

  return (
    <main aria-label="ATS Resume Builder" className="relative">
      <BuilderFrame src={builderSrc} title="ATS Resume Builder" />
    </main>
  );
}
