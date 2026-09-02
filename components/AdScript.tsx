"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export function AdScript() {
  const pathname = usePathname();

  // Do not show ads on any admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <Script 
        id="monetag-in-page-push"
        strategy="afterInteractive" 
        dangerouslySetInnerHTML={{
          __html: `(function(s){s.dataset.zone='11561619',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
        }}
      />
      <Script 
        id="monetag-vignette"
        strategy="afterInteractive" 
        dangerouslySetInnerHTML={{
          __html: `(function(s){s.dataset.zone='11561987',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
        }}
      />
    </>
  );
}
