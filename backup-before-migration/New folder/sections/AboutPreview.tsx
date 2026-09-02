import Link from "next/link";
import { ArrowRight, Layers, Target, Wrench } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const cards = [
  {
    title: "Built for focus",
    text: "No noisy setup. Users can directly start entering details and see the resume update live.",
    icon: Target
  },
  {
    title: "ATS-friendly structure",
    text: "Clear sections, readable hierarchy, and practical formatting for real job applications.",
    icon: Layers
  },
  {
    title: "Ready to scale",
    text: "The architecture leaves room for templates, guides, premium plans, saved resumes, and future AI features.",
    icon: Wrench
  }
];

export function AboutPreview() {
  return (
    <section className="content-section muted-section" id="about">
      <div className="container">
        <div className="section-row">
          <SectionHeader
            kicker="About Us"
            title="A premium resume tool built for clarity."
            copy="ATS Resume Builder helps users create a clean professional resume with a fixed A4 preview, organized sections, and simple PDF export."
          />
          <Link className="button-plain" href="/about/">
            Learn more
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="feature-grid three">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article className="feature-card" key={card.title}>
                <span className="feature-icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
