import { SectionHeader } from "@/components/SectionHeader";

const faqs = [
  {
    question: "How does ATS work?",
    answer: "ATS looks for clear structure, standard section names and readable formatting so content can be parsed reliably."
  },
  {
    question: "Do you offer resume templates?",
    answer: "Yes. The homepage highlights premium templates for students, professionals and university-focused applications."
  },
  {
    question: "Can I export a PDF?",
    answer: "Yes. The existing builder supports export and preview workflows, and the homepage now presents that clearly."
  },
  {
    question: "Is the builder easy to use?",
    answer: "The experience is intentionally simple and calm, with clear sections and live updates to guide the user."
  }
];

export function FaqSection() {
  return (
    <section className="content-section" id="faq">
      <div className="container">
        <SectionHeader
          kicker="FAQ"
          title="Everything you need to know before you begin."
          copy="Clear answers, clean spacing and straightforward product confidence."
        />
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
