# Save this as src/app/layout.tsx (REPLACE everything in it)
@"
import type { Metadata, Viewport } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EXODUS II — Mun Empire Entertainment',
  description: 'Glassmorphic holographic command interface for Mun Empire Entertainment. Enter the Merkabah.',
  keywords: ['EXODUS', 'Mun Empire', 'Merkabah', 'Mythos', 'Holographic'],
  authors: [{ name: 'Mun Empire Entertainment' }],
  openGraph: {
    title: 'EXODUS II — Mun Empire Entertainment',
    description: 'Enter the Merkabah',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} font-mono antialiased bg-[#0a0a0f] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
"@ | Set-Content src\app\layout.tsx
