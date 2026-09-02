import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { templateNames } from "@/lib/site-data";

export function Templates() {
  return (
    <section className="content-section muted-section" id="templates">
      <div className="container">
        <SectionHeader
          kicker="Resume Templates"
          title="Choose a template with a professional edge."
          copy="Modern is ready to use today. The next collection is being crafted with the same ATS-first standard."
        />
        <div className="template-grid">
          <article className="template-card template-card-live">
            <div className="template-preview">
              <Image
                src="/assets/modern-resume-template-640.webp"
                alt="Modern ATS-friendly resume template preview"
                width={640}
                height={900}
                sizes="(max-width: 760px) calc(100vw - 32px), 360px"
              />
            </div>
            <div className="template-body">
              <div>
                <p className="template-label">ATS Friendly</p>
                <h3>Modern Template</h3>
              </div>
              <div className="template-actions">
                <Link className="button-secondary" href="/builder/?template=modern">
                  <Eye size={16} aria-hidden="true" />
                  Preview
                </Link>
                <Link className="button-primary" href="/builder/?template=modern">
                  Use Template
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
          {templateNames.map((name) => (
            <article className="template-card is-coming" key={name}>
              <div className="coming-template">
                <Sparkles size={20} aria-hidden="true" />
                <span>Coming Soon</span>
              </div>
              <div className="template-body">
                <div>
                  <p className="template-label">In progress</p>
                  <h3>{name}</h3>
                </div>
                <button className="button-secondary" type="button" disabled>
                  Coming Soon
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
