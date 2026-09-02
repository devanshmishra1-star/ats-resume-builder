import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cookie Policy",
  description: legalPages.cookies.description,
  path: "/cookies/"
});

export default function CookiesPage() {
  return <LegalPage pageKey="cookies" />;
}
