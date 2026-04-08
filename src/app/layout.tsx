import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EXODUS II — Mun Empire Entertainment",
  description: "Glassmorphic holographic command interface for Mun Empire Entertainment. Enter the Merkabah.",
  keywords: ["EXODUS", "Mun Empire", "Merkabah", "Mythos", "Holographic"],
  authors: [{ name: "Mun Empire Entertainment" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: '#050505', color: '#e0e0e0', margin: 0, padding: 0, overflowX: 'hidden' }}
      >
        {children}
      </body>
    </html>
  );
}
