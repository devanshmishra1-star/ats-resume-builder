import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: legalPages.privacy.description,
  path: "/privacy/"
});

export default function PrivacyPage() {
  return <LegalPage pageKey="privacy" />;
}
