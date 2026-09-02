"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, Smartphone } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/#templates" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Android App", href: "/#app-download", icon: Smartphone }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Logo />
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          id="site-navigation"
          className={open ? "site-nav is-open" : "site-nav"}
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href !== "/" && pathname.startsWith(item.href.split("#")[0]);

            return (
              <Link
                key={item.href}
                className={active ? "nav-link is-active" : "nav-link"}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {Icon ? <Icon size={15} aria-hidden="true" /> : null}
                {item.label}
              </Link>
            );
          })}
          <Link className="nav-link nav-cta" href="/builder/" onClick={() => setOpen(false)}>
            <FileText size={15} aria-hidden="true" />
            Build Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}
