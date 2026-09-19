import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "../config/site";

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.school.course}`,
  description: SITE.bio,
  openGraph: {
    title: `${SITE.name} — ${SITE.school.name}`,
    description: SITE.bio,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.bio,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-slate-950 antialiased text-slate-100">{children}</body>
    </html>
  );
}