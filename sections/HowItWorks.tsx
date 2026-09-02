import { ArrowRight, FileText, MonitorCheck, Printer, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  {
    title: "Choose Template",
    text: "Select a premium university or company-style layout.",
    icon: Sparkles
  },
  {
    title: "Fill Details",
    text: "Add your education, experience, skills and projects with ease.",
    icon: FileText
  },
  {
    title: "Watch Live Preview",
    text: "Watch your document update live in a clean A4 layout as you type.",
    icon: MonitorCheck
  },
  {
    title: "Download PDF",
    text: "Export a polished document ready for applications instantly.",
    icon: Printer
  }
];

export function HowItWorks() {
  return (
    <section className="content-section muted-section" id="how-it-works">
      <div className="container">
        <SectionHeader
          kicker="How Live Builder Works"
          title="From template to PDF in a few seamless steps."
          copy="Experience the fastest way to build a professional ATS resume without the formatting headache."
        />
        <div className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className="step-card" key={step.title}>
                <div className="step-index">0{index + 1}</div>
                <span className="feature-icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {index < steps.length - 1 ? <ArrowRight className="step-arrow hidden md:block" size={18} /> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
