import Link from "next/link";
import { ArrowRight, GraduationCap, RefreshCw, UserRound } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = createMetadata({
  title: "About ATS Resume Builder | Our Mission",
  description:
    "Learn why ATS Resume Builder helps students and professionals create clear, ATS-friendly resumes.",
  path: "/about/"
});

const audiences = [
  {
    title: "Students & freshers",
    text: "Organize education, projects, internships, and skills into a credible first resume.",
    icon: GraduationCap
  },
  {
    title: "Professionals",
    text: "Bring achievements, experience, and measurable impact into a readable format.",
    icon: UserRound
  },
  {
    title: "Career changers",
    text: "Focus attention on transferable skills and the work that supports a new direction.",
    icon: RefreshCw
  }
];

export default function AboutPage() {
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About ATS Resume Builder",
          url: `${site.url}/about/`,
          description: metadata.description
        }}
      />
      <main>
        <PageHero
          eyebrow="About us"
          title="Clear resumes for meaningful next steps."
          lead="ATS Resume Builder helps candidates turn their experience into a focused, professional document that is easy for recruiters and applicant tracking systems to read."
        />
        <section className="content-section">
          <div className="container feature-grid three">
            <article className="feature-card">
              <h2>Our mission</h2>
              <p>
                Make resume creation less intimidating and more practical, so
                every applicant can present their work with confidence.
              </p>
            </article>
            <article className="feature-card">
              <h2>Our vision</h2>
              <p>
                A job search experience where clarity, accessibility, and real
                evidence matter more than complicated design tools.
              </p>
            </article>
            <article className="feature-card">
              <h2>Why we built it</h2>
              <p>
                Great candidates are often held back by blank pages and
                inconsistent formatting. We built a straightforward way to start
                strong.
              </p>
            </article>
          </div>
        </section>
        <section className="content-section muted-section">
          <div className="container">
            <div className="section-head">
              <p className="section-kicker">Career stages</p>
              <h2 className="section-title">Built for every career stage.</h2>
            </div>
            <div className="feature-grid three">
              {audiences.map((audience) => {
                const Icon = audience.icon;
                return (
                  <article className="feature-card" key={audience.title}>
                    <span className="feature-icon" aria-hidden="true">
                      <Icon size={19} />
                    </span>
                    <h3>{audience.title}</h3>
                    <p>{audience.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="content-section">
          <div className="container split-panel">
            <div>
              <p className="section-kicker">Looking ahead</p>
              <h2 className="section-title">Built to improve without disturbing what works.</h2>
              <p className="section-copy">
                Our roadmap includes thoughtful template improvements, clearer
                guidance, and practical tools that help candidates tailor their
                story without losing accuracy.
              </p>
            </div>
            <Link className="button-primary" href="/builder/">
              Build Resume
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
