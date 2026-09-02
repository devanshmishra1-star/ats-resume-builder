import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = createMetadata({
  title: "Contact ATS Resume Builder | Support",
  description:
    "Contact ATS Resume Builder for help, feedback, or questions about creating an ATS-friendly resume.",
  path: "/contact/"
});

export default function ContactPage() {
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact ATS Resume Builder",
          url: `${site.url}/contact/`,
          description: metadata.description
        }}
      />
      <main>
        <PageHero
          eyebrow="Contact"
          title="We're here to help."
          lead="Send a question, report an issue, or share feedback about ATS Resume Builder."
        />
        <section className="content-section">
          <div className="container contact-layout">
            <ContactForm />
            <aside className="support-panel">
              <h2>Support details</h2>
              <p>
                <Link href={`mailto:${site.email}`}>
                  <Mail size={16} aria-hidden="true" />
                  {site.email}
                </Link>
              </p>
              <p>
                <Link href="tel:+919569351187">
                  <Phone size={16} aria-hidden="true" />
                  {site.phone}
                </Link>
              </p>
              <p>Typical response time: 1-2 business days.</p>
              <div className="faq-list compact">
                <details>
                  <summary>Is the resume builder free to use?</summary>
                  <p>You can use the available builder and LPU Official Format template directly from the site.</p>
                </details>
                <details>
                  <summary>How do I download my resume?</summary>
                  <p>Use the PDF export option in the resume builder after reviewing your details.</p>
                </details>
                <details>
                  <summary>Can I request a new feature?</summary>
                  <p>Yes. Tell us what would make your job search easier and why.</p>
                </details>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
