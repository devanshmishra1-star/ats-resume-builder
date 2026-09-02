import { FileCheck2, LayoutTemplate, MonitorSmartphone, Zap, Printer, MousePointerClick } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const features = [
  {
    title: "WYSIWYG Live Preview",
    text: "Your resume updates instantly in a fixed A4 layout as you type. No more guessing.",
    icon: MonitorSmartphone
  },
  {
    title: "Lightning Fast Editing",
    text: "Jump between sections instantly. Add experience, education, and skills with zero lag.",
    icon: Zap
  },
  {
    title: "One-Click PDF Export",
    text: "Download a pixel-perfect, ATS-friendly PDF directly from your browser in seconds.",
    icon: Printer
  },
  {
    title: "ATS-Optimized Structure",
    text: "Built with standard semantic headings and hierarchies that parsing algorithms love.",
    icon: FileCheck2
  },
  {
    title: "Premium Templates",
    text: "Start with university-approved formats like LPU Official, IIT, and more.",
    icon: LayoutTemplate
  },
  {
    title: "No Sign-up Friction",
    text: "Dive straight into the builder and start typing. We value your time.",
    icon: MousePointerClick
  }
];

export function Features() {
  return (
    <section className="content-section" id="features">
      <div className="container">
        <SectionHeader
          kicker="Powerful Features"
          title="A real-time builder designed for speed."
          copy="We removed all the friction so you can focus on writing a great resume, not fighting with formatting."
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
