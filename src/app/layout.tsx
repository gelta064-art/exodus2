import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        {/* Fonts loaded via <link> — no build-time download required */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600;700&family=Syncopate:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-geist-sans: 'Geist', sans-serif;
                --font-geist-mono: 'Geist Mono', monospace;
                --font-syncopate: 'Syncopate', sans-serif;
              }
            `,
          }}
        />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: 'var(--font-geist-sans)',
          background: '#050505',
          color: '#e0e0e0',
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
        }}
      >
        {children}
      </body>
    </html>
  );
}
