import Link from "next/link";
import { Linkedin, Mail, Send } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site-data";

const footerLinks = [
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/#templates" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Android App", href: "https://play.google.com/store/apps/details?id=com.dmappstudios.resumebuilder" },
  { label: "Privacy Policy", href: "/privacy/" },
  { label: "Terms & Conditions", href: "/terms/" },
  { label: "Cookies Policy", href: "/cookies/" },
  { label: "Disclaimer", href: "/disclaimer/" }
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Premium resume generation for web and Android, built around a clear
            ATS-friendly A4 builder.
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="footer-socials" aria-label="Social and contact links">
          <a href={`mailto:${site.email}`} aria-label="Email ATS Resume Builder">
            <Mail size={16} />
          </a>
          <a href="https://www.linkedin.com/" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="https://x.com/" aria-label="X">
            <Send size={16} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Copyright 2026 ATS Resume Builder. All Rights Reserved.</span>
        <span>Built for clear, confident applications.</span>
      </div>
    </footer>
  );
}
