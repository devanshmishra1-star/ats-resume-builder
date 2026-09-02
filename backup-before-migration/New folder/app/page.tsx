import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { createMetadata, organizationSchema } from "@/lib/seo";
import { AboutPreview } from "@/sections/AboutPreview";
import { AppDownload } from "@/sections/AppDownload";
import { BlogPreview } from "@/sections/BlogPreview";
import { ContactPreview } from "@/sections/ContactPreview";
import { Features } from "@/sections/Features";
import { Hero } from "@/sections/Hero";
import { Templates } from "@/sections/Templates";

export const metadata = createMetadata({
  title: "ATS Resume Builder - Free ATS Friendly Resume Maker with PDF Export",
  description:
    "Create a clean, ATS-friendly A4 resume online with live preview, professional sections, certificates, projects, skills, education, experience, and PDF export.",
  path: "/"
});

export default function HomePage() {
  return (
    <SiteShell>
      <JsonLd data={organizationSchema()} />
      <main>
        <Hero />
        <Features />
        <Templates />
        <BlogPreview />
        <AboutPreview />
        <AppDownload />
        <ContactPreview />
      </main>
    </SiteShell>
  );
}
