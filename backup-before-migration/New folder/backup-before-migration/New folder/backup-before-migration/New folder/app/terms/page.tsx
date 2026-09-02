import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description: legalPages.terms.description,
  path: "/terms/"
});

export default function TermsPage() {
  return <LegalPage pageKey="terms" />;
}
