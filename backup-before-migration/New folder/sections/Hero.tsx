import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileText, Smartphone } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";

export function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-grid">
        <MotionReveal className="hero-copy-block">
          <p className="section-kicker">ATS-ready resume generator</p>
          <h1>Create an ATS-friendly resume that looks professionally built.</h1>
          <p>
            ATS Resume Builder is a fast online resume maker for students,
            freshers, and professionals. Build a polished A4 CV with live
            preview, organized sections, clean formatting, and PDF export.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="/builder/">
              <FileText size={17} aria-hidden="true" />
              Build My Resume
            </Link>
            <Link className="button-secondary" href="/#app-download">
              <Smartphone size={17} aria-hidden="true" />
              Get Android App
            </Link>
            <Link className="button-plain" href="/#features">
              Explore Features
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08} className="hero-product">
          <div className="hero-product-toolbar">
            <span>Modern Template</span>
            <span>Live Preview</span>
          </div>
          <Image
            className="hero-template-image"
            src="/assets/modern-resume-template-960.webp"
            alt="Modern ATS-friendly resume template preview"
            width={960}
            height={1280}
            priority
            sizes="(max-width: 900px) min(100vw - 32px, 560px), 520px"
          />
          <div className="hero-product-footer">
            <span>
              <Download size={15} aria-hidden="true" />
              PDF export
            </span>
            <span>A4 layout</span>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
