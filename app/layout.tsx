import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import type { PropsWithChildren } from "react";

import { profile } from "@/data/portfolio";

import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const description =
  "Akansha Lakhina — AI & full-stack engineer. Built an 18-agent AI video editor at Samriddhi AI and a guard-railed enterprise AI analyst at Whizunik. Amazon Future Engineer Scholar · GDG Solution Challenge Top 10.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? profile.site),
  title: { default: `${profile.name} — ${profile.role}`, template: `%s · ${profile.name}` },
  description,
  keywords: [
    "Akansha Lakhina",
    "AI engineer",
    "full-stack engineer",
    "multi-agent systems",
    "LangGraph",
    "LLM guardrails",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "Amazon Future Engineer Scholar",
    "software engineer portfolio",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — ${profile.role}`, description },
};

export const viewport: Viewport = {
  themeColor: "#07070A",
  colorScheme: "dark",
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
    <body className="font-sans">{children}</body>
  </html>
);

export default RootLayout;
