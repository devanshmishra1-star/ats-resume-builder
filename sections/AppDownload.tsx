import Link from "next/link";
import { Smartphone } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export function AppDownload() {
  return (
    <section className="content-section app-download-section" id="app-download">
      <div className="container app-download">
        <SectionHeader
          kicker="Android App"
          title="Resume work that can travel with you."
          copy="Download our Android app to build, edit, and export your resume on the go."
        />
        <Link className="button-primary" href="https://play.google.com/store/apps/details?id=com.dmappstudios.resumebuilder" target="_blank" rel="noopener noreferrer" aria-label="Download from Google Play">
          <Smartphone size={17} aria-hidden="true" />
          Get it on Google Play
        </Link>
      </div>
    </section>
  );
}
