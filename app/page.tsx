import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { createMetadata, organizationSchema } from "@/lib/seo";
import { AboutPreview } from "@/sections/AboutPreview";
import { AppDownload } from "@/sections/AppDownload";
import { BlogPreview } from "@/sections/BlogPreview";
import { ContactPreview } from "@/sections/ContactPreview";
import { FaqSection } from "@/sections/FaqSection";
import { Features } from "@/sections/Features";
import { Hero } from "@/sections/Hero";
import { HowItWorks } from "@/sections/HowItWorks";
import { LivePreviewSection } from "@/sections/LivePreviewSection";
import { ResumeCategories } from "@/sections/ResumeCategories";
import { Templates } from "@/sections/Templates";
import { Testimonials } from "@/sections/Testimonials";
import { TrustBand } from "@/sections/TrustBand";
import { BuilderComparison } from "@/sections/BuilderComparison";
import { DashboardPreview } from "@/sections/DashboardPreview";
import { MyResumes } from "@/components/MyResumes";

export const metadata = createMetadata({
  title: "ATS Resume Builder - Free ATS Friendly Resume Maker with PDF Export",
  description:
    "Create a clean, ATS-friendly A4 resume online with live preview, professional sections, certificates, projects, skills, education, experience, and PDF export.",
  path: "/"
});

export const revalidate = 60; // Use ISR for instant caching (revalidate every minute)

export default function HomePage() {
  return (
    <SiteShell>
      <JsonLd data={organizationSchema()} />
      <main>
        <Hero />
        <MyResumes />
        <TrustBand />
        <DashboardPreview />
        <BuilderComparison />
        <HowItWorks />
        <Features />
        <Templates />
        <LivePreviewSection />
        <ResumeCategories />
        <Testimonials />
        <BlogPreview />
        <FaqSection />
        <AppDownload />
        <AboutPreview />
        <ContactPreview />
      </main>
    </SiteShell>
  );
}
