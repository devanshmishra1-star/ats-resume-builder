import Link from "next/link";
import { ArrowRight, CheckCircle2, Eye } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export function LivePreviewSection() {
  return (
    <section className="content-section" id="live-preview">
      <div className="container preview-shell">
        <div className="preview-copy">
          <SectionHeader
            kicker="Live Resume Preview"
            title="See your document evolve in real time."
            copy="Premium layout, live updates and a strong ATS-first structure make the builder feel trustworthy from the first click."
          />
          <div className="preview-points">
            <div>
              <CheckCircle2 size={16} />
              <span>Live Preview</span>
            </div>
            <div>
              <CheckCircle2 size={16} />
              <span>Pixel Perfect PDF</span>
            </div>
            <div>
              <CheckCircle2 size={16} />
              <span>ATS Ready</span>
            </div>
          </div>
          <Link className="button-primary" href="/builder/">
            <Eye size={16} aria-hidden="true" />
            Open Builder
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="preview-card" aria-label="Resume preview mockup">
          <div className="preview-card-toolbar">
            <span className="preview-dot" />
            <span className="preview-dot" />
            <span className="preview-dot" />
          </div>
          <div className="preview-card-body">
            <div className="preview-card-header">
              <div>
                <p className="preview-eyebrow">ATS Friendly</p>
                <h3>LPU Official Format (B.Tech / BCA / MCA)</h3>
              </div>
              <span className="preview-pill">Live</span>
            </div>
            <div className="preview-lines" />
            <div className="preview-lines short" />
            <div className="preview-lines" />
            <div className="preview-lines short" />
            <div className="preview-lines" />
          </div>
        </div>
      </div>
    </section>
  );
}
