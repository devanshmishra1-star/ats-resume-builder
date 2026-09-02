import { FileCheck2, GraduationCap, LayoutTemplate, MonitorSmartphone } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const cards = [
  {
    title: "Professional Templates",
    text: "Elegant layouts that feel polished and ready for university and company applications.",
    icon: LayoutTemplate
  },
  {
    title: "University Templates",
    text: "Choose structure that works for freshers, students, MBA, MCA and campus placements.",
    icon: GraduationCap
  },
  {
    title: "ATS Optimization",
    text: "Clear structure, simple hierarchy and practical formatting increase readability.",
    icon: FileCheck2
  },
  {
    title: "Live Preview",
    text: "See your resume take shape in a clean A4 preview before exporting a PDF.",
    icon: MonitorSmartphone
  }
];

export function WhyAts() {
  return (
    <section className="content-section" id="why-ats">
      <div className="container">
        <SectionHeader
          kicker="Why ATS Resume Builder"
          title="A premium experience built around clarity and trust."
          copy="The homepage now guides users naturally toward templates, live preview and confident creation."
        />
        <div className="feature-grid why-grid">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article className="feature-card why-card" key={card.title}>
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
