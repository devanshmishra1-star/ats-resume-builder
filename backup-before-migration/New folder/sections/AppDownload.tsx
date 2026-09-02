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
          copy="The web builder stays available today while the Android app link is prepared for release."
        />
        <Link className="button-primary" href="/#app-download" aria-label="Google Play link coming soon">
          <Smartphone size={17} aria-hidden="true" />
          Google Play Coming Soon
        </Link>
      </div>
    </section>
  );
}
