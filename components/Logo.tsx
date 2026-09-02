import Link from "next/link";
import { FileText } from "lucide-react";

type LogoProps = {
  href?: string;
};

export function Logo({ href = "/" }: LogoProps) {
  return (
    <Link className="site-logo-link" href={href} aria-label="ATS Resume Builder home">
      <span className="site-logo-mark" aria-hidden="true">
        <FileText size={22} strokeWidth={1.9} />
      </span>
      <span>
        <span className="site-logo-name">ATS Resume Builder</span>
        <span className="site-logo-tag">Premium A4 Resume Tool</span>
      </span>
    </Link>
  );
}
