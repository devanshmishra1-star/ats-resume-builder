import { SectionHeader } from "@/components/SectionHeader";

const features = [
  {
    icon: "⚡",
    title: "Real-time Live Preview",
    description: "Every change updates the resume instantly in a fixed A4 layout."
  },
  {
    icon: "📄",
    title: "One-click PDF Export",
    description: "Generate a clean, print-ready PDF in seconds."
  },
  {
    icon: "🎯",
    title: "ATS-Friendly Formatting",
    description: "Proper hierarchy, spacing and structure for better ATS readability."
  },
  {
    icon: "🏫",
    title: "University-specific Templates",
    description: "Official templates for LPU, IITs and more universities."
  },
  {
    icon: "⚙️",
    title: "No Formatting Required",
    description: "Focus on your content while the builder handles formatting automatically."
  },
  {
    icon: "🚀",
    title: "Fast & Beginner Friendly",
    description: "Create a professional resume in just a few minutes."
  }
];

export function Testimonials() {
  return (
    <section className="content-section muted-section" id="why-choose-us">
      <div className="container">
        <SectionHeader
          kicker="Features"
          title="Why Students Choose ATS Resume Builder"
          copy="Everything you need to build a professional ATS-friendly resume without formatting headaches."
        />
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
