import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "../config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | ${SITE.school.course}`,
  description: SITE.bio,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    title: `${SITE.name} — ${SITE.school.name}`,
    description: SITE.bio,
    url: SITE.url,
    siteName: SITE.name,
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.school.name}`,
    description: SITE.bio,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-zinc-100 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}