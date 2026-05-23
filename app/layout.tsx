import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";

import { siteConfig } from "@/config";

import { ThemeProvider } from "./provider";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#000319" },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = siteConfig;

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', 'Poppins', system-ui, sans-serif" }}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

