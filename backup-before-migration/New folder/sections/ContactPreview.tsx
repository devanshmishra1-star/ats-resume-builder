import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/lib/site-data";

const faqs = [
  {
    question: "Is my resume data stored?",
    answer:
      "The preserved builder works locally in your browser for live preview and PDF export."
  },
  {
    question: "Is the Modern template ATS-friendly?",
    answer:
      "Yes. It uses clear headings, readable text, and a structured layout designed for common application workflows."
  },
  {
    question: "Can I use this on mobile?",
    answer:
      "Yes. The surrounding experience and builder adapt across phones, tablets, and desktop screens."
  }
];

export function ContactPreview() {
  return (
    <section className="content-section" id="contact">
      <div className="container">
        <SectionHeader
          kicker="Contact Us"
          title="Need help or want to share feedback?"
          copy="For resume builder support, Android app updates, partnership questions, website feedback, or ad-related queries, contact us anytime."
        />
        <div className="contact-strip">
          <Link href={`mailto:${site.email}`}>
            <Mail size={17} aria-hidden="true" />
            {site.email}
          </Link>
          <Link href="tel:+919569351187">
            <Phone size={17} aria-hidden="true" />
            {site.phone}
          </Link>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
