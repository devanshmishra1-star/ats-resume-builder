import { FileCheck2, LayoutTemplate, MonitorSmartphone, PenLine, Printer, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const features = [
  {
    title: "Live A4 preview",
    text: "See your content update in a clean, fixed-page layout as you work.",
    icon: MonitorSmartphone
  },
  {
    title: "Export with confidence",
    text: "Print or save a polished PDF directly from the browser.",
    icon: Printer
  },
  {
    title: "Section-wise builder",
    text: "Move through personal details, experience, projects, certificates, skills, and education.",
    icon: PenLine
  },
  {
    title: "ATS-friendly structure",
    text: "Clear headings, readable hierarchy, and practical formatting for real applications.",
    icon: FileCheck2
  },
  {
    title: "Template foundation",
    text: "Modern is available today, with room for more professionally designed templates.",
    icon: LayoutTemplate
  },
  {
    title: "Protected builder logic",
    text: "The existing builder runtime is preserved exactly so the working flow stays familiar.",
    icon: ShieldCheck
  }
];

export function Features() {
  return (
    <section className="content-section" id="features">
      <div className="container">
        <SectionHeader
          kicker="Everything you need"
          title="A simpler path to an application-ready resume."
          copy="Designed for clarity from the first line to your finished PDF."
        />
        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
