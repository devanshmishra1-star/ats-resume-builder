import Link from "next/link";
import { Home } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="section-kicker">404 error</p>
            <h1>That page is not here.</h1>
            <p>
              The link may have moved, or the address may be incorrect. Return
              home to build your resume or explore our guides.
            </p>
            <Link className="button-primary" href="/">
              <Home size={16} aria-hidden="true" />
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
