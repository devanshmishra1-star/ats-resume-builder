import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { legalPages, site, type LegalPageKey } from "@/lib/site-data";

type LegalPageProps = {
  pageKey: LegalPageKey;
};

export function LegalPage({ pageKey }: LegalPageProps) {
  const page = legalPages[pageKey];

  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${page.title} | ${site.name}`,
          url: `${site.url}/${pageKey}/`,
          description: page.description,
          inLanguage: "en-US"
        }}
      />
      <main>
        <PageHero eyebrow="Legal" title={page.title} lead={page.lead} />
        <section className="content-section">
          <div className="container prose-grid">
            {page.sections.map((section) => (
              <section className="prose-card" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
