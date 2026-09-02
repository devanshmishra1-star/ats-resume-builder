"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, Smartphone, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";

const PlayStoreIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3.13 2.02A1.55 1.55 0 0 0 2.5 3.25v17.5c0 .48.16.94.46 1.34l.08.08L13 12.21V11.8l-9.78-9.85-.09.07z" fill="#00D7FF"/>
    <path d="M17.15 16.27l-4.15-4.06v-.41l4.15-4.15.11.06 4.93 2.8c1.4.8 1.4 2.1 0 2.9l-4.93 2.8-.11.06z" fill="#FFC800"/>
    <path d="M17.26 16.21l-4.26-4.26L2.59 22.09c.45.48 1.15.54 1.74.2l12.93-7.39z" fill="#FF3946"/>
    <path d="M17.26 7.8L4.33 1.9C3.74 1.57 3.04 1.63 2.59 2.1l10.41 10.15 4.26-4.45z" fill="#00E676"/>
  </svg>
);

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/#templates" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Android App", href: "https://play.google.com/store/apps/details?id=com.dmappstudios.resumebuilder", icon: Smartphone }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll(); // Check immediately on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = pathname === "/" && !isScrolled;

  return (
    <header className={`site-header ${isTransparent ? 'is-transparent' : ''}`}>
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
          <div className="site-nav-center">
            {navItems.filter(item => item.label !== "Android App").map((item) => {
              const Icon = item.icon;
              
              // If we are on the homepage and the link is an anchor to the homepage, use just the anchor
              // This bypasses the Next.js router for same-page hash links, making them 100% instant
              const isSamePageAnchor = pathname === "/" && item.href.startsWith("/#");
              const optimizedHref = isSamePageAnchor ? item.href.substring(1) : item.href;

              return (
                <Link
                  prefetch={true}
                  key={item.href}
                  className={`nav-link ${"className" in item ? item.className : ""}`.trim()}
                  href={optimizedHref}
                  onClick={() => setOpen(false)}
                >
                  {Icon ? <Icon size={15} aria-hidden="true" /> : null}
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="site-nav-right">
            {navItems.filter(item => item.label === "Android App").map((item) => {
              return (
                <Link
                  key={item.href}
                  className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 font-bold text-xs shadow-sm hover:shadow-md transition-all hover:scale-105 ml-2 mr-2 group"
                  href={item.href}
                  onClick={() => setOpen(false)}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <PlayStoreIcon size={15} />
                  {item.label}
                </Link>
              );
            })}
            {pathname.startsWith('/builder') ? (
              <Link prefetch={true} className="nav-link nav-cta" href="/" onClick={() => setOpen(false)}>
                <Home size={15} aria-hidden="true" />
                Back to Home
              </Link>
            ) : (
              <Link prefetch={true} className="nav-link nav-cta" href="/#templates" onClick={() => setOpen(false)}>
                <FileText size={15} aria-hidden="true" />
                Build Resume
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
