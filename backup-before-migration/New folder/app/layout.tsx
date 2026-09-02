import type { Metadata, Viewport } from "next";
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
      <body>{children}</body>
    </html>
  );
}
