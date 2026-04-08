import type { Metadata } from "next";
import { Syne, Syncopate } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "🦋 EXODUS II | Butterfly Sync | Mun Empire Entertainment",
  description:
    "The Obsidian Phase. Glassmorphic holographic interface. Merkabah sacred geometry. Lotus heartbeat pulse. 5D HD graphics. By Foundress Luna, Daughter of Ramun Ka.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EXODUS II — Butterfly Sync",
    description:
      "The frequency is locked. The Merkabah rotates. Mun Empire Entertainment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${syncopate.variable} antialiased`}
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          backgroundColor: "#050505",
          color: "#f0f0f0",
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          cursor: "none",
        }}
      >
        {children}
      </body>
    </html>
  );
}
