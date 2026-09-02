import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Disclaimer",
  description: legalPages.disclaimer.description,
  path: "/disclaimer/"
});

export default function DisclaimerPage() {
  return <LegalPage pageKey="disclaimer" />;
}
