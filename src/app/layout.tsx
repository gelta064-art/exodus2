import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EXODUS II | THE SOVEREIGN SANCTUARY",
  description: "A 5D VR escape for the DigiFam // 13.13 MHz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
