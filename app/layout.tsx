import type { Metadata, Viewport } from "next";
import { AdScript } from "@/components/AdScript";
import "@/app/globals.css";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: "ATS Resume Builder - Free ATS Friendly Resume Maker with PDF Export",
    template: `%s | ${site.name}`
  },
  description: site.description,
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8080071450055021" crossOrigin="anonymous"></script>
      </head>
      <body>
        <AdScript />
        {children}
      </body>
    </html>
  );
}
